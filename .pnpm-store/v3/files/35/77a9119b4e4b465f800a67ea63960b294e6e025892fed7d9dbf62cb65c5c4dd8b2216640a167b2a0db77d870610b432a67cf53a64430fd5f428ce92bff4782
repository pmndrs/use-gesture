import { DefaultElements, ISO8601Timestamp, Link, MakeRequest, MakeRequestPayload, VersionedLink } from '../common-types';
import { AsyncActionProcessingOptions } from '../methods/action';
/** Entity types supported by the BulkAction API */
declare type Entity = 'Entry' | 'Asset';
declare type Collection<T> = Array<T>;
declare type EntityError = {
    entity: VersionedLink<Entity> | Link<Entity>;
    error: any;
};
export declare type BulkActionType = 'publish' | 'unpublish' | 'validate';
/** Represents the state of the BulkAction */
export declare enum BulkActionStatus {
    /** BulkAction is pending execution */
    created = "created",
    /** BulkAction has been started and pending completion */
    inProgress = "inProgress",
    /** BulkAction was completed successfully (terminal state) */
    succeeded = "succeeded",
    /** BulkAction failed to complete (terminal state) */
    failed = "failed"
}
declare const STATUSES: BulkActionStatus[];
declare type BulkActionStatuses = typeof STATUSES[number];
interface BulkActionFailedError {
    sys: {
        type: 'Error';
        id: 'BulkActionFailed';
    };
    message?: string;
    details?: {
        errors: Collection<EntityError>;
    };
}
export declare type BulkActionPayload = BulkActionPublishPayload | BulkActionUnpublishPayload | BulkActionValidatePayload;
export interface BulkActionValidatePayload extends MakeRequestPayload {
    action?: 'publish';
    entities: {
        sys?: {
            type: 'Array';
        };
        items: Collection<Link<Entity>>;
    };
}
export interface BulkActionUnpublishPayload extends MakeRequestPayload {
    entities: {
        sys?: {
            type: 'Array';
        };
        items: Collection<Link<Entity>>;
    };
}
export interface BulkActionPublishPayload extends MakeRequestPayload {
    entities: {
        sys?: {
            type: 'Array';
        };
        items: Collection<VersionedLink<Entity>>;
    };
}
export declare type BulkActionSysProps = {
    id: string;
    type: 'BulkAction';
    status: BulkActionStatuses;
    space: Link<'Space'>;
    environment: Link<'Environment'>;
    createdBy: Link<'User'>;
    createdAt: ISO8601Timestamp;
    updatedAt: ISO8601Timestamp;
};
/** The object returned by the BulkActions API */
export interface BulkActionProps<TPayload extends BulkActionPayload = any> {
    sys: BulkActionSysProps;
    action: BulkActionType;
    /** original payload when BulkAction was created */
    payload: TPayload;
    /** error information, if present */
    error?: BulkActionFailedError;
}
export interface BulkActionApiMethods {
    /** Performs a new GET request and returns the wrapper BulkAction */
    get(): BulkAction;
    /** Waits until the BulkAction is in one of the final states (`succeeded` or `failed`) and returns it. */
    waitProcessing(options?: AsyncActionProcessingOptions): Promise<BulkAction>;
}
export interface BulkAction<T extends BulkActionPayload = any> extends BulkActionProps<T>, BulkActionApiMethods, DefaultElements<BulkActionProps<T>> {
}
/**
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw BulkAction data
 * @return Wrapped BulkAction data
 */
export declare function wrapBulkAction<TPayload extends BulkActionPayload = any>(makeRequest: MakeRequest, data: BulkActionProps<BulkActionPayload>): BulkAction<TPayload>;
export {};
