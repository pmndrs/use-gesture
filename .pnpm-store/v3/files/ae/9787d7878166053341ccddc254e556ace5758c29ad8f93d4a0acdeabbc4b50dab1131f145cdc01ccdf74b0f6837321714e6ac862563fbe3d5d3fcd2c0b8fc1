import { BulkActionPayload, BulkActionProps } from '../entities/bulk-action';
import { PlainClientAPI } from '../plain/common-types';
import { AsyncActionProcessingOptions } from './action';
declare type PlainOptions = {
    /** Used by the PlainClient to perform a poll for the BulkAction status */
    plainClient: PlainClientAPI;
    spaceId: string;
    environmentId: string;
    bulkActionId: string;
};
/** Waits for a BulkAction status to be either succeeded or failed.
 * Used by the Plain client */
export declare function waitForBulkActionProcessing<T extends BulkActionPayload = any>({ plainClient, spaceId, environmentId, bulkActionId }: PlainOptions, options?: AsyncActionProcessingOptions): Promise<BulkActionProps<T>>;
export {};
