"use strict";

var _graphql = require("graphql");

var _ = require("../..");

describe('github issue #273: Object directives are removed from schema', () => {
  it('should keep @test directive on TestObject', () => {
    if (_.graphqlVersion < 15) {
      return;
    }

    const schema = (0, _graphql.buildSchema)(`
      directive @test on OBJECT | INPUT_OBJECT | SCALAR | ENUM
      
      type ModifyMe @test {
        id: ID!
      }

      input Input @test {
        id: ID!
      }

      scalar Scalar @test

      enum Enum @test

      type Query {
        hello(a: Input, s: Scalar, e: Enum): ModifyMe
      }
    `);
    const sc = new _.SchemaComposer(schema);
    const sdl = sc.toSDL({
      exclude: ['ID', 'String', 'Int', 'Boolean', 'Float']
    });
    expect(sdl).toBe((0, _.dedent)`
      directive @test on OBJECT | INPUT_OBJECT | SCALAR | ENUM

      """Exposes a URL that specifies the behaviour of this scalar."""
      directive @specifiedBy(
        """The URL that specifies the behaviour of this scalar."""
        url: String!
      ) on SCALAR

      enum Enum @test

      input Input @test {
        id: ID!
      }

      type ModifyMe @test {
        id: ID!
      }

      type Query {
        hello(a: Input, s: Scalar, e: Enum): ModifyMe
      }

      scalar Scalar @test
    `);
  });
});