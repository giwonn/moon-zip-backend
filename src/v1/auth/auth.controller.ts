import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { SocialAuthGuard } from '@/v1/auth/guard/social-auth.guard';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { RefreshToken } from '@/v1/auth/decorator/refresh-token.decorator';
import type { IAuthService } from './port/in/auth.service.interface';
import { RefreshTokenGuard } from '@/v1/auth/guard/bearer-token.guard';
import { IUserService } from '@/v1/user/port/in/user.service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService') private readonly authService: IAuthService,
    @Inject('UserService') private readonly userService: IUserService,
  ) {}

  @Post('login')
  @UseGuards(SocialAuthGuard) // 로그인 요청 받으면 guard로 socialId로 유효한 소셜로그인 정보인지 검증
  async login(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(createUserDto.email);
    if (!user) {
      return await this.authService.register(createUserDto);
    }

    return await this.authService.login(user, createUserDto);
  }

  @Post('token/rotate')
  @UseGuards(RefreshTokenGuard)
  async rotateToken(@RefreshToken() refreshToken: string) {
    return await this.authService.rotateToken(refreshToken);
  }
}
