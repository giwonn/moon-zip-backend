import { Injectable } from '@nestjs/common';
import { RedisService } from '@songkeys/nestjs-redis';

@Injectable()
export class RedisCacheClient {
  private readonly redisClient: ReturnType<RedisService['getClient']>;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient();
  }

  get(key: string) {
    return this.redisClient.get(key);
  }

  set(key: string, value: string) {
    return this.redisClient.set(key, value);
  }

  async delete(key: string) {
    return await this.redisClient.del(key);
  }
}
