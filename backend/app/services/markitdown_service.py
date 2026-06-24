from markitdown import MarkItDown

import pdfplumber

from app.services.pdf_detector import (
    is_searchable_pdf
)

from app.services.ocr_service import (
    run_ocr
)

from app.services.image_ocr_service import (
    extract_text_from_image
)

import os

import re

def clean_markdown(markdown):

    markdown = re.sub(
        r'\(cid:\d+\)',
        '',
        markdown
    )

    markdown = re.sub(
        r'\|[- ]+\|',
        '|',
        markdown
    )

    markdown = re.sub(
        r'\n{3,}',
        '\n\n',
        markdown
    )

    return markdown.strip()

def convert_document_to_markdown(
    file_path,
    filename
):

    try:

        extension = (
            os.path.splitext(
                filename
            )[1]
            .lower()
        )

        working_file = file_path

        image_extensions = [
            ".png",
            ".jpg",
            ".jpeg",
            ".bmp",
            ".tiff",
            ".webp"
        ]

        if extension in image_extensions:

            text = extract_text_from_image(
                file_path
            )

            if not text.strip():

                raise Exception(
                    "No text detected in image."
                )

            return f"# Image OCR Output\n\n{text}"

        if extension == ".pdf":

            if not is_searchable_pdf(file_path):

                working_file = run_ocr(file_path)

                try:

                    text = ""

                    with pdfplumber.open(
                        working_file
                    ) as pdf:

                        for page in pdf.pages:

                            text += (
                                page.extract_text()
                                or ""
                            ) + "\n"

                    return text

                finally:

                    if os.path.exists(
                        working_file
                    ):
                        os.remove(
                            working_file
                        )

                
        print(working_file)

        print("FILE:", working_file)
        print("EXTENSION:", extension)

        md = MarkItDown()

        result = md.convert(
            working_file
        )

        markdown = clean_markdown(
            result.text_content
        )

        if not markdown.strip():

            raise Exception(
                "No meaningful content could be extracted from this document. The file may be empty, corrupted, encrypted, or contain unsupported content."
            )

        if (
            working_file != file_path
            and
            os.path.exists(
                working_file
            )
        ):
            os.remove(
                working_file
            )

        return markdown

    except Exception as e:

        print(
            "MARKITDOWN ERROR"
        )

        print(str(e))

        raise