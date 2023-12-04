import { Book } from '../../entities/book.entity';

export interface IBookRepository {
  create(book: Book, userId: string): Promise<Book>;
}
