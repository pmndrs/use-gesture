function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * @private
 * @param id - unique ID of the field
 * @param key - the attribute on the field to change
 * @param value - the value to set the attribute to
 */
var findAndUpdateField = function findAndUpdateField(contentType, fieldId, omitOrDelete) {
  var field = contentType.fields.find(function (field) {
    return field.id === fieldId;
  });

  if (!field) {
    return Promise.reject(new Error("Tried to omitAndDeleteField on a nonexistent field, ".concat(fieldId, ", on the content type ").concat(contentType.name, ".")));
  }

  field[omitOrDelete] = true;
  return Promise.resolve(contentType);
};

export var omitAndDeleteField = function omitAndDeleteField(makeRequest, _ref, contentType) {
  var fieldId = _ref.fieldId,
      params = _objectWithoutProperties(_ref, ["fieldId"]);

  return findAndUpdateField(contentType, fieldId, 'omitted').then(function (newContentType) {
    return makeRequest({
      entityType: 'ContentType',
      action: 'update',
      params: params,
      payload: newContentType
    });
  }).then(function (newContentType) {
    return findAndUpdateField(newContentType, fieldId, 'deleted');
  }).then(function (newContentType) {
    return makeRequest({
      entityType: 'ContentType',
      action: 'update',
      params: params,
      payload: newContentType
    });
  });
};