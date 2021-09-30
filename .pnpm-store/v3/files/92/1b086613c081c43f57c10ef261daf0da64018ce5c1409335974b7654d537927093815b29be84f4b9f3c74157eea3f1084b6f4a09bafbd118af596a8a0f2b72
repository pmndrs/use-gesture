"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapper;

var _path = _interopRequireDefault(require("path"));

var _mimeTypes = _interopRequireDefault(require("mime-types"));

var _getFilenameFromUrl = _interopRequireDefault(require("./utils/getFilenameFromUrl"));

var _handleRangeHeaders = _interopRequireDefault(require("./utils/handleRangeHeaders"));

var _ready = _interopRequireDefault(require("./utils/ready"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapper(context) {
  return async function middleware(req, res, next) {
    const acceptedMethods = context.options.methods || ["GET", "HEAD"]; // fixes #282. credit @cexoso. in certain edge situations res.locals is undefined.
    // eslint-disable-next-line no-param-reassign

    res.locals = res.locals || {};

    if (!acceptedMethods.includes(req.method)) {
      await goNext();
      return;
    }

    (0, _ready.default)(context, processRequest, req);

    async function goNext() {
      if (!context.options.serverSideRender) {
        return next();
      }

      return new Promise(resolve => {
        (0, _ready.default)(context, () => {
          // eslint-disable-next-line no-param-reassign
          res.locals.webpack = {
            devMiddleware: context
          };
          resolve(next());
        }, req);
      });
    }

    async function processRequest() {
      const filename = (0, _getFilenameFromUrl.default)(context, req.url);
      let {
        headers
      } = context.options;

      if (typeof headers === "function") {
        headers = headers(req, res, context);
      }

      let content;

      if (!filename) {
        await goNext();
        return;
      }

      try {
        content = context.outputFileSystem.readFileSync(filename);
      } catch (_ignoreError) {
        await goNext();
        return;
      }

      const contentTypeHeader = res.get ? res.get("Content-Type") : res.getHeader("Content-Type");

      if (!contentTypeHeader) {
        // content-type name(like application/javascript; charset=utf-8) or false
        const contentType = _mimeTypes.default.contentType(_path.default.extname(filename)); // Only set content-type header if media type is known
        // https://tools.ietf.org/html/rfc7231#section-3.1.1.5


        if (contentType) {
          // Express API
          if (res.set) {
            res.set("Content-Type", contentType);
          } // Node.js API
          else {
              res.setHeader("Content-Type", contentType);
            }
        }
      }

      if (headers) {
        const names = Object.keys(headers);

        for (const name of names) {
          // Express API
          if (res.set) {
            res.set(name, headers[name]);
          } // Node.js API
          else {
              res.setHeader(name, headers[name]);
            }
        }
      } // Buffer


      content = (0, _handleRangeHeaders.default)(context, content, req, res); // Express API

      if (res.send) {
        res.send(content);
      } // Node.js API
      else {
          res.setHeader("Content-Length", content.length);

          if (req.method === "HEAD") {
            res.end();
          } else {
            res.end(content);
          }
        }
    }
  };
}