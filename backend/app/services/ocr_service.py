import tempfile
import os

import ocrmypdf

import shutil

def run_ocr(pdf_path):

    print(
    "OCR SERVICE UPDATED"
)

    temp_output = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    )

    temp_output.close()

    try:

        print(
            "Tesseract:",
            shutil.which("tesseract")
        )

        ocrmypdf.ocr(
            pdf_path,
            temp_output.name,
            force_ocr=True,
            deskew=True,
            optimize=1,
            language="eng"
        )

        return temp_output.name

    except Exception as e:

        if os.path.exists(
            temp_output.name
        ):
            os.remove(
                temp_output.name
            )

        raise Exception(
            f"OCR failed: {str(e)}"
        )