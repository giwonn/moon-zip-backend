import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../../client/prisma/prisma.repository';
import { Book } from './entities/book.entity';
import { IBookRepository } from './port/out/book.repository.interface';

@Injectable()
export class BookRepository implements IBookRepository {
  constructor(private readonly prisma: PrismaRepository) {}
  create(book: Book) {
    return this.prisma.book.create({
      data: book,
    });
  }
}
