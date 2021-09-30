"use strict";

var _graphql = require("graphql");

var _ = require("../..");

describe('github issue #267: Can we mix graphql-compose with pure graphql-js', () => {
  it('modify type via SchemaComposer', () => {
    const Article = new _graphql.GraphQLObjectType({
      name: 'Article',
      fields: {
        title: {
          type: _graphql.GraphQLString
        },
        author: {
          type: _graphql.GraphQLString
        }
      }
    });
    const sc = new _.SchemaComposer();
    const ArticleTC = sc.createObjectTC(Article);
    ArticleTC.addFields({
      description: 'String'
    });
    ArticleTC.removeField('author'); // call getType() when you finish modifications
    // under the hood it modifies provided GraphQLObjectType

    ArticleTC.getType();
    expect(Object.keys(Article.getFields())).toEqual(['title', 'description']);
  });
});