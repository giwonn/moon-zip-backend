import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/v1/user/user.module';
import { SocialUserModule } from '@/v1/social-user/social-user.module';

@Module({
  imports: [UserModule, SocialUserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
