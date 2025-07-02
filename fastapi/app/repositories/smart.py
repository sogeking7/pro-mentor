from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.smart import Smart
from app.schemas.smart import SmartSave, SmartOut


def get_smarts(db: Session, user_id: int) -> List[SmartOut]:
    smarts = (
        db.query(Smart)
        .filter_by(user_id=user_id)
        .order_by(Smart.created_at.desc())
        .all()
    )
    return [SmartOut.model_validate(smart) for smart in smarts]


def get_smart(db: Session, smart_id: int, user_id: int) -> Optional[SmartOut]:
    smart = db.query(Smart).filter_by(id=smart_id, user_id=user_id).first()
    return SmartOut.model_validate(smart) if smart else None


def insert_smart(db: Session, user_id: int, smart_in: SmartSave) -> SmartOut:
    smart = Smart(
        s=smart_in.s,
        m=smart_in.m,
        a=smart_in.a,
        r=smart_in.r,
        t=smart_in.t,
        user_id=user_id,
    )
    db.add(smart)
    db.commit()
    db.refresh(smart)
    return SmartOut.model_validate(smart)


def delete_smart(db: Session, smart_id: int, user_id: int) -> None:
    smart = db.query(Smart).filter_by(user_id=user_id, id=smart_id).first()
    db.delete(smart)
    db.commit()
