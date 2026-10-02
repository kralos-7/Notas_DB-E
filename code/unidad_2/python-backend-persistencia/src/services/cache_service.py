import json
import redis
from config.env import config

redis_client = redis.Redis.from_url(config.REDIS_URL)

def obtener_con_cache(key: str, ttl_segundos: int, db_fallback_func):
    cached_data = redis_client.get(key)
    if cached_data:
        return json.loads(cached_data)

    fresh_data = db_fallback_func()
    if fresh_data:
        redis_client.setex(key, ttl_segundos, json.dumps(fresh_data))
    return fresh_data
