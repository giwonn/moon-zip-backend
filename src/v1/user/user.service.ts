import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import type { IUserRepository } from './port/out/user.repository.interface';
import type { IUserService } from './port/in/user.service.interface';
import { User } from '@/v1/user/entities/user.entity';
import { UpdateUserDto } from '@/v1/user/dto/update-user.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = createUserDto.toUserEntity();
    return await this.userRepository.create(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneByEmail(email);
  }

  findOne(userId: string) {
    return this.userRepository.findOneById(userId);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(userId, updateUserDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
