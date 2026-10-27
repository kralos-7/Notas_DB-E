const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'universidad',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

function validarCrearEstudiante(req, res, next) {
  let { nombre, email, edad } = req.body;
  let errores = [];

  if (typeof nombre === 'string') req.body.nombre = nombre.trim();
  if (typeof email === 'string') req.body.email = email.trim().toLowerCase();

  if (!req.body.nombre || req.body.nombre.length < 3) {
    errores.push({ campo: 'nombre', mensaje: 'El nombre es obligatorio y debe tener al menos 3 caracteres.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!req.body.email || !emailRegex.test(req.body.email)) {
    errores.push({ campo: 'email', mensaje: 'Formato de correo electrónico inválido.' });
  }

  if (edad === undefined || typeof edad !== 'number' || edad < 18) {
    errores.push({ campo: 'edad', mensaje: 'La edad debe ser un número entero mayor o igual a 18.' });
  }

  if (errores.length > 0) {
    return res.status(422).json({
      estado: 'error',
      codigo: 'ERROR_VALIDACION',
      detalles: errores
    });
  }
  next();
}

app.post('/api/v1/estudiantes', validarCrearEstudiante, async (req, res, next) => {
  try {
    const { nombre, email, edad } = req.body;

    const [result] = await pool.query(
      'INSERT INTO estudiantes (nombre, email, edad, carrera) VALUES (?, ?, ?, ?)',
      [nombre, email, edad, 'Informática']
    );

    const estudianteDtoSalida = {
      id: result.insertId,
      nombre,
      email,
      edad
    };

    res.status(201).json({
      estado: 'exito',
      datos: estudianteDtoSalida
    });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error('[Error de Aplicación]:', err);

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      estado: 'error',
      codigo: 'RECURSO_DUPLICADO',
      mensaje: 'El correo electrónico ingresado ya se encuentra registrado.'
    });
  }

  res.status(500).json({
    estado: 'error',
    codigo: 'ERROR_SERVIDOR_INTERNO',
    mensaje: 'Ocurrió un error inesperado en el servidor.'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Práctica 2 ejecutándose en http://localhost:${PORT}`);
});
