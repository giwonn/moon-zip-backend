import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/client/prisma/prisma.service';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}
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
    }, [] as any[]);

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

  async findRecent(userId: string) {
    const tagsWithSentences = await this.prisma.tag.findMany({
      where: {
        userId: userId,
      },
      // include: {
      //   sentence: {
      //     include: {
      //       book: true,
      //     },
      //   },
      // },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });
    return tagsWithSentences;
  }
}
