import { IRepositoryId } from "./repository-id";
import { EventStorage } from "./event-storage";
export declare type SemVer = string;
interface IOSInfo {
    nodeVersion: SemVer;
    platform: string;
    release: string;
    cpus?: string;
    arch: string;
    ci?: boolean;
    ciName: string | null;
    docker?: boolean;
    termProgram?: string;
    isTTY: boolean;
}
export interface IAggregateStats {
    count: number;
    min: number;
    max: number;
    sum: number;
    mean: number;
    median: number;
    stdDev: number;
    skewness: number;
}
interface IAnalyticsTrackerConstructorParameters {
    componentId?: SemVer;
    gatsbyCliVersion?: SemVer;
    trackingEnabled?: boolean;
}
export interface IStructuredError {
    id?: string;
    code?: string;
    text: string;
    level?: string;
    type?: string;
    context?: unknown;
    error?: {
        stack?: string;
    };
}
export interface IStructuredErrorV2 {
    id?: string;
    text: string;
    level?: string;
    type?: string;
    context?: string;
    stack?: string;
}
export interface ITelemetryTagsPayload {
    name?: string;
    starterName?: string;
    siteName?: string;
    siteHash?: string;
    userAgent?: string;
    pluginName?: string;
    exitCode?: number;
    duration?: number;
    uiSource?: string;
    valid?: boolean;
    plugins?: Array<string>;
    pathname?: string;
    error?: IStructuredError | Array<IStructuredError>;
    cacheStatus?: string;
    pluginCachePurged?: string;
    dependencies?: Array<string>;
    devDependencies?: Array<string>;
    siteMeasurements?: {
        pagesCount?: number;
        totalPagesCount?: number;
        createdNodesCount?: number;
        touchedNodesCount?: number;
        updatedNodesCount?: number;
        deletedNodesCount?: number;
        clientsCount?: number;
        paths?: Array<string | undefined>;
        bundleStats?: unknown;
        pageDataStats?: unknown;
        queryStats?: unknown;
    };
    errorV2?: IStructuredErrorV2;
    valueString?: string;
    valueStringArray?: Array<string>;
    valueInteger?: number;
    valueBoolean?: boolean;
}
export interface IDefaultTelemetryTagsPayload extends ITelemetryTagsPayload {
    gatsbyCliVersion?: SemVer;
    installedGatsbyVersion?: SemVer;
}
export interface ITelemetryOptsPayload {
    debounce?: boolean;
}
export declare class AnalyticsTracker {
    store: EventStorage;
    componentId: string;
    debouncer: {};
    metadataCache: {};
    defaultTags: {};
    osInfo?: IOSInfo;
    trackingEnabled?: boolean;
    componentVersion?: string;
    sessionId: string;
    gatsbyCliVersion?: SemVer;
    installedGatsbyVersion?: SemVer;
    repositoryId?: IRepositoryId;
    features: Set<string>;
    machineId: string;
    siteHash?: string;
    lastEnvTagsFromFileTime: number;
    lastEnvTagsFromFileValue: ITelemetryTagsPayload;
    constructor({ componentId, gatsbyCliVersion, trackingEnabled, }?: IAnalyticsTrackerConstructorParameters);
    getSessionId(): string;
    getRepositoryId(): IRepositoryId;
    getTagsFromEnv(): Record<string, unknown>;
    getGatsbyVersion(): SemVer;
    getGatsbyCliVersion(): SemVer;
    trackCli(type?: string | Array<string>, tags?: ITelemetryTagsPayload, opts?: ITelemetryOptsPayload): void;
    captureEvent(type?: string | Array<string>, tags?: ITelemetryTagsPayload, opts?: ITelemetryOptsPayload): void;
    isFinalEvent(event: string): boolean;
    captureError(type: string, tags?: ITelemetryTagsPayload): void;
    captureBuildError(type: string, tags?: ITelemetryTagsPayload): void;
    formatErrorAndStoreEvent(eventType: string, tags: ITelemetryTagsPayload): void;
    buildAndStoreEvent(eventType: string, tags: ITelemetryTagsPayload): void;
    getTagsFromPath(): ITelemetryTagsPayload;
    getIsTTY(): boolean;
    getMachineId(): string;
    isTrackingEnabled(): boolean;
    getOsInfo(): IOSInfo;
    trackActivity(source: string, tags?: ITelemetryTagsPayload): void;
    decorateNextEvent(event: string, obj: any): void;
    addSiteMeasurement(event: string, obj: ITelemetryTagsPayload["siteMeasurements"]): void;
    decorateAll(tags: ITelemetryTagsPayload): void;
    setTelemetryEnabled(enabled: boolean): void;
    aggregateStats(data: Array<number>): IAggregateStats;
    captureMetadataEvent(): void;
    sendEvents(): Promise<boolean>;
    trackFeatureIsUsed(name: string): void;
}
export {};
