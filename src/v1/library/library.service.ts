import { Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { LibraryRepository } from '@/v1/library/library.repository';

@Injectable()
export class LibraryService {
  constructor(private readonly libraryRepository: LibraryRepository) {}

  async create(createLibraryDto: CreateLibraryDto) {
    return await this.libraryRepository.create(createLibraryDto.to());
  }

  async getBookCount(userId: string) {
    return await this.libraryRepository.getBookCount(userId);
  }
}
