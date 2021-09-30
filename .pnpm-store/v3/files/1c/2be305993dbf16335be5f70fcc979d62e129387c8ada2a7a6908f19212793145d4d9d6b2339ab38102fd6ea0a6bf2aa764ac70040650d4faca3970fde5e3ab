'use strict';


var probeStream = require('./stream');
var probeHttp   = require('./http');

/* eslint-disable consistent-return */

module.exports = function get_image_size(src, options) {

  if (typeof src.on === 'function' && typeof src.emit === 'function') {
    // looks like an EventEmitter, treating it as a stream
    return probeStream(src, options);
  }

  // HTTP (not stream)
  return probeHttp(src, options || {});
};


module.exports.parsers = require('./lib/parsers_stream');
module.exports.sync    = require('./sync');
module.exports.Error   = require('./lib/common').ProbeError;
