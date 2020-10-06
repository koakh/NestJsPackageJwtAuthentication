import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { envConstants } from '../common/constants/env';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategy';

@Module({
  imports: [
    // used in consumer app with `ConfigModule.forRoot({ isGlobal: true, }),`
    // ConfigModule.forRoot(),
    // ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(envConstants.ACCESS_TOKEN_JWT_SECRET),
        signOptions: { expiresIn: configService.get(envConstants.ACCESS_TOKEN_EXPIRES_IN) },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [AuthService, AuthController, UserService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})

export class AuthModule { }
