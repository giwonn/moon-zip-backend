import { Module, Global } from '@nestjs/common';
import { RedisModule } from '@songkeys/nestjs-redis';
import { RedisCacheClient } from '@/client/redis-cache/redis-cache.client';

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
  exports: [RedisCacheClient],
  providers: [RedisCacheClient],
})
export class RedisCacheModule {}
