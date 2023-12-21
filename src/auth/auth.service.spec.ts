import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import type { IAuthService } from './port/in/auth.service.interface';
import { SocialUserDto } from '@/v1/user/dto/social-user.dto';
import { SOCIAL_TYPE } from './constant/auth.enum';
import { UserRepository } from '@/v1/user/user.repository';
import { IUserRepository } from '@/v1/user/port/out/user.repository.interface';
import { User } from '@/v1/user/entities/user.entity';
import { SocialUser } from '@/v1/user/entities/social-user.entity';
import { UserWithSocial } from '@/v1/user/entities/user-with-social.entity';

describe('AuthService', () => {
  let authService: IAuthService;
  let userRepository: IUserRepository;
  let socialUserDto: SocialUserDto;
  let userWithSocial: UserWithSocial;

  const initSocialUserDto = () => {
    socialUserDto = new SocialUserDto();
    socialUserDto.email = 'test@naver.com';
    socialUserDto.macId = '12345678';
    socialUserDto.socialId = '6A74DA81-BA6D-4B79-96CF-0FD578D59CAD';
    socialUserDto.socialType = SOCIAL_TYPE.NAVER;
  };

  const initUserWithSocial = (socialUserDto: SocialUserDto) => {
    const createdDate = new Date();
    const user: User = {
      id: 'b6c5634c-7439-4cd5-ac3e-a13e9cb2e51d',
      email: socialUserDto.email,
      macId: socialUserDto.macId,
      nickname: null,
      imageUrl: null,
      refreshToken: 'ss',
      createdAt: createdDate,
      updatedAt: createdDate,
      deletedAt: null,
    };
    const socialUsers: Pick<SocialUser, 'id' | 'type'>[] = [
      {
        type: socialUserDto.socialType,
        id: socialUserDto.socialId,
      },
    ];
    userWithSocial = { ...user, socialUsers };
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserRepository, JwtService],
    }).compile();

    authService = module.get<IAuthService>(AuthService);
    userRepository = module.get<IUserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);

    initSocialUserDto();
    initUserWithSocial(socialUserDto);
  });

  describe('socialLogin', () => {
    it('기존 유저가 이미 등록된 소셜 로그인 시도', async () => {
      jest
        .spyOn(userRepository, 'findOneWithSocialInfoByEmail')
        .mockResolvedValue(userWithSocial);

      const result = await authService.socialLogin(socialUserDto);
      expect(result).toEqual({ id: userWithSocial.id });
    });

    it('기존 유저가 새로운 소셜 타입으로 로그인 시도', async () => {
      const kakaoType = {
        id: '6A74DA81-BA6D-4B79-96CF-0FD578D59CAS',
        type: SOCIAL_TYPE.KAKAO,
      };

      jest
        .spyOn(userRepository, 'findOneWithSocialInfoByEmail')
        .mockResolvedValue({
          ...userWithSocial,
          socialUsers: [kakaoType],
        });

      const result = await authService.socialLogin(socialUserDto);
      expect(result).toEqual({ id: userWithSocial.id });
    });

    it('신규 유저가 소셜 로그인 시도', async () => {
      jest
        .spyOn(userRepository, 'findOneWithSocialInfoByEmail')
        .mockResolvedValue(null);

      const result = await authService.socialLogin(socialUserDto);
      expect(result).toEqual({ id: userWithSocial.id });
    });
  });
});
