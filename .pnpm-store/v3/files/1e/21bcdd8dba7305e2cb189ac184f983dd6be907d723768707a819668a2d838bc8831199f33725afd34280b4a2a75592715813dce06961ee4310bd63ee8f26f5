"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ready;

// eslint-disable-next-line consistent-return
function ready(context, callback, req) {
  if (context.state) {
    return callback(context.stats);
  }

  const name = req && req.url || callback.name;
  context.logger.info(`wait until bundle finished${name ? `: ${name}` : ""}`);
  context.callbacks.push(callback);
}