import { SocialUser } from '@/v1/social-user/entities/social-user.entity';
import { CreateSocialUserDto } from '@/v1/social-user/dto/create-social-user.dto';

export interface ISocialUserService {
  checkRegistered(userId: string, socialType: string): Promise<boolean>;
  create(socialUserDto: CreateSocialUserDto): Promise<SocialUser>;
}
