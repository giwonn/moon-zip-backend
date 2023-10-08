import type { Tag as PrismaTag } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Tag implements PrismaTag {
  seq: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  userSeq: number;
  @ApiProperty()
  sentenceSeq: number;
}
