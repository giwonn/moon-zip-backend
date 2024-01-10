import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SocialAuthGuard } from '@/common/guard/social-auth.guard';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { UserId } from '@/common/decorator/user-id.decorator';
import { RefreshTokenGuard } from '@/common/guard/refresh-token.guard';
import type { IAuthService } from '@/v1/auth/port/in/auth.service.interface';
import type { IUserService } from '@/v1/user/port/in/user.service.interface';
import { SocialUser } from '@/common/decorator/social-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService') private readonly authService: IAuthService,
    @Inject('UserService') private readonly userService: IUserService,
  ) {}

  @Post('login')
  @UseGuards(SocialAuthGuard) // 로그인 요청 받으면 유효한 소셜로그인 정보인지 검증
  async login(@SocialUser() createUserDto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(createUserDto.email);
    if (!user) {
      return await this.authService.register(createUserDto);
    }

    return await this.authService.login(user, createUserDto);
  }

  @Post('logout')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@UserId() userId: string) {
    await this.authService.logout(userId);
  }

  @Post('token/rotate')
  @UseGuards(RefreshTokenGuard)
  async rotateToken(@UserId() userId: string) {
    return await this.authService.rotateToken(userId);
  }
}
