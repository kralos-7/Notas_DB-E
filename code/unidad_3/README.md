# Prácticas de Diseño e Implementación de APIs RESTful
**Tecnologías:** Node.js, Express, MariaDB, OpenAPI / Swagger, Jest, Supertest  

---

## 📋 Requisitos Previos Generales

Antes de ejecutar cualquiera de las prácticas, asegúrate de contar con el siguiente entorno instalado en tu equipo:

1. **Node.js** (Versión 16.0 o superior recomendada). Puedes verificarlo ejecutando:
   ```bash
   node -v
   ```
2. **MariaDB** o **MySQL** en ejecución local o en un servidor accesible.

---

## 🗄️ Configuración de la Base de Datos (MariaDB)

Para las Prácticas 1 y 2, se requiere una base de datos relacional. Ejecuta el siguiente script SQL en tu cliente de MariaDB (como DBeaver, HeidiSQL o la consola CLI) para crear la base de datos, la estructura de tablas y los datos iniciales de prueba:

```sql
CREATE DATABASE IF NOT EXISTS universidad;
USE universidad;

-- Tabla de estudiantes (Utilizada en Práctica 1 y Práctica 2)
CREATE TABLE IF NOT EXISTS estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    edad INT DEFAULT 20,
    carrera VARCHAR(100) NOT NULL
);

-- Tablas relacionales (Utilizadas en Práctica 1 para recursos anidados)
CREATE TABLE IF NOT EXISTS cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS inscripciones (
    estudiante_id INT,
    curso_id INT,
    PRIMARY KEY (estudiante_id, curso_id),
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

-- Inserción de datos de prueba
INSERT INTO estudiantes (nombre, email, edad, carrera) VALUES
('Ana López', 'ana@umar.mx', 21, 'Computacion'),
('Carlos Sánchez', 'carlos@umar.mx', 25, 'Informatica'),
('Beatriz Gómez', 'beatriz@umar.mx', 22, 'Computacion'),
('David Ruiz', 'david@umar.mx', 20, 'Biologia');

INSERT INTO cursos (nombre) VALUES ('Back-End Development'), ('Sistemas Distribuidos');
INSERT INTO inscripciones (estudiante_id, curso_id) VALUES (1, 1), (2, 1), (3, 2);
```

---

## 🚀 Guía de Ejecución por Práctica

### Práctica 1: Modelado de Recursos y Consultas Avanzadas
1. Crea una carpeta llamada `practica1` y coloca dentro los archivos `package.json` y `app.js`.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   npm start
   ```
4. Prueba el filtrado, ordenamiento o paginación en tu navegador o mediante `curl`:
   ```bash
   curl -X GET "http://localhost:3000/api/v1/estudiantes?carrera=Computacion&sort=-nombre"
   ```

---

### Práctica 2: Contratos DTO, Validaciones y Manejo de Errores
1. Crea una carpeta llamada `practica2` y coloca dentro sus archivos `package.json` y `app.js`.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   npm start
   ```
4. Envía una petición de prueba (creación de recurso con DTO y sanitización de datos):
   ```bash
   curl -X POST http://localhost:3000/api/v1/estudiantes \
     -H "Content-Type: application/json" \
     -d '{"nombre": "  Sofía Martínez  ", "email": "SOFIA@UMAR.MX", "edad": 21}'
   ```

---

### Práctica 3: Documentación OpenAPI y Pruebas Automatizadas
1. Crea una carpeta llamada `practica3` y coloca dentro los 5 archivos necesarios: `package.json`, `openapi.yaml`, `app.js`, `server.js` y `profesores.test.js`.
2. Instala las dependencias (incluyendo las librerías de desarrollo para pruebas):
   ```bash
   npm install
   ```
3. Inicia el servidor para consultar la interfaz interactiva de Swagger UI:
   ```bash
   npm start
   ```
   Abre en tu navegador la ruta: `http://localhost:3000/api-docs`

4. Ejecuta la suite de pruebas de integración automatizadas con Jest y Supertest:
   ```bash
   npm test
   ```
