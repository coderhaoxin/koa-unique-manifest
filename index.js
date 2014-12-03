'use strict';

var readall = require('readall'),
  Stream = require('stream'),
  uid = require('uid-safe');

module.exports = uniqueManifest;

function uniqueManifest(count) {
  count = count || 4;
  var total = 0;
  var u;

  return function * uniqueManifest(next) {
    yield * next;

    if (this.response.type === 'text/cache-manifest') {
      var body = this.response.body;

      this.set('Cache-Control', 'no-store, no-cache, must-revalidate');
      this.set('Pragma', 'no-cache');
      this.set('Expires', 0);

      if (!body) return;

      if (body instanceof Stream) body = yield read(body);

      if (Buffer.isBuffer(body)) body = body.toString();

      if (typeof body === 'string') this.body = yield * unique(body);
    }
  };

  function * unique(s) {
    if (!u || (++total % count === 0)) {
      u = yield uid(32);
    }

    if (s.match(/version/i)) {
      return s.replace(/VERSION.*/i, 'VERSION: ' + u + '\n');
    }

    return s + '\n' + '# VERSION: ' + u + '\n';
  }
}

function read(s) {
  return new Promise(function(resolve, reject) {
    readall(s, function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
