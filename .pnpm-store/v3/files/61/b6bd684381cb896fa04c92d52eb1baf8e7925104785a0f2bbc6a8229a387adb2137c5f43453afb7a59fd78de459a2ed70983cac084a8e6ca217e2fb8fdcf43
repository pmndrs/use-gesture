import { GraphQLSchema } from 'graphql';
import { GraphQLString, GraphQLFloat, GraphQLInt, GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLScalarType, GraphQLInterfaceType } from '../graphql';
import { schemaComposer as sc } from '..';
import { SchemaComposer } from '../SchemaComposer';
import { graphqlVersion } from '../utils/graphqlVersion';
import { GraphQLDate, GraphQLBuffer, GraphQLJSON, GraphQLJSONObject } from '../type';
import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { InputTypeComposer } from '../InputTypeComposer';
import { ScalarTypeComposer } from '../ScalarTypeComposer';
import { EnumTypeComposer } from '../EnumTypeComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { UnionTypeComposer } from '../UnionTypeComposer';
import { Resolver } from '../Resolver';
import { TypeMapper } from '../TypeMapper';
import { ListComposer } from '../ListComposer';
import { NonNullComposer } from '../NonNullComposer';
import { ThunkComposer } from '../ThunkComposer';
let typeMapper;
beforeEach(() => {
  sc.clear();
  typeMapper = new TypeMapper(sc);
});
describe('TypeMapper', () => {
  it('should provide default scalar GraphQL types', () => {
    expect(typeMapper.getBuiltInType('String').getType()).toBe(GraphQLString);
    expect(typeMapper.getBuiltInType('Float').getType()).toBe(GraphQLFloat);
    expect(typeMapper.getBuiltInType('Int').getType()).toBe(GraphQLInt);
    expect(typeMapper.getBuiltInType('Boolean').getType()).toBe(GraphQLBoolean);
    expect(typeMapper.getBuiltInType('ID').getType()).toBe(GraphQLID);
    expect(typeMapper.getBuiltInType('JSON').getType()).toBe(GraphQLJSON);
    expect(typeMapper.getBuiltInType('JSONObject').getType()).toBe(GraphQLJSONObject);
    expect(typeMapper.getBuiltInType('Date').getType()).toBe(GraphQLDate);
    expect(typeMapper.getBuiltInType('Buffer').getType()).toBe(GraphQLBuffer);
  });
  it('should not add basic scalars if they already provided', () => {
    const CustomJSON = new GraphQLScalarType({
      name: 'JSON',
      serialize: () => {}
    });
    const CustomDate = new GraphQLScalarType({
      name: 'Date',
      serialize: () => {}
    });
    const Query = new GraphQLObjectType({
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
    const schema = new GraphQLSchema({
      query: Query
    });
    const sc2 = new SchemaComposer(schema);
    expect(sc2.get('JSON').getType()).toBe(CustomJSON);
    expect(sc2.get('Date').getType()).toBe(CustomDate);
  });
  it('should allow to override basic graphql-compose types', () => {
    const CustomJSON = sc.createScalarTC({
      name: 'CustomJSON',
      serialize: () => {}
    });
    const CustomDate = sc.createScalarTC({
      name: 'CustomDate',
      serialize: () => {}
    });
    const CustomBuffer = sc.createScalarTC({
      name: 'CustomBuffer',
      serialize: () => {}
    });
    sc.set('JSON', CustomJSON);
    sc.set('Date', CustomDate);
    sc.set('Buffer', CustomBuffer);
    expect(typeMapper.schemaComposer.get('JSON')).toBe(CustomJSON);
    expect(typeMapper.schemaComposer.get('Date')).toBe(CustomDate);
    expect(typeMapper.schemaComposer.get('Buffer')).toBe(CustomBuffer);
  });
  it('should create object type from template string', () => {
    const tc = typeMapper.convertSDLTypeDefinition(graphqlVersion < 12 ? `
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
    expect(tc).toBeInstanceOf(ObjectTypeComposer);
    const type = tc.getType();
    expect(type).toBeInstanceOf(GraphQLObjectType);
    expect(typeMapper.schemaComposer.get('IntRange')).toBe(tc);
    const IntRangeTC = new ObjectTypeComposer(type, sc);
    expect(IntRangeTC.getTypeName()).toBe('IntRange');
    expect(IntRangeTC.getFieldNames()).toEqual(expect.arrayContaining(['max', 'min', 'arr']));
    expect(IntRangeTC.getFieldType('max')).toBe(GraphQLInt);
    expect(IntRangeTC.getFieldConfig('max').description).toBe('Max value');
    expect(IntRangeTC.getFieldType('min')).toBeInstanceOf(GraphQLNonNull);
    expect(IntRangeTC.getFieldType('arr')).toBeInstanceOf(GraphQLList);
  });
  it('should create input object type from template string', () => {
    const tc = typeMapper.convertSDLTypeDefinition(`
      input InputIntRange {
        min: Int
        max: Int!
      }
    `);
    expect(tc).toBeInstanceOf(InputTypeComposer);
    const type = tc.getType();
    expect(type).toBeInstanceOf(GraphQLInputObjectType);
    expect(typeMapper.schemaComposer.get('InputIntRange')).toBe(tc);
    const IntRangeTC = new InputTypeComposer(type, sc);
    expect(IntRangeTC.getTypeName()).toBe('InputIntRange');
    expect(IntRangeTC.getFieldType('min')).toBe(GraphQLInt);
    expect(IntRangeTC.getFieldType('max')).toBeInstanceOf(GraphQLNonNull);
    expect(IntRangeTC.getFieldType('max').ofType).toBe(GraphQLInt);
  });
  it('should create interface type from template string', () => {
    const tc = typeMapper.convertSDLTypeDefinition(graphqlVersion < 12 ? `
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
    expect(tc).toBeInstanceOf(InterfaceTypeComposer);
    const type = tc.getType();
    expect(type).toBeInstanceOf(GraphQLInterfaceType);
    expect(typeMapper.schemaComposer.get('IntRangeInterface').getType()).toBe(type);
    const IntRangeTC = new InterfaceTypeComposer(type, sc);
    expect(IntRangeTC.getTypeName()).toBe('IntRangeInterface');
    expect(IntRangeTC.getFieldNames()).toEqual(expect.arrayContaining(['max', 'min', 'arr']));
    expect(IntRangeTC.getFieldType('max')).toBe(GraphQLInt);
    expect(IntRangeTC.getFieldConfig('max').description).toBe('Max value');
    expect(IntRangeTC.getFieldType('min')).toBeInstanceOf(GraphQLNonNull);
    expect(IntRangeTC.getFieldType('arr')).toBeInstanceOf(GraphQLList);
  });
  it('should return wrapped type', () => {
    expect(typeMapper.convertSDLWrappedTypeName('String!')).toBeInstanceOf(NonNullComposer);
    expect(typeMapper.convertSDLWrappedTypeName('[String]')).toBeInstanceOf(ListComposer);
    expect(typeMapper.convertSDLWrappedTypeName('[String]!')).toBeInstanceOf(NonNullComposer);
    expect(typeMapper.convertSDLWrappedTypeName('[String]!').ofType).toBeInstanceOf(ListComposer);
    expect(typeMapper.convertSDLWrappedTypeName('String')).toBeInstanceOf(ScalarTypeComposer);
    expect(typeMapper.convertSDLWrappedTypeName('String').getType()).toBe(GraphQLString);
  });
  describe('convertOutputFieldConfig()', () => {
    describe('converting field type', () => {
      it('should accept type with GraphQLOutputType', () => {
        const fc = typeMapper.convertOutputFieldConfig({
          type: GraphQLString
        });
        expect(fc.type).toBeInstanceOf(ScalarTypeComposer);
        expect(fc.type.getType()).toBe(GraphQLString);
        const objectType = new GraphQLObjectType({
          name: 'SomeType',
          fields: {
            f: {
              type: GraphQLString
            }
          }
        });
        const fc2 = typeMapper.convertOutputFieldConfig({
          type: objectType
        });
        expect(fc2.type).toBeInstanceOf(ObjectTypeComposer);
        expect(fc2.type.getType()).toBe(objectType);
      });
      it('should accept GraphQLScalarType', () => {
        const fc = typeMapper.convertOutputFieldConfig(GraphQLString);
        expect(fc.type).toBeInstanceOf(ScalarTypeComposer);
        expect(fc.type.getType()).toBe(GraphQLString);
      });
      it('should accept GraphQLObjectType', () => {
        const type = new GraphQLObjectType({
          name: 'Test',
          fields: () => ({
            a: {
              type: GraphQLInt
            }
          })
        });
        const fc = typeMapper.convertOutputFieldConfig(type);
        expect(fc.type).toBeInstanceOf(ObjectTypeComposer);
        expect(fc.type.getType()).toBe(type);
      });
      it('should accept GraphQLNonNull', () => {
        const fc = typeMapper.convertOutputFieldConfig(new GraphQLNonNull(GraphQLString));
        expect(fc.type).toBeInstanceOf(NonNullComposer);
        expect(fc.type.getType().ofType).toBe(GraphQLString);
      });
      it('should accept GraphQLList', () => {
        const fc = typeMapper.convertOutputFieldConfig(new GraphQLList(GraphQLString));
        expect(fc.type).toBeInstanceOf(ListComposer);
        expect(fc.type.getType().ofType).toBe(GraphQLString);
      });
      it('should accept type as string to scalar', () => {
        const fc = typeMapper.convertOutputFieldConfig({
          type: 'String'
        });
        expect(fc.type).toBeInstanceOf(ScalarTypeComposer);
        expect(fc.type.getType()).toBe(GraphQLString);
      });
      it('should accept type as string to object type', () => {
        ObjectTypeComposer.create('type Foo { id: ID! }', sc);
        const fc = typeMapper.convertOutputFieldConfig({
          type: 'Foo'
        });
        expect(fc.type).toBe(sc.getAnyTC('Foo'));
      });
      it('should accept type as string to enum type', () => {
        EnumTypeComposer.create('enum Foo { A B }', sc);
        const fc = typeMapper.convertOutputFieldConfig({
          type: 'Foo'
        });
        expect(fc.type).toBe(sc.getAnyTC('Foo'));
      });
      it('should accept type as string to interface type', () => {
        InterfaceTypeComposer.create('interface Foo { id: ID! }', sc);
        const fc = typeMapper.convertOutputFieldConfig({
          type: 'Foo'
        });
        expect(fc.type).toBe(sc.getAnyTC('Foo'));
      });
      it('should accept type as string to union type', () => {
        ObjectTypeComposer.create('type A { id: ID! }', sc);
        ObjectTypeComposer.create('type B { id: ID! }', sc);
        UnionTypeComposer.create('union Foo = A | B', sc);
        const fc = typeMapper.convertOutputFieldConfig({
          type: 'Foo'
        });
        expect(fc.type).toBe(sc.getAnyTC('Foo'));
      });
      it('should create field config from type as string', () => {
        const fc = typeMapper.convertOutputFieldConfig('String');
        expect(fc.type).toBeInstanceOf(ScalarTypeComposer);
        expect(fc.type.getType()).toBe(GraphQLString);
      });
      it('should lookup type name as string in schemaComposer', () => {
        const tc = ObjectTypeComposer.create(`type MyType { a: Int }`, sc);
        const fc = typeMapper.convertOutputFieldConfig('MyType');
        expect(fc.type).toBe(tc);
        const fc2 = typeMapper.convertOutputFieldConfig({
          type: '[MyType]'
        });
        expect(fc2.type).toBeInstanceOf(ListComposer);
        expect(fc2.type.getType().ofType).toBe(tc.getType());
      });
      it('should create field config from GraphQL Schema Language', () => {
        const fc = typeMapper.convertOutputFieldConfig(`type MyOutputType {
          a: String,
          b: Int,
        }`);
        const tc = fc.type;
        expect(tc.getTypeName()).toBe('MyOutputType');
        expect(tc.getFieldType('a')).toBe(GraphQLString);
        expect(tc.getFieldType('b')).toBe(GraphQLInt);
      });
      it('should create field with Scalar type from GraphQL Schema Language', () => {
        const fc = typeMapper.convertOutputFieldConfig('scalar MyScalar');
        expect(fc.type).toBeInstanceOf(ScalarTypeComposer);
        expect(fc.type.getTypeName()).toBe('MyScalar');
      });
      it('should create field with Enum type from GraphQL Schema Language', () => {
        const fc = typeMapper.convertOutputFieldConfig('enum MyEnum { AND OR }');
        expect(fc.type).toBeInstanceOf(EnumTypeComposer);
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
        const tc = ObjectTypeComposer.create('type PriceRange { lon: Float, lat: Float }', sc);
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
        const stc = ScalarTypeComposer.create('scalar UInt', sc);
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
        const etc = EnumTypeComposer.create('enum MyEnum { V1 V2 V3 }', sc);
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
        const iftc = InterfaceTypeComposer.create('interface MyIFace { id: Int }', sc);
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
        const resolver = new Resolver({
          name: 'find',
          type: 'Float',
          args: {
            a1: 'String'
          },
          resolve: () => 123
        }, sc);
        const fc = typeMapper.convertOutputFieldConfig(resolver);
        expect(fc.type).toBeInstanceOf(ScalarTypeComposer);
        expect(fc.type.getType()).toBe(GraphQLFloat);
        expect(fc.args.a1.type.getType()).toBe(GraphQLString);
        expect(fc.resolve()).toBe(123);
      });
      it('should accept Resolver as type', () => {
        const resolver = new Resolver({
          name: 'find',
          type: 'Float',
          args: {
            a1: 'String'
          },
          resolve: () => 123
        }, sc);
        const fc = typeMapper.convertOutputFieldConfig({
          type: resolver
        });
        expect(fc.type).toBeInstanceOf(ScalarTypeComposer);
        expect(fc.type.getType()).toBe(GraphQLFloat);
        expect(fc.args).toEqual({});
        expect(fc.resolve).toBe(undefined);
      });
      it('should pass unchanged thunk', () => {
        const myTypeThunk = () => 'Int';

        const fc = typeMapper.convertOutputFieldConfig(myTypeThunk);
        expect(fc.type).toBeInstanceOf(ThunkComposer);
        expect(fc.type.getType()).toBe(GraphQLInt);
      });
      it('should accept array with one element as type and wrap them with GraphQLList', () => {
        const fc = typeMapper.convertOutputFieldConfig(['String']);
        expect(fc.type).toBeInstanceOf(ListComposer);
        expect(fc.type.ofType).toBeInstanceOf(ScalarTypeComposer);
        expect(fc.type.ofType.getType()).toBe(GraphQLString);
        const fc2 = typeMapper.convertOutputFieldConfig({
          type: ['String']
        });
        expect(fc2.type).toBeInstanceOf(ListComposer);
        expect(fc2.type.getType().ofType).toBe(GraphQLString);
        const fc3 = typeMapper.convertOutputFieldConfig({
          type: [GraphQLString]
        });
        expect(fc3.type).toBeInstanceOf(ListComposer);
        expect(fc3.type.getType().ofType).toBe(GraphQLString);
        const tc = ObjectTypeComposer.create('type PriceRange { lon: Float, lat: Float }', sc);
        const fc4 = typeMapper.convertOutputFieldConfig([tc]);
        expect(fc4.type).toBeInstanceOf(ListComposer);
        expect(fc4.type.getType().ofType).toBe(tc.getType());
        const fc5 = typeMapper.convertOutputFieldConfig({
          type: [tc]
        });
        expect(fc5.type).toBeInstanceOf(ListComposer);
        expect(fc5.type.ofType).toBe(tc);
        expect(() => {
          typeMapper.convertOutputFieldConfig([]);
        }).toThrowError(/Array must have exact one output type definition/);
        const fc6 = typeMapper.convertOutputFieldConfig([['String']]);
        expect(fc6.type).toBeInstanceOf(ListComposer);
        expect(fc6.type.getType().ofType).toBeInstanceOf(GraphQLList);
        expect(fc6.type.getType().ofType.ofType).toBe(GraphQLString);
      });
      it('should throw error if provided InputTypeComposer', () => {
        const itc = InputTypeComposer.create('input LonLatInput { lon: Float, lat: Float }', sc);
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
      expect(fc.args.a1.type).toBeInstanceOf(ScalarTypeComposer);
      expect(fc.args.a1.type.getType()).toBe(GraphQLString);
      expect(fc.args.a2.type.getType()).toBe(GraphQLInt);
    });
    it('should process outputFieldConfigMap()', () => {
      const fcm = typeMapper.convertOutputFieldConfigMap({
        f1: 'String',
        f2: 'Int'
      });
      expect(fcm.f1.type).toBeInstanceOf(ScalarTypeComposer);
      expect(fcm.f1.type.getType()).toBe(GraphQLString);
      expect(fcm.f2.type.getType()).toBe(GraphQLInt);
    });
  });
  describe('convertInputFieldConfig()', () => {
    it('should accept type with GraphQLInputObjectType', () => {
      const ic = typeMapper.convertInputFieldConfig({
        type: GraphQLString
      });
      expect(ic.type).toBeInstanceOf(ScalarTypeComposer);
      expect(ic.type.getType()).toBe(GraphQLString);
      const objectType = new GraphQLInputObjectType({
        name: 'SomeTypeInput',
        fields: {
          f: {
            type: GraphQLString
          }
        }
      });
      const ic2 = typeMapper.convertInputFieldConfig({
        type: objectType
      });
      expect(ic2.type).toBeInstanceOf(InputTypeComposer);
      expect(ic2.type.getType()).toBe(objectType);
    });
    it('should accept GraphQLScalarType', () => {
      const ic = typeMapper.convertInputFieldConfig(GraphQLString);
      expect(ic.type.getType()).toBe(GraphQLString);
    });
    it('should accept GraphQLInputObjectType', () => {
      const type = new GraphQLInputObjectType({
        name: 'InputType',
        fields: () => ({
          f1: {
            type: GraphQLInt
          }
        })
      });
      const ic = typeMapper.convertInputFieldConfig(type);
      expect(ic.type).toBeInstanceOf(InputTypeComposer);
      expect(ic.type.getType()).toBe(type);
    });
    it('should accept GraphQLNonNull', () => {
      const ic = typeMapper.convertInputFieldConfig(new GraphQLNonNull(GraphQLString));
      expect(ic.type).toBeInstanceOf(NonNullComposer);
      expect(ic.type.getType().ofType).toBe(GraphQLString);
    });
    it('should accept GraphQLList', () => {
      const ic = typeMapper.convertInputFieldConfig(new GraphQLList(GraphQLString));
      expect(ic.type).toBeInstanceOf(ListComposer);
      expect(ic.type.getType().ofType).toBe(GraphQLString);
    });
    it('should accept type as string to Scalar', () => {
      const ic = typeMapper.convertInputFieldConfig({
        type: 'String'
      });
      expect(ic.type.getType()).toBe(GraphQLString);
    });
    it('should accept type as string to Enum', () => {
      EnumTypeComposer.create('enum Foo { A B }', sc);
      const ic = typeMapper.convertInputFieldConfig({
        type: 'Foo'
      });
      expect(ic.type).toBe(sc.get('Foo'));
    });
    it('should accept type as string to Input Object', () => {
      InputTypeComposer.create('input Foo { id: Sting }', sc);
      const ic = typeMapper.convertInputFieldConfig({
        type: 'Foo'
      });
      expect(ic.type).toBe(sc.get('Foo'));
    });
    it('should create field config from type name as string', () => {
      const ic = typeMapper.convertInputFieldConfig('String');
      expect(ic.type).toBeInstanceOf(ScalarTypeComposer);
      expect(ic.type.getType()).toBe(GraphQLString);
    });
    it('should lookup type name as string in schemaComposer', () => {
      const itc = InputTypeComposer.create(`input MyInput { a: Int }`, sc);
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
      expect(itc.getFieldType('a')).toBe(GraphQLString);
      expect(itc.getFieldType('b')).toBe(GraphQLInt);
    });
    it('should create field with Scalar type from GraphQL Schema Language', () => {
      const fc = typeMapper.convertInputFieldConfig('scalar MyInput');
      expect(fc.type).toBeInstanceOf(ScalarTypeComposer);
      expect(fc.type.getTypeName()).toBe('MyInput');
    });
    it('should create field with Enum type from GraphQL Schema Language', () => {
      const fc = typeMapper.convertInputFieldConfig('enum MyInputEnum { AND OR }');
      expect(fc.type).toBeInstanceOf(EnumTypeComposer);
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
      const itc = InputTypeComposer.create('input PriceRangeInput { lon: Float, lat: Float }', sc);
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
      const stc = sc.createScalarTC('scalar MySca');
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
      const etc = sc.createEnumTC('enum MyEnum { V1 V2 }');
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
      const tc = sc.createObjectTC('type LonLat { lon: Float, lat: Float }');
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
      expect(tc.type).toBeInstanceOf(ThunkComposer);
      expect(tc.type._thunk()).toBeInstanceOf(ScalarTypeComposer);
      expect(tc.type._thunk().getType()).toBe(GraphQLInt);
    });
    it('should accept array with one element as type and wrap them with GraphQLList', () => {
      const fc = typeMapper.convertInputFieldConfig(['String']);
      expect(fc.type).toBeInstanceOf(ListComposer);
      expect(fc.type.getType().ofType).toBe(GraphQLString);
      const fc2 = typeMapper.convertInputFieldConfig({
        type: ['String']
      });
      expect(fc2.type).toBeInstanceOf(ListComposer);
      expect(fc2.type.getType().ofType).toBe(GraphQLString);
      const fc3 = typeMapper.convertInputFieldConfig({
        type: [GraphQLString]
      });
      expect(fc3.type).toBeInstanceOf(ListComposer);
      expect(fc3.type.getType().ofType).toBe(GraphQLString);
      const itc = InputTypeComposer.create('input PriceRangeInput { lon: Float, lat: Float }', sc);
      const fc4 = typeMapper.convertInputFieldConfig([itc]);
      expect(fc4.type).toBeInstanceOf(ListComposer);
      expect(fc4.type.getType().ofType).toBe(itc.getType());
      const fc5 = typeMapper.convertInputFieldConfig({
        type: [itc]
      });
      expect(fc5.type).toBeInstanceOf(ListComposer);
      expect(fc5.type.getType().ofType).toBe(itc.getType());
      const fc6 = typeMapper.convertInputFieldConfig([['String']]);
      expect(fc6.type).toBeInstanceOf(ListComposer);
      expect(fc6.type.ofType).toBeInstanceOf(ListComposer);
      expect(fc6.type.ofType.ofType).toBeInstanceOf(ScalarTypeComposer);
      expect(fc6.type.getType().ofType.ofType).toBe(GraphQLString);
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
      expect(icm.i1.type.getType()).toBe(GraphQLString);
      expect(icm.i2.type.getType()).toBe(GraphQLInt);
    });
  });
  describe('convertArgConfig()', () => {
    it('should accept type with GraphQLInputObjectType', () => {
      const ac = typeMapper.convertArgConfig({
        type: GraphQLString
      });
      expect(ac.type).toBeInstanceOf(ScalarTypeComposer);
      expect(ac.type.getType()).toBe(GraphQLString);
      const objectType = new GraphQLInputObjectType({
        name: 'SomeTypeInput',
        fields: {
          f: {
            type: GraphQLString
          }
        }
      });
      const ac2 = typeMapper.convertArgConfig({
        type: objectType
      });
      expect(ac2.type.getType()).toBe(objectType);
    });
    it('should accept GraphQLScalarType', () => {
      const ac = typeMapper.convertArgConfig(GraphQLString);
      expect(ac.type).toBeInstanceOf(ScalarTypeComposer);
      expect(ac.type.getType()).toBe(GraphQLString);
    });
    it('should accept GraphQLInputObjectType', () => {
      const type = new GraphQLInputObjectType({
        name: 'InputType',
        fields: () => ({
          f: {
            type: GraphQLInt
          }
        })
      });
      const ac = typeMapper.convertArgConfig(type);
      expect(ac.type).toBeInstanceOf(InputTypeComposer);
      expect(ac.type.getType()).toBe(type);
    });
    it('should accept GraphQLNonNull', () => {
      const ac = typeMapper.convertArgConfig(new GraphQLNonNull(GraphQLString));
      expect(ac.type).toBeInstanceOf(NonNullComposer);
      expect(ac.type.getType().ofType).toBe(GraphQLString);
    });
    it('should accept GraphQLList', () => {
      const ac = typeMapper.convertArgConfig(new GraphQLList(GraphQLString));
      expect(ac.type).toBeInstanceOf(ListComposer);
      expect(ac.type.getType().ofType).toBe(GraphQLString);
    });
    it('should accept type as string to Scalar', () => {
      const ac = typeMapper.convertArgConfig({
        type: 'String'
      });
      expect(ac.type.getType()).toBe(GraphQLString);
    });
    it('should accept type as string to Enum', () => {
      EnumTypeComposer.create('enum Foo { A B }', sc);
      const ac = typeMapper.convertArgConfig({
        type: 'Foo'
      });
      expect(ac.type).toBe(sc.get('Foo'));
    });
    it('should accept type as string to Input Object', () => {
      InputTypeComposer.create('input Foo { id: String }', sc);
      const ac = typeMapper.convertArgConfig({
        type: 'Foo'
      });
      expect(ac.type).toBe(sc.get('Foo'));
    });
    it('should create arg config from GraphQL Schema Language', () => {
      const ac = typeMapper.convertArgConfig('String');
      expect(ac.type.getType()).toBe(GraphQLString);
    });
    it('should lookup type name as string in schemaComposer', () => {
      const itc = InputTypeComposer.create(`input MyArg { a: Int }`, sc);
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
      expect(itc.getFieldType('a')).toBe(GraphQLString);
      expect(itc.getFieldType('b')).toBe(GraphQLInt);
    });
    it('should create arg config with Scalar type from GraphQL Schema Language', () => {
      const fc = typeMapper.convertArgConfig('scalar Abc');
      expect(fc.type).toBeInstanceOf(ScalarTypeComposer);
      expect(fc.type.getType()).toBeInstanceOf(GraphQLScalarType);
      expect(fc.type.getTypeName()).toBe('Abc');
    });
    it('should create arg config with Enum type from GraphQL Schema Language', () => {
      const fc = typeMapper.convertArgConfig('enum MyArgEnum { AND OR }');
      expect(fc.type).toBeInstanceOf(EnumTypeComposer);
      expect(fc.type.getType()).toBeInstanceOf(GraphQLEnumType);
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
      const itc = InputTypeComposer.create('input PriceRangeInput { lon: Float, lat: Float }', sc);
      itc.setDescription('Description');
      const ac = typeMapper.convertArgConfig({
        type: itc
      });
      expect(ac.type).toBeInstanceOf(InputTypeComposer);
      expect(ac.type).toBe(itc);
      expect(ac.type.getType()).toBe(itc.getType());
      expect(ac.description).toBe(undefined);
      const ac2 = typeMapper.convertArgConfig(itc);
      expect(ac2.type.getType()).toBe(itc.getType());
      expect(ac2.description).toBe(undefined);
    });
    it('should accept ScalarTypeComposer', () => {
      const stc = ScalarTypeComposer.create('scalar Aaa', sc);
      stc.setDescription('Description');
      const ac = typeMapper.convertArgConfig({
        type: stc
      });
      expect(ac.type).toBeInstanceOf(ScalarTypeComposer);
      expect(ac.type).toBe(stc);
      expect(ac.type.getType()).toBe(stc.getType());
      expect(ac.description).toBe(undefined);
      const ac2 = typeMapper.convertArgConfig(stc);
      expect(ac2.type.getType()).toBe(stc.getType());
      expect(ac2.description).toBe(undefined);
    });
    it('should accept EnumTypeComposer', () => {
      const etc = EnumTypeComposer.create('enum MyEnum { V1 V2 }', sc);
      etc.setDescription('Description');
      const ac = typeMapper.convertArgConfig({
        type: etc
      });
      expect(ac.type).toBeInstanceOf(EnumTypeComposer);
      expect(ac.type).toBe(etc);
      expect(ac.type.getType()).toBe(etc.getType());
      expect(ac.description).toBe(undefined);
      const ac2 = typeMapper.convertArgConfig(etc);
      expect(ac2.type).toBeInstanceOf(EnumTypeComposer);
      expect(ac2.type).toBe(etc);
      expect(ac2.type.getType()).toBe(etc.getType());
      expect(ac2.description).toBe(undefined);
    });
    it('should pass unchanged thunk', () => {
      const myTypeThunk = () => 'Int';

      const ac = typeMapper.convertArgConfig(myTypeThunk);
      expect(ac.type).toBeInstanceOf(ThunkComposer);
      expect(ac.type.getType()).toBe(GraphQLInt);
    });
    it('should accept array with one element as type and wrap them with GraphQLList', () => {
      const fc = typeMapper.convertArgConfig(['String']);
      expect(fc.type).toBeInstanceOf(ListComposer);
      expect(fc.type.getType()).toBeInstanceOf(GraphQLList);
      expect(fc.type.getType().ofType).toBe(GraphQLString);
      const fc2 = typeMapper.convertArgConfig({
        type: ['String']
      });
      expect(fc2.type).toBeInstanceOf(ListComposer);
      expect(fc2.type.getType()).toBeInstanceOf(GraphQLList);
      expect(fc2.type.getType().ofType).toBe(GraphQLString);
      const fc3 = typeMapper.convertArgConfig({
        type: [GraphQLString]
      });
      expect(fc3.type).toBeInstanceOf(ListComposer);
      expect(fc3.type.getType()).toBeInstanceOf(GraphQLList);
      expect(fc3.type.getType().ofType).toBe(GraphQLString);
      const itc = InputTypeComposer.create('input PriceRangeInput { lon: Float, lat: Float }', sc);
      const fc4 = typeMapper.convertArgConfig([itc]);
      expect(fc4.type).toBeInstanceOf(ListComposer);
      expect(fc4.type.getType()).toBeInstanceOf(GraphQLList);
      expect(fc4.type.getType().ofType).toBe(itc.getType());
      const fc5 = typeMapper.convertArgConfig({
        type: [itc]
      });
      expect(fc5.type).toBeInstanceOf(ListComposer);
      expect(fc5.type.getType()).toBeInstanceOf(GraphQLList);
      expect(fc5.type.getType().ofType).toBe(itc.getType());
      const fc6 = typeMapper.convertArgConfig([['String']]);
      expect(fc6.type).toBeInstanceOf(ListComposer);
      expect(fc6.type.getType()).toBeInstanceOf(GraphQLList);
      expect(fc6.type.getType().ofType).toBeInstanceOf(GraphQLList);
      expect(fc6.type.getType().ofType.ofType).toBe(GraphQLString);
      expect(() => {
        typeMapper.convertArgConfig([]);
      }).toThrowError(/Array must have exact one input type definition/);
    });
    it('should throw error if provided ObjectTypeComposer', () => {
      const tc = ObjectTypeComposer.create('type LonLat { lon: Float, lat: Float }', sc);
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
      expect(acm.a1.type).toBeInstanceOf(ScalarTypeComposer);
      expect(acm.a1.type.getType()).toBe(GraphQLString);
      expect(acm.a2.type).toBeInstanceOf(ScalarTypeComposer);
      expect(acm.a2.type.getType()).toBe(GraphQLInt);
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
      expect(ts.get('User').getType()).toBeInstanceOf(GraphQLObjectType);
      expect(ts.get('Article').getType()).toBeInstanceOf(GraphQLObjectType);
      expect(ts.get('Record').getType()).toBeInstanceOf(GraphQLInputObjectType);
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
      expect(ts.get('MyScalar').getType()).toBeInstanceOf(GraphQLScalarType);
    });
    it('parseTypesFromString() should accept `union` definition', () => {
      const ts = typeMapper.parseTypesFromString(`
        union TypeAB = TypeA | TypeB
        type TypeA { f1: Int }
        type TypeB { f2: Int }
      `);
      const TypeAB = ts.get('TypeAB');
      expect(TypeAB).toBeInstanceOf(UnionTypeComposer);
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

    if (graphqlVersion >= 15.1) {
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
      expect(t1.getFieldType('a')).toBe(GraphQLInt);
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
      expect(tc).toBeInstanceOf(ObjectTypeComposer);
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
      expect(tc).toBeInstanceOf(InterfaceTypeComposer);
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
      expect(tc).toBeInstanceOf(InputTypeComposer);
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