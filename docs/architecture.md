# Controlled Office Assistant Architecture

## Goal

Support official administrative operations with a constrained retrieval-augmented generation (RAG) assistant where all outputs are reviewable, auditable, and human-approved.

## High-level components

- **React frontend (`apps/web`)**
  - Role-based login shell (staff/reviewer/admin)
  - Query UI with citation rendering
  - Draft + approval views
  - Task/deadline tracking dashboard

- **FastAPI backend (`backend`)**
  - Document ingestion (PDF/DOCX)
  - Text extraction/OCR hook point
  - Embedding generation (OpenAI)
  - Semantic retrieval (pgvector target)
  - Answer synthesis with hard grounding constraints
  - Classification + drafting + approval endpoints
  - Audit logging for every AI operation

- **PostgreSQL + pgvector**
  - `documents`, `document_chunks`, `chunk_embeddings`
  - `drafts`, `approvals`, `tasks`
  - `audit_logs`

## Control flow rules

1. User query enters with authenticated role context.
2. Retriever returns top approved chunks from repository.
3. If retrieval confidence is insufficient, system returns: no reliable source.
4. If sufficient context exists, answer generation uses only retrieved chunks.
5. API returns answer + citations (`document_id`, `page`, `chunk_id`).
6. Every query and draft event is written to audit log.
7. Every draft remains `pending_approval` until reviewer/admin action.
8. Dispatch integrations must reject non-approved drafts.

## Security and governance guardrails

- RBAC enforced at route and action level.
- Immutable audit trail for question, retrieved chunks, output, and actor.
- No non-cited response accepted by API contract.
- Manual approval checkpoint required before any outbound communication.
