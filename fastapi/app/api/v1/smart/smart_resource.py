from typing import Annotated, List

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_current_user
from app.repositories.smart import get_smart, insert_smart, get_smarts, delete_smart
from app.schemas.smart import SmartSave, SmartOut
from app.schemas.user import UserOut

CurrentUser = Annotated[UserOut, Depends(get_current_user)]
DbSession = Annotated[Session, Depends(get_db)]

router = APIRouter()


@router.post("/", response_model=SmartOut)
def create_user_smart(
    smart: SmartSave,
    current_user: CurrentUser,
    db: DbSession,
):
    user_id = current_user.id
    return insert_smart(db, user_id=user_id, smart_in=smart)


@router.get("/", response_model=List[SmartOut])
def read_user_smarts(
    current_user: CurrentUser,
    db: DbSession,
):
    user_id = current_user.id
    return get_smarts(db, user_id=user_id)


@router.delete("/{smart_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_smart(
    smart_id: int,
    current_user: CurrentUser,
    db: DbSession,
):
    user_id = current_user.id
    user_habit = get_smart(db, smart_id=smart_id, user_id=user_id)

    if not user_habit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Smart {smart_id} not found",
        )

    delete_smart(db, user_id=user_id, smart_id=smart_id)
