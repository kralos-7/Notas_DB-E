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

app.get('/api/v1/estudiantes', async (req, res) => {
  try {
    let { carrera, sort = 'id', limit = 10, offset = 0 } = req.query;
    let query = 'SELECT id, nombre, email, carrera FROM estudiantes WHERE 1=1';
    let params = [];

    if (carrera) {
      query += ' AND carrera = ?';
      params.push(carrera);
    }

    const validSorts = ['id', 'nombre', 'carrera'];
    const rawSort = sort.replace('-', '');
    const sortField = validSorts.includes(rawSort) ? rawSort : 'id';
    const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';

    query += ` ORDER BY ${sortField} ${sortOrder} LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);
    res.json({
      estado: 'exito',
      total: rows.length,
      limit: parseInt(limit),
      offset: parseInt(offset),
      datos: rows
    });
  } catch (error) {
    res.status(500).json({ estado: 'error', mensaje: error.message });
  }
});

app.get('/api/v1/cursos/:cursoId/estudiantes', async (req, res) => {
  try {
    const { cursoId } = req.params;
    const [rows] = await pool.query(
      `SELECT e.id, e.nombre, e.email 
       FROM estudiantes e 
       JOIN inscripciones i ON e.id = i.estudiante_id 
       WHERE i.curso_id = ?`,
      [cursoId]
    );
    res.json({ estado: 'exito', curso_id: parseInt(cursoId), datos: rows });
  } catch (error) {
    res.status(500).json({ estado: 'error', mensaje: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Práctica 1 ejecutándose en http://localhost:${PORT}`);
});
