import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../../client/prisma/prisma.repository';
import { Sentence } from './entities/sentence.entity';
import { ISentenceRepository } from './port/out/sentence.repository.interface';

@Injectable()
export class SentenceRepository implements ISentenceRepository {
  constructor(private readonly prisma: PrismaRepository) {}
  async findByUserSeq(userSeq: number): Promise<Sentence[]> {
    return this.prisma.sentence.findMany({
      where: {
        userSeq,
      },
      include: {
        book: true,
        SentenceTag: {
          include: {
            tag: true,
          },
        },
      },
    });
  }
  create(sentence: Sentence) {
    return this.prisma.sentence.create({
      data: sentence,
    });
  }
}
