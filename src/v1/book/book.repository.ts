import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../../client/prisma/prisma.repository';
import { Book } from './entities/book.entity';
import { Library } from '../library/entities/library.entity';
import { IBookRepository } from './port/out/book.repository.interface';

@Injectable()
export class BookRepository implements IBookRepository {
  constructor(private readonly prisma: PrismaRepository) {}
  async create(book: Book, userId: string) {
    const createdBook = await this.prisma.book.create({
      data: book,
    });

    const libary = new Library();

    libary.bookId = createdBook.id;
    libary.userId = userId;

    await this.prisma.library.create({ data: libary });

    return createdBook;
  }
}
