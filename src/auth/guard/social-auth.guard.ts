import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SocialInfoDto } from '@/auth/dto/social-info.dto';
import { SocialAuthContext } from '@/auth/guard/social-auth.context';

@Injectable()
export class SocialAuthGuard implements CanActivate {
  constructor(
    @Inject('SocialAuthContext')
    private readonly socialAuthContext: SocialAuthContext,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { socialType, socialId } = await this.getLoginInfo(request.body);

    const authenticatedBySocialAuth = await this.socialAuthContext.authenticate(
      socialType,
      socialId,
    );

    if (!authenticatedBySocialAuth) {
      throw new UnauthorizedException(
        `소셜 로그인 동의를 하지 않은 ${socialType} 계정입니다.`,
      );
    }

    return true;
  }

  private async getLoginInfo(body: any) {
    const loginInfoDto = plainToInstance(SocialInfoDto, body);

    const errors = await validate(loginInfoDto);
    if (errors.length > 0) {
      throw new UnauthorizedException(
        errors.flatMap((error) => Object.values(error.constraints)),
      );
    }

    return loginInfoDto;
  }
}
