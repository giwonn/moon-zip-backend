import { Book } from '../../entities/book.entity';

export interface IBookRepository {
  create(book: Book): Promise<Book>;
  findAll(userId: string): Promise<any>;
  findBook(bookId: string): Promise<any>;
  count(userId: string): Promise<any>;
}
