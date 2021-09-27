"use strict";

var _ = require("../..");

describe('github issue #254: Duplicate field-level directive with `toSDL`', () => {
  it('should print directives for fields properly', () => {
    const sc = new _.SchemaComposer();
    sc.addTypeDefs(`
      extend type Query {
        me: User @deprecated(reason: "foobar")
      }
      
      type User @key(fields: "id") {
        id: ID!
      }

      scalar _FieldSet
      directive @key(fields: _FieldSet!) on OBJECT | INTERFACE
      directive @deprecated(
        """Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/)."""
        reason: String = "No longer supported"
      ) on FIELD_DEFINITION | ENUM_VALUE
    `);
    expect(sc.toSDL({
      omitScalars: true
    })).toBe((0, _.dedent)`
      directive @key(fields: _FieldSet!) on OBJECT | INTERFACE
      
      directive @deprecated(
        """
        Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/).
        """
        reason: String = "No longer supported"
      ) on FIELD_DEFINITION | ENUM_VALUE

      type Query {
        me: User @deprecated(reason: "foobar")
      }

      type User @key(fields: "id") {
        id: ID!
      }
    `);
  });
});