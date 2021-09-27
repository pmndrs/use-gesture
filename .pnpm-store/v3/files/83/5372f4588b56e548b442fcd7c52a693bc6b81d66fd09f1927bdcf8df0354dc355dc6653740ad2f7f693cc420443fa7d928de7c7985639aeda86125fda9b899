'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useIsomorphicEffect = require('reakit-utils/useIsomorphicEffect');
var canUseDOM = require('reakit-utils/canUseDOM');
var ReactDOM = require('react-dom');

function getBodyElement() {
  return canUseDOM.canUseDOM ? document.body : null;
}

var PortalContext = /*#__PURE__*/React.createContext(getBodyElement());
function Portal(_ref) {
  var children = _ref.children;
  // if it's a nested portal, context is the parent portal
  // otherwise it's document.body
  // https://github.com/reakit/reakit/issues/513
  var context = React.useContext(PortalContext) || getBodyElement();

  var _React$useState = React.useState(function () {
    if (canUseDOM.canUseDOM) {
      var element = document.createElement("div");
      element.className = Portal.__className;
      return element;
    } // ssr


    return null;
  }),
      hostNode = _React$useState[0];

  useIsomorphicEffect.useIsomorphicEffect(function () {
    if (!hostNode || !context) return undefined;
    context.appendChild(hostNode);
    return function () {
      context.removeChild(hostNode);
    };
  }, [hostNode, context]);

  if (hostNode) {
    return /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(PortalContext.Provider, {
      value: hostNode
    }, children), hostNode);
  } // ssr


  return null;
}
Portal.__className = "__reakit-portal";
Portal.__selector = "." + Portal.__className;

exports.Portal = Portal;
exports.PortalContext = PortalContext;
