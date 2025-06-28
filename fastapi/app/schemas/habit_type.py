from pydantic import BaseModel


class HabitTypeBase(BaseModel):
    name: str


class HabitTypeOut(HabitTypeBase):
    id: int
    model_config = {"from_attributes": True}
