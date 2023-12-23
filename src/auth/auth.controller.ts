import {
  Body,
  Controller,
  Headers,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IAuthService } from './port/in/auth.service.interface';
import { SocialAuthGuard } from '@/auth/guard/social-auth.guard';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService') private readonly authService: IAuthService,
  ) {}

  // TODO : 기존 / 신규 유저 판단 후
  // TODO : 기존 유저 - 유저정보 find 후 토큰 발급하여 리턴
  // TODO : 신규 유저 - 유저정보 create 후 토큰 발급하여 리턴
  @Post('login')
  @UseGuards(SocialAuthGuard) // 로그인 요청 받으면 guard로 socialId로 유효한 소셜로그인 정보인지 검증
  async login(@Body() createUserDto: CreateUserDto) {
    // 유저 로그인 or 회원가입
    const user = await this.authService.socialLogin(createUserDto);
    // 반환된 유저에 대한 토큰 발급
    return {
      accessToken: this.authService.signAccessToken(user),
      refreshToken: this.authService.signRefreshToken(),
    };
  }

  @Post('token/access')
  async rotateAccessToken(@Headers('authorization') rawRefreshToken: string) {
    const token = this.authService.extractTokenFromHeader(rawRefreshToken);
    return await this.authService.rotateAccessToken(token);
  }
  @Post('token/refresh')
  rotateRefreshToken(@Headers('authorization') rawRefreshToken: string) {
    const token = this.authService.extractTokenFromHeader(rawRefreshToken);
    return this.authService.rotateRefreshToken(token);
  }
}
