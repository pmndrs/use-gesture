function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as checks from './plain/checks';
import entities from './entities';
export default function createEntryApi(makeRequest) {
  var _entities$entry = entities.entry,
      wrapEntry = _entities$entry.wrapEntry,
      wrapEntryCollection = _entities$entry.wrapEntryCollection;
  var _entities$snapshot = entities.snapshot,
      wrapSnapshot = _entities$snapshot.wrapSnapshot,
      wrapSnapshotCollection = _entities$snapshot.wrapSnapshotCollection;
  var _entities$task = entities.task,
      wrapTask = _entities$task.wrapTask,
      wrapTaskCollection = _entities$task.wrapTaskCollection;

  var getParams = function getParams(self) {
    var entry = self.toPlainObject();
    return {
      params: {
        spaceId: entry.sys.space.sys.id,
        environmentId: entry.sys.environment.sys.id,
        entryId: entry.sys.id
      },
      raw: entry
    };
  };

  return {
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
    update: function update() {
      var _getParams = getParams(this),
          raw = _getParams.raw,
          params = _getParams.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'update',
        params: params,
        payload: raw
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

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
    patch: function patch(ops) {
      var _getParams2 = getParams(this),
          raw = _getParams2.raw,
          params = _getParams2.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'patch',
        params: _objectSpread(_objectSpread({}, params), {}, {
          version: raw.sys.version
        }),
        payload: ops
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

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
    "delete": function del() {
      var _getParams3 = getParams(this),
          params = _getParams3.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'delete',
        params: params
      });
    },

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
    publish: function publish() {
      var _getParams4 = getParams(this),
          raw = _getParams4.raw,
          params = _getParams4.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'publish',
        params: params,
        payload: raw
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

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
    unpublish: function unpublish() {
      var _getParams5 = getParams(this),
          params = _getParams5.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'unpublish',
        params: params
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

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
    archive: function archive() {
      var _getParams6 = getParams(this),
          params = _getParams6.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'archive',
        params: params
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

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
    unarchive: function unarchive() {
      var _getParams7 = getParams(this),
          params = _getParams7.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'unarchive',
        params: params
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

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
    getSnapshots: function getSnapshots() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _getParams8 = getParams(this),
          params = _getParams8.params;

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForEntry',
        params: _objectSpread(_objectSpread({}, params), {}, {
          query: query
        })
      }).then(function (data) {
        return wrapSnapshotCollection(makeRequest, data);
      });
    },

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
    getSnapshot: function getSnapshot(snapshotId) {
      var _getParams9 = getParams(this),
          params = _getParams9.params;

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getForEntry',
        params: _objectSpread(_objectSpread({}, params), {}, {
          snapshotId: snapshotId
        })
      }).then(function (data) {
        return wrapSnapshot(makeRequest, data);
      });
    },

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
    createTask: function createTask(data) {
      var _getParams10 = getParams(this),
          params = _getParams10.params;

      return makeRequest({
        entityType: 'Task',
        action: 'create',
        params: params,
        payload: data
      }).then(function (data) {
        return wrapTask(makeRequest, data);
      });
    },

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
    getTasks: function getTasks() {
      var _getParams11 = getParams(this),
          params = _getParams11.params;

      return makeRequest({
        entityType: 'Task',
        action: 'getAll',
        params: params
      }).then(function (data) {
        return wrapTaskCollection(makeRequest, data);
      });
    },

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
    getTask: function getTask(id) {
      var _getParams12 = getParams(this),
          params = _getParams12.params;

      return makeRequest({
        entityType: 'Task',
        action: 'get',
        params: _objectSpread(_objectSpread({}, params), {}, {
          taskId: id
        })
      }).then(function (data) {
        return wrapTask(makeRequest, data);
      });
    },

    /**
     * Checks if the entry is published. A published entry might have unpublished changes
     */
    isPublished: function isPublished() {
      var raw = this.toPlainObject();
      return checks.isPublished(raw);
    },

    /**
     * Checks if the entry is updated. This means the entry was previously published but has unpublished changes.
     */
    isUpdated: function isUpdated() {
      var raw = this.toPlainObject();
      return checks.isUpdated(raw);
    },

    /**
     * Checks if the entry is in draft mode. This means it is not published.
     */
    isDraft: function isDraft() {
      var raw = this.toPlainObject();
      return checks.isDraft(raw);
    },

    /**
     * Checks if entry is archived. This means it's not exposed to the Delivery/Preview APIs.
     */
    isArchived: function isArchived() {
      var raw = this.toPlainObject();
      return checks.isArchived(raw);
    },

    /**
     * Recursively collects references of an entry and their descendants
     */
    references: function references(options) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'references',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.environment.sys.id,
          entryId: raw.sys.id,
          maxDepth: options === null || options === void 0 ? void 0 : options.maxDepth
        }
      }).then(function (response) {
        return wrapEntryCollection(makeRequest, response);
      });
    }
  };
}