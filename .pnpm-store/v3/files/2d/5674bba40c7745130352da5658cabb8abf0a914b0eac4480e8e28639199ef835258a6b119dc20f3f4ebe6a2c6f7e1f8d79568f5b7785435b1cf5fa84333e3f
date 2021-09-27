import * as raw from './raw';
import { normalizeSelect } from './utils';

var getBaseEntryUrl = function getBaseEntryUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId, "/snapshots");
};

var getEntryUrl = function getEntryUrl(params) {
  return getBaseEntryUrl(params) + "/".concat(params.snapshotId);
};

export var getManyForEntry = function getManyForEntry(http, params) {
  return raw.get(http, getBaseEntryUrl(params), {
    params: normalizeSelect(params.query)
  });
};
export var getForEntry = function getForEntry(http, params) {
  return raw.get(http, getEntryUrl(params));
};

var getBaseContentTypeUrl = function getBaseContentTypeUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/content_types/").concat(params.contentTypeId, "/snapshots");
};

var getContentTypeUrl = function getContentTypeUrl(params) {
  return getBaseContentTypeUrl(params) + "/".concat(params.snapshotId);
};

export var getManyForContentType = function getManyForContentType(http, params) {
  return raw.get(http, getBaseContentTypeUrl(params), {
    params: normalizeSelect(params.query)
  });
};
export var getForContentType = function getForContentType(http, params) {
  return raw.get(http, getContentTypeUrl(params));
};