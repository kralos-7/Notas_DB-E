# Practicas: Persistencia de Datos y Gestion de Estado

Este directorio contiene la estructura completa para Node.js y Python.

## Estructura Node.js
- `src/db/pgPool.js`: Pool PostgreSQL, Sentencias Preparadas y Transacciones.
- `src/repositories/`: Uso de Prisma ORM evadiendo N+1 y SQL Nativo.
- `src/services/cacheService.js`: Cache-Aside con Redis.
- `src/db/mongoClient.js`: Cliente MongoDB.

## Estructura Python
- `src/db/pg_pool.py`: ThreadedConnectionPool Psycopg2.
- `src/models/models.py`: Modelos SQLAlchemy 2.0.
- `src/repositories/user_repository.py`: Repository Pattern con joinedload.
- `src/services/cache_service.py`: Redis client con expiracion.
