import { Module, Global } from '@nestjs/common';
import { RedisModule } from '@songkeys/nestjs-redis';
import { RedisCacheService } from '@/client/cache-server/redis/redis-cache.service';

@Global()
@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_CACHE_HOST,
        password: process.env.REDIS_CACHE_PASSWORD,
      },
    }),
  ],
  exports: [RedisCacheService],
  providers: [RedisCacheService],
})
export class RedisCacheModule {}
