'use strict';

var request = require('supertest'),
  serve = require('koa-static'),
  assert = require('assert'),
  equal = assert.deepEqual,
  unique = require('..'),
  koa = require('koa'),
  app = koa();

describe('# koa-unique-manifest', function() {
  app.use(unique());
  app.use(serve('test'));

  var text;

  it('has origin version', function(done) {
    request(app.listen())
      .get('/1.manifest')
      .end(function(err, res) {
        assertError(err);
        equal(res.status, 200);
        text = res.text;
        done();
      });
  });

  it('has origin version', function(done) {
    request(app.listen())
      .get('/1.manifest')
      .end(function(err, res) {
        assertError(err);
        equal(res.status, 200);
        assert(res.text !== text);
        done();
      });
  });

  it('no origin version', function(done) {
    request(app.listen())
      .get('/2.manifest')
      .end(function(err, res) {
        assertError(err);
        equal(res.status, 200);
        text = res.text;
        done();
      });
  });

  it('no origin version', function(done) {
    request(app.listen())
      .get('/2.manifest')
      .end(function(err, res) {
        assertError(err);
        equal(res.status, 200);
        assert(res.text !== text);
        done();
      });
  });
});

function assertError(e) {
  if (e) console.error(e);

  assert(!e, 'error exist');
}
