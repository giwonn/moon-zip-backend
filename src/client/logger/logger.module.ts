import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggerClient } from '@/client/logger/logger.client';

const timeFormat = winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });
const printFormat = winston.format.printf(
  ({ level, message, label, timestamp }) => {
    return `${timestamp} |${level}| ${
      label ? ' [' + label + ']' : ''
    }${message}`;
  },
);

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(timeFormat, printFormat),
      transports:
        process.env.NODE_ENV === 'development'
          ? [
              new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                  winston.format.colorize(),
                  winston.format.simple(),
                  timeFormat,
                  printFormat,
                ),
              }),
            ]
          : [
              new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error',
              }),
              new winston.transports.File({
                filename: 'logs/combined.log',
                level: 'http',
              }),
            ],
    }),
  ],
  exports: [LoggerClient],
  providers: [LoggerClient],
})
export class LoggerModule {}
