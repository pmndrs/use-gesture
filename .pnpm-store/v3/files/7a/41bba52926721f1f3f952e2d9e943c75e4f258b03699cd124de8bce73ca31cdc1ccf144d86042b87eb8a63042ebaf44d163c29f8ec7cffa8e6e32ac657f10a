import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRef } from 'react';
import { useForkRef } from 'reakit-utils/useForkRef';
import { useIsomorphicEffect } from 'reakit-utils/useIsomorphicEffect';
import '../Role/Role.js';
import { f as findEnabledItemById } from '../findEnabledItemById-8ddca752.js';
import { a as COMPOSITE_GROUP_KEYS } from '../__keys-6742f591.js';
import '../Id/IdProvider.js';
import { unstable_useId } from '../Id/Id.js';
import { useGroup } from '../Group/Group.js';

var useCompositeGroup = createHook({
  name: "CompositeGroup",
  compose: [useGroup, unstable_useId],
  keys: COMPOSITE_GROUP_KEYS,
  propsAreEqual: function propsAreEqual(prev, next) {
    if (!next.id || prev.id !== next.id) {
      return useGroup.unstable_propsAreEqual(prev, next);
    }

    var prevCurrentId = prev.currentId,
        prevMoves = prev.unstable_moves,
        prevProps = _objectWithoutPropertiesLoose(prev, ["currentId", "unstable_moves"]);

    var nextCurrentId = next.currentId,
        nextMoves = next.unstable_moves,
        nextProps = _objectWithoutPropertiesLoose(next, ["currentId", "unstable_moves"]);

    if (prev.items && next.items) {
      var prevCurrentItem = findEnabledItemById(prev.items, prevCurrentId);
      var nextCurrentItem = findEnabledItemById(next.items, nextCurrentId);
      var prevGroupId = prevCurrentItem === null || prevCurrentItem === void 0 ? void 0 : prevCurrentItem.groupId;
      var nextGroupId = nextCurrentItem === null || nextCurrentItem === void 0 ? void 0 : nextCurrentItem.groupId;

      if (next.id === nextGroupId || next.id === prevGroupId) {
        return false;
      }
    }

    return useGroup.unstable_propsAreEqual(prevProps, nextProps);
  },
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlProps = _objectWithoutPropertiesLoose(_ref, ["ref"]);

    var ref = useRef(null);
    var id = options.id; // We need this to be called before CompositeItems' register

    useIsomorphicEffect(function () {
      var _options$registerGrou;

      if (!id) return undefined;
      (_options$registerGrou = options.registerGroup) === null || _options$registerGrou === void 0 ? void 0 : _options$registerGrou.call(options, {
        id: id,
        ref: ref
      });
      return function () {
        var _options$unregisterGr;

        (_options$unregisterGr = options.unregisterGroup) === null || _options$unregisterGr === void 0 ? void 0 : _options$unregisterGr.call(options, id);
      };
    }, [id, options.registerGroup, options.unregisterGroup]);
    return _objectSpread2({
      ref: useForkRef(ref, htmlRef)
    }, htmlProps);
  }
});
var CompositeGroup = createComponent({
  as: "div",
  useHook: useCompositeGroup
});

export { CompositeGroup, useCompositeGroup };
