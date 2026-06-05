from markitdown import MarkItDown

from app.services.pdf_detector import (
    is_searchable_pdf
)

from app.services.ocr_service import (
    run_ocr
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

def convert_pdf_to_markdown(file_path):

    try:

        working_file = file_path

        if not is_searchable_pdf(file_path):

            print(
                "Scanned PDF detected. Running OCR..."
            )

            working_file = run_ocr(
                file_path
            )

        md = MarkItDown()

        result = md.convert(
            working_file
        )

        markdown = clean_markdown(
            result.text_content
        )

        if not markdown.strip():

            raise Exception(
                "No meaningful text could be extracted from this PDF. The document may be empty, corrupted, or contain unsupported content."
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