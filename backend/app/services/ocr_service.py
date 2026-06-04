import tempfile
import os

import ocrmypdf


def run_ocr(pdf_path):

    temp_output = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    )

    temp_output.close()

    ocrmypdf.ocr(
        pdf_path,
        temp_output.name,
        force_ocr=True,
        deskew=True,
        optimize=1
    )

    return temp_output.name