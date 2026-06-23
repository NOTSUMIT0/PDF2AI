import pdfplumber


def analyze_pdf(pdf_path):

    analysis = {
        "pages": 0,
        "images": 0,
        "scanned": False,
        "ocr_required": False,
        "estimated_time": "5-10 sec"
    }

    try:

        total_text = 0

        with pdfplumber.open(pdf_path) as pdf:

            analysis["pages"] = len(pdf.pages)

            for page in pdf.pages:

                text = page.extract_text()

                if text:
                    total_text += len(text)

                if hasattr(page, "images"):
                    analysis["images"] += len(page.images)

        if total_text < 100:

            analysis["scanned"] = True

            analysis["ocr_required"] = True

            if analysis["pages"] <= 10:

                analysis["estimated_time"] = "10-20 sec"

            elif analysis["pages"] <= 50:

                analysis["estimated_time"] = "20-60 sec"

            else:

                analysis["estimated_time"] = "1-3 min"

        return analysis

    except Exception as e:

        print("PDF ANALYSIS ERROR")
        print(e)

        return analysis