"use strict";

var _graphql = require("graphql");

var _2 = require("../..");

describe('github issue #233: addTypeDefs crashes with argument having default enum value', () => {
  it('test graphql query', async () => {
    const sc = new _2.SchemaComposer();
    sc.addTypeDefs(`
      enum SiteLanguage {
        en
        ru
        ua
      }

      type Query {
        field(ln: SiteLanguage = en): SiteLanguage 
      }
    `);
    sc.addResolveMethods({
      Query: {
        field: (_, args) => args.ln
      }
    });
    const schema = sc.buildSchema();
    const res = await (0, _graphql.graphql)({
      schema,
      source: `query { field(ln: ru) }`
    });
    expect(res).toEqual({
      data: {
        field: 'ru'
      }
    });
  });
});