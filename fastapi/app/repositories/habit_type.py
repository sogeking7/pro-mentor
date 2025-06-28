from typing import List

from sqlalchemy.orm import Session

from app.models import HabitType
from app.schemas.habit_type import HabitTypeOut


def get_habit_types(db: Session) -> List[HabitTypeOut]:
    types = db.query(HabitType).filter_by(deleted=False).all()
    return [HabitTypeOut.model_validate(type) for type in types]
