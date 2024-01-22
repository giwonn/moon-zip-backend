import { Injectable } from '@nestjs/common';
import { CreateSocialUserDto } from '@/v1/social-user/dto/create-social-user.dto';
import { SocialUserRepository } from '@/v1/social-user/social-user.repository';

@Injectable()
export class SocialUserService {
  constructor(private readonly socialUserRepository: SocialUserRepository) {}

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
