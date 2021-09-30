'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/* eslint-disable react-hooks/rules-of-hooks */
var checkedPkgs = {};
/**
 * Just a lil state logger
 *
 * @param state
 * @param DEBUG
 */

function useStateLogger(state, DEBUG) {
  if (DEBUG === void 0) {
    DEBUG = false;
  }

  if (process.env.NODE_ENV !== "production") {
    var debugRef = react.useRef(DEBUG);
    react.useEffect(function () {
      debugRef.current = DEBUG;
    }, [DEBUG]);
    react.useEffect(function () {
      if (debugRef.current) {
        console.group("State Updated");
        console.log("%c" + state, "font-weight: normal; font-size: 120%; font-style: italic;");
        console.groupEnd();
      }
    }, [state]);
  }
}
/**
 * When in dev mode, checks that styles for a given `@reach` package are loaded.
 *
 * @param packageName Name of the package to check.
 * @example checkStyles("dialog") will check for styles for @reach/dialog
 */

function checkStyles(packageName) {
  if (process.env.NODE_ENV !== "production") {
    // In CJS files, process.env.NODE_ENV is stripped from our build, but we
    // need it to prevent style checks from clogging up user logs while testing.
    // This is a workaround until we can tweak the build a bit to accommodate.
    var _ref = typeof process !== "undefined" ? process.env : {
      NODE_ENV: "development"
    },
        environment = _ref.NODE_ENV; // only check once per package


    if (checkedPkgs[packageName]) return;
    checkedPkgs[packageName] = true;

    if (environment === "development" && parseInt(window.getComputedStyle(document.body).getPropertyValue("--reach-" + packageName), 10) !== 1) {
      console.warn("@reach/" + packageName + " styles not found. If you are using a bundler like webpack or parcel include this in the entry file of your app before any of your own styles:\n  \n      import \"@reach/" + packageName + "/styles.css\";\n  \n    Otherwise you'll need to include them some other way:\n  \n      <link rel=\"stylesheet\" type=\"text/css\" href=\"node_modules/@reach/" + packageName + "/styles.css\" />\n  \n    For more information visit https://ui.reach.tech/styling.\n    ");
    }
  }
}
/**
 * When in dev mode, checks that styles for a given `@reach` package are loaded.
 *
 * @param packageName Name of the package to check.
 * @example useCheckStyles("dialog") will check for styles for @reach/dialog
 */

function useCheckStyles(packageName) {
  if (process.env.NODE_ENV !== "production") {
    var name = react.useRef(packageName);
    react.useEffect(function () {
      return void (name.current = packageName);
    }, [packageName]);
    react.useEffect(function () {
      return checkStyles(name.current);
    }, []);
  }
}
/**
 * Logs a warning in dev mode when a component switches from controlled to
 * uncontrolled, or vice versa
 *
 * A single prop should typically be used to determine whether or not a
 * component is controlled or not.
 *
 * @param controlledValue
 * @param controlledPropName
 * @param componentName
 */

function useControlledSwitchWarning(controlledValue, controlledPropName, componentName) {
  if (process.env.NODE_ENV !== "production") {
    var controlledRef = react.useRef(controlledValue != null);
    var nameCache = react.useRef({
      componentName: componentName,
      controlledPropName: controlledPropName
    });
    react.useEffect(function () {
      nameCache.current = {
        componentName: componentName,
        controlledPropName: controlledPropName
      };
    }, [componentName, controlledPropName]);
    react.useEffect(function () {
      var wasControlled = controlledRef.current;
      var _nameCache$current = nameCache.current,
          componentName = _nameCache$current.componentName,
          controlledPropName = _nameCache$current.controlledPropName;
      var isControlled = controlledValue != null;

      if (wasControlled !== isControlled) {
        console.error("A component is changing an " + (wasControlled ? "" : "un") + "controlled `" + controlledPropName + "` state of " + componentName + " to be " + (wasControlled ? "un" : "") + "controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled " + componentName + " element for the lifetime of the component.\n      More info: https://fb.me/react-controlled-components");
      }
    }, [controlledValue]);
  }
}

exports.checkStyles = checkStyles;
exports.useCheckStyles = useCheckStyles;
exports.useControlledSwitchWarning = useControlledSwitchWarning;
exports.useStateLogger = useStateLogger;
