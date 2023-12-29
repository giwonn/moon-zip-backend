import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/client/prisma/prisma.module';
import { UserModule } from '@/v1/user/user.module';
import { BookModule } from '@/v1/book/book.module';
import { SentenceModule } from '@/v1/sentence/sentence.module';
import { TagModule } from '@/v1/tag/tag.module';
import { LibraryModule } from '@/v1/library/library.module';
import { AuthModule } from '@/v1/auth/auth.module';
import { SocialUserModule } from '@/v1/social-user/social-user.module';
import { RedisModule } from '@/client/redis/redis.module';
import { JwtModule } from '@/client/jwt/jwt.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from '@/v1/auth/guard/bearer-token.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
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
})
export class AppModule {
  static register(): DynamicModule {
    const providers: any[] = [];

    if (process.env.NODE_ENV !== 'development') {
      providers.push({
        provide: APP_GUARD,
        useClass: AccessTokenGuard,
      });
    }

    return {
      module: AppModule,
      providers: providers,
      exports: providers,
    };
  }
}
