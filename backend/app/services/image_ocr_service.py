from PIL import Image
import pytesseract
import os
import sys


if getattr(sys, "frozen", False):

    pytesseract.pytesseract.tesseract_cmd = os.path.join(

        sys._MEIPASS,

        "runtime",

        "tesseract",

        "tesseract.exe"

    )

else:

    pytesseract.pytesseract.tesseract_cmd = (
        r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    )


def extract_text_from_image(
    image_path
):

    image = Image.open(
        image_path
    )

    text = pytesseract.image_to_string(
        image,
        lang="eng"
    )

    return text.strip()