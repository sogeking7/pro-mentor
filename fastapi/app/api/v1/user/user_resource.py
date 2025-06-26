from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import Optional, Annotated, List

from app.api.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.user import UserOut, UserCreate, UserUpdate
from app.api.v1.user import user_service

from fastapi_pagination import Page

from app.schemas.user_role import UserRoleOut

CurrentUser = Annotated[User, Depends(get_current_user)]
DbSession = Annotated[Session, Depends(get_db)]

router = APIRouter()


@router.get("/me", response_model=UserOut, summary="Get Current User")
def read_current_user(current_user: CurrentUser) -> User:
    return current_user


@router.get("/user_roles", response_model=List[UserRoleOut])
def read_user_roles(
    db: DbSession,
):
    return user_service.get_user_roles(db)


@router.post("/", response_model=UserOut)
def create_user(
    user: UserCreate,
    current_user: CurrentUser,
    db: DbSession,
):
    print(current_user)
    return user_service.create_user(db=db, user_in=user)


@router.put("/{user_id}", response_model=UserOut)
def update_user(
    user_id: int,
    user: UserUpdate,
    current_user: CurrentUser,
    db: DbSession,
):
    return user_service.update_user(db=db, user_id=user_id, user_in=user)


@router.get("/", response_model=Page[UserOut])
def read_users(
    current_user: CurrentUser,
    db: DbSession,
    q: Optional[str] = None,
):
    return user_service.get_users(db, q=q)


@router.get("/{user_id}", response_model=UserOut)
def read_user(
    user_id: int,
    current_user: CurrentUser,
    db: DbSession,
):
    return user_service.get_user(db, user_id=user_id)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    current_user: CurrentUser,
    db: DbSession,
):
    return user_service.delete_user(db, user_id=user_id)
