import uuid

from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base

from sqlalchemy import Text

from sqlalchemy import Integer
from sqlalchemy.dialects.postgresql import JSONB

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
    parsed_text = Column(
    Text,
    nullable=True
    )

    ats_score = Column(
    Integer,
    nullable=True
    )

    skills = Column(
        JSONB,
        nullable=True
    )

    missing_skills = Column(
        JSONB,
        nullable=True
    )