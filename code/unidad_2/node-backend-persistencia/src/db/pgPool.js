import pg from 'pg';
import { config } from '../config/env.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: config.dbUrl,
  max: 10,
  idleTimeoutMillis: 30000
});

export async function obtenerUsuarioPorId(id) {
  const text = 'SELECT id, nombre, email FROM usuarios WHERE id = $1';
  const result = await pool.query(text, [id]);
  return result.rows[0] || null;
}

export async function transferirFondos(origenId, destinoId, monto) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('UPDATE cuentas SET saldo = saldo - $1 WHERE id = $2', [monto, origenId]);
    await client.query('UPDATE cuentas SET saldo = saldo + $1 WHERE id = $2', [monto, destinoId]);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
