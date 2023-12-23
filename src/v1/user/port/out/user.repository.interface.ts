import { User } from '@/v1/user/entities/user.entity';
import { UpdateUserDto } from '@/v1/user/dto/update-user.dto';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOneById(userId: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  findOneBySocialIdAndSocialType(
    socialId: string,
    socialType: string,
  ): Promise<User | null>;
  update(userId: string, user: UpdateUserDto): Promise<Pick<User, 'id'>>;
  // abstract remove(id: number): Promise<UserEntity>;
}
