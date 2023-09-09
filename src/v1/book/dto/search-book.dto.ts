import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum SearchTarget {
  TITLE = 'title',
  ISBN = 'isbn',
}

export class SearchBookDto {
  @ApiProperty({ enum: SearchTarget, example: SearchTarget.ISBN })
  @IsEnum(SearchTarget)
  target: SearchTarget;

  @ApiProperty({ example: '9788996991342' })
  @IsString()
  query: string;
}
