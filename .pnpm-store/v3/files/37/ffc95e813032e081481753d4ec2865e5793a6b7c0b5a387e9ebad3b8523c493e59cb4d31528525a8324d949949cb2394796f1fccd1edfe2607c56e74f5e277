'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function useLazyRef(fn) {
  var isSet = react.useRef(false);
  var ref = react.useRef();

  if (!isSet.current) {
    isSet.current = true;
    ref.current = fn();
  }

  return ref;
}

exports.useLazyRef = useLazyRef;
