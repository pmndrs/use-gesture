import { find, filter } from 'lodash'; // eslint-disable-line

import { SchemaComposer } from '../..';
describe('github issue #312: Error when merging graphql-js fields', () => {
  it('test graphql query', async () => {
    var _schema$getQueryType;

    const composer = new SchemaComposer();
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
    const schema = composer.buildSchema();
    const composer2 = new SchemaComposer();
    const fields = (_schema$getQueryType = schema.getQueryType()) === null || _schema$getQueryType === void 0 ? void 0 : _schema$getQueryType.getFields();
    composer2.Query.addFields(fields);
    expect(() => {
      composer2.buildSchema();
    }).not.toThrowError('Query.test should provide "deprecationReason" instead of "isDeprecated".');
  });
});