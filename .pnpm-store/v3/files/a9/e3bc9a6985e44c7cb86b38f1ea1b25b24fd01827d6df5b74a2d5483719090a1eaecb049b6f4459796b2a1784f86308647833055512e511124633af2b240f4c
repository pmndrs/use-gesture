"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create a diagnostic from the given `node`, `message` and optional `severity`.
 *
 * @param node - The TypeScript Node where this diagnostic occurs.
 * @param message - Message of the diagnostic.
 * @param severity - Severity of the diagnostic.
 */
exports.default = (node, message, severity = 'error') => {
    const position = node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    return {
        fileName: node.getSourceFile().fileName,
        message,
        severity,
        line: position.line + 1,
        column: position.character,
    };
};
