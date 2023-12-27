import { v4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from '@/client/redis/redis.client';
import { User } from '@/v1/user/entities/user.entity';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { CreateSocialUserDto } from '@/v1/social-user/dto/create-social-user.dto';
import { REFRESH_TOKEN_EXPIRATION_TIME } from '@/v1/auth/constant/token.constant';
import type { IAuthService } from '@/v1/auth/port/in/auth.service.interface';
import type { IUserService } from '@/v1/user/port/in/user.service.interface';
import type { ISocialUserService } from '@/v1/social-user/port/in/social-user.service.interface';
import { JwtClient } from '@/client/jwt/jwt.client';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly redisClient: RedisClient,
    private readonly jwtClient: JwtClient,
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

  async rotateToken(refreshToken: string) {
    const { tokenId } = this.jwtClient.decode(refreshToken);
    await this.redisClient.deleteByTokenId(tokenId);

    const userId = await this.redisClient.getUserId(refreshToken);
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
    const payload = { userId };
    const accessToken = this.jwtClient.sign({ payload });
    const refreshToken = this.jwtClient.sign({
      payload: { tokenId: v4() },
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });

    await this.redisClient.addToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }
}
