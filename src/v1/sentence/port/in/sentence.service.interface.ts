import { Sentence } from '../../entities/sentence.entity';
import { CreateSentenceDto } from '../../dto/create-sentence.dto';

export interface ISentenceService {
  create(createSentenceDto: CreateSentenceDto): Promise<Sentence>;
}
