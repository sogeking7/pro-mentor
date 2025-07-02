from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class Smart(Base):
    __tablename__ = "smarts"

    id = Column(Integer, primary_key=True, index=True)
    s = Column(String, nullable=False)
    m = Column(String, nullable=False)
    a = Column(String, nullable=False)
    r = Column(String, nullable=False)
    t = Column(String, nullable=False)

    user_id = Column(Integer, nullable=False)
    user = relationship(
        "User",
        primaryjoin="Smart.user_id == User.id",
        foreign_keys=[user_id],
        uselist=False,
    )

    deleted = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
