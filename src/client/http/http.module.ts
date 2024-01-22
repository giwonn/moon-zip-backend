import { Module } from '@nestjs/common';
import { HttpService } from '@/client/http/http.service';
import { FetchClient } from '@/client/http/fetch/fetch.client';

@Module({
  providers: [
    { provide: HttpService, useFactory: () => new HttpService(FetchClient) },
  ],
  exports: [HttpService],
})
export class HttpModule {}
