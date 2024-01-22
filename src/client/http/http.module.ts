import { Module } from '@nestjs/common';
import { HttpClientService } from '@/client/http/http-client.service';
import { FetchService } from '@/client/http/fetch/fetch.service';

@Module({
  providers: [{ provide: HttpClientService, useClass: FetchService }],
  exports: [HttpClientService],
})
export class HttpModule {}
