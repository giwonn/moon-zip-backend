import { Inject, Injectable } from '@nestjs/common';
import type { ISocialUserService } from '@/v1/social-user/port/social-user.service.interface';
import { ISocialUserRepository } from '@/v1/social-user/port/social-user.repository.interface';
import { CreateSocialUserDto } from '@/v1/social-user/dto/create-social-user.dto';

@Injectable()
export class SocialUserService implements ISocialUserService {
  constructor(
    @Inject('SocialUserRepository')
    private readonly socialUserRepository: ISocialUserRepository,
  ) {}

  async checkRegistered(userId: string, socialType: string) {
    const socialUser = await this.socialUserRepository.findOneByUserIdAndType(
      userId,
      socialType,
    );

    return Boolean(socialUser);
  }

  async create(createSocialUserDto: CreateSocialUserDto) {
    return await this.socialUserRepository.create(
      createSocialUserDto.toSocialUserEntity(),
    );
  }
}
