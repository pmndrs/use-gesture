"use strict";

var _ = require("../..");

describe('github issue #238: `setTypeName` doesnt update the usage of the type', () => {
  it('try to rename types with Query', async () => {
    const sc = new _.SchemaComposer();
    sc.addTypeDefs(`
      type A { a: String }
      type B { b: String }
      union U = A | B

      type Query {
        f: U
      }
    `);
    sc.get('A').setTypeName('T_A');
    sc.get('B').setTypeName('T_B');
    sc.get('U').setTypeName('T_U');
    expect(sc.toSDL({
      omitDescriptions: true
    })).toEqual((0, _.dedent)`
      type Query {
        f: T_U
      }

      scalar String

      type T_A {
        a: String
      }

      type T_B {
        b: String
      }

      union T_U = T_A | T_B
    `);
  });
  it('try to rename types without Query', async () => {
    const sc = new _.SchemaComposer();
    sc.addTypeDefs(`
      type A { a: String }
      type B { b: String }
      union U = A | B
    `);
    sc.get('A').setTypeName('T_A');
    sc.get('B').setTypeName('T_B');
    sc.get('U').setTypeName('T_U');
    expect(sc.get('U').toSDL({
      omitDescriptions: true
    })).toEqual('union T_U = T_A | T_B');
  });
  it('check astNode for union', async () => {
    const sc = new _.SchemaComposer();
    sc.addTypeDefs(`
      type A { a: String }
      type B { b: String }
      union U = A | B
    `);
    sc.get('A').setTypeName('T_A');
    sc.get('B').setTypeName('T_B');
    sc.get('U').setTypeName('T_U');
    expect(sc.get('U').getType().astNode).toEqual({
      description: undefined,
      directives: undefined,
      kind: 'UnionTypeDefinition',
      name: {
        kind: 'Name',
        value: 'T_U'
      },
      types: [{
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'T_A'
        }
      }, {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'T_B'
        }
      }]
    });
  });
});