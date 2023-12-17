import { IsString } from 'class-validator';
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

  @ApiProperty()
  @IsString()
  socialId: string;

  @ApiProperty()
  @IsString()
  socialType: string;

  toUserEntity(): User {
    return Builder<User>().id(v4()).macId(this.macId).email(this.email).build();
  }
}
