from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from app.schemas.habit import HabitOut


class HabitCompletionBase(BaseModel):
    habit_id: int
    completed: bool


class HabitCompletionSave(BaseModel):
    completed: bool
    pass


class HabitCompletionOut(HabitCompletionBase):
    id: int
    habit: HabitOut

    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}
