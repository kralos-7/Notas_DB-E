# Migraciones de base de datos con Node.js y MariaDB

Ejemplo didáctico usando **Node.js**, **MariaDB**, **Sequelize 6**, **Sequelize CLI 6** y **dotenv**.

## Objetivo

Aprender a administrar cambios en la estructura de una base de datos mediante archivos de migración, sin ejecutar manualmente cada cambio SQL.

El ejemplo contiene dos migraciones:

1. `crear-estudiantes`: crea la tabla `estudiantes`.
2. `agregar-correo-estudiantes`: agrega la columna `correo`.

Cada migración tiene dos funciones:

- `up()`: aplica el cambio.
- `down()`: revierte el cambio.

> **Advertencia:** `down()` puede eliminar tablas, columnas o datos. Este ejemplo es para una base de datos de práctica, no para ejecutarlo sin revisión en producción.

## Requisitos

- Node.js y npm instalados.
- MariaDB instalado y en ejecución.
- Un usuario de MariaDB con permisos para crear y modificar tablas en la base de datos de práctica.

Comprueba las versiones:

```bash
node --version
npm --version
```

## 1. Crear la base de datos

Entra al cliente de MariaDB:

```bash
mariadb -u root -p
```

Ejecuta:

```sql
CREATE DATABASE escuela_migraciones;
SHOW DATABASES;
EXIT;
```

Si tu instalación usa otro usuario, sustituye `root` por el nombre correspondiente.

## 2. Configurar las variables de entorno

El proyecto usa un archivo `.env` para guardar las credenciales y `config/config.js` para leerlas. No se utiliza `config.json`, porque JSON no interpreta directamente expresiones de JavaScript como `process.env.DB_NAME`.

Crea tu archivo `.env` a partir de la plantilla:

**Linux/macOS:**

```bash
cp .env.example .env
```

**Windows (PowerShell):**

```powershell
Copy-Item .env.example .env
```

Abre `.env` y configura los valores para tu servidor MariaDB. Por ejemplo:

```dotenv
DB_NAME=escuela_migraciones
DB_USER=root
DB_PASSWORD=mi_password
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DIALECT=mariadb
```

Sustituye `mi_password` por la contraseña correspondiente. Si tu usuario no tiene contraseña, deja `DB_PASSWORD=` vacío.

### ¿Cómo funciona?

- `.env`: contiene los valores locales de configuración.
- `dotenv`: carga esos valores en `process.env`.
- `config/config.js`: toma los valores de `process.env` y los entrega a Sequelize CLI.
- `package.json`: define los comandos para ejecutar las migraciones usando esa configuración.

Por ejemplo, `process.env.DB_NAME` obtiene el valor de `DB_NAME` definido en `.env`.

**Seguridad:** no compartas el archivo `.env` ni subas sus credenciales a un repositorio. `.gitignore` ya incluye `.env`. Comparte `.env.example`, que contiene únicamente nombres de variables y valores de ejemplo. Para aplicaciones reales, evita usar `root` y crea un usuario con permisos limitados.

## 3. Instalar dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instala Sequelize, el controlador `mariadb`, Sequelize CLI y `dotenv`.

## 4. Ejecutar las migraciones

Aplica todas las migraciones pendientes:

```bash
npm run migrate
```

Para consultar el estado:

```bash
npm run migrate:status
```

Para revertir la última migración:

```bash
npm run migrate:undo
```

También puedes usar el comando directo, indicando el archivo de configuración:

```bash
npx sequelize-cli db:migrate --config config/config.js
```

La CLI crea la tabla `SequelizeMeta` para registrar qué archivos de migración se han ejecutado. Si vuelves a ejecutar el comando, las migraciones que ya están registradas no se vuelven a aplicar.

## 5. Comprobar el resultado en MariaDB

Entra a la base de datos:

```bash
mariadb -u root -p escuela_migraciones
```

Consulta las tablas:

```sql
SHOW TABLES;
```

Deben aparecer `estudiantes` y `SequelizeMeta`.

Revisa la estructura:

```sql
DESCRIBE estudiantes;
```

Después de ejecutar las dos migraciones, deben aparecer las columnas:

- `id`
- `nombre`
- `createdAt`
- `updatedAt`
- `correo`

Consulta las migraciones registradas:

```sql
SELECT * FROM SequelizeMeta;
```

Sal del cliente:

```sql
EXIT;
```

## 6. Revertir y volver a aplicar una migración

Ejecuta:

```bash
npm run migrate:undo
```

Esto ejecuta el `down()` de la migración más reciente. En este ejemplo elimina la columna `correo`, pero conserva la tabla y el resto de sus columnas.

Compruébalo:

```bash
mariadb -u root -p escuela_migraciones
```

```sql
DESCRIBE estudiantes;
SELECT * FROM SequelizeMeta;
EXIT;
```

Para volver a agregar la columna, ejecuta:

```bash
npm run migrate
```

## 7. ¿Qué hace cada archivo?

```text
ejemplo_migraciones_node_mariadb/
├── config/
│   └── config.js
├── migrations/
│   ├── 20261021160000-crear-estudiantes.js
│   └── 20261021161000-agregar-correo-estudiantes.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

Después de copiar `.env.example` a `.env`, también tendrás el archivo local `.env`; este no debe compartirse.

- `.env`: credenciales y variables de conexión locales; no se comparte.
- `.env.example`: plantilla de variables que sí puedes compartir.
- `config/config.js`: lee las variables de entorno y configura la conexión.
- `migrations/`: cambios de estructura versionados.
- `package.json`: dependencias y comandos abreviados.
- `.gitignore`: evita agregar `node_modules` y `.env` al control de versiones.

## 8. Entender las migraciones

### Primera migración

`crear-estudiantes` crea una tabla con identificador, nombre y marcas de tiempo.

- `queryInterface.createTable(...)` crea la tabla.
- `primaryKey: true` declara la llave primaria.
- `autoIncrement: true` hace que el identificador se genere automáticamente.
- `allowNull: false` impide valores nulos en esa columna.
- `down()` elimina la tabla creada por esa migración.

### Segunda migración

`agregar-correo-estudiantes` modifica una tabla que ya existe.

- `queryInterface.addColumn(...)` agrega `correo`.
- `Sequelize.STRING(150)` define una cadena de hasta 150 caracteres.
- `allowNull: true` permite que los registros existentes no tengan correo.
- `down()` elimina únicamente la columna agregada.

**Regla importante:** una vez que una migración se ha compartido o aplicado en otros entornos, no se recomienda editarla para cambiar su comportamiento. Crea una nueva migración para representar el cambio adicional.

## 9. Actividad para entregar

1. Configura `.env` con las credenciales de tu servidor.
2. Ejecuta las dos migraciones.
3. Adjunta una captura de `DESCRIBE estudiantes`.
4. Muestra el resultado de `SELECT * FROM SequelizeMeta`.
5. Revierte la última migración y comprueba que desaparece `correo`.
6. Ejecuta nuevamente las migraciones.
7. Crea una migración nueva llamada `agregar-semestre` que añada una columna `semestre` de tipo entero (`Sequelize.INTEGER`) y permita inicialmente valores nulos.
8. Implementa también el `down()` de esa nueva migración.
9. Entrega el código de la migración y una breve explicación de `up()` y `down()`.

## Documentación

- [Migraciones de Sequelize 6](https://sequelize.org/docs/v6/other-topics/migrations/)
- [Sequelize CLI](https://github.com/sequelize/cli)
- [dotenv en npm](https://www.npmjs.com/package/dotenv)
- [Conector MariaDB para Node.js](https://mariadb.com/kb/en/about-mariadb-connector-nodejs/)
