import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hashPassword } from '../auth/utils';
import { PaginationArgs } from '../common/dtos';
import { NewUserDto } from './dtos/new-user.dto';
import { UserRoles } from './enums';
import { UserData } from './interfaces/user-data.interface';
import { User } from './models';
import { userData } from './user.data';
import { UserStore } from './user.store';
import { newUuid } from './utils';

@Injectable()
export class UserService {
  // init usersStore
  usersStore: UserStore = new UserStore(this.configService);

  constructor(
    private readonly configService: ConfigService,
    ) {
  }

  async findAll(paginationArgs: PaginationArgs): Promise<User[]> {
    // clone array before slice it
    const data = userData.slice();
    return (paginationArgs)
      ? data.splice(paginationArgs.skip, paginationArgs.take)
      : data;
  }

  async findOneByField(field: string, value: string): Promise<User> {
    return userData.find((e: UserData) => e[field] === value);
  }

  async create(data: NewUserDto): Promise<User> {
    const password = hashPassword(data.password);
    const user = {
      ...data,
      id: data.id || newUuid(),
      password,
      roles: [UserRoles.User],
      // add date in epoch unix time
      createdDate: new Date().getTime(),
    };
    userData.push(user);
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    try {
      return userData.find((e: UserData) => e.username === username);
    } catch (error) {
      // Logger.error(JSON.stringify(error));
      // const errorMessage: string = (error.responses[0]) ? error.responses[0].error.message : 'Internal server error';
      // throw new HttpException({ status: HttpStatus.CONFLICT, error: errorMessage }, HttpStatus.NOT_FOUND);
      // don't show original error message, override it with a forbidden message equal to the one when fails password
      // more secure, this way we hide if username exists or not form hacking
      throw new HttpException({ status: HttpStatus.FORBIDDEN, error: 'Forbidden', message: `Forbidden resource` }, HttpStatus.FORBIDDEN);
    }
  }
}
