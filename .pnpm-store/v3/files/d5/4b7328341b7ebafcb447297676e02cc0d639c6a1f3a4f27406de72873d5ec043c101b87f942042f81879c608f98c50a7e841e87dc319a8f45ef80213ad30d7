"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var fs = require("fs-extra"), path = require("path"), prettier = require("prettier"), humanId = require("human-id");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var fs__default = _interopDefault(fs), path__default = _interopDefault(path), prettier__default = _interopDefault(prettier), humanId__default = _interopDefault(humanId);

function _defineProperty(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value: value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter((function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    }))), keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
      _defineProperty(target, key, source[key]);
    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    }));
  }
  return target;
}

async function writeChangeset(changeset, cwd) {
  const {summary: summary, releases: releases} = changeset, changesetBase = path__default.default.resolve(cwd, ".changeset"), changesetID = humanId__default.default({
    separator: "-",
    capitalize: !1
  }), prettierConfig = await prettier__default.default.resolveConfig(cwd), newChangesetPath = path__default.default.resolve(changesetBase, changesetID + ".md"), changesetContents = `---\n${releases.map((release => `"${release.name}": ${release.type}`)).join("\n")}\n---\n\n${summary}\n  `;
  return await fs__default.default.writeFile(newChangesetPath, prettier__default.default.format(changesetContents, _objectSpread2(_objectSpread2({}, prettierConfig), {}, {
    parser: "markdown"
  }))), changesetID;
}

exports.default = writeChangeset;
