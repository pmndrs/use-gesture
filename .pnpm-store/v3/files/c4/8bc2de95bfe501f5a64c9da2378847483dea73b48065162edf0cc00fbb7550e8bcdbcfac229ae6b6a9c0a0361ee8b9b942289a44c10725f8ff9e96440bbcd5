'use strict';

function findFirstEnabledItem(items, excludeId) {
  if (excludeId) {
    return items.find(function (item) {
      return !item.disabled && item.id !== excludeId;
    });
  }

  return items.find(function (item) {
    return !item.disabled;
  });
}

function getCurrentId(options, passedId) {
  var _findFirstEnabledItem;

  if (passedId || passedId === null) {
    return passedId;
  }

  if (options.currentId || options.currentId === null) {
    return options.currentId;
  }

  return (_findFirstEnabledItem = findFirstEnabledItem(options.items || [])) === null || _findFirstEnabledItem === void 0 ? void 0 : _findFirstEnabledItem.id;
}

exports.findFirstEnabledItem = findFirstEnabledItem;
exports.getCurrentId = getCurrentId;
