import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { IBookRepository } from './port/out/book.repository.interface';

@Injectable()
export class BookService {
  constructor(
    @Inject('BookRepository') private readonly bookRepository: IBookRepository,
  ) {}

  async create(CreateBookDto: CreateBookDto) {
    return await this.bookRepository.create(CreateBookDto.to());
  }

}
