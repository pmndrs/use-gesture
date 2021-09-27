/// <reference types="node" />
import { AxiosRequestConfig } from 'axios';
import { OpPatch } from 'json-patch';
import { Stream } from 'stream';
import { CollectionProp, GetAppDefinitionParams, GetAppInstallationParams, GetContentTypeParams, GetEditorInterfaceParams, GetOrganizationMembershipProps, GetOrganizationParams, GetSnapshotForContentTypeParams, GetSnapshotForEntryParams, GetSpaceEnvAliasParams, GetSpaceEnvironmentParams, GetSpaceMembershipProps, GetSpaceParams, GetTagParams, GetTeamMembershipParams, GetTeamParams, GetTeamSpaceMembershipParams, GetExtensionParams, GetWebhookCallDetailsUrl, GetWebhookParams, KeyValueMap, PaginationQueryParams, QueryParams, GetAppUploadParams, GetAppBundleParams, GetBulkActionParams, GetReleaseParams, GetTaskParams, GetEntryParams, CursorPaginatedCollectionProp } from '../common-types';
import { ApiKeyProps, CreateApiKeyProps } from '../entities/api-key';
import { AppDefinitionProps, CreateAppDefinitionProps } from '../entities/app-definition';
import { AppInstallationProps, CreateAppInstallationProps } from '../entities/app-installation';
import { AssetFileProp, AssetProcessingForLocale, AssetProps, CreateAssetProps } from '../entities/asset';
import { ContentTypeProps, CreateContentTypeProps } from '../entities/content-type';
import { EditorInterfaceProps } from '../entities/editor-interface';
import { CreateEntryProps, EntryProps, EntryReferenceProps } from '../entities/entry';
import { CreateEnvironmentProps, EnvironmentProps } from '../entities/environment';
import { CreateEnvironmentAliasProps, EnvironmentAliasProps } from '../entities/environment-alias';
import { CreateLocaleProps, LocaleProps } from '../entities/locale';
import { OrganizationProp } from '../entities/organization';
import { CreateOrganizationInvitationProps, OrganizationInvitationProps } from '../entities/organization-invitation';
import { OrganizationMembershipProps } from '../entities/organization-membership';
import { CreatePersonalAccessTokenProps, PersonalAccessTokenProp } from '../entities/personal-access-token';
import { PreviewApiKeyProps } from '../entities/preview-api-key';
import { CreateRoleProps, RoleProps } from '../entities/role';
import { ScheduledActionProps, CreateUpdateScheduledActionProps } from '../entities/scheduled-action';
import { SnapshotProps } from '../entities/snapshot';
import { SpaceProps } from '../entities/space';
import { SpaceMemberProps } from '../entities/space-member';
import { CreateSpaceMembershipProps, SpaceMembershipProps } from '../entities/space-membership';
import { CreateTagProps, TagProps, UpdateTagProps } from '../entities/tag';
import { CreateTeamProps, TeamProps } from '../entities/team';
import { CreateTeamMembershipProps, TeamMembershipProps } from '../entities/team-membership';
import { CreateTeamSpaceMembershipProps, TeamSpaceMembershipProps } from '../entities/team-space-membership';
import { CreateExtensionProps, ExtensionProps } from '../entities/extension';
import { UsageProps } from '../entities/usage';
import { UserProps } from '../entities/user';
import { CreateWebhooksProps, WebhookCallDetailsProps, WebhookCallOverviewProps, WebhookHealthProps, WebhookProps } from '../entities/webhook';
import { DefaultParams, OptionalDefaults } from './wrappers/wrap';
import { AssetKeyProps, CreateAssetKeyProps } from '../entities/asset-key';
import { AppUploadProps } from '../entities/app-upload';
import { AppBundleProps, CreateAppBundleProps } from '../entities/app-bundle';
import { BulkActionPayload, BulkActionProps, BulkActionPublishPayload, BulkActionUnpublishPayload, BulkActionValidatePayload } from '../entities/bulk-action';
import { ReleasePayload, ReleaseProps, ReleaseQueryOptions, ReleaseValidatePayload } from '../entities/release';
import { ReleaseActionProps, ReleaseActionQueryOptions } from '../entities/release-action';
import { CreateTaskParams, CreateTaskProps, DeleteTaskParams, TaskProps, UpdateTaskParams, UpdateTaskProps } from '../entities/task';
export declare type PlainClientAPI = {
    raw: {
        getDefaultParams(): DefaultParams | undefined;
        get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
        post<T = unknown>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<T>;
        patch<T = unknown>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<T>;
        put<T = unknown>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<T>;
        delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
        http<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
    };
    appBundle: {
        get(params: OptionalDefaults<GetAppBundleParams>): Promise<AppBundleProps>;
        getMany(params: OptionalDefaults<GetAppDefinitionParams & QueryParams>): Promise<CollectionProp<AppBundleProps>>;
        delete(params: OptionalDefaults<GetAppBundleParams>): Promise<void>;
        create(params: OptionalDefaults<GetAppDefinitionParams>, payload: CreateAppBundleProps): Promise<AppBundleProps>;
    };
    editorInterface: {
        get(params: OptionalDefaults<GetEditorInterfaceParams>): Promise<EditorInterfaceProps>;
        getMany(params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>): Promise<CollectionProp<EditorInterfaceProps>>;
        update(params: OptionalDefaults<GetEditorInterfaceParams>, rawData: EditorInterfaceProps, headers?: Record<string, unknown>): Promise<EditorInterfaceProps>;
    };
    space: {
        get(params: OptionalDefaults<GetSpaceParams>): Promise<SpaceProps>;
        getMany(params: OptionalDefaults<QueryParams>): Promise<CollectionProp<SpaceProps>>;
        create(params: OptionalDefaults<{
            organizationId?: string;
        }>, payload: Omit<SpaceProps, 'sys'>, headers?: Record<string, unknown>): Promise<any>;
        update(params: OptionalDefaults<GetSpaceParams>, payload: SpaceProps, headers?: Record<string, unknown>): Promise<SpaceProps>;
        delete(params: OptionalDefaults<GetSpaceParams>): Promise<any>;
    };
    environment: {
        get(params: OptionalDefaults<GetSpaceEnvironmentParams>): Promise<EnvironmentProps>;
        getMany(params: OptionalDefaults<GetSpaceParams & PaginationQueryParams>): Promise<CollectionProp<EnvironmentProps>>;
        create(params: OptionalDefaults<GetSpaceParams>, rawData: Partial<Pick<EnvironmentProps, 'name'>>, headers?: Record<string, unknown>): Promise<EnvironmentProps>;
        createWithId(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            sourceEnvironmentId?: string;
        }>, rawData: CreateEnvironmentProps, headers?: Record<string, unknown>): Promise<EnvironmentProps>;
        update(params: OptionalDefaults<GetSpaceEnvironmentParams>, rawData: EnvironmentProps, headers?: Record<string, unknown>): Promise<EnvironmentProps>;
        delete(params: OptionalDefaults<GetSpaceEnvironmentParams>): Promise<any>;
    };
    environmentAlias: {
        get(params: OptionalDefaults<GetSpaceEnvAliasParams>): Promise<EnvironmentAliasProps>;
        getMany(params: OptionalDefaults<GetSpaceParams & PaginationQueryParams>): Promise<CollectionProp<EnvironmentAliasProps>>;
        createWithId(params: OptionalDefaults<GetSpaceEnvAliasParams>, rawData: CreateEnvironmentAliasProps, headers?: Record<string, unknown>): Promise<EnvironmentAliasProps>;
        update(params: OptionalDefaults<GetSpaceEnvAliasParams>, rawData: EnvironmentAliasProps, headers?: Record<string, unknown>): Promise<EnvironmentAliasProps>;
        delete(params: OptionalDefaults<GetSpaceEnvAliasParams>): Promise<any>;
    };
    bulkAction: {
        get<T extends BulkActionPayload = any>(params: GetBulkActionParams): Promise<BulkActionProps<T>>;
        publish(params: GetSpaceEnvironmentParams, payload: BulkActionPublishPayload): Promise<BulkActionProps<BulkActionPublishPayload>>;
        unpublish(params: GetSpaceEnvironmentParams, payload: BulkActionUnpublishPayload): Promise<BulkActionProps<BulkActionUnpublishPayload>>;
        validate(params: GetSpaceEnvironmentParams, payload: BulkActionValidatePayload): Promise<BulkActionProps<BulkActionValidatePayload>>;
    };
    contentType: {
        get(params: OptionalDefaults<GetContentTypeParams & QueryParams>): Promise<ContentTypeProps>;
        getMany(params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>): Promise<CollectionProp<ContentTypeProps>>;
        update(params: OptionalDefaults<GetContentTypeParams>, rawData: ContentTypeProps, headers?: Record<string, unknown>): Promise<ContentTypeProps>;
        delete(params: OptionalDefaults<GetContentTypeParams>): Promise<any>;
        publish(params: OptionalDefaults<GetContentTypeParams>, rawData: ContentTypeProps): Promise<ContentTypeProps>;
        unpublish(params: OptionalDefaults<GetContentTypeParams>): Promise<ContentTypeProps>;
        create(params: OptionalDefaults<GetSpaceEnvironmentParams>, rawData: CreateContentTypeProps): Promise<ContentTypeProps>;
        createWithId(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            contentTypeId: string;
        }>, rawData: CreateContentTypeProps): Promise<ContentTypeProps>;
        omitAndDeleteField(params: OptionalDefaults<GetContentTypeParams>, contentType: ContentTypeProps, fieldId: string): Promise<ContentTypeProps>;
    };
    user: {
        getManyForSpace(params: OptionalDefaults<GetSpaceParams & QueryParams>): Promise<CollectionProp<UserProps>>;
        getForSpace(params: OptionalDefaults<GetSpaceParams & {
            userId: string;
        }>): Promise<UserProps>;
        getCurrent<T = UserProps>(params?: QueryParams): Promise<T>;
        getForOrganization(params: OptionalDefaults<GetOrganizationParams & {
            userId: string;
        }>): Promise<UserProps>;
        getManyForOrganization(params: OptionalDefaults<GetOrganizationParams & QueryParams>): Promise<CollectionProp<UserProps>>;
    };
    entry: {
        getMany<T extends KeyValueMap = KeyValueMap>(params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>): Promise<CollectionProp<EntryProps<T>>>;
        get<T extends KeyValueMap = KeyValueMap>(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            entryId: string;
        }>, rawData?: unknown, headers?: Record<string, unknown>): Promise<EntryProps<T>>;
        update<T extends KeyValueMap = KeyValueMap>(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            entryId: string;
        }>, rawData: EntryProps<T>, headers?: Record<string, unknown>): Promise<EntryProps<T>>;
        patch<T extends KeyValueMap = KeyValueMap>(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            entryId: string;
        }>, rawData: OpPatch[], headers?: Record<string, unknown>): Promise<EntryProps<T>>;
        delete(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            entryId: string;
        }>): Promise<any>;
        publish<T extends KeyValueMap = KeyValueMap>(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            entryId: string;
        }>, rawData: EntryProps<T>): Promise<EntryProps<T>>;
        unpublish<T extends KeyValueMap = KeyValueMap>(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            entryId: string;
        }>): Promise<EntryProps<T>>;
        archive<T extends KeyValueMap = KeyValueMap>(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            entryId: string;
        }>): Promise<EntryProps<T>>;
        unarchive<T extends KeyValueMap = KeyValueMap>(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            entryId: string;
        }>): Promise<EntryProps<T>>;
        create<T extends KeyValueMap = KeyValueMap>(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            contentTypeId: string;
        }>, rawData: CreateEntryProps<T>): Promise<EntryProps<T>>;
        createWithId<T extends KeyValueMap = KeyValueMap>(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            entryId: string;
            contentTypeId: string;
        }>, rawData: CreateEntryProps<T>): Promise<EntryProps<T>>;
        references(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            entryId: string;
            maxDepth?: number;
        }>): Promise<EntryReferenceProps>;
    };
    asset: {
        getMany(params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>): Promise<CollectionProp<AssetProps>>;
        get(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            assetId: string;
        } & QueryParams>, rawData?: unknown, headers?: Record<string, unknown>): Promise<AssetProps>;
        update(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            assetId: string;
        }>, rawData: AssetProps, headers?: Record<string, unknown>): Promise<AssetProps>;
        delete(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            assetId: string;
        }>): Promise<any>;
        publish(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            assetId: string;
        }>, rawData: AssetProps): Promise<AssetProps>;
        unpublish(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            assetId: string;
        }>): Promise<AssetProps>;
        archive(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            assetId: string;
        }>): Promise<AssetProps>;
        unarchive(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            assetId: string;
        }>): Promise<AssetProps>;
        create(params: OptionalDefaults<GetSpaceEnvironmentParams>, rawData: CreateAssetProps): Promise<AssetProps>;
        createWithId(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            assetId: string;
        }>, rawData: CreateAssetProps): Promise<AssetProps>;
        createFromFiles(params: OptionalDefaults<GetSpaceEnvironmentParams>, data: Omit<AssetFileProp, 'sys'>): Promise<AssetProps>;
        processForAllLocales(params: OptionalDefaults<GetSpaceEnvironmentParams>, asset: AssetProps, processingOptions?: AssetProcessingForLocale): Promise<AssetProps>;
        processForLocale(params: OptionalDefaults<GetSpaceEnvironmentParams>, asset: AssetProps, locale: string, processingOptions?: AssetProcessingForLocale): Promise<AssetProps>;
    };
    appUpload: {
        get(params: OptionalDefaults<GetAppUploadParams>): Promise<AppUploadProps>;
        delete(params: OptionalDefaults<GetAppUploadParams>): Promise<void>;
        create(params: OptionalDefaults<GetOrganizationParams>, payload: {
            file: string | ArrayBuffer | Stream;
        }): Promise<AppUploadProps>;
    };
    assetKey: {
        create(params: OptionalDefaults<GetSpaceEnvironmentParams>, data: CreateAssetKeyProps): Promise<AssetKeyProps>;
    };
    upload: {
        get(params: OptionalDefaults<GetSpaceParams & {
            uploadId: string;
        }>): Promise<any>;
        create(params: OptionalDefaults<GetSpaceParams>, data: {
            file: string | ArrayBuffer | Stream;
        }): Promise<any>;
        delete(params: OptionalDefaults<GetSpaceParams & {
            uploadId: string;
        }>): Promise<any>;
    };
    locale: {
        get(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            localeId: string;
        }>): Promise<LocaleProps>;
        getMany(params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>): Promise<CollectionProp<LocaleProps>>;
        delete(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            localeId: string;
        }>): Promise<any>;
        update(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            localeId: string;
        }>, rawData: LocaleProps, headers?: Record<string, unknown>): Promise<LocaleProps>;
        create(params: OptionalDefaults<GetSpaceEnvironmentParams>, data: CreateLocaleProps, headers?: Record<string, unknown>): Promise<LocaleProps>;
    };
    personalAccessToken: {
        get(params: OptionalDefaults<{
            tokenId: string;
        }>): Promise<PersonalAccessTokenProp>;
        getMany(params: OptionalDefaults<QueryParams>): Promise<CollectionProp<PersonalAccessTokenProp>>;
        create(rawData: CreatePersonalAccessTokenProps, headers?: Record<string, unknown>): Promise<PersonalAccessTokenProp>;
        revoke(params: OptionalDefaults<{
            tokenId: string;
        }>): Promise<PersonalAccessTokenProp>;
    };
    usage: {
        getManyForSpace(params: OptionalDefaults<{
            organizationId: string;
        } & QueryParams>): Promise<CollectionProp<UsageProps>>;
        getManyForOrganization(params: OptionalDefaults<{
            organizationId: string;
        } & QueryParams>): Promise<CollectionProp<UsageProps>>;
    };
    release: {
        get(params: OptionalDefaults<GetReleaseParams>): Promise<ReleaseProps>;
        query(params: OptionalDefaults<GetSpaceEnvironmentParams> & {
            query?: ReleaseQueryOptions;
        }): Promise<CollectionProp<ReleaseProps>>;
        create(params: OptionalDefaults<GetSpaceEnvironmentParams>, data: ReleasePayload): Promise<ReleaseProps>;
        update(params: OptionalDefaults<GetReleaseParams & {
            version: number;
        }>, data: ReleasePayload): Promise<ReleaseProps>;
        delete(params: OptionalDefaults<GetReleaseParams>): Promise<void>;
        publish(params: OptionalDefaults<GetReleaseParams & {
            version: number;
        }>): Promise<ReleaseActionProps<'publish'>>;
        unpublish(params: OptionalDefaults<GetReleaseParams & {
            version: number;
        }>): Promise<ReleaseActionProps<'unpublish'>>;
        validate(params: OptionalDefaults<GetReleaseParams>, data?: ReleaseValidatePayload): Promise<ReleaseActionProps<'validate'>>;
    };
    releaseAction: {
        get(params: OptionalDefaults<GetReleaseParams> & {
            actionId: string;
        }): Promise<ReleaseActionProps>;
        queryForRelease(params: OptionalDefaults<GetReleaseParams> & {
            query?: ReleaseActionQueryOptions;
        }): Promise<CollectionProp<ReleaseActionProps>>;
    };
    role: {
        get(params: OptionalDefaults<GetSpaceParams & {
            roleId: string;
        }>): Promise<RoleProps>;
        getMany(params: OptionalDefaults<GetSpaceParams & QueryParams>): Promise<CollectionProp<RoleProps>>;
        create(params: OptionalDefaults<GetSpaceParams>, data: CreateRoleProps, headers?: Record<string, unknown>): Promise<RoleProps>;
        createWithId(params: OptionalDefaults<GetSpaceParams & {
            roleId: string;
        }>, data: CreateRoleProps, headers?: Record<string, unknown>): Promise<RoleProps>;
        update(params: OptionalDefaults<GetSpaceParams & {
            roleId: string;
        }>, rawData: RoleProps, headers?: Record<string, unknown>): Promise<RoleProps>;
        delete(params: OptionalDefaults<GetSpaceParams & {
            roleId: string;
        }>): Promise<any>;
    };
    scheduledActions: {
        get(params: OptionalDefaults<GetSpaceParams> & {
            scheduledActionId: string;
            environmentId: string;
        }): Promise<ScheduledActionProps>;
        getMany(params: OptionalDefaults<GetSpaceParams & QueryParams>): Promise<CursorPaginatedCollectionProp<ScheduledActionProps>>;
        create(params: OptionalDefaults<GetSpaceParams>, data: CreateUpdateScheduledActionProps): Promise<ScheduledActionProps>;
        delete(params: OptionalDefaults<GetSpaceEnvironmentParams & {
            scheduledActionId: string;
        }>): Promise<ScheduledActionProps>;
        update(params: OptionalDefaults<GetSpaceParams & {
            scheduledActionId: string;
            version: number;
        }>, data: CreateUpdateScheduledActionProps): Promise<ScheduledActionProps>;
    };
    previewApiKey: {
        get(params: OptionalDefaults<GetSpaceParams & {
            previewApiKeyId: string;
        }>): Promise<PreviewApiKeyProps>;
        getMany(params: OptionalDefaults<GetSpaceParams & QueryParams>): Promise<CollectionProp<PreviewApiKeyProps>>;
    };
    apiKey: {
        get(params: OptionalDefaults<GetSpaceParams & {
            apiKeyId: string;
        }>): Promise<ApiKeyProps>;
        getMany(params: OptionalDefaults<GetSpaceParams & QueryParams>): Promise<CollectionProp<ApiKeyProps>>;
        create(params: OptionalDefaults<GetSpaceParams>, data: CreateApiKeyProps, headers?: Record<string, unknown>): Promise<ApiKeyProps>;
        createWithId(params: OptionalDefaults<GetSpaceParams & {
            apiKeyId: string;
        }>, data: CreateApiKeyProps, headers?: Record<string, unknown>): Promise<ApiKeyProps>;
        update(params: OptionalDefaults<GetSpaceParams & {
            apiKeyId: string;
        }>, rawData: ApiKeyProps, headers?: Record<string, unknown>): Promise<ApiKeyProps>;
        delete(params: OptionalDefaults<GetSpaceParams & {
            apiKeyId: string;
        }>): Promise<any>;
    };
    appDefinition: {
        get(params: OptionalDefaults<GetOrganizationParams & {
            appDefinitionId: string;
        } & QueryParams>): Promise<AppDefinitionProps>;
        getMany(params: OptionalDefaults<GetOrganizationParams & QueryParams>): Promise<CollectionProp<AppDefinitionProps>>;
        create(params: OptionalDefaults<GetOrganizationParams>, rawData: CreateAppDefinitionProps): Promise<AppDefinitionProps>;
        update(params: OptionalDefaults<GetAppDefinitionParams>, rawData: AppDefinitionProps, headers?: Record<string, unknown>): Promise<AppDefinitionProps>;
        delete(params: OptionalDefaults<GetAppDefinitionParams>): Promise<any>;
    };
    appInstallation: {
        get(params: OptionalDefaults<GetAppInstallationParams>): Promise<AppInstallationProps>;
        getMany(params: OptionalDefaults<GetSpaceEnvironmentParams & PaginationQueryParams>): Promise<CollectionProp<AppInstallationProps>>;
        upsert(params: OptionalDefaults<GetAppInstallationParams>, rawData: CreateAppInstallationProps, headers?: Record<string, unknown>): Promise<AppInstallationProps>;
        delete(params: OptionalDefaults<GetAppInstallationParams>): Promise<any>;
    };
    extension: {
        get(params: OptionalDefaults<GetExtensionParams & QueryParams>): Promise<ExtensionProps>;
        getMany(params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>): Promise<CollectionProp<ExtensionProps>>;
        create(params: OptionalDefaults<GetSpaceEnvironmentParams>, rawData: CreateExtensionProps, headers?: Record<string, unknown>): Promise<ExtensionProps>;
        createWithId(params: OptionalDefaults<GetExtensionParams>, rawData: CreateExtensionProps, headers?: Record<string, unknown>): Promise<ExtensionProps>;
        update(params: OptionalDefaults<GetExtensionParams>, rawData: ExtensionProps, headers?: Record<string, unknown>): Promise<ExtensionProps>;
        delete(params: OptionalDefaults<GetExtensionParams>): Promise<any>;
    };
    webhook: {
        get(params: OptionalDefaults<GetWebhookParams>): Promise<WebhookProps>;
        getMany(params: OptionalDefaults<GetSpaceParams & QueryParams>): Promise<CollectionProp<WebhookProps>>;
        getHealthStatus(params: OptionalDefaults<GetWebhookParams>): Promise<WebhookHealthProps>;
        getCallDetails(params: OptionalDefaults<GetWebhookCallDetailsUrl>): Promise<WebhookCallDetailsProps>;
        getManyCallDetails(params: OptionalDefaults<GetWebhookParams & QueryParams>): Promise<CollectionProp<WebhookCallOverviewProps>>;
        create(params: OptionalDefaults<GetSpaceParams>, rawData: CreateWebhooksProps, headers?: Record<string, unknown>): Promise<WebhookProps>;
        update(params: OptionalDefaults<GetWebhookParams>, rawData: CreateWebhooksProps): Promise<WebhookProps>;
        delete(params: OptionalDefaults<GetWebhookParams>): Promise<any>;
    };
    snapshot: {
        getManyForEntry<T extends KeyValueMap = KeyValueMap>(params: OptionalDefaults<GetSnapshotForEntryParams & QueryParams>): Promise<CollectionProp<SnapshotProps<EntryProps<T>>>>;
        getForEntry<T extends KeyValueMap = KeyValueMap>(params: OptionalDefaults<GetSnapshotForEntryParams & {
            snapshotId: string;
        }>): Promise<SnapshotProps<EntryProps<T>>>;
        getManyForContentType(params: OptionalDefaults<GetSnapshotForContentTypeParams & QueryParams>): Promise<CollectionProp<SnapshotProps<ContentTypeProps>>>;
        getForContentType(params: OptionalDefaults<GetSnapshotForContentTypeParams & {
            snapshotId: string;
        }>): Promise<SnapshotProps<ContentTypeProps>>;
    };
    tag: {
        get(params: OptionalDefaults<GetTagParams>): Promise<TagProps>;
        getMany(params: OptionalDefaults<GetSpaceEnvironmentParams & QueryParams>): Promise<CollectionProp<TagProps>>;
        createWithId(params: OptionalDefaults<GetTagParams>, rawData: CreateTagProps): Promise<TagProps>;
        update(params: OptionalDefaults<GetTagParams>, rawData: UpdateTagProps, headers?: Record<string, unknown>): Promise<TagProps>;
        delete(params: OptionalDefaults<GetTagParams>, version: number): Promise<any>;
    };
    organization: {
        getAll(): Promise<CollectionProp<OrganizationProp>>;
        get(params: OptionalDefaults<GetOrganizationParams>): Promise<OrganizationProp>;
    };
    organizationInvitation: {
        get(params: OptionalDefaults<{
            organizationId: string;
            invitationId: string;
        }>, headers?: Record<string, unknown>): Promise<OrganizationInvitationProps>;
        create(params: OptionalDefaults<{
            organizationId: string;
        }>, data: CreateOrganizationInvitationProps, headers?: Record<string, unknown>): Promise<OrganizationInvitationProps>;
    };
    organizationMembership: {
        get(params: OptionalDefaults<GetOrganizationMembershipProps>): Promise<OrganizationMembershipProps>;
        getMany(params: OptionalDefaults<GetOrganizationParams & QueryParams>): Promise<CollectionProp<OrganizationMembershipProps>>;
        update(params: OptionalDefaults<GetOrganizationMembershipProps>, rawData: OrganizationMembershipProps, headers?: Record<string, unknown>): Promise<OrganizationMembershipProps>;
        delete(params: OptionalDefaults<GetOrganizationMembershipProps>): Promise<any>;
    };
    spaceMember: {
        get(params: OptionalDefaults<GetSpaceParams & {
            spaceMemberId: string;
        }>): Promise<SpaceMemberProps>;
        getMany(params: OptionalDefaults<GetSpaceParams & QueryParams>): Promise<CollectionProp<SpaceMemberProps>>;
    };
    spaceMembership: {
        get(params: OptionalDefaults<GetSpaceMembershipProps>): Promise<SpaceMembershipProps>;
        getMany(params: OptionalDefaults<GetSpaceParams & QueryParams>): Promise<CollectionProp<SpaceMembershipProps>>;
        getForOrganization(params: OptionalDefaults<GetOrganizationParams & {
            spaceMembershipId: string;
        }>): Promise<SpaceMembershipProps>;
        getManyForOrganization(params: OptionalDefaults<GetOrganizationParams & QueryParams>): Promise<CollectionProp<SpaceMembershipProps>>;
        create(params: OptionalDefaults<GetSpaceParams>, data: CreateSpaceMembershipProps, headers?: Record<string, unknown>): Promise<SpaceMembershipProps>;
        createWithId(params: OptionalDefaults<GetSpaceMembershipProps>, data: CreateSpaceMembershipProps, headers?: Record<string, unknown>): Promise<SpaceMembershipProps>;
        update(params: OptionalDefaults<GetSpaceMembershipProps>, rawData: SpaceMembershipProps, headers?: Record<string, unknown>): Promise<SpaceMembershipProps>;
        delete(params: OptionalDefaults<GetSpaceMembershipProps>): Promise<any>;
    };
    task: {
        get(params: OptionalDefaults<GetTaskParams>): Promise<TaskProps>;
        getAll(params: OptionalDefaults<GetEntryParams>): Promise<CollectionProp<TaskProps>>;
        create(params: OptionalDefaults<CreateTaskParams>, rawData: CreateTaskProps, headers?: Record<string, unknown>): Promise<TaskProps>;
        update(params: OptionalDefaults<UpdateTaskParams>, rawData: UpdateTaskProps, headers?: Record<string, unknown>): Promise<TaskProps>;
        delete(params: OptionalDefaults<DeleteTaskParams>): Promise<void>;
    };
    team: {
        get(params: OptionalDefaults<GetTeamParams>): Promise<TeamProps>;
        getMany(params: OptionalDefaults<GetOrganizationParams & QueryParams>): Promise<CollectionProp<TeamProps>>;
        getManyForSpace(params: OptionalDefaults<GetSpaceParams & QueryParams>): Promise<CollectionProp<TeamProps>>;
        create(params: OptionalDefaults<GetOrganizationParams>, rawData: CreateTeamProps, headers?: Record<string, unknown>): Promise<any>;
        update(params: OptionalDefaults<GetTeamParams>, rawData: TeamProps, headers?: Record<string, unknown>): Promise<TeamProps>;
        delete(params: OptionalDefaults<GetTeamParams>): Promise<any>;
    };
    teamMembership: {
        get(params: OptionalDefaults<GetTeamMembershipParams>): Promise<TeamMembershipProps>;
        getManyForOrganization(params: OptionalDefaults<GetOrganizationParams & QueryParams>): Promise<CollectionProp<TeamMembershipProps>>;
        getManyForTeam(params: OptionalDefaults<GetTeamParams & QueryParams>): Promise<CollectionProp<TeamMembershipProps>>;
        create(params: OptionalDefaults<GetTeamParams>, rawData: CreateTeamMembershipProps, headers?: Record<string, unknown>): Promise<TeamMembershipProps>;
        update(params: OptionalDefaults<GetTeamMembershipParams>, rawData: TeamMembershipProps, headers?: Record<string, unknown>): Promise<TeamMembershipProps>;
        delete(params: OptionalDefaults<GetTeamMembershipParams>): Promise<any>;
    };
    teamSpaceMembership: {
        get(params: OptionalDefaults<GetTeamSpaceMembershipParams>): Promise<TeamSpaceMembershipProps>;
        getMany(params: OptionalDefaults<GetSpaceParams & QueryParams>): Promise<CollectionProp<TeamSpaceMembershipProps>>;
        getForOrganization(params: OptionalDefaults<GetOrganizationParams & {
            teamSpaceMembershipId: string;
        }>): Promise<TeamSpaceMembershipProps>;
        getManyForOrganization(params: OptionalDefaults<GetOrganizationParams & QueryParams & {
            teamId?: string;
        }>): Promise<CollectionProp<TeamSpaceMembershipProps>>;
        create(params: OptionalDefaults<GetSpaceParams & {
            teamId: string;
        }>, rawData: CreateTeamSpaceMembershipProps, headers?: Record<string, unknown>): Promise<TeamSpaceMembershipProps>;
        update(params: OptionalDefaults<GetTeamSpaceMembershipParams>, rawData: TeamSpaceMembershipProps, headers?: Record<string, unknown>): Promise<TeamSpaceMembershipProps>;
        delete(params: OptionalDefaults<GetTeamSpaceMembershipParams>): Promise<any>;
    };
};
