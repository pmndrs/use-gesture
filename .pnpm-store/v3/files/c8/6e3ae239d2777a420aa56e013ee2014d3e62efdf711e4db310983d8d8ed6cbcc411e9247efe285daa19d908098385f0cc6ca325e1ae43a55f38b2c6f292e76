"use strict";

exports.__esModule = true;
exports.computeAccessibleDescription = computeAccessibleDescription;

var _accessibleNameAndDescription = require("./accessible-name-and-description");

var _util = require("./util");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * implements https://w3c.github.io/accname/#mapping_additional_nd_description
 * @param root
 * @param [options]
 * @parma [options.getComputedStyle] - mock window.getComputedStyle. Needs `content`, `display` and `visibility`
 */
function computeAccessibleDescription(root) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var description = (0, _util.queryIdRefs)(root, "aria-describedby").map(function (element) {
    return (0, _accessibleNameAndDescription.computeTextAlternative)(element, _objectSpread(_objectSpread({}, options), {}, {
      compute: "description"
    }));
  }).join(" "); // TODO: Technically we need to make sure that node wasn't used for the accessible name
  //       This causes `description_1.0_combobox-focusable-manual` to fail
  //
  // https://www.w3.org/TR/html-aam-1.0/#accessible-name-and-description-computation
  // says for so many elements to use the `title` that we assume all elements are considered

  if (description === "") {
    var title = root.getAttribute("title");
    description = title === null ? "" : title;
  }

  return description;
}
//# sourceMappingURL=accessible-description.js.map