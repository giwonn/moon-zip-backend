import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../../client/prisma/prisma.repository';
import { Tag } from './entities/tag.entity';
import { ITagRepository } from './port/out/tag.repository.interface';

@Injectable()
export class TagRepository implements ITagRepository {
  constructor(private readonly prisma: PrismaRepository) {}
  create(tag: Tag) {
    return this.prisma.tag.create({
      data: tag,
    });
  }
}
