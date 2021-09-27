"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const create_testing_library_rule_1 = require("../create-testing-library-rule");
const node_utils_1 = require("../node-utils");
exports.RULE_NAME = 'prefer-presence-queries';
exports.default = (0, create_testing_library_rule_1.createTestingLibraryRule)({
    name: exports.RULE_NAME,
    meta: {
        docs: {
            category: 'Best Practices',
            description: 'Ensure appropriate `get*`/`query*` queries are used with their respective matchers',
            recommendedConfig: {
                dom: false,
                angular: false,
                react: false,
                vue: false,
            },
        },
        messages: {
            wrongPresenceQuery: 'Use `getBy*` queries rather than `queryBy*` for checking element is present',
            wrongAbsenceQuery: 'Use `queryBy*` queries rather than `getBy*` for checking element is NOT present',
        },
        schema: [],
        type: 'suggestion',
    },
    defaultOptions: [],
    create(context, _, helpers) {
        return {
            'CallExpression Identifier'(node) {
                const expectCallNode = (0, node_utils_1.findClosestCallNode)(node, 'expect');
                if (!expectCallNode || !(0, node_utils_1.isMemberExpression)(expectCallNode.parent)) {
                    return;
                }
                if (!helpers.isSyncQuery(node)) {
                    return;
                }
                const isPresenceQuery = helpers.isGetQueryVariant(node);
                const expectStatement = expectCallNode.parent;
                const isPresenceAssert = helpers.isPresenceAssert(expectStatement);
                const isAbsenceAssert = helpers.isAbsenceAssert(expectStatement);
                if (!isPresenceAssert && !isAbsenceAssert) {
                    return;
                }
                if (isPresenceAssert && !isPresenceQuery) {
                    context.report({ node, messageId: 'wrongPresenceQuery' });
                }
                else if (isAbsenceAssert && isPresenceQuery) {
                    context.report({ node, messageId: 'wrongAbsenceQuery' });
                }
            },
        };
    },
});
