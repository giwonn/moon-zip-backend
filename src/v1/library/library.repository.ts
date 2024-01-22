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

  async findOne(userId: string, bookId: string): Promise<any> {
    const book_id = await this.prisma.library.findFirst({
      select: {
        bookId: true,
      },
      where: {
        AND: {
          bookId,
          userId,
        },
      },
    });

    return Boolean(book_id);
  }

  async getBookCount(userId: string) {
    return await this.prisma.library.count({
      where: {
        userId,
      },
    });
  }
}
