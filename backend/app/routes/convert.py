from fastapi import APIRouter, UploadFile, File

from app.services.markitdown_service import (
    convert_pdf_to_markdown
)

import tempfile
import os
import traceback

router = APIRouter()


@router.post("/convert")
async def convert_pdf(
    file: UploadFile = File(...)
):
    temp_path = None

    try:

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp_file:

            content = await file.read()

            temp_file.write(content)

            temp_path = temp_file.name

        markdown = convert_pdf_to_markdown(
            temp_path
        )

        return {
            "success": True,
            "markdown": markdown
        }

    except Exception as e:

        print("CONVERT ERROR")
        traceback.print_exc()

        return {
            "success": False,
            "error": str(e)
        }

    finally:

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)