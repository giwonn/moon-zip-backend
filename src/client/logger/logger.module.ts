import { Module } from '@nestjs/common';
import { WinstonService } from '@/client/logger/winston/winston.service';
import { LoggerService } from '@/client/logger/logger.service';
import { WinstonModule } from '@/client/logger/winston/winston.module';

@Module({
  imports: [WinstonModule],
  providers: [{ provide: LoggerService, useClass: WinstonService }],
  exports: [LoggerService],
})
export class LoggerModule {}
