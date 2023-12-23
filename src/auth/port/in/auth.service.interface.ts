import { CreateUserDto } from '@/v1/user/dto/create-user.dto';

export interface AccessAndRefreshToken {
  accessToken: string;
  refreshToken: string;
}
export interface IAuthService {
  socialLogin(createUserDto: CreateUserDto): Promise<AccessAndRefreshToken>;
  rotateToken(token: string): Promise<AccessAndRefreshToken>;
  signLoginToken(user: { userId: string }): Promise<AccessAndRefreshToken>;
}
