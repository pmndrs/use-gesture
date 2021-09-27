function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export function parseAttribute(_ref) {
  var _ref$highlightPreTag = _ref.highlightPreTag,
      highlightPreTag = _ref$highlightPreTag === void 0 ? '<mark>' : _ref$highlightPreTag,
      _ref$highlightPostTag = _ref.highlightPostTag,
      highlightPostTag = _ref$highlightPostTag === void 0 ? '</mark>' : _ref$highlightPostTag,
      highlightedValue = _ref.highlightedValue;
  var splitByPreTag = highlightedValue.split(highlightPreTag);
  var firstValue = splitByPreTag.shift();
  var elements = !firstValue ? [] : [{
    value: firstValue,
    isHighlighted: false
  }];

  if (highlightPostTag === highlightPreTag) {
    var isHighlighted = true;
    splitByPreTag.forEach(function (split) {
      elements.push({
        value: split,
        isHighlighted: isHighlighted
      });
      isHighlighted = !isHighlighted;
    });
  } else {
    splitByPreTag.forEach(function (split) {
      var splitByPostTag = split.split(highlightPostTag);
      elements.push({
        value: splitByPostTag[0],
        isHighlighted: true
      });

      if (splitByPostTag[1] !== '') {
        elements.push({
          value: splitByPostTag[1],
          isHighlighted: false
        });
      }
    });
  }

  return elements;
}

function getAttributeValueByPath(hit, path) {
  var parts = path.split('.');
  var value = parts.reduce(function (current, key) {
    return current && current[key];
  }, hit);

  if (typeof value !== 'string') {
    throw new Error("The attribute ".concat(JSON.stringify(path), " does not exist on the hit."));
  }

  return value;
}

export function parseHighlightedAttribute(_ref2) {
  var hit = _ref2.hit,
      attribute = _ref2.attribute,
      highlightPreTag = _ref2.highlightPreTag,
      highlightPostTag = _ref2.highlightPostTag;
  var highlightedValue = getAttributeValueByPath(hit, "_highlightResult.".concat(attribute, ".value"));
  return parseAttribute({
    highlightPreTag: highlightPreTag,
    highlightPostTag: highlightPostTag,
    highlightedValue: highlightedValue
  });
}
export function parseReverseHighlightedAttribute(_ref3) {
  var hit = _ref3.hit,
      attribute = _ref3.attribute,
      highlightPreTag = _ref3.highlightPreTag,
      highlightPostTag = _ref3.highlightPostTag;
  var highlightedValue = getAttributeValueByPath(hit, "_highlightResult.".concat(attribute, ".value"));
  var parts = parseAttribute({
    highlightPreTag: highlightPreTag,
    highlightPostTag: highlightPostTag,
    highlightedValue: highlightedValue
  }); // We don't want to highlight the whole word when no parts match.

  if (!parts.some(function (part) {
    return part.isHighlighted;
  })) {
    return parts.map(function (part) {
      return _objectSpread(_objectSpread({}, part), {}, {
        isHighlighted: false
      });
    });
  }

  return parts.map(function (part) {
    return _objectSpread(_objectSpread({}, part), {}, {
      isHighlighted: !part.isHighlighted
    });
  });
}
export function parseSnippetedAttribute(_ref4) {
  var hit = _ref4.hit,
      attribute = _ref4.attribute,
      highlightPreTag = _ref4.highlightPreTag,
      highlightPostTag = _ref4.highlightPostTag;
  var highlightedValue = getAttributeValueByPath(hit, "_snippetResult.".concat(attribute, ".value"));
  return parseAttribute({
    highlightPreTag: highlightPreTag,
    highlightPostTag: highlightPostTag,
    highlightedValue: highlightedValue
  });
}