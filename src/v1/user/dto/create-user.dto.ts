import { IsOptional, IsString } from 'class-validator';
import { Builder } from 'builder-pattern';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { v4 } from 'uuid';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  macId: string;

  @ApiProperty({ example: '김철수' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'https://i.imgur.com/6uBt4aT.png', required: false })
  @IsString()
  @IsOptional()
  imageUrl: string;

  to(): User {
    return Builder<User>()
      .id(v4())
      .macId(this.macId)
      .email(this.email)
      .nickname(this.nickname)
      .imageUrl(this.imageUrl)
      .build();
  }

  // static from(user: User) {
  //   return Builder<CreateUserDto>()
  //     .seq(user.seq)
  //     .macId(user.macId)
  //     .nickname(user.nickname)
  //     .imageUrl(user.imageUrl)
  //     .build();
  // }
}
