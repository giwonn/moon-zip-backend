import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { SocialAuthGuard } from '@/auth/guard/social-auth.guard';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { RefreshToken } from '@/auth/decorator/refresh-token.decorator';
import type { IAuthService } from './port/in/auth.service.interface';
import { RefreshTokenGuard } from '@/auth/guard/bearer-token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService') private readonly authService: IAuthService,
  ) {}

  @Post('login')
  @UseGuards(SocialAuthGuard) // 로그인 요청 받으면 guard로 socialId로 유효한 소셜로그인 정보인지 검증
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.authService.socialLogin(createUserDto);
  }

  @Post('token/rotate')
  @UseGuards(RefreshTokenGuard)
  async rotateToken(@RefreshToken() refreshToken: string) {
    return await this.authService.rotateToken(refreshToken);
  }
}
