import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisService } from '@/client/redis/redis.service';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
abstract class BearerTokenGuard implements CanActivate {
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization: rawToken } = request.headers;

    if (!rawToken) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    const token = this.extractTokenFromHeader(rawToken);
    const payload = await this.verifyToken(token);

    if (payload.userId) {
      request.userId = payload.userId;
    } else {
      request.refreshToken = token;
    }

    return true;
  }

  extractTokenFromHeader(rawToken: string) {
    const splitToken = rawToken.split(' ');
    if (splitToken.length !== 2 || splitToken[0] !== 'Bearer') {
      throw new UnauthorizedException(
        'Invalid Token - token format must be "Bearer {token}"',
      );
    }

    const [, token] = splitToken;

    return token;
  }

  async verifyToken<T extends Record<string, any>>(token: string) {
    try {
      return this.jwtService.verify<T>(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (e) {
      await this.redisService.deleteToken(token);

      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('만료된 토큰입니다.');
      }

      throw new UnauthorizedException('잘못된 토큰입니다.');
    }
  }
}

@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    if (!request.userId || request.tokenId) {
      throw new UnauthorizedException('access 토큰이 아닙니다.');
    }

    return true;
  }
}

@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    if (request.userId || !request.tokenId) {
      throw new UnauthorizedException('refresh 토큰이 아닙니다.');
    }

    return true;
  }
}
