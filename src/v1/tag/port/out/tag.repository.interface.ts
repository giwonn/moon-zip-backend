import { Tag } from '../../entities/tag.entity';

export interface ITagRepository {
  create(tag: Tag): Promise<Tag>;
  createSentenceTag(sentenceSeq: number, tagSeq: number): Promise<string>;
}
