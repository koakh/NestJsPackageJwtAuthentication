import { Controller, Get } from '@nestjs/common';
import { AuthService } from '@koakh/nestjs-package-jwt-authentication';

@Controller()
export class AppController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Get()
  getToken(): string {
    return this.authService.getToken({ username: 'koakh', userId: 28 });
  }
};
