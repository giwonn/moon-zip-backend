import { Inject, Injectable } from '@nestjs/common';
import { JwtServerService } from '@/client/jwt-server/jwt-server.service';
import { User } from '@/v1/user/entities/user.entity';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { CreateSocialUserDto } from '@/v1/social-user/dto/create-social-user.dto';
import type { IAuthService } from '@/v1/auth/port/in/auth.service.interface';
import type { IUserService } from '@/v1/user/port/in/user.service.interface';
import type { ISocialUserService } from '@/v1/social-user/port/in/social-user.service.interface';
import { JwtClient } from '@/client/jwt/jwt.client';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly redisClient: JwtServerService,
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

  async logout(userId: string) {
    await this.redisClient.delete(userId);
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    await this.addSocialUser(user.id, createUserDto);

    return await this.updateToken(user.id);
  }

  async rotateToken(userId: string) {
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
    const accessToken = this.jwtClient.signAccessToken(userId);
    const refreshToken = this.jwtClient.signRefreshToken(userId);

    await this.redisClient.addToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }
}
