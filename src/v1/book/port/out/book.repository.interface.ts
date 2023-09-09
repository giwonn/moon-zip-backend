import { Book } from '../../entities/book.entity';

export interface IBookRepository {
  create(book: Book): Promise<Book>;
}
