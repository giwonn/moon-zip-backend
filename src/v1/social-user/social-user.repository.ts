import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@/client/prisma/prisma-client.service';
import type { ISocialUserRepository } from '@/v1/social-user/port/out/social-user.repository.interface';
import type { SocialUser } from '@/v1/social-user/entities/social-user.entity';
@Injectable()
export class SocialUserRepository implements ISocialUserRepository {
  constructor(private readonly prisma: PrismaClientService) {}
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
