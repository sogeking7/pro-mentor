from pydantic import BaseModel


class UserRoleBase(BaseModel):
    name: str


class UserRoleOut(UserRoleBase):
    id: int
    model_config = {"from_attributes": True}
