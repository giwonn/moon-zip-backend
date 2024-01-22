import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';
import { TagService } from '@/v1/tag/tag.service';

@Controller('tag')
@ApiTags('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOperation({ summary: '태그 생성' })
  @ApiCreatedResponse({ type: Tag })
  async create(
    @Headers('token') token: string,
    @Body() createTag: CreateTagDto,
  ) {
    let validUserId = token; // Validate Logic
    createTag.userId = validUserId;

    // 이미 태그가 있으면 생성하지 않고 createdAt은 똑같이 사용하고 sentenceSeq만 추가한다.
    return await this.tagService.create(createTag);
  }

  @Get('list')
  @ApiOperation({ summary: '사용자 태그 조회' })
  @ApiOkResponse({ type: [Tag] })
  async findByUserSeq(@Headers('token') token: string) {
    let validUserId = token; // Validate Logic
    return this.tagService.findByUserId(validUserId);
  }

  @Get('detail/:name')
  @ApiOperation({ summary: '태그 상세 조회' })
  @ApiOkResponse({ type: Tag })
  async findOne(@Headers('token') token: string, @Param('name') name: string) {
    let validUserId = token; // Validate Logic
    return await this.tagService.findOne(validUserId, name);
  }

  @Get('count')
  @ApiOperation({ summary: '사용자 태그 카운트' })
  @ApiOkResponse({ type: Number })
  async count(@Headers('token') token: string) {
    let validUserId = token; // Validate Logic
    return await this.tagService.count(validUserId);
  }

  @Get('recent')
  @ApiOperation({ summary: '최근 태그 조회' })
  @ApiOkResponse({ type: [Tag] })
  async findRecent(@Headers('token') token: string) {
    let validUserId = token; // Validate Logic
    return await this.tagService.findRecent(validUserId);
  }
}
