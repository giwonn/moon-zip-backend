import { createMockService } from '@/libs/mock';
import { RedisCacheClient } from '@/client/redis-cache/redis-cache.client';

export const mockRedisCacheClient = createMockService(RedisCacheClient);
