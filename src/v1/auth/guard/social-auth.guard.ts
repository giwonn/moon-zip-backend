import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { SOCIAL_TYPE } from '@/v1/auth/constant/auth.enum';
import type { CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class SocialAuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { socialType, socialId } = await this.getLoginInfo(request.body);

    const authenticationStatusCode = await this.authenticate(
      socialType,
      socialId,
    );

    // TODO : 이것도 따로 나눠야할듯... 로직 한가운데 들어갈만한 코드는 아님
    const error = {
      400: `${socialType} 소셜 로그인을 실패하였습니다.`,
      401: `${socialType} API 호출 인증 오류`,
      403: `${socialType} API 권한 부족으로 인한 요청 거절`,
      500: `${socialType} 서버와 통신이 원활하지 않습니다. 다른 소셜로그인을 이용해주세요.`,
      502: `${socialType} 서버와 통신이 원활하지 않습니다. 다른 소셜로그인을 이용해주세요.`,
      503: `${socialType} 서버와 통신이 원활하지 않습니다. 다른 소셜로그인을 이용해주세요.`,
    };

    // TODO : Exception도 필터 추가해서 공통화해줘야함.
    if (error[authenticationStatusCode]) {
      new HttpException(
        error[authenticationStatusCode],
        authenticationStatusCode,
      );
    }

    return true;
  }

  private async getLoginInfo(body: any) {
    const loginInfoDto = plainToInstance(CreateUserDto, body);

    const errors = await validate(loginInfoDto);
    if (errors.length > 0) {
      throw new UnauthorizedException(
        errors.flatMap((error) => Object.values(error.constraints ?? {})),
      );
    }

    return loginInfoDto;
  }
  async authenticate(socialType: SOCIAL_TYPE, socialId: string) {
    const strategy: Record<SOCIAL_TYPE, (_: string) => Promise<number>> = {
      kakao: this.kakaoAuthenticate,
      naver: this.naverAuthenticate,
    };

    return await strategy[socialType](socialId);
  }

  async kakaoAuthenticate(socialId: string) {
    const uri = `https://kapi.kakao.com/v2/user/me?target_id=${socialId}&target_id_type=user_id`;
    const result = await fetch(uri, {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    return result.status;
  }

  async naverAuthenticate(socialId: string) {
    return 400;
  }
}
