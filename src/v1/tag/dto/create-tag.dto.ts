import { IsNumber, IsString } from 'class-validator';
import { Builder } from 'builder-pattern';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '../entities/tag.entity';

export class CreateTagDto {
  @ApiProperty({ example: '태그명' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  userSeq: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  sentenceSeq: number;

  to(): Tag {
    return Builder<Tag>()
      .name(this.name)
      .userSeq(this.userSeq)
      .sentenceSeq(this.sentenceSeq)
      .build();
  }
}
