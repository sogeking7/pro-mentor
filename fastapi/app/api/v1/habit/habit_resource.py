from typing import Annotated, List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_current_user
from app.api.v1.habit import habit_service
from app.schemas.habit import HabitOut, HabitCreate, HabitUpdate
from app.schemas.habit_completion import HabitCompletionOut, HabitCompletionSave
from app.schemas.habit_type import HabitTypeOut
from app.schemas.user import UserOut

CurrentUser = Annotated[UserOut, Depends(get_current_user)]
DbSession = Annotated[Session, Depends(get_db)]

router = APIRouter()


@router.get("/habit_types", response_model=List[HabitTypeOut])
def read_habit_types(
    db: DbSession,
):
    return habit_service.get_habit_types(db)


@router.post("/save_habit_completion/{habit_id}", response_model=HabitCompletionOut)
def save_habit_completion(
    habit_id: int,
    habit_completion: HabitCompletionSave,
    current_user: CurrentUser,
    db: DbSession,
):
    user_id = current_user.id
    return habit_service.save_habit_completion(
        db=db, habit_completion_in=habit_completion, user_id=user_id, habit_id=habit_id
    )


@router.post("/today_habit_completions", response_model=List[HabitCompletionOut])
def today_habit_completions(
    current_user: CurrentUser,
    db: DbSession,
):
    user_id = current_user.id
    return habit_service.get_today_habit_completions(db=db, user_id=user_id)


@router.post("/", response_model=HabitOut)
def create_user_habit(
    habit: HabitCreate,
    current_user: CurrentUser,
    db: DbSession,
):
    user_id = current_user.id
    return habit_service.create_user_habit(db=db, habit_in=habit, user_id=user_id)


@router.put("/{habit_id}", response_model=HabitOut)
def update_user_habit(
    habit_id: int,
    habit: HabitUpdate,
    current_user: CurrentUser,
    db: DbSession,
):
    user_id = current_user.id
    return habit_service.update_user_habit(
        db=db, habit_in=habit, user_id=user_id, habit_id=habit_id
    )


@router.get("/", response_model=List[HabitOut])
def read_user_habits(
    current_user: CurrentUser,
    db: DbSession,
):
    user_id = current_user.id
    return habit_service.get_user_habits(db, user_id=user_id)


@router.delete("/{habit_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_habit(
    habit_id: int,
    current_user: CurrentUser,
    db: DbSession,
):
    user_id = current_user.id
    return habit_service.delete_user_habit(db, user_id=user_id, habit_id=habit_id)
