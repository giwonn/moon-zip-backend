import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { User } from '@/v1/user/entities/user.entity';

export interface AccessAndRefreshToken {
  accessToken: string;
  refreshToken: string;
}
export interface IAuthService {
  login(
    user: User,
    createUserDto: CreateUserDto,
  ): Promise<AccessAndRefreshToken>;
  logout(tokenId: string): Promise<void>;
  register(createUserDto: CreateUserDto): Promise<AccessAndRefreshToken>;
  rotateToken(tokenId: string): Promise<AccessAndRefreshToken>;
}
