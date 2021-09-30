import { createRequestConfig } from 'contentful-sdk-core';
import entities from './entities';
import { wrapReleaseAction, wrapReleaseActionCollection } from './entities/release-action';
import { wrapRelease, wrapReleaseCollection } from './entities/release';
import { wrapTag, wrapTagCollection } from './entities/tag';

/**
 * Creates API object with methods to access the Environment API
 * @param {ContentfulEnvironmentAPI} makeRequest - function to make requests via an adapter
 * @return {ContentfulSpaceAPI}
 */
export default function createEnvironmentApi(makeRequest) {
  var wrapEnvironment = entities.environment.wrapEnvironment;
  var _entities$contentType = entities.contentType,
      wrapContentType = _entities$contentType.wrapContentType,
      wrapContentTypeCollection = _entities$contentType.wrapContentTypeCollection;
  var _entities$entry = entities.entry,
      wrapEntry = _entities$entry.wrapEntry,
      wrapEntryCollection = _entities$entry.wrapEntryCollection;
  var _entities$asset = entities.asset,
      wrapAsset = _entities$asset.wrapAsset,
      wrapAssetCollection = _entities$asset.wrapAssetCollection;
  var wrapAssetKey = entities.assetKey.wrapAssetKey;
  var _entities$locale = entities.locale,
      wrapLocale = _entities$locale.wrapLocale,
      wrapLocaleCollection = _entities$locale.wrapLocaleCollection;
  var wrapSnapshotCollection = entities.snapshot.wrapSnapshotCollection;
  var _entities$editorInter = entities.editorInterface,
      wrapEditorInterface = _entities$editorInter.wrapEditorInterface,
      wrapEditorInterfaceCollection = _entities$editorInter.wrapEditorInterfaceCollection;
  var wrapUpload = entities.upload.wrapUpload;
  var _entities$extension = entities.extension,
      wrapExtension = _entities$extension.wrapExtension,
      wrapExtensionCollection = _entities$extension.wrapExtensionCollection;
  var _entities$appInstalla = entities.appInstallation,
      wrapAppInstallation = _entities$appInstalla.wrapAppInstallation,
      wrapAppInstallationCollection = _entities$appInstalla.wrapAppInstallationCollection;
  var wrapBulkAction = entities.bulkAction.wrapBulkAction;
  return {
    /**
     * Deletes the environment
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.delete())
     * .then(() => console.log('Environment deleted.'))
     * .catch(console.error)
     * ```
     */
    "delete": function deleteEnvironment() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'delete',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(function () {// noop
      });
    },

    /**
     * Updates the environment
     * @return Promise for the updated environment.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => {
     *   environment.name = 'New name'
     *   return environment.update()
     * })
     * .then((environment) => console.log(`Environment ${environment.sys.id} renamed.`)
     * .catch(console.error)
     * ```
     */
    update: function updateEnvironment() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'update',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: raw
      }).then(function (data) {
        return wrapEnvironment(makeRequest, data);
      });
    },

    /**
     * Creates SDK Entry object (locally) from entry data
     * @param entryData - Entry Data
     * @return Entry
     * @example ```javascript
     * environment.getEntry('entryId').then(entry => {
     *
     *   // Build a plainObject in order to make it usable for React (saving in state or redux)
     *   const plainObject = entry.toPlainObject();
     *
     *   // The entry is being updated in some way as plainObject:
     *   const updatedPlainObject = {
     *     ...plainObject,
     *     fields: {
     *       ...plainObject.fields,
     *       title: {
     *         'en-US': 'updatedTitle'
     *       }
     *     }
     *   };
     *
     *   // Rebuild an sdk object out of the updated plainObject:
     *   const entryWithMethodsAgain = environment.getEntryFromData(updatedPlainObject);
     *
     *   // Update with help of the sdk method:
     *   entryWithMethodsAgain.update();
     *
     * });
     * ```
     **/
    getEntryFromData: function getEntryFromData(entryData) {
      return wrapEntry(makeRequest, entryData);
    },

    /**
     * Creates SDK Asset object (locally) from entry data
     * @param assetData - Asset ID
     * @return Asset
     * @example ```javascript
     * environment.getAsset('asset_id').then(asset => {
     *
     *   // Build a plainObject in order to make it usable for React (saving in state or redux)
     *   const plainObject = asset.toPlainObject();
     *
     *   // The asset is being updated in some way as plainObject:
     *   const updatedPlainObject = {
     *     ...plainObject,
     *     fields: {
     *       ...plainObject.fields,
     *       title: {
     *         'en-US': 'updatedTitle'
     *       }
     *     }
     *   };
     *
     *   // Rebuild an sdk object out of the updated plainObject:
     *   const assetWithMethodsAgain = environment.getAssetFromData(updatedPlainObject);
     *
     *   // Update with help of the sdk method:
     *   assetWithMethodsAgain.update();
     *
     * });
     * ```
     */
    getAssetFromData: function getAssetFromData(assetData) {
      return wrapAsset(makeRequest, assetData);
    },

    /**
     *
     * @description Get a BulkAction by ID.
     *  See: https://www.contentful.com/developers/docs/references/content-management-api/#/reference/bulk-actions/bulk-action
     * @param bulkActionId - ID of the BulkAction to fetch
     * @returns - Promise with the BulkAction
     *
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getBulkAction('<bulk_action_id>'))
     * .then((bulkAction) => console.log(bulkAction))
     * ```
     */
    getBulkAction: function getBulkAction(bulkActionId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'BulkAction',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          bulkActionId: bulkActionId
        }
      }).then(function (data) {
        return wrapBulkAction(makeRequest, data);
      });
    },

    /**
     * @description Creates a BulkAction that will attempt to publish all items contained in the payload.
     * See: https://www.contentful.com/developers/docs/references/content-management-api/#/reference/bulk-actions/publish-bulk-action
     * @param {BulkActionPayload} payload - Object containing the items to be processed in the bulkAction
     * @returns - Promise with the BulkAction
     *
     * @example
     *
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * const payload = {
     *  entities: {
     *    sys: { type: 'Array' }
     *    items: [
     *      { sys: { type: 'Link', id: '<entry-id>', linkType: 'Entry', version: 2 } }
     *    ]
     *  }
     * }
     *
     * // Using Thenables
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.createPublishBulkAction(payload))
     * .then((bulkAction) => console.log(bulkAction.waitProcessing()))
     * .catch(console.error)
     *
     * // Using async/await
     * try {
     *  const space = await client.getSpace('<space_id>')
     *  const environment = await space.getEnvironment('<environment_id>')
     *  const bulkActionInProgress = await environment.createPublishBulkAction(payload)
     *
     *  // You can wait for a recently created BulkAction to be processed by using `bulkAction.waitProcessing()`
     *  const bulkActionCompleted = await bulkActionInProgress.waitProcessing()
     *  console.log(bulkActionCompleted)
     * } catch (error) {
     *  console.log(error)
     * }
     * ```
     */
    createPublishBulkAction: function createPublishBulkAction(payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'BulkAction',
        action: 'publish',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: payload
      }).then(function (data) {
        return wrapBulkAction(makeRequest, data);
      });
    },

    /**
     * @description Creates a BulkAction that will attempt to validate all items contained in the payload.
     * See: https://www.contentful.com/developers/docs/references/content-management-api/#/reference/bulk-actions/validate-bulk-action
     * @param {BulkActionPayload} payload - Object containing the items to be processed in the bulkAction
     * @returns - Promise with the BulkAction
     *
     * @example
     *
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * const payload = {
     *  action: 'publish',
     *  entities: {
     *    sys: { type: 'Array' }
     *    items: [
     *      { sys: { type: 'Link', id: '<entry-id>', linkType: 'Entry' } }
     *    ]
     *  }
     * }
     *
     * // Using Thenables
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.createValidateBulkAction(payload))
     * .then((bulkAction) => console.log(bulkAction.waitProcessing()))
     * .catch(console.error)
     *
     * // Using async/await
     * try {
     *  const space = await client.getSpace('<space_id>')
     *  const environment = await space.getEnvironment('<environment_id>')
     *  const bulkActionInProgress = await environment.createValidateBulkAction(payload)
     *
     *  // You can wait for a recently created BulkAction to be processed by using `bulkAction.waitProcessing()`
     *  const bulkActionCompleted = await bulkActionInProgress.waitProcessing()
     *  console.log(bulkActionCompleted)
     * } catch (error) {
     *  console.log(error)
     * }
     * ```
     */
    createValidateBulkAction: function createValidateBulkAction(payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'BulkAction',
        action: 'validate',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: payload
      }).then(function (data) {
        return wrapBulkAction(makeRequest, data);
      });
    },

    /**
     * @description Creates a BulkAction that will attempt to unpublish all items contained in the payload.
     * See: https://www.contentful.com/developers/docs/references/content-management-api/#/reference/bulk-actions/unpublish-bulk-action
     * @param {BulkActionPayload} payload - Object containing the items to be processed in the bulkAction
     * @returns - Promise with the BulkAction
     *
     * @example
     *
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * const payload = {
     *  entities: {
     *    sys: { type: 'Array' }
     *    items: [
     *      { sys: { type: 'Link', id: 'entry-id', linkType: 'Entry' } }
     *    ]
     *  }
     * }
     *
     * // Using Thenables
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.createUnpublishBulkAction(payload))
     * .then((bulkAction) => console.log(bulkAction.waitProcessing()))
     * .catch(console.error)
     *
     * // Using async/await
     * try {
     *  const space = await clientgetSpace('<space_id>')
     *  const environment = await space.getEnvironment('<environment_id>')
     *  const bulkActionInProgress = await environment.createUnpublishBulkAction(payload)
     *
     *  // You can wait for a recently created BulkAction to be processed by using `bulkAction.waitProcessing()`
     *  const bulkActionCompleted = await bulkActionInProgress.waitProcessing()
     *  console.log(bulkActionCompleted)
     * } catch (error) {
     *  console.log(error)
     * }
     * ```
     */
    createUnpublishBulkAction: function createUnpublishBulkAction(payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'BulkAction',
        action: 'unpublish',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: payload
      }).then(function (data) {
        return wrapBulkAction(makeRequest, data);
      });
    },

    /**
     * Gets a Content Type
     * @param contentTypeId - Content Type ID
     * @return Promise for a Content Type
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getContentType('<content_type_id>'))
     * .then((contentType) => console.log(contentType))
     * .catch(console.error)
     * ```
     */
    getContentType: function getContentType(contentTypeId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ContentType',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId: contentTypeId
        }
      }).then(function (data) {
        return wrapContentType(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Content Types
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Content Types
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getContentTypes())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getContentTypes: function getContentTypes() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ContentType',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapContentTypeCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Content Type
     * @param data - Object representation of the Content Type to be created
     * @return Promise for the newly created Content Type
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createContentType({
     *   name: 'Blog Post',
     *   fields: [
     *     {
     *       id: 'title',
     *       name: 'Title',
     *       required: true,
     *       localized: false,
     *       type: 'Text'
     *     }
     *   ]
     * }))
     * .then((contentType) => console.log(contentType))
     * .catch(console.error)
     * ```
     */
    createContentType: function createContentType(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ContentType',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapContentType(makeRequest, response);
      });
    },

    /**
     * Creates a Content Type with a custom ID
     * @param contentTypeId - Content Type ID
     * @param data - Object representation of the Content Type to be created
     * @return Promise for the newly created Content Type
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createContentTypeWithId('<content-type-id>', {
     *   name: 'Blog Post',
     *   fields: [
     *     {
     *       id: 'title',
     *       name: 'Title',
     *       required: true,
     *       localized: false,
     *       type: 'Text'
     *     }
     *   ]
     * }))
     * .then((contentType) => console.log(contentType))
     * .catch(console.error)
     * ```
     */
    createContentTypeWithId: function createContentTypeWithId(contentTypeId, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ContentType',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId: contentTypeId
        },
        payload: data
      }).then(function (response) {
        return wrapContentType(makeRequest, response);
      });
    },

    /**
     * Gets an EditorInterface for a ContentType
     * @param contentTypeId - Content Type ID
     * @return Promise for an EditorInterface
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEditorInterfaceForContentType('<content_type_id>'))
     * .then((EditorInterface) => console.log(EditorInterface))
     * .catch(console.error)
     * ```
     */
    getEditorInterfaceForContentType: function getEditorInterfaceForContentType(contentTypeId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EditorInterface',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId: contentTypeId
        }
      }).then(function (response) {
        return wrapEditorInterface(makeRequest, response);
      });
    },

    /**
     * Gets all EditorInterfaces
     * @return Promise for a collection of EditorInterface
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEditorInterfaces())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEditorInterfaces: function getEditorInterfaces() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EditorInterface',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(function (response) {
        return wrapEditorInterfaceCollection(makeRequest, response);
      });
    },

    /**
     * Gets an Entry
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
     * @param id - Entry ID
     * @param query - Object with search parameters. In this method it's only useful for `locale`.
     * @return Promise for an Entry
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
     * .then((entry) => console.log(entry))
     * .catch(console.error)
     * ```
     */
    getEntry: function getEntry(id) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

    /**
     * Deletes an Entry of this environement
     * @param id - Entry ID
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.deleteEntry("4bmLXiuviAZH3jkj5DLRWE"))
     * .then(() => console.log('Entry deleted.'))
     * .catch(console.error)
     * ```
     */
    deleteEntry: function deleteEntry(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'delete',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: id
        }
      }).then(function () {// noop
      });
    },

    /**
     * Gets a collection of Entries
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Entries
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntries({'content_type': 'foo'})) // you can add more queries as 'key': 'value'
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEntries: function getEntries() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapEntryCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Entry
     * @param contentTypeId - The Content Type ID of the newly created Entry
     * @param data - Object representation of the Entry to be created
     * @return Promise for the newly created Entry
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createEntry('<content_type_id>', {
     *   fields: {
     *     title: {
     *       'en-US': 'Entry title'
     *     }
     *   }
     * }))
     * .then((entry) => console.log(entry))
     * .catch(console.error)
     * ```
     */
    createEntry: function createEntry(contentTypeId, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId: contentTypeId
        },
        payload: data
      }).then(function (response) {
        return wrapEntry(makeRequest, response);
      });
    },

    /**
     * Creates a Entry with a custom ID
     * @param contentTypeId - The Content Type of the newly created Entry
     * @param id - Entry ID
     * @param data - Object representation of the Entry to be created
     * @return Promise for the newly created Entry
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create entry
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createEntryWithId('<content_type_id>', '<entry_id>', {
     *   fields: {
     *     title: {
     *       'en-US': 'Entry title'
     *     }
     *   }
     * }))
     * .then((entry) => console.log(entry))
     * .catch(console.error)
     * ```
     */
    createEntryWithId: function createEntryWithId(contentTypeId, id, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: id,
          contentTypeId: contentTypeId
        },
        payload: data
      }).then(function (response) {
        return wrapEntry(makeRequest, response);
      });
    },

    /**
     * Get entry references
     * @param entryId - Entry ID
     * @param {Object} options.maxDepth - Level of the entry descendants from 1 up to 10 maximum
     * @returns Promise of Entry references
     * @example ```javascript
     * const contentful = require('contentful-management');
     *
     * const client = contentful.createClient({
     *  accessToken: '<contentful_management_api_key>
     * })
     *
     * // Get entry references
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntryReferences('<entry_id>', {maxDepth: number}))
     * .then((entry) => console.log(entry.includes))
     * // or
     * .then((environment) => environment.getEntry('<entry_id>')).then((entry) => entry.references({maxDepth: number}))
     * .catch(console.error)
     * ```
     */
    getEntryReferences: function getEntryReferences(entryId, options) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'references',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: entryId,
          maxDepth: options === null || options === void 0 ? void 0 : options.maxDepth
        }
      }).then(function (response) {
        return wrapEntryCollection(makeRequest, response);
      });
    },

    /**
     * Gets an Asset
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
     * @param id - Asset ID
     * @param query - Object with search parameters. In this method it's only useful for `locale`.
     * @return Promise for an Asset
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getAsset('<asset_id>'))
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    getAsset: function getAsset(id) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          assetId: id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Assets
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Assets
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getAssets())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getAssets: function getAssets() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapAssetCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Asset. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
     * @param data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
     * @return Promise for the newly created Asset
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create asset
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createAsset({
     *   fields: {
     *     title: {
     *       'en-US': 'Playsam Streamliner'
     *    },
     *    file: {
     *       'en-US': {
     *         contentType: 'image/jpeg',
     *        fileName: 'example.jpeg',
     *        upload: 'https://example.com/example.jpg'
     *      }
     *    }
     *   }
     * }))
     * .then((asset) => asset.processForLocale("en-US")) // OR asset.processForAllLocales()
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    createAsset: function createAsset(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapAsset(makeRequest, response);
      });
    },

    /**
     * Creates a Asset with a custom ID. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
     * @param id - Asset ID
     * @param data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
     * @return Promise for the newly created Asset
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create asset
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createAssetWithId('<asset_id>', {
     *   title: {
     *     'en-US': 'Playsam Streamliner'
     *   },
     *   file: {
     *     'en-US': {
     *       contentType: 'image/jpeg',
     *       fileName: 'example.jpeg',
     *       upload: 'https://example.com/example.jpg'
     *     }
     *   }
     * }))
     * .then((asset) => asset.process())
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    createAssetWithId: function createAssetWithId(id, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          assetId: id
        },
        payload: data
      }).then(function (response) {
        return wrapAsset(makeRequest, response);
      });
    },

    /**
     * Creates a Asset based on files. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
     * @param data - Object representation of the Asset to be created. Note that the field object should have an uploadFrom property on asset creation, which will be removed and replaced with an url property when processing is finished.
     * @param data.fields.file.[LOCALE].file - Can be a string, an ArrayBuffer or a Stream.
     * @return Promise for the newly created Asset
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createAssetFromFiles({
     *   fields: {
     *     file: {
     *       'en-US': {
     *          contentType: 'image/jpeg',
     *          fileName: 'filename_english.jpg',
     *          file: createReadStream('path/to/filename_english.jpg')
     *       },
     *       'de-DE': {
     *          contentType: 'image/svg+xml',
     *          fileName: 'filename_german.svg',
     *          file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
     *       }
     *     }
     *   }
     * }))
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    createAssetFromFiles: function createAssetFromFiles(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'createFromFiles',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapAsset(makeRequest, response);
      });
    },

    /**
     * Creates an asset key for signing asset URLs (Embargoed Assets)
     * @param data Object with request payload
     * @param data.expiresAt number a UNIX timestamp in the future (but not more than 48 hours from time of calling)
     * @return Promise for the newly created AssetKey
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create assetKey
     * now = () => Math.floor(Date.now() / 1000)
     * const withExpiryIn1Hour = () => now() + 1 * 60 * 60
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createAssetKey({ expiresAt: withExpiryIn1Hour() }))
     * .then((policy, secret) => console.log({ policy, secret }))
     * .catch(console.error)
     * ```
     */
    createAssetKey: function createAssetKey(payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AssetKey',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: payload
      }).then(function (data) {
        return wrapAssetKey(makeRequest, data);
      });
    },

    /**
     * Gets an Upload
     * @param id - Upload ID
     * @return Promise for an Upload
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * const uploadStream = createReadStream('path/to/filename_english.jpg')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getUpload('<upload-id>')
     * .then((upload) => console.log(upload))
     * .catch(console.error)
     */
    getUpload: function getUpload(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Upload',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          uploadId: id
        }
      }).then(function (data) {
        return wrapUpload(makeRequest, data);
      });
    },

    /**
     * Creates a Upload.
     * @param data - Object with file information.
     * @param data.file - Actual file content. Can be a string, an ArrayBuffer or a Stream.
     * @return Upload object containing information about the uploaded file.
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * const uploadStream = createReadStream('path/to/filename_english.jpg')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createUpload({file: uploadStream})
     * .then((upload) => console.log(upload))
     * .catch(console.error)
     * ```
     */
    createUpload: function createUpload(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Upload',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id
        },
        payload: data
      }).then(function (data) {
        return wrapUpload(makeRequest, data);
      });
    },

    /**
     * Gets a Locale
     * @param localeId - Locale ID
     * @return Promise for an Locale
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getLocale('<locale_id>'))
     * .then((locale) => console.log(locale))
     * .catch(console.error)
     * ```
     */
    getLocale: function getLocale(localeId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          localeId: localeId
        }
      }).then(function (data) {
        return wrapLocale(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Locales
     * @return Promise for a collection of Locales
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getLocales())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getLocales: function getLocales() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(function (data) {
        return wrapLocaleCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Locale
     * @param data - Object representation of the Locale to be created
     * @return Promise for the newly created Locale
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create locale
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createLocale({
     *   name: 'German (Austria)',
     *   code: 'de-AT',
     *   fallbackCode: 'de-DE',
     *   optional: true
     * }))
     * .then((locale) => console.log(locale))
     * .catch(console.error)
     * ```
     */
    createLocale: function createLocale(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapLocale(makeRequest, response);
      });
    },

    /**
     * Gets an UI Extension
     * @param id - Extension ID
     * @return Promise for an UI Extension
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getUiExtension('<extension-id>'))
     * .then((extension) => console.log(extension))
     * .catch(console.error)
     * ```
     */
    getUiExtension: function getUiExtension(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          extensionId: id
        }
      }).then(function (data) {
        return wrapExtension(makeRequest, data);
      });
    },

    /**
     * Gets a collection of UI Extension
     * @return Promise for a collection of UI Extensions
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getUiExtensions()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getUiExtensions: function getUiExtensions() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(function (response) {
        return wrapExtensionCollection(makeRequest, response);
      });
    },

    /**
     * Creates a UI Extension
     * @param data - Object representation of the UI Extension to be created
     * @return Promise for the newly created UI Extension
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createUiExtension({
     *   extension: {
     *     name: 'My awesome extension',
     *     src: 'https://example.com/my',
     *     fieldTypes: [
     *       {
     *         type: 'Symbol'
     *       },
     *       {
     *         type: 'Text'
     *       }
     *     ],
     *     sidebar: false
     *   }
     * }))
     * .then((extension) => console.log(extension))
     * .catch(console.error)
     * ```
     */
    createUiExtension: function createUiExtension(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapExtension(makeRequest, response);
      });
    },

    /**
     * Creates a UI Extension with a custom ID
     * @param id - Extension ID
     * @param data - Object representation of the UI Extension to be created
     * @return Promise for the newly created UI Extension
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createUiExtensionWithId('<extension_id>', {
     *   extension: {
     *     name: 'My awesome extension',
     *     src: 'https://example.com/my',
     *     fieldTypes: [
     *       {
     *         type: 'Symbol'
     *       },
     *       {
     *         type: 'Text'
     *       }
     *     ],
     *     sidebar: false
     *   }
     * }))
     * .then((extension) => console.log(extension))
     * .catch(console.error)
     * ```
     */
    createUiExtensionWithId: function createUiExtensionWithId(id, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          extensionId: id
        },
        payload: data
      }).then(function (response) {
        return wrapExtension(makeRequest, response);
      });
    },

    /**
     * Gets an App Installation
     * @param appDefinitionId - AppDefinition ID
     * @param data - AppInstallation data
     * @return Promise for an App Installation
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     *  .then((space) => space.getEnvironment('<environment-id>'))
     *  .then((environment) => environment.createAppInstallation('<app_definition_id>', {
     *    parameters: {
     *      someParameter: someValue
     *    }
     *   })
     *  .then((appInstallation) => console.log(appInstallation))
     *  .catch(console.error)
     *  ```
     */
    createAppInstallation: function createAppInstallation(appDefinitionId, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'upsert',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          appDefinitionId: appDefinitionId
        },
        payload: data
      }).then(function (payload) {
        return wrapAppInstallation(makeRequest, payload);
      });
    },

    /**
     * Gets an App Installation
     * @param id - AppDefintion ID
     * @return Promise for an App Installation
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     *  .then((space) => space.getEnvironment('<environment-id>'))
     *  .then((environment) => environment.getAppInstallation('<app-definition-id>'))
     *  .then((appInstallation) => console.log(appInstallation))
     *  .catch(console.error)
     *  ```
     */
    getAppInstallation: function getAppInstallation(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          appDefinitionId: id
        }
      }).then(function (data) {
        return wrapAppInstallation(makeRequest, data);
      });
    },

    /**
     * Gets a collection of App Installation
     * @return Promise for a collection of App Installations
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     *  .then((space) => space.getEnvironment('<environment-id>'))
     *  .then((environment) => environment.getAppInstallations()
     *  .then((response) => console.log(response.items))
     *  .catch(console.error)
     *  ```
     */
    getAppInstallations: function getAppInstallations() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(function (data) {
        return wrapAppInstallationCollection(makeRequest, data);
      });
    },

    /**
     * Gets all snapshots of an entry
     * @func getEntrySnapshots
     * @param entryId - Entry ID
     * @param query - query additional query paramaters
     * @return Promise for a collection of Entry Snapshots
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntrySnapshots('<entry_id>'))
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     * ```
     */
    getEntrySnapshots: function getEntrySnapshots(entryId) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForEntry',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: entryId,
          query: query
        }
      }).then(function (data) {
        return wrapSnapshotCollection(makeRequest, data);
      });
    },

    /**
     * Gets all snapshots of a contentType
     * @func getContentTypeSnapshots
     * @param contentTypeId - Content Type ID
     * @param query - query additional query paramaters
     * @return Promise for a collection of Content Type Snapshots
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getContentTypeSnapshots('<contentTypeId>'))
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     * ```
     */
    getContentTypeSnapshots: function getContentTypeSnapshots(contentTypeId) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForContentType',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId: contentTypeId,
          query: query
        }
      }).then(function (data) {
        return wrapSnapshotCollection(makeRequest, data);
      });
    },
    createTag: function createTag(id, name, visibility) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Tag',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          tagId: id
        },
        payload: {
          name: name,
          sys: {
            visibility: visibility !== null && visibility !== void 0 ? visibility : 'private'
          }
        }
      }).then(function (data) {
        return wrapTag(makeRequest, data);
      });
    },
    getTags: function getTags() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Tag',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapTagCollection(makeRequest, data);
      });
    },
    getTag: function getTag(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Tag',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          tagId: id
        }
      }).then(function (data) {
        return wrapTag(makeRequest, data);
      });
    },

    /**
     * Retrieves a Release by ID
     * @param releaseId
     * @returns Promise containing a wrapped Release
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getRelease('<release_id>'))
     * .then((release) => console.log(release))
     * .catch(console.error)
     * ```
     */
    getRelease: function getRelease(releaseId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId
        }
      }).then(function (data) {
        return wrapRelease(makeRequest, data);
      });
    },

    /**
     * Gets a Collection of Releases,
     * @param {ReleaseQueryOptions} query filtering options for the collection result
     * @returns Promise containing a wrapped Release Collection
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getReleases({ 'entities.sys.id[in]': '<asset_id>,<entry_id>' }))
     * .then((releases) => console.log(releases))
     * .catch(console.error)
     * ```
     */
    getReleases: function getReleases(query) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'query',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: query
        }
      }).then(function (data) {
        return wrapReleaseCollection(makeRequest, data);
      });
    },

    /**
     * Creates a new Release with the entities and title in the payload
     * @param payload Object containing the payload in order to create a Release
     * @returns Promise containing a wrapped Release, that has other helper methods within.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * const payload = {
     *   title: 'My Release',
     *   entities: {
     *     sys: { type: 'Array' },
     *     items: [
     *      { sys: { linkType: 'Entry', type: 'Link', id: '<entry_id>' } }
     *     ]
     *   }
     * }
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createRelease(payload))
     * .then((release) => console.log(release))
     * .catch(console.error)
     * ```
     */
    createRelease: function createRelease(payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: payload
      }).then(function (data) {
        return wrapRelease(makeRequest, data);
      });
    },

    /**
     * Updates a Release and replaces all the properties.
     * @param {object} options,
     * @param options.releaseId the ID of the release
     * @param options.payload the payload to be updated in the Release
     * @param options.version Release sys.version that to be updated
     * @returns Promise containing a wrapped Release, that has helper methods within.
     *
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     *
     * const payload = {
     *   title: "Updated Release title",
     *   entities: {
     *     sys: { type: 'Array' },
     *     items: [
     *        { sys: { linkType: 'Entry', type: 'Link', id: '<entry_id>' } }
     *     ]
     *   }
     * }
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.updateRelease({ releaseId: '<release_id>', version: 1, payload } ))
     * .then((release) => console.log(release))
     * .catch(console.error)
     * ```
     */
    updateRelease: function updateRelease(_ref) {
      var releaseId = _ref.releaseId,
          payload = _ref.payload,
          version = _ref.version;
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'update',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId,
          version: version
        },
        payload: payload
      }).then(function (data) {
        return wrapRelease(makeRequest, data);
      });
    },

    /**
     * Deletes a Release by ID - does not delete any entities.
     * @param releaseId the ID of the release
     *
     * @returns Promise containing a wrapped Release, that has helper methods within.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.deleteRelease('<release_id>')
     * .catch(console.error)
     * ```
     */
    deleteRelease: function deleteRelease(releaseId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'delete',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId
        }
      });
    },

    /**
     * Publishes all Entities contained in a Release.
     * @param options.releaseId the ID of the release
     * @param options.version the version of the release that is to be published
     * @returns Promise containing a wrapped Release, that has helper methods within.
     *
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.publishRelease({ releaseId: '<release_id>', version: 1 }))
     * .catch(console.error)
     * ```
     */
    publishRelease: function publishRelease(_ref2) {
      var releaseId = _ref2.releaseId,
          version = _ref2.version;
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'publish',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId,
          version: version
        }
      }).then(function (data) {
        return wrapReleaseAction(makeRequest, data);
      });
    },

    /**
     * Unpublishes all Entities contained in a Release.
     * @param options.releaseId the ID of the release
     * @param options.version the version of the release that is to be published
     * @returns Promise containing a wrapped Release, that has helper methods within.
     *
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.unpublishRelease({ releaseId: '<release_id>', version: 1 }))
     * .catch(console.error)
     * ```
     */
    unpublishRelease: function unpublishRelease(_ref3) {
      var releaseId = _ref3.releaseId,
          version = _ref3.version;
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'unpublish',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId,
          version: version
        }
      }).then(function (data) {
        return wrapReleaseAction(makeRequest, data);
      });
    },

    /**
     * Validates all Entities contained in a Release against an action (publish or unpublish)
     * @param options.releaseId the ID of the release
     * @param options.payload (optional) the type of action to be validated against
     *
     * @returns Promise containing a wrapped Release, that has helper methods within.
     *
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.validateRelease({ releaseId: '<release_id>', payload: { action: 'unpublish' } }))
     * .catch(console.error)
     * ```
     */
    validateRelease: function validateRelease(_ref4) {
      var releaseId = _ref4.releaseId,
          payload = _ref4.payload;
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'validate',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId
        },
        payload: payload
      }).then(function (data) {
        return wrapReleaseAction(makeRequest, data);
      });
    },

    /**
     * Retrieves a ReleaseAction by ID
     * @param params.releaseId The ID of a Release
     * @param params.actionId The ID of a Release Action
     * @returns Promise containing a wrapped ReleaseAction
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getReleaseAction({ releaseId: '<release_id>', actionId: '<action_id>' }))
     * .then((releaseAction) => console.log(releaseAction))
     * .catch(console.error)
     * ```
     */
    getReleaseAction: function getReleaseAction(_ref5) {
      var actionId = _ref5.actionId,
          releaseId = _ref5.releaseId;
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ReleaseAction',
        action: 'get',
        params: {
          actionId: actionId,
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId
        }
      }).then(function (data) {
        return wrapReleaseAction(makeRequest, data);
      });
    },

    /**
     * Gets a Collection of ReleaseActions
     * @param {string} params.releaseId ID of the Release to fetch the actions from
     * @param {ReleaseQueryOptions} params.query filtering options for the collection result
     * @returns Promise containing a wrapped ReleaseAction Collection
     *
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getReleaseActions({ releaseId: '<release_id>', query: { 'sys.id[in]': '<id_1>,<id_2>' } }))
     * .then((releaseActions) => console.log(releaseActions))
     * .catch(console.error)
     * ```
     */
    getReleaseActions: function getReleaseActions(_ref6) {
      var releaseId = _ref6.releaseId,
          query = _ref6.query;
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ReleaseAction',
        action: 'queryForRelease',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId,
          query: query
        }
      }).then(function (data) {
        return wrapReleaseActionCollection(makeRequest, data);
      });
    }
  };
}