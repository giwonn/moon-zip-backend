import { Module } from '@nestjs/common';
import { JwtServerService } from '@/client/jwt-server/jwt-server.service';
import { RedisJwtModule } from '@/client/jwt-server/redis/redis-jwt.module';
import { RedisJwtService } from '@/client/jwt-server/redis/redis-jwt.service';

@Module({
  imports: [RedisJwtModule],
  providers: [{ provide: JwtServerService, useClass: RedisJwtService }],
  exports: [JwtServerService],
})
export class JwtServerModule {}
