import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../../client/prisma/prisma.repository';
import { User } from './entities/user.entity';
import { IUserRepository } from './port/out/user.repository.interface';

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
        refreshToken,
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
