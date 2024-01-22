import { Module } from '@nestjs/common';
import { UserModule } from '@/v1/user/user.module';
import { BookModule } from '@/v1/book/book.module';
import { SentenceModule } from '@/v1/sentence/sentence.module';
import { TagModule } from '@/v1/tag/tag.module';
import { LibraryModule } from '@/v1/library/library.module';
import { AuthModule } from '@/v1/auth/auth.module';
import { SocialUserModule } from '@/v1/social-user/social-user.module';

const v1ApiModules = [
  UserModule,
  BookModule,
  SentenceModule,
  TagModule,
  LibraryModule,
  AuthModule,
  SocialUserModule,
];

@Module({
  imports: v1ApiModules,
  exports: v1ApiModules,
})
export class ApiV1Module {}
