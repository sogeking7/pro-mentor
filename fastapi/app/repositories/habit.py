from typing import Optional, List

from sqlalchemy.orm import Session, joinedload

from app.models.habit import Habit
from app.schemas.habit import HabitCreate, HabitUpdate, HabitOut


def get_user_habits_query(db: Session, user_id: int):
    return (
        db.query(Habit)
        .options(joinedload(Habit.type))
        .filter_by(user_id=user_id, deleted=False)
    )


def get_user_habit(db: Session, habit_id: int, user_id: int) -> Optional[HabitOut]:
    habit = get_user_habits_query(db, user_id=user_id).filter_by(id=habit_id).first()
    return HabitOut.model_validate(habit) if habit else None


def get_user_habits(db: Session, user_id: int) -> List[HabitOut]:
    habits = get_user_habits_query(db, user_id=user_id).all()
    return [HabitOut.model_validate(habit) for habit in habits]


def insert_user_habit(db: Session, user_id: int, habit_in: HabitCreate) -> HabitOut:
    habit = Habit(
        title=habit_in.title,
        habit_type_id=habit_in.habit_type_id,
        user_id=user_id,
    )
    db.add(habit)
    db.commit()
    db.refresh(habit)
    return HabitOut.model_validate(habit)


def update_user_habit(
    db: Session, habit_id: int, user_id: int, habit_in: HabitUpdate
) -> HabitOut:
    habit = get_user_habits_query(db, user_id=user_id).filter_by(id=habit_id).first()
    update_data = habit_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(habit, field, value)

    db.commit()
    db.refresh(habit)
    return HabitOut.model_validate(habit)


def delete_user_habit(db: Session, habit_id: int, user_id: int) -> None:
    habit = get_user_habits_query(db, user_id=user_id).filter_by(id=habit_id).first()
    habit.deleted = True
    db.commit()
