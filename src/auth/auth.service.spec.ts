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

describe('AuthService', () => {
  let authService: IAuthService;
  let jwtService: JwtService;
  let createUserDto: CreateUserDto;
  let user: User;
  let socialUser: SocialUser;
  let returnSocialLogin: Pick<User, 'id' | 'nickname' | 'email' | 'imageUrl'>;

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
    returnSocialLogin = {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      imageUrl: user.imageUrl,
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
        JwtService,
      ],
    }).compile();

    authService = module.get<IAuthService>('AuthService');
    jwtService = module.get<JwtService>(JwtService);

    initCreateUserDto();
    initUserWithSocial(createUserDto);
  });

  beforeEach(() => {
    mockUserService.create.mockResolvedValue(user);
    mockSocialUserService.create.mockResolvedValue(socialUser);
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
        expect(result).toEqual(returnSocialLogin);
      });

      it('신규 소셜로그인', async () => {
        // given
        mockSocialUserService.checkRegistered.mockResolvedValue(false);

        // when
        const result = await authService.socialLogin(createUserDto);

        // then
        expect(result).toEqual(returnSocialLogin);
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
        expect(result).toEqual(returnSocialLogin);
      });
    });
  });

  describe('유저 토큰 로그인 과정', () => {
    it('유효한 액세스로 요청 -> 유저 정보 토큰으로 만들어서 리턴', () => {
      jest.spyOn(jwtService, 'sign').mockReturnValue('mockAccessToken');

      const accessToken = authService.signAccessToken(returnSocialLogin);

      expect(accessToken).toBe('mockAccessToken');

      expect(jwtService.sign).toHaveBeenCalledWith(returnSocialLogin, {
        secret: 'mockSecret',
        expiresIn: '1m',
      });
    });
    it('만료된 액세스로 요청 -> reject한다.', () => {});

    it('유효한 리프레시로 요청 -> 액세스,리프레쉬 발급하고 레디스에 저장한다.', () => {});
    it('만료된 리프레시로 요청 -> reject한다.', () => {});
  });
});
