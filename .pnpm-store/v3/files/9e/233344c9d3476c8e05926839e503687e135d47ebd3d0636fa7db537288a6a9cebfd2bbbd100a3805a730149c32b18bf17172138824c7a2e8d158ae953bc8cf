'use strict';

function findEnabledItemById(items, id) {
  if (!id) return undefined;
  return items === null || items === void 0 ? void 0 : items.find(function (item) {
    return item.id === id && !item.disabled;
  });
}

exports.findEnabledItemById = findEnabledItemById;
