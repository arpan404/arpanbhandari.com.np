import Redis from 'ioredis';

const redisURL = 'redis://localhost:6379';
// Create a new Redis instance to connect to the Redis server and use it in the app
const redis = new Redis(redisURL);

export default redis;
