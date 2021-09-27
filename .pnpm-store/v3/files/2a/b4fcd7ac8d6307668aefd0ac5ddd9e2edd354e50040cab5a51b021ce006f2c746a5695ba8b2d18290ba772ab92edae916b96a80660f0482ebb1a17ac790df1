import { isValidElement, cloneElement } from 'react';

/**
 * Type-safe clone element
 *
 * @param element
 * @param props
 * @param children
 */
function cloneValidElement(element, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return /*#__PURE__*/isValidElement(element) ? cloneElement.apply(void 0, [element, props].concat(children)) : element;
}

export { cloneValidElement };
