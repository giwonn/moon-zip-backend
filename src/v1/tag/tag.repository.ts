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

  async findByUserId(userId: string): Promise<any> {
    const tagList = await this.prisma.tag.findMany({
      where: {
        userId: userId,
      },
      include: {
        sentence: true,
      },
    });

    const transformedData = tagList.reduce((acc, tag) => {
      let tagData = acc.find((t) => t.name === tag.name);

      if (!tagData) {
        tagData = {
          name: tag.name,
          createdAt: tag.createdAt.toISOString().split('T')[0], // Assuming 'createdAt' is a Date object
          sentence_id_list: [],
        };
        acc.push(tagData);
      }

      tagData.sentence_id_list.push(tag.sentence.seq); // Assuming 'seq' is the sentence ID

      return acc;
    }, []);

    return transformedData;
  }

  async findOne(userId: string, name: string) {
    const tagsWithSentences = await this.prisma.tag.findMany({
      where: {
        userId: userId,
        name: name,
      },
      include: {
        sentence: {
          include: {
            book: true,
          },
        },
      },
    });

    return tagsWithSentences.reduce((acc, tag) => {
      if (!acc[tag.name]) {
        acc[tag.name] = {
          name: tag.name,
          createdAt: tag.createdAt,
          sentences: [],
        };
      }

      acc[tag.name].sentences.push({
        seq: tag.sentence.seq,
        bookId: tag.sentence.bookId,
        content: tag.sentence.content,
        createdAt: tag.sentence.createdAt,
        tag: [tag.name],
        book: {
          id: tag.sentence.bookId,
          title: tag.sentence.book.title,
          authors: tag.sentence.book.authors,
          publisher: tag.sentence.book.publisher,
        },
      });

      return acc;
    }, {});
  }

  async count(userId: string) {
    return this.prisma.tag.count({
      where: {
        userId,
      },
    });
  }
}
