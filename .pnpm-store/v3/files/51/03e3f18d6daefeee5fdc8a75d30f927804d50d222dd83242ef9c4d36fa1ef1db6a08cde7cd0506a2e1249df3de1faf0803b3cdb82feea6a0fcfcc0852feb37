import { CallExpression, TypeChecker } from '@tsd/typescript';
import { Diagnostic } from '../../interfaces';
/**
 * Emits a warning diagnostic for every call experession encountered containing the type of the first argument.
 *
 * @param checker - The TypeScript type checker.
 * @param nodes - The `printType` AST nodes.
 * @return List of warning diagnostics containing the type of the first argument.
 */
export declare const prinTypeWarning: (checker: TypeChecker, nodes: Set<CallExpression>) => Diagnostic[];
