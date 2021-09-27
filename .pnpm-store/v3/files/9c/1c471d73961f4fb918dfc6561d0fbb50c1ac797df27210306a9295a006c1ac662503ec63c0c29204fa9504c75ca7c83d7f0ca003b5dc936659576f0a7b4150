'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('./getDocument.js');
require('./getWindow.js');
require('./canUseDOM.js');
var useIsomorphicEffect = require('./useIsomorphicEffect.js');

/**
 * A `React.Ref` that keeps track of the passed `value`.
 */

function useLiveRef(value) {
  var ref = React.useRef(value);
  useIsomorphicEffect.useIsomorphicEffect(function () {
    ref.current = value;
  });
  return ref;
}

exports.useLiveRef = useLiveRef;
