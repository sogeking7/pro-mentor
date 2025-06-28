from typing import Optional

from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy import paginate
from pydantic import EmailStr
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload

from app.core.security import get_password_hash, verify_password
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate, UserOut


def get_active_users(db: Session):
    return db.query(User).options(joinedload(User.role)).filter_by(deleted=False)


def get_user(db: Session, user_id: int) -> Optional[UserOut]:
    user = get_active_users(db).filter_by(id=user_id).first()
    return UserOut.model_validate(user) if user else None


def get_user_by_email(db: Session, email: str) -> Optional[UserOut]:
    user = get_active_users(db).filter_by(email=email).first()
    return UserOut.model_validate(user) if user else None


def get_user_entity_by_email(db: Session, email: str) -> Optional[User]:
    return get_active_users(db).filter_by(email=email).first()


def get_users(db: Session, q: Optional[str] = None) -> Page[UserOut]:
    users = get_active_users(db).order_by(User.first_name, User.last_name)
    if q:
        search = f"%{q}%"
        users = users.filter(
            or_(
                User.first_name.ilike(search),
                User.last_name.ilike(search),
                User.email.ilike(search),
            )
        )
    users = [UserOut.model_validate(user) for user in users]
    return paginate(db, users)


def insert_user(db: Session, user_in: UserCreate) -> UserOut:
    user = User(
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        email=str(user_in.email),
        hashed_password=get_password_hash(user_in.password),
        user_role_id=user_in.user_role_id,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return UserOut.model_validate(user)


def update_user(db: Session, user_id: int, user_in: UserUpdate) -> UserOut:
    user = get_active_users(db).filter_by(id=user_id).first()

    update_data = user_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return UserOut.model_validate(user)


def soft_delete_user(db: Session, user_id: int) -> None:
    user = get_active_users(db).filter_by(id=user_id).first()
    user.deleted = True
    db.commit()


def authenticate_user(db: Session, email: EmailStr, password: str) -> Optional[UserOut]:
    user = get_user_entity_by_email(db, email)
    if user and verify_password(password, user.hashed_password):
        return user
    return None
