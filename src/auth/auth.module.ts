import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { toProvider } from '@/libs/util';
import { UserModule } from '@/v1/user/user.module';
import { UserRepository } from '@/v1/user/user.repository';
import { SocialAuthGuard } from '@/auth/guard/social-auth.guard';
import { SocialAuthContext } from '@/auth/guard/social-auth.context';

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: toProvider(
    AuthService,
    UserRepository,
    SocialAuthGuard,
    SocialAuthContext,
  ),
})
export class AuthModule {}
