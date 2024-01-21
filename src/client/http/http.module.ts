import { Global, Module } from '@nestjs/common';
import { HttpClientService } from '@/client/http/http-client.service';
import { FetchService } from '@/client/http/fetch/fetch.service';

@Global()
@Module({
  providers: [{ provide: HttpClientService, useClass: FetchService }],
  exports: [HttpClientService],
})
export class HttpModule {}
