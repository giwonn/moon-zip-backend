import { v4 } from 'uuid';
import { IsOptional, IsString } from 'class-validator';
import { Builder } from 'builder-pattern';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { SOCIAL_TYPE } from '@/v1/auth/constant/auth.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  nickName?: string;

  @ApiProperty()
  @IsString()
  macId: string;

  @ApiProperty()
  @IsString()
  socialId: string;

  @ApiProperty()
  @IsString()
  socialType: SOCIAL_TYPE;

  toUserEntity(): User {
    return Builder<User>()
      .id(v4())
      .macId(this.macId)
      .email(this.email)
      .nickName(this.nickName ?? null)
      .build();
  }

  static from({
    email,
    macId,
    nickName,
    socialId,
    socialType,
  }: {
    email: CreateUserDto['email'];
    macId: CreateUserDto['macId'];
    nickName: CreateUserDto['nickName'];
    socialId: CreateUserDto['socialId'];
    socialType: CreateUserDto['socialType'];
  }) {
    const dto = new CreateUserDto();
    dto.email = email;
    dto.macId = macId;
    dto.nickName = nickName;
    dto.socialId = socialId;
    dto.socialType = socialType;

    return dto;
  }
}
