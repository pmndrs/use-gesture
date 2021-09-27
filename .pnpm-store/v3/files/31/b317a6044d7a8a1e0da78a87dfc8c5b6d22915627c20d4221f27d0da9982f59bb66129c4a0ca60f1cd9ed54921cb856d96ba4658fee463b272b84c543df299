"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPureHelper = exports.isHelper = exports.isWithThemeHelper = exports.isKeyframesHelper = exports.isInjectGlobalHelper = exports.isCreateGlobalStyleHelper = exports.isCSSHelper = exports.isStyled = exports.importLocalName = exports.isValidTopLevelImport = void 0;

var _options = require("./options");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var VALID_TOP_LEVEL_IMPORT_PATHS = ['styled-components', 'styled-components/no-tags', 'styled-components/native', 'styled-components/primitives'];

var isValidTopLevelImport = function isValidTopLevelImport(x, state) {
  return [].concat(VALID_TOP_LEVEL_IMPORT_PATHS, _toConsumableArray((0, _options.useTopLevelImportPaths)(state))).includes(x);
};

exports.isValidTopLevelImport = isValidTopLevelImport;
var localNameCache = {};

var importLocalName = function importLocalName(name, state) {
  var bypassCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var cacheKey = name + state.file.opts.filename;

  if (!bypassCache && cacheKey in localNameCache) {
    return localNameCache[cacheKey];
  }

  var localName = state.styledRequired ? name === 'default' ? 'styled' : name : false;
  state.file.path.traverse({
    ImportDeclaration: {
      exit(path) {
        var node = path.node;

        if (isValidTopLevelImport(node.source.value, state)) {
          var _iterator = _createForOfIteratorHelper(path.get('specifiers')),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var specifier = _step.value;

              if (specifier.isImportSpecifier() && specifier.node.imported.name === 'styled') {
                localName = 'styled';
              }

              if (specifier.isImportDefaultSpecifier()) {
                localName = specifier.node.local.name;
              }

              if (specifier.isImportSpecifier() && specifier.node.imported.name === name) {
                localName = specifier.node.local.name;
              }

              if (specifier.isImportNamespaceSpecifier()) {
                localName = specifier.node.local.name;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }

    }
  });
  localNameCache[cacheKey] = localName;
  return localName;
};

exports.importLocalName = importLocalName;

var isStyled = function isStyled(t) {
  return function (tag, state) {
    if (t.isCallExpression(tag) && t.isMemberExpression(tag.callee) && tag.callee.property.name !== 'default'
    /** ignore default for #93 below */
    ) {
        // styled.something()
        return isStyled(t)(tag.callee.object, state);
      } else {
      return t.isMemberExpression(tag) && tag.object.name === importLocalName('default', state) || t.isCallExpression(tag) && tag.callee.name === importLocalName('default', state) ||
      /**
       * #93 Support require()
       * styled-components might be imported using a require()
       * call and assigned to a variable of any name.
       * - styled.default.div``
       * - styled.default.something()
       */
      state.styledRequired && t.isMemberExpression(tag) && t.isMemberExpression(tag.object) && tag.object.property.name === 'default' && tag.object.object.name === state.styledRequired || state.styledRequired && t.isCallExpression(tag) && t.isMemberExpression(tag.callee) && tag.callee.property.name === 'default' && tag.callee.object.name === state.styledRequired;
    }
  };
};

exports.isStyled = isStyled;

var isCSSHelper = function isCSSHelper(t) {
  return function (tag, state) {
    return t.isIdentifier(tag) && tag.name === importLocalName('css', state);
  };
};

exports.isCSSHelper = isCSSHelper;

var isCreateGlobalStyleHelper = function isCreateGlobalStyleHelper(t) {
  return function (tag, state) {
    return t.isIdentifier(tag) && tag.name === importLocalName('createGlobalStyle', state);
  };
};

exports.isCreateGlobalStyleHelper = isCreateGlobalStyleHelper;

var isInjectGlobalHelper = function isInjectGlobalHelper(t) {
  return function (tag, state) {
    return t.isIdentifier(tag) && tag.name === importLocalName('injectGlobal', state);
  };
};

exports.isInjectGlobalHelper = isInjectGlobalHelper;

var isKeyframesHelper = function isKeyframesHelper(t) {
  return function (tag, state) {
    return t.isIdentifier(tag) && tag.name === importLocalName('keyframes', state);
  };
};

exports.isKeyframesHelper = isKeyframesHelper;

var isWithThemeHelper = function isWithThemeHelper(t) {
  return function (tag, state) {
    return t.isIdentifier(tag) && tag.name === importLocalName('withTheme', state);
  };
};

exports.isWithThemeHelper = isWithThemeHelper;

var isHelper = function isHelper(t) {
  return function (tag, state) {
    return isCSSHelper(t)(tag, state) || isKeyframesHelper(t)(tag, state) || isWithThemeHelper(t)(tag, state);
  };
};

exports.isHelper = isHelper;

var isPureHelper = function isPureHelper(t) {
  return function (tag, state) {
    return isCSSHelper(t)(tag, state) || isKeyframesHelper(t)(tag, state) || isCreateGlobalStyleHelper(t)(tag, state) || isWithThemeHelper(t)(tag, state);
  };
};

exports.isPureHelper = isPureHelper;