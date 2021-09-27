function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import { wrapCollection } from '../common-utils';
import enhanceWithMethods from '../enhance-with-methods';
/**
 * Represents that state of the scheduled action
 */

var ScheduledActionStatus;

(function (ScheduledActionStatus) {
  ScheduledActionStatus["scheduled"] = "scheduled";
  ScheduledActionStatus["inProgress"] = "inProgress";
  ScheduledActionStatus["succeeded"] = "succeeded";
  ScheduledActionStatus["failed"] = "failed";
  ScheduledActionStatus["canceled"] = "canceled";
})(ScheduledActionStatus || (ScheduledActionStatus = {}));

export default function getInstanceMethods(makeRequest) {
  var getParams = function getParams(self) {
    var _scheduledAction$envi;

    var scheduledAction = self.toPlainObject();
    return {
      spaceId: scheduledAction.sys.space.sys.id,
      environmentId: (_scheduledAction$envi = scheduledAction.environment) === null || _scheduledAction$envi === void 0 ? void 0 : _scheduledAction$envi.sys.id,
      scheduledActionId: scheduledAction.sys.id,
      version: scheduledAction.sys.version
    };
  };

  return {
    /**
     * Cancels the current Scheduled Action schedule.
     *
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
     *    .then((scheduledAction) => scheduledAction.delete())
     *    .then((deletedScheduledAction) => console.log(deletedScheduledAction))
     *    .catch(console.error);
     * ```
     */
    "delete": function _delete() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var params;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = getParams(_this);
                return _context.abrupt("return", makeRequest({
                  entityType: 'ScheduledAction',
                  action: 'delete',
                  params: params
                }).then(function (data) {
                  return wrapScheduledAction(makeRequest, data);
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },

    /**
     * Update the current scheduled action. Currently, only changes made to the `scheduledFor` property will be saved.
     *
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
     *    .then((scheduledAction) => {
     *      scheduledAction.scheduledFor.timezone = 'Europe/Paris';
     *      return scheduledAction.update();
     *    })
     *    .then((scheduledAction) => console.log(scheduledAction))
     *    .catch(console.error);
     * ```
     */
    update: function update() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var params, _this2$toPlainObject, sys, payload;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = getParams(_this2); // eslint-disable-next-line @typescript-eslint/no-unused-vars

                _this2$toPlainObject = _this2.toPlainObject(), sys = _this2$toPlainObject.sys, payload = _objectWithoutProperties(_this2$toPlainObject, ["sys"]);
                return _context2.abrupt("return", makeRequest({
                  entityType: 'ScheduledAction',
                  action: 'update',
                  params: params,
                  payload: payload
                }).then(function (data) {
                  return wrapScheduledAction(makeRequest, data);
                }));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  };
}
export function wrapScheduledAction(makeRequest, data) {
  var scheduledAction = toPlainObject(copy(data));
  var scheduledActionWithMethods = enhanceWithMethods(scheduledAction, getInstanceMethods(makeRequest));
  return freezeSys(scheduledActionWithMethods);
}
export var wrapScheduledActionCollection = wrapCollection(wrapScheduledAction);