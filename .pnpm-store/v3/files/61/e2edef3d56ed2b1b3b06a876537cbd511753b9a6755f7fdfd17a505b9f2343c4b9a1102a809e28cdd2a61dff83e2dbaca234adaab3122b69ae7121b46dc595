function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import copy from 'fast-copy';
import errorHandler from '../../../error-handler';
import { getUploadHttpClient } from '../../../upload-http-client';
import * as raw from './raw';
import { create as createUpload } from './upload';
import { normalizeSelect } from './utils';
export var get = function get(http, params, rawData, headers) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId), {
    params: normalizeSelect(params.query),
    headers: _objectSpread({}, headers)
  });
};
export var getMany = function getMany(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets"), {
    params: normalizeSelect(params.query)
  });
};
export var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = copy(rawData);
  delete data.sys;
  return raw.put(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
export var del = function del(http, params) {
  return raw.del(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId));
};
export var publish = function publish(http, params, rawData) {
  var _rawData$sys$version2;

  return raw.put(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId, "/published"), null, {
    headers: {
      'X-Contentful-Version': (_rawData$sys$version2 = rawData.sys.version) !== null && _rawData$sys$version2 !== void 0 ? _rawData$sys$version2 : 0
    }
  });
};
export var unpublish = function unpublish(http, params) {
  return raw.del(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId, "/published"));
};
export var archive = function archive(http, params) {
  return raw.put(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId, "/archived"));
};
export var unarchive = function unarchive(http, params) {
  return raw.del(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId, "/archived"));
};
export var create = function create(http, params, rawData) {
  var data = copy(rawData);
  return raw.post(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets"), data);
};
export var createWithId = function createWithId(http, params, rawData) {
  var data = copy(rawData);
  return raw.put(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId), data);
};
export var createFromFiles = function createFromFiles(http, params, data) {
  var httpUpload = getUploadHttpClient(http);
  var file = data.fields.file;
  return Promise.all(Object.keys(file).map(function (locale) {
    var _file$locale = file[locale],
        contentType = _file$locale.contentType,
        fileName = _file$locale.fileName;
    return createUpload(httpUpload, params, file[locale]).then(function (upload) {
      return _defineProperty({}, locale, {
        contentType: contentType,
        fileName: fileName,
        uploadFrom: {
          sys: {
            type: 'Link',
            linkType: 'Upload',
            id: upload.sys.id
          }
        }
      });
    });
  })).then(function (uploads) {
    var file = uploads.reduce(function (fieldsData, upload) {
      return _objectSpread(_objectSpread({}, fieldsData), upload);
    }, {});

    var asset = _objectSpread(_objectSpread({}, data), {}, {
      fields: _objectSpread(_objectSpread({}, data.fields), {}, {
        file: file
      })
    });

    return create(http, params, asset);
  })["catch"](errorHandler);
};
/**
 * Asset processing
 */

var ASSET_PROCESSING_CHECK_WAIT = 3000;
var ASSET_PROCESSING_CHECK_RETRIES = 10;

function checkIfAssetHasUrl(http, params, _ref2) {
  var resolve = _ref2.resolve,
      reject = _ref2.reject,
      locale = _ref2.locale,
      _ref2$processingCheck = _ref2.processingCheckWait,
      processingCheckWait = _ref2$processingCheck === void 0 ? ASSET_PROCESSING_CHECK_WAIT : _ref2$processingCheck,
      _ref2$processingCheck2 = _ref2.processingCheckRetries,
      processingCheckRetries = _ref2$processingCheck2 === void 0 ? ASSET_PROCESSING_CHECK_RETRIES : _ref2$processingCheck2,
      _ref2$checkCount = _ref2.checkCount,
      checkCount = _ref2$checkCount === void 0 ? 0 : _ref2$checkCount;
  return get(http, params).then(function (asset) {
    if (asset.fields.file[locale].url) {
      resolve(asset);
    } else if (checkCount === processingCheckRetries) {
      var error = new Error();
      error.name = 'AssetProcessingTimeout';
      error.message = 'Asset is taking longer then expected to process.';
      reject(error);
    } else {
      checkCount++;
      setTimeout(function () {
        return checkIfAssetHasUrl(http, params, {
          resolve: resolve,
          reject: reject,
          locale: locale,
          checkCount: checkCount,
          processingCheckWait: processingCheckWait,
          processingCheckRetries: processingCheckRetries
        });
      }, processingCheckWait);
    }
  });
}

export var processForLocale = function processForLocale(http, _ref3) {
  var asset = _ref3.asset,
      locale = _ref3.locale,
      _ref3$options = _ref3.options;
  _ref3$options = _ref3$options === void 0 ? {} : _ref3$options;

  var processingCheckRetries = _ref3$options.processingCheckRetries,
      processingCheckWait = _ref3$options.processingCheckWait,
      params = _objectWithoutProperties(_ref3, ["asset", "locale", "options"]);

  return raw.put(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(asset.sys.id, "/files/").concat(locale, "/process"), null, {
    headers: {
      'X-Contentful-Version': asset.sys.version
    }
  }).then(function () {
    return new Promise(function (resolve, reject) {
      return checkIfAssetHasUrl(http, {
        spaceId: params.spaceId,
        environmentId: params.environmentId,
        assetId: asset.sys.id
      }, {
        resolve: resolve,
        reject: reject,
        locale: locale,
        processingCheckWait: processingCheckWait,
        processingCheckRetries: processingCheckRetries
      });
    });
  });
};
export var processForAllLocales = function processForAllLocales(http, _ref4) {
  var asset = _ref4.asset,
      _ref4$options = _ref4.options,
      options = _ref4$options === void 0 ? {} : _ref4$options,
      params = _objectWithoutProperties(_ref4, ["asset", "options"]);

  var locales = Object.keys(asset.fields.file || {});
  var mostUpToDateAssetVersion = asset; // Let all the locales process
  // Since they all resolve at different times,
  // we need to pick the last resolved value
  // to reflect the most recent state

  var allProcessingLocales = locales.map(function (locale) {
    return processForLocale(http, _objectSpread(_objectSpread({}, params), {}, {
      asset: asset,
      locale: locale,
      options: options
    })).then(function (result) {
      // Side effect of always setting the most up to date asset version
      // The last one to call this will be the last one that finished
      // and thus the most up to date
      mostUpToDateAssetVersion = result;
    });
  });
  return Promise.all(allProcessingLocales).then(function () {
    return mostUpToDateAssetVersion;
  });
};