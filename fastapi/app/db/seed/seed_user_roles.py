from sqlalchemy.orm import Session

from app.core.logger import get_logger
from app.models import UserRole

logger = get_logger(__name__)

DEFAULT_ROLES = ["Мұғалім", "Директор", "Әдіскер", "Басқа"]


def seed_user_roles(db: Session):
    for role_name in DEFAULT_ROLES:

        logger.info(f"Checking role: {role_name}")

        exists = db.query(UserRole).filter_by(name=role_name).first()
        if not exists:
            logger.info(f"Creating role: {role_name}")

            role = UserRole(name=role_name)
            db.add(role)
    db.commit()

    logger.info("User roles migration completed successfully.")
