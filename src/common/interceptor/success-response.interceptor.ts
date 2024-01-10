import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_STATUS } from '@/common/constant/response-status.enum';

interface Response<T> {
  status: RESPONSE_STATUS.SUCCESS;
  data: T;
}

@Injectable()
export class SuccessResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map<any, Response<T>>((data) => ({
        status: RESPONSE_STATUS.SUCCESS,
        data,
      })),
    );
  }
}
