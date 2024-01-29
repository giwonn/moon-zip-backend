import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/client/prisma/prisma.service';
import { Sentence } from './entities/sentence.entity';
import { SearchSentenceDto } from '@/v1/sentence/dto/search-sentence.dto';

@Injectable()
export class SentenceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany({
    userId,
    libraryId,
    bookId,
  }: SearchSentenceDto): Promise<Sentence[]> {
    return await this.prisma.sentence.findMany({
      where: {
        libraryBook: {
          library: {
            userId,
          },
          libraryId,
          bookId,
        },
      },
    });
  }

  create(sentence: Sentence) {
    return this.prisma.sentence.create({
      data: sentence,
    });
  }

  // async recommend(userId: string): Promise<any> {
  //   const sentences = await this.prisma.sentence.findMany({
  //     where: {
  //       userId: userId,
  //     },
  //     include: {
  //       book: true,
  //       tags: true,
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //     take: 30,
  //   });
  //
  //   return sentences.map((sentence) => {
  //     return {
  //       seq: sentence.seq,
  //       book: {
  //         id: sentence.book.id,
  //         title: sentence.book.title,
  //         authors: sentence.book.authors,
  //         publisher: sentence.book.publisher,
  //         thumbnailUrl: sentence.book.thumbnailUrl,
  //       },
  //       content: sentence.content,
  //       createdAt: sentence.createdAt.toISOString().split('T')[0],
  //       tags: sentence.tags.map((tag) => tag.name),
  //     };
  //   });
  // }
  //
  // count(userId: string) {
  //   return this.prisma.sentence.count({
  //     where: {
  //       userId,
  //     },
  //   });
  // }
}
