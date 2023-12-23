import { RedisService } from '@songkeys/nestjs-redis';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { CreateSocialUserDto } from '@/v1/social-user/dto/create-social-user.dto';
import type { IAuthService } from '@/auth/port/in/auth.service.interface';
import type { IUserService } from '@/v1/user/port/in/user.service.interface';
import type { ISocialUserService } from '@/v1/social-user/port/social-user.service.interface';
import { REFRESH_TOKEN_EXPIRATION_TIME } from '@/auth/constant/token.constant';
import { v4 } from 'uuid';

type UserInfo = { userId: string };

@Injectable()
export class AuthService implements IAuthService {
  private readonly redisClient: ReturnType<RedisService['getClient']>;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    @Inject('UserService') private readonly userService: IUserService,
    @Inject('SocialUserService')
    private readonly socialUserService: ISocialUserService,
  ) {
    this.redisClient = this.redisService.getClient();
  }

  async socialLogin(createUserDto: CreateUserDto) {
    let user = await this.userService.findOneByEmail(createUserDto.email);

    // 미가입 유저일 경우 회원가입
    if (user === null) {
      user = await this.userService.create(createUserDto);
    }

    // 기존 유저가 다른 기기로 로그인 한 경우 macId 업데이트
    if (user.macId !== createUserDto.macId) {
      await this.userService.update(user.id, { macId: createUserDto.macId });
    }

    // 새로운 소셜로그인일 경우 소셜로그인 정보 생성
    const isRegisteredBySocial = await this.socialUserService.checkRegistered(
      user.id,
      createUserDto.socialType,
    );
    if (!isRegisteredBySocial) {
      const createSocialUserDto = CreateSocialUserDto.from({
        userId: user.id,
        type: createUserDto.socialType,
        id: createUserDto.socialId,
      });
      await this.socialUserService.create(createSocialUserDto);
    }

    const { accessToken, refreshToken } = await this.signLoginToken({
      userId: user.id,
    });

    return await this.rotateTokenAndUpdateRedis(accessToken, refreshToken);
  }

  // access token 재발급
  async rotateToken(oldRefreshToken: string) {
    const user = await this.getUserIdByRefreshToken(oldRefreshToken);

    const { accessToken, refreshToken } = await this.signLoginToken(user);

    // TODO : 3. 레디스에 토큰 업데이트
    return await this.rotateTokenAndUpdateRedis(
      accessToken,
      refreshToken,
      oldRefreshToken,
    );
  }

  async signLoginToken(user: UserInfo) {
    return {
      accessToken: this.signToken({ payload: user }),
      refreshToken: await this.signRefreshToken(user),
    };
  }

  private async getUserIdByRefreshToken(refreshToken: string) {
    // TODO : 1. redis에 리프레쉬 토큰 있는지 조회
    const accessToken = await this.redisClient.get(refreshToken);

    // 유효한 리프레쉬 토큰인데 레디스에 없는 경우
    if (!accessToken) {
      throw new UnauthorizedException('존재하지 않는 로그인 증명입니다.');
    }

    // TODO : 2. redis에서 가져온 액세스토큰 정보에서 페이로드만 빼내서 userId 확보
    return this.jwtService.decode<UserInfo>(accessToken);
  }

  private async signRefreshToken(payload: Record<string, any>) {
    const refreshTokenId = v4();
    const refreshToken = this.signToken({
      payload: { tokenId: refreshTokenId },
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });

    await this.redisClient.setex(
      refreshTokenId,
      REFRESH_TOKEN_EXPIRATION_TIME + 10, // 서버 지연 대비해서 10초 정도 여유시간을 둠
      JSON.stringify(payload),
    );

    return refreshToken;
  }

  // userId만 payload로 제공
  private signToken({
    payload,
    expiresIn,
  }: {
    payload?: Record<string, any>;
    expiresIn?: string | number;
  } = {}) {
    return this.jwtService.sign(payload ?? {}, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: expiresIn ?? '1m',
    });
  }

  async rotateTokenAndUpdateRedis(
    accessToken: string,
    refreshToken: string,
    oldRefreshToken?: string,
  ) {
    const promises: Promise<any>[] = [];

    if (oldRefreshToken) {
      const { tokenId } = this.jwtService.decode(oldRefreshToken);
      const deleteOldRefreshToken = this.redisClient.del(tokenId);
      promises.push(deleteOldRefreshToken);
    }

    const { tokenId: newTokenId } = this.jwtService.decode(refreshToken);
    const setNewToken = this.redisClient.setex(
      newTokenId,
      REFRESH_TOKEN_EXPIRATION_TIME,
      refreshToken,
    );
    promises.push(setNewToken);

    await Promise.all(promises);

    return { accessToken, refreshToken };
  }
}
