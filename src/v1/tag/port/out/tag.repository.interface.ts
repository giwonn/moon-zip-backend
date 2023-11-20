import { Tag } from '../../entities/tag.entity';

export interface ITagRepository {
  create(tag: Tag): Promise<Tag>;
  count(userId: string): Promise<number>;
  findByUserId(userId: string): Promise<Tag[]>;
  findOne(userId: string, name: string): Promise<any>;
}
