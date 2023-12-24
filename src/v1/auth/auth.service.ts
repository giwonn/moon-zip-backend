import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';
import { RedisService } from '@/client/redis/redis.service';
import { User } from '@/v1/user/entities/user.entity';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { CreateSocialUserDto } from '@/v1/social-user/dto/create-social-user.dto';
import { REFRESH_TOKEN_EXPIRATION_TIME } from '@/v1/auth/constant/token.constant';
import type { IAuthService } from '@/v1/auth/port/in/auth.service.interface';
import type { IUserService } from '@/v1/user/port/in/user.service.interface';
import type { ISocialUserService } from '@/v1/social-user/port/social-user.service.interface';

type UserInfo = { userId: string };

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    @Inject('UserService') private readonly userService: IUserService,
    @Inject('SocialUserService')
    private readonly socialUserService: ISocialUserService,
  ) {}

  async login(user: User, createUserDto: CreateUserDto) {
    if (user.macId !== createUserDto.macId) {
      await this.userService.update(user.id, { macId: createUserDto.macId });
    }

    // 새로운 소셜로그인일 경우 소셜로그인 정보 생성
    const isRegisteredBySocial = await this.socialUserService.checkRegistered(
      user.id,
      createUserDto.socialType,
    );
    if (!isRegisteredBySocial) {
      await this.addSocialUser(user.id, createUserDto);
    }

    return await this.updateToken(user.id);
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    await this.addSocialUser(user.id, createUserDto);

    return await this.updateToken(user.id);
  }

  // access token 재발급
  async rotateToken(refreshToken: string) {
    const userId = await this.redisService.getUserId(refreshToken);

    if (refreshToken) {
      await this.redisService.deleteToken(refreshToken);
    }

    return await this.updateToken(userId);
  }

  async addSocialUser(userId: string, createUserDto: CreateUserDto) {
    const createSocialUserDto = CreateSocialUserDto.from({
      userId: userId,
      type: createUserDto.socialType,
      id: createUserDto.socialId,
    });
    await this.socialUserService.create(createSocialUserDto);
  }

  async updateToken(userId: string) {
    const { accessToken, refreshToken } = this.signLoginToken(userId);

    await this.redisService.addToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }

  signLoginToken(userId: string) {
    const payload = { userId };
    const accessToken = this.signToken({ payload });
    const refreshToken = this.signToken({
      payload: { tokenId: v4() },
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
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
}
