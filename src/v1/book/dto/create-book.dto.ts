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
  thumbnailUrl: string | null;
  status: string | null;
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

  static fromKakaoBook(kakaoBook: any) {
    const dto = new CreateBookDto();
    dto.id = kakaoBook.isbn.split(' ').at(-1);
    dto.title = kakaoBook.title;
    dto.contents = kakaoBook.contents;
    dto.url = kakaoBook.url;
    dto.authors = kakaoBook.authors;
    dto.translators = kakaoBook.translators;
    dto.publisher = kakaoBook.publisher;
    dto.price = kakaoBook.price;
    dto.salePrice = kakaoBook.sale_price;
    dto.thumbnailUrl = kakaoBook.thumbnail || null;
    dto.status = kakaoBook.status || null;
    dto.publishDate = kakaoBook.datetime;

    return dto;
  }
}
