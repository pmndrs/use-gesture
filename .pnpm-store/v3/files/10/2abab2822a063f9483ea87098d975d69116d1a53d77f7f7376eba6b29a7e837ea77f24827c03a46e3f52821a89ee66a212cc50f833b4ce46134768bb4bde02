function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import { wrapCollection } from '../common-utils';
import enhanceWithMethods from '../enhance-with-methods';
import { isDraft as _isDraft, isPublished as _isPublished, isUpdated as _isUpdated } from '../plain/checks';
import { wrapEditorInterface } from './editor-interface';
import { wrapSnapshot, wrapSnapshotCollection } from './snapshot';
import { omitAndDeleteField as _omitAndDeleteField } from '../methods/content-type';

function createContentTypeApi(makeRequest) {
  var getParams = function getParams(self) {
    var contentType = self.toPlainObject();
    return {
      raw: contentType,
      params: {
        spaceId: contentType.sys.space.sys.id,
        environmentId: contentType.sys.environment.sys.id,
        contentTypeId: contentType.sys.id
      }
    };
  };

  return {
    update: function update() {
      var _getParams = getParams(this),
          raw = _getParams.raw,
          params = _getParams.params;

      return makeRequest({
        entityType: 'ContentType',
        action: 'update',
        params: params,
        payload: raw
      }).then(function (data) {
        return wrapContentType(makeRequest, data);
      });
    },
    "delete": function _delete() {
      var _getParams2 = getParams(this),
          params = _getParams2.params;

      return makeRequest({
        entityType: 'ContentType',
        action: 'delete',
        params: params
      }).then(function () {// noop
      });
    },
    publish: function publish() {
      var _getParams3 = getParams(this),
          raw = _getParams3.raw,
          params = _getParams3.params;

      return makeRequest({
        entityType: 'ContentType',
        action: 'publish',
        params: params,
        payload: raw
      }).then(function (data) {
        return wrapContentType(makeRequest, data);
      });
    },
    unpublish: function unpublish() {
      var _getParams4 = getParams(this),
          params = _getParams4.params;

      return makeRequest({
        entityType: 'ContentType',
        action: 'unpublish',
        params: params
      }).then(function (data) {
        return wrapContentType(makeRequest, data);
      });
    },
    getEditorInterface: function getEditorInterface() {
      var _getParams5 = getParams(this),
          params = _getParams5.params;

      return makeRequest({
        entityType: 'EditorInterface',
        action: 'get',
        params: params
      }).then(function (data) {
        return wrapEditorInterface(makeRequest, data);
      });
    },
    getSnapshots: function getSnapshots() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _getParams6 = getParams(this),
          params = _getParams6.params;

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForContentType',
        params: _objectSpread(_objectSpread({}, params), {}, {
          query: query
        })
      }).then(function (data) {
        return wrapSnapshotCollection(makeRequest, data);
      });
    },
    getSnapshot: function getSnapshot(snapshotId) {
      var _getParams7 = getParams(this),
          params = _getParams7.params;

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getForContentType',
        params: _objectSpread(_objectSpread({}, params), {}, {
          snapshotId: snapshotId
        })
      }).then(function (data) {
        return wrapSnapshot(makeRequest, data);
      });
    },
    isPublished: function isPublished() {
      return _isPublished(this);
    },
    isUpdated: function isUpdated() {
      return _isUpdated(this);
    },
    isDraft: function isDraft() {
      return _isDraft(this);
    },
    omitAndDeleteField: function omitAndDeleteField(fieldId) {
      var _getParams8 = getParams(this),
          raw = _getParams8.raw,
          params = _getParams8.params;

      return _omitAndDeleteField(makeRequest, _objectSpread(_objectSpread({}, params), {}, {
        fieldId: fieldId
      }), raw).then(function (data) {
        return wrapContentType(makeRequest, data);
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw content type data
 * @return Wrapped content type data
 */


export function wrapContentType(makeRequest, data) {
  var contentType = toPlainObject(copy(data));
  var contentTypeWithMethods = enhanceWithMethods(contentType, createContentTypeApi(makeRequest));
  return freezeSys(contentTypeWithMethods);
}
/**
 * @private
 */

export var wrapContentTypeCollection = wrapCollection(wrapContentType);