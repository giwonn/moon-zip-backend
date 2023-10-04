import { IsOptional, IsString } from 'class-validator';
import { Builder } from 'builder-pattern';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../entities/book.entity';

export class CreateBookDto {
  @ApiProperty({ example: '9788996991342' })
  @IsString()
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

  to(): Book {
    return Builder<Book>()
      .id(this.id)
      .title(this.title)
      .contents(this.contents)
      .url(this.url)
      .authors(this.authors)
      .translators(this.translators)
      .publisher(this.publisher)
      .price(this.price)
      .salePrice(this.salePrice)
      .thumbnailUrl(this.thumbnailUrl)
      .status(this.status)
      .publishDate(this.publishDate)
      .build();
  }
}
