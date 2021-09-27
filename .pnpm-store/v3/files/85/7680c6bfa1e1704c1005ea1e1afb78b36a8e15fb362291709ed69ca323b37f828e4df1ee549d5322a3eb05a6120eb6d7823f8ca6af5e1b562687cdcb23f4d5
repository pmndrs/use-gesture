var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// lib/src/version.js
var require_version = __commonJS({
  "lib/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.VERSION = void 0;
    exports2.VERSION = "9.0.2";
  }
});

// ../utils/lib/src/api.js
var require_api = __commonJS({
  "../utils/lib/src/api.js"(exports, module) {
    "use strict";
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toFastProperties = exports.timer = exports.peek = exports.isES2015MapSupported = exports.PRINT_WARNING = exports.PRINT_ERROR = exports.packArray = exports.IDENTITY = exports.NOOP = exports.merge = exports.groupBy = exports.defaults = exports.assignNoOverwrite = exports.assign = exports.zipObject = exports.sortBy = exports.indexOf = exports.some = exports.difference = exports.every = exports.isObject = exports.isRegExp = exports.isArray = exports.partial = exports.uniq = exports.compact = exports.reduce = exports.findAll = exports.find = exports.cloneObj = exports.cloneArr = exports.contains = exports.has = exports.pick = exports.reject = exports.filter = exports.dropRight = exports.drop = exports.isFunction = exports.isUndefined = exports.isString = exports.forEach = exports.last = exports.first = exports.flatten = exports.map = exports.mapValues = exports.values = exports.keys = exports.isEmpty = void 0;
    exports.upperFirst = void 0;
    function isEmpty(arr) {
      return arr && arr.length === 0;
    }
    exports.isEmpty = isEmpty;
    function keys(obj) {
      if (obj === void 0 || obj === null) {
        return [];
      }
      return Object.keys(obj);
    }
    exports.keys = keys;
    function values(obj) {
      var vals = [];
      var keys2 = Object.keys(obj);
      for (var i = 0; i < keys2.length; i++) {
        vals.push(obj[keys2[i]]);
      }
      return vals;
    }
    exports.values = values;
    function mapValues(obj, callback) {
      var result = [];
      var objKeys = keys(obj);
      for (var idx = 0; idx < objKeys.length; idx++) {
        var currKey = objKeys[idx];
        result.push(callback.call(null, obj[currKey], currKey));
      }
      return result;
    }
    exports.mapValues = mapValues;
    function map(arr, callback) {
      var result = [];
      for (var idx = 0; idx < arr.length; idx++) {
        result.push(callback.call(null, arr[idx], idx));
      }
      return result;
    }
    exports.map = map;
    function flatten(arr) {
      var result = [];
      for (var idx = 0; idx < arr.length; idx++) {
        var currItem = arr[idx];
        if (Array.isArray(currItem)) {
          result = result.concat(flatten(currItem));
        } else {
          result.push(currItem);
        }
      }
      return result;
    }
    exports.flatten = flatten;
    function first(arr) {
      return isEmpty(arr) ? void 0 : arr[0];
    }
    exports.first = first;
    function last(arr) {
      var len = arr && arr.length;
      return len ? arr[len - 1] : void 0;
    }
    exports.last = last;
    function forEach(collection, iteratorCallback) {
      if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
          iteratorCallback.call(null, collection[i], i);
        }
      } else if (isObject(collection)) {
        var colKeys = keys(collection);
        for (var i = 0; i < colKeys.length; i++) {
          var key = colKeys[i];
          var value = collection[key];
          iteratorCallback.call(null, value, key);
        }
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports.forEach = forEach;
    function isString(item) {
      return typeof item === "string";
    }
    exports.isString = isString;
    function isUndefined(item) {
      return item === void 0;
    }
    exports.isUndefined = isUndefined;
    function isFunction(item) {
      return item instanceof Function;
    }
    exports.isFunction = isFunction;
    function drop(arr, howMuch) {
      if (howMuch === void 0) {
        howMuch = 1;
      }
      return arr.slice(howMuch, arr.length);
    }
    exports.drop = drop;
    function dropRight(arr, howMuch) {
      if (howMuch === void 0) {
        howMuch = 1;
      }
      return arr.slice(0, arr.length - howMuch);
    }
    exports.dropRight = dropRight;
    function filter(arr, predicate) {
      var result = [];
      if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          if (predicate.call(null, item)) {
            result.push(item);
          }
        }
      }
      return result;
    }
    exports.filter = filter;
    function reject(arr, predicate) {
      return filter(arr, function(item) {
        return !predicate(item);
      });
    }
    exports.reject = reject;
    function pick(obj, predicate) {
      var keys2 = Object.keys(obj);
      var result = {};
      for (var i = 0; i < keys2.length; i++) {
        var currKey = keys2[i];
        var currItem = obj[currKey];
        if (predicate(currItem)) {
          result[currKey] = currItem;
        }
      }
      return result;
    }
    exports.pick = pick;
    function has(obj, prop) {
      if (isObject(obj)) {
        return obj.hasOwnProperty(prop);
      }
      return false;
    }
    exports.has = has;
    function contains(arr, item) {
      return find(arr, function(currItem) {
        return currItem === item;
      }) !== void 0 ? true : false;
    }
    exports.contains = contains;
    function cloneArr(arr) {
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
      }
      return newArr;
    }
    exports.cloneArr = cloneArr;
    function cloneObj(obj) {
      var clonedObj = {};
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          clonedObj[key] = obj[key];
        }
      }
      return clonedObj;
    }
    exports.cloneObj = cloneObj;
    function find(arr, predicate) {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate.call(null, item)) {
          return item;
        }
      }
      return void 0;
    }
    exports.find = find;
    function findAll(arr, predicate) {
      var found = [];
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate.call(null, item)) {
          found.push(item);
        }
      }
      return found;
    }
    exports.findAll = findAll;
    function reduce(arrOrObj, iterator, initial) {
      var isArr = Array.isArray(arrOrObj);
      var vals = isArr ? arrOrObj : values(arrOrObj);
      var objKeys = isArr ? [] : keys(arrOrObj);
      var accumulator = initial;
      for (var i = 0; i < vals.length; i++) {
        accumulator = iterator.call(null, accumulator, vals[i], isArr ? i : objKeys[i]);
      }
      return accumulator;
    }
    exports.reduce = reduce;
    function compact(arr) {
      return reject(arr, function(item) {
        return item === null || item === void 0;
      });
    }
    exports.compact = compact;
    function uniq(arr, identity) {
      if (identity === void 0) {
        identity = function(item) {
          return item;
        };
      }
      var identities = [];
      return reduce(arr, function(result, currItem) {
        var currIdentity = identity(currItem);
        if (contains(identities, currIdentity)) {
          return result;
        } else {
          identities.push(currIdentity);
          return result.concat(currItem);
        }
      }, []);
    }
    exports.uniq = uniq;
    function partial(func) {
      var restArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        restArgs[_i - 1] = arguments[_i];
      }
      var firstArg = [null];
      var allArgs = firstArg.concat(restArgs);
      return Function.bind.apply(func, allArgs);
    }
    exports.partial = partial;
    function isArray(obj) {
      return Array.isArray(obj);
    }
    exports.isArray = isArray;
    function isRegExp(obj) {
      return obj instanceof RegExp;
    }
    exports.isRegExp = isRegExp;
    function isObject(obj) {
      return obj instanceof Object;
    }
    exports.isObject = isObject;
    function every(arr, predicate) {
      for (var i = 0; i < arr.length; i++) {
        if (!predicate(arr[i], i)) {
          return false;
        }
      }
      return true;
    }
    exports.every = every;
    function difference(arr, values2) {
      return reject(arr, function(item) {
        return contains(values2, item);
      });
    }
    exports.difference = difference;
    function some(arr, predicate) {
      for (var i = 0; i < arr.length; i++) {
        if (predicate(arr[i])) {
          return true;
        }
      }
      return false;
    }
    exports.some = some;
    function indexOf(arr, value) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
          return i;
        }
      }
      return -1;
    }
    exports.indexOf = indexOf;
    function sortBy(arr, orderFunc) {
      var result = cloneArr(arr);
      result.sort(function(a, b) {
        return orderFunc(a) - orderFunc(b);
      });
      return result;
    }
    exports.sortBy = sortBy;
    function zipObject(keys2, values2) {
      if (keys2.length !== values2.length) {
        throw Error("can't zipObject with different number of keys and values!");
      }
      var result = {};
      for (var i = 0; i < keys2.length; i++) {
        result[keys2[i]] = values2[i];
      }
      return result;
    }
    exports.zipObject = zipObject;
    function assign(target) {
      var sources = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
      }
      for (var i = 0; i < sources.length; i++) {
        var curSource = sources[i];
        var currSourceKeys = keys(curSource);
        for (var j = 0; j < currSourceKeys.length; j++) {
          var currKey = currSourceKeys[j];
          target[currKey] = curSource[currKey];
        }
      }
      return target;
    }
    exports.assign = assign;
    function assignNoOverwrite(target) {
      var sources = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
      }
      for (var i = 0; i < sources.length; i++) {
        var curSource = sources[i];
        var currSourceKeys = keys(curSource);
        for (var j = 0; j < currSourceKeys.length; j++) {
          var currKey = currSourceKeys[j];
          if (!has(target, currKey)) {
            target[currKey] = curSource[currKey];
          }
        }
      }
      return target;
    }
    exports.assignNoOverwrite = assignNoOverwrite;
    function defaults() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      return assignNoOverwrite.apply(void 0, __spreadArray([{}], sources));
    }
    exports.defaults = defaults;
    function groupBy(arr, groupKeyFunc) {
      var result = {};
      forEach(arr, function(item) {
        var currGroupKey = groupKeyFunc(item);
        var currGroupArr = result[currGroupKey];
        if (currGroupArr) {
          currGroupArr.push(item);
        } else {
          result[currGroupKey] = [item];
        }
      });
      return result;
    }
    exports.groupBy = groupBy;
    function merge(obj1, obj2) {
      var result = cloneObj(obj1);
      var keys2 = keys(obj2);
      for (var i = 0; i < keys2.length; i++) {
        var key = keys2[i];
        var value = obj2[key];
        result[key] = value;
      }
      return result;
    }
    exports.merge = merge;
    function NOOP() {
    }
    exports.NOOP = NOOP;
    function IDENTITY(item) {
      return item;
    }
    exports.IDENTITY = IDENTITY;
    function packArray(holeyArr) {
      var result = [];
      for (var i = 0; i < holeyArr.length; i++) {
        var orgValue = holeyArr[i];
        result.push(orgValue !== void 0 ? orgValue : void 0);
      }
      return result;
    }
    exports.packArray = packArray;
    function PRINT_ERROR(msg) {
      if (console && console.error) {
        console.error("Error: " + msg);
      }
    }
    exports.PRINT_ERROR = PRINT_ERROR;
    function PRINT_WARNING(msg) {
      if (console && console.warn) {
        console.warn("Warning: " + msg);
      }
    }
    exports.PRINT_WARNING = PRINT_WARNING;
    function isES2015MapSupported() {
      return typeof Map === "function";
    }
    exports.isES2015MapSupported = isES2015MapSupported;
    function peek(arr) {
      return arr[arr.length - 1];
    }
    exports.peek = peek;
    function timer(func) {
      var start = new Date().getTime();
      var val = func();
      var end = new Date().getTime();
      var total = end - start;
      return { time: total, value: val };
    }
    exports.timer = timer;
    function toFastProperties(toBecomeFast) {
      function FakeConstructor() {
      }
      FakeConstructor.prototype = toBecomeFast;
      var fakeInstance = new FakeConstructor();
      function fakeAccess() {
        return typeof fakeInstance.bar;
      }
      fakeAccess();
      fakeAccess();
      return toBecomeFast;
      eval(toBecomeFast);
    }
    exports.toFastProperties = toFastProperties;
    function upperFirst(str) {
      if (!str) {
        return str;
      }
      var firstChar = getCharacterFromCodePointAt(str, 0);
      return firstChar.toUpperCase() + str.substring(firstChar.length);
    }
    exports.upperFirst = upperFirst;
    var surrogatePairPattern = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
    function getCharacterFromCodePointAt(str, idx) {
      var surrogatePairCandidate = str.substring(idx, idx + 1);
      return surrogatePairPattern.test(surrogatePairCandidate) ? surrogatePairCandidate : str[idx];
    }
  }
});

// ../../node_modules/regexp-to-ast/lib/regexp-to-ast.js
var require_regexp_to_ast = __commonJS({
  "../../node_modules/regexp-to-ast/lib/regexp-to-ast.js"(exports2, module2) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory);
      } else if (typeof module2 === "object" && module2.exports) {
        module2.exports = factory();
      } else {
        root.regexpToAst = factory();
      }
    })(typeof self !== "undefined" ? self : exports2, function() {
      function RegExpParser() {
      }
      RegExpParser.prototype.saveState = function() {
        return {
          idx: this.idx,
          input: this.input,
          groupIdx: this.groupIdx
        };
      };
      RegExpParser.prototype.restoreState = function(newState) {
        this.idx = newState.idx;
        this.input = newState.input;
        this.groupIdx = newState.groupIdx;
      };
      RegExpParser.prototype.pattern = function(input) {
        this.idx = 0;
        this.input = input;
        this.groupIdx = 0;
        this.consumeChar("/");
        var value = this.disjunction();
        this.consumeChar("/");
        var flags = {
          type: "Flags",
          loc: { begin: this.idx, end: input.length },
          global: false,
          ignoreCase: false,
          multiLine: false,
          unicode: false,
          sticky: false
        };
        while (this.isRegExpFlag()) {
          switch (this.popChar()) {
            case "g":
              addFlag(flags, "global");
              break;
            case "i":
              addFlag(flags, "ignoreCase");
              break;
            case "m":
              addFlag(flags, "multiLine");
              break;
            case "u":
              addFlag(flags, "unicode");
              break;
            case "y":
              addFlag(flags, "sticky");
              break;
          }
        }
        if (this.idx !== this.input.length) {
          throw Error("Redundant input: " + this.input.substring(this.idx));
        }
        return {
          type: "Pattern",
          flags,
          value,
          loc: this.loc(0)
        };
      };
      RegExpParser.prototype.disjunction = function() {
        var alts = [];
        var begin = this.idx;
        alts.push(this.alternative());
        while (this.peekChar() === "|") {
          this.consumeChar("|");
          alts.push(this.alternative());
        }
        return { type: "Disjunction", value: alts, loc: this.loc(begin) };
      };
      RegExpParser.prototype.alternative = function() {
        var terms = [];
        var begin = this.idx;
        while (this.isTerm()) {
          terms.push(this.term());
        }
        return { type: "Alternative", value: terms, loc: this.loc(begin) };
      };
      RegExpParser.prototype.term = function() {
        if (this.isAssertion()) {
          return this.assertion();
        } else {
          return this.atom();
        }
      };
      RegExpParser.prototype.assertion = function() {
        var begin = this.idx;
        switch (this.popChar()) {
          case "^":
            return {
              type: "StartAnchor",
              loc: this.loc(begin)
            };
          case "$":
            return { type: "EndAnchor", loc: this.loc(begin) };
          case "\\":
            switch (this.popChar()) {
              case "b":
                return {
                  type: "WordBoundary",
                  loc: this.loc(begin)
                };
              case "B":
                return {
                  type: "NonWordBoundary",
                  loc: this.loc(begin)
                };
            }
            throw Error("Invalid Assertion Escape");
          case "(":
            this.consumeChar("?");
            var type;
            switch (this.popChar()) {
              case "=":
                type = "Lookahead";
                break;
              case "!":
                type = "NegativeLookahead";
                break;
            }
            ASSERT_EXISTS(type);
            var disjunction = this.disjunction();
            this.consumeChar(")");
            return {
              type,
              value: disjunction,
              loc: this.loc(begin)
            };
        }
        ASSERT_NEVER_REACH_HERE();
      };
      RegExpParser.prototype.quantifier = function(isBacktracking) {
        var range;
        var begin = this.idx;
        switch (this.popChar()) {
          case "*":
            range = {
              atLeast: 0,
              atMost: Infinity
            };
            break;
          case "+":
            range = {
              atLeast: 1,
              atMost: Infinity
            };
            break;
          case "?":
            range = {
              atLeast: 0,
              atMost: 1
            };
            break;
          case "{":
            var atLeast = this.integerIncludingZero();
            switch (this.popChar()) {
              case "}":
                range = {
                  atLeast,
                  atMost: atLeast
                };
                break;
              case ",":
                var atMost;
                if (this.isDigit()) {
                  atMost = this.integerIncludingZero();
                  range = {
                    atLeast,
                    atMost
                  };
                } else {
                  range = {
                    atLeast,
                    atMost: Infinity
                  };
                }
                this.consumeChar("}");
                break;
            }
            if (isBacktracking === true && range === void 0) {
              return void 0;
            }
            ASSERT_EXISTS(range);
            break;
        }
        if (isBacktracking === true && range === void 0) {
          return void 0;
        }
        ASSERT_EXISTS(range);
        if (this.peekChar(0) === "?") {
          this.consumeChar("?");
          range.greedy = false;
        } else {
          range.greedy = true;
        }
        range.type = "Quantifier";
        range.loc = this.loc(begin);
        return range;
      };
      RegExpParser.prototype.atom = function() {
        var atom;
        var begin = this.idx;
        switch (this.peekChar()) {
          case ".":
            atom = this.dotAll();
            break;
          case "\\":
            atom = this.atomEscape();
            break;
          case "[":
            atom = this.characterClass();
            break;
          case "(":
            atom = this.group();
            break;
        }
        if (atom === void 0 && this.isPatternCharacter()) {
          atom = this.patternCharacter();
        }
        ASSERT_EXISTS(atom);
        atom.loc = this.loc(begin);
        if (this.isQuantifier()) {
          atom.quantifier = this.quantifier();
        }
        return atom;
      };
      RegExpParser.prototype.dotAll = function() {
        this.consumeChar(".");
        return {
          type: "Set",
          complement: true,
          value: [cc("\n"), cc("\r"), cc("\u2028"), cc("\u2029")]
        };
      };
      RegExpParser.prototype.atomEscape = function() {
        this.consumeChar("\\");
        switch (this.peekChar()) {
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            return this.decimalEscapeAtom();
          case "d":
          case "D":
          case "s":
          case "S":
          case "w":
          case "W":
            return this.characterClassEscape();
          case "f":
          case "n":
          case "r":
          case "t":
          case "v":
            return this.controlEscapeAtom();
          case "c":
            return this.controlLetterEscapeAtom();
          case "0":
            return this.nulCharacterAtom();
          case "x":
            return this.hexEscapeSequenceAtom();
          case "u":
            return this.regExpUnicodeEscapeSequenceAtom();
          default:
            return this.identityEscapeAtom();
        }
      };
      RegExpParser.prototype.decimalEscapeAtom = function() {
        var value = this.positiveInteger();
        return { type: "GroupBackReference", value };
      };
      RegExpParser.prototype.characterClassEscape = function() {
        var set;
        var complement = false;
        switch (this.popChar()) {
          case "d":
            set = digitsCharCodes;
            break;
          case "D":
            set = digitsCharCodes;
            complement = true;
            break;
          case "s":
            set = whitespaceCodes;
            break;
          case "S":
            set = whitespaceCodes;
            complement = true;
            break;
          case "w":
            set = wordCharCodes;
            break;
          case "W":
            set = wordCharCodes;
            complement = true;
            break;
        }
        ASSERT_EXISTS(set);
        return { type: "Set", value: set, complement };
      };
      RegExpParser.prototype.controlEscapeAtom = function() {
        var escapeCode;
        switch (this.popChar()) {
          case "f":
            escapeCode = cc("\f");
            break;
          case "n":
            escapeCode = cc("\n");
            break;
          case "r":
            escapeCode = cc("\r");
            break;
          case "t":
            escapeCode = cc("	");
            break;
          case "v":
            escapeCode = cc("\v");
            break;
        }
        ASSERT_EXISTS(escapeCode);
        return { type: "Character", value: escapeCode };
      };
      RegExpParser.prototype.controlLetterEscapeAtom = function() {
        this.consumeChar("c");
        var letter = this.popChar();
        if (/[a-zA-Z]/.test(letter) === false) {
          throw Error("Invalid ");
        }
        var letterCode = letter.toUpperCase().charCodeAt(0) - 64;
        return { type: "Character", value: letterCode };
      };
      RegExpParser.prototype.nulCharacterAtom = function() {
        this.consumeChar("0");
        return { type: "Character", value: cc("\0") };
      };
      RegExpParser.prototype.hexEscapeSequenceAtom = function() {
        this.consumeChar("x");
        return this.parseHexDigits(2);
      };
      RegExpParser.prototype.regExpUnicodeEscapeSequenceAtom = function() {
        this.consumeChar("u");
        return this.parseHexDigits(4);
      };
      RegExpParser.prototype.identityEscapeAtom = function() {
        var escapedChar = this.popChar();
        return { type: "Character", value: cc(escapedChar) };
      };
      RegExpParser.prototype.classPatternCharacterAtom = function() {
        switch (this.peekChar()) {
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
          case "\\":
          case "]":
            throw Error("TBD");
          default:
            var nextChar = this.popChar();
            return { type: "Character", value: cc(nextChar) };
        }
      };
      RegExpParser.prototype.characterClass = function() {
        var set = [];
        var complement = false;
        this.consumeChar("[");
        if (this.peekChar(0) === "^") {
          this.consumeChar("^");
          complement = true;
        }
        while (this.isClassAtom()) {
          var from = this.classAtom();
          var isFromSingleChar = from.type === "Character";
          if (isFromSingleChar && this.isRangeDash()) {
            this.consumeChar("-");
            var to = this.classAtom();
            var isToSingleChar = to.type === "Character";
            if (isToSingleChar) {
              if (to.value < from.value) {
                throw Error("Range out of order in character class");
              }
              set.push({ from: from.value, to: to.value });
            } else {
              insertToSet(from.value, set);
              set.push(cc("-"));
              insertToSet(to.value, set);
            }
          } else {
            insertToSet(from.value, set);
          }
        }
        this.consumeChar("]");
        return { type: "Set", complement, value: set };
      };
      RegExpParser.prototype.classAtom = function() {
        switch (this.peekChar()) {
          case "]":
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
            throw Error("TBD");
          case "\\":
            return this.classEscape();
          default:
            return this.classPatternCharacterAtom();
        }
      };
      RegExpParser.prototype.classEscape = function() {
        this.consumeChar("\\");
        switch (this.peekChar()) {
          case "b":
            this.consumeChar("b");
            return { type: "Character", value: cc("\b") };
          case "d":
          case "D":
          case "s":
          case "S":
          case "w":
          case "W":
            return this.characterClassEscape();
          case "f":
          case "n":
          case "r":
          case "t":
          case "v":
            return this.controlEscapeAtom();
          case "c":
            return this.controlLetterEscapeAtom();
          case "0":
            return this.nulCharacterAtom();
          case "x":
            return this.hexEscapeSequenceAtom();
          case "u":
            return this.regExpUnicodeEscapeSequenceAtom();
          default:
            return this.identityEscapeAtom();
        }
      };
      RegExpParser.prototype.group = function() {
        var capturing = true;
        this.consumeChar("(");
        switch (this.peekChar(0)) {
          case "?":
            this.consumeChar("?");
            this.consumeChar(":");
            capturing = false;
            break;
          default:
            this.groupIdx++;
            break;
        }
        var value = this.disjunction();
        this.consumeChar(")");
        var groupAst = {
          type: "Group",
          capturing,
          value
        };
        if (capturing) {
          groupAst.idx = this.groupIdx;
        }
        return groupAst;
      };
      RegExpParser.prototype.positiveInteger = function() {
        var number = this.popChar();
        if (decimalPatternNoZero.test(number) === false) {
          throw Error("Expecting a positive integer");
        }
        while (decimalPattern.test(this.peekChar(0))) {
          number += this.popChar();
        }
        return parseInt(number, 10);
      };
      RegExpParser.prototype.integerIncludingZero = function() {
        var number = this.popChar();
        if (decimalPattern.test(number) === false) {
          throw Error("Expecting an integer");
        }
        while (decimalPattern.test(this.peekChar(0))) {
          number += this.popChar();
        }
        return parseInt(number, 10);
      };
      RegExpParser.prototype.patternCharacter = function() {
        var nextChar = this.popChar();
        switch (nextChar) {
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
          case "^":
          case "$":
          case "\\":
          case ".":
          case "*":
          case "+":
          case "?":
          case "(":
          case ")":
          case "[":
          case "|":
            throw Error("TBD");
          default:
            return { type: "Character", value: cc(nextChar) };
        }
      };
      RegExpParser.prototype.isRegExpFlag = function() {
        switch (this.peekChar(0)) {
          case "g":
          case "i":
          case "m":
          case "u":
          case "y":
            return true;
          default:
            return false;
        }
      };
      RegExpParser.prototype.isRangeDash = function() {
        return this.peekChar() === "-" && this.isClassAtom(1);
      };
      RegExpParser.prototype.isDigit = function() {
        return decimalPattern.test(this.peekChar(0));
      };
      RegExpParser.prototype.isClassAtom = function(howMuch) {
        if (howMuch === void 0) {
          howMuch = 0;
        }
        switch (this.peekChar(howMuch)) {
          case "]":
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
            return false;
          default:
            return true;
        }
      };
      RegExpParser.prototype.isTerm = function() {
        return this.isAtom() || this.isAssertion();
      };
      RegExpParser.prototype.isAtom = function() {
        if (this.isPatternCharacter()) {
          return true;
        }
        switch (this.peekChar(0)) {
          case ".":
          case "\\":
          case "[":
          case "(":
            return true;
          default:
            return false;
        }
      };
      RegExpParser.prototype.isAssertion = function() {
        switch (this.peekChar(0)) {
          case "^":
          case "$":
            return true;
          case "\\":
            switch (this.peekChar(1)) {
              case "b":
              case "B":
                return true;
              default:
                return false;
            }
          case "(":
            return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!");
          default:
            return false;
        }
      };
      RegExpParser.prototype.isQuantifier = function() {
        var prevState = this.saveState();
        try {
          return this.quantifier(true) !== void 0;
        } catch (e) {
          return false;
        } finally {
          this.restoreState(prevState);
        }
      };
      RegExpParser.prototype.isPatternCharacter = function() {
        switch (this.peekChar()) {
          case "^":
          case "$":
          case "\\":
          case ".":
          case "*":
          case "+":
          case "?":
          case "(":
          case ")":
          case "[":
          case "|":
          case "/":
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
            return false;
          default:
            return true;
        }
      };
      RegExpParser.prototype.parseHexDigits = function(howMany) {
        var hexString = "";
        for (var i2 = 0; i2 < howMany; i2++) {
          var hexChar = this.popChar();
          if (hexDigitPattern.test(hexChar) === false) {
            throw Error("Expecting a HexDecimal digits");
          }
          hexString += hexChar;
        }
        var charCode = parseInt(hexString, 16);
        return { type: "Character", value: charCode };
      };
      RegExpParser.prototype.peekChar = function(howMuch) {
        if (howMuch === void 0) {
          howMuch = 0;
        }
        return this.input[this.idx + howMuch];
      };
      RegExpParser.prototype.popChar = function() {
        var nextChar = this.peekChar(0);
        this.consumeChar();
        return nextChar;
      };
      RegExpParser.prototype.consumeChar = function(char) {
        if (char !== void 0 && this.input[this.idx] !== char) {
          throw Error("Expected: '" + char + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
        }
        if (this.idx >= this.input.length) {
          throw Error("Unexpected end of input");
        }
        this.idx++;
      };
      RegExpParser.prototype.loc = function(begin) {
        return { begin, end: this.idx };
      };
      var hexDigitPattern = /[0-9a-fA-F]/;
      var decimalPattern = /[0-9]/;
      var decimalPatternNoZero = /[1-9]/;
      function cc(char) {
        return char.charCodeAt(0);
      }
      function insertToSet(item, set) {
        if (item.length !== void 0) {
          item.forEach(function(subItem) {
            set.push(subItem);
          });
        } else {
          set.push(item);
        }
      }
      function addFlag(flagObj, flagKey) {
        if (flagObj[flagKey] === true) {
          throw "duplicate flag " + flagKey;
        }
        flagObj[flagKey] = true;
      }
      function ASSERT_EXISTS(obj) {
        if (obj === void 0) {
          throw Error("Internal Error - Should never get here!");
        }
      }
      function ASSERT_NEVER_REACH_HERE() {
        throw Error("Internal Error - Should never get here!");
      }
      var i;
      var digitsCharCodes = [];
      for (i = cc("0"); i <= cc("9"); i++) {
        digitsCharCodes.push(i);
      }
      var wordCharCodes = [cc("_")].concat(digitsCharCodes);
      for (i = cc("a"); i <= cc("z"); i++) {
        wordCharCodes.push(i);
      }
      for (i = cc("A"); i <= cc("Z"); i++) {
        wordCharCodes.push(i);
      }
      var whitespaceCodes = [
        cc(" "),
        cc("\f"),
        cc("\n"),
        cc("\r"),
        cc("	"),
        cc("\v"),
        cc("	"),
        cc("\xA0"),
        cc("\u1680"),
        cc("\u2000"),
        cc("\u2001"),
        cc("\u2002"),
        cc("\u2003"),
        cc("\u2004"),
        cc("\u2005"),
        cc("\u2006"),
        cc("\u2007"),
        cc("\u2008"),
        cc("\u2009"),
        cc("\u200A"),
        cc("\u2028"),
        cc("\u2029"),
        cc("\u202F"),
        cc("\u205F"),
        cc("\u3000"),
        cc("\uFEFF")
      ];
      function BaseRegExpVisitor() {
      }
      BaseRegExpVisitor.prototype.visitChildren = function(node) {
        for (var key in node) {
          var child = node[key];
          if (node.hasOwnProperty(key)) {
            if (child.type !== void 0) {
              this.visit(child);
            } else if (Array.isArray(child)) {
              child.forEach(function(subChild) {
                this.visit(subChild);
              }, this);
            }
          }
        }
      };
      BaseRegExpVisitor.prototype.visit = function(node) {
        switch (node.type) {
          case "Pattern":
            this.visitPattern(node);
            break;
          case "Flags":
            this.visitFlags(node);
            break;
          case "Disjunction":
            this.visitDisjunction(node);
            break;
          case "Alternative":
            this.visitAlternative(node);
            break;
          case "StartAnchor":
            this.visitStartAnchor(node);
            break;
          case "EndAnchor":
            this.visitEndAnchor(node);
            break;
          case "WordBoundary":
            this.visitWordBoundary(node);
            break;
          case "NonWordBoundary":
            this.visitNonWordBoundary(node);
            break;
          case "Lookahead":
            this.visitLookahead(node);
            break;
          case "NegativeLookahead":
            this.visitNegativeLookahead(node);
            break;
          case "Character":
            this.visitCharacter(node);
            break;
          case "Set":
            this.visitSet(node);
            break;
          case "Group":
            this.visitGroup(node);
            break;
          case "GroupBackReference":
            this.visitGroupBackReference(node);
            break;
          case "Quantifier":
            this.visitQuantifier(node);
            break;
        }
        this.visitChildren(node);
      };
      BaseRegExpVisitor.prototype.visitPattern = function(node) {
      };
      BaseRegExpVisitor.prototype.visitFlags = function(node) {
      };
      BaseRegExpVisitor.prototype.visitDisjunction = function(node) {
      };
      BaseRegExpVisitor.prototype.visitAlternative = function(node) {
      };
      BaseRegExpVisitor.prototype.visitStartAnchor = function(node) {
      };
      BaseRegExpVisitor.prototype.visitEndAnchor = function(node) {
      };
      BaseRegExpVisitor.prototype.visitWordBoundary = function(node) {
      };
      BaseRegExpVisitor.prototype.visitNonWordBoundary = function(node) {
      };
      BaseRegExpVisitor.prototype.visitLookahead = function(node) {
      };
      BaseRegExpVisitor.prototype.visitNegativeLookahead = function(node) {
      };
      BaseRegExpVisitor.prototype.visitCharacter = function(node) {
      };
      BaseRegExpVisitor.prototype.visitSet = function(node) {
      };
      BaseRegExpVisitor.prototype.visitGroup = function(node) {
      };
      BaseRegExpVisitor.prototype.visitGroupBackReference = function(node) {
      };
      BaseRegExpVisitor.prototype.visitQuantifier = function(node) {
      };
      return {
        RegExpParser,
        BaseRegExpVisitor,
        VERSION: "0.5.0"
      };
    });
  }
});

// lib/src/scan/reg_exp_parser.js
var require_reg_exp_parser = __commonJS({
  "lib/src/scan/reg_exp_parser.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.clearRegExpParserCache = exports2.getRegExpAst = void 0;
    var regexp_to_ast_1 = require_regexp_to_ast();
    var regExpAstCache = {};
    var regExpParser = new regexp_to_ast_1.RegExpParser();
    function getRegExpAst(regExp) {
      var regExpStr = regExp.toString();
      if (regExpAstCache.hasOwnProperty(regExpStr)) {
        return regExpAstCache[regExpStr];
      } else {
        var regExpAst = regExpParser.pattern(regExpStr);
        regExpAstCache[regExpStr] = regExpAst;
        return regExpAst;
      }
    }
    exports2.getRegExpAst = getRegExpAst;
    function clearRegExpParserCache() {
      regExpAstCache = {};
    }
    exports2.clearRegExpParserCache = clearRegExpParserCache;
  }
});

// lib/src/scan/reg_exp.js
var require_reg_exp = __commonJS({
  "lib/src/scan/reg_exp.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.canMatchCharCode = exports2.firstCharOptimizedIndices = exports2.getOptimizedStartCodesIndices = exports2.failedOptimizationPrefixMsg = void 0;
    var regexp_to_ast_1 = require_regexp_to_ast();
    var utils_1 = require_api();
    var reg_exp_parser_1 = require_reg_exp_parser();
    var lexer_1 = require_lexer();
    var complementErrorMessage = "Complement Sets are not supported for first char optimization";
    exports2.failedOptimizationPrefixMsg = 'Unable to use "first char" lexer optimizations:\n';
    function getOptimizedStartCodesIndices(regExp, ensureOptimizations) {
      if (ensureOptimizations === void 0) {
        ensureOptimizations = false;
      }
      try {
        var ast = reg_exp_parser_1.getRegExpAst(regExp);
        var firstChars = firstCharOptimizedIndices(ast.value, {}, ast.flags.ignoreCase);
        return firstChars;
      } catch (e) {
        if (e.message === complementErrorMessage) {
          if (ensureOptimizations) {
            utils_1.PRINT_WARNING("" + exports2.failedOptimizationPrefixMsg + ("	Unable to optimize: < " + regExp.toString() + " >\n") + "	Complement Sets cannot be automatically optimized.\n	This will disable the lexer's first char optimizations.\n	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.");
          }
        } else {
          var msgSuffix = "";
          if (ensureOptimizations) {
            msgSuffix = "\n	This will disable the lexer's first char optimizations.\n	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.";
          }
          utils_1.PRINT_ERROR(exports2.failedOptimizationPrefixMsg + "\n" + ("	Failed parsing: < " + regExp.toString() + " >\n") + ("	Using the regexp-to-ast library version: " + regexp_to_ast_1.VERSION + "\n") + "	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues" + msgSuffix);
        }
      }
      return [];
    }
    exports2.getOptimizedStartCodesIndices = getOptimizedStartCodesIndices;
    function firstCharOptimizedIndices(ast, result, ignoreCase) {
      switch (ast.type) {
        case "Disjunction":
          for (var i = 0; i < ast.value.length; i++) {
            firstCharOptimizedIndices(ast.value[i], result, ignoreCase);
          }
          break;
        case "Alternative":
          var terms = ast.value;
          for (var i = 0; i < terms.length; i++) {
            var term = terms[i];
            switch (term.type) {
              case "EndAnchor":
              case "GroupBackReference":
              case "Lookahead":
              case "NegativeLookahead":
              case "StartAnchor":
              case "WordBoundary":
              case "NonWordBoundary":
                continue;
            }
            var atom = term;
            switch (atom.type) {
              case "Character":
                addOptimizedIdxToResult(atom.value, result, ignoreCase);
                break;
              case "Set":
                if (atom.complement === true) {
                  throw Error(complementErrorMessage);
                }
                utils_1.forEach(atom.value, function(code) {
                  if (typeof code === "number") {
                    addOptimizedIdxToResult(code, result, ignoreCase);
                  } else {
                    var range = code;
                    if (ignoreCase === true) {
                      for (var rangeCode = range.from; rangeCode <= range.to; rangeCode++) {
                        addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                      }
                    } else {
                      for (var rangeCode = range.from; rangeCode <= range.to && rangeCode < lexer_1.minOptimizationVal; rangeCode++) {
                        addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                      }
                      if (range.to >= lexer_1.minOptimizationVal) {
                        var minUnOptVal = range.from >= lexer_1.minOptimizationVal ? range.from : lexer_1.minOptimizationVal;
                        var maxUnOptVal = range.to;
                        var minOptIdx = lexer_1.charCodeToOptimizedIndex(minUnOptVal);
                        var maxOptIdx = lexer_1.charCodeToOptimizedIndex(maxUnOptVal);
                        for (var currOptIdx = minOptIdx; currOptIdx <= maxOptIdx; currOptIdx++) {
                          result[currOptIdx] = currOptIdx;
                        }
                      }
                    }
                  }
                });
                break;
              case "Group":
                firstCharOptimizedIndices(atom.value, result, ignoreCase);
                break;
              default:
                throw Error("Non Exhaustive Match");
            }
            var isOptionalQuantifier = atom.quantifier !== void 0 && atom.quantifier.atLeast === 0;
            if (atom.type === "Group" && isWholeOptional(atom) === false || atom.type !== "Group" && isOptionalQuantifier === false) {
              break;
            }
          }
          break;
        default:
          throw Error("non exhaustive match!");
      }
      return utils_1.values(result);
    }
    exports2.firstCharOptimizedIndices = firstCharOptimizedIndices;
    function addOptimizedIdxToResult(code, result, ignoreCase) {
      var optimizedCharIdx = lexer_1.charCodeToOptimizedIndex(code);
      result[optimizedCharIdx] = optimizedCharIdx;
      if (ignoreCase === true) {
        handleIgnoreCase(code, result);
      }
    }
    function handleIgnoreCase(code, result) {
      var char = String.fromCharCode(code);
      var upperChar = char.toUpperCase();
      if (upperChar !== char) {
        var optimizedCharIdx = lexer_1.charCodeToOptimizedIndex(upperChar.charCodeAt(0));
        result[optimizedCharIdx] = optimizedCharIdx;
      } else {
        var lowerChar = char.toLowerCase();
        if (lowerChar !== char) {
          var optimizedCharIdx = lexer_1.charCodeToOptimizedIndex(lowerChar.charCodeAt(0));
          result[optimizedCharIdx] = optimizedCharIdx;
        }
      }
    }
    function findCode(setNode, targetCharCodes) {
      return utils_1.find(setNode.value, function(codeOrRange) {
        if (typeof codeOrRange === "number") {
          return utils_1.contains(targetCharCodes, codeOrRange);
        } else {
          var range_1 = codeOrRange;
          return utils_1.find(targetCharCodes, function(targetCode) {
            return range_1.from <= targetCode && targetCode <= range_1.to;
          }) !== void 0;
        }
      });
    }
    function isWholeOptional(ast) {
      if (ast.quantifier && ast.quantifier.atLeast === 0) {
        return true;
      }
      if (!ast.value) {
        return false;
      }
      return utils_1.isArray(ast.value) ? utils_1.every(ast.value, isWholeOptional) : isWholeOptional(ast.value);
    }
    var CharCodeFinder = function(_super) {
      __extends(CharCodeFinder2, _super);
      function CharCodeFinder2(targetCharCodes) {
        var _this = _super.call(this) || this;
        _this.targetCharCodes = targetCharCodes;
        _this.found = false;
        return _this;
      }
      CharCodeFinder2.prototype.visitChildren = function(node) {
        if (this.found === true) {
          return;
        }
        switch (node.type) {
          case "Lookahead":
            this.visitLookahead(node);
            return;
          case "NegativeLookahead":
            this.visitNegativeLookahead(node);
            return;
        }
        _super.prototype.visitChildren.call(this, node);
      };
      CharCodeFinder2.prototype.visitCharacter = function(node) {
        if (utils_1.contains(this.targetCharCodes, node.value)) {
          this.found = true;
        }
      };
      CharCodeFinder2.prototype.visitSet = function(node) {
        if (node.complement) {
          if (findCode(node, this.targetCharCodes) === void 0) {
            this.found = true;
          }
        } else {
          if (findCode(node, this.targetCharCodes) !== void 0) {
            this.found = true;
          }
        }
      };
      return CharCodeFinder2;
    }(regexp_to_ast_1.BaseRegExpVisitor);
    function canMatchCharCode(charCodes, pattern) {
      if (pattern instanceof RegExp) {
        var ast = reg_exp_parser_1.getRegExpAst(pattern);
        var charCodeFinder = new CharCodeFinder(charCodes);
        charCodeFinder.visit(ast);
        return charCodeFinder.found;
      } else {
        return utils_1.find(pattern, function(char) {
          return utils_1.contains(charCodes, char.charCodeAt(0));
        }) !== void 0;
      }
    }
    exports2.canMatchCharCode = canMatchCharCode;
  }
});

// lib/src/scan/lexer.js
var require_lexer = __commonJS({
  "lib/src/scan/lexer.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.charCodeToOptimizedIndex = exports2.minOptimizationVal = exports2.buildLineBreakIssueMessage = exports2.LineTerminatorOptimizedTester = exports2.isShortPattern = exports2.isCustomPattern = exports2.cloneEmptyGroups = exports2.performWarningRuntimeChecks = exports2.performRuntimeChecks = exports2.addStickyFlag = exports2.addStartOfInput = exports2.findUnreachablePatterns = exports2.findModesThatDoNotExist = exports2.findInvalidGroupType = exports2.findDuplicatePatterns = exports2.findUnsupportedFlags = exports2.findStartOfInputAnchor = exports2.findEmptyMatchRegExps = exports2.findEndOfInputAnchor = exports2.findInvalidPatterns = exports2.findMissingPatterns = exports2.validatePatterns = exports2.analyzeTokenTypes = exports2.enableSticky = exports2.disableSticky = exports2.SUPPORT_STICKY = exports2.MODES = exports2.DEFAULT_MODE = void 0;
    var regexp_to_ast_1 = require_regexp_to_ast();
    var lexer_public_1 = require_lexer_public();
    var utils_1 = require_api();
    var reg_exp_1 = require_reg_exp();
    var reg_exp_parser_1 = require_reg_exp_parser();
    var PATTERN = "PATTERN";
    exports2.DEFAULT_MODE = "defaultMode";
    exports2.MODES = "modes";
    exports2.SUPPORT_STICKY = typeof new RegExp("(?:)").sticky === "boolean";
    function disableSticky() {
      exports2.SUPPORT_STICKY = false;
    }
    exports2.disableSticky = disableSticky;
    function enableSticky() {
      exports2.SUPPORT_STICKY = true;
    }
    exports2.enableSticky = enableSticky;
    function analyzeTokenTypes(tokenTypes, options) {
      options = utils_1.defaults(options, {
        useSticky: exports2.SUPPORT_STICKY,
        debug: false,
        safeMode: false,
        positionTracking: "full",
        lineTerminatorCharacters: ["\r", "\n"],
        tracer: function(msg, action) {
          return action();
        }
      });
      var tracer = options.tracer;
      tracer("initCharCodeToOptimizedIndexMap", function() {
        initCharCodeToOptimizedIndexMap();
      });
      var onlyRelevantTypes;
      tracer("Reject Lexer.NA", function() {
        onlyRelevantTypes = utils_1.reject(tokenTypes, function(currType) {
          return currType[PATTERN] === lexer_public_1.Lexer.NA;
        });
      });
      var hasCustom = false;
      var allTransformedPatterns;
      tracer("Transform Patterns", function() {
        hasCustom = false;
        allTransformedPatterns = utils_1.map(onlyRelevantTypes, function(currType) {
          var currPattern = currType[PATTERN];
          if (utils_1.isRegExp(currPattern)) {
            var regExpSource = currPattern.source;
            if (regExpSource.length === 1 && regExpSource !== "^" && regExpSource !== "$" && regExpSource !== "." && !currPattern.ignoreCase) {
              return regExpSource;
            } else if (regExpSource.length === 2 && regExpSource[0] === "\\" && !utils_1.contains([
              "d",
              "D",
              "s",
              "S",
              "t",
              "r",
              "n",
              "t",
              "0",
              "c",
              "b",
              "B",
              "f",
              "v",
              "w",
              "W"
            ], regExpSource[1])) {
              return regExpSource[1];
            } else {
              return options.useSticky ? addStickyFlag(currPattern) : addStartOfInput(currPattern);
            }
          } else if (utils_1.isFunction(currPattern)) {
            hasCustom = true;
            return { exec: currPattern };
          } else if (utils_1.has(currPattern, "exec")) {
            hasCustom = true;
            return currPattern;
          } else if (typeof currPattern === "string") {
            if (currPattern.length === 1) {
              return currPattern;
            } else {
              var escapedRegExpString = currPattern.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
              var wrappedRegExp = new RegExp(escapedRegExpString);
              return options.useSticky ? addStickyFlag(wrappedRegExp) : addStartOfInput(wrappedRegExp);
            }
          } else {
            throw Error("non exhaustive match");
          }
        });
      });
      var patternIdxToType;
      var patternIdxToGroup;
      var patternIdxToLongerAltIdx;
      var patternIdxToPushMode;
      var patternIdxToPopMode;
      tracer("misc mapping", function() {
        patternIdxToType = utils_1.map(onlyRelevantTypes, function(currType) {
          return currType.tokenTypeIdx;
        });
        patternIdxToGroup = utils_1.map(onlyRelevantTypes, function(clazz) {
          var groupName = clazz.GROUP;
          if (groupName === lexer_public_1.Lexer.SKIPPED) {
            return void 0;
          } else if (utils_1.isString(groupName)) {
            return groupName;
          } else if (utils_1.isUndefined(groupName)) {
            return false;
          } else {
            throw Error("non exhaustive match");
          }
        });
        patternIdxToLongerAltIdx = utils_1.map(onlyRelevantTypes, function(clazz) {
          var longerAltType = clazz.LONGER_ALT;
          if (longerAltType) {
            var longerAltIdx = utils_1.indexOf(onlyRelevantTypes, longerAltType);
            return longerAltIdx;
          }
        });
        patternIdxToPushMode = utils_1.map(onlyRelevantTypes, function(clazz) {
          return clazz.PUSH_MODE;
        });
        patternIdxToPopMode = utils_1.map(onlyRelevantTypes, function(clazz) {
          return utils_1.has(clazz, "POP_MODE");
        });
      });
      var patternIdxToCanLineTerminator;
      tracer("Line Terminator Handling", function() {
        var lineTerminatorCharCodes = getCharCodes(options.lineTerminatorCharacters);
        patternIdxToCanLineTerminator = utils_1.map(onlyRelevantTypes, function(tokType) {
          return false;
        });
        if (options.positionTracking !== "onlyOffset") {
          patternIdxToCanLineTerminator = utils_1.map(onlyRelevantTypes, function(tokType) {
            if (utils_1.has(tokType, "LINE_BREAKS")) {
              return tokType.LINE_BREAKS;
            } else {
              if (checkLineBreaksIssues(tokType, lineTerminatorCharCodes) === false) {
                return reg_exp_1.canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
              }
            }
          });
        }
      });
      var patternIdxToIsCustom;
      var patternIdxToShort;
      var emptyGroups;
      var patternIdxToConfig;
      tracer("Misc Mapping #2", function() {
        patternIdxToIsCustom = utils_1.map(onlyRelevantTypes, isCustomPattern);
        patternIdxToShort = utils_1.map(allTransformedPatterns, isShortPattern);
        emptyGroups = utils_1.reduce(onlyRelevantTypes, function(acc, clazz) {
          var groupName = clazz.GROUP;
          if (utils_1.isString(groupName) && !(groupName === lexer_public_1.Lexer.SKIPPED)) {
            acc[groupName] = [];
          }
          return acc;
        }, {});
        patternIdxToConfig = utils_1.map(allTransformedPatterns, function(x, idx) {
          return {
            pattern: allTransformedPatterns[idx],
            longerAlt: patternIdxToLongerAltIdx[idx],
            canLineTerminator: patternIdxToCanLineTerminator[idx],
            isCustom: patternIdxToIsCustom[idx],
            short: patternIdxToShort[idx],
            group: patternIdxToGroup[idx],
            push: patternIdxToPushMode[idx],
            pop: patternIdxToPopMode[idx],
            tokenTypeIdx: patternIdxToType[idx],
            tokenType: onlyRelevantTypes[idx]
          };
        });
      });
      var canBeOptimized = true;
      var charCodeToPatternIdxToConfig = [];
      if (!options.safeMode) {
        tracer("First Char Optimization", function() {
          charCodeToPatternIdxToConfig = utils_1.reduce(onlyRelevantTypes, function(result, currTokType, idx) {
            if (typeof currTokType.PATTERN === "string") {
              var charCode = currTokType.PATTERN.charCodeAt(0);
              var optimizedIdx = charCodeToOptimizedIndex(charCode);
              addToMapOfArrays(result, optimizedIdx, patternIdxToConfig[idx]);
            } else if (utils_1.isArray(currTokType.START_CHARS_HINT)) {
              var lastOptimizedIdx_1;
              utils_1.forEach(currTokType.START_CHARS_HINT, function(charOrInt) {
                var charCode2 = typeof charOrInt === "string" ? charOrInt.charCodeAt(0) : charOrInt;
                var currOptimizedIdx = charCodeToOptimizedIndex(charCode2);
                if (lastOptimizedIdx_1 !== currOptimizedIdx) {
                  lastOptimizedIdx_1 = currOptimizedIdx;
                  addToMapOfArrays(result, currOptimizedIdx, patternIdxToConfig[idx]);
                }
              });
            } else if (utils_1.isRegExp(currTokType.PATTERN)) {
              if (currTokType.PATTERN.unicode) {
                canBeOptimized = false;
                if (options.ensureOptimizations) {
                  utils_1.PRINT_ERROR("" + reg_exp_1.failedOptimizationPrefixMsg + ("	Unable to analyze < " + currTokType.PATTERN.toString() + " > pattern.\n") + "	The regexp unicode flag is not currently supported by the regexp-to-ast library.\n	This will disable the lexer's first char optimizations.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE");
                }
              } else {
                var optimizedCodes = reg_exp_1.getOptimizedStartCodesIndices(currTokType.PATTERN, options.ensureOptimizations);
                if (utils_1.isEmpty(optimizedCodes)) {
                  canBeOptimized = false;
                }
                utils_1.forEach(optimizedCodes, function(code) {
                  addToMapOfArrays(result, code, patternIdxToConfig[idx]);
                });
              }
            } else {
              if (options.ensureOptimizations) {
                utils_1.PRINT_ERROR("" + reg_exp_1.failedOptimizationPrefixMsg + ("	TokenType: <" + currTokType.name + "> is using a custom token pattern without providing <start_chars_hint> parameter.\n") + "	This will disable the lexer's first char optimizations.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE");
              }
              canBeOptimized = false;
            }
            return result;
          }, []);
        });
      }
      tracer("ArrayPacking", function() {
        charCodeToPatternIdxToConfig = utils_1.packArray(charCodeToPatternIdxToConfig);
      });
      return {
        emptyGroups,
        patternIdxToConfig,
        charCodeToPatternIdxToConfig,
        hasCustom,
        canBeOptimized
      };
    }
    exports2.analyzeTokenTypes = analyzeTokenTypes;
    function validatePatterns(tokenTypes, validModesNames) {
      var errors = [];
      var missingResult = findMissingPatterns(tokenTypes);
      errors = errors.concat(missingResult.errors);
      var invalidResult = findInvalidPatterns(missingResult.valid);
      var validTokenTypes = invalidResult.valid;
      errors = errors.concat(invalidResult.errors);
      errors = errors.concat(validateRegExpPattern(validTokenTypes));
      errors = errors.concat(findInvalidGroupType(validTokenTypes));
      errors = errors.concat(findModesThatDoNotExist(validTokenTypes, validModesNames));
      errors = errors.concat(findUnreachablePatterns(validTokenTypes));
      return errors;
    }
    exports2.validatePatterns = validatePatterns;
    function validateRegExpPattern(tokenTypes) {
      var errors = [];
      var withRegExpPatterns = utils_1.filter(tokenTypes, function(currTokType) {
        return utils_1.isRegExp(currTokType[PATTERN]);
      });
      errors = errors.concat(findEndOfInputAnchor(withRegExpPatterns));
      errors = errors.concat(findStartOfInputAnchor(withRegExpPatterns));
      errors = errors.concat(findUnsupportedFlags(withRegExpPatterns));
      errors = errors.concat(findDuplicatePatterns(withRegExpPatterns));
      errors = errors.concat(findEmptyMatchRegExps(withRegExpPatterns));
      return errors;
    }
    function findMissingPatterns(tokenTypes) {
      var tokenTypesWithMissingPattern = utils_1.filter(tokenTypes, function(currType) {
        return !utils_1.has(currType, PATTERN);
      });
      var errors = utils_1.map(tokenTypesWithMissingPattern, function(currType) {
        return {
          message: "Token Type: ->" + currType.name + "<- missing static 'PATTERN' property",
          type: lexer_public_1.LexerDefinitionErrorType.MISSING_PATTERN,
          tokenTypes: [currType]
        };
      });
      var valid = utils_1.difference(tokenTypes, tokenTypesWithMissingPattern);
      return { errors, valid };
    }
    exports2.findMissingPatterns = findMissingPatterns;
    function findInvalidPatterns(tokenTypes) {
      var tokenTypesWithInvalidPattern = utils_1.filter(tokenTypes, function(currType) {
        var pattern = currType[PATTERN];
        return !utils_1.isRegExp(pattern) && !utils_1.isFunction(pattern) && !utils_1.has(pattern, "exec") && !utils_1.isString(pattern);
      });
      var errors = utils_1.map(tokenTypesWithInvalidPattern, function(currType) {
        return {
          message: "Token Type: ->" + currType.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
          type: lexer_public_1.LexerDefinitionErrorType.INVALID_PATTERN,
          tokenTypes: [currType]
        };
      });
      var valid = utils_1.difference(tokenTypes, tokenTypesWithInvalidPattern);
      return { errors, valid };
    }
    exports2.findInvalidPatterns = findInvalidPatterns;
    var end_of_input = /[^\\][\$]/;
    function findEndOfInputAnchor(tokenTypes) {
      var EndAnchorFinder = function(_super) {
        __extends(EndAnchorFinder2, _super);
        function EndAnchorFinder2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.found = false;
          return _this;
        }
        EndAnchorFinder2.prototype.visitEndAnchor = function(node) {
          this.found = true;
        };
        return EndAnchorFinder2;
      }(regexp_to_ast_1.BaseRegExpVisitor);
      var invalidRegex = utils_1.filter(tokenTypes, function(currType) {
        var pattern = currType[PATTERN];
        try {
          var regexpAst = reg_exp_parser_1.getRegExpAst(pattern);
          var endAnchorVisitor = new EndAnchorFinder();
          endAnchorVisitor.visit(regexpAst);
          return endAnchorVisitor.found;
        } catch (e) {
          return end_of_input.test(pattern.source);
        }
      });
      var errors = utils_1.map(invalidRegex, function(currType) {
        return {
          message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain end of input anchor '$'\n	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
          type: lexer_public_1.LexerDefinitionErrorType.EOI_ANCHOR_FOUND,
          tokenTypes: [currType]
        };
      });
      return errors;
    }
    exports2.findEndOfInputAnchor = findEndOfInputAnchor;
    function findEmptyMatchRegExps(tokenTypes) {
      var matchesEmptyString = utils_1.filter(tokenTypes, function(currType) {
        var pattern = currType[PATTERN];
        return pattern.test("");
      });
      var errors = utils_1.map(matchesEmptyString, function(currType) {
        return {
          message: "Token Type: ->" + currType.name + "<- static 'PATTERN' must not match an empty string",
          type: lexer_public_1.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,
          tokenTypes: [currType]
        };
      });
      return errors;
    }
    exports2.findEmptyMatchRegExps = findEmptyMatchRegExps;
    var start_of_input = /[^\\[][\^]|^\^/;
    function findStartOfInputAnchor(tokenTypes) {
      var StartAnchorFinder = function(_super) {
        __extends(StartAnchorFinder2, _super);
        function StartAnchorFinder2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.found = false;
          return _this;
        }
        StartAnchorFinder2.prototype.visitStartAnchor = function(node) {
          this.found = true;
        };
        return StartAnchorFinder2;
      }(regexp_to_ast_1.BaseRegExpVisitor);
      var invalidRegex = utils_1.filter(tokenTypes, function(currType) {
        var pattern = currType[PATTERN];
        try {
          var regexpAst = reg_exp_parser_1.getRegExpAst(pattern);
          var startAnchorVisitor = new StartAnchorFinder();
          startAnchorVisitor.visit(regexpAst);
          return startAnchorVisitor.found;
        } catch (e) {
          return start_of_input.test(pattern.source);
        }
      });
      var errors = utils_1.map(invalidRegex, function(currType) {
        return {
          message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain start of input anchor '^'\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
          type: lexer_public_1.LexerDefinitionErrorType.SOI_ANCHOR_FOUND,
          tokenTypes: [currType]
        };
      });
      return errors;
    }
    exports2.findStartOfInputAnchor = findStartOfInputAnchor;
    function findUnsupportedFlags(tokenTypes) {
      var invalidFlags = utils_1.filter(tokenTypes, function(currType) {
        var pattern = currType[PATTERN];
        return pattern instanceof RegExp && (pattern.multiline || pattern.global);
      });
      var errors = utils_1.map(invalidFlags, function(currType) {
        return {
          message: "Token Type: ->" + currType.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
          type: lexer_public_1.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,
          tokenTypes: [currType]
        };
      });
      return errors;
    }
    exports2.findUnsupportedFlags = findUnsupportedFlags;
    function findDuplicatePatterns(tokenTypes) {
      var found = [];
      var identicalPatterns = utils_1.map(tokenTypes, function(outerType) {
        return utils_1.reduce(tokenTypes, function(result, innerType) {
          if (outerType.PATTERN.source === innerType.PATTERN.source && !utils_1.contains(found, innerType) && innerType.PATTERN !== lexer_public_1.Lexer.NA) {
            found.push(innerType);
            result.push(innerType);
            return result;
          }
          return result;
        }, []);
      });
      identicalPatterns = utils_1.compact(identicalPatterns);
      var duplicatePatterns = utils_1.filter(identicalPatterns, function(currIdenticalSet) {
        return currIdenticalSet.length > 1;
      });
      var errors = utils_1.map(duplicatePatterns, function(setOfIdentical) {
        var tokenTypeNames = utils_1.map(setOfIdentical, function(currType) {
          return currType.name;
        });
        var dupPatternSrc = utils_1.first(setOfIdentical).PATTERN;
        return {
          message: "The same RegExp pattern ->" + dupPatternSrc + "<-" + ("has been used in all of the following Token Types: " + tokenTypeNames.join(", ") + " <-"),
          type: lexer_public_1.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,
          tokenTypes: setOfIdentical
        };
      });
      return errors;
    }
    exports2.findDuplicatePatterns = findDuplicatePatterns;
    function findInvalidGroupType(tokenTypes) {
      var invalidTypes = utils_1.filter(tokenTypes, function(clazz) {
        if (!utils_1.has(clazz, "GROUP")) {
          return false;
        }
        var group = clazz.GROUP;
        return group !== lexer_public_1.Lexer.SKIPPED && group !== lexer_public_1.Lexer.NA && !utils_1.isString(group);
      });
      var errors = utils_1.map(invalidTypes, function(currType) {
        return {
          message: "Token Type: ->" + currType.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
          type: lexer_public_1.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,
          tokenTypes: [currType]
        };
      });
      return errors;
    }
    exports2.findInvalidGroupType = findInvalidGroupType;
    function findModesThatDoNotExist(tokenTypes, validModes) {
      var invalidModes = utils_1.filter(tokenTypes, function(clazz) {
        return clazz.PUSH_MODE !== void 0 && !utils_1.contains(validModes, clazz.PUSH_MODE);
      });
      var errors = utils_1.map(invalidModes, function(tokType) {
        var msg = "Token Type: ->" + tokType.name + "<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->" + tokType.PUSH_MODE + "<-which does not exist";
        return {
          message: msg,
          type: lexer_public_1.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,
          tokenTypes: [tokType]
        };
      });
      return errors;
    }
    exports2.findModesThatDoNotExist = findModesThatDoNotExist;
    function findUnreachablePatterns(tokenTypes) {
      var errors = [];
      var canBeTested = utils_1.reduce(tokenTypes, function(result, tokType, idx) {
        var pattern = tokType.PATTERN;
        if (pattern === lexer_public_1.Lexer.NA) {
          return result;
        }
        if (utils_1.isString(pattern)) {
          result.push({ str: pattern, idx, tokenType: tokType });
        } else if (utils_1.isRegExp(pattern) && noMetaChar(pattern)) {
          result.push({ str: pattern.source, idx, tokenType: tokType });
        }
        return result;
      }, []);
      utils_1.forEach(tokenTypes, function(tokType, testIdx) {
        utils_1.forEach(canBeTested, function(_a) {
          var str = _a.str, idx = _a.idx, tokenType = _a.tokenType;
          if (testIdx < idx && testTokenType(str, tokType.PATTERN)) {
            var msg = "Token: ->" + tokenType.name + "<- can never be matched.\n" + ("Because it appears AFTER the Token Type ->" + tokType.name + "<-") + "in the lexer's definition.\nSee https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE";
            errors.push({
              message: msg,
              type: lexer_public_1.LexerDefinitionErrorType.UNREACHABLE_PATTERN,
              tokenTypes: [tokType, tokenType]
            });
          }
        });
      });
      return errors;
    }
    exports2.findUnreachablePatterns = findUnreachablePatterns;
    function testTokenType(str, pattern) {
      if (utils_1.isRegExp(pattern)) {
        var regExpArray = pattern.exec(str);
        return regExpArray !== null && regExpArray.index === 0;
      } else if (utils_1.isFunction(pattern)) {
        return pattern(str, 0, [], {});
      } else if (utils_1.has(pattern, "exec")) {
        return pattern.exec(str, 0, [], {});
      } else if (typeof pattern === "string") {
        return pattern === str;
      } else {
        throw Error("non exhaustive match");
      }
    }
    function noMetaChar(regExp) {
      var metaChars = [
        ".",
        "\\",
        "[",
        "]",
        "|",
        "^",
        "$",
        "(",
        ")",
        "?",
        "*",
        "+",
        "{"
      ];
      return utils_1.find(metaChars, function(char) {
        return regExp.source.indexOf(char) !== -1;
      }) === void 0;
    }
    function addStartOfInput(pattern) {
      var flags = pattern.ignoreCase ? "i" : "";
      return new RegExp("^(?:" + pattern.source + ")", flags);
    }
    exports2.addStartOfInput = addStartOfInput;
    function addStickyFlag(pattern) {
      var flags = pattern.ignoreCase ? "iy" : "y";
      return new RegExp("" + pattern.source, flags);
    }
    exports2.addStickyFlag = addStickyFlag;
    function performRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
      var errors = [];
      if (!utils_1.has(lexerDefinition, exports2.DEFAULT_MODE)) {
        errors.push({
          message: "A MultiMode Lexer cannot be initialized without a <" + exports2.DEFAULT_MODE + "> property in its definition\n",
          type: lexer_public_1.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
        });
      }
      if (!utils_1.has(lexerDefinition, exports2.MODES)) {
        errors.push({
          message: "A MultiMode Lexer cannot be initialized without a <" + exports2.MODES + "> property in its definition\n",
          type: lexer_public_1.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
        });
      }
      if (utils_1.has(lexerDefinition, exports2.MODES) && utils_1.has(lexerDefinition, exports2.DEFAULT_MODE) && !utils_1.has(lexerDefinition.modes, lexerDefinition.defaultMode)) {
        errors.push({
          message: "A MultiMode Lexer cannot be initialized with a " + exports2.DEFAULT_MODE + ": <" + lexerDefinition.defaultMode + ">which does not exist\n",
          type: lexer_public_1.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
        });
      }
      if (utils_1.has(lexerDefinition, exports2.MODES)) {
        utils_1.forEach(lexerDefinition.modes, function(currModeValue, currModeName) {
          utils_1.forEach(currModeValue, function(currTokType, currIdx) {
            if (utils_1.isUndefined(currTokType)) {
              errors.push({
                message: "A Lexer cannot be initialized using an undefined Token Type. Mode:" + ("<" + currModeName + "> at index: <" + currIdx + ">\n"),
                type: lexer_public_1.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
              });
            }
          });
        });
      }
      return errors;
    }
    exports2.performRuntimeChecks = performRuntimeChecks;
    function performWarningRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
      var warnings = [];
      var hasAnyLineBreak = false;
      var allTokenTypes = utils_1.compact(utils_1.flatten(utils_1.mapValues(lexerDefinition.modes, function(tokTypes) {
        return tokTypes;
      })));
      var concreteTokenTypes = utils_1.reject(allTokenTypes, function(currType) {
        return currType[PATTERN] === lexer_public_1.Lexer.NA;
      });
      var terminatorCharCodes = getCharCodes(lineTerminatorCharacters);
      if (trackLines) {
        utils_1.forEach(concreteTokenTypes, function(tokType) {
          var currIssue = checkLineBreaksIssues(tokType, terminatorCharCodes);
          if (currIssue !== false) {
            var message = buildLineBreakIssueMessage(tokType, currIssue);
            var warningDescriptor = {
              message,
              type: currIssue.issue,
              tokenType: tokType
            };
            warnings.push(warningDescriptor);
          } else {
            if (utils_1.has(tokType, "LINE_BREAKS")) {
              if (tokType.LINE_BREAKS === true) {
                hasAnyLineBreak = true;
              }
            } else {
              if (reg_exp_1.canMatchCharCode(terminatorCharCodes, tokType.PATTERN)) {
                hasAnyLineBreak = true;
              }
            }
          }
        });
      }
      if (trackLines && !hasAnyLineBreak) {
        warnings.push({
          message: "Warning: No LINE_BREAKS Found.\n	This Lexer has been defined to track line and column information,\n	But none of the Token Types can be identified as matching a line terminator.\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n	for details.",
          type: lexer_public_1.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
        });
      }
      return warnings;
    }
    exports2.performWarningRuntimeChecks = performWarningRuntimeChecks;
    function cloneEmptyGroups(emptyGroups) {
      var clonedResult = {};
      var groupKeys = utils_1.keys(emptyGroups);
      utils_1.forEach(groupKeys, function(currKey) {
        var currGroupValue = emptyGroups[currKey];
        if (utils_1.isArray(currGroupValue)) {
          clonedResult[currKey] = [];
        } else {
          throw Error("non exhaustive match");
        }
      });
      return clonedResult;
    }
    exports2.cloneEmptyGroups = cloneEmptyGroups;
    function isCustomPattern(tokenType) {
      var pattern = tokenType.PATTERN;
      if (utils_1.isRegExp(pattern)) {
        return false;
      } else if (utils_1.isFunction(pattern)) {
        return true;
      } else if (utils_1.has(pattern, "exec")) {
        return true;
      } else if (utils_1.isString(pattern)) {
        return false;
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports2.isCustomPattern = isCustomPattern;
    function isShortPattern(pattern) {
      if (utils_1.isString(pattern) && pattern.length === 1) {
        return pattern.charCodeAt(0);
      } else {
        return false;
      }
    }
    exports2.isShortPattern = isShortPattern;
    exports2.LineTerminatorOptimizedTester = {
      test: function(text) {
        var len = text.length;
        for (var i = this.lastIndex; i < len; i++) {
          var c = text.charCodeAt(i);
          if (c === 10) {
            this.lastIndex = i + 1;
            return true;
          } else if (c === 13) {
            if (text.charCodeAt(i + 1) === 10) {
              this.lastIndex = i + 2;
            } else {
              this.lastIndex = i + 1;
            }
            return true;
          }
        }
        return false;
      },
      lastIndex: 0
    };
    function checkLineBreaksIssues(tokType, lineTerminatorCharCodes) {
      if (utils_1.has(tokType, "LINE_BREAKS")) {
        return false;
      } else {
        if (utils_1.isRegExp(tokType.PATTERN)) {
          try {
            reg_exp_1.canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
          } catch (e) {
            return {
              issue: lexer_public_1.LexerDefinitionErrorType.IDENTIFY_TERMINATOR,
              errMsg: e.message
            };
          }
          return false;
        } else if (utils_1.isString(tokType.PATTERN)) {
          return false;
        } else if (isCustomPattern(tokType)) {
          return { issue: lexer_public_1.LexerDefinitionErrorType.CUSTOM_LINE_BREAK };
        } else {
          throw Error("non exhaustive match");
        }
      }
    }
    function buildLineBreakIssueMessage(tokType, details) {
      if (details.issue === lexer_public_1.LexerDefinitionErrorType.IDENTIFY_TERMINATOR) {
        return "Warning: unable to identify line terminator usage in pattern.\n" + ("	The problem is in the <" + tokType.name + "> Token Type\n") + ("	 Root cause: " + details.errMsg + ".\n") + "	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";
      } else if (details.issue === lexer_public_1.LexerDefinitionErrorType.CUSTOM_LINE_BREAK) {
        return "Warning: A Custom Token Pattern should specify the <line_breaks> option.\n" + ("	The problem is in the <" + tokType.name + "> Token Type\n") + "	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports2.buildLineBreakIssueMessage = buildLineBreakIssueMessage;
    function getCharCodes(charsOrCodes) {
      var charCodes = utils_1.map(charsOrCodes, function(numOrString) {
        if (utils_1.isString(numOrString) && numOrString.length > 0) {
          return numOrString.charCodeAt(0);
        } else {
          return numOrString;
        }
      });
      return charCodes;
    }
    function addToMapOfArrays(map2, key, value) {
      if (map2[key] === void 0) {
        map2[key] = [value];
      } else {
        map2[key].push(value);
      }
    }
    exports2.minOptimizationVal = 256;
    var charCodeToOptimizedIdxMap = [];
    function charCodeToOptimizedIndex(charCode) {
      return charCode < exports2.minOptimizationVal ? charCode : charCodeToOptimizedIdxMap[charCode];
    }
    exports2.charCodeToOptimizedIndex = charCodeToOptimizedIndex;
    function initCharCodeToOptimizedIndexMap() {
      if (utils_1.isEmpty(charCodeToOptimizedIdxMap)) {
        charCodeToOptimizedIdxMap = new Array(65536);
        for (var i = 0; i < 65536; i++) {
          charCodeToOptimizedIdxMap[i] = i > 255 ? 255 + ~~(i / 255) : i;
        }
      }
    }
  }
});

// lib/src/scan/tokens.js
var require_tokens = __commonJS({
  "lib/src/scan/tokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isTokenType = exports2.hasExtendingTokensTypesMapProperty = exports2.hasExtendingTokensTypesProperty = exports2.hasCategoriesProperty = exports2.hasShortKeyProperty = exports2.singleAssignCategoriesToksMap = exports2.assignCategoriesMapProp = exports2.assignCategoriesTokensProp = exports2.assignTokenDefaultProps = exports2.expandCategories = exports2.augmentTokenTypes = exports2.tokenIdxToClass = exports2.tokenShortNameIdx = exports2.tokenStructuredMatcherNoCategories = exports2.tokenStructuredMatcher = void 0;
    var utils_1 = require_api();
    function tokenStructuredMatcher(tokInstance, tokConstructor) {
      var instanceType = tokInstance.tokenTypeIdx;
      if (instanceType === tokConstructor.tokenTypeIdx) {
        return true;
      } else {
        return tokConstructor.isParent === true && tokConstructor.categoryMatchesMap[instanceType] === true;
      }
    }
    exports2.tokenStructuredMatcher = tokenStructuredMatcher;
    function tokenStructuredMatcherNoCategories(token, tokType) {
      return token.tokenTypeIdx === tokType.tokenTypeIdx;
    }
    exports2.tokenStructuredMatcherNoCategories = tokenStructuredMatcherNoCategories;
    exports2.tokenShortNameIdx = 1;
    exports2.tokenIdxToClass = {};
    function augmentTokenTypes(tokenTypes) {
      var tokenTypesAndParents = expandCategories(tokenTypes);
      assignTokenDefaultProps(tokenTypesAndParents);
      assignCategoriesMapProp(tokenTypesAndParents);
      assignCategoriesTokensProp(tokenTypesAndParents);
      utils_1.forEach(tokenTypesAndParents, function(tokType) {
        tokType.isParent = tokType.categoryMatches.length > 0;
      });
    }
    exports2.augmentTokenTypes = augmentTokenTypes;
    function expandCategories(tokenTypes) {
      var result = utils_1.cloneArr(tokenTypes);
      var categories = tokenTypes;
      var searching = true;
      while (searching) {
        categories = utils_1.compact(utils_1.flatten(utils_1.map(categories, function(currTokType) {
          return currTokType.CATEGORIES;
        })));
        var newCategories = utils_1.difference(categories, result);
        result = result.concat(newCategories);
        if (utils_1.isEmpty(newCategories)) {
          searching = false;
        } else {
          categories = newCategories;
        }
      }
      return result;
    }
    exports2.expandCategories = expandCategories;
    function assignTokenDefaultProps(tokenTypes) {
      utils_1.forEach(tokenTypes, function(currTokType) {
        if (!hasShortKeyProperty(currTokType)) {
          exports2.tokenIdxToClass[exports2.tokenShortNameIdx] = currTokType;
          currTokType.tokenTypeIdx = exports2.tokenShortNameIdx++;
        }
        if (hasCategoriesProperty(currTokType) && !utils_1.isArray(currTokType.CATEGORIES)) {
          currTokType.CATEGORIES = [currTokType.CATEGORIES];
        }
        if (!hasCategoriesProperty(currTokType)) {
          currTokType.CATEGORIES = [];
        }
        if (!hasExtendingTokensTypesProperty(currTokType)) {
          currTokType.categoryMatches = [];
        }
        if (!hasExtendingTokensTypesMapProperty(currTokType)) {
          currTokType.categoryMatchesMap = {};
        }
      });
    }
    exports2.assignTokenDefaultProps = assignTokenDefaultProps;
    function assignCategoriesTokensProp(tokenTypes) {
      utils_1.forEach(tokenTypes, function(currTokType) {
        currTokType.categoryMatches = [];
        utils_1.forEach(currTokType.categoryMatchesMap, function(val, key) {
          currTokType.categoryMatches.push(exports2.tokenIdxToClass[key].tokenTypeIdx);
        });
      });
    }
    exports2.assignCategoriesTokensProp = assignCategoriesTokensProp;
    function assignCategoriesMapProp(tokenTypes) {
      utils_1.forEach(tokenTypes, function(currTokType) {
        singleAssignCategoriesToksMap([], currTokType);
      });
    }
    exports2.assignCategoriesMapProp = assignCategoriesMapProp;
    function singleAssignCategoriesToksMap(path, nextNode) {
      utils_1.forEach(path, function(pathNode) {
        nextNode.categoryMatchesMap[pathNode.tokenTypeIdx] = true;
      });
      utils_1.forEach(nextNode.CATEGORIES, function(nextCategory) {
        var newPath = path.concat(nextNode);
        if (!utils_1.contains(newPath, nextCategory)) {
          singleAssignCategoriesToksMap(newPath, nextCategory);
        }
      });
    }
    exports2.singleAssignCategoriesToksMap = singleAssignCategoriesToksMap;
    function hasShortKeyProperty(tokType) {
      return utils_1.has(tokType, "tokenTypeIdx");
    }
    exports2.hasShortKeyProperty = hasShortKeyProperty;
    function hasCategoriesProperty(tokType) {
      return utils_1.has(tokType, "CATEGORIES");
    }
    exports2.hasCategoriesProperty = hasCategoriesProperty;
    function hasExtendingTokensTypesProperty(tokType) {
      return utils_1.has(tokType, "categoryMatches");
    }
    exports2.hasExtendingTokensTypesProperty = hasExtendingTokensTypesProperty;
    function hasExtendingTokensTypesMapProperty(tokType) {
      return utils_1.has(tokType, "categoryMatchesMap");
    }
    exports2.hasExtendingTokensTypesMapProperty = hasExtendingTokensTypesMapProperty;
    function isTokenType(tokType) {
      return utils_1.has(tokType, "tokenTypeIdx");
    }
    exports2.isTokenType = isTokenType;
  }
});

// lib/src/scan/lexer_errors_public.js
var require_lexer_errors_public = __commonJS({
  "lib/src/scan/lexer_errors_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defaultLexerErrorProvider = void 0;
    exports2.defaultLexerErrorProvider = {
      buildUnableToPopLexerModeMessage: function(token) {
        return "Unable to pop Lexer Mode after encountering Token ->" + token.image + "<- The Mode Stack is empty";
      },
      buildUnexpectedCharactersMessage: function(fullText, startOffset, length, line, column) {
        return "unexpected character: ->" + fullText.charAt(startOffset) + "<- at offset: " + startOffset + "," + (" skipped " + length + " characters.");
      }
    };
  }
});

// lib/src/scan/lexer_public.js
var require_lexer_public = __commonJS({
  "lib/src/scan/lexer_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Lexer = exports2.LexerDefinitionErrorType = void 0;
    var lexer_1 = require_lexer();
    var utils_1 = require_api();
    var tokens_1 = require_tokens();
    var lexer_errors_public_1 = require_lexer_errors_public();
    var reg_exp_parser_1 = require_reg_exp_parser();
    var LexerDefinitionErrorType;
    (function(LexerDefinitionErrorType2) {
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["MISSING_PATTERN"] = 0] = "MISSING_PATTERN";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["INVALID_PATTERN"] = 1] = "INVALID_PATTERN";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["EOI_ANCHOR_FOUND"] = 2] = "EOI_ANCHOR_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["UNSUPPORTED_FLAGS_FOUND"] = 3] = "UNSUPPORTED_FLAGS_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["DUPLICATE_PATTERNS_FOUND"] = 4] = "DUPLICATE_PATTERNS_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["INVALID_GROUP_TYPE_FOUND"] = 5] = "INVALID_GROUP_TYPE_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["PUSH_MODE_DOES_NOT_EXIST"] = 6] = "PUSH_MODE_DOES_NOT_EXIST";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE"] = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY"] = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST"] = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED"] = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["SOI_ANCHOR_FOUND"] = 11] = "SOI_ANCHOR_FOUND";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["EMPTY_MATCH_PATTERN"] = 12] = "EMPTY_MATCH_PATTERN";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["NO_LINE_BREAKS_FLAGS"] = 13] = "NO_LINE_BREAKS_FLAGS";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["UNREACHABLE_PATTERN"] = 14] = "UNREACHABLE_PATTERN";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["IDENTIFY_TERMINATOR"] = 15] = "IDENTIFY_TERMINATOR";
      LexerDefinitionErrorType2[LexerDefinitionErrorType2["CUSTOM_LINE_BREAK"] = 16] = "CUSTOM_LINE_BREAK";
    })(LexerDefinitionErrorType = exports2.LexerDefinitionErrorType || (exports2.LexerDefinitionErrorType = {}));
    var DEFAULT_LEXER_CONFIG = {
      deferDefinitionErrorsHandling: false,
      positionTracking: "full",
      lineTerminatorsPattern: /\n|\r\n?/g,
      lineTerminatorCharacters: ["\n", "\r"],
      ensureOptimizations: false,
      safeMode: false,
      errorMessageProvider: lexer_errors_public_1.defaultLexerErrorProvider,
      traceInitPerf: false,
      skipValidations: false
    };
    Object.freeze(DEFAULT_LEXER_CONFIG);
    var Lexer = function() {
      function Lexer2(lexerDefinition, config) {
        var _this = this;
        if (config === void 0) {
          config = DEFAULT_LEXER_CONFIG;
        }
        this.lexerDefinition = lexerDefinition;
        this.lexerDefinitionErrors = [];
        this.lexerDefinitionWarning = [];
        this.patternIdxToConfig = {};
        this.charCodeToPatternIdxToConfig = {};
        this.modes = [];
        this.emptyGroups = {};
        this.config = void 0;
        this.trackStartLines = true;
        this.trackEndLines = true;
        this.hasCustom = false;
        this.canModeBeOptimized = {};
        if (typeof config === "boolean") {
          throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported");
        }
        this.config = utils_1.merge(DEFAULT_LEXER_CONFIG, config);
        var traceInitVal = this.config.traceInitPerf;
        if (traceInitVal === true) {
          this.traceInitMaxIdent = Infinity;
          this.traceInitPerf = true;
        } else if (typeof traceInitVal === "number") {
          this.traceInitMaxIdent = traceInitVal;
          this.traceInitPerf = true;
        }
        this.traceInitIndent = -1;
        this.TRACE_INIT("Lexer Constructor", function() {
          var actualDefinition;
          var hasOnlySingleMode = true;
          _this.TRACE_INIT("Lexer Config handling", function() {
            if (_this.config.lineTerminatorsPattern === DEFAULT_LEXER_CONFIG.lineTerminatorsPattern) {
              _this.config.lineTerminatorsPattern = lexer_1.LineTerminatorOptimizedTester;
            } else {
              if (_this.config.lineTerminatorCharacters === DEFAULT_LEXER_CONFIG.lineTerminatorCharacters) {
                throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
              }
            }
            if (config.safeMode && config.ensureOptimizations) {
              throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
            }
            _this.trackStartLines = /full|onlyStart/i.test(_this.config.positionTracking);
            _this.trackEndLines = /full/i.test(_this.config.positionTracking);
            if (utils_1.isArray(lexerDefinition)) {
              actualDefinition = { modes: {} };
              actualDefinition.modes[lexer_1.DEFAULT_MODE] = utils_1.cloneArr(lexerDefinition);
              actualDefinition[lexer_1.DEFAULT_MODE] = lexer_1.DEFAULT_MODE;
            } else {
              hasOnlySingleMode = false;
              actualDefinition = utils_1.cloneObj(lexerDefinition);
            }
          });
          if (_this.config.skipValidations === false) {
            _this.TRACE_INIT("performRuntimeChecks", function() {
              _this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(lexer_1.performRuntimeChecks(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
            });
            _this.TRACE_INIT("performWarningRuntimeChecks", function() {
              _this.lexerDefinitionWarning = _this.lexerDefinitionWarning.concat(lexer_1.performWarningRuntimeChecks(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
            });
          }
          actualDefinition.modes = actualDefinition.modes ? actualDefinition.modes : {};
          utils_1.forEach(actualDefinition.modes, function(currModeValue, currModeName) {
            actualDefinition.modes[currModeName] = utils_1.reject(currModeValue, function(currTokType) {
              return utils_1.isUndefined(currTokType);
            });
          });
          var allModeNames = utils_1.keys(actualDefinition.modes);
          utils_1.forEach(actualDefinition.modes, function(currModDef, currModName) {
            _this.TRACE_INIT("Mode: <" + currModName + "> processing", function() {
              _this.modes.push(currModName);
              if (_this.config.skipValidations === false) {
                _this.TRACE_INIT("validatePatterns", function() {
                  _this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(lexer_1.validatePatterns(currModDef, allModeNames));
                });
              }
              if (utils_1.isEmpty(_this.lexerDefinitionErrors)) {
                tokens_1.augmentTokenTypes(currModDef);
                var currAnalyzeResult_1;
                _this.TRACE_INIT("analyzeTokenTypes", function() {
                  currAnalyzeResult_1 = lexer_1.analyzeTokenTypes(currModDef, {
                    lineTerminatorCharacters: _this.config.lineTerminatorCharacters,
                    positionTracking: config.positionTracking,
                    ensureOptimizations: config.ensureOptimizations,
                    safeMode: config.safeMode,
                    tracer: _this.TRACE_INIT.bind(_this)
                  });
                });
                _this.patternIdxToConfig[currModName] = currAnalyzeResult_1.patternIdxToConfig;
                _this.charCodeToPatternIdxToConfig[currModName] = currAnalyzeResult_1.charCodeToPatternIdxToConfig;
                _this.emptyGroups = utils_1.merge(_this.emptyGroups, currAnalyzeResult_1.emptyGroups);
                _this.hasCustom = currAnalyzeResult_1.hasCustom || _this.hasCustom;
                _this.canModeBeOptimized[currModName] = currAnalyzeResult_1.canBeOptimized;
              }
            });
          });
          _this.defaultMode = actualDefinition.defaultMode;
          if (!utils_1.isEmpty(_this.lexerDefinitionErrors) && !_this.config.deferDefinitionErrorsHandling) {
            var allErrMessages = utils_1.map(_this.lexerDefinitionErrors, function(error) {
              return error.message;
            });
            var allErrMessagesString = allErrMessages.join("-----------------------\n");
            throw new Error("Errors detected in definition of Lexer:\n" + allErrMessagesString);
          }
          utils_1.forEach(_this.lexerDefinitionWarning, function(warningDescriptor) {
            utils_1.PRINT_WARNING(warningDescriptor.message);
          });
          _this.TRACE_INIT("Choosing sub-methods implementations", function() {
            if (lexer_1.SUPPORT_STICKY) {
              _this.chopInput = utils_1.IDENTITY;
              _this.match = _this.matchWithTest;
            } else {
              _this.updateLastIndex = utils_1.NOOP;
              _this.match = _this.matchWithExec;
            }
            if (hasOnlySingleMode) {
              _this.handleModes = utils_1.NOOP;
            }
            if (_this.trackStartLines === false) {
              _this.computeNewColumn = utils_1.IDENTITY;
            }
            if (_this.trackEndLines === false) {
              _this.updateTokenEndLineColumnLocation = utils_1.NOOP;
            }
            if (/full/i.test(_this.config.positionTracking)) {
              _this.createTokenInstance = _this.createFullToken;
            } else if (/onlyStart/i.test(_this.config.positionTracking)) {
              _this.createTokenInstance = _this.createStartOnlyToken;
            } else if (/onlyOffset/i.test(_this.config.positionTracking)) {
              _this.createTokenInstance = _this.createOffsetOnlyToken;
            } else {
              throw Error('Invalid <positionTracking> config option: "' + _this.config.positionTracking + '"');
            }
            if (_this.hasCustom) {
              _this.addToken = _this.addTokenUsingPush;
              _this.handlePayload = _this.handlePayloadWithCustom;
            } else {
              _this.addToken = _this.addTokenUsingMemberAccess;
              _this.handlePayload = _this.handlePayloadNoCustom;
            }
          });
          _this.TRACE_INIT("Failed Optimization Warnings", function() {
            var unOptimizedModes = utils_1.reduce(_this.canModeBeOptimized, function(cannotBeOptimized, canBeOptimized, modeName) {
              if (canBeOptimized === false) {
                cannotBeOptimized.push(modeName);
              }
              return cannotBeOptimized;
            }, []);
            if (config.ensureOptimizations && !utils_1.isEmpty(unOptimizedModes)) {
              throw Error("Lexer Modes: < " + unOptimizedModes.join(", ") + ' > cannot be optimized.\n	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.\n	 Or inspect the console log for details on how to resolve these issues.');
            }
          });
          _this.TRACE_INIT("clearRegExpParserCache", function() {
            reg_exp_parser_1.clearRegExpParserCache();
          });
          _this.TRACE_INIT("toFastProperties", function() {
            utils_1.toFastProperties(_this);
          });
        });
      }
      Lexer2.prototype.tokenize = function(text, initialMode) {
        if (initialMode === void 0) {
          initialMode = this.defaultMode;
        }
        if (!utils_1.isEmpty(this.lexerDefinitionErrors)) {
          var allErrMessages = utils_1.map(this.lexerDefinitionErrors, function(error) {
            return error.message;
          });
          var allErrMessagesString = allErrMessages.join("-----------------------\n");
          throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" + allErrMessagesString);
        }
        var lexResult = this.tokenizeInternal(text, initialMode);
        return lexResult;
      };
      Lexer2.prototype.tokenizeInternal = function(text, initialMode) {
        var _this = this;
        var i, j, matchAltImage, longerAltIdx, matchedImage, payload, altPayload, imageLength, group, tokType, newToken, errLength, droppedChar, msg, match;
        var orgText = text;
        var orgLength = orgText.length;
        var offset = 0;
        var matchedTokensIndex = 0;
        var guessedNumberOfTokens = this.hasCustom ? 0 : Math.floor(text.length / 10);
        var matchedTokens = new Array(guessedNumberOfTokens);
        var errors = [];
        var line = this.trackStartLines ? 1 : void 0;
        var column = this.trackStartLines ? 1 : void 0;
        var groups = lexer_1.cloneEmptyGroups(this.emptyGroups);
        var trackLines = this.trackStartLines;
        var lineTerminatorPattern = this.config.lineTerminatorsPattern;
        var currModePatternsLength = 0;
        var patternIdxToConfig = [];
        var currCharCodeToPatternIdxToConfig = [];
        var modeStack = [];
        var emptyArray = [];
        Object.freeze(emptyArray);
        var getPossiblePatterns = void 0;
        function getPossiblePatternsSlow() {
          return patternIdxToConfig;
        }
        function getPossiblePatternsOptimized(charCode) {
          var optimizedCharIdx = lexer_1.charCodeToOptimizedIndex(charCode);
          var possiblePatterns = currCharCodeToPatternIdxToConfig[optimizedCharIdx];
          if (possiblePatterns === void 0) {
            return emptyArray;
          } else {
            return possiblePatterns;
          }
        }
        var pop_mode = function(popToken) {
          if (modeStack.length === 1 && popToken.tokenType.PUSH_MODE === void 0) {
            var msg_1 = _this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(popToken);
            errors.push({
              offset: popToken.startOffset,
              line: popToken.startLine !== void 0 ? popToken.startLine : void 0,
              column: popToken.startColumn !== void 0 ? popToken.startColumn : void 0,
              length: popToken.image.length,
              message: msg_1
            });
          } else {
            modeStack.pop();
            var newMode = utils_1.last(modeStack);
            patternIdxToConfig = _this.patternIdxToConfig[newMode];
            currCharCodeToPatternIdxToConfig = _this.charCodeToPatternIdxToConfig[newMode];
            currModePatternsLength = patternIdxToConfig.length;
            var modeCanBeOptimized = _this.canModeBeOptimized[newMode] && _this.config.safeMode === false;
            if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
              getPossiblePatterns = getPossiblePatternsOptimized;
            } else {
              getPossiblePatterns = getPossiblePatternsSlow;
            }
          }
        };
        function push_mode(newMode) {
          modeStack.push(newMode);
          currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
          patternIdxToConfig = this.patternIdxToConfig[newMode];
          currModePatternsLength = patternIdxToConfig.length;
          currModePatternsLength = patternIdxToConfig.length;
          var modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
          if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
            getPossiblePatterns = getPossiblePatternsOptimized;
          } else {
            getPossiblePatterns = getPossiblePatternsSlow;
          }
        }
        push_mode.call(this, initialMode);
        var currConfig;
        while (offset < orgLength) {
          matchedImage = null;
          var nextCharCode = orgText.charCodeAt(offset);
          var chosenPatternIdxToConfig = getPossiblePatterns(nextCharCode);
          var chosenPatternsLength = chosenPatternIdxToConfig.length;
          for (i = 0; i < chosenPatternsLength; i++) {
            currConfig = chosenPatternIdxToConfig[i];
            var currPattern = currConfig.pattern;
            payload = null;
            var singleCharCode = currConfig.short;
            if (singleCharCode !== false) {
              if (nextCharCode === singleCharCode) {
                matchedImage = currPattern;
              }
            } else if (currConfig.isCustom === true) {
              match = currPattern.exec(orgText, offset, matchedTokens, groups);
              if (match !== null) {
                matchedImage = match[0];
                if (match.payload !== void 0) {
                  payload = match.payload;
                }
              } else {
                matchedImage = null;
              }
            } else {
              this.updateLastIndex(currPattern, offset);
              matchedImage = this.match(currPattern, text, offset);
            }
            if (matchedImage !== null) {
              longerAltIdx = currConfig.longerAlt;
              if (longerAltIdx !== void 0) {
                var longerAltConfig = patternIdxToConfig[longerAltIdx];
                var longerAltPattern = longerAltConfig.pattern;
                altPayload = null;
                if (longerAltConfig.isCustom === true) {
                  match = longerAltPattern.exec(orgText, offset, matchedTokens, groups);
                  if (match !== null) {
                    matchAltImage = match[0];
                    if (match.payload !== void 0) {
                      altPayload = match.payload;
                    }
                  } else {
                    matchAltImage = null;
                  }
                } else {
                  this.updateLastIndex(longerAltPattern, offset);
                  matchAltImage = this.match(longerAltPattern, text, offset);
                }
                if (matchAltImage && matchAltImage.length > matchedImage.length) {
                  matchedImage = matchAltImage;
                  payload = altPayload;
                  currConfig = longerAltConfig;
                }
              }
              break;
            }
          }
          if (matchedImage !== null) {
            imageLength = matchedImage.length;
            group = currConfig.group;
            if (group !== void 0) {
              tokType = currConfig.tokenTypeIdx;
              newToken = this.createTokenInstance(matchedImage, offset, tokType, currConfig.tokenType, line, column, imageLength);
              this.handlePayload(newToken, payload);
              if (group === false) {
                matchedTokensIndex = this.addToken(matchedTokens, matchedTokensIndex, newToken);
              } else {
                groups[group].push(newToken);
              }
            }
            text = this.chopInput(text, imageLength);
            offset = offset + imageLength;
            column = this.computeNewColumn(column, imageLength);
            if (trackLines === true && currConfig.canLineTerminator === true) {
              var numOfLTsInMatch = 0;
              var foundTerminator = void 0;
              var lastLTEndOffset = void 0;
              lineTerminatorPattern.lastIndex = 0;
              do {
                foundTerminator = lineTerminatorPattern.test(matchedImage);
                if (foundTerminator === true) {
                  lastLTEndOffset = lineTerminatorPattern.lastIndex - 1;
                  numOfLTsInMatch++;
                }
              } while (foundTerminator === true);
              if (numOfLTsInMatch !== 0) {
                line = line + numOfLTsInMatch;
                column = imageLength - lastLTEndOffset;
                this.updateTokenEndLineColumnLocation(newToken, group, lastLTEndOffset, numOfLTsInMatch, line, column, imageLength);
              }
            }
            this.handleModes(currConfig, pop_mode, push_mode, newToken);
          } else {
            var errorStartOffset = offset;
            var errorLine = line;
            var errorColumn = column;
            var foundResyncPoint = false;
            while (!foundResyncPoint && offset < orgLength) {
              droppedChar = orgText.charCodeAt(offset);
              text = this.chopInput(text, 1);
              offset++;
              for (j = 0; j < currModePatternsLength; j++) {
                var currConfig_1 = patternIdxToConfig[j];
                var currPattern = currConfig_1.pattern;
                var singleCharCode = currConfig_1.short;
                if (singleCharCode !== false) {
                  if (orgText.charCodeAt(offset) === singleCharCode) {
                    foundResyncPoint = true;
                  }
                } else if (currConfig_1.isCustom === true) {
                  foundResyncPoint = currPattern.exec(orgText, offset, matchedTokens, groups) !== null;
                } else {
                  this.updateLastIndex(currPattern, offset);
                  foundResyncPoint = currPattern.exec(text) !== null;
                }
                if (foundResyncPoint === true) {
                  break;
                }
              }
            }
            errLength = offset - errorStartOffset;
            msg = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(orgText, errorStartOffset, errLength, errorLine, errorColumn);
            errors.push({
              offset: errorStartOffset,
              line: errorLine,
              column: errorColumn,
              length: errLength,
              message: msg
            });
          }
        }
        if (!this.hasCustom) {
          matchedTokens.length = matchedTokensIndex;
        }
        return {
          tokens: matchedTokens,
          groups,
          errors
        };
      };
      Lexer2.prototype.handleModes = function(config, pop_mode, push_mode, newToken) {
        if (config.pop === true) {
          var pushMode = config.push;
          pop_mode(newToken);
          if (pushMode !== void 0) {
            push_mode.call(this, pushMode);
          }
        } else if (config.push !== void 0) {
          push_mode.call(this, config.push);
        }
      };
      Lexer2.prototype.chopInput = function(text, length) {
        return text.substring(length);
      };
      Lexer2.prototype.updateLastIndex = function(regExp, newLastIndex) {
        regExp.lastIndex = newLastIndex;
      };
      Lexer2.prototype.updateTokenEndLineColumnLocation = function(newToken, group, lastLTIdx, numOfLTsInMatch, line, column, imageLength) {
        var lastCharIsLT, fixForEndingInLT;
        if (group !== void 0) {
          lastCharIsLT = lastLTIdx === imageLength - 1;
          fixForEndingInLT = lastCharIsLT ? -1 : 0;
          if (!(numOfLTsInMatch === 1 && lastCharIsLT === true)) {
            newToken.endLine = line + fixForEndingInLT;
            newToken.endColumn = column - 1 + -fixForEndingInLT;
          }
        }
      };
      Lexer2.prototype.computeNewColumn = function(oldColumn, imageLength) {
        return oldColumn + imageLength;
      };
      Lexer2.prototype.createTokenInstance = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return null;
      };
      Lexer2.prototype.createOffsetOnlyToken = function(image, startOffset, tokenTypeIdx, tokenType) {
        return {
          image,
          startOffset,
          tokenTypeIdx,
          tokenType
        };
      };
      Lexer2.prototype.createStartOnlyToken = function(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn) {
        return {
          image,
          startOffset,
          startLine,
          startColumn,
          tokenTypeIdx,
          tokenType
        };
      };
      Lexer2.prototype.createFullToken = function(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn, imageLength) {
        return {
          image,
          startOffset,
          endOffset: startOffset + imageLength - 1,
          startLine,
          endLine: startLine,
          startColumn,
          endColumn: startColumn + imageLength - 1,
          tokenTypeIdx,
          tokenType
        };
      };
      Lexer2.prototype.addToken = function(tokenVector, index, tokenToAdd) {
        return 666;
      };
      Lexer2.prototype.addTokenUsingPush = function(tokenVector, index, tokenToAdd) {
        tokenVector.push(tokenToAdd);
        return index;
      };
      Lexer2.prototype.addTokenUsingMemberAccess = function(tokenVector, index, tokenToAdd) {
        tokenVector[index] = tokenToAdd;
        index++;
        return index;
      };
      Lexer2.prototype.handlePayload = function(token, payload) {
      };
      Lexer2.prototype.handlePayloadNoCustom = function(token, payload) {
      };
      Lexer2.prototype.handlePayloadWithCustom = function(token, payload) {
        if (payload !== null) {
          token.payload = payload;
        }
      };
      Lexer2.prototype.match = function(pattern, text, offset) {
        return null;
      };
      Lexer2.prototype.matchWithTest = function(pattern, text, offset) {
        var found = pattern.test(text);
        if (found === true) {
          return text.substring(offset, pattern.lastIndex);
        }
        return null;
      };
      Lexer2.prototype.matchWithExec = function(pattern, text) {
        var regExpArray = pattern.exec(text);
        return regExpArray !== null ? regExpArray[0] : regExpArray;
      };
      Lexer2.prototype.TRACE_INIT = function(phaseDesc, phaseImpl) {
        if (this.traceInitPerf === true) {
          this.traceInitIndent++;
          var indent = new Array(this.traceInitIndent + 1).join("	");
          if (this.traceInitIndent < this.traceInitMaxIdent) {
            console.log(indent + "--> <" + phaseDesc + ">");
          }
          var _a = utils_1.timer(phaseImpl), time = _a.time, value = _a.value;
          var traceMethod = time > 10 ? console.warn : console.log;
          if (this.traceInitIndent < this.traceInitMaxIdent) {
            traceMethod(indent + "<-- <" + phaseDesc + "> time: " + time + "ms");
          }
          this.traceInitIndent--;
          return value;
        } else {
          return phaseImpl();
        }
      };
      Lexer2.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
      Lexer2.NA = /NOT_APPLICABLE/;
      return Lexer2;
    }();
    exports2.Lexer = Lexer;
  }
});

// lib/src/scan/tokens_public.js
var require_tokens_public = __commonJS({
  "lib/src/scan/tokens_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.tokenMatcher = exports2.createTokenInstance = exports2.EOF = exports2.createToken = exports2.hasTokenLabel = exports2.tokenName = exports2.tokenLabel = void 0;
    var utils_1 = require_api();
    var lexer_public_1 = require_lexer_public();
    var tokens_1 = require_tokens();
    function tokenLabel(tokType) {
      if (hasTokenLabel(tokType)) {
        return tokType.LABEL;
      } else {
        return tokType.name;
      }
    }
    exports2.tokenLabel = tokenLabel;
    function tokenName(tokType) {
      return tokType.name;
    }
    exports2.tokenName = tokenName;
    function hasTokenLabel(obj) {
      return utils_1.isString(obj.LABEL) && obj.LABEL !== "";
    }
    exports2.hasTokenLabel = hasTokenLabel;
    var PARENT = "parent";
    var CATEGORIES = "categories";
    var LABEL = "label";
    var GROUP = "group";
    var PUSH_MODE = "push_mode";
    var POP_MODE = "pop_mode";
    var LONGER_ALT = "longer_alt";
    var LINE_BREAKS = "line_breaks";
    var START_CHARS_HINT = "start_chars_hint";
    function createToken(config) {
      return createTokenInternal(config);
    }
    exports2.createToken = createToken;
    function createTokenInternal(config) {
      var pattern = config.pattern;
      var tokenType = {};
      tokenType.name = config.name;
      if (!utils_1.isUndefined(pattern)) {
        tokenType.PATTERN = pattern;
      }
      if (utils_1.has(config, PARENT)) {
        throw "The parent property is no longer supported.\nSee: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.";
      }
      if (utils_1.has(config, CATEGORIES)) {
        tokenType.CATEGORIES = config[CATEGORIES];
      }
      tokens_1.augmentTokenTypes([tokenType]);
      if (utils_1.has(config, LABEL)) {
        tokenType.LABEL = config[LABEL];
      }
      if (utils_1.has(config, GROUP)) {
        tokenType.GROUP = config[GROUP];
      }
      if (utils_1.has(config, POP_MODE)) {
        tokenType.POP_MODE = config[POP_MODE];
      }
      if (utils_1.has(config, PUSH_MODE)) {
        tokenType.PUSH_MODE = config[PUSH_MODE];
      }
      if (utils_1.has(config, LONGER_ALT)) {
        tokenType.LONGER_ALT = config[LONGER_ALT];
      }
      if (utils_1.has(config, LINE_BREAKS)) {
        tokenType.LINE_BREAKS = config[LINE_BREAKS];
      }
      if (utils_1.has(config, START_CHARS_HINT)) {
        tokenType.START_CHARS_HINT = config[START_CHARS_HINT];
      }
      return tokenType;
    }
    exports2.EOF = createToken({ name: "EOF", pattern: lexer_public_1.Lexer.NA });
    tokens_1.augmentTokenTypes([exports2.EOF]);
    function createTokenInstance(tokType, image, startOffset, endOffset, startLine, endLine, startColumn, endColumn) {
      return {
        image,
        startOffset,
        endOffset,
        startLine,
        endLine,
        startColumn,
        endColumn,
        tokenTypeIdx: tokType.tokenTypeIdx,
        tokenType: tokType
      };
    }
    exports2.createTokenInstance = createTokenInstance;
    function tokenMatcher(token, tokType) {
      return tokens_1.tokenStructuredMatcher(token, tokType);
    }
    exports2.tokenMatcher = tokenMatcher;
  }
});

// lib/src/parse/grammar/gast/gast_public.js
var require_gast_public = __commonJS({
  "lib/src/parse/grammar/gast/gast_public.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.serializeProduction = exports2.serializeGrammar = exports2.Terminal = exports2.Alternation = exports2.RepetitionWithSeparator = exports2.Repetition = exports2.RepetitionMandatoryWithSeparator = exports2.RepetitionMandatory = exports2.Option = exports2.Alternative = exports2.Rule = exports2.NonTerminal = exports2.AbstractProduction = void 0;
    var utils_1 = require_api();
    var tokens_public_1 = require_tokens_public();
    var AbstractProduction = function() {
      function AbstractProduction2(_definition) {
        this._definition = _definition;
      }
      Object.defineProperty(AbstractProduction2.prototype, "definition", {
        get: function() {
          return this._definition;
        },
        set: function(value) {
          this._definition = value;
        },
        enumerable: false,
        configurable: true
      });
      AbstractProduction2.prototype.accept = function(visitor) {
        visitor.visit(this);
        utils_1.forEach(this.definition, function(prod) {
          prod.accept(visitor);
        });
      };
      return AbstractProduction2;
    }();
    exports2.AbstractProduction = AbstractProduction;
    var NonTerminal = function(_super) {
      __extends(NonTerminal2, _super);
      function NonTerminal2(options) {
        var _this = _super.call(this, []) || this;
        _this.idx = 1;
        utils_1.assign(_this, utils_1.pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      Object.defineProperty(NonTerminal2.prototype, "definition", {
        get: function() {
          if (this.referencedRule !== void 0) {
            return this.referencedRule.definition;
          }
          return [];
        },
        set: function(definition) {
        },
        enumerable: false,
        configurable: true
      });
      NonTerminal2.prototype.accept = function(visitor) {
        visitor.visit(this);
      };
      return NonTerminal2;
    }(AbstractProduction);
    exports2.NonTerminal = NonTerminal;
    var Rule = function(_super) {
      __extends(Rule2, _super);
      function Rule2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.orgText = "";
        utils_1.assign(_this, utils_1.pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return Rule2;
    }(AbstractProduction);
    exports2.Rule = Rule;
    var Alternative = function(_super) {
      __extends(Alternative2, _super);
      function Alternative2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.ignoreAmbiguities = false;
        utils_1.assign(_this, utils_1.pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return Alternative2;
    }(AbstractProduction);
    exports2.Alternative = Alternative;
    var Option = function(_super) {
      __extends(Option2, _super);
      function Option2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        utils_1.assign(_this, utils_1.pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return Option2;
    }(AbstractProduction);
    exports2.Option = Option;
    var RepetitionMandatory = function(_super) {
      __extends(RepetitionMandatory2, _super);
      function RepetitionMandatory2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        utils_1.assign(_this, utils_1.pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return RepetitionMandatory2;
    }(AbstractProduction);
    exports2.RepetitionMandatory = RepetitionMandatory;
    var RepetitionMandatoryWithSeparator = function(_super) {
      __extends(RepetitionMandatoryWithSeparator2, _super);
      function RepetitionMandatoryWithSeparator2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        utils_1.assign(_this, utils_1.pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return RepetitionMandatoryWithSeparator2;
    }(AbstractProduction);
    exports2.RepetitionMandatoryWithSeparator = RepetitionMandatoryWithSeparator;
    var Repetition = function(_super) {
      __extends(Repetition2, _super);
      function Repetition2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        utils_1.assign(_this, utils_1.pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return Repetition2;
    }(AbstractProduction);
    exports2.Repetition = Repetition;
    var RepetitionWithSeparator = function(_super) {
      __extends(RepetitionWithSeparator2, _super);
      function RepetitionWithSeparator2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        utils_1.assign(_this, utils_1.pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      return RepetitionWithSeparator2;
    }(AbstractProduction);
    exports2.RepetitionWithSeparator = RepetitionWithSeparator;
    var Alternation = function(_super) {
      __extends(Alternation2, _super);
      function Alternation2(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        _this.ignoreAmbiguities = false;
        _this.hasPredicates = false;
        utils_1.assign(_this, utils_1.pick(options, function(v) {
          return v !== void 0;
        }));
        return _this;
      }
      Object.defineProperty(Alternation2.prototype, "definition", {
        get: function() {
          return this._definition;
        },
        set: function(value) {
          this._definition = value;
        },
        enumerable: false,
        configurable: true
      });
      return Alternation2;
    }(AbstractProduction);
    exports2.Alternation = Alternation;
    var Terminal = function() {
      function Terminal2(options) {
        this.idx = 1;
        utils_1.assign(this, utils_1.pick(options, function(v) {
          return v !== void 0;
        }));
      }
      Terminal2.prototype.accept = function(visitor) {
        visitor.visit(this);
      };
      return Terminal2;
    }();
    exports2.Terminal = Terminal;
    function serializeGrammar(topRules) {
      return utils_1.map(topRules, serializeProduction);
    }
    exports2.serializeGrammar = serializeGrammar;
    function serializeProduction(node) {
      function convertDefinition(definition) {
        return utils_1.map(definition, serializeProduction);
      }
      if (node instanceof NonTerminal) {
        var serializedNonTerminal = {
          type: "NonTerminal",
          name: node.nonTerminalName,
          idx: node.idx
        };
        if (utils_1.isString(node.label)) {
          serializedNonTerminal.label = node.label;
        }
        return serializedNonTerminal;
      } else if (node instanceof Alternative) {
        return {
          type: "Alternative",
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof Option) {
        return {
          type: "Option",
          idx: node.idx,
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof RepetitionMandatory) {
        return {
          type: "RepetitionMandatory",
          idx: node.idx,
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof RepetitionMandatoryWithSeparator) {
        return {
          type: "RepetitionMandatoryWithSeparator",
          idx: node.idx,
          separator: serializeProduction(new Terminal({ terminalType: node.separator })),
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof RepetitionWithSeparator) {
        return {
          type: "RepetitionWithSeparator",
          idx: node.idx,
          separator: serializeProduction(new Terminal({ terminalType: node.separator })),
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof Repetition) {
        return {
          type: "Repetition",
          idx: node.idx,
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof Alternation) {
        return {
          type: "Alternation",
          idx: node.idx,
          definition: convertDefinition(node.definition)
        };
      } else if (node instanceof Terminal) {
        var serializedTerminal = {
          type: "Terminal",
          name: node.terminalType.name,
          label: tokens_public_1.tokenLabel(node.terminalType),
          idx: node.idx
        };
        if (utils_1.isString(node.label)) {
          serializedTerminal.terminalLabel = node.label;
        }
        var pattern = node.terminalType.PATTERN;
        if (node.terminalType.PATTERN) {
          serializedTerminal.pattern = utils_1.isRegExp(pattern) ? pattern.source : pattern;
        }
        return serializedTerminal;
      } else if (node instanceof Rule) {
        return {
          type: "Rule",
          name: node.name,
          orgText: node.orgText,
          definition: convertDefinition(node.definition)
        };
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports2.serializeProduction = serializeProduction;
  }
});

// lib/src/parse/grammar/rest.js
var require_rest = __commonJS({
  "lib/src/parse/grammar/rest.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RestWalker = void 0;
    var utils_1 = require_api();
    var gast_public_1 = require_gast_public();
    var RestWalker = function() {
      function RestWalker2() {
      }
      RestWalker2.prototype.walk = function(prod, prevRest) {
        var _this = this;
        if (prevRest === void 0) {
          prevRest = [];
        }
        utils_1.forEach(prod.definition, function(subProd, index) {
          var currRest = utils_1.drop(prod.definition, index + 1);
          if (subProd instanceof gast_public_1.NonTerminal) {
            _this.walkProdRef(subProd, currRest, prevRest);
          } else if (subProd instanceof gast_public_1.Terminal) {
            _this.walkTerminal(subProd, currRest, prevRest);
          } else if (subProd instanceof gast_public_1.Alternative) {
            _this.walkFlat(subProd, currRest, prevRest);
          } else if (subProd instanceof gast_public_1.Option) {
            _this.walkOption(subProd, currRest, prevRest);
          } else if (subProd instanceof gast_public_1.RepetitionMandatory) {
            _this.walkAtLeastOne(subProd, currRest, prevRest);
          } else if (subProd instanceof gast_public_1.RepetitionMandatoryWithSeparator) {
            _this.walkAtLeastOneSep(subProd, currRest, prevRest);
          } else if (subProd instanceof gast_public_1.RepetitionWithSeparator) {
            _this.walkManySep(subProd, currRest, prevRest);
          } else if (subProd instanceof gast_public_1.Repetition) {
            _this.walkMany(subProd, currRest, prevRest);
          } else if (subProd instanceof gast_public_1.Alternation) {
            _this.walkOr(subProd, currRest, prevRest);
          } else {
            throw Error("non exhaustive match");
          }
        });
      };
      RestWalker2.prototype.walkTerminal = function(terminal, currRest, prevRest) {
      };
      RestWalker2.prototype.walkProdRef = function(refProd, currRest, prevRest) {
      };
      RestWalker2.prototype.walkFlat = function(flatProd, currRest, prevRest) {
        var fullOrRest = currRest.concat(prevRest);
        this.walk(flatProd, fullOrRest);
      };
      RestWalker2.prototype.walkOption = function(optionProd, currRest, prevRest) {
        var fullOrRest = currRest.concat(prevRest);
        this.walk(optionProd, fullOrRest);
      };
      RestWalker2.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
        var fullAtLeastOneRest = [
          new gast_public_1.Option({ definition: atLeastOneProd.definition })
        ].concat(currRest, prevRest);
        this.walk(atLeastOneProd, fullAtLeastOneRest);
      };
      RestWalker2.prototype.walkAtLeastOneSep = function(atLeastOneSepProd, currRest, prevRest) {
        var fullAtLeastOneSepRest = restForRepetitionWithSeparator(atLeastOneSepProd, currRest, prevRest);
        this.walk(atLeastOneSepProd, fullAtLeastOneSepRest);
      };
      RestWalker2.prototype.walkMany = function(manyProd, currRest, prevRest) {
        var fullManyRest = [
          new gast_public_1.Option({ definition: manyProd.definition })
        ].concat(currRest, prevRest);
        this.walk(manyProd, fullManyRest);
      };
      RestWalker2.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
        var fullManySepRest = restForRepetitionWithSeparator(manySepProd, currRest, prevRest);
        this.walk(manySepProd, fullManySepRest);
      };
      RestWalker2.prototype.walkOr = function(orProd, currRest, prevRest) {
        var _this = this;
        var fullOrRest = currRest.concat(prevRest);
        utils_1.forEach(orProd.definition, function(alt) {
          var prodWrapper = new gast_public_1.Alternative({ definition: [alt] });
          _this.walk(prodWrapper, fullOrRest);
        });
      };
      return RestWalker2;
    }();
    exports2.RestWalker = RestWalker;
    function restForRepetitionWithSeparator(repSepProd, currRest, prevRest) {
      var repSepRest = [
        new gast_public_1.Option({
          definition: [new gast_public_1.Terminal({ terminalType: repSepProd.separator })].concat(repSepProd.definition)
        })
      ];
      var fullRepSepRest = repSepRest.concat(currRest, prevRest);
      return fullRepSepRest;
    }
  }
});

// lib/src/parse/grammar/gast/gast_visitor_public.js
var require_gast_visitor_public = __commonJS({
  "lib/src/parse/grammar/gast/gast_visitor_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GAstVisitor = void 0;
    var gast_public_1 = require_gast_public();
    var GAstVisitor = function() {
      function GAstVisitor2() {
      }
      GAstVisitor2.prototype.visit = function(node) {
        var nodeAny = node;
        switch (nodeAny.constructor) {
          case gast_public_1.NonTerminal:
            return this.visitNonTerminal(nodeAny);
          case gast_public_1.Alternative:
            return this.visitAlternative(nodeAny);
          case gast_public_1.Option:
            return this.visitOption(nodeAny);
          case gast_public_1.RepetitionMandatory:
            return this.visitRepetitionMandatory(nodeAny);
          case gast_public_1.RepetitionMandatoryWithSeparator:
            return this.visitRepetitionMandatoryWithSeparator(nodeAny);
          case gast_public_1.RepetitionWithSeparator:
            return this.visitRepetitionWithSeparator(nodeAny);
          case gast_public_1.Repetition:
            return this.visitRepetition(nodeAny);
          case gast_public_1.Alternation:
            return this.visitAlternation(nodeAny);
          case gast_public_1.Terminal:
            return this.visitTerminal(nodeAny);
          case gast_public_1.Rule:
            return this.visitRule(nodeAny);
          default:
            throw Error("non exhaustive match");
        }
      };
      GAstVisitor2.prototype.visitNonTerminal = function(node) {
      };
      GAstVisitor2.prototype.visitAlternative = function(node) {
      };
      GAstVisitor2.prototype.visitOption = function(node) {
      };
      GAstVisitor2.prototype.visitRepetition = function(node) {
      };
      GAstVisitor2.prototype.visitRepetitionMandatory = function(node) {
      };
      GAstVisitor2.prototype.visitRepetitionMandatoryWithSeparator = function(node) {
      };
      GAstVisitor2.prototype.visitRepetitionWithSeparator = function(node) {
      };
      GAstVisitor2.prototype.visitAlternation = function(node) {
      };
      GAstVisitor2.prototype.visitTerminal = function(node) {
      };
      GAstVisitor2.prototype.visitRule = function(node) {
      };
      return GAstVisitor2;
    }();
    exports2.GAstVisitor = GAstVisitor;
  }
});

// lib/src/parse/grammar/gast/gast.js
var require_gast = __commonJS({
  "lib/src/parse/grammar/gast/gast.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.collectMethods = exports2.DslMethodsCollectorVisitor = exports2.getProductionDslName = exports2.isBranchingProd = exports2.isOptionalProd = exports2.isSequenceProd = void 0;
    var utils_1 = require_api();
    var gast_public_1 = require_gast_public();
    var gast_visitor_public_1 = require_gast_visitor_public();
    function isSequenceProd(prod) {
      return prod instanceof gast_public_1.Alternative || prod instanceof gast_public_1.Option || prod instanceof gast_public_1.Repetition || prod instanceof gast_public_1.RepetitionMandatory || prod instanceof gast_public_1.RepetitionMandatoryWithSeparator || prod instanceof gast_public_1.RepetitionWithSeparator || prod instanceof gast_public_1.Terminal || prod instanceof gast_public_1.Rule;
    }
    exports2.isSequenceProd = isSequenceProd;
    function isOptionalProd(prod, alreadyVisited) {
      if (alreadyVisited === void 0) {
        alreadyVisited = [];
      }
      var isDirectlyOptional = prod instanceof gast_public_1.Option || prod instanceof gast_public_1.Repetition || prod instanceof gast_public_1.RepetitionWithSeparator;
      if (isDirectlyOptional) {
        return true;
      }
      if (prod instanceof gast_public_1.Alternation) {
        return utils_1.some(prod.definition, function(subProd) {
          return isOptionalProd(subProd, alreadyVisited);
        });
      } else if (prod instanceof gast_public_1.NonTerminal && utils_1.contains(alreadyVisited, prod)) {
        return false;
      } else if (prod instanceof gast_public_1.AbstractProduction) {
        if (prod instanceof gast_public_1.NonTerminal) {
          alreadyVisited.push(prod);
        }
        return utils_1.every(prod.definition, function(subProd) {
          return isOptionalProd(subProd, alreadyVisited);
        });
      } else {
        return false;
      }
    }
    exports2.isOptionalProd = isOptionalProd;
    function isBranchingProd(prod) {
      return prod instanceof gast_public_1.Alternation;
    }
    exports2.isBranchingProd = isBranchingProd;
    function getProductionDslName(prod) {
      if (prod instanceof gast_public_1.NonTerminal) {
        return "SUBRULE";
      } else if (prod instanceof gast_public_1.Option) {
        return "OPTION";
      } else if (prod instanceof gast_public_1.Alternation) {
        return "OR";
      } else if (prod instanceof gast_public_1.RepetitionMandatory) {
        return "AT_LEAST_ONE";
      } else if (prod instanceof gast_public_1.RepetitionMandatoryWithSeparator) {
        return "AT_LEAST_ONE_SEP";
      } else if (prod instanceof gast_public_1.RepetitionWithSeparator) {
        return "MANY_SEP";
      } else if (prod instanceof gast_public_1.Repetition) {
        return "MANY";
      } else if (prod instanceof gast_public_1.Terminal) {
        return "CONSUME";
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports2.getProductionDslName = getProductionDslName;
    var DslMethodsCollectorVisitor = function(_super) {
      __extends(DslMethodsCollectorVisitor2, _super);
      function DslMethodsCollectorVisitor2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.separator = "-";
        _this.dslMethods = {
          option: [],
          alternation: [],
          repetition: [],
          repetitionWithSeparator: [],
          repetitionMandatory: [],
          repetitionMandatoryWithSeparator: []
        };
        return _this;
      }
      DslMethodsCollectorVisitor2.prototype.reset = function() {
        this.dslMethods = {
          option: [],
          alternation: [],
          repetition: [],
          repetitionWithSeparator: [],
          repetitionMandatory: [],
          repetitionMandatoryWithSeparator: []
        };
      };
      DslMethodsCollectorVisitor2.prototype.visitTerminal = function(terminal) {
        var key = terminal.terminalType.name + this.separator + "Terminal";
        if (!utils_1.has(this.dslMethods, key)) {
          this.dslMethods[key] = [];
        }
        this.dslMethods[key].push(terminal);
      };
      DslMethodsCollectorVisitor2.prototype.visitNonTerminal = function(subrule) {
        var key = subrule.nonTerminalName + this.separator + "Terminal";
        if (!utils_1.has(this.dslMethods, key)) {
          this.dslMethods[key] = [];
        }
        this.dslMethods[key].push(subrule);
      };
      DslMethodsCollectorVisitor2.prototype.visitOption = function(option) {
        this.dslMethods.option.push(option);
      };
      DslMethodsCollectorVisitor2.prototype.visitRepetitionWithSeparator = function(manySep) {
        this.dslMethods.repetitionWithSeparator.push(manySep);
      };
      DslMethodsCollectorVisitor2.prototype.visitRepetitionMandatory = function(atLeastOne) {
        this.dslMethods.repetitionMandatory.push(atLeastOne);
      };
      DslMethodsCollectorVisitor2.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
        this.dslMethods.repetitionMandatoryWithSeparator.push(atLeastOneSep);
      };
      DslMethodsCollectorVisitor2.prototype.visitRepetition = function(many) {
        this.dslMethods.repetition.push(many);
      };
      DslMethodsCollectorVisitor2.prototype.visitAlternation = function(or) {
        this.dslMethods.alternation.push(or);
      };
      return DslMethodsCollectorVisitor2;
    }(gast_visitor_public_1.GAstVisitor);
    exports2.DslMethodsCollectorVisitor = DslMethodsCollectorVisitor;
    var collectorVisitor = new DslMethodsCollectorVisitor();
    function collectMethods(rule) {
      collectorVisitor.reset();
      rule.accept(collectorVisitor);
      var dslMethods = collectorVisitor.dslMethods;
      collectorVisitor.reset();
      return dslMethods;
    }
    exports2.collectMethods = collectMethods;
  }
});

// lib/src/parse/grammar/first.js
var require_first = __commonJS({
  "lib/src/parse/grammar/first.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.firstForTerminal = exports2.firstForBranching = exports2.firstForSequence = exports2.first = void 0;
    var utils_1 = require_api();
    var gast_public_1 = require_gast_public();
    var gast_1 = require_gast();
    function first2(prod) {
      if (prod instanceof gast_public_1.NonTerminal) {
        return first2(prod.referencedRule);
      } else if (prod instanceof gast_public_1.Terminal) {
        return firstForTerminal(prod);
      } else if (gast_1.isSequenceProd(prod)) {
        return firstForSequence(prod);
      } else if (gast_1.isBranchingProd(prod)) {
        return firstForBranching(prod);
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports2.first = first2;
    function firstForSequence(prod) {
      var firstSet = [];
      var seq = prod.definition;
      var nextSubProdIdx = 0;
      var hasInnerProdsRemaining = seq.length > nextSubProdIdx;
      var currSubProd;
      var isLastInnerProdOptional = true;
      while (hasInnerProdsRemaining && isLastInnerProdOptional) {
        currSubProd = seq[nextSubProdIdx];
        isLastInnerProdOptional = gast_1.isOptionalProd(currSubProd);
        firstSet = firstSet.concat(first2(currSubProd));
        nextSubProdIdx = nextSubProdIdx + 1;
        hasInnerProdsRemaining = seq.length > nextSubProdIdx;
      }
      return utils_1.uniq(firstSet);
    }
    exports2.firstForSequence = firstForSequence;
    function firstForBranching(prod) {
      var allAlternativesFirsts = utils_1.map(prod.definition, function(innerProd) {
        return first2(innerProd);
      });
      return utils_1.uniq(utils_1.flatten(allAlternativesFirsts));
    }
    exports2.firstForBranching = firstForBranching;
    function firstForTerminal(terminal) {
      return [terminal.terminalType];
    }
    exports2.firstForTerminal = firstForTerminal;
  }
});

// lib/src/parse/constants.js
var require_constants = __commonJS({
  "lib/src/parse/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IN = void 0;
    exports2.IN = "_~IN~_";
  }
});

// lib/src/parse/grammar/follow.js
var require_follow = __commonJS({
  "lib/src/parse/grammar/follow.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.buildInProdFollowPrefix = exports2.buildBetweenProdsFollowPrefix = exports2.computeAllProdsFollows = exports2.ResyncFollowsWalker = void 0;
    var rest_1 = require_rest();
    var first_1 = require_first();
    var utils_1 = require_api();
    var constants_1 = require_constants();
    var gast_public_1 = require_gast_public();
    var ResyncFollowsWalker = function(_super) {
      __extends(ResyncFollowsWalker2, _super);
      function ResyncFollowsWalker2(topProd) {
        var _this = _super.call(this) || this;
        _this.topProd = topProd;
        _this.follows = {};
        return _this;
      }
      ResyncFollowsWalker2.prototype.startWalking = function() {
        this.walk(this.topProd);
        return this.follows;
      };
      ResyncFollowsWalker2.prototype.walkTerminal = function(terminal, currRest, prevRest) {
      };
      ResyncFollowsWalker2.prototype.walkProdRef = function(refProd, currRest, prevRest) {
        var followName = buildBetweenProdsFollowPrefix(refProd.referencedRule, refProd.idx) + this.topProd.name;
        var fullRest = currRest.concat(prevRest);
        var restProd = new gast_public_1.Alternative({ definition: fullRest });
        var t_in_topProd_follows = first_1.first(restProd);
        this.follows[followName] = t_in_topProd_follows;
      };
      return ResyncFollowsWalker2;
    }(rest_1.RestWalker);
    exports2.ResyncFollowsWalker = ResyncFollowsWalker;
    function computeAllProdsFollows(topProductions) {
      var reSyncFollows = {};
      utils_1.forEach(topProductions, function(topProd) {
        var currRefsFollow = new ResyncFollowsWalker(topProd).startWalking();
        utils_1.assign(reSyncFollows, currRefsFollow);
      });
      return reSyncFollows;
    }
    exports2.computeAllProdsFollows = computeAllProdsFollows;
    function buildBetweenProdsFollowPrefix(inner, occurenceInParent) {
      return inner.name + occurenceInParent + constants_1.IN;
    }
    exports2.buildBetweenProdsFollowPrefix = buildBetweenProdsFollowPrefix;
    function buildInProdFollowPrefix(terminal) {
      var terminalName = terminal.terminalType.name;
      return terminalName + terminal.idx + constants_1.IN;
    }
    exports2.buildInProdFollowPrefix = buildInProdFollowPrefix;
  }
});

// lib/src/parse/errors_public.js
var require_errors_public = __commonJS({
  "lib/src/parse/errors_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defaultGrammarValidatorErrorProvider = exports2.defaultGrammarResolverErrorProvider = exports2.defaultParserErrorProvider = void 0;
    var tokens_public_1 = require_tokens_public();
    var utils = require_api();
    var utils_1 = require_api();
    var gast_public_1 = require_gast_public();
    var gast_1 = require_gast();
    exports2.defaultParserErrorProvider = {
      buildMismatchTokenMessage: function(_a) {
        var expected = _a.expected, actual = _a.actual, previous = _a.previous, ruleName = _a.ruleName;
        var hasLabel = tokens_public_1.hasTokenLabel(expected);
        var expectedMsg = hasLabel ? "--> " + tokens_public_1.tokenLabel(expected) + " <--" : "token of type --> " + expected.name + " <--";
        var msg = "Expecting " + expectedMsg + " but found --> '" + actual.image + "' <--";
        return msg;
      },
      buildNotAllInputParsedMessage: function(_a) {
        var firstRedundant = _a.firstRedundant, ruleName = _a.ruleName;
        return "Redundant input, expecting EOF but found: " + firstRedundant.image;
      },
      buildNoViableAltMessage: function(_a) {
        var expectedPathsPerAlt = _a.expectedPathsPerAlt, actual = _a.actual, previous = _a.previous, customUserDescription = _a.customUserDescription, ruleName = _a.ruleName;
        var errPrefix = "Expecting: ";
        var actualText = utils_1.first(actual).image;
        var errSuffix = "\nbut found: '" + actualText + "'";
        if (customUserDescription) {
          return errPrefix + customUserDescription + errSuffix;
        } else {
          var allLookAheadPaths = utils_1.reduce(expectedPathsPerAlt, function(result, currAltPaths) {
            return result.concat(currAltPaths);
          }, []);
          var nextValidTokenSequences = utils_1.map(allLookAheadPaths, function(currPath) {
            return "[" + utils_1.map(currPath, function(currTokenType) {
              return tokens_public_1.tokenLabel(currTokenType);
            }).join(", ") + "]";
          });
          var nextValidSequenceItems = utils_1.map(nextValidTokenSequences, function(itemMsg, idx) {
            return "  " + (idx + 1) + ". " + itemMsg;
          });
          var calculatedDescription = "one of these possible Token sequences:\n" + nextValidSequenceItems.join("\n");
          return errPrefix + calculatedDescription + errSuffix;
        }
      },
      buildEarlyExitMessage: function(_a) {
        var expectedIterationPaths = _a.expectedIterationPaths, actual = _a.actual, customUserDescription = _a.customUserDescription, ruleName = _a.ruleName;
        var errPrefix = "Expecting: ";
        var actualText = utils_1.first(actual).image;
        var errSuffix = "\nbut found: '" + actualText + "'";
        if (customUserDescription) {
          return errPrefix + customUserDescription + errSuffix;
        } else {
          var nextValidTokenSequences = utils_1.map(expectedIterationPaths, function(currPath) {
            return "[" + utils_1.map(currPath, function(currTokenType) {
              return tokens_public_1.tokenLabel(currTokenType);
            }).join(",") + "]";
          });
          var calculatedDescription = "expecting at least one iteration which starts with one of these possible Token sequences::\n  " + ("<" + nextValidTokenSequences.join(" ,") + ">");
          return errPrefix + calculatedDescription + errSuffix;
        }
      }
    };
    Object.freeze(exports2.defaultParserErrorProvider);
    exports2.defaultGrammarResolverErrorProvider = {
      buildRuleNotFoundError: function(topLevelRule, undefinedRule) {
        var msg = "Invalid grammar, reference to a rule which is not defined: ->" + undefinedRule.nonTerminalName + "<-\ninside top level rule: ->" + topLevelRule.name + "<-";
        return msg;
      }
    };
    exports2.defaultGrammarValidatorErrorProvider = {
      buildDuplicateFoundError: function(topLevelRule, duplicateProds) {
        function getExtraProductionArgument(prod) {
          if (prod instanceof gast_public_1.Terminal) {
            return prod.terminalType.name;
          } else if (prod instanceof gast_public_1.NonTerminal) {
            return prod.nonTerminalName;
          } else {
            return "";
          }
        }
        var topLevelName = topLevelRule.name;
        var duplicateProd = utils_1.first(duplicateProds);
        var index = duplicateProd.idx;
        var dslName = gast_1.getProductionDslName(duplicateProd);
        var extraArgument = getExtraProductionArgument(duplicateProd);
        var hasExplicitIndex = index > 0;
        var msg = "->" + dslName + (hasExplicitIndex ? index : "") + "<- " + (extraArgument ? "with argument: ->" + extraArgument + "<-" : "") + "\n                  appears more than once (" + duplicateProds.length + " times) in the top level rule: ->" + topLevelName + "<-.                  \n                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES \n                  ";
        msg = msg.replace(/[ \t]+/g, " ");
        msg = msg.replace(/\s\s+/g, "\n");
        return msg;
      },
      buildNamespaceConflictError: function(rule) {
        var errMsg = "Namespace conflict found in grammar.\n" + ("The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <" + rule.name + ">.\n") + "To resolve this make sure each Terminal and Non-Terminal names are unique\nThis is easy to accomplish by using the convention that Terminal names start with an uppercase letter\nand Non-Terminal names start with a lower case letter.";
        return errMsg;
      },
      buildAlternationPrefixAmbiguityError: function(options) {
        var pathMsg = utils_1.map(options.prefixPath, function(currTok) {
          return tokens_public_1.tokenLabel(currTok);
        }).join(", ");
        var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
        var errMsg = "Ambiguous alternatives: <" + options.ambiguityIndices.join(" ,") + "> due to common lookahead prefix\n" + ("in <OR" + occurrence + "> inside <" + options.topLevelRule.name + "> Rule,\n") + ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n") + "See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX\nFor Further details.";
        return errMsg;
      },
      buildAlternationAmbiguityError: function(options) {
        var pathMsg = utils_1.map(options.prefixPath, function(currtok) {
          return tokens_public_1.tokenLabel(currtok);
        }).join(", ");
        var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
        var currMessage = "Ambiguous Alternatives Detected: <" + options.ambiguityIndices.join(" ,") + "> in <OR" + occurrence + ">" + (" inside <" + options.topLevelRule.name + "> Rule,\n") + ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n");
        currMessage = currMessage + "See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\nFor Further details.";
        return currMessage;
      },
      buildEmptyRepetitionError: function(options) {
        var dslName = gast_1.getProductionDslName(options.repetition);
        if (options.repetition.idx !== 0) {
          dslName += options.repetition.idx;
        }
        var errMsg = "The repetition <" + dslName + "> within Rule <" + options.topLevelRule.name + "> can never consume any tokens.\nThis could lead to an infinite loop.";
        return errMsg;
      },
      buildTokenNameError: function(options) {
        return "deprecated";
      },
      buildEmptyAlternationError: function(options) {
        var errMsg = "Ambiguous empty alternative: <" + (options.emptyChoiceIdx + 1) + ">" + (" in <OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n") + "Only the last alternative may be an empty alternative.";
        return errMsg;
      },
      buildTooManyAlternativesError: function(options) {
        var errMsg = "An Alternation cannot have more than 256 alternatives:\n" + ("<OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n has " + (options.alternation.definition.length + 1) + " alternatives.");
        return errMsg;
      },
      buildLeftRecursionError: function(options) {
        var ruleName = options.topLevelRule.name;
        var pathNames = utils.map(options.leftRecursionPath, function(currRule) {
          return currRule.name;
        });
        var leftRecursivePath = ruleName + " --> " + pathNames.concat([ruleName]).join(" --> ");
        var errMsg = "Left Recursion found in grammar.\n" + ("rule: <" + ruleName + "> can be invoked from itself (directly or indirectly)\n") + ("without consuming any Tokens. The grammar path that causes this is: \n " + leftRecursivePath + "\n") + " To fix this refactor your grammar to remove the left recursion.\nsee: https://en.wikipedia.org/wiki/LL_parser#Left_Factoring.";
        return errMsg;
      },
      buildInvalidRuleNameError: function(options) {
        return "deprecated";
      },
      buildDuplicateRuleNameError: function(options) {
        var ruleName;
        if (options.topLevelRule instanceof gast_public_1.Rule) {
          ruleName = options.topLevelRule.name;
        } else {
          ruleName = options.topLevelRule;
        }
        var errMsg = "Duplicate definition, rule: ->" + ruleName + "<- is already defined in the grammar: ->" + options.grammarName + "<-";
        return errMsg;
      }
    };
  }
});

// lib/src/parse/grammar/resolver.js
var require_resolver = __commonJS({
  "lib/src/parse/grammar/resolver.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GastRefResolverVisitor = exports2.resolveGrammar = void 0;
    var parser_1 = require_parser();
    var utils_1 = require_api();
    var gast_visitor_public_1 = require_gast_visitor_public();
    function resolveGrammar(topLevels, errMsgProvider) {
      var refResolver = new GastRefResolverVisitor(topLevels, errMsgProvider);
      refResolver.resolveRefs();
      return refResolver.errors;
    }
    exports2.resolveGrammar = resolveGrammar;
    var GastRefResolverVisitor = function(_super) {
      __extends(GastRefResolverVisitor2, _super);
      function GastRefResolverVisitor2(nameToTopRule, errMsgProvider) {
        var _this = _super.call(this) || this;
        _this.nameToTopRule = nameToTopRule;
        _this.errMsgProvider = errMsgProvider;
        _this.errors = [];
        return _this;
      }
      GastRefResolverVisitor2.prototype.resolveRefs = function() {
        var _this = this;
        utils_1.forEach(utils_1.values(this.nameToTopRule), function(prod) {
          _this.currTopLevel = prod;
          prod.accept(_this);
        });
      };
      GastRefResolverVisitor2.prototype.visitNonTerminal = function(node) {
        var ref = this.nameToTopRule[node.nonTerminalName];
        if (!ref) {
          var msg = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, node);
          this.errors.push({
            message: msg,
            type: parser_1.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,
            ruleName: this.currTopLevel.name,
            unresolvedRefName: node.nonTerminalName
          });
        } else {
          node.referencedRule = ref;
        }
      };
      return GastRefResolverVisitor2;
    }(gast_visitor_public_1.GAstVisitor);
    exports2.GastRefResolverVisitor = GastRefResolverVisitor;
  }
});

// lib/src/parse/grammar/interpreter.js
var require_interpreter = __commonJS({
  "lib/src/parse/grammar/interpreter.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.nextPossibleTokensAfter = exports2.possiblePathsFrom = exports2.NextTerminalAfterAtLeastOneSepWalker = exports2.NextTerminalAfterAtLeastOneWalker = exports2.NextTerminalAfterManySepWalker = exports2.NextTerminalAfterManyWalker = exports2.AbstractNextTerminalAfterProductionWalker = exports2.NextAfterTokenWalker = exports2.AbstractNextPossibleTokensWalker = void 0;
    var rest_1 = require_rest();
    var utils_1 = require_api();
    var first_1 = require_first();
    var gast_public_1 = require_gast_public();
    var AbstractNextPossibleTokensWalker = function(_super) {
      __extends(AbstractNextPossibleTokensWalker2, _super);
      function AbstractNextPossibleTokensWalker2(topProd, path) {
        var _this = _super.call(this) || this;
        _this.topProd = topProd;
        _this.path = path;
        _this.possibleTokTypes = [];
        _this.nextProductionName = "";
        _this.nextProductionOccurrence = 0;
        _this.found = false;
        _this.isAtEndOfPath = false;
        return _this;
      }
      AbstractNextPossibleTokensWalker2.prototype.startWalking = function() {
        this.found = false;
        if (this.path.ruleStack[0] !== this.topProd.name) {
          throw Error("The path does not start with the walker's top Rule!");
        }
        this.ruleStack = utils_1.cloneArr(this.path.ruleStack).reverse();
        this.occurrenceStack = utils_1.cloneArr(this.path.occurrenceStack).reverse();
        this.ruleStack.pop();
        this.occurrenceStack.pop();
        this.updateExpectedNext();
        this.walk(this.topProd);
        return this.possibleTokTypes;
      };
      AbstractNextPossibleTokensWalker2.prototype.walk = function(prod, prevRest) {
        if (prevRest === void 0) {
          prevRest = [];
        }
        if (!this.found) {
          _super.prototype.walk.call(this, prod, prevRest);
        }
      };
      AbstractNextPossibleTokensWalker2.prototype.walkProdRef = function(refProd, currRest, prevRest) {
        if (refProd.referencedRule.name === this.nextProductionName && refProd.idx === this.nextProductionOccurrence) {
          var fullRest = currRest.concat(prevRest);
          this.updateExpectedNext();
          this.walk(refProd.referencedRule, fullRest);
        }
      };
      AbstractNextPossibleTokensWalker2.prototype.updateExpectedNext = function() {
        if (utils_1.isEmpty(this.ruleStack)) {
          this.nextProductionName = "";
          this.nextProductionOccurrence = 0;
          this.isAtEndOfPath = true;
        } else {
          this.nextProductionName = this.ruleStack.pop();
          this.nextProductionOccurrence = this.occurrenceStack.pop();
        }
      };
      return AbstractNextPossibleTokensWalker2;
    }(rest_1.RestWalker);
    exports2.AbstractNextPossibleTokensWalker = AbstractNextPossibleTokensWalker;
    var NextAfterTokenWalker = function(_super) {
      __extends(NextAfterTokenWalker2, _super);
      function NextAfterTokenWalker2(topProd, path) {
        var _this = _super.call(this, topProd, path) || this;
        _this.path = path;
        _this.nextTerminalName = "";
        _this.nextTerminalOccurrence = 0;
        _this.nextTerminalName = _this.path.lastTok.name;
        _this.nextTerminalOccurrence = _this.path.lastTokOccurrence;
        return _this;
      }
      NextAfterTokenWalker2.prototype.walkTerminal = function(terminal, currRest, prevRest) {
        if (this.isAtEndOfPath && terminal.terminalType.name === this.nextTerminalName && terminal.idx === this.nextTerminalOccurrence && !this.found) {
          var fullRest = currRest.concat(prevRest);
          var restProd = new gast_public_1.Alternative({ definition: fullRest });
          this.possibleTokTypes = first_1.first(restProd);
          this.found = true;
        }
      };
      return NextAfterTokenWalker2;
    }(AbstractNextPossibleTokensWalker);
    exports2.NextAfterTokenWalker = NextAfterTokenWalker;
    var AbstractNextTerminalAfterProductionWalker = function(_super) {
      __extends(AbstractNextTerminalAfterProductionWalker2, _super);
      function AbstractNextTerminalAfterProductionWalker2(topRule, occurrence) {
        var _this = _super.call(this) || this;
        _this.topRule = topRule;
        _this.occurrence = occurrence;
        _this.result = {
          token: void 0,
          occurrence: void 0,
          isEndOfRule: void 0
        };
        return _this;
      }
      AbstractNextTerminalAfterProductionWalker2.prototype.startWalking = function() {
        this.walk(this.topRule);
        return this.result;
      };
      return AbstractNextTerminalAfterProductionWalker2;
    }(rest_1.RestWalker);
    exports2.AbstractNextTerminalAfterProductionWalker = AbstractNextTerminalAfterProductionWalker;
    var NextTerminalAfterManyWalker = function(_super) {
      __extends(NextTerminalAfterManyWalker2, _super);
      function NextTerminalAfterManyWalker2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NextTerminalAfterManyWalker2.prototype.walkMany = function(manyProd, currRest, prevRest) {
        if (manyProd.idx === this.occurrence) {
          var firstAfterMany = utils_1.first(currRest.concat(prevRest));
          this.result.isEndOfRule = firstAfterMany === void 0;
          if (firstAfterMany instanceof gast_public_1.Terminal) {
            this.result.token = firstAfterMany.terminalType;
            this.result.occurrence = firstAfterMany.idx;
          }
        } else {
          _super.prototype.walkMany.call(this, manyProd, currRest, prevRest);
        }
      };
      return NextTerminalAfterManyWalker2;
    }(AbstractNextTerminalAfterProductionWalker);
    exports2.NextTerminalAfterManyWalker = NextTerminalAfterManyWalker;
    var NextTerminalAfterManySepWalker = function(_super) {
      __extends(NextTerminalAfterManySepWalker2, _super);
      function NextTerminalAfterManySepWalker2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NextTerminalAfterManySepWalker2.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
        if (manySepProd.idx === this.occurrence) {
          var firstAfterManySep = utils_1.first(currRest.concat(prevRest));
          this.result.isEndOfRule = firstAfterManySep === void 0;
          if (firstAfterManySep instanceof gast_public_1.Terminal) {
            this.result.token = firstAfterManySep.terminalType;
            this.result.occurrence = firstAfterManySep.idx;
          }
        } else {
          _super.prototype.walkManySep.call(this, manySepProd, currRest, prevRest);
        }
      };
      return NextTerminalAfterManySepWalker2;
    }(AbstractNextTerminalAfterProductionWalker);
    exports2.NextTerminalAfterManySepWalker = NextTerminalAfterManySepWalker;
    var NextTerminalAfterAtLeastOneWalker = function(_super) {
      __extends(NextTerminalAfterAtLeastOneWalker2, _super);
      function NextTerminalAfterAtLeastOneWalker2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NextTerminalAfterAtLeastOneWalker2.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
        if (atLeastOneProd.idx === this.occurrence) {
          var firstAfterAtLeastOne = utils_1.first(currRest.concat(prevRest));
          this.result.isEndOfRule = firstAfterAtLeastOne === void 0;
          if (firstAfterAtLeastOne instanceof gast_public_1.Terminal) {
            this.result.token = firstAfterAtLeastOne.terminalType;
            this.result.occurrence = firstAfterAtLeastOne.idx;
          }
        } else {
          _super.prototype.walkAtLeastOne.call(this, atLeastOneProd, currRest, prevRest);
        }
      };
      return NextTerminalAfterAtLeastOneWalker2;
    }(AbstractNextTerminalAfterProductionWalker);
    exports2.NextTerminalAfterAtLeastOneWalker = NextTerminalAfterAtLeastOneWalker;
    var NextTerminalAfterAtLeastOneSepWalker = function(_super) {
      __extends(NextTerminalAfterAtLeastOneSepWalker2, _super);
      function NextTerminalAfterAtLeastOneSepWalker2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NextTerminalAfterAtLeastOneSepWalker2.prototype.walkAtLeastOneSep = function(atleastOneSepProd, currRest, prevRest) {
        if (atleastOneSepProd.idx === this.occurrence) {
          var firstAfterfirstAfterAtLeastOneSep = utils_1.first(currRest.concat(prevRest));
          this.result.isEndOfRule = firstAfterfirstAfterAtLeastOneSep === void 0;
          if (firstAfterfirstAfterAtLeastOneSep instanceof gast_public_1.Terminal) {
            this.result.token = firstAfterfirstAfterAtLeastOneSep.terminalType;
            this.result.occurrence = firstAfterfirstAfterAtLeastOneSep.idx;
          }
        } else {
          _super.prototype.walkAtLeastOneSep.call(this, atleastOneSepProd, currRest, prevRest);
        }
      };
      return NextTerminalAfterAtLeastOneSepWalker2;
    }(AbstractNextTerminalAfterProductionWalker);
    exports2.NextTerminalAfterAtLeastOneSepWalker = NextTerminalAfterAtLeastOneSepWalker;
    function possiblePathsFrom(targetDef, maxLength, currPath) {
      if (currPath === void 0) {
        currPath = [];
      }
      currPath = utils_1.cloneArr(currPath);
      var result = [];
      var i = 0;
      function remainingPathWith(nextDef) {
        return nextDef.concat(utils_1.drop(targetDef, i + 1));
      }
      function getAlternativesForProd(definition) {
        var alternatives = possiblePathsFrom(remainingPathWith(definition), maxLength, currPath);
        return result.concat(alternatives);
      }
      while (currPath.length < maxLength && i < targetDef.length) {
        var prod = targetDef[i];
        if (prod instanceof gast_public_1.Alternative) {
          return getAlternativesForProd(prod.definition);
        } else if (prod instanceof gast_public_1.NonTerminal) {
          return getAlternativesForProd(prod.definition);
        } else if (prod instanceof gast_public_1.Option) {
          result = getAlternativesForProd(prod.definition);
        } else if (prod instanceof gast_public_1.RepetitionMandatory) {
          var newDef = prod.definition.concat([
            new gast_public_1.Repetition({
              definition: prod.definition
            })
          ]);
          return getAlternativesForProd(newDef);
        } else if (prod instanceof gast_public_1.RepetitionMandatoryWithSeparator) {
          var newDef = [
            new gast_public_1.Alternative({ definition: prod.definition }),
            new gast_public_1.Repetition({
              definition: [new gast_public_1.Terminal({ terminalType: prod.separator })].concat(prod.definition)
            })
          ];
          return getAlternativesForProd(newDef);
        } else if (prod instanceof gast_public_1.RepetitionWithSeparator) {
          var newDef = prod.definition.concat([
            new gast_public_1.Repetition({
              definition: [new gast_public_1.Terminal({ terminalType: prod.separator })].concat(prod.definition)
            })
          ]);
          result = getAlternativesForProd(newDef);
        } else if (prod instanceof gast_public_1.Repetition) {
          var newDef = prod.definition.concat([
            new gast_public_1.Repetition({
              definition: prod.definition
            })
          ]);
          result = getAlternativesForProd(newDef);
        } else if (prod instanceof gast_public_1.Alternation) {
          utils_1.forEach(prod.definition, function(currAlt) {
            if (utils_1.isEmpty(currAlt.definition) === false) {
              result = getAlternativesForProd(currAlt.definition);
            }
          });
          return result;
        } else if (prod instanceof gast_public_1.Terminal) {
          currPath.push(prod.terminalType);
        } else {
          throw Error("non exhaustive match");
        }
        i++;
      }
      result.push({
        partialPath: currPath,
        suffixDef: utils_1.drop(targetDef, i)
      });
      return result;
    }
    exports2.possiblePathsFrom = possiblePathsFrom;
    function nextPossibleTokensAfter(initialDef, tokenVector, tokMatcher, maxLookAhead) {
      var EXIT_NON_TERMINAL = "EXIT_NONE_TERMINAL";
      var EXIT_NON_TERMINAL_ARR = [EXIT_NON_TERMINAL];
      var EXIT_ALTERNATIVE = "EXIT_ALTERNATIVE";
      var foundCompletePath = false;
      var tokenVectorLength = tokenVector.length;
      var minimalAlternativesIndex = tokenVectorLength - maxLookAhead - 1;
      var result = [];
      var possiblePaths = [];
      possiblePaths.push({
        idx: -1,
        def: initialDef,
        ruleStack: [],
        occurrenceStack: []
      });
      while (!utils_1.isEmpty(possiblePaths)) {
        var currPath = possiblePaths.pop();
        if (currPath === EXIT_ALTERNATIVE) {
          if (foundCompletePath && utils_1.last(possiblePaths).idx <= minimalAlternativesIndex) {
            possiblePaths.pop();
          }
          continue;
        }
        var currDef = currPath.def;
        var currIdx = currPath.idx;
        var currRuleStack = currPath.ruleStack;
        var currOccurrenceStack = currPath.occurrenceStack;
        if (utils_1.isEmpty(currDef)) {
          continue;
        }
        var prod = currDef[0];
        if (prod === EXIT_NON_TERMINAL) {
          var nextPath = {
            idx: currIdx,
            def: utils_1.drop(currDef),
            ruleStack: utils_1.dropRight(currRuleStack),
            occurrenceStack: utils_1.dropRight(currOccurrenceStack)
          };
          possiblePaths.push(nextPath);
        } else if (prod instanceof gast_public_1.Terminal) {
          if (currIdx < tokenVectorLength - 1) {
            var nextIdx = currIdx + 1;
            var actualToken = tokenVector[nextIdx];
            if (tokMatcher(actualToken, prod.terminalType)) {
              var nextPath = {
                idx: nextIdx,
                def: utils_1.drop(currDef),
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
              };
              possiblePaths.push(nextPath);
            }
          } else if (currIdx === tokenVectorLength - 1) {
            result.push({
              nextTokenType: prod.terminalType,
              nextTokenOccurrence: prod.idx,
              ruleStack: currRuleStack,
              occurrenceStack: currOccurrenceStack
            });
            foundCompletePath = true;
          } else {
            throw Error("non exhaustive match");
          }
        } else if (prod instanceof gast_public_1.NonTerminal) {
          var newRuleStack = utils_1.cloneArr(currRuleStack);
          newRuleStack.push(prod.nonTerminalName);
          var newOccurrenceStack = utils_1.cloneArr(currOccurrenceStack);
          newOccurrenceStack.push(prod.idx);
          var nextPath = {
            idx: currIdx,
            def: prod.definition.concat(EXIT_NON_TERMINAL_ARR, utils_1.drop(currDef)),
            ruleStack: newRuleStack,
            occurrenceStack: newOccurrenceStack
          };
          possiblePaths.push(nextPath);
        } else if (prod instanceof gast_public_1.Option) {
          var nextPathWithout = {
            idx: currIdx,
            def: utils_1.drop(currDef),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPathWithout);
          possiblePaths.push(EXIT_ALTERNATIVE);
          var nextPathWith = {
            idx: currIdx,
            def: prod.definition.concat(utils_1.drop(currDef)),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPathWith);
        } else if (prod instanceof gast_public_1.RepetitionMandatory) {
          var secondIteration = new gast_public_1.Repetition({
            definition: prod.definition,
            idx: prod.idx
          });
          var nextDef = prod.definition.concat([secondIteration], utils_1.drop(currDef));
          var nextPath = {
            idx: currIdx,
            def: nextDef,
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPath);
        } else if (prod instanceof gast_public_1.RepetitionMandatoryWithSeparator) {
          var separatorGast = new gast_public_1.Terminal({
            terminalType: prod.separator
          });
          var secondIteration = new gast_public_1.Repetition({
            definition: [separatorGast].concat(prod.definition),
            idx: prod.idx
          });
          var nextDef = prod.definition.concat([secondIteration], utils_1.drop(currDef));
          var nextPath = {
            idx: currIdx,
            def: nextDef,
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPath);
        } else if (prod instanceof gast_public_1.RepetitionWithSeparator) {
          var nextPathWithout = {
            idx: currIdx,
            def: utils_1.drop(currDef),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPathWithout);
          possiblePaths.push(EXIT_ALTERNATIVE);
          var separatorGast = new gast_public_1.Terminal({
            terminalType: prod.separator
          });
          var nthRepetition = new gast_public_1.Repetition({
            definition: [separatorGast].concat(prod.definition),
            idx: prod.idx
          });
          var nextDef = prod.definition.concat([nthRepetition], utils_1.drop(currDef));
          var nextPathWith = {
            idx: currIdx,
            def: nextDef,
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPathWith);
        } else if (prod instanceof gast_public_1.Repetition) {
          var nextPathWithout = {
            idx: currIdx,
            def: utils_1.drop(currDef),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPathWithout);
          possiblePaths.push(EXIT_ALTERNATIVE);
          var nthRepetition = new gast_public_1.Repetition({
            definition: prod.definition,
            idx: prod.idx
          });
          var nextDef = prod.definition.concat([nthRepetition], utils_1.drop(currDef));
          var nextPathWith = {
            idx: currIdx,
            def: nextDef,
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(nextPathWith);
        } else if (prod instanceof gast_public_1.Alternation) {
          for (var i = prod.definition.length - 1; i >= 0; i--) {
            var currAlt = prod.definition[i];
            var currAltPath = {
              idx: currIdx,
              def: currAlt.definition.concat(utils_1.drop(currDef)),
              ruleStack: currRuleStack,
              occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(currAltPath);
            possiblePaths.push(EXIT_ALTERNATIVE);
          }
        } else if (prod instanceof gast_public_1.Alternative) {
          possiblePaths.push({
            idx: currIdx,
            def: prod.definition.concat(utils_1.drop(currDef)),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          });
        } else if (prod instanceof gast_public_1.Rule) {
          possiblePaths.push(expandTopLevelRule(prod, currIdx, currRuleStack, currOccurrenceStack));
        } else {
          throw Error("non exhaustive match");
        }
      }
      return result;
    }
    exports2.nextPossibleTokensAfter = nextPossibleTokensAfter;
    function expandTopLevelRule(topRule, currIdx, currRuleStack, currOccurrenceStack) {
      var newRuleStack = utils_1.cloneArr(currRuleStack);
      newRuleStack.push(topRule.name);
      var newCurrOccurrenceStack = utils_1.cloneArr(currOccurrenceStack);
      newCurrOccurrenceStack.push(1);
      return {
        idx: currIdx,
        def: topRule.definition,
        ruleStack: newRuleStack,
        occurrenceStack: newCurrOccurrenceStack
      };
    }
  }
});

// lib/src/parse/grammar/lookahead.js
var require_lookahead = __commonJS({
  "lib/src/parse/grammar/lookahead.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.areTokenCategoriesNotUsed = exports2.isStrictPrefixOfPath = exports2.containsPath = exports2.getLookaheadPathsForOptionalProd = exports2.getLookaheadPathsForOr = exports2.lookAheadSequenceFromAlternatives = exports2.buildSingleAlternativeLookaheadFunction = exports2.buildAlternativesLookAheadFunc = exports2.buildLookaheadFuncForOptionalProd = exports2.buildLookaheadFuncForOr = exports2.getProdType = exports2.PROD_TYPE = void 0;
    var utils_1 = require_api();
    var interpreter_1 = require_interpreter();
    var rest_1 = require_rest();
    var tokens_1 = require_tokens();
    var gast_public_1 = require_gast_public();
    var gast_visitor_public_1 = require_gast_visitor_public();
    var PROD_TYPE;
    (function(PROD_TYPE2) {
      PROD_TYPE2[PROD_TYPE2["OPTION"] = 0] = "OPTION";
      PROD_TYPE2[PROD_TYPE2["REPETITION"] = 1] = "REPETITION";
      PROD_TYPE2[PROD_TYPE2["REPETITION_MANDATORY"] = 2] = "REPETITION_MANDATORY";
      PROD_TYPE2[PROD_TYPE2["REPETITION_MANDATORY_WITH_SEPARATOR"] = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR";
      PROD_TYPE2[PROD_TYPE2["REPETITION_WITH_SEPARATOR"] = 4] = "REPETITION_WITH_SEPARATOR";
      PROD_TYPE2[PROD_TYPE2["ALTERNATION"] = 5] = "ALTERNATION";
    })(PROD_TYPE = exports2.PROD_TYPE || (exports2.PROD_TYPE = {}));
    function getProdType(prod) {
      if (prod instanceof gast_public_1.Option) {
        return PROD_TYPE.OPTION;
      } else if (prod instanceof gast_public_1.Repetition) {
        return PROD_TYPE.REPETITION;
      } else if (prod instanceof gast_public_1.RepetitionMandatory) {
        return PROD_TYPE.REPETITION_MANDATORY;
      } else if (prod instanceof gast_public_1.RepetitionMandatoryWithSeparator) {
        return PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR;
      } else if (prod instanceof gast_public_1.RepetitionWithSeparator) {
        return PROD_TYPE.REPETITION_WITH_SEPARATOR;
      } else if (prod instanceof gast_public_1.Alternation) {
        return PROD_TYPE.ALTERNATION;
      } else {
        throw Error("non exhaustive match");
      }
    }
    exports2.getProdType = getProdType;
    function buildLookaheadFuncForOr(occurrence, ruleGrammar, maxLookahead, hasPredicates, dynamicTokensEnabled, laFuncBuilder) {
      var lookAheadPaths = getLookaheadPathsForOr(occurrence, ruleGrammar, maxLookahead);
      var tokenMatcher = areTokenCategoriesNotUsed(lookAheadPaths) ? tokens_1.tokenStructuredMatcherNoCategories : tokens_1.tokenStructuredMatcher;
      return laFuncBuilder(lookAheadPaths, hasPredicates, tokenMatcher, dynamicTokensEnabled);
    }
    exports2.buildLookaheadFuncForOr = buildLookaheadFuncForOr;
    function buildLookaheadFuncForOptionalProd(occurrence, ruleGrammar, k, dynamicTokensEnabled, prodType, lookaheadBuilder) {
      var lookAheadPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k);
      var tokenMatcher = areTokenCategoriesNotUsed(lookAheadPaths) ? tokens_1.tokenStructuredMatcherNoCategories : tokens_1.tokenStructuredMatcher;
      return lookaheadBuilder(lookAheadPaths[0], tokenMatcher, dynamicTokensEnabled);
    }
    exports2.buildLookaheadFuncForOptionalProd = buildLookaheadFuncForOptionalProd;
    function buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled) {
      var numOfAlts = alts.length;
      var areAllOneTokenLookahead = utils_1.every(alts, function(currAlt) {
        return utils_1.every(currAlt, function(currPath) {
          return currPath.length === 1;
        });
      });
      if (hasPredicates) {
        return function(orAlts) {
          var predicates = utils_1.map(orAlts, function(currAlt2) {
            return currAlt2.GATE;
          });
          for (var t = 0; t < numOfAlts; t++) {
            var currAlt = alts[t];
            var currNumOfPaths = currAlt.length;
            var currPredicate = predicates[t];
            if (currPredicate !== void 0 && currPredicate.call(this) === false) {
              continue;
            }
            nextPath:
              for (var j = 0; j < currNumOfPaths; j++) {
                var currPath = currAlt[j];
                var currPathLength = currPath.length;
                for (var i = 0; i < currPathLength; i++) {
                  var nextToken = this.LA(i + 1);
                  if (tokenMatcher(nextToken, currPath[i]) === false) {
                    continue nextPath;
                  }
                }
                return t;
              }
          }
          return void 0;
        };
      } else if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
        var singleTokenAlts = utils_1.map(alts, function(currAlt) {
          return utils_1.flatten(currAlt);
        });
        var choiceToAlt_1 = utils_1.reduce(singleTokenAlts, function(result, currAlt, idx) {
          utils_1.forEach(currAlt, function(currTokType) {
            if (!utils_1.has(result, currTokType.tokenTypeIdx)) {
              result[currTokType.tokenTypeIdx] = idx;
            }
            utils_1.forEach(currTokType.categoryMatches, function(currExtendingType) {
              if (!utils_1.has(result, currExtendingType)) {
                result[currExtendingType] = idx;
              }
            });
          });
          return result;
        }, []);
        return function() {
          var nextToken = this.LA(1);
          return choiceToAlt_1[nextToken.tokenTypeIdx];
        };
      } else {
        return function() {
          for (var t = 0; t < numOfAlts; t++) {
            var currAlt = alts[t];
            var currNumOfPaths = currAlt.length;
            nextPath:
              for (var j = 0; j < currNumOfPaths; j++) {
                var currPath = currAlt[j];
                var currPathLength = currPath.length;
                for (var i = 0; i < currPathLength; i++) {
                  var nextToken = this.LA(i + 1);
                  if (tokenMatcher(nextToken, currPath[i]) === false) {
                    continue nextPath;
                  }
                }
                return t;
              }
          }
          return void 0;
        };
      }
    }
    exports2.buildAlternativesLookAheadFunc = buildAlternativesLookAheadFunc;
    function buildSingleAlternativeLookaheadFunction(alt, tokenMatcher, dynamicTokensEnabled) {
      var areAllOneTokenLookahead = utils_1.every(alt, function(currPath) {
        return currPath.length === 1;
      });
      var numOfPaths = alt.length;
      if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
        var singleTokensTypes = utils_1.flatten(alt);
        if (singleTokensTypes.length === 1 && utils_1.isEmpty(singleTokensTypes[0].categoryMatches)) {
          var expectedTokenType = singleTokensTypes[0];
          var expectedTokenUniqueKey_1 = expectedTokenType.tokenTypeIdx;
          return function() {
            return this.LA(1).tokenTypeIdx === expectedTokenUniqueKey_1;
          };
        } else {
          var choiceToAlt_2 = utils_1.reduce(singleTokensTypes, function(result, currTokType, idx) {
            result[currTokType.tokenTypeIdx] = true;
            utils_1.forEach(currTokType.categoryMatches, function(currExtendingType) {
              result[currExtendingType] = true;
            });
            return result;
          }, []);
          return function() {
            var nextToken = this.LA(1);
            return choiceToAlt_2[nextToken.tokenTypeIdx] === true;
          };
        }
      } else {
        return function() {
          nextPath:
            for (var j = 0; j < numOfPaths; j++) {
              var currPath = alt[j];
              var currPathLength = currPath.length;
              for (var i = 0; i < currPathLength; i++) {
                var nextToken = this.LA(i + 1);
                if (tokenMatcher(nextToken, currPath[i]) === false) {
                  continue nextPath;
                }
              }
              return true;
            }
          return false;
        };
      }
    }
    exports2.buildSingleAlternativeLookaheadFunction = buildSingleAlternativeLookaheadFunction;
    var RestDefinitionFinderWalker = function(_super) {
      __extends(RestDefinitionFinderWalker2, _super);
      function RestDefinitionFinderWalker2(topProd, targetOccurrence, targetProdType) {
        var _this = _super.call(this) || this;
        _this.topProd = topProd;
        _this.targetOccurrence = targetOccurrence;
        _this.targetProdType = targetProdType;
        return _this;
      }
      RestDefinitionFinderWalker2.prototype.startWalking = function() {
        this.walk(this.topProd);
        return this.restDef;
      };
      RestDefinitionFinderWalker2.prototype.checkIsTarget = function(node, expectedProdType, currRest, prevRest) {
        if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdType) {
          this.restDef = currRest.concat(prevRest);
          return true;
        }
        return false;
      };
      RestDefinitionFinderWalker2.prototype.walkOption = function(optionProd, currRest, prevRest) {
        if (!this.checkIsTarget(optionProd, PROD_TYPE.OPTION, currRest, prevRest)) {
          _super.prototype.walkOption.call(this, optionProd, currRest, prevRest);
        }
      };
      RestDefinitionFinderWalker2.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
        if (!this.checkIsTarget(atLeastOneProd, PROD_TYPE.REPETITION_MANDATORY, currRest, prevRest)) {
          _super.prototype.walkOption.call(this, atLeastOneProd, currRest, prevRest);
        }
      };
      RestDefinitionFinderWalker2.prototype.walkAtLeastOneSep = function(atLeastOneSepProd, currRest, prevRest) {
        if (!this.checkIsTarget(atLeastOneSepProd, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currRest, prevRest)) {
          _super.prototype.walkOption.call(this, atLeastOneSepProd, currRest, prevRest);
        }
      };
      RestDefinitionFinderWalker2.prototype.walkMany = function(manyProd, currRest, prevRest) {
        if (!this.checkIsTarget(manyProd, PROD_TYPE.REPETITION, currRest, prevRest)) {
          _super.prototype.walkOption.call(this, manyProd, currRest, prevRest);
        }
      };
      RestDefinitionFinderWalker2.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
        if (!this.checkIsTarget(manySepProd, PROD_TYPE.REPETITION_WITH_SEPARATOR, currRest, prevRest)) {
          _super.prototype.walkOption.call(this, manySepProd, currRest, prevRest);
        }
      };
      return RestDefinitionFinderWalker2;
    }(rest_1.RestWalker);
    var InsideDefinitionFinderVisitor = function(_super) {
      __extends(InsideDefinitionFinderVisitor2, _super);
      function InsideDefinitionFinderVisitor2(targetOccurrence, targetProdType, targetRef) {
        var _this = _super.call(this) || this;
        _this.targetOccurrence = targetOccurrence;
        _this.targetProdType = targetProdType;
        _this.targetRef = targetRef;
        _this.result = [];
        return _this;
      }
      InsideDefinitionFinderVisitor2.prototype.checkIsTarget = function(node, expectedProdName) {
        if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdName && (this.targetRef === void 0 || node === this.targetRef)) {
          this.result = node.definition;
        }
      };
      InsideDefinitionFinderVisitor2.prototype.visitOption = function(node) {
        this.checkIsTarget(node, PROD_TYPE.OPTION);
      };
      InsideDefinitionFinderVisitor2.prototype.visitRepetition = function(node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION);
      };
      InsideDefinitionFinderVisitor2.prototype.visitRepetitionMandatory = function(node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY);
      };
      InsideDefinitionFinderVisitor2.prototype.visitRepetitionMandatoryWithSeparator = function(node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR);
      };
      InsideDefinitionFinderVisitor2.prototype.visitRepetitionWithSeparator = function(node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_WITH_SEPARATOR);
      };
      InsideDefinitionFinderVisitor2.prototype.visitAlternation = function(node) {
        this.checkIsTarget(node, PROD_TYPE.ALTERNATION);
      };
      return InsideDefinitionFinderVisitor2;
    }(gast_visitor_public_1.GAstVisitor);
    function initializeArrayOfArrays(size) {
      var result = new Array(size);
      for (var i = 0; i < size; i++) {
        result[i] = [];
      }
      return result;
    }
    function pathToHashKeys(path) {
      var keys2 = [""];
      for (var i = 0; i < path.length; i++) {
        var tokType = path[i];
        var longerKeys = [];
        for (var j = 0; j < keys2.length; j++) {
          var currShorterKey = keys2[j];
          longerKeys.push(currShorterKey + "_" + tokType.tokenTypeIdx);
          for (var t = 0; t < tokType.categoryMatches.length; t++) {
            var categoriesKeySuffix = "_" + tokType.categoryMatches[t];
            longerKeys.push(currShorterKey + categoriesKeySuffix);
          }
        }
        keys2 = longerKeys;
      }
      return keys2;
    }
    function isUniquePrefixHash(altKnownPathsKeys, searchPathKeys, idx) {
      for (var currAltIdx = 0; currAltIdx < altKnownPathsKeys.length; currAltIdx++) {
        if (currAltIdx === idx) {
          continue;
        }
        var otherAltKnownPathsKeys = altKnownPathsKeys[currAltIdx];
        for (var searchIdx = 0; searchIdx < searchPathKeys.length; searchIdx++) {
          var searchKey = searchPathKeys[searchIdx];
          if (otherAltKnownPathsKeys[searchKey] === true) {
            return false;
          }
        }
      }
      return true;
    }
    function lookAheadSequenceFromAlternatives(altsDefs, k) {
      var partialAlts = utils_1.map(altsDefs, function(currAlt) {
        return interpreter_1.possiblePathsFrom([currAlt], 1);
      });
      var finalResult = initializeArrayOfArrays(partialAlts.length);
      var altsHashes = utils_1.map(partialAlts, function(currAltPaths) {
        var dict = {};
        utils_1.forEach(currAltPaths, function(item) {
          var keys2 = pathToHashKeys(item.partialPath);
          utils_1.forEach(keys2, function(currKey) {
            dict[currKey] = true;
          });
        });
        return dict;
      });
      var newData = partialAlts;
      for (var pathLength = 1; pathLength <= k; pathLength++) {
        var currDataset = newData;
        newData = initializeArrayOfArrays(currDataset.length);
        var _loop_1 = function(altIdx2) {
          var currAltPathsAndSuffixes = currDataset[altIdx2];
          for (var currPathIdx = 0; currPathIdx < currAltPathsAndSuffixes.length; currPathIdx++) {
            var currPathPrefix = currAltPathsAndSuffixes[currPathIdx].partialPath;
            var suffixDef = currAltPathsAndSuffixes[currPathIdx].suffixDef;
            var prefixKeys = pathToHashKeys(currPathPrefix);
            var isUnique = isUniquePrefixHash(altsHashes, prefixKeys, altIdx2);
            if (isUnique || utils_1.isEmpty(suffixDef) || currPathPrefix.length === k) {
              var currAltResult = finalResult[altIdx2];
              if (containsPath(currAltResult, currPathPrefix) === false) {
                currAltResult.push(currPathPrefix);
                for (var j = 0; j < prefixKeys.length; j++) {
                  var currKey = prefixKeys[j];
                  altsHashes[altIdx2][currKey] = true;
                }
              }
            } else {
              var newPartialPathsAndSuffixes = interpreter_1.possiblePathsFrom(suffixDef, pathLength + 1, currPathPrefix);
              newData[altIdx2] = newData[altIdx2].concat(newPartialPathsAndSuffixes);
              utils_1.forEach(newPartialPathsAndSuffixes, function(item) {
                var prefixKeys2 = pathToHashKeys(item.partialPath);
                utils_1.forEach(prefixKeys2, function(key) {
                  altsHashes[altIdx2][key] = true;
                });
              });
            }
          }
        };
        for (var altIdx = 0; altIdx < currDataset.length; altIdx++) {
          _loop_1(altIdx);
        }
      }
      return finalResult;
    }
    exports2.lookAheadSequenceFromAlternatives = lookAheadSequenceFromAlternatives;
    function getLookaheadPathsForOr(occurrence, ruleGrammar, k, orProd) {
      var visitor = new InsideDefinitionFinderVisitor(occurrence, PROD_TYPE.ALTERNATION, orProd);
      ruleGrammar.accept(visitor);
      return lookAheadSequenceFromAlternatives(visitor.result, k);
    }
    exports2.getLookaheadPathsForOr = getLookaheadPathsForOr;
    function getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k) {
      var insideDefVisitor = new InsideDefinitionFinderVisitor(occurrence, prodType);
      ruleGrammar.accept(insideDefVisitor);
      var insideDef = insideDefVisitor.result;
      var afterDefWalker = new RestDefinitionFinderWalker(ruleGrammar, occurrence, prodType);
      var afterDef = afterDefWalker.startWalking();
      var insideFlat = new gast_public_1.Alternative({ definition: insideDef });
      var afterFlat = new gast_public_1.Alternative({ definition: afterDef });
      return lookAheadSequenceFromAlternatives([insideFlat, afterFlat], k);
    }
    exports2.getLookaheadPathsForOptionalProd = getLookaheadPathsForOptionalProd;
    function containsPath(alternative, searchPath) {
      compareOtherPath:
        for (var i = 0; i < alternative.length; i++) {
          var otherPath = alternative[i];
          if (otherPath.length !== searchPath.length) {
            continue;
          }
          for (var j = 0; j < otherPath.length; j++) {
            var searchTok = searchPath[j];
            var otherTok = otherPath[j];
            var matchingTokens = searchTok === otherTok || otherTok.categoryMatchesMap[searchTok.tokenTypeIdx] !== void 0;
            if (matchingTokens === false) {
              continue compareOtherPath;
            }
          }
          return true;
        }
      return false;
    }
    exports2.containsPath = containsPath;
    function isStrictPrefixOfPath(prefix, other) {
      return prefix.length < other.length && utils_1.every(prefix, function(tokType, idx) {
        var otherTokType = other[idx];
        return tokType === otherTokType || otherTokType.categoryMatchesMap[tokType.tokenTypeIdx];
      });
    }
    exports2.isStrictPrefixOfPath = isStrictPrefixOfPath;
    function areTokenCategoriesNotUsed(lookAheadPaths) {
      return utils_1.every(lookAheadPaths, function(singleAltPaths) {
        return utils_1.every(singleAltPaths, function(singlePath) {
          return utils_1.every(singlePath, function(token) {
            return utils_1.isEmpty(token.categoryMatches);
          });
        });
      });
    }
    exports2.areTokenCategoriesNotUsed = areTokenCategoriesNotUsed;
  }
});

// lib/src/parse/grammar/checks.js
var require_checks = __commonJS({
  "lib/src/parse/grammar/checks.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.checkPrefixAlternativesAmbiguities = exports2.validateSomeNonEmptyLookaheadPath = exports2.validateTooManyAlts = exports2.RepetionCollector = exports2.validateAmbiguousAlternationAlternatives = exports2.validateEmptyOrAlternative = exports2.getFirstNoneTerminal = exports2.validateNoLeftRecursion = exports2.validateRuleIsOverridden = exports2.validateRuleDoesNotAlreadyExist = exports2.OccurrenceValidationCollector = exports2.identifyProductionForDuplicates = exports2.validateGrammar = void 0;
    var utils = require_api();
    var utils_1 = require_api();
    var parser_1 = require_parser();
    var gast_1 = require_gast();
    var lookahead_1 = require_lookahead();
    var interpreter_1 = require_interpreter();
    var gast_public_1 = require_gast_public();
    var gast_visitor_public_1 = require_gast_visitor_public();
    function validateGrammar(topLevels, globalMaxLookahead, tokenTypes, errMsgProvider, grammarName) {
      var duplicateErrors = utils.map(topLevels, function(currTopLevel) {
        return validateDuplicateProductions(currTopLevel, errMsgProvider);
      });
      var leftRecursionErrors = utils.map(topLevels, function(currTopRule) {
        return validateNoLeftRecursion(currTopRule, currTopRule, errMsgProvider);
      });
      var emptyAltErrors = [];
      var ambiguousAltsErrors = [];
      var emptyRepetitionErrors = [];
      if (utils_1.every(leftRecursionErrors, utils_1.isEmpty)) {
        emptyAltErrors = utils_1.map(topLevels, function(currTopRule) {
          return validateEmptyOrAlternative(currTopRule, errMsgProvider);
        });
        ambiguousAltsErrors = utils_1.map(topLevels, function(currTopRule) {
          return validateAmbiguousAlternationAlternatives(currTopRule, globalMaxLookahead, errMsgProvider);
        });
        emptyRepetitionErrors = validateSomeNonEmptyLookaheadPath(topLevels, globalMaxLookahead, errMsgProvider);
      }
      var termsNamespaceConflictErrors = checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider);
      var tooManyAltsErrors = utils_1.map(topLevels, function(curRule) {
        return validateTooManyAlts(curRule, errMsgProvider);
      });
      var duplicateRulesError = utils_1.map(topLevels, function(curRule) {
        return validateRuleDoesNotAlreadyExist(curRule, topLevels, grammarName, errMsgProvider);
      });
      return utils.flatten(duplicateErrors.concat(emptyRepetitionErrors, leftRecursionErrors, emptyAltErrors, ambiguousAltsErrors, termsNamespaceConflictErrors, tooManyAltsErrors, duplicateRulesError));
    }
    exports2.validateGrammar = validateGrammar;
    function validateDuplicateProductions(topLevelRule, errMsgProvider) {
      var collectorVisitor = new OccurrenceValidationCollector();
      topLevelRule.accept(collectorVisitor);
      var allRuleProductions = collectorVisitor.allProductions;
      var productionGroups = utils.groupBy(allRuleProductions, identifyProductionForDuplicates);
      var duplicates = utils.pick(productionGroups, function(currGroup) {
        return currGroup.length > 1;
      });
      var errors = utils.map(utils.values(duplicates), function(currDuplicates) {
        var firstProd = utils.first(currDuplicates);
        var msg = errMsgProvider.buildDuplicateFoundError(topLevelRule, currDuplicates);
        var dslName = gast_1.getProductionDslName(firstProd);
        var defError = {
          message: msg,
          type: parser_1.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,
          ruleName: topLevelRule.name,
          dslName,
          occurrence: firstProd.idx
        };
        var param = getExtraProductionArgument(firstProd);
        if (param) {
          defError.parameter = param;
        }
        return defError;
      });
      return errors;
    }
    function identifyProductionForDuplicates(prod) {
      return gast_1.getProductionDslName(prod) + "_#_" + prod.idx + "_#_" + getExtraProductionArgument(prod);
    }
    exports2.identifyProductionForDuplicates = identifyProductionForDuplicates;
    function getExtraProductionArgument(prod) {
      if (prod instanceof gast_public_1.Terminal) {
        return prod.terminalType.name;
      } else if (prod instanceof gast_public_1.NonTerminal) {
        return prod.nonTerminalName;
      } else {
        return "";
      }
    }
    var OccurrenceValidationCollector = function(_super) {
      __extends(OccurrenceValidationCollector2, _super);
      function OccurrenceValidationCollector2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allProductions = [];
        return _this;
      }
      OccurrenceValidationCollector2.prototype.visitNonTerminal = function(subrule) {
        this.allProductions.push(subrule);
      };
      OccurrenceValidationCollector2.prototype.visitOption = function(option) {
        this.allProductions.push(option);
      };
      OccurrenceValidationCollector2.prototype.visitRepetitionWithSeparator = function(manySep) {
        this.allProductions.push(manySep);
      };
      OccurrenceValidationCollector2.prototype.visitRepetitionMandatory = function(atLeastOne) {
        this.allProductions.push(atLeastOne);
      };
      OccurrenceValidationCollector2.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
        this.allProductions.push(atLeastOneSep);
      };
      OccurrenceValidationCollector2.prototype.visitRepetition = function(many) {
        this.allProductions.push(many);
      };
      OccurrenceValidationCollector2.prototype.visitAlternation = function(or) {
        this.allProductions.push(or);
      };
      OccurrenceValidationCollector2.prototype.visitTerminal = function(terminal) {
        this.allProductions.push(terminal);
      };
      return OccurrenceValidationCollector2;
    }(gast_visitor_public_1.GAstVisitor);
    exports2.OccurrenceValidationCollector = OccurrenceValidationCollector;
    function validateRuleDoesNotAlreadyExist(rule, allRules, className, errMsgProvider) {
      var errors = [];
      var occurrences = utils_1.reduce(allRules, function(result, curRule) {
        if (curRule.name === rule.name) {
          return result + 1;
        }
        return result;
      }, 0);
      if (occurrences > 1) {
        var errMsg = errMsgProvider.buildDuplicateRuleNameError({
          topLevelRule: rule,
          grammarName: className
        });
        errors.push({
          message: errMsg,
          type: parser_1.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
          ruleName: rule.name
        });
      }
      return errors;
    }
    exports2.validateRuleDoesNotAlreadyExist = validateRuleDoesNotAlreadyExist;
    function validateRuleIsOverridden(ruleName, definedRulesNames, className) {
      var errors = [];
      var errMsg;
      if (!utils.contains(definedRulesNames, ruleName)) {
        errMsg = "Invalid rule override, rule: ->" + ruleName + "<- cannot be overridden in the grammar: ->" + className + "<-as it is not defined in any of the super grammars ";
        errors.push({
          message: errMsg,
          type: parser_1.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,
          ruleName
        });
      }
      return errors;
    }
    exports2.validateRuleIsOverridden = validateRuleIsOverridden;
    function validateNoLeftRecursion(topRule, currRule, errMsgProvider, path) {
      if (path === void 0) {
        path = [];
      }
      var errors = [];
      var nextNonTerminals = getFirstNoneTerminal(currRule.definition);
      if (utils.isEmpty(nextNonTerminals)) {
        return [];
      } else {
        var ruleName = topRule.name;
        var foundLeftRecursion = utils.contains(nextNonTerminals, topRule);
        if (foundLeftRecursion) {
          errors.push({
            message: errMsgProvider.buildLeftRecursionError({
              topLevelRule: topRule,
              leftRecursionPath: path
            }),
            type: parser_1.ParserDefinitionErrorType.LEFT_RECURSION,
            ruleName
          });
        }
        var validNextSteps = utils.difference(nextNonTerminals, path.concat([topRule]));
        var errorsFromNextSteps = utils.map(validNextSteps, function(currRefRule) {
          var newPath = utils.cloneArr(path);
          newPath.push(currRefRule);
          return validateNoLeftRecursion(topRule, currRefRule, errMsgProvider, newPath);
        });
        return errors.concat(utils.flatten(errorsFromNextSteps));
      }
    }
    exports2.validateNoLeftRecursion = validateNoLeftRecursion;
    function getFirstNoneTerminal(definition) {
      var result = [];
      if (utils.isEmpty(definition)) {
        return result;
      }
      var firstProd = utils.first(definition);
      if (firstProd instanceof gast_public_1.NonTerminal) {
        result.push(firstProd.referencedRule);
      } else if (firstProd instanceof gast_public_1.Alternative || firstProd instanceof gast_public_1.Option || firstProd instanceof gast_public_1.RepetitionMandatory || firstProd instanceof gast_public_1.RepetitionMandatoryWithSeparator || firstProd instanceof gast_public_1.RepetitionWithSeparator || firstProd instanceof gast_public_1.Repetition) {
        result = result.concat(getFirstNoneTerminal(firstProd.definition));
      } else if (firstProd instanceof gast_public_1.Alternation) {
        result = utils.flatten(utils.map(firstProd.definition, function(currSubDef) {
          return getFirstNoneTerminal(currSubDef.definition);
        }));
      } else if (firstProd instanceof gast_public_1.Terminal) {
      } else {
        throw Error("non exhaustive match");
      }
      var isFirstOptional = gast_1.isOptionalProd(firstProd);
      var hasMore = definition.length > 1;
      if (isFirstOptional && hasMore) {
        var rest = utils.drop(definition);
        return result.concat(getFirstNoneTerminal(rest));
      } else {
        return result;
      }
    }
    exports2.getFirstNoneTerminal = getFirstNoneTerminal;
    var OrCollector = function(_super) {
      __extends(OrCollector2, _super);
      function OrCollector2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.alternations = [];
        return _this;
      }
      OrCollector2.prototype.visitAlternation = function(node) {
        this.alternations.push(node);
      };
      return OrCollector2;
    }(gast_visitor_public_1.GAstVisitor);
    function validateEmptyOrAlternative(topLevelRule, errMsgProvider) {
      var orCollector = new OrCollector();
      topLevelRule.accept(orCollector);
      var ors = orCollector.alternations;
      var errors = utils.reduce(ors, function(errors2, currOr) {
        var exceptLast = utils.dropRight(currOr.definition);
        var currErrors = utils.map(exceptLast, function(currAlternative, currAltIdx) {
          var possibleFirstInAlt = interpreter_1.nextPossibleTokensAfter([currAlternative], [], null, 1);
          if (utils.isEmpty(possibleFirstInAlt)) {
            return {
              message: errMsgProvider.buildEmptyAlternationError({
                topLevelRule,
                alternation: currOr,
                emptyChoiceIdx: currAltIdx
              }),
              type: parser_1.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,
              ruleName: topLevelRule.name,
              occurrence: currOr.idx,
              alternative: currAltIdx + 1
            };
          } else {
            return null;
          }
        });
        return errors2.concat(utils.compact(currErrors));
      }, []);
      return errors;
    }
    exports2.validateEmptyOrAlternative = validateEmptyOrAlternative;
    function validateAmbiguousAlternationAlternatives(topLevelRule, globalMaxLookahead, errMsgProvider) {
      var orCollector = new OrCollector();
      topLevelRule.accept(orCollector);
      var ors = orCollector.alternations;
      ors = utils_1.reject(ors, function(currOr) {
        return currOr.ignoreAmbiguities === true;
      });
      var errors = utils.reduce(ors, function(result, currOr) {
        var currOccurrence = currOr.idx;
        var actualMaxLookahead = currOr.maxLookahead || globalMaxLookahead;
        var alternatives = lookahead_1.getLookaheadPathsForOr(currOccurrence, topLevelRule, actualMaxLookahead, currOr);
        var altsAmbiguityErrors = checkAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
        var altsPrefixAmbiguityErrors = checkPrefixAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
        return result.concat(altsAmbiguityErrors, altsPrefixAmbiguityErrors);
      }, []);
      return errors;
    }
    exports2.validateAmbiguousAlternationAlternatives = validateAmbiguousAlternationAlternatives;
    var RepetionCollector = function(_super) {
      __extends(RepetionCollector2, _super);
      function RepetionCollector2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allProductions = [];
        return _this;
      }
      RepetionCollector2.prototype.visitRepetitionWithSeparator = function(manySep) {
        this.allProductions.push(manySep);
      };
      RepetionCollector2.prototype.visitRepetitionMandatory = function(atLeastOne) {
        this.allProductions.push(atLeastOne);
      };
      RepetionCollector2.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
        this.allProductions.push(atLeastOneSep);
      };
      RepetionCollector2.prototype.visitRepetition = function(many) {
        this.allProductions.push(many);
      };
      return RepetionCollector2;
    }(gast_visitor_public_1.GAstVisitor);
    exports2.RepetionCollector = RepetionCollector;
    function validateTooManyAlts(topLevelRule, errMsgProvider) {
      var orCollector = new OrCollector();
      topLevelRule.accept(orCollector);
      var ors = orCollector.alternations;
      var errors = utils.reduce(ors, function(errors2, currOr) {
        if (currOr.definition.length > 255) {
          errors2.push({
            message: errMsgProvider.buildTooManyAlternativesError({
              topLevelRule,
              alternation: currOr
            }),
            type: parser_1.ParserDefinitionErrorType.TOO_MANY_ALTS,
            ruleName: topLevelRule.name,
            occurrence: currOr.idx
          });
        }
        return errors2;
      }, []);
      return errors;
    }
    exports2.validateTooManyAlts = validateTooManyAlts;
    function validateSomeNonEmptyLookaheadPath(topLevelRules, maxLookahead, errMsgProvider) {
      var errors = [];
      utils_1.forEach(topLevelRules, function(currTopRule) {
        var collectorVisitor = new RepetionCollector();
        currTopRule.accept(collectorVisitor);
        var allRuleProductions = collectorVisitor.allProductions;
        utils_1.forEach(allRuleProductions, function(currProd) {
          var prodType = lookahead_1.getProdType(currProd);
          var actualMaxLookahead = currProd.maxLookahead || maxLookahead;
          var currOccurrence = currProd.idx;
          var paths = lookahead_1.getLookaheadPathsForOptionalProd(currOccurrence, currTopRule, prodType, actualMaxLookahead);
          var pathsInsideProduction = paths[0];
          if (utils_1.isEmpty(utils_1.flatten(pathsInsideProduction))) {
            var errMsg = errMsgProvider.buildEmptyRepetitionError({
              topLevelRule: currTopRule,
              repetition: currProd
            });
            errors.push({
              message: errMsg,
              type: parser_1.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,
              ruleName: currTopRule.name
            });
          }
        });
      });
      return errors;
    }
    exports2.validateSomeNonEmptyLookaheadPath = validateSomeNonEmptyLookaheadPath;
    function checkAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
      var foundAmbiguousPaths = [];
      var identicalAmbiguities = utils_1.reduce(alternatives, function(result, currAlt, currAltIdx) {
        if (alternation.definition[currAltIdx].ignoreAmbiguities === true) {
          return result;
        }
        utils_1.forEach(currAlt, function(currPath) {
          var altsCurrPathAppearsIn = [currAltIdx];
          utils_1.forEach(alternatives, function(currOtherAlt, currOtherAltIdx) {
            if (currAltIdx !== currOtherAltIdx && lookahead_1.containsPath(currOtherAlt, currPath) && alternation.definition[currOtherAltIdx].ignoreAmbiguities !== true) {
              altsCurrPathAppearsIn.push(currOtherAltIdx);
            }
          });
          if (altsCurrPathAppearsIn.length > 1 && !lookahead_1.containsPath(foundAmbiguousPaths, currPath)) {
            foundAmbiguousPaths.push(currPath);
            result.push({
              alts: altsCurrPathAppearsIn,
              path: currPath
            });
          }
        });
        return result;
      }, []);
      var currErrors = utils.map(identicalAmbiguities, function(currAmbDescriptor) {
        var ambgIndices = utils_1.map(currAmbDescriptor.alts, function(currAltIdx) {
          return currAltIdx + 1;
        });
        var currMessage = errMsgProvider.buildAlternationAmbiguityError({
          topLevelRule: rule,
          alternation,
          ambiguityIndices: ambgIndices,
          prefixPath: currAmbDescriptor.path
        });
        return {
          message: currMessage,
          type: parser_1.ParserDefinitionErrorType.AMBIGUOUS_ALTS,
          ruleName: rule.name,
          occurrence: alternation.idx,
          alternatives: [currAmbDescriptor.alts]
        };
      });
      return currErrors;
    }
    function checkPrefixAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
      var errors = [];
      var pathsAndIndices = utils_1.reduce(alternatives, function(result, currAlt, idx) {
        var currPathsAndIdx = utils_1.map(currAlt, function(currPath) {
          return { idx, path: currPath };
        });
        return result.concat(currPathsAndIdx);
      }, []);
      utils_1.forEach(pathsAndIndices, function(currPathAndIdx) {
        var alternativeGast = alternation.definition[currPathAndIdx.idx];
        if (alternativeGast.ignoreAmbiguities === true) {
          return;
        }
        var targetIdx = currPathAndIdx.idx;
        var targetPath = currPathAndIdx.path;
        var prefixAmbiguitiesPathsAndIndices = utils_1.findAll(pathsAndIndices, function(searchPathAndIdx) {
          return alternation.definition[searchPathAndIdx.idx].ignoreAmbiguities !== true && searchPathAndIdx.idx < targetIdx && lookahead_1.isStrictPrefixOfPath(searchPathAndIdx.path, targetPath);
        });
        var currPathPrefixErrors = utils_1.map(prefixAmbiguitiesPathsAndIndices, function(currAmbPathAndIdx) {
          var ambgIndices = [currAmbPathAndIdx.idx + 1, targetIdx + 1];
          var occurrence = alternation.idx === 0 ? "" : alternation.idx;
          var message = errMsgProvider.buildAlternationPrefixAmbiguityError({
            topLevelRule: rule,
            alternation,
            ambiguityIndices: ambgIndices,
            prefixPath: currAmbPathAndIdx.path
          });
          return {
            message,
            type: parser_1.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,
            ruleName: rule.name,
            occurrence,
            alternatives: ambgIndices
          };
        });
        errors = errors.concat(currPathPrefixErrors);
      });
      return errors;
    }
    exports2.checkPrefixAlternativesAmbiguities = checkPrefixAlternativesAmbiguities;
    function checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider) {
      var errors = [];
      var tokenNames = utils_1.map(tokenTypes, function(currToken) {
        return currToken.name;
      });
      utils_1.forEach(topLevels, function(currRule) {
        var currRuleName = currRule.name;
        if (utils_1.contains(tokenNames, currRuleName)) {
          var errMsg = errMsgProvider.buildNamespaceConflictError(currRule);
          errors.push({
            message: errMsg,
            type: parser_1.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,
            ruleName: currRuleName
          });
        }
      });
      return errors;
    }
  }
});

// lib/src/parse/grammar/gast/gast_resolver_public.js
var require_gast_resolver_public = __commonJS({
  "lib/src/parse/grammar/gast/gast_resolver_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateGrammar = exports2.resolveGrammar = void 0;
    var utils_1 = require_api();
    var resolver_1 = require_resolver();
    var checks_1 = require_checks();
    var errors_public_1 = require_errors_public();
    function resolveGrammar(options) {
      options = utils_1.defaults(options, {
        errMsgProvider: errors_public_1.defaultGrammarResolverErrorProvider
      });
      var topRulesTable = {};
      utils_1.forEach(options.rules, function(rule) {
        topRulesTable[rule.name] = rule;
      });
      return resolver_1.resolveGrammar(topRulesTable, options.errMsgProvider);
    }
    exports2.resolveGrammar = resolveGrammar;
    function validateGrammar(options) {
      options = utils_1.defaults(options, {
        errMsgProvider: errors_public_1.defaultGrammarValidatorErrorProvider
      });
      return checks_1.validateGrammar(options.rules, options.maxLookahead, options.tokenTypes, options.errMsgProvider, options.grammarName);
    }
    exports2.validateGrammar = validateGrammar;
  }
});

// lib/src/parse/exceptions_public.js
var require_exceptions_public = __commonJS({
  "lib/src/parse/exceptions_public.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EarlyExitException = exports2.NotAllInputParsedException = exports2.NoViableAltException = exports2.MismatchedTokenException = exports2.isRecognitionException = void 0;
    var utils_1 = require_api();
    var MISMATCHED_TOKEN_EXCEPTION = "MismatchedTokenException";
    var NO_VIABLE_ALT_EXCEPTION = "NoViableAltException";
    var EARLY_EXIT_EXCEPTION = "EarlyExitException";
    var NOT_ALL_INPUT_PARSED_EXCEPTION = "NotAllInputParsedException";
    var RECOGNITION_EXCEPTION_NAMES = [
      MISMATCHED_TOKEN_EXCEPTION,
      NO_VIABLE_ALT_EXCEPTION,
      EARLY_EXIT_EXCEPTION,
      NOT_ALL_INPUT_PARSED_EXCEPTION
    ];
    Object.freeze(RECOGNITION_EXCEPTION_NAMES);
    function isRecognitionException(error) {
      return utils_1.contains(RECOGNITION_EXCEPTION_NAMES, error.name);
    }
    exports2.isRecognitionException = isRecognitionException;
    var RecognitionException = function(_super) {
      __extends(RecognitionException2, _super);
      function RecognitionException2(message, token) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.token = token;
        _this.resyncedTokens = [];
        Object.setPrototypeOf(_this, _newTarget.prototype);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(_this, _this.constructor);
        }
        return _this;
      }
      return RecognitionException2;
    }(Error);
    var MismatchedTokenException = function(_super) {
      __extends(MismatchedTokenException2, _super);
      function MismatchedTokenException2(message, token, previousToken) {
        var _this = _super.call(this, message, token) || this;
        _this.previousToken = previousToken;
        _this.name = MISMATCHED_TOKEN_EXCEPTION;
        return _this;
      }
      return MismatchedTokenException2;
    }(RecognitionException);
    exports2.MismatchedTokenException = MismatchedTokenException;
    var NoViableAltException = function(_super) {
      __extends(NoViableAltException2, _super);
      function NoViableAltException2(message, token, previousToken) {
        var _this = _super.call(this, message, token) || this;
        _this.previousToken = previousToken;
        _this.name = NO_VIABLE_ALT_EXCEPTION;
        return _this;
      }
      return NoViableAltException2;
    }(RecognitionException);
    exports2.NoViableAltException = NoViableAltException;
    var NotAllInputParsedException = function(_super) {
      __extends(NotAllInputParsedException2, _super);
      function NotAllInputParsedException2(message, token) {
        var _this = _super.call(this, message, token) || this;
        _this.name = NOT_ALL_INPUT_PARSED_EXCEPTION;
        return _this;
      }
      return NotAllInputParsedException2;
    }(RecognitionException);
    exports2.NotAllInputParsedException = NotAllInputParsedException;
    var EarlyExitException = function(_super) {
      __extends(EarlyExitException2, _super);
      function EarlyExitException2(message, token, previousToken) {
        var _this = _super.call(this, message, token) || this;
        _this.previousToken = previousToken;
        _this.name = EARLY_EXIT_EXCEPTION;
        return _this;
      }
      return EarlyExitException2;
    }(RecognitionException);
    exports2.EarlyExitException = EarlyExitException;
  }
});

// lib/src/parse/parser/traits/recoverable.js
var require_recoverable = __commonJS({
  "lib/src/parse/parser/traits/recoverable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.attemptInRepetitionRecovery = exports2.Recoverable = exports2.InRuleRecoveryException = exports2.IN_RULE_RECOVERY_EXCEPTION = exports2.EOF_FOLLOW_KEY = void 0;
    var tokens_public_1 = require_tokens_public();
    var utils_1 = require_api();
    var exceptions_public_1 = require_exceptions_public();
    var constants_1 = require_constants();
    var parser_1 = require_parser();
    exports2.EOF_FOLLOW_KEY = {};
    exports2.IN_RULE_RECOVERY_EXCEPTION = "InRuleRecoveryException";
    function InRuleRecoveryException(message) {
      this.name = exports2.IN_RULE_RECOVERY_EXCEPTION;
      this.message = message;
    }
    exports2.InRuleRecoveryException = InRuleRecoveryException;
    InRuleRecoveryException.prototype = Error.prototype;
    var Recoverable = function() {
      function Recoverable2() {
      }
      Recoverable2.prototype.initRecoverable = function(config) {
        this.firstAfterRepMap = {};
        this.resyncFollows = {};
        this.recoveryEnabled = utils_1.has(config, "recoveryEnabled") ? config.recoveryEnabled : parser_1.DEFAULT_PARSER_CONFIG.recoveryEnabled;
        if (this.recoveryEnabled) {
          this.attemptInRepetitionRecovery = attemptInRepetitionRecovery;
        }
      };
      Recoverable2.prototype.getTokenToInsert = function(tokType) {
        var tokToInsert = tokens_public_1.createTokenInstance(tokType, "", NaN, NaN, NaN, NaN, NaN, NaN);
        tokToInsert.isInsertedInRecovery = true;
        return tokToInsert;
      };
      Recoverable2.prototype.canTokenTypeBeInsertedInRecovery = function(tokType) {
        return true;
      };
      Recoverable2.prototype.tryInRepetitionRecovery = function(grammarRule, grammarRuleArgs, lookAheadFunc, expectedTokType) {
        var _this = this;
        var reSyncTokType = this.findReSyncTokenType();
        var savedLexerState = this.exportLexerState();
        var resyncedTokens = [];
        var passedResyncPoint = false;
        var nextTokenWithoutResync = this.LA(1);
        var currToken = this.LA(1);
        var generateErrorMessage = function() {
          var previousToken = _this.LA(0);
          var msg = _this.errorMessageProvider.buildMismatchTokenMessage({
            expected: expectedTokType,
            actual: nextTokenWithoutResync,
            previous: previousToken,
            ruleName: _this.getCurrRuleFullName()
          });
          var error = new exceptions_public_1.MismatchedTokenException(msg, nextTokenWithoutResync, _this.LA(0));
          error.resyncedTokens = utils_1.dropRight(resyncedTokens);
          _this.SAVE_ERROR(error);
        };
        while (!passedResyncPoint) {
          if (this.tokenMatcher(currToken, expectedTokType)) {
            generateErrorMessage();
            return;
          } else if (lookAheadFunc.call(this)) {
            generateErrorMessage();
            grammarRule.apply(this, grammarRuleArgs);
            return;
          } else if (this.tokenMatcher(currToken, reSyncTokType)) {
            passedResyncPoint = true;
          } else {
            currToken = this.SKIP_TOKEN();
            this.addToResyncTokens(currToken, resyncedTokens);
          }
        }
        this.importLexerState(savedLexerState);
      };
      Recoverable2.prototype.shouldInRepetitionRecoveryBeTried = function(expectTokAfterLastMatch, nextTokIdx, notStuck) {
        if (notStuck === false) {
          return false;
        }
        if (expectTokAfterLastMatch === void 0 || nextTokIdx === void 0) {
          return false;
        }
        if (this.tokenMatcher(this.LA(1), expectTokAfterLastMatch)) {
          return false;
        }
        if (this.isBackTracking()) {
          return false;
        }
        if (this.canPerformInRuleRecovery(expectTokAfterLastMatch, this.getFollowsForInRuleRecovery(expectTokAfterLastMatch, nextTokIdx))) {
          return false;
        }
        return true;
      };
      Recoverable2.prototype.getFollowsForInRuleRecovery = function(tokType, tokIdxInRule) {
        var grammarPath = this.getCurrentGrammarPath(tokType, tokIdxInRule);
        var follows = this.getNextPossibleTokenTypes(grammarPath);
        return follows;
      };
      Recoverable2.prototype.tryInRuleRecovery = function(expectedTokType, follows) {
        if (this.canRecoverWithSingleTokenInsertion(expectedTokType, follows)) {
          var tokToInsert = this.getTokenToInsert(expectedTokType);
          return tokToInsert;
        }
        if (this.canRecoverWithSingleTokenDeletion(expectedTokType)) {
          var nextTok = this.SKIP_TOKEN();
          this.consumeToken();
          return nextTok;
        }
        throw new InRuleRecoveryException("sad sad panda");
      };
      Recoverable2.prototype.canPerformInRuleRecovery = function(expectedToken, follows) {
        return this.canRecoverWithSingleTokenInsertion(expectedToken, follows) || this.canRecoverWithSingleTokenDeletion(expectedToken);
      };
      Recoverable2.prototype.canRecoverWithSingleTokenInsertion = function(expectedTokType, follows) {
        var _this = this;
        if (!this.canTokenTypeBeInsertedInRecovery(expectedTokType)) {
          return false;
        }
        if (utils_1.isEmpty(follows)) {
          return false;
        }
        var mismatchedTok = this.LA(1);
        var isMisMatchedTokInFollows = utils_1.find(follows, function(possibleFollowsTokType) {
          return _this.tokenMatcher(mismatchedTok, possibleFollowsTokType);
        }) !== void 0;
        return isMisMatchedTokInFollows;
      };
      Recoverable2.prototype.canRecoverWithSingleTokenDeletion = function(expectedTokType) {
        var isNextTokenWhatIsExpected = this.tokenMatcher(this.LA(2), expectedTokType);
        return isNextTokenWhatIsExpected;
      };
      Recoverable2.prototype.isInCurrentRuleReSyncSet = function(tokenTypeIdx) {
        var followKey = this.getCurrFollowKey();
        var currentRuleReSyncSet = this.getFollowSetFromFollowKey(followKey);
        return utils_1.contains(currentRuleReSyncSet, tokenTypeIdx);
      };
      Recoverable2.prototype.findReSyncTokenType = function() {
        var allPossibleReSyncTokTypes = this.flattenFollowSet();
        var nextToken = this.LA(1);
        var k = 2;
        while (true) {
          var nextTokenType = nextToken.tokenType;
          if (utils_1.contains(allPossibleReSyncTokTypes, nextTokenType)) {
            return nextTokenType;
          }
          nextToken = this.LA(k);
          k++;
        }
      };
      Recoverable2.prototype.getCurrFollowKey = function() {
        if (this.RULE_STACK.length === 1) {
          return exports2.EOF_FOLLOW_KEY;
        }
        var currRuleShortName = this.getLastExplicitRuleShortName();
        var currRuleIdx = this.getLastExplicitRuleOccurrenceIndex();
        var prevRuleShortName = this.getPreviousExplicitRuleShortName();
        return {
          ruleName: this.shortRuleNameToFullName(currRuleShortName),
          idxInCallingRule: currRuleIdx,
          inRule: this.shortRuleNameToFullName(prevRuleShortName)
        };
      };
      Recoverable2.prototype.buildFullFollowKeyStack = function() {
        var _this = this;
        var explicitRuleStack = this.RULE_STACK;
        var explicitOccurrenceStack = this.RULE_OCCURRENCE_STACK;
        return utils_1.map(explicitRuleStack, function(ruleName, idx) {
          if (idx === 0) {
            return exports2.EOF_FOLLOW_KEY;
          }
          return {
            ruleName: _this.shortRuleNameToFullName(ruleName),
            idxInCallingRule: explicitOccurrenceStack[idx],
            inRule: _this.shortRuleNameToFullName(explicitRuleStack[idx - 1])
          };
        });
      };
      Recoverable2.prototype.flattenFollowSet = function() {
        var _this = this;
        var followStack = utils_1.map(this.buildFullFollowKeyStack(), function(currKey) {
          return _this.getFollowSetFromFollowKey(currKey);
        });
        return utils_1.flatten(followStack);
      };
      Recoverable2.prototype.getFollowSetFromFollowKey = function(followKey) {
        if (followKey === exports2.EOF_FOLLOW_KEY) {
          return [tokens_public_1.EOF];
        }
        var followName = followKey.ruleName + followKey.idxInCallingRule + constants_1.IN + followKey.inRule;
        return this.resyncFollows[followName];
      };
      Recoverable2.prototype.addToResyncTokens = function(token, resyncTokens) {
        if (!this.tokenMatcher(token, tokens_public_1.EOF)) {
          resyncTokens.push(token);
        }
        return resyncTokens;
      };
      Recoverable2.prototype.reSyncTo = function(tokType) {
        var resyncedTokens = [];
        var nextTok = this.LA(1);
        while (this.tokenMatcher(nextTok, tokType) === false) {
          nextTok = this.SKIP_TOKEN();
          this.addToResyncTokens(nextTok, resyncedTokens);
        }
        return utils_1.dropRight(resyncedTokens);
      };
      Recoverable2.prototype.attemptInRepetitionRecovery = function(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
      };
      Recoverable2.prototype.getCurrentGrammarPath = function(tokType, tokIdxInRule) {
        var pathRuleStack = this.getHumanReadableRuleStack();
        var pathOccurrenceStack = utils_1.cloneArr(this.RULE_OCCURRENCE_STACK);
        var grammarPath = {
          ruleStack: pathRuleStack,
          occurrenceStack: pathOccurrenceStack,
          lastTok: tokType,
          lastTokOccurrence: tokIdxInRule
        };
        return grammarPath;
      };
      Recoverable2.prototype.getHumanReadableRuleStack = function() {
        var _this = this;
        return utils_1.map(this.RULE_STACK, function(currShortName) {
          return _this.shortRuleNameToFullName(currShortName);
        });
      };
      return Recoverable2;
    }();
    exports2.Recoverable = Recoverable;
    function attemptInRepetitionRecovery(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
      var key = this.getKeyForAutomaticLookahead(dslMethodIdx, prodOccurrence);
      var firstAfterRepInfo = this.firstAfterRepMap[key];
      if (firstAfterRepInfo === void 0) {
        var currRuleName = this.getCurrRuleFullName();
        var ruleGrammar = this.getGAstProductions()[currRuleName];
        var walker = new nextToksWalker(ruleGrammar, prodOccurrence);
        firstAfterRepInfo = walker.startWalking();
        this.firstAfterRepMap[key] = firstAfterRepInfo;
      }
      var expectTokAfterLastMatch = firstAfterRepInfo.token;
      var nextTokIdx = firstAfterRepInfo.occurrence;
      var isEndOfRule = firstAfterRepInfo.isEndOfRule;
      if (this.RULE_STACK.length === 1 && isEndOfRule && expectTokAfterLastMatch === void 0) {
        expectTokAfterLastMatch = tokens_public_1.EOF;
        nextTokIdx = 1;
      }
      if (this.shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck)) {
        this.tryInRepetitionRecovery(prodFunc, args, lookaheadFunc, expectTokAfterLastMatch);
      }
    }
    exports2.attemptInRepetitionRecovery = attemptInRepetitionRecovery;
  }
});

// lib/src/parse/grammar/keys.js
var require_keys = __commonJS({
  "lib/src/parse/grammar/keys.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getKeyForAutomaticLookahead = exports2.AT_LEAST_ONE_SEP_IDX = exports2.MANY_SEP_IDX = exports2.AT_LEAST_ONE_IDX = exports2.MANY_IDX = exports2.OPTION_IDX = exports2.OR_IDX = exports2.BITS_FOR_ALT_IDX = exports2.BITS_FOR_RULE_IDX = exports2.BITS_FOR_OCCURRENCE_IDX = exports2.BITS_FOR_METHOD_TYPE = void 0;
    exports2.BITS_FOR_METHOD_TYPE = 4;
    exports2.BITS_FOR_OCCURRENCE_IDX = 8;
    exports2.BITS_FOR_RULE_IDX = 12;
    exports2.BITS_FOR_ALT_IDX = 8;
    exports2.OR_IDX = 1 << exports2.BITS_FOR_OCCURRENCE_IDX;
    exports2.OPTION_IDX = 2 << exports2.BITS_FOR_OCCURRENCE_IDX;
    exports2.MANY_IDX = 3 << exports2.BITS_FOR_OCCURRENCE_IDX;
    exports2.AT_LEAST_ONE_IDX = 4 << exports2.BITS_FOR_OCCURRENCE_IDX;
    exports2.MANY_SEP_IDX = 5 << exports2.BITS_FOR_OCCURRENCE_IDX;
    exports2.AT_LEAST_ONE_SEP_IDX = 6 << exports2.BITS_FOR_OCCURRENCE_IDX;
    function getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) {
      return occurrence | dslMethodIdx | ruleIdx;
    }
    exports2.getKeyForAutomaticLookahead = getKeyForAutomaticLookahead;
    var BITS_START_FOR_ALT_IDX = 32 - exports2.BITS_FOR_ALT_IDX;
  }
});

// lib/src/parse/parser/traits/looksahead.js
var require_looksahead = __commonJS({
  "lib/src/parse/parser/traits/looksahead.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LooksAhead = void 0;
    var lookahead_1 = require_lookahead();
    var utils_1 = require_api();
    var parser_1 = require_parser();
    var keys_1 = require_keys();
    var gast_1 = require_gast();
    var LooksAhead = function() {
      function LooksAhead2() {
      }
      LooksAhead2.prototype.initLooksAhead = function(config) {
        this.dynamicTokensEnabled = utils_1.has(config, "dynamicTokensEnabled") ? config.dynamicTokensEnabled : parser_1.DEFAULT_PARSER_CONFIG.dynamicTokensEnabled;
        this.maxLookahead = utils_1.has(config, "maxLookahead") ? config.maxLookahead : parser_1.DEFAULT_PARSER_CONFIG.maxLookahead;
        this.lookAheadFuncsCache = utils_1.isES2015MapSupported() ? new Map() : [];
        if (utils_1.isES2015MapSupported()) {
          this.getLaFuncFromCache = this.getLaFuncFromMap;
          this.setLaFuncCache = this.setLaFuncCacheUsingMap;
        } else {
          this.getLaFuncFromCache = this.getLaFuncFromObj;
          this.setLaFuncCache = this.setLaFuncUsingObj;
        }
      };
      LooksAhead2.prototype.preComputeLookaheadFunctions = function(rules) {
        var _this = this;
        utils_1.forEach(rules, function(currRule) {
          _this.TRACE_INIT(currRule.name + " Rule Lookahead", function() {
            var _a = gast_1.collectMethods(currRule), alternation = _a.alternation, repetition = _a.repetition, option = _a.option, repetitionMandatory = _a.repetitionMandatory, repetitionMandatoryWithSeparator = _a.repetitionMandatoryWithSeparator, repetitionWithSeparator = _a.repetitionWithSeparator;
            utils_1.forEach(alternation, function(currProd) {
              var prodIdx = currProd.idx === 0 ? "" : currProd.idx;
              _this.TRACE_INIT("" + gast_1.getProductionDslName(currProd) + prodIdx, function() {
                var laFunc = lookahead_1.buildLookaheadFuncForOr(currProd.idx, currRule, currProd.maxLookahead || _this.maxLookahead, currProd.hasPredicates, _this.dynamicTokensEnabled, _this.lookAheadBuilderForAlternatives);
                var key = keys_1.getKeyForAutomaticLookahead(_this.fullRuleNameToShort[currRule.name], keys_1.OR_IDX, currProd.idx);
                _this.setLaFuncCache(key, laFunc);
              });
            });
            utils_1.forEach(repetition, function(currProd) {
              _this.computeLookaheadFunc(currRule, currProd.idx, keys_1.MANY_IDX, lookahead_1.PROD_TYPE.REPETITION, currProd.maxLookahead, gast_1.getProductionDslName(currProd));
            });
            utils_1.forEach(option, function(currProd) {
              _this.computeLookaheadFunc(currRule, currProd.idx, keys_1.OPTION_IDX, lookahead_1.PROD_TYPE.OPTION, currProd.maxLookahead, gast_1.getProductionDslName(currProd));
            });
            utils_1.forEach(repetitionMandatory, function(currProd) {
              _this.computeLookaheadFunc(currRule, currProd.idx, keys_1.AT_LEAST_ONE_IDX, lookahead_1.PROD_TYPE.REPETITION_MANDATORY, currProd.maxLookahead, gast_1.getProductionDslName(currProd));
            });
            utils_1.forEach(repetitionMandatoryWithSeparator, function(currProd) {
              _this.computeLookaheadFunc(currRule, currProd.idx, keys_1.AT_LEAST_ONE_SEP_IDX, lookahead_1.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currProd.maxLookahead, gast_1.getProductionDslName(currProd));
            });
            utils_1.forEach(repetitionWithSeparator, function(currProd) {
              _this.computeLookaheadFunc(currRule, currProd.idx, keys_1.MANY_SEP_IDX, lookahead_1.PROD_TYPE.REPETITION_WITH_SEPARATOR, currProd.maxLookahead, gast_1.getProductionDslName(currProd));
            });
          });
        });
      };
      LooksAhead2.prototype.computeLookaheadFunc = function(rule, prodOccurrence, prodKey, prodType, prodMaxLookahead, dslMethodName) {
        var _this = this;
        this.TRACE_INIT("" + dslMethodName + (prodOccurrence === 0 ? "" : prodOccurrence), function() {
          var laFunc = lookahead_1.buildLookaheadFuncForOptionalProd(prodOccurrence, rule, prodMaxLookahead || _this.maxLookahead, _this.dynamicTokensEnabled, prodType, _this.lookAheadBuilderForOptional);
          var key = keys_1.getKeyForAutomaticLookahead(_this.fullRuleNameToShort[rule.name], prodKey, prodOccurrence);
          _this.setLaFuncCache(key, laFunc);
        });
      };
      LooksAhead2.prototype.lookAheadBuilderForOptional = function(alt, tokenMatcher, dynamicTokensEnabled) {
        return lookahead_1.buildSingleAlternativeLookaheadFunction(alt, tokenMatcher, dynamicTokensEnabled);
      };
      LooksAhead2.prototype.lookAheadBuilderForAlternatives = function(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled) {
        return lookahead_1.buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled);
      };
      LooksAhead2.prototype.getKeyForAutomaticLookahead = function(dslMethodIdx, occurrence) {
        var currRuleShortName = this.getLastExplicitRuleShortName();
        return keys_1.getKeyForAutomaticLookahead(currRuleShortName, dslMethodIdx, occurrence);
      };
      LooksAhead2.prototype.getLaFuncFromCache = function(key) {
        return void 0;
      };
      LooksAhead2.prototype.getLaFuncFromMap = function(key) {
        return this.lookAheadFuncsCache.get(key);
      };
      LooksAhead2.prototype.getLaFuncFromObj = function(key) {
        return this.lookAheadFuncsCache[key];
      };
      LooksAhead2.prototype.setLaFuncCache = function(key, value) {
      };
      LooksAhead2.prototype.setLaFuncCacheUsingMap = function(key, value) {
        this.lookAheadFuncsCache.set(key, value);
      };
      LooksAhead2.prototype.setLaFuncUsingObj = function(key, value) {
        this.lookAheadFuncsCache[key] = value;
      };
      return LooksAhead2;
    }();
    exports2.LooksAhead = LooksAhead;
  }
});

// lib/src/parse/cst/cst.js
var require_cst = __commonJS({
  "lib/src/parse/cst/cst.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.addNoneTerminalToCst = exports2.addTerminalToCst = exports2.setNodeLocationFull = exports2.setNodeLocationOnlyOffset = void 0;
    function setNodeLocationOnlyOffset(currNodeLocation, newLocationInfo) {
      if (isNaN(currNodeLocation.startOffset) === true) {
        currNodeLocation.startOffset = newLocationInfo.startOffset;
        currNodeLocation.endOffset = newLocationInfo.endOffset;
      } else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
        currNodeLocation.endOffset = newLocationInfo.endOffset;
      }
    }
    exports2.setNodeLocationOnlyOffset = setNodeLocationOnlyOffset;
    function setNodeLocationFull(currNodeLocation, newLocationInfo) {
      if (isNaN(currNodeLocation.startOffset) === true) {
        currNodeLocation.startOffset = newLocationInfo.startOffset;
        currNodeLocation.startColumn = newLocationInfo.startColumn;
        currNodeLocation.startLine = newLocationInfo.startLine;
        currNodeLocation.endOffset = newLocationInfo.endOffset;
        currNodeLocation.endColumn = newLocationInfo.endColumn;
        currNodeLocation.endLine = newLocationInfo.endLine;
      } else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
        currNodeLocation.endOffset = newLocationInfo.endOffset;
        currNodeLocation.endColumn = newLocationInfo.endColumn;
        currNodeLocation.endLine = newLocationInfo.endLine;
      }
    }
    exports2.setNodeLocationFull = setNodeLocationFull;
    function addTerminalToCst(node, token, tokenTypeName) {
      if (node.children[tokenTypeName] === void 0) {
        node.children[tokenTypeName] = [token];
      } else {
        node.children[tokenTypeName].push(token);
      }
    }
    exports2.addTerminalToCst = addTerminalToCst;
    function addNoneTerminalToCst(node, ruleName, ruleResult) {
      if (node.children[ruleName] === void 0) {
        node.children[ruleName] = [ruleResult];
      } else {
        node.children[ruleName].push(ruleResult);
      }
    }
    exports2.addNoneTerminalToCst = addNoneTerminalToCst;
  }
});

// lib/src/lang/lang_extensions.js
var require_lang_extensions = __commonJS({
  "lib/src/lang/lang_extensions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defineNameProp = exports2.functionName = exports2.classNameFromInstance = void 0;
    var utils_1 = require_api();
    function classNameFromInstance(instance) {
      return functionName(instance.constructor);
    }
    exports2.classNameFromInstance = classNameFromInstance;
    var NAME = "name";
    function functionName(func) {
      var existingNameProp = func.name;
      if (existingNameProp) {
        return existingNameProp;
      } else {
        return "anonymous";
      }
    }
    exports2.functionName = functionName;
    function defineNameProp(obj, nameValue) {
      var namePropDescriptor = Object.getOwnPropertyDescriptor(obj, NAME);
      if (utils_1.isUndefined(namePropDescriptor) || namePropDescriptor.configurable) {
        Object.defineProperty(obj, NAME, {
          enumerable: false,
          configurable: true,
          writable: false,
          value: nameValue
        });
        return true;
      }
      return false;
    }
    exports2.defineNameProp = defineNameProp;
  }
});

// lib/src/parse/cst/cst_visitor.js
var require_cst_visitor = __commonJS({
  "lib/src/parse/cst/cst_visitor.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateRedundantMethods = exports2.validateMissingCstMethods = exports2.validateVisitor = exports2.CstVisitorDefinitionError = exports2.createBaseVisitorConstructorWithDefaults = exports2.createBaseSemanticVisitorConstructor = exports2.defaultVisit = void 0;
    var utils_1 = require_api();
    var lang_extensions_1 = require_lang_extensions();
    function defaultVisit(ctx, param) {
      var childrenNames = utils_1.keys(ctx);
      var childrenNamesLength = childrenNames.length;
      for (var i = 0; i < childrenNamesLength; i++) {
        var currChildName = childrenNames[i];
        var currChildArray = ctx[currChildName];
        var currChildArrayLength = currChildArray.length;
        for (var j = 0; j < currChildArrayLength; j++) {
          var currChild = currChildArray[j];
          if (currChild.tokenTypeIdx === void 0) {
            this[currChild.name](currChild.children, param);
          }
        }
      }
      return void 0;
    }
    exports2.defaultVisit = defaultVisit;
    function createBaseSemanticVisitorConstructor(grammarName, ruleNames) {
      var derivedConstructor = function() {
      };
      lang_extensions_1.defineNameProp(derivedConstructor, grammarName + "BaseSemantics");
      var semanticProto = {
        visit: function(cstNode, param) {
          if (utils_1.isArray(cstNode)) {
            cstNode = cstNode[0];
          }
          if (utils_1.isUndefined(cstNode)) {
            return void 0;
          }
          return this[cstNode.name](cstNode.children, param);
        },
        validateVisitor: function() {
          var semanticDefinitionErrors = validateVisitor(this, ruleNames);
          if (!utils_1.isEmpty(semanticDefinitionErrors)) {
            var errorMessages = utils_1.map(semanticDefinitionErrors, function(currDefError) {
              return currDefError.msg;
            });
            throw Error("Errors Detected in CST Visitor <" + lang_extensions_1.functionName(this.constructor) + ">:\n	" + ("" + errorMessages.join("\n\n").replace(/\n/g, "\n	")));
          }
        }
      };
      derivedConstructor.prototype = semanticProto;
      derivedConstructor.prototype.constructor = derivedConstructor;
      derivedConstructor._RULE_NAMES = ruleNames;
      return derivedConstructor;
    }
    exports2.createBaseSemanticVisitorConstructor = createBaseSemanticVisitorConstructor;
    function createBaseVisitorConstructorWithDefaults(grammarName, ruleNames, baseConstructor) {
      var derivedConstructor = function() {
      };
      lang_extensions_1.defineNameProp(derivedConstructor, grammarName + "BaseSemanticsWithDefaults");
      var withDefaultsProto = Object.create(baseConstructor.prototype);
      utils_1.forEach(ruleNames, function(ruleName) {
        withDefaultsProto[ruleName] = defaultVisit;
      });
      derivedConstructor.prototype = withDefaultsProto;
      derivedConstructor.prototype.constructor = derivedConstructor;
      return derivedConstructor;
    }
    exports2.createBaseVisitorConstructorWithDefaults = createBaseVisitorConstructorWithDefaults;
    var CstVisitorDefinitionError;
    (function(CstVisitorDefinitionError2) {
      CstVisitorDefinitionError2[CstVisitorDefinitionError2["REDUNDANT_METHOD"] = 0] = "REDUNDANT_METHOD";
      CstVisitorDefinitionError2[CstVisitorDefinitionError2["MISSING_METHOD"] = 1] = "MISSING_METHOD";
    })(CstVisitorDefinitionError = exports2.CstVisitorDefinitionError || (exports2.CstVisitorDefinitionError = {}));
    function validateVisitor(visitorInstance, ruleNames) {
      var missingErrors = validateMissingCstMethods(visitorInstance, ruleNames);
      var redundantErrors = validateRedundantMethods(visitorInstance, ruleNames);
      return missingErrors.concat(redundantErrors);
    }
    exports2.validateVisitor = validateVisitor;
    function validateMissingCstMethods(visitorInstance, ruleNames) {
      var errors = utils_1.map(ruleNames, function(currRuleName) {
        if (!utils_1.isFunction(visitorInstance[currRuleName])) {
          return {
            msg: "Missing visitor method: <" + currRuleName + "> on " + lang_extensions_1.functionName(visitorInstance.constructor) + " CST Visitor.",
            type: CstVisitorDefinitionError.MISSING_METHOD,
            methodName: currRuleName
          };
        }
      });
      return utils_1.compact(errors);
    }
    exports2.validateMissingCstMethods = validateMissingCstMethods;
    var VALID_PROP_NAMES = ["constructor", "visit", "validateVisitor"];
    function validateRedundantMethods(visitorInstance, ruleNames) {
      var errors = [];
      for (var prop in visitorInstance) {
        if (utils_1.isFunction(visitorInstance[prop]) && !utils_1.contains(VALID_PROP_NAMES, prop) && !utils_1.contains(ruleNames, prop)) {
          errors.push({
            msg: "Redundant visitor method: <" + prop + "> on " + lang_extensions_1.functionName(visitorInstance.constructor) + " CST Visitor\nThere is no Grammar Rule corresponding to this method's name.\n",
            type: CstVisitorDefinitionError.REDUNDANT_METHOD,
            methodName: prop
          });
        }
      }
      return errors;
    }
    exports2.validateRedundantMethods = validateRedundantMethods;
  }
});

// lib/src/parse/parser/traits/tree_builder.js
var require_tree_builder = __commonJS({
  "lib/src/parse/parser/traits/tree_builder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TreeBuilder = void 0;
    var cst_1 = require_cst();
    var utils_1 = require_api();
    var cst_visitor_1 = require_cst_visitor();
    var parser_1 = require_parser();
    var TreeBuilder = function() {
      function TreeBuilder2() {
      }
      TreeBuilder2.prototype.initTreeBuilder = function(config) {
        this.CST_STACK = [];
        this.outputCst = config.outputCst;
        this.nodeLocationTracking = utils_1.has(config, "nodeLocationTracking") ? config.nodeLocationTracking : parser_1.DEFAULT_PARSER_CONFIG.nodeLocationTracking;
        if (!this.outputCst) {
          this.cstInvocationStateUpdate = utils_1.NOOP;
          this.cstFinallyStateUpdate = utils_1.NOOP;
          this.cstPostTerminal = utils_1.NOOP;
          this.cstPostNonTerminal = utils_1.NOOP;
          this.cstPostRule = utils_1.NOOP;
        } else {
          if (/full/i.test(this.nodeLocationTracking)) {
            if (this.recoveryEnabled) {
              this.setNodeLocationFromToken = cst_1.setNodeLocationFull;
              this.setNodeLocationFromNode = cst_1.setNodeLocationFull;
              this.cstPostRule = utils_1.NOOP;
              this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery;
            } else {
              this.setNodeLocationFromToken = utils_1.NOOP;
              this.setNodeLocationFromNode = utils_1.NOOP;
              this.cstPostRule = this.cstPostRuleFull;
              this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular;
            }
          } else if (/onlyOffset/i.test(this.nodeLocationTracking)) {
            if (this.recoveryEnabled) {
              this.setNodeLocationFromToken = cst_1.setNodeLocationOnlyOffset;
              this.setNodeLocationFromNode = cst_1.setNodeLocationOnlyOffset;
              this.cstPostRule = utils_1.NOOP;
              this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery;
            } else {
              this.setNodeLocationFromToken = utils_1.NOOP;
              this.setNodeLocationFromNode = utils_1.NOOP;
              this.cstPostRule = this.cstPostRuleOnlyOffset;
              this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular;
            }
          } else if (/none/i.test(this.nodeLocationTracking)) {
            this.setNodeLocationFromToken = utils_1.NOOP;
            this.setNodeLocationFromNode = utils_1.NOOP;
            this.cstPostRule = utils_1.NOOP;
            this.setInitialNodeLocation = utils_1.NOOP;
          } else {
            throw Error('Invalid <nodeLocationTracking> config option: "' + config.nodeLocationTracking + '"');
          }
        }
      };
      TreeBuilder2.prototype.setInitialNodeLocationOnlyOffsetRecovery = function(cstNode) {
        cstNode.location = {
          startOffset: NaN,
          endOffset: NaN
        };
      };
      TreeBuilder2.prototype.setInitialNodeLocationOnlyOffsetRegular = function(cstNode) {
        cstNode.location = {
          startOffset: this.LA(1).startOffset,
          endOffset: NaN
        };
      };
      TreeBuilder2.prototype.setInitialNodeLocationFullRecovery = function(cstNode) {
        cstNode.location = {
          startOffset: NaN,
          startLine: NaN,
          startColumn: NaN,
          endOffset: NaN,
          endLine: NaN,
          endColumn: NaN
        };
      };
      TreeBuilder2.prototype.setInitialNodeLocationFullRegular = function(cstNode) {
        var nextToken = this.LA(1);
        cstNode.location = {
          startOffset: nextToken.startOffset,
          startLine: nextToken.startLine,
          startColumn: nextToken.startColumn,
          endOffset: NaN,
          endLine: NaN,
          endColumn: NaN
        };
      };
      TreeBuilder2.prototype.cstInvocationStateUpdate = function(fullRuleName, shortName) {
        var cstNode = {
          name: fullRuleName,
          children: {}
        };
        this.setInitialNodeLocation(cstNode);
        this.CST_STACK.push(cstNode);
      };
      TreeBuilder2.prototype.cstFinallyStateUpdate = function() {
        this.CST_STACK.pop();
      };
      TreeBuilder2.prototype.cstPostRuleFull = function(ruleCstNode) {
        var prevToken = this.LA(0);
        var loc = ruleCstNode.location;
        if (loc.startOffset <= prevToken.startOffset === true) {
          loc.endOffset = prevToken.endOffset;
          loc.endLine = prevToken.endLine;
          loc.endColumn = prevToken.endColumn;
        } else {
          loc.startOffset = NaN;
          loc.startLine = NaN;
          loc.startColumn = NaN;
        }
      };
      TreeBuilder2.prototype.cstPostRuleOnlyOffset = function(ruleCstNode) {
        var prevToken = this.LA(0);
        var loc = ruleCstNode.location;
        if (loc.startOffset <= prevToken.startOffset === true) {
          loc.endOffset = prevToken.endOffset;
        } else {
          loc.startOffset = NaN;
        }
      };
      TreeBuilder2.prototype.cstPostTerminal = function(key, consumedToken) {
        var rootCst = this.CST_STACK[this.CST_STACK.length - 1];
        cst_1.addTerminalToCst(rootCst, consumedToken, key);
        this.setNodeLocationFromToken(rootCst.location, consumedToken);
      };
      TreeBuilder2.prototype.cstPostNonTerminal = function(ruleCstResult, ruleName) {
        var preCstNode = this.CST_STACK[this.CST_STACK.length - 1];
        cst_1.addNoneTerminalToCst(preCstNode, ruleName, ruleCstResult);
        this.setNodeLocationFromNode(preCstNode.location, ruleCstResult.location);
      };
      TreeBuilder2.prototype.getBaseCstVisitorConstructor = function() {
        if (utils_1.isUndefined(this.baseCstVisitorConstructor)) {
          var newBaseCstVisitorConstructor = cst_visitor_1.createBaseSemanticVisitorConstructor(this.className, utils_1.keys(this.gastProductionsCache));
          this.baseCstVisitorConstructor = newBaseCstVisitorConstructor;
          return newBaseCstVisitorConstructor;
        }
        return this.baseCstVisitorConstructor;
      };
      TreeBuilder2.prototype.getBaseCstVisitorConstructorWithDefaults = function() {
        if (utils_1.isUndefined(this.baseCstVisitorWithDefaultsConstructor)) {
          var newConstructor = cst_visitor_1.createBaseVisitorConstructorWithDefaults(this.className, utils_1.keys(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
          this.baseCstVisitorWithDefaultsConstructor = newConstructor;
          return newConstructor;
        }
        return this.baseCstVisitorWithDefaultsConstructor;
      };
      TreeBuilder2.prototype.getLastExplicitRuleShortName = function() {
        var ruleStack = this.RULE_STACK;
        return ruleStack[ruleStack.length - 1];
      };
      TreeBuilder2.prototype.getPreviousExplicitRuleShortName = function() {
        var ruleStack = this.RULE_STACK;
        return ruleStack[ruleStack.length - 2];
      };
      TreeBuilder2.prototype.getLastExplicitRuleOccurrenceIndex = function() {
        var occurrenceStack = this.RULE_OCCURRENCE_STACK;
        return occurrenceStack[occurrenceStack.length - 1];
      };
      return TreeBuilder2;
    }();
    exports2.TreeBuilder = TreeBuilder;
  }
});

// lib/src/parse/parser/traits/lexer_adapter.js
var require_lexer_adapter = __commonJS({
  "lib/src/parse/parser/traits/lexer_adapter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LexerAdapter = void 0;
    var parser_1 = require_parser();
    var LexerAdapter = function() {
      function LexerAdapter2() {
      }
      LexerAdapter2.prototype.initLexerAdapter = function() {
        this.tokVector = [];
        this.tokVectorLength = 0;
        this.currIdx = -1;
      };
      Object.defineProperty(LexerAdapter2.prototype, "input", {
        get: function() {
          return this.tokVector;
        },
        set: function(newInput) {
          if (this.selfAnalysisDone !== true) {
            throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
          }
          this.reset();
          this.tokVector = newInput;
          this.tokVectorLength = newInput.length;
        },
        enumerable: false,
        configurable: true
      });
      LexerAdapter2.prototype.SKIP_TOKEN = function() {
        if (this.currIdx <= this.tokVector.length - 2) {
          this.consumeToken();
          return this.LA(1);
        } else {
          return parser_1.END_OF_FILE;
        }
      };
      LexerAdapter2.prototype.LA = function(howMuch) {
        var soughtIdx = this.currIdx + howMuch;
        if (soughtIdx < 0 || this.tokVectorLength <= soughtIdx) {
          return parser_1.END_OF_FILE;
        } else {
          return this.tokVector[soughtIdx];
        }
      };
      LexerAdapter2.prototype.consumeToken = function() {
        this.currIdx++;
      };
      LexerAdapter2.prototype.exportLexerState = function() {
        return this.currIdx;
      };
      LexerAdapter2.prototype.importLexerState = function(newState) {
        this.currIdx = newState;
      };
      LexerAdapter2.prototype.resetLexerState = function() {
        this.currIdx = -1;
      };
      LexerAdapter2.prototype.moveToTerminatedState = function() {
        this.currIdx = this.tokVector.length - 1;
      };
      LexerAdapter2.prototype.getLexerPosition = function() {
        return this.exportLexerState();
      };
      return LexerAdapter2;
    }();
    exports2.LexerAdapter = LexerAdapter;
  }
});

// lib/src/parse/parser/traits/recognizer_api.js
var require_recognizer_api = __commonJS({
  "lib/src/parse/parser/traits/recognizer_api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RecognizerApi = void 0;
    var utils_1 = require_api();
    var exceptions_public_1 = require_exceptions_public();
    var parser_1 = require_parser();
    var errors_public_1 = require_errors_public();
    var checks_1 = require_checks();
    var gast_public_1 = require_gast_public();
    var RecognizerApi = function() {
      function RecognizerApi2() {
      }
      RecognizerApi2.prototype.ACTION = function(impl) {
        return impl.call(this);
      };
      RecognizerApi2.prototype.consume = function(idx, tokType, options) {
        return this.consumeInternal(tokType, idx, options);
      };
      RecognizerApi2.prototype.subrule = function(idx, ruleToCall, options) {
        return this.subruleInternal(ruleToCall, idx, options);
      };
      RecognizerApi2.prototype.option = function(idx, actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, idx);
      };
      RecognizerApi2.prototype.or = function(idx, altsOrOpts) {
        return this.orInternal(altsOrOpts, idx);
      };
      RecognizerApi2.prototype.many = function(idx, actionORMethodDef) {
        return this.manyInternal(idx, actionORMethodDef);
      };
      RecognizerApi2.prototype.atLeastOne = function(idx, actionORMethodDef) {
        return this.atLeastOneInternal(idx, actionORMethodDef);
      };
      RecognizerApi2.prototype.CONSUME = function(tokType, options) {
        return this.consumeInternal(tokType, 0, options);
      };
      RecognizerApi2.prototype.CONSUME1 = function(tokType, options) {
        return this.consumeInternal(tokType, 1, options);
      };
      RecognizerApi2.prototype.CONSUME2 = function(tokType, options) {
        return this.consumeInternal(tokType, 2, options);
      };
      RecognizerApi2.prototype.CONSUME3 = function(tokType, options) {
        return this.consumeInternal(tokType, 3, options);
      };
      RecognizerApi2.prototype.CONSUME4 = function(tokType, options) {
        return this.consumeInternal(tokType, 4, options);
      };
      RecognizerApi2.prototype.CONSUME5 = function(tokType, options) {
        return this.consumeInternal(tokType, 5, options);
      };
      RecognizerApi2.prototype.CONSUME6 = function(tokType, options) {
        return this.consumeInternal(tokType, 6, options);
      };
      RecognizerApi2.prototype.CONSUME7 = function(tokType, options) {
        return this.consumeInternal(tokType, 7, options);
      };
      RecognizerApi2.prototype.CONSUME8 = function(tokType, options) {
        return this.consumeInternal(tokType, 8, options);
      };
      RecognizerApi2.prototype.CONSUME9 = function(tokType, options) {
        return this.consumeInternal(tokType, 9, options);
      };
      RecognizerApi2.prototype.SUBRULE = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 0, options);
      };
      RecognizerApi2.prototype.SUBRULE1 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 1, options);
      };
      RecognizerApi2.prototype.SUBRULE2 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 2, options);
      };
      RecognizerApi2.prototype.SUBRULE3 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 3, options);
      };
      RecognizerApi2.prototype.SUBRULE4 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 4, options);
      };
      RecognizerApi2.prototype.SUBRULE5 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 5, options);
      };
      RecognizerApi2.prototype.SUBRULE6 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 6, options);
      };
      RecognizerApi2.prototype.SUBRULE7 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 7, options);
      };
      RecognizerApi2.prototype.SUBRULE8 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 8, options);
      };
      RecognizerApi2.prototype.SUBRULE9 = function(ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 9, options);
      };
      RecognizerApi2.prototype.OPTION = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 0);
      };
      RecognizerApi2.prototype.OPTION1 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 1);
      };
      RecognizerApi2.prototype.OPTION2 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 2);
      };
      RecognizerApi2.prototype.OPTION3 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 3);
      };
      RecognizerApi2.prototype.OPTION4 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 4);
      };
      RecognizerApi2.prototype.OPTION5 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 5);
      };
      RecognizerApi2.prototype.OPTION6 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 6);
      };
      RecognizerApi2.prototype.OPTION7 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 7);
      };
      RecognizerApi2.prototype.OPTION8 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 8);
      };
      RecognizerApi2.prototype.OPTION9 = function(actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 9);
      };
      RecognizerApi2.prototype.OR = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 0);
      };
      RecognizerApi2.prototype.OR1 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 1);
      };
      RecognizerApi2.prototype.OR2 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 2);
      };
      RecognizerApi2.prototype.OR3 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 3);
      };
      RecognizerApi2.prototype.OR4 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 4);
      };
      RecognizerApi2.prototype.OR5 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 5);
      };
      RecognizerApi2.prototype.OR6 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 6);
      };
      RecognizerApi2.prototype.OR7 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 7);
      };
      RecognizerApi2.prototype.OR8 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 8);
      };
      RecognizerApi2.prototype.OR9 = function(altsOrOpts) {
        return this.orInternal(altsOrOpts, 9);
      };
      RecognizerApi2.prototype.MANY = function(actionORMethodDef) {
        this.manyInternal(0, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY1 = function(actionORMethodDef) {
        this.manyInternal(1, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY2 = function(actionORMethodDef) {
        this.manyInternal(2, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY3 = function(actionORMethodDef) {
        this.manyInternal(3, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY4 = function(actionORMethodDef) {
        this.manyInternal(4, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY5 = function(actionORMethodDef) {
        this.manyInternal(5, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY6 = function(actionORMethodDef) {
        this.manyInternal(6, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY7 = function(actionORMethodDef) {
        this.manyInternal(7, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY8 = function(actionORMethodDef) {
        this.manyInternal(8, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY9 = function(actionORMethodDef) {
        this.manyInternal(9, actionORMethodDef);
      };
      RecognizerApi2.prototype.MANY_SEP = function(options) {
        this.manySepFirstInternal(0, options);
      };
      RecognizerApi2.prototype.MANY_SEP1 = function(options) {
        this.manySepFirstInternal(1, options);
      };
      RecognizerApi2.prototype.MANY_SEP2 = function(options) {
        this.manySepFirstInternal(2, options);
      };
      RecognizerApi2.prototype.MANY_SEP3 = function(options) {
        this.manySepFirstInternal(3, options);
      };
      RecognizerApi2.prototype.MANY_SEP4 = function(options) {
        this.manySepFirstInternal(4, options);
      };
      RecognizerApi2.prototype.MANY_SEP5 = function(options) {
        this.manySepFirstInternal(5, options);
      };
      RecognizerApi2.prototype.MANY_SEP6 = function(options) {
        this.manySepFirstInternal(6, options);
      };
      RecognizerApi2.prototype.MANY_SEP7 = function(options) {
        this.manySepFirstInternal(7, options);
      };
      RecognizerApi2.prototype.MANY_SEP8 = function(options) {
        this.manySepFirstInternal(8, options);
      };
      RecognizerApi2.prototype.MANY_SEP9 = function(options) {
        this.manySepFirstInternal(9, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE = function(actionORMethodDef) {
        this.atLeastOneInternal(0, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE1 = function(actionORMethodDef) {
        return this.atLeastOneInternal(1, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE2 = function(actionORMethodDef) {
        this.atLeastOneInternal(2, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE3 = function(actionORMethodDef) {
        this.atLeastOneInternal(3, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE4 = function(actionORMethodDef) {
        this.atLeastOneInternal(4, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE5 = function(actionORMethodDef) {
        this.atLeastOneInternal(5, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE6 = function(actionORMethodDef) {
        this.atLeastOneInternal(6, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE7 = function(actionORMethodDef) {
        this.atLeastOneInternal(7, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE8 = function(actionORMethodDef) {
        this.atLeastOneInternal(8, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE9 = function(actionORMethodDef) {
        this.atLeastOneInternal(9, actionORMethodDef);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP = function(options) {
        this.atLeastOneSepFirstInternal(0, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP1 = function(options) {
        this.atLeastOneSepFirstInternal(1, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP2 = function(options) {
        this.atLeastOneSepFirstInternal(2, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP3 = function(options) {
        this.atLeastOneSepFirstInternal(3, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP4 = function(options) {
        this.atLeastOneSepFirstInternal(4, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP5 = function(options) {
        this.atLeastOneSepFirstInternal(5, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP6 = function(options) {
        this.atLeastOneSepFirstInternal(6, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP7 = function(options) {
        this.atLeastOneSepFirstInternal(7, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP8 = function(options) {
        this.atLeastOneSepFirstInternal(8, options);
      };
      RecognizerApi2.prototype.AT_LEAST_ONE_SEP9 = function(options) {
        this.atLeastOneSepFirstInternal(9, options);
      };
      RecognizerApi2.prototype.RULE = function(name, implementation, config) {
        if (config === void 0) {
          config = parser_1.DEFAULT_RULE_CONFIG;
        }
        if (utils_1.contains(this.definedRulesNames, name)) {
          var errMsg = errors_public_1.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({
            topLevelRule: name,
            grammarName: this.className
          });
          var error = {
            message: errMsg,
            type: parser_1.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
            ruleName: name
          };
          this.definitionErrors.push(error);
        }
        this.definedRulesNames.push(name);
        var ruleImplementation = this.defineRule(name, implementation, config);
        this[name] = ruleImplementation;
        return ruleImplementation;
      };
      RecognizerApi2.prototype.OVERRIDE_RULE = function(name, impl, config) {
        if (config === void 0) {
          config = parser_1.DEFAULT_RULE_CONFIG;
        }
        var ruleErrors = [];
        ruleErrors = ruleErrors.concat(checks_1.validateRuleIsOverridden(name, this.definedRulesNames, this.className));
        this.definitionErrors = this.definitionErrors.concat(ruleErrors);
        var ruleImplementation = this.defineRule(name, impl, config);
        this[name] = ruleImplementation;
        return ruleImplementation;
      };
      RecognizerApi2.prototype.BACKTRACK = function(grammarRule, args) {
        return function() {
          this.isBackTrackingStack.push(1);
          var orgState = this.saveRecogState();
          try {
            grammarRule.apply(this, args);
            return true;
          } catch (e) {
            if (exceptions_public_1.isRecognitionException(e)) {
              return false;
            } else {
              throw e;
            }
          } finally {
            this.reloadRecogState(orgState);
            this.isBackTrackingStack.pop();
          }
        };
      };
      RecognizerApi2.prototype.getGAstProductions = function() {
        return this.gastProductionsCache;
      };
      RecognizerApi2.prototype.getSerializedGastProductions = function() {
        return gast_public_1.serializeGrammar(utils_1.values(this.gastProductionsCache));
      };
      return RecognizerApi2;
    }();
    exports2.RecognizerApi = RecognizerApi;
  }
});

// lib/src/parse/parser/traits/recognizer_engine.js
var require_recognizer_engine = __commonJS({
  "lib/src/parse/parser/traits/recognizer_engine.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RecognizerEngine = void 0;
    var utils_1 = require_api();
    var keys_1 = require_keys();
    var exceptions_public_1 = require_exceptions_public();
    var lookahead_1 = require_lookahead();
    var interpreter_1 = require_interpreter();
    var parser_1 = require_parser();
    var recoverable_1 = require_recoverable();
    var tokens_public_1 = require_tokens_public();
    var tokens_1 = require_tokens();
    var lang_extensions_1 = require_lang_extensions();
    var RecognizerEngine = function() {
      function RecognizerEngine2() {
      }
      RecognizerEngine2.prototype.initRecognizerEngine = function(tokenVocabulary, config) {
        this.className = lang_extensions_1.classNameFromInstance(this);
        this.shortRuleNameToFull = {};
        this.fullRuleNameToShort = {};
        this.ruleShortNameIdx = 256;
        this.tokenMatcher = tokens_1.tokenStructuredMatcherNoCategories;
        this.definedRulesNames = [];
        this.tokensMap = {};
        this.isBackTrackingStack = [];
        this.RULE_STACK = [];
        this.RULE_OCCURRENCE_STACK = [];
        this.gastProductionsCache = {};
        if (utils_1.has(config, "serializedGrammar")) {
          throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0\n	For Further details.");
        }
        if (utils_1.isArray(tokenVocabulary)) {
          if (utils_1.isEmpty(tokenVocabulary)) {
            throw Error("A Token Vocabulary cannot be empty.\n	Note that the first argument for the parser constructor\n	is no longer a Token vector (since v4.0).");
          }
          if (typeof tokenVocabulary[0].startOffset === "number") {
            throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0\n	For Further details.");
          }
        }
        if (utils_1.isArray(tokenVocabulary)) {
          this.tokensMap = utils_1.reduce(tokenVocabulary, function(acc, tokType) {
            acc[tokType.name] = tokType;
            return acc;
          }, {});
        } else if (utils_1.has(tokenVocabulary, "modes") && utils_1.every(utils_1.flatten(utils_1.values(tokenVocabulary.modes)), tokens_1.isTokenType)) {
          var allTokenTypes = utils_1.flatten(utils_1.values(tokenVocabulary.modes));
          var uniqueTokens = utils_1.uniq(allTokenTypes);
          this.tokensMap = utils_1.reduce(uniqueTokens, function(acc, tokType) {
            acc[tokType.name] = tokType;
            return acc;
          }, {});
        } else if (utils_1.isObject(tokenVocabulary)) {
          this.tokensMap = utils_1.cloneObj(tokenVocabulary);
        } else {
          throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
        }
        this.tokensMap["EOF"] = tokens_public_1.EOF;
        var noTokenCategoriesUsed = utils_1.every(utils_1.values(tokenVocabulary), function(tokenConstructor) {
          return utils_1.isEmpty(tokenConstructor.categoryMatches);
        });
        this.tokenMatcher = noTokenCategoriesUsed ? tokens_1.tokenStructuredMatcherNoCategories : tokens_1.tokenStructuredMatcher;
        tokens_1.augmentTokenTypes(utils_1.values(this.tokensMap));
      };
      RecognizerEngine2.prototype.defineRule = function(ruleName, impl, config) {
        if (this.selfAnalysisDone) {
          throw Error("Grammar rule <" + ruleName + "> may not be defined after the 'performSelfAnalysis' method has been called'\nMake sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");
        }
        var resyncEnabled = utils_1.has(config, "resyncEnabled") ? config.resyncEnabled : parser_1.DEFAULT_RULE_CONFIG.resyncEnabled;
        var recoveryValueFunc = utils_1.has(config, "recoveryValueFunc") ? config.recoveryValueFunc : parser_1.DEFAULT_RULE_CONFIG.recoveryValueFunc;
        var shortName = this.ruleShortNameIdx << keys_1.BITS_FOR_METHOD_TYPE + keys_1.BITS_FOR_OCCURRENCE_IDX;
        this.ruleShortNameIdx++;
        this.shortRuleNameToFull[shortName] = ruleName;
        this.fullRuleNameToShort[ruleName] = shortName;
        function invokeRuleWithTry(args) {
          try {
            if (this.outputCst === true) {
              impl.apply(this, args);
              var cst = this.CST_STACK[this.CST_STACK.length - 1];
              this.cstPostRule(cst);
              return cst;
            } else {
              return impl.apply(this, args);
            }
          } catch (e) {
            return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
          } finally {
            this.ruleFinallyStateUpdate();
          }
        }
        var wrappedGrammarRule = function(idxInCallingRule, args) {
          if (idxInCallingRule === void 0) {
            idxInCallingRule = 0;
          }
          this.ruleInvocationStateUpdate(shortName, ruleName, idxInCallingRule);
          return invokeRuleWithTry.call(this, args);
        };
        var ruleNamePropName = "ruleName";
        wrappedGrammarRule[ruleNamePropName] = ruleName;
        wrappedGrammarRule["originalGrammarAction"] = impl;
        return wrappedGrammarRule;
      };
      RecognizerEngine2.prototype.invokeRuleCatch = function(e, resyncEnabledConfig, recoveryValueFunc) {
        var isFirstInvokedRule = this.RULE_STACK.length === 1;
        var reSyncEnabled = resyncEnabledConfig && !this.isBackTracking() && this.recoveryEnabled;
        if (exceptions_public_1.isRecognitionException(e)) {
          var recogError = e;
          if (reSyncEnabled) {
            var reSyncTokType = this.findReSyncTokenType();
            if (this.isInCurrentRuleReSyncSet(reSyncTokType)) {
              recogError.resyncedTokens = this.reSyncTo(reSyncTokType);
              if (this.outputCst) {
                var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
                partialCstResult.recoveredNode = true;
                return partialCstResult;
              } else {
                return recoveryValueFunc();
              }
            } else {
              if (this.outputCst) {
                var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
                partialCstResult.recoveredNode = true;
                recogError.partialCstResult = partialCstResult;
              }
              throw recogError;
            }
          } else if (isFirstInvokedRule) {
            this.moveToTerminatedState();
            return recoveryValueFunc();
          } else {
            throw recogError;
          }
        } else {
          throw e;
        }
      };
      RecognizerEngine2.prototype.optionInternal = function(actionORMethodDef, occurrence) {
        var key = this.getKeyForAutomaticLookahead(keys_1.OPTION_IDX, occurrence);
        return this.optionInternalLogic(actionORMethodDef, occurrence, key);
      };
      RecognizerEngine2.prototype.optionInternalLogic = function(actionORMethodDef, occurrence, key) {
        var _this = this;
        var lookAheadFunc = this.getLaFuncFromCache(key);
        var action;
        var predicate;
        if (actionORMethodDef.DEF !== void 0) {
          action = actionORMethodDef.DEF;
          predicate = actionORMethodDef.GATE;
          if (predicate !== void 0) {
            var orgLookaheadFunction_1 = lookAheadFunc;
            lookAheadFunc = function() {
              return predicate.call(_this) && orgLookaheadFunction_1.call(_this);
            };
          }
        } else {
          action = actionORMethodDef;
        }
        if (lookAheadFunc.call(this) === true) {
          return action.call(this);
        }
        return void 0;
      };
      RecognizerEngine2.prototype.atLeastOneInternal = function(prodOccurrence, actionORMethodDef) {
        var laKey = this.getKeyForAutomaticLookahead(keys_1.AT_LEAST_ONE_IDX, prodOccurrence);
        return this.atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, laKey);
      };
      RecognizerEngine2.prototype.atLeastOneInternalLogic = function(prodOccurrence, actionORMethodDef, key) {
        var _this = this;
        var lookAheadFunc = this.getLaFuncFromCache(key);
        var action;
        var predicate;
        if (actionORMethodDef.DEF !== void 0) {
          action = actionORMethodDef.DEF;
          predicate = actionORMethodDef.GATE;
          if (predicate !== void 0) {
            var orgLookaheadFunction_2 = lookAheadFunc;
            lookAheadFunc = function() {
              return predicate.call(_this) && orgLookaheadFunction_2.call(_this);
            };
          }
        } else {
          action = actionORMethodDef;
        }
        if (lookAheadFunc.call(this) === true) {
          var notStuck = this.doSingleRepetition(action);
          while (lookAheadFunc.call(this) === true && notStuck === true) {
            notStuck = this.doSingleRepetition(action);
          }
        } else {
          throw this.raiseEarlyExitException(prodOccurrence, lookahead_1.PROD_TYPE.REPETITION_MANDATORY, actionORMethodDef.ERR_MSG);
        }
        this.attemptInRepetitionRecovery(this.atLeastOneInternal, [prodOccurrence, actionORMethodDef], lookAheadFunc, keys_1.AT_LEAST_ONE_IDX, prodOccurrence, interpreter_1.NextTerminalAfterAtLeastOneWalker);
      };
      RecognizerEngine2.prototype.atLeastOneSepFirstInternal = function(prodOccurrence, options) {
        var laKey = this.getKeyForAutomaticLookahead(keys_1.AT_LEAST_ONE_SEP_IDX, prodOccurrence);
        this.atLeastOneSepFirstInternalLogic(prodOccurrence, options, laKey);
      };
      RecognizerEngine2.prototype.atLeastOneSepFirstInternalLogic = function(prodOccurrence, options, key) {
        var _this = this;
        var action = options.DEF;
        var separator = options.SEP;
        var firstIterationLookaheadFunc = this.getLaFuncFromCache(key);
        if (firstIterationLookaheadFunc.call(this) === true) {
          ;
          action.call(this);
          var separatorLookAheadFunc = function() {
            return _this.tokenMatcher(_this.LA(1), separator);
          };
          while (this.tokenMatcher(this.LA(1), separator) === true) {
            this.CONSUME(separator);
            action.call(this);
          }
          this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
            prodOccurrence,
            separator,
            separatorLookAheadFunc,
            action,
            interpreter_1.NextTerminalAfterAtLeastOneSepWalker
          ], separatorLookAheadFunc, keys_1.AT_LEAST_ONE_SEP_IDX, prodOccurrence, interpreter_1.NextTerminalAfterAtLeastOneSepWalker);
        } else {
          throw this.raiseEarlyExitException(prodOccurrence, lookahead_1.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, options.ERR_MSG);
        }
      };
      RecognizerEngine2.prototype.manyInternal = function(prodOccurrence, actionORMethodDef) {
        var laKey = this.getKeyForAutomaticLookahead(keys_1.MANY_IDX, prodOccurrence);
        return this.manyInternalLogic(prodOccurrence, actionORMethodDef, laKey);
      };
      RecognizerEngine2.prototype.manyInternalLogic = function(prodOccurrence, actionORMethodDef, key) {
        var _this = this;
        var lookaheadFunction = this.getLaFuncFromCache(key);
        var action;
        var predicate;
        if (actionORMethodDef.DEF !== void 0) {
          action = actionORMethodDef.DEF;
          predicate = actionORMethodDef.GATE;
          if (predicate !== void 0) {
            var orgLookaheadFunction_3 = lookaheadFunction;
            lookaheadFunction = function() {
              return predicate.call(_this) && orgLookaheadFunction_3.call(_this);
            };
          }
        } else {
          action = actionORMethodDef;
        }
        var notStuck = true;
        while (lookaheadFunction.call(this) === true && notStuck === true) {
          notStuck = this.doSingleRepetition(action);
        }
        this.attemptInRepetitionRecovery(this.manyInternal, [prodOccurrence, actionORMethodDef], lookaheadFunction, keys_1.MANY_IDX, prodOccurrence, interpreter_1.NextTerminalAfterManyWalker, notStuck);
      };
      RecognizerEngine2.prototype.manySepFirstInternal = function(prodOccurrence, options) {
        var laKey = this.getKeyForAutomaticLookahead(keys_1.MANY_SEP_IDX, prodOccurrence);
        this.manySepFirstInternalLogic(prodOccurrence, options, laKey);
      };
      RecognizerEngine2.prototype.manySepFirstInternalLogic = function(prodOccurrence, options, key) {
        var _this = this;
        var action = options.DEF;
        var separator = options.SEP;
        var firstIterationLaFunc = this.getLaFuncFromCache(key);
        if (firstIterationLaFunc.call(this) === true) {
          action.call(this);
          var separatorLookAheadFunc = function() {
            return _this.tokenMatcher(_this.LA(1), separator);
          };
          while (this.tokenMatcher(this.LA(1), separator) === true) {
            this.CONSUME(separator);
            action.call(this);
          }
          this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
            prodOccurrence,
            separator,
            separatorLookAheadFunc,
            action,
            interpreter_1.NextTerminalAfterManySepWalker
          ], separatorLookAheadFunc, keys_1.MANY_SEP_IDX, prodOccurrence, interpreter_1.NextTerminalAfterManySepWalker);
        }
      };
      RecognizerEngine2.prototype.repetitionSepSecondInternal = function(prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker) {
        while (separatorLookAheadFunc()) {
          this.CONSUME(separator);
          action.call(this);
        }
        this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
          prodOccurrence,
          separator,
          separatorLookAheadFunc,
          action,
          nextTerminalAfterWalker
        ], separatorLookAheadFunc, keys_1.AT_LEAST_ONE_SEP_IDX, prodOccurrence, nextTerminalAfterWalker);
      };
      RecognizerEngine2.prototype.doSingleRepetition = function(action) {
        var beforeIteration = this.getLexerPosition();
        action.call(this);
        var afterIteration = this.getLexerPosition();
        return afterIteration > beforeIteration;
      };
      RecognizerEngine2.prototype.orInternal = function(altsOrOpts, occurrence) {
        var laKey = this.getKeyForAutomaticLookahead(keys_1.OR_IDX, occurrence);
        var alts = utils_1.isArray(altsOrOpts) ? altsOrOpts : altsOrOpts.DEF;
        var laFunc = this.getLaFuncFromCache(laKey);
        var altIdxToTake = laFunc.call(this, alts);
        if (altIdxToTake !== void 0) {
          var chosenAlternative = alts[altIdxToTake];
          return chosenAlternative.ALT.call(this);
        }
        this.raiseNoAltException(occurrence, altsOrOpts.ERR_MSG);
      };
      RecognizerEngine2.prototype.ruleFinallyStateUpdate = function() {
        this.RULE_STACK.pop();
        this.RULE_OCCURRENCE_STACK.pop();
        this.cstFinallyStateUpdate();
        if (this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
          var firstRedundantTok = this.LA(1);
          var errMsg = this.errorMessageProvider.buildNotAllInputParsedMessage({
            firstRedundant: firstRedundantTok,
            ruleName: this.getCurrRuleFullName()
          });
          this.SAVE_ERROR(new exceptions_public_1.NotAllInputParsedException(errMsg, firstRedundantTok));
        }
      };
      RecognizerEngine2.prototype.subruleInternal = function(ruleToCall, idx, options) {
        var ruleResult;
        try {
          var args = options !== void 0 ? options.ARGS : void 0;
          ruleResult = ruleToCall.call(this, idx, args);
          this.cstPostNonTerminal(ruleResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleToCall.ruleName);
          return ruleResult;
        } catch (e) {
          this.subruleInternalError(e, options, ruleToCall.ruleName);
        }
      };
      RecognizerEngine2.prototype.subruleInternalError = function(e, options, ruleName) {
        if (exceptions_public_1.isRecognitionException(e) && e.partialCstResult !== void 0) {
          this.cstPostNonTerminal(e.partialCstResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleName);
          delete e.partialCstResult;
        }
        throw e;
      };
      RecognizerEngine2.prototype.consumeInternal = function(tokType, idx, options) {
        var consumedToken;
        try {
          var nextToken = this.LA(1);
          if (this.tokenMatcher(nextToken, tokType) === true) {
            this.consumeToken();
            consumedToken = nextToken;
          } else {
            this.consumeInternalError(tokType, nextToken, options);
          }
        } catch (eFromConsumption) {
          consumedToken = this.consumeInternalRecovery(tokType, idx, eFromConsumption);
        }
        this.cstPostTerminal(options !== void 0 && options.LABEL !== void 0 ? options.LABEL : tokType.name, consumedToken);
        return consumedToken;
      };
      RecognizerEngine2.prototype.consumeInternalError = function(tokType, nextToken, options) {
        var msg;
        var previousToken = this.LA(0);
        if (options !== void 0 && options.ERR_MSG) {
          msg = options.ERR_MSG;
        } else {
          msg = this.errorMessageProvider.buildMismatchTokenMessage({
            expected: tokType,
            actual: nextToken,
            previous: previousToken,
            ruleName: this.getCurrRuleFullName()
          });
        }
        throw this.SAVE_ERROR(new exceptions_public_1.MismatchedTokenException(msg, nextToken, previousToken));
      };
      RecognizerEngine2.prototype.consumeInternalRecovery = function(tokType, idx, eFromConsumption) {
        if (this.recoveryEnabled && eFromConsumption.name === "MismatchedTokenException" && !this.isBackTracking()) {
          var follows = this.getFollowsForInRuleRecovery(tokType, idx);
          try {
            return this.tryInRuleRecovery(tokType, follows);
          } catch (eFromInRuleRecovery) {
            if (eFromInRuleRecovery.name === recoverable_1.IN_RULE_RECOVERY_EXCEPTION) {
              throw eFromConsumption;
            } else {
              throw eFromInRuleRecovery;
            }
          }
        } else {
          throw eFromConsumption;
        }
      };
      RecognizerEngine2.prototype.saveRecogState = function() {
        var savedErrors = this.errors;
        var savedRuleStack = utils_1.cloneArr(this.RULE_STACK);
        return {
          errors: savedErrors,
          lexerState: this.exportLexerState(),
          RULE_STACK: savedRuleStack,
          CST_STACK: this.CST_STACK
        };
      };
      RecognizerEngine2.prototype.reloadRecogState = function(newState) {
        this.errors = newState.errors;
        this.importLexerState(newState.lexerState);
        this.RULE_STACK = newState.RULE_STACK;
      };
      RecognizerEngine2.prototype.ruleInvocationStateUpdate = function(shortName, fullName, idxInCallingRule) {
        this.RULE_OCCURRENCE_STACK.push(idxInCallingRule);
        this.RULE_STACK.push(shortName);
        this.cstInvocationStateUpdate(fullName, shortName);
      };
      RecognizerEngine2.prototype.isBackTracking = function() {
        return this.isBackTrackingStack.length !== 0;
      };
      RecognizerEngine2.prototype.getCurrRuleFullName = function() {
        var shortName = this.getLastExplicitRuleShortName();
        return this.shortRuleNameToFull[shortName];
      };
      RecognizerEngine2.prototype.shortRuleNameToFullName = function(shortName) {
        return this.shortRuleNameToFull[shortName];
      };
      RecognizerEngine2.prototype.isAtEndOfInput = function() {
        return this.tokenMatcher(this.LA(1), tokens_public_1.EOF);
      };
      RecognizerEngine2.prototype.reset = function() {
        this.resetLexerState();
        this.isBackTrackingStack = [];
        this.errors = [];
        this.RULE_STACK = [];
        this.CST_STACK = [];
        this.RULE_OCCURRENCE_STACK = [];
      };
      return RecognizerEngine2;
    }();
    exports2.RecognizerEngine = RecognizerEngine;
  }
});

// lib/src/parse/parser/traits/error_handler.js
var require_error_handler = __commonJS({
  "lib/src/parse/parser/traits/error_handler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ErrorHandler = void 0;
    var exceptions_public_1 = require_exceptions_public();
    var utils_1 = require_api();
    var lookahead_1 = require_lookahead();
    var parser_1 = require_parser();
    var ErrorHandler = function() {
      function ErrorHandler2() {
      }
      ErrorHandler2.prototype.initErrorHandler = function(config) {
        this._errors = [];
        this.errorMessageProvider = utils_1.has(config, "errorMessageProvider") ? config.errorMessageProvider : parser_1.DEFAULT_PARSER_CONFIG.errorMessageProvider;
      };
      ErrorHandler2.prototype.SAVE_ERROR = function(error) {
        if (exceptions_public_1.isRecognitionException(error)) {
          error.context = {
            ruleStack: this.getHumanReadableRuleStack(),
            ruleOccurrenceStack: utils_1.cloneArr(this.RULE_OCCURRENCE_STACK)
          };
          this._errors.push(error);
          return error;
        } else {
          throw Error("Trying to save an Error which is not a RecognitionException");
        }
      };
      Object.defineProperty(ErrorHandler2.prototype, "errors", {
        get: function() {
          return utils_1.cloneArr(this._errors);
        },
        set: function(newErrors) {
          this._errors = newErrors;
        },
        enumerable: false,
        configurable: true
      });
      ErrorHandler2.prototype.raiseEarlyExitException = function(occurrence, prodType, userDefinedErrMsg) {
        var ruleName = this.getCurrRuleFullName();
        var ruleGrammar = this.getGAstProductions()[ruleName];
        var lookAheadPathsPerAlternative = lookahead_1.getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, this.maxLookahead);
        var insideProdPaths = lookAheadPathsPerAlternative[0];
        var actualTokens = [];
        for (var i = 1; i <= this.maxLookahead; i++) {
          actualTokens.push(this.LA(i));
        }
        var msg = this.errorMessageProvider.buildEarlyExitMessage({
          expectedIterationPaths: insideProdPaths,
          actual: actualTokens,
          previous: this.LA(0),
          customUserDescription: userDefinedErrMsg,
          ruleName
        });
        throw this.SAVE_ERROR(new exceptions_public_1.EarlyExitException(msg, this.LA(1), this.LA(0)));
      };
      ErrorHandler2.prototype.raiseNoAltException = function(occurrence, errMsgTypes) {
        var ruleName = this.getCurrRuleFullName();
        var ruleGrammar = this.getGAstProductions()[ruleName];
        var lookAheadPathsPerAlternative = lookahead_1.getLookaheadPathsForOr(occurrence, ruleGrammar, this.maxLookahead);
        var actualTokens = [];
        for (var i = 1; i <= this.maxLookahead; i++) {
          actualTokens.push(this.LA(i));
        }
        var previousToken = this.LA(0);
        var errMsg = this.errorMessageProvider.buildNoViableAltMessage({
          expectedPathsPerAlt: lookAheadPathsPerAlternative,
          actual: actualTokens,
          previous: previousToken,
          customUserDescription: errMsgTypes,
          ruleName: this.getCurrRuleFullName()
        });
        throw this.SAVE_ERROR(new exceptions_public_1.NoViableAltException(errMsg, this.LA(1), previousToken));
      };
      return ErrorHandler2;
    }();
    exports2.ErrorHandler = ErrorHandler;
  }
});

// lib/src/parse/parser/traits/context_assist.js
var require_context_assist = __commonJS({
  "lib/src/parse/parser/traits/context_assist.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ContentAssist = void 0;
    var interpreter_1 = require_interpreter();
    var utils_1 = require_api();
    var ContentAssist = function() {
      function ContentAssist2() {
      }
      ContentAssist2.prototype.initContentAssist = function() {
      };
      ContentAssist2.prototype.computeContentAssist = function(startRuleName, precedingInput) {
        var startRuleGast = this.gastProductionsCache[startRuleName];
        if (utils_1.isUndefined(startRuleGast)) {
          throw Error("Rule ->" + startRuleName + "<- does not exist in this grammar.");
        }
        return interpreter_1.nextPossibleTokensAfter([startRuleGast], precedingInput, this.tokenMatcher, this.maxLookahead);
      };
      ContentAssist2.prototype.getNextPossibleTokenTypes = function(grammarPath) {
        var topRuleName = utils_1.first(grammarPath.ruleStack);
        var gastProductions = this.getGAstProductions();
        var topProduction = gastProductions[topRuleName];
        var nextPossibleTokenTypes = new interpreter_1.NextAfterTokenWalker(topProduction, grammarPath).startWalking();
        return nextPossibleTokenTypes;
      };
      return ContentAssist2;
    }();
    exports2.ContentAssist = ContentAssist;
  }
});

// lib/src/parse/parser/traits/gast_recorder.js
var require_gast_recorder = __commonJS({
  "lib/src/parse/parser/traits/gast_recorder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GastRecorder = void 0;
    var utils_1 = require_api();
    var gast_public_1 = require_gast_public();
    var lexer_public_1 = require_lexer_public();
    var tokens_1 = require_tokens();
    var tokens_public_1 = require_tokens_public();
    var parser_1 = require_parser();
    var keys_1 = require_keys();
    var RECORDING_NULL_OBJECT = {
      description: "This Object indicates the Parser is during Recording Phase"
    };
    Object.freeze(RECORDING_NULL_OBJECT);
    var HANDLE_SEPARATOR = true;
    var MAX_METHOD_IDX = Math.pow(2, keys_1.BITS_FOR_OCCURRENCE_IDX) - 1;
    var RFT = tokens_public_1.createToken({ name: "RECORDING_PHASE_TOKEN", pattern: lexer_public_1.Lexer.NA });
    tokens_1.augmentTokenTypes([RFT]);
    var RECORDING_PHASE_TOKEN = tokens_public_1.createTokenInstance(RFT, "This IToken indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details", -1, -1, -1, -1, -1, -1);
    Object.freeze(RECORDING_PHASE_TOKEN);
    var RECORDING_PHASE_CSTNODE = {
      name: "This CSTNode indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details",
      children: {}
    };
    var GastRecorder = function() {
      function GastRecorder2() {
      }
      GastRecorder2.prototype.initGastRecorder = function(config) {
        this.recordingProdStack = [];
        this.RECORDING_PHASE = false;
      };
      GastRecorder2.prototype.enableRecording = function() {
        var _this = this;
        this.RECORDING_PHASE = true;
        this.TRACE_INIT("Enable Recording", function() {
          var _loop_1 = function(i2) {
            var idx = i2 > 0 ? i2 : "";
            _this["CONSUME" + idx] = function(arg1, arg2) {
              return this.consumeInternalRecord(arg1, i2, arg2);
            };
            _this["SUBRULE" + idx] = function(arg1, arg2) {
              return this.subruleInternalRecord(arg1, i2, arg2);
            };
            _this["OPTION" + idx] = function(arg1) {
              return this.optionInternalRecord(arg1, i2);
            };
            _this["OR" + idx] = function(arg1) {
              return this.orInternalRecord(arg1, i2);
            };
            _this["MANY" + idx] = function(arg1) {
              this.manyInternalRecord(i2, arg1);
            };
            _this["MANY_SEP" + idx] = function(arg1) {
              this.manySepFirstInternalRecord(i2, arg1);
            };
            _this["AT_LEAST_ONE" + idx] = function(arg1) {
              this.atLeastOneInternalRecord(i2, arg1);
            };
            _this["AT_LEAST_ONE_SEP" + idx] = function(arg1) {
              this.atLeastOneSepFirstInternalRecord(i2, arg1);
            };
          };
          for (var i = 0; i < 10; i++) {
            _loop_1(i);
          }
          _this["consume"] = function(idx, arg1, arg2) {
            return this.consumeInternalRecord(arg1, idx, arg2);
          };
          _this["subrule"] = function(idx, arg1, arg2) {
            return this.subruleInternalRecord(arg1, idx, arg2);
          };
          _this["option"] = function(idx, arg1) {
            return this.optionInternalRecord(arg1, idx);
          };
          _this["or"] = function(idx, arg1) {
            return this.orInternalRecord(arg1, idx);
          };
          _this["many"] = function(idx, arg1) {
            this.manyInternalRecord(idx, arg1);
          };
          _this["atLeastOne"] = function(idx, arg1) {
            this.atLeastOneInternalRecord(idx, arg1);
          };
          _this.ACTION = _this.ACTION_RECORD;
          _this.BACKTRACK = _this.BACKTRACK_RECORD;
          _this.LA = _this.LA_RECORD;
        });
      };
      GastRecorder2.prototype.disableRecording = function() {
        var _this = this;
        this.RECORDING_PHASE = false;
        this.TRACE_INIT("Deleting Recording methods", function() {
          for (var i = 0; i < 10; i++) {
            var idx = i > 0 ? i : "";
            delete _this["CONSUME" + idx];
            delete _this["SUBRULE" + idx];
            delete _this["OPTION" + idx];
            delete _this["OR" + idx];
            delete _this["MANY" + idx];
            delete _this["MANY_SEP" + idx];
            delete _this["AT_LEAST_ONE" + idx];
            delete _this["AT_LEAST_ONE_SEP" + idx];
          }
          delete _this["consume"];
          delete _this["subrule"];
          delete _this["option"];
          delete _this["or"];
          delete _this["many"];
          delete _this["atLeastOne"];
          delete _this.ACTION;
          delete _this.BACKTRACK;
          delete _this.LA;
        });
      };
      GastRecorder2.prototype.ACTION_RECORD = function(impl) {
        return;
      };
      GastRecorder2.prototype.BACKTRACK_RECORD = function(grammarRule, args) {
        return function() {
          return true;
        };
      };
      GastRecorder2.prototype.LA_RECORD = function(howMuch) {
        return parser_1.END_OF_FILE;
      };
      GastRecorder2.prototype.topLevelRuleRecord = function(name, def) {
        try {
          var newTopLevelRule = new gast_public_1.Rule({ definition: [], name });
          newTopLevelRule.name = name;
          this.recordingProdStack.push(newTopLevelRule);
          def.call(this);
          this.recordingProdStack.pop();
          return newTopLevelRule;
        } catch (originalError) {
          if (originalError.KNOWN_RECORDER_ERROR !== true) {
            try {
              originalError.message = originalError.message + '\n	 This error was thrown during the "grammar recording phase" For more info see:\n	https://chevrotain.io/docs/guide/internals.html#grammar-recording';
            } catch (mutabilityError) {
              throw originalError;
            }
          }
          throw originalError;
        }
      };
      GastRecorder2.prototype.optionInternalRecord = function(actionORMethodDef, occurrence) {
        return recordProd.call(this, gast_public_1.Option, actionORMethodDef, occurrence);
      };
      GastRecorder2.prototype.atLeastOneInternalRecord = function(occurrence, actionORMethodDef) {
        recordProd.call(this, gast_public_1.RepetitionMandatory, actionORMethodDef, occurrence);
      };
      GastRecorder2.prototype.atLeastOneSepFirstInternalRecord = function(occurrence, options) {
        recordProd.call(this, gast_public_1.RepetitionMandatoryWithSeparator, options, occurrence, HANDLE_SEPARATOR);
      };
      GastRecorder2.prototype.manyInternalRecord = function(occurrence, actionORMethodDef) {
        recordProd.call(this, gast_public_1.Repetition, actionORMethodDef, occurrence);
      };
      GastRecorder2.prototype.manySepFirstInternalRecord = function(occurrence, options) {
        recordProd.call(this, gast_public_1.RepetitionWithSeparator, options, occurrence, HANDLE_SEPARATOR);
      };
      GastRecorder2.prototype.orInternalRecord = function(altsOrOpts, occurrence) {
        return recordOrProd.call(this, altsOrOpts, occurrence);
      };
      GastRecorder2.prototype.subruleInternalRecord = function(ruleToCall, occurrence, options) {
        assertMethodIdxIsValid(occurrence);
        if (!ruleToCall || utils_1.has(ruleToCall, "ruleName") === false) {
          var error = new Error("<SUBRULE" + getIdxSuffix(occurrence) + "> argument is invalid" + (" expecting a Parser method reference but got: <" + JSON.stringify(ruleToCall) + ">") + ("\n inside top level rule: <" + this.recordingProdStack[0].name + ">"));
          error.KNOWN_RECORDER_ERROR = true;
          throw error;
        }
        var prevProd = utils_1.peek(this.recordingProdStack);
        var ruleName = ruleToCall["ruleName"];
        var newNoneTerminal = new gast_public_1.NonTerminal({
          idx: occurrence,
          nonTerminalName: ruleName,
          label: options === null || options === void 0 ? void 0 : options.LABEL,
          referencedRule: void 0
        });
        prevProd.definition.push(newNoneTerminal);
        return this.outputCst ? RECORDING_PHASE_CSTNODE : RECORDING_NULL_OBJECT;
      };
      GastRecorder2.prototype.consumeInternalRecord = function(tokType, occurrence, options) {
        assertMethodIdxIsValid(occurrence);
        if (!tokens_1.hasShortKeyProperty(tokType)) {
          var error = new Error("<CONSUME" + getIdxSuffix(occurrence) + "> argument is invalid" + (" expecting a TokenType reference but got: <" + JSON.stringify(tokType) + ">") + ("\n inside top level rule: <" + this.recordingProdStack[0].name + ">"));
          error.KNOWN_RECORDER_ERROR = true;
          throw error;
        }
        var prevProd = utils_1.peek(this.recordingProdStack);
        var newNoneTerminal = new gast_public_1.Terminal({
          idx: occurrence,
          terminalType: tokType,
          label: options === null || options === void 0 ? void 0 : options.LABEL
        });
        prevProd.definition.push(newNoneTerminal);
        return RECORDING_PHASE_TOKEN;
      };
      return GastRecorder2;
    }();
    exports2.GastRecorder = GastRecorder;
    function recordProd(prodConstructor, mainProdArg, occurrence, handleSep) {
      if (handleSep === void 0) {
        handleSep = false;
      }
      assertMethodIdxIsValid(occurrence);
      var prevProd = utils_1.peek(this.recordingProdStack);
      var grammarAction = utils_1.isFunction(mainProdArg) ? mainProdArg : mainProdArg.DEF;
      var newProd = new prodConstructor({ definition: [], idx: occurrence });
      if (handleSep) {
        newProd.separator = mainProdArg.SEP;
      }
      if (utils_1.has(mainProdArg, "MAX_LOOKAHEAD")) {
        newProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
      }
      this.recordingProdStack.push(newProd);
      grammarAction.call(this);
      prevProd.definition.push(newProd);
      this.recordingProdStack.pop();
      return RECORDING_NULL_OBJECT;
    }
    function recordOrProd(mainProdArg, occurrence) {
      var _this = this;
      assertMethodIdxIsValid(occurrence);
      var prevProd = utils_1.peek(this.recordingProdStack);
      var hasOptions = utils_1.isArray(mainProdArg) === false;
      var alts = hasOptions === false ? mainProdArg : mainProdArg.DEF;
      var newOrProd = new gast_public_1.Alternation({
        definition: [],
        idx: occurrence,
        ignoreAmbiguities: hasOptions && mainProdArg.IGNORE_AMBIGUITIES === true
      });
      if (utils_1.has(mainProdArg, "MAX_LOOKAHEAD")) {
        newOrProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
      }
      var hasPredicates = utils_1.some(alts, function(currAlt) {
        return utils_1.isFunction(currAlt.GATE);
      });
      newOrProd.hasPredicates = hasPredicates;
      prevProd.definition.push(newOrProd);
      utils_1.forEach(alts, function(currAlt) {
        var currAltFlat = new gast_public_1.Alternative({ definition: [] });
        newOrProd.definition.push(currAltFlat);
        if (utils_1.has(currAlt, "IGNORE_AMBIGUITIES")) {
          currAltFlat.ignoreAmbiguities = currAlt.IGNORE_AMBIGUITIES;
        } else if (utils_1.has(currAlt, "GATE")) {
          currAltFlat.ignoreAmbiguities = true;
        }
        _this.recordingProdStack.push(currAltFlat);
        currAlt.ALT.call(_this);
        _this.recordingProdStack.pop();
      });
      return RECORDING_NULL_OBJECT;
    }
    function getIdxSuffix(idx) {
      return idx === 0 ? "" : "" + idx;
    }
    function assertMethodIdxIsValid(idx) {
      if (idx < 0 || idx > MAX_METHOD_IDX) {
        var error = new Error("Invalid DSL Method idx value: <" + idx + ">\n	" + ("Idx value must be a none negative value smaller than " + (MAX_METHOD_IDX + 1)));
        error.KNOWN_RECORDER_ERROR = true;
        throw error;
      }
    }
  }
});

// lib/src/parse/parser/traits/perf_tracer.js
var require_perf_tracer = __commonJS({
  "lib/src/parse/parser/traits/perf_tracer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PerformanceTracer = void 0;
    var utils_1 = require_api();
    var parser_1 = require_parser();
    var PerformanceTracer = function() {
      function PerformanceTracer2() {
      }
      PerformanceTracer2.prototype.initPerformanceTracer = function(config) {
        if (utils_1.has(config, "traceInitPerf")) {
          var userTraceInitPerf = config.traceInitPerf;
          var traceIsNumber = typeof userTraceInitPerf === "number";
          this.traceInitMaxIdent = traceIsNumber ? userTraceInitPerf : Infinity;
          this.traceInitPerf = traceIsNumber ? userTraceInitPerf > 0 : userTraceInitPerf;
        } else {
          this.traceInitMaxIdent = 0;
          this.traceInitPerf = parser_1.DEFAULT_PARSER_CONFIG.traceInitPerf;
        }
        this.traceInitIndent = -1;
      };
      PerformanceTracer2.prototype.TRACE_INIT = function(phaseDesc, phaseImpl) {
        if (this.traceInitPerf === true) {
          this.traceInitIndent++;
          var indent = new Array(this.traceInitIndent + 1).join("	");
          if (this.traceInitIndent < this.traceInitMaxIdent) {
            console.log(indent + "--> <" + phaseDesc + ">");
          }
          var _a = utils_1.timer(phaseImpl), time = _a.time, value = _a.value;
          var traceMethod = time > 10 ? console.warn : console.log;
          if (this.traceInitIndent < this.traceInitMaxIdent) {
            traceMethod(indent + "<-- <" + phaseDesc + "> time: " + time + "ms");
          }
          this.traceInitIndent--;
          return value;
        } else {
          return phaseImpl();
        }
      };
      return PerformanceTracer2;
    }();
    exports2.PerformanceTracer = PerformanceTracer;
  }
});

// lib/src/parse/parser/utils/apply_mixins.js
var require_apply_mixins = __commonJS({
  "lib/src/parse/parser/utils/apply_mixins.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.applyMixins = void 0;
    function applyMixins(derivedCtor, baseCtors) {
      baseCtors.forEach(function(baseCtor) {
        var baseProto = baseCtor.prototype;
        Object.getOwnPropertyNames(baseProto).forEach(function(propName) {
          if (propName === "constructor") {
            return;
          }
          var basePropDescriptor = Object.getOwnPropertyDescriptor(baseProto, propName);
          if (basePropDescriptor && (basePropDescriptor.get || basePropDescriptor.set)) {
            Object.defineProperty(derivedCtor.prototype, propName, basePropDescriptor);
          } else {
            derivedCtor.prototype[propName] = baseCtor.prototype[propName];
          }
        });
      });
    }
    exports2.applyMixins = applyMixins;
  }
});

// lib/src/parse/parser/parser.js
var require_parser = __commonJS({
  "lib/src/parse/parser/parser.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EmbeddedActionsParser = exports2.CstParser = exports2.Parser = exports2.EMPTY_ALT = exports2.ParserDefinitionErrorType = exports2.DEFAULT_RULE_CONFIG = exports2.DEFAULT_PARSER_CONFIG = exports2.END_OF_FILE = void 0;
    var utils_1 = require_api();
    var follow_1 = require_follow();
    var tokens_public_1 = require_tokens_public();
    var errors_public_1 = require_errors_public();
    var gast_resolver_public_1 = require_gast_resolver_public();
    var recoverable_1 = require_recoverable();
    var looksahead_1 = require_looksahead();
    var tree_builder_1 = require_tree_builder();
    var lexer_adapter_1 = require_lexer_adapter();
    var recognizer_api_1 = require_recognizer_api();
    var recognizer_engine_1 = require_recognizer_engine();
    var error_handler_1 = require_error_handler();
    var context_assist_1 = require_context_assist();
    var gast_recorder_1 = require_gast_recorder();
    var perf_tracer_1 = require_perf_tracer();
    var apply_mixins_1 = require_apply_mixins();
    exports2.END_OF_FILE = tokens_public_1.createTokenInstance(tokens_public_1.EOF, "", NaN, NaN, NaN, NaN, NaN, NaN);
    Object.freeze(exports2.END_OF_FILE);
    exports2.DEFAULT_PARSER_CONFIG = Object.freeze({
      recoveryEnabled: false,
      maxLookahead: 3,
      dynamicTokensEnabled: false,
      outputCst: true,
      errorMessageProvider: errors_public_1.defaultParserErrorProvider,
      nodeLocationTracking: "none",
      traceInitPerf: false,
      skipValidations: false
    });
    exports2.DEFAULT_RULE_CONFIG = Object.freeze({
      recoveryValueFunc: function() {
        return void 0;
      },
      resyncEnabled: true
    });
    var ParserDefinitionErrorType;
    (function(ParserDefinitionErrorType2) {
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_RULE_NAME"] = 0] = "INVALID_RULE_NAME";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["DUPLICATE_RULE_NAME"] = 1] = "DUPLICATE_RULE_NAME";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_RULE_OVERRIDE"] = 2] = "INVALID_RULE_OVERRIDE";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["DUPLICATE_PRODUCTIONS"] = 3] = "DUPLICATE_PRODUCTIONS";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["UNRESOLVED_SUBRULE_REF"] = 4] = "UNRESOLVED_SUBRULE_REF";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["LEFT_RECURSION"] = 5] = "LEFT_RECURSION";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["NONE_LAST_EMPTY_ALT"] = 6] = "NONE_LAST_EMPTY_ALT";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["AMBIGUOUS_ALTS"] = 7] = "AMBIGUOUS_ALTS";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["CONFLICT_TOKENS_RULES_NAMESPACE"] = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["INVALID_TOKEN_NAME"] = 9] = "INVALID_TOKEN_NAME";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["NO_NON_EMPTY_LOOKAHEAD"] = 10] = "NO_NON_EMPTY_LOOKAHEAD";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["AMBIGUOUS_PREFIX_ALTS"] = 11] = "AMBIGUOUS_PREFIX_ALTS";
      ParserDefinitionErrorType2[ParserDefinitionErrorType2["TOO_MANY_ALTS"] = 12] = "TOO_MANY_ALTS";
    })(ParserDefinitionErrorType = exports2.ParserDefinitionErrorType || (exports2.ParserDefinitionErrorType = {}));
    function EMPTY_ALT(value) {
      if (value === void 0) {
        value = void 0;
      }
      return function() {
        return value;
      };
    }
    exports2.EMPTY_ALT = EMPTY_ALT;
    var Parser = function() {
      function Parser2(tokenVocabulary, config) {
        this.definitionErrors = [];
        this.selfAnalysisDone = false;
        var that = this;
        that.initErrorHandler(config);
        that.initLexerAdapter();
        that.initLooksAhead(config);
        that.initRecognizerEngine(tokenVocabulary, config);
        that.initRecoverable(config);
        that.initTreeBuilder(config);
        that.initContentAssist();
        that.initGastRecorder(config);
        that.initPerformanceTracer(config);
        if (utils_1.has(config, "ignoredIssues")) {
          throw new Error("The <ignoredIssues> IParserConfig property has been deprecated.\n	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n	For further details.");
        }
        this.skipValidations = utils_1.has(config, "skipValidations") ? config.skipValidations : exports2.DEFAULT_PARSER_CONFIG.skipValidations;
      }
      Parser2.performSelfAnalysis = function(parserInstance) {
        throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
      };
      Parser2.prototype.performSelfAnalysis = function() {
        var _this = this;
        this.TRACE_INIT("performSelfAnalysis", function() {
          var defErrorsMsgs;
          _this.selfAnalysisDone = true;
          var className = _this.className;
          _this.TRACE_INIT("toFastProps", function() {
            utils_1.toFastProperties(_this);
          });
          _this.TRACE_INIT("Grammar Recording", function() {
            try {
              _this.enableRecording();
              utils_1.forEach(_this.definedRulesNames, function(currRuleName) {
                var wrappedRule = _this[currRuleName];
                var originalGrammarAction = wrappedRule["originalGrammarAction"];
                var recordedRuleGast = void 0;
                _this.TRACE_INIT(currRuleName + " Rule", function() {
                  recordedRuleGast = _this.topLevelRuleRecord(currRuleName, originalGrammarAction);
                });
                _this.gastProductionsCache[currRuleName] = recordedRuleGast;
              });
            } finally {
              _this.disableRecording();
            }
          });
          var resolverErrors = [];
          _this.TRACE_INIT("Grammar Resolving", function() {
            resolverErrors = gast_resolver_public_1.resolveGrammar({
              rules: utils_1.values(_this.gastProductionsCache)
            });
            _this.definitionErrors = _this.definitionErrors.concat(resolverErrors);
          });
          _this.TRACE_INIT("Grammar Validations", function() {
            if (utils_1.isEmpty(resolverErrors) && _this.skipValidations === false) {
              var validationErrors = gast_resolver_public_1.validateGrammar({
                rules: utils_1.values(_this.gastProductionsCache),
                maxLookahead: _this.maxLookahead,
                tokenTypes: utils_1.values(_this.tokensMap),
                errMsgProvider: errors_public_1.defaultGrammarValidatorErrorProvider,
                grammarName: className
              });
              _this.definitionErrors = _this.definitionErrors.concat(validationErrors);
            }
          });
          if (utils_1.isEmpty(_this.definitionErrors)) {
            if (_this.recoveryEnabled) {
              _this.TRACE_INIT("computeAllProdsFollows", function() {
                var allFollows = follow_1.computeAllProdsFollows(utils_1.values(_this.gastProductionsCache));
                _this.resyncFollows = allFollows;
              });
            }
            _this.TRACE_INIT("ComputeLookaheadFunctions", function() {
              _this.preComputeLookaheadFunctions(utils_1.values(_this.gastProductionsCache));
            });
          }
          if (!Parser2.DEFER_DEFINITION_ERRORS_HANDLING && !utils_1.isEmpty(_this.definitionErrors)) {
            defErrorsMsgs = utils_1.map(_this.definitionErrors, function(defError) {
              return defError.message;
            });
            throw new Error("Parser Definition Errors detected:\n " + defErrorsMsgs.join("\n-------------------------------\n"));
          }
        });
      };
      Parser2.DEFER_DEFINITION_ERRORS_HANDLING = false;
      return Parser2;
    }();
    exports2.Parser = Parser;
    apply_mixins_1.applyMixins(Parser, [
      recoverable_1.Recoverable,
      looksahead_1.LooksAhead,
      tree_builder_1.TreeBuilder,
      lexer_adapter_1.LexerAdapter,
      recognizer_engine_1.RecognizerEngine,
      recognizer_api_1.RecognizerApi,
      error_handler_1.ErrorHandler,
      context_assist_1.ContentAssist,
      gast_recorder_1.GastRecorder,
      perf_tracer_1.PerformanceTracer
    ]);
    var CstParser = function(_super) {
      __extends(CstParser2, _super);
      function CstParser2(tokenVocabulary, config) {
        if (config === void 0) {
          config = exports2.DEFAULT_PARSER_CONFIG;
        }
        var _this = this;
        var configClone = utils_1.cloneObj(config);
        configClone.outputCst = true;
        _this = _super.call(this, tokenVocabulary, configClone) || this;
        return _this;
      }
      return CstParser2;
    }(Parser);
    exports2.CstParser = CstParser;
    var EmbeddedActionsParser = function(_super) {
      __extends(EmbeddedActionsParser2, _super);
      function EmbeddedActionsParser2(tokenVocabulary, config) {
        if (config === void 0) {
          config = exports2.DEFAULT_PARSER_CONFIG;
        }
        var _this = this;
        var configClone = utils_1.cloneObj(config);
        configClone.outputCst = false;
        _this = _super.call(this, tokenVocabulary, configClone) || this;
        return _this;
      }
      return EmbeddedActionsParser2;
    }(Parser);
    exports2.EmbeddedActionsParser = EmbeddedActionsParser;
  }
});

// lib/src/diagrams/render_public.js
var require_render_public = __commonJS({
  "lib/src/diagrams/render_public.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createSyntaxDiagramsCode = void 0;
    var version_1 = require_version();
    function createSyntaxDiagramsCode(grammar, _a) {
      var _b = _a === void 0 ? {} : _a, _c = _b.resourceBase, resourceBase = _c === void 0 ? "https://unpkg.com/chevrotain@" + version_1.VERSION + "/diagrams/" : _c, _d = _b.css, css = _d === void 0 ? "https://unpkg.com/chevrotain@" + version_1.VERSION + "/diagrams/diagrams.css" : _d;
      var header = '\n<!-- This is a generated file -->\n<!DOCTYPE html>\n<meta charset="utf-8">\n<style>\n  body {\n    background-color: hsl(30, 20%, 95%)\n  }\n</style>\n\n';
      var cssHtml = "\n<link rel='stylesheet' href='" + css + "'>\n";
      var scripts = "\n<script src='" + resourceBase + "vendor/railroad-diagrams.js'><\/script>\n<script src='" + resourceBase + "src/diagrams_builder.js'><\/script>\n<script src='" + resourceBase + "src/diagrams_behavior.js'><\/script>\n<script src='" + resourceBase + "src/main.js'><\/script>\n";
      var diagramsDiv = '\n<div id="diagrams" align="center"></div>    \n';
      var serializedGrammar = "\n<script>\n    window.serializedGrammar = " + JSON.stringify(grammar, null, "  ") + ";\n<\/script>\n";
      var initLogic = '\n<script>\n    var diagramsDiv = document.getElementById("diagrams");\n    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);\n<\/script>\n';
      return header + cssHtml + scripts + diagramsDiv + serializedGrammar + initLogic;
    }
    exports2.createSyntaxDiagramsCode = createSyntaxDiagramsCode;
  }
});

// lib/src/api.js
var require_api2 = __commonJS({
  "lib/src/api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Parser = exports2.createSyntaxDiagramsCode = exports2.clearCache = exports2.GAstVisitor = exports2.serializeProduction = exports2.serializeGrammar = exports2.Terminal = exports2.Rule = exports2.RepetitionWithSeparator = exports2.RepetitionMandatoryWithSeparator = exports2.RepetitionMandatory = exports2.Repetition = exports2.Option = exports2.NonTerminal = exports2.Alternative = exports2.Alternation = exports2.defaultLexerErrorProvider = exports2.NoViableAltException = exports2.NotAllInputParsedException = exports2.MismatchedTokenException = exports2.isRecognitionException = exports2.EarlyExitException = exports2.defaultParserErrorProvider = exports2.tokenName = exports2.tokenMatcher = exports2.tokenLabel = exports2.EOF = exports2.createTokenInstance = exports2.createToken = exports2.LexerDefinitionErrorType = exports2.Lexer = exports2.EMPTY_ALT = exports2.ParserDefinitionErrorType = exports2.EmbeddedActionsParser = exports2.CstParser = exports2.VERSION = void 0;
    var version_1 = require_version();
    Object.defineProperty(exports2, "VERSION", { enumerable: true, get: function() {
      return version_1.VERSION;
    } });
    var parser_1 = require_parser();
    Object.defineProperty(exports2, "CstParser", { enumerable: true, get: function() {
      return parser_1.CstParser;
    } });
    Object.defineProperty(exports2, "EmbeddedActionsParser", { enumerable: true, get: function() {
      return parser_1.EmbeddedActionsParser;
    } });
    Object.defineProperty(exports2, "ParserDefinitionErrorType", { enumerable: true, get: function() {
      return parser_1.ParserDefinitionErrorType;
    } });
    Object.defineProperty(exports2, "EMPTY_ALT", { enumerable: true, get: function() {
      return parser_1.EMPTY_ALT;
    } });
    var lexer_public_1 = require_lexer_public();
    Object.defineProperty(exports2, "Lexer", { enumerable: true, get: function() {
      return lexer_public_1.Lexer;
    } });
    Object.defineProperty(exports2, "LexerDefinitionErrorType", { enumerable: true, get: function() {
      return lexer_public_1.LexerDefinitionErrorType;
    } });
    var tokens_public_1 = require_tokens_public();
    Object.defineProperty(exports2, "createToken", { enumerable: true, get: function() {
      return tokens_public_1.createToken;
    } });
    Object.defineProperty(exports2, "createTokenInstance", { enumerable: true, get: function() {
      return tokens_public_1.createTokenInstance;
    } });
    Object.defineProperty(exports2, "EOF", { enumerable: true, get: function() {
      return tokens_public_1.EOF;
    } });
    Object.defineProperty(exports2, "tokenLabel", { enumerable: true, get: function() {
      return tokens_public_1.tokenLabel;
    } });
    Object.defineProperty(exports2, "tokenMatcher", { enumerable: true, get: function() {
      return tokens_public_1.tokenMatcher;
    } });
    Object.defineProperty(exports2, "tokenName", { enumerable: true, get: function() {
      return tokens_public_1.tokenName;
    } });
    var errors_public_1 = require_errors_public();
    Object.defineProperty(exports2, "defaultParserErrorProvider", { enumerable: true, get: function() {
      return errors_public_1.defaultParserErrorProvider;
    } });
    var exceptions_public_1 = require_exceptions_public();
    Object.defineProperty(exports2, "EarlyExitException", { enumerable: true, get: function() {
      return exceptions_public_1.EarlyExitException;
    } });
    Object.defineProperty(exports2, "isRecognitionException", { enumerable: true, get: function() {
      return exceptions_public_1.isRecognitionException;
    } });
    Object.defineProperty(exports2, "MismatchedTokenException", { enumerable: true, get: function() {
      return exceptions_public_1.MismatchedTokenException;
    } });
    Object.defineProperty(exports2, "NotAllInputParsedException", { enumerable: true, get: function() {
      return exceptions_public_1.NotAllInputParsedException;
    } });
    Object.defineProperty(exports2, "NoViableAltException", { enumerable: true, get: function() {
      return exceptions_public_1.NoViableAltException;
    } });
    var lexer_errors_public_1 = require_lexer_errors_public();
    Object.defineProperty(exports2, "defaultLexerErrorProvider", { enumerable: true, get: function() {
      return lexer_errors_public_1.defaultLexerErrorProvider;
    } });
    var gast_public_1 = require_gast_public();
    Object.defineProperty(exports2, "Alternation", { enumerable: true, get: function() {
      return gast_public_1.Alternation;
    } });
    Object.defineProperty(exports2, "Alternative", { enumerable: true, get: function() {
      return gast_public_1.Alternative;
    } });
    Object.defineProperty(exports2, "NonTerminal", { enumerable: true, get: function() {
      return gast_public_1.NonTerminal;
    } });
    Object.defineProperty(exports2, "Option", { enumerable: true, get: function() {
      return gast_public_1.Option;
    } });
    Object.defineProperty(exports2, "Repetition", { enumerable: true, get: function() {
      return gast_public_1.Repetition;
    } });
    Object.defineProperty(exports2, "RepetitionMandatory", { enumerable: true, get: function() {
      return gast_public_1.RepetitionMandatory;
    } });
    Object.defineProperty(exports2, "RepetitionMandatoryWithSeparator", { enumerable: true, get: function() {
      return gast_public_1.RepetitionMandatoryWithSeparator;
    } });
    Object.defineProperty(exports2, "RepetitionWithSeparator", { enumerable: true, get: function() {
      return gast_public_1.RepetitionWithSeparator;
    } });
    Object.defineProperty(exports2, "Rule", { enumerable: true, get: function() {
      return gast_public_1.Rule;
    } });
    Object.defineProperty(exports2, "Terminal", { enumerable: true, get: function() {
      return gast_public_1.Terminal;
    } });
    var gast_public_2 = require_gast_public();
    Object.defineProperty(exports2, "serializeGrammar", { enumerable: true, get: function() {
      return gast_public_2.serializeGrammar;
    } });
    Object.defineProperty(exports2, "serializeProduction", { enumerable: true, get: function() {
      return gast_public_2.serializeProduction;
    } });
    var gast_visitor_public_1 = require_gast_visitor_public();
    Object.defineProperty(exports2, "GAstVisitor", { enumerable: true, get: function() {
      return gast_visitor_public_1.GAstVisitor;
    } });
    function clearCache() {
      console.warn("The clearCache function was 'soft' removed from the Chevrotain API.\n	 It performs no action other than printing this message.\n	 Please avoid using it as it will be completely removed in the future");
    }
    exports2.clearCache = clearCache;
    var render_public_1 = require_render_public();
    Object.defineProperty(exports2, "createSyntaxDiagramsCode", { enumerable: true, get: function() {
      return render_public_1.createSyntaxDiagramsCode;
    } });
    var Parser = function() {
      function Parser2() {
        throw new Error("The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	\nSee: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0");
      }
      return Parser2;
    }();
    exports2.Parser = Parser;
  }
});
export default require_api2();
//# sourceMappingURL=chevrotain.mjs.map
