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

  async findByUserId(userId: string): Promise<Tag[]> {
    const tagList = await this.prisma.tag.findMany({
      where: {
        userId: userId,
      },
    });

    const grouped = {};
    tagList.forEach(data => {
      const key = data.name;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(data);
    });

    console.log(grouped)

    return tagList
  }

  count(userId: string) {
    return this.prisma.tag.count({
      where: {
        userId,
      },
    });
  }
}
