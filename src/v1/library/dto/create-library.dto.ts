import { IsString } from 'class-validator';
import { Builder } from 'builder-pattern';
import { ApiProperty } from '@nestjs/swagger';
import { Library } from '../entities/library.entity';

export class CreateLibraryDto {
  @ApiProperty({ example: '9788996991342' })
  @IsString()
  bookId: string;

  userId: string;

  to(): Library {
    return Builder<Library>()
      .userId(this.userId)
      .bookId(this.bookId)
      .build();
  }
}
