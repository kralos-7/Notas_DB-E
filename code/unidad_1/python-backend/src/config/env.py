import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT: int = int(os.getenv("PORT", 8000))
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    API_SECRET: str = os.getenv("API_SECRET", "")

    if not DATABASE_URL:
        raise ValueError("ERROR CRÍTICO: FALTA LA VARIABLE DATABASE_URL EN EL ENTORNO")

config = Config()
