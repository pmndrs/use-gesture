import type { OpPatch } from 'json-patch';
import { MakeRequest } from './common-types';
import { Entry, EntryProps, EntryReferenceOptionsProps } from './entities/entry';
import { CreateTaskProps } from './entities/task';
export declare type ContentfulEntryApi = ReturnType<typeof createEntryApi>;
export default function createEntryApi(makeRequest: MakeRequest): {
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
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => {
     *   entry.fields.title['en-US'] = 'New entry title'
     *   return entry.update()
     * })
     * .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
     * .catch(console.error)
     * ```
     */
    update: () => Promise<Entry>;
    /**
     * Sends an JSON patch to the server with any changes made to the object's properties
     * @return Object returned from the server with updated changes.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.patch([
     *   {
     *     op: 'replace',
     *     path: '/fields/title/en-US',
     *     value: 'New entry title'
     *   }
     * ]))
     * .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
     * .catch(console.error)
     * ```
     */
    patch: (ops: OpPatch[]) => Promise<Entry>;
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
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.delete())
     * .then(() => console.log(`Entry deleted.`))
     * .catch(console.error)
     * ```
     */
    delete: () => Promise<any>;
    /**
     * Publishes the object
     * @return Object returned from the server with updated metadata.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.publish())
     * .then((entry) => console.log(`Entry ${entry.sys.id} published.`))
     * .catch(console.error)
     * ```
     */
    publish: () => Promise<Entry>;
    /**
     * Unpublishes the object
     * @return Object returned from the server with updated metadata.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.unpublish())
     * .then((entry) => console.log(`Entry ${entry.sys.id} unpublished.`))
     * .catch(console.error)
     * ```
     */
    unpublish: () => Promise<Entry>;
    /**
     * Archives the object
     * @return Object returned from the server with updated metadata.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.archive())
     * .then((entry) => console.log(`Entry ${entry.sys.id} archived.`))
     * .catch(console.error)
     * ```
     */
    archive: () => Promise<Entry>;
    /**
     * Unarchives the object
     * @return Object returned from the server with updated metadata.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.unarchive())
     * .then((entry) => console.log(`Entry ${entry.sys.id} unarchived.`))
     * .catch(console.error)
     * ```
     */
    unarchive: () => Promise<Entry>;
    /**
     * Gets all snapshots of an entry
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.getSnapshots())
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     * ```
     */
    getSnapshots: (query?: {}) => Promise<import("./common-types").Collection<import("./export-types").Snapshot<EntryProps<Record<string, any>>>, import("./export-types").SnapshotProps<EntryProps<Record<string, any>>>>>;
    /**
     * Gets a snapshot of an entry
     * @param snapshotId - Id of the snapshot
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.getSnapshot('<snapshot_id>'))
     * .then((snapshot) => console.log(snapshot))
     * .catch(console.error)
     * ```
     */
    getSnapshot: (snapshotId: string) => Promise<import("./export-types").Snapshot<EntryProps<Record<string, any>>>>;
    /**
     * Creates a new task for an entry
     * @param data Object representation of the Task to be created
     * @returns Promise for the newly created Task
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => entry.createTask({
     *   body: 'Something left to do',
     *   assignedTo: '<user-id>',
     *   status: 'active'
     * }))
     * .then((task) => console.log(task))
     * .catch(console.error)
     * ```
     */
    createTask: (data: CreateTaskProps) => Promise<import("./entities/task").Task>;
    /**
     * Gets all tasks of an entry
     * @returns
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => entry.getTasks())
     * .then((tasks) => console.log(tasks))
     * .catch(console.error)
     * ```
     */
    getTasks: () => Promise<import("./common-types").Collection<import("./entities/task").Task, import("./entities/task").TaskProps>>;
    /**
     * Gets a task of an entry
     * @returns
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => entry.getTask(`<task-id>`))
     * .then((task) => console.log(task))
     * .catch(console.error)
     * ```
     */
    getTask: (id: string) => Promise<import("./entities/task").Task>;
    /**
     * Checks if the entry is published. A published entry might have unpublished changes
     */
    isPublished: () => boolean;
    /**
     * Checks if the entry is updated. This means the entry was previously published but has unpublished changes.
     */
    isUpdated: () => boolean;
    /**
     * Checks if the entry is in draft mode. This means it is not published.
     */
    isDraft: () => boolean;
    /**
     * Checks if entry is archived. This means it's not exposed to the Delivery/Preview APIs.
     */
    isArchived: () => boolean;
    /**
     * Recursively collects references of an entry and their descendants
     */
    references: (options?: EntryReferenceOptionsProps | undefined) => Promise<import("./common-types").Collection<Entry, EntryProps<Record<string, any>>>>;
};
