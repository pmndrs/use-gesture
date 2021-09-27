"use strict";

var _lodash = require("lodash");

var _ = require("../..");

// eslint-disable-line
describe('github issue #186: error when merging existing schema', () => {
  it('test graphql query', async () => {
    const composer = new _.SchemaComposer();
    composer.Query.addFields({
      test: {
        type: 'String!',
        resolve: () => 'test field value!'
      },
      test3: {
        type: 'Int',
        args: {
          a: `input Filter { min: Int }`
        }
      }
    });
    const composer2 = new _.SchemaComposer(composer.buildSchema());
    composer2.Query.addFields({
      test2: {
        type: 'String!',
        resolve: () => 'test2 field value!'
      }
    });
    expect(() => {
      composer2.buildSchema();
    }).not.toThrowError('Query.test should provide "deprecationReason" instead of "isDeprecated".');
  });
});