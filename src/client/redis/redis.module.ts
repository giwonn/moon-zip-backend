import { Module, Global } from '@nestjs/common';
import { RedisModule as NestjsRedisModule } from '@songkeys/nestjs-redis';
import { RedisClient } from '@/client/redis/redis.client';

@Global()
@Module({
  imports: [
    NestjsRedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
  ],
  exports: [RedisClient],
  providers: [RedisClient],
})
export class RedisModule {}
