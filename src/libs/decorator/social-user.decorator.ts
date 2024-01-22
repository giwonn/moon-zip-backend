import {
  createParamDecorator,
  InternalServerErrorException,
} from '@nestjs/common';

export const SocialUser = createParamDecorator((_, ctx) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.createUserDto) {
    throw new InternalServerErrorException(
      'SocialUser 데코레이터를 사용하려면 SocialAuthGuard가 선행되어야 합니다.',
    );
  }

  return request.createUserDto;
});
