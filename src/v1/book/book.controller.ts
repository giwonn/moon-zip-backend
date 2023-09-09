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
    return await this.bookService.create(createBookDto);
  }

  @Get(':target/:query')
  @ApiOperation({ summary: '도서 조회' })
  @ApiOkResponse({ type: Book })
  async search(@Param() { target, query }: SearchBookDto) {
    return await this.bookService.search(target, query);
  }
}
