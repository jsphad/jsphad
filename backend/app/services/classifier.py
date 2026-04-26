def classify_communication(text: str) -> str:
    lowered = text.lower()
    if any(token in lowered for token in ["urgent", "deadline", "escalation"]):
        return "priority_official"
    if "reply" in lowered or "response" in lowered:
        return "reply"
    return "general_admin"
