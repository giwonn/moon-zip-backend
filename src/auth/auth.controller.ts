import { Controller, Headers, Inject, Post } from '@nestjs/common';
import { IAuthService } from './port/in/auth.service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService') private readonly authService: IAuthService,
  ) {}

  @Post('login')
  async login(@Headers('authorization') rawCredentials: string) {}

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
