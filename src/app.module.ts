import { Module } from '@nestjs/common';
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
import { AccessTokenGuard } from '@/common/guard/global/access-token.guard';
import { LoggerModule } from '@/client/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
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
  providers: [AccessTokenGuard],
})
export class AppModule {}
