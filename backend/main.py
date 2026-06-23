from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.convert import (
    router as convert_router
)

from app.routes.youtube import (
    router as youtube_router
)

from app.routes.summary import (
    router as summary_router
)

app = FastAPI(
    title="Altair API",
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

app.include_router(youtube_router)

app.include_router(summary_router)


@app.get("/")
def root():
    return {
        "message": "Altair Backend Running"
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000
    )