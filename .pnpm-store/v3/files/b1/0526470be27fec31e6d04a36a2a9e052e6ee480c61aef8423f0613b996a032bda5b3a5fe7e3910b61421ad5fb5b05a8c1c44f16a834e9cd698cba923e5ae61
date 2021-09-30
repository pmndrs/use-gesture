import { createContext, useContext, useState, createElement } from 'react';
import { useIsomorphicEffect } from 'reakit-utils/useIsomorphicEffect';
import { canUseDOM } from 'reakit-utils/canUseDOM';
import { createPortal } from 'react-dom';

function getBodyElement() {
  return canUseDOM ? document.body : null;
}

var PortalContext = /*#__PURE__*/createContext(getBodyElement());
function Portal(_ref) {
  var children = _ref.children;
  // if it's a nested portal, context is the parent portal
  // otherwise it's document.body
  // https://github.com/reakit/reakit/issues/513
  var context = useContext(PortalContext) || getBodyElement();

  var _React$useState = useState(function () {
    if (canUseDOM) {
      var element = document.createElement("div");
      element.className = Portal.__className;
      return element;
    } // ssr


    return null;
  }),
      hostNode = _React$useState[0];

  useIsomorphicEffect(function () {
    if (!hostNode || !context) return undefined;
    context.appendChild(hostNode);
    return function () {
      context.removeChild(hostNode);
    };
  }, [hostNode, context]);

  if (hostNode) {
    return /*#__PURE__*/createPortal( /*#__PURE__*/createElement(PortalContext.Provider, {
      value: hostNode
    }, children), hostNode);
  } // ssr


  return null;
}
Portal.__className = "__reakit-portal";
Portal.__selector = "." + Portal.__className;

export { Portal, PortalContext };
