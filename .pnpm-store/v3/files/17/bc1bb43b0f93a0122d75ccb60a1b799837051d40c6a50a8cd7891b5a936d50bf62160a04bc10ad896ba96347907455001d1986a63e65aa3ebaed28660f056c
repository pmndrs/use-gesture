import React from 'react';
import { _poly } from './transform';

const evalCode = (code, scope) => {
  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map(key => scope[key]);
  // eslint-disable-next-line no-new-func
  const res = new Function('_poly', 'React', ...scopeKeys, code);
  return res(_poly, React, ...scopeValues);
};

export default evalCode;
