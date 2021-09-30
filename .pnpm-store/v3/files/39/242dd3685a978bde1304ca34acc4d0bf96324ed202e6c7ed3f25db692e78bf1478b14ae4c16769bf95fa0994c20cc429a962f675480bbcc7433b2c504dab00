import { getComposeTypeName, isTypeNameString, isWrappedTypeNameString, isTypeDefinitionString, isOutputTypeDefinitionString, isInputTypeDefinitionString, isEnumTypeDefinitionString, isScalarTypeDefinitionString, isInterfaceTypeDefinitionString, isUnionTypeDefinitionString, unwrapTypeNameString } from '../typeHelpers';
import { GraphQLObjectType, GraphQLInputObjectType } from '../../graphql';
import { schemaComposer as sc } from '../..';
describe('typeHelpers', () => {
  describe('getComposeTypeName()', () => {
    it('understand strings', () => {
      expect(getComposeTypeName('MyTypeName', sc)).toBe('MyTypeName');
      expect(getComposeTypeName('type AAA { f: Int }', sc)).toBe('AAA');
    });
    it('understands GraphQL named types', () => {
      expect(getComposeTypeName(new GraphQLObjectType({
        name: 'OutputType',
        fields: () => ({})
      }), sc)).toBe('OutputType');
      expect(getComposeTypeName(new GraphQLInputObjectType({
        name: 'InputType',
        fields: () => ({})
      }), sc)).toBe('InputType');
    });
    it('understands compose types', () => {
      expect(getComposeTypeName(sc.createObjectTC('TypeTC'), sc)).toBe('TypeTC');
      expect(getComposeTypeName(sc.createInputTC('TypeITC'), sc)).toBe('TypeITC');
    });
  });
  it('check SDL types', () => {
    const output = 'type Out { name: String! }';
    const input = 'input Filter { minAge: Int }';
    const enumType = 'enum Sort { ASC DESC }';
    const scalar = 'scalar UInt';
    const iface = 'interface User { name: String }';
    const union = 'union U = A | B';
    expect(isTypeDefinitionString(output)).toBeTruthy();
    expect(isOutputTypeDefinitionString(output)).toBeTruthy();
    expect(isOutputTypeDefinitionString(input)).toBeFalsy();
    expect(isTypeDefinitionString(input)).toBeTruthy();
    expect(isInputTypeDefinitionString(input)).toBeTruthy();
    expect(isInputTypeDefinitionString(output)).toBeFalsy();
    expect(isTypeDefinitionString(enumType)).toBeTruthy();
    expect(isEnumTypeDefinitionString(enumType)).toBeTruthy();
    expect(isEnumTypeDefinitionString(output)).toBeFalsy();
    expect(isTypeDefinitionString(scalar)).toBeTruthy();
    expect(isScalarTypeDefinitionString(scalar)).toBeTruthy();
    expect(isScalarTypeDefinitionString(output)).toBeFalsy();
    expect(isTypeDefinitionString(iface)).toBeTruthy();
    expect(isInterfaceTypeDefinitionString(iface)).toBeTruthy();
    expect(isInterfaceTypeDefinitionString(output)).toBeFalsy();
    expect(isTypeDefinitionString(union)).toBeTruthy();
    expect(isUnionTypeDefinitionString(union)).toBeTruthy();
    expect(isUnionTypeDefinitionString(output)).toBeFalsy();
  });
  it('isTypeNameString()', () => {
    expect(isTypeNameString('aaaa')).toBeTruthy();
    expect(isTypeNameString('Aaaaa')).toBeTruthy();
    expect(isTypeNameString('A_')).toBeTruthy();
    expect(isTypeNameString('_A')).toBeTruthy();
    expect(isTypeNameString('A_123')).toBeTruthy();
    expect(isTypeNameString('123')).toBeFalsy();
    expect(isTypeNameString('1c')).toBeFalsy();
    expect(isTypeNameString('String!')).toBeFalsy();
    expect(isTypeNameString('@Type')).toBeFalsy();
    expect(isTypeNameString('A-')).toBeFalsy();
  });
  it('unwrapTypeNameString()', () => {
    expect(unwrapTypeNameString('Person')).toBe('Person');
    expect(unwrapTypeNameString('Type!')).toBe('Type');
    expect(unwrapTypeNameString('[[Zone51!]!]!')).toBe('Zone51');
    expect(unwrapTypeNameString('1c!')).toBe('1c');
    expect(unwrapTypeNameString('!1c')).toBe('!1c');
    expect(unwrapTypeNameString('[String')).toBe('[String');
    expect(unwrapTypeNameString('@Type')).toBe('@Type');
  });
  it('isWrappedTypeNameString', () => {
    expect(isWrappedTypeNameString('Person')).toBeTruthy();
    expect(isWrappedTypeNameString('Type!')).toBeTruthy();
    expect(isWrappedTypeNameString('[[Zone51]!]!')).toBeTruthy();
    expect(isWrappedTypeNameString('!1c')).toBeFalsy();
    expect(isWrappedTypeNameString('[String')).toBeFalsy();
    expect(isWrappedTypeNameString('@Type')).toBeFalsy();
  });
});