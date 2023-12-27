import {
  createParamDecorator,
  InternalServerErrorException,
} from '@nestjs/common';

export const TokenId = createParamDecorator((_, ctx) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.tokenId) {
    throw new InternalServerErrorException(
      'TokenId 데코레이터를 사용하려면 RefreshTokenGuard가 선행되어야 합니다.',
    );
  }

  return request.tokenId;
});
