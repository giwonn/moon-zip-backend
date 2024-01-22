import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@/v1/user/entities/user.entity';
import { UpdateUserDto } from '@/v1/user/dto/update-user.dto';
import { UserRepository } from '@/v1/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
}
