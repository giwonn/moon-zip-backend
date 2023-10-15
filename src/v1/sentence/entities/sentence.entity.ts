import type { Sentence as PrismaSentence } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Sentence implements PrismaSentence {
  seq: number;
  bookId: string;
  userId: string;
  content: string;
  createdAt: Date;
  deletedAt: Date;
}
