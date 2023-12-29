import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { toProvider } from '@/libs/util';
import { UserModule } from '@/v1/user/user.module';
import { UserRepository } from '@/v1/user/user.repository';
import { UserService } from '@/v1/user/user.service';
import { SocialUserService } from '@/v1/social-user/social-user.service';
import { SocialUserRepository } from '@/v1/social-user/social-user.repository';
import { SocialUserModule } from '@/v1/social-user/social-user.module';

@Module({
  imports: [UserModule, SocialUserModule],
  controllers: [AuthController],
  providers: toProvider(
    AuthService,
    UserService,
    UserRepository,
    SocialUserService,
    SocialUserRepository,
  ),
})
export class AuthModule {}
