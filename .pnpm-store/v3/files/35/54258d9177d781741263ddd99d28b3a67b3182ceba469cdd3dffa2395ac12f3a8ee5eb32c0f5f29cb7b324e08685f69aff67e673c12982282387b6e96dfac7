'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-8f9a8751.js');

function groupItems(items) {
  var groups = [[]];

  var _loop = function _loop() {
    var item = _step.value;
    var group = groups.find(function (g) {
      return !g[0] || g[0].groupId === item.groupId;
    });

    if (group) {
      group.push(item);
    } else {
      groups.push([item]);
    }
  };

  for (var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelperLoose(items), _step; !(_step = _iterator()).done;) {
    _loop();
  }

  return groups;
}

function flatten(grid) {
  var flattened = [];

  for (var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelperLoose(grid), _step; !(_step = _iterator()).done;) {
    var row = _step.value;
    flattened.push.apply(flattened, row);
  }

  return flattened;
}

function reverse(array) {
  return array.slice().reverse();
}

exports.flatten = flatten;
exports.groupItems = groupItems;
exports.reverse = reverse;
