from openai import OpenAI

from app.config import settings
from app.schemas import Citation, QueryResponse
from app.services.retriever import RetrievalService


class RagService:
    def __init__(self) -> None:
        self.client = OpenAI(api_key=settings.openai_api_key) if settings.openai_api_key else None
        self.retrieval = RetrievalService()

    def answer(self, question: str) -> QueryResponse:
        chunks = self.retrieval.find_relevant_chunks(question)

        if not chunks:
            return QueryResponse(
                answer="No reliable source was found in the approved repository.",
                citations=[],
                reliability="low",
            )

        context = "\n\n".join(f"[{c.chunk_id}] {c.content}" for c in chunks)

        if self.client:
            completion = self.client.chat.completions.create(
                model=settings.chat_model,
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are a controlled administrative assistant. "
                            "Answer only from supplied context. "
                            "If context is insufficient, say no reliable source exists."
                        ),
                    },
                    {"role": "user", "content": f"Question: {question}\nContext:\n{context}"},
                ],
                temperature=0,
            )
            answer = completion.choices[0].message.content or "No response generated."
        else:
            answer = "Draft answer based strictly on retrieved chunks."

        citations = [
            Citation(document_id=c.document_id, page=c.page, chunk_id=c.chunk_id)
            for c in chunks
        ]

        return QueryResponse(answer=answer, citations=citations, reliability="high")
