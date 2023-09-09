import { Sentence } from '../../entities/sentence.entity';

export interface ISentenceRepository {
  create(sentence: Sentence): Promise<Sentence>;
}
