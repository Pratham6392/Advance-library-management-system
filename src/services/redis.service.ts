import Redis from 'ioredis';
import { REDIS_URL } from '../config/constants';

const redis = new Redis(REDIS_URL);

export const redisService = {
  async get(key: string): Promise<string | null> {
    return redis.get(key);
  },

  async set(key: string, value: string, expirationInSeconds?: number): Promise<void> {
    if (expirationInSeconds) {
      await redis.setex(key, expirationInSeconds, value);
    } else {
      await redis.set(key, value);
    }
  },

  async del(key: string): Promise<void> {
    await redis.del(key);
  },
};

