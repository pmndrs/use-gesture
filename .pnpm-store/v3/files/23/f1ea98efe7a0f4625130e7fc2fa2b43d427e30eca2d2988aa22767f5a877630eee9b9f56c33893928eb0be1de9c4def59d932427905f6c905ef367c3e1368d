"use strict";

var _SchemaComposer = require("../../SchemaComposer");

var _dedent = require("../dedent");

describe('schemaPrinter', () => {
  describe('printSchemaComposer()', () => {
    const sc = new _SchemaComposer.SchemaComposer();
    sc.addTypeDefs(`
      extend type Query {
        me: User
      }
      
      type User @key(fields: "id") {
        id: ID!
      }

      scalar _FieldSet
      directive @key(fields: _FieldSet!) on OBJECT | INTERFACE
    `);
    it('should print schema in SDL without descriptions', () => {
      expect(sc.toSDL({
        omitDescriptions: true
      })).toBe((0, _dedent.dedent)`
        directive @key(fields: _FieldSet!) on OBJECT | INTERFACE

        scalar _FieldSet

        scalar ID

        type Query {
          me: User
        }

        type User @key(fields: "id") {
          id: ID!
        }
      `);
    });
    it('should print schema in SDL without directives', () => {
      expect(sc.toSDL({
        omitDescriptions: true,
        omitDirectiveDefinitions: true
      })).toBe((0, _dedent.dedent)`
        scalar ID

        type Query {
          me: User
        }

        type User @key(fields: "id") {
          id: ID!
        }
      `);
    });
    it('should print schema in SDL exclude some types', () => {
      expect(sc.toSDL({
        omitDescriptions: true,
        exclude: ['User']
      })).toBe((0, _dedent.dedent)`
        directive @key(fields: _FieldSet!) on OBJECT | INTERFACE

        scalar _FieldSet

        type Query {
          me: User
        }
      `);
    });
    it('should print schema in SDL include only selected types', () => {
      expect(sc.toSDL({
        omitDescriptions: true,
        include: ['User']
      })).toBe((0, _dedent.dedent)`
        directive @key(fields: _FieldSet!) on OBJECT | INTERFACE

        scalar _FieldSet

        scalar ID

        type User @key(fields: "id") {
          id: ID!
        }
      `);
    });
    it('should print schema in SDL with simultaneously include & exclude', () => {
      expect(sc.toSDL({
        omitDescriptions: true,
        include: ['User'],
        exclude: ['User', 'ID']
      })).toBe((0, _dedent.dedent)`
        directive @key(fields: _FieldSet!) on OBJECT | INTERFACE

        scalar _FieldSet

        type User @key(fields: "id") {
          id: ID!
        }
      `);
    });
    it('should print schema in SDL without scalars', () => {
      expect(sc.toSDL({
        omitScalars: true
      })).toBe((0, _dedent.dedent)`
        directive @key(fields: _FieldSet!) on OBJECT | INTERFACE

        type Query {
          me: User
        }

        type User @key(fields: "id") {
          id: ID!
        }
      `);
    });
  });
});