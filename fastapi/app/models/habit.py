from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)

    habit_type_id = Column(Integer, default=1)
    type = relationship(
        "HabitType",
        primaryjoin="Habit.habit_type_id == HabitType.id",
        foreign_keys=[habit_type_id],
        uselist=False,
    )

    user_id = Column(Integer, nullable=False)
    user = relationship(
        "User",
        primaryjoin="Habit.user_id == User.id",
        foreign_keys=[user_id],
        uselist=False,
    )

    deleted = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
