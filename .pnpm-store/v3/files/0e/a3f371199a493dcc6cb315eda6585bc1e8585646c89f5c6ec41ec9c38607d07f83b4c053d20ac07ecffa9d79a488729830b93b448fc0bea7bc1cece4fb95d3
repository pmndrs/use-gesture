"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getRemoteFileExtension = getRemoteFileExtension;
exports.getRemoteFileName = getRemoteFileName;
exports.createFilePath = createFilePath;

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

/**
 * getParsedPath
 * --
 * Parses remote url to a path object
 *
 */
function getParsedPath(url) {
  return _path.default.parse(_url.default.parse(url).pathname || ``);
}
/**
 * getRemoteFileExtension
 * --
 * Parses remote url to retrieve remote file extension
 *
 */


function getRemoteFileExtension(url) {
  return getParsedPath(url).ext;
}
/**
 * getRemoteFileName
 * --
 * Parses remote url to retrieve remote file name
 *
 */


function getRemoteFileName(url) {
  return getParsedPath(url).name;
}
/**
 * createFilePath
 * --
 */


function createFilePath(directory, filename, ext) {
  return _path.default.join(directory, `${filename}${ext}`);
}