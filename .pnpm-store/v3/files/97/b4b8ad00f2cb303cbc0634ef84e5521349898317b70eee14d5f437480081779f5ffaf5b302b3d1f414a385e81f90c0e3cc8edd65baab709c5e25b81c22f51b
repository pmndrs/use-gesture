'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useForkRef = require('reakit-utils/useForkRef');
var useIsomorphicEffect = require('reakit-utils/useIsomorphicEffect');
require('../Role/Role.js');
var findEnabledItemById = require('../findEnabledItemById-03112678.js');
var __keys = require('../__keys-3b597476.js');
require('../Id/IdProvider.js');
var Id_Id = require('../Id/Id.js');
var Group_Group = require('../Group/Group.js');

var useCompositeGroup = createHook.createHook({
  name: "CompositeGroup",
  compose: [Group_Group.useGroup, Id_Id.unstable_useId],
  keys: __keys.COMPOSITE_GROUP_KEYS,
  propsAreEqual: function propsAreEqual(prev, next) {
    if (!next.id || prev.id !== next.id) {
      return Group_Group.useGroup.unstable_propsAreEqual(prev, next);
    }

    var prevCurrentId = prev.currentId,
        prevMoves = prev.unstable_moves,
        prevProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(prev, ["currentId", "unstable_moves"]);

    var nextCurrentId = next.currentId,
        nextMoves = next.unstable_moves,
        nextProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(next, ["currentId", "unstable_moves"]);

    if (prev.items && next.items) {
      var prevCurrentItem = findEnabledItemById.findEnabledItemById(prev.items, prevCurrentId);
      var nextCurrentItem = findEnabledItemById.findEnabledItemById(next.items, nextCurrentId);
      var prevGroupId = prevCurrentItem === null || prevCurrentItem === void 0 ? void 0 : prevCurrentItem.groupId;
      var nextGroupId = nextCurrentItem === null || nextCurrentItem === void 0 ? void 0 : nextCurrentItem.groupId;

      if (next.id === nextGroupId || next.id === prevGroupId) {
        return false;
      }
    }

    return Group_Group.useGroup.unstable_propsAreEqual(prevProps, nextProps);
  },
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["ref"]);

    var ref = React.useRef(null);
    var id = options.id; // We need this to be called before CompositeItems' register

    useIsomorphicEffect.useIsomorphicEffect(function () {
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
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(ref, htmlRef)
    }, htmlProps);
  }
});
var CompositeGroup = createComponent.createComponent({
  as: "div",
  useHook: useCompositeGroup
});

exports.CompositeGroup = CompositeGroup;
exports.useCompositeGroup = useCompositeGroup;
