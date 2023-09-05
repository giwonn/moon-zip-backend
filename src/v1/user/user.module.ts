import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { toProvider } from '../../libs/util';

@Module({
  controllers: [UserController],
  providers: toProvider(UserService, UserRepository),
})
export class UserModule {}
