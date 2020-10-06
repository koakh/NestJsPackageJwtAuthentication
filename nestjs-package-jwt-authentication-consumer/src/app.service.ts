import { Injectable } from '@nestjs/common';
import { AuthService } from '@koakh/nestjs-package-jwt-authentication';

@Injectable()
export class AppService {
  constructor(
    private readonly authService: AuthService,
  ) { }

  hashPassword(password: string): string {
    return this.authService.hashPassword(password);
  }
}
