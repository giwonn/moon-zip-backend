import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ITagService } from './port/in/tag.service.interface';
import { CreateTagDto } from './dto/create-tag.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';

@Controller('tag')
@ApiTags('tag')
export class TagController {
  constructor(
    @Inject('TagService')
    private readonly tagService: ITagService,
  ) {}

  @Post()
  @ApiOperation({ summary: '태그 생성' })
  @ApiCreatedResponse({ type: Tag })
  async create(@Body() createTag: CreateTagDto) {
    return await this.tagService.create(createTag);
  }

  @Post(':sentenceSeq/:tagSeq')
  @ApiOperation({ summary: '문장에 태그 추가' })
  async createSentenceTag(
    @Param('sentenceSeq') sentenceSeq: number,
    @Param('tagSeq') tagSeq: number,
  ) {
    return await this.tagService.createSentenceTag(sentenceSeq, tagSeq);
  }
}
