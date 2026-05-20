class ATSService:

    COMMON_SKILLS = [

        "python",
        "react",
        "javascript",
        "typescript",
        "fastapi",
        "sql",
        "postgresql",
        "docker",
        "git",
        "aws",
        "html",
        "css",
        "node.js",
        "mongodb",
        "rest api"
    ]

    REQUIRED_SKILLS = [

        "python",
        "react",
        "fastapi",
        "postgresql",
        "git"
    ]

    @staticmethod
    def analyze_resume(
        parsed_text: str
    ):

        text = parsed_text.lower()

        found_skills = []

        missing_skills = []

        for skill in ATSService.COMMON_SKILLS:

            if skill in text:

                found_skills.append(skill)

        for skill in ATSService.REQUIRED_SKILLS:

            if skill not in text:

                missing_skills.append(skill)

        ats_score = int(
            (
                len(found_skills)
                /
                len(ATSService.COMMON_SKILLS)
            ) * 100
        )

        return {
            "ats_score": ats_score,
            "skills": found_skills,
            "missing_skills": missing_skills
        }