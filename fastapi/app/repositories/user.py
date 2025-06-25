from typing import Optional

from fastapi_pagination import Page
from pydantic import EmailStr
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate, UserOut
from app.core.security import get_password_hash, verify_password
from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy import or_


def get_active_users(db: Session):
    return db.query(User).filter_by(deleted=False)


def get_user(db: Session, user_id: int) -> Optional[UserOut]:
    return get_active_users(db).filter_by(id=user_id).first()


def get_user_by_email(db: Session, email: EmailStr) -> Optional[UserOut]:
    return get_active_users(db).filter_by(email=email).first()


def get_users(
        db: Session, q: Optional[str] = None
) -> Page[UserOut]:
    query = get_active_users(db).order_by(User.first_name, User.last_name)
    if q:
        search = f"%{q}%"
        query = query.filter(
            or_(
                User.first_name.ilike(search),
                User.last_name.ilike(search),
                User.email.ilike(search),
            )
        )
    return paginate(db, query)


def insert_user(db: Session, user_in: UserCreate) -> UserOut:
    user = User(
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        email=str(user_in.email),
        hashed_password=get_password_hash(user_in.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return UserOut.model_validate(user)


def update_user(db: Session, user_id: int, user_in: UserUpdate) -> UserOut:
    user = get_active_users(db).filter_by(id=user_id).first()
    if not user:
        raise ValueError(f"User {user_id} not found")

    update_data = user_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return UserOut.model_validate(user)


def soft_delete_user(db: Session, user_id: int) -> None:
    user = get_active_users(db).filter_by(id=user_id).first()
    if not user:
        raise ValueError(f"User {user_id} not found")
    user.deleted = True
    db.commit()


def authenticate_user(db: Session, email: EmailStr, password: str) -> Optional[UserOut]:
    user = get_user_by_email(db, email)
    if user and verify_password(password, user.hashed_password):
        return user
    return None
