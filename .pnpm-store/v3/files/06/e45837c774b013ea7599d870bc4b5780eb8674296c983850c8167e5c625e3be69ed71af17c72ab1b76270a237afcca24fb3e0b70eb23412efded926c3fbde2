"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.isValidCollectionPathImplementation = isValidCollectionPathImplementation;

var _path = _interopRequireDefault(require("path"));

var _errorUtils = require("./error-utils");

// This file is a helper for consumers. It's going to log an error to them if they
// in any way have an incorrect filepath setup for us to predictably use collection
// querying.
//
// Without this, users will can get mystic errors.
function isValidCollectionPathImplementation(filePath, reporter) {
  var parts = filePath.split(_path.default.sep);
  var passing = false;
  var errors = 0;
  parts.forEach(function (part) {
    if (!part.includes("{") && !part.includes("}")) return;
    var model = Array.from(part.matchAll(/\{([a-zA-Z_]\w*)./g)); // Search for word before first dot, e.g. Model

    var field = Array.from(part.matchAll(/.*?((?<=\w\.)[^}]*)}/g)); // Search for everything after the first dot, e.g. foo__bar (or in invalid case: foo.bar)

    try {
      if (model.length === 0 || field.length === 0 || model.length !== field.length) {
        throw new Error(errorMessage(part));
      }

      var models = Array.from(model, function (m) {
        return m[1];
      });
      var fields = Array.from(field, function (f) {
        return f[1];
      });

      for (var _i = 0, _models = models; _i < _models.length; _i++) {
        var m = _models[_i];
        assert(m, /^[a-zA-Z_]\w*$/, errorMessage(part)); // Check that Model is https://spec.graphql.org/draft/#sec-Names
      }

      for (var _i2 = 0, _fields = fields; _i2 < _fields.length; _i2++) {
        var f = _fields[_i2];
        assert(f, /^[a-zA-Z_][\w_()]*$/, errorMessage(part)); // Check that field is foo__bar__baz (and not foo.bar.baz) + https://spec.graphql.org/draft/#sec-Names
      }
    } catch (e) {
      reporter.panicOnBuild({
        id: (0, _errorUtils.prefixId)(_errorUtils.CODES.CollectionPath),
        context: {
          sourceMessage: e.message
        },
        filePath: filePath
      });
      errors++;
    }
  });

  if (errors === 0) {
    passing = true;
  }

  return passing;
}

function errorMessage(part) {
  return "Collection page builder encountered an error parsing the filepath. To use collection paths the schema to follow is {Model.field__subfield}. The problematic part is: " + part + ".";
}

function assert(part, matches, message) {
  var regexp = matches instanceof RegExp ? matches : new RegExp(matches);

  if (!part || regexp.test(part) === false) {
    throw new Error(message);
  }
}