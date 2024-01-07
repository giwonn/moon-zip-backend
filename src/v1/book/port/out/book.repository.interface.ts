import { Book } from '../../entities/book.entity';

export interface IBookRepository {
  create(book: Book, userId: string): Promise<Book>;
  findAll(userId: string): Promise<any>;
  findOne(bookId: string, userId: string): Promise<any>;
  findBook(bookId: string): Promise<any>;
  count(userId: string): Promise<any>;
}
