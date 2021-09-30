"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _omggif = _interopRequireDefault(require("omggif"));

var _gifwrap = require("gifwrap");

var MIME_TYPE = 'image/gif';

var _default = function _default() {
  return {
    mime: (0, _defineProperty2["default"])({}, MIME_TYPE, ['gif']),
    constants: {
      MIME_GIF: MIME_TYPE
    },
    decoders: (0, _defineProperty2["default"])({}, MIME_TYPE, function (data) {
      var gifObj = new _omggif["default"].GifReader(data);
      var gifData = Buffer.alloc(gifObj.width * gifObj.height * 4);
      gifObj.decodeAndBlitFrameRGBA(0, gifData);
      return {
        data: gifData,
        width: gifObj.width,
        height: gifObj.height
      };
    }),
    encoders: (0, _defineProperty2["default"])({}, MIME_TYPE, function (data) {
      var bitmap = new _gifwrap.BitmapImage(data.bitmap);

      _gifwrap.GifUtil.quantizeDekker(bitmap, 256);

      var newFrame = new _gifwrap.GifFrame(bitmap);
      var gifCodec = new _gifwrap.GifCodec();
      return gifCodec.encodeGif([newFrame], {}).then(function (newGif) {
        return newGif.buffer;
      });
    })
  };
};

exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=index.js.map