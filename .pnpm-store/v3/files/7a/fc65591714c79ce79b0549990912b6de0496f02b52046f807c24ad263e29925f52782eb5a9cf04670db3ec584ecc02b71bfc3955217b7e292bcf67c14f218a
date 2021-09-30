import { BaseCollection, Collection, CollectionProp, DefaultElements, ISO8601Timestamp, Link, MakeRequest, MakeRequestPayload } from '../common-types';
import { AsyncActionProcessingOptions } from '../methods/action';
import { ReleaseActionProps } from './release-action';
/** Entity types supported by the Release API */
declare type Entity = 'Entry' | 'Asset';
export interface ReleaseQueryOptions {
    /** Find releases filtered by the Entity type (Asset, Entry) */
    'entities.sys.linkType'?: string;
    /** Find releases containing the specified, comma-separated entities. Requires `entities.sys.linkType` */
    'entities.sys.id[in]'?: string;
    /** Find releases by using a comma-separated list of Ids */
    'sys.id[in]'?: string;
    /** Find releases using full text phrase and term matching */
    'title[match]'?: string;
    /** If present, will return results based on a pagination cursor */
    pageNext?: string;
    /**
     * Limit how many records are returned in the result
     * @default 100
     * */
    limit?: number;
}
export declare type ReleaseSysProps = {
    id: string;
    type: 'Release';
    version: number;
    space: Link<'Space'>;
    environment: Link<'Environment'>;
    createdBy: Link<'User'>;
    updatedBy: Link<'User'>;
    createdAt: ISO8601Timestamp;
    updatedAt: ISO8601Timestamp;
    lastAction?: Link<'ReleaseAction'>;
};
/** The object returned by the Releases API */
export interface ReleaseProps {
    title: string;
    sys: ReleaseSysProps;
    entities: BaseCollection<Link<Entity>>;
}
export interface ReleasePayload extends MakeRequestPayload {
    title: string;
    entities: BaseCollection<Link<Entity>>;
}
export interface ReleaseValidatePayload {
    action?: 'publish';
}
export interface ReleaseValidateOptions {
    payload?: ReleaseValidatePayload;
    processingOptions?: AsyncActionProcessingOptions;
}
export interface ReleaseApiMethods {
    /** Updates a Release and returns the updated Release object */
    update(payload: ReleasePayload): Promise<Release>;
    /** Deletes a Release and all ReleaseActions linked to it (non-reversible) */
    delete(): Promise<void>;
    /** Publishes a Release and waits until the asynchronous action is completed */
    publish(options?: AsyncActionProcessingOptions): Promise<ReleaseActionProps<'publish'>>;
    /** Unpublishes a Release and waits until the asynchronous action is completed */
    unpublish(options?: AsyncActionProcessingOptions): Promise<ReleaseActionProps<'unpublish'>>;
    /** Validates a Release and waits until the asynchronous action is completed */
    validate({ payload, options, }?: {
        payload?: ReleaseValidatePayload;
        options?: AsyncActionProcessingOptions;
    }): Promise<ReleaseActionProps<'validate'>>;
}
export interface Release extends ReleaseProps, ReleaseApiMethods, DefaultElements<ReleaseProps> {
}
/**
 * Return a Release object enhanced with its own API helper functions.
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw Release data
 * @return Wrapped Release data
 */
export declare function wrapRelease(makeRequest: MakeRequest, data: ReleaseProps): Release;
export declare const wrapReleaseCollection: (makeRequest: MakeRequest, data: CollectionProp<ReleaseProps>) => Collection<Release, ReleaseProps> & {
    pages?: {
        next: string;
    };
};
export {};
