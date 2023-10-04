import { Sentence } from '../../entities/sentence.entity';
import { CreateSentenceDto } from '../../dto/create-sentence.dto';

export interface ISentenceService {
  findByUserSeq(userSeq: number): Promise<Sentence[]>;
  create(createSentenceDto: CreateSentenceDto): Promise<Sentence>;
}
