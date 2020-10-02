import { Controller, Get } from '@nestjs/common';
import { getHello } from '@koakh/nestjs-package-jwt-authentication';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return getHello();
  }
}