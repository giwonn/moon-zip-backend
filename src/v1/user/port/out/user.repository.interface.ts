import { User } from '@/v1/user/entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOneById(userId: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  findUserIdByRefreshToken(
    refreshToken: string,
  ): Promise<Pick<User, 'id'> | null>;
  findOneBySocialIdAndSocialType(
    socialId: string,
    socialType: string,
  ): Promise<User | null>;

  // abstract update(id: number, user: UserEntity): Promise<UserEntity>;
  // abstract remove(id: number): Promise<UserEntity>;
}
