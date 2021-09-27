'use strict';

var ParserStream = require('../common').ParserStream;

var HEADER = 0;
var TYPE_ICO = 1;
var INDEX_SIZE = 16;

// Format specification:
// https://en.wikipedia.org/wiki/ICO_(file_format)#Icon_resource_structure
module.exports = function () {
  var parser = new ParserStream();

  parser._bytes(6, function (data) {
    var header = data.readUInt16LE(0);
    var type = data.readUInt16LE(2);
    var numImages = data.readUInt16LE(4);

    if (header !== HEADER || type !== TYPE_ICO || !numImages) {
      parser._skipBytes(Infinity);
      parser.push(null);
      return;
    }

    parser._bytes(numImages * INDEX_SIZE, function (indexData) {
      parser._skipBytes(Infinity);

      var variants = [];
      var maxSize = { width: 0, height: 0 };

      for (var i = 0; i < numImages; i++) {
        var width = indexData.readUInt8(INDEX_SIZE * i + 0) || 256;
        var height = indexData.readUInt8(INDEX_SIZE * i + 1) || 256;
        var size = { width: width, height: height };
        variants.push(size);

        if (width > maxSize.width || height > maxSize.height) {
          maxSize = size;
        }
      }

      parser.push({
        width: maxSize.width,
        height: maxSize.height,
        variants: variants,
        type: 'ico',
        mime: 'image/x-icon',
        wUnits: 'px',
        hUnits: 'px'
      });
      parser.push(null);
    });
  });

  return parser;
};
