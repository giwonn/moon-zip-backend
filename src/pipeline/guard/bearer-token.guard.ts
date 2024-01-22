import {
  BadRequestException,
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtClient } from '@/client/jwt/jwt.client';
import { TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export abstract class BearerTokenGuard implements CanActivate {
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
