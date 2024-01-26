import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserId } from '@/libs/decorator/user-id.decorator';
import { UserService } from '@/v1/user/user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성' })
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get('me')
  @ApiOperation({ summary: '유저 조회' })
  @ApiOkResponse({ type: User })
  // @ApiNotFoundResponse({ type: UserError })
  async findOneByUserId(@UserId() userId: string) {
    return await this.userService.findOne(userId);
  }

  @Put()
  @ApiOperation({ summary: '유저 수정' })
  @ApiOkResponse({ type: User })
  async update(@UserId() userId: string, @Body() updateUserDto: CreateUserDto) {
    return await this.userService.update(userId, updateUserDto);
  }

  // @Get()
  // @ApiOperation({ summary: '유저 조회' })
  // @ApiOkResponse({ type: User })
  // // @ApiNotFoundResponse({ type: UserError })
  // async findOness(@Req() req) {
  //   // return await this.userService.findOne(macId);
  // }

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
