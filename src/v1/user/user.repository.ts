import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@/client/prisma/prisma.repository';
import { IUserRepository } from './port/out/user.repository.interface';
import { User } from './entities/user.entity';
import { UpdateUserDto } from '@/v1/user/dto/update-user.dto';
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaRepository) {}
  create(user: User) {
    return this.prisma.user.create({
      data: user,
    });
  }

  async findOneById(userId: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findOneBySocialIdAndSocialType(socialId: string, socialType: string) {
    return this.prisma.user.findFirst({
      where: {
        socialUsers: {
          some: {
            id: socialId,
            type: socialType,
          },
        },
      },
    });
  }

  update(userId: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updateUserDto,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
