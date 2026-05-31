from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.convert import (
    router as convert_router
)

app = FastAPI(
    title="PDF2AI API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(convert_router)


@app.get("/")
def root():
    return {
        "message": "PDF2AI Backend Running"
    }