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
}
