'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var StateNode = require('./StateNode.js');

function Machine(config, options, initialContext) {
  if (initialContext === void 0) {
    initialContext = config.context;
  }

  return new StateNode.StateNode(config, options, initialContext);
}
function createMachine(config, options) {
  return new StateNode.StateNode(config, options);
}

exports.Machine = Machine;
exports.createMachine = createMachine;
