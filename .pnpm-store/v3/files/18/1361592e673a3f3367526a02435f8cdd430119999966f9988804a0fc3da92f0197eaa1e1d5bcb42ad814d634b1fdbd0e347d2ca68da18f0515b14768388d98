import { useEffect, useLayoutEffect } from 'react';
import './getDocument.js';
import './getWindow.js';
import { canUseDOM } from './canUseDOM.js';

/**
 * `React.useLayoutEffect` that fallbacks to `React.useEffect` on server side
 * rendering.
 */

var useIsomorphicEffect = !canUseDOM ? useEffect : useLayoutEffect;

export { useIsomorphicEffect };
