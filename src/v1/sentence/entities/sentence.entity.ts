import type { Sentence as PrismaSentence } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Sentence implements PrismaSentence {
  @ApiProperty()
  id: string;
  @ApiProperty()
  libraryBookId: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  deletedAt: Date | null;
}
