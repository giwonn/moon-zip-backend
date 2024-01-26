import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/client/prisma/prisma.service';
import { Library } from './entities/library.entity';

@Injectable()
export class LibraryRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(library: Library) {
    return this.prisma.library.create({
      data: library,
    });
  }

  async findAll(userId: string) {
    return await this.prisma.library.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.library.findUnique({
      where: {
        id,
      },
    });
  }

  async getBookCount(userId: string) {
    return await this.prisma.library.count({
      where: {
        userId,
      },
    });
  }
}
