# NOTES

## Links

- [Publishing NestJS Packages with npm](https://dev.to/nestjs/publishing-nestjs-packages-with-npm-21fm)

## TLDR

used node version `node/v12.8.1`

## Start NestJs NPM Package

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

## Init Git/Remote Repository

```shell
$ touch README.md
$ git init
$ git add .
$ git commit -am "first commit"
```

## Create remote repository NestJsPackageJwtAuthentication

```shell
git branch -M main
git remote add origin https://github.com/koakh/NestJsPackageJwtAuthentication.git
git push -u origin main
```

## Setting up for development

```shell
$ cd nestjs-package-jwt-authentication/
$ npm i
```

## Create the test app / consumer app

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

## Edit root .gitignore

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

## Update all consumer dependencies to latest and greatest

```shell
$ code nestjs-package-jwt-authentication-consumer/package.json
```

```json
{
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

## Update starter dependencies to nest 7.0

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

## Build the package

Take a moment to poke around in the `nestjs-package-starter/nestjs-package-jwt-authentication` folder

```shell
$ cd nestjs-package-jwt-authentication
$ npm run build
```
