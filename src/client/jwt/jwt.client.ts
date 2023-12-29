import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME,
} from '@/v1/auth/constant/token.constant';

@Injectable()
export class JwtClient {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private sign({
    payload,
    expiresIn,
  }: {
    payload?: Record<string, any>;
    expiresIn?: string | number;
  } = {}) {
    return this.jwtService.sign(payload ?? {}, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn,
    });
  }

  verify<T extends Record<string, any>>(token: string) {
    return this.jwtService.verify<T>(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  signAccessToken(userId: string) {
    return this.sign({
      payload: {
        type: 'access',
        userId,
      },
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });
  }

  signRefreshToken(userId: string) {
    return this.sign({
      payload: { type: 'refresh', userId },
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });
  }
}
