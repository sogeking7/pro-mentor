import logging
from app.db.session import SessionLocal
from sqlalchemy.orm import Session as DBSession
from app.models.user_role import UserRole

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

DEFAULT_ROLES = ["Мұғалім", "Директор", "Әдіскер", "Басқа"]


async def init_migration():
    logger.info("Starting user_roles migration...")
    db: DBSession = SessionLocal()

    try:
        for role_name in DEFAULT_ROLES:
            logger.info(f"Checking role: {role_name}")
            exists = db.query(UserRole).filter_by(name=role_name).first()
            if not exists:
                logger.info(f"Creating role: {role_name}")
                role = UserRole(name=role_name)
                db.add(role)
        db.commit()
        logger.info("User roles migration completed successfully.")
    except Exception as e:
        logger.error(f"Error during user_roles migration: {e}")
        db.rollback()
    finally:
        db.close()
        logger.info("Database session closed.")
