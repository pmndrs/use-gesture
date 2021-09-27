import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

function createLocaleApi(makeRequest) {
  var getParams = function getParams(locale) {
    return {
      spaceId: locale.sys.space.sys.id,
      environmentId: locale.sys.environment.sys.id,
      localeId: locale.sys.id
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapLocale(makeRequest, data);
      });
    },
    "delete": function _delete() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'delete',
        params: getParams(raw)
      }).then(function () {// noop
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw locale data
 * @return Wrapped locale data
 */


export function wrapLocale(makeRequest, data) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  delete data.internal_code;
  var locale = toPlainObject(copy(data));
  var localeWithMethods = enhanceWithMethods(locale, createLocaleApi(makeRequest));
  return freezeSys(localeWithMethods);
}
/**
 * @private
 */

export var wrapLocaleCollection = wrapCollection(wrapLocale);