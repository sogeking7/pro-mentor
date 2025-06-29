from typing import Optional, List

from fastapi import HTTPException, status
from fastapi_pagination import Page
from pydantic import EmailStr
from sqlalchemy.orm import Session

from app.repositories import user as user_repo
from app.repositories import user_role as user_role_repo
from app.schemas.user import UserCreate, UserUpdate, UserOut
from app.schemas.user_role import UserRoleOut


def get_user(db: Session, user_id: int) -> Optional[UserOut]:
    user = user_repo.get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return user_repo.get_user(db, user_id)


def get_users(db: Session, q: Optional[str] = None) -> Page[UserOut]:
    return user_repo.get_users(db, q=q)


def create_user(db: Session, user_in: UserCreate) -> UserOut:
    user = user_repo.get_user_by_email(db, user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already used"
        )

    return user_repo.insert_user(db, user_in)


def update_user(db: Session, user_id: int, user_in: UserUpdate) -> UserOut:
    user = user_repo.get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return user_repo.update_user(db, user_id, user_in)


def delete_user(db: Session, user_id: int) -> None:
    user = user_repo.get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    user_repo.soft_delete_user(db, user_id)


def authenticate_user(db: Session, email: EmailStr, password: str) -> Optional[UserOut]:
    return user_repo.authenticate_user(db, email, password)


def get_user_roles(db: Session) -> List[UserRoleOut]:
    return user_role_repo.get_user_roles(db)
