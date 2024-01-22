import { Module, Global } from '@nestjs/common';
import { RedisModule } from '@songkeys/nestjs-redis';
import { RedisJwtService } from '@/client/jwt-server/redis/redis-jwt.service';

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
  exports: [RedisJwtService],
  providers: [RedisJwtService],
})
export class RedisJwtModule {}
