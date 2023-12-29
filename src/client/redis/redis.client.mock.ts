import { createMockService } from '@/libs/mock';
import { RedisClient } from '@/client/redis/redis.client';

export const mockRedisClient = createMockService(RedisClient);
