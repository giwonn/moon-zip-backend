import type { Sentence as PrismaSentence } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Sentence implements PrismaSentence {
  seq: number;
  @ApiProperty()
  bookId: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  content: string;
  createdAt: Date;
  deletedAt: Date | null;
}
