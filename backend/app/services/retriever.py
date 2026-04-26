from dataclasses import dataclass


@dataclass
class ChunkMatch:
    chunk_id: str
    document_id: str
    page: int
    score: float
    content: str


class RetrievalService:
    """Starter retrieval service. Swap in SQL + pgvector lookup in production."""

    def find_relevant_chunks(self, question: str) -> list[ChunkMatch]:
        if "policy" in question.lower() or "memo" in question.lower():
            return [
                ChunkMatch(
                    chunk_id="chunk_4_2",
                    document_id="policy-handbook.pdf",
                    page=4,
                    score=0.91,
                    content="All external communication requires reviewer approval."
                ),
                ChunkMatch(
                    chunk_id="chunk_1_1",
                    document_id="finance-memo.docx",
                    page=1,
                    score=0.86,
                    content="Budget notices must cite approved circular references."
                ),
            ]
        return []
