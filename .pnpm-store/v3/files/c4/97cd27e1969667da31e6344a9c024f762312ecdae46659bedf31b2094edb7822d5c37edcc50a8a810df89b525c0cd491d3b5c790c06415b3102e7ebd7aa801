"use strict";

var _graphql = require("../../graphql");

var _date = _interopRequireDefault(require("../date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// copied from https://github.com/taion/graphql-type-json
describe('GraphQLDate', () => {
  describe('serialize', () => {
    it('pass Date object', () => {
      expect(_date.default.serialize(new Date(Date.UTC(2017, 10, 19)))).toBe('2017-11-19T00:00:00.000Z');
    });
    it('pass number', () => {
      expect(_date.default.serialize(new Date(Date.UTC(2018, 10, 1)).getTime())).toBe('2018-11-01T00:00:00.000Z');
    });
    it('pass "2016-02-02T00:13:22.000Z"', () => {
      expect(_date.default.serialize('2016-02-02T00:13:22.000Z')).toBe('2016-02-02T00:13:22.000Z');
    });
    it('pass "2016-02-02T00:13:22Z"', () => {
      expect(_date.default.serialize('2016-02-02T00:13:22Z')).toBe('2016-02-02T00:13:22Z');
    });
    it('pass "2016-02-02"', () => {
      expect(_date.default.serialize('2016-02-02')).toBe('2016-02-02');
    });
  });
  describe('parseValue', () => {
    it('support parsing values', () => {
      expect(_date.default.parseValue('2017-11-18T00:00:00.000Z')).toEqual(new Date(Date.UTC(2017, 10, 18, 0, 0, 0)));
    });
  });
  describe('parseLiteral', () => {
    it('parse a ast literal', async () => {
      const ast = {
        kind: _graphql.Kind.STRING,
        value: '2015-07-24T10:56:42.744Z'
      };

      const date = _date.default.parseLiteral(ast);

      expect(date).toBeInstanceOf(Date);
      expect(date.toJSON()).toEqual(ast.value);
    });
    it('parse a ast literal with tz', async () => {
      const ast = {
        kind: _graphql.Kind.STRING,
        value: '2015-07-24T10:56:42.744+06:00'
      };

      const date = _date.default.parseLiteral(ast);

      expect(date).toBeInstanceOf(Date);
      expect(date.toJSON()).toEqual('2015-07-24T04:56:42.744Z');
    });
  });
  it('parse a ast literal of integer kind', async () => {
    const ast = {
      kind: _graphql.Kind.INT,
      value: '1541030400000'
    };

    const date = _date.default.parseLiteral(ast);

    expect(date).toBeInstanceOf(Date);
    expect(date.toJSON()).toBe('2018-11-01T00:00:00.000Z');
  });
});