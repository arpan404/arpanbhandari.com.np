import Redis from 'ioredis';

// Create a new Redis instance to connect to the Redis server and use it in the app
const redis = new Redis({
  host: process.env.NEXT_REDIS_HOST || '127.0.0.1',
  port: process.env.NEXT_REDIS_PORT
    ? Number(process.env.NEXT_REDIS_PORT)
    : 6379,
  password: process.env.NEXT_REDIS_PASSWORD || '',
  db: Number(process.env.NEXT_REDIS_DB) || 0,
});

export default redis;
