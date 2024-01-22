import { createMockService } from '@/libs/mock';
import { RedisCacheService } from '@/client/cache-server/redis/redis-cache.service';

export const mockRedisCacheClient = createMockService(RedisCacheService);
