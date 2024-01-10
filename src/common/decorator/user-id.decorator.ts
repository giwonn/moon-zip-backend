import {
  BadRequestException,
  createParamDecorator,
  InternalServerErrorException,
} from '@nestjs/common';

export const UserId = createParamDecorator((_, ctx) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.userId) {
    throw new InternalServerErrorException(
      'UserId 데코레이터를 사용하려면 AccessTokenGuard 또는 RefreshTokenGuard가 선행되어야 합니다.',
    );
  }

  if (process.env.NODE_ENV === 'development') {
    if (!request.query?.userId) {
      throw new BadRequestException(
        'dev환경에서는 Query Parameter로 userId를 넣어주어야 합니다.',
      );
    }

    return request.query?.userId;
  }

  return request.userId;
});
