"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.startRedirectListener = exports.writeRedirects = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _crypto = _interopRequireDefault(require("crypto"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _redux = require("../redux");

var _gatsbyCoreUtils = require("gatsby-core-utils");

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

let lastHash = null;
let bootstrapFinished = false;

const writeRedirects = async () => {
  bootstrapFinished = true;

  const {
    program,
    redirects,
    pages
  } = _redux.store.getState();

  const redirectMatchingPageWarnings = [];
  const browserRedirects = [];

  for (const redirect of redirects) {
    const alternativePath = redirect.fromPath.endsWith(`/`) ? redirect.fromPath.substr(0, redirect.fromPath.length - 1) : redirect.fromPath + `/`;
    let hasSamePage;

    if ((hasSamePage = pages.has(redirect.fromPath)) || pages.has(alternativePath)) {
      redirectMatchingPageWarnings.push(` - page: "${hasSamePage ? redirect.fromPath : alternativePath}" and redirect: "${redirect.fromPath}" -> "${redirect.toPath}"`);
    } // Filter for redirects that are meant for the browser.


    if (redirect.redirectInBrowser) {
      browserRedirects.push({ ...redirect,
        fromPath: redirect.ignoreCase ? redirect.fromPath.toLowerCase() : redirect.fromPath
      });
    }
  }

  if (redirectMatchingPageWarnings.length > 0) {
    _reporter.default.warn(`There are routes that match both page and redirect. It will result in page not being accessible; this is probably not intentional:\n${redirectMatchingPageWarnings.join(`\n`)}`);
  }

  const newHash = _crypto.default.createHash(`md5`).update(JSON.stringify(browserRedirects)).digest(`hex`);

  if (newHash === lastHash) {
    return;
  }

  lastHash = newHash;
  await _fsExtra.default.writeFile((0, _gatsbyCoreUtils.joinPath)(program.directory, `.cache/redirects.json`), JSON.stringify(browserRedirects, null, 2));
};

exports.writeRedirects = writeRedirects;

const debouncedWriteRedirects = _lodash.default.debounce(() => {
  // Don't write redirects again until bootstrap has finished.
  if (bootstrapFinished) {
    writeRedirects();
  }
}, 250);

const startRedirectListener = () => {
  _redux.emitter.on(`CREATE_REDIRECT`, () => {
    debouncedWriteRedirects();
  });
};

exports.startRedirectListener = startRedirectListener;
//# sourceMappingURL=redirects-writer.js.map