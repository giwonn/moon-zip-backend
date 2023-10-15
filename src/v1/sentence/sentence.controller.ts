import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ISentenceService } from './port/in/sentence.service.interface';
// import { CreateSentenceDto } from './dto/create-sentence.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Sentence } from './entities/sentence.entity';

@Controller('sentence')
@ApiTags('sentence')
export class SentenceController {
  constructor() {} // private readonly sentenceService: ISentenceService, // @Inject('SentenceService')

  @Get('count')
  @ApiOperation({ summary: '생성 문장 수' })
  @ApiOkResponse({ status: 200 })
  async getSentenceCount() {
    return 123;
  }

  @Get('list')
  @ApiOperation({ summary: '문장 목록 조회' })
  @ApiOkResponse({ status: 200 })
  async getSentenceList() {
    return [
      {
        seq: 1,
        bookId: '9788996991342',
        content:
          '자신이 생각하는 이상적인 삶을 살 수 있는 길은 가장 완벽한 하루를 상상해보는 것에서 시작한단다. 그리고 그 완벽한 하루와 닮은 습관들을 하나씩 만들어나가다 보면 결국엔 꿈꾸던 삶을 살게 된다는 것',
        createdAt: '2023-05-12',
        tag: ['태그1', '태그2'],
      },
      {
        seq: 1,
        bookId: '9788996991342',
        content:
          '자신이 생각하는 이상적인 삶을 살 수 있는 길은 가장 완벽한 하루를 상상해보는 것에서 시작한단다. 그리고 그 완벽한 하루와 닮은 습관들을 하나씩 만들어나가다 보면 결국엔 꿈꾸던 삶을 살게 된다는 것',
        createdAt: '2023-05-12',
        tag: ['태그1', '태그2'],
      },
      {
        seq: 1,
        bookId: '9788996991342',
        content:
          '자신이 생각하는 이상적인 삶을 살 수 있는 길은 가장 완벽한 하루를 상상해보는 것에서 시작한단다. 그리고 그 완벽한 하루와 닮은 습관들을 하나씩 만들어나가다 보면 결국엔 꿈꾸던 삶을 살게 된다는 것',
        createdAt: '2023-05-12',
        tag: ['태그1', '태그2'],
      },
    ];
  }

  @Get('recommend')
  @ApiOperation({ summary: '추천 문장 조회' })
  @ApiOkResponse({ status: 200 }) // 이건 어떻게 줄바꿈이 되는거지?
  async getRecommendSentence() {
    return {
      seq: 1,
      bookId: '9788996991342',
      content:
        '자신이 생각하는 이상적인 삶을 살 수 있는 길은 가장 완벽한 하루를 상상해보는 것에서 시작한단다. 그리고 그 완벽한 하루와 닮은 습관들을 하나씩 만들어나가다 보면 결국엔 꿈꾸던 삶을 살게 된다는 것',
      createdAt: '2023-05-12',
      book: {
        id: '9788996991342',
        title: '미움받을 용기',
        authors: ['기시미 이치로', '고가 후미타케'],
        publisher: '인플루엔셜',
        thumbnailUrl:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20230128141840',
      },
      tag: ['태그1', '태그2'],
    };
  }

  // @Post()
  // @ApiOperation({ summary: '문장 생성' })
  // @ApiCreatedResponse({ type: Sentence })
  // async create() {
  //   console.log('hihi');
  // }

  // @Get(':userSeq')
  // @ApiOperation({ summary: '사용자의 문장 조회' })
  // @ApiOkResponse({ type: [Sentence] })
  // async findByUserSeq(@Param('userSeq') userSeq: number) {
  //   return this.sentenceService.findByUserSeq(userSeq);
  // }
}
