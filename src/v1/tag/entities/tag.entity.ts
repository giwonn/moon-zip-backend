import type { Tag as PrismaTag } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Tag implements PrismaTag {
  @ApiProperty()
  name: string;
  createdAt: Date;
  deletedAt: Date | null;
}
