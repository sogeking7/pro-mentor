from sqlalchemy import Column, Integer, String, DateTime, Boolean, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category_name = Column(String, nullable=False)
    category_icon = Column(String, nullable=False)
    date = Column(Date, nullable=False)

    user_id = Column(Integer, nullable=False)
    user = relationship(
        "User",
        primaryjoin="Plan.user_id == User.id",
        foreign_keys=[user_id],
        uselist=False,
    )

    deleted = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
