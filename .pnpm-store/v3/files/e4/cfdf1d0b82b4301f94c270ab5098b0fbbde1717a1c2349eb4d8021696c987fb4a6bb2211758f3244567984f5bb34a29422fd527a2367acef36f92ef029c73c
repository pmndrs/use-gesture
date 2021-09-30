import { DefaultElements, MakeRequest, MetaSysProps, SysLink } from '../common-types';
export declare type UploadProps = {
    /**
     * System metadata
     */
    sys: MetaSysProps & {
        space: SysLink;
    };
};
export interface Upload extends UploadProps, DefaultElements<UploadProps> {
    /**
     * Deletes this object on the server.
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getUpload('<upload_id>'))
     * .then((upload) => upload.delete())
     * .then((upload) => console.log(`upload ${upload.sys.id} updated.`))
     * .catch(console.error)
     */
    delete(): Promise<void>;
}
/**
 * @private
 * @param {function} makeRequest - function to make requests via an adapter
 * @param {object} data - Raw upload data
 * @return {Upload} Wrapped upload data
 */
export declare function wrapUpload(makeRequest: MakeRequest, data: UploadProps): {
    delete: () => Promise<void>;
} & UploadProps & {
    toPlainObject(): UploadProps;
};
