import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository } from './port/out/user.repository.interface';
import { IUserService } from './port/in/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto.to());
  }

  findOne(userId: string) {
    return this.userRepository.findOne(userId);
  }

  async verifyByToken(refreshToken: string) {
    const user = await this.userRepository.findUserIdByRefreshToken(
      refreshToken,
    );
    if (!user)
      throw new UnauthorizedException('토큰으로 조회 가능한 유저가 없습니다.');

    return user;
  }

  // findOneByRefreshToken(refreshToken: string) {
  //   return this.userRepository.findOneByRefreshToken(refreshToken);
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
