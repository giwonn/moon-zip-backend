import { Controller, Get, Post, Body, Inject, Headers } from '@nestjs/common';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Sentence } from './entities/sentence.entity';
import { SentenceService } from '@/v1/sentence/sentence.service';

@Controller('sentence')
@ApiTags('sentence')
export class SentenceController {
  constructor(private readonly sentenceService: SentenceService) {}

  @Post()
  @ApiOperation({ summary: '문장 생성' })
  @ApiCreatedResponse({ type: Sentence })
  async create(
    @Headers('token') token: string,
    @Body() createSentence: CreateSentenceDto,
  ) {
    let validUserId = token; // Validate Logic
    createSentence.userId = validUserId;
    return await this.sentenceService.create(createSentence);
  }

  @Get('list')
  @ApiOperation({ summary: '사용자의 문장 조회' })
  @ApiOkResponse({ type: [Sentence] })
  async findByUserSeq(@Headers('token') token: string) {
    let validUserId = token; // Validate Logic
    return this.sentenceService.findByUserId(validUserId);
  }

  @Get('recommend')
  @ApiOperation({ summary: '추천 문장 조회' })
  @ApiOkResponse({ type: [Sentence] })
  async recommend(@Headers('token') token: string) {
    let validUserId = token; // Validate Logic
    return await this.sentenceService.recommend(validUserId);
  }

  @Get('count')
  @ApiOperation({ summary: '사용자의 문장 카운트' })
  @ApiOkResponse({ type: Number })
  async count(@Headers('token') token: string) {
    let validUserId = token; // Validate Logic
    return await this.sentenceService.count(validUserId);
  }
}
