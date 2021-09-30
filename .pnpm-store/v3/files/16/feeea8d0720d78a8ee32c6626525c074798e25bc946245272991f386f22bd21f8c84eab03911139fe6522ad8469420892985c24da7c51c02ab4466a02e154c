"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleRangeHeaders;

var _rangeParser = _interopRequireDefault(require("range-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleRangeHeaders(context, content, req, res) {
  // assumes express API. For other servers, need to add logic to access
  // alternative header APIs
  if (res.set) {
    res.set("Accept-Ranges", "bytes");
  } else {
    res.setHeader("Accept-Ranges", "bytes");
  }

  let range; // Express API

  if (req.get) {
    range = req.get("range");
  } // Node.js API
  else {
      ({
        range
      } = req.headers);
    }

  if (range) {
    const ranges = (0, _rangeParser.default)(content.length, range); // unsatisfiable

    if (ranges === -1) {
      // Express API
      if (res.set) {
        res.set("Content-Range", `bytes */${content.length}`);
        res.status(416);
      } // Node.js API
      else {
          // eslint-disable-next-line no-param-reassign
          res.statusCode = 416;
          res.setHeader("Content-Range", `bytes */${content.length}`);
        }
    } else if (ranges === -2) {
      // malformed header treated as regular response
      context.logger.error("A malformed Range header was provided. A regular response will be sent for this request.");
    } else if (ranges.length !== 1) {
      // multiple ranges treated as regular response
      context.logger.error("A Range header with multiple ranges was provided. Multiple ranges are not supported, so a regular response will be sent for this request.");
    } else {
      // valid range header
      const {
        length
      } = content; // Express API

      if (res.set) {
        // Content-Range
        res.status(206);
        res.set("Content-Range", `bytes ${ranges[0].start}-${ranges[0].end}/${length}`);
      } // Node.js API
      else {
          // Content-Range
          // eslint-disable-next-line no-param-reassign
          res.statusCode = 206;
          res.setHeader("Content-Range", `bytes ${ranges[0].start}-${ranges[0].end}/${length}`);
        } // eslint-disable-next-line no-param-reassign


      content = content.slice(ranges[0].start, ranges[0].end + 1);
    }
  }

  return content;
}