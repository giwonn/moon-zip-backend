import { IsString, IsNumber } from 'class-validator';
import { Builder } from 'builder-pattern';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '../entities/tag.entity';

export class CreateTagDto {
  @IsString()
  @ApiProperty()
  name: string;
  userId: string;

  @IsString()
  @ApiProperty()
  bookId: string;

  @IsNumber()
  @ApiProperty()
  sentenceSeq: number;

  to(): Tag {
    return Builder<Tag>().name(this.name).build();
  }
}
