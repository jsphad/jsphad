"""PDF-to-Markdown conversion utilities.

The conversion layer is intentionally small so alternative engines, such as OCR
or Docling, can be added later without changing the Streamlit interface.
"""

from pathlib import Path

import pymupdf4llm


def convert_pdf_to_markdown(pdf_path: str) -> str:
    """
    Converts a PDF file into Markdown text using pymupdf4llm.
    Returns markdown text as string.
    """
    source_path = Path(pdf_path)

    if not source_path.exists():
        raise FileNotFoundError(f"PDF file not found: {source_path}")

    if not source_path.is_file():
        raise ValueError(f"PDF path is not a file: {source_path}")

    if source_path.suffix.lower() != ".pdf":
        raise ValueError("Only .pdf files can be converted.")

    markdown_text = pymupdf4llm.to_markdown(str(source_path))

    if not isinstance(markdown_text, str):
        raise TypeError("pymupdf4llm did not return Markdown text.")

    return markdown_text
