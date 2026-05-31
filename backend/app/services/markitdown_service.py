from markitdown import MarkItDown


def convert_pdf_to_markdown(file_path: str):
    md = MarkItDown()

    result = md.convert(file_path)

    return result.text_content