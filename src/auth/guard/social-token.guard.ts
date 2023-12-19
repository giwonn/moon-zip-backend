import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SocialInfoDto } from '@/auth/dto/social-info.dto';
import type { SNS_TYPE } from '@/auth/dto/social-info.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SocialTokenGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { socialType, socialId } = await this.getLoginInfo(request.body);

    const isRegistered = await this.checkServiceRegisteredInSns(
      socialType,
      socialId,
    );

    if (!isRegistered) {
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

  private async checkServiceRegisteredInSns(
    socialType: string,
    socialId: string,
  ) {
    const validation: Record<SNS_TYPE, (token: string) => Promise<boolean>> = {
      kakao: this.validateKakaoId,
      naver: this.validateNaverId,
    };

    return await validation[socialType](socialId);
  }

  private async validateKakaoId(socialId: string) {
    const uri = `https://kapi.kakao.com/v2/user/me?target_id=${socialId}&target_id_type=user_id`;
    const result = await fetch(uri, {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    return result.ok;
  }

  private async validateNaverId(socialId: string) {
    return true;
  }
}
