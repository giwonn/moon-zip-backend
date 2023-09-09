import type { Book as PrismaBook } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Book implements PrismaBook {
  @ApiProperty()
  id: string;
  title: string;
  contents: string;
  url: string;
  authors: string[];
  translators: string[];
  publisher: string;
  price: number;
  salePrice: number;
  thumbnailUrl: string;
  status: string;
  publishDate: Date;
}
