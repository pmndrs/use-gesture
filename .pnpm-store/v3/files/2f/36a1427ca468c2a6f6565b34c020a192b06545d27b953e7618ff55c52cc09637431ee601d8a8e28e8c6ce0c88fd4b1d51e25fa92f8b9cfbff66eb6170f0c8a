import { DefaultElements, MakeRequest } from '../common-types';
export declare type AssetKeyProps = {
    /** A JWT describing a policy; needs to be attached to signed URLs */
    policy: string;
    /** A secret key to be used for signing URLs */
    secret: string;
};
export declare type CreateAssetKeyProps = {
    /** (required) UNIX timestamp in the future (but not more than 48 hours from now) */
    expiresAt: number;
};
export interface AssetKey extends AssetKeyProps, DefaultElements<AssetKeyProps> {
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw asset key data
 * @return Wrapped asset key data
 */
export declare function wrapAssetKey(_makeRequest: MakeRequest, data: AssetKeyProps): AssetKey;
