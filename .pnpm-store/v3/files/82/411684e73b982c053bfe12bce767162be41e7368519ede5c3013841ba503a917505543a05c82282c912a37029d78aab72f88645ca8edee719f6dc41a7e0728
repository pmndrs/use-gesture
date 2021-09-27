"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineNameProp = exports.functionName = exports.classNameFromInstance = void 0;
var utils_1 = require("@chevrotain/utils");
function classNameFromInstance(instance) {
    return functionName(instance.constructor);
}
exports.classNameFromInstance = classNameFromInstance;
var NAME = "name";
/**
 * Utility to obtain Function names.
 * Note that there should not be an assumptions on the result of this function.
 * E.g: When running from minified source code the result may be auto generated.
 */
function functionName(func) {
    // Engines that support Function.prototype.name OR the nth (n>1) time after
    // the name has been computed in the following else block.
    var existingNameProp = func.name;
    /* istanbul ignore else - too many hacks for IE/old versions of node.js here*/
    if (existingNameProp) {
        return existingNameProp;
    }
    else {
        return "anonymous";
    }
}
exports.functionName = functionName;
/**
 * @returns {boolean} - has the property been successfully defined
 */
function defineNameProp(obj, nameValue) {
    var namePropDescriptor = Object.getOwnPropertyDescriptor(obj, NAME);
    /* istanbul ignore else -> will only run in old versions of node.js */
    if (utils_1.isUndefined(namePropDescriptor) || namePropDescriptor.configurable) {
        Object.defineProperty(obj, NAME, {
            enumerable: false,
            configurable: true,
            writable: false,
            value: nameValue
        });
        return true;
    }
    /* istanbul ignore next -> will only run in old versions of node.js */
    return false;
}
exports.defineNameProp = defineNameProp;
//# sourceMappingURL=lang_extensions.js.map