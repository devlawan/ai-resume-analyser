from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File
)

from sqlalchemy.orm import Session

import shutil
import uuid

from app.schemas.auth import (
    UserRegister,
    UserLogin,
    TokenResponse
)

from app.repositories.user_repository import (
    UserRepository
)

from app.repositories.resume_repository import (
    ResumeRepository
)

from app.db.dependencies import get_db

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

from app.api.deps import get_current_user

from app.services.pdf_parser import (
    PDFParserService
)

from app.services.ats_service import (
    ATSService
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register_user(
    payload: UserRegister,
    db: Session = Depends(get_db)
):

    existing_user = UserRepository.get_user_by_email(
        db,
        payload.email
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    user = UserRepository.create_user(
        db,
        {
            "email": payload.email,
            "password_hash": hash_password(
                payload.password
            ),
            "full_name": payload.full_name
        }
    )

    return {
        "message": "User registered successfully",
        "user_id": str(user.id)
    }


@router.post(
    "/login",
    response_model=TokenResponse
)
def login_user(
    payload: UserLogin,
    db: Session = Depends(get_db)
):

    user = UserRepository.get_user_by_email(
        db,
        payload.email
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    valid_password = verify_password(
        payload.password,
        user.password_hash
    )

    if not valid_password:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {
            "sub": str(user.id)
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.get("/me")
def get_me(
    current_user = Depends(get_current_user)
):

    return {
        "id": str(current_user.id),
        "email": current_user.email,
        "full_name": current_user.full_name
    }


@router.post("/upload-resume")
def upload_resume(
    file: UploadFile = File(...),
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    allowed_types = [
        "application/pdf"
    ]

    if file.content_type not in allowed_types:

        raise HTTPException(
            status_code=400,
            detail="Only PDF files allowed"
        )

    unique_filename = f"{uuid.uuid4()}.pdf"

    file_path = f"uploads/{unique_filename}"

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    resume = ResumeRepository.create_resume(
        db,
        {
            "user_id": current_user.id,
            "file_name": file.filename,
            "file_path": file_path
        }
    )

    parsed_text = PDFParserService.extract_text(
        file_path
    )

    ResumeRepository.update_resume_text(
        db,
        resume,
        parsed_text
    )

    analysis = ATSService.analyze_resume(
        parsed_text
    )

    ResumeRepository.update_resume_analysis(
        db,
        resume,
        analysis
    )

    return {
        "message": "Resume uploaded successfully",
        "resume_id": str(resume.id),
        "file_name": resume.file_name,
        "ats_score": analysis["ats_score"],
        "skills": analysis["skills"],
        "missing_skills": analysis["missing_skills"]
    }