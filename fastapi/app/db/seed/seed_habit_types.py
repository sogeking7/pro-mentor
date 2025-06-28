from sqlalchemy.orm import Session

from app.core.logger import get_logger
from app.models import HabitType

logger = get_logger(__name__)

DEFAULT_HABIT_TYPES = [
    "🧮 IQ",
    "❤️ EQ",
    "💪 PQ",
    "🙏 SQ"
]


def seed_habit_types(db: Session):
    for type_name in DEFAULT_HABIT_TYPES:
        logger.info(f"Checking habit type: {type_name}")
        exists = db.query(HabitType).filter_by(name=type_name).first()
        if not exists:
            logger.info(f"Creating habit type: {type_name}")
            role = HabitType(name=type_name)
            db.add(role)
    db.commit()
    logger.info("Habit types migration completed successfully.")
