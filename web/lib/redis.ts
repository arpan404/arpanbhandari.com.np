import Redis from 'ioredis';

const redisURL = process.env.NEXT_REDIS_URL || 'redis://localhost:6379';
// Create a new Redis instance to connect to the Redis server and use it in the app
const redis = new Redis(redisURL);

export default redis;
