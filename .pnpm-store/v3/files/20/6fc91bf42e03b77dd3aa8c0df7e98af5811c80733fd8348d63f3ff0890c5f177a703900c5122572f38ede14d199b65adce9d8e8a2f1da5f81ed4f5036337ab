"use strict";

exports.__esModule = true;
exports.getLocalName = getLocalName;
exports.isElement = isElement;
exports.isHTMLTableCaptionElement = isHTMLTableCaptionElement;
exports.isHTMLInputElement = isHTMLInputElement;
exports.isHTMLOptGroupElement = isHTMLOptGroupElement;
exports.isHTMLSelectElement = isHTMLSelectElement;
exports.isHTMLTableElement = isHTMLTableElement;
exports.isHTMLTextAreaElement = isHTMLTextAreaElement;
exports.safeWindow = safeWindow;
exports.isHTMLFieldSetElement = isHTMLFieldSetElement;
exports.isHTMLLegendElement = isHTMLLegendElement;
exports.isHTMLSlotElement = isHTMLSlotElement;
exports.isSVGElement = isSVGElement;
exports.isSVGSVGElement = isSVGSVGElement;
exports.isSVGTitleElement = isSVGTitleElement;
exports.queryIdRefs = queryIdRefs;
exports.hasAnyConcreteRoles = hasAnyConcreteRoles;

var _getRole = _interopRequireDefault(require("./getRole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Safe Element.localName for all supported environments
 * @param element
 */
function getLocalName(element) {
  var _element$localName;

  return (// eslint-disable-next-line no-restricted-properties -- actual guard for environments without localName
    (_element$localName = element.localName) !== null && _element$localName !== void 0 ? _element$localName : // eslint-disable-next-line no-restricted-properties -- required for the fallback
    element.tagName.toLowerCase()
  );
}

function isElement(node) {
  return node !== null && node.nodeType === node.ELEMENT_NODE;
}

function isHTMLTableCaptionElement(node) {
  return isElement(node) && getLocalName(node) === "caption";
}

function isHTMLInputElement(node) {
  return isElement(node) && getLocalName(node) === "input";
}

function isHTMLOptGroupElement(node) {
  return isElement(node) && getLocalName(node) === "optgroup";
}

function isHTMLSelectElement(node) {
  return isElement(node) && getLocalName(node) === "select";
}

function isHTMLTableElement(node) {
  return isElement(node) && getLocalName(node) === "table";
}

function isHTMLTextAreaElement(node) {
  return isElement(node) && getLocalName(node) === "textarea";
}

function safeWindow(node) {
  var _ref = node.ownerDocument === null ? node : node.ownerDocument,
      defaultView = _ref.defaultView;

  if (defaultView === null) {
    throw new TypeError("no window available");
  }

  return defaultView;
}

function isHTMLFieldSetElement(node) {
  return isElement(node) && getLocalName(node) === "fieldset";
}

function isHTMLLegendElement(node) {
  return isElement(node) && getLocalName(node) === "legend";
}

function isHTMLSlotElement(node) {
  return isElement(node) && getLocalName(node) === "slot";
}

function isSVGElement(node) {
  return isElement(node) && node.ownerSVGElement !== undefined;
}

function isSVGSVGElement(node) {
  return isElement(node) && getLocalName(node) === "svg";
}

function isSVGTitleElement(node) {
  return isSVGElement(node) && getLocalName(node) === "title";
}
/**
 *
 * @param {Node} node -
 * @param {string} attributeName -
 * @returns {Element[]} -
 */


function queryIdRefs(node, attributeName) {
  if (isElement(node) && node.hasAttribute(attributeName)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe due to hasAttribute check
    var ids = node.getAttribute(attributeName).split(" ");
    return ids.map(function (id) {
      return node.ownerDocument.getElementById(id);
    }).filter(function (element) {
      return element !== null;
    } // TODO: why does this not narrow?
    );
  }

  return [];
}

function hasAnyConcreteRoles(node, roles) {
  if (isElement(node)) {
    return roles.indexOf((0, _getRole.default)(node)) !== -1;
  }

  return false;
}
//# sourceMappingURL=util.js.map