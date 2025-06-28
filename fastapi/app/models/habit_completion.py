from sqlalchemy import Column, Integer, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class HabitCompletion(Base):
    __tablename__ = "habit_completions"

    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, nullable=False)

    habit = relationship(
        "Habit",
        primaryjoin="HabitCompletion.habit_id == Habit.id",
        foreign_keys=[habit_id],
        uselist=False,
    )

    completed = Column(Boolean, default=True)

    deleted = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
