import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggerClient } from '@/client/logger/logger.client';
import * as process from 'process';
import * as WinstonDaily from 'winston-daily-rotate-file';

const timeFormat = winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });
const printFormat = winston.format.printf(
  ({ level, message, label, timestamp }) => {
    return `${timestamp} [${level}] ${
      label ? ' [' + label + ']' : ''
    }${message}`;
  },
);

const transports = () => {
  const arr: any[] = [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
        }),
        winston.format.simple(),
        timeFormat,
        printFormat,
      ),
    }),
  ];

  if (process.env.NODE_ENV !== 'development') {
    arr.push(
      new WinstonDaily({
        level: 'http',
        filename: 'logs/info/%DATE%.log',
        datePattern: 'YYYY-MM-DD',
      }),
      new WinstonDaily({
        level: 'error',
        filename: 'logs/error/%DATE%.log',
        datePattern: 'YYYY-MM-DD',
      }),
    );
  }

  return arr;
};

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(timeFormat, printFormat),
      transports: transports(),
    }),
  ],
  exports: [LoggerClient],
  providers: [LoggerClient],
})
export class LoggerModule {}
