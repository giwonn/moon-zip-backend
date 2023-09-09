import { IsOptional, IsString } from 'class-validator';
import { Builder } from 'builder-pattern';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../entities/book.entity';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  id: string;

  to(): Book {
    return Builder<Book>()
      .id(this.id)
      .build();
  }
}
