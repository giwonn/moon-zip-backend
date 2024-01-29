import { Injectable } from '@nestjs/common';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { SentenceRepository } from '@/v1/sentence/sentence.repository';
import { SearchSentenceDto } from '@/v1/sentence/dto/search-sentence.dto';

@Injectable()
export class SentenceService {
  constructor(private readonly sentenceRepository: SentenceRepository) {}

  async create(createSentenceDto: CreateSentenceDto) {
    return await this.sentenceRepository.create(createSentenceDto.to());
  }

  async findMany(searchSentenceDto: SearchSentenceDto) {
    return this.sentenceRepository.findMany(searchSentenceDto);
  }

  // async findByUserId(userId: string) {
  //   return this.sentenceRepository.findByUserId(userId);
  // }
  //
  // async recommend(userId: string) {
  //   return await this.sentenceRepository.recommend(userId);
  // }
  //
  // async count(userId: string) {
  //   return await this.sentenceRepository.count(userId);
  // }
}
