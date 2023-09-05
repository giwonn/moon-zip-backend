import { User } from '../../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOne(macId: string): Promise<User | null>;
  // abstract update(id: number, user: UserEntity): Promise<UserEntity>;
  // abstract remove(id: number): Promise<UserEntity>;
}
