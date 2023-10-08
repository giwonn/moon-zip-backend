import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../../client/prisma/prisma.repository';
import { Tag } from './entities/tag.entity';
import { ITagRepository } from './port/out/tag.repository.interface';

@Injectable()
export class TagRepository implements ITagRepository {
  constructor(private readonly prisma: PrismaRepository) {}
  async createSentenceTag(
    sentenceSeq: number,
    tagSeq: number,
  ): Promise<string> {
    await this.prisma.sentenceTag.create({
      data: {
        sentenceSeq,
        tagSeq,
      },
    });
    return 'Success';
  }

  async create(tag: Tag): Promise<Tag> {
    return this.prisma.tag.create({
      data: tag,
    });
  }
}
