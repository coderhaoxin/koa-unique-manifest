'use strict';

var readall = require('readall'),
  Stream = require('stream'),
  uid = require('uid-safe');

module.exports = uniqueManifest;

function uniqueManifest() {
  return function * (next) {
    yield * next;

    if (this.response.type === 'text/cache-manifest') {
      var body = this.response.body;

      if (!body) return;

      if (body instanceof Stream) body = yield read(body);

      if (Buffer.isBuffer(body)) body = body.toString();

      if (typeof body === 'string') this.body = yield * unique(body);
    }
  };
}

function * unique(s) {
  var u = yield uid(32);

  if (s.match(/version/i)) {
    return s.replace(/VERSION.*/i, 'VERSION: ' + u + '\n');
  }

  return s + '\n' + '# VERSION: ' + u + '\n';
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
