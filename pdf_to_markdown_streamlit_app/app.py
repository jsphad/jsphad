"""Local Streamlit app for converting PDF files to Markdown."""

from __future__ import annotations

import io
import re
import zipfile
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable

import streamlit as st

from converter.pdf_to_md import convert_pdf_to_markdown

APP_DIR = Path(__file__).resolve().parent
OUTPUT_DIR = APP_DIR / "outputs"
TEMP_DIR = APP_DIR / "temp"
LOG_DIR = APP_DIR / "logs"
LOG_FILE = LOG_DIR / "conversion_log.txt"
MAX_PREVIEW_CHARS = 20_000
SAFE_FILENAME_PATTERN = re.compile(
    r"^[A-Za-z0-9][A-Za-z0-9 ._()\-]*\.pdf$", re.IGNORECASE
)
WINDOWS_RESERVED_NAMES = {
    "CON",
    "PRN",
    "AUX",
    "NUL",
    *(f"COM{index}" for index in range(1, 10)),
    *(f"LPT{index}" for index in range(1, 10)),
}


@dataclass(frozen=True)
class ConversionResult:
    """Result data for one converted PDF."""

    original_name: str
    output_name: str
    output_path: Path
    markdown_text: str


def ensure_app_directories() -> None:
    """Create local runtime directories if they are missing."""
    for directory in (OUTPUT_DIR, TEMP_DIR, LOG_DIR):
        directory.mkdir(parents=True, exist_ok=True)
    LOG_FILE.touch(exist_ok=True)


def log_conversion(message: str) -> None:
    """Append a timestamped conversion event to the local log file."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with LOG_FILE.open("a", encoding="utf-8") as log_file:
        log_file.write(f"[{timestamp}] {message}\n")


def is_safe_pdf_filename(file_name: str) -> bool:
    """Return True when a PDF file name is safe to save on Windows locally."""
    name = Path(file_name).name
    stem = Path(name).stem.upper()

    if name != file_name:
        return False
    if not SAFE_FILENAME_PATTERN.fullmatch(name):
        return False
    if name.endswith((" ", ".")):
        return False
    if stem in WINDOWS_RESERVED_NAMES:
        return False
    return True


def validate_uploaded_pdf(uploaded_file) -> list[str]:
    """Validate an uploaded PDF before saving or converting it."""
    errors: list[str] = []

    if uploaded_file is None:
        return ["No file was uploaded."]

    file_name = getattr(uploaded_file, "name", "")
    file_size = getattr(uploaded_file, "size", 0)

    if not file_name:
        errors.append("Uploaded file is missing a file name.")
    elif Path(file_name).suffix.lower() != ".pdf":
        errors.append(f"{file_name}: file extension must be .pdf.")
    elif not is_safe_pdf_filename(file_name):
        errors.append(
            f"{file_name}: file name is not safe for local saving. "
            "Use letters, numbers, spaces, dots, underscores, hyphens, or parentheses."
        )

    if file_size == 0:
        errors.append(f"{file_name or 'Uploaded file'}: file size is zero bytes.")

    return errors


def unique_path(directory: Path, file_name: str) -> Path:
    """Return a non-conflicting path in a directory."""
    candidate = directory / file_name
    if not candidate.exists():
        return candidate

    stem = candidate.stem
    suffix = candidate.suffix
    counter = 2
    while True:
        candidate = directory / f"{stem}_{counter}{suffix}"
        if not candidate.exists():
            return candidate
        counter += 1


def save_uploaded_pdf(uploaded_file) -> Path:
    """Save a Streamlit uploaded file into the local temp directory."""
    target_path = unique_path(TEMP_DIR, Path(uploaded_file.name).name)
    target_path.write_bytes(uploaded_file.getbuffer())
    return target_path


def convert_uploaded_files(uploaded_files: Iterable) -> tuple[list[ConversionResult], list[str]]:
    """Convert uploaded PDFs and collect user-friendly error messages."""
    results: list[ConversionResult] = []
    errors: list[str] = []

    for uploaded_file in uploaded_files:
        validation_errors = validate_uploaded_pdf(uploaded_file)
        if validation_errors:
            errors.extend(validation_errors)
            for validation_error in validation_errors:
                log_conversion(f"VALIDATION ERROR - {validation_error}")
            continue

        try:
            pdf_path = save_uploaded_pdf(uploaded_file)
            markdown_text = convert_pdf_to_markdown(str(pdf_path))
            output_path = unique_path(OUTPUT_DIR, f"{pdf_path.stem}.md")
            output_path.write_text(markdown_text, encoding="utf-8")

            result = ConversionResult(
                original_name=uploaded_file.name,
                output_name=output_path.name,
                output_path=output_path,
                markdown_text=markdown_text,
            )
            results.append(result)
            log_conversion(f"SUCCESS - {uploaded_file.name} -> {output_path.name}")
        except Exception as exc:  # noqa: BLE001
            # Catch conversion errors so one bad PDF does not stop the whole batch.
            message = f"{uploaded_file.name}: conversion failed ({exc})"
            errors.append(message)
            log_conversion(f"ERROR - {message}")

    return results, errors


def build_zip(results: list[ConversionResult]) -> bytes:
    """Create an in-memory ZIP archive containing converted Markdown files."""
    zip_buffer = io.BytesIO()
    used_names: set[str] = set()

    with zipfile.ZipFile(zip_buffer, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for result in results:
            archive_name = result.output_name
            if archive_name in used_names:
                archive_name = f"{result.output_path.stem}_{len(used_names) + 1}.md"
            used_names.add(archive_name)
            archive.writestr(archive_name, result.markdown_text)

    return zip_buffer.getvalue()


def initialize_session_state() -> None:
    """Initialize Streamlit session state used by the app."""
    if "conversion_results" not in st.session_state:
        st.session_state.conversion_results = []
    if "conversion_errors" not in st.session_state:
        st.session_state.conversion_errors = []


def render_sidebar() -> None:
    """Render local usage notes in the sidebar."""
    st.sidebar.header("Local-only app")
    st.sidebar.write(
        "PDF files are processed on this computer and are not uploaded to a cloud service by this app."
    )
    st.sidebar.write(f"Markdown outputs are saved in `{OUTPUT_DIR.name}/`.")
    st.sidebar.write(f"Conversion logs are saved in `{LOG_FILE.relative_to(APP_DIR)}`.")


def render_results(results: list[ConversionResult]) -> None:
    """Render Markdown previews and download buttons."""
    if not results:
        return

    st.success(f"Converted {len(results)} PDF file(s) successfully.")

    for index, result in enumerate(results, start=1):
        with st.expander(
            f"{index}. {result.original_name} → {result.output_name}", expanded=index == 1
        ):
            preview_text = result.markdown_text
            if len(preview_text) > MAX_PREVIEW_CHARS:
                preview_text = (
                    preview_text[:MAX_PREVIEW_CHARS]
                    + "\n\n<!-- Preview truncated in the app. Download the Markdown file for the full output. -->"
                )
                st.info(
                    "Preview is truncated for display speed. The download contains the full Markdown file."
                )

            st.markdown("#### Markdown preview")
            st.text_area(
                label=f"Preview for {result.output_name}",
                value=preview_text,
                height=360,
                label_visibility="collapsed",
            )
            st.download_button(
                label=f"Download {result.output_name}",
                data=result.markdown_text.encode("utf-8"),
                file_name=result.output_name,
                mime="text/markdown",
            )

    if len(results) > 1:
        st.download_button(
            label="Download all Markdown files as ZIP",
            data=build_zip(results),
            file_name="converted_markdown_files.zip",
            mime="application/zip",
        )


def main() -> None:
    """Run the Streamlit application."""
    ensure_app_directories()
    st.set_page_config(
        page_title="PDF to Markdown Converter", page_icon="📄", layout="wide"
    )
    initialize_session_state()
    render_sidebar()

    st.title("📄 PDF to Markdown Converter")
    st.write(
        "Upload one or more PDF files and convert them into Markdown locally using `pymupdf4llm`. "
        "No OpenAI API, cloud upload, database, or login is required."
    )

    uploaded_files = st.file_uploader(
        "Choose PDF file(s)",
        type=["pdf"],
        accept_multiple_files=True,
        help="Select one PDF or multiple PDFs. File names must be safe for local Windows saving.",
    )

    if uploaded_files:
        st.caption(f"Selected {len(uploaded_files)} file(s).")

    if st.button("Convert PDF(s) to Markdown", type="primary", disabled=not uploaded_files):
        with st.spinner("Converting PDF file(s)..."):
            results, errors = convert_uploaded_files(uploaded_files)
            st.session_state.conversion_results = results
            st.session_state.conversion_errors = errors

    if st.session_state.conversion_errors:
        st.error("Some files could not be converted.")
        for error in st.session_state.conversion_errors:
            st.warning(error)

    render_results(st.session_state.conversion_results)

    with st.expander("Where are my files saved?"):
        st.write(f"Converted Markdown files are saved locally in: `{OUTPUT_DIR}`")
        st.write(f"Uploaded PDFs are temporarily saved locally in: `{TEMP_DIR}`")
        st.write(f"Conversion logs are written to: `{LOG_FILE}`")


if __name__ == "__main__":
    main()
