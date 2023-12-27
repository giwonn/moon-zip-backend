import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from '@songkeys/nestjs-redis';
import { REFRESH_TOKEN_EXPIRATION_TIME } from '@/v1/auth/constant/token.constant';
import { JwtClient } from '@/client/jwt/jwt.client';

@Injectable()
export class RedisClient {
  private readonly redisClient: ReturnType<RedisService['getClient']>;

  constructor(
    private readonly jwtClient: JwtClient,
    private readonly redisService: RedisService,
  ) {
    this.redisClient = this.redisService.getClient();
  }

  async getUserId(tokenId: string) {
    const userId = await this.redisClient.get(tokenId);

    if (!userId) {
      throw new UnauthorizedException('존재하지 않는 로그인 증명입니다.');
    }

    return userId;
  }

  async addToken(tokenId: string, userId: string) {
    await this.redisClient.setex(
      tokenId,
      REFRESH_TOKEN_EXPIRATION_TIME,
      userId,
    );

    console.log('add token:', tokenId);
  }

  async deleteByTokenId(tokenId: string) {
    await this.redisClient.del(tokenId);
    console.log('delete token:', tokenId);
  }
}
