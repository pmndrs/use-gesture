'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('./getDocument.js');
require('./getWindow.js');
var canUseDOM = require('./canUseDOM.js');

/**
 * `React.useLayoutEffect` that fallbacks to `React.useEffect` on server side
 * rendering.
 */

var useIsomorphicEffect = !canUseDOM.canUseDOM ? React.useEffect : React.useLayoutEffect;

exports.useIsomorphicEffect = useIsomorphicEffect;
