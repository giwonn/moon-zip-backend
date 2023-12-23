import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { User } from '@/v1/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { CreateSocialUserDto } from '@/v1/social-user/dto/create-social-user.dto';
import type { IAuthService } from '@/auth/port/in/auth.service.interface';
import type { IUserService } from '@/v1/user/port/in/user.service.interface';
import type { ISocialUserService } from '@/v1/social-user/port/social-user.service.interface';

type UserInfo = Pick<User, 'id' | 'nickname' | 'email' | 'imageUrl'>;

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('UserService') private readonly userService: IUserService,
    @Inject('SocialUserService')
    private readonly socialUserService: ISocialUserService,
  ) {}

  /**
   * 1. auth/login -> social-auth 가드
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

  async socialLogin(createUserDto: CreateUserDto) {
    let user = await this.userService.findOneByEmail(createUserDto.email);
    if (user === null) {
      user = await this.userService.create(createUserDto);
    }

    const isRegisteredBySocial = await this.socialUserService.checkRegistered(
      user.id,
      createUserDto.socialType,
    );
    if (!isRegisteredBySocial) {
      const createSocialUserDto = CreateSocialUserDto.from({
        userId: user.id,
        type: createUserDto.socialType,
        id: createUserDto.socialId,
      });
      await this.socialUserService.create(createSocialUserDto);
    }

    return {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      imageUrl: user.imageUrl,
    };
  }

  // userId만 payload로 제공
  private signToken(
    params: {
      payload?: Record<string, any>;
      expiresIn?: string | number;
    } = {},
  ) {
    return this.jwtService.sign(params.payload ?? {}, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: params.expiresIn ?? '1m',
    });
  }

  signAccessToken(user: UserInfo) {
    return this.signToken({ payload: user });
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
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('만료된 토큰입니다.');
      }
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }
  }

  // access token 재발급
  async rotateAccessToken(refreshToken: string) {
    // TODO : 1. refreshToken 검증 하여
    this.verifyToken(refreshToken);

    // TODO : 2. db에 리프레쉬 토큰 있는지 조회

    // TODO : 이거 redis로 바꿔야함
    // const user = await this.userRepository.findUserIdByRefreshToken(token);

    // if (!user) throw new UnauthorizedException('로그인이 만료되었습니다.');

    // const accessToken = this.signAccessToken({ id: user.id });
    // const refreshToken = this.signRefreshToken();
    //
    // return {
    //   accessToken,
    //   refreshToken,
    // };

    return {
      accessToken: 'test',
      refreshToken: 'test',
    };
  }

  // refresh token 재발급
  async rotateRefreshToken(token: string) {
    // TODO : 1. refreshToken 검증 하여
    this.verifyToken(token);

    // TODO : 2. db에 리프레쉬 토큰 있는지 조회 -> 레디스로 변경 예정
    // const user = await this.userRepository.findUserIdByRefreshToken(token);
    // if (!user)
    //   return {
    //     accessToken: 'test',
    //     refreshToken: 'test',
    //   };
    //
    // return this.loginUser(user);
    return null as any;
  }
}
