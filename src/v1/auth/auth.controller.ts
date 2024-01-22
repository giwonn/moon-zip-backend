import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SocialAuthGuard } from '@/pipeline/guard/social-auth.guard';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { UserId } from '@/libs/decorator/user-id.decorator';
import { RefreshTokenGuard } from '@/pipeline/guard/refresh-token.guard';
import { SocialUser } from '@/libs/decorator/social-user.decorator';
import { AuthService } from '@/v1/auth/auth.service';
import { UserService } from '@/v1/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
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
