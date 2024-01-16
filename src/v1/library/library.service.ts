import { Inject, Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { ILibraryRepository } from './port/out/library.repository.interface';

@Injectable()
export class LibraryService {
  constructor(
    @Inject('LibraryRepository')
    private readonly libraryRepository: ILibraryRepository,
  ) {}

  async create(createLibraryDto: CreateLibraryDto) {
    return await this.libraryRepository.create(createLibraryDto.to());
  }

  async getBookCount(userId: string) {
    return await this.libraryRepository.getBookCount(userId);
  }
}
