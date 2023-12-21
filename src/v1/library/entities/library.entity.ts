import type { Library as PrismaLibrary } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Library implements PrismaLibrary {
  userId: string;
  @ApiProperty({ example: '9788996991342' })
  bookId: string;
  createdAt: Date;
  deletedAt: Date | null;
}
