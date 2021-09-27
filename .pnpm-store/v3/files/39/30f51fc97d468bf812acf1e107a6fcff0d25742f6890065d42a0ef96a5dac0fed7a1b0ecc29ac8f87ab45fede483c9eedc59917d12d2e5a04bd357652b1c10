"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = exports.Assertion = void 0;
const handlers_1 = require("./handlers");
var Assertion;
(function (Assertion) {
    Assertion["EXPECT_TYPE"] = "expectType";
    Assertion["EXPECT_NOT_TYPE"] = "expectNotType";
    Assertion["EXPECT_ERROR"] = "expectError";
    Assertion["EXPECT_ASSIGNABLE"] = "expectAssignable";
    Assertion["EXPECT_NOT_ASSIGNABLE"] = "expectNotAssignable";
    Assertion["EXPECT_DEPRECATED"] = "expectDeprecated";
    Assertion["EXPECT_NOT_DEPRECATED"] = "expectNotDeprecated";
    Assertion["PRINT_TYPE"] = "printType";
})(Assertion = exports.Assertion || (exports.Assertion = {}));
// List of diagnostic handlers attached to the assertion
const assertionHandlers = new Map([
    [Assertion.EXPECT_TYPE, handlers_1.isIdentical],
    [Assertion.EXPECT_NOT_TYPE, handlers_1.isNotIdentical],
    [Assertion.EXPECT_NOT_ASSIGNABLE, handlers_1.isNotAssignable],
    [Assertion.EXPECT_DEPRECATED, handlers_1.expectDeprecated],
    [Assertion.EXPECT_NOT_DEPRECATED, handlers_1.expectNotDeprecated],
    [Assertion.PRINT_TYPE, handlers_1.prinTypeWarning]
]);
/**
 * Returns a list of diagnostics based on the assertions provided.
 *
 * @param typeChecker - The TypeScript type checker.
 * @param assertions - Assertion map with the key being the assertion, and the value the list of all those assertion nodes.
 * @returns List of diagnostics.
 */
const handle = (typeChecker, assertions) => {
    const diagnostics = [];
    for (const [assertion, nodes] of assertions) {
        const handler = assertionHandlers.get(assertion);
        if (!handler) {
            // Ignore these assertions as no handler is found
            continue;
        }
        diagnostics.push(...handler(typeChecker, nodes));
    }
    return diagnostics;
};
exports.handle = handle;
