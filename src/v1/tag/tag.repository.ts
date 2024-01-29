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

  async findByUserId(userId: string) {
    return await this.prisma.tag.findMany({
      where: {
        sentenceTag: {
          some: {
            sentence: {
              libraryBook: {
                library: {
                  userId,
                },
              },
            },
          },
        },
      },
    });
  }

  // async findOneBySentence(userId: string, name: string) {
  //   const tagsWithSentences = await this.prisma.tag.findMany({
  //     where: {
  //       userId: userId,
  //       name: name,
  //     },
  //     include: {
  //       sentence: {
  //         include: {
  //           book: true,
  //         },
  //       },
  //     },
  //   });
  //
  //   return tagsWithSentences.reduce((acc, tag) => {
  //     if (!acc[tag.name]) {
  //       acc[tag.name] = {
  //         name: tag.name,
  //         createdAt: tag.createdAt,
  //         sentences: [],
  //       };
  //     }
  //
  //     acc[tag.name].sentences.push({
  //       seq: tag.sentence.seq,
  //       bookId: tag.sentence.bookId,
  //       content: tag.sentence.content,
  //       createdAt: tag.sentence.createdAt,
  //       tag: [tag.name],
  //       book: {
  //         id: tag.sentence.bookId,
  //         title: tag.sentence.book.title,
  //         authors: tag.sentence.book.authors,
  //         publisher: tag.sentence.book.publisher,
  //       },
  //     });
  //
  //     return acc;
  //   }, {});
  // }
  //
  // async count(userId: string) {
  //   return this.prisma.tag.count({
  //     where: {
  //       userId,
  //     },
  //   });
  // }

  // async findRecent(userId: string) {
  //   const tagsWithSentences = await this.prisma.tag.findMany({
  //     where: {
  //       userId: userId,
  //     },
  //     // include: {
  //     //   sentence: {
  //     //     include: {
  //     //       book: true,
  //     //     },
  //     //   },
  //     // },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //     take: 5,
  //   });
  //   return tagsWithSentences;
  // }
}
