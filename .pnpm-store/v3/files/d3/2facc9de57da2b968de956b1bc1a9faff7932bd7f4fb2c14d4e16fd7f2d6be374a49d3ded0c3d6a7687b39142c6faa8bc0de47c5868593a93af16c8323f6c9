"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const create_testing_library_rule_1 = require("../create-testing-library-rule");
const utils_1 = require("../utils");
exports.RULE_NAME = 'no-node-access';
exports.default = (0, create_testing_library_rule_1.createTestingLibraryRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow direct Node access',
            category: 'Best Practices',
            recommendedConfig: {
                dom: false,
                angular: 'error',
                react: 'error',
                vue: 'error',
            },
        },
        messages: {
            noNodeAccess: 'Avoid direct Node access. Prefer using the methods from Testing Library.',
        },
        schema: [],
    },
    defaultOptions: [],
    create(context, _, helpers) {
        function showErrorForNodeAccess(node) {
            if (!helpers.isTestingLibraryImported(true)) {
                return;
            }
            if (experimental_utils_1.ASTUtils.isIdentifier(node.property) &&
                utils_1.ALL_RETURNING_NODES.includes(node.property.name)) {
                context.report({
                    node,
                    loc: node.property.loc.start,
                    messageId: 'noNodeAccess',
                });
            }
        }
        return {
            'ExpressionStatement MemberExpression': showErrorForNodeAccess,
            'VariableDeclarator MemberExpression': showErrorForNodeAccess,
        };
    },
});
