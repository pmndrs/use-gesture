"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.fetchRemoteFile = fetchRemoteFile;

var _got = _interopRequireDefault(require("got"));

var _fileType = _interopRequireDefault(require("file-type"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _ = require(".");

var _filenameUtils = require("./filename-utils");

const cacheIdForHeaders = url => `create-remote-file-node-headers-${url}`;

const cacheIdForExtensions = url => `create-remote-file-node-extension-${url}`;

const STALL_RETRY_LIMIT = process.env.GATSBY_STALL_RETRY_LIMIT ? parseInt(process.env.GATSBY_STALL_RETRY_LIMIT, 10) : 3;
const STALL_TIMEOUT = process.env.GATSBY_STALL_TIMEOUT ? parseInt(process.env.GATSBY_STALL_TIMEOUT, 10) : 30000;
const CONNECTION_TIMEOUT = process.env.GATSBY_CONNECTION_TIMEOUT ? parseInt(process.env.GATSBY_CONNECTION_TIMEOUT, 10) : 30000;
const INCOMPLETE_RETRY_LIMIT = process.env.GATSBY_INCOMPLETE_RETRY_LIMIT ? parseInt(process.env.GATSBY_INCOMPLETE_RETRY_LIMIT, 10) : 3;
/**
 * requestRemoteNode
 * --
 * Download the requested file
 *
 * @param  {String}   url
 * @param  {Headers}  headers
 * @param  {String}   tmpFilename
 * @param  {Object}   httpOpts
 * @param  {number}   attempt
 * @return {Promise<Object>}  Resolves with the [http Result Object]{@link https://nodejs.org/api/http.html#http_class_http_serverresponse}
 */

const requestRemoteNode = (url, headers, tmpFilename, httpOpts, attempt = 1) => new Promise((resolve, reject) => {
  let timeout;

  const fsWriteStream = _fsExtra.default.createWriteStream(tmpFilename); // Called if we stall for 30s without receiving any data


  const handleTimeout = async () => {
    fsWriteStream.close();

    _fsExtra.default.removeSync(tmpFilename);

    if (attempt < STALL_RETRY_LIMIT) {
      // Retry by calling ourself recursively
      resolve(requestRemoteNode(url, headers, tmpFilename, httpOpts, attempt + 1));
    } else {
      reject(`Failed to download ${url} after ${STALL_RETRY_LIMIT} attempts`);
    }
  };

  const resetTimeout = () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(handleTimeout, STALL_TIMEOUT);
  };

  const responseStream = _got.default.stream(url, {
    headers,
    timeout: {
      send: CONNECTION_TIMEOUT // https://github.com/sindresorhus/got#timeout

    },
    ...httpOpts
  });

  let haveAllBytesBeenWritten = false;
  responseStream.on(`downloadProgress`, progress => {
    if (progress.transferred === progress.total || progress.total === null || progress.total === undefined) {
      haveAllBytesBeenWritten = true;
    }
  });
  responseStream.pipe(fsWriteStream); // If there's a 400/500 response or other error.

  responseStream.on(`error`, error => {
    if (timeout) {
      clearTimeout(timeout);
    }

    _fsExtra.default.removeSync(tmpFilename);

    reject(error);
  });
  fsWriteStream.on(`error`, error => {
    if (timeout) {
      clearTimeout(timeout);
    }

    reject(error);
  });
  responseStream.on(`response`, response => {
    resetTimeout();
    fsWriteStream.on(`finish`, () => {
      fsWriteStream.close(); // We have an incomplete download

      if (!haveAllBytesBeenWritten) {
        _fsExtra.default.removeSync(tmpFilename);

        if (attempt < INCOMPLETE_RETRY_LIMIT) {
          resolve(requestRemoteNode(url, headers, tmpFilename, httpOpts, attempt + 1));
        } else {
          reject(`Failed to download ${url} after ${INCOMPLETE_RETRY_LIMIT} attempts`);
        }
      }

      if (timeout) {
        clearTimeout(timeout);
      }

      resolve(response);
    });
  });
});

async function fetchRemoteFile({
  url,
  cache,
  auth = {},
  httpHeaders = {},
  ext,
  name
}) {
  const pluginCacheDir = cache.directory; // See if there's response headers for this url
  // from a previous request.

  const cachedHeaders = await cache.get(cacheIdForHeaders(url));
  const headers = { ...httpHeaders
  };

  if (cachedHeaders && cachedHeaders.etag) {
    headers[`If-None-Match`] = cachedHeaders.etag;
  } // Add htaccess authentication if passed in. This isn't particularly
  // extensible. We should define a proper API that we validate.


  const httpOpts = {};

  if (auth && (auth.htaccess_pass || auth.htaccess_user)) {
    httpOpts.auth = `${auth.htaccess_user}:${auth.htaccess_pass}`;
  } // Create the temp and permanent file names for the url.


  const digest = (0, _.createContentDigest)(url);

  if (!name) {
    name = (0, _filenameUtils.getRemoteFileName)(url);
  }

  if (!ext) {
    ext = (0, _filenameUtils.getRemoteFileExtension)(url);
  }

  const tmpFilename = (0, _filenameUtils.createFilePath)(pluginCacheDir, `tmp-${digest}`, ext); // Fetch the file.

  const response = await requestRemoteNode(url, headers, tmpFilename, httpOpts);

  if (response.statusCode === 200) {
    // Save the response headers for future requests.
    await cache.set(cacheIdForHeaders(url), response.headers);
  } // If the user did not provide an extension and we couldn't get one from remote file, try and guess one


  if (ext === ``) {
    if (response.statusCode === 200) {
      // if this is fresh response - try to guess extension and cache result for future
      const filetype = await _fileType.default.fromFile(tmpFilename);

      if (filetype) {
        ext = `.${filetype.ext}`;
        await cache.set(cacheIdForExtensions(url), ext);
      }
    } else if (response.statusCode === 304) {
      // if file on server didn't change - grab cached extension
      ext = await cache.get(cacheIdForExtensions(url));
    }
  }

  const filename = (0, _filenameUtils.createFilePath)(_path.default.join(pluginCacheDir, digest), name, ext); // If the status code is 200, move the piped temp file to the real name.

  if (response.statusCode === 200) {
    await _fsExtra.default.move(tmpFilename, filename, {
      overwrite: true
    }); // Else if 304, remove the empty response.
  } else {
    await _fsExtra.default.remove(tmpFilename);
  }

  return filename;
}