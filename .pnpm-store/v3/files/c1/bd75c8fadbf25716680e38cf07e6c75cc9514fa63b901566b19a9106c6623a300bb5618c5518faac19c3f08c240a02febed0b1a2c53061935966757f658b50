import { b as _createForOfIteratorHelperLoose } from './_rollupPluginBabelHelpers-1f0bf8c2.js';

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

  for (var _iterator = _createForOfIteratorHelperLoose(items), _step; !(_step = _iterator()).done;) {
    _loop();
  }

  return groups;
}

function flatten(grid) {
  var flattened = [];

  for (var _iterator = _createForOfIteratorHelperLoose(grid), _step; !(_step = _iterator()).done;) {
    var row = _step.value;
    flattened.push.apply(flattened, row);
  }

  return flattened;
}

function reverse(array) {
  return array.slice().reverse();
}

export { flatten as f, groupItems as g, reverse as r };
