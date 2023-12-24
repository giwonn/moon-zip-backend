import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService as NestjsRedisService } from '@songkeys/nestjs-redis';
import { JwtService } from '@nestjs/jwt';
import { REFRESH_TOKEN_EXPIRATION_TIME } from '@/v1/auth/constant/token.constant';

@Injectable()
export class RedisService {
  private readonly redisClient: ReturnType<NestjsRedisService['getClient']>;

  constructor(
    private readonly redisService: NestjsRedisService,
    private readonly jwtService: JwtService,
  ) {
    this.redisClient = this.redisService.getClient();
  }

  async getUserId(refreshToken: string) {
    const { tokenId } = this.jwtService.decode(refreshToken);
    const userId = await this.redisClient.get(tokenId);

    if (!userId) {
      throw new UnauthorizedException('존재하지 않는 로그인 증명입니다.');
    }

    return userId;
  }

  async addToken(userId: string, refreshToken: string) {
    const { tokenId } = this.jwtService.decode(refreshToken);
    await this.redisClient.setex(
      tokenId,
      REFRESH_TOKEN_EXPIRATION_TIME,
      userId,
    );

    console.log('add token:', tokenId);
  }

  async deleteToken(refreshToken: string) {
    const { tokenId } = this.jwtService.decode(refreshToken);
    if (!tokenId) return;

    await this.redisClient.del(tokenId);
    console.log('delete token:', tokenId);
  }
}
