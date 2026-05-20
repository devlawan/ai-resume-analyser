from sqlalchemy.orm import Session

from app.models.resume import Resume


class ResumeRepository:

    @staticmethod
    def create_resume(
        db: Session,
        resume_data: dict
    ):

        resume = Resume(**resume_data)

        db.add(resume)

        db.commit()

        db.refresh(resume)

        return resume