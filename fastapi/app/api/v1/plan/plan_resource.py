from typing import Annotated, List

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_current_user
from app.repositories.plan import get_plan, insert_plan, get_plans, delete_plan
from app.schemas.plan import PlanSave, PlanOut
from app.schemas.user import UserOut

CurrentUser = Annotated[UserOut, Depends(get_current_user)]
DbSession = Annotated[Session, Depends(get_db)]

router = APIRouter()


@router.post("/", response_model=PlanOut)
def create_user_plan(
    plan: PlanSave,
    current_user: CurrentUser,
    db: DbSession,
):
    user_id = current_user.id
    return insert_plan(db, user_id=user_id, plan_in=plan)


@router.get("/", response_model=List[PlanOut])
def read_user_plans(
    current_user: CurrentUser,
    db: DbSession,
):
    user_id = current_user.id
    return get_plans(db, user_id=user_id)


@router.delete("/{plan_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_plan(
    plan_id: int,
    current_user: CurrentUser,
    db: DbSession,
):
    user_id = current_user.id
    user_habit = get_plan(db, plan_id=plan_id, user_id=user_id)

    if not user_habit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Plan {plan_id} not found",
        )

    delete_plan(db, user_id=user_id, plan_id=plan_id)
