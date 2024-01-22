import { Module } from '@nestjs/common';
import { SocialUserRepository } from '@/v1/social-user/social-user.repository';
import { SocialUserService } from '@/v1/social-user/social-user.service';

@Module({
  providers: [SocialUserService, SocialUserRepository],
  exports: [SocialUserService, SocialUserRepository],
})
export class SocialUserModule {}
