from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from app.db.base import Base


class HabitType(Base):
    __tablename__ = "habit_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    deleted = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
