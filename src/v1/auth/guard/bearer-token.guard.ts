import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { RedisClient } from '@/client/redis/redis.client';
import { JwtClient } from '@/client/jwt/jwt.client';
import type { CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
abstract class BearerTokenGuard implements CanActivate {
  constructor(readonly jwtClient: JwtClient) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = this.extractToken(request.headers.authorization);
    request.token = token;

    const { userId, type } = await this.verify(token);
    if (!userId || !type) {
      throw new UnauthorizedException('payload가 잘못되었습니다.');
    }
    request.userId = userId;
    request.type = type;

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
      if (!(error instanceof TokenExpiredError)) {
        throw new BadRequestException('잘못된 토큰입니다.');
      }

      throw error;
    }
  }
}

@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext) {
    try {
      await super.canActivate(context);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('만료된 access 토큰입니다.');
      }
    }

    const request = context.switchToHttp().getRequest();
    if (request.type !== 'access') {
      throw new UnauthorizedException('access 토큰이 아닙니다.');
    }

    return true;
  }
}

@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
  constructor(
    readonly jwtClient: JwtClient,
    private readonly redisClient: RedisClient,
  ) {
    super(jwtClient);
  }

  async canActivate(context: ExecutionContext) {
    try {
      await super.canActivate(context);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('만료된 refresh 토큰입니다.');
      }
    }

    const request = context.switchToHttp().getRequest();
    if (request.type !== 'refresh') {
      throw new UnauthorizedException('refresh 토큰이 아닙니다.');
    }

    const storedToken = await this.redisClient.getRefreshToken(request.userId);
    if (storedToken !== request.token) {
      throw new UnauthorizedException('현재 사용중인 refresh 토큰이 아닙니다.');
    }

    return true;
  }
}
