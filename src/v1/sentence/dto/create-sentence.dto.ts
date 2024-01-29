import { IsString, IsUUID } from 'class-validator';
import { Builder } from 'builder-pattern';
import { ApiProperty } from '@nestjs/swagger';
import { Sentence } from '../entities/sentence.entity';

export class CreateSentenceDto {
  @ApiProperty({ example: '9788996991342' })
  @IsUUID()
  libraryBookId: string;

  @ApiProperty({ example: '이것은 문장입니다.' })
  @IsString()
  content: string;

  to(): Sentence {
    return Builder<Sentence>()
      .libraryBookId(this.libraryBookId)
      .content(this.content)
      .build();
  }
}
