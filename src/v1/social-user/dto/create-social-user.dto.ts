import { IsString } from 'class-validator';
import { Builder } from 'builder-pattern';
import { ApiProperty } from '@nestjs/swagger';
import { SocialUser } from '@/v1/social-user/entities/social-user.entity';

export class CreateSocialUserDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  type: string;

  toSocialUserEntity(): SocialUser {
    return Builder<SocialUser>()
      .userId(this.userId)
      .id(this.id)
      .type(this.type)
      .build();
  }

  static from({
    userId,
    id,
    type,
  }: {
    userId: string;
    id: string;
    type: string;
  }) {
    const dto = new CreateSocialUserDto();
    dto.userId = userId;
    dto.id = id;
    dto.type = type;

    return dto;
  }
}
