import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { SOCIAL_TYPE } from '@/auth/constant/auth.enum';

export class SocialUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  socialId: string;

  @IsEnum(SOCIAL_TYPE)
  @IsNotEmpty()
  socialType: SOCIAL_TYPE;

  @IsUUID()
  @IsNotEmpty()
  macId: string;
}
