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

  async findBook(bookId: string): Promise<any> {
    const book = await this.prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    const sentence = await this.prisma.sentence.findMany({
      where: {
        bookId,
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    book['sentences'] = [...sentence];

    book['sentences'] = book['sentences'].map((sentence) => {
      return {
        ...sentence,
        tags: sentence.tags.map((tag) => tag.name),
      };
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
}
