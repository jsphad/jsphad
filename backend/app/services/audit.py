from datetime import datetime


def log_ai_query(user_id: str, role: str, question: str, outcome: str) -> dict:
    """Starter audit log hook. Persist this record to PostgreSQL in production."""
    return {
        "timestamp": datetime.utcnow().isoformat(),
        "user_id": user_id,
        "role": role,
        "question": question,
        "outcome": outcome,
    }
