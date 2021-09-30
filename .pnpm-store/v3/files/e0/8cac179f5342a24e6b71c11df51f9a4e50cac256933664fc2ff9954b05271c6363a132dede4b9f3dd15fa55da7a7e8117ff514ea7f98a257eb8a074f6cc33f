import { find, filter } from 'lodash'; // eslint-disable-line

import { SchemaComposer } from '../..';
describe('github issue #201: Type kind "ObjectTypeExtension" not supported', () => {
  it('test graphql query', async () => {
    const sc = new SchemaComposer();
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