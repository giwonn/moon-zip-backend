import { Module } from '@nestjs/common';
import { LibraryBookRepository } from '@/v1/library-book/library-book.repository';

@Module({
  providers: [LibraryBookRepository],
  exports: [LibraryBookRepository],
})
export class LibraryBookModule {}
