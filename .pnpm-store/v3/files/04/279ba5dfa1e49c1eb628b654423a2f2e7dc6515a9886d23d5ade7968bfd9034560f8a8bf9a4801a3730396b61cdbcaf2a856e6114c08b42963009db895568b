import { a as _objectSpread2, b as _createForOfIteratorHelperLoose } from './_rollupPluginBabelHelpers-1f0bf8c2.js';
import { useRef, useState, useMemo, useCallback } from 'react';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getMatches(inputValue, values, limit, list, autoSelect, minValueLength) {
  if (limit === 0 || inputValue.length < minValueLength) {
    // We don't want to populate combobox.matches if inputValue doesn't have
    // enough characters.
    return [];
  }

  var length = limit === false ? undefined : limit;

  if (!list) {
    // If list is false, this means that values aren't expected to be filtered.
    return values.slice(0, length);
  }

  var regex = new RegExp(escapeRegExp(inputValue), "i");
  var matches = [];

  if (autoSelect) {
    var match = values.find(function (value) {
      return value.search(regex) === 0;
    });

    if (match) {
      matches.push(match);
    }
  }

  for (var _iterator = _createForOfIteratorHelperLoose(values), _step; !(_step = _iterator()).done;) {
    var value = _step.value;

    if (length && matches.length >= length) {
      break;
    } // Excludes first match, that can be auto selected


    if (value !== matches[0] && value.search(regex) !== -1) {
      matches.push(value);
    }
  }

  return matches;
}

function useComboboxBaseState(composite, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$inputValue = _ref.inputValue,
      initialInputValue = _ref$inputValue === void 0 ? "" : _ref$inputValue,
      _ref$minValueLength = _ref.minValueLength,
      initialMinValueLength = _ref$minValueLength === void 0 ? 0 : _ref$minValueLength,
      _ref$values = _ref.values,
      initialValues = _ref$values === void 0 ? [] : _ref$values,
      _ref$limit = _ref.limit,
      initialLimit = _ref$limit === void 0 ? 10 : _ref$limit,
      _ref$list = _ref.list,
      initialList = _ref$list === void 0 ? !!initialValues.length : _ref$list,
      _ref$inline = _ref.inline,
      initialInline = _ref$inline === void 0 ? false : _ref$inline,
      _ref$autoSelect = _ref.autoSelect,
      initialAutoSelect = _ref$autoSelect === void 0 ? false : _ref$autoSelect;

  var valuesById = useRef({});

  var _React$useState = useState(initialInputValue),
      inputValue = _React$useState[0],
      setInputValue = _React$useState[1];

  var _React$useState2 = useState(initialMinValueLength),
      minValueLength = _React$useState2[0],
      setMinValueLength = _React$useState2[1];

  var _React$useState3 = useState(initialValues),
      values = _React$useState3[0],
      setValues = _React$useState3[1];

  var _React$useState4 = useState(initialLimit),
      limit = _React$useState4[0],
      setLimit = _React$useState4[1];

  var _React$useState5 = useState(initialList),
      list = _React$useState5[0],
      setList = _React$useState5[1];

  var _React$useState6 = useState(initialInline),
      inline = _React$useState6[0],
      setInline = _React$useState6[1];

  var _React$useState7 = useState(initialAutoSelect),
      autoSelect = _React$useState7[0],
      setAutoSelect = _React$useState7[1];

  var matches = useMemo(function () {
    return getMatches(inputValue, values, limit, list, autoSelect, minValueLength);
  }, [inputValue, values, limit, list, autoSelect, minValueLength]);
  var currentValue = useMemo(function () {
    return composite.currentId ? valuesById.current[composite.currentId] : undefined;
  }, [valuesById, composite.currentId]);
  var items = useMemo(function () {
    composite.items.forEach(function (item) {
      if (item.id) {
        item.value = valuesById.current[item.id];
      }
    });
    return composite.items;
  }, [composite.items]);
  var registerItem = useCallback(function (item) {
    composite.registerItem(item);

    if (item.id) {
      valuesById.current[item.id] = item.value;
    }
  }, [composite.registerItem]);
  var unregisterItem = useCallback(function (id) {
    composite.unregisterItem(id);
    delete valuesById.current[id];
  }, [composite.unregisterItem]);
  return _objectSpread2(_objectSpread2({}, composite), {}, {
    menuRole: "listbox",
    items: items,
    registerItem: registerItem,
    unregisterItem: unregisterItem,
    visible: true,
    inputValue: inputValue,
    minValueLength: minValueLength,
    currentValue: currentValue,
    values: values,
    limit: limit,
    matches: matches,
    list: list,
    inline: inline,
    autoSelect: autoSelect,
    setInputValue: setInputValue,
    setMinValueLength: setMinValueLength,
    setValues: setValues,
    setLimit: setLimit,
    setList: setList,
    setInline: setInline,
    setAutoSelect: setAutoSelect
  });
}

export { useComboboxBaseState as u };
