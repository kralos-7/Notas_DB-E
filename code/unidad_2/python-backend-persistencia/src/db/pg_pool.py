import psycopg2
from psycopg2 import pool
from config.env import config

db_pool = pool.ThreadedConnectionPool(1, 10, dsn=config.DATABASE_URL)

def obtener_usuario_por_id(user_id: int):
    conn = db_pool.getconn()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, nombre, email FROM usuarios WHERE id = %s;", (user_id,))
            return cursor.fetchone()
    finally:
        db_pool.putconn(conn)

def transferir_fondos(origen_id: int, destino_id: int, monto: float):
    conn = db_pool.getconn()
    try:
        with conn.cursor() as cursor:
            cursor.execute("UPDATE cuentas SET saldo = saldo - %s WHERE id = %s;", (monto, origen_id))
            cursor.execute("UPDATE cuentas SET saldo = saldo + %s WHERE id = %s;", (monto, destino_id))
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        db_pool.putconn(conn)
