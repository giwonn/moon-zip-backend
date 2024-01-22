import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { LibraryRepository } from './library.repository';

@Module({
  controllers: [LibraryController],
  providers: [LibraryService, LibraryRepository],
  exports: [LibraryService, LibraryRepository],
})
export class LibraryModule {}
