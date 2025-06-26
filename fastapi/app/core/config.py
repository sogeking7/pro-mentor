from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    DATABASE_URL: str
    SESSION_DURATION_DAYS: int = 3
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str

    ENVIRONMENT: str
    COOKIE_DOMAIN: str

    class Config:
        env_file = ".env"

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT.lower() == "production"

    @property
    def cookie_domain(self) -> str | None:
        return self.COOKIE_DOMAIN if self.is_production else None


settings = Settings()
