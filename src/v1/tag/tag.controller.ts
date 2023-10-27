import { Controller, Get, Post, Body, Param, Inject, Headers } from '@nestjs/common';
import { ITagService } from './port/in/tag.service.interface';
import { CreateTagDto } from './dto/create-tag.dto';
import {
  ApiCreatedResponse,
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
  async create(@Headers('token') token: string, @Body() createTag: CreateTagDto) {
    let validUserId = token; // Validate Logic
    createTag.userId = validUserId;
    return await this.tagService.create(createTag);
  }

}
