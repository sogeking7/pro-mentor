from datetime import time
from typing import List, Optional

from fastapi import HTTPException, status
from pydantic import BaseModel
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
    db: Session,
    habit_id: int,
    user_id: int,
    habit_completion_in: HabitCompletionSave,
    timezone_str: str,
) -> Optional[HabitCompletionOut]:
    try:
        user_tz = ZoneInfo(timezone_str)
    except ZoneInfoNotFoundError:
        user_tz = ZoneInfo("UTC")

    now_in_user_tz = datetime.now(user_tz)
    today_in_user_tz = now_in_user_tz.date()

    start_date = datetime.combine(today_in_user_tz, time.min, tzinfo=user_tz)
    end_date = datetime.combine(today_in_user_tz, time.max, tzinfo=user_tz)

    user_habit = habit_repo.get_user_habit(db, habit_id=habit_id, user_id=user_id)

    if not user_habit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Habit Completion {habit_id} not found",
        )

    habit_completion = habit_completion_repo.get_habit_completion_range(
        db, habit_id=habit_id, start_date=start_date, end_date=end_date
    )

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
        user_tz = ZoneInfo(timezone_str)
    except ZoneInfoNotFoundError:
        user_tz = ZoneInfo("UTC")

    now_in_user_tz = datetime.now(user_tz)
    today_in_user_tz = now_in_user_tz.date()

    start_date = datetime.combine(today_in_user_tz, time.min, tzinfo=user_tz)
    end_date = datetime.combine(today_in_user_tz, time.max, tzinfo=user_tz)

    return habit_completion_repo.get_habit_completions_range(
        db, user_id=user_id, start_date=start_date, end_date=end_date
    )


from datetime import datetime
from typing import List, Dict, Optional
from calendar import monthrange
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError
from sqlalchemy.orm import Session, joinedload
from collections import defaultdict

from app.models.habit import Habit
from app.schemas.habit_completion import HabitCompletionOut
from app.schemas.habit import HabitOut


class DailyHabitCompletion(BaseModel):
    """Schema for individual habit completion on a specific day"""

    habit: HabitOut
    completed: bool
    completion_id: Optional[int] = None  # None if not completed
    date: datetime


class DailyHabitsReport(BaseModel):
    """Schema for all habits report for a specific day"""

    date: datetime
    habit_completions: List[DailyHabitCompletion]


class MonthlyHabitsReport(BaseModel):
    """Schema for the complete monthly habits report"""

    year: int
    month: int
    daily_reports: List[DailyHabitsReport]
    total_days: int
    total_habits: int


def get_monthly_habit_completions(
    db: Session, user_id: int, timezone_str: str, year: int, month: int
) -> MonthlyHabitsReport:
    """
    Get a comprehensive monthly report of user's habit completions.

    Returns a report for each day of the month showing:
    - All active habits for that day (considering deletion dates)
    - Whether each habit was completed or not
    - Completion details if available

    Args:
        db: Database session
        user_id: ID of the user
        timezone_str: User's timezone string
        year: Year for the report
        month: Month for the report (1-12)

    Returns:
        MonthlyHabitsReport: Complete monthly report with daily breakdowns
    """
    try:
        user_tz = ZoneInfo(timezone_str)
    except ZoneInfoNotFoundError:
        user_tz = ZoneInfo("UTC")

    _, last_day = monthrange(year, month)

    # Define the month's date range in user's timezone
    start_date = datetime(year, month, 1, 0, 0, 0, tzinfo=user_tz)
    end_date = datetime(year, month, last_day, 23, 59, 59, 999999, tzinfo=user_tz)

    # Get all habit completions for the month
    habit_completions: List[HabitCompletionOut] = (
        habit_completion_repo.get_habit_completions_range(
            db, user_id=user_id, start_date=start_date, end_date=end_date
        )
    )

    # Get all user habits (including deleted ones) with their types
    user_habits = (
        db.query(Habit).options(joinedload(Habit.type)).filter_by(user_id=user_id).all()
    )

    # Create a mapping of completions by date and habit_id for quick lookup
    completions_map: Dict[str, Dict[int, HabitCompletionOut]] = defaultdict(dict)

    for completion in habit_completions:
        # Convert completion date to user timezone and get date string
        completion_date = completion.created_at.astimezone(user_tz)
        date_key = completion_date.strftime("%Y-%m-%d")
        completions_map[date_key][completion.habit_id] = completion

    # Generate daily reports
    daily_reports = []

    for day in range(1, last_day + 1):
        current_date = datetime(year, month, day, tzinfo=user_tz)
        date_key = current_date.strftime("%Y-%m-%d")

        daily_habit_completions = []

        for habit in user_habits:
            # Check if habit was active on this date
            if is_habit_active_on_date(habit, current_date):
                # Check if there's a completion record
                completion = completions_map[date_key].get(habit.id)

                if completion:
                    # Habit was completed
                    daily_completion = DailyHabitCompletion(
                        habit=HabitOut.model_validate(habit),
                        completed=completion.completed,
                        completion_id=completion.id,
                        date=current_date,
                    )
                else:
                    # Habit was not completed (no record means not completed)
                    daily_completion = DailyHabitCompletion(
                        habit=HabitOut.model_validate(habit),
                        completed=False,
                        completion_id=None,
                        date=current_date,
                    )

                daily_habit_completions.append(daily_completion)

        daily_report = DailyHabitsReport(
            date=current_date, habit_completions=daily_habit_completions
        )
        daily_reports.append(daily_report)

    # Create the complete monthly report
    monthly_report = MonthlyHabitsReport(
        year=year,
        month=month,
        daily_reports=daily_reports,
        total_days=last_day,
        total_habits=len(
            [h for h in user_habits if not h.deleted]
        ),  # Count only non-deleted habits
    )

    return monthly_report


def is_habit_active_on_date(habit: Habit, target_date: datetime) -> bool:
    """
    Check if a habit was active (not deleted) on a specific date.

    Args:
        habit: The habit to check
        target_date: The date to check against

    Returns:
        bool: True if habit was active on the target date
    """
    # Check if habit was created before or on the target date
    if habit.created_at.date() > target_date.date():
        return False

    # If habit is deleted, check if target_date is before the deletion date (updated_at)
    if habit.deleted:
        if habit.updated_at and habit.updated_at.date() <= target_date.date():
            # Habit was deleted on or before target_date, so it's not active
            return False
        else:
            # Habit was deleted after target_date, so it was active on target_date
            return True

    # If habit is not deleted, it's active from creation date onwards
    return True
