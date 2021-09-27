"use strict";

var _graphql = require("../../graphql");

var _ = require("../..");

var _ObjectTypeComposer = require("../../ObjectTypeComposer");

var _InputTypeComposer = require("../../InputTypeComposer");

var _InterfaceTypeComposer = require("../../InterfaceTypeComposer");

var _toInputType = require("../toInputType");

describe('toInputType()', () => {
  beforeEach(() => {
    _.schemaComposer.clear();
  });
  it('should return Scalar, Enum, Input types unchanged', () => {
    const stc = _.schemaComposer.createScalarTC('MyScalar');

    const itc1 = (0, _toInputType.toInputType)(stc);
    expect(itc1).toBe(stc);

    const etc = _.schemaComposer.createEnumTC('MyEnum');

    const itc2 = (0, _toInputType.toInputType)(etc);
    expect(itc2).toBe(etc);

    const itc = _.schemaComposer.createInputTC('MyInput');

    const itc3 = (0, _toInputType.toInputType)(itc);
    expect(itc3).toBe(itc);
  });
  it('should return wrapped Scalar, Enum Input types unchanged', () => {
    const stc = _.schemaComposer.createScalarTC('MyScalar').List.NonNull;

    const itc1 = (0, _toInputType.toInputType)(stc);
    expect(itc1.getTypeName()).toBe('[MyScalar]!');
    expect(itc1.ofType.ofType).toBe(stc.ofType.ofType);

    const etc = _.schemaComposer.createEnumTC('MyEnum').NonNull;

    const itc2 = (0, _toInputType.toInputType)(etc);
    expect(itc2.getTypeName()).toBe('MyEnum!');
    expect(itc2.ofType).toBe(etc.ofType);

    const itc = _.schemaComposer.createScalarTC('MyInput').NonNull.List.NonNull;

    const itc3 = (0, _toInputType.toInputType)(itc);
    expect(itc3.getTypeName()).toBe('[MyInput!]!');
    expect(itc3.ofType.ofType.ofType).toBe(itc.ofType.ofType.ofType);
  });
  it('should convert wrapped Object type to new Input type', () => {
    const otc = _.schemaComposer.createObjectTC({
      name: 'MyObject',
      fields: {
        a: 'Int',
        b: 'Float!'
      }
    }).NonNull;

    const itc = (0, _toInputType.toInputType)(otc);
    expect(itc.getTypeName()).toBe('MyObjectInput!');
    expect(itc.ofType.getFieldTypeName('a')).toBe('Int');
    expect(itc.ofType.getFieldTypeName('b')).toBe('Float!');
  });
});
describe('toInputObjectType()', () => {
  let PersonTC;
  beforeEach(() => {
    _.schemaComposer.clear();

    PersonTC = _ObjectTypeComposer.ObjectTypeComposer.create({
      name: 'Person',
      fields: {
        name: 'String',
        age: {
          type: _graphql.GraphQLInt
        },
        address: {
          type: new _graphql.GraphQLObjectType({
            name: 'Address',
            fields: {
              city: {
                type: _graphql.GraphQLString
              },
              street: {
                type: _graphql.GraphQLString
              }
            }
          })
        }
      }
    }, _.schemaComposer);
  });
  it('should return InputTypeComposer', () => {
    const itc = (0, _toInputType.toInputObjectType)(PersonTC);
    expect(itc).toBeInstanceOf(_InputTypeComposer.InputTypeComposer);
    expect(itc.getTypeName()).toBe('PersonInput');
  });
  it('should accept prefix in opts', () => {
    const itc = (0, _toInputType.toInputObjectType)(PersonTC, {
      prefix: 'SomePrefix'
    });
    expect(itc.getTypeName()).toBe('SomePrefixPersonInput');
  });
  it('should accept postfix in opts', () => {
    const itc = (0, _toInputType.toInputObjectType)(PersonTC, {
      postfix: 'PostfixInpt'
    });
    expect(itc.getTypeName()).toBe('PersonPostfixInpt');
  });
  it('should keep scalar types', () => {
    const itc = (0, _toInputType.toInputObjectType)(PersonTC);
    expect(itc.getFieldType('name')).toBe(_graphql.GraphQLString);
    expect(itc.getFieldType('age')).toBe(_graphql.GraphQLInt);
  });
  it('should convert field with ObjectType to InputType', () => {
    const itc = (0, _toInputType.toInputObjectType)(PersonTC);
    const addrType = itc.getFieldType('address');
    expect(addrType).toBeInstanceOf(_graphql.GraphQLInputObjectType);
    expect(addrType.name).toBe('AddressInput');
  });
  it('should reuse generated input type for recursive types', () => {
    PersonTC.setField('spouce', PersonTC);
    const itc = (0, _toInputType.toInputObjectType)(PersonTC);
    expect(itc.getFieldType('spouce')).toBe(itc.getType());
  });
  it('should reuse generated input type for recursive types in List', () => {
    PersonTC.setField('friends', PersonTC.getTypePlural());
    const itc = (0, _toInputType.toInputObjectType)(PersonTC);
    expect(itc.getFieldType('friends')).toBeInstanceOf(_graphql.GraphQLList);
    expect(itc.getFieldType('friends').ofType).toBe(itc.getType());
  });
  it('should convert InterfaceTypeComposer to InputTypeComposer', () => {
    const iftc = _InterfaceTypeComposer.InterfaceTypeComposer.create(`
      interface IFace {
        name: String
        age: Int
      }
    `, _.schemaComposer);

    const itc = (0, _toInputType.toInputObjectType)(iftc);
    expect(itc.getFieldType('name')).toBe(_graphql.GraphQLString);
    expect(itc.getFieldType('age')).toBe(_graphql.GraphQLInt);
    expect(itc.getTypeName()).toBe('IFaceInput');
  });
  it('should convert field with InterfaceType to InputType', () => {
    _InterfaceTypeComposer.InterfaceTypeComposer.create(`
      interface IFace {
        name: String
        age: Int
      }
    `, _.schemaComposer);

    const tc = _ObjectTypeComposer.ObjectTypeComposer.create(`
      type Example implements IFace {
        name: String
        age: Int
        neighbor: IFace
      }
    `, _.schemaComposer);

    const itc = (0, _toInputType.toInputObjectType)(tc);
    expect(itc.getFieldType('name')).toBe(_graphql.GraphQLString);
    expect(itc.getFieldType('age')).toBe(_graphql.GraphQLInt);
    const ifaceField = itc.getFieldTC('neighbor');
    expect(ifaceField).toBeInstanceOf(_InputTypeComposer.InputTypeComposer);

    if (ifaceField instanceof _InputTypeComposer.InputTypeComposer) {
      expect(ifaceField.getType()).toBeInstanceOf(_graphql.GraphQLInputObjectType);
      expect(ifaceField.getTypeName()).toBe('IFaceInput');
      expect(ifaceField.getFieldType('name')).toBe(_graphql.GraphQLString);
      expect(ifaceField.getFieldType('age')).toBe(_graphql.GraphQLInt);
      expect(itc.getTypeName()).toBe('ExampleInput');
    }
  });
  describe('fallbackType option', () => {
    let tc;
    beforeEach(() => {
      _.schemaComposer.clear();

      _.schemaComposer.addTypeDefs(`
        union SearchResult = Post | Comment

        type Post {
          title: String
        }

        type Comment {
          text: String
        }
      `);

      tc = _ObjectTypeComposer.ObjectTypeComposer.create(`
        type Example {
          name: String
          union: SearchResult
        }
      `, _.schemaComposer);
    });
    it('should throw error on field with Union type', () => {
      expect(() => {
        (0, _toInputType.toInputObjectType)(tc);
      }).toThrowError("Can not convert field 'Example.union' to InputType");
    });
    it('should use type from fallbackType option for union', () => {
      const itc = (0, _toInputType.toInputObjectType)(tc, {
        fallbackType: 'JSON'
      });
      expect(itc.getFieldTypeName('union')).toBe('JSON');
    });
    it('should remove union field if fallbackType: null', () => {
      const itc = (0, _toInputType.toInputObjectType)(tc, {
        fallbackType: null
      });
      expect(itc.hasField('union')).toBeFalsy();
    });
  });
});