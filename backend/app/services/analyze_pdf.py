import pdfplumber


def analyze_pdf(pdf_path):

    pages = 0
    images = 0

    try:

        with pdfplumber.open(pdf_path) as pdf:

            pages = len(pdf.pages)

            for page in pdf.pages:

                if page.images:
                    images += len(page.images)

        scanned = images > 0

        if pages <= 10:
            estimated = "5-15 sec"

        elif pages <= 30:
            estimated = "15-30 sec"

        elif pages <= 80:
            estimated = "1-3 min"

        else:
            estimated = "3-5 min"

        return {

            "pages": pages,

            "images": images,

            "scanned": scanned,

            "ocr_required": scanned,

            "estimated_time": estimated

        }

    except Exception:

        return {

            "pages": 0,

            "images": 0,

            "scanned": False,

            "ocr_required": False,

            "estimated_time": "Unknown"

        }