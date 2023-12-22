import { User } from '@prisma/client';
import { CreateUserDto } from '../../dto/create-user.dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<User>;
  findOne(userId: string): Promise<User | null>;
  verifyByToken(refreshToken: string): Promise<Pick<User, 'id'> | null>;
  findOneByEmail(email: string): Promise<User | null>;
  // abstract update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity>;
  // abstract remove(id: number): Promise<UserEntity>;
}
