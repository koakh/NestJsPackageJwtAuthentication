# NOTES

## Links

- [Publishing NestJS Packages with npm](https://dev.to/nestjs/publishing-nestjs-packages-with-npm-21fm)

## Start NestJs NPM Package

```shell
$ git clone https://github.com/nestjsplus/nestjs-package-starter.git
$ mv nestjs-package-starter nest-js-package-jwt-authentication
# change package name to @koakh/nestjs-auth-package
$ code nest-js-package-jwt-authentication/package.json
```

```json
{
  "name": "@koakh/nest-js-package-jwt-authentication",
  "version": "1.0.0",
  "description": "Koakh NestJS Jwt Authentication Package",
  "author": "Mário Monteiro <marioammonteiro@gmail.com>",
  "license": "MIT",
  "readmeFilename": "README.md",
  "main": "dist/test.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/koakh/NestJsPackageJwtauthentication"
  },
  "bugs": "https://github.com/koakh/NestJsPackageJwtauthentication",
```

## Init Git/Remote Repository

```shell
$ git init
```

## Create remote repository