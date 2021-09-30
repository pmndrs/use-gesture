import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

function createEditorInterfaceApi(makeRequest) {
  return {
    update: function update() {
      var self = this;
      var raw = self.toPlainObject();
      return makeRequest({
        entityType: 'EditorInterface',
        action: 'update',
        params: {
          spaceId: self.sys.space.sys.id,
          environmentId: self.sys.environment.sys.id,
          contentTypeId: self.sys.contentType.sys.id
        },
        payload: raw
      }).then(function (response) {
        return wrapEditorInterface(makeRequest, response);
      });
    },
    getControlForField: function getControlForField(fieldId) {
      var self = this;
      var result = (self.controls || []).filter(function (control) {
        return control.fieldId === fieldId;
      });
      return result && result.length > 0 ? result[0] : null;
    }
  };
}
/**
 * @private
 */


export function wrapEditorInterface(makeRequest, data) {
  var editorInterface = toPlainObject(copy(data));
  var editorInterfaceWithMethods = enhanceWithMethods(editorInterface, createEditorInterfaceApi(makeRequest));
  return freezeSys(editorInterfaceWithMethods);
}
/**
 * @private
 */

export var wrapEditorInterfaceCollection = wrapCollection(wrapEditorInterface);