import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/client/prisma/prisma.service';
import type { SocialUser } from '@/v1/social-user/entities/social-user.entity';
@Injectable()
export class SocialUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(socialUser: SocialUser) {
    return this.prisma.socialUser.create({
      data: socialUser,
    });
  }

  async findManyByUserId(userId: string): Promise<SocialUser[]> {
    return await this.prisma.socialUser.findMany({
      where: {
        userId,
      },
    });
  }

  async findOneByUserIdAndType(
    userId: string,
    type: string,
  ): Promise<SocialUser | null> {
    return await this.prisma.socialUser.findUnique({
      where: {
        userId_type: {
          userId,
          type,
        },
      },
    });
  }
}
