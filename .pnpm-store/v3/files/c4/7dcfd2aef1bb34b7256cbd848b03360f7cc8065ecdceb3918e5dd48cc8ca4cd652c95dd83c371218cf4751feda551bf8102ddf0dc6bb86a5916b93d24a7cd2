function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import { wrapCollection } from '../common-utils';
import enhanceWithMethods from '../enhance-with-methods';

function createWebhookApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      spaceId: data.sys.space.sys.id,
      webhookDefinitionId: data.sys.id
    };
  };

  return {
    update: function update() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'update',
        params: getParams(data),
        payload: data
      }).then(function (data) {
        return wrapWebhook(makeRequest, data);
      });
    },
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'delete',
        params: getParams(data)
      });
    },
    getCalls: function getCalls() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'getManyCallDetails',
        params: getParams(data)
      });
    },
    getCall: function getCall(id) {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'getCallDetails',
        params: _objectSpread(_objectSpread({}, getParams(data)), {}, {
          callId: id
        })
      });
    },
    getHealth: function getHealth() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'getHealthStatus',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw webhook data
 * @return Wrapped webhook data
 */


export function wrapWebhook(makeRequest, data) {
  var webhook = toPlainObject(copy(data));
  var webhookWithMethods = enhanceWithMethods(webhook, createWebhookApi(makeRequest));
  return freezeSys(webhookWithMethods);
}
/**
 * @private
 */

export var wrapWebhookCollection = wrapCollection(wrapWebhook);