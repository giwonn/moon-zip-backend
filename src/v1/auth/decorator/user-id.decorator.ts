import {
  createParamDecorator,
  InternalServerErrorException,
} from '@nestjs/common';

export const UserId = createParamDecorator((_, ctx) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.userId) {
    throw new InternalServerErrorException(
      'UserId 데코레이터를 사용하려면 TokenGuard가 선행되어야 합니다.',
    );
  }

  return request.userId;
});
