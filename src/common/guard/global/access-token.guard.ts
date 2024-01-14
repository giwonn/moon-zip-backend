import {
  BadRequestException,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { BearerTokenGuard } from '@/common/guard/bearer-token.guard';

/**
 * auth 엔드포인트를 제외한 모든 엔드포인트에서 사용됨
 */
@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const path = request.route.path;

    // 액세스 토큰이 필요 없는 요청
    if (path.startsWith('/auth/')) {
      return true;
    }

    if (
      process.env.NODE_ENV === 'development' &&
      !request.headers.authorization
    ) {
      return this.devAuthenticate(request);
    }

    // BearerTokenGuard 검증
    try {
      await super.canActivate(context);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('만료된 access 토큰입니다.');
      }
    }

    // AccessTokenGuard 검증
    if (request.type !== 'access') {
      throw new UnauthorizedException('access 토큰이 아닙니다.');
    }

    return true;
  }

  devAuthenticate(request: any) {
    if (!request.headers.user_id) {
      throw new BadRequestException(
        'dev환경에서는 액세스토큰 미사용시 header에 user_id라는 key로 userId를 넣어주어야 합니다.',
      );
    }

    request.userId = request.headers.user_id;

    return true;
  }
}
