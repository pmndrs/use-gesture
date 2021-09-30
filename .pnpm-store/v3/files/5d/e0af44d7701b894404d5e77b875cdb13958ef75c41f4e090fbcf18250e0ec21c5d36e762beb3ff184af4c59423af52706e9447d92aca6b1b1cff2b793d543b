"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_get_1 = tslib_1.__importDefault(require("lodash.get"));
const TypeScriptCompileError_1 = tslib_1.__importDefault(require("./Errors/TypeScriptCompileError"));
const loader = (filePath) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        require('ts-node/register');
        const result = require(filePath);
        return lodash_get_1.default(result, 'default', result);
    }
    catch (error) {
        // Replace with logger class OR throw a more specific error
        throw TypeScriptCompileError_1.default.fromError(error);
    }
});
exports.default = loader;
//# sourceMappingURL=index.js.map