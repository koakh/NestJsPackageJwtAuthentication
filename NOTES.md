# NOTES

## Links

- [Publishing NestJS Packages with npm](https://dev.to/nestjs/publishing-nestjs-packages-with-npm-21fm)

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
```

## Update starter dependencies to nest 7.0




## Build the package

Take a moment to poke around in the nestjs-package-starter folder. Here are a few things to notice: