function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { GraphQLSchema, GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLList, graphql } from 'graphql';
import { schemaComposer, ObjectTypeComposer } from '../..';
const remoteSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: {
        type: new GraphQLList(new GraphQLObjectType({
          name: 'User',
          fields: {
            name: {
              type: GraphQLString
            },
            age: {
              type: GraphQLInt
            },
            access: {
              type: new GraphQLObjectType({
                name: 'Access',
                fields: {
                  msg: {
                    type: GraphQLString
                  }
                }
              }),
              resolve: source => ({
                msg: source.age >= 20 ? `allowed` : 'disallowed'
              })
            }
          }
        })),
        resolve: () => [{
          name: 'u1',
          age: 10
        }, {
          name: 'u2',
          age: 20
        }, {
          name: 'u3',
          age: 30
        }]
      }
    }
  })
});
beforeEach(() => {
  schemaComposer.clear();
});
describe('github issue #107 merge Schema types on GQL', () => {
  it('get QueryTC from remote schema', () => {
    const RemoteQueryType = remoteSchema._queryType;
    const RemoteQueryTC = schemaComposer.createObjectTC(RemoteQueryType);
    expect(RemoteQueryTC.getTypeName()).toBe('Query');
    expect(RemoteQueryTC.getFieldNames()).toEqual(['users']); // remoteMutationTC = ObjectTypeComposer.create(remoteSchema._mutationType);
    // remoteSubscriptionTC = ObjectTypeComposer.create(remoteSchema._subscriptionType);
  });
  it('get nested TC from remote schema', () => {
    const RemoteQueryType = remoteSchema._queryType;
    const RemoteQueryTC = schemaComposer.createObjectTC(RemoteQueryType);
    const RemoteUserTC = RemoteQueryTC.get('users');
    expect(RemoteUserTC.getTypeName()).toEqual('User');
    const RemoteAccessTC = RemoteQueryTC.get('users.access');
    expect(RemoteAccessTC.getTypeName()).toEqual('Access');
  });
  it('schema stitching on Query', async () => {
    const RemoteQueryType = remoteSchema._queryType;
    const RemoteQueryTC = schemaComposer.createObjectTC(RemoteQueryType);
    schemaComposer.Query.addFields(_objectSpread({
      tag: {
        type: schemaComposer.createObjectTC(`type Tag { id: Int, title: String}`),
        resolve: () => ({
          id: 1,
          title: 'Some tag'
        })
      }
    }, RemoteQueryTC.getFields()));
    expect(schemaComposer.Query.getFieldNames()).toEqual(['tag', 'users']);
    const schema = schemaComposer.buildSchema();
    expect(await graphql(schema, `
          query {
            tag {
              id
              title
            }
            users {
              age
            }
          }
        `)).toEqual({
      data: {
        tag: {
          id: 1,
          title: 'Some tag'
        },
        users: [{
          age: 10
        }, {
          age: 20
        }, {
          age: 30
        }]
      }
    });
  });
  it('schema stitching on Query.remote', async () => {
    const RemoteQueryType = remoteSchema._queryType;
    const RemoteQueryTC = schemaComposer.createObjectTC(RemoteQueryType);
    schemaComposer.Query.addFields({
      tag: {
        type: schemaComposer.createObjectTC(`type Tag { id: Int, title: String}`),
        resolve: () => ({
          id: 1,
          title: 'Some tag'
        })
      },
      remote: {
        type: schemaComposer.createObjectTC({
          name: 'RemoteSchema',
          fields: RemoteQueryTC.getFields()
        }),
        resolve: () => ({}) // it's important to return something (not null/undefined)

      }
    });
    expect(schemaComposer.Query.getFieldNames()).toEqual(['tag', 'remote']);
    const schema = schemaComposer.buildSchema();
    expect(await graphql(schema, `
          query {
            tag {
              id
              title
            }
            remote {
              users {
                age
              }
            }
          }
        `)).toEqual({
      data: {
        tag: {
          id: 1,
          title: 'Some tag'
        },
        remote: {
          users: [{
            age: 10
          }, {
            age: 20
          }, {
            age: 30
          }]
        }
      }
    });
  });
  it('using remote type in local schema', async () => {
    const RemoteQueryType = remoteSchema._queryType;
    const RemoteQueryTC = schemaComposer.createObjectTC(RemoteQueryType);
    const RemoteUserTC = RemoteQueryTC.getFieldTC('users');
    expect(RemoteUserTC).toBeInstanceOf(ObjectTypeComposer);
    const remoteUsersFC = RemoteQueryTC.getFieldConfig('users');

    if (RemoteUserTC instanceof ObjectTypeComposer) {
      const LocalArticleTC = schemaComposer.createObjectTC({
        name: 'Article',
        fields: {
          text: {
            type: 'String'
          },
          author: {
            type: RemoteUserTC,
            args: _objectSpread({}, remoteUsersFC.args),
            resolve: (source, args, context, info) => {
              if (!remoteUsersFC.resolve) return null;
              const users = remoteUsersFC.resolve(source, args, context, info); // for simplicity return first user

              return users[0];
            }
          }
        }
      });
      schemaComposer.Query.addFields({
        article: {
          type: LocalArticleTC,
          resolve: () => ({
            text: 'Article 1'
          })
        }
      });
      const schema = schemaComposer.buildSchema();
      expect(await graphql(schema, `
            query {
              article {
                text
                author {
                  name
                  age
                  access {
                    msg
                  }
                }
              }
            }
          `)).toEqual({
        data: {
          article: {
            text: 'Article 1',
            author: {
              access: {
                msg: 'disallowed'
              },
              age: 10,
              name: 'u1'
            }
          }
        }
      });
    }
  });
  it('adding remote type to SchemaComposer and check reference by name', () => {
    const RemoteQueryType = remoteSchema._queryType;
    const RemoteQueryTC = schemaComposer.createObjectTC(RemoteQueryType);
    const UserTC = RemoteQueryTC.getFieldTC('users');
    schemaComposer.add(UserTC);
    const ArticleTC = schemaComposer.createObjectTC({
      name: 'Article',
      fields: {
        user: 'User',
        users: ['User']
      }
    });
    const userType = ArticleTC.getFieldType('user');
    expect(userType).toBeInstanceOf(GraphQLObjectType);
    expect(userType.name).toBe('User');
    const usersType = ArticleTC.getFieldType('users');
    expect(usersType).toBeInstanceOf(GraphQLList);
    expect(usersType.ofType.name).toBe('User');
  });
});