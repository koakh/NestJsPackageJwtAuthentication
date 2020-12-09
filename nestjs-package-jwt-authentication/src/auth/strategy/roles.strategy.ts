import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { envConstants } from '../../common/constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import JwtValidatePayload from '../interfaces/jwt-validate.payload';

@Injectable()
export class RolesStrategy extends PassportStrategy(Strategy, 'roles') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(envConstants.ACCESS_TOKEN_JWT_SECRET),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtValidatePayload) {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
