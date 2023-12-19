import { Injectable } from '@nestjs/common';
import type { SOCIAL_TYPE } from '@/auth/constant/auth.enum';

@Injectable()
export class SocialAuthContext {
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
