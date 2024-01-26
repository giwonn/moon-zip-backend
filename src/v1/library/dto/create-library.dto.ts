import { IsString } from 'class-validator';
import { Builder } from 'builder-pattern';
import { Library } from '../entities/library.entity';

export class CreateLibraryDto {
  @IsString()
  userId: string;

  to(): Library {
    return Builder<Library>().userId(this.userId).build();
  }

  static of(userId: string) {
    const dto = new CreateLibraryDto();
    dto.userId = userId;
    return dto;
  }
}
