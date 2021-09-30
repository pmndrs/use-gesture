"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Retrieve the line and column position of a property in a JSON document.
 *
 * @param content - Content of the JSON document.
 * @param property - Property to search for.
 * @returns Position of the property or `undefined` if the property could not be found.
 */
exports.default = (content, property) => {
    const match = new RegExp(`([\\s\\S]*?)"${property}"`, 'm').exec(content);
    if (!match) {
        return;
    }
    const lines = match[0].split('\n');
    const lastLine = lines[lines.length - 1];
    return {
        line: lines.length,
        column: lastLine ? lastLine.indexOf(`"${property}"`) : 0
    };
};
