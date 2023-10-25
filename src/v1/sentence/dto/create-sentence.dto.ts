import { IsString } from 'class-validator';
import { Builder } from 'builder-pattern';
import { ApiProperty } from '@nestjs/swagger';
import { Sentence } from '../entities/sentence.entity';

export class CreateSentenceDto {
  @ApiProperty({ example: '9788996991342' })
  @IsString()
  bookId: string;

  @ApiProperty({ example: '85322046-2031-4fcf-843d-3d8cb1347ed9' })
  @IsString()
  userId: string;

  @ApiProperty({ example: '이것은 문장입니다.' })
  @IsString()
  content: string;

  to(): Sentence {
    return Builder<Sentence>()
      .bookId(this.bookId)
      .userId(this.userId)
      .content(this.content)
      .build();
  }
}
