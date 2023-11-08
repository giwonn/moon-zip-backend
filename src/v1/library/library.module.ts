import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { LibraryRepository } from './library.repository';
import { toProvider } from '../../libs/util';

@Module({
  controllers: [LibraryController],
  providers: toProvider(LibraryService, LibraryRepository),
})
export class LibraryModule {}
