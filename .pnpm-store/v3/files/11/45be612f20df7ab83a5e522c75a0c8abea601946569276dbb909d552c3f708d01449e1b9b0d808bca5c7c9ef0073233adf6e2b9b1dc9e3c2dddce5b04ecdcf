import { MakeRequest, QueryOptions } from './common-types';
import { CreateAppBundleProps } from './entities/app-bundle';
export declare type ContentfulAppDefinitionAPI = ReturnType<typeof createAppDefinitionApi>;
export default function createAppDefinitionApi(makeRequest: MakeRequest): {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @return Object returned from the server with updated changes.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => {
     *   appDefinition.name = 'New App Definition name'
     *   return appDefinition.update()
     * })
     * .then((appDefinition) => console.log(`App Definition ${appDefinition.sys.id} updated.`))
     * .catch(console.error)
     * ```
     */
    update: () => Promise<import("./entities/app-definition").AppDefinition>;
    /**
     * Deletes this object on the server.
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.delete())
     * .then(() => console.log(`App Definition deleted.`))
     * .catch(console.error)
     * ```
     */
    delete: () => Promise<any>;
    /**
     * Gets an app bundle
     * @param id - AppBundle ID
     * @return Promise for an AppBundle
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.getAppBundle('<app_upload_id>')
     * .then((appBundle) => console.log(appBundle))
     * .catch(console.error)
     * ```
     */
    getAppBundle(id: string): Promise<import("./entities/app-bundle").AppBundle>;
    /**
     * Gets a collection of AppBundles
     * @return Promise for a collection of AppBundles
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.getAppBundles()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getAppBundles(query?: QueryOptions): Promise<import("./common-types").Collection<import("./entities/app-bundle").AppBundle, import("./entities/app-bundle").AppBundleProps>>;
    /**
     * Creates an app bundle
     * @param Object representation of the App Bundle to be created
     * @return Promise for the newly created AppBundle
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.createAppBundle('<app_upload_id>')
     * .then((appBundle) => console.log(appBundle))
     * .catch(console.error)
     * ```
     */
    createAppBundle(data: CreateAppBundleProps): Promise<import("./entities/app-bundle").AppBundle>;
};
