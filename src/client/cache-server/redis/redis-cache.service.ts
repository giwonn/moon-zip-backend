import { Injectable } from '@nestjs/common';
import { RedisService } from '@songkeys/nestjs-redis';
import { CacheServerService } from '@/client/cache-server/cache-server.service';

@Injectable()
export class RedisCacheService extends CacheServerService {
  private readonly redisClient: ReturnType<RedisService['getClient']>;

  constructor(private readonly redisService: RedisService) {
    super();
    this.redisClient = this.redisService.getClient();
  }

  get(key: string) {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string) {
    await this.redisClient.set(key, value);
  }

  async delete(key: string) {
    await this.redisClient.del(key);
  }
}
