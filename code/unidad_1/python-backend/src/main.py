import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from config.env import config
from routes.user_routes import router as user_router

app = FastAPI(title="Practica Backend Python")

@app.get("/health")
def health_check():
    return {"status": "OK", "port": config.PORT}

app.include_router(user_router)
