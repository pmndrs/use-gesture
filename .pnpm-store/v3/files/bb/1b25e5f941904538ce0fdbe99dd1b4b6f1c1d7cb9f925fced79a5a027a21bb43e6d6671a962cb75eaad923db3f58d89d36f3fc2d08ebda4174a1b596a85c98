import { TypeChecker, Expression, JSDocTagInfo } from '@tsd/typescript';
/**
 * Resolve the JSDoc tags from the expression. If these tags couldn't be found, it will return `undefined`.
 *
 * @param checker - The TypeScript type checker.
 * @param expression - The expression to resolve the JSDoc tags for.
 * @return A unique Set of JSDoc tags or `undefined` if they couldn't be resolved.
 */
export declare const resolveJSDocTags: (checker: TypeChecker, expression: Expression) => Map<string, JSDocTagInfo> | undefined;
/**
 * Convert a TypeScript expression to a string.
 *
 * @param checker - The TypeScript type checker.
 * @param expression - The expression to convert.
 * @return The string representation of the expression or `undefined` if it couldn't be resolved.
 */
export declare const expressionToString: (checker: TypeChecker, expression: Expression) => string | undefined;
