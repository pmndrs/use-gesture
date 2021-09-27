"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

var _ipRegex = _interopRequireDefault(require("ip-regex"));

var _cosmiconfig = require("cosmiconfig");

var _isAbsoluteUrl = _interopRequireDefault(require("is-absolute-url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function addLine(name, rule) {
  let contents = "";

  if (rule && Array.isArray(rule) && rule.length > 0) {
    rule.forEach(item => {
      contents += addLine(name, item);
    });
  } else {
    const ruleContent = (name === "Allow" || name === "Disallow" ? encodeURI(rule) : rule).toString();
    contents += `${capitaliseFirstLetter(name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase())}:${ruleContent.length > 0 ? ` ${ruleContent}` : ""}\n`;
  }

  return contents;
}

function generatePoliceItem(item, index) {
  let contents = "";

  if (index !== 0) {
    contents += "\n";
  }

  contents += addLine("User-agent", item.userAgent);

  if (item.allow) {
    contents += addLine("Allow", item.allow);
  }

  if (typeof item.disallow === "string" || Array.isArray(item.disallow)) {
    contents += addLine("Disallow", item.disallow);
  }

  if (item.crawlDelay) {
    contents += addLine("Crawl-delay", item.crawlDelay);
  } // Move from policy for next master version
  // https://yandex.ru/support/webmaster/controlling-robot/robots-txt.html


  if (item.cleanParam && item.cleanParam.length > 0) {
    contents += addLine("Clean-param", item.cleanParam);
  }

  return contents;
}

function buildConfig(configFile = null) {
  let searchPath = process.cwd();
  let configPath = null;

  if (configFile) {
    searchPath = null;
    configPath = _path.default.resolve(process.cwd(), configFile);
  }

  const configExplorer = (0, _cosmiconfig.cosmiconfig)("robots-txt");
  const searchForConfig = configPath ? configExplorer.load(configPath) : configExplorer.search(searchPath);
  return searchForConfig.then(result => {
    if (!result) {
      return {};
    }

    return result;
  });
}

function _default({
  configFile = null,
  policy = [{
    allow: "/",
    cleanParam: null,
    crawlDelay: null,
    userAgent: "*"
  }],
  sitemap = null,
  host = null
} = {}) {
  let options = {
    host,
    policy,
    sitemap
  };
  return Promise.resolve().then(() => buildConfig(configFile).then(result => {
    // Need avoid this behaviour in next major release
    // Load config file when it is passed or options were set
    options = Object.assign({}, options, result.config);
    return options;
  })).then(() => new Promise(resolve => {
    if (options.policy) {
      if (!Array.isArray(options.policy)) {
        throw new Error("Options `policy` must be array");
      }

      options.policy.forEach(item => {
        if (!item.userAgent || item.userAgent.length === 0) {
          throw new Error("Each `policy` should have a single string `userAgent` option");
        }

        if (item.crawlDelay && typeof item.crawlDelay !== "number" && !Number.isFinite(item.crawlDelay)) {
          throw new Error("Option `crawlDelay` must be an integer or a float");
        }

        if (item.cleanParam) {
          if (typeof item.cleanParam === "string" && item.cleanParam.length > 500) {
            throw new Error("Option `cleanParam` should have no more than 500 characters");
          } else if (Array.isArray(item.cleanParam)) {
            item.cleanParam.forEach(subItem => {
              if (typeof subItem === "string" && subItem.length > 500) {
                throw new Error("String in `cleanParam` option should have no more than 500 characters");
              } else if (typeof subItem !== "string") {
                throw new Error("String in `cleanParam` option should be a string");
              }
            });
          } else if (typeof item.cleanParam !== "string" && !Array.isArray(item.cleanParam)) {
            throw new Error("Option `cleanParam` should be a string or an array");
          }
        }
      });
    } else {
      throw new Error("Options `policy` should be define");
    }

    if (options.sitemap) {
      if (typeof options.sitemap === "string" && !(0, _isAbsoluteUrl.default)(options.sitemap)) {
        throw new Error("Option `sitemap` should be an absolute URL");
      } else if (Array.isArray(options.sitemap)) {
        options.sitemap.forEach(item => {
          if (typeof item === "string" && !(0, _isAbsoluteUrl.default)(item)) {
            throw new Error("Item in `sitemap` option should be an absolute URL");
          } else if (typeof item !== "string") {
            throw new Error("Item in `sitemap` option should be a string");
          }
        });
      } else if (typeof options.sitemap !== "string" && !Array.isArray(options.sitemap)) {
        throw new Error("Option `sitemap` should be a string or an array");
      }
    }

    if (options.host) {
      if (typeof options.host !== "string") {
        throw new Error("Options `host` must be only one string");
      }

      if ((0, _ipRegex.default)({
        exact: true
      }).test(options.host)) {
        throw new Error("Options `host` should be not an IP address");
      }
    }

    let contents = "";
    options.policy.forEach((item, index) => {
      contents += generatePoliceItem(item, index);
    });

    if (options.sitemap) {
      contents += addLine("Sitemap", options.sitemap);
    }

    if (options.host) {
      let normalizeHost = options.host;

      if (normalizeHost.search(/^https?:\/\//) === -1) {
        normalizeHost = `http://${host}`;
      } // eslint-disable-next-line node/no-deprecated-api


      const parsedURL = _url.default.parse(normalizeHost, false, true);

      if (!parsedURL.host) {
        throw new Error("Option `host` does not contain correct host");
      }

      let formattedHost = _url.default.format({
        host: parsedURL.port && parsedURL.port === "80" ? parsedURL.hostname : parsedURL.host,
        port: parsedURL.port && parsedURL.port === "80" ? "" : parsedURL.port,
        protocol: parsedURL.protocol
      });

      formattedHost = formattedHost.replace(/^http:\/\//, "");
      contents += addLine("Host", formattedHost);
    }

    return resolve(contents);
  }));
}

module.exports = exports.default;
module.exports.default = exports.default;