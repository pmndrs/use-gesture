'use strict';

var isObject = require('is-extendable');
var merge = require('mixin-deep');
var get = require('get-value');
var set = require('set-value');

module.exports = function mergeValue(obj, prop, value) {
  if (!isObject(obj)) {
    throw new TypeError('expected an object');
  }

  if (typeof prop !== 'string' || value == null) {
    return merge.apply(null, arguments);
  }

  if (typeof value === 'string') {
    set(obj, prop, value);
    return obj;
  }

  var current = get(obj, prop);
  if (isObject(value) && isObject(current)) {
    value = merge({}, current, value);
  }

  set(obj, prop, value);
  return obj;
};
