import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@/v1/user/dto/create-user.dto';
import { SOCIAL_TYPE } from './constant/auth.enum';
import { User } from '@/v1/user/entities/user.entity';
import { SocialUser } from '@/v1/social-user/entities/social-user.entity';
import { toProvider } from '@/libs/util';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { mockUserService } from '@/v1/user/user.service.mock';
import { mockSocialUserService } from '@/v1/social-user/social-user.service.mock';
import type { IAuthService } from './port/in/auth.service.interface';
import { RedisService } from '@songkeys/nestjs-redis';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: IAuthService;
  let jwtService: JwtService;
  const redisClient = {
    get: jest.fn(),
    setex: jest.fn(),
    del: jest.fn(),
  };
  let createUserDto: CreateUserDto;
  let user: User;
  let socialUser: SocialUser;
  let accessAndRefreshToken: { accessToken: string; refreshToken: string };

  const initCreateUserDto = () => {
    createUserDto = new CreateUserDto();
    createUserDto.email = 'test@naver.com';
    createUserDto.macId = '12345678';
    createUserDto.socialId = '6A74DA81-BA6D-4B79-96CF-0FD578D59CAD';
    createUserDto.socialType = SOCIAL_TYPE.NAVER;
  };

  const initUserWithSocial = (createUserDto: CreateUserDto) => {
    const createdDate = new Date();
    user = {
      id: 'b6c5634c-7439-4cd5-ac3e-a13e9cb2e51d',
      email: createUserDto.email,
      macId: createUserDto.macId,
      nickname: null,
      imageUrl: null,
      createdAt: createdDate,
      updatedAt: createdDate,
      deletedAt: null,
    };
    socialUser = {
      userId: user.id,
      type: createUserDto.socialType,
      id: createUserDto.socialId,
    };
    accessAndRefreshToken = {
      accessToken: 'test',
      refreshToken: 'test',
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...toProvider(AuthService),
        {
          provide: 'UserService',
          useValue: mockUserService,
        },
        {
          provide: 'SocialUserService',
          useValue: mockSocialUserService,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => 'mockSecret'),
          },
        },
        {
          provide: RedisService,
          useValue: {
            getClient: jest.fn().mockReturnValue(redisClient),
          },
        },
        {
          provide: Symbol('REDIS_CLIENT'),
          useValue: redisClient,
        },
        JwtService,
      ],
    }).compile();

    authService = module.get<IAuthService>('AuthService');
    jwtService = module.get<JwtService>(JwtService);

    initCreateUserDto();
    initUserWithSocial(createUserDto);

    mockUserService.create.mockResolvedValue(user);
    mockSocialUserService.create.mockResolvedValue(socialUser);
    jest
      .spyOn(authService, 'signLoginToken')
      .mockResolvedValue(accessAndRefreshToken);
  });

  describe('소셜 로그인', () => {
    describe('기존 유저', () => {
      beforeEach(() => {
        mockUserService.findOneByEmail.mockResolvedValue(user);
      });

      it('기존 소셜로그인', async () => {
        // given
        mockSocialUserService.checkRegistered.mockResolvedValue(true);

        // when
        const result = await authService.socialLogin(createUserDto);

        // then
        expect(result).toEqual(accessAndRefreshToken);
      });

      it('신규 소셜로그인', async () => {
        // given
        mockSocialUserService.checkRegistered.mockResolvedValue(false);

        // when
        const result = await authService.socialLogin(createUserDto);

        // then
        expect(result).toEqual(accessAndRefreshToken);
      });
    });

    describe('신규 유저', () => {
      beforeEach(() => {
        mockUserService.findOneByEmail.mockResolvedValue(null);
      });

      it('소셜 로그인', async () => {
        // given
        mockSocialUserService.checkRegistered.mockResolvedValue(false);

        // when
        const result = await authService.socialLogin(createUserDto);

        // then
        expect(result).toEqual(accessAndRefreshToken);
      });
    });
  });

  describe('rotateToken', () => {
    it('redis에 리프레쉬 토큰이 없는 경우', () => {
      jest
        .spyOn(jwtService, 'verify')
        .mockReturnValue(new UnauthorizedException());
    });
  });
});
