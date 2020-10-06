import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUser } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  getToken(signUser: SignUser) {
    return this.jwtService.sign({ username: signUser.username, sub: signUser.userId });
  }
}
