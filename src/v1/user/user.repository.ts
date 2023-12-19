import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@/client/prisma/prisma.repository';
import { IUserRepository } from './port/out/user.repository.interface';
import { User } from '@prisma/client';
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaRepository) {}
  create(user: User) {
    return this.prisma.user.create({
      data: user,
    });
  }

  findOne(userId: string) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }
  findUserIdByRefreshToken(refreshToken: string) {
    return this.prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        // refreshToken,
        //TODO : refresh token으로 조회하는 로직 추가해야하는데.. 이거 레디스로 바꿔야하지않나?
        id: '11',
      },
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
