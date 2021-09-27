"use strict";

var _graphql = require("graphql");

var _graphql2 = require("../graphql");

var _ = require("..");

var _SchemaComposer = require("../SchemaComposer");

var _graphqlVersion = require("../utils/graphqlVersion");

var _type = require("../type");

var _ObjectTypeComposer = require("../ObjectTypeComposer");

var _InputTypeComposer = require("../InputTypeComposer");

var _ScalarTypeComposer = require("../ScalarTypeComposer");

var _EnumTypeComposer = require("../EnumTypeComposer");

var _InterfaceTypeComposer = require("../InterfaceTypeComposer");

var _UnionTypeComposer = require("../UnionTypeComposer");

var _Resolver = require("../Resolver");

var _TypeMapper = require("../TypeMapper");

var _ListComposer = require("../ListComposer");

var _NonNullComposer = require("../NonNullComposer");

var _ThunkComposer = require("../ThunkComposer");

let typeMapper;
beforeEach(() => {
  _.schemaComposer.clear();

  typeMapper = new _TypeMapper.TypeMapper(_.schemaComposer);
});
describe('TypeMapper', () => {
  it('should provide default scalar GraphQL types', () => {
    expect(typeMapper.getBuiltInType('String').getType()).toBe(_graphql2.GraphQLString);
    expect(typeMapper.getBuiltInType('Float').getType()).toBe(_graphql2.GraphQLFloat);
    expect(typeMapper.getBuiltInType('Int').getType()).toBe(_graphql2.GraphQLInt);
    expect(typeMapper.getBuiltInType('Boolean').getType()).toBe(_graphql2.GraphQLBoolean);
    expect(typeMapper.getBuiltInType('ID').getType()).toBe(_graphql2.GraphQLID);
    expect(typeMapper.getBuiltInType('JSON').getType()).toBe(_type.GraphQLJSON);
    expect(typeMapper.getBuiltInType('JSONObject').getType()).toBe(_type.GraphQLJSONObject);
    expect(typeMapper.getBuiltInType('Date').getType()).toBe(_type.GraphQLDate);
    expect(typeMapper.getBuiltInType('Buffer').getType()).toBe(_type.GraphQLBuffer);
  });
  it('should not add basic scalars if they already provided', () => {
    const CustomJSON = new _graphql2.GraphQLScalarType({
      name: 'JSON',
      serialize: () => {}
    });
    const CustomDate = new _graphql2.GraphQLScalarType({
      name: 'Date',
      serialize: () => {}
    });
    const Query = new _graphql2.GraphQLObjectType({
      name: 'Query',
      fields: {
        json: {
          type: CustomJSON
        },
        date: {
          type: CustomDate
        }
      }
    });
    const schema = new _graphql.GraphQLSchema({
      query: Query
    });
    const sc2 = new _SchemaComposer.SchemaComposer(schema);
    expect(sc2.get('JSON').getType()).toBe(CustomJSON);
    expect(sc2.get('Date').getType()).toBe(CustomDate);
  });
  it('should allow to override basic graphql-compose types', () => {
    const CustomJSON = _.schemaComposer.createScalarTC({
      name: 'CustomJSON',
      serialize: () => {}
    });

    const CustomDate = _.schemaComposer.createScalarTC({
      name: 'CustomDate',
      serialize: () => {}
    });

    const CustomBuffer = _.schemaComposer.createScalarTC({
      name: 'CustomBuffer',
      serialize: () => {}
    });

    _.schemaComposer.set('JSON', CustomJSON);

    _.schemaComposer.set('Date', CustomDate);

    _.schemaComposer.set('Buffer', CustomBuffer);

    expect(typeMapper.schemaComposer.get('JSON')).toBe(CustomJSON);
    expect(typeMapper.schemaComposer.get('Date')).toBe(CustomDate);
    expect(typeMapper.schemaComposer.get('Buffer')).toBe(CustomBuffer);
  });
  it('should create object type from template string', () => {
    const tc = typeMapper.convertSDLTypeDefinition(_graphqlVersion.graphqlVersion < 12 ? `
          type IntRange {
            # Max value
            max: Int,
            min: Int!
            arr: [String]
          }
        ` : `
          type IntRange {
            """Max value"""
            max: Int,
            min: Int!
            arr: [String]
          }
        `);
    expect(tc).toBeInstanceOf(_ObjectTypeComposer.ObjectTypeComposer);
    const type = tc.getType();
    expect(type).toBeInstanceOf(_graphql2.GraphQLObjectType);
    expect(typeMapper.schemaComposer.get('IntRange')).toBe(tc);
    const IntRangeTC = new _ObjectTypeComposer.ObjectTypeComposer(type, _.schemaComposer);
    expect(IntRangeTC.getTypeName()).toBe('IntRange');
    expect(IntRangeTC.getFieldNames()).toEqual(expect.arrayContaining(['max', 'min', 'arr']));
    expect(IntRangeTC.getFieldType('max')).toBe(_graphql2.GraphQLInt);
    expect(IntRangeTC.getFieldConfig('max').description).toBe('Max value');
    expect(IntRangeTC.getFieldType('min')).toBeInstanceOf(_graphql2.GraphQLNonNull);
    expect(IntRangeTC.getFieldType('arr')).toBeInstanceOf(_graphql2.GraphQLList);
  });
  it('should create input object type from template string', () => {
    const tc = typeMapper.convertSDLTypeDefinition(`
      input InputIntRange {
        min: Int
        max: Int!
      }
    `);
    expect(tc).toBeInstanceOf(_InputTypeComposer.InputTypeComposer);
    const type = tc.getType();
    expect(type).toBeInstanceOf(_graphql2.GraphQLInputObjectType);
    expect(typeMapper.schemaComposer.get('InputIntRange')).toBe(tc);
    const IntRangeTC = new _InputTypeComposer.InputTypeComposer(type, _.schemaComposer);
    expect(IntRangeTC.getTypeName()).toBe('InputIntRange');
    expect(IntRangeTC.getFieldType('min')).toBe(_graphql2.GraphQLInt);
    expect(IntRangeTC.getFieldType('max')).toBeInstanceOf(_graphql2.GraphQLNonNull);
    expect(IntRangeTC.getFieldType('max').ofType).toBe(_graphql2.GraphQLInt);
  });
  it('should create interface type from template string', () => {
    const tc = typeMapper.convertSDLTypeDefinition(_graphqlVersion.graphqlVersion < 12 ? `
          interface IntRangeInterface {
            # Max value
            max: Int,
            min: Int!
            arr: [String]
          }
        ` : `
          interface IntRangeInterface {
            """Max value"""
            max: Int,
            min: Int!
            arr: [String]
          }
        `);
    expect(tc).toBeInstanceOf(_InterfaceTypeComposer.InterfaceTypeComposer);
    const type = tc.getType();
    expect(type).toBeInstanceOf(_graphql2.GraphQLInterfaceType);
    expect(typeMapper.schemaComposer.get('IntRangeInterface').getType()).toBe(type);
    const IntRangeTC = new _InterfaceTypeComposer.InterfaceTypeComposer(type, _.schemaComposer);
    expect(IntRangeTC.getTypeName()).toBe('IntRangeInterface');
    expect(IntRangeTC.getFieldNames()).toEqual(expect.arrayContaining(['max', 'min', 'arr']));
    expect(IntRangeTC.getFieldType('max')).toBe(_graphql2.GraphQLInt);
    expect(IntRangeTC.getFieldConfig('max').description).toBe('Max value');
    expect(IntRangeTC.getFieldType('min')).toBeInstanceOf(_graphql2.GraphQLNonNull);
    expect(IntRangeTC.getFieldType('arr')).toBeInstanceOf(_graphql2.GraphQLList);
  });
  it('should return wrapped type', () => {
    expect(typeMapper.convertSDLWrappedTypeName('String!')).toBeInstanceOf(_NonNullComposer.NonNullComposer);
    expect(typeMapper.convertSDLWrappedTypeName('[String]')).toBeInstanceOf(_ListComposer.ListComposer);
    expect(typeMapper.convertSDLWrappedTypeName('[String]!')).toBeInstanceOf(_NonNullComposer.NonNullComposer);
    expect(typeMapper.convertSDLWrappedTypeName('[String]!').ofType).toBeInstanceOf(_ListComposer.ListComposer);
    expect(typeMapper.convertSDLWrappedTypeName('String')).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
    expect(typeMapper.convertSDLWrappedTypeName('String').getType()).toBe(_graphql2.GraphQLString);
  });
  describe('convertOutputFieldConfig()', () => {
    describe('converting field type', () => {
      it('should accept type with GraphQLOutputType', () => {
        const fc = typeMapper.convertOutputFieldConfig({
          type: _graphql2.GraphQLString
        });
        expect(fc.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
        expect(fc.type.getType()).toBe(_graphql2.GraphQLString);
        const objectType = new _graphql2.GraphQLObjectType({
          name: 'SomeType',
          fields: {
            f: {
              type: _graphql2.GraphQLString
            }
          }
        });
        const fc2 = typeMapper.convertOutputFieldConfig({
          type: objectType
        });
        expect(fc2.type).toBeInstanceOf(_ObjectTypeComposer.ObjectTypeComposer);
        expect(fc2.type.getType()).toBe(objectType);
      });
      it('should accept GraphQLScalarType', () => {
        const fc = typeMapper.convertOutputFieldConfig(_graphql2.GraphQLString);
        expect(fc.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
        expect(fc.type.getType()).toBe(_graphql2.GraphQLString);
      });
      it('should accept GraphQLObjectType', () => {
        const type = new _graphql2.GraphQLObjectType({
          name: 'Test',
          fields: () => ({
            a: {
              type: _graphql2.GraphQLInt
            }
          })
        });
        const fc = typeMapper.convertOutputFieldConfig(type);
        expect(fc.type).toBeInstanceOf(_ObjectTypeComposer.ObjectTypeComposer);
        expect(fc.type.getType()).toBe(type);
      });
      it('should accept GraphQLNonNull', () => {
        const fc = typeMapper.convertOutputFieldConfig(new _graphql2.GraphQLNonNull(_graphql2.GraphQLString));
        expect(fc.type).toBeInstanceOf(_NonNullComposer.NonNullComposer);
        expect(fc.type.getType().ofType).toBe(_graphql2.GraphQLString);
      });
      it('should accept GraphQLList', () => {
        const fc = typeMapper.convertOutputFieldConfig(new _graphql2.GraphQLList(_graphql2.GraphQLString));
        expect(fc.type).toBeInstanceOf(_ListComposer.ListComposer);
        expect(fc.type.getType().ofType).toBe(_graphql2.GraphQLString);
      });
      it('should accept type as string to scalar', () => {
        const fc = typeMapper.convertOutputFieldConfig({
          type: 'String'
        });
        expect(fc.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
        expect(fc.type.getType()).toBe(_graphql2.GraphQLString);
      });
      it('should accept type as string to object type', () => {
        _ObjectTypeComposer.ObjectTypeComposer.create('type Foo { id: ID! }', _.schemaComposer);

        const fc = typeMapper.convertOutputFieldConfig({
          type: 'Foo'
        });
        expect(fc.type).toBe(_.schemaComposer.getAnyTC('Foo'));
      });
      it('should accept type as string to enum type', () => {
        _EnumTypeComposer.EnumTypeComposer.create('enum Foo { A B }', _.schemaComposer);

        const fc = typeMapper.convertOutputFieldConfig({
          type: 'Foo'
        });
        expect(fc.type).toBe(_.schemaComposer.getAnyTC('Foo'));
      });
      it('should accept type as string to interface type', () => {
        _InterfaceTypeComposer.InterfaceTypeComposer.create('interface Foo { id: ID! }', _.schemaComposer);

        const fc = typeMapper.convertOutputFieldConfig({
          type: 'Foo'
        });
        expect(fc.type).toBe(_.schemaComposer.getAnyTC('Foo'));
      });
      it('should accept type as string to union type', () => {
        _ObjectTypeComposer.ObjectTypeComposer.create('type A { id: ID! }', _.schemaComposer);

        _ObjectTypeComposer.ObjectTypeComposer.create('type B { id: ID! }', _.schemaComposer);

        _UnionTypeComposer.UnionTypeComposer.create('union Foo = A | B', _.schemaComposer);

        const fc = typeMapper.convertOutputFieldConfig({
          type: 'Foo'
        });
        expect(fc.type).toBe(_.schemaComposer.getAnyTC('Foo'));
      });
      it('should create field config from type as string', () => {
        const fc = typeMapper.convertOutputFieldConfig('String');
        expect(fc.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
        expect(fc.type.getType()).toBe(_graphql2.GraphQLString);
      });
      it('should lookup type name as string in schemaComposer', () => {
        const tc = _ObjectTypeComposer.ObjectTypeComposer.create(`type MyType { a: Int }`, _.schemaComposer);

        const fc = typeMapper.convertOutputFieldConfig('MyType');
        expect(fc.type).toBe(tc);
        const fc2 = typeMapper.convertOutputFieldConfig({
          type: '[MyType]'
        });
        expect(fc2.type).toBeInstanceOf(_ListComposer.ListComposer);
        expect(fc2.type.getType().ofType).toBe(tc.getType());
      });
      it('should create field config from GraphQL Schema Language', () => {
        const fc = typeMapper.convertOutputFieldConfig(`type MyOutputType {
          a: String,
          b: Int,
        }`);
        const tc = fc.type;
        expect(tc.getTypeName()).toBe('MyOutputType');
        expect(tc.getFieldType('a')).toBe(_graphql2.GraphQLString);
        expect(tc.getFieldType('b')).toBe(_graphql2.GraphQLInt);
      });
      it('should create field with Scalar type from GraphQL Schema Language', () => {
        const fc = typeMapper.convertOutputFieldConfig('scalar MyScalar');
        expect(fc.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
        expect(fc.type.getTypeName()).toBe('MyScalar');
      });
      it('should create field with Enum type from GraphQL Schema Language', () => {
        const fc = typeMapper.convertOutputFieldConfig('enum MyEnum { AND OR }');
        expect(fc.type).toBeInstanceOf(_EnumTypeComposer.EnumTypeComposer);
        const enumValues = fc.type.getFields();
        expect(enumValues.AND).toMatchObject({
          value: 'AND'
        });
        expect(enumValues.OR).toMatchObject({
          value: 'OR'
        });
      });
      it('should throw error if provided input type definition', () => {
        expect(() => {
          typeMapper.convertOutputFieldConfig(`input MyInputType {
            a: String,
          }`);
        }).toThrowError(/but got input type definition/);
      });
      it('should accept ObjectTypeComposer', () => {
        const tc = _ObjectTypeComposer.ObjectTypeComposer.create('type PriceRange { lon: Float, lat: Float }', _.schemaComposer);

        tc.setDescription('Description');
        const fc = typeMapper.convertOutputFieldConfig({
          type: tc
        });
        expect(fc.type).toBe(tc);
        expect(fc.description).toBe(undefined);
        const fc2 = typeMapper.convertOutputFieldConfig(tc);
        expect(fc2.type).toBe(tc);
        expect(fc2.description).toBe(undefined);
      });
      it('should accept ScalarTypeComposer', () => {
        const stc = _ScalarTypeComposer.ScalarTypeComposer.create('scalar UInt', _.schemaComposer);

        stc.setDescription('Description');
        const fc = typeMapper.convertOutputFieldConfig({
          type: stc
        });
        expect(fc.type).toBe(stc);
        expect(fc.description).toBe(undefined);
        const fc2 = typeMapper.convertOutputFieldConfig(stc);
        expect(fc2.type).toBe(stc);
        expect(fc2.description).toBe(undefined);
      });
      it('should accept EnumTypeComposer', () => {
        const etc = _EnumTypeComposer.EnumTypeComposer.create('enum MyEnum { V1 V2 V3 }', _.schemaComposer);

        etc.setDescription('Description');
        const fc = typeMapper.convertOutputFieldConfig({
          type: etc
        });
        expect(fc.type).toBe(etc);
        expect(fc.description).toBe(undefined);
        const fc2 = typeMapper.convertOutputFieldConfig(etc);
        expect(fc2.type).toBe(etc);
        expect(fc2.description).toBe(undefined);
      });
      it('should accept InterfaceTypeComposer', () => {
        const iftc = _InterfaceTypeComposer.InterfaceTypeComposer.create('interface MyIFace { id: Int }', _.schemaComposer);

        iftc.setDescription('Description');
        const fc = typeMapper.convertOutputFieldConfig({
          type: iftc
        });
        expect(fc.type).toBe(iftc);
        expect(fc.description).toBe(undefined);
        const fc2 = typeMapper.convertOutputFieldConfig(iftc);
        expect(fc2.type).toBe(iftc);
        expect(fc2.description).toBe(undefined);
      });
      it('should accept Resolver', () => {
        const resolver = new _Resolver.Resolver({
          name: 'find',
          type: 'Float',
          args: {
            a1: 'String'
          },
          resolve: () => 123
        }, _.schemaComposer);
        const fc = typeMapper.convertOutputFieldConfig(resolver);
        expect(fc.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
        expect(fc.type.getType()).toBe(_graphql2.GraphQLFloat);
        expect(fc.args.a1.type.getType()).toBe(_graphql2.GraphQLString);
        expect(fc.resolve()).toBe(123);
      });
      it('should accept Resolver as type', () => {
        const resolver = new _Resolver.Resolver({
          name: 'find',
          type: 'Float',
          args: {
            a1: 'String'
          },
          resolve: () => 123
        }, _.schemaComposer);
        const fc = typeMapper.convertOutputFieldConfig({
          type: resolver
        });
        expect(fc.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
        expect(fc.type.getType()).toBe(_graphql2.GraphQLFloat);
        expect(fc.args).toEqual({});
        expect(fc.resolve).toBe(undefined);
      });
      it('should pass unchanged thunk', () => {
        const myTypeThunk = () => 'Int';

        const fc = typeMapper.convertOutputFieldConfig(myTypeThunk);
        expect(fc.type).toBeInstanceOf(_ThunkComposer.ThunkComposer);
        expect(fc.type.getType()).toBe(_graphql2.GraphQLInt);
      });
      it('should accept array with one element as type and wrap them with GraphQLList', () => {
        const fc = typeMapper.convertOutputFieldConfig(['String']);
        expect(fc.type).toBeInstanceOf(_ListComposer.ListComposer);
        expect(fc.type.ofType).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
        expect(fc.type.ofType.getType()).toBe(_graphql2.GraphQLString);
        const fc2 = typeMapper.convertOutputFieldConfig({
          type: ['String']
        });
        expect(fc2.type).toBeInstanceOf(_ListComposer.ListComposer);
        expect(fc2.type.getType().ofType).toBe(_graphql2.GraphQLString);
        const fc3 = typeMapper.convertOutputFieldConfig({
          type: [_graphql2.GraphQLString]
        });
        expect(fc3.type).toBeInstanceOf(_ListComposer.ListComposer);
        expect(fc3.type.getType().ofType).toBe(_graphql2.GraphQLString);

        const tc = _ObjectTypeComposer.ObjectTypeComposer.create('type PriceRange { lon: Float, lat: Float }', _.schemaComposer);

        const fc4 = typeMapper.convertOutputFieldConfig([tc]);
        expect(fc4.type).toBeInstanceOf(_ListComposer.ListComposer);
        expect(fc4.type.getType().ofType).toBe(tc.getType());
        const fc5 = typeMapper.convertOutputFieldConfig({
          type: [tc]
        });
        expect(fc5.type).toBeInstanceOf(_ListComposer.ListComposer);
        expect(fc5.type.ofType).toBe(tc);
        expect(() => {
          typeMapper.convertOutputFieldConfig([]);
        }).toThrowError(/Array must have exact one output type definition/);
        const fc6 = typeMapper.convertOutputFieldConfig([['String']]);
        expect(fc6.type).toBeInstanceOf(_ListComposer.ListComposer);
        expect(fc6.type.getType().ofType).toBeInstanceOf(_graphql2.GraphQLList);
        expect(fc6.type.getType().ofType.ofType).toBe(_graphql2.GraphQLString);
      });
      it('should throw error if provided InputTypeComposer', () => {
        const itc = _InputTypeComposer.InputTypeComposer.create('input LonLatInput { lon: Float, lat: Float }', _.schemaComposer);

        expect(() => {
          typeMapper.convertOutputFieldConfig({
            type: itc
          });
        }).toThrowError(/InputTypeComposer/);
        expect(() => {
          typeMapper.convertOutputFieldConfig(itc);
        }).toThrowError(/InputTypeComposer/);
      });
    });
    it('should convert args types', () => {
      const fc = typeMapper.convertOutputFieldConfig({
        type: 'String',
        args: {
          a1: {
            type: 'String'
          },
          a2: 'Int'
        }
      });
      expect(fc.args.a1.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
      expect(fc.args.a1.type.getType()).toBe(_graphql2.GraphQLString);
      expect(fc.args.a2.type.getType()).toBe(_graphql2.GraphQLInt);
    });
    it('should process outputFieldConfigMap()', () => {
      const fcm = typeMapper.convertOutputFieldConfigMap({
        f1: 'String',
        f2: 'Int'
      });
      expect(fcm.f1.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
      expect(fcm.f1.type.getType()).toBe(_graphql2.GraphQLString);
      expect(fcm.f2.type.getType()).toBe(_graphql2.GraphQLInt);
    });
  });
  describe('convertInputFieldConfig()', () => {
    it('should accept type with GraphQLInputObjectType', () => {
      const ic = typeMapper.convertInputFieldConfig({
        type: _graphql2.GraphQLString
      });
      expect(ic.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
      expect(ic.type.getType()).toBe(_graphql2.GraphQLString);
      const objectType = new _graphql2.GraphQLInputObjectType({
        name: 'SomeTypeInput',
        fields: {
          f: {
            type: _graphql2.GraphQLString
          }
        }
      });
      const ic2 = typeMapper.convertInputFieldConfig({
        type: objectType
      });
      expect(ic2.type).toBeInstanceOf(_InputTypeComposer.InputTypeComposer);
      expect(ic2.type.getType()).toBe(objectType);
    });
    it('should accept GraphQLScalarType', () => {
      const ic = typeMapper.convertInputFieldConfig(_graphql2.GraphQLString);
      expect(ic.type.getType()).toBe(_graphql2.GraphQLString);
    });
    it('should accept GraphQLInputObjectType', () => {
      const type = new _graphql2.GraphQLInputObjectType({
        name: 'InputType',
        fields: () => ({
          f1: {
            type: _graphql2.GraphQLInt
          }
        })
      });
      const ic = typeMapper.convertInputFieldConfig(type);
      expect(ic.type).toBeInstanceOf(_InputTypeComposer.InputTypeComposer);
      expect(ic.type.getType()).toBe(type);
    });
    it('should accept GraphQLNonNull', () => {
      const ic = typeMapper.convertInputFieldConfig(new _graphql2.GraphQLNonNull(_graphql2.GraphQLString));
      expect(ic.type).toBeInstanceOf(_NonNullComposer.NonNullComposer);
      expect(ic.type.getType().ofType).toBe(_graphql2.GraphQLString);
    });
    it('should accept GraphQLList', () => {
      const ic = typeMapper.convertInputFieldConfig(new _graphql2.GraphQLList(_graphql2.GraphQLString));
      expect(ic.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(ic.type.getType().ofType).toBe(_graphql2.GraphQLString);
    });
    it('should accept type as string to Scalar', () => {
      const ic = typeMapper.convertInputFieldConfig({
        type: 'String'
      });
      expect(ic.type.getType()).toBe(_graphql2.GraphQLString);
    });
    it('should accept type as string to Enum', () => {
      _EnumTypeComposer.EnumTypeComposer.create('enum Foo { A B }', _.schemaComposer);

      const ic = typeMapper.convertInputFieldConfig({
        type: 'Foo'
      });
      expect(ic.type).toBe(_.schemaComposer.get('Foo'));
    });
    it('should accept type as string to Input Object', () => {
      _InputTypeComposer.InputTypeComposer.create('input Foo { id: Sting }', _.schemaComposer);

      const ic = typeMapper.convertInputFieldConfig({
        type: 'Foo'
      });
      expect(ic.type).toBe(_.schemaComposer.get('Foo'));
    });
    it('should create field config from type name as string', () => {
      const ic = typeMapper.convertInputFieldConfig('String');
      expect(ic.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
      expect(ic.type.getType()).toBe(_graphql2.GraphQLString);
    });
    it('should lookup type name as string in schemaComposer', () => {
      const itc = _InputTypeComposer.InputTypeComposer.create(`input MyInput { a: Int }`, _.schemaComposer);

      const ic = typeMapper.convertInputFieldConfig('MyInput');
      expect(ic.type).toBe(itc);
    });
    it('should create field config from input type GraphQL Schema Language', () => {
      const fc = typeMapper.convertInputFieldConfig(`input MyInputType {
          a: String,
          b: Int,
        }`);
      const itc = fc.type;
      expect(itc.getTypeName()).toBe('MyInputType');
      expect(itc.getFieldType('a')).toBe(_graphql2.GraphQLString);
      expect(itc.getFieldType('b')).toBe(_graphql2.GraphQLInt);
    });
    it('should create field with Scalar type from GraphQL Schema Language', () => {
      const fc = typeMapper.convertInputFieldConfig('scalar MyInput');
      expect(fc.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
      expect(fc.type.getTypeName()).toBe('MyInput');
    });
    it('should create field with Enum type from GraphQL Schema Language', () => {
      const fc = typeMapper.convertInputFieldConfig('enum MyInputEnum { AND OR }');
      expect(fc.type).toBeInstanceOf(_EnumTypeComposer.EnumTypeComposer);
      const enumValues = fc.type.getFields();
      expect(enumValues.AND).toMatchObject({
        value: 'AND'
      });
      expect(enumValues.OR).toMatchObject({
        value: 'OR'
      });
    });
    it('should throw error if provided output type definition', () => {
      expect(() => {
        typeMapper.convertInputFieldConfig(`type MyOutputType {
          a: String,
        }`);
      }).toThrowError(/but got output type definitio/);
    });
    it('should accept InputTypeComposer', () => {
      const itc = _InputTypeComposer.InputTypeComposer.create('input PriceRangeInput { lon: Float, lat: Float }', _.schemaComposer);

      itc.setDescription('Description');
      const ic = typeMapper.convertInputFieldConfig({
        type: itc
      });
      expect(ic.type).toBe(itc);
      expect(ic.description).toBe(undefined);
      const ic2 = typeMapper.convertInputFieldConfig(itc);
      expect(ic2.type).toBe(itc);
      expect(ic2.description).toBe(undefined);
    });
    it('should accept ScalarTypeComposer', () => {
      const stc = _.schemaComposer.createScalarTC('scalar MySca');

      stc.setDescription('Description');
      const ic = typeMapper.convertInputFieldConfig({
        type: stc
      });
      expect(ic.type).toBe(stc);
      expect(ic.description).toBe(undefined);
      const ic2 = typeMapper.convertInputFieldConfig(stc);
      expect(ic2.type).toBe(stc);
      expect(ic2.description).toBe(undefined);
    });
    it('should accept EnumTypeComposer', () => {
      const etc = _.schemaComposer.createEnumTC('enum MyEnum { V1 V2 }');

      etc.setDescription('Description');
      const ic = typeMapper.convertInputFieldConfig({
        type: etc
      });
      expect(ic.type).toBe(etc);
      expect(ic.description).toBe(undefined);
      const ic2 = typeMapper.convertInputFieldConfig(etc);
      expect(ic2.type).toBe(etc);
      expect(ic2.description).toBe(undefined);
    });
    it('should throw error if provided ObjectTypeComposer', () => {
      const tc = _.schemaComposer.createObjectTC('type LonLat { lon: Float, lat: Float }');

      expect(() => {
        typeMapper.convertInputFieldConfig({
          type: tc
        });
      }).toThrowError(/\sObjectTypeComposer/);
      expect(() => {
        typeMapper.convertInputFieldConfig(tc);
      }).toThrowError(/\sObjectTypeComposer/);
    });
    it('should pass unchanged thunk', () => {
      const myTypeThunk = {
        type: () => 'Int'
      };
      const tc = typeMapper.convertInputFieldConfig(myTypeThunk);
      expect(tc.type).toBeInstanceOf(_ThunkComposer.ThunkComposer);
      expect(tc.type._thunk()).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
      expect(tc.type._thunk().getType()).toBe(_graphql2.GraphQLInt);
    });
    it('should accept array with one element as type and wrap them with GraphQLList', () => {
      const fc = typeMapper.convertInputFieldConfig(['String']);
      expect(fc.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(fc.type.getType().ofType).toBe(_graphql2.GraphQLString);
      const fc2 = typeMapper.convertInputFieldConfig({
        type: ['String']
      });
      expect(fc2.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(fc2.type.getType().ofType).toBe(_graphql2.GraphQLString);
      const fc3 = typeMapper.convertInputFieldConfig({
        type: [_graphql2.GraphQLString]
      });
      expect(fc3.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(fc3.type.getType().ofType).toBe(_graphql2.GraphQLString);

      const itc = _InputTypeComposer.InputTypeComposer.create('input PriceRangeInput { lon: Float, lat: Float }', _.schemaComposer);

      const fc4 = typeMapper.convertInputFieldConfig([itc]);
      expect(fc4.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(fc4.type.getType().ofType).toBe(itc.getType());
      const fc5 = typeMapper.convertInputFieldConfig({
        type: [itc]
      });
      expect(fc5.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(fc5.type.getType().ofType).toBe(itc.getType());
      const fc6 = typeMapper.convertInputFieldConfig([['String']]);
      expect(fc6.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(fc6.type.ofType).toBeInstanceOf(_ListComposer.ListComposer);
      expect(fc6.type.ofType.ofType).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
      expect(fc6.type.getType().ofType.ofType).toBe(_graphql2.GraphQLString);
      expect(() => {
        typeMapper.convertInputFieldConfig([]);
      }).toThrowError(/Array must have exact one input type definition/);
    });
    it('should process inputFieldConfigMap()', () => {
      const icm = typeMapper.convertInputFieldConfigMap({
        i1: {
          type: 'String'
        },
        i2: 'Int'
      });
      expect(icm.i1.type.getType()).toBe(_graphql2.GraphQLString);
      expect(icm.i2.type.getType()).toBe(_graphql2.GraphQLInt);
    });
  });
  describe('convertArgConfig()', () => {
    it('should accept type with GraphQLInputObjectType', () => {
      const ac = typeMapper.convertArgConfig({
        type: _graphql2.GraphQLString
      });
      expect(ac.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
      expect(ac.type.getType()).toBe(_graphql2.GraphQLString);
      const objectType = new _graphql2.GraphQLInputObjectType({
        name: 'SomeTypeInput',
        fields: {
          f: {
            type: _graphql2.GraphQLString
          }
        }
      });
      const ac2 = typeMapper.convertArgConfig({
        type: objectType
      });
      expect(ac2.type.getType()).toBe(objectType);
    });
    it('should accept GraphQLScalarType', () => {
      const ac = typeMapper.convertArgConfig(_graphql2.GraphQLString);
      expect(ac.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
      expect(ac.type.getType()).toBe(_graphql2.GraphQLString);
    });
    it('should accept GraphQLInputObjectType', () => {
      const type = new _graphql2.GraphQLInputObjectType({
        name: 'InputType',
        fields: () => ({
          f: {
            type: _graphql2.GraphQLInt
          }
        })
      });
      const ac = typeMapper.convertArgConfig(type);
      expect(ac.type).toBeInstanceOf(_InputTypeComposer.InputTypeComposer);
      expect(ac.type.getType()).toBe(type);
    });
    it('should accept GraphQLNonNull', () => {
      const ac = typeMapper.convertArgConfig(new _graphql2.GraphQLNonNull(_graphql2.GraphQLString));
      expect(ac.type).toBeInstanceOf(_NonNullComposer.NonNullComposer);
      expect(ac.type.getType().ofType).toBe(_graphql2.GraphQLString);
    });
    it('should accept GraphQLList', () => {
      const ac = typeMapper.convertArgConfig(new _graphql2.GraphQLList(_graphql2.GraphQLString));
      expect(ac.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(ac.type.getType().ofType).toBe(_graphql2.GraphQLString);
    });
    it('should accept type as string to Scalar', () => {
      const ac = typeMapper.convertArgConfig({
        type: 'String'
      });
      expect(ac.type.getType()).toBe(_graphql2.GraphQLString);
    });
    it('should accept type as string to Enum', () => {
      _EnumTypeComposer.EnumTypeComposer.create('enum Foo { A B }', _.schemaComposer);

      const ac = typeMapper.convertArgConfig({
        type: 'Foo'
      });
      expect(ac.type).toBe(_.schemaComposer.get('Foo'));
    });
    it('should accept type as string to Input Object', () => {
      _InputTypeComposer.InputTypeComposer.create('input Foo { id: String }', _.schemaComposer);

      const ac = typeMapper.convertArgConfig({
        type: 'Foo'
      });
      expect(ac.type).toBe(_.schemaComposer.get('Foo'));
    });
    it('should create arg config from GraphQL Schema Language', () => {
      const ac = typeMapper.convertArgConfig('String');
      expect(ac.type.getType()).toBe(_graphql2.GraphQLString);
    });
    it('should lookup type name as string in schemaComposer', () => {
      const itc = _InputTypeComposer.InputTypeComposer.create(`input MyArg { a: Int }`, _.schemaComposer);

      const ac = typeMapper.convertArgConfig('MyArg');
      expect(ac.type).toBe(itc);
    });
    it('should create arg config from input type GraphQL Schema Language', () => {
      const fc = typeMapper.convertArgConfig(`input MyInputArg {
        a: String,
        b: Int,
      }`);
      const itc = fc.type;
      expect(itc.getTypeName()).toBe('MyInputArg');
      expect(itc.getFieldType('a')).toBe(_graphql2.GraphQLString);
      expect(itc.getFieldType('b')).toBe(_graphql2.GraphQLInt);
    });
    it('should create arg config with Scalar type from GraphQL Schema Language', () => {
      const fc = typeMapper.convertArgConfig('scalar Abc');
      expect(fc.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
      expect(fc.type.getType()).toBeInstanceOf(_graphql2.GraphQLScalarType);
      expect(fc.type.getTypeName()).toBe('Abc');
    });
    it('should create arg config with Enum type from GraphQL Schema Language', () => {
      const fc = typeMapper.convertArgConfig('enum MyArgEnum { AND OR }');
      expect(fc.type).toBeInstanceOf(_EnumTypeComposer.EnumTypeComposer);
      expect(fc.type.getType()).toBeInstanceOf(_graphql2.GraphQLEnumType);
      const enumValues = fc.type.getFields();
      expect(enumValues.AND).toMatchObject({
        value: 'AND'
      });
      expect(enumValues.OR).toMatchObject({
        value: 'OR'
      });
    });
    it('should throw error if provided output type definition', () => {
      expect(() => {
        typeMapper.convertArgConfig(`type MyOutputType {
          a: String,
        }`);
      }).toThrowError(/but got output type definition/);
    });
    it('should accept InputTypeComposer', () => {
      const itc = _InputTypeComposer.InputTypeComposer.create('input PriceRangeInput { lon: Float, lat: Float }', _.schemaComposer);

      itc.setDescription('Description');
      const ac = typeMapper.convertArgConfig({
        type: itc
      });
      expect(ac.type).toBeInstanceOf(_InputTypeComposer.InputTypeComposer);
      expect(ac.type).toBe(itc);
      expect(ac.type.getType()).toBe(itc.getType());
      expect(ac.description).toBe(undefined);
      const ac2 = typeMapper.convertArgConfig(itc);
      expect(ac2.type.getType()).toBe(itc.getType());
      expect(ac2.description).toBe(undefined);
    });
    it('should accept ScalarTypeComposer', () => {
      const stc = _ScalarTypeComposer.ScalarTypeComposer.create('scalar Aaa', _.schemaComposer);

      stc.setDescription('Description');
      const ac = typeMapper.convertArgConfig({
        type: stc
      });
      expect(ac.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
      expect(ac.type).toBe(stc);
      expect(ac.type.getType()).toBe(stc.getType());
      expect(ac.description).toBe(undefined);
      const ac2 = typeMapper.convertArgConfig(stc);
      expect(ac2.type.getType()).toBe(stc.getType());
      expect(ac2.description).toBe(undefined);
    });
    it('should accept EnumTypeComposer', () => {
      const etc = _EnumTypeComposer.EnumTypeComposer.create('enum MyEnum { V1 V2 }', _.schemaComposer);

      etc.setDescription('Description');
      const ac = typeMapper.convertArgConfig({
        type: etc
      });
      expect(ac.type).toBeInstanceOf(_EnumTypeComposer.EnumTypeComposer);
      expect(ac.type).toBe(etc);
      expect(ac.type.getType()).toBe(etc.getType());
      expect(ac.description).toBe(undefined);
      const ac2 = typeMapper.convertArgConfig(etc);
      expect(ac2.type).toBeInstanceOf(_EnumTypeComposer.EnumTypeComposer);
      expect(ac2.type).toBe(etc);
      expect(ac2.type.getType()).toBe(etc.getType());
      expect(ac2.description).toBe(undefined);
    });
    it('should pass unchanged thunk', () => {
      const myTypeThunk = () => 'Int';

      const ac = typeMapper.convertArgConfig(myTypeThunk);
      expect(ac.type).toBeInstanceOf(_ThunkComposer.ThunkComposer);
      expect(ac.type.getType()).toBe(_graphql2.GraphQLInt);
    });
    it('should accept array with one element as type and wrap them with GraphQLList', () => {
      const fc = typeMapper.convertArgConfig(['String']);
      expect(fc.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(fc.type.getType()).toBeInstanceOf(_graphql2.GraphQLList);
      expect(fc.type.getType().ofType).toBe(_graphql2.GraphQLString);
      const fc2 = typeMapper.convertArgConfig({
        type: ['String']
      });
      expect(fc2.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(fc2.type.getType()).toBeInstanceOf(_graphql2.GraphQLList);
      expect(fc2.type.getType().ofType).toBe(_graphql2.GraphQLString);
      const fc3 = typeMapper.convertArgConfig({
        type: [_graphql2.GraphQLString]
      });
      expect(fc3.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(fc3.type.getType()).toBeInstanceOf(_graphql2.GraphQLList);
      expect(fc3.type.getType().ofType).toBe(_graphql2.GraphQLString);

      const itc = _InputTypeComposer.InputTypeComposer.create('input PriceRangeInput { lon: Float, lat: Float }', _.schemaComposer);

      const fc4 = typeMapper.convertArgConfig([itc]);
      expect(fc4.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(fc4.type.getType()).toBeInstanceOf(_graphql2.GraphQLList);
      expect(fc4.type.getType().ofType).toBe(itc.getType());
      const fc5 = typeMapper.convertArgConfig({
        type: [itc]
      });
      expect(fc5.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(fc5.type.getType()).toBeInstanceOf(_graphql2.GraphQLList);
      expect(fc5.type.getType().ofType).toBe(itc.getType());
      const fc6 = typeMapper.convertArgConfig([['String']]);
      expect(fc6.type).toBeInstanceOf(_ListComposer.ListComposer);
      expect(fc6.type.getType()).toBeInstanceOf(_graphql2.GraphQLList);
      expect(fc6.type.getType().ofType).toBeInstanceOf(_graphql2.GraphQLList);
      expect(fc6.type.getType().ofType.ofType).toBe(_graphql2.GraphQLString);
      expect(() => {
        typeMapper.convertArgConfig([]);
      }).toThrowError(/Array must have exact one input type definition/);
    });
    it('should throw error if provided ObjectTypeComposer', () => {
      const tc = _ObjectTypeComposer.ObjectTypeComposer.create('type LonLat { lon: Float, lat: Float }', _.schemaComposer);

      expect(() => {
        typeMapper.convertArgConfig({
          type: tc
        });
      }).toThrowError(/\sObjectTypeComposer/);
      expect(() => {
        typeMapper.convertArgConfig(tc);
      }).toThrowError(/\sObjectTypeComposer/);
    });
    it('should process ArgConfigMap', () => {
      const acm = typeMapper.convertArgConfigMap({
        a1: {
          type: 'String'
        },
        a2: 'Int'
      });
      expect(acm.a1.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
      expect(acm.a1.type.getType()).toBe(_graphql2.GraphQLString);
      expect(acm.a2.type).toBeInstanceOf(_ScalarTypeComposer.ScalarTypeComposer);
      expect(acm.a2.type.getType()).toBe(_graphql2.GraphQLInt);
    });
  });
  describe('parseTypesFrom... methods', () => {
    it('parseTypesFromString()', () => {
      const gql = `
        type User {
          name: String
        }

        type Article {
          title: String
        }

        input Record {
          id: ID
          ts: Int
        }
      `;
      const ts = typeMapper.parseTypesFromString(gql);
      expect(Array.from(ts.keys())).toEqual(['User', 'Article', 'Record']);
      expect(ts.get('User').getType()).toBeInstanceOf(_graphql2.GraphQLObjectType);
      expect(ts.get('Article').getType()).toBeInstanceOf(_graphql2.GraphQLObjectType);
      expect(ts.get('Record').getType()).toBeInstanceOf(_graphql2.GraphQLInputObjectType);
    });
    it('parseTypesFromString() should strictly accept `schema` definition', () => {
      const ts = typeMapper.parseTypesFromString(`
        schema {
          query: Query
          mutation: Mutation
          subscription: Subscription
        }
      `);
      expect(ts.size).toEqual(0);
      expect(() => {
        typeMapper.parseTypesFromString(`schema { query: ErrName }`);
      }).toThrow("Incorrect type name 'ErrName' for 'query'");
      expect(() => {
        typeMapper.parseTypesFromString(`schema { mutation: ErrName }`);
      }).toThrow("Incorrect type name 'ErrName' for 'mutation'");
      expect(() => {
        typeMapper.parseTypesFromString(`schema { subscription: ErrName }`);
      }).toThrow("Incorrect type name 'ErrName' for 'subscription'");
    });
    it('parseTypesFromString() should strictly accept `scalar` definition', () => {
      const ts = typeMapper.parseTypesFromString(`scalar MyScalar`);
      expect(ts.get('MyScalar').getType()).toBeInstanceOf(_graphql2.GraphQLScalarType);
    });
    it('parseTypesFromString() should accept `union` definition', () => {
      const ts = typeMapper.parseTypesFromString(`
        union TypeAB = TypeA | TypeB
        type TypeA { f1: Int }
        type TypeB { f2: Int }
      `);
      const TypeAB = ts.get('TypeAB');
      expect(TypeAB).toBeInstanceOf(_UnionTypeComposer.UnionTypeComposer);
      const types = TypeAB.getTypes();
      expect(types).toHaveLength(2);
    });
    it('extend Object type', async () => {
      const ts = typeMapper.parseTypesFromString(`
        type MyType { aaa: Int }
        extend type MyType @ok { bbb: String! }
      `);
      expect(ts.get('MyType').getFieldNames()).toEqual(['aaa', 'bbb']);
      expect(ts.get('MyType').getDirectiveNames()).toEqual(['ok']);
    });
    it('extend Input type', async () => {
      const ts = typeMapper.parseTypesFromString(`
        input In { aaa: Int }
        extend input In @ok { bbb: String! }
      `);
      expect(ts.get('In').getFieldNames()).toEqual(['aaa', 'bbb']);
      expect(ts.get('In').getDirectiveNames()).toEqual(['ok']);
    });
    it('extend Interface type', async () => {
      const ts = typeMapper.parseTypesFromString(`
        interface Iface { aaa: Int }
        extend interface Iface @ok { bbb: String! }
      `);
      expect(ts.get('Iface').getFieldNames()).toEqual(['aaa', 'bbb']);
      expect(ts.get('Iface').getDirectiveNames()).toEqual(['ok']);
    });
    it('extend Union type', async () => {
      const ts = typeMapper.parseTypesFromString(`
        type T1 { aaa: Int }
        type T2 { aaa: Int }
        type T3 { aaa: Int }
        union Un = T1 | T2
        extend union Un @ok = T3
      `);
      expect(ts.get('Un').getTypeNames()).toEqual(['T1', 'T2', 'T3']);
      expect(ts.get('Un').getDirectiveNames()).toEqual(['ok']);
    });
    it('extend Enum type', async () => {
      const ts = typeMapper.parseTypesFromString(`
        enum E { AA BB }
        extend enum E @ok { CC }
      `);
      expect(ts.get('E').getFieldNames()).toEqual(['AA', 'BB', 'CC']);
      expect(ts.get('E').getDirectiveNames()).toEqual(['ok']);
    });
    it('extend Scalar type', async () => {
      const ts = typeMapper.parseTypesFromString(`
        scalar S
        extend scalar S @ok
      `);
      expect(ts.get('S').getDirectiveNames()).toEqual(['ok']);
    });

    if (_graphqlVersion.graphqlVersion >= 15.1) {
      it('extract specifiedByUrl directive in Scalar', async () => {
        const ts = typeMapper.parseTypesFromString(`
          scalar S @specifiedBy(url: "https://example.com/foo_spec")
        `);
        const scalarTC = ts.get('S');
        expect(scalarTC.getDirectiveNames()).toEqual([]);
        expect(scalarTC.getSpecifiedByUrl()).toBe('https://example.com/foo_spec');
      });
    }
  });
  describe('convertSDLTypeDefinition()', () => {
    it('should return same type for the same TypeDefinitionString', () => {
      const t1 = typeMapper.convertSDLTypeDefinition('type SameType { a: Int }');
      const t2 = typeMapper.convertSDLTypeDefinition('type SameType { a: Int }');
      expect(t1).toBe(t2);
      expect(t1.getTypeName()).toBe('SameType');
      expect(t1.getFieldType('a')).toBe(_graphql2.GraphQLInt);
    });
  });
  describe('parse types directives to extensions', () => {
    it('ObjectType', () => {
      const tc = typeMapper.convertSDLTypeDefinition(`
        type My1 @typeDirective(a: false) { 
          a: Int @cost(value: 1)
          b: Float @unexisted(q: 1, w: true, e: "s")
          c: String @me @they @me
          d(arg: Int = 15 @darg(v: 2) @darg2(w: "3")): Int @ddd
        }`);
      expect(tc).toBeInstanceOf(_ObjectTypeComposer.ObjectTypeComposer);
      expect(tc.getExtensions()).toEqual({
        directives: [{
          args: {
            a: false
          },
          name: 'typeDirective'
        }]
      });
      expect(tc.getFieldExtensions('a')).toEqual({
        directives: [{
          args: {
            value: 1
          },
          name: 'cost'
        }]
      });
      expect(tc.getFieldExtensions('b')).toEqual({
        directives: [{
          args: {
            e: 's',
            q: 1,
            w: true
          },
          name: 'unexisted'
        }]
      });
      expect(tc.getFieldExtensions('c')).toEqual({
        directives: [{
          args: {},
          name: 'me'
        }, {
          args: {},
          name: 'they'
        }, {
          args: {},
          name: 'me'
        }]
      });
      expect(tc.getFieldArgExtensions('d', 'arg')).toEqual({
        directives: [{
          args: {
            v: 2
          },
          name: 'darg'
        }, {
          args: {
            w: '3'
          },
          name: 'darg2'
        }]
      });
      expect(tc.getFieldExtensions('d')).toEqual({
        directives: [{
          args: {},
          name: 'ddd'
        }]
      });
    });
    it('InterfaceType', () => {
      const tc = typeMapper.convertSDLTypeDefinition(`
        interface My1 @typeDirective(a: false) { 
          a: Int @cost(value: 1)
          b: Float @unexisted(q: 1, w: true, e: "s")
          c: String @me @they @me
          d(arg: Int = 15 @darg(v: 2) @darg2(w: "3")): Int @ddd
        }`);
      expect(tc).toBeInstanceOf(_InterfaceTypeComposer.InterfaceTypeComposer);
      expect(tc.getExtensions()).toEqual({
        directives: [{
          args: {
            a: false
          },
          name: 'typeDirective'
        }]
      });
      expect(tc.getFieldExtensions('a')).toEqual({
        directives: [{
          args: {
            value: 1
          },
          name: 'cost'
        }]
      });
      expect(tc.getFieldExtensions('b')).toEqual({
        directives: [{
          args: {
            e: 's',
            q: 1,
            w: true
          },
          name: 'unexisted'
        }]
      });
      expect(tc.getFieldExtensions('c')).toEqual({
        directives: [{
          args: {},
          name: 'me'
        }, {
          args: {},
          name: 'they'
        }, {
          args: {},
          name: 'me'
        }]
      });
      expect(tc.getFieldArg('d', 'arg').defaultValue).toBe(15);
      expect(tc.getFieldArgExtensions('d', 'arg')).toEqual({
        directives: [{
          args: {
            v: 2
          },
          name: 'darg'
        }, {
          args: {
            w: '3'
          },
          name: 'darg2'
        }]
      });
      expect(tc.getFieldExtensions('d')).toEqual({
        directives: [{
          args: {},
          name: 'ddd'
        }]
      });
    });
    it('InputType', () => {
      const tc = typeMapper.convertSDLTypeDefinition(`
        input My1 @typeDirective(a: false) { 
          a: Int @cost(value: 1)
          b: Float @unexisted(q: 1, w: true, e: "s")
          c: String @me @they @me
        }`);
      expect(tc).toBeInstanceOf(_InputTypeComposer.InputTypeComposer);
      expect(tc.getExtensions()).toEqual({
        directives: [{
          args: {
            a: false
          },
          name: 'typeDirective'
        }]
      });
      expect(tc.getFieldExtensions('a')).toEqual({
        directives: [{
          args: {
            value: 1
          },
          name: 'cost'
        }]
      });
      expect(tc.getFieldExtensions('b')).toEqual({
        directives: [{
          args: {
            e: 's',
            q: 1,
            w: true
          },
          name: 'unexisted'
        }]
      });
      expect(tc.getFieldExtensions('c')).toEqual({
        directives: [{
          args: {},
          name: 'me'
        }, {
          args: {},
          name: 'they'
        }, {
          args: {},
          name: 'me'
        }]
      });
    });
  });
});