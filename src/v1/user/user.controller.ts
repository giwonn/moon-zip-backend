import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Req,
} from '@nestjs/common';
import type { IUserService } from './port/in/user.service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    @Inject('UserService') private readonly userService: IUserService,
  ) {}

  @Post()
  @ApiOperation({ summary: '유저 생성' })
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('-----------');
    console.log(createUserDto);
    console.log('-----------');
    return await this.userService.create(createUserDto);
  }

  @Get('/user-id/:userId')
  @ApiOperation({ summary: '유저 조회' })
  @ApiOkResponse({ type: User })
  // @ApiNotFoundResponse({ type: UserError })
  async findOneByUserId(@Param('userId') userId: string) {
    return await this.userService.findOne(userId);
  }

  @Get()
  @ApiOperation({ summary: '유저 조회' })
  @ApiOkResponse({ type: User })
  // @ApiNotFoundResponse({ type: UserError })
  async findOness(@Req() req) {
    // return await this.userService.findOne(macId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(Number(id), updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(Number(id));
  // }
}
