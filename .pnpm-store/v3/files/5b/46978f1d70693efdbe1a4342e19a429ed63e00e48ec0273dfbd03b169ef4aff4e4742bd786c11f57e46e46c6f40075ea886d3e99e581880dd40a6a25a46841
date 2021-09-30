"use strict";

var _typeHelpers = require("../typeHelpers");

var _graphql = require("../../graphql");

var _ = require("../..");

describe('typeHelpers', () => {
  describe('getComposeTypeName()', () => {
    it('understand strings', () => {
      expect((0, _typeHelpers.getComposeTypeName)('MyTypeName', _.schemaComposer)).toBe('MyTypeName');
      expect((0, _typeHelpers.getComposeTypeName)('type AAA { f: Int }', _.schemaComposer)).toBe('AAA');
    });
    it('understands GraphQL named types', () => {
      expect((0, _typeHelpers.getComposeTypeName)(new _graphql.GraphQLObjectType({
        name: 'OutputType',
        fields: () => ({})
      }), _.schemaComposer)).toBe('OutputType');
      expect((0, _typeHelpers.getComposeTypeName)(new _graphql.GraphQLInputObjectType({
        name: 'InputType',
        fields: () => ({})
      }), _.schemaComposer)).toBe('InputType');
    });
    it('understands compose types', () => {
      expect((0, _typeHelpers.getComposeTypeName)(_.schemaComposer.createObjectTC('TypeTC'), _.schemaComposer)).toBe('TypeTC');
      expect((0, _typeHelpers.getComposeTypeName)(_.schemaComposer.createInputTC('TypeITC'), _.schemaComposer)).toBe('TypeITC');
    });
  });
  it('check SDL types', () => {
    const output = 'type Out { name: String! }';
    const input = 'input Filter { minAge: Int }';
    const enumType = 'enum Sort { ASC DESC }';
    const scalar = 'scalar UInt';
    const iface = 'interface User { name: String }';
    const union = 'union U = A | B';
    expect((0, _typeHelpers.isTypeDefinitionString)(output)).toBeTruthy();
    expect((0, _typeHelpers.isOutputTypeDefinitionString)(output)).toBeTruthy();
    expect((0, _typeHelpers.isOutputTypeDefinitionString)(input)).toBeFalsy();
    expect((0, _typeHelpers.isTypeDefinitionString)(input)).toBeTruthy();
    expect((0, _typeHelpers.isInputTypeDefinitionString)(input)).toBeTruthy();
    expect((0, _typeHelpers.isInputTypeDefinitionString)(output)).toBeFalsy();
    expect((0, _typeHelpers.isTypeDefinitionString)(enumType)).toBeTruthy();
    expect((0, _typeHelpers.isEnumTypeDefinitionString)(enumType)).toBeTruthy();
    expect((0, _typeHelpers.isEnumTypeDefinitionString)(output)).toBeFalsy();
    expect((0, _typeHelpers.isTypeDefinitionString)(scalar)).toBeTruthy();
    expect((0, _typeHelpers.isScalarTypeDefinitionString)(scalar)).toBeTruthy();
    expect((0, _typeHelpers.isScalarTypeDefinitionString)(output)).toBeFalsy();
    expect((0, _typeHelpers.isTypeDefinitionString)(iface)).toBeTruthy();
    expect((0, _typeHelpers.isInterfaceTypeDefinitionString)(iface)).toBeTruthy();
    expect((0, _typeHelpers.isInterfaceTypeDefinitionString)(output)).toBeFalsy();
    expect((0, _typeHelpers.isTypeDefinitionString)(union)).toBeTruthy();
    expect((0, _typeHelpers.isUnionTypeDefinitionString)(union)).toBeTruthy();
    expect((0, _typeHelpers.isUnionTypeDefinitionString)(output)).toBeFalsy();
  });
  it('isTypeNameString()', () => {
    expect((0, _typeHelpers.isTypeNameString)('aaaa')).toBeTruthy();
    expect((0, _typeHelpers.isTypeNameString)('Aaaaa')).toBeTruthy();
    expect((0, _typeHelpers.isTypeNameString)('A_')).toBeTruthy();
    expect((0, _typeHelpers.isTypeNameString)('_A')).toBeTruthy();
    expect((0, _typeHelpers.isTypeNameString)('A_123')).toBeTruthy();
    expect((0, _typeHelpers.isTypeNameString)('123')).toBeFalsy();
    expect((0, _typeHelpers.isTypeNameString)('1c')).toBeFalsy();
    expect((0, _typeHelpers.isTypeNameString)('String!')).toBeFalsy();
    expect((0, _typeHelpers.isTypeNameString)('@Type')).toBeFalsy();
    expect((0, _typeHelpers.isTypeNameString)('A-')).toBeFalsy();
  });
  it('unwrapTypeNameString()', () => {
    expect((0, _typeHelpers.unwrapTypeNameString)('Person')).toBe('Person');
    expect((0, _typeHelpers.unwrapTypeNameString)('Type!')).toBe('Type');
    expect((0, _typeHelpers.unwrapTypeNameString)('[[Zone51!]!]!')).toBe('Zone51');
    expect((0, _typeHelpers.unwrapTypeNameString)('1c!')).toBe('1c');
    expect((0, _typeHelpers.unwrapTypeNameString)('!1c')).toBe('!1c');
    expect((0, _typeHelpers.unwrapTypeNameString)('[String')).toBe('[String');
    expect((0, _typeHelpers.unwrapTypeNameString)('@Type')).toBe('@Type');
  });
  it('isWrappedTypeNameString', () => {
    expect((0, _typeHelpers.isWrappedTypeNameString)('Person')).toBeTruthy();
    expect((0, _typeHelpers.isWrappedTypeNameString)('Type!')).toBeTruthy();
    expect((0, _typeHelpers.isWrappedTypeNameString)('[[Zone51]!]!')).toBeTruthy();
    expect((0, _typeHelpers.isWrappedTypeNameString)('!1c')).toBeFalsy();
    expect((0, _typeHelpers.isWrappedTypeNameString)('[String')).toBeFalsy();
    expect((0, _typeHelpers.isWrappedTypeNameString)('@Type')).toBeFalsy();
  });
});