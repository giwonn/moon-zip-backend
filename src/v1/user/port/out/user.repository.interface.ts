import { User } from '@/v1/user/entities/user.entity';
import { UserWithSocial } from '@/v1/user/entities/user-with-social.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOneById(userId: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  findUserIdByRefreshToken(
    refreshToken: string,
  ): Promise<Pick<User, 'id'> | null>;
  findOneWithSocialInfoByEmail(email: string): Promise<UserWithSocial | null>;

  // abstract update(id: number, user: UserEntity): Promise<UserEntity>;
  // abstract remove(id: number): Promise<UserEntity>;
}
