import { Module } from '@nestjs/common';
import { CacheServerService } from '@/client/cache-server/cache-server.service';
import { RedisCacheService } from '@/client/cache-server/redis/redis-cache.service';
import { RedisCacheModule } from '@/client/cache-server/redis/redis-cache.module';

@Module({
  imports: [RedisCacheModule],
  providers: [{ provide: CacheServerService, useClass: RedisCacheService }],
  exports: [CacheServerService],
})
export class CacheServerModule {}
