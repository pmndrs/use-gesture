/* @flow */
/* eslint-disable no-use-before-define */

import { isType, parse, isOutputType, isInputType } from '../graphql';
import { GraphQLType, GraphQLNamedType, GraphQLOutputType, GraphQLInputType } from '../graphql';
import { isFunction } from './is';
import { inspect } from './misc';
import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { InputTypeComposer } from '../InputTypeComposer';
import { ScalarTypeComposer } from '../ScalarTypeComposer';
import { EnumTypeComposer } from '../EnumTypeComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { UnionTypeComposer } from '../UnionTypeComposer';
import { Resolver } from '../Resolver';
import { NonNullComposer } from '../NonNullComposer';
import { ListComposer } from '../ListComposer';
import { ThunkComposer } from '../ThunkComposer';
import { TypeAsString } from '../TypeMapper';
import { SchemaComposer } from '../SchemaComposer';

export type AnyTypeComposer<TContext> =
  | NamedTypeComposer<TContext>
  | ListComposer<any>
  | NonNullComposer<any>
  | ThunkComposer<any, any>;

export type NamedTypeComposer<TContext> =
  | ObjectTypeComposer<any, TContext>
  | InputTypeComposer<TContext>
  | EnumTypeComposer<TContext>
  | InterfaceTypeComposer<any, TContext>
  | UnionTypeComposer<any, TContext>
  | ScalarTypeComposer<TContext>;

// Output type should not have `TSource`. It should not affect on main Type source!
export type ComposeNamedOutputType<TContext> =
  | ObjectTypeComposer<any, TContext>
  | EnumTypeComposer<TContext>
  | ScalarTypeComposer<TContext>
  | InterfaceTypeComposer<any, TContext>
  | UnionTypeComposer<any, TContext>;

export type ComposeOutputType<TContext> =
  | ComposeNamedOutputType<TContext>
  | NonNullComposer<any>
  | ListComposer<any>
  | ThunkComposer<any, GraphQLOutputType>;

export type ComposeOutputTypeDefinition<TContext> =
  | ComposeOutputType<TContext>
  | GraphQLOutputType
  | TypeAsString
  | Array<
      | ComposeOutputType<TContext>
      | GraphQLOutputType
      | TypeAsString
      | Array<ComposeOutputType<TContext> | GraphQLOutputType | TypeAsString>
    >;

export type ComposeNamedInputType<TContext> =
  | InputTypeComposer<TContext>
  | EnumTypeComposer<TContext>
  | ScalarTypeComposer<TContext>;

export type ComposeInputType =
  | ComposeNamedInputType<any>
  | ThunkComposer<ComposeNamedInputType<any>, GraphQLInputType>
  | NonNullComposer<
      | ComposeNamedInputType<any>
      | ThunkComposer<ComposeNamedInputType<any>, GraphQLInputType>
      | ListComposer<any>
    >
  | ListComposer<
      | ComposeNamedInputType<any>
      | ThunkComposer<ComposeNamedInputType<any>, GraphQLInputType>
      | ListComposer<any>
      | NonNullComposer<any>
    >;

export type ComposeInputTypeDefinition =
  | TypeAsString
  | ComposeInputType
  | GraphQLInputType
  | Array<
      | TypeAsString
      | ComposeInputType
      | GraphQLInputType
      | Array<TypeAsString | ComposeInputType | GraphQLInputType>
    >;

/**
 * Check that string is a valid GraphQL Type name.
 * According to spec valid mask is `/^[_A-Za-z][_0-9A-Za-z]*$/`.
 *
 * Valid names: Person, _Type, Zone51
 * Invalid names: 123, 1c, String!, @Type, A-
 */
export function isTypeNameString(str: string): boolean;

/**
 * Check that provided string is a valid GraphQL type name
 * which can be wrapped by modifiers `[]` or `!`
 *
 * Valid names: Person, Type!, [[Zone51]!]!
 * Invalid names: !1c, [String, @Type
 */
export function isWrappedTypeNameString(str: string): boolean;

/**
 * Checks that string is SDL definition of some type
 * eg. `type Out { name: String! }` or `input Filter { minAge: Int }` etc.
 */
export function isTypeDefinitionString(str: string): boolean;

/**
 * Checks that string is SDL definition of any Output type
 */
export function isSomeOutputTypeDefinitionString(str: string): boolean;

/**
 * Checks that string is SDL definition of any Input type
 */
export function isSomeInputTypeDefinitionString(str: string): boolean;

/**
 * Checks that string is OutputType SDL definition
 * eg. `type Out { name: String! }`
 */
export function isOutputTypeDefinitionString(str: string): boolean;

/**
 * Checks that string is InputType SDL definition
 * eg. `input Filter { minAge: Int }`
 */
export function isInputTypeDefinitionString(str: string): boolean;

/**
 * Checks that string is EnumType SDL definition
 * eg. `enum Sort { ASC DESC }`
 */
export function isEnumTypeDefinitionString(str: string): boolean;

/**
 * Checks that string is ScalarType SDL definition
 * eg. `scalar UInt`
 */
export function isScalarTypeDefinitionString(str: string): boolean;

/**
 * Checks that string is InterfaceType SDL definition
 * eg. `interface User { name: String }`
 */
export function isInterfaceTypeDefinitionString(str: string): boolean;

/**
 * Checks that string is UnionType SDL definition
 * eg. `union User = A | B`
 */
export function isUnionTypeDefinitionString(str: string): boolean;

/**
 * Check that provided TypeComposer is OutputType (Object, Scalar, Enum, Interface, Union).
 * It may be wrapped in NonNull or List.
 */
export function isSomeOutputTypeComposer(type: any): type is ComposeOutputType<any>;

/**
 * Check that provided TypeComposer is InputType (InputObject, Scalar, Enum).
 * It may be wrapped in NonNull or List.
 */
export function isSomeInputTypeComposer(type: any): type is ComposeInputType;

export function isComposeType(type: any): type is ComposeOutputType<any> | ComposeInputType;

export function isComposeOutputType(type: any): type is ComposeOutputType<any>;

export function isComposeInputType(type: any): type is ComposeInputType;

export type AnyType<TContext> = NamedTypeComposer<TContext> | GraphQLNamedType;

export function isNamedTypeComposer(type: any): type is ComposeNamedOutputType<any>;

export function isTypeComposer(type: any): type is AnyTypeComposer<any>;

export function getGraphQLType(anyType: any): GraphQLType;

export function getComposeTypeName(type: any, sc: SchemaComposer<any>): string;

export function unwrapTC<TContext>(anyTC: AnyTypeComposer<TContext>): NamedTypeComposer<TContext>;

export function unwrapInputTC(inputTC: ComposeInputType): ComposeNamedInputType<any>;

export function unwrapOutputTC<TReturn, TContext>(
  outputTC: ComposeOutputType<TContext>
): ComposeNamedOutputType<TContext>;

/**
 * @deprecated Use `replaceTC()` function instead.
 */
export function changeUnwrappedTC<TContext, T>(
  anyTC: T,
  cb: (tc: NamedTypeComposer<TContext>) => NamedTypeComposer<TContext> | void | null
): T | void | null;

/**
 * Replace one TC to another.
 * If type is wrapped with List, NonNull, Thunk then will be replaced inner type and all wrappers will be preserved in the same order.
 *
 * @example
 *   1) replaceTC(A, B)
 *      // returns `B`
 *   2) replaceTC(ListComposer(NonNullComposer(A)), B)
 *      // returns `ListComposer(NonNullComposer(B))`
 *   3) replaceTC(ListComposer(A), (A) => { A.addFields({ f: 'Int' }); return A; })
 *      // returns `ListComposer(A)` where A will be with new field
 *   4) replaceTC(ListComposer(A), (A) => { return someCheck(A) ? B : C; })
 *      // returns `ListComposer(B or C)` B or C depends on `someCheck`
 *
 * @param anyTC may be AnyTypeComposer
 * @param replaceByTC can be a NamedTypeComposer or a callback which gets NamedTypeComposer and should return updated or new NamedTypeComposer
 */
export function replaceTC<T>(
  anyTC: T,
  replaceByTC:
    | NamedTypeComposer<any>
    | ((unwrappedTC: NamedTypeComposer<any>) => NamedTypeComposer<any>)
): T;

/**
 * Remove modifiers `[]` and `!` from type name.
 *
 * Eg. Int! -> Int, [String!]! -> String
 */
export function unwrapTypeNameString(str: string): string;

/**
 * Clone any type to the new SchemaComposer.
 * It may be: ComposeType, string, Wrapped ComposeType, GraphQL any type
 */
export function cloneTypeTo(
  type: AnyTypeComposer<any> | TypeAsString | GraphQLType,
  anotherSchemaComposer: SchemaComposer<any>,
  cloneMap?: Map<any, any>
): AnyTypeComposer<any> | TypeAsString;
