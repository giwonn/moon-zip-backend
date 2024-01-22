import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../../client/prisma/prisma-client.service';
import { Sentence } from './entities/sentence.entity';
import { ISentenceRepository } from './port/out/sentence.repository.interface';

@Injectable()
export class SentenceRepository implements ISentenceRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async findMany(userId: string, bookId: string): Promise<any> {
    const sentences = await this.prisma.sentence.findMany({
      where: {
        bookId,
        userId,
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    return sentences;
  }

  async findByUserId(userId: string): Promise<any> {
    const sentences = await this.prisma.sentence.findMany({
      where: {
        userId: userId,
      },
      include: {
        book: true,
        tags: true,
      },
    });

    return sentences.map((sentence) => {
      return {
        seq: sentence.seq,
        bookId: sentence.book.id,
        content: sentence.content,
        createdAt: sentence.createdAt.toISOString().split('T')[0],
        tags: sentence.tags.map((tag) => tag.name),
      };
    });
  }

  create(sentence: Sentence) {
    return this.prisma.sentence.create({
      data: sentence,
    });
  }

  async recommend(userId: string): Promise<any> {
    const sentences = await this.prisma.sentence.findMany({
      where: {
        userId: userId,
      },
      include: {
        book: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 30,
    });

    return sentences.map((sentence) => {
      return {
        seq: sentence.seq,
        book: {
          id: sentence.book.id,
          title: sentence.book.title,
          authors: sentence.book.authors,
          publisher: sentence.book.publisher,
          thumbnailUrl: sentence.book.thumbnailUrl,
        },
        content: sentence.content,
        createdAt: sentence.createdAt.toISOString().split('T')[0],
        tags: sentence.tags.map((tag) => tag.name),
      };
    });
  }

  count(userId: string) {
    return this.prisma.sentence.count({
      where: {
        userId,
      },
    });
  }
}
