'use strict';

var path$1 = require('path');
var resolve$1 = require('resolve');
var fs = require('fs');
var build = require('./dep-e0f09032.js');
var _postcss = require('postcss');
var index$1 = require('./dep-685e7ba2.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path$1);
var resolve__default = /*#__PURE__*/_interopDefaultLegacy(resolve$1);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var _postcss__default = /*#__PURE__*/_interopDefaultLegacy(_postcss);

var joinMedia = function (parentMedia, childMedia) {
  if (!parentMedia.length && childMedia.length) return childMedia
  if (parentMedia.length && !childMedia.length) return parentMedia
  if (!parentMedia.length && !childMedia.length) return []

  const media = [];

  parentMedia.forEach(parentItem => {
    childMedia.forEach(childItem => {
      if (parentItem !== childItem) media.push(`${parentItem} and ${childItem}`);
    });
  });

  return media
};

// external tooling


const moduleDirectories = ["web_modules", "node_modules"];

function resolveModule(id, opts) {
  return new Promise((res, rej) => {
    resolve__default(id, opts, (err, path) => (err ? rej(err) : res(path)));
  })
}

var resolveId = function (id, base, options) {
  const paths = options.path;

  const resolveOpts = {
    basedir: base,
    moduleDirectory: moduleDirectories.concat(options.addModulesDirectories),
    paths: paths,
    extensions: [".css"],
    packageFilter: function processPackage(pkg) {
      if (pkg.style) pkg.main = pkg.style;
      else if (!pkg.main || !/\.css$/.test(pkg.main)) pkg.main = "index.css";
      return pkg
    },
    preserveSymlinks: false,
  };

  return resolveModule(`./${id}`, resolveOpts)
    .catch(() => resolveModule(id, resolveOpts))
    .catch(() => {
      if (paths.indexOf(base) === -1) paths.unshift(base);

      throw new Error(
        `Failed to find '${id}'
  in [
    ${paths.join(",\n        ")}
  ]`
      )
    })
};

var pify_1 = build.createCommonjsModule(function (module) {

var processFn = function (fn, P, opts) {
	return function () {
		var that = this;
		var args = new Array(arguments.length);

		for (var i = 0; i < arguments.length; i++) {
			args[i] = arguments[i];
		}

		return new P(function (resolve, reject) {
			args.push(function (err, result) {
				if (err) {
					reject(err);
				} else if (opts.multiArgs) {
					var results = new Array(arguments.length - 1);

					for (var i = 1; i < arguments.length; i++) {
						results[i - 1] = arguments[i];
					}

					resolve(results);
				} else {
					resolve(result);
				}
			});

			fn.apply(that, args);
		});
	};
};

var pify = module.exports = function (obj, P, opts) {
	if (typeof P !== 'function') {
		opts = P;
		P = Promise;
	}

	opts = opts || {};
	opts.exclude = opts.exclude || [/.+Sync$/];

	var filter = function (key) {
		var match = function (pattern) {
			return typeof pattern === 'string' ? key === pattern : pattern.test(key);
		};

		return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
	};

	var ret = typeof obj === 'function' ? function () {
		if (opts.excludeMain) {
			return obj.apply(this, arguments);
		}

		return processFn(obj, P, opts).apply(this, arguments);
	} : {};

	return Object.keys(obj).reduce(function (ret, key) {
		var x = obj[key];

		ret[key] = typeof x === 'function' && filter(key) ? processFn(x, P, opts) : x;

		return ret;
	}, ret);
};

pify.all = pify;
});

var path = path__default;


var stat = pify_1(fs__default.stat);
var readFile = pify_1(fs__default.readFile);
var resolve = path.resolve;

var cache = Object.create(null);

function convert(content, encoding) {
	if (Buffer.isEncoding(encoding)) {
		return content.toString(encoding);
	}
	return content;
}

var readCache = function (path, encoding) {
	path = resolve(path);

	return stat(path).then(function (stats) {
		var item = cache[path];

		if (item && item.mtime.getTime() === stats.mtime.getTime()) {
			return convert(item.content, encoding);
		}

		return readFile(path).then(function (data) {
			cache[path] = {
				mtime: stats.mtime,
				content: data
			};

			return convert(data, encoding);
		});
	}).catch(function (err) {
		cache[path] = null;
		return Promise.reject(err);
	});
};

var sync = function (path, encoding) {
	path = resolve(path);

	try {
		var stats = fs__default.statSync(path);
		var item = cache[path];

		if (item && item.mtime.getTime() === stats.mtime.getTime()) {
			return convert(item.content, encoding);
		}

		var data = fs__default.readFileSync(path);

		cache[path] = {
			mtime: stats.mtime,
			content: data
		};

		return convert(data, encoding);
	} catch (err) {
		cache[path] = null;
		throw err;
	}

};

var get = function (path, encoding) {
	path = resolve(path);
	if (cache[path]) {
		return convert(cache[path].content, encoding);
	}
	return null;
};

var clear = function () {
	cache = Object.create(null);
};
readCache.sync = sync;
readCache.get = get;
readCache.clear = clear;

var loadContent = filename => readCache(filename, "utf-8");

// builtin tooling


// external tooling


// placeholder tooling
let sugarss;

var processContent = function processContent(result, content, filename, options) {
  const plugins = options.plugins;
  const ext = path__default.extname(filename);

  const parserList = [];

  // SugarSS support:
  if (ext === ".sss") {
    if (!sugarss) {
      try {
        sugarss = eval('require')('sugarss');
      } catch (e) {
        // Ignore
      }
    }
    if (sugarss) return runPostcss(content, filename, plugins, [sugarss])
  }

  // Syntax support:
  if (result.opts.syntax && result.opts.syntax.parse) {
    parserList.push(result.opts.syntax.parse);
  }

  // Parser support:
  if (result.opts.parser) parserList.push(result.opts.parser);
  // Try the default as a last resort:
  parserList.push(null);

  return runPostcss(content, filename, plugins, parserList)
};

function runPostcss(content, filename, plugins, parsers, index) {
  if (!index) index = 0;
  return _postcss__default(plugins)
    .process(content, {
      from: filename,
      parser: parsers[index],
    })
    .catch(err => {
      // If there's an error, try the next parser
      index++;
      // If there are no parsers left, throw it
      if (index === parsers.length) throw err
      return runPostcss(content, filename, plugins, parsers, index)
    })
}

// external tooling


// extended tooling
const stringify = index$1.lib.stringify;

function split(params, start) {
  const list = [];
  const last = params.reduce((item, node, index) => {
    if (index < start) return ""
    if (node.type === "div" && node.value === ",") {
      list.push(item);
      return ""
    }
    return item + stringify(node)
  }, "");
  list.push(last);
  return list
}

var parseStatements = function (result, styles) {
  const statements = [];
  let nodes = [];

  styles.each(node => {
    let stmt;
    if (node.type === "atrule") {
      if (node.name === "import") stmt = parseImport(result, node);
      else if (node.name === "media") stmt = parseMedia(result, node);
    }

    if (stmt) {
      if (nodes.length) {
        statements.push({
          type: "nodes",
          nodes: nodes,
          media: [],
        });
        nodes = [];
      }
      statements.push(stmt);
    } else nodes.push(node);
  });

  if (nodes.length) {
    statements.push({
      type: "nodes",
      nodes: nodes,
      media: [],
    });
  }

  return statements
};

function parseMedia(result, atRule) {
  const params = index$1.lib(atRule.params).nodes;
  return {
    type: "media",
    node: atRule,
    media: split(params, 0),
  }
}

function parseImport(result, atRule) {
  let prev = getPrev(atRule);
  if (prev) {
    do {
      if (
        prev.type !== "atrule" ||
        (prev.name !== "import" && prev.name !== "charset")
      ) {
        return result.warn(
          "@import must precede all other statements (besides @charset)",
          { node: atRule }
        )
      } else prev = getPrev(prev);
    } while (prev)
  }

  if (atRule.nodes) {
    return result.warn(
      "It looks like you didn't end your @import statement correctly. " +
        "Child nodes are attached to it.",
      { node: atRule }
    )
  }

  const params = index$1.lib(atRule.params).nodes;
  const stmt = {
    type: "import",
    node: atRule,
    media: [],
  };

  // prettier-ignore
  if (
    !params.length ||
    (
      params[0].type !== "string" ||
      !params[0].value
    ) &&
    (
      params[0].type !== "function" ||
      params[0].value !== "url" ||
      !params[0].nodes.length ||
      !params[0].nodes[0].value
    )
  ) {
    return result.warn(`Unable to find uri in '${  atRule.toString()  }'`, {
      node: atRule,
    })
  }

  if (params[0].type === "string") stmt.uri = params[0].value;
  else stmt.uri = params[0].nodes[0].value;
  stmt.fullUri = stringify(params[0]);

  if (params.length > 2) {
    if (params[1].type !== "space") {
      return result.warn("Invalid import media statement", { node: atRule })
    }
    stmt.media = split(params, 2);
  }

  return stmt
}

function getPrev(item) {
  let prev = item.prev();
  while (prev && prev.type === "comment") {
    prev = prev.prev();
  }
  return prev
}

// builtin tooling


// internal tooling






function AtImport(options) {
  options = Object.assign(
    {
      root: process.cwd(),
      path: [],
      skipDuplicates: true,
      resolve: resolveId,
      load: loadContent,
      plugins: [],
      addModulesDirectories: [],
    },
    options
  );

  options.root = path__default.resolve(options.root);

  // convert string to an array of a single element
  if (typeof options.path === "string") options.path = [options.path];

  if (!Array.isArray(options.path)) options.path = [];

  options.path = options.path.map(p => path__default.resolve(options.root, p));

  return {
    postcssPlugin: "postcss-import",
    Once(styles, { result, atRule }) {
      const state = {
        importedFiles: {},
        hashFiles: {},
      };

      if (styles.source && styles.source.input && styles.source.input.file) {
        state.importedFiles[styles.source.input.file] = {};
      }

      if (options.plugins && !Array.isArray(options.plugins)) {
        throw new Error("plugins option must be an array")
      }

      return parseStyles(result, styles, options, state, []).then(bundle => {
        applyRaws(bundle);
        applyMedia(bundle);
        applyStyles(bundle, styles);
      })

      function applyRaws(bundle) {
        bundle.forEach((stmt, index) => {
          if (index === 0) return

          if (stmt.parent) {
            const before = stmt.parent.node.raws.before;
            if (stmt.type === "nodes") stmt.nodes[0].raws.before = before;
            else stmt.node.raws.before = before;
          } else if (stmt.type === "nodes") {
            stmt.nodes[0].raws.before = stmt.nodes[0].raws.before || "\n";
          }
        });
      }

      function applyMedia(bundle) {
        bundle.forEach(stmt => {
          if (!stmt.media.length) return
          if (stmt.type === "import") {
            stmt.node.params = `${stmt.fullUri} ${stmt.media.join(", ")}`;
          } else if (stmt.type === "media")
            stmt.node.params = stmt.media.join(", ");
          else {
            const nodes = stmt.nodes;
            const parent = nodes[0].parent;
            const mediaNode = atRule({
              name: "media",
              params: stmt.media.join(", "),
              source: parent.source,
            });

            parent.insertBefore(nodes[0], mediaNode);

            // remove nodes
            nodes.forEach(node => {
              node.parent = undefined;
            });

            // better output
            nodes[0].raws.before = nodes[0].raws.before || "\n";

            // wrap new rules with media query
            mediaNode.append(nodes);

            stmt.type = "media";
            stmt.node = mediaNode;
            delete stmt.nodes;
          }
        });
      }

      function applyStyles(bundle, styles) {
        styles.nodes = [];

        // Strip additional statements.
        bundle.forEach(stmt => {
          if (stmt.type === "import") {
            stmt.node.parent = undefined;
            styles.append(stmt.node);
          } else if (stmt.type === "media") {
            stmt.node.parent = undefined;
            styles.append(stmt.node);
          } else if (stmt.type === "nodes") {
            stmt.nodes.forEach(node => {
              node.parent = undefined;
              styles.append(node);
            });
          }
        });
      }

      function parseStyles(result, styles, options, state, media) {
        const statements = parseStatements(result, styles);

        return Promise.resolve(statements)
          .then(stmts => {
            // process each statement in series
            return stmts.reduce((promise, stmt) => {
              return promise.then(() => {
                stmt.media = joinMedia(media, stmt.media || []);

                // skip protocol base uri (protocol://url) or protocol-relative
                if (
                  stmt.type !== "import" ||
                  /^(?:[a-z]+:)?\/\//i.test(stmt.uri)
                ) {
                  return
                }

                if (options.filter && !options.filter(stmt.uri)) {
                  // rejected by filter
                  return
                }

                return resolveImportId(result, stmt, options, state)
              })
            }, Promise.resolve())
          })
          .then(() => {
            const imports = [];
            const bundle = [];

            // squash statements and their children
            statements.forEach(stmt => {
              if (stmt.type === "import") {
                if (stmt.children) {
                  stmt.children.forEach((child, index) => {
                    if (child.type === "import") imports.push(child);
                    else bundle.push(child);
                    // For better output
                    if (index === 0) child.parent = stmt;
                  });
                } else imports.push(stmt);
              } else if (stmt.type === "media" || stmt.type === "nodes") {
                bundle.push(stmt);
              }
            });

            return imports.concat(bundle)
          })
      }

      function resolveImportId(result, stmt, options, state) {
        const atRule = stmt.node;
        let sourceFile;
        if (atRule.source && atRule.source.input && atRule.source.input.file) {
          sourceFile = atRule.source.input.file;
        }
        const base = sourceFile
          ? path__default.dirname(atRule.source.input.file)
          : options.root;

        return Promise.resolve(options.resolve(stmt.uri, base, options))
          .then(paths => {
            if (!Array.isArray(paths)) paths = [paths];
            // Ensure that each path is absolute:
            return Promise.all(
              paths.map(file => {
                return !path__default.isAbsolute(file)
                  ? resolveId(file, base, options)
                  : file
              })
            )
          })
          .then(resolved => {
            // Add dependency messages:
            resolved.forEach(file => {
              result.messages.push({
                type: "dependency",
                plugin: "postcss-import",
                file: file,
                parent: sourceFile,
              });
            });

            return Promise.all(
              resolved.map(file => {
                return loadImportContent(result, stmt, file, options, state)
              })
            )
          })
          .then(result => {
            // Merge loaded statements
            stmt.children = result.reduce((result, statements) => {
              return statements ? result.concat(statements) : result
            }, []);
          })
      }

      function loadImportContent(result, stmt, filename, options, state) {
        const atRule = stmt.node;
        const media = stmt.media;
        if (options.skipDuplicates) {
          // skip files already imported at the same scope
          if (
            state.importedFiles[filename] &&
            state.importedFiles[filename][media]
          ) {
            return
          }

          // save imported files to skip them next time
          if (!state.importedFiles[filename]) state.importedFiles[filename] = {};
          state.importedFiles[filename][media] = true;
        }

        return Promise.resolve(options.load(filename, options)).then(
          content => {
            if (content.trim() === "") {
              result.warn(`${filename} is empty`, { node: atRule });
              return
            }

            // skip previous imported files not containing @import rules
            if (state.hashFiles[content] && state.hashFiles[content][media])
              return

            return processContent(result, content, filename, options).then(
              importedResult => {
                const styles = importedResult.root;
                result.messages = result.messages.concat(
                  importedResult.messages
                );

                if (options.skipDuplicates) {
                  const hasImport = styles.some(child => {
                    return child.type === "atrule" && child.name === "import"
                  });
                  if (!hasImport) {
                    // save hash files to skip them next time
                    if (!state.hashFiles[content]) state.hashFiles[content] = {};
                    state.hashFiles[content][media] = true;
                  }
                }

                // recursion: import @import from imported file
                return parseStyles(result, styles, options, state, media)
              }
            )
          }
        )
      }
    },
  }
}

AtImport.postcss = true;

var postcssImport = AtImport;

var index = /*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), postcssImport, {
  'default': postcssImport
});

exports.index = index;
