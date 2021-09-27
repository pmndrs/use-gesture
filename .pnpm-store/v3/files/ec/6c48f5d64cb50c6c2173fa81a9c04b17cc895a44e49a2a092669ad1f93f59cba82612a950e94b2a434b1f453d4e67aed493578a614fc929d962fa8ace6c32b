export var isPublished = function isPublished(data) {
  return !!data.sys.publishedVersion;
};
export var isUpdated = function isUpdated(data) {
  // The act of publishing an entity increases its version by 1, so any entry which has
  // 2 versions higher or more than the publishedVersion has unpublished changes.
  return !!(data.sys.publishedVersion && data.sys.version > data.sys.publishedVersion + 1);
};
export var isDraft = function isDraft(data) {
  return !data.sys.publishedVersion;
};
export var isArchived = function isArchived(data) {
  return !!data.sys.archivedVersion;
};