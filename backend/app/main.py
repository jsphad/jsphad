from datetime import datetime
from pathlib import Path

from fastapi import FastAPI, File, HTTPException, UploadFile

from app.config import settings
from app.schemas import (
    ApprovalRequest,
    ClassificationRequest,
    DraftRequest,
    DraftResponse,
    QueryRequest,
    QueryResponse,
    TaskCreate,
)
from app.services.audit import log_ai_query
from app.services.classifier import classify_communication
from app.services.extractor import extract_text
from app.services.rag import RagService
from app.services.workflow import apply_approval, create_draft

app = FastAPI(title=settings.app_name)
rag_service = RagService()


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "service": settings.app_name}


@app.post("/query", response_model=QueryResponse)
def query_documents(payload: QueryRequest) -> QueryResponse:
    response = rag_service.answer(payload.question)
    log_ai_query(payload.user.user_id, payload.user.role, payload.question, response.reliability)
    return response


@app.post("/upload")
async def upload_document(file: UploadFile = File(...)) -> dict:
    if not file.filename:
        raise HTTPException(status_code=400, detail="File must have a name")

    suffix = Path(file.filename).suffix.lower()
    if suffix not in {".pdf", ".docx"}:
        raise HTTPException(status_code=400, detail="Only PDF/DOCX allowed")

    upload_path = Path("/tmp") / file.filename
    content = await file.read()
    upload_path.write_bytes(content)

    extracted_text = extract_text(upload_path)
    chunk_count = max(1, len(extracted_text) // 800)

    return {
        "document": file.filename,
        "chars": len(extracted_text),
        "estimated_chunks": chunk_count,
        "status": "ready_for_embedding",
    }


@app.post("/classify")
def classify(payload: ClassificationRequest) -> dict:
    return {"classification": classify_communication(payload.text)}


@app.post("/draft", response_model=DraftResponse)
def draft_reply(payload: DraftRequest) -> DraftResponse:
    draft = create_draft(payload.prompt, payload.audience)
    log_ai_query(payload.user.user_id, payload.user.role, payload.prompt, draft["status"])
    return DraftResponse(**draft)


@app.post("/approval")
def approval(payload: ApprovalRequest) -> dict:
    return apply_approval(payload.draft_id, payload.approved, payload.feedback)


@app.post("/tasks")
def create_task(payload: TaskCreate) -> dict:
    return {
        "task": payload.title,
        "due_date": payload.due_date,
        "owner": payload.owner_id,
        "status": "open",
        "created_at": datetime.utcnow().isoformat(),
    }
