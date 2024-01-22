import { createMockService } from '@/libs/mock';
import { RedisJwtService } from '@/client/jwt-server/redis/redis-jwt.service';

export const mockRedisClient = createMockService(RedisJwtService);
