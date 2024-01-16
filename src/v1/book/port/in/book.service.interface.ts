import { Book } from '../../entities/book.entity';
import { CreateBookDto } from '../../dto/create-book.dto';

export interface IBookService {
  create(createBookDto: CreateBookDto, userId: string): Promise<Book>;
  search(target: string, query: string): Promise<Book>;
  findAll(userId: string): Promise<any>;
  findOne(bookId: string, userId: string): Promise<any>;
  findBook(bookId: string): Promise<any>;
  count(userId: string): Promise<any>;
}
