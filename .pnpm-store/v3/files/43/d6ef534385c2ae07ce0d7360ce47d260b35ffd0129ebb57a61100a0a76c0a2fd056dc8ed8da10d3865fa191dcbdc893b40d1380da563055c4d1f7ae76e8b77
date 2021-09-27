import { StateNode } from './StateNode.js';

function Machine(config, options, initialContext) {
  if (initialContext === void 0) {
    initialContext = config.context;
  }

  return new StateNode(config, options, initialContext);
}
function createMachine(config, options) {
  return new StateNode(config, options);
}

export { Machine, createMachine };
