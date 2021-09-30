"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const create_testing_library_rule_1 = require("../create-testing-library-rule");
const node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'no-await-sync-events';
const USER_EVENT_ASYNC_EXCEPTIONS = ['type', 'keyboard'];
exports.default = (0, create_testing_library_rule_1.createTestingLibraryRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow unnecessary `await` for sync events',
            category: 'Best Practices',
            recommendedConfig: {
                dom: false,
                angular: false,
                react: false,
                vue: false,
            },
        },
        messages: {
            noAwaitSyncEvents: '`{{ name }}` is sync and does not need `await` operator',
        },
        schema: [],
    },
    defaultOptions: [],
    create(context, _, helpers) {
        return {
            'AwaitExpression > CallExpression'(node) {
                var _a;
                const simulateEventFunctionIdentifier = (0, node_utils_1.getDeepestIdentifierNode)(node);
                if (!simulateEventFunctionIdentifier) {
                    return;
                }
                const isSimulateEventMethod = helpers.isUserEventMethod(simulateEventFunctionIdentifier) ||
                    helpers.isFireEventMethod(simulateEventFunctionIdentifier);
                if (!isSimulateEventMethod) {
                    return;
                }
                const lastArg = node.arguments[node.arguments.length - 1];
                const hasDelay = (0, node_utils_1.isObjectExpression)(lastArg) &&
                    lastArg.properties.some((property) => (0, node_utils_1.isProperty)(property) &&
                        experimental_utils_1.ASTUtils.isIdentifier(property.key) &&
                        property.key.name === 'delay' &&
                        (0, node_utils_1.isLiteral)(property.value) &&
                        !!property.value.value &&
                        property.value.value > 0);
                const simulateEventFunctionName = simulateEventFunctionIdentifier.name;
                if (USER_EVENT_ASYNC_EXCEPTIONS.includes(simulateEventFunctionName) &&
                    hasDelay) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'noAwaitSyncEvents',
                    data: {
                        name: `${(_a = (0, node_utils_1.getPropertyIdentifierNode)(node)) === null || _a === void 0 ? void 0 : _a.name}.${simulateEventFunctionName}`,
                    },
                });
            },
        };
    },
});
