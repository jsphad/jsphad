# FastAPI Controlled RAG Backend (Starter)

## Features implemented

- PDF/DOCX upload with text extraction (OCR hook point in extractor service)
- Controlled RAG answer endpoint with mandatory citations
- "No reliable source" fallback if retrieval has no trusted chunks
- Communication classifier module
- Draft generation with mandatory human approval workflow
- Audit log hook for every AI query
- Task/deadline endpoint

## Production TODOs

1. Replace starter retrieval with PostgreSQL + pgvector similarity search.
2. Persist documents/chunks/metadata and audit logs in PostgreSQL.
3. Add OCR pipeline (e.g., Tesseract/Azure Vision) for scanned PDFs.
4. Wire role-based auth (JWT + RBAC middleware).
5. Store approval decisions and enforce no auto-dispatch at transport layer.

## Run

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
