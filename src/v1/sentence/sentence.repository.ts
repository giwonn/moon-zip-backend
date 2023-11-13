import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../../client/prisma/prisma.repository';
import { Sentence } from './entities/sentence.entity';
import { ISentenceRepository } from './port/out/sentence.repository.interface';

@Injectable()
export class SentenceRepository implements ISentenceRepository {
  constructor(private readonly prisma: PrismaRepository) {}
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
  count(userId: string) {
    return this.prisma.sentence.count({
      where: {
        userId,
      },
    });
  }
}
