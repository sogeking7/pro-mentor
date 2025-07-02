from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.plan import Plan
from app.schemas.plan import PlanSave, PlanOut


def get_plans(db: Session, user_id: int) -> List[PlanOut]:
    plans = (
        db.query(Plan).filter_by(user_id=user_id).order_by(Plan.created_at.desc()).all()
    )
    return [PlanOut.model_validate(plan) for plan in plans]


def get_plan(db: Session, plan_id: int, user_id: int) -> Optional[PlanOut]:
    plan = db.query(Plan).filter_by(id=plan_id, user_id=user_id).first()
    return PlanOut.model_validate(plan) if plan else None


def insert_plan(db: Session, user_id: int, plan_in: PlanSave) -> PlanOut:
    plan = Plan(
        title=plan_in.title,
        category_name=plan_in.category_name,
        category_icon=plan_in.category_icon,
        date=plan_in.date,
        user_id=user_id,
    )
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return PlanOut.model_validate(plan)


def delete_plan(db: Session, plan_id: int, user_id: int) -> None:
    plan = db.query(Plan).filter_by(user_id=user_id, id=plan_id).first()
    db.delete(plan)
    db.commit()
