from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    APP_NAME: str

    DEBUG: bool

    DATABASE_URL: str

    SECRET_KEY: str

    ALGORITHM: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int

    REFRESH_TOKEN_EXPIRE_DAYS: int

    OPENAI_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()

