import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<User>;
  findOne(userId: string): Promise<User>;
  verifyByToken(refreshToken: string): Promise<Pick<User, 'id' | null>>;
  // abstract update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity>;
  // abstract remove(id: number): Promise<UserEntity>;
}
