from pydantic import BaseModel

from app.schemas.habit_type import HabitTypeOut


class HabitBase(BaseModel):
    title: str
    habit_type_id: int


class HabitCreate(HabitBase):
    pass


class HabitUpdate(BaseModel):
    title: str
    pass


class HabitOut(HabitBase):
    id: int
    type: HabitTypeOut
    model_config = {"from_attributes": True}
