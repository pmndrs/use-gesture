/// <reference types="node" />
/// <reference types="json-patch" />
import { DefaultElements, MakeRequest, MetaLinkProps, MetaSysProps } from '../common-types';
export declare type ApiKeyProps = {
    sys: MetaSysProps;
    name: string;
    accessToken: string;
    environments: {
        sys: MetaLinkProps;
    }[];
    preview_api_key: {
        sys: MetaLinkProps;
    };
    description?: string;
    policies?: {
        effect: string;
        action: string;
    }[];
};
export declare type CreateApiKeyProps = Pick<ApiKeyProps, 'name' | 'environments' | 'description'>;
export interface ApiKey extends ApiKeyProps, DefaultElements<ApiKeyProps> {
    /**
     * Deletes this object on the server.
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKey(<api-key-id>))
     * .then((apiKey) => apiKey.delete())
     * .then(() => console.log('apikey deleted'))
     * .catch(console.error)
     * ```
     */
    delete(): Promise<void>;
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @return Object returned from the server with updated changes.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKey(<api-key-id>))
     * .then((apiKey) => {
     *  apiKey.name = 'New name'
     *  return apiKey.update()
     * })
     * .then(apiKey => console.log(apiKey.name))
     * .catch(console.error)
     * ```
     */
    update(): Promise<ApiKey>;
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw api key data
 */
export declare function wrapApiKey(makeRequest: MakeRequest, data: ApiKeyProps): ApiKey;
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw api key collection data
 * @return Wrapped api key collection data
 */
export declare const wrapApiKeyCollection: (makeRequest: {
    (opts: import("../common-types").MROpts<"Http", "get", false>): Promise<any>;
    (opts: import("../common-types").MROpts<"Http", "patch", false>): Promise<any>;
    (opts: import("../common-types").MROpts<"Http", "post", false>): Promise<any>;
    (opts: import("../common-types").MROpts<"Http", "put", false>): Promise<any>;
    (opts: import("../common-types").MROpts<"Http", "delete", false>): Promise<any>;
    (opts: import("../common-types").MROpts<"Http", "request", false>): Promise<any>;
    (opts: import("../common-types").MROpts<"AppBundle", "get", false>): Promise<import("./app-bundle").AppBundleProps>;
    (opts: import("../common-types").MROpts<"AppBundle", "getMany", false>): Promise<import("../common-types").CollectionProp<import("./app-bundle").AppBundleProps>>;
    (opts: import("../common-types").MROpts<"AppBundle", "delete", false>): Promise<void>;
    (opts: {
        entityType: "AppBundle";
        action: "create";
    } & {
        params: import("../common-types").GetAppDefinitionParams;
    } & {
        payload: import("./app-bundle").CreateAppBundleProps;
    }): Promise<import("./app-bundle").AppBundleProps>;
    (opts: {
        entityType: "ApiKey";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceParams & {
            apiKeyId: string;
        };
    }): Promise<ApiKeyProps>;
    (opts: {
        entityType: "ApiKey";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<ApiKeyProps>>;
    (opts: {
        entityType: "ApiKey";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceParams;
    } & {
        payload: Pick<ApiKeyProps, "description" | "name" | "environments">;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<ApiKeyProps>;
    (opts: {
        entityType: "ApiKey";
        action: "createWithId";
    } & {
        params: import("../common-types").GetSpaceParams & {
            apiKeyId: string;
        };
    } & {
        payload: Pick<ApiKeyProps, "description" | "name" | "environments">;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<ApiKeyProps>;
    (opts: {
        entityType: "ApiKey";
        action: "update";
    } & {
        params: import("../common-types").GetSpaceParams & {
            apiKeyId: string;
        };
    } & {
        payload: ApiKeyProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<ApiKeyProps>;
    (opts: {
        entityType: "ApiKey";
        action: "delete";
    } & {
        params: import("../common-types").GetSpaceParams & {
            apiKeyId: string;
        };
    }): Promise<any>;
    (opts: {
        entityType: "AppDefinition";
        action: "get";
    } & {
        params: import("../common-types").GetOrganizationParams & {
            appDefinitionId: string;
        };
    }): Promise<import("./app-definition").AppDefinitionProps>;
    (opts: {
        entityType: "AppDefinition";
        action: "getMany";
    } & {
        params: import("../common-types").GetOrganizationParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./app-definition").AppDefinitionProps>>;
    (opts: {
        entityType: "AppDefinition";
        action: "create";
    } & {
        params: import("../common-types").GetOrganizationParams;
    } & {
        payload: import("type-fest/source/simplify").Simplify<Pick<Pick<import("./app-definition").AppDefinitionProps, "name" | "src" | "locations" | "parameters">, "name" | "parameters"> & Partial<Pick<Pick<import("./app-definition").AppDefinitionProps, "name" | "src" | "locations" | "parameters">, "src" | "locations">>>;
    }): Promise<import("./app-definition").AppDefinitionProps>;
    (opts: {
        entityType: "AppDefinition";
        action: "update";
    } & {
        params: import("../common-types").GetAppDefinitionParams;
    } & {
        payload: import("./app-definition").AppDefinitionProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./app-definition").AppDefinitionProps>;
    (opts: {
        entityType: "AppDefinition";
        action: "delete";
    } & {
        params: import("../common-types").GetAppDefinitionParams;
    }): Promise<any>;
    (opts: {
        entityType: "AppInstallation";
        action: "get";
    } & {
        params: import("../common-types").GetAppInstallationParams;
    }): Promise<import("./app-installation").AppInstallationProps>;
    (opts: {
        entityType: "AppInstallation";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & import("../common-types").PaginationQueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./app-installation").AppInstallationProps>>;
    (opts: {
        entityType: "AppInstallation";
        action: "upsert";
    } & {
        params: import("../common-types").GetAppInstallationParams;
    } & {
        payload: Pick<import("./app-installation").AppInstallationProps, "parameters">;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./app-installation").AppInstallationProps>;
    (opts: {
        entityType: "AppInstallation";
        action: "delete";
    } & {
        params: import("../common-types").GetAppInstallationParams;
    }): Promise<any>;
    (opts: {
        entityType: "Asset";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./asset").AssetProps>>;
    (opts: {
        entityType: "Asset";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            assetId: string;
        } & import("../common-types").QueryParams;
    }): Promise<import("./asset").AssetProps>;
    (opts: {
        entityType: "Asset";
        action: "update";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            assetId: string;
        };
    } & {
        payload: import("./asset").AssetProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./asset").AssetProps>;
    (opts: {
        entityType: "Asset";
        action: "delete";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            assetId: string;
        };
    }): Promise<any>;
    (opts: {
        entityType: "Asset";
        action: "publish";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            assetId: string;
        };
    } & {
        payload: import("./asset").AssetProps;
    }): Promise<import("./asset").AssetProps>;
    (opts: {
        entityType: "Asset";
        action: "unpublish";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            assetId: string;
        };
    }): Promise<import("./asset").AssetProps>;
    (opts: {
        entityType: "Asset";
        action: "archive";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            assetId: string;
        };
    }): Promise<import("./asset").AssetProps>;
    (opts: {
        entityType: "Asset";
        action: "unarchive";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            assetId: string;
        };
    }): Promise<import("./asset").AssetProps>;
    (opts: {
        entityType: "Asset";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams;
    } & {
        payload: Pick<import("./asset").AssetProps, "metadata" | "fields">;
    }): Promise<import("./asset").AssetProps>;
    (opts: {
        entityType: "Asset";
        action: "createWithId";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            assetId: string;
        };
    } & {
        payload: Pick<import("./asset").AssetProps, "metadata" | "fields">;
    }): Promise<import("./asset").AssetProps>;
    (opts: {
        entityType: "Asset";
        action: "createFromFiles";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams;
    } & {
        payload: Pick<import("./asset").AssetFileProp, "fields">;
    }): Promise<import("./asset").AssetProps>;
    (opts: {
        entityType: "Asset";
        action: "processForAllLocales";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            asset: import("./asset").AssetProps;
            options?: import("./asset").AssetProcessingForLocale | undefined;
        };
    }): Promise<import("./asset").AssetProps>;
    (opts: {
        entityType: "Asset";
        action: "processForLocale";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            asset: import("./asset").AssetProps;
            locale: string;
            options?: import("./asset").AssetProcessingForLocale | undefined;
        };
    }): Promise<import("./asset").AssetProps>;
    (opts: {
        entityType: "AppUpload";
        action: "get";
    } & {
        params: import("../common-types").GetAppUploadParams;
    }): Promise<import("./app-upload").AppUploadProps>;
    (opts: {
        entityType: "AppUpload";
        action: "delete";
    } & {
        params: import("../common-types").GetAppUploadParams;
    }): Promise<void>;
    (opts: {
        entityType: "AppUpload";
        action: "create";
    } & {
        params: import("../common-types").GetOrganizationParams;
    } & {
        payload: {
            file: string | ArrayBuffer | import("stream").Stream;
        };
    }): Promise<import("./app-upload").AppUploadProps>;
    (opts: {
        entityType: "AssetKey";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams;
    } & {
        payload: import("./asset-key").CreateAssetKeyProps;
    }): Promise<import("./asset-key").AssetKeyProps>;
    (opts: {
        entityType: "BulkAction";
        action: "get";
    } & {
        params: import("../common-types").GetBulkActionParams;
    }): Promise<import("./bulk-action").BulkActionProps<any>>;
    (opts: {
        entityType: "BulkAction";
        action: "publish";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams;
    } & {
        payload: import("./bulk-action").BulkActionPublishPayload;
    }): Promise<import("./bulk-action").BulkActionProps<import("./bulk-action").BulkActionPublishPayload>>;
    (opts: {
        entityType: "BulkAction";
        action: "unpublish";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams;
    } & {
        payload: import("./bulk-action").BulkActionUnpublishPayload;
    }): Promise<import("./bulk-action").BulkActionProps<import("./bulk-action").BulkActionUnpublishPayload>>;
    (opts: {
        entityType: "BulkAction";
        action: "validate";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams;
    } & {
        payload: import("./bulk-action").BulkActionValidatePayload;
    }): Promise<import("./bulk-action").BulkActionProps<import("./bulk-action").BulkActionValidatePayload>>;
    (opts: {
        entityType: "ContentType";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            contentTypeId: string;
        } & import("../common-types").QueryParams;
    }): Promise<import("./content-type").ContentTypeProps>;
    (opts: {
        entityType: "ContentType";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./content-type").ContentTypeProps>>;
    (opts: {
        entityType: "ContentType";
        action: "update";
    } & {
        params: import("../common-types").GetContentTypeParams;
    } & {
        payload: import("./content-type").ContentTypeProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./content-type").ContentTypeProps>;
    (opts: {
        entityType: "ContentType";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams;
    } & {
        payload: import("type-fest/source/simplify").Simplify<Pick<Pick<import("./content-type").ContentTypeProps, "description" | "name" | "fields" | "displayField">, "name" | "fields"> & Partial<Pick<Pick<import("./content-type").ContentTypeProps, "description" | "name" | "fields" | "displayField">, "description" | "displayField">>>;
    }): Promise<import("./content-type").ContentTypeProps>;
    (opts: {
        entityType: "ContentType";
        action: "createWithId";
    } & {
        params: import("../common-types").GetContentTypeParams;
    } & {
        payload: import("type-fest/source/simplify").Simplify<Pick<Pick<import("./content-type").ContentTypeProps, "description" | "name" | "fields" | "displayField">, "name" | "fields"> & Partial<Pick<Pick<import("./content-type").ContentTypeProps, "description" | "name" | "fields" | "displayField">, "description" | "displayField">>>;
    }): Promise<import("./content-type").ContentTypeProps>;
    (opts: {
        entityType: "ContentType";
        action: "delete";
    } & {
        params: import("../common-types").GetContentTypeParams;
    }): Promise<any>;
    (opts: {
        entityType: "ContentType";
        action: "publish";
    } & {
        params: import("../common-types").GetContentTypeParams;
    } & {
        payload: import("./content-type").ContentTypeProps;
    }): Promise<import("./content-type").ContentTypeProps>;
    (opts: {
        entityType: "ContentType";
        action: "unpublish";
    } & {
        params: import("../common-types").GetContentTypeParams;
    }): Promise<import("./content-type").ContentTypeProps>;
    (opts: {
        entityType: "EditorInterface";
        action: "get";
    } & {
        params: import("../common-types").GetEditorInterfaceParams;
    }): Promise<import("./editor-interface").EditorInterfaceProps>;
    (opts: {
        entityType: "EditorInterface";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./editor-interface").EditorInterfaceProps>>;
    (opts: {
        entityType: "EditorInterface";
        action: "update";
    } & {
        params: import("../common-types").GetEditorInterfaceParams;
    } & {
        payload: import("./editor-interface").EditorInterfaceProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./editor-interface").EditorInterfaceProps>;
    (opts: {
        entityType: "Environment";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams;
    }): Promise<import("./environment").EnvironmentProps>;
    (opts: {
        entityType: "Environment";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceParams & import("../common-types").PaginationQueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./environment").EnvironmentProps>>;
    (opts: {
        entityType: "Environment";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceParams;
    } & {
        payload: Partial<Pick<import("./environment").EnvironmentProps, "name">>;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./environment").EnvironmentProps>;
    (opts: {
        entityType: "Environment";
        action: "createWithId";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            sourceEnvironmentId?: string | undefined;
        };
    } & {
        payload: Partial<Pick<import("./environment").EnvironmentProps, "name">>;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./environment").EnvironmentProps>;
    (opts: {
        entityType: "Environment";
        action: "update";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams;
    } & {
        payload: import("./environment").EnvironmentProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./environment").EnvironmentProps>;
    (opts: {
        entityType: "Environment";
        action: "delete";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams;
    }): Promise<any>;
    (opts: {
        entityType: "EnvironmentAlias";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceEnvAliasParams;
    }): Promise<import("./environment-alias").EnvironmentAliasProps>;
    (opts: {
        entityType: "EnvironmentAlias";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceParams & import("../common-types").PaginationQueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./environment-alias").EnvironmentAliasProps>>;
    (opts: {
        entityType: "EnvironmentAlias";
        action: "createWithId";
    } & {
        params: import("../common-types").GetSpaceEnvAliasParams;
    } & {
        payload: Pick<import("./environment-alias").EnvironmentAliasProps, "environment">;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./environment-alias").EnvironmentAliasProps>;
    (opts: {
        entityType: "EnvironmentAlias";
        action: "update";
    } & {
        params: import("../common-types").GetSpaceEnvAliasParams;
    } & {
        payload: import("./environment-alias").EnvironmentAliasProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./environment-alias").EnvironmentAliasProps>;
    (opts: {
        entityType: "EnvironmentAlias";
        action: "delete";
    } & {
        params: import("../common-types").GetSpaceEnvAliasParams;
    }): Promise<any>;
    (opts: {
        entityType: "Entry";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./entry").EntryProps<any>>>;
    (opts: {
        entityType: "Entry";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            entryId: string;
        } & import("../common-types").QueryParams;
    }): Promise<import("./entry").EntryProps<any>>;
    (opts: {
        entityType: "Entry";
        action: "patch";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            entryId: string;
            version: number;
        };
    } & {
        payload: import("json-patch").OpPatch[];
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./entry").EntryProps<any>>;
    (opts: {
        entityType: "Entry";
        action: "update";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            entryId: string;
        };
    } & {
        payload: import("./entry").EntryProps<any>;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./entry").EntryProps<any>>;
    (opts: {
        entityType: "Entry";
        action: "delete";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            entryId: string;
        };
    }): Promise<any>;
    (opts: {
        entityType: "Entry";
        action: "publish";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            entryId: string;
        };
    } & {
        payload: import("./entry").EntryProps<any>;
    }): Promise<import("./entry").EntryProps<any>>;
    (opts: {
        entityType: "Entry";
        action: "unpublish";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            entryId: string;
        };
    }): Promise<import("./entry").EntryProps<any>>;
    (opts: {
        entityType: "Entry";
        action: "archive";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            entryId: string;
        };
    }): Promise<import("./entry").EntryProps<any>>;
    (opts: {
        entityType: "Entry";
        action: "unarchive";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            entryId: string;
        };
    }): Promise<import("./entry").EntryProps<any>>;
    (opts: {
        entityType: "Entry";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            contentTypeId: string;
        };
    } & {
        payload: Pick<import("./entry").EntryProps<any>, "metadata" | "fields">;
    }): Promise<import("./entry").EntryProps<any>>;
    (opts: {
        entityType: "Entry";
        action: "createWithId";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            entryId: string;
            contentTypeId: string;
        };
    } & {
        payload: Pick<import("./entry").EntryProps<any>, "metadata" | "fields">;
    }): Promise<import("./entry").EntryProps<any>>;
    (opts: {
        entityType: "Entry";
        action: "references";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            entryId: string;
            maxDepth?: number | undefined;
        };
    }): Promise<import("./entry").EntryReferenceProps>;
    (opts: {
        entityType: "Extension";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            extensionId: string;
        } & import("../common-types").QueryParams;
    }): Promise<import("./extension").ExtensionProps>;
    (opts: {
        entityType: "Extension";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./extension").ExtensionProps>>;
    (opts: {
        entityType: "Extension";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams;
    } & {
        payload: import("./extension").CreateExtensionProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./extension").ExtensionProps>;
    (opts: {
        entityType: "Extension";
        action: "createWithId";
    } & {
        params: import("../common-types").GetExtensionParams;
    } & {
        payload: import("./extension").CreateExtensionProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./extension").ExtensionProps>;
    (opts: {
        entityType: "Extension";
        action: "update";
    } & {
        params: import("../common-types").GetExtensionParams;
    } & {
        payload: import("./extension").ExtensionProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./extension").ExtensionProps>;
    (opts: {
        entityType: "Extension";
        action: "delete";
    } & {
        params: import("../common-types").GetExtensionParams;
    }): Promise<any>;
    (opts: {
        entityType: "Locale";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            localeId: string;
        };
    }): Promise<import("./locale").LocaleProps>;
    (opts: {
        entityType: "Locale";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./locale").LocaleProps>>;
    (opts: {
        entityType: "Locale";
        action: "delete";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            localeId: string;
        };
    }): Promise<any>;
    (opts: {
        entityType: "Locale";
        action: "update";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            localeId: string;
        };
    } & {
        payload: import("./locale").LocaleProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./locale").LocaleProps>;
    (opts: {
        entityType: "Locale";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams;
    } & {
        payload: Pick<import("type-fest/source/simplify").Simplify<Pick<Pick<import("./locale").LocaleProps, "optional" | "default" | "code" | "name" | "internal_code" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">, "code" | "name" | "internal_code" | "fallbackCode"> & Partial<Pick<Pick<import("./locale").LocaleProps, "optional" | "default" | "code" | "name" | "internal_code" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">, "optional" | "default" | "contentDeliveryApi" | "contentManagementApi">>>, "optional" | "default" | "code" | "name" | "fallbackCode" | "contentDeliveryApi" | "contentManagementApi">;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./locale").LocaleProps>;
    (opts: {
        entityType: "Organization";
        action: "getMany";
    }): Promise<import("../common-types").CollectionProp<import("./organization").OrganizationProp>>;
    (opts: {
        entityType: "Organization";
        action: "get";
    } & {
        params: import("../common-types").GetOrganizationParams;
    }): Promise<import("./organization").OrganizationProp>;
    (opts: {
        entityType: "OrganizationInvitation";
        action: "get";
    } & {
        params: {
            organizationId: string;
            invitationId: string;
        };
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./organization-invitation").OrganizationInvitationProps>;
    (opts: {
        entityType: "OrganizationInvitation";
        action: "create";
    } & {
        params: {
            organizationId: string;
        };
    } & {
        payload: Pick<import("./organization-invitation").OrganizationInvitationProps, "firstName" | "lastName" | "email" | "role">;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./organization-invitation").OrganizationInvitationProps>;
    (opts: {
        entityType: "OrganizationMembership";
        action: "get";
    } & {
        params: import("../common-types").GetOrganizationMembershipProps;
    }): Promise<import("./organization-membership").OrganizationMembershipProps>;
    (opts: {
        entityType: "OrganizationMembership";
        action: "getMany";
    } & {
        params: import("../common-types").GetOrganizationParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./organization-membership").OrganizationMembershipProps>>;
    (opts: {
        entityType: "OrganizationMembership";
        action: "update";
    } & {
        params: import("../common-types").GetOrganizationMembershipProps;
    } & {
        payload: import("./organization-membership").OrganizationMembershipProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./organization-membership").OrganizationMembershipProps>;
    (opts: {
        entityType: "OrganizationMembership";
        action: "delete";
    } & {
        params: import("../common-types").GetOrganizationMembershipProps;
    }): Promise<any>;
    (opts: {
        entityType: "PersonalAccessToken";
        action: "get";
    } & {
        params: {
            tokenId: string;
        };
    }): Promise<import("./personal-access-token").PersonalAccessTokenProp>;
    (opts: {
        entityType: "PersonalAccessToken";
        action: "getMany";
    } & {
        params: import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./personal-access-token").PersonalAccessTokenProp>>;
    (opts: {
        entityType: "PersonalAccessToken";
        action: "create";
    } & {
        params: {};
    } & {
        payload: Pick<import("./personal-access-token").PersonalAccessToken, "name" | "scopes">;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./personal-access-token").PersonalAccessTokenProp>;
    (opts: {
        entityType: "PersonalAccessToken";
        action: "revoke";
    } & {
        params: {
            tokenId: string;
        };
    }): Promise<import("./personal-access-token").PersonalAccessTokenProp>;
    (opts: {
        entityType: "PreviewApiKey";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceParams & {
            previewApiKeyId: string;
        };
    }): Promise<import("./preview-api-key").PreviewApiKeyProps>;
    (opts: {
        entityType: "PreviewApiKey";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./preview-api-key").PreviewApiKeyProps>>;
    (opts: {
        entityType: "Release";
        action: "get";
    } & {
        params: import("../common-types").GetReleaseParams;
    }): Promise<import("./release").ReleaseProps>;
    (opts: {
        entityType: "Release";
        action: "query";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            query?: import("./release").ReleaseQueryOptions | undefined;
        };
    }): Promise<import("../common-types").CollectionProp<import("./release").ReleaseProps>>;
    (opts: {
        entityType: "Release";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams;
    } & {
        payload: import("./release").ReleasePayload;
    }): Promise<import("./release").ReleaseProps>;
    (opts: {
        entityType: "Release";
        action: "update";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            releaseId: string;
        } & {
            version: number;
        };
    } & {
        payload: import("./release").ReleasePayload;
    }): Promise<import("./release").ReleaseProps>;
    (opts: {
        entityType: "Release";
        action: "delete";
    } & {
        params: import("../common-types").GetReleaseParams;
    }): Promise<void>;
    (opts: {
        entityType: "Release";
        action: "publish";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            releaseId: string;
        } & {
            version: number;
        };
    }): Promise<import("./release-action").ReleaseActionProps<"publish">>;
    (opts: {
        entityType: "Release";
        action: "unpublish";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            releaseId: string;
        } & {
            version: number;
        };
    }): Promise<import("./release-action").ReleaseActionProps<"unpublish">>;
    (opts: {
        entityType: "Release";
        action: "validate";
    } & {
        params: import("../common-types").GetReleaseParams;
    } & {
        payload?: import("./release").ReleaseValidatePayload | undefined;
    }): Promise<import("./release-action").ReleaseActionProps<"validate">>;
    (opts: {
        entityType: "ReleaseAction";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            releaseId: string;
        } & {
            actionId: string;
        };
    }): Promise<import("./release-action").ReleaseAction<any>>;
    (opts: {
        entityType: "ReleaseAction";
        action: "queryForRelease";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            releaseId: string;
        } & {
            query?: import("./release-action").ReleaseActionQueryOptions | undefined;
        };
    }): Promise<import("../common-types").Collection<import("./release-action").ReleaseAction<any>, import("./release-action").ReleaseActionProps<any>>>;
    (opts: {
        entityType: "Role";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceParams & {
            roleId: string;
        };
    }): Promise<import("./role").RoleProps>;
    (opts: {
        entityType: "Role";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./role").RoleProps>>;
    (opts: {
        entityType: "Role";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceParams;
    } & {
        payload: Pick<import("./role").RoleProps, "description" | "name" | "permissions" | "policies">;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./role").RoleProps>;
    (opts: {
        entityType: "Role";
        action: "createWithId";
    } & {
        params: import("../common-types").GetSpaceParams & {
            roleId: string;
        };
    } & {
        payload: Pick<import("./role").RoleProps, "description" | "name" | "permissions" | "policies">;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./role").RoleProps>;
    (opts: {
        entityType: "Role";
        action: "update";
    } & {
        params: import("../common-types").GetSpaceParams & {
            roleId: string;
        };
    } & {
        payload: import("./role").RoleProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./role").RoleProps>;
    (opts: {
        entityType: "Role";
        action: "delete";
    } & {
        params: import("../common-types").GetSpaceParams & {
            roleId: string;
        };
    }): Promise<any>;
    (opts: {
        entityType: "ScheduledAction";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceParams & {
            scheduledActionId: string;
            environmentId: string;
        };
    }): Promise<import("./scheduled-action").ScheduledActionProps>;
    (opts: {
        entityType: "ScheduledAction";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./scheduled-action").ScheduledActionProps>>;
    (opts: {
        entityType: "ScheduledAction";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceParams;
    } & {
        payload: Pick<import("./scheduled-action").ScheduledActionProps, "environment" | "error" | "action" | "entity" | "scheduledFor">;
    }): Promise<import("./scheduled-action").ScheduledActionProps>;
    (opts: {
        entityType: "ScheduledAction";
        action: "update";
    } & {
        params: import("../common-types").GetSpaceParams & {
            scheduledActionId: string;
            version: number;
        };
    } & {
        payload: Pick<import("./scheduled-action").ScheduledActionProps, "environment" | "error" | "action" | "entity" | "scheduledFor">;
    }): Promise<import("./scheduled-action").ScheduledActionProps>;
    (opts: {
        entityType: "ScheduledAction";
        action: "delete";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            scheduledActionId: string;
        };
    }): Promise<any>;
    (opts: {
        entityType: "Snapshot";
        action: "getManyForEntry";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            entryId: string;
        } & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./snapshot").SnapshotProps<import("./entry").EntryProps<any>>>>;
    (opts: {
        entityType: "Snapshot";
        action: "getForEntry";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            entryId: string;
        } & {
            snapshotId: string;
        };
    }): Promise<import("./snapshot").SnapshotProps<import("./entry").EntryProps<any>>>;
    (opts: {
        entityType: "Snapshot";
        action: "getManyForContentType";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            contentTypeId: string;
        } & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>>;
    (opts: {
        entityType: "Snapshot";
        action: "getForContentType";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & {
            contentTypeId: string;
        } & {
            snapshotId: string;
        };
    }): Promise<import("./snapshot").SnapshotProps<import("./content-type").ContentTypeProps>>;
    (opts: {
        entityType: "Space";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceParams;
    }): Promise<import("./space").SpaceProps>;
    (opts: {
        entityType: "Space";
        action: "getMany";
    } & {
        params: import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./space").SpaceProps>>;
    (opts: {
        entityType: "Space";
        action: "create";
    } & {
        params: {
            organizationId?: string | undefined;
        };
    } & {
        payload: Pick<import("./space").SpaceProps, "name">;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<any>;
    (opts: {
        entityType: "Space";
        action: "update";
    } & {
        params: import("../common-types").GetSpaceParams;
    } & {
        payload: import("./space").SpaceProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./space").SpaceProps>;
    (opts: {
        entityType: "Space";
        action: "delete";
    } & {
        params: import("../common-types").GetSpaceParams;
    }): Promise<void>;
    (opts: {
        entityType: "SpaceMember";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceParams & {
            spaceMemberId: string;
        };
    }): Promise<import("./space-member").SpaceMemberProps>;
    (opts: {
        entityType: "SpaceMember";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./space-member").SpaceMemberProps>>;
    (opts: {
        entityType: "SpaceMembership";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceMembershipProps;
    }): Promise<import("./space-membership").SpaceMembershipProps>;
    (opts: {
        entityType: "SpaceMembership";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./space-membership").SpaceMembershipProps>>;
    (opts: {
        entityType: "SpaceMembership";
        action: "getForOrganization";
    } & {
        params: import("../common-types").GetOrganizationParams & {
            spaceMembershipId: string;
        };
    }): Promise<import("./space-membership").SpaceMembershipProps>;
    (opts: {
        entityType: "SpaceMembership";
        action: "getManyForOrganization";
    } & {
        params: import("../common-types").GetOrganizationParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./space-membership").SpaceMembershipProps>>;
    (opts: {
        entityType: "SpaceMembership";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceParams;
    } & {
        payload: import("./space-membership").CreateSpaceMembershipProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./space-membership").SpaceMembershipProps>;
    (opts: {
        entityType: "SpaceMembership";
        action: "createWithId";
    } & {
        params: import("../common-types").GetSpaceMembershipProps;
    } & {
        payload: import("./space-membership").CreateSpaceMembershipProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./space-membership").SpaceMembershipProps>;
    (opts: {
        entityType: "SpaceMembership";
        action: "update";
    } & {
        params: import("../common-types").GetSpaceMembershipProps;
    } & {
        payload: import("./space-membership").SpaceMembershipProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./space-membership").SpaceMembershipProps>;
    (opts: {
        entityType: "SpaceMembership";
        action: "delete";
    } & {
        params: import("../common-types").GetSpaceMembershipProps;
    }): Promise<any>;
    (opts: {
        entityType: "Tag";
        action: "get";
    } & {
        params: import("../common-types").GetTagParams;
    }): Promise<import("./tag").TagProps>;
    (opts: {
        entityType: "Tag";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceEnvironmentParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./tag").TagProps>>;
    (opts: {
        entityType: "Tag";
        action: "createWithId";
    } & {
        params: import("../common-types").GetTagParams;
    } & {
        payload: import("./tag").CreateTagProps;
    }): Promise<import("./tag").TagProps>;
    (opts: {
        entityType: "Tag";
        action: "update";
    } & {
        params: import("../common-types").GetTagParams;
    } & {
        payload: import("./tag").UpdateTagProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./tag").TagProps>;
    (opts: {
        entityType: "Tag";
        action: "delete";
    } & {
        params: import("./tag").DeleteTagParams;
    }): Promise<any>;
    (opts: {
        entityType: "Task";
        action: "get";
    } & {
        params: import("../common-types").GetTaskParams;
    }): Promise<import("./task").TaskProps>;
    (opts: {
        entityType: "Task";
        action: "getAll";
    } & {
        params: import("../common-types").GetEntryParams;
    }): Promise<import("../common-types").CollectionProp<import("./task").TaskProps>>;
    (opts: {
        entityType: "Task";
        action: "create";
    } & {
        params: import("../common-types").GetEntryParams;
    } & {
        payload: Pick<import("./task").TaskProps, "body" | "assignedTo" | "status" | "dueDate">;
    }): Promise<import("./task").TaskProps>;
    (opts: {
        entityType: "Task";
        action: "update";
    } & {
        params: import("../common-types").GetTaskParams;
    } & {
        payload: import("./task").UpdateTaskProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./task").TaskProps>;
    (opts: {
        entityType: "Task";
        action: "delete";
    } & {
        params: import("./task").DeleteTaskParams;
    }): Promise<void>;
    (opts: {
        entityType: "Team";
        action: "get";
    } & {
        params: import("../common-types").GetTeamParams;
    }): Promise<import("./team").TeamProps>;
    (opts: {
        entityType: "Team";
        action: "getMany";
    } & {
        params: import("../common-types").GetOrganizationParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./team").TeamProps>>;
    (opts: {
        entityType: "Team";
        action: "getManyForSpace";
    } & {
        params: import("../common-types").GetSpaceParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./team").TeamProps>>;
    (opts: {
        entityType: "Team";
        action: "create";
    } & {
        params: import("../common-types").GetOrganizationParams;
    } & {
        payload: Pick<import("./team").TeamProps, "description" | "name">;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<any>;
    (opts: {
        entityType: "Team";
        action: "update";
    } & {
        params: import("../common-types").GetTeamParams;
    } & {
        payload: import("./team").TeamProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./team").TeamProps>;
    (opts: {
        entityType: "Team";
        action: "delete";
    } & {
        params: import("../common-types").GetTeamParams;
    }): Promise<any>;
    (opts: {
        entityType: "TeamMembership";
        action: "get";
    } & {
        params: import("../common-types").GetTeamMembershipParams;
    }): Promise<import("./team-membership").TeamMembershipProps>;
    (opts: {
        entityType: "TeamMembership";
        action: "getManyForOrganization";
    } & {
        params: import("../common-types").GetOrganizationParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./team-membership").TeamMembershipProps>>;
    (opts: {
        entityType: "TeamMembership";
        action: "getManyForTeam";
    } & {
        params: import("../common-types").GetTeamParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./team-membership").TeamMembershipProps>>;
    (opts: {
        entityType: "TeamMembership";
        action: "create";
    } & {
        params: import("../common-types").GetTeamParams;
    } & {
        payload: Pick<import("./team-membership").TeamMembershipProps, "admin" | "organizationMembershipId">;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./team-membership").TeamMembershipProps>;
    (opts: {
        entityType: "TeamMembership";
        action: "update";
    } & {
        params: import("../common-types").GetTeamMembershipParams;
    } & {
        payload: import("./team-membership").TeamMembershipProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./team-membership").TeamMembershipProps>;
    (opts: {
        entityType: "TeamMembership";
        action: "delete";
    } & {
        params: import("../common-types").GetTeamMembershipParams;
    }): Promise<any>;
    (opts: {
        entityType: "TeamSpaceMembership";
        action: "get";
    } & {
        params: import("../common-types").GetTeamSpaceMembershipParams;
    }): Promise<import("./team-space-membership").TeamSpaceMembershipProps>;
    (opts: {
        entityType: "TeamSpaceMembership";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./team-space-membership").TeamSpaceMembershipProps>>;
    (opts: {
        entityType: "TeamSpaceMembership";
        action: "getForOrganization";
    } & {
        params: import("../common-types").GetOrganizationParams & {
            teamSpaceMembershipId: string;
        };
    }): Promise<import("./team-space-membership").TeamSpaceMembershipProps>;
    (opts: {
        entityType: "TeamSpaceMembership";
        action: "getManyForOrganization";
    } & {
        params: import("../common-types").GetOrganizationParams & import("../common-types").QueryParams & {
            teamId?: string | undefined;
        };
    }): Promise<import("../common-types").CollectionProp<import("./team-space-membership").TeamSpaceMembershipProps>>;
    (opts: {
        entityType: "TeamSpaceMembership";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceParams & {
            teamId: string;
        };
    } & {
        payload: Pick<import("./team-space-membership").TeamSpaceMembershipProps, "admin" | "roles">;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./team-space-membership").TeamSpaceMembershipProps>;
    (opts: {
        entityType: "TeamSpaceMembership";
        action: "update";
    } & {
        params: import("../common-types").GetTeamSpaceMembershipParams;
    } & {
        payload: import("./team-space-membership").TeamSpaceMembershipProps;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./team-space-membership").TeamSpaceMembershipProps>;
    (opts: {
        entityType: "TeamSpaceMembership";
        action: "delete";
    } & {
        params: import("../common-types").GetTeamSpaceMembershipParams;
    }): Promise<any>;
    (opts: {
        entityType: "Upload";
        action: "get";
    } & {
        params: import("../common-types").GetSpaceParams & {
            uploadId: string;
        };
    }): Promise<import("./entry").EntryProps<any>>;
    (opts: {
        entityType: "Upload";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceParams;
    } & {
        payload: {
            file: string | ArrayBuffer | import("stream").Stream;
        };
    }): Promise<import("./entry").EntryProps<any>>;
    (opts: {
        entityType: "Upload";
        action: "delete";
    } & {
        params: import("../common-types").GetSpaceParams & {
            uploadId: string;
        };
    }): Promise<any>;
    (opts: {
        entityType: "Usage";
        action: "getManyForSpace";
    } & {
        params: {
            organizationId: string;
        } & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./usage").UsageProps>>;
    (opts: {
        entityType: "Usage";
        action: "getManyForOrganization";
    } & {
        params: {
            organizationId: string;
        } & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./usage").UsageProps>>;
    (opts: {
        entityType: "User";
        action: "getManyForSpace";
    } & {
        params: import("../common-types").GetSpaceParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./user").UserProps>>;
    (opts: {
        entityType: "User";
        action: "getForSpace";
    } & {
        params: import("../common-types").GetSpaceParams & {
            userId: string;
        };
    }): Promise<import("./user").UserProps>;
    (opts: {
        entityType: "User";
        action: "getCurrent";
    } & {
        params?: import("../common-types").QueryParams | undefined;
    }): Promise<any>;
    (opts: {
        entityType: "User";
        action: "getForOrganization";
    } & {
        params: import("../common-types").GetOrganizationParams & {
            userId: string;
        };
    }): Promise<import("./user").UserProps>;
    (opts: {
        entityType: "User";
        action: "getManyForOrganization";
    } & {
        params: import("../common-types").GetOrganizationParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./user").UserProps>>;
    (opts: {
        entityType: "Webhook";
        action: "get";
    } & {
        params: import("../common-types").GetWebhookParams;
    }): Promise<import("./webhook").WebhookProps>;
    (opts: {
        entityType: "Webhook";
        action: "getMany";
    } & {
        params: import("../common-types").GetSpaceParams & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<import("./webhook").WebhookProps>>;
    (opts: {
        entityType: "Webhook";
        action: "getCallDetails";
    } & {
        params: import("../common-types").GetWebhookCallDetailsUrl;
    }): Promise<import("./webhook").WebhookCallDetailsProps>;
    (opts: {
        entityType: "Webhook";
        action: "getHealthStatus";
    } & {
        params: import("../common-types").GetWebhookParams;
    }): Promise<import("./webhook").WebhookHealthProps>;
    (opts: {
        entityType: "Webhook";
        action: "getManyCallDetails";
    } & {
        params: import("../common-types").GetSpaceParams & {
            webhookDefinitionId: string;
        } & import("../common-types").QueryParams;
    }): Promise<import("../common-types").CollectionProp<Pick<import("./webhook").WebhookCallDetailsProps, "sys" | "statusCode" | "errors" | "eventType" | "url" | "requestAt" | "responseAt">>>;
    (opts: {
        entityType: "Webhook";
        action: "create";
    } & {
        params: import("../common-types").GetSpaceParams;
    } & {
        payload: import("type-fest/source/simplify").Simplify<Pick<Pick<import("./webhook").WebhookProps, "headers" | "name" | "url" | "topics" | "httpBasicUsername" | "httpBasicPassword" | "filters" | "transformation">, "name" | "url" | "topics" | "httpBasicUsername" | "httpBasicPassword" | "filters" | "transformation"> & Partial<Pick<Pick<import("./webhook").WebhookProps, "headers" | "name" | "url" | "topics" | "httpBasicUsername" | "httpBasicPassword" | "filters" | "transformation">, "headers">>>;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./webhook").WebhookProps>;
    (opts: {
        entityType: "Webhook";
        action: "createWithId";
    } & {
        params: import("../common-types").GetWebhookParams;
    } & {
        payload: import("type-fest/source/simplify").Simplify<Pick<Pick<import("./webhook").WebhookProps, "headers" | "name" | "url" | "topics" | "httpBasicUsername" | "httpBasicPassword" | "filters" | "transformation">, "name" | "url" | "topics" | "httpBasicUsername" | "httpBasicPassword" | "filters" | "transformation"> & Partial<Pick<Pick<import("./webhook").WebhookProps, "headers" | "name" | "url" | "topics" | "httpBasicUsername" | "httpBasicPassword" | "filters" | "transformation">, "headers">>>;
    } & {
        headers?: Record<string, unknown> | undefined;
    }): Promise<import("./webhook").WebhookProps>;
    (opts: {
        entityType: "Webhook";
        action: "update";
    } & {
        params: import("../common-types").GetWebhookParams;
    } & {
        payload: import("./webhook").WebhookProps;
    }): Promise<import("./webhook").WebhookProps>;
    (opts: {
        entityType: "Webhook";
        action: "delete";
    } & {
        params: import("../common-types").GetWebhookParams;
    }): Promise<void>;
}, data: import("../common-types").CollectionProp<ApiKeyProps>) => import("../common-types").Collection<ApiKey, ApiKeyProps>;
