# NOTES

- [NOTES](#notes)
  - [Starter Project](#starter-project)
    - [Links](#links)
    - [TLDR](#tldr)
    - [Start NestJs NPM Package](#start-nestjs-npm-package)
    - [Init Git/Remote Repository](#init-gitremote-repository)
    - [Create remote repository NestJsPackageJwtAuthentication](#create-remote-repository-nestjspackagejwtauthentication)
    - [Setting up for development](#setting-up-for-development)
    - [Create the test app / consumer app](#create-the-test-app--consumer-app)
    - [Edit root .gitignore](#edit-root-gitignore)
    - [Update all consumer dependencies to latest and greatest](#update-all-consumer-dependencies-to-latest-and-greatest)
    - [Update starter dependencies to nest 7.0](#update-starter-dependencies-to-nest-70)
    - [Build the package](#build-the-package)
    - [Install the package into the test app](#install-the-package-into-the-test-app)
    - [Use the package in the test app](#use-the-package-in-the-test-app)
    - [Configure/Fix debugger](#configurefix-debugger)
    - [Do some changes in package](#do-some-changes-in-package)
    - [Commit project and get comment id 6b178be](#commit-project-and-get-comment-id-6b178be)
    - [Now clone project and create a Starter from it](#now-clone-project-and-create-a-starter-from-it)
  - [Add Authentication](#add-authentication)
    - [How to add NestJs modules to our custom Package](#how-to-add-nestjs-modules-to-our-custom-package)
    - [Return to consumer App](#return-to-consumer-app)
    - [Run consumer app](#run-consumer-app)

## Starter Project

### Links

- [Publishing NestJS Packages with npm](https://dev.to/nestjs/publishing-nestjs-packages-with-npm-21fm)

### TLDR

used node version `node/v12.8.1`

### Start NestJs NPM Package

```shell
$ git clone https://github.com/nestjsplus/nestjs-package-starter.git
$ mv nestjs-package-starter nestjs-package-jwt-authentication
# change package name to @koakh/nestjs-auth-package
$ code nestjs-package-jwt-authentication/package.json
```

```json
{
  "name": "@koakh/nestjs-package-jwt-authentication",
  "version": "1.0.0",
  "description": "Koakh NestJS Jwt Authentication Package",
  "author": "Mário Monteiro <marioammonteiro@gmail.com>",
  "license": "MIT",
  "readmeFilename": "README.md",
  "main": "dist/test.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/koakh/NestJsPackageJwtAuthentication"
  },
  "bugs": "https://github.com/koakh/NestJsPackageJwtAuthentication",
```

### Init Git/Remote Repository

```shell
$ touch README.md
$ git init
$ git add .
$ git commit -am "first commit"
```

### Create remote repository NestJsPackageJwtAuthentication

```shell
git branch -M main
git remote add origin https://github.com/koakh/NestJsPackageJwtAuthentication.git
git push -u origin main
```

### Setting up for development

```shell
$ cd nestjs-package-jwt-authentication/
$ npm i
```

### Create the test app / consumer app

In your second terminal window, make sure you start out in the top level folder you created. Scaffold the small NestJS app we'll be using to exercise our package.

```shell
# open other terminal window
$ nest new nestjs-package-jwt-authentication-consumer
$ cd nestjs-package-jwt-authentication-consumer
```

Your folder structure should look similar to this now:

```shell
├── nestjs-package-jwt-authentication
├── nestjs-package-jwt-authentication-consumer
├── NOTES.md
└── README.md
```

### Edit root .gitignore

```shell
nestjs-package-jwt-authentication/node_modules/**
nestjs-package-jwt-authentication-consumer/node_modules/**
.trash
.bak
```

```shell
$ git add .
$ git commit -am "commit before update starter npm dependencies"
```

### Update all consumer dependencies to latest and greatest

```shell
$ code nestjs-package-jwt-authentication-consumer/package.json
```

```json
{
  "name": "@koakh/nestjs-package-jwt-authentication-consumer",
  "version": "1.0.0",
  "description": "Koakh NestJS Jwt Authentication Package",
  "author": "Mário Monteiro <marioammonteiro@gmail.com>",
  "license": "MIT",
  "readmeFilename": "README.md",
  ...
  "dependencies": {
    "@nestjs/common": "^7.4.4",
    "@nestjs/core": "^7.4.4",
    "@nestjs/platform-express": "^7.4.4",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^3.0.2",
    "rxjs": "^6.6.3"
  },
  "devDependencies": {
    "@types/express": "^4.17.8",
    "@types/jest": "^26.0.14",
    "@types/node": "^14.11.2",
    "@types/supertest": "^2.0.10",
    "@nestjs/testing": "^7.4.4",
    "jest": "^26.4.2",
    "nodemon": "^2.0.4",
    "prettier": "^2.1.2",
    "supertest": "^5.0.0",
    "ts-jest": "^26.4.1",
    "ts-node": "^9.0.0",
    "tsconfig-paths": "^3.9.0",
    "tslint": "^6.1.3",
    "typescript": "^4.0.3"
  },
```

resolve dependencies

```shell
$ cd nestjs-package-jwt-authentication-consumer/
$ rm package-lock.json
$ npm i
```

### Update starter dependencies to nest 7.0

```shell
# open side by side
$ code nestjs-package-jwt-authentication/package.json
$ code nestjs-package-jwt-authentication-consumer/package.json
```

paste from consumer app to package

```json
"devDependencies": {
    "@types/express": "^4.17.8",
    "@types/jest": "^26.0.14",
    "@types/node": "^14.11.2",
    "@types/supertest": "^2.0.10",
    "@nestjs/testing": "^7.4.4",
    "jest": "^26.4.2",
    "nodemon": "^2.0.4",
    "prettier": "^2.1.2",
    "supertest": "^5.0.0",
    "ts-jest": "^26.4.1",
    "ts-node": "^9.0.0",
    "tsconfig-paths": "^3.9.0",
    "tslint": "^6.1.3",
    "typescript": "^4.0.3"
```

and remove old duplicated, below are the removed duplicated dependencies

don't forget the update existing

```json
"devDependencies": {
  "@nestjs/common": "^7.4.4",
  "@nestjs/core": "^7.4.4",
  "@nestjs/platform-express": "^7.4.4",
  "tsc-watch": "^4.2.9"
```

now bump `peerDependencies` to 7.0

```json
  "peerDependencies": {
    "@nestjs/common": "^7.0.0"
  },
```

update dependencies

```shell
$ cd nestjs-package-jwt-authentication
$ rm package-lock.json
$ npm i
```

### Build the package

Take a moment to poke around in the `nestjs-package-starter/nestjs-package-jwt-authentication` folder

```shell
$ cd nestjs-package-jwt-authentication
$ npm run build
# commit changes
$ git add . && git commit -am "finished dependencies update"
$ git push
```

### Install the package into the test app

```shell
$ cd nestjs-package-jwt-authentication-consumer/
# use npm to install the package we just built into our test app.
$ npm install ..
$ npm install ../nestjs-package-jwt-authentication
```

### Use the package in the test app

The template package exports a single simple test function. Examine `code ../nestjs-package-jwt-authentication/src/test.ts` to see it:

```typescript
export function getHello(): string {
  return 'Hello from the new package!';
}
```

Now that you've installed the new package in `nestjs-package-jwt-authentication-consumer`, it's available like any npm package, and you can use it in the normal fashion. Open `nestjs-package-jwt-authentication-consumer/src/app.controller.ts` and import the function; make sure the file looks like this:

```shell
import { Controller, Get } from '@nestjs/common';
import { getHello } from '@koakh/nestjs-package-jwt-authentication';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return getHello();
  }
}
```

In terminal window 2, start `nestjs-package-jwt-authentication` (using start:dev is recommended here so we can make iterative changes):

```shell
$ cd nestjs-package-jwt-authentication-consumer
$ npm run start:dev
# done we have access to package
$ curl localhost:3000
Hello from the new package!
```

### Configure/Fix debugger

we must fix `nestjs-package-jwt-authentication-consumer` `npm run start:debug`, else it won't start as expected, change

`nestjs-package-jwt-authentication-consumer/nodemon-debug.json`

remove `-brk` from `--inspect-brk`

```json
{
  "exec": "node --inspect -r ts-node/register -r tsconfig-paths/register src/main.ts"
}
```

add `../nestjs-package-jwt-authentication/dist` to `watch`, this way we have hot reload working with `start:dev` and `start:debug` in consumer app

`nestjs-package-jwt-authentication-consumer/nodemon.json`
`nestjs-package-jwt-authentication-consumer/nodemon-debug.json`

```json
{
  "watch": ["src", "../nestjs-package-jwt-authentication/dist"],
  ...
}
```

### Do some changes in package

```shell
# in window 1 : nestjs-package-jwt-authentication-consumer
$ npm run start:debug
# in window 2 : nestjs-package-jwt-authentication
$ npm run start:dev
```

Make a simple change to the `nestjs-package-jwt-authentication/src/test.ts` `getHello()` function exported by the package, change it to return 'Buon Giorno!'

> Note: use `npm run start:debug` and add a `breakpoint/debugger;`

```typescript
export function getHello(): string {
  debugger;
  return 'Buon Giorno!';
}
```

Notice that in terminal window 2, since we're linked to the local package, the dev server will automatically restart as the package is rebuilt :)

```shell
$ curl localhost:3000
Buon Giorno!
```

now we have our development environment ready to roll

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

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

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

@Injectable()
export class AppService {
  constructor(
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
    return this.authService.getToken({ username: 'koakh', userId: 28 });
  }
};
```

### Run consumer app

```shell
$ npm run start:debug
# test jwt
$ curl localhost:3000
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvYWtoIiwic3ViIjoyOCwiaWF0IjoxNjAxNjU1NjQ5LCJleHAiOjE2MDE2NTU3MDl9.8RiWhyrMlZaUdsDG-Web5kNLldelkKffk7o221KQWF8
```

done, we have a nestjs package working inside our own package without issues, great we can use nestjs packages, node modules
