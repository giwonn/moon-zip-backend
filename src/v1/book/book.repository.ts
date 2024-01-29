import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/client/prisma/prisma.service';
import { Book } from './entities/book.entity';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(book: Book) {
    return await this.prisma.book.create({
      data: book,
    });
  }

  async findOne(id: string): Promise<any> {
    return await this.prisma.book.findUnique({
      where: {
        id,
      },
    });
  }

  async findMany(ids: string[]) {
    return await this.prisma.book.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  // async findManyByLibraryIds(libraryIds: string[]) {
  //   return await this.prisma.book.findMany({
  //     where: {
  //       libraryBooks: {
  //         some: {
  //           libraryId: {
  //             in: libraryIds,
  //           },
  //         },
  //       },
  //     },
  //   });
  // }

  async upsert(book: Book) {
    return await this.prisma.book.upsert({
      where: {
        id: book.id,
      },
      update: book,
      create: book,
    });
  }

  async count(userId: string): Promise<any> {
    const count = await this.prisma.library.count({
      where: {
        userId,
      },
    });

    return count;
  }
}
