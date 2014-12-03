'use strict';

var request = require('supertest'),
  serve = require('koa-static'),
  assert = require('assert'),
  equal = assert.deepEqual,
  unique = require('..'),
  koa = require('koa'),
  app = koa();

describe('# koa-unique-manifest', function() {
  app.use(unique(2));
  app.use(serve('test'));

  describe('has origin version', function() {
    var text;

    it('1', function(done) {
      request(app.listen())
        .get('/1.manifest')
        .end(function(err, res) {
          assertError(err);
          assertHeaders(res.headers);
          equal(res.status, 200);
          text = res.text;
          done();
        });
    });

    it('2 - same', function(done) {
      request(app.listen())
        .get('/1.manifest')
        .end(function(err, res) {
          assertError(err);
          assertHeaders(res.headers);
          equal(res.status, 200);
          assert(res.text === text);
          done();
        });
    });

    it('3 - changed', function(done) {
      request(app.listen())
        .get('/1.manifest')
        .end(function(err, res) {
          assertError(err);
          assertHeaders(res.headers);
          equal(res.status, 200);
          assert(res.text !== text);
          text = res.text;
          done();
        });
    });

    it('4 - same', function(done) {
      request(app.listen())
        .get('/1.manifest')
        .end(function(err, res) {
          assertError(err);
          assertHeaders(res.headers);
          equal(res.status, 200);
          assert(res.text === text);
          done();
        });
    });
  });

  describe('no origin version', function() {
    var text;

    it('2 - same', function(done) {
      request(app.listen())
        .get('/2.manifest')
        .end(function(err, res) {
          assertError(err);
          assertHeaders(res.headers);
          equal(res.status, 200);
          text = res.text;
          done();
        });
    });

    it('2 - same', function(done) {
      request(app.listen())
        .get('/2.manifest')
        .end(function(err, res) {
          assertError(err);
          assertHeaders(res.headers);
          equal(res.status, 200);
          assert(res.text === text);
          done();
        });
    });

    it('3 - changed', function(done) {
      request(app.listen())
        .get('/2.manifest')
        .end(function(err, res) {
          assertError(err);
          assertHeaders(res.headers);
          equal(res.status, 200);
          assert(res.text !== text);
          done();
        });
    });
  });
});

function assertError(e) {
  if (e) console.error(e);

  assert(!e, 'error exist');
}

function assertHeaders(headers) {
  equal(headers['cache-control'], 'no-store, no-cache, must-revalidate');
  equal(headers.pragma, 'no-cache');
  equal(headers.expires, '0');
}
