'use strict';

var React = require('react');
var removeItemFromArray = require('reakit-utils/removeItemFromArray');

var MenuContext = /*#__PURE__*/React.createContext(null);
function useMenuContext(menuRef, role, options) {
  var orphan = "unstable_orphan" in options && options.unstable_orphan;
  var parent = React.useContext(MenuContext);

  var _React$useState = React.useState([]),
      children = _React$useState[0],
      setChildren = _React$useState[1];

  var _ref = parent || {},
      addChildToParent = _ref.addChild,
      removeChildFromParent = _ref.removeChild;

  var addChild = React.useCallback(function (ref) {
    return setChildren(function (refs) {
      return [].concat(refs, [ref]);
    });
  }, []);
  var removeChild = React.useCallback(function (ref) {
    return setChildren(function (refs) {
      return removeItemFromArray.removeItemFromArray(refs, ref);
    });
  }, []); // If it's a nested menu, add it to parent

  React.useEffect(function () {
    if (!addChildToParent || orphan) return undefined;
    addChildToParent(menuRef);
    return function () {
      removeChildFromParent === null || removeChildFromParent === void 0 ? void 0 : removeChildFromParent(menuRef);
    };
  }, [menuRef, addChildToParent, removeChildFromParent, orphan]);
  var providerValue = React.useMemo(function () {
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
  var wrapElement = React.useCallback(function (element) {
    return /*#__PURE__*/React.createElement(MenuContext.Provider, {
      value: providerValue
    }, element);
  }, [providerValue]);
  return wrapElement;
}

exports.MenuContext = MenuContext;
exports.useMenuContext = useMenuContext;
