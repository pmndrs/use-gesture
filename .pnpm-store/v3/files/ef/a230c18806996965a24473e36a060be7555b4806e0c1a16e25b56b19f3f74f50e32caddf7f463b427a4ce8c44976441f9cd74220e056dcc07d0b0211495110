"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatter = require("eslint-formatter-pretty");
/**
 * Format the TypeScript diagnostics to a human readable output.
 *
 * @param diagnostics - List of TypeScript diagnostics.
 * @returns Beautiful diagnostics output
 */
exports.default = (diagnostics) => {
    const fileMap = new Map();
    for (const diagnostic of diagnostics) {
        let entry = fileMap.get(diagnostic.fileName);
        if (!entry) {
            entry = {
                filePath: diagnostic.fileName,
                errorCount: 0,
                warningCount: 0,
                messages: []
            };
            fileMap.set(diagnostic.fileName, entry);
        }
        entry.errorCount++;
        entry.messages.push(diagnostic);
    }
    return formatter(Array.from(fileMap.values()));
};
