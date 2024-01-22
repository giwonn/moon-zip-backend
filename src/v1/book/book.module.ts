import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { LibraryModule } from '@/v1/library/library.module';
import { SentenceModule } from '@/v1/sentence/sentence.module';

@Module({
  imports: [LibraryModule, SentenceModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
  exports: [BookService, BookRepository],
})
export class BookModule {}
