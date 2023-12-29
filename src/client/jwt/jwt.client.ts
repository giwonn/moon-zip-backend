import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtClient {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  sign({
    payload,
    expiresIn,
  }: {
    payload?: Record<string, any>;
    expiresIn?: string | number;
  } = {}) {
    return this.jwtService.sign(payload ?? {}, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: expiresIn ?? '7h',
    });
  }

  verify<T extends Record<string, any>>(token: string) {
    return this.jwtService.verify<T>(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  decode(token: string) {
    return this.jwtService.decode(token);
  }

  signAccessToken(userId: string) {
    return this.sign({
      payload: {
        type: 'access',
        userId,
      },
      expiresIn: '2s',
    });
  }

  signRefreshToken(userId: string) {
    return this.sign({
      payload: { type: 'refresh', userId },
      // expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
      expiresIn: '4s',
    });
  }
}
