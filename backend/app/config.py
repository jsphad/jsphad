from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Controlled Office Assistant API"
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/office_ai"
    openai_api_key: str = ""
    embedding_model: str = "text-embedding-3-large"
    chat_model: str = "gpt-4.1-mini"
    max_context_chunks: int = 8

    model_config = SettingsConfigDict(env_file=".env", env_prefix="OFFICE_")


settings = Settings()
