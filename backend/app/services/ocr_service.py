import tempfile
import os
import sys

import ocrmypdf


def get_runtime_paths():

    if getattr(sys, "frozen", False):

        base_dir = os.path.join(
            sys._MEIPASS,
            "runtime"
        )

    else:

        base_dir = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__),
                "../../runtime"
            )
        )

    tesseract_path = os.path.join(
        base_dir,
        "tesseract",
        "tesseract.exe"
    )

    ghostscript_path = os.path.join(
        base_dir,
        "ghostscript",
        "bin",
        "gswin64c.exe"
    )

    return tesseract_path, ghostscript_path


def run_ocr(pdf_path):

    temp_output = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    )

    temp_output.close()

    try:

        tesseract_path, ghostscript_path = (
            get_runtime_paths()
        )

        print("Using Tesseract:", tesseract_path)
        print("Using Ghostscript:", ghostscript_path)

        os.environ["OCRMYPDF_TESSERACT"] = tesseract_path
        os.environ["OCRMYPDF_GS"] = ghostscript_path

        os.environ["PATH"] = (
            os.path.dirname(tesseract_path)
            + ";"
            + os.path.dirname(ghostscript_path)
            + ";"
            + os.environ.get("PATH", "")
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

        if os.path.exists(temp_output.name):
            os.remove(temp_output.name)

        raise Exception(
            f"OCR failed: {str(e)}"
        )