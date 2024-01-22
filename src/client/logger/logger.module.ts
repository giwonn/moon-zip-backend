import { Global, Module } from '@nestjs/common';
import { WinstonClient } from '@/client/logger/winston/winston.client';
import { LoggerClientService } from '@/client/logger/logger-client.service';
import { WinstonModule } from '@/client/logger/winston/winston.module';

@Global()
@Module({
  imports: [WinstonModule],
  providers: [{ provide: LoggerClientService, useClass: WinstonClient }],
  exports: [LoggerClientService],
})
export class LoggerModule {}
