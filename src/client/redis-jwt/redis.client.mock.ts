import { createMockService } from '@/libs/mock';
import { RedisJwtClient } from '@/client/redis-jwt/redis-jwt.client';

export const mockRedisClient = createMockService(RedisJwtClient);
