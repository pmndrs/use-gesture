import { GraphQLObjectType, GraphQLString } from 'graphql';
import { SchemaComposer } from '../..';
describe('github issue #267: Can we mix graphql-compose with pure graphql-js', () => {
  it('modify type via SchemaComposer', () => {
    const Article = new GraphQLObjectType({
      name: 'Article',
      fields: {
        title: {
          type: GraphQLString
        },
        author: {
          type: GraphQLString
        }
      }
    });
    const sc = new SchemaComposer();
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