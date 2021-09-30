import { createRequestConfig } from 'contentful-sdk-core';
import entities from './entities';

/**
 * Creates API object with methods to access the Organization API
 * @param {MakeRequest} makeRequest - function to make requests via an adapter
 * @return {ContentfulOrganizationAPI}
 */
export default function createOrganizationApi(makeRequest) {
  var _entities$appDefiniti = entities.appDefinition,
      wrapAppDefinition = _entities$appDefiniti.wrapAppDefinition,
      wrapAppDefinitionCollection = _entities$appDefiniti.wrapAppDefinitionCollection;
  var _entities$user = entities.user,
      wrapUser = _entities$user.wrapUser,
      wrapUserCollection = _entities$user.wrapUserCollection;
  var _entities$organizatio = entities.organizationMembership,
      wrapOrganizationMembership = _entities$organizatio.wrapOrganizationMembership,
      wrapOrganizationMembershipCollection = _entities$organizatio.wrapOrganizationMembershipCollection;
  var _entities$teamMembers = entities.teamMembership,
      wrapTeamMembership = _entities$teamMembers.wrapTeamMembership,
      wrapTeamMembershipCollection = _entities$teamMembers.wrapTeamMembershipCollection;
  var _entities$teamSpaceMe = entities.teamSpaceMembership,
      wrapTeamSpaceMembership = _entities$teamSpaceMe.wrapTeamSpaceMembership,
      wrapTeamSpaceMembershipCollection = _entities$teamSpaceMe.wrapTeamSpaceMembershipCollection;
  var _entities$team = entities.team,
      wrapTeam = _entities$team.wrapTeam,
      wrapTeamCollection = _entities$team.wrapTeamCollection;
  var _entities$spaceMember = entities.spaceMembership,
      wrapSpaceMembership = _entities$spaceMember.wrapSpaceMembership,
      wrapSpaceMembershipCollection = _entities$spaceMember.wrapSpaceMembershipCollection;
  var wrapOrganizationInvitation = entities.organizationInvitation.wrapOrganizationInvitation;
  var wrapAppUpload = entities.appUpload.wrapAppUpload;
  return {
    /**
     * Gets a User
     * @return Promise for a User
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<organization_id>')
     * .then((organization) => organization.getUser('id'))
     * .then((user) => console.log(user))
     * .catch(console.error)
     * ```
     */
    getUser: function getUser(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'User',
        action: 'getForOrganization',
        params: {
          organizationId: raw.sys.id,
          userId: id
        }
      }).then(function (data) {
        return wrapUser(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Users in organization
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise a collection of Users in organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<organization_id>')
     * .then((organization) => organization.getUsers())
     * .then((user) => console.log(user))
     * .catch(console.error)
     * ```
     */
    getUsers: function getUsers() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'User',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapUserCollection(makeRequest, data);
      });
    },

    /**
     * Gets an Organization Membership
     * @param id - Organization Membership ID
     * @return Promise for an Organization Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationMembership('organizationMembership_id'))
     * .then((organizationMembership) => console.log(organizationMembership))
     * .catch(console.error)
     * ```
     */
    getOrganizationMembership: function getOrganizationMembership(id) {
      var raw = this.toPlainObject();
      var organizationId = raw.sys.id;
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'get',
        params: {
          organizationId: organizationId,
          organizationMembershipId: id
        }
      }).then(function (data) {
        return wrapOrganizationMembership(makeRequest, data, organizationId);
      });
    },

    /**
     * Gets a collection of Organization Memberships
     * @param  query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Organization Memberships
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationMemberships({'limit': 100})) // you can add more queries as 'key': 'value'
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getOrganizationMemberships: function getOrganizationMemberships() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      var organizationId = raw.sys.id;
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'getMany',
        params: {
          organizationId: organizationId,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapOrganizationMembershipCollection(makeRequest, data, organizationId);
      });
    },

    /**
     * Creates a Team
     * @param data representation of the Team to be created
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.createTeam({
     *    name: 'new team',
     *    description: 'new team description'
     *  }))
     * .then((team) => console.log(team))
     * .catch(console.error)
     * ```
     */
    createTeam: function createTeam(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'create',
        params: {
          organizationId: raw.sys.id
        },
        payload: data
      }).then(function (data) {
        return wrapTeam(makeRequest, data);
      });
    },

    /**
     * Gets an Team
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('orgId')
     * .then((organization) => organization.getTeam('teamId'))
     * .then((team) => console.log(team))
     * .catch(console.error)
     * ```
     */
    getTeam: function getTeam(teamId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          teamId: teamId
        }
      }).then(function (data) {
        return wrapTeam(makeRequest, data);
      });
    },

    /**
     * Gets all Teams in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('orgId')
     * .then((organization) => organization.getTeams())
     * .then((teams) => console.log(teams))
     * .catch(console.error)
     * ```
     */
    getTeams: function getTeams() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'getMany',
        params: {
          organizationId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapTeamCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Team membership
     * @param teamId - Id of the team the membership will be created in
     * @param data - Object representation of the Team Membership to be created
     * @return Promise for the newly created TeamMembership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((org) => org.createTeamMembership('teamId', {
     *    admin: true,
     *    organizationMembershipId: 'organizationMembershipId'
     *  }))
     * .then((teamMembership) => console.log(teamMembership))
     * .catch(console.error)
     * ```
     */
    createTeamMembership: function createTeamMembership(teamId, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamMembership',
        action: 'create',
        params: {
          organizationId: raw.sys.id,
          teamId: teamId
        },
        payload: data
      }).then(function (data) {
        return wrapTeamMembership(makeRequest, data);
      });
    },

    /**
     * Gets an Team Membership from the team with given teamId
     * @return Promise for an Team Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamMembership('teamId', 'teamMembership_id'))
     * .then((teamMembership) => console.log(teamMembership))
     * .catch(console.error)
     * ```
     */
    getTeamMembership: function getTeamMembership(teamId, teamMembershipId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamMembership',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          teamId: teamId,
          teamMembershipId: teamMembershipId
        }
      }).then(function (data) {
        return wrapTeamMembership(makeRequest, data);
      });
    },

    /**
     * Get all Team Memberships. If teamID is provided in the optional config object, it will return all Team Memberships in that team. By default, returns all team memberships for the organization.
     * @return Promise for a Team Membership Collection
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamMemberships('teamId'))
     * .then((teamMemberships) => console.log(teamMemberships))
     * .catch(console.error)
     * ```
     */
    getTeamMemberships: function getTeamMemberships() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var teamId = opts.teamId,
          _opts$query = opts.query,
          query = _opts$query === void 0 ? {} : _opts$query;
      var raw = this.toPlainObject();

      if (teamId) {
        return makeRequest({
          entityType: 'TeamMembership',
          action: 'getManyForTeam',
          params: {
            organizationId: raw.sys.id,
            teamId: teamId,
            query: createRequestConfig({
              query: query
            }).params
          }
        }).then(function (data) {
          return wrapTeamMembershipCollection(makeRequest, data);
        });
      }

      return makeRequest({
        entityType: 'TeamMembership',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapTeamMembershipCollection(makeRequest, data);
      });
    },

    /**
     * Get all Team Space Memberships. If teamID is provided in the optional config object, it will return all Team Space Memberships in that team. By default, returns all team space memberships across all teams in the organization.
     * @return Promise for a Team Space Membership Collection
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamSpaceMemberships('teamId'))
     * .then((teamSpaceMemberships) => console.log(teamSpaceMemberships))
     * .catch(console.error)
     * ```
     */
    getTeamSpaceMemberships: function getTeamSpaceMemberships() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: createRequestConfig({
            query: opts.query || {}
          }).params,
          teamId: opts.teamId
        }
      }).then(function (data) {
        return wrapTeamSpaceMembershipCollection(makeRequest, data);
      });
    },

    /**
     * Get a Team Space Membership with given teamSpaceMembershipId
     * @return Promise for a Team Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamSpaceMembership('teamSpaceMembershipId'))
     * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
     * .catch(console.error)]
     * ```
     */
    getTeamSpaceMembership: function getTeamSpaceMembership(teamSpaceMembershipId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'getForOrganization',
        params: {
          organizationId: raw.sys.id,
          teamSpaceMembershipId: teamSpaceMembershipId
        }
      }).then(function (data) {
        return wrapTeamSpaceMembership(makeRequest, data);
      });
    },

    /**
     * Gets an Space Membership in Organization
     * @param id - Organiztion Space Membership ID
     * @return Promise for a Space Membership in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationSpaceMembership('organizationSpaceMembership_id'))
     * .then((organizationMembership) => console.log(organizationMembership))
     * .catch(console.error)
     * ```
     */
    getOrganizationSpaceMembership: function getOrganizationSpaceMembership(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'getForOrganization',
        params: {
          organizationId: raw.sys.id,
          spaceMembershipId: id
        }
      }).then(function (data) {
        return wrapSpaceMembership(makeRequest, data);
      });
    },

    /**
     * Gets a collection Space Memberships in organization
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a Space Membership collection across all spaces in the organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationSpaceMemberships()) // you can add queries like 'limit': 100
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getOrganizationSpaceMemberships: function getOrganizationSpaceMemberships() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: createRequestConfig({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapSpaceMembershipCollection(makeRequest, data);
      });
    },

    /**
     * Gets an Invitation in Organization
     * @return Promise for a OrganizationInvitation in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((organization) => organization.getOrganizationInvitation('invitation_id'))
     * .then((invitation) => console.log(invitation))
     * .catch(console.error)
     * ```
     */
    getOrganizationInvitation: function getOrganizationInvitation(invitationId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'OrganizationInvitation',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          invitationId: invitationId
        }
      }).then(function (data) {
        return wrapOrganizationInvitation(makeRequest, data);
      });
    },

    /**
     * Create an Invitation in Organization
     * @return Promise for a OrganizationInvitation in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     *  .then((organization) => organization.createOrganizationInvitation({
     *    email: 'user.email@example.com'
     *    firstName: 'User First Name'
     *    lastName: 'User Last Name'
     *    role: 'developer'
     *  })
     * .catch(console.error)
     * ```
     */
    createOrganizationInvitation: function createOrganizationInvitation(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'OrganizationInvitation',
        action: 'create',
        params: {
          organizationId: raw.sys.id
        },
        payload: data
      }).then(function (data) {
        return wrapOrganizationInvitation(makeRequest, data);
      });
    },

    /**
     * Creates an app definition
     * @param Object representation of the App Definition to be created
     * @return Promise for the newly created AppDefinition
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.createAppDefinition({
     *    name: 'Example app',
     *    locations: [{ location: 'app-config' }],
     *    src: "http://my-app-host.com/my-app"
     *  }))
     * .then((appDefinition) => console.log(appDefinition))
     * .catch(console.error)
     * ```
     */
    createAppDefinition: function createAppDefinition(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'create',
        params: {
          organizationId: raw.sys.id
        },
        payload: data
      }).then(function (data) {
        return wrapAppDefinition(makeRequest, data);
      });
    },

    /**
     * Gets all app definitions
     * @return Promise for a collection of App Definitions
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinitions())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getAppDefinitions: function getAppDefinitions() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'getMany',
        params: {
          organizationId: raw.sys.id,
          query: query
        }
      }).then(function (data) {
        return wrapAppDefinitionCollection(makeRequest, data);
      });
    },

    /**
     * Gets an app definition
     * @return Promise for an App Definition
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_definition_id>'))
     * .then((appDefinition) => console.log(appDefinition))
     * .catch(console.error)
     * ```
     */
    getAppDefinition: function getAppDefinition(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          appDefinitionId: id
        }
      }).then(function (data) {
        return wrapAppDefinition(makeRequest, data);
      });
    },

    /**
     * Gets an app upload
     * @return Promise for an App Upload
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppUpload('<app_upload_id>'))
     * .then((appUpload) => console.log(appUpload))
     * .catch(console.error)
     * ```
     */
    getAppUpload: function getAppUpload(appUploadId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppUpload',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          appUploadId: appUploadId
        }
      }).then(function (data) {
        return wrapAppUpload(makeRequest, data);
      });
    },

    /**
     * Creates an app upload
     * @return Promise for an App Upload
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.createAppUpload('some_zip_file'))
     * .then((appUpload) => console.log(appUpload))
     * .catch(console.error)
     * ```
     */
    createAppUpload: function createAppUpload(file) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppUpload',
        action: 'create',
        params: {
          organizationId: raw.sys.id
        },
        payload: {
          file: file
        }
      }).then(function (data) {
        return wrapAppUpload(makeRequest, data);
      });
    }
  };
}