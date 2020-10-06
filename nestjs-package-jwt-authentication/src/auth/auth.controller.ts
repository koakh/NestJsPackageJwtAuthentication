import { Controller, Get, HttpStatus, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/models';
import { envConstants } from '../common/constants/env';
import { LoginUserDto } from '../user/dtos';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards';
import { LocalAuthGuard } from './guards/local-auth.guard';
import AccessToken from './interfaces/access-token';
import { JwtResponsePayload } from './interfaces/jwt-response.payload';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }
  // curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    debugger;
    return req.user;
    // return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/refresh-token')
  async refreshToken(
    @Request() req,
    @Response() res,
  ): Promise<any> {
    // Logger.log('headers', JSON.stringify(req.headers, undefined, 2));
    // Logger.log('cookies', JSON.stringify(req.cookies, undefined, 2));
    const invalidPayload = () => res.status(HttpStatus.UNAUTHORIZED).send({ valid: false, accessToken: '' });
    // get jid token from cookies
    const token: string = req.cookies.jid;
    // check if jid token is present
    if (!token) {
      return invalidPayload();
    }

    let payload: JwtResponsePayload;
    try {
      payload = this.jwtService.verify(token, { secret: this.configService.get(envConstants.REFRESH_TOKEN_JWT_SECRET) });
    } catch (error) {
      // Logger.log(error);
      return invalidPayload();
    }

    // token is valid, send back accessToken
    const user: User = await this.userService.findOneByUsername(payload.username);
    // check jid token
    if (!user) {
      return invalidPayload();
    }

    // check inMemory tokenVersion
    const tokenVersion: number = this.userService.usersStore.getTokenVersion(user.username);
    if (tokenVersion !== payload.tokenVersion) {
      return invalidPayload();
    }

    // refresh the refreshToken on accessToken, this way we extended/reset refreshToken validity to default value
    const loginUserDto: LoginUserDto = { username: user.username, password: user.password };
    // we don't increment tokenVersion here, only when we login, this way refreshToken is always valid until we login again
    const refreshToken: AccessToken = await this.authService.signRefreshToken(loginUserDto, tokenVersion);
    // send refreshToken in response/setCookie
    this.authService.sendRefreshToken(res, refreshToken);

    const { accessToken }: AccessToken = await this.authService.signJwtToken(user);
    res.send({ valid: true, accessToken });
  }
}
