import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export enum SNS_TYPE {
  KAKAO = 'kakao',
  NAVER = 'naver',
}

export class SocialInfoDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  socialId: string;

  @IsEnum(SNS_TYPE)
  @IsNotEmpty()
  socialType: SNS_TYPE;

  @IsUUID()
  @IsNotEmpty()
  macId: string;
}
