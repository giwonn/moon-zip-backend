import { User } from '@prisma/client';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOneById(userId: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  findUserIdByRefreshToken(
    refreshToken: string,
  ): Promise<Pick<User, 'id' | null>>;

  // abstract update(id: number, user: UserEntity): Promise<UserEntity>;
  // abstract remove(id: number): Promise<UserEntity>;
}
