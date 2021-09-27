import 'react';
import './SystemContext.js';
import './useToken.js';
import { useProps } from './useProps.js';
import { b as _createForOfIteratorHelperLoose } from './_rollupPluginBabelHelpers-0c84a174.js';
import { useOptions } from './useOptions.js';
import { shallowEqual } from 'reakit-utils/shallowEqual';
import { toArray } from 'reakit-utils/toArray';

/**
 * Creates a React custom hook that will return component props.
 *
 * @example
 * import { createHook } from "reakit-system";
 *
 * const useA = createHook({
 *   name: "A",
 *   keys: ["url"], // custom props/options keys
 *   useProps(options, htmlProps) {
 *     return {
 *       ...htmlProps,
 *       href: options.url,
 *     };
 *   },
 * });
 *
 * function A({ url, ...htmlProps }) {
 *   const props = useA({ url }, htmlProps);
 *   return <a {...props} />;
 * }
 *
 * @param options
 */
function createHook(options) {
  var _options$useState, _composedHooks$;

  var composedHooks = toArray(options.compose);

  var __useOptions = function __useOptions(hookOptions, htmlProps) {
    // Call the current hook's useOptions first
    if (options.useOptions) {
      hookOptions = options.useOptions(hookOptions, htmlProps);
    } // If there's name, call useOptions from the system context


    if (options.name) {
      hookOptions = useOptions(options.name, hookOptions, htmlProps);
    } // Run composed hooks useOptions


    if (options.compose) {
      for (var _iterator = _createForOfIteratorHelperLoose(composedHooks), _step; !(_step = _iterator()).done;) {
        var hook = _step.value;
        hookOptions = hook.__useOptions(hookOptions, htmlProps);
      }
    }

    return hookOptions;
  };

  var useHook = function useHook(hookOptions, htmlProps, unstable_ignoreUseOptions) {
    if (hookOptions === void 0) {
      hookOptions = {};
    }

    if (htmlProps === void 0) {
      htmlProps = {};
    }

    if (unstable_ignoreUseOptions === void 0) {
      unstable_ignoreUseOptions = false;
    }

    // This won't execute when useHook was called from within another useHook
    if (!unstable_ignoreUseOptions) {
      hookOptions = __useOptions(hookOptions, htmlProps);
    } // Call the current hook's useProps


    if (options.useProps) {
      htmlProps = options.useProps(hookOptions, htmlProps);
    } // If there's name, call useProps from the system context


    if (options.name) {
      htmlProps = useProps(options.name, hookOptions, htmlProps);
    }

    if (options.compose) {
      if (options.useComposeOptions) {
        hookOptions = options.useComposeOptions(hookOptions, htmlProps);
      }

      if (options.useComposeProps) {
        htmlProps = options.useComposeProps(hookOptions, htmlProps);
      } else {
        for (var _iterator2 = _createForOfIteratorHelperLoose(composedHooks), _step2; !(_step2 = _iterator2()).done;) {
          var hook = _step2.value;
          htmlProps = hook(hookOptions, htmlProps, true);
        }
      }
    } // Remove undefined values from htmlProps


    var finalHTMLProps = {};
    var definedHTMLProps = htmlProps || {};

    for (var prop in definedHTMLProps) {
      if (definedHTMLProps[prop] !== undefined) {
        finalHTMLProps[prop] = definedHTMLProps[prop];
      }
    }

    return finalHTMLProps;
  };

  useHook.__useOptions = __useOptions;
  var composedKeys = composedHooks.reduce(function (keys, hook) {
    keys.push.apply(keys, hook.__keys || []);
    return keys;
  }, []); // It's used by createComponent to split option props (keys) and html props

  useHook.__keys = [].concat(composedKeys, ((_options$useState = options.useState) === null || _options$useState === void 0 ? void 0 : _options$useState.__keys) || [], options.keys || []);
  useHook.unstable_propsAreEqual = options.propsAreEqual || ((_composedHooks$ = composedHooks[0]) === null || _composedHooks$ === void 0 ? void 0 : _composedHooks$.unstable_propsAreEqual) || shallowEqual;

  if (process.env.NODE_ENV !== "production" && options.name) {
    Object.defineProperty(useHook, "name", {
      value: "use" + options.name
    });
  }

  return useHook;
}

export { createHook };
