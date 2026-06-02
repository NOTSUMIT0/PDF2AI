from markitdown import MarkItDown


def convert_pdf_to_markdown(file_path: str):

    try:

        md = MarkItDown()

        result = md.convert(file_path)

        return result.text_content

    except Exception as e:

        print("MARKITDOWN ERROR:")
        print(str(e))

        raise e