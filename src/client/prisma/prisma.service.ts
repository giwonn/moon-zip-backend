import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { LoggerService } from '@/client/logger/logger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'error' | 'info' | 'warn'
  >
  implements OnModuleInit
{
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });
  }

  async onModuleInit() {
    if (this.configService.get('NODE_ENV') === 'development') {
      this.$on('query', (event) => {
        this.loggerService.debug(`${event.query} ${event.duration}`);
      });
    }

    this.$on('info', (event) => {
      this.loggerService.log(event.message);
    });

    this.$on('warn', (event) => {
      this.loggerService.warn(event.message);
    });

    this.$on('error', (event) => {
      this.loggerService.error(event.message);
    });

    await this.$connect();
  }
}
