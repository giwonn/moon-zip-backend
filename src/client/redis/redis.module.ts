import { Module, Global } from '@nestjs/common';
import { RedisModule as NestjsRedisModule } from '@songkeys/nestjs-redis';
import { RedisService } from '@/client/redis/redis.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({}),
    NestjsRedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
  ],
  exports: [RedisService],
  providers: [RedisService],
})
export class RedisModule {}
