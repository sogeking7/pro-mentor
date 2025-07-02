from pydantic import BaseModel


class SmartBase(BaseModel):
    s: str
    m: str
    a: str
    r: str
    t: str


class SmartSave(SmartBase):
    pass


class SmartOut(SmartBase):
    id: int
    model_config = {"from_attributes": True}
