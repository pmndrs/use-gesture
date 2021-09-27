"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressionToString = exports.resolveJSDocTags = void 0;
const typescript_1 = require("@tsd/typescript");
/**
 * Resolve the JSDoc tags from the expression. If these tags couldn't be found, it will return `undefined`.
 *
 * @param checker - The TypeScript type checker.
 * @param expression - The expression to resolve the JSDoc tags for.
 * @return A unique Set of JSDoc tags or `undefined` if they couldn't be resolved.
 */
const resolveJSDocTags = (checker, expression) => {
    const ref = typescript_1.isCallLikeExpression(expression)
        ? checker.getResolvedSignature(expression)
        : checker.getSymbolAtLocation(expression);
    if (!ref) {
        return;
    }
    return new Map(ref.getJsDocTags().map(tag => [tag.name, tag]));
};
exports.resolveJSDocTags = resolveJSDocTags;
/**
 * Convert a TypeScript expression to a string.
 *
 * @param checker - The TypeScript type checker.
 * @param expression - The expression to convert.
 * @return The string representation of the expression or `undefined` if it couldn't be resolved.
 */
const expressionToString = (checker, expression) => {
    if (typescript_1.isCallLikeExpression(expression)) {
        const signature = checker.getResolvedSignature(expression);
        if (!signature) {
            return;
        }
        return checker.signatureToString(signature);
    }
    const symbol = checker.getSymbolAtLocation(expression);
    if (!symbol) {
        return;
    }
    return checker.symbolToString(symbol, expression);
};
exports.expressionToString = expressionToString;
