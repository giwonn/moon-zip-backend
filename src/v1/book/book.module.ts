import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { LibraryRepository } from '../library/library.repository';
import { SentenceRepository } from '../sentence/sentence.repository';
import { toProvider } from '../../libs/util';

@Module({
  controllers: [BookController],
  providers: toProvider(
    BookService,
    BookRepository,
    LibraryRepository,
    SentenceRepository,
  ),
})
export class BookModule {}
