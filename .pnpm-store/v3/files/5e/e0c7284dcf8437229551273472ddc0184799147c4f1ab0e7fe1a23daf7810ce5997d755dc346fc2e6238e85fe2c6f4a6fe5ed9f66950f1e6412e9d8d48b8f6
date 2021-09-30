"use strict";

var _graphql = require("../../graphql");

var _ = require("..");

// copied from https://github.com/taion/graphql-type-json
const FIXTURE = {
  string: 'string',
  int: 3,
  float: Math.PI,
  true: true,
  false: true,
  null: null,
  object: {
    string: 'string',
    int: 3,
    float: Math.PI,
    true: true,
    false: true,
    null: null
  },
  array: ['string', 3, Math.PI, true, false, null]
};
describe('GraphQLJSON', () => {
  let schema;
  beforeEach(() => {
    schema = new _graphql.GraphQLSchema({
      query: new _graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
          value: {
            type: _.GraphQLJSON,
            args: {
              arg: {
                type: _.GraphQLJSON
              }
            },
            resolve: (obj, {
              arg
            }) => arg
          }
        }
      })
    });
  });
  describe('serialize', () => {
    it('should support serialization', () => {
      expect(_.GraphQLJSON.serialize(FIXTURE)).toEqual(FIXTURE);
    });
  });
  describe('parseValue', () => {
    it('should support parsing values', done => {
      (0, _graphql.graphql)(schema, 'query ($arg: JSON) { value(arg: $arg) }', null, null, {
        arg: FIXTURE
      }).then(({
        data
      }) => {
        expect(data.value).toEqual(FIXTURE);
        done();
      });
    });
  });
  describe('parseLiteral', () => {
    it('should support parsing literals', done => {
      (0, _graphql.graphql)(schema, `
          {
            value(
              arg: {
                string: "string"
                int: 3
                float: 3.14
                true: true
                false: false
                null: null
                object: {
                  string: "string"
                  int: 3
                  float: 3.14
                  true: true
                  false: false
                  null: null
                }
                array: ["string", 3, 3.14, true, false, null]
              }
            )
          }
        `).then(({
        data
      }) => {
        expect(data.value).toEqual({
          string: 'string',
          int: 3,
          float: 3.14,
          true: true,
          false: false,
          null: null,
          object: {
            string: 'string',
            int: 3,
            float: 3.14,
            true: true,
            false: false,
            null: null
          },
          array: ['string', 3, 3.14, true, false, null]
        });
        done();
      });
    });
    it('should reject invalid literals', async () => {
      const {
        data
      } = await (0, _graphql.graphql)(schema, `
        {
          value(arg: NaN){
            string: "string"
        }
      `);
      expect(data).toBeUndefined();
    });
  });
});