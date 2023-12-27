import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisClient } from '@/client/redis/redis.client';
import { TokenExpiredError } from '@nestjs/jwt';
import { JwtClient } from '@/client/jwt/jwt.client';

@Injectable()
abstract class BearerTokenGuard implements CanActivate {
  constructor(readonly jwtClient: JwtClient) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = this.extractToken(request.headers.authorization);
    const payload = await this.verify(token);

    if (payload.userId) {
      request.userId = payload.userId;
    } else {
      request.refreshToken = token;
    }

    return true;
  }

  extractToken(authorization?: string) {
    if (!authorization) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    const splitToken = authorization.split(' ');
    if (splitToken.length !== 2 || splitToken[0] !== 'Bearer') {
      throw new UnauthorizedException(
        'Invalid Token - token format must be "Bearer {token}"',
      );
    }

    const [, token] = splitToken;

    return token;
  }

  async verify<T extends Record<string, any>>(token: string) {
    try {
      return this.jwtClient.verify<T>(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new TokenExpiredError('만료된 토큰입니다.', error.expiredAt);
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
  constructor(
    readonly jwtClient: JwtClient,
    private readonly redisService: RedisClient,
  ) {
    super(jwtClient);
  }

  async canActivate(context: ExecutionContext) {
    try {
      await super.canActivate(context);
    } catch (error) {
      const request = context.switchToHttp().getRequest();
      const tokenId = await this.extractTokenId(request.headers.authorization);
      if (tokenId) {
        await this.redisService.deleteByTokenId(tokenId);
      }

      throw error;
    }

    const request = context.switchToHttp().getRequest();
    if (request.userId || !request.tokenId) {
      throw new UnauthorizedException('refresh 토큰이 아닙니다.');
    }

    return true;
  }

  private async extractTokenId(authorization?: string) {
    const token = this.extractToken(authorization);
    const payload = await this.jwtClient.decode(token);

    return payload?.tokenId;
  }
}
