"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = exports.getGlobal = void 0;
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
function getGlobal() {
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    return undefined;
}
exports.getGlobal = getGlobal;
function getDevTools() {
    var global = getGlobal();
    if (global && '__xstate__' in global) {
        return global.__xstate__;
    }
    return undefined;
}
function registerService(service) {
    if (!getGlobal()) {
        return;
    }
    var devTools = getDevTools();
    if (devTools) {
        devTools.register(service);
    }
}
exports.registerService = registerService;
