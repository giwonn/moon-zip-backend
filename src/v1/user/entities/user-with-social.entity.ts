import { SocialUser } from './social-user.entity';
import { User } from './user.entity';

export interface UserWithSocial extends User {
  socialUsers: Pick<SocialUser, 'id' | 'type'>[];
}
