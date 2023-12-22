import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './client/prisma/prisma.module';
import { UserModule } from './v1/user/user.module';
import { BookModule } from './v1/book/book.module';
import { SentenceModule } from './v1/sentence/sentence.module';
import { TagModule } from './v1/tag/tag.module';
import { LibraryModule } from './v1/library/library.module';
import { AuthModule } from '@/auth/auth.module';
import { SocialUserModule } from './social-user/social-user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    BookModule,
    SentenceModule,
    TagModule,
    LibraryModule,
    AuthModule,
    SocialUserModule,
  ],
})
export class AppModule {}
