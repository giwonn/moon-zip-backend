import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { ITagRepository } from './port/out/tag.repository.interface';

@Injectable()
export class TagService {
  constructor(
    @Inject('TagRepository')
    private readonly tagRepository: ITagRepository,
  ) {}

  async create(createTagDto: CreateTagDto) {
    return await this.tagRepository.create(createTagDto.to());
  }

  async count(userId: string) {
    return await this.tagRepository.count(userId);
  }

  async findByUserId(userId: string) {
    return await this.tagRepository.findByUserId(userId);
  }
}
