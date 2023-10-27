import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../../client/prisma/prisma.repository';
import { Sentence } from './entities/sentence.entity';
import { ISentenceRepository } from './port/out/sentence.repository.interface';

@Injectable()
export class SentenceRepository implements ISentenceRepository {
  constructor(private readonly prisma: PrismaRepository) {}
  findByUserId(userId: string): Promise<Sentence[]> {
    return this.prisma.sentence.findMany({
      where: {
        // test data
        userId: userId,
      },
      include: {
        book: true,
      },
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
