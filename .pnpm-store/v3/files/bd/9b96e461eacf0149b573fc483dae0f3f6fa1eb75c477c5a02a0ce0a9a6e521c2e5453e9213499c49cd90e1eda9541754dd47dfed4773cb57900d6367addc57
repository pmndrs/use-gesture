function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { in_ } from './types';
var DROPDOWN_TYPES = ['Text', 'Symbol', 'Integer', 'Number', 'Boolean'];
var INTERNAL_TO_API = {
  Symbol: {
    type: 'Symbol'
  },
  Text: {
    type: 'Text'
  },
  RichText: {
    type: 'RichText'
  },
  Integer: {
    type: 'Integer'
  },
  Number: {
    type: 'Number'
  },
  Boolean: {
    type: 'Boolean'
  },
  Date: {
    type: 'Date'
  },
  Location: {
    type: 'Location'
  },
  Object: {
    type: 'Object'
  },
  File: {
    type: 'File'
  },
  Entry: {
    type: 'Link',
    linkType: 'Entry'
  },
  Asset: {
    type: 'Link',
    linkType: 'Asset'
  },
  Symbols: {
    type: 'Array',
    items: {
      type: 'Symbol'
    }
  },
  Entries: {
    type: 'Array',
    items: {
      type: 'Link',
      linkType: 'Entry'
    }
  },
  Assets: {
    type: 'Array',
    items: {
      type: 'Link',
      linkType: 'Asset'
    }
  }
};
export var FIELD_TYPES = Object.keys(INTERNAL_TO_API);
/**
 * Returns an internal string identifier for an API field object.
 *
 * We use this string as a simplified reference to field types.
 * Possible values are:
 *
 * - Symbol
 * - Symbols
 * - Text
 * - RichText
 * - Integer
 * - Number
 * - Boolean
 * - Date
 * - Location
 * - Object
 * - Entry
 * - Entries
 * - Asset
 * - Assets
 * - File
 */

export function toInternalFieldType(api) {
  return FIELD_TYPES.find(function (key) {
    var internalApi = INTERNAL_TO_API[key];
    var stripped = {
      type: api.type,
      linkType: api.linkType,
      items: api.items
    };

    if (stripped.items) {
      stripped.items = {
        type: stripped.items.type,
        linkType: stripped.items.linkType
      };
    }

    if (internalApi.type === 'Link') {
      return internalApi.linkType === stripped.linkType;
    }

    if (internalApi.type === 'Array' && internalApi.items && stripped.items) {
      if (internalApi.items.type === 'Link') {
        return internalApi.items.linkType === stripped.items.linkType;
      }

      return internalApi.items.type === stripped.items.type;
    }

    return internalApi.type === stripped.type;
  });
}
export var DEFAULTS_WIDGET = {
  Text: {
    widgetId: 'markdown'
  },
  Symbol: {
    widgetId: 'singleLine'
  },
  Integer: {
    widgetId: 'numberEditor'
  },
  Number: {
    widgetId: 'numberEditor'
  },
  Boolean: {
    widgetId: 'boolean'
  },
  Date: {
    widgetId: 'datePicker'
  },
  Location: {
    widgetId: 'locationEditor'
  },
  Object: {
    widgetId: 'objectEditor'
  },
  RichText: {
    widgetId: 'richTextEditor'
  },
  Entry: {
    widgetId: 'entryLinkEditor'
  },
  Asset: {
    widgetId: 'assetLinkEditor'
  },
  Symbols: {
    widgetId: 'tagEditor'
  },
  Entries: {
    widgetId: 'entryLinksEditor'
  },
  Assets: {
    widgetId: 'assetLinksEditor'
  },
  File: {
    widgetId: 'fileEditor'
  }
};
export var DEFAULTS_SETTINGS = {
  Boolean: {
    falseLabel: 'No',
    helpText: null,
    trueLabel: 'Yes'
  },
  Date: {
    helpText: null,
    ampm: '24',
    format: 'timeZ'
  },
  Entry: {
    helpText: null,
    showCreateEntityAction: true,
    showLinkEntityAction: true
  },
  Asset: {
    helpText: null,
    showCreateEntityAction: true,
    showLinkEntityAction: true
  },
  Entries: {
    helpText: null,
    bulkEditing: false,
    showCreateEntityAction: true,
    showLinkEntityAction: true
  },
  Assets: {
    helpText: null,
    showCreateEntityAction: true,
    showLinkEntityAction: true
  }
};

function getDefaultWidget(field, fieldId) {
  var defaultWidget = _objectSpread(_objectSpread({}, DEFAULTS_WIDGET[field]), {}, {
    settings: {
      helpText: null
    },
    widgetNamespace: 'builtin',
    fieldId: fieldId
  });

  if (in_(field, DEFAULTS_SETTINGS)) {
    defaultWidget.settings = _objectSpread(_objectSpread({}, defaultWidget.settings), DEFAULTS_SETTINGS[field]);
  }

  return defaultWidget;
} // Given our internal identifier returns a minimal API field object.


export function toApiFieldType(internal) {
  return INTERNAL_TO_API[internal];
}
/*
 * Gets the default widget ID for a field:
 * - If a field allows predefined values then `dropdown` widget is used
 *   in the presence of the `in` validation.
 * - If a Text field is a title then the `singleLine` widget is used.
 * - Otherwise a simple type-to-editor mapping is used.
 */

export default function getDefaultControlOfField(field) {
  var fieldType = toInternalFieldType(field);

  if (!fieldType) {
    throw new Error('Invalid field type');
  }

  var hasInValidation = (field.validations || []).find(function (v) {
    return 'in' in v;
  });

  if (hasInValidation && DROPDOWN_TYPES.includes(fieldType)) {
    return {
      widgetId: 'dropdown',
      fieldId: field.id,
      widgetNameSpace: 'builtin'
    };
  }

  return getDefaultWidget(fieldType, field.id);
}