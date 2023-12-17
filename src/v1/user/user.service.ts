import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository } from './port/out/user.repository.interface';
import { PrismaRepository } from '../../client/prisma/prisma.repository';
import { IUserService } from './port/in/user.service.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    private readonly prismaRepository: PrismaRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = createUserDto.toUserEntity();

    return this.prismaRepository.$transaction(async (tx) => {
      return tx.user.create({
        data: user,
      });
      // TODO : socialUser도 추가해줘야함
    });

    // const createdUser = await this.userRepository.create(user);
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
