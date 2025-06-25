from typing import Optional, List

from sqlalchemy.orm import Session
from app.models.user_role import UserRole
from app.schemas.user_role import UserRoleOut


def get_active_user_roles(db: Session):
    return db.query(UserRole).filter_by(deleted=False)


def get_user_role(db: Session, user_role_id: int) -> Optional[UserRoleOut]:
    return get_active_user_roles(db).filter_by(id=user_role_id).first()


def get_user_roles(db: Session) -> List[UserRoleOut]:
    roles = get_active_user_roles(db).all()
    return [UserRoleOut.model_validate(role) for role in roles]
