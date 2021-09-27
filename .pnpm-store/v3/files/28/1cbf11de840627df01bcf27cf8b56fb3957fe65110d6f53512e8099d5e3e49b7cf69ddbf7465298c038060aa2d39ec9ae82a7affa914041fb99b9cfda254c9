"use strict";

exports.__esModule = true;
exports.extractModel = extractModel;
exports.removeFileExtension = removeFileExtension;
exports.stripTrailingSlash = stripTrailingSlash;
exports.extractAllCollectionSegments = extractAllCollectionSegments;
exports.extractFieldWithoutUnion = extractFieldWithoutUnion;
exports.extractField = extractField;
exports.switchToPeriodDelimiters = switchToPeriodDelimiters;
exports.convertUnionSyntaxToGraphql = convertUnionSyntaxToGraphql;
exports.compose = compose;
// Regex created with: https://spec.graphql.org/draft/#sec-Names
// First char only letter, underscore; rest letter, underscore, digit
var extractModelRegex = /\{([a-zA-Z_][\w]*)\./; // Given a absolutePath that has a collection marker it will extract the Model.
// /foo/bar/{Model.bar} => Model

function extractModel(absolutePath) {
  var model = extractModelRegex.exec(absolutePath); // This shouldn't happen - but TS requires us to validate
  // Don't throw an error here as otherwise it would be captured in the onPreInit hook and not by isValidCollectionPathImplementation()

  if (!model) {
    return "";
  }

  return model[1];
} // Remove the file extension from the end of a path


function removeFileExtension(absolutePath) {
  return absolutePath.replace(/\.[a-z]+$/, "");
} // Remove trailing slash


function stripTrailingSlash(str) {
  return str.endsWith("/") ? str.slice(0, -1) : str;
}

var curlyBracesContentsRegex = /\{.*?\}/g; // This extracts all information in an absolute path to an array of each collection part
// /foo/{Model.bar}/{Model.baz} => ['Model.bar', 'Model.baz']

function extractAllCollectionSegments(absolutePath) {
  var slugParts = absolutePath.match(curlyBracesContentsRegex); // This shouldn't happen - but TS requires us to validate

  if (!slugParts) {
    throw new Error("An error occurred building the slug parts. This is likely a bug within Gatsby and not your code. Please report it to us if you run into this.");
  }

  return slugParts;
}

var extractFieldWithoutUnionRegex = /\(.*\)__/g;
/**
 * Given a filePath part that is a collection marker it do this transformation:
 * @param {string} filePart - The individual part of the URL
 * @returns {Array<string>} - Returns an array of extracted fields (with converted "Unions")
 * @example
 * {Model.bar} => bar
 * {Model.field__bar} => field__bar
 * {Model.field__(Union)__bar} => field__bar
 */

function extractFieldWithoutUnion(filePart) {
  var extracts = extractField(filePart);
  return extracts.map(function (e) {
    return e.replace(extractFieldWithoutUnionRegex, "");
  });
}

var extractFieldRegexCurlyBraces = /[{}]/g; // Regex created with: https://spec.graphql.org/draft/#sec-Names
// First char only letter, underscore; rest letter, underscore, digit

var extractFieldGraphQLModel = /[a-zA-Z_][\w]*\./;
/**
 * Given a filePath part that is a collection marker it do this transformation:
 * @param {string} filePart - The individual part of the URL
 * @returns {Array<string>} - Returns an array of extracted fields
 * @example
 * {Model.field__(Union)__bar} => field__(Union)__bar
 * Also works with lowercased model
 * {model.field} => field
 * Also works with prefixes/postfixes (due to the regex match)
 * prefix-{model.field} => field
 */

function extractField(filePart) {
  var content = filePart.match(curlyBracesContentsRegex);

  if (!content) {
    return [""];
  }

  return content.map(function (c) {
    return c.replace(extractFieldRegexCurlyBraces, "").replace(extractFieldGraphQLModel, "");
  });
}

var switchToPeriodDelimitersRegex = /__/g; // Used to convert filePath field accessors to js syntax accessors.
// e.g.
//   foo__bar => foo.bar
// This can then be used with _.get

function switchToPeriodDelimiters(filePart) {
  // replace access by periods
  return filePart.replace(switchToPeriodDelimitersRegex, ".");
}

var convertUnionSyntaxToGraphqlRegex = /\(/g; // Converts the part of the file from something like `(Union)` to `... on Union`

function convertUnionSyntaxToGraphql(filePart) {
  return filePart.replace(convertUnionSyntaxToGraphqlRegex, "... on ").replace(/\)/g, "");
} // Compose function to chain multiple methods from this file together
// e.g.
// compose(extractFieldWithoutUnion, switchToPeriodDelimters)(`{Model.foo__bar}`)


function compose() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (filePart) {
    return functions.reduce(function (value, fn) {
      return fn(value);
    }, filePart);
  };
}