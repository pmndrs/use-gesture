function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';
import * as checks from '../plain/checks';

function createAssetApi(makeRequest) {
  var getParams = function getParams(raw) {
    return {
      spaceId: raw.sys.space.sys.id,
      environmentId: raw.sys.environment.sys.id,
      assetId: raw.sys.id
    };
  };

  return {
    processForLocale: function processForLocale(locale, options) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'processForLocale',
        params: _objectSpread(_objectSpread({}, getParams(raw)), {}, {
          locale: locale,
          options: options,
          asset: raw
        })
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    processForAllLocales: function processForAllLocales(options) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'processForAllLocales',
        params: _objectSpread(_objectSpread({}, getParams(raw)), {}, {
          asset: raw,
          options: options
        })
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'update',
        params: getParams(raw),
        payload: raw,
        headers: {}
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    "delete": function del() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'delete',
        params: getParams(raw)
      });
    },
    publish: function publish() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'publish',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    unpublish: function unpublish() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'unpublish',
        params: getParams(raw)
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    archive: function archive() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'archive',
        params: getParams(raw)
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    unarchive: function unarchive() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'unarchive',
        params: getParams(raw)
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    isPublished: function isPublished() {
      var raw = this.toPlainObject();
      return checks.isPublished(raw);
    },
    isUpdated: function isUpdated() {
      var raw = this.toPlainObject();
      return checks.isUpdated(raw);
    },
    isDraft: function isDraft() {
      var raw = this.toPlainObject();
      return checks.isDraft(raw);
    },
    isArchived: function isArchived() {
      var raw = this.toPlainObject();
      return checks.isArchived(raw);
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw asset data
 * @return Wrapped asset data
 */


export function wrapAsset(makeRequest, data) {
  var asset = toPlainObject(copy(data));
  var assetWithMethods = enhanceWithMethods(asset, createAssetApi(makeRequest));
  return freezeSys(assetWithMethods);
}
/**
 * @private
 */

export var wrapAssetCollection = wrapCollection(wrapAsset);