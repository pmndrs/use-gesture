import { GraphQLInt, GraphQLObjectType, GraphQLUnionType, graphql } from '../graphql';
import { schemaComposer, SchemaComposer } from '..';
import { UnionTypeComposer } from '../UnionTypeComposer';
import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { NonNullComposer } from '../NonNullComposer';
import { ListComposer } from '../ListComposer';
import { dedent } from '../utils/dedent';
beforeEach(() => {
  schemaComposer.clear();
});
describe('UnionTypeComposer', () => {
  let utc;
  beforeEach(() => {
    const objectType = new GraphQLUnionType({
      name: 'MyUnion',
      types: [new GraphQLObjectType({
        name: 'A',
        fields: {
          a: {
            type: GraphQLInt
          }
        }
      }), new GraphQLObjectType({
        name: 'B',
        fields: {
          b: {
            type: GraphQLInt
          }
        }
      })]
    });
    utc = new UnionTypeComposer(objectType, schemaComposer);
  });
  describe('create() [static method]', () => {
    it('should create Union by typeName as a string', () => {
      const myUTC = UnionTypeComposer.create('UnionStub', schemaComposer);
      expect(myUTC).toBeInstanceOf(UnionTypeComposer);
      expect(myUTC.getType()).toBeInstanceOf(GraphQLUnionType);
      expect(myUTC.getTypes()).toEqual([]);
    });
    it('should create Union by type template string', () => {
      const myUTC = UnionTypeComposer.create(`
        union TestTypeTpl = AA | BB
      `, schemaComposer);
      expect(myUTC).toBeInstanceOf(UnionTypeComposer);
      expect(myUTC.getTypeName()).toBe('TestTypeTpl'); // when types A & B are not defined getTypes() throw an error

      expect(() => myUTC.getType().getTypes()).toThrowError('UnionError[TestTypeTpl]: Type with name "AA" does not exists'); // when types A & B defined, getTypes() returns them

      ObjectTypeComposer.create('type AA { a: Int }', schemaComposer);
      ObjectTypeComposer.create('type BB { b: Int }', schemaComposer);
      const types = myUTC.getType().getTypes();
      expect(types).toHaveLength(2);
      expect(types[0]).toBeInstanceOf(GraphQLObjectType);
      expect(types[1]).toBeInstanceOf(GraphQLObjectType);
    });
    it('should create UTC by UnionTypeConfig with unexisted types', () => {
      const myUTC = UnionTypeComposer.create({
        name: 'TestType',
        types: [`type AA { a: Int }`, `BB`]
      }, schemaComposer);
      expect(myUTC).toBeInstanceOf(UnionTypeComposer);
      expect(myUTC.getTypeNames()).toEqual(['AA', 'BB']);
      const types = myUTC.getTypes();
      expect(types).toHaveLength(2);
      expect(types[0].getTypeName()).toBe('AA');
      expect(types[0].getFieldType('a')).toBe(GraphQLInt);
      expect(types[1].getTypeName()).toBe('BB');
    });
    it('should create UTC by GraphQLUnionType', () => {
      const objType = new GraphQLUnionType({
        name: 'TestTypeObj',
        types: [new GraphQLObjectType({
          name: 'C',
          fields: () => ({})
        })]
      });
      const myUTC = UnionTypeComposer.create(objType, schemaComposer);
      expect(myUTC).toBeInstanceOf(UnionTypeComposer);
      expect(myUTC.getType()).toBe(objType);
      expect(myUTC.getTypes()[0].getTypeName()).toBe('C');
    });
    it('should create type and store it in schemaComposer', () => {
      const UserUnion = UnionTypeComposer.create('UserUnion', schemaComposer);
      expect(schemaComposer.getUTC('UserUnion')).toBe(UserUnion);
    });
    it('createTemp() should not store type in schemaComposer', () => {
      UnionTypeComposer.createTemp('SomeUnion');
      expect(schemaComposer.has('SomeUnion')).toBeFalsy();
    });
  });
  describe('types manipulation', () => {
    it('getTypes()', () => {
      const types = utc.getTypes();
      expect(types).toHaveLength(2);
      expect(types[0]).toBeInstanceOf(ObjectTypeComposer);
      expect(types[1]).toBeInstanceOf(ObjectTypeComposer);
    });
    it('hasType()', () => {
      expect(utc.hasType('A')).toBeTruthy();
      expect(utc.hasType('B')).toBeTruthy();
      expect(utc.hasType('C')).toBeFalsy();
    });
    it('getTypeNames()', () => {
      const types = utc.getTypeNames();
      expect(types).toEqual(['A', 'B']);
    });
    describe('addType()', () => {
      it('should add GraphQLObjectType', () => {
        utc.addType(new GraphQLObjectType({
          name: 'CC',
          fields: () => ({})
        }));
        expect(utc.hasType('CC')).toBeTruthy();
      });
      it('should add by type name', () => {
        utc.addType('SomeType');
        expect(utc.hasType('SomeType')).toBeTruthy();
        ObjectTypeComposer.create('SomeType', schemaComposer);
        expect(utc.getTypes()).toHaveLength(3);
      });
      it('should add by type def', () => {
        utc.addType(`type SomeType2 { a: Int }`);
        expect(utc.hasType('SomeType2')).toBeTruthy();
        expect(utc.getTypes()).toHaveLength(3);
      });
    });
    describe('setTypes()', () => {
      it('should replace all types', () => {
        utc.setTypes([new GraphQLObjectType({
          name: 'CC',
          fields: () => ({})
        })]);
        expect(utc.getTypes()).toHaveLength(1);
      });
      it('should set types in different ways', () => {
        utc.setTypes([new GraphQLObjectType({
          name: 'CC',
          fields: () => ({})
        }), `DD`, `type EE { a: Int }`]);
        expect(utc.getTypes()).toHaveLength(3);
        ObjectTypeComposer.create('type DD { a: Int }', schemaComposer);
        expect(utc.getType().getTypes()).toHaveLength(3);
      });
    });
    describe('removeType()', () => {
      it('should remove one field', () => {
        utc.removeType('A');
        expect(utc.getTypeNames()).toEqual(['B']);
      });
      it('should remove list of fields', () => {
        utc.removeType(['A', 'C']);
        expect(utc.getTypeNames()).toEqual(['B']);
        utc.removeType(['B', 'C']);
        expect(utc.getTypeNames()).toEqual([]);
      });
    });
    describe('removeOtherTypes()', () => {
      it('should remove one field', () => {
        utc.removeOtherTypes('B');
        expect(utc.getTypeNames()).toEqual(['B']);
      });
      it('should remove list of fields', () => {
        utc.removeOtherTypes(['B', 'C']);
        expect(utc.getTypeNames()).toEqual(['B']);
      });
    });
  });
  describe('clone()', () => {
    it('should clone type', () => {
      const cloned = utc.clone('NewObject');
      expect(cloned).not.toBe(utc);
      expect(cloned.getTypeName()).toBe('NewObject');
    });
    it('type unions should be different but have same type instances', () => {
      const UserTC = schemaComposer.createObjectTC(`type User { field1: String }`);
      utc.addTypeResolver(UserTC, () => true);
      const cloned = utc.clone('NewObject');
      cloned.addType('AAA');
      expect(cloned.getTypes()).toHaveLength(4);
      expect(utc.getTypes()).toHaveLength(3);
      expect(cloned.hasType(UserTC)).toBeTruthy();
    });
    it('extensions should be different', () => {
      utc.setExtension('ext1', 123);
      const cloned = utc.clone('NewObject');
      expect(cloned.getExtension('ext1')).toBe(123);
      cloned.setExtension('ext1', 300);
      expect(cloned.getExtension('ext1')).toBe(300);
      expect(utc.getExtension('ext1')).toBe(123);
    });
    it('typeResolvers should be the same', () => {
      const UserTC = schemaComposer.createObjectTC(`type User { field1: String }`);
      utc.addTypeResolver(UserTC, () => true);
      const cloned = utc.clone('NewObject');
      const clonedUserTC = cloned.getTypeResolvers().keys().next().value;
      expect(clonedUserTC).toBe(UserTC);
    });
  });
  describe('cloneTo()', () => {
    let anotherSchemaComposer;
    beforeEach(() => {
      anotherSchemaComposer = new SchemaComposer();
    });
    it('should clone type', () => {
      const cloned = utc.cloneTo(anotherSchemaComposer);
      expect(cloned).not.toBe(utc);
      expect(cloned.getTypeName()).toBe(utc.getTypeName());
    });
    it('type unions should be different & have cloned type instances', () => {
      const UserTC = schemaComposer.createObjectTC(`type User { field1: String }`);
      utc.addTypeResolver(UserTC, () => true);
      const cloned = utc.cloneTo(anotherSchemaComposer);
      cloned.addType('AAA');
      expect(cloned.getTypes()).toHaveLength(4);
      expect(utc.getTypes()).toHaveLength(3);
      const ClonedUserTC = anotherSchemaComposer.getOTC('User');
      expect(cloned.getTypes()).toEqual(expect.arrayContaining([ClonedUserTC]));
      expect(cloned.getTypes()).toEqual(expect.not.arrayContaining([UserTC]));
    });
    it('extensions should be different', () => {
      utc.setExtension('ext1', 123);
      const cloned = utc.cloneTo(anotherSchemaComposer);
      expect(cloned.getExtension('ext1')).toBe(123);
      cloned.setExtension('ext1', 300);
      expect(cloned.getExtension('ext1')).toBe(300);
      expect(utc.getExtension('ext1')).toBe(123);
    });
    it('typeResolvers should be different', () => {
      const UserTC = schemaComposer.createObjectTC(`type User { field1: String }`);
      utc.addTypeResolver(UserTC, () => true);
      const cloned = utc.cloneTo(anotherSchemaComposer);
      const clonedUserTC = cloned.getTypeResolvers().keys().next().value; // different type instances

      expect(clonedUserTC).not.toBe(UserTC); // but have same typename

      expect(clonedUserTC.getTypeName()).toBe(UserTC.getTypeName());
    });
  });
  describe('get type methods', () => {
    it('getTypePlural() should return wrapped type with ListComposer', () => {
      expect(utc.getTypePlural()).toBeInstanceOf(ListComposer);
      expect(utc.getTypePlural().getType().ofType).toBe(utc.getType());
    });
    it('getTypeNonNull() should return wrapped type with NonNullComposer', () => {
      expect(utc.getTypeNonNull()).toBeInstanceOf(NonNullComposer);
      expect(utc.getTypeNonNull().getType().ofType).toBe(utc.getType());
    });
    it('setDescription() should return description', () => {
      utc.setDescription('My union type');
      expect(utc.getDescription()).toBe('My union type');
    });
    it('setTypeName() should return Type name', () => {
      expect(utc.getTypeName()).toBe('MyUnion');
      utc.setTypeName('NewUnionName');
      expect(utc.getTypeName()).toBe('NewUnionName');
    });
    it('check getters List, NonNull', () => {
      const UserTC = schemaComposer.createUnionTC(`union User = Admin | Client`);
      expect(UserTC.List).toBeInstanceOf(ListComposer);
      expect(UserTC.List.ofType).toBe(UserTC);
      expect(UserTC.List.getTypeName()).toBe('[User]');
      expect(UserTC.NonNull).toBeInstanceOf(NonNullComposer);
      expect(UserTC.NonNull.ofType).toBe(UserTC);
      expect(UserTC.NonNull.getTypeName()).toBe('User!');
      expect(UserTC.NonNull.List).toBeInstanceOf(ListComposer);
      expect(UserTC.NonNull.List.getTypeName()).toBe('[User!]');
      expect(UserTC.NonNull.List.NonNull).toBeInstanceOf(NonNullComposer);
      expect(UserTC.NonNull.List.NonNull.getTypeName()).toBe('[User!]!');
    });
  });
  it('should have chainable methods', () => {
    expect(utc.setTypes(['BBB'])).toBe(utc);
    expect(utc.addType('CCC')).toBe(utc);
    expect(utc.removeType('CCC')).toBe(utc);
    expect(utc.removeOtherTypes('BBB')).toBe(utc);
    expect(utc.setTypeName('Union2')).toBe(utc);
    expect(utc.setDescription('desc')).toBe(utc);
    expect(utc.clearTypes()).toBe(utc);
  });
  describe('typeResolvers methods', () => {
    let PersonTC;
    let KindRedTC;
    let KindBlueTC;
    beforeEach(() => {
      utc.clearTypes();
      PersonTC = ObjectTypeComposer.create(`
        type Person { age: Int, field1: String, field2: String }
      `, schemaComposer);
      utc.addTypeResolver(PersonTC, value => {
        return value.hasOwnProperty('age');
      });
      KindRedTC = ObjectTypeComposer.create(`
        type KindRed { kind: String, field1: String, field2: String, red: String }
      `, schemaComposer);
      utc.addTypeResolver(KindRedTC, value => {
        return value.kind === 'red';
      });
      KindBlueTC = ObjectTypeComposer.create(`
        type KindBlue { kind: String, field1: String, field2: String, blue: String }
      `, schemaComposer);
      utc.addTypeResolver(KindBlueTC, value => {
        return value.kind === 'blue';
      });
    });
    it('integration test', async () => {
      schemaComposer.Query.addFields({
        test: {
          type: [utc],
          resolve: () => [{
            kind: 'red',
            field1: 'KindRed'
          }, {
            age: 15,
            field1: 'Name'
          }, {
            kind: 'blue',
            field1: 'KindBlue'
          }]
        }
      });
      const res = await graphql(schemaComposer.buildSchema(), `
          query {
            test {
              __typename
              ... on Person {
                age
                field1
                field2
              }
              ... on KindRed {
                kind
                field1
              }
              ... on KindBlue {
                kind
                field2
              }
            }
          }
        `);
      expect(res).toEqual({
        data: {
          test: [{
            __typename: 'KindRed',
            field1: 'KindRed',
            kind: 'red'
          }, {
            __typename: 'Person',
            age: 15,
            field1: 'Name',
            field2: null
          }, {
            __typename: 'KindBlue',
            field2: null,
            kind: 'blue'
          }]
        }
      });
    });
    it('hasTypeResolver()', () => {
      expect(utc.hasTypeResolver(PersonTC)).toBeTruthy();
      expect(utc.hasTypeResolver(KindRedTC)).toBeTruthy();
      expect(utc.hasTypeResolver(KindBlueTC)).toBeTruthy();
      expect(utc.hasTypeResolver(ObjectTypeComposer.create('NewOne', schemaComposer))).toBeFalsy();
    });
    it('getTypeResolvers()', () => {
      const trm = utc.getTypeResolvers();
      expect(trm).toBeInstanceOf(Map);
      expect(trm.size).toBe(3);
    });
    it('getTypeResolverCheckFn()', () => {
      const checkFn = utc.getTypeResolverCheckFn(PersonTC);
      expect(checkFn({
        age: 15
      })).toBeTruthy();
      expect(checkFn({
        nope: 'other type'
      })).toBeFalsy();
    });
    it('setTypeResolverFallback()', () => {
      const checkFn1 = utc.getResolveType();
      expect(checkFn1({})).toBeFalsy();
      const FallbackTC = schemaComposer.createObjectTC(`
        type Fallback { field1: String, field2: String }
      `);
      utc.setTypeResolverFallback(FallbackTC);
      const checkFn2 = utc.getResolveType();
      expect(checkFn2({})).toBe(FallbackTC.getType());
      utc.setTypeResolverFallback(null);
    });
    it('getTypeResolverNames()', () => {
      expect(utc.getTypeResolverNames()).toEqual(expect.arrayContaining(['Person', 'KindRed', 'KindBlue']));
    });
    it('getTypeResolverTypes()', () => {
      expect(utc.getTypeResolverTypes()).toEqual(expect.arrayContaining([PersonTC, KindRedTC, KindBlueTC]));
    });
    describe('setTypeResolvers()', () => {
      it('async mode', async () => {
        const map = new Map([[PersonTC.getType(), async () => false], [KindRedTC, async () => true]]);
        utc.setTypeResolvers(map);
        const resolveType = utc._gqType.resolveType;
        expect(resolveType()).toBeInstanceOf(Promise);
        expect(await resolveType()).toBe(KindRedTC.getType());
      });
      it('sync mode', () => {
        const map = new Map([[PersonTC.getType(), () => false], [KindRedTC, () => false], [KindBlueTC, () => true]]);
        utc.setTypeResolvers(map);
        const resolveType = utc._gqType.resolveType;
        expect(resolveType()).toBe(KindBlueTC.getType());
      });
      it('throw error on wrong type', () => {
        expect(() => {
          const map = new Map([[false, () => true]]);
          utc.setTypeResolvers(map);
        }).toThrowError();
      });
      it('throw error on wrong checkFn', () => {
        expect(() => {
          const map = new Map([[PersonTC, true]]);
          utc.setTypeResolvers(map);
        }).toThrowError();
      });
    });
    it('addTypeResolver()', () => {
      const fn = () => false;

      utc.addTypeResolver(PersonTC, fn);
      expect(utc.getTypeResolverCheckFn(PersonTC)).toBe(fn);
      expect(() => {
        utc.addTypeResolver(PersonTC);
      }).toThrowError();
    });
    it('removeTypeResolver()', () => {
      expect(utc.hasTypeResolver(PersonTC)).toBeTruthy();
      utc.removeTypeResolver(PersonTC);
      expect(utc.hasTypeResolver(PersonTC)).toBeFalsy();
    });
    describe('check native resolveType methods', () => {
      it('check methods setResolveType() getResolveType()', () => {
        const utc1 = schemaComposer.createUnionTC(`union U = A | B`);

        const resolveType = () => 'A';

        expect(utc1.getResolveType()).toBeUndefined();
        utc1.setResolveType(resolveType);
        expect(utc1.getResolveType()).toBe(resolveType);
      });
      it('integration test', async () => {
        const aTC = schemaComposer.createObjectTC('type A { a: Int }');
        const bTC = schemaComposer.createObjectTC('type B { b: Int }');
        const utc1 = schemaComposer.createUnionTC(`union U = A | B`);

        const resolveType = value => {
          if (value) {
            if (value.a) return 'A';else if (value.b) return 'B';
          }

          return null;
        };

        utc1.setResolveType(resolveType);
        schemaComposer.addSchemaMustHaveType(aTC);
        schemaComposer.addSchemaMustHaveType(bTC);
        schemaComposer.Query.addFields({
          check: {
            type: '[U]',
            resolve: () => [{
              a: 1
            }, {
              b: 2
            }, {
              c: 3
            }]
          }
        });
        const res = await graphql(schemaComposer.buildSchema(), `
            query {
              check {
                __typename
                ... on A {
                  a
                }
                ... on B {
                  b
                }
              }
            }
          `);
        expect(res.data).toEqual({
          check: [{
            __typename: 'A',
            a: 1
          }, {
            __typename: 'B',
            b: 2
          }, null]
        });
      });
    });
  });
  describe('directive methods', () => {
    it('type level directive methods', () => {
      const tc1 = schemaComposer.createUnionTC(`
        union My1 @d0(a: false) @d1(b: "3") @d0(a: true) = My2 | My3 
      `);
      expect(tc1.getDirectives()).toEqual([{
        args: {
          a: false
        },
        name: 'd0'
      }, {
        args: {
          b: '3'
        },
        name: 'd1'
      }, {
        args: {
          a: true
        },
        name: 'd0'
      }]);
      expect(tc1.getDirectiveNames()).toEqual(['d0', 'd1', 'd0']);
      expect(tc1.getDirectiveByName('d0')).toEqual({
        a: false
      });
      expect(tc1.getDirectiveById(0)).toEqual({
        a: false
      });
      expect(tc1.getDirectiveByName('d1')).toEqual({
        b: '3'
      });
      expect(tc1.getDirectiveById(1)).toEqual({
        b: '3'
      });
      expect(tc1.getDirectiveByName('d2')).toEqual(undefined);
      expect(tc1.getDirectiveById(333)).toEqual(undefined);
    });
    it('check directive set-methods', () => {
      schemaComposer.addTypeDefs(`
        type My2 { f: Int }
        type My3 { f: Int }
      `);
      const tc1 = schemaComposer.createUnionTC(`
        union My1 @d1(b: "3") = My2 | My3 
      `);
      expect(tc1.toSDL()).toBe(dedent`
        union My1 @d1(b: "3") = My2 | My3
      `);
      tc1.setDirectives([{
        args: {
          a: false
        },
        name: 'd0'
      }, {
        args: {
          b: '3'
        },
        name: 'd1'
      }, {
        args: {
          a: true
        },
        name: 'd0'
      }]);
      expect(tc1.toSDL()).toBe(dedent`
        union My1 @d0(a: false) @d1(b: "3") @d0(a: true) = My2 | My3
      `);
    });
  });
  describe('merge()', () => {
    it('should merge with GraphQLUnionType', () => {
      const resultUTC = schemaComposer.createUnionTC(`union Result = Article | Comment`);
      const result2 = new GraphQLUnionType({
        name: 'Result2',
        types: [new GraphQLObjectType({
          name: 'User',
          fields: {}
        }), new GraphQLObjectType({
          name: 'Comment',
          fields: {}
        })]
      });
      resultUTC.merge(result2);
      expect(resultUTC.getTypeNames()).toEqual(['Article', 'User', 'Comment']);
    });
    it('should merge with UnionTypeComposer', () => {
      const resultUTC = schemaComposer.createUnionTC(`union Result = Article | Comment`);
      const sc2 = new SchemaComposer();
      const result2 = sc2.createUnionTC(`union Result2 = User | Comment`);
      resultUTC.merge(result2);
      expect(resultUTC.getTypeNames()).toEqual(['Article', 'User', 'Comment']);
    });
    it('should throw error on wrong type', () => {
      const resultUTC = schemaComposer.createUnionTC(`union Result = Article | Comment`);
      expect(() => resultUTC.merge(schemaComposer.createScalarTC('Scalar'))).toThrow('Cannot merge ScalarTypeComposer');
    });
  });
  describe('misc methods', () => {
    it('getNestedTCs()', () => {
      const sc1 = new SchemaComposer();
      sc1.addTypeDefs(`
        type LonLat { lon: Float lat: Float}
        input OtherInput1 { b: Int }
        union C = A | B
        type A { f1: Int }
        type B { f2: LonLat }
      `);
      expect(Array.from(sc1.getUTC('C').getNestedTCs().values()).map(t => t.getTypeName())).toEqual(['A', 'Int', 'B', 'LonLat', 'Float']);
    });
    it('toSDL()', () => {
      const t = schemaComposer.createUnionTC(`
        union C = A | B
      `);
      expect(t.toSDL()).toBe(`union C = A | B`);
    });
    it('toSDL({ deep: true })', () => {
      const sc1 = new SchemaComposer();
      sc1.addTypeDefs(`
        type LonLat { lon: Float lat: Float}
        input OtherInput1 { b: Int }
        union C = A | B
        type A { f1: Int }
        type B { f2: LonLat }
      `);
      expect(sc1.getUTC('C').toSDL({
        deep: true,
        omitDescriptions: true
      })).toBe(dedent`
        union C = A | B

        type A {
          f1: Int
        }

        scalar Int

        type B {
          f2: LonLat
        }

        type LonLat {
          lon: Float
          lat: Float
        }

        scalar Float
      `);
      expect(sc1.getUTC('C').toSDL({
        deep: true,
        omitDescriptions: true,
        exclude: ['Int', 'B']
      })).toBe(dedent`
        union C = A | B

        type A {
          f1: Int
        }
      `);
    });
  });
});