import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Builder } from 'builder-pattern';
import { ApiProperty } from '@nestjs/swagger';
import { Sentence } from '../entities/sentence.entity';

export class CreateSentenceDto {
  @ApiProperty()
  @IsString()
  bookId: string;

  @ApiProperty()
  @IsNumber()
  userSeq: number;

  @ApiProperty()
  @IsString()
  sentence: string;

  @ApiProperty()
  @IsString({ each: true })
  tags: string[];

  to(): Sentence {
    return Builder<Sentence>()
      .bookId(this.bookId)
      .userSeq(this.userSeq)
      .sentence(this.sentence)
      .tags(this.tags)
      .build();
  }
}
