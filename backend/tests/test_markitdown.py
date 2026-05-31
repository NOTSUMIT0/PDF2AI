from app.services.markitdown_service import (
    convert_pdf_to_markdown
)

pdf_path = "tests/sample.pdf"

markdown = convert_pdf_to_markdown(pdf_path)

print(markdown)