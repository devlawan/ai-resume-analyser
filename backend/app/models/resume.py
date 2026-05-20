import uuid

from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class Resume(Base):

    __tablename__ = "resumes"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )

    file_name = Column(
        String,
        nullable=False
    )

    file_path = Column(
        String,
        nullable=False
    )