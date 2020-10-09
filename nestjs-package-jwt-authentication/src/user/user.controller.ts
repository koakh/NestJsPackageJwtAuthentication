import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from './dtos';
import { User } from './models';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':skip/:take')
  async findAll(
    @Param('skip', new ParseIntPipe()) skip?: number,
    @Param('take', new ParseIntPipe()) take?: number
  ): Promise<User[]> {
    return await this.userService.findAll(skip, take);
  }

  @Get(':id')
  async findOneById(
    @Param('id') id?: string,
  ): Promise<User> {
    const user = await this.userService.findOneByField('id', id);
    if (!user) {
      throw new NotFoundException(`user not found`);
    }
    return user;
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  @Put(':id/password')
  async updatePassword(
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ): Promise<User> {
    return await this.userService.updatePassword(id, updateUserPasswordDto);
  }

  @Delete(':id')
  async deleteOneById(
    @Param('id') id: string,
  ): Promise<void> {
    return await this.userService.deleteOneById(id);
  }
}
