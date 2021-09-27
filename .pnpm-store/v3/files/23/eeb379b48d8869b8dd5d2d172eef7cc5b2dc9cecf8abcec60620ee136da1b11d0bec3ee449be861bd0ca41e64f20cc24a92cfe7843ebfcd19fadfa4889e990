"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const files_property_1 = require("./files-property");
const types_property_1 = require("./types-property");
// List of custom rules
const rules = new Set([
    files_property_1.default,
    types_property_1.default
]);
/**
 * Get a list of custom diagnostics within the current context.
 *
 * @param context - The context object.
 * @returns List of diagnostics
 */
exports.default = (context) => {
    const diagnostics = [];
    for (const rule of rules) {
        diagnostics.push(...rule(context));
    }
    return diagnostics;
};
