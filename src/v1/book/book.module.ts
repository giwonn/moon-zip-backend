import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { toProvider } from '../../libs/util';

@Module({
  controllers: [BookController],
  providers: toProvider(BookService, BookRepository),
})
export class BookModule {}
