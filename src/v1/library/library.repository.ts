import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../../client/prisma/prisma.repository';
import { Library } from './entities/library.entity';
import { ILibraryRepository } from './port/out/library.repository.interface';

@Injectable()
export class LibraryRepository implements ILibraryRepository {
  constructor(private readonly prisma: PrismaRepository) {}
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

    return book_id.bookId;
  }

  async getBookCount(userId: string) {
    return await this.prisma.library.count({
      where: {
        userId,
      },
    });
  }
}
