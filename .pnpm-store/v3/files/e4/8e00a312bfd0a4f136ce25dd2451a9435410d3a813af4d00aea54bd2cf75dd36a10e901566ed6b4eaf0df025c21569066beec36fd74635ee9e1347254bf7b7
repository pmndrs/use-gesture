"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prinTypeWarning = void 0;
const utils_1 = require("../../utils");
/**
 * Emits a warning diagnostic for every call experession encountered containing the type of the first argument.
 *
 * @param checker - The TypeScript type checker.
 * @param nodes - The `printType` AST nodes.
 * @return List of warning diagnostics containing the type of the first argument.
 */
const prinTypeWarning = (checker, nodes) => {
    const diagnostics = [];
    if (!nodes) {
        return diagnostics;
    }
    for (const node of nodes) {
        const argumentType = checker.getTypeAtLocation(node.arguments[0]);
        const argumentExpression = node.arguments[0].getText();
        diagnostics.push(utils_1.makeDiagnostic(node, `Type for expression \`${argumentExpression}\` is: \`${checker.typeToString(argumentType)}\``, 'warning'));
    }
    return diagnostics;
};
exports.prinTypeWarning = prinTypeWarning;
