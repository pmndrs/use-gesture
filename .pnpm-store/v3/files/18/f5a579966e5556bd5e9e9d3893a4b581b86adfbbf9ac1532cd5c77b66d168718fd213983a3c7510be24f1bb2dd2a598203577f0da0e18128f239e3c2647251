"use strict";

var _graphql = require("graphql");

var _ = require("../..");

describe('github issue #287: Can we merge schemas with overriding types in fields', () => {
  it('merge two simple schemas', () => {
    if (_.graphqlVersion < 15) return;
    const schemaA = (0, _graphql.buildSchema)(`
      type Query {
        field1: Int
        """KEEP ME"""
        field2: Int
      }
    `);
    const schemaB = (0, _graphql.buildSchema)(`
      type Query {
        """BBB"""
        field1: String
        field3: String
        field22: Int
      }
    `);
    const sc = new _.SchemaComposer(schemaA);
    sc.merge(schemaB);
    expect(sc.toSDL({
      omitScalars: true,
      omitDirectiveDefinitions: true
    })).toEqual((0, _.dedent)`
      type Mutation

      type Query {
        """BBB"""
        field1: String
      
        """KEEP ME"""
        field2: Int
        field3: String
        field22: Int
      }

      type Subscription
    `);
    expect(sc.buildSchema()).toBeInstanceOf(_graphql.GraphQLSchema);
  });
  it('it merges field & arg types', () => {
    if (_.graphqlVersion < 15) return;
    const schemaA = (0, _graphql.buildSchema)(`
      # An object with an ID
      interface Node {
        # The id of the object.
        id: ID!
      }

      type Post implements Node {
        id: ID!
        content: String
        fieldA: Int
        fieldB: String
      }

      type Query {
        post: Post
        # Fetches an object given its ID
        node(
          # The ID of an object
          id: ID!
        ): Node
      }
      `);
    const schemaB = (0, _graphql.buildSchema)(`
      # An object with an ID
      interface Node {
        # The id of the object.
        id: ID!
      }

      type Post implements Node {
        id: ID!
        content: String
      }

      type Query {
        post: Post
        # Fetches an object given its ID
        node(
          # The ID of an object
          id: ID!
        ): Node
      }
      `);
    const sc = new _.SchemaComposer(schemaA);
    sc.merge(schemaB);
    expect(sc.toSDL({
      omitScalars: true,
      omitDirectiveDefinitions: true
    })).toEqual((0, _.dedent)`
      type Mutation
      
      interface Node {
        id: ID!
      }
      
      type Post implements Node {
        id: ID!
        content: String
        fieldA: Int
        fieldB: String
      }
      
      type Query {
        post: Post
        node(id: ID!): Node
      }
      
      type Subscription
    `);
  });
  it('should not throw contains multiple types named "Node"', () => {
    if (_.graphqlVersion < 15) return;
    const typeDefsA = `
      type Mutation {
        createPost(data: String!): Post!
      }

      interface Node {
        id: ID!
      }

      type Post implements Node {
        id: ID!
        title: String!
      }

      type PostConnection {
        edges: [PostEdge]!
      }

      type PostEdge {
        node: Post!
      }

      type PostSubscriptionPayload {
        node: Post
      }

      input PostUpdateManyMutationInput {
        title: String
        content: String
      }

      type Query {
        posts(first: Int, last: Int): [Post]!
        postsConnection(first: Int, last: Int): PostConnection!
        node(id: ID!): Node
      }

      type Subscription {
        post(where: String): PostSubscriptionPayload
      }
    `;
    const typeDefsB = `
      type Mutation {
        createPost(data: String!): Post!
      }

      interface Node {
        id: ID!
      }

      type Post implements Node {
        id: ID!
        content: String
      }

      type PostConnection {
        edges: [PostEdge]!
      }

      type PostEdge {
        node: Post!
      }

      type PostSubscriptionPayload {
        node: Post
      }

      type Query {
        posts: [Post]!
        postsConnection: PostConnection!
        node(id: ID!): Node
      }

      type Subscription {
        post(where: String): PostSubscriptionPayload
      }
      `;
    const schemaA = (0, _graphql.buildSchema)(typeDefsA);
    const schemaB = (0, _graphql.buildSchema)(typeDefsB);
    const sc = new _.SchemaComposer(schemaA);
    sc.merge(schemaB);
    expect(() => {
      sc.buildSchema();
    }).not.toThrow(/contains multiple types named "Node"/);
  });
});