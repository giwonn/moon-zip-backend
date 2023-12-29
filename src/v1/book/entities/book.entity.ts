import type { Book as PrismaBook } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Book implements PrismaBook {
  @ApiProperty()
  id: string;
  title: string | null;
  contents: string | null;
  url: string | null;
  authors: string[];
  translators: string[];
  publisher: string | null;
  price: number | null;
  salePrice: number | null;
  thumbnailUrl: string | null;
  status: string | null;
  publishDate: Date | null;
}
