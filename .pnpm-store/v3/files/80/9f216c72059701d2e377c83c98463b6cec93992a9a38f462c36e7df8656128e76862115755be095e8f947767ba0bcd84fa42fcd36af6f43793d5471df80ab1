export function getUploadHttpClient(http) {
  var _ref = http.httpClientParams,
      hostUpload = _ref.hostUpload,
      defaultHostnameUpload = _ref.defaultHostnameUpload;
  var uploadHttp = http.cloneWithNewParams({
    host: hostUpload || defaultHostnameUpload
  });
  return uploadHttp;
}