import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ISentenceService } from './port/in/sentence.service.interface';
import { CreateSentenceDto } from './dto/create-sentence.dto';
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
  constructor(
    @Inject('SentenceService')
    private readonly sentenceService: ISentenceService,
  ) {}

  @Post()
  @ApiOperation({ summary: '문장 생성' })
  @ApiCreatedResponse({ type: Sentence })
  async create(@Body() createSentence: CreateSentenceDto) {
    return await this.sentenceService.create(createSentence);
  }

  @Get(':userSeq')
  @ApiOperation({ summary: '사용자의 문장 조회' })
  @ApiOkResponse({ type: [Sentence] })
  async findByUserSeq(@Param('userSeq') userSeq: number) {
    return this.sentenceService.findByUserSeq(userSeq);
  }
}
