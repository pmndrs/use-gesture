"use strict";

var _2 = require("..");

var _EnumTypeComposer = require("../EnumTypeComposer");

var _NonNullComposer = require("../NonNullComposer");

var _ListComposer = require("../ListComposer");

var _graphql = require("../graphql");

var _graphqlVersion = require("../utils/graphqlVersion");

var _dedent = require("../utils/dedent");

beforeEach(() => {
  _2.schemaComposer.clear();
});
describe('EnumTypeComposer', () => {
  let etc;
  beforeEach(() => {
    const enumType = new _graphql.GraphQLEnumType({
      name: 'MyEnum',
      values: {
        KEY1: {
          value: 'VAL1'
        },
        KEY2: {
          value: 'VAL2'
        }
      }
    });
    etc = new _EnumTypeComposer.EnumTypeComposer(enumType, _2.schemaComposer);
  });
  describe('values manipulation', () => {
    it('getFields()', () => {
      const fieldNames = Object.keys(etc.getFields());
      expect(fieldNames).toEqual(expect.arrayContaining(['KEY1', 'KEY2']));
    });

    if (_graphqlVersion.graphqlVersion >= 13) {
      it('getFields() from empty Enum', () => {
        const etc2 = _EnumTypeComposer.EnumTypeComposer.create('SomeType', _2.schemaComposer);

        expect(etc2.getFields()).toEqual({});
      });
    }

    describe('getField()', () => {
      it('should return value config', () => {
        expect(etc.getField('KEY1').value).toBe('VAL1');
      });
      it('should throw error if value does not exist', () => {
        expect(() => etc.getField('missing')).toThrowError(/Cannot get value.*does not exist/);
      });
    });
    describe('setFields()', () => {
      it('should set fields with standard config', () => {
        etc.setFields({
          VAL3: {
            value: 'VAL3',
            description: 'Added value'
          }
        });
        expect(etc.getType().getValue('VAL1')).toBeUndefined();
        expect(etc.getType().getValue('VAL2')).toBeUndefined();
        const valueConfig = etc.getType().getValue('VAL3');
        expect(valueConfig.value).toBe('VAL3');
        expect(valueConfig.description).toBe('Added value');
      });
    });
    it('addFields()', () => {
      etc.addFields({
        KEY3: {},
        KEY4: {
          value: 'VAL4',
          description: 'KEY4 description'
        }
      });
      expect(etc.getType().getValue('KEY1')).toBeDefined();
      expect(etc.getType().getValue('KEY2')).toBeDefined();
      expect(etc.getType().getValue('KEY3')).toBeDefined();
      const valueConfig = etc.getType().getValue('KEY4');
      expect(valueConfig.value).toBe('VAL4');
      expect(valueConfig.description).toBe('KEY4 description');
    });
    describe('removeField()', () => {
      it('should remove one field', () => {
        etc.removeField('KEY1');
        expect(etc.getFieldNames()).toEqual(expect.arrayContaining(['KEY2']));
      });
      it('should remove list of fields', () => {
        etc.removeField(['KEY1', 'KEY2']);
        expect(etc.getFieldNames()).toEqual([]);
      });
    });
    describe('removeOtherFields()', () => {
      it('should remove one field', () => {
        etc.removeOtherFields('KEY1');
        expect(etc.getFieldNames()).toEqual(['KEY1']);
      });
      it('should remove list of fields', () => {
        etc.setField('KEY3', {});
        expect(etc.getFieldNames()).toEqual(expect.arrayContaining(['KEY3']));
        etc.removeOtherFields(['KEY1', 'KEY2']);
        expect(etc.getFieldNames()).toEqual(['KEY1', 'KEY2']);
      });
    });
    describe('reorderFields()', () => {
      it('should change fields order', () => {
        etc.setFields({
          f1: {},
          f2: {},
          f3: {}
        });
        expect(etc.getFieldNames().join(',')).toBe('f1,f2,f3');
        etc.reorderFields(['f3', 'f2', 'f1']);
        expect(etc.getFieldNames().join(',')).toBe('f3,f2,f1');
      });
      it('should append not listed fields', () => {
        etc.setFields({
          f1: {},
          f2: {},
          f3: {}
        });
        expect(etc.getFieldNames().join(',')).toBe('f1,f2,f3');
        etc.reorderFields(['f3']);
        expect(etc.getFieldNames().join(',')).toBe('f3,f1,f2');
      });
      it('should skip non existed fields', () => {
        etc.setFields({
          f1: {},
          f2: {},
          f3: {}
        });
        expect(etc.getFieldNames().join(',')).toBe('f1,f2,f3');
        etc.reorderFields(['f22', 'f3', 'f55', 'f1', 'f2']);
        expect(etc.getFieldNames().join(',')).toBe('f3,f1,f2');
      });
    });
    describe('extendField()', () => {
      it('should extend existed fields', () => {
        etc.setField('VAL3', {});
        etc.extendField('VAL3', {
          description: 'this is field #3'
        });
        expect(etc.getField('VAL3').value).toBe('VAL3');
        expect(etc.getField('VAL3').description).toBe('this is field #3');
        etc.extendField('VAL3', {
          deprecationReason: 'Do not use'
        });
        expect(etc.getField('VAL3').deprecationReason).toBe('Do not use');
      });
      it('should throw error if field does not exists', () => {
        expect(() => etc.extendField('missing', {
          description: '123'
        })).toThrow(/Cannot extend value.*Value does not exist/);
      });
    });
  });
  describe('create() [static method]', () => {
    if (_graphqlVersion.graphqlVersion >= 13) {
      it('should create ETC by typeName as a string', () => {
        const myTC = _EnumTypeComposer.EnumTypeComposer.create('TypeStub', _2.schemaComposer);

        expect(myTC).toBeInstanceOf(_EnumTypeComposer.EnumTypeComposer);
        expect(myTC.getType()).toBeInstanceOf(_graphql.GraphQLEnumType);
        expect(myTC.getFields()).toEqual({});
      });
    }

    it('should create ETC by type template string', () => {
      const myTC = _EnumTypeComposer.EnumTypeComposer.create('enum SDLEnum { V1 V2 V3 }', _2.schemaComposer);

      expect(myTC).toBeInstanceOf(_EnumTypeComposer.EnumTypeComposer);
      expect(myTC.getTypeName()).toBe('SDLEnum');
      expect(myTC.getFieldNames()).toEqual(['V1', 'V2', 'V3']);
    });
    it('should create ETC by GraphQLEnumTypeConfig', () => {
      const myTC = _EnumTypeComposer.EnumTypeComposer.create({
        name: 'TestType',
        values: {
          v1: {},
          v2: {}
        }
      }, _2.schemaComposer);

      expect(myTC).toBeInstanceOf(_EnumTypeComposer.EnumTypeComposer);
      expect(myTC.getTypeName()).toBe('TestType');
      expect(myTC.getFieldNames()).toEqual(['v1', 'v2']);
    });
    it('should create TC by GraphQLEnumType', () => {
      const objType = new _graphql.GraphQLEnumType({
        name: 'TestTypeObj',
        values: {
          v1: {},
          v2: {}
        }
      });

      const myTC = _EnumTypeComposer.EnumTypeComposer.create(objType, _2.schemaComposer);

      expect(myTC).toBeInstanceOf(_EnumTypeComposer.EnumTypeComposer);
      expect(myTC.getType()).toBe(objType);
      expect(myTC.getFieldNames()).toEqual(['v1', 'v2']);
    });
    it('should create TC without values from string', () => {
      const myTC = _EnumTypeComposer.EnumTypeComposer.create('MyEnum123', _2.schemaComposer);

      expect(myTC.getFieldNames()).toEqual([]);
    });
    it('should create type and store it in schemaComposer', () => {
      const SomeUserETC = _EnumTypeComposer.EnumTypeComposer.create('SomeUserEnum', _2.schemaComposer);

      expect(_2.schemaComposer.getETC('SomeUserEnum')).toBe(SomeUserETC);
    });
    it('createTemp() should not store type in schemaComposer', () => {
      _EnumTypeComposer.EnumTypeComposer.createTemp('SomeUserEnum');

      expect(_2.schemaComposer.has('SomeUserEnum')).toBeFalsy();
    });
  });
  describe('type methods', () => {
    it('getType()', () => {
      expect(etc.getType()).toBeInstanceOf(_graphql.GraphQLEnumType);
    });
    it('getTypeName()', () => {
      expect(etc.getTypeName()).toBe('MyEnum');
    });
    it('setTypeName()', () => {
      expect(etc.getTypeName()).toBe('MyEnum');
      etc.setTypeName('OtherName');
      expect(etc.getTypeName()).toBe('OtherName');
    });
    it('getTypePlural() should return wrapped type with GraphQLList', () => {
      expect(etc.getTypePlural()).toBeInstanceOf(_ListComposer.ListComposer);
      expect(etc.getTypePlural().ofType).toBe(etc);
    });
    it('getTypeNonNull() should return wrapped type with GraphQLNonNull', () => {
      expect(etc.getTypeNonNull()).toBeInstanceOf(_NonNullComposer.NonNullComposer);
      expect(etc.getTypeNonNull().ofType).toBe(etc);
    });
    it('check getters List, NonNull', () => {
      const ColorTC = _2.schemaComposer.createEnumTC(`enum Color { RED GREEN }`);

      expect(ColorTC.List).toBeInstanceOf(_ListComposer.ListComposer);
      expect(ColorTC.List.ofType).toBe(ColorTC);
      expect(ColorTC.List.getTypeName()).toBe('[Color]');
      expect(ColorTC.NonNull).toBeInstanceOf(_NonNullComposer.NonNullComposer);
      expect(ColorTC.NonNull.ofType).toBe(ColorTC);
      expect(ColorTC.NonNull.getTypeName()).toBe('Color!');
      expect(ColorTC.NonNull.List).toBeInstanceOf(_ListComposer.ListComposer);
      expect(ColorTC.NonNull.List.getTypeName()).toBe('[Color!]');
      expect(ColorTC.NonNull.List.NonNull).toBeInstanceOf(_NonNullComposer.NonNullComposer);
      expect(ColorTC.NonNull.List.NonNull.getTypeName()).toBe('[Color!]!');
    });
  });
  describe('deprecateFields()', () => {
    it('should accept string', () => {
      etc.setFields({
        f1: {},
        f2: {},
        f3: {}
      });
      etc.deprecateFields('f1');
      expect(etc.getField('f1').deprecationReason).toBe('deprecated');
      expect(etc.getField('f2').deprecationReason).toBeUndefined();
      expect(etc.getField('f3').deprecationReason).toBeUndefined();
    });
    it('should accept array of string', () => {
      etc.setFields({
        f1: {},
        f2: {},
        f3: {}
      });
      etc.deprecateFields(['f1', 'f2']);
      expect(etc.getField('f1').deprecationReason).toBe('deprecated');
      expect(etc.getField('f2').deprecationReason).toBe('deprecated');
      expect(etc.getField('f3').deprecationReason).toBeUndefined();
    });
    it('should accept object with fields and reasons', () => {
      etc.setFields({
        f1: {},
        f2: {},
        f3: {}
      });
      etc.deprecateFields({
        f2: 'do not use',
        f3: 'old field'
      });
      expect(etc.getField('f1').deprecationReason).toBeUndefined();
      expect(etc.getField('f2').deprecationReason).toBe('do not use');
      expect(etc.getField('f3').deprecationReason).toBe('old field');
    });
    it('should throw error on non-existent field', () => {
      etc.setFields({
        f1: {},
        f2: {},
        f3: {}
      });
      expect(() => {
        etc.deprecateFields('missing');
      }).toThrowError(/Cannot deprecate non-existent value/);
      expect(() => {
        etc.deprecateFields(['missing']);
      }).toThrowError(/Cannot deprecate non-existent value/);
      expect(() => {
        etc.deprecateFields({
          missing: 'Deprecate reason'
        });
      }).toThrowError(/Cannot deprecate non-existent value/);
    });
  });
  describe('clone()', () => {
    it('should clone type', () => {
      const cloned = etc.clone('ClonedEnum');
      expect(etc).not.toBe(cloned);
      expect(cloned.getTypeName()).toEqual('ClonedEnum');
      expect(etc.getType()).not.toBe(cloned.getType());
      expect(etc.getField('KEY1')).not.toBe(cloned.getField('KEY1'));
      expect(() => {
        const wrongArgs = [];
        etc.clone(...wrongArgs);
      }).toThrowError(/You should provide newTypeName/);
    });
  });
  describe('cloneTo()', () => {
    it('should clone type to another Schema', () => {
      const sc2 = new _2.SchemaComposer();
      const cloned = etc.cloneTo(sc2);
      expect(etc.getTypeName()).toEqual(cloned.getTypeName());
      expect(etc).not.toBe(cloned);
      expect(etc.getType()).not.toBe(cloned.getType());
      expect(etc.getField('KEY1')).not.toBe(cloned.getField('KEY1'));
      expect(sc2.getETC(etc.getTypeName())).not.toBe(etc);
    });
  });
  describe('directive methods', () => {
    it('type level directive methods', () => {
      const tc1 = _2.schemaComposer.createEnumTC(`
        enum My1 @d0(a: false) @d1(b: "3") @d0(a: true) { 
          AAA
        }`);

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
    it('field level directive methods', () => {
      const tc1 = _2.schemaComposer.createEnumTC(`
        enum My1 { 
          AAA @f0(a: false) @f1(b: "3") @f0(a: true)
        }`);

      expect(tc1.getFieldDirectives('AAA')).toEqual([{
        args: {
          a: false
        },
        name: 'f0'
      }, {
        args: {
          b: '3'
        },
        name: 'f1'
      }, {
        args: {
          a: true
        },
        name: 'f0'
      }]);
      expect(tc1.getFieldDirectiveNames('AAA')).toEqual(['f0', 'f1', 'f0']);
      expect(tc1.getFieldDirectiveByName('AAA', 'f0')).toEqual({
        a: false
      });
      expect(tc1.getFieldDirectiveById('AAA', 0)).toEqual({
        a: false
      });
      expect(tc1.getFieldDirectiveByName('AAA', 'f1')).toEqual({
        b: '3'
      });
      expect(tc1.getFieldDirectiveById('AAA', 1)).toEqual({
        b: '3'
      });
      expect(tc1.getFieldDirectiveByName('AAA', 'f2')).toEqual(undefined);
      expect(tc1.getFieldDirectiveById('AAA', 333)).toEqual(undefined);
    });
    it('check directive set-methods', () => {
      const tc1 = _2.schemaComposer.createEnumTC(`
        enum My1 @d0(a: true) {
          AAA @f0(a: false) @f1(b: "3") @f0(a: true)
        }
      `);

      expect(tc1.toSDL()).toBe((0, _dedent.dedent)`
        enum My1 @d0(a: true) {
          AAA @f0(a: false) @f1(b: "3") @f0(a: true)
        }
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
      tc1.setFieldDirectives('AAA', [{
        args: {
          b: '6'
        },
        name: 'd1'
      }]);
      expect(tc1.toSDL()).toBe((0, _dedent.dedent)`
        enum My1 @d0(a: false) @d1(b: "3") @d0(a: true) {
          AAA @d1(b: "6")
        }
      `);
    });
  });
  describe('merge()', () => {
    it('should merge with GraphQLEnumType', () => {
      const sortETC = _2.schemaComposer.createEnumTC(`enum Sort { ID_ASC ID_DESC }`);

      const sort2 = new _graphql.GraphQLEnumType({
        name: 'Sort2',
        values: {
          NAME_ASC: {
            value: 'name ASC'
          },
          NAME_DESC: {
            value: 'name DESC'
          },
          ID_DESC: {
            value: 'id DESC'
          }
        }
      });
      sortETC.merge(sort2);
      expect(sortETC.getFieldNames()).toEqual(['ID_ASC', 'ID_DESC', 'NAME_ASC', 'NAME_DESC']);
      expect(sortETC.getField('NAME_ASC').value).toEqual('name ASC');
      expect(sortETC.getField('ID_DESC').value).toEqual('id DESC');
    });
    it('should merge with EnumTypeComposer', () => {
      const sortETC = _2.schemaComposer.createEnumTC(`enum Sort { ID_ASC ID_DESC }`);

      const sc2 = new _2.SchemaComposer();
      const sort2 = sc2.createEnumTC(`enum Sort2 { NAME_ASC NAME_DESC ID_DESC }`);
      sortETC.merge(sort2);
      expect(sortETC.getFieldNames()).toEqual(['ID_ASC', 'ID_DESC', 'NAME_ASC', 'NAME_DESC']);
    });
    it('should throw error on wrong type', () => {
      const sortETC = _2.schemaComposer.createEnumTC(`enum Sort { ID_ASC ID_DESC }`);

      expect(() => sortETC.merge(_2.schemaComposer.createScalarTC('Scalar'))).toThrow('Cannot merge ScalarTypeComposer');
    });
  });
  describe('graphql query tests', () => {
    it('should provide correct value to resolver args', async () => {
      var _res$data;

      let serverValue;

      _2.schemaComposer.Query.addFields({
        test: {
          type: etc,
          args: {
            a: etc
          },
          resolve: (_, args) => {
            serverValue = args.a;
            return args.a;
          }
        }
      });

      const schema = _2.schemaComposer.buildSchema();

      const res = await (0, _graphql.graphql)({
        schema,
        source: '{ test(a: KEY1) }'
      }); // test server value

      expect(serverValue).toBe('VAL1'); // test returned client KEY

      expect((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.test).toEqual('KEY1');
    });
  });
  describe('misc methods', () => {
    it('toSDL()', () => {
      const t = _2.schemaComposer.createEnumTC(`
        """desc1"""
        enum Sort { 
          """desc2"""
          ASC
          DESC
        }
      `);

      expect(t.toSDL()).toEqual((0, _dedent.dedent)`
        """desc1"""
        enum Sort {
          """desc2"""
          ASC
          DESC
        }
      `);
      expect(t.toSDL({
        omitDescriptions: true
      })).toEqual((0, _dedent.dedent)`
        enum Sort {
          ASC
          DESC
        }
      `);
    });
  });
});