import { Inject, Injectable } from '@nestjs/common';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { ISentenceRepository } from './port/out/sentence.repository.interface';

@Injectable()
export class SentenceService {
  constructor(
    @Inject('SentenceRepository')
    private readonly sentenceRepository: ISentenceRepository,
  ) {}

  async create(createSentenceDto: CreateSentenceDto) {
    return await this.sentenceRepository.create(createSentenceDto.to());
  }

  async findByUserSeq(userSeq: number) {
    return this.sentenceRepository.findByUserSeq(userSeq);
  }
}
