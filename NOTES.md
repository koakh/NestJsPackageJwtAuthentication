# NOTES

- [NOTES](#notes)
  - [Starter Project](#starter-project)
    - [Links](#links)
    - [TLDR](#tldr)
    - [Read base Starter Notes](#read-base-starter-notes)
    - [Commit project and get comment id 6b178be](#commit-project-and-get-comment-id-6b178be)
    - [Now clone project and create a Starter from it](#now-clone-project-and-create-a-starter-from-it)
  - [Add Authentication](#add-authentication)
    - [How to add NestJs modules to our custom Package](#how-to-add-nestjs-modules-to-our-custom-package)
    - [Return to consumer App](#return-to-consumer-app)
  - [Use Environment variables in AuthModule](#use-environment-variables-in-authmodule)
    - [Change JwtModule.register to JwtModule.registerAsync](#change-jwtmoduleregister-to-jwtmoduleregisterasync)
    - [Install @nestjs/config on both projects](#install-nestjsconfig-on-both-projects)
    - [Final tested Curl](#final-tested-curl)
  - [Add Auth files from other Auth Projects](#add-auth-files-from-other-auth-projects)
  - [Test TypescriptNestJsPackageJwtAuthentication with userService](#test-typescriptnestjspackagejwtauthentication-with-userservice)
  - [Use Cookies](#use-cookies)
  - [Good way to use refreshTokenJwtSecret](#good-way-to-use-refreshtokenjwtsecret)
  - [Fuck solving the problem of wrong verify refreshTokje](#fuck-solving-the-problem-of-wrong-verify-refreshtokje)

## Starter Project

### Links

- [Publishing NestJS Packages with npm](https://dev.to/nestjs/publishing-nestjs-packages-with-npm-21fm)
- [nestjsplus/nestjs-package-starter](https://github.com/nestjsplus/nestjs-package-starter)
- [Koanh/NestJsPackageStarter](https://github.com/koakh/NestJsPackageStarter)

### TLDR

used node version `node/v12.8.1`

> this notes are the continuation of NOTES.md from [NestJsPackageStarter](https://github.com/koakh/NestJsPackageStarter/blob/main/NOTES.md)

to debug use `launch.json` with [F5]

### Read base Starter Notes

- [Read Notes](https://github.com/koakh/NestJsPackageStarter/blob/main/NOTES.md)

### Commit project and get comment id 6b178be

```shell
$ git add .
$ git commit -am "now we have our development environment ready to roll"
[main 6b178be] now we have our development environment ready to roll
```

### Now clone project and create a Starter from it

```shell
$ cp TypescriptNestJsPackageJwtAuthentication TypescriptNestJsPackageStarter -R
$ rm .git -R
$ mv nestjs-package-jwt-authentication nestjs-package-starter
$ mv nestjs-package-jwt-authentication-consumer/ nestjs-package-starter-consumer
```

search and replace all :

- `nestjs-package-jwt-authentication` with `nestjs-package-starter`
- `NestJsPackageJwtAuthentication` with `NestjsPackageStarter`

change both `package.json` description ex `"description": "Koakh NestJS Jwt Authentication Package",`

```json
{
  "name": "@koakh/nestjs-package-starter",
  "version": "1.0.0",
  "description": "Koakh NestJS Starter Package",
  "author": "Mário Monteiro <marioammonteiro@gmail.com>",
```

```json
{
  "name": "@koakh/nestjs-package-starter-consumer",
  "version": "1.0.0",
  "description": "Koakh NestJS Starter Package Consumer App",
  "author": "Mário Monteiro <marioammonteiro@gmail.com>",
```

starter final commit

commit id [8b0737b](https://github.com/koakh/NestJsPackageStarter/commit/8b0737b24454bad1641c0182190824f1b2cc54aa)

## Add Authentication

### How to add NestJs modules to our custom Package

like `@nestjs/jwt`
start reading notes from project [NestJsPackageEasyConfig](https://github.com/koakh/NestJsPackageEasyConfig)

```shell
$ cd nestjs-package-jwt-authentication
$ npm i @nestjs/jwt
# generate module and service
$ nest g module auth
$ nest g service auth
```

start to change `AuthModule`

```shell
$ code src/auth/auth.module.ts
```

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  // Y Prospect TIP :), without that it never works, respect Y Prospect
  imports: [
    JwtModule.register({
      secret: 'just a stupid password',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService]
})

export class AuthModule {}
```

`src/auth/types/sign-user.ts`

```typescript
export interface SignUser {
  username: string;
  userId: string | number;
}
```

```shell
code src/auth/auth.service.ts
```

```typescript
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUser } from './types';

@Injectable()$ curl localhost:3000eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvYWtoIiwic3ViIjoyOCwiaWF0IjoxNjAxOTc2Nzk2LCJleHAiOjE2MDE5NzY4NTZ9.1Em2ZMayqtDC2DQ0_osMjzrgsIhcXDyNtncP7GeZzg8
  getToken(signUser: SignUser) {
    return this.jwtService.sign({ username: signUser.username, sub: signUser.userId });
  }
}
```

now remove `nestjs-package-jwt-authentication/src/test.ts` and add exports to barrel file `nestjs-package-jwt-authentication/src/index.ts`

```typescript
// export public api from here
export * from './auth/auth.module';
export * from './auth/auth.service';
export * from './auth/types';
```

```shell
# don't forget to build package else we can't import it in consumer app
$ npm run build
# or 
$ npm run start:dev
```

done with package

### Return to consumer App

`nestjs-package-jwt-authentication-consumer/src/app.module.ts` and import AuthModule

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@koakh/nestjs-package-jwt-authentication';

@Module({
  imports: [
    // the trick is import the module, not the service here
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
```

`nestjs-package-jwt-authentication-consumer/src/app.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { AuthService, SignUser } from '@koakh/nestjs-package-jwt-authentication';
curl localhost:3000

    private readonly authService: AuthService,
  ) { }

  getToken(signUser: SignUser): string {
    return this.authService.getToken(signUser);
  }
}
```

`nestjs-package-jwt-authentication-consumer/src/app.controller.ts`

```typescript
import { Controller, Get } from '@nestjs/common';
import { AuthService } from '@koakh/nestjs-package-jwt-authentication';

@Controller()
export class AppController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Get()
  getToken(): string {
    return this.authService.getToken({ usern$ curl localhost:3000eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvYWtoIiwic3ViIjoyOCwiaWF0IjoxNjAxOTc2Nzk2LCJleHAiOjE2MDE5NzY4NTZ9.1Em2ZMayqtDC2DQ0_osMjzrgsIhcXDyNtncP7GeZzg8

```

```shell
$ npm run start:debug
# test jwt
$ curl localhost:3000
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvYWtoIiwic3ViIjoyOCwiaWF0IjoxNjAxNjU1NjQ5LCJleHAiOjE2MDE2NTU3MDl9.8RiWhyrMlZaUdsDG-Web5kNLldelkKffk7o221KQWF8
```

done, we have a **nestjs package working inside our own package without issues**, great we can use nestjs packages, node modules and other cool stuff

## Use Environment variables in AuthModule

### Change JwtModule.register to JwtModule.registerAsync

first change JwtModule.register with JwtModule.registerAsync version, and pass configService

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'just a stupid password',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService]
})

export class AuthModule { }
```

change to async version

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  // use registerAsync to dynamically get secret from config service
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_JWT_SECRET'),
        signOptions: { expiresIn: configService.get('ACCESS_TOKEN_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  exports: [AuthService]
})

export class AuthModule { }
```

### Install @nestjs/config on both projects

now install `@nestjs/config` on package `nestjs-package-jwt-authentication` only first

```shell
# install dependencies
$ cd nestjs-package-jwt-authentication
$ npm i @nestjs/config
#  build package
npm run start:dev
```

if we lauch `npm run start:debug` and fire one test curl we get `curl localhost:3000` we get bellow error that proves that we are using a empty `ACCESS_TOKEN_JWT_SECRET`

```shell
$ curl localhost:3000
[Nest] 3108   - 10/06/2020, 11:11:11 AM   [ExceptionsHandler] secretOrPrivateKey must hacurl localhost:3000
```

create  a `.env` and `.env.sample`

```
ACCESS_TOKEN_JWT_SECRET=secretKeyAccessToken
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_JWT_SECRET=secretKeyRefreshToken
REFRESH_TOKEN_EXPIRES_IN=7d
REFRESH_TOKEN_SKIP_INCREMENT_VERSION=false
```

### Final tested Curl

now repeat curl and test if it works

```shell
$ curl localhost:3000
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvYWtoIiwic3ViIjoyOCwiaWF0IjoxNjAxOTc5Nzc0fQ.YX3z5j3wod9_t3Zfq-tm5qQ9BjEPLv2O9q2QLsTtkkU
```

done now it works with environment variables

## Add Auth files from other Auth Projects

```shell
# install dependencies
$ cd nestjs-package-jwt-authentication
$ npm i @nestjs/passport passport-local passport-jwt bcrypt
#  build package
$ npm run start:dev
```

after some hours working...........

## Test TypescriptNestJsPackageJwtAuthentication with userService

```shell
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "admin", "password": "12345678"}' -H "Content-Type: application/json"
```







miss dist consumer folder

/usr/local/bin/node ./nestjs-package-jwt-authentication-consumer/src/main.ts
Process exited with code 1
Uncaught /media/mario/Storage/Documents/Development/Node/@NestJsPackages/TypescriptNestJsPackageJwtAuthentication/nestjs-package-jwt-authentication-consumer/src/main.ts:1
import { ValidationPipe } from '@nestjs/common';
       ^

SyntaxError: Unexpected token {
```json
{
  "valid": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiVVNFUiIsIkFETUlOIl0sImlhdCI6MTYwMjE1NjgxNywiZXhwIjoxNjAyMTU3NzE3fQ.64Nw3pZF701HzIAcRrIM_jqjyWOAyf2mI1nPkNX2mUQ"
}
```




## Use Cookies

- [Nest Middlewares - Cookie Parser](https://www.npmjs.com/package/@nest-middlewares/cookie-parser)

```shell
$ npm i @nest-middlewares/cookie-parser
```

```typescript
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';

@Module({
  ...
})

export class AuthModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieParserMiddleware).forRoutes('/auth/refresh-token');
  }
}
```

> Warn: `/auth/refresh-token` must match endpoint, else we have a empty token


## Good way to use refreshTokenJwtSecret

> The possibility to provide the secret while calling the  jwtService.sign method has been added in the  7.1.0  version of  @nestjs/jwt

- [13. API with NestJS #13. Implementing refresh tokens using JWT](https://wanago.io/2020/09/21/api-nestjs-refresh-tokens-jwt/)

```typescript
async signRefreshToken(user: any, tokenVersion: number, options?: SignOptions): Promise<AccessToken> {
  const payload = { username: user.username, sub: user.userId, roles: user.roles, tokenVersion };
  return {
    // generate JWT from a subset of the user object properties
    accessToken: this.jwtService.sign(payload, {
      ...options,
      // require to use refreshTokenJwtSecret
      secret: this.configService.get(envConstants.REFRESH_TOKEN_JWT_SECRET),
      expiresIn: this.configService.get(envConstants.ACCESS_TOKEN_EXPIRES_IN),
    }),
  };
}
```

```json
{
  "valid": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiVVNFUiIsIkFETUlOIl0sImlhdCI6MTYwMjE1NjgxNywiZXhwIjoxNjAyMTU3NzE3fQ.64Nw3pZF701HzIAcRrIM_jqjyWOAyf2mI1nPkNX2mUQ"
}
```

## Fuck solving the problem of wrong verify refreshTokje
> Fuck now we must use `this.jwtService.verify(token, { secret: this.config.refreshTokenJwtSecret})` and not `this.jwtService.verify(token, this.config.refreshTokenJwtSecret)`, like we use in the past

this occurs only when we use other secret, like we use in refreshTokens, in normal verifies we use only `this.jwtService.verify(token);`

```typescript
// OK
payload = this.jwtService.verify(token.toString(), { secret: this.config.refreshTokenJwtSecret});
// KO
// payload = this.jwtService.verify(token, { secret: this.config.refreshTokenJwtSecret });
```
