'use strict';

function formatInputName(name, separator) {
  if (separator === void 0) {
    separator = ".";
  }

  if (Array.isArray(name)) return name.join(separator);
  return name;
}

function getInputId(name, baseId, suffix) {
  if (suffix === void 0) {
    suffix = "";
  }

  if (baseId) {
    return baseId + "-" + formatInputName(name, "-") + suffix;
  }

  return undefined;
}

exports.formatInputName = formatInputName;
exports.getInputId = getInputId;
