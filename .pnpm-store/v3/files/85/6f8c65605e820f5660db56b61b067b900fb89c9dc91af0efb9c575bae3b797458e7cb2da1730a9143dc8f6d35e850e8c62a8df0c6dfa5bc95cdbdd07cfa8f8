"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMixins = void 0;
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        var baseProto = baseCtor.prototype;
        Object.getOwnPropertyNames(baseProto).forEach(function (propName) {
            if (propName === "constructor") {
                return;
            }
            var basePropDescriptor = Object.getOwnPropertyDescriptor(baseProto, propName);
            // Handle Accessors
            if (basePropDescriptor &&
                (basePropDescriptor.get || basePropDescriptor.set)) {
                Object.defineProperty(derivedCtor.prototype, propName, basePropDescriptor);
            }
            else {
                derivedCtor.prototype[propName] = baseCtor.prototype[propName];
            }
        });
    });
}
exports.applyMixins = applyMixins;
//# sourceMappingURL=apply_mixins.js.map