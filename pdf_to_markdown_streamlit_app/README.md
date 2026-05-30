# PDF to Markdown Streamlit App

A simple local Streamlit application that converts one or more PDF files into Markdown files using [`pymupdf4llm`](https://pypi.org/project/pymupdf4llm/).

The app is designed for beginner-friendly local use on Windows. It does **not** require an OpenAI API key, ChatGPT API access, a database, a login system, cloud upload, or internet access after installation.

## Features

- Upload a single PDF or multiple PDFs.
- Validate file extension, file size, and local-save-safe file names.
- Convert PDFs to Markdown with `pymupdf4llm`.
- Preview generated Markdown in the browser.
- Download each converted `.md` file.
- Download all converted Markdown files as a ZIP when multiple files are converted.
- Save Markdown outputs locally in `outputs/`.
- Save timestamped conversion logs locally in `logs/conversion_log.txt`.
- Keep conversion logic in `converter/pdf_to_md.py` so OCR or Docling can be added later.

## Project structure

```text
pdf_to_markdown_streamlit_app/
├── app.py
├── requirements.txt
├── README.md
├── converter/
│   ├── __init__.py
│   └── pdf_to_md.py
├── outputs/
│   └── .gitkeep
├── logs/
│   └── conversion_log.txt
└── temp/
    └── .gitkeep
```

## Installation on Windows

Open PowerShell in this project folder and run:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

If PowerShell blocks virtual environment activation, run this once for the current PowerShell session:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

Then activate the virtual environment again.

## Run the app

```powershell
streamlit run app.py
```

Streamlit will open the app in your web browser. If it does not open automatically, copy the local URL from the terminal into your browser.

## How to use

1. Click **Choose PDF file(s)**.
2. Select one or more `.pdf` files.
3. Click **Convert PDF(s) to Markdown**.
4. Review the Markdown preview.
5. Download each `.md` file, or download a ZIP file when multiple PDFs were converted.

## Local files and logs

- Converted Markdown files are saved in `outputs/`.
- Uploaded PDFs are temporarily saved in `temp/`.
- Conversion logs are saved in `logs/conversion_log.txt`.

The app creates these folders automatically if they are missing.

## Notes and limitations

- This minimal version does not include OCR. Scanned PDFs without embedded text may produce limited Markdown output.
- The app validates file names for safe local saving on Windows and rejects unsafe names.
- Future engines such as OCR or Docling can be added behind the converter module without redesigning the Streamlit UI.
