import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Builder } from 'builder-pattern';
import { ApiProperty } from '@nestjs/swagger';
import { Sentence } from '../entities/sentence.entity';

export class CreateSentenceDto {
  @ApiProperty({ example: '9788996991342' })
  @IsString()
  bookId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  userSeq: number;

  @ApiProperty({ example: '이것은 문장입니다.' })
  @IsString()
  sentence: string;

  to(): Sentence {
    return Builder<Sentence>()
      .bookId(this.bookId)
      .userSeq(this.userSeq)
      .sentence(this.sentence)
      .build();
  }
}
