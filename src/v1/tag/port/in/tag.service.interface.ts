import { Tag } from '../../entities/tag.entity';
import { CreateTagDto } from '../../dto/create-tag.dto';

export interface ITagService {
  create(createTagDto: CreateTagDto): Promise<Tag>;
  createSentenceTag(sentenceSeq: number, tagSeq: number): Promise<void>;
}
