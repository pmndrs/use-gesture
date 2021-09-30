/* eslint-disable consistent-return */
// @flow strict

// copied from https://github.com/graphql/graphql-js/blob/master/src/utilities/schemaPrinter.js
// just expose all methods via adding export

import { GraphQLSchema } from 'graphql/type/schema';
import { GraphQLDirective } from 'graphql/type/directives';
import {
  GraphQLArgument,
  GraphQLEnumValue,
  GraphQLNamedType,
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLUnionType,
  GraphQLInputObjectType,
} from 'graphql/type/definition';
import { SchemaComposer } from '../SchemaComposer';

type Options = {
  /**
   * Descriptions are defined as preceding string literals, however an older
   * experimental version of the SDL supported preceding comments as
   * descriptions. Set to true to enable this deprecated behavior.
   * This option is provided to ease adoption and will be removed in v16.
   *
   * Default: false
   */
  commentDescriptions?: boolean;

  /**
   * Do not print descriptions for types
   *
   * Default: false
   */
  omitDescriptions?: boolean;

  /**
   * Do not print Scalars for types
   *
   * Default: false
   */
  omitScalars?: boolean | null;

  /**
   * Do not print @specifiedByUrl for Scalars types
   *
   * Default: false
   */
  omitSpecifiedByUrl?: boolean | null;

  /**
   * Sort fields, args and interfaces.
   * Useful for snapshot testing.
   *
   * Default: false
   */
  sortAll?: boolean;
  sortFields?: boolean;
  sortArgs?: boolean;
  sortInterfaces?: boolean;
  sortUnions?: boolean;
  sortEnums?: boolean;
};

export type SchemaPrinterOptions = Options;

export type SchemaComposerPrinterOptions = Options & {
  include?: string[] | null;
  exclude?: string[] | null;
  omitDirectiveDefinitions?: boolean | null;
};

/**
 * Return schema as a SDL string.
 */
export function printSchemaComposer(
  sc: SchemaComposer<any>,
  options?: SchemaComposerPrinterOptions
): string;

/**
 * Accepts options as a second argument:
 *
 *    - commentDescriptions:
 *        Provide true to use preceding comments as the description.
 *
 */
export function printSchema(schema: GraphQLSchema, options?: Options): string;

export function printIntrospectionSchema(schema: GraphQLSchema, options?: Options): string;

export function isDefinedType(type: GraphQLNamedType): boolean;

export function printFilteredSchema(
  schema: GraphQLSchema,
  directiveFilter: (type: GraphQLDirective) => boolean,
  typeFilter: (type: GraphQLNamedType) => boolean,
  options?: Options
): string;

export function printSchemaDefinition(schema: GraphQLSchema): string | void;

/**
 * GraphQL schema define root types for each type of operation. These types are
 * the same as any other type and can be named in any manner, however there is
 * a common naming convention:
 *
 *   schema {
 *     query: Query
 *     mutation: Mutation
 *   }
 *
 * When using this naming convention, the schema description can be omitted.
 */
export function isSchemaOfCommonNames(schema: GraphQLSchema): boolean;

export function printType(type: GraphQLNamedType, options?: Options): string;

export function printScalar(type: GraphQLScalarType, options?: Options): string;

export function printImplementedInterfaces(
  type: GraphQLObjectType | GraphQLInterfaceType,
  options?: Options
): string;

export function printObject(type: GraphQLObjectType, options?: Options): string;

export function printInterface(type: GraphQLInterfaceType, options?: Options): string;

export function printUnion(type: GraphQLUnionType, options?: Options): string;

export function printEnum(type: GraphQLEnumType, options?: Options): string;

export function printInputObject(type: GraphQLInputObjectType, options?: Options): string;

export function printFields(
  type: GraphQLObjectType | GraphQLInterfaceType,
  options?: Options
): string;

export function printBlock(items: string[]): string;

export function printArgs(args: GraphQLArgument[], options?: Options, indentation?: string): string;

export function printInputValue(arg: GraphQLArgument): string;

export function printDirective(directive: GraphQLDirective, options?: Options): string;

export function printDeprecated(fieldOrEnumVal: GraphQLEnumValue): string;

export function printDescription(
  def: any,
  options?: Options,
  indentation?: string,
  firstInBlock?: boolean
): string;

export function printDescriptionWithComments(
  description: string,
  indentation: string,
  firstInBlock: boolean
): string;
