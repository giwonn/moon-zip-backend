import { IsString } from 'class-validator';
import { Builder } from 'builder-pattern';
import { ApiProperty } from '@nestjs/swagger';
import { Library } from '../entities/library.entity';

export class CreateLibraryDto {
  @IsString()
  bookId: string;
  @IsString()
  userId: string;

  to(): Library {
    return Builder<Library>().userId(this.userId).bookId(this.bookId).build();
  }

  static of(userId: string, bookId: string) {
    const dto = new CreateLibraryDto();
    dto.userId = userId;
    dto.bookId = bookId;
    return dto;
  }
}
