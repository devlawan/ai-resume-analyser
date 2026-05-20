class AIResumeService:

    @staticmethod
    def analyze_resume(
        parsed_text: str
    ):

        text = parsed_text.lower()

        strengths = []

        weaknesses = []

        suggestions = []

        if "react" in text:
            strengths.append(
                "Strong frontend development skills"
            )

        if "python" in text:
            strengths.append(
                "Good backend/programming foundation"
            )

        if "project" in text:
            strengths.append(
                "Includes project experience"
            )

        if "docker" not in text:
            weaknesses.append(
                "Docker skill missing"
            )

            suggestions.append(
                "Add Docker projects or deployment experience"
            )

        if "postgresql" not in text:
            weaknesses.append(
                "PostgreSQL not mentioned"
            )

            suggestions.append(
                "Mention database technologies clearly"
            )

        if "aws" not in text:
            weaknesses.append(
                "Cloud skills missing"
            )

            suggestions.append(
                "Learn and add AWS basics"
            )

        feedback = f"""

STRENGTHS:
{chr(10).join(strengths)}

WEAKNESSES:
{chr(10).join(weaknesses)}

SUGGESTIONS:
{chr(10).join(suggestions)}

ATS TIPS:
- Add more quantified achievements
- Include backend technologies
- Mention deployment experience
- Improve keyword optimization

"""

        return feedback