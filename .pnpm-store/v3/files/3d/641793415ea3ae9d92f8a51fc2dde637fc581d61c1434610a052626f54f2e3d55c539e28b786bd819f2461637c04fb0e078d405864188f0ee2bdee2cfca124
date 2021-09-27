"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const utils_1 = require("../utils");
/**
 * Rule which enforces the use of a `types` property over a `typings` property.
 *
 * @param context - The context object.
 * @returns A list of custom diagnostics.
 */
exports.default = (context) => {
    const { pkg } = context;
    if (!pkg.types && pkg.typings) {
        const packageJsonFullPath = path.join(context.cwd, 'package.json');
        const content = fs.readFileSync(packageJsonFullPath, 'utf8');
        return [
            Object.assign({ fileName: packageJsonFullPath, message: 'Use property `types` instead of `typings`.', severity: 'error' }, utils_1.getJSONPropertyPosition(content, 'typings'))
        ];
    }
    return [];
};
