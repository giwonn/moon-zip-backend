import { Global, Module } from '@nestjs/common';
import { JwtModule as NestJsJwtModule } from '@nestjs/jwt';
import { JwtClient } from '@/client/jwt/jwt.client';

@Global()
@Module({
  imports: [NestJsJwtModule.register({})],
  providers: [JwtClient],
  exports: [JwtClient],
})
export class JwtModule {}
