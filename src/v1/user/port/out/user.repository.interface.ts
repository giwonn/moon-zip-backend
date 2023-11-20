import { User } from '../../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOne(userId: string): Promise<User | null>;
  findUserIdByRefreshToken(
    refreshToken: string,
  ): Promise<Pick<User, 'id' | null>>;

  // abstract update(id: number, user: UserEntity): Promise<UserEntity>;
  // abstract remove(id: number): Promise<UserEntity>;
}
