import { User } from '@/v1/user/entities/user.entity';
import { SocialUser } from '@/v1/social-user/entities/social-user.entity';

export interface ISocialUserRepository {
  create(user: SocialUser): Promise<SocialUser>;
  findManyByUserId(userId: User['id']): Promise<SocialUser[]>;
  findOneByUserIdAndType(
    userId: User['id'],
    type: SocialUser['type'],
  ): Promise<SocialUser | null>;
}
