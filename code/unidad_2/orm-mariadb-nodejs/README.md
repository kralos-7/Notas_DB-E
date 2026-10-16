# Ejemplo de ORM con Node.js, Sequelize y MariaDB

Proyecto didáctico de una API REST para administrar productos. Incluye conexión a MariaDB, modelo ORM, validaciones y operaciones CRUD.

## Requisitos

- Node.js 18 o posterior y npm.
- MariaDB Server instalado y funcionando.
- Un cliente de MariaDB, por ejemplo `mariadb`.

Comprueba las instalaciones:

```bash
node --version
npm --version
mariadb --version
```

## Crear la base de datos y el usuario

Ejecuta estas sentencias dentro de la consola SQL. Cambia la contraseña por una propia:

```sql
CREATE DATABASE tienda_orm
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER 'orm_usuario'@'localhost'
  IDENTIFIED BY 'cambia_esta_contrasena';

GRANT ALL PRIVILEGES ON tienda_orm.*
  TO 'orm_usuario'@'localhost';

FLUSH PRIVILEGES;
EXIT;
```

## Instalar el proyecto

```bash
cd orm-mariadb-nodejs
```

Instala las dependencias:

```bash
npm install
```

Copia el archivo de configuración de ejemplo:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales. Por ejemplo:

```dotenv
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=tienda_orm
DB_USER=orm_usuario
DB_PASSWORD=cambia_esta_contrasena
```

No compartas el archivo `.env` ni subas sus contraseñas a Git.

## Ejecutar

Modo normal:

```bash
npm start
```

Modo desarrollo, reinicia cuando cambien los archivos:

```bash
npm run dev
```

Al iniciar, Sequelize verifica la conexión y crea la tabla `productos` si no existe. En este ejemplo se usa `sequelize.sync()` por simplicidad didáctica; para sistemas reales se recomiendan migraciones versionadas y copias de seguridad.

La API estará disponible en:

- `http://localhost:3000/`
- `http://localhost:3000/api/productos`

## Probar la API con curl

### Listar productos

```bash
curl http://localhost:3000/api/productos
```

### Crear un producto

```bash
curl -X POST http://localhost:3000/api/productos \
  -H 'Content-Type: application/json' \
  -d '{
    "nombre": "Teclado",
    "descripcion": "Teclado USB",
    "precio": 350.50,
    "existencia": 12
  }'
```

La respuesta debe incluir el `id` generado por MariaDB. Guarda ese número para las siguientes pruebas.

### Consultar un producto por ID

Sustituye `1` por el ID real:

```bash
curl http://localhost:3000/api/productos/1
```

### Buscar por nombre

```bash
curl 'http://localhost:3000/api/productos?buscar=teclado'
```

### Actualizar un producto

```bash
curl -X PUT http://localhost:3000/api/productos/1 \
  -H 'Content-Type: application/json' \
  -d '{
    "precio": 399.90,
    "existencia": 8
  }'
```

Solo se actualizan los campos enviados entre `nombre`, `descripcion`, `precio` y `existencia`.

### Eliminar un producto

```bash
curl -i -X DELETE http://localhost:3000/api/productos/1
```

Una eliminación correcta responde con HTTP `204 No Content`.

## ¿Dónde está el ORM?

- `src/config/database.js`: configura Sequelize y el dialecto MariaDB.
- `src/models/Producto.js`: define el modelo y sus validaciones. Sequelize lo relaciona con la tabla `productos`.
- `src/routes/productos.js`: usa métodos ORM como `findAll()`, `findByPk()`, `create()`, `save()` y `destroy()`.
- `src/app.js`: configura Express, rutas y manejo de errores.
- `src/server.js`: prueba la conexión, sincroniza el modelo e inicia el servidor.

Ejemplos de equivalencia conceptual:

| Sequelize | Operación equivalente |
|---|---|
| `Producto.findAll()` | `SELECT` |
| `Producto.findByPk(id)` | `SELECT ... WHERE id = ...` |
| `Producto.create(datos)` | `INSERT` |
| `producto.save()` | `UPDATE` |
| `producto.destroy()` | `DELETE` |

El ORM genera las consultas SQL y gestiona el mapeo entre filas y objetos. No significa que SQL desaparezca: conviene entenderlo y revisar las consultas en proyectos reales.

## Modelo de datos

La tabla se crea a partir del modelo con estos campos:

- `id`: entero autoincremental, clave primaria.
- `nombre`: obligatorio, de 2 a 120 caracteres.
- `descripcion`: texto opcional.
- `precio`: decimal no negativo.
- `existencia`: entero no negativo, por defecto 0.
- `creado_en` y `actualizado_en`: marcas de tiempo gestionadas por Sequelize.

## 9. Problemas comunes

**`Access denied for user`**  
Verifica usuario, contraseña y host en `.env`. Prueba la conexión con el cliente `mariadb`.

**`ECONNREFUSED`**  
Comprueba que MariaDB esté activo, que `DB_HOST` y `DB_PORT` sean correctos y que el servidor acepte conexiones en esa interfaz.

**`Unknown database 'tienda_orm'`**  
Crea la base de datos siguiendo el apartado 3.

**El puerto 3000 está ocupado**  
Cambia `PORT` en `.env`, por ejemplo a `3001`.

**La API devuelve `400 Datos inválidos`**  
Revisa el JSON enviado y los mensajes dentro de `detalles`.

## Ejercicios propuestos

1. Agrega un campo `categoria` al modelo.
2. Crea un endpoint `GET /api/productos?minPrecio=100` para filtrar por precio.
3. Agrega paginación con `limit` y `offset`.
4. Crea un modelo `Categoria` y establece una relación uno-a-muchos con `Producto`.
5. Escribe pruebas automatizadas para los endpoints.

