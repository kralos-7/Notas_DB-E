import { MongoClient } from 'mongodb';
import { config } from '../config/env.js';

const client = new MongoClient(config.mongoUri);

export async function guardarProductoDinamico(productoData) {
  await client.connect();
  const db = client.db('tienda');
  const coleccion = db.collection('productos');
  const res = await coleccion.insertOne({ ...productoData, creadoEn: new Date() });
  return res.insertedId;
}
