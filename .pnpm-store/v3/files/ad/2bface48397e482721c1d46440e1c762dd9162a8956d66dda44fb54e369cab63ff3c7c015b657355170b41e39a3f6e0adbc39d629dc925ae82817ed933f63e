/**
 * Module Dependencies
 */

var xor = require('../');
var assert = require('better-assert');

/**
 * Tests
 */

describe('xor truth table:', function() {
  it('T T F', function() {
    assert(!xor(true, true));
  })

  it('T F T', function() {
    assert(xor(true, false));
  })

  it('F T T', function() {
    assert(xor(false, true));
  })

  it('F F F', function() {
    assert(!xor(false, false));
  })
})
