import { Injectable } from '@nestjs/common';
import { AuthService, SignUser } from '@koakh/nestjs-package-jwt-authentication';

@Injectable()
export class AppService {
  constructor(
    private readonly authService: AuthService,
  ) { }

  getToken(signUser: SignUser): string {
    return this.authService.getToken(signUser);
  }
}
