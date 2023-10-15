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

  @Get('count')
  @ApiOperation({ summary: '생성 도서 수' })
  @ApiOkResponse({ status: 200 })
  async getBookCount() {
    return 8;
  }

  @Get('detail/:id')
  @ApiOperation({ summary: '도서 상세 조회' })
  @ApiOkResponse({ status: 200 })
  async getBookDetail(@Param('id') id: string) {
    return {
      id: id,
      title: '미움받을 용기',
      authors: ['기시미 이치로', '고가 후미타케'],
      publisher: '인플루엔셜',
      thumbnailUrl:
        'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20230128141840',
      sentence: [
        {
          seq: 1,
          content:
            '자신이 생각하는 이상적인 삶을 살 수 있는 길은 가장 완벽한 하루를 상상해보는 것에서 시작한단다. 그리고 그 완벽한 하루와 닮은 습관들을 하나씩 만들어나가다 보면 결국엔 꿈꾸던 삶을 살게 된다는 것',
          createdAt: '2023-05-12',
          tag: ['태그1', '태그2'],
        },
        {
          seq: 1,
          content:
            '자신이 생각하는 이상적인 삶을 살 수 있는 길은 가장 완벽한 하루를 상상해보는 것에서 시작한단다. 그리고 그 완벽한 하루와 닮은 습관들을 하나씩 만들어나가다 보면 결국엔 꿈꾸던 삶을 살게 된다는 것',
          createdAt: '2023-05-12',
          tag: ['태그1', '태그2'],
        },
        {
          seq: 1,
          content:
            '자신이 생각하는 이상적인 삶을 살 수 있는 길은 가장 완벽한 하루를 상상해보는 것에서 시작한단다. 그리고 그 완벽한 하루와 닮은 습관들을 하나씩 만들어나가다 보면 결국엔 꿈꾸던 삶을 살게 된다는 것',
          createdAt: '2023-05-12',
          tag: ['태그1', '태그2'],
        },
        {
          seq: 1,
          content:
            '자신이 생각하는 이상적인 삶을 살 수 있는 길은 가장 완벽한 하루를 상상해보는 것에서 시작한단다. 그리고 그 완벽한 하루와 닮은 습관들을 하나씩 만들어나가다 보면 결국엔 꿈꾸던 삶을 살게 된다는 것',
          createdAt: '2023-05-12',
          tag: ['태그1', '태그2'],
        },
      ],
    };
  }

  @Get('list')
  @ApiOperation({ summary: '도서 목록 조회' })
  @ApiOkResponse({ status: 200 })
  async getBookList() {
    // 생성일자순으로 소팅?
    return [
      {
        id: '9788996991342',
        title: '미움받을 용기',
        authors: ['기시미 이치로', '고가 후미타케'],
        publisher: '인플루엔셜',
        thumbnailUrl:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20230128141840',
      },
      {
        id: '9788996991342',
        title: '미움받을 용기',
        authors: ['기시미 이치로', '고가 후미타케'],
        publisher: '인플루엔셜',
        thumbnailUrl:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20230128141840',
      },
      {
        id: '9788996991342',
        title: '미움받을 용기',
        authors: ['기시미 이치로', '고가 후미타케'],
        publisher: '인플루엔셜',
        thumbnailUrl:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20230128141840',
      },
      {
        id: '9788996991342',
        title: '미움받을 용기',
        authors: ['기시미 이치로', '고가 후미타케'],
        publisher: '인플루엔셜',
        thumbnailUrl:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20230128141840',
      },
    ];
  }

  @Get('trending')
  @ApiOperation({ summary: '인기 도서 조회' })
  @ApiOkResponse({ status: 200 })
  async getTrendingBooks() {
    return [
      {
        id: '9788996991342',
        title: '미움받을 용기',
        authors: ['기시미 이치로', '고가 후미타케'],
        publisher: '인플루엔셜',
        thumbnailUrl:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20230128141840',
      },
      {
        id: '9788996991342',
        title: '미움받을 용기',
        authors: ['기시미 이치로', '고가 후미타케'],
        publisher: '인플루엔셜',
        thumbnailUrl:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20230128141840',
      },
      {
        id: '9788996991342',
        title: '미움받을 용기',
        authors: ['기시미 이치로', '고가 후미타케'],
        publisher: '인플루엔셜',
        thumbnailUrl:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20230128141840',
      },
      {
        id: '9788996991342',
        title: '미움받을 용기',
        authors: ['기시미 이치로', '고가 후미타케'],
        publisher: '인플루엔셜',
        thumbnailUrl:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20230128141840',
      },
    ];
  }

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
