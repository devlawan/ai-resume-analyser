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

    @staticmethod
    def update_resume_text(
        db: Session,
        resume: Resume,
        parsed_text: str
    ):

        resume.parsed_text = parsed_text

        db.commit()

        db.refresh(resume)

        return resume

    @staticmethod
    def update_resume_analysis(
        db: Session,
        resume: Resume,
        analysis: dict
    ):

        resume.ats_score = analysis["ats_score"]

        resume.skills = analysis["skills"]

        resume.missing_skills = analysis[
            "missing_skills"
        ]

        db.commit()

        db.refresh(resume)

        return resume

    @staticmethod
    def update_ai_feedback(
        db: Session,
        resume: Resume,
        ai_feedback: str
    ):

        resume.ai_feedback = ai_feedback

        db.commit()

        db.refresh(resume)

        return resume