CREATE DATABASE IF NOT EXISTS practica_pool;

USE practica_pool;

CREATE TABLE IF NOT EXISTS estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    carrera VARCHAR(100) NOT NULL
);

INSERT INTO estudiantes (nombre, carrera)
VALUES
    ('Juan Lopez', 'Informatica'),
    ('Juan Perez', 'Computacion'),
    ('Juan Garcia', 'Sistemas');
