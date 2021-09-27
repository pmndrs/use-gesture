'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
var React = require('react');
var Id_IdProvider = require('./IdProvider.js');

// Automatically generated
var ID_STATE_KEYS = ["baseId", "unstable_idCountRef", "setBaseId"];
var ID_KEYS = [].concat(ID_STATE_KEYS, ["id"]);

var unstable_useId = createHook.createHook({
  keys: ID_KEYS,
  useOptions: function useOptions(options, htmlProps) {
    var generateId = React.useContext(Id_IdProvider.unstable_IdContext);

    var _React$useState = React.useState(function () {
      // This comes from useIdState
      if (options.unstable_idCountRef) {
        options.unstable_idCountRef.current += 1;
        return "-" + options.unstable_idCountRef.current;
      } // If there's no useIdState, we check if `baseId` was passed (as a prop,
      // not from useIdState).


      if (options.baseId) {
        return "-" + generateId("");
      }

      return "";
    }),
        suffix = _React$useState[0]; // `baseId` will be the prop passed directly as a prop or via useIdState.
    // If there's neither, then it'll fallback to Context's generateId.
    // This generateId can result in a sequential ID (if there's a Provider)
    // or a random string (without Provider).


    var baseId = React.useMemo(function () {
      return options.baseId || generateId();
    }, [options.baseId, generateId]);
    var id = htmlProps.id || options.id || "" + baseId + suffix;
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), {}, {
      id: id
    });
  },
  useProps: function useProps(options, htmlProps) {
    return _rollupPluginBabelHelpers._objectSpread2({
      id: options.id
    }, htmlProps);
  }
});
var unstable_Id = createComponent.createComponent({
  as: "div",
  useHook: unstable_useId
});

exports.unstable_Id = unstable_Id;
exports.unstable_useId = unstable_useId;
