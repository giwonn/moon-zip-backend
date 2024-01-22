import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { LoggerClientService } from '@/client/logger/logger-client.service';

@Injectable()
export class WinstonClient extends LoggerClientService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super();
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  http(message: string) {
    this.logger.http(message);
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  warn(message: any, context?: string) {
    this.logger.warn(message, { context });
  }

  error(message: any, meta?: { trace?: string; context?: string }) {
    this.logger.error(message, meta);
  }
}
