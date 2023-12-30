import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SOCIAL_TYPE } from '@/v1/auth/constant/auth.enum';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { validate } from 'class-validator';

@Injectable()
export class SocialAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { type, token, macId } = await this.getLoginInfo(request.body);

    const { id, email } = await this.authenticate(type, token);

    const createUserDto = plainToInstance(CreateUserDto, {
      email,
      macId,
      socialId: id,
      socialType: type,
    });

    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new UnauthorizedException(
        errors.flatMap((error) => Object.values(error.constraints ?? {})),
      );
    }

    request.createUserDto = createUserDto;

    return true;
  }

  private async getLoginInfo(body: any) {
    const { type, token, macId } = body;
    if (!type || !token || !macId) {
      throw new UnauthorizedException(
        '소셜 로그인에 필요한 정보가 부족합니다.',
      );
    }

    return { type, token, macId };
  }
  async authenticate(type: SOCIAL_TYPE, token: string) {
    const strategy: Record<
      SOCIAL_TYPE,
      (_: string) => Promise<{ id: string; email: string }>
    > = {
      [SOCIAL_TYPE.KAKAO]: this.kakaoAuthenticate,
      [SOCIAL_TYPE.NAVER]: this.naverAuthenticate,
    };

    return await strategy[type](token);
  }

  async kakaoAuthenticate(token: string) {
    const uri = `https://kapi.kakao.com/v2/user/me`;
    const userResponse = await fetch(
      `${uri}?property_keys=["kakao_account.email"]`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    const error = {
      400: `kakao 소셜 로그인에 실패하였습니다.`,
      401: `kakao API 호출 인증 오류`,
      403: `kakao API 권한 부족으로 인한 요청 거절`,
      500: `kakao 서버와 통신이 원활하지 않습니다. 다른 소셜로그인을 이용해주세요.`,
      502: `kakao 서버와 통신이 원활하지 않습니다. 다른 소셜로그인을 이용해주세요.`,
      503: `kakao 서버와 통신이 원활하지 않습니다. 다른 소셜로그인을 이용해주세요.`,
    };

    if (error[userResponse.status]) {
      throw new HttpException(error[userResponse.status], userResponse.status);
    }

    const userInfo = await userResponse.json();

    return {
      id: userInfo.id.toString(),
      email: userInfo.kakao_account.email,
    };
  }

  async naverAuthenticate(socialId: string) {
    return {
      id: 're',
      email: 're',
    };
  }
}
