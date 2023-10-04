import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseEnumPipe,
} from '@nestjs/common';
import { IBookService } from './port/in/book.service.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { SearchBookDto } from './dto/search-book.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Book } from './entities/book.entity';

@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(
    @Inject('BookService') private readonly bookService: IBookService,
  ) {}

  @Post()
  @ApiOperation({ summary: '도서 생성' })
  @ApiCreatedResponse({ type: Book })
  async create(@Body() createBookDto: CreateBookDto) {
    const res = await this.bookService.search('isbn', createBookDto.id);
    const book = res[0];

    const {
      authors,
      contents,
      datetime: publishDate,
      isbn: originalIsbn,
      price,
      publisher,
      sale_price: salePrice,
      status,
      thumbnail: thumbnailUrl,
      title,
      translators,
      url,
    } = book;

    let isbn;
    if (originalIsbn.includes(' ')) {
      const isbnParts = originalIsbn.split(' ');
      isbn = isbnParts[1];
    } else {
      isbn = originalIsbn;
    }

    createBookDto.authors = authors;
    createBookDto.contents = contents;
    createBookDto.publishDate = publishDate;
    createBookDto.price = price;
    createBookDto.publisher = publisher;
    createBookDto.salePrice = salePrice;
    createBookDto.status = status;
    createBookDto.thumbnailUrl = thumbnailUrl;
    createBookDto.title = title;
    createBookDto.translators = translators;
    createBookDto.url = url;
    createBookDto.id = isbn;

    return await this.bookService.create(createBookDto);
  }

  @Get(':target/:query')
  @ApiOperation({ summary: '도서 조회' })
  @ApiOkResponse({ type: Book })
  async search(@Param() { target, query }: SearchBookDto) {
    return await this.bookService.search(target, query);
  }
}
