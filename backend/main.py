from fastapi import FastAPI
from app.routes.convert import router as convert_router

app = FastAPI(
    title="PDF2AI API",
    version="1.0.0"
)

app.include_router(convert_router)


@app.get("/")
def root():
    return {
        "message": "PDF2AI Backend Running"
    }