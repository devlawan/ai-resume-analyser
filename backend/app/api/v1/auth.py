from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.auth import (
    UserRegister,
    UserLogin,
    TokenResponse
)

from app.repositories.user_repository import UserRepository

from app.db.dependencies import get_db

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
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