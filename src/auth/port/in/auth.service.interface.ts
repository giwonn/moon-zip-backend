import { SocialUserDto } from '@/v1/user/dto/social-user.dto';
import { User } from '@/v1/user/entities/user.entity';

export interface IAuthService {
  extractTokenFromHeader(rawToken: string): string;
  verifyToken(token: string): string;
  rotateAccessToken(token: string): Promise<{ accessToken: string }>;
  rotateRefreshToken(
    token: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  decodeToken(base64String: string): string;
  signAccessToken(payload: any): string;
  signRefreshToken(): string;
  socialLogin(socialUserDto: SocialUserDto): Promise<Pick<User, 'id'>>;
}
