from datetime import datetime, time
from typing import List, Optional
from zoneinfo import ZoneInfoNotFoundError, ZoneInfo

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories import habit as habit_repo
from app.repositories import habit_completion as habit_completion_repo
from app.repositories import habit_type as habit_type_repo
from app.schemas.habit import HabitUpdate, HabitOut, HabitCreate
from app.schemas.habit_completion import HabitCompletionOut, HabitCompletionSave
from app.schemas.habit_type import HabitTypeOut


def get_user_habits(db: Session, user_id: int) -> List[HabitOut]:
    return habit_repo.get_user_habits(db, user_id=user_id)


def create_user_habit(db: Session, user_id: int, habit_in: HabitCreate) -> HabitOut:
    return habit_repo.insert_user_habit(db, user_id=user_id, habit_in=habit_in)


def update_user_habit(
    db: Session, habit_id: int, user_id: int, habit_in: HabitUpdate
) -> HabitOut:
    user_habit = habit_repo.get_user_habit(db, habit_id=habit_id, user_id=user_id)

    if not user_habit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Habit Completion {habit_id} not found",
        )

    return habit_repo.update_user_habit(
        db, user_id=user_id, habit_id=habit_id, habit_in=habit_in
    )


def delete_user_habit(db: Session, habit_id: int, user_id: int) -> None:
    user_habit = habit_repo.get_user_habit(db, habit_id=habit_id, user_id=user_id)

    if not user_habit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Habit Completion {habit_id} not found",
        )

    habit_repo.delete_user_habit(db, user_id=user_id, habit_id=habit_id)


def get_habit_types(db: Session) -> List[HabitTypeOut]:
    return habit_type_repo.get_habit_types(db)


def save_habit_completion(
    db: Session, habit_id: int, user_id: int, habit_completion_in: HabitCompletionSave
) -> Optional[HabitCompletionOut]:
    user_habit = habit_repo.get_user_habit(db, habit_id=habit_id, user_id=user_id)

    if not user_habit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Habit Completion {habit_id} not found",
        )

    habit_completion = habit_completion_repo.get_habit_completion(db, habit_id=habit_id)

    if not habit_completion:
        habit_completion = habit_completion_repo.insert_habit_completion(
            db, habit_id=habit_id, habit_completion_in=habit_completion_in
        )

    else:
        habit_completion = habit_completion_repo.update_habit_completion(
            db, habit_id=habit_id, habit_completion_in=habit_completion_in
        )

    return HabitCompletionOut.model_validate(habit_completion)


def get_today_habit_completions(
    db: Session, user_id: int, timezone_str: str
) -> List[HabitCompletionOut]:
    try:
        # Create a timezone object from the string provided by the user
        user_tz = ZoneInfo(timezone_str)
    except ZoneInfoNotFoundError:
        # If the user sends a bogus timezone, fall back to UTC
        user_tz = ZoneInfo("UTC")

    # Get the current moment IN THE USER'S TIMEZONE
    now_in_user_tz = datetime.now(user_tz)
    today_in_user_tz = now_in_user_tz.date()

    # Create the start and end of the day.
    # Crucially, attach the user's timezone info to make them "aware" datetimes.
    start_date = datetime.combine(today_in_user_tz, time.min, tzinfo=user_tz)
    end_date = datetime.combine(today_in_user_tz, time.max, tzinfo=user_tz)

    # These start_date and end_date objects now correctly represent the beginning and end
    # of the day in the user's specific timezone.
    # e.g., start_date could be <2025-06-30 00:00:00+05:00> for a user in Astana

    return habit_completion_repo.get_habit_completions_range(
        db, user_id=user_id, start_date=start_date, end_date=end_date
    )
