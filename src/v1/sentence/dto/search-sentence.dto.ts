import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class SearchSentenceDto {
  @ApiHideProperty()
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'be3df23b-f292-4b7f-a6cb-8282007a43d3',
    format: 'uuid',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  libraryId?: string;

  @ApiProperty({ example: '9788996991342', required: false })
  @IsString()
  @IsOptional()
  bookId?: string;
}
