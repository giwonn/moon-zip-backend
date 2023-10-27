import { Sentence } from '../../entities/sentence.entity';
import { CreateSentenceDto } from '../../dto/create-sentence.dto';

export interface ISentenceService {
  findByUserId(userId: string): Promise<Sentence[]>;
  create(createSentenceDto: CreateSentenceDto): Promise<Sentence>;
  count(userId: string): Promise<number>;
}
