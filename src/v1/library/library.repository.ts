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

  async getBookCount(userId: string) {
    return await this.prisma.library.count({
      where: {
        userId,
      },
    });
  }
}
