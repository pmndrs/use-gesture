"use strict";

var _lodash = require("lodash");

var _ = require("../..");

// eslint-disable-line
describe('github issue #201: Type kind "ObjectTypeExtension" not supported', () => {
  it('test graphql query', async () => {
    const sc = new _.SchemaComposer();
    sc.addTypeDefs(`type Author { name: String }`);
    expect(() => {
      sc.addTypeDefs(`
        extend type Query {
          author(id: Int!): Author
        }
      `);
    }).not.toThrowError('Type kind "ObjectTypeExtension" not supported.');
  });
});