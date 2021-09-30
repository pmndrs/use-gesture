"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseErrorAssertionToLocation = exports.extractAssertions = void 0;
const typescript_1 = require("@tsd/typescript");
const assertions_1 = require("./assertions");
const assertionFnNames = new Set(Object.values(assertions_1.Assertion));
/**
 * Extract all assertions.
 *
 * @param program - TypeScript program.
 */
const extractAssertions = (program) => {
    const assertions = new Map();
    /**
     * Recursively loop over all the nodes and extract all the assertions out of the source files.
     */
    function walkNodes(node) {
        if (typescript_1.isCallExpression(node)) {
            const identifier = node.expression.getText();
            // Check if the call type is a valid assertion
            if (assertionFnNames.has(identifier)) {
                const assertion = identifier;
                const nodes = assertions.get(assertion) || new Set();
                nodes.add(node);
                assertions.set(assertion, nodes);
            }
        }
        typescript_1.forEachChild(node, walkNodes);
    }
    for (const sourceFile of program.getSourceFiles()) {
        walkNodes(sourceFile);
    }
    return assertions;
};
exports.extractAssertions = extractAssertions;
/**
 * Loop over all the error assertion nodes and convert them to a location map.
 *
 * @param assertions - Assertion map.
 */
const parseErrorAssertionToLocation = (assertions) => {
    const nodes = assertions.get(assertions_1.Assertion.EXPECT_ERROR);
    const expectedErrors = new Map();
    if (!nodes) {
        // Bail out if we don't have any error nodes
        return expectedErrors;
    }
    // Iterate over the nodes and add the node range to the map
    for (const node of nodes) {
        const location = {
            fileName: node.getSourceFile().fileName,
            start: node.getStart(),
            end: node.getEnd()
        };
        const pos = node
            .getSourceFile()
            .getLineAndCharacterOfPosition(node.getStart());
        expectedErrors.set(location, {
            fileName: location.fileName,
            line: pos.line + 1,
            column: pos.character
        });
    }
    return expectedErrors;
};
exports.parseErrorAssertionToLocation = parseErrorAssertionToLocation;
