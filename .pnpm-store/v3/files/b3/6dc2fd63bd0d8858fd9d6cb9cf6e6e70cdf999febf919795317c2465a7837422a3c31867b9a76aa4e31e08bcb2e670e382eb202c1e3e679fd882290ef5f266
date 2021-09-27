import * as raw from './raw';
import { normalizeSelect } from './utils';
export var get = function get(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/scheduled_actions/").concat(params.scheduledActionId), {
    params: {
      'environment.sys.id': params.environmentId
    }
  });
};
export var getMany = function getMany(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/scheduled_actions"), {
    params: normalizeSelect(params.query)
  });
};
export var create = function create(http, params, data) {
  return raw.post(http, "/spaces/".concat(params.spaceId, "/scheduled_actions"), data);
};
export var del = function del(http, params) {
  return raw.del(http, "/spaces/".concat(params.spaceId, "/scheduled_actions/").concat(params.scheduledActionId), {
    params: {
      'environment.sys.id': params.environmentId
    }
  });
};
export var update = function update(http, params, data) {
  var _data$environment;

  return raw.put(http, "/spaces/".concat(params.spaceId, "/scheduled_actions/").concat(params.scheduledActionId), data, {
    params: {
      'environment.sys.id': (_data$environment = data.environment) === null || _data$environment === void 0 ? void 0 : _data$environment.sys.id
    },
    headers: {
      'X-Contentful-Version': params.version
    }
  });
};