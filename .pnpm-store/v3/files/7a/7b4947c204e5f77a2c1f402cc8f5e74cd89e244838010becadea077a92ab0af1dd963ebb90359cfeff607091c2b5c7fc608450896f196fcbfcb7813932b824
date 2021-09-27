import { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLFloat, GraphQLBoolean, GraphQLInterfaceType, GraphQLInputObjectType, GraphQLObjectType, graphql } from '../graphql';
import { schemaComposer, SchemaComposer } from '..';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { InputTypeComposer } from '../InputTypeComposer';
import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { ScalarTypeComposer } from '../ScalarTypeComposer';
import { EnumTypeComposer } from '../EnumTypeComposer';
import { UnionTypeComposer } from '../UnionTypeComposer';
import { NonNullComposer } from '../NonNullComposer';
import { ListComposer } from '../ListComposer';
import { ThunkComposer } from '../ThunkComposer';
import { graphqlVersion } from '../utils/graphqlVersion';
import { dedent } from '../utils/dedent';
beforeEach(() => {
  schemaComposer.clear();
});
describe('InterfaceTypeComposer', () => {
  let objectType;
  let iftc;
  beforeEach(() => {
    objectType = new GraphQLInterfaceType({
      name: 'Readable',
      fields: {
        field1: {
          type: GraphQLString
        },
        field2: {
          type: GraphQLString
        }
      }
    });
    iftc = new InterfaceTypeComposer(objectType, schemaComposer);
  });
  describe('fields manipulation', () => {
    it('getFields()', () => {
      const fieldNames = Object.keys(iftc.getFields());
      expect(fieldNames).toEqual(expect.arrayContaining(['field1', 'field2']));
      const iftc2 = schemaComposer.createInterfaceTC('SomeType');
      expect(iftc2.getFields()).toEqual({});
    });
    describe('getField()', () => {
      it('should return field config', () => {
        expect(iftc.getFieldType('field1')).toBe(GraphQLString);
      });
      it('should throw error if field does not exist', () => {
        expect(() => iftc.getField('missing')).toThrowError(/Cannot get field.*does not exist/);
      });
    });
    describe('setFields()', () => {
      it('should add field with standard config', () => {
        iftc.setFields({
          field3: {
            type: GraphQLString
          }
        });
        const fields = iftc.getType().getFields();
        expect(Object.keys(fields)).toContain('field3');
        expect(fields.field3.type).toBe(GraphQLString);
      });
      it('should add fields with converting types from string to object', () => {
        iftc.setFields({
          field3: {
            type: 'String'
          },
          field4: {
            type: '[Int]'
          },
          field5: 'Boolean!'
        });
        expect(iftc.getFieldType('field3')).toBe(GraphQLString);
        expect(iftc.getFieldType('field4')).toBeInstanceOf(GraphQLList);
        expect(iftc.getFieldType('field4').ofType).toBe(GraphQLInt);
        expect(iftc.getFieldType('field5')).toBeInstanceOf(GraphQLNonNull);
        expect(iftc.getFieldType('field5').ofType).toBe(GraphQLBoolean);
      });
      it('should add fields with converting args types from string to object', () => {
        iftc.setFields({
          field3: {
            type: 'String',
            args: {
              arg1: {
                type: 'String!'
              },
              arg2: '[Float]',
              arg3: sc => {
                expect(sc).toBeInstanceOf(SchemaComposer);
                return 'String';
              }
            }
          }
        });
        expect(iftc.getFieldArgType('field3', 'arg1')).toBeInstanceOf(GraphQLNonNull);
        expect(iftc.getFieldArgType('field3', 'arg1').ofType).toBe(GraphQLString);
        expect(iftc.getFieldArgType('field3', 'arg2')).toBeInstanceOf(GraphQLList);
        expect(iftc.getFieldArgType('field3', 'arg2').ofType).toBe(GraphQLFloat);
        expect(iftc.getFieldArgTypeName('field3', 'arg1')).toBe('String!');
        expect(iftc.getFieldArgTypeName('field3', 'arg2')).toBe('[Float]');
        expect(iftc.getFieldArgTypeName('field3', 'arg3')).toBe('String');
      });
      it('should add projection via `setField` and `addFields`', () => {
        iftc.setFields({
          field3: {
            type: GraphQLString,
            projection: {
              field1: true,
              field2: true
            }
          },
          field4: {
            type: GraphQLString
          },
          field5: {
            type: GraphQLString,
            projection: {
              field4: true
            }
          }
        });
      });
      it('accept types as function', () => {
        const typeAsFn = sc => {
          expect(sc).toBeInstanceOf(SchemaComposer);
          return GraphQLString;
        };

        iftc.setFields({
          field6: {
            type: typeAsFn
          }
        });
        expect(iftc.getField('field6').type).toBeInstanceOf(ThunkComposer);
        expect(iftc.getFieldType('field6')).toBe(GraphQLString); // show provide unwrapped/unhoisted type for graphql

        if (graphqlVersion >= 14) {
          expect(iftc.getType()._fields().field6.type).toBe(GraphQLString);
        } else {
          expect(iftc.getType()._typeConfig.fields().field6.type).toBe(GraphQLString);
        }
      });
      it('accept fieldConfig as function', () => {
        iftc.setFields({
          input4: sc => {
            expect(sc).toBeInstanceOf(SchemaComposer);
            return {
              type: 'String'
            };
          }
        }); // show provide unwrapped/unhoisted type for graphql

        if (graphqlVersion >= 14) {
          expect(iftc.getType()._fields().input4.type).toBe(GraphQLString);
        } else {
          expect(iftc.getType()._typeConfig.fields().input4.type).toBe(GraphQLString);
        }
      });
    });
    it('addFields()', () => {
      iftc.addFields({
        field3: {
          type: GraphQLString
        },
        field4: {
          type: '[Int]'
        },
        field5: 'Boolean!'
      });
      expect(iftc.getFieldType('field3')).toBe(GraphQLString);
      expect(iftc.getFieldType('field4')).toBeInstanceOf(GraphQLList);
      expect(iftc.getFieldType('field4').ofType).toBe(GraphQLInt);
      expect(iftc.getFieldType('field5')).toBeInstanceOf(GraphQLNonNull);
      expect(iftc.getFieldType('field5').ofType).toBe(GraphQLBoolean);
      expect(iftc.getFieldTypeName('field3')).toBe('String');
      expect(iftc.getFieldTypeName('field4')).toBe('[Int]');
      expect(iftc.getFieldTypeName('field5')).toBe('Boolean!');
    });
    describe('removeField()', () => {
      it('should remove one field', () => {
        iftc.removeField('field1');
        expect(iftc.getFieldNames()).toEqual(expect.arrayContaining(['field2']));
      });
      it('should remove list of fields', () => {
        iftc.removeField(['field1', 'field2']);
        expect(iftc.getFieldNames()).toEqual(expect.arrayContaining([]));
      });
      it('should remove field via dot-notation', () => {
        schemaComposer.addTypeDefs(`
          interface IFace {
            field1: [SubType!]
            field2: Int
            field3: Int
          }
          
          type SubType {
            subField1: SubSubType
            subField2: Int
            subField3: Int
          }

          type SubSubType {
            subSubField1: Int
            subSubField2: Int
          }
        `);
        schemaComposer.getIFTC('IFace').removeField(['field1.subField1.subSubField1', 'field1.subField1.nonexistent', 'field1.nonexistent.nonexistent', 'field1.subField3', 'field2', '', '..']);
        expect(schemaComposer.getIFTC('IFace').toSDL({
          deep: true,
          omitDescriptions: true
        })).toEqual(dedent`
          interface IFace {
            field1: [SubType!]
            field3: Int
          }

          type SubType {
            subField1: SubSubType
            subField2: Int
          }

          type SubSubType {
            subSubField2: Int
          }

          scalar Int
        `);
      });
    });
    describe('removeOtherFields()', () => {
      it('should remove one field', () => {
        iftc.removeOtherFields('field1');
        expect(iftc.getFieldNames()).not.toEqual(expect.arrayContaining(['field2']));
        expect(iftc.getFieldNames()).toEqual(expect.arrayContaining(['field1']));
      });
      it('should remove list of fields', () => {
        iftc.setField('field3', 'String');
        iftc.removeOtherFields(['field1', 'field2']);
        expect(iftc.getFieldNames()).toEqual(expect.arrayContaining(['field1', 'field2']));
        expect(iftc.getFieldNames()).not.toEqual(expect.arrayContaining(['field3']));
      });
    });
    describe('reorderFields()', () => {
      it('should change fields order', () => {
        iftc.setFields({
          f1: 'Int',
          f2: 'Int',
          f3: 'Int'
        });
        expect(iftc.getFieldNames().join(',')).toBe('f1,f2,f3');
        iftc.reorderFields(['f3', 'f2', 'f1']);
        expect(iftc.getFieldNames().join(',')).toBe('f3,f2,f1');
      });
      it('should append not listed fields', () => {
        iftc.setFields({
          f1: 'Int',
          f2: 'Int',
          f3: 'Int'
        });
        expect(iftc.getFieldNames().join(',')).toBe('f1,f2,f3');
        iftc.reorderFields(['f3']);
        expect(iftc.getFieldNames().join(',')).toBe('f3,f1,f2');
      });
      it('should skip non existed fields', () => {
        iftc.setFields({
          f1: 'Int',
          f2: 'Int',
          f3: 'Int'
        });
        expect(iftc.getFieldNames().join(',')).toBe('f1,f2,f3');
        iftc.reorderFields(['f22', 'f3', 'f55', 'f1', 'f2']);
        expect(iftc.getFieldNames().join(',')).toBe('f3,f1,f2');
      });
    });
    describe('field arguments', () => {
      beforeEach(() => {
        iftc.extendField('field1', {
          args: {
            arg1: 'Int',
            arg2: 'String'
          }
        });
      });
      it('getFieldArgs()', () => {
        const args = iftc.getFieldArgs('field1');
        expect(Object.keys(args)).toEqual(['arg1', 'arg2']);
        expect(args.arg1.type.getType()).toBe(GraphQLInt);
        expect(iftc.getFieldArgType('field1', 'arg1')).toBe(GraphQLInt);
        expect(() => iftc.getFieldArgs('missingField')).toThrow();
      });
      it('hasFieldArg()', () => {
        expect(iftc.hasFieldArg('field1', 'arg1')).toBeTruthy();
        expect(iftc.hasFieldArg('field1', 'arg222')).toBeFalsy();
        expect(iftc.hasFieldArg('missingField', 'arg1')).toBeFalsy();
      });
      it('getFieldArg()', () => {
        expect(iftc.getFieldArg('field1', 'arg1')).toBeTruthy();
        expect(() => iftc.getFieldArg('field1', 'arg222')).toThrow(/Argument does not exist/);
        expect(iftc.hasFieldArg('missingField', 'arg1')).toBeFalsy();
      });
      it('getFieldArgTC()', () => {
        iftc.setField('fieldWithArgs', {
          type: 'Int',
          args: {
            scalarArg: '[Int]',
            complexArg: `input SomeInput { a: Int, b: Int }`
          }
        });
        expect(iftc.getFieldArgTC('fieldWithArgs', 'scalarArg')).toBeInstanceOf(ScalarTypeComposer);
        const argTC = iftc.getFieldArgTC('fieldWithArgs', 'complexArg');
        expect(argTC).toBeInstanceOf(InputTypeComposer); // should return the same TC instance

        expect(iftc.getFieldArgITC('fieldWithArgs', 'complexArg')).toBe(argTC);
        expect(() => iftc.getFieldArgITC('fieldWithArgs', 'scalarArg')).toThrow('must be InputTypeComposer');
      });
    });
    describe('extendField()', () => {
      it('should extend existed fields', () => {
        iftc.setField('field3', {
          type: GraphQLString,
          projection: {
            field1: true,
            field2: true
          }
        });
        iftc.extendField('field3', {
          description: 'this is field #3'
        });
        expect(iftc.getFieldConfig('field3').type).toBe(GraphQLString);
        expect(iftc.getFieldConfig('field3').description).toBe('this is field #3');
        iftc.extendField('field3', {
          type: 'Int'
        });
        expect(iftc.getFieldType('field3')).toBe(GraphQLInt);
      });
      it('should extend field extensions', () => {
        iftc.setField('field3', {
          type: GraphQLString,
          extensions: {
            first: true
          }
        });
        iftc.extendField('field3', {
          description: 'this is field #3',
          extensions: {
            second: true
          }
        }); // $FlowFixMe

        expect(iftc.getFieldConfig('field3').extensions).toEqual({
          first: true,
          second: true
        });
      });
      it('should work with fieldConfig as string', () => {
        iftc.setField('field4', 'String');
        iftc.extendField('field4', {
          description: 'this is field #4'
        });
        expect(iftc.getFieldConfig('field4').type).toBe(GraphQLString);
        expect(iftc.getFieldConfig('field4').description).toBe('this is field #4');
      });
      it('should throw error if field does not exists', () => {
        expect(() => iftc.extendField('missing', {
          description: '123'
        })).toThrow(/Cannot extend field.*Field does not exist/);
      });
    });
    it('isFieldNonNull()', () => {
      iftc.setField('fieldNN', 'String');
      expect(iftc.isFieldNonNull('fieldNN')).toBe(false);
      iftc.setField('fieldNN', 'String!');
      expect(iftc.isFieldNonNull('fieldNN')).toBe(true);
    });
    it('makeFieldNonNull()', () => {
      iftc.setField('fieldNN', 'String');
      expect(iftc.getFieldType('fieldNN')).toBe(GraphQLString); // should wrap with GraphQLNonNull

      iftc.makeFieldNonNull('fieldNN');
      expect(iftc.getFieldType('fieldNN')).toBeInstanceOf(GraphQLNonNull);
      expect(iftc.getFieldType('fieldNN').ofType).toBe(GraphQLString); // should not wrap twice

      iftc.makeFieldNonNull('fieldNN');
      expect(iftc.getFieldType('fieldNN')).toBeInstanceOf(GraphQLNonNull);
      expect(iftc.getFieldType('fieldNN').ofType).toBe(GraphQLString);
    });
    it('makeFieldNullable()', () => {
      iftc.setField('fieldNN', 'String!');
      expect(iftc.getFieldType('fieldNN')).toBeInstanceOf(GraphQLNonNull);
      expect(iftc.getFieldType('fieldNN').ofType).toBe(GraphQLString); // should unwrap GraphQLNonNull

      iftc.makeFieldNullable('fieldNN');
      expect(iftc.getFieldType('fieldNN')).toBe(GraphQLString); // should work for already unwrapped type

      iftc.makeFieldNullable('fieldNN');
      expect(iftc.getFieldType('fieldNN')).toBe(GraphQLString);
    });
    it('check field Plural methods, wrap/unwrap from ListComposer', () => {
      iftc.setFields({
        b1: {
          type: new GraphQLNonNull(GraphQLString)
        },
        b2: {
          type: '[String]'
        },
        b3: 'String!',
        b4: '[String!]!'
      });
      expect(iftc.isFieldPlural('b1')).toBe(false);
      expect(iftc.isFieldPlural('b2')).toBe(true);
      expect(iftc.isFieldPlural('b3')).toBe(false);
      expect(iftc.isFieldPlural('b4')).toBe(true);
      expect(iftc.isFieldNonNull('b1')).toBe(true);
      expect(iftc.isFieldNonNull('b2')).toBe(false);
      expect(iftc.isFieldNonNull('b3')).toBe(true);
      expect(iftc.isFieldNonNull('b4')).toBe(true);
      iftc.makeFieldPlural(['b1', 'b2', 'b3', 'missing']);
      expect(iftc.isFieldPlural('b1')).toBe(true);
      expect(iftc.isFieldPlural('b2')).toBe(true);
      expect(iftc.isFieldPlural('b3')).toBe(true);
      iftc.makeFieldNonNull('b2');
      expect(iftc.isFieldPlural('b2')).toBe(true);
      expect(iftc.isFieldNonNull('b2')).toBe(true);
      iftc.makeFieldNonPlural(['b2', 'b4', 'missing']);
      expect(iftc.isFieldPlural('b2')).toBe(false);
      expect(iftc.isFieldNonNull('b2')).toBe(true);
      expect(iftc.isFieldPlural('b4')).toBe(false);
      iftc.makeFieldNullable(['b2', 'b4', 'missing']);
      expect(iftc.isFieldNonNull('b2')).toBe(false);
      expect(iftc.isFieldNonNull('b4')).toBe(false);
    });
    it('check Plural methods, wrap/unwrap from ListComposer', () => {
      iftc.setFields({
        f: {
          type: 'Int',
          args: {
            b1: {
              type: new GraphQLNonNull(GraphQLString)
            },
            b2: {
              type: '[String]'
            },
            b3: 'String!',
            b4: '[String!]!'
          }
        }
      });
      expect(iftc.isFieldArgPlural('f', 'b1')).toBe(false);
      expect(iftc.isFieldArgPlural('f', 'b2')).toBe(true);
      expect(iftc.isFieldArgPlural('f', 'b3')).toBe(false);
      expect(iftc.isFieldArgPlural('f', 'b4')).toBe(true);
      expect(iftc.isFieldArgNonNull('f', 'b1')).toBe(true);
      expect(iftc.isFieldArgNonNull('f', 'b2')).toBe(false);
      expect(iftc.isFieldArgNonNull('f', 'b3')).toBe(true);
      expect(iftc.isFieldArgNonNull('f', 'b4')).toBe(true);
      iftc.makeFieldArgPlural('f', ['b1', 'b2', 'b3', 'missing']);
      expect(iftc.isFieldArgPlural('f', 'b1')).toBe(true);
      expect(iftc.isFieldArgPlural('f', 'b2')).toBe(true);
      expect(iftc.isFieldArgPlural('f', 'b3')).toBe(true);
      iftc.makeFieldArgNonNull('f', 'b2');
      expect(iftc.isFieldArgPlural('f', 'b2')).toBe(true);
      expect(iftc.isFieldArgNonNull('f', 'b2')).toBe(true);
      iftc.makeFieldArgNonPlural('f', ['b2', 'b4', 'missing']);
      expect(iftc.isFieldArgPlural('f', 'b2')).toBe(false);
      expect(iftc.isFieldArgNonNull('f', 'b2')).toBe(true);
      expect(iftc.isFieldArgPlural('f', 'b4')).toBe(false);
      iftc.makeFieldArgNullable('f', ['b2', 'b4', 'missing']);
      expect(iftc.isFieldArgNonNull('f', 'b2')).toBe(false);
      expect(iftc.isFieldArgNonNull('f', 'b4')).toBe(false);
    });
  });
  describe('interfaces manipulation', () => {
    if (graphqlVersion < 15) return;
    const iface = new GraphQLInterfaceType({
      name: 'Node',
      description: '',
      fields: () => ({
        id: {
          type: GraphQLInt
        }
      }),
      resolveType: () => {}
    });
    const iface2 = new GraphQLInterfaceType({
      name: 'Node2',
      description: '',
      fields: () => ({
        id: {
          type: GraphQLInt
        }
      }),
      resolveType: () => {}
    });
    const iface3 = InterfaceTypeComposer.create(`
        interface SimpleObject {
          id: Int
          name: String
        }
      `, schemaComposer);
    it('getInterfaces()', () => {
      const iftc1 = schemaComposer.createInterfaceTC(`
          interface MeAnother implements SimpleObject {
            id: Int
            name: String
          }
        `);
      expect(iftc1.getInterfaces()).toHaveLength(1);
      expect(iftc1.getInterfaces()[0].getTypeName()).toBe('SimpleObject');
    });
    it('hasInterface()', () => {
      const tc1 = schemaComposer.createObjectTC(`
          type MeAnother implements SimpleObject {
            id: Int
            name: String
          }
        `);
      expect(tc1.hasInterface('SimpleObject')).toBe(true);
    });
    it('hasInterface() should work by name or ITC', () => {
      const MyIface = new GraphQLInterfaceType({
        name: 'MyIface',
        description: '',
        fields: () => ({
          id: {
            type: GraphQLInt
          }
        }),
        resolveType: () => {}
      });
      iftc.addInterface(MyIface);
      expect(iftc.hasInterface('MyIface123')).toBeFalsy();
      expect(iftc.hasInterface('MyIface')).toBeTruthy();
      expect(iftc.hasInterface(MyIface)).toBeTruthy();
      expect(iftc.hasInterface(InterfaceTypeComposer.create(MyIface, schemaComposer))).toBeTruthy();
      iftc.addInterface(InterfaceTypeComposer.create('MyIface123', schemaComposer));
      expect(iftc.hasInterface('MyIface123')).toBeTruthy();
    });
    it('addInterface()', () => {
      iftc.addInterface(iface);
      expect(iftc.getInterfaces()).toHaveLength(1);
      expect(iftc.hasInterface(iface)).toBe(true);
      iftc.addInterface(iface2);
      expect(iftc.getInterfaces()).toHaveLength(2);
      expect(iftc.hasInterface(iface)).toBe(true);
      expect(iftc.hasInterface(iface2)).toBe(true);
      iftc.addInterface(s => {
        expect(s).toBeInstanceOf(SchemaComposer);
        return iftc;
      });
      expect(iftc.hasInterface(iftc)).toBe(true);
    });
    it('removeInterface()', () => {
      iftc.addInterface(iface);
      iftc.addInterface(iface2);
      iftc.addInterface(iftc);
      expect(iftc.getInterfaces()).toHaveLength(3);
      expect(iftc.hasInterface(iface)).toBe(true);
      expect(iftc.hasInterface(iftc)).toBe(true);
      expect(iftc.hasInterface(iface2)).toBe(true);
      iftc.removeInterface(iface);
      iftc.removeInterface(iftc);
      expect(iftc.hasInterface(iface)).toBe(false);
      expect(iftc.hasInterface(iftc)).toBe(false);
      expect(iftc.hasInterface(iface2)).toBe(true);
    });
    it('check proper interface definition in GraphQLType', () => {
      iftc.addInterface(iface);
      iftc.addInterface(iface2);
      iftc.addInterface(iface3);
      const gqType = iftc.getType();
      const ifaces = gqType.getInterfaces();
      expect(ifaces[0]).toBeInstanceOf(GraphQLInterfaceType);
      expect(ifaces[1]).toBeInstanceOf(GraphQLInterfaceType);
      expect(ifaces[2]).toBeInstanceOf(GraphQLInterfaceType);
      expect(ifaces[0].name).toBe('Node');
      expect(ifaces[1].name).toBe('Node2');
      expect(ifaces[2].name).toBe('SimpleObject');
    });
  });
  describe('create() [static method]', () => {
    it('should create Interface by typeName as a string', () => {
      const myIFTC = schemaComposer.createInterfaceTC('TypeStub');
      expect(myIFTC).toBeInstanceOf(InterfaceTypeComposer);
      expect(myIFTC.getType()).toBeInstanceOf(GraphQLInterfaceType);
      expect(myIFTC.getFields()).toEqual({});
    });
    it('should create Interface by type template string', () => {
      const myIFTC = schemaComposer.createInterfaceTC(`
        interface TestTypeTpl {
          f1: String
          # Description for some required Int field
          f2: Int!
        }
      `);
      expect(myIFTC).toBeInstanceOf(InterfaceTypeComposer);
      expect(myIFTC.getTypeName()).toBe('TestTypeTpl');
      expect(myIFTC.getFieldType('f1')).toBe(GraphQLString);
      expect(myIFTC.getFieldType('f2')).toBeInstanceOf(GraphQLNonNull);
      expect(myIFTC.getFieldType('f2').ofType).toBe(GraphQLInt);
    });
    it('should create TC by GraphQLInterfaceTypeConfig', () => {
      const myIFTC = schemaComposer.createInterfaceTC({
        name: 'TestType',
        fields: {
          f1: {
            type: 'String'
          },
          f2: 'Int!'
        }
      });
      expect(myIFTC).toBeInstanceOf(InterfaceTypeComposer);
      expect(myIFTC.getFieldType('f1')).toBe(GraphQLString);
      expect(myIFTC.getFieldType('f2')).toBeInstanceOf(GraphQLNonNull);
      expect(myIFTC.getFieldType('f2').ofType).toBe(GraphQLInt);
    });
    it('should create TC by ComposeInterfaceTypeConfig with non-existent types', () => {
      const myIFTC = schemaComposer.createInterfaceTC({
        name: 'TestType',
        fields: {
          f1: {
            type: 'Type1'
          },
          f2: 'Type2!'
        }
      });
      expect(myIFTC).toBeInstanceOf(InterfaceTypeComposer);
      expect(myIFTC.getField('f1').type.getTypeName()).toEqual('Type1');
      expect(myIFTC.getField('f2').type.getTypeName()).toEqual('Type2!');
    });
    it('should create TC by GraphQLInterfaceTypeConfig with fields as Thunk', () => {
      const myIFTC = schemaComposer.createInterfaceTC({
        name: 'TestType',
        fields: () => ({
          f1: {
            type: 'String'
          },
          f2: 'Int!'
        })
      });
      expect(myIFTC).toBeInstanceOf(InterfaceTypeComposer);
      expect(myIFTC.getFieldType('f1')).toBe(GraphQLString);
      expect(myIFTC.getFieldType('f2')).toBeInstanceOf(GraphQLNonNull);
      expect(myIFTC.getFieldType('f2').ofType).toBe(GraphQLInt);
    });
    it('should create TC by GraphQLInterfaceType', () => {
      const objType = new GraphQLInterfaceType({
        name: 'TestTypeObj',
        fields: {
          f1: {
            type: GraphQLString
          }
        }
      });
      const myIFTC = schemaComposer.createInterfaceTC(objType);
      expect(myIFTC).toBeInstanceOf(InterfaceTypeComposer);
      expect(myIFTC.getType()).toBe(objType);
      expect(myIFTC.getFieldType('f1')).toBe(GraphQLString);
    });
    it('should create type and store it in schemaComposer', () => {
      const SomeUserTC = schemaComposer.createInterfaceTC('SomeUser');
      expect(schemaComposer.getIFTC('SomeUser')).toBe(SomeUserTC);
    });
    it('createTemp() should not store type in schemaComposer', () => {
      InterfaceTypeComposer.createTemp('SomeUser');
      expect(schemaComposer.has('SomeUser')).toBeFalsy();
    });
  });
  describe('clone()', () => {
    it('should clone type', () => {
      const cloned = iftc.clone('NewObject');
      expect(cloned).not.toBe(iftc);
      expect(cloned.getTypeName()).toBe('NewObject');
    });
    it('field config should be different', () => {
      const cloned = iftc.clone('NewObject');
      cloned.setField('field4', 'String');
      expect(cloned.hasField('field4')).toBeTruthy();
      expect(iftc.hasField('field4')).toBeFalsy();
    });
    it('field args should be different', () => {
      iftc.setField('field3', {
        type: 'String',
        args: {
          a1: 'Int'
        }
      });
      const cloned = iftc.clone('NewObject');
      cloned.setFieldArg('field3', 'a2', 'String');
      expect(cloned.hasFieldArg('field3', 'a2')).toBeTruthy();
      expect(iftc.hasFieldArg('field3', 'a2')).toBeFalsy();
    });
    it('extensions should be different', () => {
      iftc.setExtension('ext1', 123);
      iftc.setFieldExtension('field1', 'ext2', 456);
      const cloned = iftc.clone('NewObject');
      expect(cloned.getExtension('ext1')).toBe(123);
      cloned.setExtension('ext1', 300);
      expect(cloned.getExtension('ext1')).toBe(300);
      expect(iftc.getExtension('ext1')).toBe(123);
      expect(cloned.getFieldExtension('field1', 'ext2')).toBe(456);
      cloned.setFieldExtension('field1', 'ext2', 600);
      expect(cloned.getFieldExtension('field1', 'ext2')).toBe(600);
      expect(iftc.getFieldExtension('field1', 'ext2')).toBe(456);
    });
    it('typeResolvers should be the same', () => {
      const UserTC = schemaComposer.createObjectTC(`type User { field1: String }`);
      iftc.addTypeResolver(UserTC, () => true);
      const cloned = iftc.clone('NewObject');
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
      const cloned = iftc.cloneTo(anotherSchemaComposer);
      expect(cloned).not.toBe(iftc);
      expect(cloned.getTypeName()).toBe(iftc.getTypeName());
    });
    it('should clone field complex type', () => {
      const ComplexTC = schemaComposer.createObjectTC(`type Complex { a: String }`);
      iftc.setField('field3', {
        type: ComplexTC,
        args: {
          a1: 'Int'
        }
      });
      const cloned = iftc.cloneTo(anotherSchemaComposer);
      const fc = cloned.getField('field3');
      expect(fc.type.getTypeName()).toBe('Complex');
      expect(fc.type).not.toBe(ComplexTC);
      expect(fc.type.getType()).not.toBe(ComplexTC.getType());
    });
    it('field config should be different', () => {
      const cloned = iftc.cloneTo(anotherSchemaComposer);
      cloned.setField('field4', 'String');
      expect(cloned.hasField('field4')).toBeTruthy();
      expect(iftc.hasField('field4')).toBeFalsy();
    });
    it('field args should be different', () => {
      const cloned = iftc.cloneTo(anotherSchemaComposer);
      cloned.setFieldArg('field1', 'a2', 'String');
      expect(cloned.hasFieldArg('field1', 'a2')).toBeTruthy();
      expect(iftc.hasFieldArg('field1', 'a2')).toBeFalsy();
    });
    it('extensions should be different', () => {
      iftc.setExtension('ext1', 123);
      iftc.setFieldExtension('field1', 'ext2', 456);
      const cloned = iftc.cloneTo(anotherSchemaComposer);
      expect(cloned.getExtension('ext1')).toBe(123);
      cloned.setExtension('ext1', 300);
      expect(cloned.getExtension('ext1')).toBe(300);
      expect(iftc.getExtension('ext1')).toBe(123);
      expect(cloned.getFieldExtension('field1', 'ext2')).toBe(456);
      cloned.setFieldExtension('field1', 'ext2', 600);
      expect(cloned.getFieldExtension('field1', 'ext2')).toBe(600);
      expect(iftc.getFieldExtension('field1', 'ext2')).toBe(456);
    });
    it('typeResolvers should be different', () => {
      const UserTC = schemaComposer.createObjectTC(`type User { field1: String }`);
      iftc.addTypeResolver(UserTC, () => true);
      const cloned = iftc.cloneTo(anotherSchemaComposer);
      const clonedUserTC = cloned.getTypeResolvers().keys().next().value;
      expect(clonedUserTC).not.toBe(UserTC);
      expect(clonedUserTC.getTypeName()).toBe(UserTC.getTypeName());
    });
  });
  describe('get()', () => {
    it('should return type by path', () => {
      const myIFTC = new InterfaceTypeComposer(new GraphQLInterfaceType({
        name: 'Readable',
        fields: {
          field1: {
            type: GraphQLString,
            args: {
              arg1: {
                type: GraphQLInt
              }
            }
          }
        }
      }), schemaComposer);
      expect(myIFTC.get('field1').getType()).toBe(GraphQLString);
      expect(myIFTC.get('field1.@arg1').getType()).toBe(GraphQLInt);
    });
  });
  describe('get type methods', () => {
    it('getTypePlural() should return wrapped type with ListComposer', () => {
      expect(iftc.getTypePlural()).toBeInstanceOf(ListComposer);
      expect(iftc.getTypePlural().getType().ofType).toBe(iftc.getType());
    });
    it('getTypeNonNull() should return wrapped type with NonNullComposer', () => {
      expect(iftc.getTypeNonNull()).toBeInstanceOf(NonNullComposer);
      expect(iftc.getTypeNonNull().getType().ofType).toBe(iftc.getType());
    });
    it('check getters List, NonNull', () => {
      const UserTC = schemaComposer.createInterfaceTC(`interface UserIface { name: String }`);
      expect(UserTC.List).toBeInstanceOf(ListComposer);
      expect(UserTC.List.ofType).toBe(UserTC);
      expect(UserTC.List.getTypeName()).toBe('[UserIface]');
      expect(UserTC.NonNull).toBeInstanceOf(NonNullComposer);
      expect(UserTC.NonNull.ofType).toBe(UserTC);
      expect(UserTC.NonNull.getTypeName()).toBe('UserIface!');
      expect(UserTC.NonNull.List).toBeInstanceOf(ListComposer);
      expect(UserTC.NonNull.List.getTypeName()).toBe('[UserIface!]');
      expect(UserTC.NonNull.List.NonNull).toBeInstanceOf(NonNullComposer);
      expect(UserTC.NonNull.List.NonNull.getTypeName()).toBe('[UserIface!]!');
    });
  });
  it('should have chain-methods', () => {
    expect(iftc.setFields({})).toBe(iftc);
    expect(iftc.setField('f1', {
      type: 'Int'
    })).toBe(iftc);
    expect(iftc.extendField('f1', {
      description: 'Ok'
    })).toBe(iftc);
    expect(iftc.deprecateFields('f1')).toBe(iftc);
    expect(iftc.addFields({})).toBe(iftc);
    expect(iftc.removeField('f1')).toBe(iftc);
    expect(iftc.removeOtherFields('f1')).toBe(iftc);
    expect(iftc.reorderFields(['f1'])).toBe(iftc);
  });
  describe('deprecateFields()', () => {
    let iftc1;
    beforeEach(() => {
      iftc1 = schemaComposer.createInterfaceTC({
        name: 'MyType',
        fields: {
          name: 'String',
          age: 'Int',
          dob: 'Date'
        }
      });
    });
    it('should accept string', () => {
      iftc1.deprecateFields('name');
      expect(iftc1.getFieldConfig('name').deprecationReason).toBe('deprecated');
      expect(iftc1.getFieldConfig('age').deprecationReason).toBeUndefined();
      expect(iftc1.getFieldConfig('dob').deprecationReason).toBeUndefined();
    });
    it('should accept array of string', () => {
      iftc1.deprecateFields(['name', 'age']);
      expect(iftc1.getFieldConfig('name').deprecationReason).toBe('deprecated');
      expect(iftc1.getFieldConfig('age').deprecationReason).toBe('deprecated');
      expect(iftc1.getFieldConfig('dob').deprecationReason).toBeUndefined();
    });
    it('should accept object with fields and reasons', () => {
      iftc1.deprecateFields({
        age: 'do not use',
        dob: 'old field'
      });
      expect(iftc1.getFieldConfig('name').deprecationReason).toBeUndefined();
      expect(iftc1.getFieldConfig('age').deprecationReason).toBe('do not use');
      expect(iftc1.getFieldConfig('dob').deprecationReason).toBe('old field');
    });
    it('should throw error on non-existent field', () => {
      expect(() => {
        iftc1.deprecateFields('missing');
      }).toThrowError(/Cannot deprecate non-existent field/);
      expect(() => {
        iftc1.deprecateFields(['missing']);
      }).toThrowError(/Cannot deprecate non-existent field/);
      expect(() => {
        iftc1.deprecateFields({
          missing: 'Deprecate reason'
        });
      }).toThrowError(/Cannot deprecate non-existent field/);
    });
  });
  describe('getFieldTC()', () => {
    const myIFTC = ObjectTypeComposer.create('MyCustomType', schemaComposer);
    myIFTC.addFields({
      scalar: 'String',
      list: '[Int]',
      obj: ObjectTypeComposer.create(`type MyCustomObjType { name: String }`, schemaComposer),
      objArr: [ObjectTypeComposer.create(`type MyCustomObjType2 { name: String }`, schemaComposer)],
      iface: InterfaceTypeComposer.create(`interface MyInterfaceType { field: String }`, schemaComposer),
      enum: EnumTypeComposer.create(`enum MyEnumType { FOO BAR }`, schemaComposer),
      union: UnionTypeComposer.create(`union MyUnionType = MyCustomObjType | MyCustomObjType2`, schemaComposer)
    });
    it('should return TypeComposer for object field', () => {
      const tco = myIFTC.getFieldTC('obj');
      expect(tco).toBeInstanceOf(ObjectTypeComposer);
      expect(tco.getTypeName()).toBe('MyCustomObjType');
    });
    it('should return TypeComposer for wrapped object field', () => {
      const tco = myIFTC.getFieldTC('objArr');
      expect(tco).toBeInstanceOf(ObjectTypeComposer);
      expect(tco.getTypeName()).toBe('MyCustomObjType2');
      const tco2 = myIFTC.getFieldOTC('objArr');
      expect(tco).toBe(tco2);
    });
    it('should return TypeComposer for scalar fields', () => {
      const tco = myIFTC.getFieldTC('scalar');
      expect(tco).toBeInstanceOf(ScalarTypeComposer);
      expect(tco.getTypeName()).toBe('String');
      expect(() => myIFTC.getFieldOTC('scalar')).toThrow('must be ObjectTypeComposer');
    });
    it('should return TypeComposer for scalar list fields', () => {
      const tco = myIFTC.getFieldTC('list');
      expect(tco).toBeInstanceOf(ScalarTypeComposer);
      expect(tco.getTypeName()).toBe('Int');
    });
    it('should return TypeComposer for enum fields', () => {
      const tco = myIFTC.getFieldTC('enum');
      expect(tco).toBeInstanceOf(EnumTypeComposer);
      expect(tco.getTypeName()).toBe('MyEnumType');
    });
    it('should return TypeComposer for interface list fields', () => {
      const tco = myIFTC.getFieldTC('iface');
      expect(tco).toBeInstanceOf(InterfaceTypeComposer);
      expect(tco.getTypeName()).toBe('MyInterfaceType');
    });
    it('should return TypeComposer for union list fields', () => {
      const tco = myIFTC.getFieldTC('union');
      expect(tco).toBeInstanceOf(UnionTypeComposer);
      expect(tco.getTypeName()).toBe('MyUnionType');
    });
  });
  describe('typeResolvers methods', () => {
    let PersonTC;
    let KindRedTC;
    let KindBlueTC;
    beforeEach(() => {
      PersonTC = schemaComposer.createObjectTC(`
        type Person { age: Int, field1: String, field2: String }
      `);
      PersonTC.addInterface(iftc);
      iftc.addTypeResolver(PersonTC, value => {
        return value.hasOwnProperty('age');
      });
      KindRedTC = schemaComposer.createObjectTC(`
        type KindRed { kind: String, field1: String, field2: String, red: String }
      `); // You may not call `KindRedTC.addInterface(iftc)` it will be done internally by `addTypeResolver`

      iftc.addTypeResolver(KindRedTC, value => {
        return value.kind === 'red';
      });
      KindBlueTC = schemaComposer.createObjectTC(`
        type KindBlue { kind: String, field1: String, field2: String, blue: String }
      `);
      iftc.addTypeResolver(KindBlueTC, value => {
        return value.kind === 'blue';
      });
    });
    it('hasTypeResolver()', () => {
      expect(iftc.hasTypeResolver(PersonTC)).toBeTruthy();
      expect(iftc.hasTypeResolver(KindRedTC)).toBeTruthy();
      expect(iftc.hasTypeResolver(KindBlueTC)).toBeTruthy();
      expect(iftc.hasTypeResolver(schemaComposer.createObjectTC('NewOne'))).toBeFalsy();
    });
    it('to Object Types should be added current interface', () => {
      expect(PersonTC.hasInterface(iftc)).toBeTruthy();
      expect(KindRedTC.hasInterface(iftc)).toBeTruthy();
      expect(KindBlueTC.hasInterface(iftc)).toBeTruthy();
    });
    it('getTypeResolvers()', () => {
      const trm = iftc.getTypeResolvers();
      expect(trm).toBeInstanceOf(Map);
      expect(trm.size).toBe(3);
    });
    it('getTypeResolverCheckFn()', () => {
      const checkFn = iftc.getTypeResolverCheckFn(PersonTC);
      expect(checkFn({
        age: 15
      })).toBeTruthy();
      expect(checkFn({
        nope: 'other type'
      })).toBeFalsy();
    });
    it('setTypeResolverFallback()', () => {
      const checkFn1 = iftc.getResolveType();
      expect(checkFn1({})).toBeFalsy();
      const FallbackTC = schemaComposer.createObjectTC(`
        type Fallback { field1: String, field2: String }
      `);
      iftc.setTypeResolverFallback(FallbackTC);
      expect(FallbackTC.hasInterface(iftc)).toBeTruthy();
      const checkFn2 = iftc.getResolveType();
      expect(checkFn2({})).toBe(FallbackTC.getType());
      iftc.setTypeResolverFallback(null);
    });
    it('getTypeResolverNames()', () => {
      expect(iftc.getTypeResolverNames()).toEqual(expect.arrayContaining(['Person', 'KindRed', 'KindBlue']));
    });
    it('getTypeResolverTypes()', () => {
      expect(iftc.getTypeResolverTypes()).toEqual(expect.arrayContaining([PersonTC.getType(), KindRedTC.getType(), KindBlueTC.getType()]));
    });
    describe('setTypeResolvers()', () => {
      it('async mode', async () => {
        const map = new Map([[PersonTC.getType(), async () => Promise.resolve(false)], [KindRedTC, async () => Promise.resolve(true)]]);
        iftc.setTypeResolvers(map);
        const resolveType = iftc._gqType.resolveType;
        expect(resolveType()).toBeInstanceOf(Promise);
        expect(await resolveType()).toBe(KindRedTC.getType());
      });
      it('sync mode', () => {
        const map = new Map([[PersonTC.getType(), () => false], [KindRedTC, () => false], [KindBlueTC, () => true]]);
        iftc.setTypeResolvers(map);
        const resolveType = iftc._gqType.resolveType;
        expect(resolveType()).toBe(KindBlueTC.getType());
      });
      it('throw error on wrong type', () => {
        expect(() => {
          const map = new Map([[false, () => true]]);
          iftc.setTypeResolvers(map);
        }).toThrowError();
      });
      it('throw error on wrong checkFn', () => {
        expect(() => {
          const map = new Map([[PersonTC, true]]);
          iftc.setTypeResolvers(map);
        }).toThrowError();
      });
    });
    it('addTypeResolver()', () => {
      const fn = () => false;

      iftc.addTypeResolver(PersonTC, fn);
      expect(iftc.getTypeResolverCheckFn(PersonTC)).toBe(fn);
      expect(() => {
        iftc.addTypeResolver(PersonTC);
      }).toThrowError();
    });
    it('removeTypeResolver()', () => {
      expect(iftc.hasTypeResolver(PersonTC)).toBeTruthy();
      iftc.removeTypeResolver(PersonTC);
      expect(iftc.hasTypeResolver(PersonTC)).toBeFalsy();
    });
    describe('check native resolveType methods', () => {
      it('check methods setResolveType() getResolveType()', () => {
        const iftc1 = schemaComposer.createInterfaceTC(`interface F { f: Int }`);

        const resolveType = () => 'A';

        expect(iftc1.getResolveType()).toBeUndefined();
        iftc1.setResolveType(resolveType);
        expect(iftc1.getResolveType()).toBe(resolveType);
      });
      it('integration test', async () => {
        const iftc1 = schemaComposer.createInterfaceTC(`interface F { f: Int }`);
        const aTC = schemaComposer.createObjectTC('type A implements F { a: Int, f: Int }');
        const bTC = schemaComposer.createObjectTC('type B implements F { b: Int, f: Int }');

        const resolveType = value => {
          if (value) {
            if (value.a) return 'A';else if (value.b) return 'B';
          }

          return null;
        };

        iftc1.setResolveType(resolveType);
        schemaComposer.addSchemaMustHaveType(aTC);
        schemaComposer.addSchemaMustHaveType(bTC);
        schemaComposer.Query.addFields({
          check: {
            type: '[F]',
            resolve: () => [{
              f: 'A',
              a: 1
            }, {
              f: 'B',
              b: 2
            }, {
              f: 'C',
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
  describe('InputType convert methods', () => {
    it('getInputType()', () => {
      const input = iftc.getInputType();
      expect(input).toBeInstanceOf(GraphQLInputObjectType); // must return the same instance!

      expect(input).toBe(iftc.getInputType());
    });
    it('hasInputTypeComposer()', () => {
      expect(iftc.hasInputTypeComposer()).toBeFalsy();
      const input = iftc.getInputType();
      expect(input).toBeInstanceOf(GraphQLInputObjectType);
      expect(iftc.hasInputTypeComposer()).toBeTruthy();
    });
    it('setInputTypeComposer()', () => {
      const itc1 = InputTypeComposer.createTemp(`Input`);
      iftc.setInputTypeComposer(itc1);
      const itc2 = iftc.getInputTypeComposer();
      expect(itc1).toBe(itc2);
    });
    it('getInputTypeComposer()', () => {
      const itc = iftc.getInputTypeComposer();
      expect(itc).toBeInstanceOf(InputTypeComposer); // must return the same instance!

      expect(itc).toBe(iftc.getInputTypeComposer());
    });
    it('getITC()', () => {
      expect(iftc.getITC()).toBe(iftc.getInputTypeComposer());
    });
    it('removeInputTypeComposer()', () => {
      const iftc3 = schemaComposer.createInterfaceTC(`
        interface Point {
          x: Int
          y: Int
        }
      `);
      let itc3 = iftc3.getInputTypeComposer();
      expect(itc3.getFieldNames()).toEqual(['x', 'y']);
      iftc3.addFields({
        z: 'Int'
      });
      expect(itc3.getFieldNames()).toEqual(['x', 'y']);
      iftc3.removeInputTypeComposer();
      itc3 = iftc3.getInputTypeComposer();
      expect(itc3.getFieldNames()).toEqual(['x', 'y', 'z']);
    });
  });
  describe('directive methods', () => {
    it('type level directive methods', () => {
      const tc1 = schemaComposer.createInterfaceTC(`
        interface My1 @d0(a: false) @d1(b: "3") @d0(a: true) { 
          field: Int
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
      const tc1 = schemaComposer.createInterfaceTC(`
        interface My1 { 
          field: Int @f0(a: false) @f1(b: "3") @f0(a: true)
        }`);
      expect(tc1.getFieldDirectives('field')).toEqual([{
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
      expect(tc1.getFieldDirectiveNames('field')).toEqual(['f0', 'f1', 'f0']);
      expect(tc1.getFieldDirectiveByName('field', 'f0')).toEqual({
        a: false
      });
      expect(tc1.getFieldDirectiveById('field', 0)).toEqual({
        a: false
      });
      expect(tc1.getFieldDirectiveByName('field', 'f1')).toEqual({
        b: '3'
      });
      expect(tc1.getFieldDirectiveById('field', 1)).toEqual({
        b: '3'
      });
      expect(tc1.getFieldDirectiveByName('field', 'f2')).toEqual(undefined);
      expect(tc1.getFieldDirectiveById('field', 333)).toEqual(undefined);
    });
    it('arg level directive methods', () => {
      const tc1 = schemaComposer.createInterfaceTC(`
        interface My1 { 
          field(
            arg: Int @a0(a: false) @a1(b: "3") @a0(a: true)
          ): Int
        }`);
      expect(tc1.getFieldArgDirectives('field', 'arg')).toEqual([{
        args: {
          a: false
        },
        name: 'a0'
      }, {
        args: {
          b: '3'
        },
        name: 'a1'
      }, {
        args: {
          a: true
        },
        name: 'a0'
      }]);
      expect(tc1.getFieldArgDirectiveNames('field', 'arg')).toEqual(['a0', 'a1', 'a0']);
      expect(tc1.getFieldArgDirectiveByName('field', 'arg', 'a0')).toEqual({
        a: false
      });
      expect(tc1.getFieldArgDirectiveById('field', 'arg', 0)).toEqual({
        a: false
      });
      expect(tc1.getFieldArgDirectiveByName('field', 'arg', 'a1')).toEqual({
        b: '3'
      });
      expect(tc1.getFieldArgDirectiveById('field', 'arg', 1)).toEqual({
        b: '3'
      });
      expect(tc1.getFieldArgDirectiveByName('field', 'arg', 'a2')).toEqual(undefined);
      expect(tc1.getFieldArgDirectiveById('field', 'arg', 333)).toEqual(undefined);
    });
    it('check directive set-methods', () => {
      const tc1 = schemaComposer.createInterfaceTC(`
        interface My1 @d0(a: true) {
          field: Int @d2(a: false, b: true)
          field2(ok: Int = 15 @d5(a: 5)): Int
        }
      `);
      expect(tc1.toSDL()).toBe(dedent`
        interface My1 @d0(a: true) {
          field: Int @d2(a: false, b: true)
          field2(ok: Int = 15 @d5(a: 5)): Int
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
      tc1.setFieldDirectives('field', [{
        args: {
          b: '6'
        },
        name: 'd1'
      }]);
      tc1.setFieldArgDirectives('field2', 'ok', [{
        args: {
          b: '7'
        },
        name: 'd1'
      }]);
      expect(tc1.toSDL()).toBe(dedent`
        interface My1 @d0(a: false) @d1(b: "3") @d0(a: true) {
          field: Int @d1(b: "6")
          field2(ok: Int = 15 @d1(b: "7")): Int
        }
      `);
    });
  });
  describe('merge()', () => {
    it('should merge with GraphQLInterfaceType', () => {
      const iface = schemaComposer.createInterfaceTC(`interface IFace { name: String }`);
      const iface2 = new GraphQLInterfaceType({
        name: 'WithAge',
        fields: {
          age: {
            type: GraphQLInt
          }
        }
      });
      iface.merge(iface2);
      expect(iface.getFieldNames()).toEqual(['name', 'age']);
    });
    it('should merge with InterfaceTypeComposer', () => {
      const iface = schemaComposer.createInterfaceTC(`interface IFace { name: String }`);
      const sc2 = new SchemaComposer();
      const iface2 = sc2.createInterfaceTC(`interface WithAge { age: Int }`);
      iface.merge(iface2);
      expect(iface.getFieldNames()).toEqual(['name', 'age']);
    });
    it('should merge with GraphQLObjectType', () => {
      const iface = schemaComposer.createInterfaceTC(`interface IFace { name: String }`);
      const person = new GraphQLObjectType({
        name: 'Person',
        fields: {
          age: {
            type: GraphQLInt
          }
        }
      });
      iface.merge(person);
      expect(iface.getFieldNames()).toEqual(['name', 'age']);
    });
    it('should merge with ObjectTypeComposer', () => {
      const iface = schemaComposer.createInterfaceTC(`interface IFace { name: String }`);
      const sc2 = new SchemaComposer();
      const person = sc2.createObjectTC(`type Person { age: Int }`);
      iface.merge(person);
      expect(iface.getFieldNames()).toEqual(['name', 'age']);
    });
    it('should throw error on wrong type', () => {
      const iface = schemaComposer.createInterfaceTC(`interface IFace { name: String }`);
      expect(() => iface.merge(schemaComposer.createScalarTC('Scalar'))).toThrow('Cannot merge ScalarTypeComposer');
    });
  });
  describe('misc methods', () => {
    if (graphqlVersion < 15) return;
    it('toSDL()', () => {
      const t = schemaComposer.createInterfaceTC(`
        """desc1"""
        interface IUser implements Node { 
          """desc2"""
          name(a: String): String
          field: ISubField
          id: ID
        }

        interface ISubField {
          subField: Int
        }

        interface Node {
          id: ID
        }
      `);
      expect(t.toSDL()).toBe(dedent`
        """desc1"""
        interface IUser implements Node {
          """desc2"""
          name(a: String): String
          field: ISubField
          id: ID
        }
      `);
      expect(t.toSDL({
        omitDescriptions: true
      })).toBe(dedent`
        interface IUser implements Node {
          name(a: String): String
          field: ISubField
          id: ID
        }
      `);
      expect(t.toSDL({
        omitDescriptions: true,
        deep: true
      })).toBe(dedent`
        interface IUser implements Node {
          name(a: String): String
          field: ISubField
          id: ID
        }

        scalar String

        interface Node {
          id: ID
        }
        
        scalar ID

        interface ISubField {
          subField: Int
        }
      `);
      expect(t.toSDL({
        omitDescriptions: true,
        deep: true,
        exclude: ['ISubField', 'Node']
      })).toBe(dedent`
        interface IUser implements Node {
          name(a: String): String
          field: ISubField
          id: ID
        }

        scalar String

        scalar ID
      `);
    });
  });
  describe('solve hoisting problems via thunk for fieldConfig', () => {
    it('setFields() & setField() should keep fieldConfig as thunk', () => {
      const HoistingTC = schemaComposer.createInterfaceTC('Hoisting');

      const thunkedFieldConfig = () => ({
        type: 'Int'
      });

      HoistingTC.setFields({
        field2: thunkedFieldConfig,
        field3: 'Int'
      });
      HoistingTC.setField('field1', thunkedFieldConfig);
      expect(HoistingTC._gqcFields.field1).toBe(thunkedFieldConfig);
      expect(HoistingTC._gqcFields.field2).toBe(thunkedFieldConfig);
      expect(HoistingTC._gqcFields.field3.type).toBeInstanceOf(ScalarTypeComposer);
    });
    it('getField() should unwrap field from thunk & convert it to ComposeFieldConfig', () => {
      const HoistingTC = schemaComposer.createInterfaceTC('Hoisting');

      const thunkedFieldConfig = () => ({
        type: 'Int',
        args: {
          limit: 'Int'
        }
      });

      HoistingTC.setFields({
        field1: thunkedFieldConfig,
        field2: thunkedFieldConfig,
        field3: 'Int'
      }); // by default fieldConfig is thunked

      expect(HoistingTC._gqcFields.field1).toBe(thunkedFieldConfig); // getField it should be unwrapped from thunk and converted to ComposeFieldConfig

      expect(HoistingTC.getField('field1')).toEqual({
        type: expect.any(ScalarTypeComposer),
        args: {
          limit: {
            type: expect.any(ScalarTypeComposer)
          }
        }
      }); // after first getField, type should be keep un-thunked

      expect(HoistingTC._gqcFields.field1).toEqual({
        type: expect.any(ScalarTypeComposer),
        args: {
          limit: {
            type: expect.any(ScalarTypeComposer)
          }
        }
      }); // other thunked fields should be untouched

      expect(HoistingTC._gqcFields.field2).toBe(thunkedFieldConfig);
    });
  });
});