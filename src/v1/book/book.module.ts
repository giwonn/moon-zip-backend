import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { LibraryModule } from '@/v1/library/library.module';
import { SentenceModule } from '@/v1/sentence/sentence.module';
import { LibraryBookModule } from '@/v1/library-book/library-book.module';

@Module({
  imports: [LibraryModule, SentenceModule, LibraryBookModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
  exports: [BookService, BookRepository],
})
export class BookModule {}
