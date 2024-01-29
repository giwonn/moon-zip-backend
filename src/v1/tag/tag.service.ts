import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagRepository } from '@/v1/tag/tag.repository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async create(createTagDto: CreateTagDto) {
    return await this.tagRepository.create(createTagDto.to());
  }

  // async count(userId: string) {
  //   return await this.tagRepository.count(userId);
  // }
  //
  // async findOne(userId: string, name: string) {
  //   return await this.tagRepository.findOne(userId, name);
  // }

  async findByUserId(userId: string) {
    return await this.tagRepository.findByUserId(userId);
  }

  // async findRecent(userId: string) {
  //   return await this.tagRepository.findRecent(userId);
  // }
}
