import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@/client/prisma/prisma.module';
import { CacheServerModule } from '@/client/cache-server/cache-server.module';
import { HttpModule } from '@/client/http/http.module';
import { JwtModule } from '@/client/jwt/jwt.module';
import { JwtServerModule } from '@/client/jwt-server/jwt-server.module';
import { LoggerModule } from '@/client/logger/logger.module';

const modules = [
  CacheServerModule,
  HttpModule,
  JwtModule,
  JwtServerModule,
  LoggerModule,
  PrismaModule,
];

@Global()
@Module({
  imports: modules,
  exports: modules,
})
export class ClientModule {}
