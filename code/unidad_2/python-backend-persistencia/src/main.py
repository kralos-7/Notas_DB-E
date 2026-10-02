import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, HTTPException
from config.env import config
from db.pg_pool import obtener_usuario_por_id
from services.cache_service import obtener_con_cache

app = FastAPI(title="Practica Persistencia Python")

@app.get("/usuarios/{user_id}")
def get_usuario(user_id: int):
    cache_key = f"user:{user_id}"

    def fallback():
        user_tuple = obtener_usuario_por_id(user_id)
        if not user_tuple:
            return None
        return {"id": user_tuple[0], "nombre": user_tuple[1], "email": user_tuple[2]}

    usuario = obtener_con_cache(cache_key, 3600, fallback)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return {"status": "success", "data": usuario}

@app.get("/health")
def health():
    return {"status": "OK", "port": config.PORT}
