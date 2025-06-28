from sqlalchemy.orm import Session as DBSession

from app.core.logger import get_logger
from app.db.seed.seed_habit_types import seed_habit_types
from app.db.seed.seed_user_roles import seed_user_roles
from app.db.session import SessionLocal

logger = get_logger(__name__)


async def init_migration():
    logger.info("Starting user_roles migration...")
    db: DBSession = SessionLocal()

    try:
        seed_user_roles(db)
        seed_habit_types(db)
    except Exception as e:
        logger.error(f"Error during user_roles migration: {e}")
        db.rollback()
    finally:
        db.close()
        logger.info("Database session closed.")
