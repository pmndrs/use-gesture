function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { createRequestConfig } from 'contentful-sdk-core';
import entities from './entities';
export default function createClientApi(makeRequest) {
  var _entities$space = entities.space,
      wrapSpace = _entities$space.wrapSpace,
      wrapSpaceCollection = _entities$space.wrapSpaceCollection;
  var wrapUser = entities.user.wrapUser;
  var _entities$personalAcc = entities.personalAccessToken,
      wrapPersonalAccessToken = _entities$personalAcc.wrapPersonalAccessToken,
      wrapPersonalAccessTokenCollection = _entities$personalAcc.wrapPersonalAccessTokenCollection;
  var _entities$organizatio = entities.organization,
      wrapOrganization = _entities$organizatio.wrapOrganization,
      wrapOrganizationCollection = _entities$organizatio.wrapOrganizationCollection;
  var wrapTeamCollection = entities.team.wrapTeamCollection;
  var wrapUsageCollection = entities.usage.wrapUsageCollection;
  return {
    /**
     * Gets all spaces
     * @return Promise for a collection of Spaces
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpaces()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getSpaces: function getSpaces() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return makeRequest({
        entityType: 'Space',
        action: 'getMany',
        params: {
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapSpaceCollection(makeRequest, data);
      });
    },

    /**
     * Gets a space
     * @param spaceId - Space ID
     * @return Promise for a Space
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => console.log(space))
     * .catch(console.error)
     * ```
     */
    getSpace: function getSpace(spaceId) {
      return makeRequest({
        entityType: 'Space',
        action: 'get',
        params: {
          spaceId: spaceId
        }
      }).then(function (data) {
        return wrapSpace(makeRequest, data);
      });
    },

    /**
     * Creates a space
     * @param spaceData - Object representation of the Space to be created
     * @param organizationId - Organization ID, if the associated token can manage more than one organization.
     * @return Promise for the newly created Space
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.createSpace({
     *   name: 'Name of new space'
     * })
     * .then((space) => console.log(space))
     * .catch(console.error)
     * ```
     */
    createSpace: function createSpace(spaceData, organizationId) {
      return makeRequest({
        entityType: 'Space',
        action: 'create',
        params: {
          organizationId: organizationId
        },
        payload: spaceData
      }).then(function (data) {
        return wrapSpace(makeRequest, data);
      });
    },

    /**
     * Gets an organization
     * @param  id - Organization ID
     * @return Promise for a Organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => console.log(org))
     * .catch(console.error)
     * ```
     */
    getOrganization: function getOrganization(id) {
      return makeRequest({
        entityType: 'Organization',
        action: 'get',
        params: {
          organizationId: id
        }
      }).then(function (data) {
        return wrapOrganization(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Organizations
     * @return Promise for a collection of Organizations
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganizations()
     * .then(result => console.log(result.items))
     * .catch(console.error)
     * ```
     */
    getOrganizations: function getOrganizations() {
      return makeRequest({
        entityType: 'Organization',
        action: 'getMany'
      }).then(function (data) {
        return wrapOrganizationCollection(makeRequest, data);
      });
    },

    /**
     * Gets the authenticated user
     * @return Promise for a User
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getCurrentUser()
     * .then(user => console.log(user.firstName))
     * .catch(console.error)
     * ```
     */
    getCurrentUser: function getCurrentUser(params) {
      return makeRequest({
        entityType: 'User',
        action: 'getCurrent',
        params: params
      }).then(function (data) {
        return wrapUser(makeRequest, data);
      });
    },

    /**
     * Creates a personal access token
     * @param data - personal access token config
     * @return Promise for a Token
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.createPersonalAccessToken(
     *  {
     *    "name": "My Token",
     *    "scope": [
     *      "content_management_manage"
     *    ]
     *  }
     * )
     * .then(personalAccessToken => console.log(personalAccessToken.token))
     * .catch(console.error)
     * ```
     */
    createPersonalAccessToken: function createPersonalAccessToken(data) {
      return makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'create',
        params: {},
        payload: data
      }).then(function (response) {
        return wrapPersonalAccessToken(makeRequest, response);
      });
    },

    /**
     * Gets a personal access token
     * @param data - personal access token config
     * @return Promise for a Token
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getPersonalAccessToken(tokenId)
     * .then(token => console.log(token.token))
     * .catch(console.error)
     * ```
     */
    getPersonalAccessToken: function getPersonalAccessToken(tokenId) {
      return makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'get',
        params: {
          tokenId: tokenId
        }
      }).then(function (data) {
        return wrapPersonalAccessToken(makeRequest, data);
      });
    },

    /**
     * Gets all personal access tokens
     * @return Promise for a Token
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getPersonalAccessTokens()
     * .then(response => console.log(reponse.items))
     * .catch(console.error)
     * ```
     */
    getPersonalAccessTokens: function getPersonalAccessTokens() {
      return makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'getMany',
        params: {}
      }).then(function (data) {
        return wrapPersonalAccessTokenCollection(makeRequest, data);
      });
    },

    /**
     * Get organization usage grouped by {@link UsageMetricEnum metric}
     *
     * @param organizationId - Id of an organization
     * @param query - Query parameters
     * @return Promise of a collection of usages
     * @example ```javascript
     *
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganizationUsage('<organizationId>', {
     *    'metric[in]': 'cma,gql',
     *    'dateRange.startAt': '2019-10-22',
     *    'dateRange.endAt': '2019-11-10'
     *    }
     * })
     * .then(result => console.log(result.items))
     * .catch(console.error)
     * ```
     */
    getOrganizationUsage: function getOrganizationUsage(organizationId) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return makeRequest({
        entityType: 'Usage',
        action: 'getManyForOrganization',
        params: {
          organizationId: organizationId,
          query: query
        }
      }).then(function (data) {
        return wrapUsageCollection(makeRequest, data);
      });
    },

    /**
     * Get organization usage grouped by space and metric
     *
     * @param organizationId - Id of an organization
     * @param query - Query parameters
     * @return Promise of a collection of usages
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpaceUsage('<organizationId>', {
     *    skip: 0,
     *    limit: 10,
     *    'metric[in]': 'cda,cpa,gql',
     *    'dateRange.startAt': '2019-10-22',
     *    'dateRange.endAt': '2020-11-30'
     *    }
     * })
     * .then(result => console.log(result.items))
     * .catch(console.error)
     * ```
     */
    getSpaceUsage: function getSpaceUsage(organizationId) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return makeRequest({
        entityType: 'Usage',
        action: 'getManyForSpace',
        params: {
          organizationId: organizationId,
          query: query
        }
      }).then(function (data) {
        return wrapUsageCollection(makeRequest, data);
      });
    },

    /**
     * Make a custom request to the Contentful management API's /spaces endpoint
     * @param opts - axios request options (https://github.com/mzabriskie/axios)
     * @return Promise for the response data
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.rawRequest({
     *   method: 'GET',
     *   url: '/custom/path'
     * })
     * .then((responseData) => console.log(responseData))
     * .catch(console.error)
     * ```
     */
    rawRequest: function rawRequest(_ref) {
      var url = _ref.url,
          config = _objectWithoutProperties(_ref, ["url"]);

      return makeRequest({
        entityType: 'Http',
        action: 'request',
        params: {
          url: url,
          config: config
        }
      });
    }
  };
}