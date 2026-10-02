import { createClient } from 'redis';
import { config } from '../config/env.js';

const redisClient = createClient({ url: config.redisUrl });
redisClient.on('error', (err) => console.error('Redis Client Error', err));

export async function initRedis() {
  if (!redisClient.isOpen) await redisClient.connect();
}

export async function obtenerConCache(key, ttlSegundos, dbFallback) {
  const cached = await redisClient.get(key);
  if (cached) return JSON.parse(cached);

  const freshData = await dbFallback();
  if (freshData) {
    await redisClient.setEx(key, ttlSegundos, JSON.stringify(freshData));
  }
  return freshData;
}
