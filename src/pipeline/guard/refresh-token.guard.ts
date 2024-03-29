import {
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtClient } from '@/client/jwt/jwt.client';
import { JwtServerService } from '@/client/jwt-server/jwt-server.service';
import { TokenExpiredError } from '@nestjs/jwt';
import { BearerTokenGuard } from '@/pipeline/guard/bearer-token.guard';
import { WinstonService } from '@/client/logger/winston/winston.service';

@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
  constructor(
    readonly jwtClient: JwtClient,
    private readonly redisClient: JwtServerService,
    private readonly loggerClient: WinstonService,
  ) {
    super(jwtClient);
  }

  async canActivate(context: ExecutionContext) {
    // BearerTokenGuard 검증
    try {
      await super.canActivate(context);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('만료된 refresh 토큰입니다.');
      }
    }

    // RefreshTokenGuard 검증
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
