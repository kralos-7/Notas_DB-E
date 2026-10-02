import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  redisUrl: process.env.REDIS_URL,
  mongoUri: process.env.MONGO_URI
};
