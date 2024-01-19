import { Injectable } from '@nestjs/common';
import { RedisService } from '@songkeys/nestjs-redis';
import { REFRESH_TOKEN_EXPIRATION_TIME } from '@/v1/auth/constant/token.constant';

@Injectable()
export class RedisJwtClient {
  private readonly redisClient: ReturnType<RedisService['getClient']>;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient();
  }

  async getRefreshToken(userId: string) {
    return await this.redisClient.get(userId);
  }

  async addToken(userId: string, refreshToken: string) {
    await this.redisClient.setex(
      userId,
      REFRESH_TOKEN_EXPIRATION_TIME,
      refreshToken,
    );

    console.log('add token -', { userId });
  }

  async delete(userId: string) {
    const deletedCount = await this.redisClient.del(userId);
    if (deletedCount === 0) {
      console.log('token not found -', { userId });
    } else {
      console.log('deleted token -', { userId });
    }
  }
}
