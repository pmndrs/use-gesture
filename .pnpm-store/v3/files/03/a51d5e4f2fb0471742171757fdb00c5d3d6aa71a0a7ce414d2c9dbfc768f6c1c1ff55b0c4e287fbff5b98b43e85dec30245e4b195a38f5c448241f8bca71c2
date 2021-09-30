/* @flow strict */

export function isString(value: any) /* : boolean %checks */ {
  return typeof value === 'string';
}

export function isObject(value: any) /* : boolean %checks */ {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export function isFunction(value: any) /* : boolean %checks */ {
  return !!(value && value.constructor && value.call && typeof value === 'function' && value.apply);
}
