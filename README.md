# README

## Links

- [NestJsPackageJwtAuthentication](https://github.com/koakh/NestJsPackageJwtAuthentication)
- Based on [NestJsPackageStarter](https://github.com/koakh/NestJsPackageStarter)

NestJsPackageJwtAuthentication is a simple nestjs package to easy bootstrap jwt authentication in nestjs projects.
this project have a nestjs package, and package consumer app, nodemon configured on both, hot reload and vscode debugger on package and on consumer app ready to roll

## Start/Build Development Package

```shell
# in terminal #1
$ cd nestjs-package-jwt-authentication
$ npm run start:dev
```

## Start Consumer App

```shell
# in terminal #2
$ cd nestjs-package-jwt-authentication-consumer
# start in dev or debug
$ npm run start:dev
$ npm run start:debug
```

## Develop both projects

Now develop nestjs package and consumer app with hot reload

## Test Endpoint

```shell
$ curl localhost:3000eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvYWtoIiwic3ViIjoyOCwiaWF0IjoxNjAxOTc2Nzk2LCJleHAiOjE2MDE5NzY4NTZ9.1Em2ZMayqtDC2DQ0_osMjzrgsIhcXDyNtncP7GeZzg8
```
