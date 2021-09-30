import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useBox } from '../Box/Box.js';
import { useCallback } from 'react';
import 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import 'reakit-warning';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import '../Clickable/Clickable.js';
import 'reakit-utils/getDocument';
import '../getCurrentId-5aa9849e.js';
import '../__keys-6742f591.js';
import '../userFocus-e16425e3.js';
import { c as COMBOBOX_ITEM_KEYS } from '../__keys-0f89298f.js';
import 'reakit-utils/isTextField';
import 'reakit-utils/ensureFocus';
import '../Id/IdProvider.js';
import '../Id/Id.js';
import 'reakit-utils/fireEvent';
import '../setTextFieldValue-0a221f4e.js';
import { useCompositeItem } from '../Composite/CompositeItem.js';

function kebabCase(string) {
  return string.toLowerCase().replace(/[^a-z0-9]/g, "-");
}

function getItemId(baseId, value, id) {
  return id || baseId + "-" + kebabCase(value);
}

var unstable_useComboboxItem = createHook({
  name: "ComboboxItem",
  compose: useBox,
  keys: COMBOBOX_ITEM_KEYS,
  propsAreEqual: function propsAreEqual(prev, next) {
    if (prev.value !== next.value) return false;

    if (!prev.value || !next.value || !prev.baseId || !next.baseId) {
      return useCompositeItem.unstable_propsAreEqual(prev, next);
    }

    var prevCurrentValue = prev.currentValue,
        prevInputValue = prev.inputValue,
        prevMatches = prev.matches,
        prevProps = _objectWithoutPropertiesLoose(prev, ["currentValue", "inputValue", "matches"]);

    var nextCurrentValue = next.currentValue,
        nextInputValue = next.inputValue,
        nextMatches = next.matches,
        nextProps = _objectWithoutPropertiesLoose(next, ["currentValue", "inputValue", "matches"]);

    if (prevCurrentValue !== nextCurrentValue) {
      if (next.value === prevCurrentValue || next.value === nextCurrentValue) {
        return false;
      }
    }

    var prevId = getItemId(prev.baseId, prev.value, prev.id);
    var nextId = getItemId(next.baseId, next.value, prev.id);
    return useCompositeItem.unstable_propsAreEqual(_objectSpread2(_objectSpread2({}, prevProps), {}, {
      id: prevId
    }), _objectSpread2(_objectSpread2({}, nextProps), {}, {
      id: nextId
    }));
  },
  useOptions: function useOptions(options) {
    var trulyDisabled = options.disabled && !options.focusable;
    var value = trulyDisabled ? undefined : options.value;
    var registerItem = useCallback(function (item) {
      if (options.visible) {
        var _options$registerItem;

        (_options$registerItem = options.registerItem) === null || _options$registerItem === void 0 ? void 0 : _options$registerItem.call(options, _objectSpread2(_objectSpread2({}, item), {}, {
          value: value
        }));
      }
    }, [options.registerItem, options.visible, value]);

    if (options.id || !options.baseId || !options.value) {
      return _objectSpread2(_objectSpread2({}, options), {}, {
        registerItem: registerItem
      });
    }

    var id = getItemId(options.baseId, options.value, options.id);
    return _objectSpread2(_objectSpread2({}, options), {}, {
      registerItem: registerItem,
      id: id
    });
  },
  useProps: function useProps(options, _ref) {
    var htmlOnClick = _ref.onClick,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["onClick"]);

    var onClickRef = useLiveRef(htmlOnClick);
    var onClick = useCallback(function (event) {
      var _onClickRef$current, _options$hide, _options$setInputValu;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      if (!options.value) return;
      (_options$hide = options.hide) === null || _options$hide === void 0 ? void 0 : _options$hide.call(options);
      (_options$setInputValu = options.setInputValue) === null || _options$setInputValu === void 0 ? void 0 : _options$setInputValu.call(options, options.value);
    }, [options.hide, options.setInputValue, options.value]);
    return _objectSpread2({
      children: options.value,
      onClick: onClick,
      tabIndex: -1
    }, htmlProps);
  }
});
var unstable_ComboboxItem = createComponent({
  as: "span",
  memo: true,
  useHook: unstable_useComboboxItem
});

export { unstable_ComboboxItem, unstable_useComboboxItem };
