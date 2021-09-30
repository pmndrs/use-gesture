'use strict';


var ProbeError  = require('./lib/common').ProbeError;
var needle      = require('needle');
var merge       = require('deepmerge');
var pkg         = require('./package.json');
var probeStream = require('./stream');
var URL         = require('url').URL;

var defaultAgent = pkg.name + '/' + pkg.version + '(+https://github.com/nodeca/probe-image-size)';

var defaults = {
  open_timeout: 10000,
  response_timeout: 60000,
  read_timeout: 60000,
  follow_max: 10,
  // Use to ignore bad certificates.
  //rejectUnauthorized: false,
  headers: {
    'User-Agent': defaultAgent
  }
};


module.exports = function probeHttp(src, options) {
  return new Promise(function (resolve, reject) {
    var stream, len, finalUrl = src;

    try {
      stream = needle.get(src, merge.all([ defaults, options ]));
    } catch (err) {
      reject(err);
      return;
    }

    stream.on('redirect', function (location) {
      finalUrl = new URL(location, finalUrl).href;
    });

    stream.on('header', function (statusCode, headers) {
      if (statusCode !== 200) {
        reject(new ProbeError('bad status code: ' + statusCode, null, statusCode));
        stream.request.abort();
        return;
      }

      len = headers['content-length'];
    });

    stream.on('err', function (err) {
      reject(err);
      stream.request.abort();
    });

    probeStream(stream, true)
      .then(function (result) {
        if (len && len.match(/^\d+$/)) result.length = +len;

        result.url = finalUrl;

        resolve(result);
        stream.request.abort();
      })
      .catch(function (err) {
        reject(err);
        stream.request.abort();
      });
  });
};


module.exports.parsers = require('./lib/parsers_stream');
