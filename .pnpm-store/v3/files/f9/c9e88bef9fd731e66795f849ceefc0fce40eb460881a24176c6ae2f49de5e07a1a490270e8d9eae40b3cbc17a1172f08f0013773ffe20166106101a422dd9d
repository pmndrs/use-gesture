import { Program, CallExpression } from '@tsd/typescript';
import { Assertion } from './assertions';
import { Location, Diagnostic } from './interfaces';
/**
 * Extract all assertions.
 *
 * @param program - TypeScript program.
 */
export declare const extractAssertions: (program: Program) => Map<Assertion, Set<CallExpression>>;
export declare type ExpectedError = Pick<Diagnostic, 'fileName' | 'line' | 'column'>;
/**
 * Loop over all the error assertion nodes and convert them to a location map.
 *
 * @param assertions - Assertion map.
 */
export declare const parseErrorAssertionToLocation: (assertions: Map<Assertion, Set<CallExpression>>) => Map<Location, ExpectedError>;
