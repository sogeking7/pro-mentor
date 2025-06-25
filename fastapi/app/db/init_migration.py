from app.db.session import SessionLocal
from sqlalchemy.orm import Session as DBSession


async def init_migration():
    db: DBSession = SessionLocal()

    try:
        pass
    finally:
        db.close()
