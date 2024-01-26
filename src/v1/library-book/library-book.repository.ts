import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/client/prisma/prisma.service';

@Injectable()
export class LibraryBookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByLibraryIds(libraryIds: string[]) {
    return await this.prisma.libraryBook.findMany({
      where: {
        libraryId: {
          in: libraryIds,
        },
      },
    });
  }

  async findBooks(libraryIds: string[]) {
    return await this.prisma.libraryBook.findMany({
      where: {
        libraryId: {
          in: libraryIds,
        },
      },
    });
  }
}
