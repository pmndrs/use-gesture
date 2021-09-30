import { CallExpression, TypeChecker } from '@tsd/typescript';
import { Diagnostic } from '../interfaces';
export declare enum Assertion {
    EXPECT_TYPE = "expectType",
    EXPECT_NOT_TYPE = "expectNotType",
    EXPECT_ERROR = "expectError",
    EXPECT_ASSIGNABLE = "expectAssignable",
    EXPECT_NOT_ASSIGNABLE = "expectNotAssignable",
    EXPECT_DEPRECATED = "expectDeprecated",
    EXPECT_NOT_DEPRECATED = "expectNotDeprecated",
    PRINT_TYPE = "printType"
}
/**
 * Returns a list of diagnostics based on the assertions provided.
 *
 * @param typeChecker - The TypeScript type checker.
 * @param assertions - Assertion map with the key being the assertion, and the value the list of all those assertion nodes.
 * @returns List of diagnostics.
 */
export declare const handle: (typeChecker: TypeChecker, assertions: Map<Assertion, Set<CallExpression>>) => Diagnostic[];
