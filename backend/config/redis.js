// config/redis.js
// Before queue or worker, we create one shared Redis config. Both the queue and worker import this — so they connect to the same Redis instance.

import IORedis from 'ioredis';

// Create one Redis connection and reuse it everywhere
// maxRetriesPerRequest: null is required by BullMQ — don't remove it
const redisConnection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,
});

redisConnection.on('connect', () => {
  console.log('Redis connected');
});

redisConnection.on('error', (err) => {
  console.error('Redis error:', err.message);
});

export default redisConnection;