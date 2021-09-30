(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TestingLibraryDom = {}));
}(this, (function (exports) { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var build = {};

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  var ansiStyles = {exports: {}};

  function _wrapRegExp() { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = new RegExp(re, flags); _groups.set(_this, groups || _groups.get(re)); return _setPrototypeOf(_this, BabelRegExp.prototype); } _inherits(BabelRegExp, RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = arguments; if (typeof args[args.length - 1] !== "object") { args = [].slice.call(args); args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

  (function (module) {

    var ANSI_BACKGROUND_OFFSET = 10;

    var wrapAnsi256 = function wrapAnsi256(offset) {
      if (offset === void 0) {
        offset = 0;
      }

      return function (code) {
        return "\x1B[" + (38 + offset) + ";5;" + code + "m";
      };
    };

    var wrapAnsi16m = function wrapAnsi16m(offset) {
      if (offset === void 0) {
        offset = 0;
      }

      return function (red, green, blue) {
        return "\x1B[" + (38 + offset) + ";2;" + red + ";" + green + ";" + blue + "m";
      };
    };

    function assembleStyles() {
      var codes = new Map();
      var styles = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          overline: [53, 55],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      }; // Alias bright black as gray (and grey)

      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

      for (var _i = 0, _Object$entries = Object.entries(styles); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _Object$entries[_i],
            groupName = _Object$entries$_i[0],
            group = _Object$entries$_i[1];

        for (var _i2 = 0, _Object$entries2 = Object.entries(group); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _Object$entries2[_i2],
              styleName = _Object$entries2$_i[0],
              style = _Object$entries2$_i[1];
          styles[styleName] = {
            open: "\x1B[" + style[0] + "m",
            close: "\x1B[" + style[1] + "m"
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }

        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }

      Object.defineProperty(styles, 'codes', {
        value: codes,
        enumerable: false
      });
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      styles.color.ansi256 = wrapAnsi256();
      styles.color.ansi16m = wrapAnsi16m();
      styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
      styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET); // From https://github.com/Qix-/color-convert/blob/3f0e0d4e92e235796ccb17f6e85c72094a651f49/conversions.js

      Object.defineProperties(styles, {
        rgbToAnsi256: {
          value: function value(red, green, blue) {
            // We use the extended greyscale palette here, with the exception of
            // black and white. normal palette only has 4 greyscale shades.
            if (red === green && green === blue) {
              if (red < 8) {
                return 16;
              }

              if (red > 248) {
                return 231;
              }

              return Math.round((red - 8) / 247 * 24) + 232;
            }

            return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
          },
          enumerable: false
        },
        hexToRgb: {
          value: function value(hex) {
            var matches = /*#__PURE__*/_wrapRegExp(/([0-9a-f]{6}|[0-9a-f]{3})/i, {
              colorString: 1
            }).exec(hex.toString(16));

            if (!matches) {
              return [0, 0, 0];
            }

            var colorString = matches.groups.colorString;

            if (colorString.length === 3) {
              colorString = colorString.split('').map(function (character) {
                return character + character;
              }).join('');
            }

            var integer = Number.parseInt(colorString, 16);
            return [integer >> 16 & 0xFF, integer >> 8 & 0xFF, integer & 0xFF];
          },
          enumerable: false
        },
        hexToAnsi256: {
          value: function value(hex) {
            return styles.rgbToAnsi256.apply(styles, styles.hexToRgb(hex));
          },
          enumerable: false
        }
      });
      return styles;
    } // Make the export immutable


    Object.defineProperty(module, 'exports', {
      enumerable: true,
      get: assembleStyles
    });
  })(ansiStyles);

  var collections = {};

  Object.defineProperty(collections, '__esModule', {
    value: true
  });
  collections.printIteratorEntries = printIteratorEntries;
  collections.printIteratorValues = printIteratorValues;
  collections.printListItems = printListItems;
  collections.printObjectProperties = printObjectProperties;
  /**
   * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  var getKeysOfEnumerableProperties = function getKeysOfEnumerableProperties(object) {
    var keys = Object.keys(object).sort();

    if (Object.getOwnPropertySymbols) {
      Object.getOwnPropertySymbols(object).forEach(function (symbol) {
        if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
          keys.push(symbol);
        }
      });
    }

    return keys;
  };
  /**
   * Return entries (for example, of a map)
   * with spacing, indentation, and comma
   * without surrounding punctuation (for example, braces)
   */


  function printIteratorEntries(iterator, config, indentation, depth, refs, printer, // Too bad, so sad that separator for ECMAScript Map has been ' => '
  // What a distracting diff if you change a data structure to/from
  // ECMAScript Object or Immutable.Map/OrderedMap which use the default.
  separator) {
    if (separator === void 0) {
      separator = ': ';
    }

    var result = '';
    var current = iterator.next();

    if (!current.done) {
      result += config.spacingOuter;
      var indentationNext = indentation + config.indent;

      while (!current.done) {
        var name = printer(current.value[0], config, indentationNext, depth, refs);
        var value = printer(current.value[1], config, indentationNext, depth, refs);
        result += indentationNext + name + separator + value;
        current = iterator.next();

        if (!current.done) {
          result += ',' + config.spacingInner;
        } else if (!config.min) {
          result += ',';
        }
      }

      result += config.spacingOuter + indentation;
    }

    return result;
  }
  /**
   * Return values (for example, of a set)
   * with spacing, indentation, and comma
   * without surrounding punctuation (braces or brackets)
   */


  function printIteratorValues(iterator, config, indentation, depth, refs, printer) {
    var result = '';
    var current = iterator.next();

    if (!current.done) {
      result += config.spacingOuter;
      var indentationNext = indentation + config.indent;

      while (!current.done) {
        result += indentationNext + printer(current.value, config, indentationNext, depth, refs);
        current = iterator.next();

        if (!current.done) {
          result += ',' + config.spacingInner;
        } else if (!config.min) {
          result += ',';
        }
      }

      result += config.spacingOuter + indentation;
    }

    return result;
  }
  /**
   * Return items (for example, of an array)
   * with spacing, indentation, and comma
   * without surrounding punctuation (for example, brackets)
   **/


  function printListItems(list, config, indentation, depth, refs, printer) {
    var result = '';

    if (list.length) {
      result += config.spacingOuter;
      var indentationNext = indentation + config.indent;

      for (var i = 0; i < list.length; i++) {
        result += indentationNext;

        if (i in list) {
          result += printer(list[i], config, indentationNext, depth, refs);
        }

        if (i < list.length - 1) {
          result += ',' + config.spacingInner;
        } else if (!config.min) {
          result += ',';
        }
      }

      result += config.spacingOuter + indentation;
    }

    return result;
  }
  /**
   * Return properties of an object
   * with spacing, indentation, and comma
   * without surrounding punctuation (for example, braces)
   */


  function printObjectProperties(val, config, indentation, depth, refs, printer) {
    var result = '';
    var keys = getKeysOfEnumerableProperties(val);

    if (keys.length) {
      result += config.spacingOuter;
      var indentationNext = indentation + config.indent;

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var name = printer(key, config, indentationNext, depth, refs);
        var value = printer(val[key], config, indentationNext, depth, refs);
        result += indentationNext + name + ': ' + value;

        if (i < keys.length - 1) {
          result += ',' + config.spacingInner;
        } else if (!config.min) {
          result += ',';
        }
      }

      result += config.spacingOuter + indentation;
    }

    return result;
  }

  var AsymmetricMatcher = {};

  Object.defineProperty(AsymmetricMatcher, '__esModule', {
    value: true
  });
  AsymmetricMatcher.default = AsymmetricMatcher.test = AsymmetricMatcher.serialize = void 0;
  var _collections$3 = collections;

  var global$g = function () {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    } else if (typeof global$g !== 'undefined') {
      return global$g;
    } else if (typeof self !== 'undefined') {
      return self;
    } else if (typeof window !== 'undefined') {
      return window;
    } else {
      return Function('return this')();
    }
  }();

  var Symbol$3 = global$g['jest-symbol-do-not-touch'] || global$g.Symbol;
  var asymmetricMatcher = typeof Symbol$3 === 'function' && Symbol$3.for ? Symbol$3.for('jest.asymmetricMatcher') : 0x1357a5;
  var SPACE$2 = ' ';

  var serialize$6 = function serialize(val, config, indentation, depth, refs, printer) {
    var stringedValue = val.toString();

    if (stringedValue === 'ArrayContaining' || stringedValue === 'ArrayNotContaining') {
      if (++depth > config.maxDepth) {
        return '[' + stringedValue + ']';
      }

      return stringedValue + SPACE$2 + '[' + (0, _collections$3.printListItems)(val.sample, config, indentation, depth, refs, printer) + ']';
    }

    if (stringedValue === 'ObjectContaining' || stringedValue === 'ObjectNotContaining') {
      if (++depth > config.maxDepth) {
        return '[' + stringedValue + ']';
      }

      return stringedValue + SPACE$2 + '{' + (0, _collections$3.printObjectProperties)(val.sample, config, indentation, depth, refs, printer) + '}';
    }

    if (stringedValue === 'StringMatching' || stringedValue === 'StringNotMatching') {
      return stringedValue + SPACE$2 + printer(val.sample, config, indentation, depth, refs);
    }

    if (stringedValue === 'StringContaining' || stringedValue === 'StringNotContaining') {
      return stringedValue + SPACE$2 + printer(val.sample, config, indentation, depth, refs);
    }

    return val.toAsymmetricMatcher();
  };

  AsymmetricMatcher.serialize = serialize$6;

  var test$7 = function test(val) {
    return val && val.$$typeof === asymmetricMatcher;
  };

  AsymmetricMatcher.test = test$7;
  var plugin$6 = {
    serialize: serialize$6,
    test: test$7
  };
  var _default$7 = plugin$6;
  AsymmetricMatcher.default = _default$7;

  var ConvertAnsi = {};

  var ansiRegex = function ansiRegex(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$onlyFirst = _ref.onlyFirst,
        onlyFirst = _ref$onlyFirst === void 0 ? false : _ref$onlyFirst;

    var pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|');
    return new RegExp(pattern, onlyFirst ? undefined : 'g');
  };

  Object.defineProperty(ConvertAnsi, '__esModule', {
    value: true
  });
  ConvertAnsi.default = ConvertAnsi.serialize = ConvertAnsi.test = void 0;

  var _ansiRegex = _interopRequireDefault$2(ansiRegex);

  var _ansiStyles$1 = _interopRequireDefault$2(ansiStyles.exports);

  function _interopRequireDefault$2(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */


  var toHumanReadableAnsi = function toHumanReadableAnsi(text) {
    return text.replace((0, _ansiRegex.default)(), function (match) {
      switch (match) {
        case _ansiStyles$1.default.red.close:
        case _ansiStyles$1.default.green.close:
        case _ansiStyles$1.default.cyan.close:
        case _ansiStyles$1.default.gray.close:
        case _ansiStyles$1.default.white.close:
        case _ansiStyles$1.default.yellow.close:
        case _ansiStyles$1.default.bgRed.close:
        case _ansiStyles$1.default.bgGreen.close:
        case _ansiStyles$1.default.bgYellow.close:
        case _ansiStyles$1.default.inverse.close:
        case _ansiStyles$1.default.dim.close:
        case _ansiStyles$1.default.bold.close:
        case _ansiStyles$1.default.reset.open:
        case _ansiStyles$1.default.reset.close:
          return '</>';

        case _ansiStyles$1.default.red.open:
          return '<red>';

        case _ansiStyles$1.default.green.open:
          return '<green>';

        case _ansiStyles$1.default.cyan.open:
          return '<cyan>';

        case _ansiStyles$1.default.gray.open:
          return '<gray>';

        case _ansiStyles$1.default.white.open:
          return '<white>';

        case _ansiStyles$1.default.yellow.open:
          return '<yellow>';

        case _ansiStyles$1.default.bgRed.open:
          return '<bgRed>';

        case _ansiStyles$1.default.bgGreen.open:
          return '<bgGreen>';

        case _ansiStyles$1.default.bgYellow.open:
          return '<bgYellow>';

        case _ansiStyles$1.default.inverse.open:
          return '<inverse>';

        case _ansiStyles$1.default.dim.open:
          return '<dim>';

        case _ansiStyles$1.default.bold.open:
          return '<bold>';

        default:
          return '';
      }
    });
  };

  var test$6 = function test(val) {
    return typeof val === 'string' && !!val.match((0, _ansiRegex.default)());
  };

  ConvertAnsi.test = test$6;

  var serialize$5 = function serialize(val, config, indentation, depth, refs, printer) {
    return printer(toHumanReadableAnsi(val), config, indentation, depth, refs);
  };

  ConvertAnsi.serialize = serialize$5;
  var plugin$5 = {
    serialize: serialize$5,
    test: test$6
  };
  var _default$6 = plugin$5;
  ConvertAnsi.default = _default$6;

  var DOMCollection$1 = {};

  Object.defineProperty(DOMCollection$1, '__esModule', {
    value: true
  });
  DOMCollection$1.default = DOMCollection$1.serialize = DOMCollection$1.test = void 0;
  var _collections$2 = collections;
  /**
   * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  /* eslint-disable local/ban-types-eventually */

  var SPACE$1 = ' ';
  var OBJECT_NAMES = ['DOMStringMap', 'NamedNodeMap'];
  var ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;

  var testName = function testName(name) {
    return OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);
  };

  var test$5 = function test(val) {
    return val && val.constructor && !!val.constructor.name && testName(val.constructor.name);
  };

  DOMCollection$1.test = test$5;

  var isNamedNodeMap = function isNamedNodeMap(collection) {
    return collection.constructor.name === 'NamedNodeMap';
  };

  var serialize$4 = function serialize(collection, config, indentation, depth, refs, printer) {
    var name = collection.constructor.name;

    if (++depth > config.maxDepth) {
      return '[' + name + ']';
    }

    return (config.min ? '' : name + SPACE$1) + (OBJECT_NAMES.indexOf(name) !== -1 ? '{' + (0, _collections$2.printObjectProperties)(isNamedNodeMap(collection) ? Array.from(collection).reduce(function (props, attribute) {
      props[attribute.name] = attribute.value;
      return props;
    }, {}) : _extends({}, collection), config, indentation, depth, refs, printer) + '}' : '[' + (0, _collections$2.printListItems)(Array.from(collection), config, indentation, depth, refs, printer) + ']');
  };

  DOMCollection$1.serialize = serialize$4;
  var plugin$4 = {
    serialize: serialize$4,
    test: test$5
  };
  var _default$5 = plugin$4;
  DOMCollection$1.default = _default$5;

  var DOMElement = {};

  var markup = {};

  var escapeHTML$2 = {};

  Object.defineProperty(escapeHTML$2, '__esModule', {
    value: true
  });

  escapeHTML$2.default = escapeHTML$1;
  /**
   * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */


  function escapeHTML$1(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  Object.defineProperty(markup, '__esModule', {
    value: true
  });
  markup.printElementAsLeaf = markup.printElement = markup.printComment = markup.printText = markup.printChildren = markup.printProps = void 0;

  var _escapeHTML = _interopRequireDefault$1(escapeHTML$2);

  function _interopRequireDefault$1(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  // Return empty string if keys is empty.


  var printProps$1 = function printProps(keys, props, config, indentation, depth, refs, printer) {
    var indentationNext = indentation + config.indent;
    var colors = config.colors;
    return keys.map(function (key) {
      var value = props[key];
      var printed = printer(value, config, indentationNext, depth, refs);

      if (typeof value !== 'string') {
        if (printed.indexOf('\n') !== -1) {
          printed = config.spacingOuter + indentationNext + printed + config.spacingOuter + indentation;
        }

        printed = '{' + printed + '}';
      }

      return config.spacingInner + indentation + colors.prop.open + key + colors.prop.close + '=' + colors.value.open + printed + colors.value.close;
    }).join('');
  }; // Return empty string if children is empty.


  markup.printProps = printProps$1;

  var printChildren$1 = function printChildren(children, config, indentation, depth, refs, printer) {
    return children.map(function (child) {
      return config.spacingOuter + indentation + (typeof child === 'string' ? printText$1(child, config) : printer(child, config, indentation, depth, refs));
    }).join('');
  };

  markup.printChildren = printChildren$1;

  var printText$1 = function printText(text, config) {
    var contentColor = config.colors.content;
    return contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close;
  };

  markup.printText = printText$1;

  var printComment$1 = function printComment(comment, config) {
    var commentColor = config.colors.comment;
    return commentColor.open + '<!--' + (0, _escapeHTML.default)(comment) + '-->' + commentColor.close;
  }; // Separate the functions to format props, children, and element,
  // so a plugin could override a particular function, if needed.
  // Too bad, so sad: the traditional (but unnecessary) space
  // in a self-closing tagColor requires a second test of printedProps.


  markup.printComment = printComment$1;

  var printElement$1 = function printElement(type, printedProps, printedChildren, config, indentation) {
    var tagColor = config.colors.tag;
    return tagColor.open + '<' + type + (printedProps && tagColor.close + printedProps + config.spacingOuter + indentation + tagColor.open) + (printedChildren ? '>' + tagColor.close + printedChildren + config.spacingOuter + indentation + tagColor.open + '</' + type : (printedProps && !config.min ? '' : ' ') + '/') + '>' + tagColor.close;
  };

  markup.printElement = printElement$1;

  var printElementAsLeaf$1 = function printElementAsLeaf(type, config) {
    var tagColor = config.colors.tag;
    return tagColor.open + '<' + type + tagColor.close + ' …' + tagColor.open + ' />' + tagColor.close;
  };

  markup.printElementAsLeaf = printElementAsLeaf$1;

  Object.defineProperty(DOMElement, '__esModule', {
    value: true
  });
  DOMElement.default = DOMElement.serialize = DOMElement.test = void 0;
  var _markup$2 = markup;
  /**
   * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ELEMENT_NODE$2 = 1;
  var TEXT_NODE$2 = 3;
  var COMMENT_NODE$2 = 8;
  var FRAGMENT_NODE$1 = 11;
  var ELEMENT_REGEXP$1 = /^((HTML|SVG)\w*)?Element$/;

  var testHasAttribute = function testHasAttribute(val) {
    try {
      return typeof val.hasAttribute === 'function' && val.hasAttribute('is');
    } catch (_unused) {
      return false;
    }
  };

  var testNode$1 = function testNode(val) {
    var constructorName = val.constructor.name;
    var nodeType = val.nodeType,
        tagName = val.tagName;
    var isCustomElement = typeof tagName === 'string' && tagName.includes('-') || testHasAttribute(val);
    return nodeType === ELEMENT_NODE$2 && (ELEMENT_REGEXP$1.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE$2 && constructorName === 'Text' || nodeType === COMMENT_NODE$2 && constructorName === 'Comment' || nodeType === FRAGMENT_NODE$1 && constructorName === 'DocumentFragment';
  };

  var test$4 = function test(val) {
    var _val$constructor;

    return (val === null || val === void 0 ? void 0 : (_val$constructor = val.constructor) === null || _val$constructor === void 0 ? void 0 : _val$constructor.name) && testNode$1(val);
  };

  DOMElement.test = test$4;

  function nodeIsText$1(node) {
    return node.nodeType === TEXT_NODE$2;
  }

  function nodeIsComment$1(node) {
    return node.nodeType === COMMENT_NODE$2;
  }

  function nodeIsFragment$1(node) {
    return node.nodeType === FRAGMENT_NODE$1;
  }

  var serialize$3 = function serialize(node, config, indentation, depth, refs, printer) {
    if (nodeIsText$1(node)) {
      return (0, _markup$2.printText)(node.data, config);
    }

    if (nodeIsComment$1(node)) {
      return (0, _markup$2.printComment)(node.data, config);
    }

    var type = nodeIsFragment$1(node) ? "DocumentFragment" : node.tagName.toLowerCase();

    if (++depth > config.maxDepth) {
      return (0, _markup$2.printElementAsLeaf)(type, config);
    }

    return (0, _markup$2.printElement)(type, (0, _markup$2.printProps)(nodeIsFragment$1(node) ? [] : Array.from(node.attributes).map(function (attr) {
      return attr.name;
    }).sort(), nodeIsFragment$1(node) ? {} : Array.from(node.attributes).reduce(function (props, attribute) {
      props[attribute.name] = attribute.value;
      return props;
    }, {}), config, indentation + config.indent, depth, refs, printer), (0, _markup$2.printChildren)(Array.prototype.slice.call(node.childNodes || node.children), config, indentation + config.indent, depth, refs, printer), config, indentation);
  };

  DOMElement.serialize = serialize$3;
  var plugin$3 = {
    serialize: serialize$3,
    test: test$4
  };
  var _default$4 = plugin$3;
  DOMElement.default = _default$4;

  var Immutable = {};

  Object.defineProperty(Immutable, '__esModule', {
    value: true
  });
  Immutable.default = Immutable.test = Immutable.serialize = void 0;
  var _collections$1 = collections;
  /**
   * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  // SENTINEL constants are from https://github.com/facebook/immutable-js

  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';
  var IS_RECORD_SENTINEL = '@@__IMMUTABLE_RECORD__@@'; // immutable v4

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';
  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';
  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var getImmutableName = function getImmutableName(name) {
    return 'Immutable.' + name;
  };

  var printAsLeaf = function printAsLeaf(name) {
    return '[' + name + ']';
  };

  var SPACE = ' ';
  var LAZY = '…'; // Seq is lazy if it calls a method like filter

  var printImmutableEntries = function printImmutableEntries(val, config, indentation, depth, refs, printer, type) {
    return ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : getImmutableName(type) + SPACE + '{' + (0, _collections$1.printIteratorEntries)(val.entries(), config, indentation, depth, refs, printer) + '}';
  }; // Record has an entries method because it is a collection in immutable v3.
  // Return an iterator for Immutable Record from version v3 or v4.


  function getRecordEntries(val) {
    var i = 0;
    return {
      next: function next() {
        if (i < val._keys.length) {
          var key = val._keys[i++];
          return {
            done: false,
            value: [key, val.get(key)]
          };
        }

        return {
          done: true,
          value: undefined
        };
      }
    };
  }

  var printImmutableRecord = function printImmutableRecord(val, config, indentation, depth, refs, printer) {
    // _name property is defined only for an Immutable Record instance
    // which was constructed with a second optional descriptive name arg
    var name = getImmutableName(val._name || 'Record');
    return ++depth > config.maxDepth ? printAsLeaf(name) : name + SPACE + '{' + (0, _collections$1.printIteratorEntries)(getRecordEntries(val), config, indentation, depth, refs, printer) + '}';
  };

  var printImmutableSeq = function printImmutableSeq(val, config, indentation, depth, refs, printer) {
    var name = getImmutableName('Seq');

    if (++depth > config.maxDepth) {
      return printAsLeaf(name);
    }

    if (val[IS_KEYED_SENTINEL]) {
      return name + SPACE + '{' + (val._iter || val._object ? (0, _collections$1.printIteratorEntries)(val.entries(), config, indentation, depth, refs, printer) : LAZY) + '}';
    }

    return name + SPACE + '[' + (val._iter || // from Immutable collection of values
    val._array || // from ECMAScript array
    val._collection || // from ECMAScript collection in immutable v4
    val._iterable // from ECMAScript collection in immutable v3
    ? (0, _collections$1.printIteratorValues)(val.values(), config, indentation, depth, refs, printer) : LAZY) + ']';
  };

  var printImmutableValues = function printImmutableValues(val, config, indentation, depth, refs, printer, type) {
    return ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : getImmutableName(type) + SPACE + '[' + (0, _collections$1.printIteratorValues)(val.values(), config, indentation, depth, refs, printer) + ']';
  };

  var serialize$2 = function serialize(val, config, indentation, depth, refs, printer) {
    if (val[IS_MAP_SENTINEL]) {
      return printImmutableEntries(val, config, indentation, depth, refs, printer, val[IS_ORDERED_SENTINEL] ? 'OrderedMap' : 'Map');
    }

    if (val[IS_LIST_SENTINEL]) {
      return printImmutableValues(val, config, indentation, depth, refs, printer, 'List');
    }

    if (val[IS_SET_SENTINEL]) {
      return printImmutableValues(val, config, indentation, depth, refs, printer, val[IS_ORDERED_SENTINEL] ? 'OrderedSet' : 'Set');
    }

    if (val[IS_STACK_SENTINEL]) {
      return printImmutableValues(val, config, indentation, depth, refs, printer, 'Stack');
    }

    if (val[IS_SEQ_SENTINEL]) {
      return printImmutableSeq(val, config, indentation, depth, refs, printer);
    } // For compatibility with immutable v3 and v4, let record be the default.


    return printImmutableRecord(val, config, indentation, depth, refs, printer);
  }; // Explicitly comparing sentinel properties to true avoids false positive
  // when mock identity-obj-proxy returns the key as the value for any key.


  Immutable.serialize = serialize$2;

  var test$3 = function test(val) {
    return val && (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);
  };

  Immutable.test = test$3;
  var plugin$2 = {
    serialize: serialize$2,
    test: test$3
  };
  var _default$3 = plugin$2;
  Immutable.default = _default$3;

  var ReactElement = {};

  var reactIs = {exports: {}};

  /** @license React v17.0.2
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  if ("function" === typeof Symbol && Symbol.for) {
    var x = Symbol.for;
    x("react.element");
    x("react.portal");
    x("react.fragment");
    x("react.strict_mode");
    x("react.profiler");
    x("react.provider");
    x("react.context");
    x("react.forward_ref");
    x("react.suspense");
    x("react.suspense_list");
    x("react.memo");
    x("react.lazy");
    x("react.block");
    x("react.server.block");
    x("react.fundamental");
    x("react.debug_trace_mode");
    x("react.legacy_hidden");
  }

  var reactIs_development = {};

  /** @license React v17.0.2
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    (function () {
      // When adding new symbols to this file,
      // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
      // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.

      var REACT_ELEMENT_TYPE = 0xeac7;
      var REACT_PORTAL_TYPE = 0xeaca;
      var REACT_FRAGMENT_TYPE = 0xeacb;
      var REACT_STRICT_MODE_TYPE = 0xeacc;
      var REACT_PROFILER_TYPE = 0xead2;
      var REACT_PROVIDER_TYPE = 0xeacd;
      var REACT_CONTEXT_TYPE = 0xeace;
      var REACT_FORWARD_REF_TYPE = 0xead0;
      var REACT_SUSPENSE_TYPE = 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = 0xead8;
      var REACT_MEMO_TYPE = 0xead3;
      var REACT_LAZY_TYPE = 0xead4;
      var REACT_BLOCK_TYPE = 0xead9;
      var REACT_SERVER_BLOCK_TYPE = 0xeada;
      var REACT_FUNDAMENTAL_TYPE = 0xead5;
      var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
      var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

      if (typeof Symbol === 'function' && Symbol.for) {
        var symbolFor = Symbol.for;
        REACT_ELEMENT_TYPE = symbolFor('react.element');
        REACT_PORTAL_TYPE = symbolFor('react.portal');
        REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
        REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
        REACT_PROFILER_TYPE = symbolFor('react.profiler');
        REACT_PROVIDER_TYPE = symbolFor('react.provider');
        REACT_CONTEXT_TYPE = symbolFor('react.context');
        REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
        REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
        REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
        REACT_MEMO_TYPE = symbolFor('react.memo');
        REACT_LAZY_TYPE = symbolFor('react.lazy');
        REACT_BLOCK_TYPE = symbolFor('react.block');
        REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
        REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
        symbolFor('react.scope');
        symbolFor('react.opaque.id');
        REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
        symbolFor('react.offscreen');
        REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
      } // Filter certain DOM attributes (e.g. src, href) if their values are empty strings.


      var enableScopeAPI = false; // Experimental Create Event Handle API.

      function isValidElementType(type) {
        if (typeof type === 'string' || typeof type === 'function') {
          return true;
        } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
          return true;
        }

        if (typeof type === 'object' && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
            return true;
          }
        }

        return false;
      }

      function typeOf(object) {
        if (typeof object === 'object' && object !== null) {
          var $$typeof = object.$$typeof;

          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;

              switch (type) {
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                case REACT_SUSPENSE_LIST_TYPE:
                  return type;

                default:
                  var $$typeofType = type && type.$$typeof;

                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;

                    default:
                      return $$typeof;
                  }

              }

            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }

        return undefined;
      }

      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false;
      var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

            console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
          }
        }
        return false;
      }

      function isConcurrentMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
            hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

            console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
          }
        }
        return false;
      }

      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }

      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }

      function isElement(object) {
        return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }

      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }

      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }

      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }

      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }

      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }

      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }

      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }

      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }

      reactIs_development.ContextConsumer = ContextConsumer;
      reactIs_development.ContextProvider = ContextProvider;
      reactIs_development.Element = Element;
      reactIs_development.ForwardRef = ForwardRef;
      reactIs_development.Fragment = Fragment;
      reactIs_development.Lazy = Lazy;
      reactIs_development.Memo = Memo;
      reactIs_development.Portal = Portal;
      reactIs_development.Profiler = Profiler;
      reactIs_development.StrictMode = StrictMode;
      reactIs_development.Suspense = Suspense;
      reactIs_development.isAsyncMode = isAsyncMode;
      reactIs_development.isConcurrentMode = isConcurrentMode;
      reactIs_development.isContextConsumer = isContextConsumer;
      reactIs_development.isContextProvider = isContextProvider;
      reactIs_development.isElement = isElement;
      reactIs_development.isForwardRef = isForwardRef;
      reactIs_development.isFragment = isFragment;
      reactIs_development.isLazy = isLazy;
      reactIs_development.isMemo = isMemo;
      reactIs_development.isPortal = isPortal;
      reactIs_development.isProfiler = isProfiler;
      reactIs_development.isStrictMode = isStrictMode;
      reactIs_development.isSuspense = isSuspense;
      reactIs_development.isValidElementType = isValidElementType;
      reactIs_development.typeOf = typeOf;
    })();
  }

  {
    reactIs.exports = reactIs_development;
  }

  Object.defineProperty(ReactElement, '__esModule', {
    value: true
  });
  ReactElement.default = ReactElement.test = ReactElement.serialize = void 0;

  var ReactIs = _interopRequireWildcard(reactIs.exports);

  var _markup$1 = markup;

  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== 'function') return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }

  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || typeof obj !== 'object' && typeof obj !== 'function') {
      return {
        default: obj
      };
    }

    var cache = _getRequireWildcardCache(nodeInterop);

    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }

    newObj.default = obj;

    if (cache) {
      cache.set(obj, newObj);
    }

    return newObj;
  }
  /**
   * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  // Given element.props.children, or subtree during recursive traversal,
  // return flattened array of children.


  var getChildren = function getChildren(arg, children) {
    if (children === void 0) {
      children = [];
    }

    if (Array.isArray(arg)) {
      arg.forEach(function (item) {
        getChildren(item, children);
      });
    } else if (arg != null && arg !== false) {
      children.push(arg);
    }

    return children;
  };

  var getType = function getType(element) {
    var type = element.type;

    if (typeof type === 'string') {
      return type;
    }

    if (typeof type === 'function') {
      return type.displayName || type.name || 'Unknown';
    }

    if (ReactIs.isFragment(element)) {
      return 'React.Fragment';
    }

    if (ReactIs.isSuspense(element)) {
      return 'React.Suspense';
    }

    if (typeof type === 'object' && type !== null) {
      if (ReactIs.isContextProvider(element)) {
        return 'Context.Provider';
      }

      if (ReactIs.isContextConsumer(element)) {
        return 'Context.Consumer';
      }

      if (ReactIs.isForwardRef(element)) {
        if (type.displayName) {
          return type.displayName;
        }

        var functionName = type.render.displayName || type.render.name || '';
        return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
      }

      if (ReactIs.isMemo(element)) {
        var _functionName = type.displayName || type.type.displayName || type.type.name || '';

        return _functionName !== '' ? 'Memo(' + _functionName + ')' : 'Memo';
      }
    }

    return 'UNDEFINED';
  };

  var getPropKeys$1 = function getPropKeys(element) {
    var props = element.props;
    return Object.keys(props).filter(function (key) {
      return key !== 'children' && props[key] !== undefined;
    }).sort();
  };

  var serialize$1 = function serialize(element, config, indentation, depth, refs, printer) {
    return ++depth > config.maxDepth ? (0, _markup$1.printElementAsLeaf)(getType(element), config) : (0, _markup$1.printElement)(getType(element), (0, _markup$1.printProps)(getPropKeys$1(element), element.props, config, indentation + config.indent, depth, refs, printer), (0, _markup$1.printChildren)(getChildren(element.props.children), config, indentation + config.indent, depth, refs, printer), config, indentation);
  };

  ReactElement.serialize = serialize$1;

  var test$2 = function test(val) {
    return val != null && ReactIs.isElement(val);
  };

  ReactElement.test = test$2;
  var plugin$1 = {
    serialize: serialize$1,
    test: test$2
  };
  var _default$2 = plugin$1;
  ReactElement.default = _default$2;

  var ReactTestComponent = {};

  Object.defineProperty(ReactTestComponent, '__esModule', {
    value: true
  });
  ReactTestComponent.default = ReactTestComponent.test = ReactTestComponent.serialize = void 0;
  var _markup = markup;

  var global$f = function () {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    } else if (typeof global$f !== 'undefined') {
      return global$f;
    } else if (typeof self !== 'undefined') {
      return self;
    } else if (typeof window !== 'undefined') {
      return window;
    } else {
      return Function('return this')();
    }
  }();

  var Symbol$2 = global$f['jest-symbol-do-not-touch'] || global$f.Symbol;
  var testSymbol = typeof Symbol$2 === 'function' && Symbol$2.for ? Symbol$2.for('react.test.json') : 0xea71357;

  var getPropKeys = function getPropKeys(object) {
    var props = object.props;
    return props ? Object.keys(props).filter(function (key) {
      return props[key] !== undefined;
    }).sort() : [];
  };

  var serialize = function serialize(object, config, indentation, depth, refs, printer) {
    return ++depth > config.maxDepth ? (0, _markup.printElementAsLeaf)(object.type, config) : (0, _markup.printElement)(object.type, object.props ? (0, _markup.printProps)(getPropKeys(object), object.props, config, indentation + config.indent, depth, refs, printer) : '', object.children ? (0, _markup.printChildren)(object.children, config, indentation + config.indent, depth, refs, printer) : '', config, indentation);
  };

  ReactTestComponent.serialize = serialize;

  var test$1 = function test(val) {
    return val && val.$$typeof === testSymbol;
  };

  ReactTestComponent.test = test$1;
  var plugin = {
    serialize: serialize,
    test: test$1
  };
  var _default$1 = plugin;
  ReactTestComponent.default = _default$1;

  Object.defineProperty(build, '__esModule', {
    value: true
  });
  var format_1 = build.format = format;
  var default_1 = build.default = plugins_1 = build.plugins = DEFAULT_OPTIONS_1 = build.DEFAULT_OPTIONS = void 0;

  var _ansiStyles = _interopRequireDefault(ansiStyles.exports);

  var _collections = collections;

  var _AsymmetricMatcher = _interopRequireDefault(AsymmetricMatcher);

  var _ConvertAnsi = _interopRequireDefault(ConvertAnsi);

  var _DOMCollection = _interopRequireDefault(DOMCollection$1);

  var _DOMElement = _interopRequireDefault(DOMElement);

  var _Immutable = _interopRequireDefault(Immutable);

  var _ReactElement = _interopRequireDefault(ReactElement);

  var _ReactTestComponent = _interopRequireDefault(ReactTestComponent);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  /* eslint-disable local/ban-types-eventually */


  var toString$6 = Object.prototype.toString;
  var toISOString = Date.prototype.toISOString;
  var errorToString = Error.prototype.toString;
  var regExpToString = RegExp.prototype.toString;
  /**
   * Explicitly comparing typeof constructor to function avoids undefined as name
   * when mock identity-obj-proxy returns the key as the value for any key.
   */

  var getConstructorName = function getConstructorName(val) {
    return typeof val.constructor === 'function' && val.constructor.name || 'Object';
  };
  /* global window */

  /** Is val is equal to global window object? Works even if it does not exist :) */


  var isWindow = function isWindow(val) {
    return typeof window !== 'undefined' && val === window;
  };

  var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
  var NEWLINE_REGEXP = /\n/gi;

  var PrettyFormatPluginError = /*#__PURE__*/function (_Error) {
    _inheritsLoose(PrettyFormatPluginError, _Error);

    function PrettyFormatPluginError(message, stack) {
      var _this;

      _this = _Error.call(this, message) || this;
      _this.stack = stack;
      _this.name = _this.constructor.name;
      return _this;
    }

    return PrettyFormatPluginError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  function isToStringedArrayType(toStringed) {
    return toStringed === '[object Array]' || toStringed === '[object ArrayBuffer]' || toStringed === '[object DataView]' || toStringed === '[object Float32Array]' || toStringed === '[object Float64Array]' || toStringed === '[object Int8Array]' || toStringed === '[object Int16Array]' || toStringed === '[object Int32Array]' || toStringed === '[object Uint8Array]' || toStringed === '[object Uint8ClampedArray]' || toStringed === '[object Uint16Array]' || toStringed === '[object Uint32Array]';
  }

  function printNumber(val) {
    return Object.is(val, -0) ? '-0' : String(val);
  }

  function printBigInt(val) {
    return String(val + "n");
  }

  function printFunction(val, printFunctionName) {
    if (!printFunctionName) {
      return '[Function]';
    }

    return '[Function ' + (val.name || 'anonymous') + ']';
  }

  function printSymbol(val) {
    return String(val).replace(SYMBOL_REGEXP, 'Symbol($1)');
  }

  function printError(val) {
    return '[' + errorToString.call(val) + ']';
  }
  /**
   * The first port of call for printing an object, handles most of the
   * data-types in JS.
   */


  function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
    if (val === true || val === false) {
      return '' + val;
    }

    if (val === undefined) {
      return 'undefined';
    }

    if (val === null) {
      return 'null';
    }

    var typeOf = typeof val;

    if (typeOf === 'number') {
      return printNumber(val);
    }

    if (typeOf === 'bigint') {
      return printBigInt(val);
    }

    if (typeOf === 'string') {
      if (escapeString) {
        return '"' + val.replace(/"|\\/g, '\\$&') + '"';
      }

      return '"' + val + '"';
    }

    if (typeOf === 'function') {
      return printFunction(val, printFunctionName);
    }

    if (typeOf === 'symbol') {
      return printSymbol(val);
    }

    var toStringed = toString$6.call(val);

    if (toStringed === '[object WeakMap]') {
      return 'WeakMap {}';
    }

    if (toStringed === '[object WeakSet]') {
      return 'WeakSet {}';
    }

    if (toStringed === '[object Function]' || toStringed === '[object GeneratorFunction]') {
      return printFunction(val, printFunctionName);
    }

    if (toStringed === '[object Symbol]') {
      return printSymbol(val);
    }

    if (toStringed === '[object Date]') {
      return isNaN(+val) ? 'Date { NaN }' : toISOString.call(val);
    }

    if (toStringed === '[object Error]') {
      return printError(val);
    }

    if (toStringed === '[object RegExp]') {
      if (escapeRegex) {
        // https://github.com/benjamingr/RegExp.escape/blob/master/polyfill.js
        return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
      }

      return regExpToString.call(val);
    }

    if (val instanceof Error) {
      return printError(val);
    }

    return null;
  }
  /**
   * Handles more complex objects ( such as objects with circular references.
   * maps and sets etc )
   */


  function printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON) {
    if (refs.indexOf(val) !== -1) {
      return '[Circular]';
    }

    refs = refs.slice();
    refs.push(val);
    var hitMaxDepth = ++depth > config.maxDepth;
    var min = config.min;

    if (config.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON === 'function' && !hasCalledToJSON) {
      return printer(val.toJSON(), config, indentation, depth, refs, true);
    }

    var toStringed = toString$6.call(val);

    if (toStringed === '[object Arguments]') {
      return hitMaxDepth ? '[Arguments]' : (min ? '' : 'Arguments ') + '[' + (0, _collections.printListItems)(val, config, indentation, depth, refs, printer) + ']';
    }

    if (isToStringedArrayType(toStringed)) {
      return hitMaxDepth ? '[' + val.constructor.name + ']' : (min ? '' : !config.printBasicPrototype && val.constructor.name === 'Array' ? '' : val.constructor.name + ' ') + '[' + (0, _collections.printListItems)(val, config, indentation, depth, refs, printer) + ']';
    }

    if (toStringed === '[object Map]') {
      return hitMaxDepth ? '[Map]' : 'Map {' + (0, _collections.printIteratorEntries)(val.entries(), config, indentation, depth, refs, printer, ' => ') + '}';
    }

    if (toStringed === '[object Set]') {
      return hitMaxDepth ? '[Set]' : 'Set {' + (0, _collections.printIteratorValues)(val.values(), config, indentation, depth, refs, printer) + '}';
    } // Avoid failure to serialize global window object in jsdom test environment.
    // For example, not even relevant if window is prop of React element.


    return hitMaxDepth || isWindow(val) ? '[' + getConstructorName(val) + ']' : (min ? '' : !config.printBasicPrototype && getConstructorName(val) === 'Object' ? '' : getConstructorName(val) + ' ') + '{' + (0, _collections.printObjectProperties)(val, config, indentation, depth, refs, printer) + '}';
  }

  function isNewPlugin(plugin) {
    return plugin.serialize != null;
  }

  function printPlugin(plugin, val, config, indentation, depth, refs) {
    var printed;

    try {
      printed = isNewPlugin(plugin) ? plugin.serialize(val, config, indentation, depth, refs, printer) : plugin.print(val, function (valChild) {
        return printer(valChild, config, indentation, depth, refs);
      }, function (str) {
        var indentationNext = indentation + config.indent;
        return indentationNext + str.replace(NEWLINE_REGEXP, '\n' + indentationNext);
      }, {
        edgeSpacing: config.spacingOuter,
        min: config.min,
        spacing: config.spacingInner
      }, config.colors);
    } catch (error) {
      throw new PrettyFormatPluginError(error.message, error.stack);
    }

    if (typeof printed !== 'string') {
      throw new Error("pretty-format: Plugin must return type \"string\" but instead returned \"" + typeof printed + "\".");
    }

    return printed;
  }

  function findPlugin(plugins, val) {
    for (var p = 0; p < plugins.length; p++) {
      try {
        if (plugins[p].test(val)) {
          return plugins[p];
        }
      } catch (error) {
        throw new PrettyFormatPluginError(error.message, error.stack);
      }
    }

    return null;
  }

  function printer(val, config, indentation, depth, refs, hasCalledToJSON) {
    var plugin = findPlugin(config.plugins, val);

    if (plugin !== null) {
      return printPlugin(plugin, val, config, indentation, depth, refs);
    }

    var basicResult = printBasicValue(val, config.printFunctionName, config.escapeRegex, config.escapeString);

    if (basicResult !== null) {
      return basicResult;
    }

    return printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON);
  }

  var DEFAULT_THEME = {
    comment: 'gray',
    content: 'reset',
    prop: 'yellow',
    tag: 'cyan',
    value: 'green'
  };
  var DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
  var DEFAULT_OPTIONS = {
    callToJSON: true,
    escapeRegex: false,
    escapeString: true,
    highlight: false,
    indent: 2,
    maxDepth: Infinity,
    min: false,
    plugins: [],
    printBasicPrototype: true,
    printFunctionName: true,
    theme: DEFAULT_THEME
  };
  var DEFAULT_OPTIONS_1 = build.DEFAULT_OPTIONS = DEFAULT_OPTIONS;

  function validateOptions(options) {
    Object.keys(options).forEach(function (key) {
      if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
        throw new Error("pretty-format: Unknown option \"" + key + "\".");
      }
    });

    if (options.min && options.indent !== undefined && options.indent !== 0) {
      throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
    }

    if (options.theme !== undefined) {
      if (options.theme === null) {
        throw new Error("pretty-format: Option \"theme\" must not be null.");
      }

      if (typeof options.theme !== 'object') {
        throw new Error("pretty-format: Option \"theme\" must be of type \"object\" but instead received \"" + typeof options.theme + "\".");
      }
    }
  }

  var getColorsHighlight = function getColorsHighlight(options) {
    return DEFAULT_THEME_KEYS.reduce(function (colors, key) {
      var value = options.theme && options.theme[key] !== undefined ? options.theme[key] : DEFAULT_THEME[key];
      var color = value && _ansiStyles.default[value];

      if (color && typeof color.close === 'string' && typeof color.open === 'string') {
        colors[key] = color;
      } else {
        throw new Error("pretty-format: Option \"theme\" has a key \"" + key + "\" whose value \"" + value + "\" is undefined in ansi-styles.");
      }

      return colors;
    }, Object.create(null));
  };

  var getColorsEmpty = function getColorsEmpty() {
    return DEFAULT_THEME_KEYS.reduce(function (colors, key) {
      colors[key] = {
        close: '',
        open: ''
      };
      return colors;
    }, Object.create(null));
  };

  var getPrintFunctionName = function getPrintFunctionName(options) {
    return options && options.printFunctionName !== undefined ? options.printFunctionName : DEFAULT_OPTIONS.printFunctionName;
  };

  var getEscapeRegex = function getEscapeRegex(options) {
    return options && options.escapeRegex !== undefined ? options.escapeRegex : DEFAULT_OPTIONS.escapeRegex;
  };

  var getEscapeString = function getEscapeString(options) {
    return options && options.escapeString !== undefined ? options.escapeString : DEFAULT_OPTIONS.escapeString;
  };

  var getConfig$1 = function getConfig(options) {
    var _options$printBasicPr;

    return {
      callToJSON: options && options.callToJSON !== undefined ? options.callToJSON : DEFAULT_OPTIONS.callToJSON,
      colors: options && options.highlight ? getColorsHighlight(options) : getColorsEmpty(),
      escapeRegex: getEscapeRegex(options),
      escapeString: getEscapeString(options),
      indent: options && options.min ? '' : createIndent(options && options.indent !== undefined ? options.indent : DEFAULT_OPTIONS.indent),
      maxDepth: options && options.maxDepth !== undefined ? options.maxDepth : DEFAULT_OPTIONS.maxDepth,
      min: options && options.min !== undefined ? options.min : DEFAULT_OPTIONS.min,
      plugins: options && options.plugins !== undefined ? options.plugins : DEFAULT_OPTIONS.plugins,
      printBasicPrototype: (_options$printBasicPr = options === null || options === void 0 ? void 0 : options.printBasicPrototype) !== null && _options$printBasicPr !== void 0 ? _options$printBasicPr : true,
      printFunctionName: getPrintFunctionName(options),
      spacingInner: options && options.min ? ' ' : '\n',
      spacingOuter: options && options.min ? '' : '\n'
    };
  };

  function createIndent(indent) {
    return new Array(indent + 1).join(' ');
  }
  /**
   * Returns a presentation string of your `val` object
   * @param val any potential JavaScript object
   * @param options Custom settings
   */


  function format(val, options) {
    if (options) {
      validateOptions(options);

      if (options.plugins) {
        var plugin = findPlugin(options.plugins, val);

        if (plugin !== null) {
          return printPlugin(plugin, val, getConfig$1(options), '', 0, []);
        }
      }
    }

    var basicResult = printBasicValue(val, getPrintFunctionName(options), getEscapeRegex(options), getEscapeString(options));

    if (basicResult !== null) {
      return basicResult;
    }

    return printComplexValue(val, getConfig$1(options), '', 0, []);
  }

  var plugins = {
    AsymmetricMatcher: _AsymmetricMatcher.default,
    ConvertAnsi: _ConvertAnsi.default,
    DOMCollection: _DOMCollection.default,
    DOMElement: _DOMElement.default,
    Immutable: _Immutable.default,
    ReactElement: _ReactElement.default,
    ReactTestComponent: _ReactTestComponent.default
  };
  var plugins_1 = build.plugins = plugins;
  var _default = format;
  default_1 = build.default = _default;

  var index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), build, {
    format: format_1,
    get plugins () { return plugins_1; },
    get DEFAULT_OPTIONS () { return DEFAULT_OPTIONS_1; },
    get default () { return default_1; }
  }));

  /**
   * Source: https://github.com/facebook/jest/blob/e7bb6a1e26ffab90611b2593912df15b69315611/packages/pretty-format/src/plugins/DOMElement.ts
   */

  /* eslint-disable -- trying to stay as close to the original as possible */

  /* istanbul ignore file */
  function escapeHTML(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  } // Return empty string if keys is empty.


  var printProps = function printProps(keys, props, config, indentation, depth, refs, printer) {
    var indentationNext = indentation + config.indent;
    var colors = config.colors;
    return keys.map(function (key) {
      var value = props[key];
      var printed = printer(value, config, indentationNext, depth, refs);

      if (typeof value !== 'string') {
        if (printed.indexOf('\n') !== -1) {
          printed = config.spacingOuter + indentationNext + printed + config.spacingOuter + indentation;
        }

        printed = '{' + printed + '}';
      }

      return config.spacingInner + indentation + colors.prop.open + key + colors.prop.close + '=' + colors.value.open + printed + colors.value.close;
    }).join('');
  }; // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants


  var NodeTypeTextNode = 3; // Return empty string if children is empty.

  var printChildren = function printChildren(children, config, indentation, depth, refs, printer) {
    return children.map(function (child) {
      var printedChild = typeof child === 'string' ? printText(child, config) : printer(child, config, indentation, depth, refs);

      if (printedChild === '' && typeof child === 'object' && child !== null && child.nodeType !== NodeTypeTextNode) {
        // A plugin serialized this Node to '' meaning we should ignore it.
        return '';
      }

      return config.spacingOuter + indentation + printedChild;
    }).join('');
  };

  var printText = function printText(text, config) {
    var contentColor = config.colors.content;
    return contentColor.open + escapeHTML(text) + contentColor.close;
  };

  var printComment = function printComment(comment, config) {
    var commentColor = config.colors.comment;
    return commentColor.open + '<!--' + escapeHTML(comment) + '-->' + commentColor.close;
  }; // Separate the functions to format props, children, and element,
  // so a plugin could override a particular function, if needed.
  // Too bad, so sad: the traditional (but unnecessary) space
  // in a self-closing tagColor requires a second test of printedProps.


  var printElement = function printElement(type, printedProps, printedChildren, config, indentation) {
    var tagColor = config.colors.tag;
    return tagColor.open + '<' + type + (printedProps && tagColor.close + printedProps + config.spacingOuter + indentation + tagColor.open) + (printedChildren ? '>' + tagColor.close + printedChildren + config.spacingOuter + indentation + tagColor.open + '</' + type : (printedProps && !config.min ? '' : ' ') + '/') + '>' + tagColor.close;
  };

  var printElementAsLeaf = function printElementAsLeaf(type, config) {
    var tagColor = config.colors.tag;
    return tagColor.open + '<' + type + tagColor.close + ' …' + tagColor.open + ' />' + tagColor.close;
  };

  var ELEMENT_NODE$1 = 1;
  var TEXT_NODE$1 = 3;
  var COMMENT_NODE$1 = 8;
  var FRAGMENT_NODE = 11;
  var ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;

  var testNode = function testNode(val) {
    var constructorName = val.constructor.name;
    var nodeType = val.nodeType,
        tagName = val.tagName;
    var isCustomElement = typeof tagName === 'string' && tagName.includes('-') || typeof val.hasAttribute === 'function' && val.hasAttribute('is');
    return nodeType === ELEMENT_NODE$1 && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE$1 && constructorName === 'Text' || nodeType === COMMENT_NODE$1 && constructorName === 'Comment' || nodeType === FRAGMENT_NODE && constructorName === 'DocumentFragment';
  };

  function nodeIsText(node) {
    return node.nodeType === TEXT_NODE$1;
  }

  function nodeIsComment(node) {
    return node.nodeType === COMMENT_NODE$1;
  }

  function nodeIsFragment(node) {
    return node.nodeType === FRAGMENT_NODE;
  }

  function createDOMElementFilter(filterNode) {
    return {
      test: function test(val) {
        var _val$constructor2;

        return (val == null ? void 0 : (_val$constructor2 = val.constructor) == null ? void 0 : _val$constructor2.name) && testNode(val);
      },
      serialize: function serialize(node, config, indentation, depth, refs, printer) {
        if (nodeIsText(node)) {
          return printText(node.data, config);
        }

        if (nodeIsComment(node)) {
          return printComment(node.data, config);
        }

        var type = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();

        if (++depth > config.maxDepth) {
          return printElementAsLeaf(type, config);
        }

        return printElement(type, printProps(nodeIsFragment(node) ? [] : Array.from(node.attributes).map(function (attr) {
          return attr.name;
        }).sort(), nodeIsFragment(node) ? {} : Array.from(node.attributes).reduce(function (props, attribute) {
          props[attribute.name] = attribute.value;
          return props;
        }, {}), config, indentation + config.indent, depth, refs, printer), printChildren(Array.prototype.slice.call(node.childNodes || node.children).filter(filterNode), config, indentation + config.indent, depth, refs, printer), config, indentation);
      }
    };
  }

  // We try to load node dependencies
  var chalk = null;
  var readFileSync = null;
  var codeFrameColumns = null;

  try {
    var nodeRequire = module && module.require;
    readFileSync = nodeRequire.call(module, 'fs').readFileSync;
    codeFrameColumns = nodeRequire.call(module, '@babel/code-frame').codeFrameColumns;
    chalk = nodeRequire.call(module, 'chalk');
  } catch (_unused) {// We're in a browser environment
  } // frame has the form "at myMethod (location/to/my/file.js:10:2)"


  function getCodeFrame(frame) {
    var locationStart = frame.indexOf('(') + 1;
    var locationEnd = frame.indexOf(')');
    var frameLocation = frame.slice(locationStart, locationEnd);
    var frameLocationElements = frameLocation.split(':');
    var _ref = [frameLocationElements[0], parseInt(frameLocationElements[1], 10), parseInt(frameLocationElements[2], 10)],
        filename = _ref[0],
        line = _ref[1],
        column = _ref[2];
    var rawFileContents = '';

    try {
      rawFileContents = readFileSync(filename, 'utf-8');
    } catch (_unused2) {
      return '';
    }

    var codeFrame = codeFrameColumns(rawFileContents, {
      start: {
        line: line,
        column: column
      }
    }, {
      highlightCode: true,
      linesBelow: 0
    });
    return chalk.dim(frameLocation) + "\n" + codeFrame + "\n";
  }

  function getUserCodeFrame() {
    // If we couldn't load dependencies, we can't generate the user trace

    /* istanbul ignore next */
    if (!readFileSync || !codeFrameColumns) {
      return '';
    }

    var err = new Error();
    var firstClientCodeFrame = err.stack.split('\n').slice(1) // Remove first line which has the form "Error: TypeError"
    .find(function (frame) {
      return !frame.includes('node_modules/');
    }); // Ignore frames from 3rd party libraries

    return getCodeFrame(firstClientCodeFrame);
  }

  // Constant node.nodeType for text nodes, see:
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#Node_type_constants
  var TEXT_NODE = 3;

  function jestFakeTimersAreEnabled() {
    /* istanbul ignore else */
    if (typeof jest !== 'undefined' && jest !== null) {
      return (// legacy timers
        setTimeout._isMockFunction === true || // modern timers
        Object.prototype.hasOwnProperty.call(setTimeout, 'clock')
      );
    } // istanbul ignore next


    return false;
  }

  function getDocument() {
    /* istanbul ignore if */
    if (typeof window === 'undefined') {
      throw new Error('Could not find default container');
    }

    return window.document;
  }

  function getWindowFromNode(node) {
    if (node.defaultView) {
      // node is document
      return node.defaultView;
    } else if (node.ownerDocument && node.ownerDocument.defaultView) {
      // node is a DOM node
      return node.ownerDocument.defaultView;
    } else if (node.window) {
      // node is window
      return node.window;
    } else if (node.then instanceof Function) {
      throw new Error("It looks like you passed a Promise object instead of a DOM node. Did you do something like `fireEvent.click(screen.findBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`, or await the findBy query `fireEvent.click(await screen.findBy...`?");
    } else if (Array.isArray(node)) {
      throw new Error("It looks like you passed an Array instead of a DOM node. Did you do something like `fireEvent.click(screen.getAllBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`?");
    } else if (typeof node.debug === 'function' && typeof node.logTestingPlaygroundURL === 'function') {
      throw new Error("It looks like you passed a `screen` object. Did you do something like `fireEvent.click(screen, ...` when you meant to use a query, e.g. `fireEvent.click(screen.getBy..., `?");
    } else {
      // The user passed something unusual to a calling function
      throw new Error("Unable to find the \"window\" object for the given node. Please file an issue with the code that's causing you to see this error: https://github.com/testing-library/dom-testing-library/issues/new");
    }
  }

  function checkContainerType(container) {
    if (!container || !(typeof container.querySelector === 'function') || !(typeof container.querySelectorAll === 'function')) {
      throw new TypeError("Expected container to be an Element, a Document or a DocumentFragment but got " + getTypeName(container) + ".");
    }

    function getTypeName(object) {
      if (typeof object === 'object') {
        return object === null ? 'null' : object.constructor.name;
      }

      return typeof object;
    }
  }

  var DEFAULT_IGNORE_TAGS = 'script, style';

  var _excluded$1 = ["filterNode"];

  var inNode = function inNode() {
    return typeof process !== 'undefined' && process.versions !== undefined && process.versions.node !== undefined;
  };

  var DOMCollection = plugins_1.DOMCollection; // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants

  var ELEMENT_NODE = 1;
  var COMMENT_NODE = 8; // https://github.com/facebook/jest/blob/615084195ae1ae61ddd56162c62bbdda17587569/packages/pretty-format/src/plugins/DOMElement.ts#L50

  function filterCommentsAndDefaultIgnoreTagsTags(value) {
    return value.nodeType !== COMMENT_NODE && (value.nodeType !== ELEMENT_NODE || !value.matches(DEFAULT_IGNORE_TAGS));
  }

  function prettyDOM(dom, maxLength, options) {
    if (options === void 0) {
      options = {};
    }

    if (!dom) {
      dom = getDocument().body;
    }

    if (typeof maxLength !== 'number') {
      maxLength = typeof process !== 'undefined' && undefined || 7000;
    }

    if (maxLength === 0) {
      return '';
    }

    if (dom.documentElement) {
      dom = dom.documentElement;
    }

    var domTypeName = typeof dom;

    if (domTypeName === 'object') {
      domTypeName = dom.constructor.name;
    } else {
      // To don't fall with `in` operator
      dom = {};
    }

    if (!('outerHTML' in dom)) {
      throw new TypeError("Expected an element or document but got " + domTypeName);
    }

    var _options = options,
        _options$filterNode = _options.filterNode,
        filterNode = _options$filterNode === void 0 ? filterCommentsAndDefaultIgnoreTagsTags : _options$filterNode,
        prettyFormatOptions = _objectWithoutPropertiesLoose(_options, _excluded$1);

    var debugContent = format_1(dom, _extends({
      plugins: [createDOMElementFilter(filterNode), DOMCollection],
      printFunctionName: false,
      highlight: inNode()
    }, prettyFormatOptions));
    return maxLength !== undefined && dom.outerHTML.length > maxLength ? debugContent.slice(0, maxLength) + "..." : debugContent;
  }

  var logDOM = function logDOM() {
    var userCodeFrame = getUserCodeFrame();

    if (userCodeFrame) {
      console.log(prettyDOM.apply(void 0, arguments) + "\n\n" + userCodeFrame);
    } else {
      console.log(prettyDOM.apply(void 0, arguments));
    }
  };

  // It would be cleaner for this to live inside './queries', but
  // other parts of the code assume that all exports from
  // './queries' are query functions.
  var config = {
    testIdAttribute: 'data-testid',
    asyncUtilTimeout: 1000,
    // asyncWrapper and advanceTimersWrapper is to support React's async `act` function.
    // forcing react-testing-library to wrap all async functions would've been
    // a total nightmare (consider wrapping every findBy* query and then also
    // updating `within` so those would be wrapped too. Total nightmare).
    // so we have this config option that's really only intended for
    // react-testing-library to use. For that reason, this feature will remain
    // undocumented.
    asyncWrapper: function asyncWrapper(cb) {
      return cb();
    },
    unstable_advanceTimersWrapper: function unstable_advanceTimersWrapper(cb) {
      return cb();
    },
    eventWrapper: function eventWrapper(cb) {
      return cb();
    },
    // default value for the `hidden` option in `ByRole` queries
    defaultHidden: false,
    // showOriginalStackTrace flag to show the full error stack traces for async errors
    showOriginalStackTrace: false,
    // throw errors w/ suggestions for better queries. Opt in so off by default.
    throwSuggestions: false,
    // called when getBy* queries fail. (message, container) => Error
    getElementError: function getElementError(message, container) {
      var prettifiedDOM = prettyDOM(container);
      var error = new Error([message, "Ignored nodes: comments, <script />, <style />\n" + prettifiedDOM].filter(Boolean).join('\n\n'));
      error.name = 'TestingLibraryElementError';
      return error;
    },
    _disableExpensiveErrorDiagnostics: false,
    computedStyleSupportsPseudoElements: false
  };
  function runWithExpensiveErrorDiagnosticsDisabled(callback) {
    try {
      config._disableExpensiveErrorDiagnostics = true;
      return callback();
    } finally {
      config._disableExpensiveErrorDiagnostics = false;
    }
  }
  function configure(newConfig) {
    if (typeof newConfig === 'function') {
      // Pass the existing config out to the provided function
      // and accept a delta in return
      newConfig = newConfig(config);
    } // Merge the incoming config delta


    config = _extends({}, config, newConfig);
  }
  function getConfig() {
    return config;
  }

  var labelledNodeNames = ['button', 'meter', 'output', 'progress', 'select', 'textarea', 'input'];

  function getTextContent(node) {
    if (labelledNodeNames.includes(node.nodeName.toLowerCase())) {
      return '';
    }

    if (node.nodeType === TEXT_NODE) return node.textContent;
    return Array.from(node.childNodes).map(function (childNode) {
      return getTextContent(childNode);
    }).join('');
  }

  function getLabelContent(element) {
    var textContent;

    if (element.tagName.toLowerCase() === 'label') {
      textContent = getTextContent(element);
    } else {
      textContent = element.value || element.textContent;
    }

    return textContent;
  } // Based on https://github.com/eps1lon/dom-accessibility-api/pull/352


  function getRealLabels(element) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- types are not aware of older browsers that don't implement `labels`
    if (element.labels !== undefined) {
      var _labels;

      return (_labels = element.labels) != null ? _labels : [];
    }

    if (!isLabelable(element)) return [];
    var labels = element.ownerDocument.querySelectorAll('label');
    return Array.from(labels).filter(function (label) {
      return label.control === element;
    });
  }

  function isLabelable(element) {
    return /BUTTON|METER|OUTPUT|PROGRESS|SELECT|TEXTAREA/.test(element.tagName) || element.tagName === 'INPUT' && element.getAttribute('type') !== 'hidden';
  }

  function getLabels$1(container, element, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$selector = _ref.selector,
        selector = _ref$selector === void 0 ? '*' : _ref$selector;

    var ariaLabelledBy = element.getAttribute('aria-labelledby');
    var labelsId = ariaLabelledBy ? ariaLabelledBy.split(' ') : [];
    return labelsId.length ? labelsId.map(function (labelId) {
      var labellingElement = container.querySelector("[id=\"" + labelId + "\"]");
      return labellingElement ? {
        content: getLabelContent(labellingElement),
        formControl: null
      } : {
        content: '',
        formControl: null
      };
    }) : Array.from(getRealLabels(element)).map(function (label) {
      var textToMatch = getLabelContent(label);
      var formControlSelector = 'button, input, meter, output, progress, select, textarea';
      var labelledFormControl = Array.from(label.querySelectorAll(formControlSelector)).filter(function (formControlElement) {
        return formControlElement.matches(selector);
      })[0];
      return {
        content: textToMatch,
        formControl: labelledFormControl
      };
    });
  }

  function assertNotNullOrUndefined(matcher) {
    if (matcher === null || matcher === undefined) {
      throw new Error( // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- implicitly converting `T` to `string`
      "It looks like " + matcher + " was passed instead of a matcher. Did you do something like getByText(" + matcher + ")?");
    }
  }

  function fuzzyMatches(textToMatch, node, matcher, normalizer) {
    if (typeof textToMatch !== 'string') {
      return false;
    }

    assertNotNullOrUndefined(matcher);
    var normalizedText = normalizer(textToMatch);

    if (typeof matcher === 'string' || typeof matcher === 'number') {
      return normalizedText.toLowerCase().includes(matcher.toString().toLowerCase());
    } else if (typeof matcher === 'function') {
      return matcher(normalizedText, node);
    } else {
      return matcher.test(normalizedText);
    }
  }

  function matches(textToMatch, node, matcher, normalizer) {
    if (typeof textToMatch !== 'string') {
      return false;
    }

    assertNotNullOrUndefined(matcher);
    var normalizedText = normalizer(textToMatch);

    if (matcher instanceof Function) {
      return matcher(normalizedText, node);
    } else if (matcher instanceof RegExp) {
      return matcher.test(normalizedText);
    } else {
      return normalizedText === String(matcher);
    }
  }

  function getDefaultNormalizer(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$trim = _ref.trim,
        trim = _ref$trim === void 0 ? true : _ref$trim,
        _ref$collapseWhitespa = _ref.collapseWhitespace,
        collapseWhitespace = _ref$collapseWhitespa === void 0 ? true : _ref$collapseWhitespa;

    return function (text) {
      var normalizedText = text;
      normalizedText = trim ? normalizedText.trim() : normalizedText;
      normalizedText = collapseWhitespace ? normalizedText.replace(/\s+/g, ' ') : normalizedText;
      return normalizedText;
    };
  }
  /**
   * Constructs a normalizer to pass to functions in matches.js
   * @param {boolean|undefined} trim The user-specified value for `trim`, without
   * any defaulting having been applied
   * @param {boolean|undefined} collapseWhitespace The user-specified value for
   * `collapseWhitespace`, without any defaulting having been applied
   * @param {Function|undefined} normalizer The user-specified normalizer
   * @returns {Function} A normalizer
   */


  function makeNormalizer(_ref2) {
    var trim = _ref2.trim,
        collapseWhitespace = _ref2.collapseWhitespace,
        normalizer = _ref2.normalizer;

    if (normalizer) {
      // User has specified a custom normalizer
      if (typeof trim !== 'undefined' || typeof collapseWhitespace !== 'undefined') {
        // They've also specified a value for trim or collapseWhitespace
        throw new Error('trim and collapseWhitespace are not supported with a normalizer. ' + 'If you want to use the default trim and collapseWhitespace logic in your normalizer, ' + 'use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer');
      }

      return normalizer;
    } else {
      // No custom normalizer specified. Just use default.
      return getDefaultNormalizer({
        trim: trim,
        collapseWhitespace: collapseWhitespace
      });
    }
  }

  function getNodeText(node) {
    if (node.matches('input[type=submit], input[type=button], input[type=reset]')) {
      return node.value;
    }

    return Array.from(node.childNodes).filter(function (child) {
      return child.nodeType === TEXT_NODE && Boolean(child.textContent);
    }).map(function (c) {
      return c.textContent;
    }).join('');
  }

  /**
   * @source {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill}
   * but without thisArg (too hard to type, no need to `this`)
   */
  var toStr = Object.prototype.toString;

  function isCallable(fn) {
    return typeof fn === "function" || toStr.call(fn) === "[object Function]";
  }

  function toInteger$4(value) {
    var number = Number(value);

    if (isNaN(number)) {
      return 0;
    }

    if (number === 0 || !isFinite(number)) {
      return number;
    }

    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  }

  var maxSafeInteger = Math.pow(2, 53) - 1;

  function toLength$7(value) {
    var len = toInteger$4(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  }
  /**
   * Creates an array from an iterable object.
   * @param iterable An iterable object to convert to an array.
   */

  /**
   * Creates an array from an iterable object.
   * @param iterable An iterable object to convert to an array.
   * @param mapfn A mapping function to call on every element of the array.
   * @param thisArg Value of 'this' used to invoke the mapfn.
   */


  function arrayFrom$1(arrayLike, mapFn) {
    // 1. Let C be the this value.
    // edit(@eps1lon): we're not calling it as Array.from
    var C = Array; // 2. Let items be ToObject(arrayLike).

    var items = Object(arrayLike); // 3. ReturnIfAbrupt(items).

    if (arrayLike == null) {
      throw new TypeError("Array.from requires an array-like object - not null or undefined");
    } // 4. If mapfn is undefined, then let mapping be false.
    // const mapFn = arguments.length > 1 ? arguments[1] : void undefined;


    if (typeof mapFn !== "undefined") {
      // 5. else
      // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
      if (!isCallable(mapFn)) {
        throw new TypeError("Array.from: when provided, the second argument must be a function");
      }
    } // 10. Let lenValue be Get(items, "length").
    // 11. Let len be ToLength(lenValue).


    var len = toLength$7(items.length); // 13. If IsConstructor(C) is true, then
    // 13. a. Let A be the result of calling the [[Construct]] internal method
    // of C with an argument list containing the single item len.
    // 14. a. Else, Let A be ArrayCreate(len).

    var A = isCallable(C) ? Object(new C(len)) : new Array(len); // 16. Let k be 0.

    var k = 0; // 17. Repeat, while k < len… (also steps a - h)

    var kValue;

    while (k < len) {
      kValue = items[k];

      if (mapFn) {
        A[k] = mapFn(kValue, k);
      } else {
        A[k] = kValue;
      }

      k += 1;
    } // 18. Let putStatus be Put(A, "length", len, true).


    A.length = len; // 20. Return A.

    return A;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  } // for environments without Set we fallback to arrays with unique members


  var SetLike = /*#__PURE__*/function () {
    function SetLike() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _classCallCheck(this, SetLike);

      _defineProperty(this, "items", void 0);

      this.items = items;
    }

    _createClass(SetLike, [{
      key: "add",
      value: function add(value) {
        if (this.has(value) === false) {
          this.items.push(value);
        }

        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.items = [];
      }
    }, {
      key: "delete",
      value: function _delete(value) {
        var previousLength = this.items.length;
        this.items = this.items.filter(function (item) {
          return item !== value;
        });
        return previousLength !== this.items.length;
      }
    }, {
      key: "forEach",
      value: function forEach(callbackfn) {
        var _this = this;

        this.items.forEach(function (item) {
          callbackfn(item, item, _this);
        });
      }
    }, {
      key: "has",
      value: function has(value) {
        return this.items.indexOf(value) !== -1;
      }
    }, {
      key: "size",
      get: function get() {
        return this.items.length;
      }
    }]);

    return SetLike;
  }();

  var SetLike$1 = typeof Set === "undefined" ? Set : SetLike;

  // https://w3c.github.io/html-aria/#document-conformance-requirements-for-use-of-aria-attributes-in-html
  var localNameToRoleMappings = {
    article: "article",
    aside: "complementary",
    button: "button",
    datalist: "listbox",
    dd: "definition",
    details: "group",
    dialog: "dialog",
    dt: "term",
    fieldset: "group",
    figure: "figure",
    // WARNING: Only with an accessible name
    form: "form",
    footer: "contentinfo",
    h1: "heading",
    h2: "heading",
    h3: "heading",
    h4: "heading",
    h5: "heading",
    h6: "heading",
    header: "banner",
    hr: "separator",
    html: "document",
    legend: "legend",
    li: "listitem",
    math: "math",
    main: "main",
    menu: "list",
    nav: "navigation",
    ol: "list",
    optgroup: "group",
    // WARNING: Only in certain context
    option: "option",
    output: "status",
    progress: "progressbar",
    // WARNING: Only with an accessible name
    section: "region",
    summary: "button",
    table: "table",
    tbody: "rowgroup",
    textarea: "textbox",
    tfoot: "rowgroup",
    // WARNING: Only in certain context
    td: "cell",
    th: "columnheader",
    thead: "rowgroup",
    tr: "row",
    ul: "list"
  };
  var prohibitedAttributes = {
    caption: new Set(["aria-label", "aria-labelledby"]),
    code: new Set(["aria-label", "aria-labelledby"]),
    deletion: new Set(["aria-label", "aria-labelledby"]),
    emphasis: new Set(["aria-label", "aria-labelledby"]),
    generic: new Set(["aria-label", "aria-labelledby", "aria-roledescription"]),
    insertion: new Set(["aria-label", "aria-labelledby"]),
    paragraph: new Set(["aria-label", "aria-labelledby"]),
    presentation: new Set(["aria-label", "aria-labelledby"]),
    strong: new Set(["aria-label", "aria-labelledby"]),
    subscript: new Set(["aria-label", "aria-labelledby"]),
    superscript: new Set(["aria-label", "aria-labelledby"])
  };
  /**
   *
   * @param element
   * @param role The role used for this element. This is specified to control whether you want to use the implicit or explicit role.
   */

  function hasGlobalAriaAttributes(element, role) {
    // https://rawgit.com/w3c/aria/stable/#global_states
    // commented attributes are deprecated
    return ["aria-atomic", "aria-busy", "aria-controls", "aria-current", "aria-describedby", "aria-details", // "disabled",
    "aria-dropeffect", // "errormessage",
    "aria-flowto", "aria-grabbed", // "haspopup",
    "aria-hidden", // "invalid",
    "aria-keyshortcuts", "aria-label", "aria-labelledby", "aria-live", "aria-owns", "aria-relevant", "aria-roledescription"].some(function (attributeName) {
      var _prohibitedAttributes;

      return element.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes[role]) !== null && _prohibitedAttributes !== void 0 && _prohibitedAttributes.has(attributeName));
    });
  }

  function ignorePresentationalRole(element, implicitRole) {
    // https://rawgit.com/w3c/aria/stable/#conflict_resolution_presentation_none
    return hasGlobalAriaAttributes(element, implicitRole);
  }

  function getRole(element) {
    var explicitRole = getExplicitRole(element);

    if (explicitRole === null || explicitRole === "presentation") {
      var implicitRole = getImplicitRole(element);

      if (explicitRole !== "presentation" || ignorePresentationalRole(element, implicitRole || "")) {
        return implicitRole;
      }
    }

    return explicitRole;
  }

  function getImplicitRole(element) {
    var mappedByTag = localNameToRoleMappings[getLocalName(element)];

    if (mappedByTag !== undefined) {
      return mappedByTag;
    }

    switch (getLocalName(element)) {
      case "a":
      case "area":
      case "link":
        if (element.hasAttribute("href")) {
          return "link";
        }

        break;

      case "img":
        if (element.getAttribute("alt") === "" && !ignorePresentationalRole(element, "img")) {
          return "presentation";
        }

        return "img";

      case "input":
        {
          var _ref = element,
              type = _ref.type;

          switch (type) {
            case "button":
            case "image":
            case "reset":
            case "submit":
              return "button";

            case "checkbox":
            case "radio":
              return type;

            case "range":
              return "slider";

            case "email":
            case "tel":
            case "text":
            case "url":
              if (element.hasAttribute("list")) {
                return "combobox";
              }

              return "textbox";

            case "search":
              if (element.hasAttribute("list")) {
                return "combobox";
              }

              return "searchbox";

            default:
              return null;
          }
        }

      case "select":
        if (element.hasAttribute("multiple") || element.size > 1) {
          return "listbox";
        }

        return "combobox";
    }

    return null;
  }

  function getExplicitRole(element) {
    var role = element.getAttribute("role");

    if (role !== null) {
      var explicitRole = role.trim().split(" ")[0]; // String.prototype.split(sep, limit) will always return an array with at least one member
      // as long as limit is either undefined or > 0

      if (explicitRole.length > 0) {
        return explicitRole;
      }
    }

    return null;
  }

  /**
   * Safe Element.localName for all supported environments
   * @param element
   */

  function getLocalName(element) {
    var _element$localName;

    return (// eslint-disable-next-line no-restricted-properties -- actual guard for environments without localName
      (_element$localName = element.localName) !== null && _element$localName !== void 0 ? _element$localName : // eslint-disable-next-line no-restricted-properties -- required for the fallback
      element.tagName.toLowerCase()
    );
  }
  function isElement(node) {
    return node !== null && node.nodeType === node.ELEMENT_NODE;
  }
  function isHTMLTableCaptionElement(node) {
    return isElement(node) && getLocalName(node) === "caption";
  }
  function isHTMLInputElement(node) {
    return isElement(node) && getLocalName(node) === "input";
  }
  function isHTMLOptGroupElement(node) {
    return isElement(node) && getLocalName(node) === "optgroup";
  }
  function isHTMLSelectElement(node) {
    return isElement(node) && getLocalName(node) === "select";
  }
  function isHTMLTableElement(node) {
    return isElement(node) && getLocalName(node) === "table";
  }
  function isHTMLTextAreaElement(node) {
    return isElement(node) && getLocalName(node) === "textarea";
  }
  function safeWindow(node) {
    var _ref = node.ownerDocument === null ? node : node.ownerDocument,
        defaultView = _ref.defaultView;

    if (defaultView === null) {
      throw new TypeError("no window available");
    }

    return defaultView;
  }
  function isHTMLFieldSetElement(node) {
    return isElement(node) && getLocalName(node) === "fieldset";
  }
  function isHTMLLegendElement(node) {
    return isElement(node) && getLocalName(node) === "legend";
  }
  function isHTMLSlotElement(node) {
    return isElement(node) && getLocalName(node) === "slot";
  }
  function isSVGElement(node) {
    return isElement(node) && node.ownerSVGElement !== undefined;
  }
  function isSVGSVGElement(node) {
    return isElement(node) && getLocalName(node) === "svg";
  }
  function isSVGTitleElement(node) {
    return isSVGElement(node) && getLocalName(node) === "title";
  }
  /**
   *
   * @param {Node} node -
   * @param {string} attributeName -
   * @returns {Element[]} -
   */

  function queryIdRefs(node, attributeName) {
    if (isElement(node) && node.hasAttribute(attributeName)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe due to hasAttribute check
      var ids = node.getAttribute(attributeName).split(" ");
      return ids.map(function (id) {
        return node.ownerDocument.getElementById(id);
      }).filter(function (element) {
        return element !== null;
      } // TODO: why does this not narrow?
      );
    }

    return [];
  }
  function hasAnyConcreteRoles(node, roles) {
    if (isElement(node)) {
      return roles.indexOf(getRole(node)) !== -1;
    }

    return false;
  }

  /**
   * implements https://w3c.github.io/accname/
   */
  /**
   *  A string of characters where all carriage returns, newlines, tabs, and form-feeds are replaced with a single space, and multiple spaces are reduced to a single space. The string contains only character data; it does not contain any markup.
   */

  /**
   *
   * @param {string} string -
   * @returns {FlatString} -
   */

  function asFlatString(s) {
    return s.trim().replace(/\s\s+/g, " ");
  }
  /**
   *
   * @param node -
   * @param options - These are not optional to prevent accidentally calling it without options in `computeAccessibleName`
   * @returns {boolean} -
   */


  function isHidden(node, getComputedStyleImplementation) {
    if (!isElement(node)) {
      return false;
    }

    if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true") {
      return true;
    }

    var style = getComputedStyleImplementation(node);
    return style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden";
  }
  /**
   * @param {Node} node -
   * @returns {boolean} - As defined in step 2E of https://w3c.github.io/accname/#mapping_additional_nd_te
   */


  function isControl(node) {
    return hasAnyConcreteRoles(node, ["button", "combobox", "listbox", "textbox"]) || hasAbstractRole(node, "range");
  }

  function hasAbstractRole(node, role) {
    if (!isElement(node)) {
      return false;
    }

    switch (role) {
      case "range":
        return hasAnyConcreteRoles(node, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);

      default:
        throw new TypeError("No knowledge about abstract role '".concat(role, "'. This is likely a bug :("));
    }
  }
  /**
   * element.querySelectorAll but also considers owned tree
   * @param element
   * @param selectors
   */


  function querySelectorAllSubtree(element, selectors) {
    var elements = arrayFrom$1(element.querySelectorAll(selectors));
    queryIdRefs(element, "aria-owns").forEach(function (root) {
      // babel transpiles this assuming an iterator
      elements.push.apply(elements, arrayFrom$1(root.querySelectorAll(selectors)));
    });
    return elements;
  }

  function querySelectedOptions(listbox) {
    if (isHTMLSelectElement(listbox)) {
      // IE11 polyfill
      return listbox.selectedOptions || querySelectorAllSubtree(listbox, "[selected]");
    }

    return querySelectorAllSubtree(listbox, '[aria-selected="true"]');
  }

  function isMarkedPresentational(node) {
    return hasAnyConcreteRoles(node, ["none", "presentation"]);
  }
  /**
   * Elements specifically listed in html-aam
   *
   * We don't need this for `label` or `legend` elements.
   * Their implicit roles already allow "naming from content".
   *
   * sources:
   *
   * - https://w3c.github.io/html-aam/#table-element
   */


  function isNativeHostLanguageTextAlternativeElement(node) {
    return isHTMLTableCaptionElement(node);
  }
  /**
   * https://w3c.github.io/aria/#namefromcontent
   */


  function allowsNameFromContent(node) {
    return hasAnyConcreteRoles(node, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
  }
  /**
   * TODO https://github.com/eps1lon/dom-accessibility-api/issues/100
   */


  function isDescendantOfNativeHostLanguageTextAlternativeElement( // eslint-disable-next-line @typescript-eslint/no-unused-vars -- not implemented yet
  node) {
    return false;
  }

  function getValueOfTextbox(element) {
    if (isHTMLInputElement(element) || isHTMLTextAreaElement(element)) {
      return element.value;
    } // https://github.com/eps1lon/dom-accessibility-api/issues/4


    return element.textContent || "";
  }

  function getTextualContent(declaration) {
    var content = declaration.getPropertyValue("content");

    if (/^["'].*["']$/.test(content)) {
      return content.slice(1, -1);
    }

    return "";
  }
  /**
   * https://html.spec.whatwg.org/multipage/forms.html#category-label
   * TODO: form-associated custom elements
   * @param element
   */


  function isLabelableElement(element) {
    var localName = getLocalName(element);
    return localName === "button" || localName === "input" && element.getAttribute("type") !== "hidden" || localName === "meter" || localName === "output" || localName === "progress" || localName === "select" || localName === "textarea";
  }
  /**
   * > [...], then the first such descendant in tree order is the label element's labeled control.
   * -- https://html.spec.whatwg.org/multipage/forms.html#labeled-control
   * @param element
   */


  function findLabelableElement(element) {
    if (isLabelableElement(element)) {
      return element;
    }

    var labelableElement = null;
    element.childNodes.forEach(function (childNode) {
      if (labelableElement === null && isElement(childNode)) {
        var descendantLabelableElement = findLabelableElement(childNode);

        if (descendantLabelableElement !== null) {
          labelableElement = descendantLabelableElement;
        }
      }
    });
    return labelableElement;
  }
  /**
   * Polyfill of HTMLLabelElement.control
   * https://html.spec.whatwg.org/multipage/forms.html#labeled-control
   * @param label
   */


  function getControlOfLabel(label) {
    if (label.control !== undefined) {
      return label.control;
    }

    var htmlFor = label.getAttribute("for");

    if (htmlFor !== null) {
      return label.ownerDocument.getElementById(htmlFor);
    }

    return findLabelableElement(label);
  }
  /**
   * Polyfill of HTMLInputElement.labels
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/labels
   * @param element
   */


  function getLabels(element) {
    var labelsProperty = element.labels;

    if (labelsProperty === null) {
      return labelsProperty;
    }

    if (labelsProperty !== undefined) {
      return arrayFrom$1(labelsProperty);
    } // polyfill


    if (!isLabelableElement(element)) {
      return null;
    }

    var document = element.ownerDocument;
    return arrayFrom$1(document.querySelectorAll("label")).filter(function (label) {
      return getControlOfLabel(label) === element;
    });
  }
  /**
   * Gets the contents of a slot used for computing the accname
   * @param slot
   */


  function getSlotContents(slot) {
    // Computing the accessible name for elements containing slots is not
    // currently defined in the spec. This implementation reflects the
    // behavior of NVDA 2020.2/Firefox 81 and iOS VoiceOver/Safari 13.6.
    var assignedNodes = slot.assignedNodes();

    if (assignedNodes.length === 0) {
      // if no nodes are assigned to the slot, it displays the default content
      return arrayFrom$1(slot.childNodes);
    }

    return assignedNodes;
  }
  /**
   * implements https://w3c.github.io/accname/#mapping_additional_nd_te
   * @param root
   * @param [options]
   * @param [options.getComputedStyle] - mock window.getComputedStyle. Needs `content`, `display` and `visibility`
   */


  function computeTextAlternative(root) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var consultedNodes = new SetLike$1();
    var window = safeWindow(root);
    var _options$compute = options.compute,
        compute = _options$compute === void 0 ? "name" : _options$compute,
        _options$computedStyl = options.computedStyleSupportsPseudoElements,
        computedStyleSupportsPseudoElements = _options$computedStyl === void 0 ? options.getComputedStyle !== undefined : _options$computedStyl,
        _options$getComputedS = options.getComputedStyle,
        getComputedStyle = _options$getComputedS === void 0 ? window.getComputedStyle.bind(window) : _options$getComputedS; // 2F.i

    function computeMiscTextAlternative(node, context) {
      var accumulatedText = "";

      if (isElement(node) && computedStyleSupportsPseudoElements) {
        var pseudoBefore = getComputedStyle(node, "::before");
        var beforeContent = getTextualContent(pseudoBefore);
        accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
      } // FIXME: Including aria-owns is not defined in the spec
      // But it is required in the web-platform-test


      var childNodes = isHTMLSlotElement(node) ? getSlotContents(node) : arrayFrom$1(node.childNodes).concat(queryIdRefs(node, "aria-owns"));
      childNodes.forEach(function (child) {
        var result = computeTextAlternative(child, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: false,
          recursion: true
        }); // TODO: Unclear why display affects delimiter
        // see https://github.com/w3c/accname/issues/3

        var display = isElement(child) ? getComputedStyle(child).getPropertyValue("display") : "inline";
        var separator = display !== "inline" ? " " : ""; // trailing separator for wpt tests

        accumulatedText += "".concat(separator).concat(result).concat(separator);
      });

      if (isElement(node) && computedStyleSupportsPseudoElements) {
        var pseudoAfter = getComputedStyle(node, "::after");
        var afterContent = getTextualContent(pseudoAfter);
        accumulatedText = "".concat(accumulatedText, " ").concat(afterContent);
      }

      return accumulatedText;
    }

    function computeElementTextAlternative(node) {
      if (!isElement(node)) {
        return null;
      }
      /**
       *
       * @param element
       * @param attributeName
       * @returns A string non-empty string or `null`
       */


      function useAttribute(element, attributeName) {
        var attribute = element.getAttributeNode(attributeName);

        if (attribute !== null && !consultedNodes.has(attribute) && attribute.value.trim() !== "") {
          consultedNodes.add(attribute);
          return attribute.value;
        }

        return null;
      } // https://w3c.github.io/html-aam/#fieldset-and-legend-elements


      if (isHTMLFieldSetElement(node)) {
        consultedNodes.add(node);
        var children = arrayFrom$1(node.childNodes);

        for (var i = 0; i < children.length; i += 1) {
          var child = children[i];

          if (isHTMLLegendElement(child)) {
            return computeTextAlternative(child, {
              isEmbeddedInLabel: false,
              isReferenced: false,
              recursion: false
            });
          }
        }
      } else if (isHTMLTableElement(node)) {
        // https://w3c.github.io/html-aam/#table-element
        consultedNodes.add(node);

        var _children = arrayFrom$1(node.childNodes);

        for (var _i = 0; _i < _children.length; _i += 1) {
          var _child = _children[_i];

          if (isHTMLTableCaptionElement(_child)) {
            return computeTextAlternative(_child, {
              isEmbeddedInLabel: false,
              isReferenced: false,
              recursion: false
            });
          }
        }
      } else if (isSVGSVGElement(node)) {
        // https://www.w3.org/TR/svg-aam-1.0/
        consultedNodes.add(node);

        var _children2 = arrayFrom$1(node.childNodes);

        for (var _i2 = 0; _i2 < _children2.length; _i2 += 1) {
          var _child2 = _children2[_i2];

          if (isSVGTitleElement(_child2)) {
            return _child2.textContent;
          }
        }

        return null;
      } else if (getLocalName(node) === "img" || getLocalName(node) === "area") {
        // https://w3c.github.io/html-aam/#area-element
        // https://w3c.github.io/html-aam/#img-element
        var nameFromAlt = useAttribute(node, "alt");

        if (nameFromAlt !== null) {
          return nameFromAlt;
        }
      } else if (isHTMLOptGroupElement(node)) {
        var nameFromLabel = useAttribute(node, "label");

        if (nameFromLabel !== null) {
          return nameFromLabel;
        }
      }

      if (isHTMLInputElement(node) && (node.type === "button" || node.type === "submit" || node.type === "reset")) {
        // https://w3c.github.io/html-aam/#input-type-text-input-type-password-input-type-search-input-type-tel-input-type-email-input-type-url-and-textarea-element-accessible-description-computation
        var nameFromValue = useAttribute(node, "value");

        if (nameFromValue !== null) {
          return nameFromValue;
        } // TODO: l10n


        if (node.type === "submit") {
          return "Submit";
        } // TODO: l10n


        if (node.type === "reset") {
          return "Reset";
        }
      }

      var labels = getLabels(node);

      if (labels !== null && labels.length !== 0) {
        consultedNodes.add(node);
        return arrayFrom$1(labels).map(function (element) {
          return computeTextAlternative(element, {
            isEmbeddedInLabel: true,
            isReferenced: false,
            recursion: true
          });
        }).filter(function (label) {
          return label.length > 0;
        }).join(" ");
      } // https://w3c.github.io/html-aam/#input-type-image-accessible-name-computation
      // TODO: wpt test consider label elements but html-aam does not mention them
      // We follow existing implementations over spec


      if (isHTMLInputElement(node) && node.type === "image") {
        var _nameFromAlt = useAttribute(node, "alt");

        if (_nameFromAlt !== null) {
          return _nameFromAlt;
        }

        var nameFromTitle = useAttribute(node, "title");

        if (nameFromTitle !== null) {
          return nameFromTitle;
        } // TODO: l10n


        return "Submit Query";
      }

      return useAttribute(node, "title");
    }

    function computeTextAlternative(current, context) {
      if (consultedNodes.has(current)) {
        return "";
      } // special casing, cheating to make tests pass
      // https://github.com/w3c/accname/issues/67


      if (hasAnyConcreteRoles(current, ["menu"])) {
        consultedNodes.add(current);
        return "";
      } // 2A


      if (isHidden(current, getComputedStyle) && !context.isReferenced) {
        consultedNodes.add(current);
        return "";
      } // 2B


      var labelElements = queryIdRefs(current, "aria-labelledby");

      if (compute === "name" && !context.isReferenced && labelElements.length > 0) {
        return labelElements.map(function (element) {
          return computeTextAlternative(element, {
            isEmbeddedInLabel: context.isEmbeddedInLabel,
            isReferenced: true,
            // thais isn't recursion as specified, otherwise we would skip
            // `aria-label` in
            // <input id="myself" aria-label="foo" aria-labelledby="myself"
            recursion: false
          });
        }).join(" ");
      } // 2C
      // Changed from the spec in anticipation of https://github.com/w3c/accname/issues/64
      // spec says we should only consider skipping if we have a non-empty label


      var skipToStep2E = context.recursion && isControl(current) && compute === "name";

      if (!skipToStep2E) {
        var ariaLabel = (isElement(current) && current.getAttribute("aria-label") || "").trim();

        if (ariaLabel !== "" && compute === "name") {
          consultedNodes.add(current);
          return ariaLabel;
        } // 2D


        if (!isMarkedPresentational(current)) {
          var elementTextAlternative = computeElementTextAlternative(current);

          if (elementTextAlternative !== null) {
            consultedNodes.add(current);
            return elementTextAlternative;
          }
        }
      } // 2E


      if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
        if (hasAnyConcreteRoles(current, ["combobox", "listbox"])) {
          consultedNodes.add(current);
          var selectedOptions = querySelectedOptions(current);

          if (selectedOptions.length === 0) {
            // defined per test `name_heading_combobox`
            return isHTMLInputElement(current) ? current.value : "";
          }

          return arrayFrom$1(selectedOptions).map(function (selectedOption) {
            return computeTextAlternative(selectedOption, {
              isEmbeddedInLabel: context.isEmbeddedInLabel,
              isReferenced: false,
              recursion: true
            });
          }).join(" ");
        }

        if (hasAbstractRole(current, "range")) {
          consultedNodes.add(current);

          if (current.hasAttribute("aria-valuetext")) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe due to hasAttribute guard
            return current.getAttribute("aria-valuetext");
          }

          if (current.hasAttribute("aria-valuenow")) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe due to hasAttribute guard
            return current.getAttribute("aria-valuenow");
          } // Otherwise, use the value as specified by a host language attribute.


          return current.getAttribute("value") || "";
        }

        if (hasAnyConcreteRoles(current, ["textbox"])) {
          consultedNodes.add(current);
          return getValueOfTextbox(current);
        }
      } // 2F: https://w3c.github.io/accname/#step2F


      if (allowsNameFromContent(current) || isElement(current) && context.isReferenced || isNativeHostLanguageTextAlternativeElement(current) || isDescendantOfNativeHostLanguageTextAlternativeElement()) {
        consultedNodes.add(current);
        return computeMiscTextAlternative(current, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: false
        });
      }

      if (current.nodeType === current.TEXT_NODE) {
        consultedNodes.add(current);
        return current.textContent || "";
      }

      if (context.recursion) {
        consultedNodes.add(current);
        return computeMiscTextAlternative(current, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: false
        });
      }


      consultedNodes.add(current);
      return "";
    }

    return asFlatString(computeTextAlternative(root, {
      isEmbeddedInLabel: false,
      // by spec computeAccessibleDescription starts with the referenced elements as roots
      isReferenced: compute === "description",
      recursion: false
    }));
  }

  /**
   * https://w3c.github.io/aria/#namefromprohibited
   */

  function prohibitsNaming(node) {
    return hasAnyConcreteRoles(node, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "paragraph", "presentation", "strong", "subscript", "superscript"]);
  }
  /**
   * implements https://w3c.github.io/accname/#mapping_additional_nd_name
   * @param root
   * @param [options]
   * @parma [options.getComputedStyle] - mock window.getComputedStyle. Needs `content`, `display` and `visibility`
   */


  function computeAccessibleName(root) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (prohibitsNaming(root)) {
      return "";
    }

    return computeTextAlternative(root, options);
  }

  var lib = {};

  var interopRequireDefault = {exports: {}};

  (function (module) {
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }

    module.exports = _interopRequireDefault;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  })(interopRequireDefault);

  var defineProperty$c = {exports: {}};

  var check = function check(it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global$e = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  function () {
    return this;
  }() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$g = function fails(exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$f = fails$g; // Detect IE8's incomplete defineProperty implementation

  var descriptors = !fails$f(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
      get: function get() {
        return 7;
      }
    })[1] != 7;
  });

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable$1 = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

  var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable$1.call({
    1: 2
  }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$1(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$1;

  var createPropertyDescriptor$5 = function createPropertyDescriptor(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString$5 = {}.toString;

  var classofRaw$1 = function classofRaw(it) {
    return toString$5.call(it).slice(8, -1);
  };

  var fails$e = fails$g;
  var classof$8 = classofRaw$1;
  var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails$e(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$8(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // https://tc39.es/ecma262/#sec-requireobjectcoercible

  var requireObjectCoercible$3 = function requireObjectCoercible(it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  var IndexedObject$2 = indexedObject;
  var requireObjectCoercible$2 = requireObjectCoercible$3;

  var toIndexedObject$7 = function toIndexedObject(it) {
    return IndexedObject$2(requireObjectCoercible$2(it));
  };

  var isObject$c = function isObject(it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var path$c = {};

  var path$b = path$c;
  var global$d = global$e;

  var aFunction$2 = function aFunction(variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$6 = function getBuiltIn(namespace, method) {
    return arguments.length < 2 ? aFunction$2(path$b[namespace]) || aFunction$2(global$d[namespace]) : path$b[namespace] && path$b[namespace][method] || global$d[namespace] && global$d[namespace][method];
  };

  var getBuiltIn$5 = getBuiltIn$6;
  var engineUserAgent = getBuiltIn$5('navigator', 'userAgent') || '';

  var global$c = global$e;
  var userAgent = engineUserAgent;
  var process$1 = global$c.process;
  var Deno = global$c.Deno;
  var versions = process$1 && process$1.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] < 4 ? 1 : match[0] + match[1];
  } else if (userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);

    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  /* eslint-disable es/no-symbol -- required for testing */
  var V8_VERSION$2 = engineV8Version;
  var fails$d = fails$g; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$d(function () {
    var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

    return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL$2 = nativeSymbol;
  var useSymbolAsUid = NATIVE_SYMBOL$2 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

  var getBuiltIn$4 = getBuiltIn$6;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
  var isSymbol$4 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$4('Symbol');
    return typeof $Symbol == 'function' && Object(it) instanceof $Symbol;
  };

  var isObject$b = isObject$c; // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive

  var ordinaryToPrimitive$1 = function ordinaryToPrimitive(input, pref) {
    var fn, val;
    if (pref === 'string' && typeof (fn = input.toString) == 'function' && !isObject$b(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject$b(val = fn.call(input))) return val;
    if (pref !== 'string' && typeof (fn = input.toString) == 'function' && !isObject$b(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var shared$4 = {exports: {}};

  var global$b = global$e;

  var setGlobal$1 = function setGlobal(key, value) {
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty(global$b, key, {
        value: value,
        configurable: true,
        writable: true
      });
    } catch (error) {
      global$b[key] = value;
    }

    return value;
  };

  var global$a = global$e;
  var setGlobal = setGlobal$1;
  var SHARED = '__core-js_shared__';
  var store$3 = global$a[SHARED] || setGlobal(SHARED, {});
  var sharedStore = store$3;

  var store$2 = sharedStore;
  (shared$4.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.17.3',
    mode: 'pure' ,
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var requireObjectCoercible$1 = requireObjectCoercible$3; // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject

  var toObject$8 = function toObject(argument) {
    return Object(requireObjectCoercible$1(argument));
  };

  var toObject$7 = toObject$8;
  var hasOwnProperty = {}.hasOwnProperty;

  var has$a = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$7(it), key);
  };

  var id$1 = 0;
  var postfix = Math.random();

  var uid$4 = function uid(key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix).toString(36);
  };

  var global$9 = global$e;
  var shared$3 = shared$4.exports;
  var has$9 = has$a;
  var uid$3 = uid$4;
  var NATIVE_SYMBOL$1 = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var WellKnownSymbolsStore$1 = shared$3('wks');
  var Symbol$1 = global$9.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$3;

  var wellKnownSymbol$h = function wellKnownSymbol(name) {
    if (!has$9(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
      if (NATIVE_SYMBOL$1 && has$9(Symbol$1, name)) {
        WellKnownSymbolsStore$1[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
      }
    }

    return WellKnownSymbolsStore$1[name];
  };

  var isObject$a = isObject$c;
  var isSymbol$3 = isSymbol$4;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$g = wellKnownSymbol$h;
  var TO_PRIMITIVE$1 = wellKnownSymbol$g('toPrimitive'); // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive

  var toPrimitive$1 = function toPrimitive(input, pref) {
    if (!isObject$a(input) || isSymbol$3(input)) return input;
    var exoticToPrim = input[TO_PRIMITIVE$1];
    var result;

    if (exoticToPrim !== undefined) {
      if (pref === undefined) pref = 'default';
      result = exoticToPrim.call(input, pref);
      if (!isObject$a(result) || isSymbol$3(result)) return result;
      throw TypeError("Can't convert object to primitive value");
    }

    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol$2 = isSymbol$4; // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey

  var toPropertyKey$4 = function toPropertyKey(argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol$2(key) ? key : String(key);
  };

  var global$8 = global$e;
  var isObject$9 = isObject$c;
  var document$1 = global$8.document; // typeof document.createElement is 'object' in old IE

  var EXISTS = isObject$9(document$1) && isObject$9(document$1.createElement);

  var documentCreateElement$1 = function documentCreateElement(it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$a = descriptors;
  var fails$c = fails$g;
  var createElement = documentCreateElement$1; // Thank's IE8 for his funny defineProperty

  var ie8DomDefine = !DESCRIPTORS$a && !fails$c(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function get() {
        return 7;
      }
    }).a != 7;
  });

  var DESCRIPTORS$9 = descriptors;
  var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
  var createPropertyDescriptor$4 = createPropertyDescriptor$5;
  var toIndexedObject$6 = toIndexedObject$7;
  var toPropertyKey$3 = toPropertyKey$4;
  var has$8 = has$a;
  var IE8_DOM_DEFINE$1 = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$6(O);
    P = toPropertyKey$3(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) {
      /* empty */
    }
    if (has$8(O, P)) return createPropertyDescriptor$4(!propertyIsEnumerableModule$2.f.call(O, P), O[P]);
  };

  var fails$b = fails$g;
  var replacement = /#|\.prototype\./;

  var isForced$1 = function isForced(feature, detection) {
    var value = data[normalize$1(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails$b(detection) : !!detection;
  };

  var normalize$1 = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';
  var isForced_1 = isForced$1;

  var aFunction$1 = function aFunction(it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    }

    return it;
  };

  var aFunction = aFunction$1; // optional / simple context binding

  var functionBindContext = function functionBindContext(fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;

    switch (length) {
      case 0:
        return function () {
          return fn.call(that);
        };

      case 1:
        return function (a) {
          return fn.call(that, a);
        };

      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };

      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }

    return function () {
      return fn.apply(that, arguments);
    };
  };

  var objectDefineProperty = {};

  var isObject$8 = isObject$c;

  var anObject$9 = function anObject(it) {
    if (!isObject$8(it)) {
      throw TypeError(String(it) + ' is not an object');
    }

    return it;
  };

  var DESCRIPTORS$8 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var anObject$8 = anObject$9;
  var toPropertyKey$2 = toPropertyKey$4; // eslint-disable-next-line es/no-object-defineproperty -- safe

  var $defineProperty$1 = Object.defineProperty; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty

  objectDefineProperty.f = DESCRIPTORS$8 ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject$8(O);
    P = toPropertyKey$2(P);
    anObject$8(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$7 = descriptors;
  var definePropertyModule$4 = objectDefineProperty;
  var createPropertyDescriptor$3 = createPropertyDescriptor$5;
  var createNonEnumerableProperty$9 = DESCRIPTORS$7 ? function (object, key, value) {
    return definePropertyModule$4.f(object, key, createPropertyDescriptor$3(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var global$7 = global$e;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var isForced = isForced_1;
  var path$a = path$c;
  var bind$4 = functionBindContext;
  var createNonEnumerableProperty$8 = createNonEnumerableProperty$9;
  var has$7 = has$a;

  var wrapConstructor = function wrapConstructor(NativeConstructor) {
    var Wrapper = function Wrapper(a, b, c) {
      if (this instanceof NativeConstructor) {
        switch (arguments.length) {
          case 0:
            return new NativeConstructor();

          case 1:
            return new NativeConstructor(a);

          case 2:
            return new NativeConstructor(a, b);
        }

        return new NativeConstructor(a, b, c);
      }

      return NativeConstructor.apply(this, arguments);
    };

    Wrapper.prototype = NativeConstructor.prototype;
    return Wrapper;
  };
  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */


  var _export = function _export(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var PROTO = options.proto;
    var nativeSource = GLOBAL ? global$7 : STATIC ? global$7[TARGET] : (global$7[TARGET] || {}).prototype;
    var target = GLOBAL ? path$a : path$a[TARGET] || createNonEnumerableProperty$8(path$a, TARGET, {})[TARGET];
    var targetPrototype = target.prototype;
    var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
    var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

    for (key in source) {
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contains in native

      USE_NATIVE = !FORCED && nativeSource && has$7(nativeSource, key);
      targetProperty = target[key];
      if (USE_NATIVE) if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(nativeSource, key);
        nativeProperty = descriptor && descriptor.value;
      } else nativeProperty = nativeSource[key]; // export native or implementation

      sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
      if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue; // bind timers to global for call from export context

      if (options.bind && USE_NATIVE) resultProperty = bind$4(sourceProperty, global$7); // wrap global constructors for prevent changs in this version
      else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty); // make static versions for prototype methods
      else if (PROTO && typeof sourceProperty == 'function') resultProperty = bind$4(Function.call, sourceProperty); // default case
      else resultProperty = sourceProperty; // add a flag to not completely full polyfills

      if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$8(resultProperty, 'sham', true);
      }

      createNonEnumerableProperty$8(target, key, resultProperty);

      if (PROTO) {
        VIRTUAL_PROTOTYPE = TARGET + 'Prototype';

        if (!has$7(path$a, VIRTUAL_PROTOTYPE)) {
          createNonEnumerableProperty$8(path$a, VIRTUAL_PROTOTYPE, {});
        } // export virtual prototype methods


        createNonEnumerableProperty$8(path$a[VIRTUAL_PROTOTYPE], key, sourceProperty); // export real prototype methods

        if (options.real && targetPrototype && !targetPrototype[key]) {
          createNonEnumerableProperty$8(targetPrototype, key, sourceProperty);
        }
      }
    }
  };

  var $$d = _export;
  var DESCRIPTORS$6 = descriptors;
  var objectDefinePropertyModile = objectDefineProperty; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty

  $$d({
    target: 'Object',
    stat: true,
    forced: !DESCRIPTORS$6,
    sham: !DESCRIPTORS$6
  }, {
    defineProperty: objectDefinePropertyModile.f
  });

  var path$9 = path$c;
  var Object$1 = path$9.Object;

  var defineProperty$b = defineProperty$c.exports = function defineProperty(it, key, desc) {
    return Object$1.defineProperty(it, key, desc);
  };

  if (Object$1.defineProperty.sham) defineProperty$b.sham = true;

  var parent$n = defineProperty$c.exports;
  var defineProperty$a = parent$n;

  var defineProperty$9 = defineProperty$a;

  var ariaPropsMap = {};

  var iterators = {};

  var store$1 = sharedStore;
  var functionToString = Function.toString; // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

  if (typeof store$1.inspectSource != 'function') {
    store$1.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource$1 = store$1.inspectSource;

  var global$6 = global$e;
  var inspectSource = inspectSource$1;
  var WeakMap$2 = global$6.WeakMap;
  var nativeWeakMap = typeof WeakMap$2 === 'function' && /native code/.test(inspectSource(WeakMap$2));

  var shared$2 = shared$4.exports;
  var uid$2 = uid$4;
  var keys$7 = shared$2('keys');

  var sharedKey$4 = function sharedKey(key) {
    return keys$7[key] || (keys$7[key] = uid$2(key));
  };

  var hiddenKeys$6 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$5 = global$e;
  var isObject$7 = isObject$c;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$9;
  var objectHas = has$a;
  var shared$1 = sharedStore;
  var sharedKey$3 = sharedKey$4;
  var hiddenKeys$5 = hiddenKeys$6;
  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap$1 = global$5.WeakMap;
  var set$3, get, has$6;

  var enforce = function enforce(it) {
    return has$6(it) ? get(it) : set$3(it, {});
  };

  var getterFor = function getterFor(TYPE) {
    return function (it) {
      var state;

      if (!isObject$7(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$1.state) {
    var store = shared$1.state || (shared$1.state = new WeakMap$1());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;

    set$3 = function set(it, metadata) {
      if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset.call(store, it, metadata);
      return metadata;
    };

    get = function get(it) {
      return wmget.call(store, it) || {};
    };

    has$6 = function has(it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey$3('state');
    hiddenKeys$5[STATE] = true;

    set$3 = function set(it, metadata) {
      if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$7(it, STATE, metadata);
      return metadata;
    };

    get = function get(it) {
      return objectHas(it, STATE) ? it[STATE] : {};
    };

    has$6 = function has(it) {
      return objectHas(it, STATE);
    };
  }

  var internalState = {
    set: set$3,
    get: get,
    has: has$6,
    enforce: enforce,
    getterFor: getterFor
  };

  var ceil = Math.ceil;
  var floor = Math.floor; // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger

  var toInteger$3 = function toInteger(argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var toInteger$2 = toInteger$3;
  var min$1 = Math.min; // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength

  var toLength$6 = function toLength(argument) {
    return argument > 0 ? min$1(toInteger$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toInteger$1 = toInteger$3;
  var max$1 = Math.max;
  var min = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

  var toAbsoluteIndex$2 = function toAbsoluteIndex(index, length) {
    var integer = toInteger$1(index);
    return integer < 0 ? max$1(integer + length, 0) : min(integer, length);
  };

  var toIndexedObject$5 = toIndexedObject$7;
  var toLength$5 = toLength$6;
  var toAbsoluteIndex$1 = toAbsoluteIndex$2; // `Array.prototype.{ indexOf, includes }` methods implementation

  var createMethod$2 = function createMethod(IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$5($this);
      var length = toLength$5(O.length);
      var index = toAbsoluteIndex$1(fromIndex, length);
      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check

      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

        if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
      } else for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      }
      return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$2(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$2(false)
  };

  var has$5 = has$a;
  var toIndexedObject$4 = toIndexedObject$7;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$4 = hiddenKeys$6;

  var objectKeysInternal = function objectKeysInternal(object, names) {
    var O = toIndexedObject$4(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) {
      !has$5(hiddenKeys$4, key) && has$5(O, key) && result.push(key);
    } // Don't enum bug & hidden keys


    while (names.length > i) {
      if (has$5(O, key = names[i++])) {
        ~indexOf(result, key) || result.push(key);
      }
    }

    return result;
  };

  var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3; // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe

  var objectKeys$3 = Object.keys || function keys(O) {
    return internalObjectKeys$1(O, enumBugKeys$2);
  };

  var DESCRIPTORS$5 = descriptors;
  var definePropertyModule$3 = objectDefineProperty;
  var anObject$7 = anObject$9;
  var objectKeys$2 = objectKeys$3; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe

  var objectDefineProperties = DESCRIPTORS$5 ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$7(O);
    var keys = objectKeys$2(Properties);
    var length = keys.length;
    var index = 0;
    var key;

    while (length > index) {
      definePropertyModule$3.f(O, key = keys[index++], Properties[key]);
    }

    return O;
  };

  var getBuiltIn$3 = getBuiltIn$6;
  var html$1 = getBuiltIn$3('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */
  var anObject$6 = anObject$9;
  var defineProperties = objectDefineProperties;
  var enumBugKeys$1 = enumBugKeys$3;
  var hiddenKeys$3 = hiddenKeys$6;
  var html = html$1;
  var documentCreateElement = documentCreateElement$1;
  var sharedKey$2 = sharedKey$4;
  var GT = '>';
  var LT = '<';
  var PROTOTYPE$1 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$2('IE_PROTO');

  var EmptyConstructor = function EmptyConstructor() {
    /* empty */
  };

  var scriptTag = function scriptTag(content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


  var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak

    return temp;
  }; // Create object with fake `null` prototype: use iframe Object with cleared prototype


  var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  }; // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug


  var activeXDocument;

  var _NullProtoObject = function NullProtoObject() {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }

    _NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
    : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

    var length = enumBugKeys$1.length;

    while (length--) {
      delete _NullProtoObject[PROTOTYPE$1][enumBugKeys$1[length]];
    }

    return _NullProtoObject();
  };

  hiddenKeys$3[IE_PROTO$1] = true; // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create

  var objectCreate = Object.create || function create(O, Properties) {
    var result;

    if (O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject$6(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO$1] = O;
    } else result = _NullProtoObject();

    return Properties === undefined ? result : defineProperties(result, Properties);
  };

  var fails$a = fails$g;
  var correctPrototypeGetter = !fails$a(function () {
    function F() {
      /* empty */
    }

    F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var has$4 = has$a;
  var toObject$6 = toObject$8;
  var sharedKey$1 = sharedKey$4;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
  var IE_PROTO = sharedKey$1('IE_PROTO');
  var ObjectPrototype$1 = Object.prototype; // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe

  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
    O = toObject$6(O);
    if (has$4(O, IE_PROTO)) return O[IE_PROTO];

    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    }

    return O instanceof Object ? ObjectPrototype$1 : null;
  };

  var fails$9 = fails$g;
  var create$2 = objectCreate;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$9;
  var wellKnownSymbol$f = wellKnownSymbol$h;
  var ITERATOR$4 = wellKnownSymbol$f('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false; // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object

  var IteratorPrototype$1, PrototypeOfArrayIteratorPrototype, arrayIterator;
  /* eslint-disable es/no-array-prototype-keys -- safe */

  if ([].keys) {
    arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$1 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$1 == undefined || fails$9(function () {
    var test = {}; // FF44- legacy iterators case

    return IteratorPrototype$1[ITERATOR$4].call(test) !== test;
  });
  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$1 = {};else IteratorPrototype$1 = create$2(IteratorPrototype$1); // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

  if (typeof IteratorPrototype$1[ITERATOR$4] !== 'function') {
    createNonEnumerableProperty$6(IteratorPrototype$1, ITERATOR$4, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$1,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var wellKnownSymbol$e = wellKnownSymbol$h;
  var TO_STRING_TAG$3 = wellKnownSymbol$e('toStringTag');
  var test = {};
  test[TO_STRING_TAG$3] = 'z';
  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$d = wellKnownSymbol$h;
  var TO_STRING_TAG$2 = wellKnownSymbol$d('toStringTag'); // ES3 wrong here

  var CORRECT_ARGUMENTS = classofRaw(function () {
    return arguments;
  }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

  var tryGet = function tryGet(it, key) {
    try {
      return it[key];
    } catch (error) {
      /* empty */
    }
  }; // getting tag from ES6+ `Object.prototype.toString`


  var classof$7 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$6 = classof$7; // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring

  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$6(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var defineProperty$8 = objectDefineProperty.f;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$9;
  var has$3 = has$a;
  var toString$4 = objectToString;
  var wellKnownSymbol$c = wellKnownSymbol$h;
  var TO_STRING_TAG$1 = wellKnownSymbol$c('toStringTag');

  var setToStringTag$5 = function setToStringTag(it, TAG, STATIC, SET_METHOD) {
    if (it) {
      var target = STATIC ? it : it.prototype;

      if (!has$3(target, TO_STRING_TAG$1)) {
        defineProperty$8(target, TO_STRING_TAG$1, {
          configurable: true,
          value: TAG
        });
      }

      if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
        createNonEnumerableProperty$5(target, 'toString', toString$4);
      }
    }
  };

  var IteratorPrototype = iteratorsCore.IteratorPrototype;
  var create$1 = objectCreate;
  var createPropertyDescriptor$2 = createPropertyDescriptor$5;
  var setToStringTag$4 = setToStringTag$5;
  var Iterators$5 = iterators;

  var returnThis$1 = function returnThis() {
    return this;
  };

  var createIteratorConstructor$1 = function createIteratorConstructor(IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$1(IteratorPrototype, {
      next: createPropertyDescriptor$2(1, next)
    });
    setToStringTag$4(IteratorConstructor, TO_STRING_TAG, false, true);
    Iterators$5[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var isObject$6 = isObject$c;

  var aPossiblePrototype$1 = function aPossiblePrototype(it) {
    if (!isObject$6(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    }

    return it;
  };

  /* eslint-disable no-proto -- safe */
  var anObject$5 = anObject$9;
  var aPossiblePrototype = aPossiblePrototype$1; // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe

  Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;

    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) {
      /* empty */
    }

    return function setPrototypeOf(O, proto) {
      anObject$5(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var createNonEnumerableProperty$4 = createNonEnumerableProperty$9;

  var redefine$3 = function redefine(target, key, value, options) {
    if (options && options.enumerable) target[key] = value;else createNonEnumerableProperty$4(target, key, value);
  };

  var $$c = _export;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf = objectGetPrototypeOf;
  var setToStringTag$3 = setToStringTag$5;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$9;
  var redefine$2 = redefine$3;
  var wellKnownSymbol$b = wellKnownSymbol$h;
  var Iterators$4 = iterators;
  var IteratorsCore = iteratorsCore;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$3 = wellKnownSymbol$b('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function returnThis() {
    return this;
  };

  var defineIterator$3 = function defineIterator(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function getIterationMethod(KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

      switch (KIND) {
        case KEYS:
          return function keys() {
            return new IteratorConstructor(this, KIND);
          };

        case VALUES:
          return function values() {
            return new IteratorConstructor(this, KIND);
          };

        case ENTRIES:
          return function entries() {
            return new IteratorConstructor(this, KIND);
          };
      }

      return function () {
        return new IteratorConstructor(this);
      };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$3] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY; // fix native

    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));

      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {


        setToStringTag$3(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
        Iterators$4[TO_STRING_TAG] = returnThis;
      }
    } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF


    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;

      defaultIterator = function values() {
        return nativeIterator.call(this);
      };
    } // define iterator


    if ((FORCED) && IterablePrototype[ITERATOR$3] !== defaultIterator) {
      createNonEnumerableProperty$3(IterablePrototype, ITERATOR$3, defaultIterator);
    }

    Iterators$4[NAME] = defaultIterator; // export additional methods

    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$2(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$c({
        target: NAME,
        proto: true,
        forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
      }, methods);
    }

    return methods;
  };

  var toIndexedObject$3 = toIndexedObject$7;
  var Iterators$3 = iterators;
  var InternalStateModule$4 = internalState;
  var defineIterator$2 = defineIterator$3;
  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$4 = InternalStateModule$4.set;
  var getInternalState$2 = InternalStateModule$4.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator

  defineIterator$2(Array, 'Array', function (iterated, kind) {
    setInternalState$4(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$3(iterated),
      // target
      index: 0,
      // next index
      kind: kind // kind

    }); // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$2(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;

    if (!target || index >= target.length) {
      state.target = undefined;
      return {
        value: undefined,
        done: true
      };
    }

    if (kind == 'keys') return {
      value: index,
      done: false
    };
    if (kind == 'values') return {
      value: target[index],
      done: false
    };
    return {
      value: [index, target[index]],
      done: false
    };
  }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject

  Iterators$3.Arguments = Iterators$3.Array; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  var internalMetadata = {exports: {}};

  var objectGetOwnPropertyNames = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys$2 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe

  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys$2);
  };

  var objectGetOwnPropertyNamesExternal = {};

  /* eslint-disable es/no-object-getownpropertynames -- safe */
  var toIndexedObject$2 = toIndexedObject$7;
  var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var toString$3 = {}.toString;
  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function getWindowNames(it) {
    try {
      return $getOwnPropertyNames$1(it);
    } catch (error) {
      return windowNames.slice();
    }
  }; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && toString$3.call(it) == '[object Window]' ? getWindowNames(it) : $getOwnPropertyNames$1(toIndexedObject$2(it));
  };

  var fails$8 = fails$g;
  var freezing = !fails$8(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var $$b = _export;
  var hiddenKeys$1 = hiddenKeys$6;
  var isObject$5 = isObject$c;
  var has$2 = has$a;
  var defineProperty$7 = objectDefineProperty.f;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
  var uid$1 = uid$4;
  var FREEZING = freezing;
  var REQUIRED = false;
  var METADATA = uid$1('meta');
  var id = 0; // eslint-disable-next-line es/no-object-isextensible -- safe

  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function setMetadata(it) {
    defineProperty$7(it, METADATA, {
      value: {
        objectID: 'O' + id++,
        // object ID
        weakData: {} // weak collections IDs

      }
    });
  };

  var fastKey$1 = function fastKey(it, create) {
    // return a primitive with prefix
    if (!isObject$5(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

    if (!has$2(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

      if (!create) return 'E'; // add missing metadata

      setMetadata(it); // return object ID
    }

    return it[METADATA].objectID;
  };

  var getWeakData = function getWeakData(it, create) {
    if (!has$2(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true; // not necessary to add metadata

      if (!create) return false; // add missing metadata

      setMetadata(it); // return the store of weak collections IDs
    }

    return it[METADATA].weakData;
  }; // add metadata on freeze-family methods calling


  var onFreeze = function onFreeze(it) {
    if (FREEZING && REQUIRED && isExtensible(it) && !has$2(it, METADATA)) setMetadata(it);
    return it;
  };

  var enable = function enable() {
    meta.enable = function () {
      /* empty */
    };

    REQUIRED = true;
    var getOwnPropertyNames = getOwnPropertyNamesModule$1.f;
    var splice = [].splice;
    var test = {};
    test[METADATA] = 1; // prevent exposing of metadata key

    if (getOwnPropertyNames(test).length) {
      getOwnPropertyNamesModule$1.f = function (it) {
        var result = getOwnPropertyNames(it);

        for (var i = 0, length = result.length; i < length; i++) {
          if (result[i] === METADATA) {
            splice.call(result, i, 1);
            break;
          }
        }

        return result;
      };

      $$b({
        target: 'Object',
        stat: true,
        forced: true
      }, {
        getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
      });
    }
  };

  var meta = internalMetadata.exports = {
    enable: enable,
    fastKey: fastKey$1,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };
  hiddenKeys$1[METADATA] = true;

  var wellKnownSymbol$a = wellKnownSymbol$h;
  var Iterators$2 = iterators;
  var ITERATOR$2 = wellKnownSymbol$a('iterator');
  var ArrayPrototype$6 = Array.prototype; // check on default Array iterator

  var isArrayIteratorMethod$2 = function isArrayIteratorMethod(it) {
    return it !== undefined && (Iterators$2.Array === it || ArrayPrototype$6[ITERATOR$2] === it);
  };

  var classof$5 = classof$7;
  var Iterators$1 = iterators;
  var wellKnownSymbol$9 = wellKnownSymbol$h;
  var ITERATOR$1 = wellKnownSymbol$9('iterator');

  var getIteratorMethod$7 = function getIteratorMethod(it) {
    if (it != undefined) return it[ITERATOR$1] || it['@@iterator'] || Iterators$1[classof$5(it)];
  };

  var anObject$4 = anObject$9;
  var getIteratorMethod$6 = getIteratorMethod$7;

  var getIterator$6 = function getIterator(it, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$6(it) : usingIterator;

    if (typeof iteratorMethod != 'function') {
      throw TypeError(String(it) + ' is not iterable');
    }

    return anObject$4(iteratorMethod.call(it));
  };

  var anObject$3 = anObject$9;

  var iteratorClose$2 = function iteratorClose(iterator, kind, value) {
    var innerResult, innerError;
    anObject$3(iterator);

    try {
      innerResult = iterator['return'];

      if (innerResult === undefined) {
        if (kind === 'throw') throw value;
        return value;
      }

      innerResult = innerResult.call(iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }

    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$3(innerResult);
    return value;
  };

  var anObject$2 = anObject$9;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
  var toLength$4 = toLength$6;
  var bind$3 = functionBindContext;
  var getIterator$5 = getIterator$6;
  var getIteratorMethod$5 = getIteratorMethod$7;
  var iteratorClose$1 = iteratorClose$2;

  var Result = function Result(stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate$2 = function iterate(iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$3(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function stop(condition) {
      if (iterator) iteratorClose$1(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function callFn(value) {
      if (AS_ENTRIES) {
        anObject$2(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      }

      return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod$5(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

      if (isArrayIteratorMethod$1(iterFn)) {
        for (index = 0, length = toLength$4(iterable.length); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && result instanceof Result) return result;
        }

        return new Result(false);
      }

      iterator = getIterator$5(iterable, iterFn);
    }

    next = iterator.next;

    while (!(step = next.call(iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose$1(iterator, 'throw', error);
      }

      if (typeof result == 'object' && result && result instanceof Result) return result;
    }

    return new Result(false);
  };

  var anInstance$2 = function anInstance(it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    }

    return it;
  };

  var classof$4 = classofRaw$1; // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe

  var isArray$a = Array.isArray || function isArray(arg) {
    return classof$4(arg) == 'Array';
  };

  var isObject$4 = isObject$c;
  var isArray$9 = isArray$a;
  var wellKnownSymbol$8 = wellKnownSymbol$h;
  var SPECIES$3 = wellKnownSymbol$8('species'); // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesConstructor$1 = function arraySpeciesConstructor(originalArray) {
    var C;

    if (isArray$9(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback

      if (typeof C == 'function' && (C === Array || isArray$9(C.prototype))) C = undefined;else if (isObject$4(C)) {
        C = C[SPECIES$3];
        if (C === null) C = undefined;
      }
    }

    return C === undefined ? Array : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1; // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesCreate$2 = function arraySpeciesCreate(originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var bind$2 = functionBindContext;
  var IndexedObject$1 = indexedObject;
  var toObject$5 = toObject$8;
  var toLength$3 = toLength$6;
  var arraySpeciesCreate$1 = arraySpeciesCreate$2;
  var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

  var createMethod$1 = function createMethod(TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$5($this);
      var self = IndexedObject$1(O);
      var boundFunction = bind$2(callbackfn, that, 3);
      var length = toLength$3(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$1;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;

      for (; length > index; index++) {
        if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);

          if (TYPE) {
            if (IS_MAP) target[index] = result; // map
            else if (result) switch (TYPE) {
              case 3:
                return true;
              // some

              case 5:
                return value;
              // find

              case 6:
                return index;
              // findIndex

              case 2:
                push.call(target, value);
              // filter
            } else switch (TYPE) {
              case 4:
                return false;
              // every

              case 7:
                push.call(target, value);
              // filterReject
            }
          }
        }
      }

      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$1(7)
  };

  var $$a = _export;
  var global$4 = global$e;
  var InternalMetadataModule = internalMetadata.exports;
  var fails$7 = fails$g;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$9;
  var iterate$1 = iterate$2;
  var anInstance$1 = anInstance$2;
  var isObject$3 = isObject$c;
  var setToStringTag$2 = setToStringTag$5;
  var defineProperty$6 = objectDefineProperty.f;
  var forEach$5 = arrayIteration.forEach;
  var DESCRIPTORS$4 = descriptors;
  var InternalStateModule$3 = internalState;
  var setInternalState$3 = InternalStateModule$3.set;
  var internalStateGetterFor$1 = InternalStateModule$3.getterFor;

  var collection$2 = function collection(CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$4[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var exported = {};
    var Constructor;

    if (!DESCRIPTORS$4 || typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails$7(function () {
      new NativeConstructor().entries().next();
    }))) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      InternalMetadataModule.enable();
    } else {
      Constructor = wrapper(function (target, iterable) {
        setInternalState$3(anInstance$1(target, Constructor, CONSTRUCTOR_NAME), {
          type: CONSTRUCTOR_NAME,
          collection: new NativeConstructor()
        });
        if (iterable != undefined) iterate$1(iterable, target[ADDER], {
          that: target,
          AS_ENTRIES: IS_MAP
        });
      });
      var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
      forEach$5(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
        var IS_ADDER = KEY == 'add' || KEY == 'set';

        if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) {
          createNonEnumerableProperty$2(Constructor.prototype, KEY, function (a, b) {
            var collection = getInternalState(this).collection;
            if (!IS_ADDER && IS_WEAK && !isObject$3(a)) return KEY == 'get' ? undefined : false;
            var result = collection[KEY](a === 0 ? 0 : a, b);
            return IS_ADDER ? this : result;
          });
        }
      });
      IS_WEAK || defineProperty$6(Constructor.prototype, 'size', {
        configurable: true,
        get: function get() {
          return getInternalState(this).collection.size;
        }
      });
    }

    setToStringTag$2(Constructor, CONSTRUCTOR_NAME, false, true);
    exported[CONSTRUCTOR_NAME] = Constructor;
    $$a({
      global: true,
      forced: true
    }, exported);
    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
    return Constructor;
  };

  var redefine$1 = redefine$3;

  var redefineAll$1 = function redefineAll(target, src, options) {
    for (var key in src) {
      if (options && options.unsafe && target[key]) target[key] = src[key];else redefine$1(target, key, src[key], options);
    }

    return target;
  };

  var getBuiltIn$2 = getBuiltIn$6;
  var definePropertyModule$2 = objectDefineProperty;
  var wellKnownSymbol$7 = wellKnownSymbol$h;
  var DESCRIPTORS$3 = descriptors;
  var SPECIES$2 = wellKnownSymbol$7('species');

  var setSpecies$1 = function setSpecies(CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$2(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule$2.f;

    if (DESCRIPTORS$3 && Constructor && !Constructor[SPECIES$2]) {
      defineProperty(Constructor, SPECIES$2, {
        configurable: true,
        get: function get() {
          return this;
        }
      });
    }
  };

  var defineProperty$5 = objectDefineProperty.f;
  var create = objectCreate;
  var redefineAll = redefineAll$1;
  var bind$1 = functionBindContext;
  var anInstance = anInstance$2;
  var iterate = iterate$2;
  var defineIterator$1 = defineIterator$3;
  var setSpecies = setSpecies$1;
  var DESCRIPTORS$2 = descriptors;
  var fastKey = internalMetadata.exports.fastKey;
  var InternalStateModule$2 = internalState;
  var setInternalState$2 = InternalStateModule$2.set;
  var internalStateGetterFor = InternalStateModule$2.getterFor;
  var collectionStrong$2 = {
    getConstructor: function getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState$2(that, {
          type: CONSTRUCTOR_NAME,
          index: create(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!DESCRIPTORS$2) that.size = 0;
        if (iterable != undefined) iterate(iterable, that[ADDER], {
          that: that,
          AS_ENTRIES: IS_MAP
        });
      });
      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function define(that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index; // change existing entry

        if (entry) {
          entry.value = value; // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (DESCRIPTORS$2) state.size++;else that.size++; // add to index

          if (index !== 'F') state.index[index] = entry;
        }

        return that;
      };

      var getEntry = function getEntry(that, key) {
        var state = getInternalState(that); // fast case

        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index]; // frozen object case

        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll(C.prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;

          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }

          state.first = state.last = undefined;
          if (DESCRIPTORS$2) state.size = 0;else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        'delete': function _delete(key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);

          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (DESCRIPTORS$2) state.size--;else that.size--;
          }

          return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn
        /* , that = undefined */
        ) {
          var state = getInternalState(this);
          var boundFunction = bind$1(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;

          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this); // revert to the last existing entry

            while (entry && entry.removed) {
              entry = entry.previous;
            }
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });
      redefineAll(C.prototype, IS_MAP ? {
        // `Map.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-map.prototype.get
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // `Map.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-map.prototype.set
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // `Set.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-set.prototype.add
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (DESCRIPTORS$2) defineProperty$5(C.prototype, 'size', {
        get: function get() {
          return getInternalState(this).size;
        }
      });
      return C;
    },
    setStrong: function setStrong(C, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME); // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator

      defineIterator$1(C, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState$2(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last; // revert to the last existing entry

        while (entry && entry.removed) {
          entry = entry.previous;
        } // get next entry


        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return {
            value: undefined,
            done: true
          };
        } // return step by kind


        if (kind == 'keys') return {
          value: entry.key,
          done: false
        };
        if (kind == 'values') return {
          value: entry.value,
          done: false
        };
        return {
          value: [entry.key, entry.value],
          done: false
        };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species

      setSpecies(CONSTRUCTOR_NAME);
    }
  };

  var collection$1 = collection$2;
  var collectionStrong$1 = collectionStrong$2; // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects

  collection$1('Map', function (init) {
    return function Map() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  }, collectionStrong$1);

  var isSymbol$1 = isSymbol$4;

  var toString$2 = function toString(argument) {
    if (isSymbol$1(argument)) throw TypeError('Cannot convert a Symbol value to a string');
    return String(argument);
  };

  var toInteger = toInteger$3;
  var toString$1 = toString$2;
  var requireObjectCoercible = requireObjectCoercible$3; // `String.prototype.codePointAt` methods implementation

  var createMethod = function createMethod(CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$1(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod(true)
  };

  var charAt = stringMultibyte.charAt;
  var toString = toString$2;
  var InternalStateModule$1 = internalState;
  var defineIterator = defineIterator$3;
  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalState$1 = InternalStateModule$1.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator

  defineIterator(String, 'String', function (iterated) {
    setInternalState$1(this, {
      type: STRING_ITERATOR,
      string: toString(iterated),
      index: 0
    }); // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$1(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return {
      value: undefined,
      done: true
    };
    point = charAt(string, index);
    state.index += point.length;
    return {
      value: point,
      done: false
    };
  });

  var path$8 = path$c;
  var map$2 = path$8.Map;

  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods

  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  var DOMIterables$3 = domIterables;
  var global$3 = global$e;
  var classof$3 = classof$7;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$9;
  var Iterators = iterators;
  var wellKnownSymbol$6 = wellKnownSymbol$h;
  var TO_STRING_TAG = wellKnownSymbol$6('toStringTag');

  for (var COLLECTION_NAME in DOMIterables$3) {
    var Collection = global$3[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;

    if (CollectionPrototype && classof$3(CollectionPrototype) !== TO_STRING_TAG) {
      createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }

    Iterators[COLLECTION_NAME] = Iterators.Array;
  }

  var parent$m = map$2;
  var map$1 = parent$m;

  var map = map$1;

  (function (exports) {

    var _interopRequireDefault = interopRequireDefault.exports;
    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;

    var _map = _interopRequireDefault(map);

    var ariaPropsMap = new _map.default([['aria-activedescendant', {
      'type': 'id'
    }], ['aria-atomic', {
      'type': 'boolean'
    }], ['aria-autocomplete', {
      'type': 'token',
      'values': ['inline', 'list', 'both', 'none']
    }], ['aria-busy', {
      'type': 'boolean'
    }], ['aria-checked', {
      'type': 'tristate'
    }], ['aria-colcount', {
      type: 'integer'
    }], ['aria-colindex', {
      type: 'integer'
    }], ['aria-colspan', {
      type: 'integer'
    }], ['aria-controls', {
      'type': 'idlist'
    }], ['aria-current', {
      type: 'token',
      values: ['page', 'step', 'location', 'date', 'time', true, false]
    }], ['aria-describedby', {
      'type': 'idlist'
    }], ['aria-details', {
      'type': 'id'
    }], ['aria-disabled', {
      'type': 'boolean'
    }], ['aria-dropeffect', {
      'type': 'tokenlist',
      'values': ['copy', 'execute', 'link', 'move', 'none', 'popup']
    }], ['aria-errormessage', {
      'type': 'id'
    }], ['aria-expanded', {
      'type': 'boolean',
      'allowundefined': true
    }], ['aria-flowto', {
      'type': 'idlist'
    }], ['aria-grabbed', {
      'type': 'boolean',
      'allowundefined': true
    }], ['aria-haspopup', {
      'type': 'token',
      'values': [false, true, 'menu', 'listbox', 'tree', 'grid', 'dialog']
    }], ['aria-hidden', {
      'type': 'boolean',
      'allowundefined': true
    }], ['aria-invalid', {
      'type': 'token',
      'values': ['grammar', false, 'spelling', true]
    }], ['aria-keyshortcuts', {
      type: 'string'
    }], ['aria-label', {
      'type': 'string'
    }], ['aria-labelledby', {
      'type': 'idlist'
    }], ['aria-level', {
      'type': 'integer'
    }], ['aria-live', {
      'type': 'token',
      'values': ['assertive', 'off', 'polite']
    }], ['aria-modal', {
      type: 'boolean'
    }], ['aria-multiline', {
      'type': 'boolean'
    }], ['aria-multiselectable', {
      'type': 'boolean'
    }], ['aria-orientation', {
      'type': 'token',
      'values': ['vertical', 'undefined', 'horizontal']
    }], ['aria-owns', {
      'type': 'idlist'
    }], ['aria-placeholder', {
      type: 'string'
    }], ['aria-posinset', {
      'type': 'integer'
    }], ['aria-pressed', {
      'type': 'tristate'
    }], ['aria-readonly', {
      'type': 'boolean'
    }], ['aria-relevant', {
      'type': 'tokenlist',
      'values': ['additions', 'all', 'removals', 'text']
    }], ['aria-required', {
      'type': 'boolean'
    }], ['aria-roledescription', {
      type: 'string'
    }], ['aria-rowcount', {
      type: 'integer'
    }], ['aria-rowindex', {
      type: 'integer'
    }], ['aria-rowspan', {
      type: 'integer'
    }], ['aria-selected', {
      'type': 'boolean',
      'allowundefined': true
    }], ['aria-setsize', {
      'type': 'integer'
    }], ['aria-sort', {
      'type': 'token',
      'values': ['ascending', 'descending', 'none', 'other']
    }], ['aria-valuemax', {
      'type': 'number'
    }], ['aria-valuemin', {
      'type': 'number'
    }], ['aria-valuenow', {
      'type': 'number'
    }], ['aria-valuetext', {
      'type': 'string'
    }]]);
    var _default = ariaPropsMap;
    exports.default = _default;
  })(ariaPropsMap);

  var domMap = {};

  (function (exports) {

    var _interopRequireDefault = interopRequireDefault.exports;
    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;

    var _map = _interopRequireDefault(map);

    var domMap = new _map.default([['a', {
      reserved: false
    }], ['abbr', {
      reserved: false
    }], ['acronym', {
      reserved: false
    }], ['address', {
      reserved: false
    }], ['applet', {
      reserved: false
    }], ['area', {
      reserved: false
    }], ['article', {
      reserved: false
    }], ['aside', {
      reserved: false
    }], ['audio', {
      reserved: false
    }], ['b', {
      reserved: false
    }], ['base', {
      reserved: true
    }], ['bdi', {
      reserved: false
    }], ['bdo', {
      reserved: false
    }], ['big', {
      reserved: false
    }], ['blink', {
      reserved: false
    }], ['blockquote', {
      reserved: false
    }], ['body', {
      reserved: false
    }], ['br', {
      reserved: false
    }], ['button', {
      reserved: false
    }], ['canvas', {
      reserved: false
    }], ['caption', {
      reserved: false
    }], ['center', {
      reserved: false
    }], ['cite', {
      reserved: false
    }], ['code', {
      reserved: false
    }], ['col', {
      reserved: true
    }], ['colgroup', {
      reserved: true
    }], ['content', {
      reserved: false
    }], ['data', {
      reserved: false
    }], ['datalist', {
      reserved: false
    }], ['dd', {
      reserved: false
    }], ['del', {
      reserved: false
    }], ['details', {
      reserved: false
    }], ['dfn', {
      reserved: false
    }], ['dialog', {
      reserved: false
    }], ['dir', {
      reserved: false
    }], ['div', {
      reserved: false
    }], ['dl', {
      reserved: false
    }], ['dt', {
      reserved: false
    }], ['em', {
      reserved: false
    }], ['embed', {
      reserved: false
    }], ['fieldset', {
      reserved: false
    }], ['figcaption', {
      reserved: false
    }], ['figure', {
      reserved: false
    }], ['font', {
      reserved: false
    }], ['footer', {
      reserved: false
    }], ['form', {
      reserved: false
    }], ['frame', {
      reserved: false
    }], ['frameset', {
      reserved: false
    }], ['h1', {
      reserved: false
    }], ['h2', {
      reserved: false
    }], ['h3', {
      reserved: false
    }], ['h4', {
      reserved: false
    }], ['h5', {
      reserved: false
    }], ['h6', {
      reserved: false
    }], ['head', {
      reserved: true
    }], ['header', {
      reserved: false
    }], ['hgroup', {
      reserved: false
    }], ['hr', {
      reserved: false
    }], ['html', {
      reserved: true
    }], ['i', {
      reserved: false
    }], ['iframe', {
      reserved: false
    }], ['img', {
      reserved: false
    }], ['input', {
      reserved: false
    }], ['ins', {
      reserved: false
    }], ['kbd', {
      reserved: false
    }], ['keygen', {
      reserved: false
    }], ['label', {
      reserved: false
    }], ['legend', {
      reserved: false
    }], ['li', {
      reserved: false
    }], ['link', {
      reserved: true
    }], ['main', {
      reserved: false
    }], ['map', {
      reserved: false
    }], ['mark', {
      reserved: false
    }], ['marquee', {
      reserved: false
    }], ['menu', {
      reserved: false
    }], ['menuitem', {
      reserved: false
    }], ['meta', {
      reserved: true
    }], ['meter', {
      reserved: false
    }], ['nav', {
      reserved: false
    }], ['noembed', {
      reserved: true
    }], ['noscript', {
      reserved: true
    }], ['object', {
      reserved: false
    }], ['ol', {
      reserved: false
    }], ['optgroup', {
      reserved: false
    }], ['option', {
      reserved: false
    }], ['output', {
      reserved: false
    }], ['p', {
      reserved: false
    }], ['param', {
      reserved: true
    }], ['picture', {
      reserved: true
    }], ['pre', {
      reserved: false
    }], ['progress', {
      reserved: false
    }], ['q', {
      reserved: false
    }], ['rp', {
      reserved: false
    }], ['rt', {
      reserved: false
    }], ['rtc', {
      reserved: false
    }], ['ruby', {
      reserved: false
    }], ['s', {
      reserved: false
    }], ['samp', {
      reserved: false
    }], ['script', {
      reserved: true
    }], ['section', {
      reserved: false
    }], ['select', {
      reserved: false
    }], ['small', {
      reserved: false
    }], ['source', {
      reserved: true
    }], ['spacer', {
      reserved: false
    }], ['span', {
      reserved: false
    }], ['strike', {
      reserved: false
    }], ['strong', {
      reserved: false
    }], ['style', {
      reserved: true
    }], ['sub', {
      reserved: false
    }], ['summary', {
      reserved: false
    }], ['sup', {
      reserved: false
    }], ['table', {
      reserved: false
    }], ['tbody', {
      reserved: false
    }], ['td', {
      reserved: false
    }], ['textarea', {
      reserved: false
    }], ['tfoot', {
      reserved: false
    }], ['th', {
      reserved: false
    }], ['thead', {
      reserved: false
    }], ['time', {
      reserved: false
    }], ['title', {
      reserved: true
    }], ['tr', {
      reserved: false
    }], ['track', {
      reserved: true
    }], ['tt', {
      reserved: false
    }], ['u', {
      reserved: false
    }], ['ul', {
      reserved: false
    }], ['var', {
      reserved: false
    }], ['video', {
      reserved: false
    }], ['wbr', {
      reserved: false
    }], ['xmp', {
      reserved: false
    }]]);
    var _default = domMap;
    exports.default = _default;
  })(domMap);

  var rolesMap = {};

  var getIterator$4 = getIterator$6;
  var getIterator_1 = getIterator$4;

  var parent$l = getIterator_1;
  var getIterator$3 = parent$l;

  var parent$k = getIterator$3;
  var getIterator$2 = parent$k;

  var getIterator$1 = getIterator$2;

  var $$9 = _export;
  var isArray$8 = isArray$a; // `Array.isArray` method
  // https://tc39.es/ecma262/#sec-array.isarray

  $$9({
    target: 'Array',
    stat: true
  }, {
    isArray: isArray$8
  });

  var path$7 = path$c;
  var isArray$7 = path$7.Array.isArray;

  var parent$j = isArray$7;
  var isArray$6 = parent$j;

  var isArray$5 = isArray$6;

  var getIteratorMethod$4 = getIteratorMethod$7;
  var getIteratorMethod_1 = getIteratorMethod$4;

  var parent$i = getIteratorMethod_1;
  var getIteratorMethod$3 = parent$i;

  var parent$h = getIteratorMethod$3;
  var getIteratorMethod$2 = parent$h;

  var getIteratorMethod$1 = getIteratorMethod$2;

  var toPropertyKey$1 = toPropertyKey$4;
  var definePropertyModule$1 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$5;

  var createProperty$3 = function createProperty(object, key, value) {
    var propertyKey = toPropertyKey$1(key);
    if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));else object[propertyKey] = value;
  };

  var fails$6 = fails$g;
  var wellKnownSymbol$5 = wellKnownSymbol$h;
  var V8_VERSION$1 = engineV8Version;
  var SPECIES$1 = wellKnownSymbol$5('species');

  var arrayMethodHasSpeciesSupport$2 = function arrayMethodHasSpeciesSupport(METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$6(function () {
      var array = [];
      var constructor = array.constructor = {};

      constructor[SPECIES$1] = function () {
        return {
          foo: 1
        };
      };

      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$8 = _export;
  var fails$5 = fails$g;
  var isArray$4 = isArray$a;
  var isObject$2 = isObject$c;
  var toObject$4 = toObject$8;
  var toLength$2 = toLength$6;
  var createProperty$2 = createProperty$3;
  var arraySpeciesCreate = arraySpeciesCreate$2;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$2;
  var wellKnownSymbol$4 = wellKnownSymbol$h;
  var V8_VERSION = engineV8Version;
  var IS_CONCAT_SPREADABLE = wellKnownSymbol$4('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679

  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$5(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });
  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('concat');

  var isConcatSpreadable = function isConcatSpreadable(O) {
    if (!isObject$2(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray$4(O);
  };

  var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species

  $$8({
    target: 'Array',
    proto: true,
    forced: FORCED$1
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$4(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];

        if (isConcatSpreadable(E)) {
          len = toLength$2(E.length);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

          for (k = 0; k < len; k++, n++) {
            if (k in E) createProperty$2(A, n, E[k]);
          }
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty$2(A, n++, E);
        }
      }

      A.length = n;
      return A;
    }
  });

  var objectGetOwnPropertySymbols = {};

  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var wellKnownSymbolWrapped = {};

  var wellKnownSymbol$3 = wellKnownSymbol$h;
  wellKnownSymbolWrapped.f = wellKnownSymbol$3;

  var path$6 = path$c;
  var has$1 = has$a;
  var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
  var defineProperty$4 = objectDefineProperty.f;

  var defineWellKnownSymbol$l = function defineWellKnownSymbol(NAME) {
    var Symbol = path$6.Symbol || (path$6.Symbol = {});
    if (!has$1(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule$1.f(NAME)
    });
  };

  var $$7 = _export;
  var global$2 = global$e;
  var getBuiltIn$1 = getBuiltIn$6;
  var DESCRIPTORS$1 = descriptors;
  var NATIVE_SYMBOL = nativeSymbol;
  var fails$4 = fails$g;
  var has = has$a;
  var isArray$3 = isArray$a;
  var isObject$1 = isObject$c;
  var isSymbol = isSymbol$4;
  var anObject$1 = anObject$9;
  var toObject$3 = toObject$8;
  var toIndexedObject$1 = toIndexedObject$7;
  var toPropertyKey = toPropertyKey$4;
  var $toString = toString$2;
  var createPropertyDescriptor = createPropertyDescriptor$5;
  var nativeObjectCreate = objectCreate;
  var objectKeys$1 = objectKeys$3;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule = objectDefineProperty;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
  var createNonEnumerableProperty = createNonEnumerableProperty$9;
  var redefine = redefine$3;
  var shared = shared$4.exports;
  var sharedKey = sharedKey$4;
  var hiddenKeys = hiddenKeys$6;
  var uid = uid$4;
  var wellKnownSymbol$2 = wellKnownSymbol$h;
  var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
  var defineWellKnownSymbol$k = defineWellKnownSymbol$l;
  var setToStringTag$1 = setToStringTag$5;
  var InternalStateModule = internalState;
  var $forEach$1 = arrayIteration.forEach;
  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol$2('toPrimitive');
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global$2.Symbol;
  var $stringify$1 = getBuiltIn$1('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  var nativeDefineProperty = definePropertyModule.f;
  var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule$1.f;
  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');
  var WellKnownSymbolsStore = shared('wks');
  var QObject = global$2.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

  var setSymbolDescriptor = DESCRIPTORS$1 && fails$4(function () {
    return nativeObjectCreate(nativeDefineProperty({}, 'a', {
      get: function get() {
        return nativeDefineProperty(this, 'a', {
          value: 7
        }).a;
      }
    })).a != 7;
  }) ? function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
    nativeDefineProperty(O, P, Attributes);

    if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
      nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty;

  var wrap = function wrap(tag, description) {
    var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
    setInternalState(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!DESCRIPTORS$1) symbol.description = description;
    return symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject$1(O);
    var key = toPropertyKey(P);
    anObject$1(Attributes);

    if (has(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, {
          enumerable: createPropertyDescriptor(0, false)
        });
      }

      return setSymbolDescriptor(O, key, Attributes);
    }

    return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject$1(O);
    var properties = toIndexedObject$1(Properties);
    var keys = objectKeys$1(properties).concat($getOwnPropertySymbols(properties));
    $forEach$1(keys, function (key) {
      if (!DESCRIPTORS$1 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPropertyKey(V);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject$1(O);
    var key = toPropertyKey(P);
    if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);

    if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }

    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject$1(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$1(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  }; // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor


  if (!NATIVE_SYMBOL) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
      var tag = uid(description);

      var setter = function setter(value) {
        if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
        if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };

      if (DESCRIPTORS$1 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
        configurable: true,
        set: setter
      });
      return wrap(tag, description);
    };

    redefine($Symbol[PROTOTYPE], 'toString', function toString() {
      return getInternalState(this).tag;
    });
    redefine($Symbol, 'withoutSetter', function (description) {
      return wrap(uid(description), description);
    });
    propertyIsEnumerableModule$1.f = $propertyIsEnumerable;
    definePropertyModule.f = $defineProperty;
    getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
    getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    getOwnPropertySymbolsModule$1.f = $getOwnPropertySymbols;

    wrappedWellKnownSymbolModule.f = function (name) {
      return wrap(wellKnownSymbol$2(name), name);
    };

    if (DESCRIPTORS$1) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });
    }
  }

  $$7({
    global: true,
    wrap: true,
    forced: !NATIVE_SYMBOL,
    sham: !NATIVE_SYMBOL
  }, {
    Symbol: $Symbol
  });
  $forEach$1(objectKeys$1(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol$k(name);
  });
  $$7({
    target: SYMBOL,
    stat: true,
    forced: !NATIVE_SYMBOL
  }, {
    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    'for': function _for(key) {
      var string = $toString(key);
      if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
      if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function useSetter() {
      USE_SETTER = true;
    },
    useSimple: function useSimple() {
      USE_SETTER = false;
    }
  });
  $$7({
    target: 'Object',
    stat: true,
    forced: !NATIVE_SYMBOL,
    sham: !DESCRIPTORS$1
  }, {
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty,
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });
  $$7({
    target: 'Object',
    stat: true,
    forced: !NATIVE_SYMBOL
  }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  }); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443

  $$7({
    target: 'Object',
    stat: true,
    forced: fails$4(function () {
      getOwnPropertySymbolsModule$1.f(1);
    })
  }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return getOwnPropertySymbolsModule$1.f(toObject$3(it));
    }
  }); // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify

  if ($stringify$1) {
    var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$4(function () {
      var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

      return $stringify$1([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
      || $stringify$1({
        a: symbol
      }) != '{}' // V8 throws on boxed symbols
      || $stringify$1(Object(symbol)) != '{}';
    });
    $$7({
      target: 'JSON',
      stat: true,
      forced: FORCED_JSON_STRINGIFY
    }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;

        while (arguments.length > index) {
          args.push(arguments[index++]);
        }

        $replacer = replacer;
        if (!isObject$1(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

        if (!isArray$3(replacer)) replacer = function replacer(key, value) {
          if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return $stringify$1.apply(null, args);
      }
    });
  } // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive


  if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
    createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  } // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag


  setToStringTag$1($Symbol, SYMBOL);
  hiddenKeys[HIDDEN] = true;

  var defineWellKnownSymbol$j = defineWellKnownSymbol$l; // `Symbol.asyncIterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.asynciterator

  defineWellKnownSymbol$j('asyncIterator');

  var defineWellKnownSymbol$i = defineWellKnownSymbol$l; // `Symbol.hasInstance` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.hasinstance

  defineWellKnownSymbol$i('hasInstance');

  var defineWellKnownSymbol$h = defineWellKnownSymbol$l; // `Symbol.isConcatSpreadable` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.isconcatspreadable

  defineWellKnownSymbol$h('isConcatSpreadable');

  var defineWellKnownSymbol$g = defineWellKnownSymbol$l; // `Symbol.iterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.iterator

  defineWellKnownSymbol$g('iterator');

  var defineWellKnownSymbol$f = defineWellKnownSymbol$l; // `Symbol.match` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.match

  defineWellKnownSymbol$f('match');

  var defineWellKnownSymbol$e = defineWellKnownSymbol$l; // `Symbol.matchAll` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.matchall

  defineWellKnownSymbol$e('matchAll');

  var defineWellKnownSymbol$d = defineWellKnownSymbol$l; // `Symbol.replace` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.replace

  defineWellKnownSymbol$d('replace');

  var defineWellKnownSymbol$c = defineWellKnownSymbol$l; // `Symbol.search` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.search

  defineWellKnownSymbol$c('search');

  var defineWellKnownSymbol$b = defineWellKnownSymbol$l; // `Symbol.species` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.species

  defineWellKnownSymbol$b('species');

  var defineWellKnownSymbol$a = defineWellKnownSymbol$l; // `Symbol.split` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.split

  defineWellKnownSymbol$a('split');

  var defineWellKnownSymbol$9 = defineWellKnownSymbol$l; // `Symbol.toPrimitive` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.toprimitive

  defineWellKnownSymbol$9('toPrimitive');

  var defineWellKnownSymbol$8 = defineWellKnownSymbol$l; // `Symbol.toStringTag` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.tostringtag

  defineWellKnownSymbol$8('toStringTag');

  var defineWellKnownSymbol$7 = defineWellKnownSymbol$l; // `Symbol.unscopables` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.unscopables

  defineWellKnownSymbol$7('unscopables');

  var global$1 = global$e;
  var setToStringTag = setToStringTag$5; // JSON[@@toStringTag] property
  // https://tc39.es/ecma262/#sec-json-@@tostringtag

  setToStringTag(global$1.JSON, 'JSON', true);

  var path$5 = path$c;
  var symbol$4 = path$5.Symbol;

  var parent$g = symbol$4;
  var symbol$3 = parent$g;

  var symbol$2 = symbol$3;

  var anObject = anObject$9;
  var iteratorClose = iteratorClose$2; // call something on iterator step with safe closing on error

  var callWithSafeIterationClosing$1 = function callWithSafeIterationClosing(iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };

  var bind = functionBindContext;
  var toObject$2 = toObject$8;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
  var isArrayIteratorMethod = isArrayIteratorMethod$2;
  var toLength$1 = toLength$6;
  var createProperty$1 = createProperty$3;
  var getIterator = getIterator$6;
  var getIteratorMethod = getIteratorMethod$7; // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from

  var arrayFrom = function from(arrayLike
  /* , mapfn = undefined, thisArg = undefined */
  ) {
    var O = toObject$2(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

    if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      result = new C();

      for (; !(step = next.call(iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty$1(result, index, value);
      }
    } else {
      length = toLength$1(O.length);
      result = new C(length);

      for (; length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty$1(result, index, value);
      }
    }

    result.length = index;
    return result;
  };

  var wellKnownSymbol$1 = wellKnownSymbol$h;
  var ITERATOR = wellKnownSymbol$1('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function next() {
        return {
          done: !!called++
        };
      },
      'return': function _return() {
        SAFE_CLOSING = true;
      }
    };

    iteratorWithReturn[ITERATOR] = function () {
      return this;
    }; // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing


    Array.from(iteratorWithReturn, function () {
      throw 2;
    });
  } catch (error) {
    /* empty */
  }

  var checkCorrectnessOfIteration$1 = function checkCorrectnessOfIteration(exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;

    try {
      var object = {};

      object[ITERATOR] = function () {
        return {
          next: function next() {
            return {
              done: ITERATION_SUPPORT = true
            };
          }
        };
      };

      exec(object);
    } catch (error) {
      /* empty */
    }

    return ITERATION_SUPPORT;
  };

  var $$6 = _export;
  var from$5 = arrayFrom;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  }); // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from

  $$6({
    target: 'Array',
    stat: true,
    forced: INCORRECT_ITERATION
  }, {
    from: from$5
  });

  var path$4 = path$c;
  var from$4 = path$4.Array.from;

  var parent$f = from$4;
  var from$3 = parent$f;

  var from$2 = from$3;

  var $$5 = _export;
  var isObject = isObject$c;
  var isArray$2 = isArray$a;
  var toAbsoluteIndex = toAbsoluteIndex$2;
  var toLength = toLength$6;
  var toIndexedObject = toIndexedObject$7;
  var createProperty = createProperty$3;
  var wellKnownSymbol = wellKnownSymbol$h;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$2;
  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
  var SPECIES = wellKnownSymbol('species');
  var nativeSlice = [].slice;
  var max = Math.max; // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects

  $$5({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT
  }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

      var Constructor, result, n;

      if (isArray$2(O)) {
        Constructor = O.constructor; // cross-realm fallback

        if (typeof Constructor == 'function' && (Constructor === Array || isArray$2(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }

        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }

      result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));

      for (n = 0; k < fin; k++, n++) {
        if (k in O) createProperty(result, n, O[k]);
      }

      result.length = n;
      return result;
    }
  });

  var path$3 = path$c;

  var entryVirtual$6 = function entryVirtual(CONSTRUCTOR) {
    return path$3[CONSTRUCTOR + 'Prototype'];
  };

  var entryVirtual$5 = entryVirtual$6;
  var slice$5 = entryVirtual$5('Array').slice;

  var slice$4 = slice$5;
  var ArrayPrototype$5 = Array.prototype;

  var slice_1 = function slice_1(it) {
    var own = it.slice;
    return it === ArrayPrototype$5 || it instanceof Array && own === ArrayPrototype$5.slice ? slice$4 : own;
  };

  var parent$e = slice_1;
  var slice$3 = parent$e;

  var slice$2 = slice$3;

  var defineProperty$3 = {exports: {}};

  var parent$d = defineProperty$a;
  var defineProperty$2 = parent$d;

  var defineProperty$1 = defineProperty$2;

  (function (module) {
    var _Object$defineProperty = defineProperty$1;

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        _Object$defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    module.exports = _defineProperty;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  })(defineProperty$3);

  var DESCRIPTORS = descriptors;
  var fails$3 = fails$g;
  var objectKeys = objectKeys$3;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var toObject$1 = toObject$8;
  var IndexedObject = indexedObject; // eslint-disable-next-line es/no-object-assign -- safe

  var $assign = Object.assign; // eslint-disable-next-line es/no-object-defineproperty -- required for testing

  var defineProperty = Object.defineProperty; // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign

  var objectAssign = !$assign || fails$3(function () {
    // should have correct order of operations (Edge bug)
    if (DESCRIPTORS && $assign({
      b: 1
    }, $assign(defineProperty({}, 'a', {
      enumerable: true,
      get: function get() {
        defineProperty(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), {
      b: 2
    })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

    var A = {};
    var B = {}; // eslint-disable-next-line es/no-symbol -- safe

    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) {
      B[chr] = chr;
    });
    return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) {
    // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject$1(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    var propertyIsEnumerable = propertyIsEnumerableModule.f;

    while (argumentsLength > index) {
      var S = IndexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;

      while (length > j) {
        key = keys[j++];
        if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
      }
    }

    return T;
  } : $assign;

  var $$4 = _export;
  var assign$3 = objectAssign; // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  // eslint-disable-next-line es/no-object-assign -- required for testing

  $$4({
    target: 'Object',
    stat: true,
    forced: Object.assign !== assign$3
  }, {
    assign: assign$3
  });

  var path$2 = path$c;
  var assign$2 = path$2.Object.assign;

  var parent$c = assign$2;
  var assign$1 = parent$c;

  var assign = assign$1;

  var $$3 = _export;
  var toObject = toObject$8;
  var nativeKeys = objectKeys$3;
  var fails$2 = fails$g;
  var FAILS_ON_PRIMITIVES = fails$2(function () {
    nativeKeys(1);
  }); // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys

  $$3({
    target: 'Object',
    stat: true,
    forced: FAILS_ON_PRIMITIVES
  }, {
    keys: function keys(it) {
      return nativeKeys(toObject(it));
    }
  });

  var path$1 = path$c;
  var keys$6 = path$1.Object.keys;

  var parent$b = keys$6;
  var keys$5 = parent$b;

  var keys$4 = keys$5;

  var fails$1 = fails$g;

  var arrayMethodIsStrict$1 = function arrayMethodIsStrict(METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$1(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () {
        throw 1;
      }, 1);
    });
  };

  var $forEach = arrayIteration.forEach;
  var arrayMethodIsStrict = arrayMethodIsStrict$1;
  var STRICT_METHOD = arrayMethodIsStrict('forEach'); // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach

  var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn
  /* , thisArg */
  ) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined); // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var $$2 = _export;
  var forEach$4 = arrayForEach; // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe

  $$2({
    target: 'Array',
    proto: true,
    forced: [].forEach != forEach$4
  }, {
    forEach: forEach$4
  });

  var entryVirtual$4 = entryVirtual$6;
  var forEach$3 = entryVirtual$4('Array').forEach;

  var parent$a = forEach$3;
  var forEach$2 = parent$a;

  var forEach$1 = forEach$2;
  var classof$2 = classof$7;
  var ArrayPrototype$4 = Array.prototype;
  var DOMIterables$2 = {
    DOMTokenList: true,
    NodeList: true
  };

  var forEach_1 = function forEach_1(it) {
    var own = it.forEach;
    return it === ArrayPrototype$4 || it instanceof Array && own === ArrayPrototype$4.forEach // eslint-disable-next-line no-prototype-builtins -- safe
    || DOMIterables$2.hasOwnProperty(classof$2(it)) ? forEach$1 : own;
  };

  var forEach = forEach_1;

  var ariaAbstractRoles = {};

  var commandRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var commandRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'menuitem'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget']]
    };
    var _default = commandRole;
    exports.default = _default;
  })(commandRole);

  var compositeRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var compositeRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-activedescendant': null,
        'aria-disabled': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget']]
    };
    var _default = compositeRole;
    exports.default = _default;
  })(compositeRole);

  var inputRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var inputRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null
      },
      relatedConcepts: [{
        concept: {
          name: 'input'
        },
        module: 'XForms'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget']]
    };
    var _default = inputRole;
    exports.default = _default;
  })(inputRole);

  var landmarkRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var landmarkRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = landmarkRole;
    exports.default = _default;
  })(landmarkRole);

  var rangeRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var rangeRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-valuemax': null,
        'aria-valuemin': null,
        'aria-valuenow': null,
        'aria-valuetext': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
    var _default = rangeRole;
    exports.default = _default;
  })(rangeRole);

  var roletypeRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var roletypeRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {
        'aria-atomic': null,
        'aria-busy': null,
        'aria-controls': null,
        'aria-current': null,
        'aria-describedby': null,
        'aria-details': null,
        'aria-dropeffect': null,
        'aria-flowto': null,
        'aria-grabbed': null,
        'aria-hidden': null,
        'aria-keyshortcuts': null,
        'aria-label': null,
        'aria-labelledby': null,
        'aria-live': null,
        'aria-owns': null,
        'aria-relevant': null,
        'aria-roledescription': null
      },
      relatedConcepts: [{
        concept: {
          name: 'rel'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'role'
        },
        module: 'XHTML'
      }, {
        concept: {
          name: 'type'
        },
        module: 'Dublin Core'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: []
    };
    var _default = roletypeRole;
    exports.default = _default;
  })(roletypeRole);

  var sectionRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var sectionRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'frontmatter'
        },
        module: 'DTB'
      }, {
        concept: {
          name: 'level'
        },
        module: 'DTB'
      }, {
        concept: {
          name: 'level'
        },
        module: 'SMIL'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
    var _default = sectionRole;
    exports.default = _default;
  })(sectionRole);

  var sectionheadRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var sectionheadRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
    var _default = sectionheadRole;
    exports.default = _default;
  })(sectionheadRole);

  var selectRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var selectRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-orientation': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite'], ['roletype', 'structure', 'section', 'group']]
    };
    var _default = selectRole;
    exports.default = _default;
  })(selectRole);

  var structureRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var structureRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype']]
    };
    var _default = structureRole;
    exports.default = _default;
  })(structureRole);

  var widgetRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var widgetRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype']]
    };
    var _default = widgetRole;
    exports.default = _default;
  })(widgetRole);

  var windowRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var windowRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-modal': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype']]
    };
    var _default = windowRole;
    exports.default = _default;
  })(windowRole);

  (function (exports) {

    var _interopRequireDefault = interopRequireDefault.exports;
    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;

    var _map = _interopRequireDefault(map);

    var _commandRole = _interopRequireDefault(commandRole);

    var _compositeRole = _interopRequireDefault(compositeRole);

    var _inputRole = _interopRequireDefault(inputRole);

    var _landmarkRole = _interopRequireDefault(landmarkRole);

    var _rangeRole = _interopRequireDefault(rangeRole);

    var _roletypeRole = _interopRequireDefault(roletypeRole);

    var _sectionRole = _interopRequireDefault(sectionRole);

    var _sectionheadRole = _interopRequireDefault(sectionheadRole);

    var _selectRole = _interopRequireDefault(selectRole);

    var _structureRole = _interopRequireDefault(structureRole);

    var _widgetRole = _interopRequireDefault(widgetRole);

    var _windowRole = _interopRequireDefault(windowRole);

    var ariaAbstractRoles = new _map.default([['command', _commandRole.default], ['composite', _compositeRole.default], ['input', _inputRole.default], ['landmark', _landmarkRole.default], ['range', _rangeRole.default], ['roletype', _roletypeRole.default], ['section', _sectionRole.default], ['sectionhead', _sectionheadRole.default], ['select', _selectRole.default], ['structure', _structureRole.default], ['widget', _widgetRole.default], ['window', _windowRole.default]]);
    var _default = ariaAbstractRoles;
    exports.default = _default;
  })(ariaAbstractRoles);

  var ariaLiteralRoles = {};

  var alertRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var alertRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-atomic': 'true',
        'aria-live': 'assertive'
      },
      relatedConcepts: [{
        concept: {
          name: 'alert'
        },
        module: 'XForms'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = alertRole;
    exports.default = _default;
  })(alertRole);

  var alertdialogRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var alertdialogRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'alert'
        },
        module: 'XForms'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'alert'], ['roletype', 'window', 'dialog']]
    };
    var _default = alertdialogRole;
    exports.default = _default;
  })(alertdialogRole);

  var applicationRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var applicationRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-activedescendant': null,
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'Device Independence Delivery Unit'
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
    var _default = applicationRole;
    exports.default = _default;
  })(applicationRole);

  var articleRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var articleRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-posinset': null,
        'aria-setsize': null
      },
      relatedConcepts: [{
        concept: {
          name: 'article'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'document']]
    };
    var _default = articleRole;
    exports.default = _default;
  })(articleRole);

  var bannerRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var bannerRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          constraints: ['direct descendant of document'],
          name: 'header'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = bannerRole;
    exports.default = _default;
  })(bannerRole);

  var blockquoteRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var blockquoteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = blockquoteRole;
    exports.default = _default;
  })(blockquoteRole);

  var buttonRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var buttonRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-pressed': null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ['set'],
            name: 'aria-pressed'
          }, {
            name: 'type',
            value: 'checkbox'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            name: 'aria-expanded',
            value: 'false'
          }],
          name: 'summary'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            name: 'aria-expanded',
            value: 'true'
          }],
          constraints: ['direct descendant of details element with the open attribute defined'],
          name: 'summary'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            name: 'type',
            value: 'button'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            name: 'type',
            value: 'image'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            name: 'type',
            value: 'reset'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            name: 'type',
            value: 'submit'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'button'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'trigger'
        },
        module: 'XForms'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command']]
    };
    var _default = buttonRole;
    exports.default = _default;
  })(buttonRole);

  var captionRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var captionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['prohibited'],
      prohibitedProps: ['aria-label', 'aria-labelledby'],
      props: {},
      relatedConcepts: [],
      requireContextRole: ['figure', 'grid', 'table'],
      requiredContextRole: ['figure', 'grid', 'table'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = captionRole;
    exports.default = _default;
  })(captionRole);

  var cellRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var cellRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-colindex': null,
        'aria-colspan': null,
        'aria-rowindex': null,
        'aria-rowspan': null
      },
      relatedConcepts: [{
        concept: {
          constraints: ['descendant of table'],
          name: 'td'
        },
        module: 'HTML'
      }],
      requireContextRole: ['row'],
      requiredContextRole: ['row'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = cellRole;
    exports.default = _default;
  })(cellRole);

  var checkboxRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var checkboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-checked': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-invalid': null,
        'aria-readonly': null,
        'aria-required': null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: 'type',
            value: 'checkbox'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'option'
        },
        module: 'ARIA'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-checked': null
      },
      superClass: [['roletype', 'widget', 'input']]
    };
    var _default = checkboxRole;
    exports.default = _default;
  })(checkboxRole);

  var codeRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var codeRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['prohibited'],
      prohibitedProps: ['aria-label', 'aria-labelledby'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = codeRole;
    exports.default = _default;
  })(codeRole);

  var columnheaderRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var columnheaderRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-sort': null
      },
      relatedConcepts: [{
        attributes: [{
          name: 'scope',
          value: 'col'
        }],
        concept: {
          name: 'th'
        },
        module: 'HTML'
      }],
      requireContextRole: ['row'],
      requiredContextRole: ['row'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'cell'], ['roletype', 'structure', 'section', 'cell', 'gridcell'], ['roletype', 'widget', 'gridcell'], ['roletype', 'structure', 'sectionhead']]
    };
    var _default = columnheaderRole;
    exports.default = _default;
  })(columnheaderRole);

  var comboboxRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var comboboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-activedescendant': null,
        'aria-autocomplete': null,
        'aria-errormessage': null,
        'aria-invalid': null,
        'aria-readonly': null,
        'aria-required': null,
        'aria-expanded': 'false',
        'aria-haspopup': 'listbox'
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ['set'],
            name: 'list'
          }, {
            name: 'type',
            value: 'email'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['set'],
            name: 'list'
          }, {
            name: 'type',
            value: 'search'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['set'],
            name: 'list'
          }, {
            name: 'type',
            value: 'tel'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['set'],
            name: 'list'
          }, {
            name: 'type',
            value: 'text'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['set'],
            name: 'list'
          }, {
            name: 'type',
            value: 'url'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['set'],
            name: 'list'
          }, {
            name: 'type',
            value: 'url'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['undefined'],
            name: 'multiple'
          }, {
            constraints: ['undefined'],
            name: 'size'
          }],
          name: 'select'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['undefined'],
            name: 'multiple'
          }, {
            name: 'size',
            value: 1
          }],
          name: 'select'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'select'
        },
        module: 'XForms'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-controls': null,
        'aria-expanded': 'false'
      },
      superClass: [['roletype', 'widget', 'input']]
    };
    var _default = comboboxRole;
    exports.default = _default;
  })(comboboxRole);

  var complementaryRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var complementaryRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'aside'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = complementaryRole;
    exports.default = _default;
  })(complementaryRole);

  var contentinfoRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var contentinfoRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          constraints: ['direct descendant of document'],
          name: 'footer'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = contentinfoRole;
    exports.default = _default;
  })(contentinfoRole);

  var definitionRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var definitionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'dd'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = definitionRole;
    exports.default = _default;
  })(definitionRole);

  var deletionRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var deletionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['prohibited'],
      prohibitedProps: ['aria-label', 'aria-labelledby'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = deletionRole;
    exports.default = _default;
  })(deletionRole);

  var dialogRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var dialogRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'dialog'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'window']]
    };
    var _default = dialogRole;
    exports.default = _default;
  })(dialogRole);

  var directoryRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var directoryRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        module: 'DAISY Guide'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'list']]
    };
    var _default = directoryRole;
    exports.default = _default;
  })(directoryRole);

  var documentRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var documentRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'Device Independence Delivery Unit'
        }
      }, {
        concept: {
          name: 'body'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
    var _default = documentRole;
    exports.default = _default;
  })(documentRole);

  var emphasisRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var emphasisRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['prohibited'],
      prohibitedProps: ['aria-label', 'aria-labelledby'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = emphasisRole;
    exports.default = _default;
  })(emphasisRole);

  var feedRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var feedRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['article']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'list']]
    };
    var _default = feedRole;
    exports.default = _default;
  })(feedRole);

  var figureRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var figureRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'figure'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = figureRole;
    exports.default = _default;
  })(figureRole);

  var formRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var formRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ['set'],
            name: 'aria-label'
          }],
          name: 'form'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['set'],
            name: 'aria-labelledby'
          }],
          name: 'form'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['set'],
            name: 'name'
          }],
          name: 'form'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = formRole;
    exports.default = _default;
  })(formRole);

  var genericRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var genericRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['prohibited'],
      prohibitedProps: ['aria-label', 'aria-labelledby'],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'span'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'div'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
    var _default = genericRole;
    exports.default = _default;
  })(genericRole);

  var gridRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var gridRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-multiselectable': null,
        'aria-readonly': null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: 'role',
            value: 'grid'
          }],
          name: 'table'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['row'], ['row', 'rowgroup']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite'], ['roletype', 'structure', 'section', 'table']]
    };
    var _default = gridRole;
    exports.default = _default;
  })(gridRole);

  var gridcellRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var gridcellRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null,
        'aria-readonly': null,
        'aria-required': null,
        'aria-selected': null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: 'role',
            value: 'gridcell'
          }],
          name: 'td'
        },
        module: 'HTML'
      }],
      requireContextRole: ['row'],
      requiredContextRole: ['row'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'cell'], ['roletype', 'widget']]
    };
    var _default = gridcellRole;
    exports.default = _default;
  })(gridcellRole);

  var groupRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var groupRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-activedescendant': null,
        'aria-disabled': null
      },
      relatedConcepts: [{
        concept: {
          name: 'details'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'fieldset'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'optgroup'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = groupRole;
    exports.default = _default;
  })(groupRole);

  var headingRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var headingRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-level': null
      },
      relatedConcepts: [{
        concept: {
          name: 'h1'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'h2'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'h3'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'h4'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'h5'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'h6'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-level': 2
      },
      superClass: [['roletype', 'structure', 'sectionhead']]
    };
    var _default = headingRole;
    exports.default = _default;
  })(headingRole);

  var imgRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var imgRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ['set'],
            name: 'alt'
          }],
          name: 'img'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['undefined'],
            name: 'alt'
          }],
          name: 'img'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'imggroup'
        },
        module: 'DTB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = imgRole;
    exports.default = _default;
  })(imgRole);

  var insertionRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var insertionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['prohibited'],
      prohibitedProps: ['aria-label', 'aria-labelledby'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = insertionRole;
    exports.default = _default;
  })(insertionRole);

  var linkRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var linkRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-expanded': null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: 'href'
          }],
          name: 'a'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            name: 'href'
          }],
          name: 'area'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            name: 'href'
          }],
          name: 'link'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command']]
    };
    var _default = linkRole;
    exports.default = _default;
  })(linkRole);

  var listRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var listRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'menu'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'ol'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'ul'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['listitem']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = listRole;
    exports.default = _default;
  })(listRole);

  var listboxRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var listboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-invalid': null,
        'aria-multiselectable': null,
        'aria-readonly': null,
        'aria-required': null,
        'aria-orientation': 'vertical'
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ['>1'],
            name: 'size'
          }, {
            name: 'multiple'
          }],
          name: 'select'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['>1'],
            name: 'size'
          }],
          name: 'select'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            name: 'multiple'
          }],
          name: 'select'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'datalist'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'list'
        },
        module: 'ARIA'
      }, {
        concept: {
          name: 'select'
        },
        module: 'XForms'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['option', 'group'], ['option']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
    };
    var _default = listboxRole;
    exports.default = _default;
  })(listboxRole);

  var listitemRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var listitemRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-level': null,
        'aria-posinset': null,
        'aria-setsize': null
      },
      relatedConcepts: [{
        concept: {
          constraints: ['direct descendant of ol, ul or menu'],
          name: 'li'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'item'
        },
        module: 'XForms'
      }],
      requireContextRole: ['directory', 'list'],
      requiredContextRole: ['directory', 'list'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = listitemRole;
    exports.default = _default;
  })(listitemRole);

  var logRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var logRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-live': 'polite'
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = logRole;
    exports.default = _default;
  })(logRole);

  var mainRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var mainRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'main'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = mainRole;
    exports.default = _default;
  })(mainRole);

  var marqueeRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var marqueeRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = marqueeRole;
    exports.default = _default;
  })(marqueeRole);

  var mathRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var mathRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'math'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = mathRole;
    exports.default = _default;
  })(mathRole);

  var menuRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var menuRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-orientation': 'vertical'
      },
      relatedConcepts: [{
        concept: {
          name: 'MENU'
        },
        module: 'JAPI'
      }, {
        concept: {
          name: 'list'
        },
        module: 'ARIA'
      }, {
        concept: {
          name: 'select'
        },
        module: 'XForms'
      }, {
        concept: {
          name: 'sidebar'
        },
        module: 'DTB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['menuitem', 'group'], ['menuitemradio', 'group'], ['menuitemcheckbox', 'group'], ['menuitem'], ['menuitemcheckbox'], ['menuitemradio']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
    };
    var _default = menuRole;
    exports.default = _default;
  })(menuRole);

  var menubarRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var menubarRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-orientation': 'horizontal'
      },
      relatedConcepts: [{
        concept: {
          name: 'toolbar'
        },
        module: 'ARIA'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['menuitem', 'group'], ['menuitemradio', 'group'], ['menuitemcheckbox', 'group'], ['menuitem'], ['menuitemcheckbox'], ['menuitemradio']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite', 'select', 'menu'], ['roletype', 'structure', 'section', 'group', 'select', 'menu']]
    };
    var _default = menubarRole;
    exports.default = _default;
  })(menubarRole);

  var menuitemRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var menuitemRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-posinset': null,
        'aria-setsize': null
      },
      relatedConcepts: [{
        concept: {
          name: 'MENU_ITEM'
        },
        module: 'JAPI'
      }, {
        concept: {
          name: 'listitem'
        },
        module: 'ARIA'
      }, {
        concept: {
          name: 'menuitem'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'option'
        },
        module: 'ARIA'
      }],
      requireContextRole: ['group', 'menu', 'menubar'],
      requiredContextRole: ['group', 'menu', 'menubar'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command']]
    };
    var _default = menuitemRole;
    exports.default = _default;
  })(menuitemRole);

  var menuitemcheckboxRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var menuitemcheckboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'menuitem'
        },
        module: 'ARIA'
      }],
      requireContextRole: ['group', 'menu', 'menubar'],
      requiredContextRole: ['group', 'menu', 'menubar'],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-checked': null
      },
      superClass: [['roletype', 'widget', 'input', 'checkbox'], ['roletype', 'widget', 'command', 'menuitem']]
    };
    var _default = menuitemcheckboxRole;
    exports.default = _default;
  })(menuitemcheckboxRole);

  var menuitemradioRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var menuitemradioRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'menuitem'
        },
        module: 'ARIA'
      }],
      requireContextRole: ['group', 'menu', 'menubar'],
      requiredContextRole: ['group', 'menu', 'menubar'],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-checked': null
      },
      superClass: [['roletype', 'widget', 'input', 'checkbox', 'menuitemcheckbox'], ['roletype', 'widget', 'command', 'menuitem', 'menuitemcheckbox'], ['roletype', 'widget', 'input', 'radio']]
    };
    var _default = menuitemradioRole;
    exports.default = _default;
  })(menuitemradioRole);

  var meterRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var meterRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-valuemax': null,
        'aria-valuemin': null,
        'aria-valuenow': null
      },
      superClass: [['roletype', 'structure', 'range']]
    };
    var _default = meterRole;
    exports.default = _default;
  })(meterRole);

  var navigationRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var navigationRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'nav'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = navigationRole;
    exports.default = _default;
  })(navigationRole);

  var noneRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var noneRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: []
    };
    var _default = noneRole;
    exports.default = _default;
  })(noneRole);

  var noteRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var noteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = noteRole;
    exports.default = _default;
  })(noteRole);

  var optionRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var optionRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-checked': null,
        'aria-posinset': null,
        'aria-setsize': null,
        'aria-selected': 'false'
      },
      relatedConcepts: [{
        concept: {
          name: 'item'
        },
        module: 'XForms'
      }, {
        concept: {
          name: 'listitem'
        },
        module: 'ARIA'
      }, {
        concept: {
          name: 'option'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-selected': 'false'
      },
      superClass: [['roletype', 'widget', 'input']]
    };
    var _default = optionRole;
    exports.default = _default;
  })(optionRole);

  var paragraphRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var paragraphRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['prohibited'],
      prohibitedProps: ['aria-label', 'aria-labelledby'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = paragraphRole;
    exports.default = _default;
  })(paragraphRole);

  var presentationRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var presentationRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['prohibited'],
      prohibitedProps: ['aria-label', 'aria-labelledby'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
    var _default = presentationRole;
    exports.default = _default;
  })(presentationRole);

  var progressbarRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var progressbarRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'progress'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'status'
        },
        module: 'ARIA'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'range'], ['roletype', 'widget']]
    };
    var _default = progressbarRole;
    exports.default = _default;
  })(progressbarRole);

  var radioRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var radioRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-checked': null,
        'aria-posinset': null,
        'aria-setsize': null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: 'type',
            value: 'radio'
          }],
          name: 'input'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-checked': null
      },
      superClass: [['roletype', 'widget', 'input']]
    };
    var _default = radioRole;
    exports.default = _default;
  })(radioRole);

  var radiogroupRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var radiogroupRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-errormessage': null,
        'aria-invalid': null,
        'aria-readonly': null,
        'aria-required': null
      },
      relatedConcepts: [{
        concept: {
          name: 'list'
        },
        module: 'ARIA'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['radio']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
    };
    var _default = radiogroupRole;
    exports.default = _default;
  })(radiogroupRole);

  var regionRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var regionRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ['set'],
            name: 'aria-label'
          }],
          name: 'section'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['set'],
            name: 'aria-labelledby'
          }],
          name: 'section'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'Device Independence Glossart perceivable unit'
        }
      }, {
        concept: {
          name: 'frame'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = regionRole;
    exports.default = _default;
  })(regionRole);

  var rowRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var rowRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-colindex': null,
        'aria-expanded': null,
        'aria-level': null,
        'aria-posinset': null,
        'aria-rowindex': null,
        'aria-selected': null,
        'aria-setsize': null
      },
      relatedConcepts: [{
        concept: {
          name: 'tr'
        },
        module: 'HTML'
      }],
      requireContextRole: ['grid', 'rowgroup', 'table', 'treegrid'],
      requiredContextRole: ['grid', 'rowgroup', 'table', 'treegrid'],
      requiredOwnedElements: [['cell'], ['columnheader'], ['gridcell'], ['rowheader']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'group'], ['roletype', 'widget']]
    };
    var _default = rowRole;
    exports.default = _default;
  })(rowRole);

  var rowgroupRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var rowgroupRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'tbody'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'tfoot'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'thead'
        },
        module: 'HTML'
      }],
      requireContextRole: ['grid', 'table', 'treegrid'],
      requiredContextRole: ['grid', 'table', 'treegrid'],
      requiredOwnedElements: [['row']],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
    var _default = rowgroupRole;
    exports.default = _default;
  })(rowgroupRole);

  var rowheaderRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var rowheaderRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-sort': null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: 'scope',
            value: 'row'
          }],
          name: 'th'
        },
        module: 'HTML'
      }],
      requireContextRole: ['row'],
      requiredContextRole: ['row'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'cell'], ['roletype', 'structure', 'section', 'cell', 'gridcell'], ['roletype', 'widget', 'gridcell'], ['roletype', 'structure', 'sectionhead']]
    };
    var _default = rowheaderRole;
    exports.default = _default;
  })(rowheaderRole);

  var scrollbarRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var scrollbarRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-orientation': 'vertical',
        'aria-valuemax': '100',
        'aria-valuemin': '0'
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-controls': null,
        'aria-valuenow': null
      },
      superClass: [['roletype', 'structure', 'range'], ['roletype', 'widget']]
    };
    var _default = scrollbarRole;
    exports.default = _default;
  })(scrollbarRole);

  var searchRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var searchRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = searchRole;
    exports.default = _default;
  })(searchRole);

  var searchboxRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var searchboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ['undefined'],
            name: 'list'
          }, {
            name: 'type',
            value: 'search'
          }],
          name: 'input'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'input', 'textbox']]
    };
    var _default = searchboxRole;
    exports.default = _default;
  })(searchboxRole);

  var separatorRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var separatorRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-valuetext': null,
        'aria-orientation': 'horizontal',
        'aria-valuemax': '100',
        'aria-valuemin': '0'
      },
      relatedConcepts: [{
        concept: {
          name: 'hr'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
    var _default = separatorRole;
    exports.default = _default;
  })(separatorRole);

  var sliderRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var sliderRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-errormessage': null,
        'aria-haspopup': null,
        'aria-invalid': null,
        'aria-readonly': null,
        'aria-orientation': 'horizontal',
        'aria-valuemax': '100',
        'aria-valuemin': '0'
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: 'type',
            value: 'range'
          }],
          name: 'input'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-valuenow': null
      },
      superClass: [['roletype', 'widget', 'input'], ['roletype', 'structure', 'range']]
    };
    var _default = sliderRole;
    exports.default = _default;
  })(sliderRole);

  var spinbuttonRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var spinbuttonRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-errormessage': null,
        'aria-invalid': null,
        'aria-readonly': null,
        'aria-required': null,
        'aria-valuenow': '0'
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: 'type',
            value: 'number'
          }],
          name: 'input'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite'], ['roletype', 'widget', 'input'], ['roletype', 'structure', 'range']]
    };
    var _default = spinbuttonRole;
    exports.default = _default;
  })(spinbuttonRole);

  var statusRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var statusRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-atomic': 'true',
        'aria-live': 'polite'
      },
      relatedConcepts: [{
        concept: {
          name: 'output'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = statusRole;
    exports.default = _default;
  })(statusRole);

  var strongRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var strongRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['prohibited'],
      prohibitedProps: ['aria-label', 'aria-labelledby'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = strongRole;
    exports.default = _default;
  })(strongRole);

  var subscriptRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var subscriptRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['prohibited'],
      prohibitedProps: ['aria-label', 'aria-labelledby'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = subscriptRole;
    exports.default = _default;
  })(subscriptRole);

  var superscriptRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var superscriptRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['prohibited'],
      prohibitedProps: ['aria-label', 'aria-labelledby'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = superscriptRole;
    exports.default = _default;
  })(superscriptRole);

  var switchRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var switchRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'button'
        },
        module: 'ARIA'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-checked': null
      },
      superClass: [['roletype', 'widget', 'input', 'checkbox']]
    };
    var _default = switchRole;
    exports.default = _default;
  })(switchRole);

  var tabRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var tabRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-posinset': null,
        'aria-setsize': null,
        'aria-selected': 'false'
      },
      relatedConcepts: [],
      requireContextRole: ['tablist'],
      requiredContextRole: ['tablist'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'sectionhead'], ['roletype', 'widget']]
    };
    var _default = tabRole;
    exports.default = _default;
  })(tabRole);

  var tableRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var tableRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-colcount': null,
        'aria-rowcount': null
      },
      relatedConcepts: [{
        concept: {
          name: 'table'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['row'], ['row', 'rowgroup']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = tableRole;
    exports.default = _default;
  })(tableRole);

  var tablistRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var tablistRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-level': null,
        'aria-multiselectable': null,
        'aria-orientation': 'horizontal'
      },
      relatedConcepts: [{
        module: 'DAISY',
        concept: {
          name: 'guide'
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['tab']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite']]
    };
    var _default = tablistRole;
    exports.default = _default;
  })(tablistRole);

  var tabpanelRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var tabpanelRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = tabpanelRole;
    exports.default = _default;
  })(tabpanelRole);

  var termRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var termRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'dfn'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = termRole;
    exports.default = _default;
  })(termRole);

  var textboxRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var textboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-activedescendant': null,
        'aria-autocomplete': null,
        'aria-errormessage': null,
        'aria-haspopup': null,
        'aria-invalid': null,
        'aria-multiline': null,
        'aria-placeholder': null,
        'aria-readonly': null,
        'aria-required': null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ['undefined'],
            name: 'type'
          }, {
            constraints: ['undefined'],
            name: 'list'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['undefined'],
            name: 'list'
          }, {
            name: 'type',
            value: 'email'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['undefined'],
            name: 'list'
          }, {
            name: 'type',
            value: 'tel'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['undefined'],
            name: 'list'
          }, {
            name: 'type',
            value: 'text'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          attributes: [{
            constraints: ['undefined'],
            name: 'list'
          }, {
            name: 'type',
            value: 'url'
          }],
          name: 'input'
        },
        module: 'HTML'
      }, {
        concept: {
          name: 'input'
        },
        module: 'XForms'
      }, {
        concept: {
          name: 'textarea'
        },
        module: 'HTML'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'input']]
    };
    var _default = textboxRole;
    exports.default = _default;
  })(textboxRole);

  var timeRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var timeRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = timeRole;
    exports.default = _default;
  })(timeRole);

  var timerRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var timerRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'status']]
    };
    var _default = timerRole;
    exports.default = _default;
  })(timerRole);

  var toolbarRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var toolbarRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-orientation': 'horizontal'
      },
      relatedConcepts: [{
        concept: {
          name: 'menubar'
        },
        module: 'ARIA'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'group']]
    };
    var _default = toolbarRole;
    exports.default = _default;
  })(toolbarRole);

  var tooltipRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var tooltipRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = tooltipRole;
    exports.default = _default;
  })(tooltipRole);

  var treeRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var treeRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-errormessage': null,
        'aria-invalid': null,
        'aria-multiselectable': null,
        'aria-required': null,
        'aria-orientation': 'vertical'
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['treeitem', 'group'], ['treeitem']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
    };
    var _default = treeRole;
    exports.default = _default;
  })(treeRole);

  var treegridRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var treegridRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['row'], ['row', 'rowgroup']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite', 'grid'], ['roletype', 'structure', 'section', 'table', 'grid'], ['roletype', 'widget', 'composite', 'select', 'tree'], ['roletype', 'structure', 'section', 'group', 'select', 'tree']]
    };
    var _default = treegridRole;
    exports.default = _default;
  })(treegridRole);

  var treeitemRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var treeitemRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-expanded': null,
        'aria-haspopup': null
      },
      relatedConcepts: [],
      requireContextRole: ['group', 'tree'],
      requiredContextRole: ['group', 'tree'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'listitem'], ['roletype', 'widget', 'input', 'option']]
    };
    var _default = treeitemRole;
    exports.default = _default;
  })(treeitemRole);

  (function (exports) {

    var _interopRequireDefault = interopRequireDefault.exports;
    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;

    var _map = _interopRequireDefault(map);

    var _alertRole = _interopRequireDefault(alertRole);

    var _alertdialogRole = _interopRequireDefault(alertdialogRole);

    var _applicationRole = _interopRequireDefault(applicationRole);

    var _articleRole = _interopRequireDefault(articleRole);

    var _bannerRole = _interopRequireDefault(bannerRole);

    var _blockquoteRole = _interopRequireDefault(blockquoteRole);

    var _buttonRole = _interopRequireDefault(buttonRole);

    var _captionRole = _interopRequireDefault(captionRole);

    var _cellRole = _interopRequireDefault(cellRole);

    var _checkboxRole = _interopRequireDefault(checkboxRole);

    var _codeRole = _interopRequireDefault(codeRole);

    var _columnheaderRole = _interopRequireDefault(columnheaderRole);

    var _comboboxRole = _interopRequireDefault(comboboxRole);

    var _complementaryRole = _interopRequireDefault(complementaryRole);

    var _contentinfoRole = _interopRequireDefault(contentinfoRole);

    var _definitionRole = _interopRequireDefault(definitionRole);

    var _deletionRole = _interopRequireDefault(deletionRole);

    var _dialogRole = _interopRequireDefault(dialogRole);

    var _directoryRole = _interopRequireDefault(directoryRole);

    var _documentRole = _interopRequireDefault(documentRole);

    var _emphasisRole = _interopRequireDefault(emphasisRole);

    var _feedRole = _interopRequireDefault(feedRole);

    var _figureRole = _interopRequireDefault(figureRole);

    var _formRole = _interopRequireDefault(formRole);

    var _genericRole = _interopRequireDefault(genericRole);

    var _gridRole = _interopRequireDefault(gridRole);

    var _gridcellRole = _interopRequireDefault(gridcellRole);

    var _groupRole = _interopRequireDefault(groupRole);

    var _headingRole = _interopRequireDefault(headingRole);

    var _imgRole = _interopRequireDefault(imgRole);

    var _insertionRole = _interopRequireDefault(insertionRole);

    var _linkRole = _interopRequireDefault(linkRole);

    var _listRole = _interopRequireDefault(listRole);

    var _listboxRole = _interopRequireDefault(listboxRole);

    var _listitemRole = _interopRequireDefault(listitemRole);

    var _logRole = _interopRequireDefault(logRole);

    var _mainRole = _interopRequireDefault(mainRole);

    var _marqueeRole = _interopRequireDefault(marqueeRole);

    var _mathRole = _interopRequireDefault(mathRole);

    var _menuRole = _interopRequireDefault(menuRole);

    var _menubarRole = _interopRequireDefault(menubarRole);

    var _menuitemRole = _interopRequireDefault(menuitemRole);

    var _menuitemcheckboxRole = _interopRequireDefault(menuitemcheckboxRole);

    var _menuitemradioRole = _interopRequireDefault(menuitemradioRole);

    var _meterRole = _interopRequireDefault(meterRole);

    var _navigationRole = _interopRequireDefault(navigationRole);

    var _noneRole = _interopRequireDefault(noneRole);

    var _noteRole = _interopRequireDefault(noteRole);

    var _optionRole = _interopRequireDefault(optionRole);

    var _paragraphRole = _interopRequireDefault(paragraphRole);

    var _presentationRole = _interopRequireDefault(presentationRole);

    var _progressbarRole = _interopRequireDefault(progressbarRole);

    var _radioRole = _interopRequireDefault(radioRole);

    var _radiogroupRole = _interopRequireDefault(radiogroupRole);

    var _regionRole = _interopRequireDefault(regionRole);

    var _rowRole = _interopRequireDefault(rowRole);

    var _rowgroupRole = _interopRequireDefault(rowgroupRole);

    var _rowheaderRole = _interopRequireDefault(rowheaderRole);

    var _scrollbarRole = _interopRequireDefault(scrollbarRole);

    var _searchRole = _interopRequireDefault(searchRole);

    var _searchboxRole = _interopRequireDefault(searchboxRole);

    var _separatorRole = _interopRequireDefault(separatorRole);

    var _sliderRole = _interopRequireDefault(sliderRole);

    var _spinbuttonRole = _interopRequireDefault(spinbuttonRole);

    var _statusRole = _interopRequireDefault(statusRole);

    var _strongRole = _interopRequireDefault(strongRole);

    var _subscriptRole = _interopRequireDefault(subscriptRole);

    var _superscriptRole = _interopRequireDefault(superscriptRole);

    var _switchRole = _interopRequireDefault(switchRole);

    var _tabRole = _interopRequireDefault(tabRole);

    var _tableRole = _interopRequireDefault(tableRole);

    var _tablistRole = _interopRequireDefault(tablistRole);

    var _tabpanelRole = _interopRequireDefault(tabpanelRole);

    var _termRole = _interopRequireDefault(termRole);

    var _textboxRole = _interopRequireDefault(textboxRole);

    var _timeRole = _interopRequireDefault(timeRole);

    var _timerRole = _interopRequireDefault(timerRole);

    var _toolbarRole = _interopRequireDefault(toolbarRole);

    var _tooltipRole = _interopRequireDefault(tooltipRole);

    var _treeRole = _interopRequireDefault(treeRole);

    var _treegridRole = _interopRequireDefault(treegridRole);

    var _treeitemRole = _interopRequireDefault(treeitemRole);

    var ariaLiteralRoles = new _map.default([['alert', _alertRole.default], ['alertdialog', _alertdialogRole.default], ['application', _applicationRole.default], ['article', _articleRole.default], ['banner', _bannerRole.default], ['blockquote', _blockquoteRole.default], ['button', _buttonRole.default], ['caption', _captionRole.default], ['cell', _cellRole.default], ['checkbox', _checkboxRole.default], ['code', _codeRole.default], ['columnheader', _columnheaderRole.default], ['combobox', _comboboxRole.default], ['complementary', _complementaryRole.default], ['contentinfo', _contentinfoRole.default], ['definition', _definitionRole.default], ['deletion', _deletionRole.default], ['dialog', _dialogRole.default], ['directory', _directoryRole.default], ['document', _documentRole.default], ['emphasis', _emphasisRole.default], ['feed', _feedRole.default], ['figure', _figureRole.default], ['form', _formRole.default], ['generic', _genericRole.default], ['grid', _gridRole.default], ['gridcell', _gridcellRole.default], ['group', _groupRole.default], ['heading', _headingRole.default], ['img', _imgRole.default], ['insertion', _insertionRole.default], ['link', _linkRole.default], ['list', _listRole.default], ['listbox', _listboxRole.default], ['listitem', _listitemRole.default], ['log', _logRole.default], ['main', _mainRole.default], ['marquee', _marqueeRole.default], ['math', _mathRole.default], ['menu', _menuRole.default], ['menubar', _menubarRole.default], ['menuitem', _menuitemRole.default], ['menuitemcheckbox', _menuitemcheckboxRole.default], ['menuitemradio', _menuitemradioRole.default], ['meter', _meterRole.default], ['navigation', _navigationRole.default], ['none', _noneRole.default], ['note', _noteRole.default], ['option', _optionRole.default], ['paragraph', _paragraphRole.default], ['presentation', _presentationRole.default], ['progressbar', _progressbarRole.default], ['radio', _radioRole.default], ['radiogroup', _radiogroupRole.default], ['region', _regionRole.default], ['row', _rowRole.default], ['rowgroup', _rowgroupRole.default], ['rowheader', _rowheaderRole.default], ['scrollbar', _scrollbarRole.default], ['search', _searchRole.default], ['searchbox', _searchboxRole.default], ['separator', _separatorRole.default], ['slider', _sliderRole.default], ['spinbutton', _spinbuttonRole.default], ['status', _statusRole.default], ['strong', _strongRole.default], ['subscript', _subscriptRole.default], ['superscript', _superscriptRole.default], ['switch', _switchRole.default], ['tab', _tabRole.default], ['table', _tableRole.default], ['tablist', _tablistRole.default], ['tabpanel', _tabpanelRole.default], ['term', _termRole.default], ['textbox', _textboxRole.default], ['time', _timeRole.default], ['timer', _timerRole.default], ['toolbar', _toolbarRole.default], ['tooltip', _tooltipRole.default], ['tree', _treeRole.default], ['treegrid', _treegridRole.default], ['treeitem', _treeitemRole.default]]);
    var _default = ariaLiteralRoles;
    exports.default = _default;
  })(ariaLiteralRoles);

  var ariaDpubRoles = {};

  var docAbstractRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docAbstractRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'abstract [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = docAbstractRole;
    exports.default = _default;
  })(docAbstractRole);

  var docAcknowledgmentsRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docAcknowledgmentsRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'acknowledgments [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docAcknowledgmentsRole;
    exports.default = _default;
  })(docAcknowledgmentsRole);

  var docAfterwordRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docAfterwordRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'afterword [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docAfterwordRole;
    exports.default = _default;
  })(docAfterwordRole);

  var docAppendixRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docAppendixRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'appendix [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docAppendixRole;
    exports.default = _default;
  })(docAppendixRole);

  var docBacklinkRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docBacklinkRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'content'],
      prohibitedProps: [],
      props: {
        'aria-errormessage': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'referrer [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command', 'link']]
    };
    var _default = docBacklinkRole;
    exports.default = _default;
  })(docBacklinkRole);

  var docBiblioentryRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docBiblioentryRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'EPUB biblioentry [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: ['doc-bibliography'],
      requiredContextRole: ['doc-bibliography'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'listitem']]
    };
    var _default = docBiblioentryRole;
    exports.default = _default;
  })(docBiblioentryRole);

  var docBibliographyRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docBibliographyRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'bibliography [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['doc-biblioentry']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docBibliographyRole;
    exports.default = _default;
  })(docBibliographyRole);

  var docBibliorefRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docBibliorefRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-errormessage': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'biblioref [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command', 'link']]
    };
    var _default = docBibliorefRole;
    exports.default = _default;
  })(docBibliorefRole);

  var docChapterRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docChapterRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'chapter [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docChapterRole;
    exports.default = _default;
  })(docChapterRole);

  var docColophonRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docColophonRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'colophon [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = docColophonRole;
    exports.default = _default;
  })(docColophonRole);

  var docConclusionRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docConclusionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'conclusion [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docConclusionRole;
    exports.default = _default;
  })(docConclusionRole);

  var docCoverRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docCoverRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'cover [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'img']]
    };
    var _default = docCoverRole;
    exports.default = _default;
  })(docCoverRole);

  var docCreditRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docCreditRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'credit [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = docCreditRole;
    exports.default = _default;
  })(docCreditRole);

  var docCreditsRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docCreditsRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'credits [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docCreditsRole;
    exports.default = _default;
  })(docCreditsRole);

  var docDedicationRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docDedicationRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'dedication [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = docDedicationRole;
    exports.default = _default;
  })(docDedicationRole);

  var docEndnoteRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docEndnoteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'rearnote [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: ['doc-endnotes'],
      requiredContextRole: ['doc-endnotes'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'listitem']]
    };
    var _default = docEndnoteRole;
    exports.default = _default;
  })(docEndnoteRole);

  var docEndnotesRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docEndnotesRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'rearnotes [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['doc-endnote']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docEndnotesRole;
    exports.default = _default;
  })(docEndnotesRole);

  var docEpigraphRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docEpigraphRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'epigraph [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = docEpigraphRole;
    exports.default = _default;
  })(docEpigraphRole);

  var docEpilogueRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docEpilogueRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'epilogue [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docEpilogueRole;
    exports.default = _default;
  })(docEpilogueRole);

  var docErrataRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docErrataRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'errata [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docErrataRole;
    exports.default = _default;
  })(docErrataRole);

  var docExampleRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docExampleRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = docExampleRole;
    exports.default = _default;
  })(docExampleRole);

  var docFootnoteRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docFootnoteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'footnote [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = docFootnoteRole;
    exports.default = _default;
  })(docFootnoteRole);

  var docForewordRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docForewordRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'foreword [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docForewordRole;
    exports.default = _default;
  })(docForewordRole);

  var docGlossaryRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docGlossaryRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'glossary [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [['definition'], ['term']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docGlossaryRole;
    exports.default = _default;
  })(docGlossaryRole);

  var docGlossrefRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docGlossrefRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-errormessage': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'glossref [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command', 'link']]
    };
    var _default = docGlossrefRole;
    exports.default = _default;
  })(docGlossrefRole);

  var docIndexRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docIndexRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'index [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark', 'navigation']]
    };
    var _default = docIndexRole;
    exports.default = _default;
  })(docIndexRole);

  var docIntroductionRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docIntroductionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'introduction [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docIntroductionRole;
    exports.default = _default;
  })(docIntroductionRole);

  var docNoterefRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docNoterefRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      prohibitedProps: [],
      props: {
        'aria-errormessage': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'noteref [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command', 'link']]
    };
    var _default = docNoterefRole;
    exports.default = _default;
  })(docNoterefRole);

  var docNoticeRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docNoticeRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'notice [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'note']]
    };
    var _default = docNoticeRole;
    exports.default = _default;
  })(docNoticeRole);

  var docPagebreakRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docPagebreakRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'pagebreak [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'separator']]
    };
    var _default = docPagebreakRole;
    exports.default = _default;
  })(docPagebreakRole);

  var docPagelistRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docPagelistRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'page-list [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark', 'navigation']]
    };
    var _default = docPagelistRole;
    exports.default = _default;
  })(docPagelistRole);

  var docPartRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docPartRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'part [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docPartRole;
    exports.default = _default;
  })(docPartRole);

  var docPrefaceRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docPrefaceRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'preface [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docPrefaceRole;
    exports.default = _default;
  })(docPrefaceRole);

  var docPrologueRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docPrologueRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'prologue [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
    var _default = docPrologueRole;
    exports.default = _default;
  })(docPrologueRole);

  var docPullquoteRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docPullquoteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: 'pullquote [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['none']]
    };
    var _default = docPullquoteRole;
    exports.default = _default;
  })(docPullquoteRole);

  var docQnaRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docQnaRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'qna [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
    var _default = docQnaRole;
    exports.default = _default;
  })(docQnaRole);

  var docSubtitleRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docSubtitleRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'subtitle [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'sectionhead']]
    };
    var _default = docSubtitleRole;
    exports.default = _default;
  })(docSubtitleRole);

  var docTipRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docTipRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'help [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'note']]
    };
    var _default = docTipRole;
    exports.default = _default;
  })(docTipRole);

  var docTocRole = {};

  (function (exports) {

    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;
    var docTocRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      prohibitedProps: [],
      props: {
        'aria-disabled': null,
        'aria-errormessage': null,
        'aria-expanded': null,
        'aria-haspopup': null,
        'aria-invalid': null
      },
      relatedConcepts: [{
        concept: {
          name: 'toc [EPUB-SSV]'
        },
        module: 'EPUB'
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark', 'navigation']]
    };
    var _default = docTocRole;
    exports.default = _default;
  })(docTocRole);

  (function (exports) {

    var _interopRequireDefault = interopRequireDefault.exports;
    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;

    var _map = _interopRequireDefault(map);

    var _docAbstractRole = _interopRequireDefault(docAbstractRole);

    var _docAcknowledgmentsRole = _interopRequireDefault(docAcknowledgmentsRole);

    var _docAfterwordRole = _interopRequireDefault(docAfterwordRole);

    var _docAppendixRole = _interopRequireDefault(docAppendixRole);

    var _docBacklinkRole = _interopRequireDefault(docBacklinkRole);

    var _docBiblioentryRole = _interopRequireDefault(docBiblioentryRole);

    var _docBibliographyRole = _interopRequireDefault(docBibliographyRole);

    var _docBibliorefRole = _interopRequireDefault(docBibliorefRole);

    var _docChapterRole = _interopRequireDefault(docChapterRole);

    var _docColophonRole = _interopRequireDefault(docColophonRole);

    var _docConclusionRole = _interopRequireDefault(docConclusionRole);

    var _docCoverRole = _interopRequireDefault(docCoverRole);

    var _docCreditRole = _interopRequireDefault(docCreditRole);

    var _docCreditsRole = _interopRequireDefault(docCreditsRole);

    var _docDedicationRole = _interopRequireDefault(docDedicationRole);

    var _docEndnoteRole = _interopRequireDefault(docEndnoteRole);

    var _docEndnotesRole = _interopRequireDefault(docEndnotesRole);

    var _docEpigraphRole = _interopRequireDefault(docEpigraphRole);

    var _docEpilogueRole = _interopRequireDefault(docEpilogueRole);

    var _docErrataRole = _interopRequireDefault(docErrataRole);

    var _docExampleRole = _interopRequireDefault(docExampleRole);

    var _docFootnoteRole = _interopRequireDefault(docFootnoteRole);

    var _docForewordRole = _interopRequireDefault(docForewordRole);

    var _docGlossaryRole = _interopRequireDefault(docGlossaryRole);

    var _docGlossrefRole = _interopRequireDefault(docGlossrefRole);

    var _docIndexRole = _interopRequireDefault(docIndexRole);

    var _docIntroductionRole = _interopRequireDefault(docIntroductionRole);

    var _docNoterefRole = _interopRequireDefault(docNoterefRole);

    var _docNoticeRole = _interopRequireDefault(docNoticeRole);

    var _docPagebreakRole = _interopRequireDefault(docPagebreakRole);

    var _docPagelistRole = _interopRequireDefault(docPagelistRole);

    var _docPartRole = _interopRequireDefault(docPartRole);

    var _docPrefaceRole = _interopRequireDefault(docPrefaceRole);

    var _docPrologueRole = _interopRequireDefault(docPrologueRole);

    var _docPullquoteRole = _interopRequireDefault(docPullquoteRole);

    var _docQnaRole = _interopRequireDefault(docQnaRole);

    var _docSubtitleRole = _interopRequireDefault(docSubtitleRole);

    var _docTipRole = _interopRequireDefault(docTipRole);

    var _docTocRole = _interopRequireDefault(docTocRole);

    var ariaDpubRoles = new _map.default([['doc-abstract', _docAbstractRole.default], ['doc-acknowledgments', _docAcknowledgmentsRole.default], ['doc-afterword', _docAfterwordRole.default], ['doc-appendix', _docAppendixRole.default], ['doc-backlink', _docBacklinkRole.default], ['doc-biblioentry', _docBiblioentryRole.default], ['doc-bibliography', _docBibliographyRole.default], ['doc-biblioref', _docBibliorefRole.default], ['doc-chapter', _docChapterRole.default], ['doc-colophon', _docColophonRole.default], ['doc-conclusion', _docConclusionRole.default], ['doc-cover', _docCoverRole.default], ['doc-credit', _docCreditRole.default], ['doc-credits', _docCreditsRole.default], ['doc-dedication', _docDedicationRole.default], ['doc-endnote', _docEndnoteRole.default], ['doc-endnotes', _docEndnotesRole.default], ['doc-epigraph', _docEpigraphRole.default], ['doc-epilogue', _docEpilogueRole.default], ['doc-errata', _docErrataRole.default], ['doc-example', _docExampleRole.default], ['doc-footnote', _docFootnoteRole.default], ['doc-foreword', _docForewordRole.default], ['doc-glossary', _docGlossaryRole.default], ['doc-glossref', _docGlossrefRole.default], ['doc-index', _docIndexRole.default], ['doc-introduction', _docIntroductionRole.default], ['doc-noteref', _docNoterefRole.default], ['doc-notice', _docNoticeRole.default], ['doc-pagebreak', _docPagebreakRole.default], ['doc-pagelist', _docPagelistRole.default], ['doc-part', _docPartRole.default], ['doc-preface', _docPrefaceRole.default], ['doc-prologue', _docPrologueRole.default], ['doc-pullquote', _docPullquoteRole.default], ['doc-qna', _docQnaRole.default], ['doc-subtitle', _docSubtitleRole.default], ['doc-tip', _docTipRole.default], ['doc-toc', _docTocRole.default]]);
    var _default = ariaDpubRoles;
    exports.default = _default;
  })(ariaDpubRoles);

  (function (exports) {

    var _interopRequireDefault = interopRequireDefault.exports;
    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;

    var _getIterator2 = _interopRequireDefault(getIterator$1);

    var _isArray = _interopRequireDefault(isArray$5);

    var _getIteratorMethod2 = _interopRequireDefault(getIteratorMethod$1);

    var _symbol = _interopRequireDefault(symbol$2);

    var _from = _interopRequireDefault(from$2);

    var _slice = _interopRequireDefault(slice$2);

    var _defineProperty2 = _interopRequireDefault(defineProperty$3.exports);

    var _assign = _interopRequireDefault(assign);

    var _keys = _interopRequireDefault(keys$4);

    var _forEach = _interopRequireDefault(forEach);

    var _map = _interopRequireDefault(map);

    var _ariaAbstractRoles = _interopRequireDefault(ariaAbstractRoles);

    var _ariaLiteralRoles = _interopRequireDefault(ariaLiteralRoles);

    var _ariaDpubRoles = _interopRequireDefault(ariaDpubRoles);

    var _context;

    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it;

      if (typeof _symbol.default === "undefined" || (0, _getIteratorMethod2.default)(o) == null) {
        if ((0, _isArray.default)(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it) o = it;
          var i = 0;

          var F = function F() {};

          return {
            s: F,
            n: function n() {
              if (i >= o.length) return {
                done: true
              };
              return {
                done: false,
                value: o[i++]
              };
            },
            e: function e(_e) {
              throw _e;
            },
            f: F
          };
        }

        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      var normalCompletion = true,
          didErr = false,
          err;
      return {
        s: function s() {
          it = (0, _getIterator2.default)(o);
        },
        n: function n() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function e(_e2) {
          didErr = true;
          err = _e2;
        },
        f: function f() {
          try {
            if (!normalCompletion && it.return != null) it.return();
          } finally {
            if (didErr) throw err;
          }
        }
      };
    }

    function _unsupportedIterableToArray(o, minLen) {
      var _context2;

      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = (0, _slice.default)(_context2 = Object.prototype.toString.call(o)).call(_context2, 8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return (0, _from.default)(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }

    var rolesMap = new _map.default([]);
    (0, _forEach.default)(_context = [_ariaAbstractRoles.default, _ariaLiteralRoles.default, _ariaDpubRoles.default]).call(_context, function (roleSet) {
      (0, _forEach.default)(roleSet).call(roleSet, function (roleDefinition, name) {
        return rolesMap.set(name, roleDefinition);
      });
    });
    (0, _forEach.default)(rolesMap).call(rolesMap, function (roleDefinition, name) {
      // Conglomerate the properties
      var _iterator = _createForOfIteratorHelper(roleDefinition.superClass),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var superClassIter = _step.value;

          var _iterator2 = _createForOfIteratorHelper(superClassIter),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var superClassName = _step2.value;
              var superClassDefinition = rolesMap.get(superClassName);

              if (superClassDefinition) {
                for (var _i = 0, _Object$keys = (0, _keys.default)(superClassDefinition.props); _i < _Object$keys.length; _i++) {
                  var prop = _Object$keys[_i];

                  if (!Object.prototype.hasOwnProperty.call(roleDefinition.props, prop)) {
                    (0, _assign.default)(roleDefinition.props, (0, _defineProperty2.default)({}, prop, superClassDefinition.props[prop]));
                  }
                }
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
    var _default = rolesMap;
    exports.default = _default;
  })(rolesMap);

  var elementRoleMap = {};

  var collection = collection$2;
  var collectionStrong = collectionStrong$2; // `Set` constructor
  // https://tc39.es/ecma262/#sec-set-objects

  collection('Set', function (init) {
    return function Set() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  }, collectionStrong);

  var path = path$c;
  var set$2 = path.Set;

  var parent$9 = set$2;
  var set$1 = parent$9;

  var set = set$1;

  var slicedToArray = {exports: {}};

  var arrayWithHoles = {exports: {}};

  var parent$8 = isArray$6;
  var isArray$1 = parent$8;

  var isArray = isArray$1;

  (function (module) {
    var _Array$isArray = isArray;

    function _arrayWithHoles(arr) {
      if (_Array$isArray(arr)) return arr;
    }

    module.exports = _arrayWithHoles;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  })(arrayWithHoles);

  var iterableToArrayLimit = {exports: {}};

  var defineWellKnownSymbol$6 = defineWellKnownSymbol$l; // `Symbol.asyncDispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement

  defineWellKnownSymbol$6('asyncDispose');

  var defineWellKnownSymbol$5 = defineWellKnownSymbol$l; // `Symbol.dispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement

  defineWellKnownSymbol$5('dispose');

  var defineWellKnownSymbol$4 = defineWellKnownSymbol$l; // `Symbol.matcher` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching

  defineWellKnownSymbol$4('matcher');

  var defineWellKnownSymbol$3 = defineWellKnownSymbol$l; // `Symbol.metadata` well-known symbol
  // https://github.com/tc39/proposal-decorators

  defineWellKnownSymbol$3('metadata');

  var defineWellKnownSymbol$2 = defineWellKnownSymbol$l; // `Symbol.observable` well-known symbol
  // https://github.com/tc39/proposal-observable

  defineWellKnownSymbol$2('observable');

  var defineWellKnownSymbol$1 = defineWellKnownSymbol$l; // `Symbol.patternMatch` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching

  defineWellKnownSymbol$1('patternMatch');

  var defineWellKnownSymbol = defineWellKnownSymbol$l;
  defineWellKnownSymbol('replaceAll');

  var parent$7 = symbol$3; // TODO: Remove from `core-js@4`
  // TODO: Remove from `core-js@4`

  var symbol$1 = parent$7;

  var symbol = symbol$1;

  (function (module) {
    var _Symbol = symbol;
    var _getIteratorMethod = getIteratorMethod$1;

    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof _Symbol !== "undefined" && _getIteratorMethod(arr) || arr["@@iterator"];

      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;

      var _s, _e;

      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    module.exports = _iterableToArrayLimit;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  })(iterableToArrayLimit);

  var unsupportedIterableToArray = {exports: {}};

  var parent$6 = slice$3;
  var slice$1 = parent$6;

  var slice = slice$1;

  var parent$5 = from$3;
  var from$1 = parent$5;

  var from = from$1;

  var arrayLikeToArray = {exports: {}};

  (function (module) {
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }

    module.exports = _arrayLikeToArray;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  })(arrayLikeToArray);

  (function (module) {
    var _sliceInstanceProperty = slice;
    var _Array$from = from;
    var arrayLikeToArray$1 = arrayLikeToArray.exports;

    function _unsupportedIterableToArray(o, minLen) {
      var _context;

      if (!o) return;
      if (typeof o === "string") return arrayLikeToArray$1(o, minLen);

      var n = _sliceInstanceProperty(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return _Array$from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray$1(o, minLen);
    }

    module.exports = _unsupportedIterableToArray;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  })(unsupportedIterableToArray);

  var nonIterableRest = {exports: {}};

  (function (module) {
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    module.exports = _nonIterableRest;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  })(nonIterableRest);

  (function (module) {
    var arrayWithHoles$1 = arrayWithHoles.exports;
    var iterableToArrayLimit$1 = iterableToArrayLimit.exports;
    var unsupportedIterableToArray$1 = unsupportedIterableToArray.exports;
    var nonIterableRest$1 = nonIterableRest.exports;

    function _slicedToArray(arr, i) {
      return arrayWithHoles$1(arr) || iterableToArrayLimit$1(arr, i) || unsupportedIterableToArray$1(arr, i) || nonIterableRest$1();
    }

    module.exports = _slicedToArray;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  })(slicedToArray);

  var entryVirtual$3 = entryVirtual$6;
  var entries$3 = entryVirtual$3('Array').entries;

  var parent$4 = entries$3;
  var entries$2 = parent$4;

  var entries$1 = entries$2;
  var classof$1 = classof$7;
  var ArrayPrototype$3 = Array.prototype;
  var DOMIterables$1 = {
    DOMTokenList: true,
    NodeList: true
  };

  var entries_1 = function entries_1(it) {
    var own = it.entries;
    return it === ArrayPrototype$3 || it instanceof Array && own === ArrayPrototype$3.entries // eslint-disable-next-line no-prototype-builtins -- safe
    || DOMIterables$1.hasOwnProperty(classof$1(it)) ? entries$1 : own;
  };

  var entries = entries_1;

  var $$1 = _export;
  var $find = arrayIteration.find;
  var FIND = 'find';
  var SKIPS_HOLES = true; // Shouldn't skip holes

  if (FIND in []) Array(1)[FIND](function () {
    SKIPS_HOLES = false;
  }); // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find

  $$1({
    target: 'Array',
    proto: true,
    forced: SKIPS_HOLES
  }, {
    find: function find(callbackfn
    /* , that = undefined */
    ) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  }); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  var entryVirtual$2 = entryVirtual$6;
  var find$3 = entryVirtual$2('Array').find;

  var find$2 = find$3;
  var ArrayPrototype$2 = Array.prototype;

  var find_1 = function find_1(it) {
    var own = it.find;
    return it === ArrayPrototype$2 || it instanceof Array && own === ArrayPrototype$2.find ? find$2 : own;
  };

  var parent$3 = find_1;
  var find$1 = parent$3;

  var find = find$1;

  var $ = _export;
  var getBuiltIn = getBuiltIn$6;
  var fails = fails$g;
  var $stringify = getBuiltIn('JSON', 'stringify');
  var re = /[\uD800-\uDFFF]/g;
  var low = /^[\uD800-\uDBFF]$/;
  var hi = /^[\uDC00-\uDFFF]$/;

  var fix = function fix(match, offset, string) {
    var prev = string.charAt(offset - 1);
    var next = string.charAt(offset + 1);

    if (low.test(match) && !hi.test(next) || hi.test(match) && !low.test(prev)) {
      return "\\u" + match.charCodeAt(0).toString(16);
    }

    return match;
  };

  var FORCED = fails(function () {
    return $stringify("\uDF06\uD834") !== "\"\\udf06\\ud834\"" || $stringify("\uDEAD") !== "\"\\udead\"";
  });

  if ($stringify) {
    // `JSON.stringify` method
    // https://tc39.es/ecma262/#sec-json.stringify
    // https://github.com/tc39/proposal-well-formed-stringify
    $({
      target: 'JSON',
      stat: true,
      forced: FORCED
    }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var result = $stringify.apply(null, arguments);
        return typeof result == 'string' ? result.replace(re, fix) : result;
      }
    });
  }

  var core = path$c; // eslint-disable-next-line es/no-json -- safe

  if (!core.JSON) core.JSON = {
    stringify: JSON.stringify
  }; // eslint-disable-next-line no-unused-vars -- required for `.length`

  var stringify$2 = function stringify(it, replacer, space) {
    return core.JSON.stringify.apply(null, arguments);
  };

  var parent$2 = stringify$2;
  var stringify$1 = parent$2;

  var stringify = stringify$1;

  var entryVirtual$1 = entryVirtual$6;
  var concat$3 = entryVirtual$1('Array').concat;

  var concat$2 = concat$3;
  var ArrayPrototype$1 = Array.prototype;

  var concat_1 = function concat_1(it) {
    var own = it.concat;
    return it === ArrayPrototype$1 || it instanceof Array && own === ArrayPrototype$1.concat ? concat$2 : own;
  };

  var parent$1 = concat_1;
  var concat$1 = parent$1;

  var concat = concat$1;

  var entryVirtual = entryVirtual$6;
  var keys$3 = entryVirtual('Array').keys;

  var parent = keys$3;
  var keys$2 = parent;

  var keys$1 = keys$2;
  var classof = classof$7;
  var ArrayPrototype = Array.prototype;
  var DOMIterables = {
    DOMTokenList: true,
    NodeList: true
  };

  var keys_1 = function keys_1(it) {
    var own = it.keys;
    return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.keys // eslint-disable-next-line no-prototype-builtins -- safe
    || DOMIterables.hasOwnProperty(classof(it)) ? keys$1 : own;
  };

  var keys = keys_1;

  var toConsumableArray = {exports: {}};

  var arrayWithoutHoles = {exports: {}};

  (function (module) {
    var _Array$isArray = isArray;
    var arrayLikeToArray$1 = arrayLikeToArray.exports;

    function _arrayWithoutHoles(arr) {
      if (_Array$isArray(arr)) return arrayLikeToArray$1(arr);
    }

    module.exports = _arrayWithoutHoles;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  })(arrayWithoutHoles);

  var iterableToArray = {exports: {}};

  (function (module) {
    var _Symbol = symbol;
    var _getIteratorMethod = getIteratorMethod$1;
    var _Array$from = from;

    function _iterableToArray(iter) {
      if (typeof _Symbol !== "undefined" && _getIteratorMethod(iter) != null || iter["@@iterator"] != null) return _Array$from(iter);
    }

    module.exports = _iterableToArray;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  })(iterableToArray);

  var nonIterableSpread = {exports: {}};

  (function (module) {
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    module.exports = _nonIterableSpread;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  })(nonIterableSpread);

  (function (module) {
    var arrayWithoutHoles$1 = arrayWithoutHoles.exports;
    var iterableToArray$1 = iterableToArray.exports;
    var unsupportedIterableToArray$1 = unsupportedIterableToArray.exports;
    var nonIterableSpread$1 = nonIterableSpread.exports;

    function _toConsumableArray(arr) {
      return arrayWithoutHoles$1(arr) || iterableToArray$1(arr) || unsupportedIterableToArray$1(arr) || nonIterableSpread$1();
    }

    module.exports = _toConsumableArray;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  })(toConsumableArray);

  (function (exports) {

    var _interopRequireDefault = interopRequireDefault.exports;
    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;

    var _set = _interopRequireDefault(set);

    var _slicedToArray2 = _interopRequireDefault(slicedToArray.exports);

    var _entries = _interopRequireDefault(entries);

    var _find = _interopRequireDefault(find);

    var _stringify = _interopRequireDefault(stringify);

    var _concat = _interopRequireDefault(concat);

    var _keys = _interopRequireDefault(keys);

    var _toConsumableArray2 = _interopRequireDefault(toConsumableArray.exports);

    var _forEach = _interopRequireDefault(forEach);

    var _map = _interopRequireDefault(map);

    var _rolesMap = _interopRequireDefault(rolesMap);

    var _context;

    var elementRoleMap = new _map.default([]);
    (0, _forEach.default)(_context = (0, _toConsumableArray2.default)((0, _keys.default)(_rolesMap.default).call(_rolesMap.default))).call(_context, function (key) {
      var role = _rolesMap.default.get(key);

      if (role) {
        var _context2, _context3;

        (0, _forEach.default)(_context2 = (0, _concat.default)(_context3 = []).call(_context3, (0, _toConsumableArray2.default)(role.baseConcepts), (0, _toConsumableArray2.default)(role.relatedConcepts))).call(_context2, function (relation) {
          if (relation.module === 'HTML') {
            var concept = relation.concept;

            if (concept) {
              var _context4;

              var conceptStr = (0, _stringify.default)(concept);
              var roles = ((0, _find.default)(_context4 = (0, _toConsumableArray2.default)((0, _entries.default)(elementRoleMap).call(elementRoleMap))).call(_context4, function (_ref) {
                var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
                    key = _ref2[0];
                    _ref2[1];

                return (0, _stringify.default)(key) === conceptStr;
              }) || [])[1];

              if (!roles) {
                roles = new _set.default([]);
              }

              roles.add(key);
              elementRoleMap.set(concept, roles);
            }
          }
        });
      }
    });
    var _default = elementRoleMap;
    exports.default = _default;
  })(elementRoleMap);

  var roleElementMap = {};

  (function (exports) {

    var _interopRequireDefault = interopRequireDefault.exports;
    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = void 0;

    var _set = _interopRequireDefault(set);

    var _concat = _interopRequireDefault(concat);

    var _keys = _interopRequireDefault(keys);

    var _toConsumableArray2 = _interopRequireDefault(toConsumableArray.exports);

    var _forEach = _interopRequireDefault(forEach);

    var _map = _interopRequireDefault(map);

    var _rolesMap = _interopRequireDefault(rolesMap);

    var _context;

    var roleElementMap = new _map.default([]);
    (0, _forEach.default)(_context = (0, _toConsumableArray2.default)((0, _keys.default)(_rolesMap.default).call(_rolesMap.default))).call(_context, function (key) {
      var role = _rolesMap.default.get(key);

      if (role) {
        var _context2, _context3;

        (0, _forEach.default)(_context2 = (0, _concat.default)(_context3 = []).call(_context3, (0, _toConsumableArray2.default)(role.baseConcepts), (0, _toConsumableArray2.default)(role.relatedConcepts))).call(_context2, function (relation) {
          if (relation.module === 'HTML') {
            var concept = relation.concept;

            if (concept) {
              var relationConcepts = roleElementMap.get(key) || new _set.default([]);
              relationConcepts.add(concept);
              roleElementMap.set(key, relationConcepts);
            }
          }
        });
      }
    });
    var _default = roleElementMap;
    exports.default = _default;
  })(roleElementMap);

  (function (exports) {

    var _interopRequireDefault = interopRequireDefault.exports;
    var _Object$defineProperty = defineProperty$9;

    _Object$defineProperty(exports, "__esModule", {
      value: true
    });

    exports.roleElements = exports.elementRoles = exports.roles = exports.dom = exports.aria = void 0;

    var _ariaPropsMap = _interopRequireDefault(ariaPropsMap);

    var _domMap = _interopRequireDefault(domMap);

    var _rolesMap = _interopRequireDefault(rolesMap);

    var _elementRoleMap = _interopRequireDefault(elementRoleMap);

    var _roleElementMap = _interopRequireDefault(roleElementMap);

    var aria = _ariaPropsMap.default;
    exports.aria = aria;
    var dom = _domMap.default;
    exports.dom = dom;
    var roles = _rolesMap.default;
    exports.roles = roles;
    var elementRoles = _elementRoleMap.default;
    exports.elementRoles = elementRoles;
    var roleElements = _roleElementMap.default;
    exports.roleElements = roleElements;
  })(lib);

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var elementRoleList = buildElementRoleList(lib.elementRoles);
  /**
   * @param {Element} element -
   * @returns {boolean} - `true` if `element` and its subtree are inaccessible
   */

  function isSubtreeInaccessible(element) {
    if (element.hidden === true) {
      return true;
    }

    if (element.getAttribute('aria-hidden') === 'true') {
      return true;
    }

    var window = element.ownerDocument.defaultView;

    if (window.getComputedStyle(element).display === 'none') {
      return true;
    }

    return false;
  }
  /**
   * Partial implementation https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion
   * which should only be used for elements with a non-presentational role i.e.
   * `role="none"` and `role="presentation"` will not be excluded.
   *
   * Implements aria-hidden semantics (i.e. parent overrides child)
   * Ignores "Child Presentational: True" characteristics
   *
   * @param {Element} element -
   * @param {object} [options] -
   * @param {function (element: Element): boolean} options.isSubtreeInaccessible -
   * can be used to return cached results from previous isSubtreeInaccessible calls
   * @returns {boolean} true if excluded, otherwise false
   */


  function isInaccessible(element, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$isSubtreeIna = _options.isSubtreeInaccessible,
        isSubtreeInaccessibleImpl = _options$isSubtreeIna === void 0 ? isSubtreeInaccessible : _options$isSubtreeIna;
    var window = element.ownerDocument.defaultView; // since visibility is inherited we can exit early

    if (window.getComputedStyle(element).visibility === 'hidden') {
      return true;
    }

    var currentElement = element;

    while (currentElement) {
      if (isSubtreeInaccessibleImpl(currentElement)) {
        return true;
      }

      currentElement = currentElement.parentElement;
    }

    return false;
  }

  function getImplicitAriaRoles(currentNode) {
    // eslint bug here:
    // eslint-disable-next-line no-unused-vars
    for (var _iterator = _createForOfIteratorHelperLoose(elementRoleList), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          match = _step$value.match,
          roles = _step$value.roles;

      if (match(currentNode)) {
        return [].concat(roles);
      }
    }

    return [];
  }

  function buildElementRoleList(elementRolesMap) {
    function makeElementSelector(_ref) {
      var name = _ref.name,
          attributes = _ref.attributes;
      return "" + name + attributes.map(function (_ref2) {
        var attributeName = _ref2.name,
            value = _ref2.value,
            _ref2$constraints = _ref2.constraints,
            constraints = _ref2$constraints === void 0 ? [] : _ref2$constraints;
        var shouldNotExist = constraints.indexOf('undefined') !== -1;

        if (shouldNotExist) {
          return ":not([" + attributeName + "])";
        } else if (value) {
          return "[" + attributeName + "=\"" + value + "\"]";
        } else {
          return "[" + attributeName + "]";
        }
      }).join('');
    }

    function getSelectorSpecificity(_ref3) {
      var _ref3$attributes = _ref3.attributes,
          attributes = _ref3$attributes === void 0 ? [] : _ref3$attributes;
      return attributes.length;
    }

    function bySelectorSpecificity(_ref4, _ref5) {
      var leftSpecificity = _ref4.specificity;
      var rightSpecificity = _ref5.specificity;
      return rightSpecificity - leftSpecificity;
    }

    function match(element) {
      return function (node) {
        var _element$attributes = element.attributes,
            attributes = _element$attributes === void 0 ? [] : _element$attributes; // https://github.com/testing-library/dom-testing-library/issues/814

        var typeTextIndex = attributes.findIndex(function (attribute) {
          return attribute.value && attribute.name === 'type' && attribute.value === 'text';
        });

        if (typeTextIndex >= 0) {
          // not using splice to not mutate the attributes array
          attributes = [].concat(attributes.slice(0, typeTextIndex), attributes.slice(typeTextIndex + 1));

          if (node.type !== 'text') {
            return false;
          }
        }

        return node.matches(makeElementSelector(_extends({}, element, {
          attributes: attributes
        })));
      };
    }

    var result = []; // eslint bug here:
    // eslint-disable-next-line no-unused-vars

    for (var _iterator2 = _createForOfIteratorHelperLoose(elementRolesMap.entries()), _step2; !(_step2 = _iterator2()).done;) {
      var _step2$value = _step2.value,
          element = _step2$value[0],
          roles = _step2$value[1];
      result = [].concat(result, [{
        match: match(element),
        roles: Array.from(roles),
        specificity: getSelectorSpecificity(element)
      }]);
    }

    return result.sort(bySelectorSpecificity);
  }

  function getRoles(container, _temp) {
    var _ref6 = _temp === void 0 ? {} : _temp,
        _ref6$hidden = _ref6.hidden,
        hidden = _ref6$hidden === void 0 ? false : _ref6$hidden;

    function flattenDOM(node) {
      return [node].concat(Array.from(node.children).reduce(function (acc, child) {
        return [].concat(acc, flattenDOM(child));
      }, []));
    }

    return flattenDOM(container).filter(function (element) {
      return hidden === false ? isInaccessible(element) === false : true;
    }).reduce(function (acc, node) {
      var roles = []; // TODO: This violates html-aria which does not allow any role on every element

      if (node.hasAttribute('role')) {
        roles = node.getAttribute('role').split(' ').slice(0, 1);
      } else {
        roles = getImplicitAriaRoles(node);
      }

      return roles.reduce(function (rolesAcc, role) {
        var _extends2, _extends3;

        return Array.isArray(rolesAcc[role]) ? _extends({}, rolesAcc, (_extends2 = {}, _extends2[role] = [].concat(rolesAcc[role], [node]), _extends2)) : _extends({}, rolesAcc, (_extends3 = {}, _extends3[role] = [node], _extends3));
      }, acc);
    }, {});
  }

  function prettyRoles(dom, _ref7) {
    var hidden = _ref7.hidden;
    var roles = getRoles(dom, {
      hidden: hidden
    }); // We prefer to skip generic role, we don't recommend it

    return Object.entries(roles).filter(function (_ref8) {
      var role = _ref8[0];
      return role !== 'generic';
    }).map(function (_ref9) {
      var role = _ref9[0],
          elements = _ref9[1];
      var delimiterBar = '-'.repeat(50);
      var elementsString = elements.map(function (el) {
        var nameString = "Name \"" + computeAccessibleName(el, {
          computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
        }) + "\":\n";
        var domString = prettyDOM(el.cloneNode(false));
        return "" + nameString + domString;
      }).join('\n\n');
      return role + ":\n\n" + elementsString + "\n\n" + delimiterBar;
    }).join('\n');
  }

  var logRoles = function logRoles(dom, _temp2) {
    var _ref10 = _temp2 === void 0 ? {} : _temp2,
        _ref10$hidden = _ref10.hidden,
        hidden = _ref10$hidden === void 0 ? false : _ref10$hidden;

    return console.log(prettyRoles(dom, {
      hidden: hidden
    }));
  };
  /**
   * @param {Element} element -
   * @returns {boolean | undefined} - false/true if (not)selected, undefined if not selectable
   */


  function computeAriaSelected(element) {
    // implicit value from html-aam mappings: https://www.w3.org/TR/html-aam-1.0/#html-attribute-state-and-property-mappings
    // https://www.w3.org/TR/html-aam-1.0/#details-id-97
    if (element.tagName === 'OPTION') {
      return element.selected;
    } // explicit value


    return checkBooleanAttribute(element, 'aria-selected');
  }
  /**
   * @param {Element} element -
   * @returns {boolean | undefined} - false/true if (not)checked, undefined if not checked-able
   */


  function computeAriaChecked(element) {
    // implicit value from html-aam mappings: https://www.w3.org/TR/html-aam-1.0/#html-attribute-state-and-property-mappings
    // https://www.w3.org/TR/html-aam-1.0/#details-id-56
    // https://www.w3.org/TR/html-aam-1.0/#details-id-67
    if ('indeterminate' in element && element.indeterminate) {
      return undefined;
    }

    if ('checked' in element) {
      return element.checked;
    } // explicit value


    return checkBooleanAttribute(element, 'aria-checked');
  }
  /**
   * @param {Element} element -
   * @returns {boolean | undefined} - false/true if (not)pressed, undefined if not press-able
   */


  function computeAriaPressed(element) {
    // https://www.w3.org/TR/wai-aria-1.1/#aria-pressed
    return checkBooleanAttribute(element, 'aria-pressed');
  }
  /**
   * @param {Element} element -
   * @returns {boolean | string | null} -
   */


  function computeAriaCurrent(element) {
    var _ref11, _checkBooleanAttribut;

    // https://www.w3.org/TR/wai-aria-1.1/#aria-current
    return (_ref11 = (_checkBooleanAttribut = checkBooleanAttribute(element, 'aria-current')) != null ? _checkBooleanAttribut : element.getAttribute('aria-current')) != null ? _ref11 : false;
  }
  /**
   * @param {Element} element -
   * @returns {boolean | undefined} - false/true if (not)expanded, undefined if not expand-able
   */


  function computeAriaExpanded(element) {
    // https://www.w3.org/TR/wai-aria-1.1/#aria-expanded
    return checkBooleanAttribute(element, 'aria-expanded');
  }

  function checkBooleanAttribute(element, attribute) {
    var attributeValue = element.getAttribute(attribute);

    if (attributeValue === 'true') {
      return true;
    }

    if (attributeValue === 'false') {
      return false;
    }

    return undefined;
  }
  /**
   * @param {Element} element -
   * @returns {number | undefined} - number if implicit heading or aria-level present, otherwise undefined
   */


  function computeHeadingLevel(element) {
    // https://w3c.github.io/html-aam/#el-h1-h6
    // https://w3c.github.io/html-aam/#el-h1-h6
    var implicitHeadingLevels = {
      H1: 1,
      H2: 2,
      H3: 3,
      H4: 4,
      H5: 5,
      H6: 6
    }; // explicit aria-level value
    // https://www.w3.org/TR/wai-aria-1.2/#aria-level

    var ariaLevelAttribute = element.getAttribute('aria-level') && Number(element.getAttribute('aria-level'));
    return ariaLevelAttribute || implicitHeadingLevels[element.tagName];
  }

  var normalize = getDefaultNormalizer();

  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  function getRegExpMatcher(string) {
    return new RegExp(escapeRegExp(string.toLowerCase()), 'i');
  }

  function makeSuggestion(queryName, element, content, _ref) {
    var variant = _ref.variant,
        name = _ref.name;
    var warning = '';
    var queryOptions = {};
    var queryArgs = [['Role', 'TestId'].includes(queryName) ? content : getRegExpMatcher(content)];

    if (name) {
      queryOptions.name = getRegExpMatcher(name);
    }

    if (queryName === 'Role' && isInaccessible(element)) {
      queryOptions.hidden = true;
      warning = "Element is inaccessible. This means that the element and all its children are invisible to screen readers.\n    If you are using the aria-hidden prop, make sure this is the right choice for your case.\n    ";
    }

    if (Object.keys(queryOptions).length > 0) {
      queryArgs.push(queryOptions);
    }

    var queryMethod = variant + "By" + queryName;
    return {
      queryName: queryName,
      queryMethod: queryMethod,
      queryArgs: queryArgs,
      variant: variant,
      warning: warning,
      toString: function toString() {
        if (warning) {
          console.warn(warning);
        }

        var text = queryArgs[0],
            options = queryArgs[1];
        text = typeof text === 'string' ? "'" + text + "'" : text;
        options = options ? ", { " + Object.entries(options).map(function (_ref2) {
          var k = _ref2[0],
              v = _ref2[1];
          return k + ": " + v;
        }).join(', ') + " }" : '';
        return queryMethod + "(" + text + options + ")";
      }
    };
  }

  function canSuggest(currentMethod, requestedMethod, data) {
    return data && (!requestedMethod || requestedMethod.toLowerCase() === currentMethod.toLowerCase());
  }

  function getSuggestedQuery(element, variant, method) {
    var _element$getAttribute, _getImplicitAriaRoles;

    if (variant === void 0) {
      variant = 'get';
    }

    // don't create suggestions for script and style elements
    if (element.matches(DEFAULT_IGNORE_TAGS)) {
      return undefined;
    } //We prefer to suggest something else if the role is generic


    var role = (_element$getAttribute = element.getAttribute('role')) != null ? _element$getAttribute : (_getImplicitAriaRoles = getImplicitAriaRoles(element)) == null ? void 0 : _getImplicitAriaRoles[0];

    if (role !== 'generic' && canSuggest('Role', method, role)) {
      return makeSuggestion('Role', element, role, {
        variant: variant,
        name: computeAccessibleName(element, {
          computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
        })
      });
    }

    var labelText = getLabels$1(document, element).map(function (label) {
      return label.content;
    }).join(' ');

    if (canSuggest('LabelText', method, labelText)) {
      return makeSuggestion('LabelText', element, labelText, {
        variant: variant
      });
    }

    var placeholderText = element.getAttribute('placeholder');

    if (canSuggest('PlaceholderText', method, placeholderText)) {
      return makeSuggestion('PlaceholderText', element, placeholderText, {
        variant: variant
      });
    }

    var textContent = normalize(getNodeText(element));

    if (canSuggest('Text', method, textContent)) {
      return makeSuggestion('Text', element, textContent, {
        variant: variant
      });
    }

    if (canSuggest('DisplayValue', method, element.value)) {
      return makeSuggestion('DisplayValue', element, normalize(element.value), {
        variant: variant
      });
    }

    var alt = element.getAttribute('alt');

    if (canSuggest('AltText', method, alt)) {
      return makeSuggestion('AltText', element, alt, {
        variant: variant
      });
    }

    var title = element.getAttribute('title');

    if (canSuggest('Title', method, title)) {
      return makeSuggestion('Title', element, title, {
        variant: variant
      });
    }

    var testId = element.getAttribute(getConfig().testIdAttribute);

    if (canSuggest('TestId', method, testId)) {
      return makeSuggestion('TestId', element, testId, {
        variant: variant
      });
    }

    return undefined;
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var runtime = {exports: {}};

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  (function (module) {
    var runtime = function (exports) {

      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.

      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

      function define(obj, key, value) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
        return obj[key];
      }

      try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
      } catch (err) {
        define = function define(obj, key, value) {
          return obj[key] = value;
        };
      }

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.

        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
      }

      exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.

      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }

      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.

      var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.

      function Generator() {}

      function GeneratorFunction() {}

      function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.


      var IteratorPrototype = {};
      define(IteratorPrototype, iteratorSymbol, function () {
        return this;
      });
      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = GeneratorFunctionPrototype;
      define(Gp, "constructor", GeneratorFunctionPrototype);
      define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
      GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.

      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          define(prototype, method, function (arg) {
            return this._invoke(method, arg);
          });
        });
      }

      exports.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };

      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          define(genFun, toStringTagSymbol, "GeneratorFunction");
        }

        genFun.prototype = Object.create(Gp);
        return genFun;
      }; // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.


      exports.awrap = function (arg) {
        return {
          __await: arg
        };
      };

      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);

          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;

            if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
              return PromiseImpl.resolve(value.__await).then(function (value) {
                invoke("next", value, resolve, reject);
              }, function (err) {
                invoke("throw", err, resolve, reject);
              });
            }

            return PromiseImpl.resolve(value).then(function (unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration.
              result.value = unwrapped;
              resolve(result);
            }, function (error) {
              // If a rejected Promise was yielded, throw the rejection back
              // into the async generator function so it can be handled there.
              return invoke("throw", error, resolve, reject);
            });
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        } // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).


        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);
      define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
        return this;
      });
      exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.

      exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
        });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            } // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);

            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted; // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.

              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      } // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.


      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];

        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator["return"]) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError("The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

          context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.

          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        } // The delegate iterator is finished, so forget it and continue with
        // the outer generator.


        context.delegate = null;
        return ContinueSentinel;
      } // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.


      defineIteratorMethods(Gp);
      define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.

      define(Gp, iteratorSymbol, function () {
        return this;
      });
      define(Gp, "toString", function () {
        return "[object Generator]";
      });

      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{
          tryLoc: "root"
        }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function (object) {
        var keys = [];

        for (var key in object) {
          keys.push(key);
        }

        keys.reverse(); // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.

        return function next() {
          while (keys.length) {
            var key = keys.pop();

            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          } // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.


          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];

          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
                next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;
              return next;
            };

            return next.next = next;
          }
        } // Return an iterator with no values.


        return {
          next: doneResult
        };
      }

      exports.values = values;

      function doneResult() {
        return {
          value: undefined$1,
          done: true
        };
      }

      Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          this.prev = 0;
          this.next = 0; // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.

          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined$1;
          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },
        stop: function stop() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;

          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;

          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },
        complete: function complete(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;

              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }

              return thrown;
            }
          } // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.


          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        }
      }; // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.

      return exports;
    }( // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports );

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, in modern engines
      // we can explicitly access globalThis. In older engines we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      if (typeof globalThis === "object") {
        globalThis.regeneratorRuntime = runtime;
      } else {
        Function("r", "regeneratorRuntime = r")(runtime);
      }
    }
  })(runtime);

  var regenerator = runtime.exports;

  // closer to their code (because async stack traces are hard to follow).

  function copyStackTrace(target, source) {
    target.stack = source.stack.replace(source.message, target.message);
  }

  function waitFor(callback, _ref) {
    var _ref$container = _ref.container,
        container = _ref$container === void 0 ? getDocument() : _ref$container,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? getConfig().asyncUtilTimeout : _ref$timeout,
        _ref$showOriginalStac = _ref.showOriginalStackTrace,
        showOriginalStackTrace = _ref$showOriginalStac === void 0 ? getConfig().showOriginalStackTrace : _ref$showOriginalStac,
        stackTraceError = _ref.stackTraceError,
        _ref$interval = _ref.interval,
        interval = _ref$interval === void 0 ? 50 : _ref$interval,
        _ref$onTimeout = _ref.onTimeout,
        onTimeout = _ref$onTimeout === void 0 ? function (error) {
      error.message = getConfig().getElementError(error.message, container).message;
      return error;
    } : _ref$onTimeout,
        _ref$mutationObserver = _ref.mutationObserverOptions,
        mutationObserverOptions = _ref$mutationObserver === void 0 ? {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true
    } : _ref$mutationObserver;

    if (typeof callback !== 'function') {
      throw new TypeError('Received `callback` arg must be a function');
    }

    return new Promise( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(resolve, reject) {
        var lastError, intervalId, observer, finished, promiseStatus, overallTimeoutTimer, usingJestFakeTimers, _getConfig, advanceTimersWrapper, error, _getWindowFromNode, MutationObserver, onDone, checkRealTimersCallback, checkCallback, handleTimeout;

        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                handleTimeout = function _handleTimeout() {
                  var error;

                  if (lastError) {
                    error = lastError;

                    if (!showOriginalStackTrace && error.name === 'TestingLibraryElementError') {
                      copyStackTrace(error, stackTraceError);
                    }
                  } else {
                    error = new Error('Timed out in waitFor.');

                    if (!showOriginalStackTrace) {
                      copyStackTrace(error, stackTraceError);
                    }
                  }

                  onDone(onTimeout(error), null);
                };

                checkCallback = function _checkCallback() {
                  if (promiseStatus === 'pending') return;

                  try {
                    var result = runWithExpensiveErrorDiagnosticsDisabled(callback);

                    if (typeof (result == null ? void 0 : result.then) === 'function') {
                      promiseStatus = 'pending';
                      result.then(function (resolvedValue) {
                        promiseStatus = 'resolved';
                        onDone(null, resolvedValue);
                      }, function (rejectedValue) {
                        promiseStatus = 'rejected';
                        lastError = rejectedValue;
                      });
                    } else {
                      onDone(null, result);
                    } // If `callback` throws, wait for the next mutation, interval, or timeout.

                  } catch (error) {
                    // Save the most recent callback error to reject the promise with it in the event of a timeout
                    lastError = error;
                  }
                };

                checkRealTimersCallback = function _checkRealTimersCallb() {
                  if (jestFakeTimersAreEnabled()) {
                    var _error = new Error("Changed from using real timers to fake timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to fake timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");

                    if (!showOriginalStackTrace) copyStackTrace(_error, stackTraceError);
                    return reject(_error);
                  } else {
                    return checkCallback();
                  }
                };

                onDone = function _onDone(error, result) {
                  finished = true;
                  clearTimeout(overallTimeoutTimer);

                  if (!usingJestFakeTimers) {
                    clearInterval(intervalId);
                    observer.disconnect();
                  }

                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                };

                finished = false;
                promiseStatus = 'idle';
                overallTimeoutTimer = setTimeout(handleTimeout, timeout);
                usingJestFakeTimers = jestFakeTimersAreEnabled();

                if (!usingJestFakeTimers) {
                  _context2.next = 25;
                  break;
                }

                _getConfig = getConfig(), advanceTimersWrapper = _getConfig.unstable_advanceTimersWrapper;
                checkCallback(); // this is a dangerous rule to disable because it could lead to an
                // infinite loop. However, eslint isn't smart enough to know that we're
                // setting finished inside `onDone` which will be called when we're done
                // waiting or when we've timed out.
                // eslint-disable-next-line no-unmodified-loop-condition

              case 11:
                if (finished) {
                  _context2.next = 23;
                  break;
                }

                if (jestFakeTimersAreEnabled()) {
                  _context2.next = 17;
                  break;
                }

                error = new Error("Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
                if (!showOriginalStackTrace) copyStackTrace(error, stackTraceError);
                reject(error);
                return _context2.abrupt("return");

              case 17:
                // we *could* (maybe should?) use `advanceTimersToNextTimer` but it's
                // possible that could make this loop go on forever if someone is using
                // third party code that's setting up recursive timers so rapidly that
                // the user's timer's don't get a chance to resolve. So we'll advance
                // by an interval instead. (We have a test for this case).
                advanceTimersWrapper(function () {
                  jest.advanceTimersByTime(interval);
                }); // It's really important that checkCallback is run *before* we flush
                // in-flight promises. To be honest, I'm not sure why, and I can't quite
                // think of a way to reproduce the problem in a test, but I spent
                // an entire day banging my head against a wall on this.

                checkCallback(); // In this rare case, we *need* to wait for in-flight promises
                // to resolve before continuing. We don't need to take advantage
                // of parallelization so we're fine.
                // https://stackoverflow.com/a/59243586/971592
                // eslint-disable-next-line no-await-in-loop

                _context2.next = 21;
                return advanceTimersWrapper( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
                  return regenerator.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return new Promise(function (r) {
                            setTimeout(r, 0);
                            jest.advanceTimersByTime(0);
                          });

                        case 2:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })));

              case 21:
                _context2.next = 11;
                break;

              case 23:
                _context2.next = 38;
                break;

              case 25:
                _context2.prev = 25;
                checkContainerType(container);
                _context2.next = 33;
                break;

              case 29:
                _context2.prev = 29;
                _context2.t0 = _context2["catch"](25);
                reject(_context2.t0);
                return _context2.abrupt("return");

              case 33:
                intervalId = setInterval(checkRealTimersCallback, interval);
                _getWindowFromNode = getWindowFromNode(container), MutationObserver = _getWindowFromNode.MutationObserver;
                observer = new MutationObserver(checkRealTimersCallback);
                observer.observe(container, mutationObserverOptions);
                checkCallback();

              case 38:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[25, 29]]);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  }

  function waitForWrapper(callback, options) {
    // create the error here so its stack trace is as close to the
    // calling code as possible
    var stackTraceError = new Error('STACK_TRACE_MESSAGE');
    return getConfig().asyncWrapper(function () {
      return waitFor(callback, _extends({
        stackTraceError: stackTraceError
      }, options));
    });
  }
  /*
  eslint
    max-lines-per-function: ["error", {"max": 200}],
  */

  function getElementError(message, container) {
    return getConfig().getElementError(message, container);
  }

  function getMultipleElementsFoundError(message, container) {
    return getElementError(message + "\n\n(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).", container);
  }

  function queryAllByAttribute(attribute, container, text, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$exact = _ref.exact,
        exact = _ref$exact === void 0 ? true : _ref$exact,
        collapseWhitespace = _ref.collapseWhitespace,
        trim = _ref.trim,
        normalizer = _ref.normalizer;

    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    return Array.from(container.querySelectorAll("[" + attribute + "]")).filter(function (node) {
      return matcher(node.getAttribute(attribute), node, text, matchNormalizer);
    });
  }

  function queryByAttribute(attribute, container, text, options) {
    var els = queryAllByAttribute(attribute, container, text, options);

    if (els.length > 1) {
      throw getMultipleElementsFoundError("Found multiple elements by [" + attribute + "=" + text + "]", container);
    }

    return els[0] || null;
  } // this accepts a query function and returns a function which throws an error
  // if more than one elements is returned, otherwise it returns the first
  // element or null


  function makeSingleQuery(allQuery, getMultipleError) {
    return function (container) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var els = allQuery.apply(void 0, [container].concat(args));

      if (els.length > 1) {
        var elementStrings = els.map(function (element) {
          return getElementError(null, element).message;
        }).join('\n\n');
        throw getMultipleElementsFoundError(getMultipleError.apply(void 0, [container].concat(args)) + "\n\nHere are the matching elements:\n\n" + elementStrings, container);
      }

      return els[0] || null;
    };
  }

  function getSuggestionError(suggestion, container) {
    return getConfig().getElementError("A better query is available, try this:\n" + suggestion.toString() + "\n", container);
  } // this accepts a query function and returns a function which throws an error
  // if an empty list of elements is returned


  function makeGetAllQuery(allQuery, getMissingError) {
    return function (container) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var els = allQuery.apply(void 0, [container].concat(args));

      if (!els.length) {
        throw getConfig().getElementError(getMissingError.apply(void 0, [container].concat(args)), container);
      }

      return els;
    };
  } // this accepts a getter query function and returns a function which calls
  // waitFor and passing a function which invokes the getter.


  function makeFindQuery(getter) {
    return function (container, text, options, waitForOptions) {
      return waitForWrapper(function () {
        return getter(container, text, options);
      }, _extends({
        container: container
      }, waitForOptions));
    };
  }

  var wrapSingleQueryWithSuggestion = function wrapSingleQueryWithSuggestion(query, queryAllByName, variant) {
    return function (container) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var element = query.apply(void 0, [container].concat(args));

      var _ref2 = args.slice(-1),
          _ref2$ = _ref2[0];

      _ref2$ = _ref2$ === void 0 ? {} : _ref2$;
      var _ref2$$suggest = _ref2$.suggest,
          suggest = _ref2$$suggest === void 0 ? getConfig().throwSuggestions : _ref2$$suggest;

      if (element && suggest) {
        var suggestion = getSuggestedQuery(element, variant);

        if (suggestion && !queryAllByName.endsWith(suggestion.queryName)) {
          throw getSuggestionError(suggestion.toString(), container);
        }
      }

      return element;
    };
  };

  var wrapAllByQueryWithSuggestion = function wrapAllByQueryWithSuggestion(query, queryAllByName, variant) {
    return function (container) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      var els = query.apply(void 0, [container].concat(args));

      var _ref3 = args.slice(-1),
          _ref3$ = _ref3[0];

      _ref3$ = _ref3$ === void 0 ? {} : _ref3$;
      var _ref3$$suggest = _ref3$.suggest,
          suggest = _ref3$$suggest === void 0 ? getConfig().throwSuggestions : _ref3$$suggest;

      if (els.length && suggest) {
        // get a unique list of all suggestion messages.  We are only going to make a suggestion if
        // all the suggestions are the same
        var uniqueSuggestionMessages = [].concat(new Set(els.map(function (element) {
          var _getSuggestedQuery;

          return (_getSuggestedQuery = getSuggestedQuery(element, variant)) == null ? void 0 : _getSuggestedQuery.toString();
        })));

        if ( // only want to suggest if all the els have the same suggestion.
        uniqueSuggestionMessages.length === 1 && !queryAllByName.endsWith( // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- TODO: Can this be null at runtime?
        getSuggestedQuery(els[0], variant).queryName)) {
          throw getSuggestionError(uniqueSuggestionMessages[0], container);
        }
      }

      return els;
    };
  }; // TODO: This deviates from the published declarations
  // However, the implementation always required a dyadic (after `container`) not variadic `queryAllBy` considering the implementation of `makeFindQuery`
  // This is at least statically true and can be verified by accepting `QueryMethod<Arguments, HTMLElement[]>`


  function buildQueries(queryAllBy, getMultipleError, getMissingError) {
    var queryBy = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllBy, getMultipleError), queryAllBy.name, 'query');
    var getAllBy = makeGetAllQuery(queryAllBy, getMissingError);
    var getBy = makeSingleQuery(getAllBy, getMultipleError);
    var getByWithSuggestions = wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, 'get');
    var getAllWithSuggestions = wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name.replace('query', 'get'), 'getAll');
    var findAllBy = makeFindQuery(wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name, 'findAll'));
    var findBy = makeFindQuery(wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, 'find'));
    return [queryBy, getAllWithSuggestions, getByWithSuggestions, findAllBy, findBy];
  }

  var queryHelpers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getElementError: getElementError,
    wrapAllByQueryWithSuggestion: wrapAllByQueryWithSuggestion,
    wrapSingleQueryWithSuggestion: wrapSingleQueryWithSuggestion,
    getMultipleElementsFoundError: getMultipleElementsFoundError,
    queryAllByAttribute: queryAllByAttribute,
    queryByAttribute: queryByAttribute,
    makeSingleQuery: makeSingleQuery,
    makeGetAllQuery: makeGetAllQuery,
    makeFindQuery: makeFindQuery,
    buildQueries: buildQueries
  });

  function queryAllLabels(container) {
    return Array.from(container.querySelectorAll('label,input')).map(function (node) {
      return {
        node: node,
        textToMatch: getLabelContent(node)
      };
    }).filter(function (_ref) {
      var textToMatch = _ref.textToMatch;
      return textToMatch !== null;
    });
  }

  var queryAllLabelsByText = function queryAllLabelsByText(container, text, _temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        _ref2$exact = _ref2.exact,
        exact = _ref2$exact === void 0 ? true : _ref2$exact,
        trim = _ref2.trim,
        collapseWhitespace = _ref2.collapseWhitespace,
        normalizer = _ref2.normalizer;

    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    var textToMatchByLabels = queryAllLabels(container);
    return textToMatchByLabels.filter(function (_ref3) {
      var node = _ref3.node,
          textToMatch = _ref3.textToMatch;
      return matcher(textToMatch, node, text, matchNormalizer);
    }).map(function (_ref4) {
      var node = _ref4.node;
      return node;
    });
  };

  var queryAllByLabelText = function queryAllByLabelText(container, text, _temp2) {
    var _ref5 = _temp2 === void 0 ? {} : _temp2,
        _ref5$selector = _ref5.selector,
        selector = _ref5$selector === void 0 ? '*' : _ref5$selector,
        _ref5$exact = _ref5.exact,
        exact = _ref5$exact === void 0 ? true : _ref5$exact,
        collapseWhitespace = _ref5.collapseWhitespace,
        trim = _ref5.trim,
        normalizer = _ref5.normalizer;

    checkContainerType(container);
    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    var matchingLabelledElements = Array.from(container.querySelectorAll('*')).filter(function (element) {
      return getRealLabels(element).length || element.hasAttribute('aria-labelledby');
    }).reduce(function (labelledElements, labelledElement) {
      var labelList = getLabels$1(container, labelledElement, {
        selector: selector
      });
      labelList.filter(function (label) {
        return Boolean(label.formControl);
      }).forEach(function (label) {
        if (matcher(label.content, label.formControl, text, matchNormalizer) && label.formControl) labelledElements.push(label.formControl);
      });
      var labelsValue = labelList.filter(function (label) {
        return Boolean(label.content);
      }).map(function (label) {
        return label.content;
      });
      if (matcher(labelsValue.join(' '), labelledElement, text, matchNormalizer)) labelledElements.push(labelledElement);

      if (labelsValue.length > 1) {
        labelsValue.forEach(function (labelValue, index) {
          if (matcher(labelValue, labelledElement, text, matchNormalizer)) labelledElements.push(labelledElement);
          var labelsFiltered = [].concat(labelsValue);
          labelsFiltered.splice(index, 1);

          if (labelsFiltered.length > 1) {
            if (matcher(labelsFiltered.join(' '), labelledElement, text, matchNormalizer)) labelledElements.push(labelledElement);
          }
        });
      }

      return labelledElements;
    }, []).concat(queryAllByAttribute('aria-label', container, text, {
      exact: exact,
      normalizer: matchNormalizer
    }));
    return Array.from(new Set(matchingLabelledElements)).filter(function (element) {
      return element.matches(selector);
    });
  }; // the getAll* query would normally look like this:
  // const getAllByLabelText = makeGetAllQuery(
  //   queryAllByLabelText,
  //   (c, text) => `Unable to find a label with the text of: ${text}`,
  // )
  // however, we can give a more helpful error message than the generic one,
  // so we're writing this one out by hand.


  var getAllByLabelText = function getAllByLabelText(container, text) {
    for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    var els = queryAllByLabelText.apply(void 0, [container, text].concat(rest));

    if (!els.length) {
      var labels = queryAllLabelsByText.apply(void 0, [container, text].concat(rest));

      if (labels.length) {
        var tagNames = labels.map(function (label) {
          return getTagNameOfElementAssociatedWithLabelViaFor(container, label);
        }).filter(function (tagName) {
          return !!tagName;
        });

        if (tagNames.length) {
          throw getConfig().getElementError(tagNames.map(function (tagName) {
            return "Found a label with the text of: " + text + ", however the element associated with this label (<" + tagName + " />) is non-labellable [https://html.spec.whatwg.org/multipage/forms.html#category-label]. If you really need to label a <" + tagName + " />, you can use aria-label or aria-labelledby instead.";
          }).join('\n\n'), container);
        } else {
          throw getConfig().getElementError("Found a label with the text of: " + text + ", however no form control was found associated to that label. Make sure you're using the \"for\" attribute or \"aria-labelledby\" attribute correctly.", container);
        }
      } else {
        throw getConfig().getElementError("Unable to find a label with the text of: " + text, container);
      }
    }

    return els;
  };

  function getTagNameOfElementAssociatedWithLabelViaFor(container, label) {
    var htmlFor = label.getAttribute('for');

    if (!htmlFor) {
      return null;
    }

    var element = container.querySelector("[id=\"" + htmlFor + "\"]");
    return element ? element.tagName.toLowerCase() : null;
  } // the reason mentioned above is the same reason we're not using buildQueries


  var getMultipleError$7 = function getMultipleError(c, text) {
    return "Found multiple elements with the text of: " + text;
  };

  var queryByLabelText = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllByLabelText, getMultipleError$7), queryAllByLabelText.name, 'query');
  var getByLabelText = makeSingleQuery(getAllByLabelText, getMultipleError$7);
  var findAllByLabelText = makeFindQuery(wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, 'findAll'));
  var findByLabelText = makeFindQuery(wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, 'find'));
  var getAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, 'getAll');
  var getByLabelTextWithSuggestions = wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, 'get');
  var queryAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByLabelText, queryAllByLabelText.name, 'queryAll');

  var queryAllByPlaceholderText = function queryAllByPlaceholderText() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    checkContainerType(args[0]);
    return queryAllByAttribute.apply(void 0, ['placeholder'].concat(args));
  };

  var getMultipleError$6 = function getMultipleError(c, text) {
    return "Found multiple elements with the placeholder text of: " + text;
  };

  var getMissingError$6 = function getMissingError(c, text) {
    return "Unable to find an element with the placeholder text of: " + text;
  };

  var queryAllByPlaceholderTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByPlaceholderText, queryAllByPlaceholderText.name, 'queryAll');

  var _buildQueries$6 = buildQueries(queryAllByPlaceholderText, getMultipleError$6, getMissingError$6),
      queryByPlaceholderText = _buildQueries$6[0],
      getAllByPlaceholderText = _buildQueries$6[1],
      getByPlaceholderText = _buildQueries$6[2],
      findAllByPlaceholderText = _buildQueries$6[3],
      findByPlaceholderText = _buildQueries$6[4];

  var queryAllByText = function queryAllByText(container, text, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$selector = _ref.selector,
        selector = _ref$selector === void 0 ? '*' : _ref$selector,
        _ref$exact = _ref.exact,
        exact = _ref$exact === void 0 ? true : _ref$exact,
        collapseWhitespace = _ref.collapseWhitespace,
        trim = _ref.trim,
        _ref$ignore = _ref.ignore,
        ignore = _ref$ignore === void 0 ? DEFAULT_IGNORE_TAGS : _ref$ignore,
        normalizer = _ref.normalizer;

    checkContainerType(container);
    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    var baseArray = [];

    if (typeof container.matches === 'function' && container.matches(selector)) {
      baseArray = [container];
    }

    return [].concat(baseArray, Array.from(container.querySelectorAll(selector))) // TODO: `matches` according lib.dom.d.ts can get only `string` but according our code it can handle also boolean :)
    .filter(function (node) {
      return !ignore || !node.matches(ignore);
    }).filter(function (node) {
      return matcher(getNodeText(node), node, text, matchNormalizer);
    });
  };

  var getMultipleError$5 = function getMultipleError(c, text) {
    return "Found multiple elements with the text: " + text;
  };

  var getMissingError$5 = function getMissingError(c, text) {
    return "Unable to find an element with the text: " + text + ". This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.";
  };

  var queryAllByTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByText, queryAllByText.name, 'queryAll');

  var _buildQueries$5 = buildQueries(queryAllByText, getMultipleError$5, getMissingError$5),
      queryByText = _buildQueries$5[0],
      getAllByText = _buildQueries$5[1],
      getByText = _buildQueries$5[2],
      findAllByText = _buildQueries$5[3],
      findByText = _buildQueries$5[4];

  var queryAllByDisplayValue = function queryAllByDisplayValue(container, value, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$exact = _ref.exact,
        exact = _ref$exact === void 0 ? true : _ref$exact,
        collapseWhitespace = _ref.collapseWhitespace,
        trim = _ref.trim,
        normalizer = _ref.normalizer;

    checkContainerType(container);
    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    return Array.from(container.querySelectorAll("input,textarea,select")).filter(function (node) {
      if (node.tagName === 'SELECT') {
        var selectedOptions = Array.from(node.options).filter(function (option) {
          return option.selected;
        });
        return selectedOptions.some(function (optionNode) {
          return matcher(getNodeText(optionNode), optionNode, value, matchNormalizer);
        });
      } else {
        return matcher(node.value, node, value, matchNormalizer);
      }
    });
  };

  var getMultipleError$4 = function getMultipleError(c, value) {
    return "Found multiple elements with the display value: " + value + ".";
  };

  var getMissingError$4 = function getMissingError(c, value) {
    return "Unable to find an element with the display value: " + value + ".";
  };

  var queryAllByDisplayValueWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByDisplayValue, queryAllByDisplayValue.name, 'queryAll');

  var _buildQueries$4 = buildQueries(queryAllByDisplayValue, getMultipleError$4, getMissingError$4),
      queryByDisplayValue = _buildQueries$4[0],
      getAllByDisplayValue = _buildQueries$4[1],
      getByDisplayValue = _buildQueries$4[2],
      findAllByDisplayValue = _buildQueries$4[3],
      findByDisplayValue = _buildQueries$4[4];

  var queryAllByAltText = function queryAllByAltText(container, alt, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$exact = _ref.exact,
        exact = _ref$exact === void 0 ? true : _ref$exact,
        collapseWhitespace = _ref.collapseWhitespace,
        trim = _ref.trim,
        normalizer = _ref.normalizer;

    checkContainerType(container);
    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    return Array.from(container.querySelectorAll('img,input,area')).filter(function (node) {
      return matcher(node.getAttribute('alt'), node, alt, matchNormalizer);
    });
  };

  var getMultipleError$3 = function getMultipleError(c, alt) {
    return "Found multiple elements with the alt text: " + alt;
  };

  var getMissingError$3 = function getMissingError(c, alt) {
    return "Unable to find an element with the alt text: " + alt;
  };

  var queryAllByAltTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByAltText, queryAllByAltText.name, 'queryAll');

  var _buildQueries$3 = buildQueries(queryAllByAltText, getMultipleError$3, getMissingError$3),
      queryByAltText = _buildQueries$3[0],
      getAllByAltText = _buildQueries$3[1],
      getByAltText = _buildQueries$3[2],
      findAllByAltText = _buildQueries$3[3],
      findByAltText = _buildQueries$3[4];

  var isSvgTitle = function isSvgTitle(node) {
    var _node$parentElement;

    return node.tagName.toLowerCase() === 'title' && ((_node$parentElement = node.parentElement) == null ? void 0 : _node$parentElement.tagName.toLowerCase()) === 'svg';
  };

  var queryAllByTitle = function queryAllByTitle(container, text, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$exact = _ref.exact,
        exact = _ref$exact === void 0 ? true : _ref$exact,
        collapseWhitespace = _ref.collapseWhitespace,
        trim = _ref.trim,
        normalizer = _ref.normalizer;

    checkContainerType(container);
    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    return Array.from(container.querySelectorAll('[title], svg > title')).filter(function (node) {
      return matcher(node.getAttribute('title'), node, text, matchNormalizer) || isSvgTitle(node) && matcher(getNodeText(node), node, text, matchNormalizer);
    });
  };

  var getMultipleError$2 = function getMultipleError(c, title) {
    return "Found multiple elements with the title: " + title + ".";
  };

  var getMissingError$2 = function getMissingError(c, title) {
    return "Unable to find an element with the title: " + title + ".";
  };

  var queryAllByTitleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTitle, queryAllByTitle.name, 'queryAll');

  var _buildQueries$2 = buildQueries(queryAllByTitle, getMultipleError$2, getMissingError$2),
      queryByTitle = _buildQueries$2[0],
      getAllByTitle = _buildQueries$2[1],
      getByTitle = _buildQueries$2[2],
      findAllByTitle = _buildQueries$2[3],
      findByTitle = _buildQueries$2[4];

  function queryAllByRole(container, role, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$exact = _ref.exact,
        exact = _ref$exact === void 0 ? true : _ref$exact,
        collapseWhitespace = _ref.collapseWhitespace,
        _ref$hidden = _ref.hidden,
        hidden = _ref$hidden === void 0 ? getConfig().defaultHidden : _ref$hidden,
        name = _ref.name,
        trim = _ref.trim,
        normalizer = _ref.normalizer,
        _ref$queryFallbacks = _ref.queryFallbacks,
        queryFallbacks = _ref$queryFallbacks === void 0 ? false : _ref$queryFallbacks,
        selected = _ref.selected,
        checked = _ref.checked,
        pressed = _ref.pressed,
        current = _ref.current,
        level = _ref.level,
        expanded = _ref.expanded;

    checkContainerType(container);
    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });

    if (selected !== undefined) {
      var _allRoles$get;

      // guard against unknown roles
      if (((_allRoles$get = lib.roles.get(role)) == null ? void 0 : _allRoles$get.props['aria-selected']) === undefined) {
        throw new Error("\"aria-selected\" is not supported on role \"" + role + "\".");
      }
    }

    if (checked !== undefined) {
      var _allRoles$get2;

      // guard against unknown roles
      if (((_allRoles$get2 = lib.roles.get(role)) == null ? void 0 : _allRoles$get2.props['aria-checked']) === undefined) {
        throw new Error("\"aria-checked\" is not supported on role \"" + role + "\".");
      }
    }

    if (pressed !== undefined) {
      var _allRoles$get3;

      // guard against unknown roles
      if (((_allRoles$get3 = lib.roles.get(role)) == null ? void 0 : _allRoles$get3.props['aria-pressed']) === undefined) {
        throw new Error("\"aria-pressed\" is not supported on role \"" + role + "\".");
      }
    }

    if (current !== undefined) {
      var _allRoles$get4;

      /* istanbul ignore next */
      // guard against unknown roles
      // All currently released ARIA versions support `aria-current` on all roles.
      // Leaving this for symetry and forward compatibility
      if (((_allRoles$get4 = lib.roles.get(role)) == null ? void 0 : _allRoles$get4.props['aria-current']) === undefined) {
        throw new Error("\"aria-current\" is not supported on role \"" + role + "\".");
      }
    }

    if (level !== undefined) {
      // guard against using `level` option with any role other than `heading`
      if (role !== 'heading') {
        throw new Error("Role \"" + role + "\" cannot have \"level\" property.");
      }
    }

    if (expanded !== undefined) {
      var _allRoles$get5;

      // guard against unknown roles
      if (((_allRoles$get5 = lib.roles.get(role)) == null ? void 0 : _allRoles$get5.props['aria-expanded']) === undefined) {
        throw new Error("\"aria-expanded\" is not supported on role \"" + role + "\".");
      }
    }

    var subtreeIsInaccessibleCache = new WeakMap();

    function cachedIsSubtreeInaccessible(element) {
      if (!subtreeIsInaccessibleCache.has(element)) {
        subtreeIsInaccessibleCache.set(element, isSubtreeInaccessible(element));
      }

      return subtreeIsInaccessibleCache.get(element);
    }

    return Array.from(container.querySelectorAll('*')).filter(function (node) {
      var isRoleSpecifiedExplicitly = node.hasAttribute('role');

      if (isRoleSpecifiedExplicitly) {
        var roleValue = node.getAttribute('role');

        if (queryFallbacks) {
          return roleValue.split(' ').filter(Boolean).some(function (text) {
            return matcher(text, node, role, matchNormalizer);
          });
        } // if a custom normalizer is passed then let normalizer handle the role value


        if (normalizer) {
          return matcher(roleValue, node, role, matchNormalizer);
        } // other wise only send the first word to match


        var _roleValue$split = roleValue.split(' '),
            firstWord = _roleValue$split[0];

        return matcher(firstWord, node, role, matchNormalizer);
      }

      var implicitRoles = getImplicitAriaRoles(node);
      return implicitRoles.some(function (implicitRole) {
        return matcher(implicitRole, node, role, matchNormalizer);
      });
    }).filter(function (element) {
      if (selected !== undefined) {
        return selected === computeAriaSelected(element);
      }

      if (checked !== undefined) {
        return checked === computeAriaChecked(element);
      }

      if (pressed !== undefined) {
        return pressed === computeAriaPressed(element);
      }

      if (current !== undefined) {
        return current === computeAriaCurrent(element);
      }

      if (expanded !== undefined) {
        return expanded === computeAriaExpanded(element);
      }

      if (level !== undefined) {
        return level === computeHeadingLevel(element);
      } // don't care if aria attributes are unspecified


      return true;
    }).filter(function (element) {
      return hidden === false ? isInaccessible(element, {
        isSubtreeInaccessible: cachedIsSubtreeInaccessible
      }) === false : true;
    }).filter(function (element) {
      if (name === undefined) {
        // Don't care
        return true;
      }

      return matches(computeAccessibleName(element, {
        computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
      }), element, name, function (text) {
        return text;
      });
    });
  }

  var getMultipleError$1 = function getMultipleError(c, role, _temp2) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        name = _ref2.name;

    var nameHint = '';

    if (name === undefined) {
      nameHint = '';
    } else if (typeof name === 'string') {
      nameHint = " and name \"" + name + "\"";
    } else {
      nameHint = " and name `" + name + "`";
    }

    return "Found multiple elements with the role \"" + role + "\"" + nameHint;
  };

  var getMissingError$1 = function getMissingError(container, role, _temp3) {
    var _ref3 = _temp3 === void 0 ? {} : _temp3,
        _ref3$hidden = _ref3.hidden,
        hidden = _ref3$hidden === void 0 ? getConfig().defaultHidden : _ref3$hidden,
        name = _ref3.name;

    if (getConfig()._disableExpensiveErrorDiagnostics) {
      return "Unable to find role=\"" + role + "\"";
    }

    var roles = '';
    Array.from(container.children).forEach(function (childElement) {
      roles += prettyRoles(childElement, {
        hidden: hidden,
        includeName: name !== undefined
      });
    });
    var roleMessage;

    if (roles.length === 0) {
      if (hidden === false) {
        roleMessage = 'There are no accessible roles. But there might be some inaccessible roles. ' + 'If you wish to access them, then set the `hidden` option to `true`. ' + 'Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole';
      } else {
        roleMessage = 'There are no available roles.';
      }
    } else {
      roleMessage = ("\nHere are the " + (hidden === false ? 'accessible' : 'available') + " roles:\n\n  " + roles.replace(/\n/g, '\n  ').replace(/\n\s\s\n/g, '\n\n') + "\n").trim();
    }

    var nameHint = '';

    if (name === undefined) {
      nameHint = '';
    } else if (typeof name === 'string') {
      nameHint = " and name \"" + name + "\"";
    } else {
      nameHint = " and name `" + name + "`";
    }

    return ("\nUnable to find an " + (hidden === false ? 'accessible ' : '') + "element with the role \"" + role + "\"" + nameHint + "\n\n" + roleMessage).trim();
  };

  var queryAllByRoleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByRole, queryAllByRole.name, 'queryAll');

  var _buildQueries$1 = buildQueries(queryAllByRole, getMultipleError$1, getMissingError$1),
      queryByRole = _buildQueries$1[0],
      getAllByRole = _buildQueries$1[1],
      getByRole = _buildQueries$1[2],
      findAllByRole = _buildQueries$1[3],
      findByRole = _buildQueries$1[4];

  var getTestIdAttribute = function getTestIdAttribute() {
    return getConfig().testIdAttribute;
  };

  var queryAllByTestId = function queryAllByTestId() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    checkContainerType(args[0]);
    return queryAllByAttribute.apply(void 0, [getTestIdAttribute()].concat(args));
  };

  var getMultipleError = function getMultipleError(c, id) {
    return "Found multiple elements by: [" + getTestIdAttribute() + "=\"" + id + "\"]";
  };

  var getMissingError = function getMissingError(c, id) {
    return "Unable to find an element by: [" + getTestIdAttribute() + "=\"" + id + "\"]";
  };

  var queryAllByTestIdWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTestId, queryAllByTestId.name, 'queryAll');

  var _buildQueries = buildQueries(queryAllByTestId, getMultipleError, getMissingError),
      queryByTestId = _buildQueries[0],
      getAllByTestId = _buildQueries[1],
      getByTestId = _buildQueries[2],
      findAllByTestId = _buildQueries[3],
      findByTestId = _buildQueries[4];

  var queries = /*#__PURE__*/Object.freeze({
    __proto__: null,
    queryAllByLabelText: queryAllByLabelTextWithSuggestions,
    queryByLabelText: queryByLabelText,
    getAllByLabelText: getAllByLabelTextWithSuggestions,
    getByLabelText: getByLabelTextWithSuggestions,
    findAllByLabelText: findAllByLabelText,
    findByLabelText: findByLabelText,
    queryByPlaceholderText: queryByPlaceholderText,
    queryAllByPlaceholderText: queryAllByPlaceholderTextWithSuggestions,
    getByPlaceholderText: getByPlaceholderText,
    getAllByPlaceholderText: getAllByPlaceholderText,
    findAllByPlaceholderText: findAllByPlaceholderText,
    findByPlaceholderText: findByPlaceholderText,
    queryByText: queryByText,
    queryAllByText: queryAllByTextWithSuggestions,
    getByText: getByText,
    getAllByText: getAllByText,
    findAllByText: findAllByText,
    findByText: findByText,
    queryByDisplayValue: queryByDisplayValue,
    queryAllByDisplayValue: queryAllByDisplayValueWithSuggestions,
    getByDisplayValue: getByDisplayValue,
    getAllByDisplayValue: getAllByDisplayValue,
    findAllByDisplayValue: findAllByDisplayValue,
    findByDisplayValue: findByDisplayValue,
    queryByAltText: queryByAltText,
    queryAllByAltText: queryAllByAltTextWithSuggestions,
    getByAltText: getByAltText,
    getAllByAltText: getAllByAltText,
    findAllByAltText: findAllByAltText,
    findByAltText: findByAltText,
    queryByTitle: queryByTitle,
    queryAllByTitle: queryAllByTitleWithSuggestions,
    getByTitle: getByTitle,
    getAllByTitle: getAllByTitle,
    findAllByTitle: findAllByTitle,
    findByTitle: findByTitle,
    queryByRole: queryByRole,
    queryAllByRole: queryAllByRoleWithSuggestions,
    getAllByRole: getAllByRole,
    getByRole: getByRole,
    findAllByRole: findAllByRole,
    findByRole: findByRole,
    queryByTestId: queryByTestId,
    queryAllByTestId: queryAllByTestIdWithSuggestions,
    getByTestId: getByTestId,
    getAllByTestId: getAllByTestId,
    findAllByTestId: findAllByTestId,
    findByTestId: findByTestId
  });

  /**
   * @typedef {{[key: string]: Function}} FuncMap
   */

  /**
   * @param {HTMLElement} element container
   * @param {FuncMap} queries object of functions
   * @param {Object} initialValue for reducer
   * @returns {FuncMap} returns object of functions bound to container
   */

  function getQueriesForElement(element, queries$1, initialValue) {
    if (queries$1 === void 0) {
      queries$1 = queries;
    }

    if (initialValue === void 0) {
      initialValue = {};
    }

    return Object.keys(queries$1).reduce(function (helpers, key) {
      var fn = queries$1[key];
      helpers[key] = fn.bind(null, element);
      return helpers;
    }, initialValue);
  }

  var isRemoved = function isRemoved(result) {
    return !result || Array.isArray(result) && !result.length;
  }; // Check if the element is not present.
  // As the name implies, waitForElementToBeRemoved should check `present` --> `removed`


  function initialCheck(elements) {
    if (isRemoved(elements)) {
      throw new Error('The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.');
    }
  }

  function waitForElementToBeRemoved(_x, _x2) {
    return _waitForElementToBeRemoved.apply(this, arguments);
  }

  function _waitForElementToBeRemoved() {
    _waitForElementToBeRemoved = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(callback, options) {
      var timeoutError, elements, getRemainingElements;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // created here so we get a nice stacktrace
              timeoutError = new Error('Timed out in waitForElementToBeRemoved.');

              if (typeof callback !== 'function') {
                initialCheck(callback);
                elements = Array.isArray(callback) ? callback : [callback];
                getRemainingElements = elements.map(function (element) {
                  var parent = element.parentElement;
                  if (parent === null) return function () {
                    return null;
                  };

                  while (parent.parentElement) {
                    parent = parent.parentElement;
                  }

                  return function () {
                    return parent.contains(element) ? element : null;
                  };
                });

                callback = function callback() {
                  return getRemainingElements.map(function (c) {
                    return c();
                  }).filter(Boolean);
                };
              }

              initialCheck(callback());
              return _context.abrupt("return", waitForWrapper(function () {
                var result;

                try {
                  result = callback();
                } catch (error) {
                  if (error.name === 'TestingLibraryElementError') {
                    return undefined;
                  }

                  throw error;
                }

                if (!isRemoved(result)) {
                  throw timeoutError;
                }

                return undefined;
              }, options));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _waitForElementToBeRemoved.apply(this, arguments);
  }
  /*
  eslint
    require-await: "off"
  */

  var eventMap = {
    // Clipboard Events
    copy: {
      EventType: 'ClipboardEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    cut: {
      EventType: 'ClipboardEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    paste: {
      EventType: 'ClipboardEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Composition Events
    compositionEnd: {
      EventType: 'CompositionEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    compositionStart: {
      EventType: 'CompositionEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    compositionUpdate: {
      EventType: 'CompositionEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Keyboard Events
    keyDown: {
      EventType: 'KeyboardEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0,
        composed: true
      }
    },
    keyPress: {
      EventType: 'KeyboardEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0,
        composed: true
      }
    },
    keyUp: {
      EventType: 'KeyboardEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0,
        composed: true
      }
    },
    // Focus Events
    focus: {
      EventType: 'FocusEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    blur: {
      EventType: 'FocusEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    focusIn: {
      EventType: 'FocusEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    focusOut: {
      EventType: 'FocusEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    // Form Events
    change: {
      EventType: 'Event',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    input: {
      EventType: 'InputEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    invalid: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: true
      }
    },
    submit: {
      EventType: 'Event',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    reset: {
      EventType: 'Event',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    // Mouse Events
    click: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        button: 0,
        composed: true
      }
    },
    contextMenu: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dblClick: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    drag: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dragEnd: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    dragEnter: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dragExit: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    dragLeave: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    dragOver: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    dragStart: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    drop: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseDown: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseEnter: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    mouseLeave: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false,
        composed: true
      }
    },
    mouseMove: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseOut: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseOver: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    mouseUp: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Selection Events
    select: {
      EventType: 'Event',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // Touch Events
    touchCancel: {
      EventType: 'TouchEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    touchEnd: {
      EventType: 'TouchEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    touchMove: {
      EventType: 'TouchEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    touchStart: {
      EventType: 'TouchEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // UI Events
    resize: {
      EventType: 'UIEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    scroll: {
      EventType: 'UIEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Wheel Events
    wheel: {
      EventType: 'WheelEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    // Media Events
    abort: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    canPlay: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    canPlayThrough: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    durationChange: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    emptied: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    encrypted: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    ended: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadedData: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadedMetadata: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadStart: {
      EventType: 'ProgressEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    pause: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    play: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    playing: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    progress: {
      EventType: 'ProgressEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    rateChange: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    seeked: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    seeking: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    stalled: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    suspend: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    timeUpdate: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    volumeChange: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    waiting: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Image Events
    load: {
      EventType: 'UIEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    error: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Animation Events
    animationStart: {
      EventType: 'AnimationEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    animationEnd: {
      EventType: 'AnimationEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    animationIteration: {
      EventType: 'AnimationEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // Transition Events
    transitionEnd: {
      EventType: 'TransitionEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    // pointer events
    pointerOver: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerEnter: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    pointerDown: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerMove: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerUp: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerCancel: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    pointerOut: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        composed: true
      }
    },
    pointerLeave: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    gotPointerCapture: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    lostPointerCapture: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false,
        composed: true
      }
    },
    // history events
    popState: {
      EventType: 'PopStateEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    }
  };
  var eventAliasMap = {
    doubleClick: 'dblClick'
  };

  var _excluded = ["value", "files"],
      _excluded2 = ["bubbles", "cancelable", "detail"];

  function fireEvent(element, event) {
    return getConfig().eventWrapper(function () {
      if (!event) {
        throw new Error("Unable to fire an event - please provide an event object.");
      }

      if (!element) {
        throw new Error("Unable to fire a \"" + event.type + "\" event - please provide a DOM element.");
      }

      return element.dispatchEvent(event);
    });
  }

  function createEvent(eventName, node, init, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$EventType = _ref.EventType,
        EventType = _ref$EventType === void 0 ? 'Event' : _ref$EventType,
        _ref$defaultInit = _ref.defaultInit,
        defaultInit = _ref$defaultInit === void 0 ? {} : _ref$defaultInit;

    if (!node) {
      throw new Error("Unable to fire a \"" + eventName + "\" event - please provide a DOM element.");
    }

    var eventInit = _extends({}, defaultInit, init);

    var _eventInit$target = eventInit.target;
    _eventInit$target = _eventInit$target === void 0 ? {} : _eventInit$target;

    var value = _eventInit$target.value,
        files = _eventInit$target.files,
        targetProperties = _objectWithoutPropertiesLoose(_eventInit$target, _excluded);

    if (value !== undefined) {
      setNativeValue(node, value);
    }

    if (files !== undefined) {
      // input.files is a read-only property so this is not allowed:
      // input.files = [file]
      // so we have to use this workaround to set the property
      Object.defineProperty(node, 'files', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: files
      });
    }

    Object.assign(node, targetProperties);
    var window = getWindowFromNode(node);
    var EventConstructor = window[EventType] || window.Event;
    var event;
    /* istanbul ignore else  */

    if (typeof EventConstructor === 'function') {
      event = new EventConstructor(eventName, eventInit);
    } else {
      // IE11 polyfill from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
      event = window.document.createEvent(EventType);

      var bubbles = eventInit.bubbles,
          cancelable = eventInit.cancelable,
          detail = eventInit.detail,
          otherInit = _objectWithoutPropertiesLoose(eventInit, _excluded2);

      event.initEvent(eventName, bubbles, cancelable, detail);
      Object.keys(otherInit).forEach(function (eventKey) {
        event[eventKey] = otherInit[eventKey];
      });
    } // DataTransfer is not supported in jsdom: https://github.com/jsdom/jsdom/issues/1568


    var dataTransferProperties = ['dataTransfer', 'clipboardData'];
    dataTransferProperties.forEach(function (dataTransferKey) {
      var dataTransferValue = eventInit[dataTransferKey];

      if (typeof dataTransferValue === 'object') {
        /* istanbul ignore if  */
        if (typeof window.DataTransfer === 'function') {
          Object.defineProperty(event, dataTransferKey, {
            value: Object.getOwnPropertyNames(dataTransferValue).reduce(function (acc, propName) {
              Object.defineProperty(acc, propName, {
                value: dataTransferValue[propName]
              });
              return acc;
            }, new window.DataTransfer())
          });
        } else {
          Object.defineProperty(event, dataTransferKey, {
            value: dataTransferValue
          });
        }
      }
    });
    return event;
  }

  Object.keys(eventMap).forEach(function (key) {
    var _eventMap$key = eventMap[key],
        EventType = _eventMap$key.EventType,
        defaultInit = _eventMap$key.defaultInit;
    var eventName = key.toLowerCase();

    createEvent[key] = function (node, init) {
      return createEvent(eventName, node, init, {
        EventType: EventType,
        defaultInit: defaultInit
      });
    };

    fireEvent[key] = function (node, init) {
      return fireEvent(node, createEvent[key](node, init));
    };
  }); // function written after some investigation here:
  // https://github.com/facebook/react/issues/10135#issuecomment-401496776

  function setNativeValue(element, value) {
    var _ref2 = Object.getOwnPropertyDescriptor(element, 'value') || {},
        valueSetter = _ref2.set;

    var prototype = Object.getPrototypeOf(element);

    var _ref3 = Object.getOwnPropertyDescriptor(prototype, 'value') || {},
        prototypeValueSetter = _ref3.set;

    if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      /* istanbul ignore if */
      // eslint-disable-next-line no-lonely-if -- Can't be ignored by istanbul otherwise
      if (valueSetter) {
        valueSetter.call(element, value);
      } else {
        throw new Error('The given element does not have a value setter');
      }
    }
  }

  Object.keys(eventAliasMap).forEach(function (aliasKey) {
    var key = eventAliasMap[aliasKey];

    fireEvent[aliasKey] = function () {
      return fireEvent[key].apply(fireEvent, arguments);
    };
  });
  /* eslint complexity:["error", 9] */

  var lzString = {exports: {}};

  (function (module) {
    // Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
    // This work is free. You can redistribute it and/or modify it
    // under the terms of the WTFPL, Version 2
    // For more information see LICENSE.txt or http://www.wtfpl.net/
    //
    // For more information, the home page:
    // http://pieroxy.net/blog/pages/lz-string/testing.html
    //
    // LZ-based compression algorithm, version 1.4.4
    var LZString = function () {
      // private property
      var f = String.fromCharCode;
      var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
      var baseReverseDic = {};

      function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};

          for (var i = 0; i < alphabet.length; i++) {
            baseReverseDic[alphabet][alphabet.charAt(i)] = i;
          }
        }

        return baseReverseDic[alphabet][character];
      }

      var LZString = {
        compressToBase64: function compressToBase64(input) {
          if (input == null) return "";

          var res = LZString._compress(input, 6, function (a) {
            return keyStrBase64.charAt(a);
          });

          switch (res.length % 4) {
            // To produce valid Base64
            default: // When could this happen ?

            case 0:
              return res;

            case 1:
              return res + "===";

            case 2:
              return res + "==";

            case 3:
              return res + "=";
          }
        },
        decompressFromBase64: function decompressFromBase64(input) {
          if (input == null) return "";
          if (input == "") return null;
          return LZString._decompress(input.length, 32, function (index) {
            return getBaseValue(keyStrBase64, input.charAt(index));
          });
        },
        compressToUTF16: function compressToUTF16(input) {
          if (input == null) return "";
          return LZString._compress(input, 15, function (a) {
            return f(a + 32);
          }) + " ";
        },
        decompressFromUTF16: function decompressFromUTF16(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString._decompress(compressed.length, 16384, function (index) {
            return compressed.charCodeAt(index) - 32;
          });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function compressToUint8Array(uncompressed) {
          var compressed = LZString.compress(uncompressed);
          var buf = new Uint8Array(compressed.length * 2); // 2 bytes per character

          for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
            var current_value = compressed.charCodeAt(i);
            buf[i * 2] = current_value >>> 8;
            buf[i * 2 + 1] = current_value % 256;
          }

          return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function decompressFromUint8Array(compressed) {
          if (compressed === null || compressed === undefined) {
            return LZString.decompress(compressed);
          } else {
            var buf = new Array(compressed.length / 2); // 2 bytes per character

            for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
              buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
            }

            var result = [];
            buf.forEach(function (c) {
              result.push(f(c));
            });
            return LZString.decompress(result.join(''));
          }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function compressToEncodedURIComponent(input) {
          if (input == null) return "";
          return LZString._compress(input, 6, function (a) {
            return keyStrUriSafe.charAt(a);
          });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function decompressFromEncodedURIComponent(input) {
          if (input == null) return "";
          if (input == "") return null;
          input = input.replace(/ /g, "+");
          return LZString._decompress(input.length, 32, function (index) {
            return getBaseValue(keyStrUriSafe, input.charAt(index));
          });
        },
        compress: function compress(uncompressed) {
          return LZString._compress(uncompressed, 16, function (a) {
            return f(a);
          });
        },
        _compress: function _compress(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null) return "";
          var i,
              value,
              context_dictionary = {},
              context_dictionaryToCreate = {},
              context_c = "",
              context_wc = "",
              context_w = "",
              context_enlargeIn = 2,
              // Compensate for the first entry which should not count
          context_dictSize = 3,
              context_numBits = 2,
              context_data = [],
              context_data_val = 0,
              context_data_position = 0,
              ii;

          for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii);

            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
              context_dictionary[context_c] = context_dictSize++;
              context_dictionaryToCreate[context_c] = true;
            }

            context_wc = context_w + context_c;

            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
              context_w = context_wc;
            } else {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1;

                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }

                  value = context_w.charCodeAt(0);

                  for (i = 0; i < 8; i++) {
                    context_data_val = context_data_val << 1 | value & 1;

                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }

                    value = value >> 1;
                  }
                } else {
                  value = 1;

                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value;

                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }

                    value = 0;
                  }

                  value = context_w.charCodeAt(0);

                  for (i = 0; i < 16; i++) {
                    context_data_val = context_data_val << 1 | value & 1;

                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }

                    value = value >> 1;
                  }
                }

                context_enlargeIn--;

                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }

                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];

                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value & 1;

                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }

                  value = value >> 1;
                }
              }

              context_enlargeIn--;

              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              } // Add wc to the dictionary.


              context_dictionary[context_wc] = context_dictSize++;
              context_w = String(context_c);
            }
          } // Output the code for w.


          if (context_w !== "") {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1;

                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }

                value = context_w.charCodeAt(0);

                for (i = 0; i < 8; i++) {
                  context_data_val = context_data_val << 1 | value & 1;

                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }

                  value = value >> 1;
                }
              } else {
                value = 1;

                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value;

                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }

                  value = 0;
                }

                value = context_w.charCodeAt(0);

                for (i = 0; i < 16; i++) {
                  context_data_val = context_data_val << 1 | value & 1;

                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }

                  value = value >> 1;
                }
              }

              context_enlargeIn--;

              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }

              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];

              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value & 1;

                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }

                value = value >> 1;
              }
            }

            context_enlargeIn--;

            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
          } // Mark the end of the stream


          value = 2;

          for (i = 0; i < context_numBits; i++) {
            context_data_val = context_data_val << 1 | value & 1;

            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }

            value = value >> 1;
          } // Flush the last char


          while (true) {
            context_data_val = context_data_val << 1;

            if (context_data_position == bitsPerChar - 1) {
              context_data.push(getCharFromInt(context_data_val));
              break;
            } else context_data_position++;
          }

          return context_data.join('');
        },
        decompress: function decompress(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString._decompress(compressed.length, 32768, function (index) {
            return compressed.charCodeAt(index);
          });
        },
        _decompress: function _decompress(length, resetValue, getNextValue) {
          var dictionary = [],
              enlargeIn = 4,
              dictSize = 4,
              numBits = 3,
              entry = "",
              result = [],
              i,
              w,
              bits,
              resb,
              maxpower,
              power,
              c,
              data = {
            val: getNextValue(0),
            position: resetValue,
            index: 1
          };

          for (i = 0; i < 3; i += 1) {
            dictionary[i] = i;
          }

          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;

          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;

            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }

            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }

          switch (bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;

              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;

                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }

                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }

              c = f(bits);
              break;

            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;

              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;

                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }

                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }

              c = f(bits);
              break;

            case 2:
              return "";
          }

          dictionary[3] = c;
          w = c;
          result.push(c);

          while (true) {
            if (data.index > length) {
              return "";
            }

            bits = 0;
            maxpower = Math.pow(2, numBits);
            power = 1;

            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;

              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }

              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }

            switch (c = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;

                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;

                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }

                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }

                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;

              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;

                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;

                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }

                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }

                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;

              case 2:
                return result.join('');
            }

            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }

            if (dictionary[c]) {
              entry = dictionary[c];
            } else {
              if (c === dictSize) {
                entry = w + w.charAt(0);
              } else {
                return null;
              }
            }

            result.push(entry); // Add w+entry[0] to the dictionary.

            dictionary[dictSize++] = w + entry.charAt(0);
            enlargeIn--;
            w = entry;

            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
          }
        }
      };
      return LZString;
    }();

    if (module != null) {
      module.exports = LZString;
    }
  })(lzString);

  function unindent(string) {
    // remove white spaces first, to save a few bytes.
    // testing-playground will reformat on load any ways.
    return string.replace(/[ \t]*[\n][ \t]*/g, '\n');
  }

  function encode(value) {
    return lzString.exports.compressToEncodedURIComponent(unindent(value));
  }

  function getPlaygroundUrl(markup) {
    return "https://testing-playground.com/#markup=" + encode(markup);
  }

  var debug = function debug(element, maxLength, options) {
    return Array.isArray(element) ? element.forEach(function (el) {
      return logDOM(el, maxLength, options);
    }) : logDOM(element, maxLength, options);
  };

  var logTestingPlaygroundURL = function logTestingPlaygroundURL(element) {
    if (element === void 0) {
      element = getDocument().body;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!element || !('innerHTML' in element)) {
      console.log("The element you're providing isn't a valid DOM element.");
      return;
    } // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition


    if (!element.innerHTML) {
      console.log("The provided element doesn't have any children.");
      return;
    }

    console.log("Open this URL in your browser\n\n" + getPlaygroundUrl(element.innerHTML));
  };

  var initialValue = {
    debug: debug,
    logTestingPlaygroundURL: logTestingPlaygroundURL
  };
  var screen = typeof document !== 'undefined' && document.body // eslint-disable-line @typescript-eslint/no-unnecessary-condition
  ? getQueriesForElement(document.body, queries, initialValue) : Object.keys(queries).reduce(function (helpers, key) {
    // `key` is for all intents and purposes the type of keyof `helpers`, which itself is the type of `initialValue` plus incoming properties from `queries`
    // if `Object.keys(something)` returned Array<keyof typeof something> this explicit type assertion would not be necessary
    // see https://stackoverflow.com/questions/55012174/why-doesnt-object-keys-return-a-keyof-type-in-typescript
    helpers[key] = function () {
      throw new TypeError('For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error');
    };

    return helpers;
  }, initialValue);

  exports.buildQueries = buildQueries;
  exports.configure = configure;
  exports.createEvent = createEvent;
  exports.findAllByAltText = findAllByAltText;
  exports.findAllByDisplayValue = findAllByDisplayValue;
  exports.findAllByLabelText = findAllByLabelText;
  exports.findAllByPlaceholderText = findAllByPlaceholderText;
  exports.findAllByRole = findAllByRole;
  exports.findAllByTestId = findAllByTestId;
  exports.findAllByText = findAllByText;
  exports.findAllByTitle = findAllByTitle;
  exports.findByAltText = findByAltText;
  exports.findByDisplayValue = findByDisplayValue;
  exports.findByLabelText = findByLabelText;
  exports.findByPlaceholderText = findByPlaceholderText;
  exports.findByRole = findByRole;
  exports.findByTestId = findByTestId;
  exports.findByText = findByText;
  exports.findByTitle = findByTitle;
  exports.fireEvent = fireEvent;
  exports.getAllByAltText = getAllByAltText;
  exports.getAllByDisplayValue = getAllByDisplayValue;
  exports.getAllByLabelText = getAllByLabelTextWithSuggestions;
  exports.getAllByPlaceholderText = getAllByPlaceholderText;
  exports.getAllByRole = getAllByRole;
  exports.getAllByTestId = getAllByTestId;
  exports.getAllByText = getAllByText;
  exports.getAllByTitle = getAllByTitle;
  exports.getByAltText = getByAltText;
  exports.getByDisplayValue = getByDisplayValue;
  exports.getByLabelText = getByLabelTextWithSuggestions;
  exports.getByPlaceholderText = getByPlaceholderText;
  exports.getByRole = getByRole;
  exports.getByTestId = getByTestId;
  exports.getByText = getByText;
  exports.getByTitle = getByTitle;
  exports.getConfig = getConfig;
  exports.getDefaultNormalizer = getDefaultNormalizer;
  exports.getElementError = getElementError;
  exports.getMultipleElementsFoundError = getMultipleElementsFoundError;
  exports.getNodeText = getNodeText;
  exports.getQueriesForElement = getQueriesForElement;
  exports.getRoles = getRoles;
  exports.getSuggestedQuery = getSuggestedQuery;
  exports.isInaccessible = isInaccessible;
  exports.logDOM = logDOM;
  exports.logRoles = logRoles;
  exports.makeFindQuery = makeFindQuery;
  exports.makeGetAllQuery = makeGetAllQuery;
  exports.makeSingleQuery = makeSingleQuery;
  exports.prettyDOM = prettyDOM;
  exports.prettyFormat = index;
  exports.queries = queries;
  exports.queryAllByAltText = queryAllByAltTextWithSuggestions;
  exports.queryAllByAttribute = queryAllByAttribute;
  exports.queryAllByDisplayValue = queryAllByDisplayValueWithSuggestions;
  exports.queryAllByLabelText = queryAllByLabelTextWithSuggestions;
  exports.queryAllByPlaceholderText = queryAllByPlaceholderTextWithSuggestions;
  exports.queryAllByRole = queryAllByRoleWithSuggestions;
  exports.queryAllByTestId = queryAllByTestIdWithSuggestions;
  exports.queryAllByText = queryAllByTextWithSuggestions;
  exports.queryAllByTitle = queryAllByTitleWithSuggestions;
  exports.queryByAltText = queryByAltText;
  exports.queryByAttribute = queryByAttribute;
  exports.queryByDisplayValue = queryByDisplayValue;
  exports.queryByLabelText = queryByLabelText;
  exports.queryByPlaceholderText = queryByPlaceholderText;
  exports.queryByRole = queryByRole;
  exports.queryByTestId = queryByTestId;
  exports.queryByText = queryByText;
  exports.queryByTitle = queryByTitle;
  exports.queryHelpers = queryHelpers;
  exports.screen = screen;
  exports.waitFor = waitForWrapper;
  exports.waitForElementToBeRemoved = waitForElementToBeRemoved;
  exports.within = getQueriesForElement;
  exports.wrapAllByQueryWithSuggestion = wrapAllByQueryWithSuggestion;
  exports.wrapSingleQueryWithSuggestion = wrapSingleQueryWithSuggestion;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dom.umd.js.map
