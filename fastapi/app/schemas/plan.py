from datetime import datetime

from pydantic import BaseModel


class PlanBase(BaseModel):
    title: str
    category_name: str
    category_icon: str
    date: datetime


class PlanSave(PlanBase):
    pass


class PlanOut(PlanBase):
    id: int
    model_config = {"from_attributes": True}
