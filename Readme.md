[![NPM version][npm-img]][npm-url]
[![Build status][travis-img]][travis-url]
[![Test coverage][coveralls-img]][coveralls-url]
[![License][license-img]][license-url]
[![Dependency status][david-img]][david-url]

### koa-unique-manifest
make manifest file unique for per (count) requests, only for developing.

```js
var uniqueManifest = require('koa-unique-manifest'),
  koa = require('koa'),
  app = koa();

var count = 10; // default is: 4

app.use(uniqueManifest(count));
```

### License
MIT

[npm-img]: https://img.shields.io/npm/v/koa-unique-manifest.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-unique-manifest
[travis-img]: https://img.shields.io/travis/coderhaoxin/koa-unique-manifest.svg?style=flat-square
[travis-url]: https://travis-ci.org/coderhaoxin/koa-unique-manifest
[coveralls-img]: https://img.shields.io/coveralls/coderhaoxin/koa-unique-manifest.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/coderhaoxin/koa-unique-manifest?branch=master
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[david-img]: https://img.shields.io/david/coderhaoxin/koa-unique-manifest.svg?style=flat-square
[david-url]: https://david-dm.org/coderhaoxin/koa-unique-manifest
