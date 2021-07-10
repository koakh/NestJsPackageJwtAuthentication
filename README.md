# README

## Links

- [GitHub: NestJsPackageJwtAuthentication](https://github.com/koakh/NestJsPackageJwtAuthentication)
- [NPM: NestJsPackageJwtAuthentication](https://www.npmjs.com/package/@koakh/nestjs-package-jwt-authentication)
- Based on [NestJsPackageStarter](https://github.com/koakh/NestJsPackageStarter)

**NestJsPackageJwtAuthentication** is a simple nestjs package to easy bootstrap jwt authentication in nestjs projects.
this project have a `nestjs-package-jwt-authentication` **nestjs package**, and package consumer app `nestjs-package-jwt-authentication-consumer`, nodemon configured on both package and app, hot reload, vscode debugger on package and on consumer app ready to roll

the objective of this package is to create a starter package to build ldap and other data aware userServices on top of it, 
in it's simple form uses a inMemory user repository, next versions are based on ldap and mongo, and will replace inMemory userService with ldap/mongo implementations
watch for it, will me named as:

### future packages

- nestjs-package-jwt-authentication-ldap
- nestjs-package-jwt-authentication-mongo

## Start/Build Development Package

```shell
# in terminal #1
$ cd nestjs-package-jwt-authentication
$ npm run dev
```

## Start Consumer App

```shell
# in terminal #2
$ cd nestjs-package-jwt-authentication-consumer
# start in normal, dev or debug
$ npm run start
$ npm run dev
$ npm run start:debug
```

## Develop both projects

Now develop nestjs package and consumer app with hot reload

## Test Endpoint

```shell
$ curl localhost:3000
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvYWtoIiwic3ViIjoyOCwiaWF0IjoxNjAxOTc2Nzk2LCJleHAiOjE2MDE5NzY4NTZ9.1Em2ZMayqtDC2DQ0_osMjzrgsIhcXDyNtncP7GeZzg8
```

## Test all endpoints with client.http file

> Note: required the awesome [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
