import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Headers,
} from '@nestjs/common';
import { ILibraryService } from './port/in/library.service.interface';
import { CreateLibraryDto } from './dto/create-library.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Library } from './entities/library.entity';

@Controller('library')
@ApiTags('library')
export class LibraryController {
  constructor(
    @Inject('LibraryService')
    private readonly libraryService: ILibraryService,
  ) {}

  // @Post()
  // @ApiOperation({ summary: '책장 생성' })
  // @ApiCreatedResponse({ type: Library })
  // async create(@Headers('token') token: string, @Body() createLibrary: CreateLibraryDto) {
  //   let validUserId = token; // Validate Logic
  //   createLibrary.userId = validUserId;
  //   return await this.libraryService.create(createLibrary);
  // }

  @Get('book-count')
  @ApiOperation({ summary: '도서 수 조회' })
  @ApiOkResponse({ type: Library })
  async getBookCount(@Headers('token') token: string) {
    let validUserId = token; // Validate Logic
    return await this.libraryService.getBookCount(validUserId);
  }
}
