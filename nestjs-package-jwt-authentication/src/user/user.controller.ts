import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesAuthGuard } from '../auth/guards';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from './dtos';
import { UserModelInterface } from './interfaces';
import { UserService } from './user.service';
import { Roles as UserRoles} from '../auth/enums';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':skip/:take')
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Param('skip', new ParseIntPipe()) skip?: number,
    @Param('take', new ParseIntPipe()) take?: number
  ): Promise<UserModelInterface[]> {
    return await this.userService.findAll(skip, take);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneById(
    @Param('id') id?: string,
  ): Promise<UserModelInterface> {
    const user = await this.userService.findOneByField('id', id);
    if (!user) {
      throw new NotFoundException(`user not found`);
    }
    return user;
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  @UseGuards(RolesAuthGuard)
  // require to be after @Roles, @UseGuards
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserModelInterface> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserModelInterface> {
    return await this.userService.update(id, updateUserDto);
  }

  @Put(':id/password')
  @UseGuards(JwtAuthGuard)
  // @UseFilters(new HttpExceptionFilter())
  async updatePassword(
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ): Promise<void> {
    return await this.userService.updatePassword(id, updateUserPasswordDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteOneById(
    @Param('id') id: string,
  ): Promise<void> {
    return await this.userService.deleteOneById(id);
  }
}
