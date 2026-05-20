from fastapi import FastAPI

from app.core.config import settings

from app.api.v1.auth import router as auth_router


app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0"
)

app.include_router(
    auth_router,
    prefix="/api/v1"
)


@app.get("/")
async def root():

    return {
        "message": "API Running"
    }