from fastapi import FastAPI

app = FastAPI(
    title="AI Resume Analyzer API",
    version="1.0.0"
)


@app.get("/")
async def root():
    return {
        "message": "Backend Running Successfully"
    }