from pymongo import MongoClient
from config.env import config

mongo_client = MongoClient(config.MONGO_URI)
db = mongo_client["tienda"]

def guardar_producto_dinamico(producto_data: dict):
    res = db["productos"].insert_one(producto_data)
    return str(res.inserted_id)
