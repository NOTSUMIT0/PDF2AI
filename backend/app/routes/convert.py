from fastapi import APIRouter

router = APIRouter()


@router.get("/convert")
def convert_test():
    return {
        "message": "Convert Route Working"
    }