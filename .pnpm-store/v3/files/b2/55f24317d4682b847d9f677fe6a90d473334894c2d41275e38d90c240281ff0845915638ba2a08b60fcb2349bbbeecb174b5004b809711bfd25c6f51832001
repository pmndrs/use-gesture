/* eslint-disable consistent-return */
/* @flow strict */

/**
 * For reference see https://github.com/graphql/graphql-js/blob/master/src/language/ast.js
 */

import type {
  ObjectTypeDefinitionNode,
  InputObjectTypeDefinitionNode,
  EnumTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  ScalarTypeDefinitionNode,
  UnionTypeDefinitionNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  EnumValueDefinitionNode,
  DirectiveNode,
  StringValueNode,
  IntValueNode,
  FloatValueNode,
  BooleanValueNode,
  NullValueNode,
  ListValueNode,
  ObjectValueNode,
  ObjectFieldNode,
  ArgumentNode,
  NamedTypeNode,
  TypeNode,
  ValueNode,
  GraphQLInputType,
} from '../graphql';
import { GraphQLDirective, astFromValue } from '../graphql';
import type { ObjectTypeComposer } from '../ObjectTypeComposer';
import type { InputTypeComposer } from '../InputTypeComposer';
import type { EnumTypeComposer } from '../EnumTypeComposer';
import type { InterfaceTypeComposer, InterfaceTypeComposerThunked } from '../InterfaceTypeComposer';
import type { ScalarTypeComposer } from '../ScalarTypeComposer';
import type { UnionTypeComposer } from '../UnionTypeComposer';
import type { SchemaComposer } from '../SchemaComposer';
import type { AnyTypeComposer } from './typeHelpers';
import type { ExtensionsDirective, DirectiveArgs } from './definitions';
import { ThunkComposer } from '../ThunkComposer';
import { NonNullComposer } from '../NonNullComposer';
import { ListComposer } from '../ListComposer';

/**
 * Get astNode for ObjectTypeComposer.
 */
export function getObjectTypeDefinitionNode(
  tc: ObjectTypeComposer<any, any>
): ObjectTypeDefinitionNode {
  return {
    kind: 'ObjectTypeDefinition',
    name: { kind: 'Name', value: tc.getTypeName() },
    description: getDescriptionNode(tc.getDescription()),
    directives: getDirectiveNodes(tc.getDirectives(), tc.schemaComposer),
    interfaces: getInterfaceNodes(tc.getInterfaces()),
    fields: getFieldDefinitionNodes(tc),
  };
}

/**
 * Get astNode for InputTypeComposer.
 */
export function getInputObjectTypeDefinitionNode(
  tc: InputTypeComposer<any>
): InputObjectTypeDefinitionNode {
  return {
    kind: 'InputObjectTypeDefinition',
    name: { kind: 'Name', value: tc.getTypeName() },
    directives: getDirectiveNodes(tc.getDirectives(), tc.schemaComposer),
    description: getDescriptionNode(tc.getDescription()),
    fields: getInputValueDefinitionNodes(tc),
  };
}

/**
 * Get astNode for EnumTypeComposer.
 */
export function getEnumTypeDefinitionNode(tc: EnumTypeComposer<any>): EnumTypeDefinitionNode {
  return {
    kind: 'EnumTypeDefinition',
    name: { kind: 'Name', value: tc.getTypeName() },
    description: getDescriptionNode(tc.getDescription()),
    directives: getDirectiveNodes(tc.getDirectives(), tc.schemaComposer),
    values: getEnumValueDefinitionNodes(tc),
  };
}

/**
 * Get astNode for InterfaceTypeComposer.
 */
export function getInterfaceTypeDefinitionNode(
  tc: InterfaceTypeComposer<any, any>
): InterfaceTypeDefinitionNode {
  return {
    kind: 'InterfaceTypeDefinition',
    name: { kind: 'Name', value: tc.getTypeName() },
    description: getDescriptionNode(tc.getDescription()),
    directives: getDirectiveNodes(tc.getDirectives(), tc.schemaComposer),
    fields: getFieldDefinitionNodes(tc),
  };
}

/**
 * Get astNode for ScalarTypeComposer.
 */
export function getScalarTypeDefinitionNode(tc: ScalarTypeComposer<any>): ScalarTypeDefinitionNode {
  return {
    kind: 'ScalarTypeDefinition',
    name: { kind: 'Name', value: tc.getTypeName() },
    description: getDescriptionNode(tc.getDescription()),
    directives: getDirectiveNodes(tc.getDirectives(), tc.schemaComposer),
  };
}

/**
 * Get astNode for ScalarTypeComposer.
 */
export function getUnionTypeDefinitionNode(
  tc: UnionTypeComposer<any, any>
): UnionTypeDefinitionNode {
  return {
    kind: 'UnionTypeDefinition',
    name: { kind: 'Name', value: tc.getTypeName() },
    description: getDescriptionNode(tc.getDescription()),
    directives: getDirectiveNodes(tc.getDirectives(), tc.schemaComposer),
    types: tc.getTypeNames().map((value) => ({
      kind: 'NamedType',
      name: { kind: 'Name', value },
    })),
  };
}

// eslint-disable-next-line no-unused-vars
function getDescriptionNode(value?: string | null): StringValueNode | void {
  // Do not add comments to astNode for memory consuption by Scalar types
  // In every place where is used Scalar type will be added the same text.
  //
  // if (!value) return;
  // return {
  //   kind: 'StringValue',
  //   value,
  // };
}

/**
 * Maybe this function should be replaced by build-in `astFromValue(value, type)` function from graphql-js
 */
function toValueNode(value: mixed): ValueNode {
  switch (typeof value) {
    case 'string':
      return ({ kind: 'StringValue', value }: StringValueNode);
    case 'number':
      if (Number.isInteger(value))
        return ({ kind: 'IntValue', value: value.toString() }: IntValueNode);
      return ({ kind: 'FloatValue', value: value.toString() }: FloatValueNode);
    case 'boolean':
      return ({ kind: 'BooleanValue', value }: BooleanValueNode);
    case 'object':
      if (value === null) {
        return ({ kind: 'NullValue' }: NullValueNode);
      } else if (Array.isArray(value)) {
        return ({
          kind: 'ListValue',
          values: value.map((v) => toValueNode(v)),
        }: ListValueNode);
      } else {
        return ({
          kind: 'ObjectValue',
          fields: Object.keys(value).map(
            (k) =>
              ({
                kind: 'ObjectField',
                name: { kind: 'Name', value: k },
                value: toValueNode(value[k]),
              }: ObjectFieldNode)
          ),
        }: ObjectValueNode);
      }
    default:
      // unsupported types
      // 'bigint' | 'symbol' | 'undefined' | 'function';
      // As a fallback return null, should be fixed in future
      // Maybe better to throw an error.
      return { kind: 'NullValue' };
  }
}

function getDirectiveArgumentNodes(
  data: DirectiveArgs,
  directive: ?GraphQLDirective
): $ReadOnlyArray<ArgumentNode> | void {
  const keys = Object.keys(data);
  if (!keys.length) return;
  const args: Array<ArgumentNode> = [];
  keys.forEach((k) => {
    let argumentType: ?GraphQLInputType;
    if (directive) {
      argumentType = directive.args.find((d) => d.name === k)?.type;
    }
    const argNode = ({
      kind: 'Argument',
      name: { kind: 'Name', value: k },
      value: argumentType
        ? // `astFromValue` supports EnumString
          astFromValue(data[k], argumentType) || { kind: 'NullValue' }
        : // `toValueNode` is fallback which supports just primitive types
          toValueNode(data[k]),
    }: ArgumentNode);
    args.push(argNode);
  });
  return args;
}

function getDirectiveNodes(
  values: ExtensionsDirective[],
  sc: SchemaComposer<any>
): $ReadOnlyArray<DirectiveNode> | void {
  if (!values || !values.length) return;
  return values.map(
    (v) =>
      ({
        kind: 'Directive',
        name: { kind: 'Name', value: v.name },
        arguments: getDirectiveArgumentNodes(v.args, sc._getDirective(v.name)),
      }: DirectiveNode)
  );
}

function getInterfaceNodes(
  ifaces: InterfaceTypeComposerThunked<any, any>[]
): $ReadOnlyArray<NamedTypeNode> {
  return ifaces
    .map((iface) => {
      if (!iface || !iface.getTypeName) return;
      return ({
        kind: 'NamedType',
        name: { kind: 'Name', value: iface.getTypeName() },
      }: NamedTypeNode);
    })
    .filter(Boolean);
}

function getTypeNode(atc: AnyTypeComposer<any>): TypeNode | void {
  if (atc instanceof ThunkComposer) {
    return getTypeNode(atc.ofType);
  } else if (atc instanceof ListComposer) {
    const subType = getTypeNode(atc.ofType);
    if (!subType) return;
    return {
      kind: 'ListType',
      type: subType,
    };
  } else if (atc instanceof NonNullComposer) {
    const subType = getTypeNode(atc.ofType);
    if (!subType) return;
    return {
      kind: 'NonNullType',
      type: (subType: any),
    };
  } else if (atc && atc.getTypeName) {
    return {
      kind: 'NamedType',
      name: { kind: 'Name', value: atc.getTypeName() },
    };
  }
}

function getArgumentsDefinitionNodes(
  tc: ObjectTypeComposer<any, any> | InterfaceTypeComposer<any, any>,
  fieldName: string
): $ReadOnlyArray<InputValueDefinitionNode> | void {
  const argNames = tc.getFieldArgNames(fieldName);
  if (!argNames.length) return;
  return argNames
    .map((argName) => {
      const ac = tc.getFieldArg(fieldName, argName);
      const type = getTypeNode(ac.type);
      if (!type) return;
      return ({
        kind: 'InputValueDefinition',
        name: { kind: 'Name', value: argName },
        type,
        description: getDescriptionNode(ac.description),
        directives: getDirectiveNodes(
          tc.getFieldArgDirectives(fieldName, argName),
          tc.schemaComposer
        ),
        defaultValue:
          (ac.defaultValue !== undefined &&
            astFromValue(ac.defaultValue, tc.getFieldArgType(fieldName, argName))) ||
          undefined,
      }: InputValueDefinitionNode);
    })
    .filter(Boolean);
}

function getFieldDefinitionNodes(
  tc: ObjectTypeComposer<any, any> | InterfaceTypeComposer<any, any>
): $ReadOnlyArray<FieldDefinitionNode> | void {
  const fieldNames = tc.getFieldNames();
  if (!fieldNames.length) return;
  return fieldNames
    .map((fieldName) => {
      const fc = tc.getField(fieldName);
      const type = getTypeNode(fc.type);
      if (!type) return;
      return ({
        kind: 'FieldDefinition',
        name: { kind: 'Name', value: fieldName },
        type,
        arguments: getArgumentsDefinitionNodes(tc, fieldName),
        description: getDescriptionNode(fc.description),
        directives: getDirectiveNodes(tc.getFieldDirectives(fieldName), tc.schemaComposer),
      }: FieldDefinitionNode);
    })
    .filter(Boolean);
}

function getInputValueDefinitionNodes(
  tc: InputTypeComposer<any>
): $ReadOnlyArray<InputValueDefinitionNode> | void {
  const fieldNames = tc.getFieldNames();
  if (!fieldNames.length) return;
  return fieldNames
    .map((fieldName) => {
      const fc = tc.getField(fieldName);
      const type = getTypeNode(fc.type);
      if (!type) return;
      return ({
        kind: 'InputValueDefinition',
        name: { kind: 'Name', value: fieldName },
        type,
        description: getDescriptionNode(fc.description),
        directives: getDirectiveNodes(tc.getFieldDirectives(fieldName), tc.schemaComposer),
        defaultValue:
          (fc.defaultValue !== undefined &&
            astFromValue(fc.defaultValue, tc.getFieldType(fieldName))) ||
          undefined,
      }: InputValueDefinitionNode);
    })
    .filter(Boolean);
}

function getEnumValueDefinitionNodes(
  tc: EnumTypeComposer<any>
): $ReadOnlyArray<EnumValueDefinitionNode> | void {
  const fieldNames = tc.getFieldNames();
  if (!fieldNames.length) return;
  return fieldNames.map((fieldName) => {
    const fc = tc.getField(fieldName);
    return ({
      kind: 'EnumValueDefinition',
      name: { kind: 'Name', value: fieldName },
      description: getDescriptionNode(fc.description),
      directives: getDirectiveNodes(tc.getFieldDirectives(fieldName), tc.schemaComposer),
    }: EnumValueDefinitionNode);
  });
}
