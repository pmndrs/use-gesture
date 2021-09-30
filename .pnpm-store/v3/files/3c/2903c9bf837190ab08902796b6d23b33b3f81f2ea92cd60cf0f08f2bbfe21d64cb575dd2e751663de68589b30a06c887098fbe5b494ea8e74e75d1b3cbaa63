import { createContext, useContext, useState, useCallback, useEffect, useMemo, createElement } from 'react';
import { removeItemFromArray } from 'reakit-utils/removeItemFromArray';

var MenuContext = /*#__PURE__*/createContext(null);
function useMenuContext(menuRef, role, options) {
  var orphan = "unstable_orphan" in options && options.unstable_orphan;
  var parent = useContext(MenuContext);

  var _React$useState = useState([]),
      children = _React$useState[0],
      setChildren = _React$useState[1];

  var _ref = parent || {},
      addChildToParent = _ref.addChild,
      removeChildFromParent = _ref.removeChild;

  var addChild = useCallback(function (ref) {
    return setChildren(function (refs) {
      return [].concat(refs, [ref]);
    });
  }, []);
  var removeChild = useCallback(function (ref) {
    return setChildren(function (refs) {
      return removeItemFromArray(refs, ref);
    });
  }, []); // If it's a nested menu, add it to parent

  useEffect(function () {
    if (!addChildToParent || orphan) return undefined;
    addChildToParent(menuRef);
    return function () {
      removeChildFromParent === null || removeChildFromParent === void 0 ? void 0 : removeChildFromParent(menuRef);
    };
  }, [menuRef, addChildToParent, removeChildFromParent, orphan]);
  var providerValue = useMemo(function () {
    return {
      orientation: options.orientation,
      next: options.next,
      previous: options.previous,
      ref: menuRef,
      role: role,
      parent: parent,
      children: children,
      addChild: addChild,
      removeChild: removeChild
    };
  }, [options.orientation, options.next, options.previous, menuRef, role, parent, children, addChild, removeChild]);
  var wrapElement = useCallback(function (element) {
    return /*#__PURE__*/createElement(MenuContext.Provider, {
      value: providerValue
    }, element);
  }, [providerValue]);
  return wrapElement;
}

export { MenuContext as M, useMenuContext as u };
