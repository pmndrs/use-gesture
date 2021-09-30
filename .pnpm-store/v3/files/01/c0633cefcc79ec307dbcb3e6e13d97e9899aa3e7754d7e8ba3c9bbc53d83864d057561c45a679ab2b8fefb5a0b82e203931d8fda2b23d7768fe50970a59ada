"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class JestAssertionError extends Error {
  constructor(result, callsite) {
    super(result.message());
    this.matcherResult = result;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, callsite);
    }
  }

}

const chainMatchers = (matchers, originalMatchers = matchers) => {
  const mappedMatchers = Object.keys(matchers).map(name => {
    const matcher = matchers[name];

    if (typeof matcher === 'function') {
      const newMatcher = (...args) => {
        try {
          matcher(...args); // run matcher

          return chainMatchers(originalMatchers); // chain the original matchers again
        } catch (error) {
          throw new JestAssertionError(error.matcherResult, newMatcher);
        }
      };

      return {
        [name]: newMatcher
      };
    }

    return {
      [name]: chainMatchers(matcher, originalMatchers) // recurse on .not/.resolves/.rejects

    };
  });
  return Object.assign({}, ...mappedMatchers);
};

var _default = expect => {
  // proxy the expect function
  let expectProxy = Object.assign((...args) => chainMatchers(expect(...args)), // partially apply expect to get all matchers and chain them
  expect // clone additional properties on expect
  );

  expectProxy.extend = o => {
    expect.extend(o); // add new matchers to expect

    expectProxy = Object.assign(expectProxy, expect); // clone new asymmetric matchers
  };

  return expectProxy;
};

exports.default = _default;