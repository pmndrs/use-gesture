'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var React = require('react');
var useIsomorphicEffect = require('reakit-utils/useIsomorphicEffect');
var useSealedState = require('reakit-utils/useSealedState');
var getDocument = require('reakit-utils/getDocument');
var reverse = require('../reverse-4756a49e.js');
var getCurrentId = require('../getCurrentId-eade2850.js');
var findEnabledItemById = require('../findEnabledItemById-03112678.js');
require('../Id/IdProvider.js');
var applyState = require('reakit-utils/applyState');
var Id_IdState = require('../Id/IdState.js');

function isElementPreceding(element1, element2) {
  return Boolean(element2.compareDocumentPosition(element1) & Node.DOCUMENT_POSITION_PRECEDING);
}

function findDOMIndex(items, item) {
  return items.findIndex(function (currentItem) {
    if (!currentItem.ref.current || !item.ref.current) {
      return false;
    }

    return isElementPreceding(item.ref.current, currentItem.ref.current);
  });
}

function getMaxLength(rows) {
  var maxLength = 0;

  for (var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelperLoose(rows), _step; !(_step = _iterator()).done;) {
    var length = _step.value.length;

    if (length > maxLength) {
      maxLength = length;
    }
  }

  return maxLength;
}

/**
 * Turns [row1, row1, row2, row2] into [row1, row2, row1, row2]
 */

function verticalizeItems(items) {
  var groups = reverse.groupItems(items);
  var maxLength = getMaxLength(groups);
  var verticalized = [];

  for (var i = 0; i < maxLength; i += 1) {
    for (var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelperLoose(groups), _step; !(_step = _iterator()).done;) {
      var group = _step.value;

      if (group[i]) {
        verticalized.push(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, group[i]), {}, {
          // If there's no groupId, it means that it's not a grid composite,
          // but a single row instead. So, instead of verticalizing it, that
          // is, assigning a different groupId based on the column index, we
          // keep it undefined so they will be part of the same group.
          // It's useful when using up/down on one-dimensional composites.
          groupId: group[i].groupId ? "" + i : undefined
        }));
      }
    }
  }

  return verticalized;
}

function createEmptyItem(groupId) {
  return {
    id: "__EMPTY_ITEM__",
    disabled: true,
    ref: {
      current: null
    },
    groupId: groupId
  };
}
/**
 * Turns [[row1, row1], [row2]] into [[row1, row1], [row2, row2]]
 */


function fillGroups(groups, currentId, shift) {
  var maxLength = getMaxLength(groups);

  for (var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelperLoose(groups), _step; !(_step = _iterator()).done;) {
    var group = _step.value;

    for (var i = 0; i < maxLength; i += 1) {
      var item = group[i];

      if (!item || shift && item.disabled) {
        var isFrist = i === 0;
        var previousItem = isFrist && shift ? getCurrentId.findFirstEnabledItem(group) : group[i - 1];
        group[i] = previousItem && currentId !== (previousItem === null || previousItem === void 0 ? void 0 : previousItem.id) && shift ? previousItem : createEmptyItem(previousItem === null || previousItem === void 0 ? void 0 : previousItem.groupId);
      }
    }
  }

  return groups;
}

var nullItem = {
  id: null,
  ref: {
    current: null
  }
};
function placeItemsAfter(items, id, shouldInsertNullItem) {
  var index = items.findIndex(function (item) {
    return item.id === id;
  });
  return [].concat(items.slice(index + 1), shouldInsertNullItem ? [nullItem] : [], items.slice(0, index));
}

function getItemsInGroup(items, groupId) {
  return items.filter(function (item) {
    return item.groupId === groupId;
  });
}

var map = {
  horizontal: "vertical",
  vertical: "horizontal"
};
function getOppositeOrientation(orientation) {
  return orientation && map[orientation];
}

function addItemAtIndex(array, item, index) {
  if (!(index in array)) {
    return [].concat(array, [item]);
  }

  return [].concat(array.slice(0, index), [item], array.slice(index));
}

function sortBasedOnDOMPosition(items) {
  var pairs = items.map(function (item, index) {
    return [index, item];
  });
  var isOrderDifferent = false;
  pairs.sort(function (_ref, _ref2) {
    var indexA = _ref[0],
        a = _ref[1];
    var indexB = _ref2[0],
        b = _ref2[1];
    var elementA = a.ref.current;
    var elementB = b.ref.current;
    if (!elementA || !elementB) return 0; // a before b

    if (isElementPreceding(elementA, elementB)) {
      if (indexA > indexB) {
        isOrderDifferent = true;
      }

      return -1;
    } // a after b


    if (indexA < indexB) {
      isOrderDifferent = true;
    }

    return 1;
  });

  if (isOrderDifferent) {
    return pairs.map(function (_ref3) {
      var _ = _ref3[0],
          item = _ref3[1];
      return item;
    });
  }

  return items;
}

function setItemsBasedOnDOMPosition(items, setItems) {
  var sortedItems = sortBasedOnDOMPosition(items);

  if (items !== sortedItems) {
    setItems(sortedItems);
  }
}

function getCommonParent(items) {
  var _firstItem$ref$curren;

  var firstItem = items[0],
      nextItems = items.slice(1);
  var parentElement = firstItem === null || firstItem === void 0 ? void 0 : (_firstItem$ref$curren = firstItem.ref.current) === null || _firstItem$ref$curren === void 0 ? void 0 : _firstItem$ref$curren.parentElement;

  var _loop = function _loop() {
    var parent = parentElement;

    if (nextItems.every(function (item) {
      return parent.contains(item.ref.current);
    })) {
      return {
        v: parentElement
      };
    }

    parentElement = parentElement.parentElement;
  };

  while (parentElement) {
    var _ret = _loop();

    if (typeof _ret === "object") return _ret.v;
  }

  return getDocument.getDocument(parentElement).body;
} // istanbul ignore next: JSDOM doesn't support IntersectionObverser
// See https://github.com/jsdom/jsdom/issues/2032


function useIntersectionObserver(items, setItems) {
  var previousItems = React.useRef([]);
  React.useEffect(function () {
    var callback = function callback() {
      var hasPreviousItems = !!previousItems.current.length; // We don't want to sort items if items have been just registered.

      if (hasPreviousItems) {
        setItemsBasedOnDOMPosition(items, setItems);
      }

      previousItems.current = items;
    };

    var root = getCommonParent(items);
    var observer = new IntersectionObserver(callback, {
      root: root
    });

    for (var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelperLoose(items), _step; !(_step = _iterator()).done;) {
      var item = _step.value;

      if (item.ref.current) {
        observer.observe(item.ref.current);
      }
    }

    return function () {
      observer.disconnect();
    };
  }, [items]);
}

function useTimeoutObserver(items, setItems) {
  React.useEffect(function () {
    var callback = function callback() {
      return setItemsBasedOnDOMPosition(items, setItems);
    };

    var timeout = setTimeout(callback, 250);
    return function () {
      return clearTimeout(timeout);
    };
  });
}

function useSortBasedOnDOMPosition(items, setItems) {
  if (typeof IntersectionObserver === "function") {
    useIntersectionObserver(items, setItems);
  } else {
    useTimeoutObserver(items, setItems);
  }
}

function reducer(state, action) {
  var virtual = state.unstable_virtual,
      rtl = state.rtl,
      orientation = state.orientation,
      items = state.items,
      groups = state.groups,
      currentId = state.currentId,
      loop = state.loop,
      wrap = state.wrap,
      pastIds = state.pastIds,
      shift = state.shift,
      moves = state.unstable_moves,
      includesBaseElement = state.unstable_includesBaseElement,
      initialVirtual = state.initialVirtual,
      initialRTL = state.initialRTL,
      initialOrientation = state.initialOrientation,
      initialCurrentId = state.initialCurrentId,
      initialLoop = state.initialLoop,
      initialWrap = state.initialWrap,
      initialShift = state.initialShift,
      hasSetCurrentId = state.hasSetCurrentId;

  switch (action.type) {
    case "registerGroup":
      {
        var _group = action.group; // If there are no groups yet, just add it as the first one

        if (groups.length === 0) {
          return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
            groups: [_group]
          });
        } // Finds the group index based on DOM position


        var index = findDOMIndex(groups, _group);
        return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          groups: addItemAtIndex(groups, _group, index)
        });
      }

    case "unregisterGroup":
      {
        var _id = action.id;
        var nextGroups = groups.filter(function (group) {
          return group.id !== _id;
        }); // The group isn't registered, so do nothing

        if (nextGroups.length === groups.length) {
          return state;
        }

        return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          groups: nextGroups
        });
      }

    case "registerItem":
      {
        var _item = action.item; // Finds the item group based on the DOM hierarchy

        var _group2 = groups.find(function (r) {
          var _r$ref$current;

          return (_r$ref$current = r.ref.current) === null || _r$ref$current === void 0 ? void 0 : _r$ref$current.contains(_item.ref.current);
        }); // Group will be null if it's a one-dimensional composite


        var nextItem = _rollupPluginBabelHelpers._objectSpread2({
          groupId: _group2 === null || _group2 === void 0 ? void 0 : _group2.id
        }, _item);

        var _index = findDOMIndex(items, nextItem);

        var nextState = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          items: addItemAtIndex(items, nextItem, _index)
        });

        if (!hasSetCurrentId && !moves && initialCurrentId === undefined) {
          var _findFirstEnabledItem;

          // Sets currentId to the first enabled item. This runs whenever an item
          // is registered because the first enabled item may be registered
          // asynchronously.
          return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, nextState), {}, {
            currentId: (_findFirstEnabledItem = getCurrentId.findFirstEnabledItem(nextState.items)) === null || _findFirstEnabledItem === void 0 ? void 0 : _findFirstEnabledItem.id
          });
        }

        return nextState;
      }

    case "unregisterItem":
      {
        var _id2 = action.id;
        var nextItems = items.filter(function (item) {
          return item.id !== _id2;
        }); // The item isn't registered, so do nothing

        if (nextItems.length === items.length) {
          return state;
        } // Filters out the item that is being removed from the pastIds list


        var nextPastIds = pastIds.filter(function (pastId) {
          return pastId !== _id2;
        });

        var _nextState = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          pastIds: nextPastIds,
          items: nextItems
        }); // If the current item is the item that is being removed, focus pastId


        if (currentId && currentId === _id2) {
          var nextId = includesBaseElement ? null : getCurrentId.getCurrentId(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _nextState), {}, {
            currentId: nextPastIds[0]
          }));
          return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _nextState), {}, {
            currentId: nextId
          });
        }

        return _nextState;
      }

    case "move":
      {
        var _id3 = action.id; // move() does nothing

        if (_id3 === undefined) {
          return state;
        } // Removes the current item and the item that is receiving focus from the
        // pastIds list


        var filteredPastIds = pastIds.filter(function (pastId) {
          return pastId !== currentId && pastId !== _id3;
        }); // If there's a currentId, add it to the pastIds list so it can be focused
        // if the new item gets removed or disabled

        var _nextPastIds = currentId ? [currentId].concat(filteredPastIds) : filteredPastIds;

        var _nextState2 = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          pastIds: _nextPastIds
        }); // move(null) will focus the composite element itself, not an item


        if (_id3 === null) {
          return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _nextState2), {}, {
            unstable_moves: moves + 1,
            currentId: getCurrentId.getCurrentId(_nextState2, _id3)
          });
        }

        var _item2 = findEnabledItemById.findEnabledItemById(items, _id3);

        return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _nextState2), {}, {
          unstable_moves: _item2 ? moves + 1 : moves,
          currentId: getCurrentId.getCurrentId(_nextState2, _item2 === null || _item2 === void 0 ? void 0 : _item2.id)
        });
      }

    case "next":
      {
        // If there's no item focused, we just move the first one
        if (currentId == null) {
          return reducer(state, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, action), {}, {
            type: "first"
          }));
        } // RTL doesn't make sense on vertical navigation


        var isHorizontal = orientation !== "vertical";
        var isRTL = rtl && isHorizontal;
        var allItems = isRTL ? reverse.reverse(items) : items;
        var currentItem = allItems.find(function (item) {
          return item.id === currentId;
        }); // If there's no item focused, we just move the first one

        if (!currentItem) {
          return reducer(state, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, action), {}, {
            type: "first"
          }));
        }

        var isGrid = !!currentItem.groupId;
        var currentIndex = allItems.indexOf(currentItem);

        var _nextItems = allItems.slice(currentIndex + 1);

        var nextItemsInGroup = getItemsInGroup(_nextItems, currentItem.groupId); // Home, End

        if (action.allTheWay) {
          // We reverse so we can get the last enabled item in the group. If it's
          // RTL, nextItems and nextItemsInGroup are already reversed and don't
          // have the items before the current one anymore. So we have to get
          // items in group again with allItems.
          var _nextItem2 = getCurrentId.findFirstEnabledItem(isRTL ? getItemsInGroup(allItems, currentItem.groupId) : reverse.reverse(nextItemsInGroup));

          return reducer(state, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, action), {}, {
            type: "move",
            id: _nextItem2 === null || _nextItem2 === void 0 ? void 0 : _nextItem2.id
          }));
        }

        var oppositeOrientation = getOppositeOrientation( // If it's a grid and orientation is not set, it's a next/previous
        // call, which is inherently horizontal. up/down will call next with
        // orientation set to vertical by default (see below on up/down cases).
        isGrid ? orientation || "horizontal" : orientation);
        var canLoop = loop && loop !== oppositeOrientation;
        var canWrap = isGrid && wrap && wrap !== oppositeOrientation;
        var hasNullItem = // `previous` and `up` will set action.hasNullItem, but when calling
        // next directly, hasNullItem will only be true if it's not a grid and
        // loop is set to true, which means that pressing right or down keys on
        // grids will never focus the composite element. On one-dimensional
        // composites that don't loop, pressing right or down keys also doesn't
        // focus the composite element.
        action.hasNullItem || !isGrid && canLoop && includesBaseElement;

        if (canLoop) {
          var loopItems = canWrap && !hasNullItem ? allItems : getItemsInGroup(allItems, currentItem.groupId); // Turns [0, 1, current, 3, 4] into [3, 4, 0, 1]

          var sortedItems = placeItemsAfter(loopItems, currentId, hasNullItem);

          var _nextItem3 = getCurrentId.findFirstEnabledItem(sortedItems, currentId);

          return reducer(state, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, action), {}, {
            type: "move",
            id: _nextItem3 === null || _nextItem3 === void 0 ? void 0 : _nextItem3.id
          }));
        }

        if (canWrap) {
          var _nextItem4 = getCurrentId.findFirstEnabledItem( // We can use nextItems, which contains all the next items, including
          // items from other groups, to wrap between groups. However, if there
          // is a null item (the composite element), we'll only use the next
          // items in the group. So moving next from the last item will focus
          // the composite element (null). On grid composites, horizontal
          // navigation never focuses the composite element, only vertical.
          hasNullItem ? nextItemsInGroup : _nextItems, currentId);

          var _nextId = hasNullItem ? (_nextItem4 === null || _nextItem4 === void 0 ? void 0 : _nextItem4.id) || null : _nextItem4 === null || _nextItem4 === void 0 ? void 0 : _nextItem4.id;

          return reducer(state, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, action), {}, {
            type: "move",
            id: _nextId
          }));
        }

        var _nextItem = getCurrentId.findFirstEnabledItem(nextItemsInGroup, currentId);

        if (!_nextItem && hasNullItem) {
          return reducer(state, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, action), {}, {
            type: "move",
            id: null
          }));
        }

        return reducer(state, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, action), {}, {
          type: "move",
          id: _nextItem === null || _nextItem === void 0 ? void 0 : _nextItem.id
        }));
      }

    case "previous":
      {
        // If currentId is initially set to null, the composite element will be
        // focusable while navigating with arrow keys. But, if it's a grid, we
        // don't want to focus the composite element with horizontal navigation.
        var _isGrid = !!groups.length;

        var _hasNullItem = !_isGrid && includesBaseElement;

        var _nextState3 = reducer(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          items: reverse.reverse(items)
        }), _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, action), {}, {
          type: "next",
          hasNullItem: _hasNullItem
        }));

        return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _nextState3), {}, {
          items: items
        });
      }

    case "down":
      {
        var shouldShift = shift && !action.allTheWay; // First, we make sure groups have the same number of items by filling it
        // with disabled fake items. Then, we reorganize the items list so
        // [1-1, 1-2, 2-1, 2-2] becomes [1-1, 2-1, 1-2, 2-2].

        var verticalItems = verticalizeItems(reverse.flatten(fillGroups(reverse.groupItems(items), currentId, shouldShift)));

        var _canLoop = loop && loop !== "horizontal"; // Pressing down arrow key will only focus the composite element if loop
        // is true or vertical.


        var _hasNullItem2 = _canLoop && includesBaseElement;

        var _nextState4 = reducer(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          orientation: "vertical",
          items: verticalItems
        }), _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, action), {}, {
          type: "next",
          hasNullItem: _hasNullItem2
        }));

        return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _nextState4), {}, {
          orientation: orientation,
          items: items
        });
      }

    case "up":
      {
        var _shouldShift = shift && !action.allTheWay;

        var _verticalItems = verticalizeItems(reverse.reverse(reverse.flatten(fillGroups(reverse.groupItems(items), currentId, _shouldShift)))); // If currentId is initially set to null, we'll always focus the
        // composite element when the up arrow key is pressed in the first row.


        var _hasNullItem3 = includesBaseElement;

        var _nextState5 = reducer(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          orientation: "vertical",
          items: _verticalItems
        }), _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, action), {}, {
          type: "next",
          hasNullItem: _hasNullItem3
        }));

        return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _nextState5), {}, {
          orientation: orientation,
          items: items
        });
      }

    case "first":
      {
        var firstItem = getCurrentId.findFirstEnabledItem(items);
        return reducer(state, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, action), {}, {
          type: "move",
          id: firstItem === null || firstItem === void 0 ? void 0 : firstItem.id
        }));
      }

    case "last":
      {
        var _nextState6 = reducer(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          items: reverse.reverse(items)
        }), _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, action), {}, {
          type: "first"
        }));

        return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _nextState6), {}, {
          items: items
        });
      }

    case "sort":
      {
        return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          items: sortBasedOnDOMPosition(items),
          groups: sortBasedOnDOMPosition(groups)
        });
      }

    case "setVirtual":
      return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
        unstable_virtual: applyState.applyState(action.virtual, virtual)
      });

    case "setRTL":
      return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
        rtl: applyState.applyState(action.rtl, rtl)
      });

    case "setOrientation":
      return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
        orientation: applyState.applyState(action.orientation, orientation)
      });

    case "setCurrentId":
      {
        var nextCurrentId = getCurrentId.getCurrentId(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          currentId: applyState.applyState(action.currentId, currentId)
        }));
        return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          currentId: nextCurrentId,
          hasSetCurrentId: true
        });
      }

    case "setLoop":
      return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
        loop: applyState.applyState(action.loop, loop)
      });

    case "setWrap":
      return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
        wrap: applyState.applyState(action.wrap, wrap)
      });

    case "setShift":
      return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
        shift: applyState.applyState(action.shift, shift)
      });

    case "setIncludesBaseElement":
      {
        return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          unstable_includesBaseElement: applyState.applyState(action.includesBaseElement, includesBaseElement)
        });
      }

    case "reset":
      return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
        unstable_virtual: initialVirtual,
        rtl: initialRTL,
        orientation: initialOrientation,
        currentId: getCurrentId.getCurrentId(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          currentId: initialCurrentId
        })),
        loop: initialLoop,
        wrap: initialWrap,
        shift: initialShift,
        unstable_moves: 0,
        pastIds: []
      });

    case "setItems":
      {
        return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, state), {}, {
          items: action.items
        });
      }

    default:
      throw new Error();
  }
}

function useAction(fn) {
  return React.useCallback(fn, []);
}

function useIsUnmountedRef() {
  var isUnmountedRef = React.useRef(false);
  useIsomorphicEffect.useIsomorphicEffect(function () {
    return function () {
      isUnmountedRef.current = true;
    };
  }, []);
  return isUnmountedRef;
}

function useCompositeState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState.useSealedState(initialState),
      _useSealedState$unsta = _useSealedState.unstable_virtual,
      virtual = _useSealedState$unsta === void 0 ? false : _useSealedState$unsta,
      _useSealedState$rtl = _useSealedState.rtl,
      rtl = _useSealedState$rtl === void 0 ? false : _useSealedState$rtl,
      orientation = _useSealedState.orientation,
      currentId = _useSealedState.currentId,
      _useSealedState$loop = _useSealedState.loop,
      loop = _useSealedState$loop === void 0 ? false : _useSealedState$loop,
      _useSealedState$wrap = _useSealedState.wrap,
      wrap = _useSealedState$wrap === void 0 ? false : _useSealedState$wrap,
      _useSealedState$shift = _useSealedState.shift,
      shift = _useSealedState$shift === void 0 ? false : _useSealedState$shift,
      unstable_includesBaseElement = _useSealedState.unstable_includesBaseElement,
      sealed = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_useSealedState, ["unstable_virtual", "rtl", "orientation", "currentId", "loop", "wrap", "shift", "unstable_includesBaseElement"]);

  var idState = Id_IdState.unstable_useIdState(sealed);

  var _React$useReducer = React.useReducer(reducer, {
    unstable_virtual: virtual,
    rtl: rtl,
    orientation: orientation,
    items: [],
    groups: [],
    currentId: currentId,
    loop: loop,
    wrap: wrap,
    shift: shift,
    unstable_moves: 0,
    pastIds: [],
    unstable_includesBaseElement: unstable_includesBaseElement != null ? unstable_includesBaseElement : currentId === null,
    initialVirtual: virtual,
    initialRTL: rtl,
    initialOrientation: orientation,
    initialCurrentId: currentId,
    initialLoop: loop,
    initialWrap: wrap,
    initialShift: shift
  }),
      _React$useReducer$ = _React$useReducer[0],
      pastIds = _React$useReducer$.pastIds,
      initialVirtual = _React$useReducer$.initialVirtual,
      initialRTL = _React$useReducer$.initialRTL,
      initialOrientation = _React$useReducer$.initialOrientation,
      initialCurrentId = _React$useReducer$.initialCurrentId,
      initialLoop = _React$useReducer$.initialLoop,
      initialWrap = _React$useReducer$.initialWrap,
      initialShift = _React$useReducer$.initialShift,
      hasSetCurrentId = _React$useReducer$.hasSetCurrentId,
      state = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_React$useReducer$, ["pastIds", "initialVirtual", "initialRTL", "initialOrientation", "initialCurrentId", "initialLoop", "initialWrap", "initialShift", "hasSetCurrentId"]),
      dispatch = _React$useReducer[1];

  var _React$useState = React.useState(false),
      hasActiveWidget = _React$useState[0],
      setHasActiveWidget = _React$useState[1]; // register/unregister may be called when this component is unmounted. We
  // store the unmounted state here so we don't update the state if it's true.
  // This only happens in a very specific situation.
  // See https://github.com/reakit/reakit/issues/650


  var isUnmountedRef = useIsUnmountedRef();
  var setItems = React.useCallback(function (items) {
    return dispatch({
      type: "setItems",
      items: items
    });
  }, []);
  useSortBasedOnDOMPosition(state.items, setItems);
  return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, idState), state), {}, {
    unstable_hasActiveWidget: hasActiveWidget,
    unstable_setHasActiveWidget: setHasActiveWidget,
    registerItem: useAction(function (item) {
      if (isUnmountedRef.current) return;
      dispatch({
        type: "registerItem",
        item: item
      });
    }),
    unregisterItem: useAction(function (id) {
      if (isUnmountedRef.current) return;
      dispatch({
        type: "unregisterItem",
        id: id
      });
    }),
    registerGroup: useAction(function (group) {
      if (isUnmountedRef.current) return;
      dispatch({
        type: "registerGroup",
        group: group
      });
    }),
    unregisterGroup: useAction(function (id) {
      if (isUnmountedRef.current) return;
      dispatch({
        type: "unregisterGroup",
        id: id
      });
    }),
    move: useAction(function (id) {
      return dispatch({
        type: "move",
        id: id
      });
    }),
    next: useAction(function (allTheWay) {
      return dispatch({
        type: "next",
        allTheWay: allTheWay
      });
    }),
    previous: useAction(function (allTheWay) {
      return dispatch({
        type: "previous",
        allTheWay: allTheWay
      });
    }),
    up: useAction(function (allTheWay) {
      return dispatch({
        type: "up",
        allTheWay: allTheWay
      });
    }),
    down: useAction(function (allTheWay) {
      return dispatch({
        type: "down",
        allTheWay: allTheWay
      });
    }),
    first: useAction(function () {
      return dispatch({
        type: "first"
      });
    }),
    last: useAction(function () {
      return dispatch({
        type: "last"
      });
    }),
    sort: useAction(function () {
      return dispatch({
        type: "sort"
      });
    }),
    unstable_setVirtual: useAction(function (value) {
      return dispatch({
        type: "setVirtual",
        virtual: value
      });
    }),
    setRTL: useAction(function (value) {
      return dispatch({
        type: "setRTL",
        rtl: value
      });
    }),
    setOrientation: useAction(function (value) {
      return dispatch({
        type: "setOrientation",
        orientation: value
      });
    }),
    setCurrentId: useAction(function (value) {
      return dispatch({
        type: "setCurrentId",
        currentId: value
      });
    }),
    setLoop: useAction(function (value) {
      return dispatch({
        type: "setLoop",
        loop: value
      });
    }),
    setWrap: useAction(function (value) {
      return dispatch({
        type: "setWrap",
        wrap: value
      });
    }),
    setShift: useAction(function (value) {
      return dispatch({
        type: "setShift",
        shift: value
      });
    }),
    unstable_setIncludesBaseElement: useAction(function (value) {
      return dispatch({
        type: "setIncludesBaseElement",
        includesBaseElement: value
      });
    }),
    reset: useAction(function () {
      return dispatch({
        type: "reset"
      });
    })
  });
}

exports.useCompositeState = useCompositeState;
