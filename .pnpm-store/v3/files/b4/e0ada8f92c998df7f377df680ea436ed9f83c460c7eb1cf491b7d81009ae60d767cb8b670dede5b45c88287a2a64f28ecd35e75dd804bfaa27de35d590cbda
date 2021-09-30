/**
 * Contentful Space API. Contains methods to access any operations at a space
 * level, such as creating and reading entities contained in a space.
 */
import { createRequestConfig } from 'contentful-sdk-core';
import entities from './entities';

/**
 * Creates API object with methods to access the Space API
 * @param {MakeRequest} makeRequest - function to make requests via an adapter
 * @return {ContentfulSpaceAPI}
 */
export default function createSpaceApi(makeRequest) {
  var wrapSpace = entities.space.wrapSpace;
  var _entities$environment = entities.environment,
      wrapEnvironment = _entities$environment.wrapEnvironment,
      wrapEnvironmentCollection = _entities$environment.wrapEnvironmentCollection;
  var _entities$webhook = entities.webhook,
      wrapWebhook = _entities$webhook.wrapWebhook,
      wrapWebhookCollection = _entities$webhook.wrapWebhookCollection;
  var _entities$role = entities.role,
      wrapRole = _entities$role.wrapRole,
      wrapRoleCollection = _entities$role.wrapRoleCollection;
  var _entities$user = entities.user,
      wrapUser = _entities$user.wrapUser,
      wrapUserCollection = _entities$user.wrapUserCollection;
  var _entities$spaceMember = entities.spaceMember,
      wrapSpaceMember = _entities$spaceMember.wrapSpaceMember,
      wrapSpaceMemberCollection = _entities$spaceMember.wrapSpaceMemberCollection;
  var _entities$spaceMember2 = entities.spaceMembership,
      wrapSpaceMembership = _entities$spaceMember2.wrapSpaceMembership,
      wrapSpaceMembershipCollection = _entities$spaceMember2.wrapSpaceMembershipCollection;
  var _entities$teamSpaceMe = entities.teamSpaceMembership,
      wrapTeamSpaceMembership = _entities$teamSpaceMe.wrapTeamSpaceMembership,
      wrapTeamSpaceMembershipCollection = _entities$teamSpaceMe.wrapTeamSpaceMembershipCollection;
  var wrapTeamCollection = entities.team.wrapTeamCollection;
  var _entities$apiKey = entities.apiKey,
      wrapApiKey = _entities$apiKey.wrapApiKey,
      wrapApiKeyCollection = _entities$apiKey.wrapApiKeyCollection;
  var _entities$environment2 = entities.environmentAlias,
      wrapEnvironmentAlias = _entities$environment2.wrapEnvironmentAlias,
      wrapEnvironmentAliasCollection = _entities$environment2.wrapEnvironmentAliasCollection;
  var _entities$previewApiK = entities.previewApiKey,
      wrapPreviewApiKey = _entities$previewApiK.wrapPreviewApiKey,
      wrapPreviewApiKeyCollection = _entities$previewApiK.wrapPreviewApiKeyCollection;
  var _entities$scheduledAc = entities.scheduledAction,
      wrapScheduledAction = _entities$scheduledAc.wrapScheduledAction,
      wrapScheduledActionCollection = _entities$scheduledAc.wrapScheduledActionCollection;
  return {
    /**
     * Deletes the space
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     *   .then((space) => space.delete())
     *   .then(() => console.log('Space deleted.'))
     *   .catch(console.error)
     * ```
     */
    "delete": function deleteSpace() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Space',
        action: 'delete',
        params: {
          spaceId: raw.sys.id
        }
      });
    },

    /**
     * Updates the space
     * @return Promise for the updated space.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => {
     *   space.name = 'New name'
     *   return space.update()
     * })
     * .then((space) => console.log(`Space ${space.sys.id} renamed.`)
     * .catch(console.error)
     * ```
     */
    update: function updateSpace() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Space',
        action: 'update',
        params: {
          spaceId: raw.sys.id
        },
        payload: raw,
        headers: {}
      }).then(function (data) {
        return wrapSpace(makeRequest, data);
      });
    },

    /**
     * Gets an environment
     * @param id - Environment ID
     * @return Promise for an Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environement_id>'))
     * .then((environment) => console.log(environment))
     * .catch(console.error)
     * ```
     */
    getEnvironment: function getEnvironment(environmentId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          environmentId: environmentId
        }
      }).then(function (data) {
        return wrapEnvironment(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Environments
     * @return Promise for a collection of Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironments())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEnvironments: function getEnvironments() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: query
        }
      }).then(function (data) {
        return wrapEnvironmentCollection(makeRequest, data);
      });
    },

    /**
     * Creates an Environement
     * @param data - Object representation of the Environment to be created
     * @return Promise for the newly created Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createEnvironment({ name: 'Staging' }))
     * .then((environment) => console.log(environment))
     * .catch(console.error)
     * ```
     */
    createEnvironment: function createEnvironment() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapEnvironment(makeRequest, response);
      });
    },

    /**
     * Creates an Environment with a custom ID
     * @param id - Environment ID
     * @param data - Object representation of the Environment to be created
     * @param sourceEnvironmentId - ID of the source environment that will be copied to create the new environment. Default is "master"
     * @return Promise for the newly created Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createEnvironmentWithId('<environment-id>', { name: 'Staging'}, 'master'))
     * .then((environment) => console.log(environment))
     * .catch(console.error)
     * ```
     */
    createEnvironmentWithId: function createEnvironmentWithId(id, data, sourceEnvironmentId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          environmentId: id,
          sourceEnvironmentId: sourceEnvironmentId
        },
        payload: data
      }).then(function (response) {
        return wrapEnvironment(makeRequest, response);
      });
    },

    /**
     * Gets a Webhook
     * @param id - Webhook ID
     * @return Promise for a Webhook
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhook('<webhook_id>'))
     * .then((webhook) => console.log(webhook))
     * .catch(console.error)
     * ```
     */
    getWebhook: function getWebhook(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          webhookDefinitionId: id
        }
      }).then(function (data) {
        return wrapWebhook(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Webhooks
     * @return Promise for a collection of Webhooks
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhooks())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getWebhooks: function getWebhooks() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id
        }
      }).then(function (data) {
        return wrapWebhookCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Webhook
     * @param data - Object representation of the Webhook to be created
     * @return Promise for the newly created Webhook
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createWebhook({
     *   'name': 'My webhook',
     *   'url': 'https://www.example.com/test',
     *   'topics': [
     *     'Entry.create',
     *     'ContentType.create',
     *     '*.publish',
     *     'Asset.*'
     *   ]
     * }))
     * .then((webhook) => console.log(webhook))
     * .catch(console.error)
     * ```
     */
    createWebhook: function createWebhook(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(function (data) {
        return wrapWebhook(makeRequest, data);
      });
    },

    /**
     * Creates a Webhook with a custom ID
     * @param id - Webhook ID
     * @param  data - Object representation of the Webhook to be created
     * @return Promise for the newly created Webhook
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createWebhookWithId('<webhook_id>', {
     *   'name': 'My webhook',
     *   'url': 'https://www.example.com/test',
     *   'topics': [
     *     'Entry.create',
     *     'ContentType.create',
     *     '*.publish',
     *     'Asset.*'
     *   ]
     * }))
     * .then((webhook) => console.log(webhook))
     * .catch(console.error)
     * ```
     */
    createWebhookWithId: function createWebhookWithId(id, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          webhookDefinitionId: id
        },
        payload: data
      }).then(function (data) {
        return wrapWebhook(makeRequest, data);
      });
    },

    /**
     * Gets a Role
     * @param id - Role ID
     * @return Promise for a Role
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createRole({
     *   fields: {
     *     title: {
     *       'en-US': 'Role title'
     *     }
     *   }
     * }))
     * .then((role) => console.log(role))
     * .catch(console.error)
     * ```
     */
    getRole: function getRole(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          roleId: id
        }
      }).then(function (data) {
        return wrapRole(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Roles
     * @return Promise for a collection of Roles
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getRoles())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getRoles: function getRoles() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapRoleCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Role
     * @param data - Object representation of the Role to be created
     * @return  Promise for the newly created Role
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.createRole({
     *   name: 'My Role',
     *   description: 'foobar role',
     *   permissions: {
     *     ContentDelivery: 'all',
     *     ContentModel: ['read'],
     *     Settings: []
     *   },
     *   policies: [
     *     {
     *       effect: 'allow',
     *       actions: 'all',
     *       constraint: {
     *         and: [
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Entry'
     *             ]
     *           },
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Asset'
     *             ]
     *           }
     *         ]
     *       }
     *     }
     *   ]
     * }))
     * .then((role) => console.log(role))
     * .catch(console.error)
     * ```
     */
    createRole: function createRole(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(function (data) {
        return wrapRole(makeRequest, data);
      });
    },

    /**
     * Creates a Role with a custom ID
     * @param id - Role ID
     * @param data - Object representation of the Role to be created
     * @return Promise for the newly created Role
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.createRoleWithId('<role-id>', {
     *   name: 'My Role',
     *   description: 'foobar role',
     *   permissions: {
     *     ContentDelivery: 'all',
     *     ContentModel: ['read'],
     *     Settings: []
     *   },
     *   policies: [
     *     {
     *       effect: 'allow',
     *       actions: 'all',
     *       constraint: {
     *         and: [
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Entry'
     *             ]
     *           },
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Asset'
     *             ]
     *           }
     *         ]
     *       }
     *     }
     *   ]
     * }))
     * .then((role) => console.log(role))
     * .catch(console.error)
     * ```
     */
    createRoleWithId: function createRoleWithId(id, roleData) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          roleId: id
        },
        payload: roleData
      }).then(function (data) {
        return wrapRole(makeRequest, data);
      });
    },

    /**
     * Gets a User
     * @param userId - User ID
     * @return Promise for a User
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceUser('id'))
     * .then((user) => console.log(user))
     * .catch(console.error)
     * ```
     */
    getSpaceUser: function getSpaceUser(userId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'User',
        action: 'getForSpace',
        params: {
          spaceId: raw.sys.id,
          userId: userId
        }
      }).then(function (data) {
        return wrapUser(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Users in a space
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise a collection of Users in a space
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceUsers(query))
     * .then((data) => console.log(data))
     * .catch(console.error)
     * ```
     */
    getSpaceUsers: function getSpaceUsers() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'User',
        action: 'getManyForSpace',
        params: {
          spaceId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapUserCollection(makeRequest, data);
      });
    },

    /**
     * Gets a collection of teams for a space
     * @param query
     * @return Promise for a collection of teams for a space
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getTeams())
     * .then((teamsCollection) => console.log(teamsCollection))
     * .catch(console.error)
     * ```
     */
    getTeams: function getTeams() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        limit: 100
      };
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'getManyForSpace',
        params: {
          spaceId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapTeamCollection(makeRequest, data);
      });
    },

    /**
     * Gets a Space Member
     * @param id Get Space Member by user_id
     * @return Promise for a Space Member
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMember(id))
     * .then((spaceMember) => console.log(spaceMember))
     * .catch(console.error)
     * ```
     */
    getSpaceMember: function getSpaceMember(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMember',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          spaceMemberId: id
        }
      }).then(function (data) {
        return wrapSpaceMember(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Space Members
     * @param query
     * @return Promise for a collection of Space Members
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMembers({'limit': 100}))
     * .then((spaceMemberCollection) => console.log(spaceMemberCollection))
     * .catch(console.error)
     * ```
     */
    getSpaceMembers: function getSpaceMembers() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMember',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapSpaceMemberCollection(makeRequest, data);
      });
    },

    /**
     * Gets a Space Membership
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param id - Space Membership ID
     * @return Promise for a Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMembership('id'))
     * .then((spaceMembership) => console.log(spaceMembership))
     * .catch(console.error)
     * ```
     */
    getSpaceMembership: function getSpaceMembership(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          spaceMembershipId: id
        }
      }).then(function (data) {
        return wrapSpaceMembership(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Space Memberships
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Space Memberships
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMemberships({'limit': 100})) // you can add more queries as 'key': 'value'
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getSpaceMemberships: function getSpaceMemberships() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapSpaceMembershipCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Space Membership
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param  data - Object representation of the Space Membership to be created
     * @return Promise for the newly created Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createSpaceMembership({
     *   admin: false,
     *   roles: [
     *     {
     *       type: 'Link',
     *       linkType: 'Role',
     *       id: '<role_id>'
     *     }
     *   ],
     *   email: 'foo@example.com'
     * }))
     * .then((spaceMembership) => console.log(spaceMembership))
     * .catch(console.error)
     * ```
     */
    createSpaceMembership: function createSpaceMembership(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapSpaceMembership(makeRequest, response);
      });
    },

    /**
     * Creates a Space Membership with a custom ID
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param id - Space Membership ID
     * @param data - Object representation of the Space Membership to be created
     * @return Promise for the newly created Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createSpaceMembershipWithId('<space-membership-id>', {
     *   admin: false,
     *   roles: [
     *     {
     *       type: 'Link',
     *       linkType: 'Role',
     *       id: '<role_id>'
     *     }
     *   ],
     *   email: 'foo@example.com'
     * }))
     * .then((spaceMembership) => console.log(spaceMembership))
     * .catch(console.error)
     * ```
     */
    createSpaceMembershipWithId: function createSpaceMembershipWithId(id, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          spaceMembershipId: id
        },
        payload: data
      }).then(function (response) {
        return wrapSpaceMembership(makeRequest, response);
      });
    },

    /**
     * Gets a Team Space Membership
     * @param id - Team Space Membership ID
     * @return Promise for a Team Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getTeamSpaceMembership('team_space_membership_id'))
     * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
     * .catch(console.error)
     * ```
     */
    getTeamSpaceMembership: function getTeamSpaceMembership(teamSpaceMembershipId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          teamSpaceMembershipId: teamSpaceMembershipId
        }
      }).then(function (data) {
        return wrapTeamSpaceMembership(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Team Space Memberships
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Team Space Memberships
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getTeamSpaceMemberships())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getTeamSpaceMemberships: function getTeamSpaceMemberships() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapTeamSpaceMembershipCollection(makeRequest, data);
      });
    },

    /**
    * Creates a Team Space Membership
    * @param id - Team ID
    * @param data - Object representation of the Team Space Membership to be created
    * @return Promise for the newly created Team Space Membership
    * @example ```javascript
    * const contentful = require('contentful-management')
    *
    * const client = contentful.createClient({
    *   accessToken: '<content_management_api_key>'
    * })
    *
    * client.getSpace('<space_id>')
    * .then((space) => space.createTeamSpaceMembership('team_id', {
    *   admin: false,
    *   roles: [
    *    {
          sys: {
    *       type: 'Link',
    *       linkType: 'Role',
    *       id: '<role_id>'
    *      }
    *    }
    *   ],
    * }))
    * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
    * .catch(console.error)
    * ```
    */
    createTeamSpaceMembership: function createTeamSpaceMembership(teamId, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'create',
        params: {
          spaceId: raw.sys.id,
          teamId: teamId
        },
        payload: data
      }).then(function (response) {
        return wrapTeamSpaceMembership(makeRequest, response);
      });
    },

    /**
     * Gets a Api Key
     * @param id - API Key ID
     * @return  Promise for a Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKey('<apikey-id>'))
     * .then((apikey) => console.log(apikey))
     * .catch(console.error)
     * ```
     */
    getApiKey: function getApiKey(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ApiKey',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          apiKeyId: id
        }
      }).then(function (data) {
        return wrapApiKey(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Api Keys
     * @return Promise for a collection of Api Keys
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKeys())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getApiKeys: function getApiKeys() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ApiKey',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id
        }
      }).then(function (data) {
        return wrapApiKeyCollection(makeRequest, data);
      });
    },

    /**
     * Gets a collection of preview Api Keys
     * @return Promise for a collection of Preview Api Keys
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getPreviewApiKeys())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getPreviewApiKeys: function getPreviewApiKeys() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'PreviewApiKey',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id
        }
      }).then(function (data) {
        return wrapPreviewApiKeyCollection(makeRequest, data);
      });
    },

    /**
     * Gets a preview Api Key
     * @param id - Preview API Key ID
     * @return  Promise for a Preview Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getPreviewApiKey('<preview-apikey-id>'))
     * .then((previewApikey) => console.log(previewApikey))
     * .catch(console.error)
     * ```
     */
    getPreviewApiKey: function getPreviewApiKey(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'PreviewApiKey',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          previewApiKeyId: id
        }
      }).then(function (data) {
        return wrapPreviewApiKey(makeRequest, data);
      });
    },

    /**
     * Creates a Api Key
     * @param payload - Object representation of the Api Key to be created
     * @return Promise for the newly created Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createApiKey({
     *   name: 'API Key name',
     *   environments:[
     *    {
     *     sys: {
     *      type: 'Link'
     *      linkType: 'Environment',
     *      id:'<environment_id>'
     *     }
     *    }
     *   ]
     *   }
     * }))
     * .then((apiKey) => console.log(apiKey))
     * .catch(console.error)
     * ```
     */
    createApiKey: function createApiKey(payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ApiKey',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: payload
      }).then(function (data) {
        return wrapApiKey(makeRequest, data);
      });
    },

    /**
     * Creates a Api Key with a custom ID
     * @param id - Api Key ID
     * @param payload - Object representation of the Api Key to be created
     * @return Promise for the newly created Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createApiKeyWithId('<api-key-id>', {
     *   name: 'API Key name'
     *   environments:[
     *    {
     *     sys: {
     *      type: 'Link'
     *      linkType: 'Environment',
     *      id:'<environment_id>'
     *     }
     *    }
     *   ]
     *   }
     * }))
     * .then((apiKey) => console.log(apiKey))
     * .catch(console.error)
     * ```
     */
    createApiKeyWithId: function createApiKeyWithId(id, payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ApiKey',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          apiKeyId: id
        },
        payload: payload
      }).then(function (data) {
        return wrapApiKey(makeRequest, data);
      });
    },

    /**
     * Creates an EnvironmentAlias with a custom ID
     * @param environmentAliasId - EnvironmentAlias ID
     * @param data - Object representation of the EnvironmentAlias to be created
     * @return Promise for the newly created EnvironmentAlias
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createEnvironmentAliasWithId('<environment-alias-id>', {
     *   environment: {
     *     sys: { type: 'Link', linkType: 'Environment', id: 'targetEnvironment' }
     *   }
     * }))
     * .then((environmentAlias) => console.log(environmentAlias))
     * .catch(console.error)
     * ```
     */
    createEnvironmentAliasWithId: function createEnvironmentAliasWithId(environmentAliasId, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          environmentAliasId: environmentAliasId
        },
        payload: data
      }).then(function (response) {
        return wrapEnvironmentAlias(makeRequest, response);
      });
    },

    /**
     * Gets an Environment Alias
     * @param Environment Alias ID
     * @return Promise for an Environment Alias
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironmentAlias('<alias-id>'))
     * .then((alias) => console.log(alias))
     * .catch(console.error)
     * ```
     */
    getEnvironmentAlias: function getEnvironmentAlias(environmentAliasId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          environmentAliasId: environmentAliasId
        }
      }).then(function (data) {
        return wrapEnvironmentAlias(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Environment Aliases
     * @return Promise for a collection of Environment Aliases
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironmentAliases()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEnvironmentAliases: function getEnvironmentAliases() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id
        }
      }).then(function (data) {
        return wrapEnvironmentAliasCollection(makeRequest, data);
      });
    },

    /**
     * Query for scheduled actions in space.
     * @param query - Object with search parameters. The enviroment id field is mandatory. Check the <a href="https://www.contentful.com/developers/docs/references/content-management-api/#/reference/scheduled-actions/scheduled-actions-collection">REST API reference</a> for more details.
     * @return Promise for the scheduled actions query
     *
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  client.getSpace('<space_id>')
     *    .then((space) => space.getScheduledActions({
     *      'environment.sys.id': '<environment_id>',
     *      'sys.status': 'scheduled'
     *    }))
     *    .then((scheduledActionCollection) => console.log(scheduledActionCollection.items))
     *    .catch(console.error)
     * ```
     */
    getScheduledActions: function getScheduledActions(query) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: query
        }
      }).then(function (response) {
        return wrapScheduledActionCollection(makeRequest, response);
      });
    },

    /**
     * Get a Scheduled Action in the current space by environment and ID.
     *
     * @throws if the Scheduled Action cannot be found or the user doesn't have permission to read schedules from the entity of the scheduled action itself.
     * @returns Promise with the Scheduled Action
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  client.getSpace('<space_id>')
     *    .then((space) => space.getScheduledAction({
     *      scheduledActionId: '<scheduled-action-id>',
     *      environmentId: '<environmentId>'
     *    }))
     *    .then((scheduledAction) => console.log(scheduledAction))
     *    .catch(console.error)
     * ```
     */
    getScheduledAction: function getScheduledAction(_ref) {
      var scheduledActionId = _ref.scheduledActionId,
          environmentId = _ref.environmentId;
      var space = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'get',
        params: {
          spaceId: space.sys.id,
          environmentId: environmentId,
          scheduledActionId: scheduledActionId
        }
      }).then(function (scheduledAction) {
        return wrapScheduledAction(makeRequest, scheduledAction);
      });
    },

    /**
     * Creates a scheduled action
     * @param data - Object representation of the scheduled action to be created
     * @return Promise for the newly created scheduled actions
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  client.getSpace('<space_id>')
     *    .then((space) => space.createScheduledAction({
     *      entity: {
     *        sys: {
     *          type: 'Link',
     *          linkType: 'Entry',
     *          id: '<entry_id>'
     *        }
     *      },
     *      environment: {
     *        type: 'Link',
     *        linkType: 'Environment',
     *        id: '<environment_id>'
     *      },
     *      action: 'publish',
     *      scheduledFor: {
     *        dateTime: <ISO_date_string>,
     *        timezone: 'Europe/Berlin'
     *      }
     *    }))
     *    .then((scheduledAction) => console.log(scheduledAction))
     *    .catch(console.error)
     * ```
     */
    createScheduledAction: function createScheduledAction(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapScheduledAction(makeRequest, response);
      });
    },

    /**
     * Update a scheduled action
     * @param {object} options
     * @param options.scheduledActionId the id of the scheduled action to update
     * @param options.version the sys.version of the scheduled action to be updated
     * @param payload the scheduled actions object with updates, omitting sys object
     * @returns Promise containing a wrapped scheduled action with helper methods
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  client.getSpace('<space_id>')
     *    .then((space) => {
     *      return space.createScheduledAction({
     *        entity: {
     *          sys: {
     *            type: 'Link',
     *            linkType: 'Entry',
     *            id: '<entry_id>'
     *          }
     *        },
     *        environment: {
     *          type: 'Link',
     *          linkType: 'Environment',
     *          id: '<environment_id>'
     *        },
     *        action: 'publish',
     *        scheduledFor: {
     *          dateTime: <ISO_date_string>,
     *          timezone: 'Europe/Berlin'
     *        }
     *      })
     *      .then((scheduledAction) => {
     *        const { _sys, ...payload } = scheduledAction;
     *        return space.updateScheduledAction({
     *          ...payload,
     *          scheduledFor: {
     *            ...payload.scheduledFor,
     *            timezone: 'Europe/Paris'
     *          }
     *        })
     *      })
     *    .then((scheduledAction) => console.log(scheduledAction))
     *    .catch(console.error);
     * ```
     */
    updateScheduledAction: function updateScheduledAction(_ref2) {
      var scheduledActionId = _ref2.scheduledActionId,
          payload = _ref2.payload,
          version = _ref2.version;
      var spaceProps = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'update',
        params: {
          spaceId: spaceProps.sys.id,
          version: version,
          scheduledActionId: scheduledActionId
        },
        payload: payload
      }).then(function (response) {
        return wrapScheduledAction(makeRequest, response);
      });
    },

    /**
     * Cancels a Scheduled Action.
     * Only cancels actions that have not yet executed.
     *
     * @param {object} options
     * @param options.scheduledActionId the id of the scheduled action to be canceled
     * @param options.environmentId the environment ID of the scheduled action to be canceled
     * @throws if the Scheduled Action cannot be found or the user doesn't have permissions in the entity in the action.
     * @returns Promise containing a wrapped Scheduled Action with helper methods
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  // Given that an Scheduled Action is scheduled
     *  client.getSpace('<space_id>')
     *    .then((space) => space.deleteScheduledAction({
     *        environmentId: '<environment-id>',
     *        scheduledActionId: '<scheduled-action-id>'
     *     }))
     *     // The scheduled Action sys.status is now 'canceled'
     *    .then((scheduledAction) => console.log(scheduledAction))
     *    .catch(console.error);
     * ```
     */
    deleteScheduledAction: function deleteScheduledAction(_ref3) {
      var scheduledActionId = _ref3.scheduledActionId,
          environmentId = _ref3.environmentId;
      var spaceProps = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'delete',
        params: {
          spaceId: spaceProps.sys.id,
          environmentId: environmentId,
          scheduledActionId: scheduledActionId
        }
      }).then(function (response) {
        return wrapScheduledAction(makeRequest, response);
      });
    }
  };
}