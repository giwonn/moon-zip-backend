import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/client/prisma/prisma.service';
import { Book } from './entities/book.entity';
import { IBookRepository } from './port/out/book.repository.interface';

@Injectable()
export class BookRepository implements IBookRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(book: Book) {
    const createdBook = await this.prisma.book.create({
      data: book,
    });
    return createdBook;
  }

  async findBook(bookId: string): Promise<any> {
    const book = await this.prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    return book;
  }

  async findAll(userId: string): Promise<any> {
    const bookIds = await this.prisma.library.findMany({
      where: {
        userId,
      },
      select: {
        bookId: true,
      },
    });
    const book_id_array = bookIds.map((book) => book.bookId);
    const books = await this.prisma.book.findMany({
      where: {
        id: {
          in: book_id_array,
        },
      },
    });

    return books;
  }

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
