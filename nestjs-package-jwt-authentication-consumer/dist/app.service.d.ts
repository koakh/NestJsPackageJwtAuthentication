import { AuthService } from '@koakh/nestjs-package-jwt-authentication';
export declare class AppService {
    private readonly authService;
    constructor(authService: AuthService);
    hashPassword(password: string): string;
}
