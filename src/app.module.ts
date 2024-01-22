import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenGuard } from '@/pipeline/guard/global/access-token.guard';
import { HttpLoggerMiddleware } from '@/pipeline/middleware/morgan.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessResponseInterceptor } from '@/pipeline/interceptor/success-response.interceptor';
import { ErrorExceptionFilter } from '@/pipeline/filter/error-exception.filter';
import { FailExceptionFilter } from '@/pipeline/filter/fail-exception.filter';
import { SchedulerModule } from '@/scheduler/scheduler.module';
import { ClientModule } from '@/client/client.module';
import { ApiV1Module } from '@/v1/api-v1.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientModule,
    ApiV1Module,
    SchedulerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: FailExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
