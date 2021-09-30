"use strict";

var _deepmerge = require("../deepmerge");

describe('deepmerge', () => {
  it('should merge arrays', () => {
    expect((0, _deepmerge.deepmerge)([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
  });
  it('should merge objects', () => {
    expect((0, _deepmerge.deepmerge)({
      a: 1
    }, {
      b: 2
    })).toEqual({
      a: 1,
      b: 2
    });
    expect((0, _deepmerge.deepmerge)({
      a: 1
    }, {
      a: 2,
      b: 2
    })).toEqual({
      a: 2,
      b: 2
    });
  });
  it('should merge nested objects', () => {
    expect((0, _deepmerge.deepmerge)({
      a: {
        aa: 1
      }
    }, {
      a: {
        bb: 2
      }
    })).toEqual({
      a: {
        aa: 1,
        bb: 2
      }
    });
  });
  it('should merge arrays in nested objects', () => {
    expect((0, _deepmerge.deepmerge)({
      a: {
        aa: [1]
      }
    }, {
      a: {
        aa: [2]
      }
    })).toEqual({
      a: {
        aa: [1, 2]
      }
    });
  });
  it('should merge objects in arrays', () => {
    expect((0, _deepmerge.deepmerge)([{
      a: {
        aa: [1]
      }
    }], [{
      a: {
        aa: [2]
      }
    }])).toEqual([{
      a: {
        aa: [1, 2]
      }
    }]);
  });
});