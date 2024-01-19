import { Module, Global } from '@nestjs/common';
import { RedisModule } from '@songkeys/nestjs-redis';
import { RedisJwtClient } from '@/client/redis-jwt/redis-jwt.client';

@Global()
@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_JWT_HOST,
        password: process.env.REDIS_JWT_PASSWORD,
      },
    }),
  ],
  exports: [RedisJwtClient],
  providers: [RedisJwtClient],
})
export class RedisJwtModule {}
