from uuid import uuid4


def create_draft(prompt: str, audience: str) -> dict:
    return {
        "draft_id": str(uuid4()),
        "draft_text": f"Draft for {audience}: {prompt}\n\n[Pending human approval]",
        "status": "pending_approval",
    }


def apply_approval(draft_id: str, approved: bool, feedback: str | None) -> dict:
    return {
        "draft_id": draft_id,
        "status": "approved" if approved else "rejected",
        "feedback": feedback,
    }
