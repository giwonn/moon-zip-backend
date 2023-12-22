import { Module } from '@nestjs/common';
import { toProvider } from '@/libs/util';
import { SocialUserRepository } from '@/v1/social-user/social-user.repository';
import { SocialUserService } from '@/v1/social-user/social-user.service';

@Module({
  providers: toProvider(SocialUserService, SocialUserRepository),
})
export class SocialUserModule {}
