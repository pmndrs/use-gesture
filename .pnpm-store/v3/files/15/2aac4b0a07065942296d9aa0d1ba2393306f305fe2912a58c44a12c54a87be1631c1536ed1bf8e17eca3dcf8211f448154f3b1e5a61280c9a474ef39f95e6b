import { MakeRequest, MRActions, MRReturn } from '../../common-types';
export declare type DefaultParams = {
    spaceId?: string;
    environmentId?: string;
    organizationId?: string;
};
export declare type OptionalDefaults<T> = Omit<T, keyof DefaultParams> & ('organizationId' extends keyof T ? {
    organizationId?: string;
} : {}) & ('spaceId' extends keyof T ? {
    spaceId?: string;
} : {}) & ('environmentId' extends keyof T ? {
    environmentId?: string;
} : {});
export declare type WrapParams = {
    makeRequest: MakeRequest;
    defaults?: DefaultParams;
};
export declare type WrapFn<ET extends keyof MRActions, Action extends keyof MRActions[ET], Params = 'params' extends keyof MRActions[ET][Action] ? MRActions[ET][Action]['params'] : undefined, Payload = 'payload' extends keyof MRActions[ET][Action] ? MRActions[ET][Action]['payload'] : undefined, Headers = 'headers' extends keyof MRActions[ET][Action] ? MRActions[ET][Action]['headers'] : undefined, Return = MRReturn<ET, Action>> = Params extends undefined ? () => Return : Payload extends undefined ? (params: Params) => Return : Headers extends undefined ? (params: Params, payload: Payload) => Return : (params: Params, payload: Payload, headers: Headers) => Return;
export declare const wrap: <ET extends "Http" | "AppBundle" | "ApiKey" | "AppDefinition" | "AppInstallation" | "Asset" | "AppUpload" | "AssetKey" | "BulkAction" | "ContentType" | "EditorInterface" | "Environment" | "EnvironmentAlias" | "Entry" | "Extension" | "Locale" | "Organization" | "OrganizationInvitation" | "OrganizationMembership" | "PersonalAccessToken" | "PreviewApiKey" | "Release" | "ReleaseAction" | "Role" | "ScheduledAction" | "Snapshot" | "Space" | "SpaceMember" | "SpaceMembership" | "Tag" | "Task" | "Team" | "TeamMembership" | "TeamSpaceMembership" | "Upload" | "Usage" | "User" | "Webhook", Action extends keyof MRActions[ET]>({ makeRequest, defaults }: WrapParams, entityType: ET, action: Action) => WrapFn<ET, Action, "params" extends keyof MRActions[ET][Action] ? MRActions[ET][Action][keyof MRActions[ET][Action] & "params"] : undefined, "payload" extends keyof MRActions[ET][Action] ? MRActions[ET][Action][keyof MRActions[ET][Action] & "payload"] : undefined, "headers" extends keyof MRActions[ET][Action] ? MRActions[ET][Action][keyof MRActions[ET][Action] & "headers"] : undefined, MRReturn<ET, Action>>;
