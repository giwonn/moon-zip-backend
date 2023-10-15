import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
// import { CreateSentenceDto } from './dto/create-sentence.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('tag')
@ApiTags('tag')
export class TagController {
  constructor() {}
  @Get('recent')
  @ApiOperation({ summary: '최근 태그' })
  @ApiOkResponse({ status: 200 })
  async getRecentTag() {
    return [
      '자기확언',
      '국내소설',
      '오늘의문장',
      '히가시노게이고',
      '다시봐도좋은',
    ];
  }

  @Get('list')
  @ApiOperation({ summary: '태그 목록 조회' })
  @ApiOkResponse({ status: 200 })
  async getTagList() {
    return [
      {
        id: 1,
        name: '자기확언',
        createdAt: '2023-05-12',
        sentence_id_list: [1, 2, 3, 4, 5],
      },
      {
        id: 2,
        name: '국내소설',
        createdAt: '2023-05-12',
        sentence_id_list: [1, 2, 3, 4, 5],
      },
      {
        id: 3,
        name: '오늘의문장',
        createdAt: '2023-05-12',
        sentence_id_list: [1, 2, 3, 4, 5],
      },
      {
        id: 4,
        name: '히가시노게이고',
        createdAt: '2023-05-12',
        sentence_id_list: [1, 2, 3, 4, 5],
      },
      {
        id: 5,
        name: '다시봐도좋은',
        createdAt: '2023-05-12',
        sentence_id_list: [1, 2, 3, 4, 5],
      },
    ];
  }

  @Get('detail/:id')
  @ApiOperation({ summary: '태그 상세 조회' })
  @ApiOkResponse({ status: 200 })
  async getTagDetail(@Param('id') id: number) {
    return {
      id: id,
      name: '자기확언',
      createdAt: '2023-05-12',
      sentence: [
        {
          seq: 1,
          bookId: '9788996991342',
          content:
            '자신이 생각하는 이상적인 삶을 살 수 있는 길은 가장 완벽한 하루를 상상해보는 것에서 시작한단다. 그리고 그 완벽한 하루와 닮은 습관들을 하나씩 만들어나가다 보면 결국엔 꿈꾸던 삶을 살게 된다는 것',
          createdAt: '2023-05-12',
          tag: ['태그1', '태그2'],
          book: {
            id: '9788996991342',
            title: '미움받을 용기',
            authors: ['기시미 이치로', '고가 후미타케'],
            publisher: '인플루엔셜',
          },
        },
        {
          seq: 1,
          bookId: '9788996991342',
          content:
            '자신이 생각하는 이상적인 삶을 살 수 있는 길은 가장 완벽한 하루를 상상해보는 것에서 시작한단다. 그리고 그 완벽한 하루와 닮은 습관들을 하나씩 만들어나가다 보면 결국엔 꿈꾸던 삶을 살게 된다는 것',
          createdAt: '2023-05-12',
          tag: ['태그1', '태그2'],
          book: {
            id: '9788996991342',
            title: '미움받을 용기',
            authors: ['기시미 이치로', '고가 후미타케'],
            publisher: '인플루엔셜',
          },
        },
        {
          seq: 1,
          bookId: '9788996991342',
          content:
            '자신이 생각하는 이상적인 삶을 살 수 있는 길은 가장 완벽한 하루를 상상해보는 것에서 시작한단다. 그리고 그 완벽한 하루와 닮은 습관들을 하나씩 만들어나가다 보면 결국엔 꿈꾸던 삶을 살게 된다는 것',
          createdAt: '2023-05-12',
          tag: ['태그1', '태그2'],
          book: {
            id: '9788996991342',
            title: '미움받을 용기',
            authors: ['기시미 이치로', '고가 후미타케'],
            publisher: '인플루엔셜',
          },
        },
      ],
    };
  }

  @Get('count')
  @ApiOperation({ summary: '생성 태그 수' })
  @ApiOkResponse({ status: 200 })
  async getTagCount() {
    return 32;
  }
}
