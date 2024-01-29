import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Sentence } from './entities/sentence.entity';
import { SentenceService } from '@/v1/sentence/sentence.service';
import { SearchSentenceDto } from '@/v1/sentence/dto/search-sentence.dto';

@Controller('sentence')
@ApiTags('sentence')
export class SentenceController {
  constructor(private readonly sentenceService: SentenceService) {}

  @Post()
  @ApiOperation({ summary: '문장 생성' })
  @ApiCreatedResponse({ type: Sentence })
  async create(@Body() createSentence: CreateSentenceDto) {
    return await this.sentenceService.create(createSentence);
  }

  @Get()
  @ApiOperation({ summary: '사용자의 문장 조회' })
  @ApiOkResponse({ type: [Sentence] })
  async findMany(@Query() searchSentenceDto: SearchSentenceDto) {
    return this.sentenceService.findMany(searchSentenceDto);
  }

  // @Get('recommend')
  // @ApiOperation({ summary: '추천 문장 조회' })
  // @ApiOkResponse({ type: [Sentence] })
  // async recommend(@Headers('token') token: string) {
  //   let validUserId = token; // Validate Logic
  //   return await this.sentenceService.recommend(validUserId);
  // }
  //
  // @Get('count')
  // @ApiOperation({ summary: '사용자의 문장 카운트' })
  // @ApiOkResponse({ type: Number })
  // async count(@Headers('token') token: string) {
  //   let validUserId = token; // Validate Logic
  //   return await this.sentenceService.count(validUserId);
  // }
}
