import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '@/v1/user/user.repository';
import { toProvider } from '@/libs/util';
import type { IUserService } from '@/v1/user/port/in/user.service.interface';
import { PrismaService } from '@/client/prisma/prisma.service';

describe('UserService', () => {
  let service: IUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...toProvider(UserService, UserRepository), PrismaService],
    }).compile();

    service = module.get<IUserService>('UserService');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
