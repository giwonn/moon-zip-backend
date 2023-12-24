import {
  createParamDecorator,
  InternalServerErrorException,
} from '@nestjs/common';

export const RefreshToken = createParamDecorator((_, ctx) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.refreshToken) {
    throw new InternalServerErrorException(
      'RefreshToken 데코레이터를 사용하려면 RefreshTokenGuard가 선행되어야 합니다.',
    );
  }

  return request.refreshToken;
});
