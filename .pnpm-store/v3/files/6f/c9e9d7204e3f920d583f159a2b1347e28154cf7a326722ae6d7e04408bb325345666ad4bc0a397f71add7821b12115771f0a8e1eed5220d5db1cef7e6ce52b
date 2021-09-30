"use strict";

exports.__esModule = true;
exports.getMessenger = exports.isWorker = void 0;

var _types = require("./types");

var _utils = require("./utils");

/**
 * Used to check wether current context is executed in worker process
 */
let isWorker = false;
exports.isWorker = isWorker;

let getMessenger = function () {
  return undefined;
};

exports.getMessenger = getMessenger;

if (process.send && process.env.GATSBY_WORKER_MODULE_PATH) {
  exports.isWorker = isWorker = true;
  const listeners = [];
  const ensuredSendToMain = process.send.bind(process);

  function onError(error) {
    if (error == null) {
      error = new Error(`"null" or "undefined" thrown`);
    }

    const msg = [_types.ERROR, error.constructor && error.constructor.name, error.message, error.stack, error];
    ensuredSendToMain(msg);
  }

  function onResult(result) {
    const msg = [_types.RESULT, result];
    ensuredSendToMain(msg);
  }

  const MESSAGING_VERSION = 1;

  exports.getMessenger = getMessenger = function () {
    return {
      onMessage(listener) {
        listeners.push(listener);
      },

      sendMessage(msg) {
        const poolMsg = [_types.CUSTOM_MESSAGE, msg];
        ensuredSendToMain(poolMsg);
      },

      messagingVersion: MESSAGING_VERSION
    };
  };

  const child = require(process.env.GATSBY_WORKER_MODULE_PATH);

  function messageHandler(msg) {
    if (msg[0] === _types.EXECUTE) {
      let result;

      try {
        result = child[msg[1]].call(child, ...msg[2]);
      } catch (e) {
        onError(e);
        return;
      }

      if ((0, _utils.isPromise)(result)) {
        result.then(onResult, onError);
      } else {
        onResult(result);
      }
    } else if (msg[0] === _types.END) {
      process.off(`message`, messageHandler);
    } else if (msg[0] === _types.CUSTOM_MESSAGE) {
      for (const listener of listeners) {
        listener(msg[1]);
      }
    }
  }

  process.on(`message`, messageHandler);
}