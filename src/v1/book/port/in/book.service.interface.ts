import { Book } from '../../entities/book.entity';
import { CreateBookDto } from '../../dto/create-book.dto';

export interface IBookService {
  create(createBookDto: CreateBookDto): Promise<Book>;
}
