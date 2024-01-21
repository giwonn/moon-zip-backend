import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/client/prisma/prisma.module';
import { UserModule } from '@/v1/user/user.module';
import { BookModule } from '@/v1/book/book.module';
import { SentenceModule } from '@/v1/sentence/sentence.module';
import { TagModule } from '@/v1/tag/tag.module';
import { LibraryModule } from '@/v1/library/library.module';
import { AuthModule } from '@/v1/auth/auth.module';
import { SocialUserModule } from '@/v1/social-user/social-user.module';
import { RedisJwtModule } from '@/client/redis-jwt/redis-jwt.module';
import { JwtModule } from '@/client/jwt/jwt.module';
import { AccessTokenGuard } from '@/common/guard/global/access-token.guard';
import { LoggerModule } from '@/client/logger/logger.module';
import { HttpLoggerMiddleware } from '@/common/middleware/morgan.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessResponseInterceptor } from '@/common/interceptor/success-response.interceptor';
import { ErrorExceptionFilter } from '@/common/filter/error-exception.filter';
import { FailExceptionFilter } from '@/common/filter/fail-exception.filter';
import { RedisCacheModule } from '@/client/redis-cache/redis-cache.module';
import { HttpModule } from '@/client/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    LoggerModule,
    RedisJwtModule,
    RedisCacheModule,
    PrismaModule,
    JwtModule,
    UserModule,
    BookModule,
    SentenceModule,
    TagModule,
    LibraryModule,
    AuthModule,
    SocialUserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: FailExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
