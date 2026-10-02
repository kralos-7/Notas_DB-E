import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT: int = int(os.getenv("PORT", 8000))
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    MONGO_URI: str = os.getenv("MONGO_URI", "mongodb://localhost:27017")

config = Config()
