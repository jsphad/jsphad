# Controlled RAG Office Assistant (Starter Monorepo)

A controlled assistant for official administrative workflows with React frontend + FastAPI backend.

## Tech stack

- **Frontend:** React (Vite + TypeScript)
- **Backend:** Python FastAPI
- **Database target:** PostgreSQL + pgvector (integration points scaffolded)
- **AI stack:** OpenAI embeddings + chat model (strict retrieval-grounded answering)

## Modules in this starter

1. Document repository (upload endpoint for PDF/DOCX)
2. Metadata tagging (data model placeholder in retrieval pipeline)
3. Search with citations (document + page + chunk id)
4. Communication classifier
5. Draft note/reply generator
6. Task/deadline tracker

## Strict governance rules encoded

- AI answers only from retrieved chunks.
- Every answer carries source citations.
- If no reliable source exists, the API returns that explicitly.
- No auto-dispatch support.
- Human approval is mandatory for drafts.

## Workspace layout

- `apps/web` — React frontend starter
- `backend` — FastAPI RAG and workflow starter
- `docs/architecture.md` — control-plane and module architecture

## Development

### Frontend

```bash
pnpm install
pnpm dev:web
```

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
