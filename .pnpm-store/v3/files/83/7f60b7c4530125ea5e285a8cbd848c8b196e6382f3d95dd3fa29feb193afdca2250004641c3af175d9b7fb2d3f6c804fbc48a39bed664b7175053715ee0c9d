import { schemaComposer, SchemaComposer } from '..';
import { GraphQLScalarType } from '../graphql';
import { ScalarTypeComposer } from '../ScalarTypeComposer';
import { NonNullComposer } from '../NonNullComposer';
import { ListComposer } from '../ListComposer';
import { dedent } from '../utils/dedent';
import { graphqlVersion } from '../utils/graphqlVersion';
beforeEach(() => {
  schemaComposer.clear();
});
describe('ScalarTypeComposer', () => {
  let scalarType;
  let stc;
  beforeEach(() => {
    scalarType = new GraphQLScalarType({
      name: 'MyScalar',
      serialize: () => {}
    });
    stc = new ScalarTypeComposer(scalarType, schemaComposer);
  });
  describe('create() [static method]', () => {
    it('should create STC by type template string', () => {
      const myTC = ScalarTypeComposer.create('scalar SDLScalar', schemaComposer);
      expect(myTC).toBeInstanceOf(ScalarTypeComposer);
      expect(myTC.getTypeName()).toBe('SDLScalar');
    });
    it('should create STC by GraphQLScalarTypeConfig', () => {
      const myTC = ScalarTypeComposer.create({
        name: 'TestType',
        serialize: () => {}
      }, schemaComposer);
      expect(myTC).toBeInstanceOf(ScalarTypeComposer);
      expect(myTC.getTypeName()).toBe('TestType');
    });
    it('should create TC by GraphQLScalarType', () => {
      const objType = new GraphQLScalarType({
        name: 'TestTypeObj',
        serialize: () => {}
      });
      const myTC = ScalarTypeComposer.create(objType, schemaComposer);
      expect(myTC).toBeInstanceOf(ScalarTypeComposer);
      expect(myTC.getType()).toBe(objType);
    });
    it('should create STC from string', () => {
      const myTC = ScalarTypeComposer.create('MySSS', schemaComposer);
      expect(myTC.getTypeName()).toEqual('MySSS');
    });
    it('should create type and store it in schemaComposer', () => {
      const SomeUserSTC = ScalarTypeComposer.create('SomeUserScalar', schemaComposer);
      expect(schemaComposer.getSTC('SomeUserScalar')).toBe(SomeUserSTC);
    });
    it('createTemp() should not store type in schemaComposer', () => {
      ScalarTypeComposer.createTemp('SomeUserScalar');
      expect(schemaComposer.has('SomeUserScalar')).toBeFalsy();
    });
  });
  describe('serialize methods', () => {
    it('getSerialize()', () => {
      expect(typeof stc.getSerialize()).toBe('function');
    });
    it('setSerialize()', () => {
      const mySerializer = () => {};

      stc.setSerialize(mySerializer);
      expect(stc.getSerialize()).toBe(mySerializer);
    });
    it('getParseValue()', () => {
      expect(typeof stc.getParseValue()).toBe('function');
    });
    it('setParseValue()', () => {
      const myParseValue = () => {};

      stc.setParseValue(myParseValue);
      expect(stc.getParseValue()).toBe(myParseValue);
    });
    it('getParseLiteral()', () => {
      expect(typeof stc.getParseLiteral()).toBe('function');
    });
    it('setParseLiteral()', () => {
      const myParseLiteral = () => {};

      stc.setParseLiteral(myParseLiteral);
      expect(stc.getParseLiteral()).toBe(myParseLiteral);
    });
  });
  describe('type methods', () => {
    it('getType()', () => {
      expect(stc.getType()).toBeInstanceOf(GraphQLScalarType);
    });
    it('getTypeName()', () => {
      expect(stc.getTypeName()).toBe('MyScalar');
    });
    it('setTypeName()', () => {
      expect(stc.getTypeName()).toBe('MyScalar');
      stc.setTypeName('OtherName');
      expect(stc.getTypeName()).toBe('OtherName');
    });
    it('getTypePlural() should return wrapped type with ListComposer', () => {
      expect(stc.getTypePlural()).toBeInstanceOf(ListComposer);
      expect(stc.getTypePlural().ofType).toBe(stc);
    });
    it('getTypeNonNull() should return wrapped type with NonNullComposer', () => {
      expect(stc.getTypeNonNull()).toBeInstanceOf(NonNullComposer);
      expect(stc.getTypeNonNull().ofType).toBe(stc);
    });
    it('check getters List, NonNull', () => {
      const ColorTC = schemaComposer.createScalarTC(`scalar Color`);
      expect(ColorTC.List).toBeInstanceOf(ListComposer);
      expect(ColorTC.List.ofType).toBe(ColorTC);
      expect(ColorTC.List.getTypeName()).toBe('[Color]');
      expect(ColorTC.NonNull).toBeInstanceOf(NonNullComposer);
      expect(ColorTC.NonNull.ofType).toBe(ColorTC);
      expect(ColorTC.NonNull.getTypeName()).toBe('Color!');
      expect(ColorTC.NonNull.List).toBeInstanceOf(ListComposer);
      expect(ColorTC.NonNull.List.getTypeName()).toBe('[Color!]');
      expect(ColorTC.NonNull.List.NonNull).toBeInstanceOf(NonNullComposer);
      expect(ColorTC.NonNull.List.NonNull.getTypeName()).toBe('[Color!]!');
    });
  });
  describe('clone()', () => {
    it('should clone type', () => {
      const stc2 = stc.clone('ClonedScalar');
      expect(stc2.getTypeName()).toEqual('ClonedScalar');
      expect(stc.getType()).not.toBe(stc2.getType());
      expect(() => {
        const wrongArgs = [];
        stc.clone(...wrongArgs);
      }).toThrowError(/You should provide newTypeName/);
    });
  });
  describe('cloneTo()', () => {
    it('scalar types must be the same', () => {
      const sc2 = new SchemaComposer();
      const cloned = stc.cloneTo(sc2);
      expect(stc).toBe(cloned);
      expect(stc.getTypeName()).toEqual(cloned.getTypeName());
      expect(stc.getType()).toBe(cloned.getType());
      expect(sc2.getSTC(stc.getTypeName())).toBe(stc);
    });
  });
  describe('directive methods', () => {
    it('type level directive methods', () => {
      const tc1 = schemaComposer.createScalarTC(`
        scalar My1 @d0(a: false) @d1(b: "3") @d0(a: true)
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
      const tc1 = schemaComposer.createScalarTC(`
        scalar My1 @d1(b: "3")
      `);
      expect(tc1.toSDL()).toBe(dedent`
        scalar My1 @d1(b: "3")
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
        scalar My1 @d0(a: false) @d1(b: "3") @d0(a: true)
      `);
    });

    if (graphqlVersion >= 15.1) {
      it('check specifiedByUrl', () => {
        const scalar1 = schemaComposer.createScalarTC(`scalar S @specifiedBy(url: "https://example.com/foo_spec")`);
        expect(scalar1.getSpecifiedByUrl()).toEqual('https://example.com/foo_spec');
        scalar1.setSpecifiedByUrl('other_url');
        expect(scalar1.getSpecifiedByUrl()).toEqual('other_url');
        expect(scalar1.toSDL()).toBe('scalar S @specifiedBy(url: "other_url")');
      });
    }
  });
  describe('merge()', () => {
    it('should merge with GraphQLScalarType', () => {
      const scalar1 = schemaComposer.createScalarTC(`UInt`);
      const scalar2 = new GraphQLScalarType({
        name: 'UInt2',

        serialize() {
          return 'noop';
        }

      });
      scalar1.merge(scalar2);
      expect(scalar1.getSerialize()()).toEqual('noop');
    });
    it('should merge with ScalarTypeComposer', () => {
      const scalar1 = schemaComposer.createScalarTC(`UInt`);
      const sc2 = new SchemaComposer();
      const scalar2 = sc2.createScalarTC(`UInt2`);
      scalar2.setSerialize(() => 'ok');
      scalar1.merge(scalar2);
      expect(scalar1.getSerialize()()).toEqual('ok');
    });
    it('should throw error on wrong type', () => {
      const scalar1 = schemaComposer.createScalarTC(`UInt`);
      expect(() => scalar1.merge(schemaComposer.createObjectTC('Scalar'))).toThrow('Cannot merge ObjectTypeComposer');
    });
  });
  describe('misc methods', () => {
    it('toSDL()', () => {
      const t = schemaComposer.createScalarTC(`
        """desc1"""
        scalar UInt
      `);
      expect(t.toSDL()).toBe(dedent`
        """desc1"""
        scalar UInt
      `);
      expect(t.toSDL({
        omitDescriptions: true
      })).toBe(`scalar UInt`);
    });
  });
});