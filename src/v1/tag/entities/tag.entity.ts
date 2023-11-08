import type { Tag as PrismaTag } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Tag implements PrismaTag {
  @ApiProperty()
  name: string;
  userId: string;
  @ApiProperty()
  bookId: string;
  @ApiProperty()
  sentenceSeq: number;
  createdAt: Date;
  deletedAt: Date;
}
