import {
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
    // 액세스 토큰이 필요 없는 요청
    const request = context.switchToHttp().getRequest();
    const path = request.route.path;

    if (path.startsWith('/auth/')) {
      return true;
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
}
