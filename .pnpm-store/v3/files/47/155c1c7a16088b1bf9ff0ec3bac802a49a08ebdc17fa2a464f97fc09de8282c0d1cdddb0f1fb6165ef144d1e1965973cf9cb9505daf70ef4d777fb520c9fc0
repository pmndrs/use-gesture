"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectNotDeprecated = exports.expectDeprecated = void 0;
const utils_1 = require("../../utils");
const expectDeprecatedHelper = (options) => {
    return (checker, nodes) => {
        const diagnostics = [];
        if (!nodes) {
            // Bail out if we don't have any nodes
            return diagnostics;
        }
        for (const node of nodes) {
            const argument = node.arguments[0];
            const tags = utils_1.tsutils.resolveJSDocTags(checker, argument);
            if (!tags || !options.filter(tags)) {
                // Bail out if not tags couldn't be resolved or when the node matches the filter expression
                continue;
            }
            const message = utils_1.tsutils.expressionToString(checker, argument);
            diagnostics.push(utils_1.makeDiagnostic(node, options.message(message || '?')));
        }
        return diagnostics;
    };
};
/**
 * Assert that the argument from the `expectDeprecated` statement is marked as `@deprecated`.
 * If it's not marked as `@deprecated`, an error diagnostic is returned.
 *
 * @param checker - The TypeScript type checker.
 * @param nodes - The `expectDeprecated` AST nodes.
 * @return List of diagnostics.
 */
exports.expectDeprecated = expectDeprecatedHelper({
    filter: tags => !tags.has('deprecated'),
    message: signature => `Expected \`${signature}\` to be marked as \`@deprecated\``
});
/**
 * Assert that the argument from the `expectNotDeprecated` statement is not marked as `@deprecated`.
 * If it's marked as `@deprecated`, an error diagnostic is returned.
 *
 * @param checker - The TypeScript type checker.
 * @param nodes - The `expectNotDeprecated` AST nodes.
 * @return List of diagnostics.
 */
exports.expectNotDeprecated = expectDeprecatedHelper({
    filter: tags => tags.has('deprecated'),
    message: signature => `Expected \`${signature}\` to not be marked as \`@deprecated\``
});
