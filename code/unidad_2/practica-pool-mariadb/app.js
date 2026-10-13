
import pool from './database.js';

async function main() {
    let connection;

    try {
        connection = await pool.getConnection();

        console.log('Conexion exitosa con MariaDB.\n');

        const estudiantes = await connection.query(
            'SELECT id, nombre, carrera FROM estudiantes'
        );

        console.log('Lista de estudiantes:');

        estudiantes.forEach((estudiante) => {
            console.log(
                `${estudiante.id} - ${estudiante.nombre} - ${estudiante.carrera}`
            );
        });

        const nombre = 'Carlos';
        const carrera = 'Informatica';

        await connection.query(
            'INSERT INTO estudiantes (nombre, carrera) VALUES (?, ?)',
            [nombre, carrera]
        );

        console.log('\nEstudiante registrado correctamente.');

        const resultado = await connection.query(
            'SELECT id, nombre, carrera FROM estudiantes WHERE nombre = ?',
            [nombre]
        );

        console.log('\nResultado de la consulta:');
        console.log(resultado);

    } catch (error) {
        console.error('Error al trabajar con MariaDB:', error.message);

    } finally {
        if (connection) {
            connection.release();
        }

        await pool.end();
    }
}

main();
