# Practica: Pool de conexiones con Node.js y MariaDB

## Objetivo

Implementar una aplicación en Node.js que utilice un pool
de conexiones para consultar e insertar registros en una
base de datos MariaDB.

## Requisitos

- Node.js instalado.
- MariaDB instalado y en ejecución.
- Base de datos `practica_pool`.
- Tabla `estudiantes`.

## Instalación

Clonar o descargar el proyecto y entrar al directorio:

```bash
cd practica-pool-mariadb
```

Instalar las dependencias:

```bash
npm install
```

## Configuración

Editar el archivo `.env` con los datos de conexión
de MariaDB:

```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_USER=alumno
DB_PASSWORD=tu_contrasena
DB_NAME=practica_pool
```

## Preparar la base de datos

Ejecutar las instrucciones SQL proporcionadas en
`database.sql`.

## Ejecución

Iniciar la aplicación:

```bash
npm start
```

La aplicación debe mostrar los estudiantes registrados,
insertar un nuevo registro y consultar el registro insertado.

## Actividades

1. Ejecutar la aplicación y comprobar su funcionamiento.
2. Cambiar el nombre y la carrera del estudiante insertado.
3. Agregar una consulta que muestre todos los registros.
4. Explicar para qué sirve `connectionLimit`.
5. Explicar por qué se utiliza `?` en las consultas SQL.

## Evidencias

Entregar capturas de pantalla de:

- La tabla `estudiantes` en MariaDB.
- La ejecución de la aplicación.
- Los resultados de las consultas.
- La inserción del nuevo registro.
