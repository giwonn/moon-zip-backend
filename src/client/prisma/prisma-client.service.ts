import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { LoggerClientService } from '@/client/logger/logger-client.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaClientService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>
  implements OnModuleInit
{
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerClientService,
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
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
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

    this.$on('error', (event) => {
      this.loggerService.debug(event.target);
    });

    await this.$connect();
  }
}
