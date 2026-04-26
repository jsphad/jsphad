from datetime import datetime
from pydantic import BaseModel, Field


class UserContext(BaseModel):
    user_id: str
    role: str


class QueryRequest(BaseModel):
    question: str = Field(min_length=3)
    user: UserContext


class Citation(BaseModel):
    document_id: str
    page: int
    chunk_id: str


class QueryResponse(BaseModel):
    answer: str
    citations: list[Citation]
    reliability: str
    requires_human_approval: bool = True


class DraftRequest(BaseModel):
    prompt: str
    audience: str
    user: UserContext


class DraftResponse(BaseModel):
    draft_id: str
    draft_text: str
    status: str = "pending_approval"


class ApprovalRequest(BaseModel):
    draft_id: str
    reviewer_id: str
    approved: bool
    feedback: str | None = None


class TaskCreate(BaseModel):
    title: str
    due_date: datetime
    owner_id: str


class ClassificationRequest(BaseModel):
    text: str
