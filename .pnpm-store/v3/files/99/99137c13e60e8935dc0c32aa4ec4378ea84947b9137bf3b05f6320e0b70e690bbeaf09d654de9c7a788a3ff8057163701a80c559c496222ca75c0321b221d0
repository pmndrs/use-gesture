'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var Box_Box = require('../Box/Box.js');
var React = require('react');
require('reakit-utils/useForkRef');
require('reakit-utils/isButton');
require('reakit-warning');
var useLiveRef = require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/hasFocusWithin');
require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
require('../Role/Role.js');
require('../Tabbable/Tabbable.js');
require('../Clickable/Clickable.js');
require('reakit-utils/getDocument');
require('../getCurrentId-eade2850.js');
require('../__keys-3b597476.js');
require('../userFocus-0afea51a.js');
var __keys = require('../__keys-a7141fdd.js');
require('reakit-utils/isTextField');
require('reakit-utils/ensureFocus');
require('../Id/IdProvider.js');
require('../Id/Id.js');
require('reakit-utils/fireEvent');
require('../setTextFieldValue-b0584ae1.js');
var Composite_CompositeItem = require('../Composite/CompositeItem.js');

function kebabCase(string) {
  return string.toLowerCase().replace(/[^a-z0-9]/g, "-");
}

function getItemId(baseId, value, id) {
  return id || baseId + "-" + kebabCase(value);
}

var unstable_useComboboxItem = createHook.createHook({
  name: "ComboboxItem",
  compose: Box_Box.useBox,
  keys: __keys.COMBOBOX_ITEM_KEYS,
  propsAreEqual: function propsAreEqual(prev, next) {
    if (prev.value !== next.value) return false;

    if (!prev.value || !next.value || !prev.baseId || !next.baseId) {
      return Composite_CompositeItem.useCompositeItem.unstable_propsAreEqual(prev, next);
    }

    var prevCurrentValue = prev.currentValue,
        prevInputValue = prev.inputValue,
        prevMatches = prev.matches,
        prevProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(prev, ["currentValue", "inputValue", "matches"]);

    var nextCurrentValue = next.currentValue,
        nextInputValue = next.inputValue,
        nextMatches = next.matches,
        nextProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(next, ["currentValue", "inputValue", "matches"]);

    if (prevCurrentValue !== nextCurrentValue) {
      if (next.value === prevCurrentValue || next.value === nextCurrentValue) {
        return false;
      }
    }

    var prevId = getItemId(prev.baseId, prev.value, prev.id);
    var nextId = getItemId(next.baseId, next.value, prev.id);
    return Composite_CompositeItem.useCompositeItem.unstable_propsAreEqual(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, prevProps), {}, {
      id: prevId
    }), _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, nextProps), {}, {
      id: nextId
    }));
  },
  useOptions: function useOptions(options) {
    var trulyDisabled = options.disabled && !options.focusable;
    var value = trulyDisabled ? undefined : options.value;
    var registerItem = React.useCallback(function (item) {
      if (options.visible) {
        var _options$registerItem;

        (_options$registerItem = options.registerItem) === null || _options$registerItem === void 0 ? void 0 : _options$registerItem.call(options, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, item), {}, {
          value: value
        }));
      }
    }, [options.registerItem, options.visible, value]);

    if (options.id || !options.baseId || !options.value) {
      return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), {}, {
        registerItem: registerItem
      });
    }

    var id = getItemId(options.baseId, options.value, options.id);
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), {}, {
      registerItem: registerItem,
      id: id
    });
  },
  useProps: function useProps(options, _ref) {
    var htmlOnClick = _ref.onClick,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["onClick"]);

    var onClickRef = useLiveRef.useLiveRef(htmlOnClick);
    var onClick = React.useCallback(function (event) {
      var _onClickRef$current, _options$hide, _options$setInputValu;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      if (!options.value) return;
      (_options$hide = options.hide) === null || _options$hide === void 0 ? void 0 : _options$hide.call(options);
      (_options$setInputValu = options.setInputValue) === null || _options$setInputValu === void 0 ? void 0 : _options$setInputValu.call(options, options.value);
    }, [options.hide, options.setInputValue, options.value]);
    return _rollupPluginBabelHelpers._objectSpread2({
      children: options.value,
      onClick: onClick,
      tabIndex: -1
    }, htmlProps);
  }
});
var unstable_ComboboxItem = createComponent.createComponent({
  as: "span",
  memo: true,
  useHook: unstable_useComboboxItem
});

exports.unstable_ComboboxItem = unstable_ComboboxItem;
exports.unstable_useComboboxItem = unstable_useComboboxItem;
