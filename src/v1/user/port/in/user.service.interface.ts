import { User } from '@prisma/client';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '@/v1/user/dto/update-user.dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<User>;
  findOne(userId: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Pick<User, 'id'>>;
  // abstract remove(id: number): Promise<UserEntity>;
}
