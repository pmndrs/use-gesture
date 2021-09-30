"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadToml = void 0;
let parse;
function loadToml(filepath, content) {
    if (parse === undefined) {
        const toml = require('@iarna/toml');
        parse = toml.parse;
    }
    try {
        const result = parse(content);
        return result;
    }
    catch (error) {
        error.message = `TOML Error in ${filepath}:\n${error.message}`;
        throw error;
    }
}
exports.loadToml = loadToml;
