import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoggerService } from '@/client/logger/logger.service';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
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
      status: 'error',
      messages: ['Internal Server Error'],
      url: request.url,
    });
  }
}
