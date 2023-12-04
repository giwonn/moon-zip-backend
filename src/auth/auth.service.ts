import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { User } from '../v1/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { IAuthService } from './port/in/auth.service.interface';
import { IUserService } from '../v1/user/port/in/user.service.interface';

type UserInfo = Pick<User, 'id'>;

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @Inject('UserService') private readonly userService: IUserService,
  ) {}

  /**
   * 1. auth/login -> checkSnsToken
   * 2. token의 이메일의 유저가 없다면 register, 있다면 login
   * 2-1. registerWithEmail
   *   - 생성이 완료되면 access, refresh 토큰을 반환한다.
   * 2-2. loginWithEmail
   *   - 검증이 완료되면 access, refresh 토큰을 반환한다.
   * 3. signToken
   * 4. createToken
   *   - 2-1, 2-2에서 필요한 access, refresh 토큰을 생성하는 로직
   *
   * 5. authenticateWithEmail
   */

  // userId만 payload로 제공
  private signToken(params?: {
    payload?: Record<string, any>;
    expiresIn?: string | number;
  }) {
    return this.jwtService.sign(params.payload ?? {}, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: params.expiresIn ?? '1m',
    });
  }

  signAccessToken(user: UserInfo) {
    const payload = {
      id: user.id,
    };

    return this.signToken({ payload });
  }

  signRefreshToken() {
    return this.signToken({
      payload: { type: 'refresh' },
      expiresIn: '60d',
    });
  }

  async loginUser(user: UserInfo) {
    return {
      accessToken: this.signAccessToken(user),
      refreshToken: this.signRefreshToken(),
    };
  }

  extractTokenFromHeader(rawToken: string) {
    const splitToken = rawToken.split(' ');
    if (splitToken.length !== 2 || splitToken[0] !== 'Bearer') {
      throw new UnauthorizedException(
        'Invalid Token - token format must be "Bearer {token}"',
      );
    }

    const [, token] = splitToken;

    return token;
  }

  decodeToken(base64String: string) {
    return Buffer.from(base64String, 'base64').toString('utf8');
  }

  // 토큰 검증
  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.config.get('JWT_SECRET'),
      });
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('만료된 토큰입니다.');
      }
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }
  }

  // access token 재발급
  async rotateAccessToken(token: string) {
    // TODO : 1. refreshToken 검증 하여
    this.verifyToken(token);

    // TODO : 2. db에 리프레쉬 토큰 있는지 조회
    const user = await this.userService.verifyByToken(token);

    return {
      accessToken: this.signAccessToken({ id: user.id }),
    };
  }

  // refresh token 재발급
  async rotateRefreshToken(token: string) {
    // TODO : 1. refreshToken 검증 하여
    this.verifyToken(token);

    // TODO : 2. db에 리프레쉬 토큰 있는지 조회
    const user = await this.userService.verifyByToken(token);

    return this.loginUser(user);
  }
}
