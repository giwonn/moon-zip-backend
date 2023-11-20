import { Sentence } from '../../entities/sentence.entity';

export interface ISentenceRepository {
  create(sentence: Sentence): Promise<Sentence>;
  findByUserId(userId: string): Promise<Sentence[]>;
  count(userId: string): Promise<number>;
  recommend(userId: string): Promise<any>;
}
