import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RESPONSE_STATUS } from '@/common/constant/response-status.enum';
import { LoggerClient } from '@/client/logger/logger.client';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerClient) {}
  catch(exception: any, host: ArgumentsHost) {
    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : 500;
    if (statusCode !== 500) {
      throw exception;
    }

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    this.logger.error(
      exception instanceof InternalServerErrorException
        ? exception.message
        : exception,
    );

    return response.status(statusCode).json({
      status: RESPONSE_STATUS.ERROR,
      message: 'Internal Server Error',
      url: request.url,
    });
  }
}