import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SocialAuthGuard } from '@/v1/auth/guard/social-auth.guard';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { UserId } from '@/v1/auth/decorator/user-id.decorator';
import { RefreshTokenGuard } from '@/v1/auth/guard/bearer-token.guard';
import type { IAuthService } from './port/in/auth.service.interface';
import type { IUserService } from '@/v1/user/port/in/user.service.interface';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService') private readonly authService: IAuthService,
    @Inject('UserService') private readonly userService: IUserService,
  ) {}

  @Post('login')
  @UseGuards(SocialAuthGuard) // 로그인 요청 받으면 유효한 소셜로그인 정보인지 검증
  async login(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    const user = await this.userService.findOneByEmail(createUserDto.email);
    if (!user) {
      const token = await this.authService.register(createUserDto);
      return response.status(HttpStatus.CREATED).send(token);
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
