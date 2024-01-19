import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  macId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  nickName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  static from({
    email,
    macId,
    nickName,
    imageUrl,
  }: {
    email?: string;
    macId?: string;
    nickName?: string;
    imageUrl?: string;
  }) {
    const dto = new UpdateUserDto();

    if (email) dto.email = email;
    if (macId) dto.macId = macId;
    if (nickName) dto.nickName = nickName;
    if (imageUrl) dto.imageUrl = imageUrl;

    return dto;
  }
}
