import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { SearchBookDto } from './dto/search-book.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Book } from './entities/book.entity';
import { BookService } from '@/v1/book/book.service';

@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: '도서 생성' })
  @ApiCreatedResponse({ type: Book })
  async create(
    @Headers('token') token: string,
    @Body() createBookDto: CreateBookDto,
  ) {
    const validUserId = token; // Validate Logic
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

    return await this.bookService.create(createBookDto, validUserId);
  }

  @Get('detail/:id')
  @ApiOperation({ summary: '도서 상세 조회' })
  @ApiOkResponse({ type: Book })
  async findOne(@Headers('token') token: string, @Param('id') id: string) {
    const validUserId = token; // Validate Logic
    return await this.bookService.findOne(validUserId, id);
  }

  @Get(':target/:query')
  @ApiOperation({ summary: '도서 조회' })
  @ApiOkResponse({ type: Book })
  async search(@Param() { target, query }: SearchBookDto) {
    return await this.bookService.search(target, query);
  }

  @Get('list')
  @ApiOperation({ summary: '도서 목록 조회' })
  @ApiOkResponse({ type: Book })
  async findAll(@Headers('token') token: string) {
    const validUserId = token; // Validate Logic
    return await this.bookService.findAll(validUserId);
  }

  @Get('count')
  @ApiOperation({ summary: '도서 수 조회' })
  @ApiOkResponse({ type: Number })
  async count(@Headers('token') token: string) {
    const validUserId = token; // Validate Logic
    return await this.bookService.count(validUserId);
  }

  @Get('best-seller')
  @ApiOperation({ summary: '주간 베스트셀러 조회' })
  @ApiOkResponse({ type: Array<Book> })
  async bestSeller() {
    return await this.bookService.getWeeklyTop50();
  }
}
