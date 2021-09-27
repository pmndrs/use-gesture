import { ContentFields } from '../../entities/content-type-fields';
declare const INTERNAL_TO_API: {
    readonly Symbol: {
        readonly type: "Symbol";
    };
    readonly Text: {
        readonly type: "Text";
    };
    readonly RichText: {
        readonly type: "RichText";
    };
    readonly Integer: {
        readonly type: "Integer";
    };
    readonly Number: {
        readonly type: "Number";
    };
    readonly Boolean: {
        readonly type: "Boolean";
    };
    readonly Date: {
        readonly type: "Date";
    };
    readonly Location: {
        readonly type: "Location";
    };
    readonly Object: {
        readonly type: "Object";
    };
    readonly File: {
        readonly type: "File";
    };
    readonly Entry: {
        readonly type: "Link";
        readonly linkType: "Entry";
    };
    readonly Asset: {
        readonly type: "Link";
        readonly linkType: "Asset";
    };
    readonly Symbols: {
        readonly type: "Array";
        readonly items: {
            readonly type: "Symbol";
        };
    };
    readonly Entries: {
        readonly type: "Array";
        readonly items: {
            readonly type: "Link";
            readonly linkType: "Entry";
        };
    };
    readonly Assets: {
        readonly type: "Array";
        readonly items: {
            readonly type: "Link";
            readonly linkType: "Asset";
        };
    };
};
export declare const FIELD_TYPES: ("Asset" | "Entry" | "Boolean" | "Symbol" | "Number" | "Text" | "RichText" | "Integer" | "Date" | "Object" | "Location" | "File" | "Symbols" | "Entries" | "Assets")[];
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
export declare function toInternalFieldType(api: Partial<ContentFields>): "Asset" | "Entry" | "Boolean" | "Symbol" | "Number" | "Text" | "RichText" | "Integer" | "Date" | "Object" | "Location" | "File" | "Symbols" | "Entries" | "Assets" | undefined;
export declare const DEFAULTS_WIDGET: {
    Text: {
        widgetId: string;
    };
    Symbol: {
        widgetId: string;
    };
    Integer: {
        widgetId: string;
    };
    Number: {
        widgetId: string;
    };
    Boolean: {
        widgetId: string;
    };
    Date: {
        widgetId: string;
    };
    Location: {
        widgetId: string;
    };
    Object: {
        widgetId: string;
    };
    RichText: {
        widgetId: string;
    };
    Entry: {
        widgetId: string;
    };
    Asset: {
        widgetId: string;
    };
    Symbols: {
        widgetId: string;
    };
    Entries: {
        widgetId: string;
    };
    Assets: {
        widgetId: string;
    };
    File: {
        widgetId: string;
    };
};
export declare const DEFAULTS_SETTINGS: {
    readonly Boolean: {
        readonly falseLabel: "No";
        readonly helpText: null;
        readonly trueLabel: "Yes";
    };
    readonly Date: {
        readonly helpText: null;
        readonly ampm: "24";
        readonly format: "timeZ";
    };
    readonly Entry: {
        readonly helpText: null;
        readonly showCreateEntityAction: true;
        readonly showLinkEntityAction: true;
    };
    readonly Asset: {
        readonly helpText: null;
        readonly showCreateEntityAction: true;
        readonly showLinkEntityAction: true;
    };
    readonly Entries: {
        readonly helpText: null;
        readonly bulkEditing: false;
        readonly showCreateEntityAction: true;
        readonly showLinkEntityAction: true;
    };
    readonly Assets: {
        readonly helpText: null;
        readonly showCreateEntityAction: true;
        readonly showLinkEntityAction: true;
    };
};
interface DefaultWidget {
    widgetId: string;
    settings?: {
        helpText: null | string;
    };
    fieldId: string;
    widgetNamespace: 'builtin';
}
export declare function toApiFieldType(internal: keyof typeof INTERNAL_TO_API): {
    readonly type: "Symbol";
} | {
    readonly type: "Text";
} | {
    readonly type: "RichText";
} | {
    readonly type: "Integer";
} | {
    readonly type: "Number";
} | {
    readonly type: "Boolean";
} | {
    readonly type: "Date";
} | {
    readonly type: "Location";
} | {
    readonly type: "Object";
} | {
    readonly type: "File";
} | {
    readonly type: "Link";
    readonly linkType: "Entry";
} | {
    readonly type: "Link";
    readonly linkType: "Asset";
} | {
    readonly type: "Array";
    readonly items: {
        readonly type: "Symbol";
    };
} | {
    readonly type: "Array";
    readonly items: {
        readonly type: "Link";
        readonly linkType: "Entry";
    };
} | {
    readonly type: "Array";
    readonly items: {
        readonly type: "Link";
        readonly linkType: "Asset";
    };
};
export default function getDefaultControlOfField(field: ContentFields): DefaultWidget | {
    widgetId: string;
    fieldId: string;
    widgetNameSpace: string;
};
export {};
