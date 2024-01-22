import { Module } from '@nestjs/common';
import { JwtModule as NestJsJwtModule } from '@nestjs/jwt';
import { JwtClient } from '@/client/jwt/jwt.client';

@Module({
  imports: [NestJsJwtModule.register({})],
  providers: [JwtClient],
  exports: [JwtClient],
})
export class JwtModule {}
