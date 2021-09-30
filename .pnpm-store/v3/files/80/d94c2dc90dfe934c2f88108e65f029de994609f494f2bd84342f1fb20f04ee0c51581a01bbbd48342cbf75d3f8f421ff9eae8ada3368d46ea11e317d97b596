'use strict';


var ProbeError  = require('./lib/common').ProbeError;
var parsers     = require('./lib/parsers_stream');
var PassThrough = require('stream').PassThrough;
var pipeline    = require('stream').pipeline;


module.exports = function probeStream(src, keepOpen) {
  var proxy = new PassThrough();

  var result = new Promise(function (resolve, reject) {
    src.on('error', reject);
    proxy.on('error', reject);

    var alive_parsers = [];
    var last_error;

    function parserEnd(err) {
      var idx = alive_parsers.indexOf[this];

      /* istanbul ignore if */
      if (idx < 0) return;

      /* istanbul ignore if */
      if (err) last_error = err;

      proxy.unpipe(this);
      this.removeAllListeners();
      alive_parsers.splice(idx, 1);

      if (alive_parsers.length) return;

      // if all parsers finished without success -> fail.
      reject(last_error || new ProbeError('unrecognized file format', 'ECONTENT'));
    }

    Object.keys(parsers).forEach(function (type) {
      var pStream = parsers[type]();

      alive_parsers.push(pStream);

      pStream.once('data', resolve);
      pStream.once('end', parserEnd);
      // User does not need to know that something wrong in parser
      // Process error the same was unrecognized format (end without data)
      pStream.on('error', parserEnd);

      proxy.pipe(pStream);
    });
  });

  function cleanup() {
    // request stream doesn't have unpipe, https://github.com/request/request/issues/874
    if (keepOpen && typeof src.unpipe === 'function') src.unpipe(proxy);
    proxy.destroy();
  }

  result.then(cleanup).catch(cleanup);

  if (keepOpen) src.pipe(proxy);
  else pipeline(src, proxy, function () {});

  return result;
};


module.exports.parsers = parsers;
