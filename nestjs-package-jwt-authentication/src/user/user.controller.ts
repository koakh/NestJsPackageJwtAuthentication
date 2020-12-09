import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as UserRoles } from '../auth/enums';
import { JwtAuthGuard, RolesAuthGuard } from '../auth/guards';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from './dtos';
import { UserModelInterface } from './interfaces';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  // helper method to check valid logged user
  checkAuthUser (req: Request) {
    if (!(req as any).user || !(req as any).user.userId) {
      throw new NotFoundException(`invalid authenticated user`);
    }
  }

  // require to be prior to @Get(':id') else we match @Get(':id')
  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @Request() req,
  ): Promise<UserModelInterface> {
    this.checkAuthUser(req);
    const user = await this.userService.findOneByField('id', req.user.userId);
    if (!user) {
      throw new NotFoundException(`user not found`);
    }
    return user;
  }

  // require to be prior to @Put(':id') else we match @Put(':id')
  @Put('/profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateUserDto
  ): Promise<UserModelInterface> {
    this.checkAuthUser(req);
    return await this.userService.update(req.user.userId, updateProfileDto);
  }

  @Put('/profile/password')
  async setProfilePassword(
    @Request() req,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ): Promise<void> {
    this.checkAuthUser(req);
    return await this.userService.updatePassword(req.user.userId, updateUserPasswordDto);
  }  
  
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
  // @Roles and @UseGuards(RolesAuthGuard) require to be before @UseGuards(JwtAuthGuard) else we don't have jwt user injected
  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(RolesAuthGuard)
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserModelInterface> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(RolesAuthGuard)
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserModelInterface> {
    return await this.userService.update(id, updateUserDto);
  }

  @Put(':id/password')
  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(RolesAuthGuard)
  @UseGuards(JwtAuthGuard)
  // @UseFilters(new HttpExceptionFilter())
  async updatePassword(
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ): Promise<void> {
    return await this.userService.updatePassword(id, updateUserPasswordDto);
  }

  @Delete(':id')
  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(RolesAuthGuard)
  @UseGuards(JwtAuthGuard)
  async deleteOneById(
    @Param('id') id: string,
  ): Promise<void> {
    return await this.userService.deleteOneById(id);
  }
}
