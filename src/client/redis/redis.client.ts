import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from '@songkeys/nestjs-redis';
import { REFRESH_TOKEN_EXPIRATION_TIME } from '@/v1/auth/constant/token.constant';

@Injectable()
export class RedisClient {
  private readonly redisClient: ReturnType<RedisService['getClient']>;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient();
  }

  async getRefreshToken(userId: string) {
    const getRefreshToken = await this.redisClient.get(userId);
    if (getRefreshToken === null) {
      throw new UnauthorizedException('존재하지 않는 로그인 증명입니다.');
    }

    return getRefreshToken;
  }

  async addToken(userId: string, refreshToken: string) {
    await this.redisClient.setex(
      userId,
      REFRESH_TOKEN_EXPIRATION_TIME,
      refreshToken,
    );

    console.log(`ADD TOKEN - userId: ${userId}, refreshToken: ${refreshToken}`);
  }

  async delete(userId: string) {
    await this.redisClient.del(userId);
    console.log('delete token:', userId);
  }
}
