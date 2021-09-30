import { printSchema, buildSchema } from 'graphql';
import { SchemaComposer, BUILT_IN_DIRECTIVES } from '../SchemaComposer';
import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { InputTypeComposer } from '../InputTypeComposer';
import { ScalarTypeComposer } from '../ScalarTypeComposer';
import { EnumTypeComposer } from '../EnumTypeComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { UnionTypeComposer } from '../UnionTypeComposer';
import { graphql, GraphQLString, GraphQLObjectType, GraphQLInputObjectType, GraphQLInterfaceType, GraphQLEnumType, GraphQLUnionType, GraphQLDirective, DirectiveLocation, GraphQLScalarType, GraphQLNonNull, GraphQLList, GraphQLSchema } from '../graphql';
import { dedent } from '../utils/dedent';
import { graphqlVersion } from '../utils/graphqlVersion';
describe('SchemaComposer', () => {
  it('should implements `add` method', () => {
    const sc = new SchemaComposer();
    const SomeTC = sc.createObjectTC({
      name: 'validType'
    });
    sc.add(SomeTC);
    expect(sc.get('validType')).toBe(SomeTC);
  });
  it('should implements `get` method', () => {
    const sc = new SchemaComposer();
    const SomeTC = sc.createObjectTC({
      name: 'validType'
    });
    sc.add(SomeTC);
    expect(sc.get('validType')).toBe(SomeTC);
  });
  it('should implements `has` method`', () => {
    const sc = new SchemaComposer();
    const SomeTC = sc.createObjectTC({
      name: 'validType'
    });
    sc.add(SomeTC);
    expect(sc.has('validType')).toBe(true);
    expect(sc.has('unexistedType')).toBe(false);
  });
  describe('constructor', () => {
    describe('if GraphQLSchema provided', () => {
      const gqUser = new GraphQLObjectType({
        name: 'User',
        fields: () => ({
          name: {
            type: GraphQLString
          },
          bestFriend: {
            type: gqUser
          }
        })
      });
      const gqPost = new GraphQLObjectType({
        name: 'Post',
        fields: () => ({
          title: {
            type: GraphQLString
          },
          author: {
            type: gqUser
          }
        })
      });
      const gqSchema = new GraphQLSchema({
        query: new GraphQLObjectType({
          name: 'OoopsQuery',
          fields: () => ({
            post: {
              type: new GraphQLList(gqPost)
            },
            user: {
              type: gqUser
            }
          })
        })
      });
      it('should import types from provided schema', () => {
        const sc = new SchemaComposer(gqSchema);
        expect(sc.has(gqUser)).toBeTruthy();
        expect(sc.has('User')).toBeTruthy();
        expect(sc.has(gqPost)).toBeTruthy();
        expect(sc.has('Post')).toBeTruthy();
      });
      it('should merge unstandart root types', () => {
        const sc = new SchemaComposer(gqSchema);
        expect(sc.Query.getFieldNames()).toEqual(['post', 'user']);
        expect(sc.has('OoopsQuery')).toBeTruthy();
        expect(sc.Query).toBe(sc.get('OoopsQuery'));
      });
    });
    it('should accept SDL', () => {
      const sc = new SchemaComposer(`
        type Query {
          field: Int
        }
      `);
      expect(sc.Query.getFieldTypeName('field')).toBe('Int');
    });
  });
  describe('schema description property', () => {
    it('should get description', () => {
      if (graphqlVersion >= 15) {
        const sc = new SchemaComposer( // $FlowFixMe `description` was added only in graphql@15.0.0
        new GraphQLSchema({
          description: 'My schema'
        }));
        expect(sc.getDescription()).toBe('My schema');
      }
    });
    it('should set description', () => {
      if (graphqlVersion >= 15) {
        const sc = new SchemaComposer();
        sc.setDescription('ABC');
        const schema = sc.buildSchema(); // $FlowFixMe `description` was added only in graphql@15.0.0

        expect(schema.description).toBe('ABC');
      }
    });
    it('should import description from SDL', () => {
      if (graphqlVersion >= 15) {
        const sc = new SchemaComposer(`
          """Schema description"""
          schema {
            query: Query
          }
          type Query
        `);
        expect(sc.getDescription()).toBe('Schema description');
      }
    });
    it('should not print empty description', () => {
      if (graphqlVersion >= 15) {
        const sc = new SchemaComposer(`
          type Query {
            a: Int
          }
        `);
        sc.setDescription('Description');
        expect(printSchema(sc.buildSchema())).toBe(dedent`
          """Description"""
          schema {
            query: Query
          }

          type Query {
            a: Int
          }\n
        `);
        sc.setDescription('');
        expect(printSchema(sc.buildSchema())).toBe(dedent`
          type Query {
            a: Int
          }\n
        `);
      }
    });
  });
  describe('getOrCreateOTC()', () => {
    it('should create TC if not exists', () => {
      const sc = new SchemaComposer();
      const UserTC = sc.getOrCreateOTC('User');
      expect(UserTC).toBeInstanceOf(ObjectTypeComposer);
      expect(sc.has('User')).toBeTruthy();
      expect(sc.hasInstance('User', ObjectTypeComposer)).toBeTruthy();
      expect(sc.getOTC('User')).toBe(UserTC);
    });
    it('should create TC if not exists with onCreate', () => {
      const sc = new SchemaComposer();
      const UserTC = sc.getOrCreateOTC('User', tc => {
        tc.setDescription('User model');
      });
      expect(UserTC.getDescription()).toBe('User model');
    });
    it('should return already created TC without onCreate', () => {
      const sc = new SchemaComposer();
      const UserTC = sc.getOrCreateOTC('User', tc => {
        tc.setDescription('User model');
      });
      const UserTC2 = sc.getOrCreateOTC('User', tc => {
        tc.setDescription('updated description');
      });
      expect(UserTC).toBe(UserTC2);
      expect(UserTC.getDescription()).toBe('User model');
    });
  });
  describe('getOrCreateITC()', () => {
    it('should create ITC if not exists', () => {
      const sc = new SchemaComposer();
      const UserITC = sc.getOrCreateITC('UserInput');
      expect(UserITC).toBeInstanceOf(InputTypeComposer);
      expect(sc.has('UserInput')).toBeTruthy();
      expect(sc.hasInstance('UserInput', InputTypeComposer)).toBeTruthy();
      expect(sc.getITC('UserInput')).toBe(UserITC);
    });
    it('should create ITC if not exists with onCreate', () => {
      const sc = new SchemaComposer();
      const UserITC = sc.getOrCreateITC('UserInput', tc => {
        tc.setDescription('User input');
      });
      expect(UserITC.getDescription()).toBe('User input');
    });
    it('should return already created ITC without onCreate', () => {
      const sc = new SchemaComposer();
      const UserITC = sc.getOrCreateITC('UserInput', tc => {
        tc.setDescription('User input');
      });
      const UserITC2 = sc.getOrCreateITC('UserInput', tc => {
        tc.setDescription('updated description');
      });
      expect(UserITC).toBe(UserITC2);
      expect(UserITC.getDescription()).toBe('User input');
    });
  });
  describe('getOrCreateSTC()', () => {
    it('should create STC if not exists', () => {
      const sc = new SchemaComposer();
      const UIntSTC = sc.getOrCreateSTC('UInt');
      expect(UIntSTC).toBeInstanceOf(ScalarTypeComposer);
      expect(sc.has('UInt')).toBeTruthy();
      expect(sc.hasInstance('UInt', ScalarTypeComposer)).toBeTruthy();
      expect(sc.getSTC('UInt')).toBe(UIntSTC);
    });
    it('should create UTC if not exists with onCreate', () => {
      const sc = new SchemaComposer();
      const UIntTC = sc.getOrCreateSTC('Uint', tc => {
        tc.setDescription('Unsigned int');
      });
      expect(UIntTC.getDescription()).toBe('Unsigned int');
    });
    it('should return already created STC without onCreate', () => {
      const sc = new SchemaComposer();
      const UIntTC = sc.getOrCreateSTC('UInt', tc => {
        tc.setDescription('Positive int');
      });
      const UIntTC2 = sc.getOrCreateSTC('UInt', tc => {
        tc.setDescription('updated description');
      });
      expect(UIntTC).toBe(UIntTC2);
      expect(UIntTC.getDescription()).toBe('Positive int');
    });
  });
  describe('getOrCreateETC()', () => {
    it('should create ETC if not exists', () => {
      const sc = new SchemaComposer();
      const UserETC = sc.getOrCreateETC('UserEnum');
      expect(UserETC).toBeInstanceOf(EnumTypeComposer);
      expect(sc.has('UserEnum')).toBeTruthy();
      expect(sc.hasInstance('UserEnum', EnumTypeComposer)).toBeTruthy();
      expect(sc.getETC('UserEnum')).toBe(UserETC);
    });
    it('should create ETC if not exists with onCreate', () => {
      const sc = new SchemaComposer();
      const UserETC = sc.getOrCreateETC('UserEnum', tc => {
        tc.setDescription('User enum');
      });
      expect(UserETC.getDescription()).toBe('User enum');
    });
    it('should return already created ETC without onCreate', () => {
      const sc = new SchemaComposer();
      const UserETC = sc.getOrCreateETC('UserEnum', tc => {
        tc.setDescription('User enum');
      });
      const UserETC2 = sc.getOrCreateETC('UserEnum', tc => {
        tc.setDescription('updated description');
      });
      expect(UserETC).toBe(UserETC2);
      expect(UserETC.getDescription()).toBe('User enum');
    });
  });
  describe('getOrCreateIFTC()', () => {
    it('should create IFTC if not exists', () => {
      const sc = new SchemaComposer();
      const UserIFTC = sc.getOrCreateIFTC('UserInterface');
      expect(UserIFTC).toBeInstanceOf(InterfaceTypeComposer);
      expect(sc.has('UserInterface')).toBeTruthy();
      expect(sc.hasInstance('UserInterface', InterfaceTypeComposer)).toBeTruthy();
      expect(sc.getIFTC('UserInterface')).toBe(UserIFTC);
    });
    it('should create IFTC if not exists with onCreate', () => {
      const sc = new SchemaComposer();
      const UserIFTC = sc.getOrCreateIFTC('UserInterface', tc => {
        tc.setDescription('User interface');
      });
      expect(UserIFTC.getDescription()).toBe('User interface');
    });
    it('should return already created IFTC without onCreate', () => {
      const sc = new SchemaComposer();
      const UserIFTC = sc.getOrCreateIFTC('UserInterface', tc => {
        tc.setDescription('User interface');
      });
      const UserIFTC2 = sc.getOrCreateIFTC('UserInterface', tc => {
        tc.setDescription('updated description');
      });
      expect(UserIFTC).toBe(UserIFTC2);
      expect(UserIFTC.getDescription()).toBe('User interface');
    });
  });
  describe('buildSchema()', () => {
    it('should accept additional types', () => {
      const sc = new SchemaComposer();
      sc.Query.addFields({
        time: 'Int'
      });
      const me1 = sc.createObjectTC('type Me1 { a: Int }').getType();
      const me2 = sc.createObjectTC('type Me2 { a: Int }').getType();
      const schema = sc.buildSchema({
        types: [me1, me1, me2]
      });
      expect(schema._typeMap.Me1).toEqual(me1);
      expect(schema._typeMap.Me2).toEqual(me2);
    });
    it('should provide proper Schema when provided only Query', async () => {
      const sc = new SchemaComposer();
      sc.Query.addFields({
        num: 'Int'
      });
      const schema = sc.buildSchema();
      expect(await graphql({
        schema,
        source: `
            query {
              num
            }
          `
      })).toEqual({
        data: {
          num: null
        }
      });
    });
    it('should keep unused types', () => {
      const schema = buildSchema(`type Test {
        prop1: String
      }
      interface UnusedInterface {
        id: ID!
      }
      enum UnusedEnum {
        VALUE_ONE
      }
      scalar TestUnusedScalar
      directive @unusedDirective on FIELD_DEFINITION
      input UnusedInput {
        name: String
      }
      type Query {
        me: String
      }`);
      const sc = new SchemaComposer(schema);
      sc.addTypeDefs(`type SecondTestType {
        prop1: String
      }`);
      sc.createObjectTC({
        name: 'TestType3',
        fields: {
          prop1: {
            name: 'prop1',
            type: GraphQLString
          }
        }
      });
      const builtSchema = sc.buildSchema({
        keepUnusedTypes: true
      });
      expect(builtSchema.getType('Test')).toBeInstanceOf(GraphQLObjectType);
      expect(builtSchema.getType('SecondTestType')).toBeInstanceOf(GraphQLObjectType);
      expect(builtSchema.getType('TestType3')).toBeInstanceOf(GraphQLObjectType);
      expect(builtSchema.getType('TestUnusedScalar')).toBeInstanceOf(GraphQLScalarType);
      expect(builtSchema.getType('UnusedInterface')).toBeInstanceOf(GraphQLInterfaceType);
      expect(builtSchema.getType('UnusedEnum')).toBeInstanceOf(GraphQLEnumType);
      expect(builtSchema.getType('UnusedInput')).toBeInstanceOf(GraphQLInputObjectType);
    });
  });
  describe('removeEmptyTypes()', () => {
    it('should remove fields with Types which have no fields', () => {
      const sc = new SchemaComposer();
      const TypeWithoutFieldsTC = sc.getOrCreateOTC('Stub');
      TypeWithoutFieldsTC.setFields({});
      const ViewerTC = sc.getOrCreateOTC('Viewer');
      ViewerTC.setFields({
        name: 'String',
        stub: TypeWithoutFieldsTC
      });
      /* eslint-disable */

      const oldConsoleLog = console.log;
      global.console.log = jest.fn();
      sc.removeEmptyTypes(ViewerTC);
      expect(console.log).lastCalledWith("graphql-compose: Delete field 'Viewer.stub' with type 'Stub', cause it does not have fields.");
      global.console.log = oldConsoleLog;
      /* eslint-enable */

      expect(ViewerTC.hasField('stub')).toBe(false);
    });
    it('should not produce Maximum call stack size exceeded', () => {
      const sc = new SchemaComposer();
      const UserTC = sc.getOrCreateOTC('User');
      UserTC.setField('friend', UserTC);
      sc.removeEmptyTypes(UserTC);
    });
    it('should remove empty ROOT types: Mutation, Subscription', () => {
      const sc = new SchemaComposer(` 
        type Query {
          a: Int
        }
        type Mutation
        type Subscription
      `);
      const schema = sc.buildSchema();
      expect(schema._queryType).toBeDefined();
      expect(schema._mutationType).toBeUndefined();
      expect(schema._subscriptionType).toBeUndefined();
    });
    it('should keep empty ROOT type: Query', () => {
      const sc = new SchemaComposer(` 
        type Query
        type Mutation {
          a: Int
        }
        type Subscription
      `);
      const schema = sc.buildSchema();
      expect(schema._queryType).toBeDefined();
      expect(schema._mutationType).toBeDefined();
      expect(schema._subscriptionType).toBeUndefined();
    });
  });
  describe('root type getters', () => {
    it('Query', () => {
      const sc = new SchemaComposer();
      expect(sc.Query).toBe(sc.Query);
      expect(sc.Query.getTypeName()).toBe('Query');
    });
    it('Mutation', () => {
      const sc = new SchemaComposer();
      expect(sc.Mutation).toBe(sc.Mutation);
      expect(sc.Mutation.getTypeName()).toBe('Mutation');
    });
    it('Subscription', () => {
      const sc = new SchemaComposer();
      expect(sc.Subscription).toBe(sc.Subscription);
      expect(sc.Subscription.getTypeName()).toBe('Subscription');
    });
  });
  describe('SchemaMustHaveType', () => {
    const sc = new SchemaComposer();
    const tc = sc.createObjectTC(`type Me { name: String }`);
    sc.addSchemaMustHaveType(tc);
    expect(sc._schemaMustHaveTypes).toContain(tc);
    sc.clear();
    expect(sc._schemaMustHaveTypes).not.toContain(tc);
    sc.addSchemaMustHaveType(tc);
    sc.Query.addFields({
      time: 'String'
    });
    const schema = sc.buildSchema();
    expect(schema._typeMap.Me).toEqual(tc.getType());
  });
  describe('getOTC', () => {
    it('should return ObjectTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.createObjectTC(`
          type Author {
            name: String
          }
        `);
      expect(sc.getOTC('Author')).toBeInstanceOf(ObjectTypeComposer);
    });
    it('should return GraphQLObjectType as ObjectTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.add(new GraphQLObjectType({
        name: 'Author',
        fields: {
          name: {
            type: GraphQLString
          }
        }
      }));
      expect(sc.getOTC('Author')).toBeInstanceOf(ObjectTypeComposer);
    });
    it('should throw error for incorrect type', () => {
      const sc = new SchemaComposer();
      sc.createInputTC(`
        input Author {
          name: String
        }
      `);
      expect(() => sc.getOTC('Author')).toThrowError('Cannot find ObjectTypeComposer with name Author');
    });
  });
  describe('getITC', () => {
    it('should return InputTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.createInputTC(`
          input Author {
            name: String
          }
        `);
      expect(sc.getITC('Author')).toBeInstanceOf(InputTypeComposer);
    });
    it('should return GraphQLInputObjectType as InputTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.add(new GraphQLInputObjectType({
        name: 'Author',
        fields: {
          name: {
            type: GraphQLString
          }
        }
      }));
      expect(sc.getITC('Author')).toBeInstanceOf(InputTypeComposer);
    });
    it('should throw error for incorrect type', () => {
      const sc = new SchemaComposer();
      sc.createObjectTC(`
        type Author {
          name: String
        }
      `);
      expect(() => sc.getITC('Author')).toThrowError('Cannot find InputTypeComposer with name Author');
    });
  });
  describe('getSTC', () => {
    it('should return ScalarTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.createScalarTC(`scalar UInt`);
      expect(sc.getSTC('UInt')).toBeInstanceOf(ScalarTypeComposer);
    });
    it('should return GraphQLScalarType as ScalarTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.add(new GraphQLScalarType({
        name: 'SomeInt',
        serialize: () => {}
      }));
      expect(sc.getSTC('SomeInt')).toBeInstanceOf(ScalarTypeComposer);
    });
    it('should throw error for incorrect type', () => {
      const sc = new SchemaComposer();
      sc.createObjectTC(`
        type Sort {
          name: String
        }
      `);
      expect(() => sc.getSTC('Sort')).toThrowError('Cannot find ScalarTypeComposer with name Sort');
    });
  });
  describe('getETC', () => {
    it('should return EnumTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.createEnumTC(`
          enum Sort {
            ASC DESC
          }
        `);
      expect(sc.getETC('Sort')).toBeInstanceOf(EnumTypeComposer);
    });
    it('should return GraphQLEnumType as EnumTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.add(new GraphQLEnumType({
        name: 'Sort',
        values: {
          ASC: {
            value: 'ASC'
          }
        }
      }));
      expect(sc.getETC('Sort')).toBeInstanceOf(EnumTypeComposer);
    });
    it('should throw error for incorrect type', () => {
      const sc = new SchemaComposer();
      sc.createObjectTC(`
        type Sort {
          name: String
        }
      `);
      expect(() => sc.getETC('Sort')).toThrowError('Cannot find EnumTypeComposer with name Sort');
    });
  });
  describe('getIFTC', () => {
    it('should return InterfaceTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.createInterfaceTC(`
          interface IFace {
            name: String
          }
        `);
      expect(sc.getIFTC('IFace')).toBeInstanceOf(InterfaceTypeComposer);
    });
    it('should return GraphQLInterfaceType as InterfaceTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.add(new GraphQLInterfaceType({
        name: 'IFace',
        fields: {
          name: {
            type: GraphQLString
          }
        }
      }));
      expect(sc.getIFTC('IFace')).toBeInstanceOf(InterfaceTypeComposer);
    });
    it('should throw error for incorrect type', () => {
      const sc = new SchemaComposer();
      sc.createObjectTC(`
        type IFace {
          name: String
        }
      `);
      expect(() => sc.getIFTC('IFace')).toThrowError('Cannot find InterfaceTypeComposer with name IFace');
    });
  });
  describe('getAnyTC()', () => {
    it('should return ObjectTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.createObjectTC(`type Object1 { name: String }`);
      expect(sc.getAnyTC('Object1')).toBeInstanceOf(ObjectTypeComposer);
      sc.add(new GraphQLObjectType({
        name: 'Object2',
        fields: () => ({})
      }));
      expect(sc.getAnyTC('Object2')).toBeInstanceOf(ObjectTypeComposer);
    });
    it('should return InputTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.createInputTC(`input Input1 { name: String }`);
      expect(sc.getAnyTC('Input1')).toBeInstanceOf(InputTypeComposer);
      sc.add(new GraphQLInputObjectType({
        name: 'Input2',
        fields: () => ({})
      }));
      expect(sc.getAnyTC('Input2')).toBeInstanceOf(InputTypeComposer);
    });
    it('should return ScalarTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.createScalarTC(`scalar Scalar1`);
      expect(sc.getAnyTC('Scalar1')).toBeInstanceOf(ScalarTypeComposer);
      sc.add(new GraphQLScalarType({
        name: 'Scalar2',
        serialize: () => {}
      }));
      expect(sc.getAnyTC('Scalar2')).toBeInstanceOf(ScalarTypeComposer);
    });
    it('should return EnumTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.createEnumTC(`enum Enum1 { A B }`);
      expect(sc.getAnyTC('Enum1')).toBeInstanceOf(EnumTypeComposer);
      sc.add(new GraphQLEnumType({
        name: 'Enum2',
        values: {}
      }));
      expect(sc.getAnyTC('Enum2')).toBeInstanceOf(EnumTypeComposer);
    });
    it('should return InterfaceTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.createInterfaceTC(`interface Iface1 { f1: Int }`);
      expect(sc.getAnyTC('Iface1')).toBeInstanceOf(InterfaceTypeComposer);
      sc.add(new GraphQLInterfaceType({
        name: 'Iface2',
        fields: () => ({})
      }));
      expect(sc.getAnyTC('Iface2')).toBeInstanceOf(InterfaceTypeComposer);
    });
    it('should return UnionTypeComposer', () => {
      const sc = new SchemaComposer();
      const a = sc.createObjectTC(`type A { f: Int }`);
      sc.createUnionTC(`union Union1 = A`);
      expect(sc.getAnyTC('Union1')).toBeInstanceOf(UnionTypeComposer);
      sc.add(new GraphQLUnionType({
        name: 'Union2',
        types: [a.getType()]
      }));
      expect(sc.getAnyTC('Union2')).toBeInstanceOf(UnionTypeComposer);
    });
    it('should unwrap graphql List and NonNull', () => {
      const sc = new SchemaComposer();
      const tc = sc.getAnyTC(new GraphQLNonNull(new GraphQLList(GraphQLString)));
      expect(tc).toBeInstanceOf(ScalarTypeComposer);
    });
  });
  describe('add()', () => {
    it('should add ObjectTypeComposer', () => {
      const sc = new SchemaComposer();
      const tc = ObjectTypeComposer.createTemp('User');
      const typeName = sc.add(tc);
      expect(typeName).toBe('User');
      expect(sc.get('User')).toBe(tc);
      expect(sc.getOTC('User')).toBe(tc);
      sc.add(`type Object { a: Int }`);
      expect(sc.get('Object')).toBeInstanceOf(ObjectTypeComposer);
    });
    it('should add InputTypeComposer', () => {
      const sc = new SchemaComposer();
      const itc = InputTypeComposer.createTemp('UserInput');
      const typeName = sc.add(itc);
      expect(typeName).toBe('UserInput');
      expect(sc.get('UserInput')).toBe(itc);
      expect(sc.getITC('UserInput')).toBe(itc);
      sc.add(`input Object { a: Int }`);
      expect(sc.get('Object')).toBeInstanceOf(InputTypeComposer);
    });
    it('should add ScalarTypeComposer', () => {
      const sc = new SchemaComposer();
      const stc = ScalarTypeComposer.createTemp('UserScalar');
      const typeName = sc.add(stc);
      expect(typeName).toBe('UserScalar');
      expect(sc.get('UserScalar')).toBe(stc);
      expect(sc.getSTC('UserScalar')).toBe(stc);
      sc.add(`scalar Object`);
      expect(sc.get('Object')).toBeInstanceOf(ScalarTypeComposer);
    });
    it('should add EnumTypeComposer', () => {
      const sc = new SchemaComposer();
      const etc = EnumTypeComposer.createTemp('UserEnum');
      const typeName = sc.add(etc);
      expect(typeName).toBe('UserEnum');
      expect(sc.get('UserEnum')).toBe(etc);
      expect(sc.getETC('UserEnum')).toBe(etc);
      sc.add(`enum Object { A }`);
      expect(sc.get('Object')).toBeInstanceOf(EnumTypeComposer);
    });
    it('should add GraphQLObjectType', () => {
      const sc = new SchemaComposer();
      const t = new GraphQLObjectType({
        name: 'NativeType',
        fields: () => ({})
      });
      const typeName = sc.add(t);
      expect(typeName).toBe('NativeType');
      expect(sc.get('NativeType').getType()).toBe(t);
    });
    it('should add InterfaceTypeComposer', () => {
      const sc = new SchemaComposer();
      const iftc = InterfaceTypeComposer.createTemp('UserInterface');
      const typeName = sc.add(iftc);
      expect(typeName).toBe('UserInterface');
      expect(sc.get('UserInterface')).toBe(iftc);
      expect(sc.getIFTC('UserInterface')).toBe(iftc);
      sc.add(`interface Object { a: Int }`);
      expect(sc.get('Object')).toBeInstanceOf(InterfaceTypeComposer);
    });
    it('should add UnionTypeComposer', () => {
      const sc = new SchemaComposer();
      const utc = UnionTypeComposer.createTemp('UserUnion');
      const typeName = sc.add(utc);
      expect(typeName).toBe('UserUnion');
      expect(sc.get('UserUnion')).toBe(utc);
      expect(sc.getUTC('UserUnion')).toBe(utc);
      sc.add(`type A { f: Int }`);
      sc.add(`union Object = A`);
      expect(sc.get('Object')).toBeInstanceOf(UnionTypeComposer);
    });
  });
  describe('add()', () => {
    it('should add ObjectTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.add(`type Object1 { name: String }`);
      sc.add(ObjectTypeComposer.createTemp(`type Object2 { name: String }`));
      sc.add(new GraphQLObjectType({
        name: 'Object3',
        fields: () => ({})
      }));
      expect(sc.get('Object1')).toBeInstanceOf(ObjectTypeComposer);
      expect(sc.get('Object2')).toBeInstanceOf(ObjectTypeComposer);
      expect(sc.get('Object3')).toBeInstanceOf(ObjectTypeComposer);
    });
    it('should return InputTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.add(`input Object1 { name: String }`);
      sc.add(InputTypeComposer.createTemp(`input Object2 { name: String }`));
      sc.add(new GraphQLInputObjectType({
        name: 'Object3',
        fields: () => ({})
      }));
      expect(sc.get('Object1')).toBeInstanceOf(InputTypeComposer);
      expect(sc.get('Object2')).toBeInstanceOf(InputTypeComposer);
      expect(sc.get('Object3')).toBeInstanceOf(InputTypeComposer);
    });
    it('should return ScalarTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.add(`scalar Object1`);
      sc.add(ScalarTypeComposer.createTemp(`scalar Object2`));
      sc.add(new GraphQLScalarType({
        name: 'Object3',
        serialize: () => ({})
      }));
      expect(sc.get('Object1')).toBeInstanceOf(ScalarTypeComposer);
      expect(sc.get('Object2')).toBeInstanceOf(ScalarTypeComposer);
      expect(sc.get('Object3')).toBeInstanceOf(ScalarTypeComposer);
    });
    it('should return EnumTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.add(`enum Object1 { A B }`);
      sc.add(EnumTypeComposer.createTemp(`enum Object2 { A B }`));
      sc.add(new GraphQLEnumType({
        name: 'Object3',
        values: {}
      }));
      expect(sc.get('Object1')).toBeInstanceOf(EnumTypeComposer);
      expect(sc.get('Object2')).toBeInstanceOf(EnumTypeComposer);
      expect(sc.get('Object3')).toBeInstanceOf(EnumTypeComposer);
    });
    it('should return InterfaceTypeComposer', () => {
      const sc = new SchemaComposer();
      sc.add(`interface Object1 { a: Int }`);
      sc.add(InterfaceTypeComposer.createTemp(`interface Object2 { a: Int }`));
      sc.add(new GraphQLInterfaceType({
        name: 'Object3',
        fields: () => ({})
      }));
      expect(sc.get('Object1')).toBeInstanceOf(InterfaceTypeComposer);
      expect(sc.get('Object2')).toBeInstanceOf(InterfaceTypeComposer);
      expect(sc.get('Object3')).toBeInstanceOf(InterfaceTypeComposer);
    });
    it('should return UnionTypeComposer', () => {
      const sc = new SchemaComposer();
      const a = sc.createObjectTC(`type A { f: Int }`);
      sc.add(`union Object1 = A`);
      sc.add(UnionTypeComposer.createTemp(`union Object2 = A`));
      sc.add(new GraphQLUnionType({
        name: 'Object3',
        types: [a.getType()]
      }));
      expect(sc.get('Object1')).toBeInstanceOf(UnionTypeComposer);
      expect(sc.get('Object2')).toBeInstanceOf(UnionTypeComposer);
      expect(sc.get('Object3')).toBeInstanceOf(UnionTypeComposer);
    });
  });
  describe('addTypeDefs', () => {
    it('should parse types from SDL', () => {
      const sc = new SchemaComposer();
      sc.addTypeDefs(`
        type Author {
          name: String
          some(arg: Int): String
        }
        input AuthorInput {
          name: String
        }
        scalar MyInt
        enum Sort {
          ASC
          DESC
        }
        interface PersonI {
          name: String
        }
      `);
      expect(sc.get('Author')).toBeInstanceOf(ObjectTypeComposer);
      expect(sc.get('AuthorInput')).toBeInstanceOf(InputTypeComposer);
      expect(sc.get('MyInt')).toBeInstanceOf(ScalarTypeComposer);
      expect(sc.get('Sort')).toBeInstanceOf(EnumTypeComposer);
      expect(sc.get('PersonI')).toBeInstanceOf(InterfaceTypeComposer);
    });
    it('should parse cross referenced types from SDL', () => {
      const sc = new SchemaComposer();
      sc.addTypeDefs(`
        type Author {
          posts: [Post]
        }
        type Post {
          author: Author
        }
      `);
      expect(sc.get('Author')).toBeInstanceOf(ObjectTypeComposer);
      expect(sc.get('Post')).toBeInstanceOf(ObjectTypeComposer); // Post type should be the same instance

      const Post = sc.getOTC('Post').getType();
      const PostInAuthor = sc.getOTC('Author').getFieldTC('posts').getType();
      expect(Post).toBe(PostInAuthor); // Author type should be the same instance

      const Author = sc.getOTC('Author').getType();
      const AuthorInPost = sc.getOTC('Post').getFieldTC('author').getType();
      expect(Author).toBe(AuthorInPost);
    });
    it('should replace existed types', () => {
      // This behavior maybe changed in future.
      // Need to gather more use cases and problems.
      const sc = new SchemaComposer();
      sc.addTypeDefs(`
        type Author {
          name: String
          some(arg: Int): String
        }
      `);
      expect(sc.getOTC('Author').hasFieldArg('some', 'arg')).toBeTruthy();
      sc.addTypeDefs(`
        type Author {
          name: String
        }
      `);
      expect(sc.getOTC('Author').hasFieldArg('some', 'arg')).toBeFalsy();
    });
    it('should merge Root types', () => {
      const sc = new SchemaComposer();
      sc.Query.addFields({
        field1: 'Int'
      });
      sc.Mutation.addFields({
        field2: 'Int'
      });
      sc.Subscription.addFields({
        field3: 'Int'
      });
      sc.addTypeDefs(`
        type Query {
          field4: Int
        }
        type Mutation {
          field5: Int
        }
        type Subscription {
          field6: Int
        }
      `);
      expect(sc.Query.getFieldNames()).toEqual(['field1', 'field4']);
      expect(sc.Mutation.getFieldNames()).toEqual(['field2', 'field5']);
      expect(sc.Subscription.getFieldNames()).toEqual(['field3', 'field6']);
    });
  });
  describe('addResolveMethods', () => {
    it('should add resolve methods to fields in graphql-tools way', async () => {
      const sc = new SchemaComposer();
      sc.addTypeDefs(`
        schema {
          query: Query
        }

        type Post {
          id: Int!
          title: String
          votes: Int
        }

        type Query {
          posts: [Post]
        }
      `);
      sc.addResolveMethods({
        Query: {
          posts: () => [{
            id: 1,
            title: 'Post title'
          }]
        },
        Post: {
          votes: () => 10
        }
      });
      const schema = sc.buildSchema();
      expect(await graphql(schema, '{ posts { id title votes } }')).toEqual({
        data: {
          posts: [{
            id: 1,
            title: 'Post title',
            votes: 10
          }]
        }
      });
    });
    it('should add scalar types', () => {
      const sc = new SchemaComposer();
      sc.addTypeDefs(`
        scalar Date
      `);
      sc.addResolveMethods({
        Date: new GraphQLScalarType({
          name: 'Date',

          serialize(value) {
            return new Date(value).toISOString().slice(0, 10);
          }

        })
      });
      expect(sc.get('Date')).toBeInstanceOf(ScalarTypeComposer);
      expect(Array.from(sc.types.keys())).toContain('Date');
    });
    it('should add scalar types as configs', () => {
      const sc = new SchemaComposer();
      sc.addTypeDefs(`
        scalar Date
      `);
      sc.addResolveMethods({
        Date: {
          name: 'Date',

          serialize(value) {
            return new Date(value).toISOString().slice(0, 10);
          }

        }
      });
      expect(sc.get('Date')).toBeInstanceOf(ScalarTypeComposer);
      expect(Array.from(sc.types.keys())).toContain('Date');
    });
    it('should add enum values', () => {
      const sc = new SchemaComposer();
      sc.addTypeDefs(`
        enum AllowedColor {
          RED
          GREEN
          BLUE
        }
      `);
      sc.addResolveMethods({
        AllowedColor: {
          RED: '#f00',
          GREEN: '#0f0',
          BLUE: '#00f'
        }
      });
      const etc = sc.getETC('AllowedColor');
      expect(etc).toBeInstanceOf(EnumTypeComposer);
      expect(etc.getField('RED').value).toBe('#f00');
      expect(etc.getField('GREEN').value).toBe('#0f0');
      expect(etc.getField('BLUE').value).toBe('#00f');
    });
  });
  describe('getResolveMethods', () => {
    it('should return resolver map in graphql-tools way', async () => {
      const sc = new SchemaComposer();
      sc.addTypeDefs(`
        schema {
          query: Query
        }
        type Post {
          id: Int!
          title: String
          votes: Int
        }
        type Query {
          posts: [Post]
        }
      `);
      const inResolveMap = {
        Query: {
          posts: () => [{
            id: 1,
            title: 'Post title'
          }]
        },
        Post: {
          votes: () => 10
        }
      };
      sc.addResolveMethods(inResolveMap);
      const outResolveMap = sc.getResolveMethods();
      expect(outResolveMap.Query.posts).toBe(inResolveMap.Query.posts);
      expect(outResolveMap.Post.votes).toBe(inResolveMap.Post.votes);
      expect(Object.keys(outResolveMap)).toEqual(['Post', 'Query']);
      const outResolveMap2 = sc.getResolveMethods({
        exclude: ['Post']
      });
      expect(Object.keys(outResolveMap2)).toEqual(['Query']);
    });
    describe('should export Enum internals with different keys & values', () => {
      const sc = new SchemaComposer();
      sc.Query.addFields({
        e1: sc.createEnumTC({
          name: 'E1',
          values: {
            K1: {
              value: 'V1'
            },
            K2: {
              value: 'V2'
            }
          }
        }),
        e2: sc.createEnumTC({
          name: 'E2',
          values: {
            K1: {
              value: 'K1'
            },
            K2: {
              value: 'K2'
            }
          }
        })
      });
      expect(sc.getResolveMethods()).toEqual({
        E1: {
          K1: 'V1',
          K2: 'V2'
        }
      });
    });
  });
  describe('createTC helper methods', () => {
    it('createObjectTC()', () => {
      const sc = new SchemaComposer();
      const tc = sc.createObjectTC(`type A { f: Int }`);
      expect(tc).toBeInstanceOf(ObjectTypeComposer);
      expect(tc.hasField('f')).toBeTruthy();
      const tc2 = sc.createObjectTC(`type B { f: Int }`);
      expect(tc2).toBeInstanceOf(ObjectTypeComposer);
      expect(tc2.hasField('f')).toBeTruthy();
    });
    it('createInputTC()', () => {
      const sc = new SchemaComposer();
      const tc = sc.createInputTC(`input A { f: Int }`);
      expect(tc).toBeInstanceOf(InputTypeComposer);
      expect(tc.hasField('f')).toBeTruthy();
    });
    it('createScalarTC()', () => {
      const sc = new SchemaComposer();
      const tc = sc.createScalarTC(`scalar ABC`);
      expect(tc).toBeInstanceOf(ScalarTypeComposer);
      expect(tc.getTypeName()).toBe('ABC');
    });
    it('createEnumTC()', () => {
      const sc = new SchemaComposer();
      const tc = sc.createEnumTC(`enum A { AAA BBB }`);
      expect(tc).toBeInstanceOf(EnumTypeComposer);
      expect(tc.hasField('AAA')).toBeTruthy();
    });
    it('createInterfaceTC()', () => {
      const sc = new SchemaComposer();
      const tc = sc.createInterfaceTC(`interface A { f: Int }`);
      expect(tc).toBeInstanceOf(InterfaceTypeComposer);
      expect(tc.hasField('f')).toBeTruthy();
    });
    it('createUnionTC()', () => {
      const sc = new SchemaComposer();
      sc.addTypeDefs(`
        type AA { a: Int }
        type BB { b: Int }
      `);
      const tc = sc.createUnionTC(`union A = AA | BB`);
      expect(tc).toBeInstanceOf(UnionTypeComposer);
      expect(tc.hasType('AA')).toBeTruthy();
    });
  });
  describe('works with directives', () => {
    const d1 = new GraphQLDirective({
      name: 'myDirective1',
      locations: [DirectiveLocation.INPUT_FIELD_DEFINITION],
      args: {
        value: {
          type: GraphQLString
        }
      }
    });
    const d2 = new GraphQLDirective({
      name: 'myDirective2',
      locations: [DirectiveLocation.INPUT_FIELD_DEFINITION],
      args: {
        value: {
          type: GraphQLString
        }
      }
    });

    function removeDefaultDirectives(sc) {
      BUILT_IN_DIRECTIVES.forEach(d => sc.removeDirective(d));
    }

    it('has default directives', () => {
      const sc = new SchemaComposer();
      expect(sc.hasDirective('@skip')).toBeTruthy();
      expect(sc.hasDirective('@include')).toBeTruthy();
      expect(sc.hasDirective('@deprecated')).toBeTruthy();
      expect(sc.getDirectives()).toHaveLength(3);
    });
    it('addDirective()', () => {
      const sc = new SchemaComposer();
      removeDefaultDirectives(sc);
      sc.addDirective(d1);
      expect(sc.getDirectives()).toHaveLength(1);
      sc.addDirective(d1);
      expect(sc.getDirectives()).toHaveLength(1);
      sc.addDirective(d2);
      expect(sc.getDirectives()).toHaveLength(2);
    });
    it('removeDirective()', () => {
      const sc = new SchemaComposer();
      removeDefaultDirectives(sc);
      sc.addDirective(d1);
      sc.addDirective(d2);
      expect(sc.getDirectives()).toHaveLength(2);
      sc.removeDirective(d1);
      expect(sc.getDirectives()).toHaveLength(1);
      sc.removeDirective(d1);
      expect(sc.getDirectives()).toHaveLength(1);
      sc.removeDirective(d2);
      expect(sc.getDirectives()).toHaveLength(0);
    });
    it('addTypeDefs() should add directives', () => {
      const sc = new SchemaComposer();
      removeDefaultDirectives(sc);
      expect(sc.getDirectives()).toHaveLength(0);
      sc.addTypeDefs(`
        directive @customDirective(level: Int!) on FIELD
      `);
      expect(sc.getDirectives()).toHaveLength(1);
      expect(sc.getDirectives()[0]).toBeInstanceOf(GraphQLDirective);
    });
    it('clear() should clear directives', () => {
      const sc = new SchemaComposer();
      removeDefaultDirectives(sc);
      sc.addDirective(d1);
      expect(sc.getDirectives()).toHaveLength(1);
      expect(sc.has('String')).toBeFalsy();
      sc.clear();
      expect(sc.hasDirective('@skip')).toBe(true);
      expect(sc.hasDirective('@include')).toBe(true);
      expect(sc.hasDirective('@deprecated')).toBe(true);
      expect(sc.getDirectives()).toHaveLength(3);
      expect(sc.has('String')).toBeFalsy();
      expect(sc.has('Int')).toBeFalsy();
      sc.createObjectTC(`type Me { name: String, age: Int }`);
      expect(sc.has('String')).toBeTruthy();
      expect(sc.has('Int')).toBeTruthy();
    });
    it('hasDirective()', () => {
      const sc = new SchemaComposer();
      removeDefaultDirectives(sc);
      sc.addDirective(d1);
      expect(sc.hasDirective(d1)).toBeTruthy();
      expect(sc.hasDirective('@myDirective1')).toBeTruthy();
      expect(sc.hasDirective('myDirective1')).toBeTruthy();
      expect(sc.hasDirective(d2)).toBeFalsy();
      expect(sc.hasDirective('myDirective2')).toBeFalsy();
    });
  });
  describe('createTC()', () => {
    it('should Create ObjectTC', () => {
      const sc = new SchemaComposer();
      const tc = sc.createTC(`type MyType { a: Int }`);
      expect(tc).toBeInstanceOf(ObjectTypeComposer);
      expect(sc.has('MyType')).toBeTruthy(); // schoul return the same type composer instance

      expect(sc.get('MyType')).toBe(tc);
      expect(sc.createTC(`type MyType { a: Int }`)).toBe(tc);
    });
    it('should Create InputObjectTC', () => {
      const sc = new SchemaComposer();
      const tc = sc.createTC(`input MyTypeInput { a: Int }`);
      expect(tc).toBeInstanceOf(InputTypeComposer);
      expect(sc.has('MyTypeInput')).toBeTruthy(); // schoul return the same type composer instance

      expect(sc.get('MyTypeInput')).toBe(tc);
      expect(sc.createTC(`input MyTypeInput { a: Int }`)).toBe(tc);
    });
  });
  describe('merge()', () => {
    it('should load types from GraphQLSchema and merge with existed types', () => {
      const sc = new SchemaComposer();
      sc.Query.addFields({
        existedInQuery: 'String'
      });
      sc.Mutation.addFields({
        existedInMutation: 'String'
      });
      sc.Subscription.addFields({
        existedInSubscription: 'String'
      });
      sc.createTC(`type User { age: Int }`);
      const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
          name: 'MyQuery',
          fields: {
            user: {
              type: new GraphQLObjectType({
                name: 'User',
                interfaces: [new GraphQLInterfaceType({
                  name: 'IUser',
                  fields: {
                    name: {
                      type: GraphQLString
                    }
                  }
                })],
                fields: {
                  name: {
                    type: GraphQLString
                  }
                }
              })
            }
          }
        }),
        mutation: new GraphQLObjectType({
          name: 'MyMutation',
          fields: {
            write: {
              type: GraphQLString
            }
          }
        }),
        subscription: new GraphQLObjectType({
          name: 'MySubscription',
          fields: {
            subscribe: {
              type: GraphQLString
            }
          }
        })
      });
      sc.merge(schema); // imported schema should extend Query, Mutation and Subscription

      expect(sc.Query.getFieldNames()).toEqual(['existedInQuery', 'user']);
      expect(sc.Mutation.getFieldNames()).toEqual(['existedInMutation', 'write']);
      expect(sc.Subscription.getFieldNames()).toEqual(['existedInSubscription', 'subscribe']); // should merge object types

      expect(sc.getOTC('User').getFieldNames()).toEqual(['age', 'name']); // should import interfaces

      expect(sc.getIFTC('IUser').getFieldNames()).toEqual(['name']);
    });
    it('should load types from another SchemaComposer and merge with existed types', () => {
      const sc = new SchemaComposer();
      sc.Query.addFields({
        existedInQuery: 'String'
      });
      sc.Mutation.addFields({
        existedInMutation: 'String'
      });
      sc.Subscription.addFields({
        existedInSubscription: 'String'
      });
      sc.createTC(`type User { age: Int }`);
      const sc2 = new SchemaComposer();
      sc2.createInterfaceTC(`interface IUser { name: String }`);
      sc2.Query.addFields({
        user: sc2.createObjectTC(`type User implements IUser { name: String }`)
      });
      sc2.Mutation.addFields({
        write: 'String'
      });
      sc2.Subscription.addFields({
        subscribe: 'String'
      });
      sc.merge(sc2); // imported schema should extend Query, Mutation and Subscription

      expect(sc.Query.getFieldNames()).toEqual(['existedInQuery', 'user']);
      expect(sc.Mutation.getFieldNames()).toEqual(['existedInMutation', 'write']);
      expect(sc.Subscription.getFieldNames()).toEqual(['existedInSubscription', 'subscribe']); // should merge object types

      expect(sc.getOTC('User').getFieldNames()).toEqual(['age', 'name']); // should import interfaces

      expect(sc.getIFTC('IUser').getFieldNames()).toEqual(['name']);
    });
    it('should throw an error on merging different kind of types with the same name', () => {
      const sc = new SchemaComposer();
      sc.createTC(`type User { name: String }`);
      const sc2 = new SchemaComposer();
      sc2.createTC(`input User { name: String }`);
      expect(() => {
        sc.merge(sc2);
      }).toThrow(/Cannot merge InputTypeComposer.*with ObjectType/);
    });
  });
  describe('misc methods', () => {
    it('toSDL()', () => {
      const sc = new SchemaComposer();
      sc.Query.addFields({
        existedInQuery: 'String'
      });
      sc.Mutation.addFields({
        existedInMutation: 'String'
      });
      sc.Subscription.addFields({
        existedInSubscription: 'String'
      });
      sc.createTC(`type User { age: Int }`);
      expect(sc.toSDL()).toBe(dedent`
        type Mutation {
          existedInMutation: String
        }

        type Query {
          existedInQuery: String
        }

        """
        The \`String\` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
        """
        scalar String

        type Subscription {
          existedInSubscription: String
        }
      `);
    });
    describe('getTypeSDL()', () => {
      const sc1 = new SchemaComposer();
      sc1.addTypeDefs(`
        type User implements IF2 & IF1 {
          f3(filter: Filter, a: Int): Boolean 
          f1: Int
          f2: Boolean
        }
        input Filter { b: Int, a: String }
        input AnotherType { a: String }
        interface IF1 { f2: Int f1: Int }
        interface IF2 { f2: Int }
      `);
      it('just single type', () => {
        expect(sc1.getTypeSDL('User')).toBe(dedent`
          type User implements IF2 & IF1 {
            f3(filter: Filter, a: Int): Boolean
            f1: Int
            f2: Boolean
          }
        `);
      });
      it('type with nested types and without comments', () => {
        expect(sc1.getTypeSDL('User', {
          deep: true,
          omitDescriptions: true
        })).toEqual(dedent`
          type User implements IF2 & IF1 {
            f3(filter: Filter, a: Int): Boolean
            f1: Int
            f2: Boolean
          }

          scalar Boolean

          input Filter {
            b: Int
            a: String
          }

          scalar Int

          scalar String

          interface IF2 {
            f2: Int
          }

          interface IF1 {
            f2: Int
            f1: Int
          }
        `);
      });
      it('type with nested and sorting for snapshots', () => {
        expect(sc1.getTypeSDL('User', {
          sortAll: true,
          deep: true,
          omitDescriptions: true
        })).toBe(dedent`
          type User implements IF1 & IF2 {
            f1: Int
            f2: Boolean
            f3(a: Int, filter: Filter): Boolean
          }

          scalar Boolean

          input Filter {
            a: String
            b: Int
          }

          interface IF1 {
            f1: Int
            f2: Int
          }

          interface IF2 {
            f2: Int
          }

          scalar Int

          scalar String
        `);
      });
    });
  });
  describe('is* methods', () => {
    it('isObjectType', () => {
      const sc1 = new SchemaComposer();
      sc1.addTypeDefs(`type MyType { name: String }`);
      expect(sc1.isObjectType('MyType')).toBeTruthy();
      expect(sc1.isObjectType(`type MyType { name: String }`)).toBeTruthy();
      expect(sc1.isObjectType(sc1.createObjectTC(`type MyType1 { name: String }`))).toBeTruthy();
      expect(sc1.isObjectType(sc1.get('MyType'))).toBeTruthy();
      expect(sc1.isObjectType(sc1.get('MyType').getType())).toBeTruthy();
      expect(sc1.isInputObjectType('MyType')).toBeFalsy();
      expect(sc1.isScalarType('MyType')).toBeFalsy();
      expect(sc1.isEnumType('MyType')).toBeFalsy();
      expect(sc1.isInterfaceType('MyType')).toBeFalsy();
      expect(sc1.isUnionType('MyType')).toBeFalsy();
    });
    it('isInputType', () => {
      const sc1 = new SchemaComposer();
      sc1.addTypeDefs(`input MyType { name: String }`);
      expect(sc1.isInputObjectType('MyType')).toBeTruthy();
      expect(sc1.isInputObjectType(`input MyType { name: String }`)).toBeTruthy();
      expect(sc1.isInputObjectType(sc1.createInputTC(`input MyType1 { name: String }`))).toBeTruthy();
      expect(sc1.isInputObjectType(sc1.get('MyType'))).toBeTruthy();
      expect(sc1.isInputObjectType(sc1.get('MyType').getType())).toBeTruthy();
      expect(sc1.isObjectType('MyType')).toBeFalsy();
      expect(sc1.isScalarType('MyType')).toBeFalsy();
      expect(sc1.isEnumType('MyType')).toBeFalsy();
      expect(sc1.isInterfaceType('MyType')).toBeFalsy();
      expect(sc1.isUnionType('MyType')).toBeFalsy();
    });
    it('isScalarType', () => {
      const sc1 = new SchemaComposer();
      sc1.addTypeDefs(`scalar MyType`);
      expect(sc1.isScalarType('MyType')).toBeTruthy();
      expect(sc1.isScalarType(`scalar MyType`)).toBeTruthy();
      expect(sc1.isScalarType(sc1.createScalarTC(`scalar MyType1`))).toBeTruthy();
      expect(sc1.isScalarType(sc1.get('MyType'))).toBeTruthy();
      expect(sc1.isScalarType(sc1.get('MyType').getType())).toBeTruthy();
      expect(sc1.isObjectType('MyType')).toBeFalsy();
      expect(sc1.isInputObjectType('MyType')).toBeFalsy();
      expect(sc1.isEnumType('MyType')).toBeFalsy();
      expect(sc1.isInterfaceType('MyType')).toBeFalsy();
      expect(sc1.isUnionType('MyType')).toBeFalsy();
    });
    it('isEnumType', () => {
      const sc1 = new SchemaComposer();
      sc1.addTypeDefs(`enum MyType { A B }`);
      expect(sc1.isEnumType('MyType')).toBeTruthy();
      expect(sc1.isEnumType(`enum MyType { A B }`)).toBeTruthy();
      expect(sc1.isEnumType(sc1.createEnumTC(`enum MyType1 { A B }`))).toBeTruthy();
      expect(sc1.isEnumType(sc1.get('MyType'))).toBeTruthy();
      expect(sc1.isEnumType(sc1.get('MyType').getType())).toBeTruthy();
      expect(sc1.isObjectType('MyType')).toBeFalsy();
      expect(sc1.isInputObjectType('MyType')).toBeFalsy();
      expect(sc1.isScalarType('MyType')).toBeFalsy();
      expect(sc1.isInterfaceType('MyType')).toBeFalsy();
      expect(sc1.isUnionType('MyType')).toBeFalsy();
    });
    it('isInterfaceType', () => {
      const sc1 = new SchemaComposer();
      sc1.addTypeDefs(`interface MyType { a: Int }`);
      expect(sc1.isInterfaceType('MyType')).toBeTruthy();
      expect(sc1.isInterfaceType(`interface MyType { a: Int }`)).toBeTruthy();
      expect(sc1.isInterfaceType(sc1.createInterfaceTC(`interface MyType1 { a: Int }`))).toBeTruthy();
      expect(sc1.isInterfaceType(sc1.get('MyType'))).toBeTruthy();
      expect(sc1.isInterfaceType(sc1.get('MyType').getType())).toBeTruthy();
      expect(sc1.isObjectType('MyType')).toBeFalsy();
      expect(sc1.isInputObjectType('MyType')).toBeFalsy();
      expect(sc1.isScalarType('MyType')).toBeFalsy();
      expect(sc1.isEnumType('MyType')).toBeFalsy();
      expect(sc1.isUnionType('MyType')).toBeFalsy();
    });
    it('isUnionType', () => {
      const sc1 = new SchemaComposer();
      sc1.addTypeDefs(`union MyType = A | B`);
      expect(sc1.isUnionType('MyType')).toBeTruthy();
      expect(sc1.isUnionType(`union MyType = A | B`)).toBeTruthy();
      expect(sc1.isUnionType(sc1.createUnionTC(`union MyType = A | B`))).toBeTruthy();
      expect(sc1.isUnionType(sc1.get('MyType'))).toBeTruthy();
      expect(sc1.isUnionType(sc1.get('MyType').getType())).toBeTruthy();
      expect(sc1.isObjectType('MyType')).toBeFalsy();
      expect(sc1.isInputObjectType('MyType')).toBeFalsy();
      expect(sc1.isScalarType('MyType')).toBeFalsy();
      expect(sc1.isEnumType('MyType')).toBeFalsy();
      expect(sc1.isInterfaceType('MyType')).toBeFalsy();
    });
  });
  describe('clone()', () => {
    let sc1;
    beforeEach(() => {
      sc1 = new SchemaComposer();
      sc1.addTypeDefs(`
        type Query {
          list: [User]
        }

        type User {
          name: String
          friends: [User]
        }
      `);
    });
    it('should deeply clone all types', () => {
      const sc2 = sc1.clone();
      expect(sc2.getOTC('User')).not.toBe(sc1.getOTC('User'));
      expect(sc2.getOTC('Query')).not.toBe(sc1.getOTC('Query'));
    });
    it('should clone MustHaveTypes', () => {
      const a = sc1.createObjectTC(`type A { i: Int }`);
      sc1.addSchemaMustHaveType(a);
      const sc2 = sc1.clone();
      expect(sc2._schemaMustHaveTypes).toHaveLength(1);
      expect(sc2._schemaMustHaveTypes[0]).not.toBe(sc1._schemaMustHaveTypes[0]);
    });
    it('directives should be different', () => {
      const directive = new GraphQLDirective({
        name: 'D',
        locations: ['QUERY']
      });
      sc1.addDirective(directive);
      const sc2 = sc1.clone();
      expect(sc2.hasDirective(directive)).toBeTruthy();
      const directive2 = new GraphQLDirective({
        name: 'D2',
        locations: ['QUERY']
      });
      sc2.addDirective(directive2);
      expect(sc2.hasDirective(directive2)).toBeTruthy();
      expect(sc1.hasDirective(directive2)).toBeFalsy();
    });
  });
});