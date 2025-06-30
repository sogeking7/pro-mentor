from datetime import datetime
from typing import Optional, List

from sqlalchemy.orm import Session, joinedload

from app.models import Habit
from app.models.habit_completion import HabitCompletion
from app.schemas.habit_completion import HabitCompletionSave, HabitCompletionOut


def get_habit_completions_query(db: Session, habit_id: int):
    return (
        db.query(HabitCompletion)
        .options(joinedload(HabitCompletion.habit))
        .filter_by(habit_id=habit_id)
    )


def get_habit_completion_range(
    db: Session, habit_id: int, start_date: datetime, end_date: datetime
) -> Optional[HabitCompletionOut]:
    habit = (
        get_habit_completions_query(db, habit_id=habit_id)
        .filter(
            HabitCompletion.created_at >= start_date,
            HabitCompletion.created_at <= end_date,
        )
        .first()
    )
    return HabitCompletionOut.model_validate(habit) if habit else None


def get_habit_completions(db: Session, habit_id: int) -> List[HabitCompletionOut]:
    habits = get_habit_completions_query(db, habit_id=habit_id).all()
    return [HabitCompletionOut.model_validate(habit) for habit in habits]


def get_habit_completions_range(
    db: Session, user_id: int, start_date: datetime, end_date: datetime
) -> List[HabitCompletionOut]:
    habits = (
        db.query(HabitCompletion)
        .join(Habit, Habit.id == HabitCompletion.habit_id)
        .filter(
            Habit.user_id == user_id,
            HabitCompletion.created_at >= start_date,
            HabitCompletion.created_at <= end_date,
        )
        .order_by(HabitCompletion.created_at)
        .all()
    )

    return [HabitCompletionOut.model_validate(habit) for habit in habits]


def insert_habit_completion(
    db: Session, habit_id: int, habit_completion_in: HabitCompletionSave
) -> HabitCompletionOut:
    habit = HabitCompletion(
        completed=habit_completion_in.completed,
        habit_id=habit_id,
    )
    db.add(habit)
    db.commit()
    db.refresh(habit)
    return HabitCompletionOut.model_validate(habit)


def update_habit_completion(
    db: Session, habit_id: int, habit_completion_in: HabitCompletionSave
) -> HabitCompletionOut:
    habit = get_habit_completions_query(db, habit_id=habit_id).first()
    habit.completed = habit_completion_in.completed
    db.commit()
    db.refresh(habit)
    return HabitCompletionOut.model_validate(habit)


def delete_habit_completion(db: Session, habit_id: int) -> None:
    habit = get_habit_completions_query(db, habit_id=habit_id).first()
    db.delete(habit)
    db.commit()
