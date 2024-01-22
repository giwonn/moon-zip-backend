import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { RESPONSE_STATUS } from '@/common/constant/response-status.enum';
import { WinstonClient } from '@/client/logger/winston/winston.client';

@Catch(HttpException)
export class FailExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: WinstonClient) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const statusCode = exception.getStatus();
    if (statusCode === 500) {
      throw exception;
    }

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const message = exception.getResponse()['message'];
    this.logger.warn(`FAIL - ${message}`);

    return response.status(statusCode).json({
      status: RESPONSE_STATUS.FAIL,
      messages: Array.isArray(message) ? message : [message],
      url: request.url,
    });
  }
}
