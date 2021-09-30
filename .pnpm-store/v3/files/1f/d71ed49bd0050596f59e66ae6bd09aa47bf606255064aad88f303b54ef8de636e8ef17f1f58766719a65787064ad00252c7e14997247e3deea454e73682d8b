var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../error/lib/index.js
var require_lib = __commonJS({
  "../error/lib/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FetchError = void 0;
    var PnpmError = class extends Error {
      constructor(code, message, opts) {
        super(message);
        this.code = `ERR_PNPM_${code}`;
        this.hint = opts === null || opts === void 0 ? void 0 : opts.hint;
        this.attempts = opts === null || opts === void 0 ? void 0 : opts.attempts;
      }
    };
    exports2.default = PnpmError;
    var FetchError = class extends PnpmError {
      constructor(request, response, hint) {
        const message = `GET ${request.url}: ${response.statusText} - ${response.status}`;
        const authHeaderValue = request.authHeaderValue ? hideAuthInformation(request.authHeaderValue) : void 0;
        if (response.status === 401 || response.status === 403 || response.status === 404) {
          hint = hint ? `${hint}

` : "";
          if (authHeaderValue) {
            hint += `An authorization header was used: ${authHeaderValue}`;
          } else {
            hint += "No authorization header was set for the request.";
          }
        }
        super(`FETCH_${response.status}`, message, { hint });
        this.request = request;
        this.response = response;
      }
    };
    exports2.FetchError = FetchError;
    function hideAuthInformation(authHeaderValue) {
      const [authType, token] = authHeaderValue.split(" ");
      return `${authType} ${token.substring(0, 4)}[hidden]`;
    }
  }
});

// ../../node_modules/.pnpm/yocto-queue@0.1.0/node_modules/yocto-queue/index.js
var require_yocto_queue = __commonJS({
  "../../node_modules/.pnpm/yocto-queue@0.1.0/node_modules/yocto-queue/index.js"(exports2, module2) {
    var Node = class {
      constructor(value) {
        this.value = value;
        this.next = void 0;
      }
    };
    var Queue = class {
      constructor() {
        this.clear();
      }
      enqueue(value) {
        const node = new Node(value);
        if (this._head) {
          this._tail.next = node;
          this._tail = node;
        } else {
          this._head = node;
          this._tail = node;
        }
        this._size++;
      }
      dequeue() {
        const current = this._head;
        if (!current) {
          return;
        }
        this._head = this._head.next;
        this._size--;
        return current.value;
      }
      clear() {
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
      }
      get size() {
        return this._size;
      }
      *[Symbol.iterator]() {
        let current = this._head;
        while (current) {
          yield current.value;
          current = current.next;
        }
      }
    };
    module2.exports = Queue;
  }
});

// ../../node_modules/.pnpm/p-limit@3.1.0/node_modules/p-limit/index.js
var require_p_limit = __commonJS({
  "../../node_modules/.pnpm/p-limit@3.1.0/node_modules/p-limit/index.js"(exports2, module2) {
    "use strict";
    var Queue = require_yocto_queue();
    var pLimit = (concurrency) => {
      if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
        throw new TypeError("Expected `concurrency` to be a number from 1 and up");
      }
      const queue = new Queue();
      let activeCount = 0;
      const next = () => {
        activeCount--;
        if (queue.size > 0) {
          queue.dequeue()();
        }
      };
      const run = async (fn, resolve, ...args) => {
        activeCount++;
        const result = (async () => fn(...args))();
        resolve(result);
        try {
          await result;
        } catch {
        }
        next();
      };
      const enqueue = (fn, resolve, ...args) => {
        queue.enqueue(run.bind(null, fn, resolve, ...args));
        (async () => {
          await Promise.resolve();
          if (activeCount < concurrency && queue.size > 0) {
            queue.dequeue()();
          }
        })();
      };
      const generator = (fn, ...args) => new Promise((resolve) => {
        enqueue(fn, resolve, ...args);
      });
      Object.defineProperties(generator, {
        activeCount: {
          get: () => activeCount
        },
        pendingCount: {
          get: () => queue.size
        },
        clearQueue: {
          value: () => {
            queue.clear();
          }
        }
      });
      return generator;
    };
    module2.exports = pLimit;
  }
});

// ../../node_modules/.pnpm/p-locate@5.0.0/node_modules/p-locate/index.js
var require_p_locate = __commonJS({
  "../../node_modules/.pnpm/p-locate@5.0.0/node_modules/p-locate/index.js"(exports2, module2) {
    "use strict";
    var pLimit = require_p_limit();
    var EndError = class extends Error {
      constructor(value) {
        super();
        this.value = value;
      }
    };
    var testElement = async (element, tester) => tester(await element);
    var finder = async (element) => {
      const values = await Promise.all(element);
      if (values[1] === true) {
        throw new EndError(values[0]);
      }
      return false;
    };
    var pLocate = async (iterable, tester, options) => {
      options = {
        concurrency: Infinity,
        preserveOrder: true,
        ...options
      };
      const limit = pLimit(options.concurrency);
      const items = [...iterable].map((element) => [element, limit(testElement, element, tester)]);
      const checkLimit = pLimit(options.preserveOrder ? 1 : Infinity);
      try {
        await Promise.all(items.map((element) => checkLimit(finder, element)));
      } catch (error) {
        if (error instanceof EndError) {
          return error.value;
        }
        throw error;
      }
    };
    module2.exports = pLocate;
  }
});

// ../../node_modules/.pnpm/locate-path@6.0.0/node_modules/locate-path/index.js
var require_locate_path = __commonJS({
  "../../node_modules/.pnpm/locate-path@6.0.0/node_modules/locate-path/index.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var fs = require("fs");
    var { promisify } = require("util");
    var pLocate = require_p_locate();
    var fsStat = promisify(fs.stat);
    var fsLStat = promisify(fs.lstat);
    var typeMappings = {
      directory: "isDirectory",
      file: "isFile"
    };
    function checkType({ type }) {
      if (type in typeMappings) {
        return;
      }
      throw new Error(`Invalid type specified: ${type}`);
    }
    var matchType = (type, stat) => type === void 0 || stat[typeMappings[type]]();
    module2.exports = async (paths, options) => {
      options = {
        cwd: process.cwd(),
        type: "file",
        allowSymlinks: true,
        ...options
      };
      checkType(options);
      const statFn = options.allowSymlinks ? fsStat : fsLStat;
      return pLocate(paths, async (path_) => {
        try {
          const stat = await statFn(path.resolve(options.cwd, path_));
          return matchType(options.type, stat);
        } catch {
          return false;
        }
      }, options);
    };
    module2.exports.sync = (paths, options) => {
      options = {
        cwd: process.cwd(),
        allowSymlinks: true,
        type: "file",
        ...options
      };
      checkType(options);
      const statFn = options.allowSymlinks ? fs.statSync : fs.lstatSync;
      for (const path_ of paths) {
        try {
          const stat = statFn(path.resolve(options.cwd, path_));
          if (matchType(options.type, stat)) {
            return path_;
          }
        } catch {
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/path-exists@4.0.0/node_modules/path-exists/index.js
var require_path_exists = __commonJS({
  "../../node_modules/.pnpm/path-exists@4.0.0/node_modules/path-exists/index.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var { promisify } = require("util");
    var pAccess = promisify(fs.access);
    module2.exports = async (path) => {
      try {
        await pAccess(path);
        return true;
      } catch (_) {
        return false;
      }
    };
    module2.exports.sync = (path) => {
      try {
        fs.accessSync(path);
        return true;
      } catch (_) {
        return false;
      }
    };
  }
});

// ../../node_modules/.pnpm/find-up@5.0.0/node_modules/find-up/index.js
var require_find_up = __commonJS({
  "../../node_modules/.pnpm/find-up@5.0.0/node_modules/find-up/index.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var locatePath = require_locate_path();
    var pathExists = require_path_exists();
    var stop = Symbol("findUp.stop");
    module2.exports = async (name, options = {}) => {
      let directory = path.resolve(options.cwd || "");
      const { root } = path.parse(directory);
      const paths = [].concat(name);
      const runMatcher = async (locateOptions) => {
        if (typeof name !== "function") {
          return locatePath(paths, locateOptions);
        }
        const foundPath = await name(locateOptions.cwd);
        if (typeof foundPath === "string") {
          return locatePath([foundPath], locateOptions);
        }
        return foundPath;
      };
      while (true) {
        const foundPath = await runMatcher({ ...options, cwd: directory });
        if (foundPath === stop) {
          return;
        }
        if (foundPath) {
          return path.resolve(directory, foundPath);
        }
        if (directory === root) {
          return;
        }
        directory = path.dirname(directory);
      }
    };
    module2.exports.sync = (name, options = {}) => {
      let directory = path.resolve(options.cwd || "");
      const { root } = path.parse(directory);
      const paths = [].concat(name);
      const runMatcher = (locateOptions) => {
        if (typeof name !== "function") {
          return locatePath.sync(paths, locateOptions);
        }
        const foundPath = name(locateOptions.cwd);
        if (typeof foundPath === "string") {
          return locatePath.sync([foundPath], locateOptions);
        }
        return foundPath;
      };
      while (true) {
        const foundPath = runMatcher({ ...options, cwd: directory });
        if (foundPath === stop) {
          return;
        }
        if (foundPath) {
          return path.resolve(directory, foundPath);
        }
        if (directory === root) {
          return;
        }
        directory = path.dirname(directory);
      }
    };
    module2.exports.exists = pathExists;
    module2.exports.sync.exists = pathExists.sync;
    module2.exports.stop = stop;
  }
});

// ../find-workspace-dir/lib/index.js
var require_lib2 = __commonJS({
  "../find-workspace-dir/lib/index.js"(exports2) {
    "use strict";
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var path_12 = __importDefault2(require("path"));
    var error_1 = __importDefault2(require_lib());
    var find_up_1 = __importDefault2(require_find_up());
    var WORKSPACE_DIR_ENV_VAR = "NPM_CONFIG_WORKSPACE_DIR";
    var WORKSPACE_MANIFEST_FILENAME = "pnpm-workspace.yaml";
    async function findWorkspaceDir(cwd) {
      var _a;
      const workspaceManifestDirEnvVar = (_a = process.env[WORKSPACE_DIR_ENV_VAR]) !== null && _a !== void 0 ? _a : process.env[WORKSPACE_DIR_ENV_VAR.toLowerCase()];
      const workspaceManifestLocation = workspaceManifestDirEnvVar ? path_12.default.join(workspaceManifestDirEnvVar, "pnpm-workspace.yaml") : await find_up_1.default([WORKSPACE_MANIFEST_FILENAME, "pnpm-workspace.yml"], { cwd });
      if (workspaceManifestLocation === null || workspaceManifestLocation === void 0 ? void 0 : workspaceManifestLocation.endsWith(".yml")) {
        throw new error_1.default("BAD_WORKSPACE_MANIFEST_NAME", `The workspace manifest file should be named "pnpm-workspace.yaml". File found: ${workspaceManifestLocation}`);
      }
      return workspaceManifestLocation && path_12.default.dirname(workspaceManifestLocation);
    }
    exports2.default = findWorkspaceDir;
  }
});

// ../../node_modules/.pnpm/@zkochan+rimraf@2.1.1/node_modules/@zkochan/rimraf/index.js
var require_rimraf = __commonJS({
  "../../node_modules/.pnpm/@zkochan+rimraf@2.1.1/node_modules/@zkochan/rimraf/index.js"(exports2, module2) {
    var fs = require("fs");
    var rm = fs.promises.rm ? fs.promises.rm : fs.promises.rmdir;
    var rmdirSync = fs.rmSync ? fs.rmSync : fs.rmdirSync;
    module2.exports = async (p) => {
      try {
        await rm(p, { recursive: true, maxRetries: 3 });
      } catch (err) {
        if (err.code === "ENOTDIR" || err.code === "ENOENT")
          return;
        throw err;
      }
    };
    module2.exports.sync = (p) => {
      try {
        rmdirSync(p, { recursive: true, maxRetries: 3 });
      } catch (err) {
        if (err.code === "ENOTDIR" || err.code === "ENOENT")
          return;
        throw err;
      }
    };
  }
});

// ../../node_modules/.pnpm/can-link@2.0.0/node_modules/can-link/index.js
var require_can_link = __commonJS({
  "../../node_modules/.pnpm/can-link@2.0.0/node_modules/can-link/index.js"(exports2, module2) {
    "use strict";
    var defaultFS = require("fs");
    module2.exports = async (existingPath, newPath, customFS) => {
      const fs = customFS || defaultFS;
      try {
        await fs.promises.link(existingPath, newPath);
        fs.promises.unlink(newPath).catch(() => {
        });
        return true;
      } catch (err) {
        if (err.code === "EXDEV" || err.code === "EACCES" || err.code === "EPERM") {
          return false;
        }
        throw err;
      }
    };
    module2.exports.sync = (existingPath, newPath, customFS) => {
      const fs = customFS || defaultFS;
      try {
        fs.linkSync(existingPath, newPath);
        fs.unlinkSync(newPath);
        return true;
      } catch (err) {
        if (err.code === "EXDEV" || err.code === "EACCES" || err.code === "EPERM") {
          return false;
        }
        throw err;
      }
    };
  }
});

// ../../node_modules/.pnpm/path-absolute@1.0.1/node_modules/path-absolute/index.js
var require_path_absolute = __commonJS({
  "../../node_modules/.pnpm/path-absolute@1.0.1/node_modules/path-absolute/index.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var path = require("path");
    module2.exports = function(filepath, cwd) {
      const home = getHomedir();
      if (isHomepath(filepath)) {
        return path.join(home, filepath.substr(2));
      }
      if (path.isAbsolute(filepath)) {
        return filepath;
      }
      if (cwd) {
        return path.join(cwd, filepath);
      }
      return path.resolve(filepath);
    };
    function getHomedir() {
      const home = os.homedir();
      if (!home)
        throw new Error("Could not find the homedir");
      return home;
    }
    function isHomepath(filepath) {
      return filepath.indexOf("~/") === 0 || filepath.indexOf("~\\") === 0;
    }
  }
});

// ../../node_modules/.pnpm/crypto-random-string@2.0.0/node_modules/crypto-random-string/index.js
var require_crypto_random_string = __commonJS({
  "../../node_modules/.pnpm/crypto-random-string@2.0.0/node_modules/crypto-random-string/index.js"(exports2, module2) {
    "use strict";
    var crypto = require("crypto");
    module2.exports = (length) => {
      if (!Number.isFinite(length)) {
        throw new TypeError("Expected a finite number");
      }
      return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
    };
  }
});

// ../../node_modules/.pnpm/unique-string@2.0.0/node_modules/unique-string/index.js
var require_unique_string = __commonJS({
  "../../node_modules/.pnpm/unique-string@2.0.0/node_modules/unique-string/index.js"(exports2, module2) {
    "use strict";
    var cryptoRandomString = require_crypto_random_string();
    module2.exports = () => cryptoRandomString(32);
  }
});

// ../../node_modules/.pnpm/path-temp@2.0.0/node_modules/path-temp/index.js
var require_path_temp = __commonJS({
  "../../node_modules/.pnpm/path-temp@2.0.0/node_modules/path-temp/index.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var uniqueString = require_unique_string();
    module2.exports = function pathTemp(folder) {
      return path.join(folder, `_tmp_${process.pid}_${uniqueString()}`);
    };
  }
});

// ../../node_modules/.pnpm/next-path@1.0.0/node_modules/next-path/index.js
var require_next_path = __commonJS({
  "../../node_modules/.pnpm/next-path@1.0.0/node_modules/next-path/index.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var nextPath = (from, to) => {
      const diff = path.relative(from, to);
      const sepIndex = diff.indexOf(path.sep);
      const next = sepIndex >= 0 ? diff.substring(0, sepIndex) : diff;
      return path.join(from, next);
    };
    module2.exports = nextPath;
  }
});

// ../../node_modules/.pnpm/root-link-target@3.1.0/node_modules/root-link-target/index.js
var require_root_link_target = __commonJS({
  "../../node_modules/.pnpm/root-link-target@3.1.0/node_modules/root-link-target/index.js"(exports2, module2) {
    "use strict";
    var canLink = require_can_link();
    var path = require("path");
    var pathTemp = require_path_temp();
    var nextPath = require_next_path();
    module2.exports = async (filePath) => {
      filePath = path.resolve(filePath);
      const end = path.dirname(filePath);
      let dir = path.parse(end).root;
      while (true) {
        const result = await canLink(filePath, pathTemp(dir));
        if (result) {
          return dir;
        } else if (dir === end) {
          throw new Error(`${filePath} cannot be linked to anywhere`);
        } else {
          dir = nextPath(dir, end);
        }
      }
    };
    module2.exports.sync = (filePath) => {
      filePath = path.resolve(filePath);
      const end = path.dirname(filePath);
      let dir = path.parse(end).root;
      while (true) {
        const result = canLink.sync(filePath, pathTemp(dir));
        if (result) {
          return dir;
        } else if (dir === end) {
          throw new Error(`${filePath} cannot be linked to anywhere`);
        } else {
          dir = nextPath(dir, end);
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/touch@3.1.0/node_modules/touch/index.js
var require_touch = __commonJS({
  "../../node_modules/.pnpm/touch@3.1.0/node_modules/touch/index.js"(exports2, module2) {
    "use strict";
    var EE = require("events").EventEmitter;
    var cons = require("constants");
    var fs = require("fs");
    module2.exports = (f, options, cb) => {
      if (typeof options === "function")
        cb = options, options = {};
      const p = new Promise((res, rej) => {
        new Touch(validOpts(options, f, null)).on("done", res).on("error", rej);
      });
      return cb ? p.then((res) => cb(null, res), cb) : p;
    };
    module2.exports.sync = module2.exports.touchSync = (f, options) => (new TouchSync(validOpts(options, f, null)), void 0);
    module2.exports.ftouch = (fd, options, cb) => {
      if (typeof options === "function")
        cb = options, options = {};
      const p = new Promise((res, rej) => {
        new Touch(validOpts(options, null, fd)).on("done", res).on("error", rej);
      });
      return cb ? p.then((res) => cb(null, res), cb) : p;
    };
    module2.exports.ftouchSync = (fd, opt) => (new TouchSync(validOpts(opt, null, fd)), void 0);
    var validOpts = (options, path, fd) => {
      options = Object.create(options || {});
      options.fd = fd;
      options.path = path;
      const now = parseInt(new Date(options.time || Date.now()).getTime() / 1e3);
      if (!options.atime && !options.mtime)
        options.atime = options.mtime = now;
      else {
        if (options.atime === true)
          options.atime = now;
        if (options.mtime === true)
          options.mtime = now;
      }
      let oflags = 0;
      if (!options.force)
        oflags = oflags | cons.O_RDWR;
      if (!options.nocreate)
        oflags = oflags | cons.O_CREAT;
      options.oflags = oflags;
      return options;
    };
    var Touch = class extends EE {
      constructor(options) {
        super(options);
        this.fd = options.fd;
        this.path = options.path;
        this.atime = options.atime;
        this.mtime = options.mtime;
        this.ref = options.ref;
        this.nocreate = !!options.nocreate;
        this.force = !!options.force;
        this.closeAfter = options.closeAfter;
        this.oflags = options.oflags;
        this.options = options;
        if (typeof this.fd !== "number") {
          this.closeAfter = true;
          this.open();
        } else
          this.onopen(null, this.fd);
      }
      emit(ev, data) {
        this.close();
        return super.emit(ev, data);
      }
      close() {
        if (typeof this.fd === "number" && this.closeAfter)
          fs.close(this.fd, () => {
          });
      }
      open() {
        fs.open(this.path, this.oflags, (er, fd) => this.onopen(er, fd));
      }
      onopen(er, fd) {
        if (er) {
          if (er.code === "EISDIR")
            this.onopen(null, null);
          else if (er.code === "ENOENT" && this.nocreate)
            this.emit("done");
          else
            this.emit("error", er);
        } else {
          this.fd = fd;
          if (this.ref)
            this.statref();
          else if (!this.atime || !this.mtime)
            this.fstat();
          else
            this.futimes();
        }
      }
      statref() {
        fs.stat(this.ref, (er, st) => {
          if (er)
            this.emit("error", er);
          else
            this.onstatref(st);
        });
      }
      onstatref(st) {
        this.atime = this.atime && parseInt(st.atime.getTime() / 1e3, 10);
        this.mtime = this.mtime && parseInt(st.mtime.getTime() / 1e3, 10);
        if (!this.atime || !this.mtime)
          this.fstat();
        else
          this.futimes();
      }
      fstat() {
        const stat = this.fd ? "fstat" : "stat";
        const target = this.fd || this.path;
        fs[stat](target, (er, st) => {
          if (er)
            this.emit("error", er);
          else
            this.onfstat(st);
        });
      }
      onfstat(st) {
        if (typeof this.atime !== "number")
          this.atime = parseInt(st.atime.getTime() / 1e3, 10);
        if (typeof this.mtime !== "number")
          this.mtime = parseInt(st.mtime.getTime() / 1e3, 10);
        this.futimes();
      }
      futimes() {
        const utimes = this.fd ? "futimes" : "utimes";
        const target = this.fd || this.path;
        fs[utimes](target, "" + this.atime, "" + this.mtime, (er) => {
          if (er)
            this.emit("error", er);
          else
            this.emit("done");
        });
      }
    };
    var TouchSync = class extends Touch {
      open() {
        try {
          this.onopen(null, fs.openSync(this.path, this.oflags));
        } catch (er) {
          this.onopen(er);
        }
      }
      statref() {
        let threw = true;
        try {
          this.onstatref(fs.statSync(this.ref));
          threw = false;
        } finally {
          if (threw)
            this.close();
        }
      }
      fstat() {
        let threw = true;
        const stat = this.fd ? "fstatSync" : "statSync";
        const target = this.fd || this.path;
        try {
          this.onfstat(fs[stat](target));
          threw = false;
        } finally {
          if (threw)
            this.close();
        }
      }
      futimes() {
        let threw = true;
        const utimes = this.fd ? "futimesSync" : "utimesSync";
        const target = this.fd || this.path;
        try {
          fs[utimes](target, this.atime, this.mtime);
          threw = false;
        } finally {
          if (threw)
            this.close();
        }
        this.emit("done");
      }
      close() {
        if (typeof this.fd === "number" && this.closeAfter)
          try {
            fs.closeSync(this.fd);
          } catch (er) {
          }
      }
    };
  }
});

// ../../node_modules/.pnpm/@pnpm+store-path@5.0.0/node_modules/@pnpm/store-path/lib/index.js
var require_lib3 = __commonJS({
  "../../node_modules/.pnpm/@pnpm+store-path@5.0.0/node_modules/@pnpm/store-path/lib/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fs_1 = require("fs");
    var rimraf = require_rimraf();
    var canLink = require_can_link();
    var os = require("os");
    var path = require("path");
    var pathAbsolute = require_path_absolute();
    var pathTemp = require_path_temp();
    var rootLinkTarget = require_root_link_target();
    var touch = require_touch();
    var STORE_VERSION = "v3";
    async function default_1(pkgRoot, storePath) {
      if (!storePath || isHomepath(storePath)) {
        const relStorePath = storePath ? storePath.substr(2) : ".pnpm-store";
        return await storePathRelativeToHome(pkgRoot, relStorePath);
      }
      const storeBasePath = pathAbsolute(storePath, pkgRoot);
      if (storeBasePath.endsWith(`${path.sep}${STORE_VERSION}`)) {
        return storeBasePath;
      }
      return path.join(storeBasePath, STORE_VERSION);
    }
    exports2.default = default_1;
    async function storePathRelativeToHome(pkgRoot, relStore) {
      const tempFile = pathTemp(pkgRoot);
      await fs_1.promises.mkdir(path.dirname(tempFile), { recursive: true });
      await touch(tempFile);
      const homedir = getHomedir();
      if (await canLinkToSubdir(tempFile, homedir)) {
        await fs_1.promises.unlink(tempFile);
        return path.join(homedir, relStore, STORE_VERSION);
      }
      try {
        let mountpoint = await rootLinkTarget(tempFile);
        const mountpointParent = path.join(mountpoint, "..");
        if (!dirsAreEqual(mountpointParent, mountpoint) && await canLinkToSubdir(tempFile, mountpointParent)) {
          mountpoint = mountpointParent;
        }
        if (dirsAreEqual(pkgRoot, mountpoint)) {
          return path.join(homedir, relStore, STORE_VERSION);
        }
        return path.join(mountpoint, relStore, STORE_VERSION);
      } catch (err) {
        return path.join(homedir, relStore, STORE_VERSION);
      } finally {
        await fs_1.promises.unlink(tempFile);
      }
    }
    async function canLinkToSubdir(fileToLink, dir) {
      let result = false;
      const tmpDir = pathTemp(dir);
      try {
        await fs_1.promises.mkdir(tmpDir, { recursive: true });
        result = await canLink(fileToLink, pathTemp(tmpDir));
      } catch (err) {
        result = false;
      } finally {
        await safeRmdir(tmpDir);
      }
      return result;
    }
    async function safeRmdir(dir) {
      try {
        await rimraf(dir);
      } catch (err) {
      }
    }
    function dirsAreEqual(dir1, dir2) {
      return path.relative(dir1, dir2) === ".";
    }
    function getHomedir() {
      const home = os.homedir();
      if (!home)
        throw new Error("Could not find the homedir");
      return home;
    }
    function isHomepath(filepath) {
      return filepath.indexOf("~/") === 0 || filepath.indexOf("~\\") === 0;
    }
  }
});

// ../../node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "../../node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js"(exports2, module2) {
    var buffer = require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// ../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/util.js
var require_util = __commonJS({
  "../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/util.js"(exports2, module2) {
    "use strict";
    module2.exports.promisify = promisify;
    function promisify(f) {
      const util = require("util");
      if (util.promisify) {
        return util.promisify(f);
      } else {
        return function() {
          return new Promise((resolve, reject) => {
            f.apply(this, [].slice.call(arguments).concat((err, val) => {
              err ? reject(err) : resolve(val);
            }));
          });
        };
      }
    }
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/common-types.js
var require_common_types = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/common-types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.objectKeys = exports2.assertSingleKey = exports2.assertNotStrictEqual = void 0;
    var assert_1 = require("assert");
    function assertNotStrictEqual(actual, expected, message) {
      assert_1.notStrictEqual(actual, expected, message);
    }
    exports2.assertNotStrictEqual = assertNotStrictEqual;
    function assertSingleKey(actual) {
      assert_1.strictEqual(typeof actual, "string");
    }
    exports2.assertSingleKey = assertSingleKey;
    function objectKeys(object) {
      return Object.keys(object);
    }
    exports2.objectKeys = objectKeys;
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/is-promise.js
var require_is_promise = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/is-promise.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isPromise = void 0;
    function isPromise(maybePromise) {
      return !!maybePromise && !!maybePromise.then && typeof maybePromise.then === "function";
    }
    exports2.isPromise = isPromise;
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/yerror.js
var require_yerror = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/yerror.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.YError = void 0;
    var YError = class extends Error {
      constructor(msg) {
        super(msg || "yargs error");
        this.name = "YError";
        Error.captureStackTrace(this, YError);
      }
    };
    exports2.YError = YError;
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/parse-command.js
var require_parse_command = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/parse-command.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseCommand = void 0;
    function parseCommand(cmd) {
      const extraSpacesStrippedCommand = cmd.replace(/\s{2,}/g, " ");
      const splitCommand = extraSpacesStrippedCommand.split(/\s+(?![^[]*]|[^<]*>)/);
      const bregex = /\.*[\][<>]/g;
      const firstCommand = splitCommand.shift();
      if (!firstCommand)
        throw new Error(`No command found in: ${cmd}`);
      const parsedCommand = {
        cmd: firstCommand.replace(bregex, ""),
        demanded: [],
        optional: []
      };
      splitCommand.forEach((cmd2, i) => {
        let variadic = false;
        cmd2 = cmd2.replace(/\s/g, "");
        if (/\.+[\]>]/.test(cmd2) && i === splitCommand.length - 1)
          variadic = true;
        if (/^\[/.test(cmd2)) {
          parsedCommand.optional.push({
            cmd: cmd2.replace(bregex, "").split("|"),
            variadic
          });
        } else {
          parsedCommand.demanded.push({
            cmd: cmd2.replace(bregex, "").split("|"),
            variadic
          });
        }
      });
      return parsedCommand;
    }
    exports2.parseCommand = parseCommand;
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/argsert.js
var require_argsert = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/argsert.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.argsert = void 0;
    var yerror_1 = require_yerror();
    var parse_command_1 = require_parse_command();
    var positionName = ["first", "second", "third", "fourth", "fifth", "sixth"];
    function argsert(arg1, arg2, arg3) {
      function parseArgs() {
        return typeof arg1 === "object" ? [{ demanded: [], optional: [] }, arg1, arg2] : [parse_command_1.parseCommand(`cmd ${arg1}`), arg2, arg3];
      }
      try {
        let position = 0;
        let [parsed, callerArguments, length] = parseArgs();
        const args = [].slice.call(callerArguments);
        while (args.length && args[args.length - 1] === void 0)
          args.pop();
        length = length || args.length;
        if (length < parsed.demanded.length) {
          throw new yerror_1.YError(`Not enough arguments provided. Expected ${parsed.demanded.length} but received ${args.length}.`);
        }
        const totalCommands = parsed.demanded.length + parsed.optional.length;
        if (length > totalCommands) {
          throw new yerror_1.YError(`Too many arguments provided. Expected max ${totalCommands} but received ${length}.`);
        }
        parsed.demanded.forEach((demanded) => {
          const arg = args.shift();
          const observedType = guessType(arg);
          const matchingTypes = demanded.cmd.filter((type) => type === observedType || type === "*");
          if (matchingTypes.length === 0)
            argumentTypeError(observedType, demanded.cmd, position);
          position += 1;
        });
        parsed.optional.forEach((optional) => {
          if (args.length === 0)
            return;
          const arg = args.shift();
          const observedType = guessType(arg);
          const matchingTypes = optional.cmd.filter((type) => type === observedType || type === "*");
          if (matchingTypes.length === 0)
            argumentTypeError(observedType, optional.cmd, position);
          position += 1;
        });
      } catch (err) {
        console.warn(err.stack);
      }
    }
    exports2.argsert = argsert;
    function guessType(arg) {
      if (Array.isArray(arg)) {
        return "array";
      } else if (arg === null) {
        return "null";
      }
      return typeof arg;
    }
    function argumentTypeError(observedType, allowedTypes, position) {
      throw new yerror_1.YError(`Invalid ${positionName[position] || "manyith"} argument. Expected ${allowedTypes.join(" or ")} but received ${observedType}.`);
    }
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/middleware.js
var require_middleware = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/middleware.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.applyMiddleware = exports2.commandMiddlewareFactory = exports2.globalMiddlewareFactory = void 0;
    var argsert_1 = require_argsert();
    var is_promise_1 = require_is_promise();
    function globalMiddlewareFactory(globalMiddleware, context) {
      return function(callback, applyBeforeValidation = false) {
        argsert_1.argsert("<array|function> [boolean]", [callback, applyBeforeValidation], arguments.length);
        if (Array.isArray(callback)) {
          for (let i = 0; i < callback.length; i++) {
            if (typeof callback[i] !== "function") {
              throw Error("middleware must be a function");
            }
            callback[i].applyBeforeValidation = applyBeforeValidation;
          }
          Array.prototype.push.apply(globalMiddleware, callback);
        } else if (typeof callback === "function") {
          callback.applyBeforeValidation = applyBeforeValidation;
          globalMiddleware.push(callback);
        }
        return context;
      };
    }
    exports2.globalMiddlewareFactory = globalMiddlewareFactory;
    function commandMiddlewareFactory(commandMiddleware) {
      if (!commandMiddleware)
        return [];
      return commandMiddleware.map((middleware) => {
        middleware.applyBeforeValidation = false;
        return middleware;
      });
    }
    exports2.commandMiddlewareFactory = commandMiddlewareFactory;
    function applyMiddleware(argv, yargs, middlewares, beforeValidation) {
      const beforeValidationError = new Error("middleware cannot return a promise when applyBeforeValidation is true");
      return middlewares.reduce((acc, middleware) => {
        if (middleware.applyBeforeValidation !== beforeValidation) {
          return acc;
        }
        if (is_promise_1.isPromise(acc)) {
          return acc.then((initialObj) => Promise.all([initialObj, middleware(initialObj, yargs)])).then(([initialObj, middlewareObj]) => Object.assign(initialObj, middlewareObj));
        } else {
          const result = middleware(acc, yargs);
          if (beforeValidation && is_promise_1.isPromise(result))
            throw beforeValidationError;
          return is_promise_1.isPromise(result) ? result.then((middlewareObj) => Object.assign(acc, middlewareObj)) : Object.assign(acc, result);
        }
      }, argv);
    }
    exports2.applyMiddleware = applyMiddleware;
  }
});

// ../../node_modules/.pnpm/require-directory@2.1.1/node_modules/require-directory/index.js
var require_require_directory = __commonJS({
  "../../node_modules/.pnpm/require-directory@2.1.1/node_modules/require-directory/index.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var join = require("path").join;
    var resolve = require("path").resolve;
    var dirname = require("path").dirname;
    var defaultOptions = {
      extensions: ["js", "json", "coffee"],
      recurse: true,
      rename: function(name) {
        return name;
      },
      visit: function(obj) {
        return obj;
      }
    };
    function checkFileInclusion(path, filename, options) {
      return new RegExp("\\.(" + options.extensions.join("|") + ")$", "i").test(filename) && !(options.include && options.include instanceof RegExp && !options.include.test(path)) && !(options.include && typeof options.include === "function" && !options.include(path, filename)) && !(options.exclude && options.exclude instanceof RegExp && options.exclude.test(path)) && !(options.exclude && typeof options.exclude === "function" && options.exclude(path, filename));
    }
    function requireDirectory(m, path, options) {
      var retval = {};
      if (path && !options && typeof path !== "string") {
        options = path;
        path = null;
      }
      options = options || {};
      for (var prop in defaultOptions) {
        if (typeof options[prop] === "undefined") {
          options[prop] = defaultOptions[prop];
        }
      }
      path = !path ? dirname(m.filename) : resolve(dirname(m.filename), path);
      fs.readdirSync(path).forEach(function(filename) {
        var joined = join(path, filename), files, key, obj;
        if (fs.statSync(joined).isDirectory() && options.recurse) {
          files = requireDirectory(m, joined, options);
          if (Object.keys(files).length) {
            retval[options.rename(filename, joined, filename)] = files;
          }
        } else {
          if (joined !== m.filename && checkFileInclusion(joined, filename, options)) {
            key = filename.substring(0, filename.lastIndexOf("."));
            obj = m.require(joined);
            retval[options.rename(key, joined, filename)] = options.visit(obj, joined, filename) || obj;
          }
        }
      });
      return retval;
    }
    module2.exports = requireDirectory;
    module2.exports.defaults = defaultOptions;
  }
});

// ../../node_modules/.pnpm/which-module@2.0.0/node_modules/which-module/index.js
var require_which_module = __commonJS({
  "../../node_modules/.pnpm/which-module@2.0.0/node_modules/which-module/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function whichModule(exported) {
      for (var i = 0, files = Object.keys(require.cache), mod; i < files.length; i++) {
        mod = require.cache[files[i]];
        if (mod.exports === exported)
          return mod;
      }
      return null;
    };
  }
});

// ../../node_modules/.pnpm/camelcase@5.3.1/node_modules/camelcase/index.js
var require_camelcase = __commonJS({
  "../../node_modules/.pnpm/camelcase@5.3.1/node_modules/camelcase/index.js"(exports2, module2) {
    "use strict";
    var preserveCamelCase = (string) => {
      let isLastCharLower = false;
      let isLastCharUpper = false;
      let isLastLastCharUpper = false;
      for (let i = 0; i < string.length; i++) {
        const character = string[i];
        if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
          string = string.slice(0, i) + "-" + string.slice(i);
          isLastCharLower = false;
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = true;
          i++;
        } else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
          string = string.slice(0, i - 1) + "-" + string.slice(i - 1);
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = false;
          isLastCharLower = true;
        } else {
          isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
        }
      }
      return string;
    };
    var camelCase = (input, options) => {
      if (!(typeof input === "string" || Array.isArray(input))) {
        throw new TypeError("Expected the input to be `string | string[]`");
      }
      options = Object.assign({
        pascalCase: false
      }, options);
      const postProcess = (x) => options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;
      if (Array.isArray(input)) {
        input = input.map((x) => x.trim()).filter((x) => x.length).join("-");
      } else {
        input = input.trim();
      }
      if (input.length === 0) {
        return "";
      }
      if (input.length === 1) {
        return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
      }
      const hasUpperCase = input !== input.toLowerCase();
      if (hasUpperCase) {
        input = preserveCamelCase(input);
      }
      input = input.replace(/^[_.\- ]+/, "").toLowerCase().replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase()).replace(/\d+(\w|$)/g, (m) => m.toUpperCase());
      return postProcess(input);
    };
    module2.exports = camelCase;
    module2.exports.default = camelCase;
  }
});

// ../../node_modules/.pnpm/decamelize@1.2.0/node_modules/decamelize/index.js
var require_decamelize = __commonJS({
  "../../node_modules/.pnpm/decamelize@1.2.0/node_modules/decamelize/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(str, sep) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      sep = typeof sep === "undefined" ? "_" : sep;
      return str.replace(/([a-z\d])([A-Z])/g, "$1" + sep + "$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + sep + "$2").toLowerCase();
    };
  }
});

// ../../node_modules/.pnpm/yargs-parser@18.1.3/node_modules/yargs-parser/lib/tokenize-arg-string.js
var require_tokenize_arg_string = __commonJS({
  "../../node_modules/.pnpm/yargs-parser@18.1.3/node_modules/yargs-parser/lib/tokenize-arg-string.js"(exports2, module2) {
    module2.exports = function(argString) {
      if (Array.isArray(argString)) {
        return argString.map((e) => typeof e !== "string" ? e + "" : e);
      }
      argString = argString.trim();
      let i = 0;
      let prevC = null;
      let c = null;
      let opening = null;
      const args = [];
      for (let ii = 0; ii < argString.length; ii++) {
        prevC = c;
        c = argString.charAt(ii);
        if (c === " " && !opening) {
          if (!(prevC === " ")) {
            i++;
          }
          continue;
        }
        if (c === opening) {
          opening = null;
        } else if ((c === "'" || c === '"') && !opening) {
          opening = c;
        }
        if (!args[i])
          args[i] = "";
        args[i] += c;
      }
      return args;
    };
  }
});

// ../../node_modules/.pnpm/yargs-parser@18.1.3/node_modules/yargs-parser/index.js
var require_yargs_parser = __commonJS({
  "../../node_modules/.pnpm/yargs-parser@18.1.3/node_modules/yargs-parser/index.js"(exports2, module2) {
    var camelCase = require_camelcase();
    var decamelize = require_decamelize();
    var path = require("path");
    var tokenizeArgString = require_tokenize_arg_string();
    var util = require("util");
    function parse(args, opts) {
      opts = Object.assign(Object.create(null), opts);
      args = tokenizeArgString(args);
      const aliases = combineAliases(Object.assign(Object.create(null), opts.alias));
      const configuration = Object.assign({
        "boolean-negation": true,
        "camel-case-expansion": true,
        "combine-arrays": false,
        "dot-notation": true,
        "duplicate-arguments-array": true,
        "flatten-duplicate-arrays": true,
        "greedy-arrays": true,
        "halt-at-non-option": false,
        "nargs-eats-options": false,
        "negation-prefix": "no-",
        "parse-numbers": true,
        "populate--": false,
        "set-placeholder-key": false,
        "short-option-groups": true,
        "strip-aliased": false,
        "strip-dashed": false,
        "unknown-options-as-args": false
      }, opts.configuration);
      const defaults = Object.assign(Object.create(null), opts.default);
      const configObjects = opts.configObjects || [];
      const envPrefix = opts.envPrefix;
      const notFlagsOption = configuration["populate--"];
      const notFlagsArgv = notFlagsOption ? "--" : "_";
      const newAliases = Object.create(null);
      const defaulted = Object.create(null);
      const __ = opts.__ || util.format;
      const flags = {
        aliases: Object.create(null),
        arrays: Object.create(null),
        bools: Object.create(null),
        strings: Object.create(null),
        numbers: Object.create(null),
        counts: Object.create(null),
        normalize: Object.create(null),
        configs: Object.create(null),
        nargs: Object.create(null),
        coercions: Object.create(null),
        keys: []
      };
      const negative = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/;
      const negatedBoolean = new RegExp("^--" + configuration["negation-prefix"] + "(.+)");
      [].concat(opts.array).filter(Boolean).forEach(function(opt) {
        const key = opt.key || opt;
        const assignment = Object.keys(opt).map(function(key2) {
          return {
            boolean: "bools",
            string: "strings",
            number: "numbers"
          }[key2];
        }).filter(Boolean).pop();
        if (assignment) {
          flags[assignment][key] = true;
        }
        flags.arrays[key] = true;
        flags.keys.push(key);
      });
      [].concat(opts.boolean).filter(Boolean).forEach(function(key) {
        flags.bools[key] = true;
        flags.keys.push(key);
      });
      [].concat(opts.string).filter(Boolean).forEach(function(key) {
        flags.strings[key] = true;
        flags.keys.push(key);
      });
      [].concat(opts.number).filter(Boolean).forEach(function(key) {
        flags.numbers[key] = true;
        flags.keys.push(key);
      });
      [].concat(opts.count).filter(Boolean).forEach(function(key) {
        flags.counts[key] = true;
        flags.keys.push(key);
      });
      [].concat(opts.normalize).filter(Boolean).forEach(function(key) {
        flags.normalize[key] = true;
        flags.keys.push(key);
      });
      Object.keys(opts.narg || {}).forEach(function(k) {
        flags.nargs[k] = opts.narg[k];
        flags.keys.push(k);
      });
      Object.keys(opts.coerce || {}).forEach(function(k) {
        flags.coercions[k] = opts.coerce[k];
        flags.keys.push(k);
      });
      if (Array.isArray(opts.config) || typeof opts.config === "string") {
        ;
        [].concat(opts.config).filter(Boolean).forEach(function(key) {
          flags.configs[key] = true;
        });
      } else {
        Object.keys(opts.config || {}).forEach(function(k) {
          flags.configs[k] = opts.config[k];
        });
      }
      extendAliases(opts.key, aliases, opts.default, flags.arrays);
      Object.keys(defaults).forEach(function(key) {
        (flags.aliases[key] || []).forEach(function(alias) {
          defaults[alias] = defaults[key];
        });
      });
      let error = null;
      checkConfiguration();
      let notFlags = [];
      const argv = Object.assign(Object.create(null), { _: [] });
      const argvReturn = {};
      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        let broken;
        let key;
        let letters;
        let m;
        let next;
        let value;
        if (arg !== "--" && isUnknownOptionAsArg(arg)) {
          argv._.push(arg);
        } else if (arg.match(/^--.+=/) || !configuration["short-option-groups"] && arg.match(/^-.+=/)) {
          m = arg.match(/^--?([^=]+)=([\s\S]*)$/);
          if (checkAllAliases(m[1], flags.arrays)) {
            i = eatArray(i, m[1], args, m[2]);
          } else if (checkAllAliases(m[1], flags.nargs) !== false) {
            i = eatNargs(i, m[1], args, m[2]);
          } else {
            setArg(m[1], m[2]);
          }
        } else if (arg.match(negatedBoolean) && configuration["boolean-negation"]) {
          key = arg.match(negatedBoolean)[1];
          setArg(key, checkAllAliases(key, flags.arrays) ? [false] : false);
        } else if (arg.match(/^--.+/) || !configuration["short-option-groups"] && arg.match(/^-[^-]+/)) {
          key = arg.match(/^--?(.+)/)[1];
          if (checkAllAliases(key, flags.arrays)) {
            i = eatArray(i, key, args);
          } else if (checkAllAliases(key, flags.nargs) !== false) {
            i = eatNargs(i, key, args);
          } else {
            next = args[i + 1];
            if (next !== void 0 && (!next.match(/^-/) || next.match(negative)) && !checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts)) {
              setArg(key, next);
              i++;
            } else if (/^(true|false)$/.test(next)) {
              setArg(key, next);
              i++;
            } else {
              setArg(key, defaultValue(key));
            }
          }
        } else if (arg.match(/^-.\..+=/)) {
          m = arg.match(/^-([^=]+)=([\s\S]*)$/);
          setArg(m[1], m[2]);
        } else if (arg.match(/^-.\..+/) && !arg.match(negative)) {
          next = args[i + 1];
          key = arg.match(/^-(.\..+)/)[1];
          if (next !== void 0 && !next.match(/^-/) && !checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts)) {
            setArg(key, next);
            i++;
          } else {
            setArg(key, defaultValue(key));
          }
        } else if (arg.match(/^-[^-]+/) && !arg.match(negative)) {
          letters = arg.slice(1, -1).split("");
          broken = false;
          for (let j = 0; j < letters.length; j++) {
            next = arg.slice(j + 2);
            if (letters[j + 1] && letters[j + 1] === "=") {
              value = arg.slice(j + 3);
              key = letters[j];
              if (checkAllAliases(key, flags.arrays)) {
                i = eatArray(i, key, args, value);
              } else if (checkAllAliases(key, flags.nargs) !== false) {
                i = eatNargs(i, key, args, value);
              } else {
                setArg(key, value);
              }
              broken = true;
              break;
            }
            if (next === "-") {
              setArg(letters[j], next);
              continue;
            }
            if (/[A-Za-z]/.test(letters[j]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
              setArg(letters[j], next);
              broken = true;
              break;
            }
            if (letters[j + 1] && letters[j + 1].match(/\W/)) {
              setArg(letters[j], next);
              broken = true;
              break;
            } else {
              setArg(letters[j], defaultValue(letters[j]));
            }
          }
          key = arg.slice(-1)[0];
          if (!broken && key !== "-") {
            if (checkAllAliases(key, flags.arrays)) {
              i = eatArray(i, key, args);
            } else if (checkAllAliases(key, flags.nargs) !== false) {
              i = eatNargs(i, key, args);
            } else {
              next = args[i + 1];
              if (next !== void 0 && (!/^(-|--)[^-]/.test(next) || next.match(negative)) && !checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts)) {
                setArg(key, next);
                i++;
              } else if (/^(true|false)$/.test(next)) {
                setArg(key, next);
                i++;
              } else {
                setArg(key, defaultValue(key));
              }
            }
          }
        } else if (arg.match(/^-[0-9]$/) && arg.match(negative) && checkAllAliases(arg.slice(1), flags.bools)) {
          key = arg.slice(1);
          setArg(key, defaultValue(key));
        } else if (arg === "--") {
          notFlags = args.slice(i + 1);
          break;
        } else if (configuration["halt-at-non-option"]) {
          notFlags = args.slice(i);
          break;
        } else {
          argv._.push(maybeCoerceNumber("_", arg));
        }
      }
      applyEnvVars(argv, true);
      applyEnvVars(argv, false);
      setConfig(argv);
      setConfigObjects();
      applyDefaultsAndAliases(argv, flags.aliases, defaults, true);
      applyCoercions(argv);
      if (configuration["set-placeholder-key"])
        setPlaceholderKeys(argv);
      Object.keys(flags.counts).forEach(function(key) {
        if (!hasKey(argv, key.split(".")))
          setArg(key, 0);
      });
      if (notFlagsOption && notFlags.length)
        argv[notFlagsArgv] = [];
      notFlags.forEach(function(key) {
        argv[notFlagsArgv].push(key);
      });
      if (configuration["camel-case-expansion"] && configuration["strip-dashed"]) {
        Object.keys(argv).filter((key) => key !== "--" && key.includes("-")).forEach((key) => {
          delete argv[key];
        });
      }
      if (configuration["strip-aliased"]) {
        ;
        [].concat(...Object.keys(aliases).map((k) => aliases[k])).forEach((alias) => {
          if (configuration["camel-case-expansion"]) {
            delete argv[alias.split(".").map((prop) => camelCase(prop)).join(".")];
          }
          delete argv[alias];
        });
      }
      function eatNargs(i, key, args2, argAfterEqualSign) {
        let ii;
        let toEat = checkAllAliases(key, flags.nargs);
        toEat = isNaN(toEat) ? 1 : toEat;
        if (toEat === 0) {
          if (!isUndefined(argAfterEqualSign)) {
            error = Error(__("Argument unexpected for: %s", key));
          }
          setArg(key, defaultValue(key));
          return i;
        }
        let available = isUndefined(argAfterEqualSign) ? 0 : 1;
        if (configuration["nargs-eats-options"]) {
          if (args2.length - (i + 1) + available < toEat) {
            error = Error(__("Not enough arguments following: %s", key));
          }
          available = toEat;
        } else {
          for (ii = i + 1; ii < args2.length; ii++) {
            if (!args2[ii].match(/^-[^0-9]/) || args2[ii].match(negative) || isUnknownOptionAsArg(args2[ii]))
              available++;
            else
              break;
          }
          if (available < toEat)
            error = Error(__("Not enough arguments following: %s", key));
        }
        let consumed = Math.min(available, toEat);
        if (!isUndefined(argAfterEqualSign) && consumed > 0) {
          setArg(key, argAfterEqualSign);
          consumed--;
        }
        for (ii = i + 1; ii < consumed + i + 1; ii++) {
          setArg(key, args2[ii]);
        }
        return i + consumed;
      }
      function eatArray(i, key, args2, argAfterEqualSign) {
        let argsToSet = [];
        let next = argAfterEqualSign || args2[i + 1];
        const nargsCount = checkAllAliases(key, flags.nargs);
        if (checkAllAliases(key, flags.bools) && !/^(true|false)$/.test(next)) {
          argsToSet.push(true);
        } else if (isUndefined(next) || isUndefined(argAfterEqualSign) && /^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next)) {
          if (defaults[key] !== void 0) {
            const defVal = defaults[key];
            argsToSet = Array.isArray(defVal) ? defVal : [defVal];
          }
        } else {
          if (!isUndefined(argAfterEqualSign)) {
            argsToSet.push(processValue(key, argAfterEqualSign));
          }
          for (let ii = i + 1; ii < args2.length; ii++) {
            if (!configuration["greedy-arrays"] && argsToSet.length > 0 || nargsCount && argsToSet.length >= nargsCount)
              break;
            next = args2[ii];
            if (/^-/.test(next) && !negative.test(next) && !isUnknownOptionAsArg(next))
              break;
            i = ii;
            argsToSet.push(processValue(key, next));
          }
        }
        if (nargsCount && argsToSet.length < nargsCount || isNaN(nargsCount) && argsToSet.length === 0) {
          error = Error(__("Not enough arguments following: %s", key));
        }
        setArg(key, argsToSet);
        return i;
      }
      function setArg(key, val) {
        if (/-/.test(key) && configuration["camel-case-expansion"]) {
          const alias = key.split(".").map(function(prop) {
            return camelCase(prop);
          }).join(".");
          addNewAlias(key, alias);
        }
        const value = processValue(key, val);
        const splitKey = key.split(".");
        setKey(argv, splitKey, value);
        if (flags.aliases[key]) {
          flags.aliases[key].forEach(function(x) {
            x = x.split(".");
            setKey(argv, x, value);
          });
        }
        if (splitKey.length > 1 && configuration["dot-notation"]) {
          ;
          (flags.aliases[splitKey[0]] || []).forEach(function(x) {
            x = x.split(".");
            const a = [].concat(splitKey);
            a.shift();
            x = x.concat(a);
            if (!(flags.aliases[key] || []).includes(x.join("."))) {
              setKey(argv, x, value);
            }
          });
        }
        if (checkAllAliases(key, flags.normalize) && !checkAllAliases(key, flags.arrays)) {
          const keys = [key].concat(flags.aliases[key] || []);
          keys.forEach(function(key2) {
            Object.defineProperty(argvReturn, key2, {
              enumerable: true,
              get() {
                return val;
              },
              set(value2) {
                val = typeof value2 === "string" ? path.normalize(value2) : value2;
              }
            });
          });
        }
      }
      function addNewAlias(key, alias) {
        if (!(flags.aliases[key] && flags.aliases[key].length)) {
          flags.aliases[key] = [alias];
          newAliases[alias] = true;
        }
        if (!(flags.aliases[alias] && flags.aliases[alias].length)) {
          addNewAlias(alias, key);
        }
      }
      function processValue(key, val) {
        if (typeof val === "string" && (val[0] === "'" || val[0] === '"') && val[val.length - 1] === val[0]) {
          val = val.substring(1, val.length - 1);
        }
        if (checkAllAliases(key, flags.bools) || checkAllAliases(key, flags.counts)) {
          if (typeof val === "string")
            val = val === "true";
        }
        let value = Array.isArray(val) ? val.map(function(v) {
          return maybeCoerceNumber(key, v);
        }) : maybeCoerceNumber(key, val);
        if (checkAllAliases(key, flags.counts) && (isUndefined(value) || typeof value === "boolean")) {
          value = increment;
        }
        if (checkAllAliases(key, flags.normalize) && checkAllAliases(key, flags.arrays)) {
          if (Array.isArray(val))
            value = val.map(path.normalize);
          else
            value = path.normalize(val);
        }
        return value;
      }
      function maybeCoerceNumber(key, value) {
        if (!checkAllAliases(key, flags.strings) && !checkAllAliases(key, flags.bools) && !Array.isArray(value)) {
          const shouldCoerceNumber = isNumber(value) && configuration["parse-numbers"] && Number.isSafeInteger(Math.floor(value));
          if (shouldCoerceNumber || !isUndefined(value) && checkAllAliases(key, flags.numbers))
            value = Number(value);
        }
        return value;
      }
      function setConfig(argv2) {
        const configLookup = Object.create(null);
        applyDefaultsAndAliases(configLookup, flags.aliases, defaults);
        Object.keys(flags.configs).forEach(function(configKey) {
          const configPath = argv2[configKey] || configLookup[configKey];
          if (configPath) {
            try {
              let config = null;
              const resolvedConfigPath = path.resolve(process.cwd(), configPath);
              if (typeof flags.configs[configKey] === "function") {
                try {
                  config = flags.configs[configKey](resolvedConfigPath);
                } catch (e) {
                  config = e;
                }
                if (config instanceof Error) {
                  error = config;
                  return;
                }
              } else {
                config = require(resolvedConfigPath);
              }
              setConfigObject(config);
            } catch (ex) {
              if (argv2[configKey])
                error = Error(__("Invalid JSON config file: %s", configPath));
            }
          }
        });
      }
      function setConfigObject(config, prev) {
        Object.keys(config).forEach(function(key) {
          const value = config[key];
          const fullKey = prev ? prev + "." + key : key;
          if (typeof value === "object" && value !== null && !Array.isArray(value) && configuration["dot-notation"]) {
            setConfigObject(value, fullKey);
          } else {
            if (!hasKey(argv, fullKey.split(".")) || checkAllAliases(fullKey, flags.arrays) && configuration["combine-arrays"]) {
              setArg(fullKey, value);
            }
          }
        });
      }
      function setConfigObjects() {
        if (typeof configObjects === "undefined")
          return;
        configObjects.forEach(function(configObject) {
          setConfigObject(configObject);
        });
      }
      function applyEnvVars(argv2, configOnly) {
        if (typeof envPrefix === "undefined")
          return;
        const prefix = typeof envPrefix === "string" ? envPrefix : "";
        Object.keys(process.env).forEach(function(envVar) {
          if (prefix === "" || envVar.lastIndexOf(prefix, 0) === 0) {
            const keys = envVar.split("__").map(function(key, i) {
              if (i === 0) {
                key = key.substring(prefix.length);
              }
              return camelCase(key);
            });
            if ((configOnly && flags.configs[keys.join(".")] || !configOnly) && !hasKey(argv2, keys)) {
              setArg(keys.join("."), process.env[envVar]);
            }
          }
        });
      }
      function applyCoercions(argv2) {
        let coerce;
        const applied = new Set();
        Object.keys(argv2).forEach(function(key) {
          if (!applied.has(key)) {
            coerce = checkAllAliases(key, flags.coercions);
            if (typeof coerce === "function") {
              try {
                const value = maybeCoerceNumber(key, coerce(argv2[key]));
                [].concat(flags.aliases[key] || [], key).forEach((ali) => {
                  applied.add(ali);
                  argv2[ali] = value;
                });
              } catch (err) {
                error = err;
              }
            }
          }
        });
      }
      function setPlaceholderKeys(argv2) {
        flags.keys.forEach((key) => {
          if (~key.indexOf("."))
            return;
          if (typeof argv2[key] === "undefined")
            argv2[key] = void 0;
        });
        return argv2;
      }
      function applyDefaultsAndAliases(obj, aliases2, defaults2, canLog = false) {
        Object.keys(defaults2).forEach(function(key) {
          if (!hasKey(obj, key.split("."))) {
            setKey(obj, key.split("."), defaults2[key]);
            if (canLog)
              defaulted[key] = true;
            (aliases2[key] || []).forEach(function(x) {
              if (hasKey(obj, x.split(".")))
                return;
              setKey(obj, x.split("."), defaults2[key]);
            });
          }
        });
      }
      function hasKey(obj, keys) {
        let o = obj;
        if (!configuration["dot-notation"])
          keys = [keys.join(".")];
        keys.slice(0, -1).forEach(function(key2) {
          o = o[key2] || {};
        });
        const key = keys[keys.length - 1];
        if (typeof o !== "object")
          return false;
        else
          return key in o;
      }
      function setKey(obj, keys, value) {
        let o = obj;
        if (!configuration["dot-notation"])
          keys = [keys.join(".")];
        keys.slice(0, -1).forEach(function(key2, index) {
          key2 = sanitizeKey(key2);
          if (typeof o === "object" && o[key2] === void 0) {
            o[key2] = {};
          }
          if (typeof o[key2] !== "object" || Array.isArray(o[key2])) {
            if (Array.isArray(o[key2])) {
              o[key2].push({});
            } else {
              o[key2] = [o[key2], {}];
            }
            o = o[key2][o[key2].length - 1];
          } else {
            o = o[key2];
          }
        });
        const key = sanitizeKey(keys[keys.length - 1]);
        const isTypeArray = checkAllAliases(keys.join("."), flags.arrays);
        const isValueArray = Array.isArray(value);
        let duplicate = configuration["duplicate-arguments-array"];
        if (!duplicate && checkAllAliases(key, flags.nargs)) {
          duplicate = true;
          if (!isUndefined(o[key]) && flags.nargs[key] === 1 || Array.isArray(o[key]) && o[key].length === flags.nargs[key]) {
            o[key] = void 0;
          }
        }
        if (value === increment) {
          o[key] = increment(o[key]);
        } else if (Array.isArray(o[key])) {
          if (duplicate && isTypeArray && isValueArray) {
            o[key] = configuration["flatten-duplicate-arrays"] ? o[key].concat(value) : (Array.isArray(o[key][0]) ? o[key] : [o[key]]).concat([value]);
          } else if (!duplicate && Boolean(isTypeArray) === Boolean(isValueArray)) {
            o[key] = value;
          } else {
            o[key] = o[key].concat([value]);
          }
        } else if (o[key] === void 0 && isTypeArray) {
          o[key] = isValueArray ? value : [value];
        } else if (duplicate && !(o[key] === void 0 || checkAllAliases(key, flags.counts) || checkAllAliases(key, flags.bools))) {
          o[key] = [o[key], value];
        } else {
          o[key] = value;
        }
      }
      function extendAliases(...args2) {
        args2.forEach(function(obj) {
          Object.keys(obj || {}).forEach(function(key) {
            if (flags.aliases[key])
              return;
            flags.aliases[key] = [].concat(aliases[key] || []);
            flags.aliases[key].concat(key).forEach(function(x) {
              if (/-/.test(x) && configuration["camel-case-expansion"]) {
                const c = camelCase(x);
                if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                  flags.aliases[key].push(c);
                  newAliases[c] = true;
                }
              }
            });
            flags.aliases[key].concat(key).forEach(function(x) {
              if (x.length > 1 && /[A-Z]/.test(x) && configuration["camel-case-expansion"]) {
                const c = decamelize(x, "-");
                if (c !== key && flags.aliases[key].indexOf(c) === -1) {
                  flags.aliases[key].push(c);
                  newAliases[c] = true;
                }
              }
            });
            flags.aliases[key].forEach(function(x) {
              flags.aliases[x] = [key].concat(flags.aliases[key].filter(function(y) {
                return x !== y;
              }));
            });
          });
        });
      }
      function checkAllAliases(key, flag) {
        const toCheck = [].concat(flags.aliases[key] || [], key);
        const keys = Object.keys(flag);
        const setAlias = toCheck.find((key2) => keys.includes(key2));
        return setAlias ? flag[setAlias] : false;
      }
      function hasAnyFlag(key) {
        const toCheck = [].concat(Object.keys(flags).map((k) => flags[k]));
        return toCheck.some(function(flag) {
          return Array.isArray(flag) ? flag.includes(key) : flag[key];
        });
      }
      function hasFlagsMatching(arg, ...patterns) {
        const toCheck = [].concat(...patterns);
        return toCheck.some(function(pattern) {
          const match = arg.match(pattern);
          return match && hasAnyFlag(match[1]);
        });
      }
      function hasAllShortFlags(arg) {
        if (arg.match(negative) || !arg.match(/^-[^-]+/)) {
          return false;
        }
        let hasAllFlags = true;
        let next;
        const letters = arg.slice(1).split("");
        for (let j = 0; j < letters.length; j++) {
          next = arg.slice(j + 2);
          if (!hasAnyFlag(letters[j])) {
            hasAllFlags = false;
            break;
          }
          if (letters[j + 1] && letters[j + 1] === "=" || next === "-" || /[A-Za-z]/.test(letters[j]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(next) || letters[j + 1] && letters[j + 1].match(/\W/)) {
            break;
          }
        }
        return hasAllFlags;
      }
      function isUnknownOptionAsArg(arg) {
        return configuration["unknown-options-as-args"] && isUnknownOption(arg);
      }
      function isUnknownOption(arg) {
        if (arg.match(negative)) {
          return false;
        }
        if (hasAllShortFlags(arg)) {
          return false;
        }
        const flagWithEquals = /^-+([^=]+?)=[\s\S]*$/;
        const normalFlag = /^-+([^=]+?)$/;
        const flagEndingInHyphen = /^-+([^=]+?)-$/;
        const flagEndingInDigits = /^-+([^=]+?\d+)$/;
        const flagEndingInNonWordCharacters = /^-+([^=]+?)\W+.*$/;
        return !hasFlagsMatching(arg, flagWithEquals, negatedBoolean, normalFlag, flagEndingInHyphen, flagEndingInDigits, flagEndingInNonWordCharacters);
      }
      function defaultValue(key) {
        if (!checkAllAliases(key, flags.bools) && !checkAllAliases(key, flags.counts) && `${key}` in defaults) {
          return defaults[key];
        } else {
          return defaultForType(guessType(key));
        }
      }
      function defaultForType(type) {
        const def = {
          boolean: true,
          string: "",
          number: void 0,
          array: []
        };
        return def[type];
      }
      function guessType(key) {
        let type = "boolean";
        if (checkAllAliases(key, flags.strings))
          type = "string";
        else if (checkAllAliases(key, flags.numbers))
          type = "number";
        else if (checkAllAliases(key, flags.bools))
          type = "boolean";
        else if (checkAllAliases(key, flags.arrays))
          type = "array";
        return type;
      }
      function isNumber(x) {
        if (x === null || x === void 0)
          return false;
        if (typeof x === "number")
          return true;
        if (/^0x[0-9a-f]+$/i.test(x))
          return true;
        if (x.length > 1 && x[0] === "0")
          return false;
        return /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
      }
      function isUndefined(num) {
        return num === void 0;
      }
      function checkConfiguration() {
        Object.keys(flags.counts).find((key) => {
          if (checkAllAliases(key, flags.arrays)) {
            error = Error(__("Invalid configuration: %s, opts.count excludes opts.array.", key));
            return true;
          } else if (checkAllAliases(key, flags.nargs)) {
            error = Error(__("Invalid configuration: %s, opts.count excludes opts.narg.", key));
            return true;
          }
        });
      }
      return {
        argv: Object.assign(argvReturn, argv),
        error,
        aliases: Object.assign({}, flags.aliases),
        newAliases: Object.assign({}, newAliases),
        defaulted: Object.assign({}, defaulted),
        configuration
      };
    }
    function combineAliases(aliases) {
      const aliasArrays = [];
      const combined = Object.create(null);
      let change = true;
      Object.keys(aliases).forEach(function(key) {
        aliasArrays.push([].concat(aliases[key], key));
      });
      while (change) {
        change = false;
        for (let i = 0; i < aliasArrays.length; i++) {
          for (let ii = i + 1; ii < aliasArrays.length; ii++) {
            const intersect = aliasArrays[i].filter(function(v) {
              return aliasArrays[ii].indexOf(v) !== -1;
            });
            if (intersect.length) {
              aliasArrays[i] = aliasArrays[i].concat(aliasArrays[ii]);
              aliasArrays.splice(ii, 1);
              change = true;
              break;
            }
          }
        }
      }
      aliasArrays.forEach(function(aliasArray) {
        aliasArray = aliasArray.filter(function(v, i, self) {
          return self.indexOf(v) === i;
        });
        combined[aliasArray.pop()] = aliasArray;
      });
      return combined;
    }
    function increment(orig) {
      return orig !== void 0 ? orig + 1 : 1;
    }
    function Parser(args, opts) {
      const result = parse(args.slice(), opts);
      return result.argv;
    }
    Parser.detailed = function(args, opts) {
      return parse(args.slice(), opts);
    };
    function sanitizeKey(key) {
      if (key === "__proto__")
        return "___proto___";
      return key;
    }
    module2.exports = Parser;
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/command.js
var require_command = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/command.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isCommandBuilderCallback = exports2.isCommandBuilderDefinition = exports2.isCommandHandlerDefinition = exports2.command = void 0;
    var common_types_1 = require_common_types();
    var is_promise_1 = require_is_promise();
    var middleware_1 = require_middleware();
    var parse_command_1 = require_parse_command();
    var path = require("path");
    var util_1 = require("util");
    var yargs_1 = require_yargs();
    var requireDirectory = require_require_directory();
    var whichModule = require_which_module();
    var Parser = require_yargs_parser();
    var DEFAULT_MARKER = /(^\*)|(^\$0)/;
    function command(yargs, usage, validation, globalMiddleware = []) {
      const self = {};
      let handlers = {};
      let aliasMap = {};
      let defaultCommand;
      self.addHandler = function addHandler(cmd, description, builder, handler, commandMiddleware, deprecated) {
        let aliases = [];
        const middlewares = middleware_1.commandMiddlewareFactory(commandMiddleware);
        handler = handler || (() => {
        });
        if (Array.isArray(cmd)) {
          aliases = cmd.slice(1);
          cmd = cmd[0];
        } else if (isCommandHandlerDefinition(cmd)) {
          let command2 = Array.isArray(cmd.command) || typeof cmd.command === "string" ? cmd.command : moduleName(cmd);
          if (cmd.aliases)
            command2 = [].concat(command2).concat(cmd.aliases);
          self.addHandler(command2, extractDesc(cmd), cmd.builder, cmd.handler, cmd.middlewares, cmd.deprecated);
          return;
        }
        if (isCommandBuilderDefinition(builder)) {
          self.addHandler([cmd].concat(aliases), description, builder.builder, builder.handler, builder.middlewares, builder.deprecated);
          return;
        }
        const parsedCommand = parse_command_1.parseCommand(cmd);
        aliases = aliases.map((alias) => parse_command_1.parseCommand(alias).cmd);
        let isDefault = false;
        const parsedAliases = [parsedCommand.cmd].concat(aliases).filter((c) => {
          if (DEFAULT_MARKER.test(c)) {
            isDefault = true;
            return false;
          }
          return true;
        });
        if (parsedAliases.length === 0 && isDefault)
          parsedAliases.push("$0");
        if (isDefault) {
          parsedCommand.cmd = parsedAliases[0];
          aliases = parsedAliases.slice(1);
          cmd = cmd.replace(DEFAULT_MARKER, parsedCommand.cmd);
        }
        aliases.forEach((alias) => {
          aliasMap[alias] = parsedCommand.cmd;
        });
        if (description !== false) {
          usage.command(cmd, description, isDefault, aliases, deprecated);
        }
        handlers[parsedCommand.cmd] = {
          original: cmd,
          description,
          handler,
          builder: builder || {},
          middlewares,
          deprecated,
          demanded: parsedCommand.demanded,
          optional: parsedCommand.optional
        };
        if (isDefault)
          defaultCommand = handlers[parsedCommand.cmd];
      };
      self.addDirectory = function addDirectory(dir, context, req, callerFile, opts) {
        opts = opts || {};
        if (typeof opts.recurse !== "boolean")
          opts.recurse = false;
        if (!Array.isArray(opts.extensions))
          opts.extensions = ["js"];
        const parentVisit = typeof opts.visit === "function" ? opts.visit : (o) => o;
        opts.visit = function visit(obj, joined, filename) {
          const visited = parentVisit(obj, joined, filename);
          if (visited) {
            if (~context.files.indexOf(joined))
              return visited;
            context.files.push(joined);
            self.addHandler(visited);
          }
          return visited;
        };
        requireDirectory({ require: req, filename: callerFile }, dir, opts);
      };
      function moduleName(obj) {
        const mod = whichModule(obj);
        if (!mod)
          throw new Error(`No command name given for module: ${util_1.inspect(obj)}`);
        return commandFromFilename(mod.filename);
      }
      function commandFromFilename(filename) {
        return path.basename(filename, path.extname(filename));
      }
      function extractDesc({ describe, description, desc }) {
        for (const test of [describe, description, desc]) {
          if (typeof test === "string" || test === false)
            return test;
          common_types_1.assertNotStrictEqual(test, true);
        }
        return false;
      }
      self.getCommands = () => Object.keys(handlers).concat(Object.keys(aliasMap));
      self.getCommandHandlers = () => handlers;
      self.hasDefaultCommand = () => !!defaultCommand;
      self.runCommand = function runCommand(command2, yargs2, parsed, commandIndex) {
        let aliases = parsed.aliases;
        const commandHandler = handlers[command2] || handlers[aliasMap[command2]] || defaultCommand;
        const currentContext = yargs2.getContext();
        let numFiles = currentContext.files.length;
        const parentCommands = currentContext.commands.slice();
        let innerArgv = parsed.argv;
        let positionalMap = {};
        if (command2) {
          currentContext.commands.push(command2);
          currentContext.fullCommands.push(commandHandler.original);
        }
        const builder = commandHandler.builder;
        if (isCommandBuilderCallback(builder)) {
          const builderOutput = builder(yargs2.reset(parsed.aliases));
          const innerYargs = yargs_1.isYargsInstance(builderOutput) ? builderOutput : yargs2;
          if (shouldUpdateUsage(innerYargs)) {
            innerYargs.getUsageInstance().usage(usageFromParentCommandsCommandHandler(parentCommands, commandHandler), commandHandler.description);
          }
          innerArgv = innerYargs._parseArgs(null, null, true, commandIndex);
          aliases = innerYargs.parsed.aliases;
        } else if (isCommandBuilderOptionDefinitions(builder)) {
          const innerYargs = yargs2.reset(parsed.aliases);
          if (shouldUpdateUsage(innerYargs)) {
            innerYargs.getUsageInstance().usage(usageFromParentCommandsCommandHandler(parentCommands, commandHandler), commandHandler.description);
          }
          Object.keys(commandHandler.builder).forEach((key) => {
            innerYargs.option(key, builder[key]);
          });
          innerArgv = innerYargs._parseArgs(null, null, true, commandIndex);
          aliases = innerYargs.parsed.aliases;
        }
        if (!yargs2._hasOutput()) {
          positionalMap = populatePositionals(commandHandler, innerArgv, currentContext);
        }
        const middlewares = globalMiddleware.slice(0).concat(commandHandler.middlewares);
        middleware_1.applyMiddleware(innerArgv, yargs2, middlewares, true);
        if (!yargs2._hasOutput()) {
          yargs2._runValidation(innerArgv, aliases, positionalMap, yargs2.parsed.error, !command2);
        }
        if (commandHandler.handler && !yargs2._hasOutput()) {
          yargs2._setHasOutput();
          const populateDoubleDash = !!yargs2.getOptions().configuration["populate--"];
          if (!populateDoubleDash)
            yargs2._copyDoubleDash(innerArgv);
          innerArgv = middleware_1.applyMiddleware(innerArgv, yargs2, middlewares, false);
          let handlerResult;
          if (is_promise_1.isPromise(innerArgv)) {
            handlerResult = innerArgv.then((argv) => commandHandler.handler(argv));
          } else {
            handlerResult = commandHandler.handler(innerArgv);
          }
          const handlerFinishCommand = yargs2.getHandlerFinishCommand();
          if (is_promise_1.isPromise(handlerResult)) {
            yargs2.getUsageInstance().cacheHelpMessage();
            handlerResult.then((value) => {
              if (handlerFinishCommand) {
                handlerFinishCommand(value);
              }
            }).catch((error) => {
              try {
                yargs2.getUsageInstance().fail(null, error);
              } catch (err) {
              }
            }).then(() => {
              yargs2.getUsageInstance().clearCachedHelpMessage();
            });
          } else {
            if (handlerFinishCommand) {
              handlerFinishCommand(handlerResult);
            }
          }
        }
        if (command2) {
          currentContext.commands.pop();
          currentContext.fullCommands.pop();
        }
        numFiles = currentContext.files.length - numFiles;
        if (numFiles > 0)
          currentContext.files.splice(numFiles * -1, numFiles);
        return innerArgv;
      };
      function shouldUpdateUsage(yargs2) {
        return !yargs2.getUsageInstance().getUsageDisabled() && yargs2.getUsageInstance().getUsage().length === 0;
      }
      function usageFromParentCommandsCommandHandler(parentCommands, commandHandler) {
        const c = DEFAULT_MARKER.test(commandHandler.original) ? commandHandler.original.replace(DEFAULT_MARKER, "").trim() : commandHandler.original;
        const pc = parentCommands.filter((c2) => {
          return !DEFAULT_MARKER.test(c2);
        });
        pc.push(c);
        return `$0 ${pc.join(" ")}`;
      }
      self.runDefaultBuilderOn = function(yargs2) {
        common_types_1.assertNotStrictEqual(defaultCommand, void 0);
        if (shouldUpdateUsage(yargs2)) {
          const commandString = DEFAULT_MARKER.test(defaultCommand.original) ? defaultCommand.original : defaultCommand.original.replace(/^[^[\]<>]*/, "$0 ");
          yargs2.getUsageInstance().usage(commandString, defaultCommand.description);
        }
        const builder = defaultCommand.builder;
        if (isCommandBuilderCallback(builder)) {
          builder(yargs2);
        } else {
          Object.keys(builder).forEach((key) => {
            yargs2.option(key, builder[key]);
          });
        }
      };
      function populatePositionals(commandHandler, argv, context) {
        argv._ = argv._.slice(context.commands.length);
        const demanded = commandHandler.demanded.slice(0);
        const optional = commandHandler.optional.slice(0);
        const positionalMap = {};
        validation.positionalCount(demanded.length, argv._.length);
        while (demanded.length) {
          const demand = demanded.shift();
          populatePositional(demand, argv, positionalMap);
        }
        while (optional.length) {
          const maybe = optional.shift();
          populatePositional(maybe, argv, positionalMap);
        }
        argv._ = context.commands.concat(argv._);
        postProcessPositionals(argv, positionalMap, self.cmdToParseOptions(commandHandler.original));
        return positionalMap;
      }
      function populatePositional(positional, argv, positionalMap) {
        const cmd = positional.cmd[0];
        if (positional.variadic) {
          positionalMap[cmd] = argv._.splice(0).map(String);
        } else {
          if (argv._.length)
            positionalMap[cmd] = [String(argv._.shift())];
        }
      }
      function postProcessPositionals(argv, positionalMap, parseOptions) {
        const options = Object.assign({}, yargs.getOptions());
        options.default = Object.assign(parseOptions.default, options.default);
        for (const key of Object.keys(parseOptions.alias)) {
          options.alias[key] = (options.alias[key] || []).concat(parseOptions.alias[key]);
        }
        options.array = options.array.concat(parseOptions.array);
        delete options.config;
        const unparsed = [];
        Object.keys(positionalMap).forEach((key) => {
          positionalMap[key].map((value) => {
            if (options.configuration["unknown-options-as-args"])
              options.key[key] = true;
            unparsed.push(`--${key}`);
            unparsed.push(value);
          });
        });
        if (!unparsed.length)
          return;
        const config = Object.assign({}, options.configuration, {
          "populate--": true
        });
        const parsed = Parser.detailed(unparsed, Object.assign({}, options, {
          configuration: config
        }));
        if (parsed.error) {
          yargs.getUsageInstance().fail(parsed.error.message, parsed.error);
        } else {
          const positionalKeys = Object.keys(positionalMap);
          Object.keys(positionalMap).forEach((key) => {
            positionalKeys.push(...parsed.aliases[key]);
          });
          Object.keys(parsed.argv).forEach((key) => {
            if (positionalKeys.indexOf(key) !== -1) {
              if (!positionalMap[key])
                positionalMap[key] = parsed.argv[key];
              argv[key] = parsed.argv[key];
            }
          });
        }
      }
      self.cmdToParseOptions = function(cmdString) {
        const parseOptions = {
          array: [],
          default: {},
          alias: {},
          demand: {}
        };
        const parsed = parse_command_1.parseCommand(cmdString);
        parsed.demanded.forEach((d) => {
          const [cmd, ...aliases] = d.cmd;
          if (d.variadic) {
            parseOptions.array.push(cmd);
            parseOptions.default[cmd] = [];
          }
          parseOptions.alias[cmd] = aliases;
          parseOptions.demand[cmd] = true;
        });
        parsed.optional.forEach((o) => {
          const [cmd, ...aliases] = o.cmd;
          if (o.variadic) {
            parseOptions.array.push(cmd);
            parseOptions.default[cmd] = [];
          }
          parseOptions.alias[cmd] = aliases;
        });
        return parseOptions;
      };
      self.reset = () => {
        handlers = {};
        aliasMap = {};
        defaultCommand = void 0;
        return self;
      };
      const frozens = [];
      self.freeze = () => {
        frozens.push({
          handlers,
          aliasMap,
          defaultCommand
        });
      };
      self.unfreeze = () => {
        const frozen = frozens.pop();
        common_types_1.assertNotStrictEqual(frozen, void 0);
        ({
          handlers,
          aliasMap,
          defaultCommand
        } = frozen);
      };
      return self;
    }
    exports2.command = command;
    function isCommandHandlerDefinition(cmd) {
      return typeof cmd === "object";
    }
    exports2.isCommandHandlerDefinition = isCommandHandlerDefinition;
    function isCommandBuilderDefinition(builder) {
      return typeof builder === "object" && !!builder.builder && typeof builder.handler === "function";
    }
    exports2.isCommandBuilderDefinition = isCommandBuilderDefinition;
    function isCommandBuilderCallback(builder) {
      return typeof builder === "function";
    }
    exports2.isCommandBuilderCallback = isCommandBuilderCallback;
    function isCommandBuilderOptionDefinitions(builder) {
      return typeof builder === "object";
    }
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/obj-filter.js
var require_obj_filter = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/obj-filter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.objFilter = void 0;
    var common_types_1 = require_common_types();
    function objFilter(original = {}, filter = () => true) {
      const obj = {};
      common_types_1.objectKeys(original).forEach((key) => {
        if (filter(key, original[key])) {
          obj[key] = original[key];
        }
      });
      return obj;
    }
    exports2.objFilter = objFilter;
  }
});

// ../../node_modules/.pnpm/set-blocking@2.0.0/node_modules/set-blocking/index.js
var require_set_blocking = __commonJS({
  "../../node_modules/.pnpm/set-blocking@2.0.0/node_modules/set-blocking/index.js"(exports2, module2) {
    module2.exports = function(blocking) {
      [process.stdout, process.stderr].forEach(function(stream) {
        if (stream._handle && stream.isTTY && typeof stream._handle.setBlocking === "function") {
          stream._handle.setBlocking(blocking);
        }
      });
    };
  }
});

// ../../node_modules/.pnpm/ansi-regex@5.0.0/node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS({
  "../../node_modules/.pnpm/ansi-regex@5.0.0/node_modules/ansi-regex/index.js"(exports2, module2) {
    "use strict";
    module2.exports = ({ onlyFirst = false } = {}) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
      ].join("|");
      return new RegExp(pattern, onlyFirst ? void 0 : "g");
    };
  }
});

// ../../node_modules/.pnpm/strip-ansi@6.0.0/node_modules/strip-ansi/index.js
var require_strip_ansi = __commonJS({
  "../../node_modules/.pnpm/strip-ansi@6.0.0/node_modules/strip-ansi/index.js"(exports2, module2) {
    "use strict";
    var ansiRegex = require_ansi_regex();
    module2.exports = (string) => typeof string === "string" ? string.replace(ansiRegex(), "") : string;
  }
});

// ../../node_modules/.pnpm/is-fullwidth-code-point@3.0.0/node_modules/is-fullwidth-code-point/index.js
var require_is_fullwidth_code_point = __commonJS({
  "../../node_modules/.pnpm/is-fullwidth-code-point@3.0.0/node_modules/is-fullwidth-code-point/index.js"(exports2, module2) {
    "use strict";
    var isFullwidthCodePoint = (codePoint) => {
      if (Number.isNaN(codePoint)) {
        return false;
      }
      if (codePoint >= 4352 && (codePoint <= 4447 || codePoint === 9001 || codePoint === 9002 || 11904 <= codePoint && codePoint <= 12871 && codePoint !== 12351 || 12880 <= codePoint && codePoint <= 19903 || 19968 <= codePoint && codePoint <= 42182 || 43360 <= codePoint && codePoint <= 43388 || 44032 <= codePoint && codePoint <= 55203 || 63744 <= codePoint && codePoint <= 64255 || 65040 <= codePoint && codePoint <= 65049 || 65072 <= codePoint && codePoint <= 65131 || 65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510 || 110592 <= codePoint && codePoint <= 110593 || 127488 <= codePoint && codePoint <= 127569 || 131072 <= codePoint && codePoint <= 262141)) {
        return true;
      }
      return false;
    };
    module2.exports = isFullwidthCodePoint;
    module2.exports.default = isFullwidthCodePoint;
  }
});

// ../../node_modules/.pnpm/emoji-regex@8.0.0/node_modules/emoji-regex/index.js
var require_emoji_regex = __commonJS({
  "../../node_modules/.pnpm/emoji-regex@8.0.0/node_modules/emoji-regex/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function() {
      return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
    };
  }
});

// ../../node_modules/.pnpm/string-width@4.2.2/node_modules/string-width/index.js
var require_string_width = __commonJS({
  "../../node_modules/.pnpm/string-width@4.2.2/node_modules/string-width/index.js"(exports2, module2) {
    "use strict";
    var stripAnsi = require_strip_ansi();
    var isFullwidthCodePoint = require_is_fullwidth_code_point();
    var emojiRegex = require_emoji_regex();
    var stringWidth = (string) => {
      if (typeof string !== "string" || string.length === 0) {
        return 0;
      }
      string = stripAnsi(string);
      if (string.length === 0) {
        return 0;
      }
      string = string.replace(emojiRegex(), "  ");
      let width = 0;
      for (let i = 0; i < string.length; i++) {
        const code = string.codePointAt(i);
        if (code <= 31 || code >= 127 && code <= 159) {
          continue;
        }
        if (code >= 768 && code <= 879) {
          continue;
        }
        if (code > 65535) {
          i++;
        }
        width += isFullwidthCodePoint(code) ? 2 : 1;
      }
      return width;
    };
    module2.exports = stringWidth;
    module2.exports.default = stringWidth;
  }
});

// ../../node_modules/.pnpm/color-name@1.1.4/node_modules/color-name/index.js
var require_color_name = __commonJS({
  "../../node_modules/.pnpm/color-name@1.1.4/node_modules/color-name/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// ../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/conversions.js"(exports2, module2) {
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (const key of Object.keys(cssKeywords)) {
      reverseKeywords[cssKeywords[key]] = key;
    }
    var convert = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    module2.exports = convert;
    for (const model of Object.keys(convert)) {
      if (!("channels" in convert[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert[model].labels.length !== convert[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      const { channels, labels } = convert[model];
      delete convert[model].channels;
      delete convert[model].labels;
      Object.defineProperty(convert[model], "channels", { value: channels });
      Object.defineProperty(convert[model], "labels", { value: labels });
    }
    convert.rgb.hsl = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const delta = max - min;
      let h;
      let s;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      const l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb) {
      let rdif;
      let gdif;
      let bdif;
      let h;
      let s;
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const v = Math.max(r, g, b);
      const diff = v - Math.min(r, g, b);
      const diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = 0;
        s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [
        h * 360,
        s * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb) {
      const r = rgb[0];
      const g = rgb[1];
      let b = rgb[2];
      const h = convert.rgb.hsl(rgb)[0];
      const w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const k = Math.min(1 - r, 1 - g, 1 - b);
      const c = (1 - r - k) / (1 - k) || 0;
      const m = (1 - g - k) / (1 - k) || 0;
      const y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
    }
    convert.rgb.keyword = function(rgb) {
      const reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      let currentClosestDistance = Infinity;
      let currentClosestKeyword;
      for (const keyword of Object.keys(cssKeywords)) {
        const value = cssKeywords[keyword];
        const distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      let r = rgb[0] / 255;
      let g = rgb[1] / 255;
      let b = rgb[2] / 255;
      r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
      g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
      b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
      const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      const xyz = convert.rgb.xyz(rgb);
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      const h = hsl[0] / 360;
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      let t2;
      let t3;
      let val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      const t1 = 2 * l - t2;
      const rgb = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      const h = hsl[0];
      let s = hsl[1] / 100;
      let l = hsl[2] / 100;
      let smin = s;
      const lmin = Math.max(l, 0.01);
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      const v = (l + s) / 2;
      const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      const h = hsv[0] / 60;
      const s = hsv[1] / 100;
      let v = hsv[2] / 100;
      const hi = Math.floor(h) % 6;
      const f = h - Math.floor(h);
      const p = 255 * v * (1 - s);
      const q = 255 * v * (1 - s * f);
      const t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      const h = hsv[0];
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const vmin = Math.max(v, 0.01);
      let sl;
      let l;
      l = (2 - s) * v;
      const lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      const h = hwb[0] / 360;
      let wh = hwb[1] / 100;
      let bl = hwb[2] / 100;
      const ratio = wh + bl;
      let f;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      const i = Math.floor(6 * h);
      const v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      const n = wh + f * (v - wh);
      let r;
      let g;
      let b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      const c = cmyk[0] / 100;
      const m = cmyk[1] / 100;
      const y = cmyk[2] / 100;
      const k = cmyk[3] / 100;
      const r = 1 - Math.min(1, c * (1 - k) + k);
      const g = 1 - Math.min(1, m * (1 - k) + k);
      const b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      const x = xyz[0] / 100;
      const y = xyz[1] / 100;
      const z = xyz[2] / 100;
      let r;
      let g;
      let b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let x;
      let y;
      let z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      const y2 = y ** 3;
      const x2 = x ** 3;
      const z2 = z ** 3;
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let h;
      const hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      const c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      const l = lch[0];
      const c = lch[1];
      const h = lch[2];
      const hr = h / 360 * 2 * Math.PI;
      const a = c * Math.cos(hr);
      const b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args, saturation = null) {
      const [r, g, b] = args;
      let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      const r = args[0];
      const g = args[1];
      const b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args) {
      let color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      const mult = (~~(args > 50) + 1) * 0.5;
      const r = (color & 1) * mult * 255;
      const g = (color >> 1 & 1) * mult * 255;
      const b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        const c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      let rem;
      const r = Math.floor(args / 36) / 5 * 255;
      const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      const b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function(args) {
      const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args) {
      const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      let colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map((char) => {
          return char + char;
        }).join("");
      }
      const integer = parseInt(colorString, 16);
      const r = integer >> 16 & 255;
      const g = integer >> 8 & 255;
      const b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const max = Math.max(Math.max(r, g), b);
      const min = Math.min(Math.min(r, g), b);
      const chroma = max - min;
      let grayscale;
      let hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
      let f = 0;
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const c = s * v;
      let f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      const h = hcg[0] / 360;
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      const pure = [0, 0, 0];
      const hi = h % 1 * 6;
      const v = hi % 1;
      const w = 1 - v;
      let mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      let f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const l = g * (1 - c) + 0.5 * c;
      let s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      const w = hwb[1] / 100;
      const b = hwb[2] / 100;
      const v = 1 - b;
      const c = v - w;
      let g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hsv = convert.gray.hsl;
    convert.gray.hwb = function(gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function(gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function(gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function(gray) {
      const val = Math.round(gray[0] / 100 * 255) & 255;
      const integer = (val << 16) + (val << 8) + val;
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// ../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/route.js
var require_route = __commonJS({
  "../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/route.js"(exports2, module2) {
    var conversions = require_conversions();
    function buildGraph() {
      const graph = {};
      const models = Object.keys(conversions);
      for (let len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      const graph = buildGraph();
      const queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        const current = queue.pop();
        const adjacents = Object.keys(conversions[current]);
        for (let len = adjacents.length, i = 0; i < len; i++) {
          const adjacent = adjacents[i];
          const node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      const path = [graph[toModel].parent, toModel];
      let fn = conversions[graph[toModel].parent][toModel];
      let cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path;
      return fn;
    }
    module2.exports = function(fromModel) {
      const graph = deriveBFS(fromModel);
      const conversion = {};
      const models = Object.keys(graph);
      for (let len = models.length, i = 0; i < len; i++) {
        const toModel = models[i];
        const node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// ../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/index.js"(exports2, module2) {
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        const result = fn(args);
        if (typeof result === "object") {
          for (let len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach((fromModel) => {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      const routes = route(fromModel);
      const routeModels = Object.keys(routes);
      routeModels.forEach((toModel) => {
        const fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module2.exports = convert;
  }
});

// ../../node_modules/.pnpm/ansi-styles@4.3.0/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "../../node_modules/.pnpm/ansi-styles@4.3.0/node_modules/ansi-styles/index.js"(exports2, module2) {
    "use strict";
    var wrapAnsi16 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `[${code + offset}m`;
    };
    var wrapAnsi256 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `[${38 + offset};5;${code}m`;
    };
    var wrapAnsi16m = (fn, offset) => (...args) => {
      const rgb = fn(...args);
      return `[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    var ansi2ansi = (n) => n;
    var rgb2rgb = (r, g, b) => [r, g, b];
    var setLazyProperty = (object, property, get) => {
      Object.defineProperty(object, property, {
        get: () => {
          const value = get();
          Object.defineProperty(object, property, {
            value,
            enumerable: true,
            configurable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      });
    };
    var colorConvert;
    var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
      if (colorConvert === void 0) {
        colorConvert = require_color_convert();
      }
      const offset = isBackground ? 10 : 0;
      const styles = {};
      for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
        const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) {
          styles[name] = wrap(identity, offset);
        } else if (typeof suite === "object") {
          styles[name] = wrap(suite[targetSpace], offset);
        }
      }
      return styles;
    };
    function assembleStyles() {
      const codes = new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles[styleName] = {
            open: `[${style[0]}m`,
            close: `[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
      styles.color.close = "[39m";
      styles.bgColor.close = "[49m";
      setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
      setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
      return styles;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// ../../node_modules/.pnpm/wrap-ansi@6.2.0/node_modules/wrap-ansi/index.js
var require_wrap_ansi = __commonJS({
  "../../node_modules/.pnpm/wrap-ansi@6.2.0/node_modules/wrap-ansi/index.js"(exports2, module2) {
    "use strict";
    var stringWidth = require_string_width();
    var stripAnsi = require_strip_ansi();
    var ansiStyles = require_ansi_styles();
    var ESCAPES = new Set([
      "",
      "\x9B"
    ]);
    var END_CODE = 39;
    var wrapAnsi = (code) => `${ESCAPES.values().next().value}[${code}m`;
    var wordLengths = (string) => string.split(" ").map((character) => stringWidth(character));
    var wrapWord = (rows, word, columns) => {
      const characters = [...word];
      let isInsideEscape = false;
      let visible = stringWidth(stripAnsi(rows[rows.length - 1]));
      for (const [index, character] of characters.entries()) {
        const characterLength = stringWidth(character);
        if (visible + characterLength <= columns) {
          rows[rows.length - 1] += character;
        } else {
          rows.push(character);
          visible = 0;
        }
        if (ESCAPES.has(character)) {
          isInsideEscape = true;
        } else if (isInsideEscape && character === "m") {
          isInsideEscape = false;
          continue;
        }
        if (isInsideEscape) {
          continue;
        }
        visible += characterLength;
        if (visible === columns && index < characters.length - 1) {
          rows.push("");
          visible = 0;
        }
      }
      if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
        rows[rows.length - 2] += rows.pop();
      }
    };
    var stringVisibleTrimSpacesRight = (str) => {
      const words = str.split(" ");
      let last = words.length;
      while (last > 0) {
        if (stringWidth(words[last - 1]) > 0) {
          break;
        }
        last--;
      }
      if (last === words.length) {
        return str;
      }
      return words.slice(0, last).join(" ") + words.slice(last).join("");
    };
    var exec = (string, columns, options = {}) => {
      if (options.trim !== false && string.trim() === "") {
        return "";
      }
      let pre = "";
      let ret = "";
      let escapeCode;
      const lengths = wordLengths(string);
      let rows = [""];
      for (const [index, word] of string.split(" ").entries()) {
        if (options.trim !== false) {
          rows[rows.length - 1] = rows[rows.length - 1].trimLeft();
        }
        let rowLength = stringWidth(rows[rows.length - 1]);
        if (index !== 0) {
          if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
            rows.push("");
            rowLength = 0;
          }
          if (rowLength > 0 || options.trim === false) {
            rows[rows.length - 1] += " ";
            rowLength++;
          }
        }
        if (options.hard && lengths[index] > columns) {
          const remainingColumns = columns - rowLength;
          const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
          const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
          if (breaksStartingNextLine < breaksStartingThisLine) {
            rows.push("");
          }
          wrapWord(rows, word, columns);
          continue;
        }
        if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
          if (options.wordWrap === false && rowLength < columns) {
            wrapWord(rows, word, columns);
            continue;
          }
          rows.push("");
        }
        if (rowLength + lengths[index] > columns && options.wordWrap === false) {
          wrapWord(rows, word, columns);
          continue;
        }
        rows[rows.length - 1] += word;
      }
      if (options.trim !== false) {
        rows = rows.map(stringVisibleTrimSpacesRight);
      }
      pre = rows.join("\n");
      for (const [index, character] of [...pre].entries()) {
        ret += character;
        if (ESCAPES.has(character)) {
          const code2 = parseFloat(/\d[^m]*/.exec(pre.slice(index, index + 4)));
          escapeCode = code2 === END_CODE ? null : code2;
        }
        const code = ansiStyles.codes.get(Number(escapeCode));
        if (escapeCode && code) {
          if (pre[index + 1] === "\n") {
            ret += wrapAnsi(code);
          } else if (character === "\n") {
            ret += wrapAnsi(escapeCode);
          }
        }
      }
      return ret;
    };
    module2.exports = (string, columns, options) => {
      return String(string).normalize().replace(/\r\n/g, "\n").split("\n").map((line) => exec(line, columns, options)).join("\n");
    };
  }
});

// ../../node_modules/.pnpm/cliui@6.0.0/node_modules/cliui/index.js
var require_cliui = __commonJS({
  "../../node_modules/.pnpm/cliui@6.0.0/node_modules/cliui/index.js"(exports2, module2) {
    "use strict";
    var stringWidth = require_string_width();
    var stripAnsi = require_strip_ansi();
    var wrap = require_wrap_ansi();
    var align = {
      right: alignRight,
      center: alignCenter
    };
    var top = 0;
    var right = 1;
    var bottom = 2;
    var left = 3;
    var UI = class {
      constructor(opts) {
        this.width = opts.width;
        this.wrap = opts.wrap;
        this.rows = [];
      }
      span(...args) {
        const cols = this.div(...args);
        cols.span = true;
      }
      resetOutput() {
        this.rows = [];
      }
      div(...args) {
        if (args.length === 0) {
          this.div("");
        }
        if (this.wrap && this._shouldApplyLayoutDSL(...args)) {
          return this._applyLayoutDSL(args[0]);
        }
        const cols = args.map((arg) => {
          if (typeof arg === "string") {
            return this._colFromString(arg);
          }
          return arg;
        });
        this.rows.push(cols);
        return cols;
      }
      _shouldApplyLayoutDSL(...args) {
        return args.length === 1 && typeof args[0] === "string" && /[\t\n]/.test(args[0]);
      }
      _applyLayoutDSL(str) {
        const rows = str.split("\n").map((row) => row.split("	"));
        let leftColumnWidth = 0;
        rows.forEach((columns) => {
          if (columns.length > 1 && stringWidth(columns[0]) > leftColumnWidth) {
            leftColumnWidth = Math.min(Math.floor(this.width * 0.5), stringWidth(columns[0]));
          }
        });
        rows.forEach((columns) => {
          this.div(...columns.map((r, i) => {
            return {
              text: r.trim(),
              padding: this._measurePadding(r),
              width: i === 0 && columns.length > 1 ? leftColumnWidth : void 0
            };
          }));
        });
        return this.rows[this.rows.length - 1];
      }
      _colFromString(text) {
        return {
          text,
          padding: this._measurePadding(text)
        };
      }
      _measurePadding(str) {
        const noAnsi = stripAnsi(str);
        return [0, noAnsi.match(/\s*$/)[0].length, 0, noAnsi.match(/^\s*/)[0].length];
      }
      toString() {
        const lines = [];
        this.rows.forEach((row) => {
          this.rowToString(row, lines);
        });
        return lines.filter((line) => !line.hidden).map((line) => line.text).join("\n");
      }
      rowToString(row, lines) {
        this._rasterize(row).forEach((rrow, r) => {
          let str = "";
          rrow.forEach((col, c) => {
            const { width } = row[c];
            const wrapWidth = this._negatePadding(row[c]);
            let ts = col;
            if (wrapWidth > stringWidth(col)) {
              ts += " ".repeat(wrapWidth - stringWidth(col));
            }
            if (row[c].align && row[c].align !== "left" && this.wrap) {
              ts = align[row[c].align](ts, wrapWidth);
              if (stringWidth(ts) < wrapWidth) {
                ts += " ".repeat(width - stringWidth(ts) - 1);
              }
            }
            const padding = row[c].padding || [0, 0, 0, 0];
            if (padding[left]) {
              str += " ".repeat(padding[left]);
            }
            str += addBorder(row[c], ts, "| ");
            str += ts;
            str += addBorder(row[c], ts, " |");
            if (padding[right]) {
              str += " ".repeat(padding[right]);
            }
            if (r === 0 && lines.length > 0) {
              str = this._renderInline(str, lines[lines.length - 1]);
            }
          });
          lines.push({
            text: str.replace(/ +$/, ""),
            span: row.span
          });
        });
        return lines;
      }
      _renderInline(source, previousLine) {
        const leadingWhitespace = source.match(/^ */)[0].length;
        const target = previousLine.text;
        const targetTextWidth = stringWidth(target.trimRight());
        if (!previousLine.span) {
          return source;
        }
        if (!this.wrap) {
          previousLine.hidden = true;
          return target + source;
        }
        if (leadingWhitespace < targetTextWidth) {
          return source;
        }
        previousLine.hidden = true;
        return target.trimRight() + " ".repeat(leadingWhitespace - targetTextWidth) + source.trimLeft();
      }
      _rasterize(row) {
        const rrows = [];
        const widths = this._columnWidths(row);
        let wrapped;
        row.forEach((col, c) => {
          col.width = widths[c];
          if (this.wrap) {
            wrapped = wrap(col.text, this._negatePadding(col), { hard: true }).split("\n");
          } else {
            wrapped = col.text.split("\n");
          }
          if (col.border) {
            wrapped.unshift("." + "-".repeat(this._negatePadding(col) + 2) + ".");
            wrapped.push("'" + "-".repeat(this._negatePadding(col) + 2) + "'");
          }
          if (col.padding) {
            wrapped.unshift(...new Array(col.padding[top] || 0).fill(""));
            wrapped.push(...new Array(col.padding[bottom] || 0).fill(""));
          }
          wrapped.forEach((str, r) => {
            if (!rrows[r]) {
              rrows.push([]);
            }
            const rrow = rrows[r];
            for (let i = 0; i < c; i++) {
              if (rrow[i] === void 0) {
                rrow.push("");
              }
            }
            rrow.push(str);
          });
        });
        return rrows;
      }
      _negatePadding(col) {
        let wrapWidth = col.width;
        if (col.padding) {
          wrapWidth -= (col.padding[left] || 0) + (col.padding[right] || 0);
        }
        if (col.border) {
          wrapWidth -= 4;
        }
        return wrapWidth;
      }
      _columnWidths(row) {
        if (!this.wrap) {
          return row.map((col) => {
            return col.width || stringWidth(col.text);
          });
        }
        let unset = row.length;
        let remainingWidth = this.width;
        const widths = row.map((col) => {
          if (col.width) {
            unset--;
            remainingWidth -= col.width;
            return col.width;
          }
          return void 0;
        });
        const unsetWidth = unset ? Math.floor(remainingWidth / unset) : 0;
        return widths.map((w, i) => {
          if (w === void 0) {
            return Math.max(unsetWidth, _minWidth(row[i]));
          }
          return w;
        });
      }
    };
    function addBorder(col, ts, style) {
      if (col.border) {
        if (/[.']-+[.']/.test(ts)) {
          return "";
        }
        if (ts.trim().length !== 0) {
          return style;
        }
        return "  ";
      }
      return "";
    }
    function _minWidth(col) {
      const padding = col.padding || [];
      const minWidth = 1 + (padding[left] || 0) + (padding[right] || 0);
      if (col.border) {
        return minWidth + 4;
      }
      return minWidth;
    }
    function getWindowWidth() {
      if (typeof process === "object" && process.stdout && process.stdout.columns) {
        return process.stdout.columns;
      }
    }
    function alignRight(str, width) {
      str = str.trim();
      const strWidth = stringWidth(str);
      if (strWidth < width) {
        return " ".repeat(width - strWidth) + str;
      }
      return str;
    }
    function alignCenter(str, width) {
      str = str.trim();
      const strWidth = stringWidth(str);
      if (strWidth >= width) {
        return str;
      }
      return " ".repeat(width - strWidth >> 1) + str;
    }
    module2.exports = function(opts = {}) {
      return new UI({
        width: opts.width || getWindowWidth() || 80,
        wrap: opts.wrap !== false
      });
    };
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/usage.js
var require_usage = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/usage.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.usage = void 0;
    var common_types_1 = require_common_types();
    var obj_filter_1 = require_obj_filter();
    var path = require("path");
    var yerror_1 = require_yerror();
    var decamelize = require_decamelize();
    var setBlocking = require_set_blocking();
    var stringWidth = require_string_width();
    function usage(yargs, y18n) {
      const __ = y18n.__;
      const self = {};
      const fails = [];
      self.failFn = function failFn(f) {
        fails.push(f);
      };
      let failMessage = null;
      let showHelpOnFail = true;
      self.showHelpOnFail = function showHelpOnFailFn(arg1 = true, arg2) {
        function parseFunctionArgs() {
          return typeof arg1 === "string" ? [true, arg1] : [arg1, arg2];
        }
        const [enabled, message] = parseFunctionArgs();
        failMessage = message;
        showHelpOnFail = enabled;
        return self;
      };
      let failureOutput = false;
      self.fail = function fail(msg, err) {
        const logger = yargs._getLoggerInstance();
        if (fails.length) {
          for (let i = fails.length - 1; i >= 0; --i) {
            fails[i](msg, err, self);
          }
        } else {
          if (yargs.getExitProcess())
            setBlocking(true);
          if (!failureOutput) {
            failureOutput = true;
            if (showHelpOnFail) {
              yargs.showHelp("error");
              logger.error();
            }
            if (msg || err)
              logger.error(msg || err);
            if (failMessage) {
              if (msg || err)
                logger.error("");
              logger.error(failMessage);
            }
          }
          err = err || new yerror_1.YError(msg);
          if (yargs.getExitProcess()) {
            return yargs.exit(1);
          } else if (yargs._hasParseCallback()) {
            return yargs.exit(1, err);
          } else {
            throw err;
          }
        }
      };
      let usages = [];
      let usageDisabled = false;
      self.usage = (msg, description) => {
        if (msg === null) {
          usageDisabled = true;
          usages = [];
          return self;
        }
        usageDisabled = false;
        usages.push([msg, description || ""]);
        return self;
      };
      self.getUsage = () => {
        return usages;
      };
      self.getUsageDisabled = () => {
        return usageDisabled;
      };
      self.getPositionalGroupName = () => {
        return __("Positionals:");
      };
      let examples = [];
      self.example = (cmd, description) => {
        examples.push([cmd, description || ""]);
      };
      let commands = [];
      self.command = function command(cmd, description, isDefault, aliases, deprecated = false) {
        if (isDefault) {
          commands = commands.map((cmdArray) => {
            cmdArray[2] = false;
            return cmdArray;
          });
        }
        commands.push([cmd, description || "", isDefault, aliases, deprecated]);
      };
      self.getCommands = () => commands;
      let descriptions = {};
      self.describe = function describe(keyOrKeys, desc) {
        if (Array.isArray(keyOrKeys)) {
          keyOrKeys.forEach((k) => {
            self.describe(k, desc);
          });
        } else if (typeof keyOrKeys === "object") {
          Object.keys(keyOrKeys).forEach((k) => {
            self.describe(k, keyOrKeys[k]);
          });
        } else {
          descriptions[keyOrKeys] = desc;
        }
      };
      self.getDescriptions = () => descriptions;
      let epilogs = [];
      self.epilog = (msg) => {
        epilogs.push(msg);
      };
      let wrapSet = false;
      let wrap;
      self.wrap = (cols) => {
        wrapSet = true;
        wrap = cols;
      };
      function getWrap() {
        if (!wrapSet) {
          wrap = windowWidth();
          wrapSet = true;
        }
        return wrap;
      }
      const deferY18nLookupPrefix = "__yargsString__:";
      self.deferY18nLookup = (str) => deferY18nLookupPrefix + str;
      self.help = function help() {
        if (cachedHelpMessage)
          return cachedHelpMessage;
        normalizeAliases();
        const base$0 = yargs.customScriptName ? yargs.$0 : path.basename(yargs.$0);
        const demandedOptions = yargs.getDemandedOptions();
        const demandedCommands = yargs.getDemandedCommands();
        const deprecatedOptions = yargs.getDeprecatedOptions();
        const groups = yargs.getGroups();
        const options = yargs.getOptions();
        let keys = [];
        keys = keys.concat(Object.keys(descriptions));
        keys = keys.concat(Object.keys(demandedOptions));
        keys = keys.concat(Object.keys(demandedCommands));
        keys = keys.concat(Object.keys(options.default));
        keys = keys.filter(filterHiddenOptions);
        keys = Object.keys(keys.reduce((acc, key) => {
          if (key !== "_")
            acc[key] = true;
          return acc;
        }, {}));
        const theWrap = getWrap();
        const ui = require_cliui()({
          width: theWrap,
          wrap: !!theWrap
        });
        if (!usageDisabled) {
          if (usages.length) {
            usages.forEach((usage2) => {
              ui.div(`${usage2[0].replace(/\$0/g, base$0)}`);
              if (usage2[1]) {
                ui.div({ text: `${usage2[1]}`, padding: [1, 0, 0, 0] });
              }
            });
            ui.div();
          } else if (commands.length) {
            let u = null;
            if (demandedCommands._) {
              u = `${base$0} <${__("command")}>
`;
            } else {
              u = `${base$0} [${__("command")}]
`;
            }
            ui.div(`${u}`);
          }
        }
        if (commands.length) {
          ui.div(__("Commands:"));
          const context = yargs.getContext();
          const parentCommands = context.commands.length ? `${context.commands.join(" ")} ` : "";
          if (yargs.getParserConfiguration()["sort-commands"] === true) {
            commands = commands.sort((a, b) => a[0].localeCompare(b[0]));
          }
          commands.forEach((command) => {
            const commandString = `${base$0} ${parentCommands}${command[0].replace(/^\$0 ?/, "")}`;
            ui.span({
              text: commandString,
              padding: [0, 2, 0, 2],
              width: maxWidth(commands, theWrap, `${base$0}${parentCommands}`) + 4
            }, { text: command[1] });
            const hints = [];
            if (command[2])
              hints.push(`[${__("default")}]`);
            if (command[3] && command[3].length) {
              hints.push(`[${__("aliases:")} ${command[3].join(", ")}]`);
            }
            if (command[4]) {
              if (typeof command[4] === "string") {
                hints.push(`[${__("deprecated: %s", command[4])}]`);
              } else {
                hints.push(`[${__("deprecated")}]`);
              }
            }
            if (hints.length) {
              ui.div({ text: hints.join(" "), padding: [0, 0, 0, 2], align: "right" });
            } else {
              ui.div();
            }
          });
          ui.div();
        }
        const aliasKeys = (Object.keys(options.alias) || []).concat(Object.keys(yargs.parsed.newAliases) || []);
        keys = keys.filter((key) => !yargs.parsed.newAliases[key] && aliasKeys.every((alias) => (options.alias[alias] || []).indexOf(key) === -1));
        const defaultGroup = __("Options:");
        if (!groups[defaultGroup])
          groups[defaultGroup] = [];
        addUngroupedKeys(keys, options.alias, groups, defaultGroup);
        Object.keys(groups).forEach((groupName) => {
          if (!groups[groupName].length)
            return;
          const normalizedKeys = groups[groupName].filter(filterHiddenOptions).map((key) => {
            if (~aliasKeys.indexOf(key))
              return key;
            for (let i = 0, aliasKey; (aliasKey = aliasKeys[i]) !== void 0; i++) {
              if (~(options.alias[aliasKey] || []).indexOf(key))
                return aliasKey;
            }
            return key;
          });
          if (normalizedKeys.length < 1)
            return;
          ui.div(groupName);
          const switches = normalizedKeys.reduce((acc, key) => {
            acc[key] = [key].concat(options.alias[key] || []).map((sw) => {
              if (groupName === self.getPositionalGroupName())
                return sw;
              else {
                return (/^[0-9]$/.test(sw) ? ~options.boolean.indexOf(key) ? "-" : "--" : sw.length > 1 ? "--" : "-") + sw;
              }
            }).join(", ");
            return acc;
          }, {});
          normalizedKeys.forEach((key) => {
            const kswitch = switches[key];
            let desc = descriptions[key] || "";
            let type = null;
            if (~desc.lastIndexOf(deferY18nLookupPrefix))
              desc = __(desc.substring(deferY18nLookupPrefix.length));
            if (~options.boolean.indexOf(key))
              type = `[${__("boolean")}]`;
            if (~options.count.indexOf(key))
              type = `[${__("count")}]`;
            if (~options.string.indexOf(key))
              type = `[${__("string")}]`;
            if (~options.normalize.indexOf(key))
              type = `[${__("string")}]`;
            if (~options.array.indexOf(key))
              type = `[${__("array")}]`;
            if (~options.number.indexOf(key))
              type = `[${__("number")}]`;
            const deprecatedExtra = (deprecated) => typeof deprecated === "string" ? `[${__("deprecated: %s", deprecated)}]` : `[${__("deprecated")}]`;
            const extra = [
              key in deprecatedOptions ? deprecatedExtra(deprecatedOptions[key]) : null,
              type,
              key in demandedOptions ? `[${__("required")}]` : null,
              options.choices && options.choices[key] ? `[${__("choices:")} ${self.stringifiedValues(options.choices[key])}]` : null,
              defaultString(options.default[key], options.defaultDescription[key])
            ].filter(Boolean).join(" ");
            ui.span({ text: kswitch, padding: [0, 2, 0, 2], width: maxWidth(switches, theWrap) + 4 }, desc);
            if (extra)
              ui.div({ text: extra, padding: [0, 0, 0, 2], align: "right" });
            else
              ui.div();
          });
          ui.div();
        });
        if (examples.length) {
          ui.div(__("Examples:"));
          examples.forEach((example) => {
            example[0] = example[0].replace(/\$0/g, base$0);
          });
          examples.forEach((example) => {
            if (example[1] === "") {
              ui.div({
                text: example[0],
                padding: [0, 2, 0, 2]
              });
            } else {
              ui.div({
                text: example[0],
                padding: [0, 2, 0, 2],
                width: maxWidth(examples, theWrap) + 4
              }, {
                text: example[1]
              });
            }
          });
          ui.div();
        }
        if (epilogs.length > 0) {
          const e = epilogs.map((epilog) => epilog.replace(/\$0/g, base$0)).join("\n");
          ui.div(`${e}
`);
        }
        return ui.toString().replace(/\s*$/, "");
      };
      function maxWidth(table, theWrap, modifier) {
        let width = 0;
        if (!Array.isArray(table)) {
          table = Object.values(table).map((v) => [v]);
        }
        table.forEach((v) => {
          width = Math.max(stringWidth(modifier ? `${modifier} ${v[0]}` : v[0]), width);
        });
        if (theWrap)
          width = Math.min(width, parseInt((theWrap * 0.5).toString(), 10));
        return width;
      }
      function normalizeAliases() {
        const demandedOptions = yargs.getDemandedOptions();
        const options = yargs.getOptions();
        (Object.keys(options.alias) || []).forEach((key) => {
          options.alias[key].forEach((alias) => {
            if (descriptions[alias])
              self.describe(key, descriptions[alias]);
            if (alias in demandedOptions)
              yargs.demandOption(key, demandedOptions[alias]);
            if (~options.boolean.indexOf(alias))
              yargs.boolean(key);
            if (~options.count.indexOf(alias))
              yargs.count(key);
            if (~options.string.indexOf(alias))
              yargs.string(key);
            if (~options.normalize.indexOf(alias))
              yargs.normalize(key);
            if (~options.array.indexOf(alias))
              yargs.array(key);
            if (~options.number.indexOf(alias))
              yargs.number(key);
          });
        });
      }
      let cachedHelpMessage;
      self.cacheHelpMessage = function() {
        cachedHelpMessage = this.help();
      };
      self.clearCachedHelpMessage = function() {
        cachedHelpMessage = void 0;
      };
      function addUngroupedKeys(keys, aliases, groups, defaultGroup) {
        let groupedKeys = [];
        let toCheck = null;
        Object.keys(groups).forEach((group) => {
          groupedKeys = groupedKeys.concat(groups[group]);
        });
        keys.forEach((key) => {
          toCheck = [key].concat(aliases[key]);
          if (!toCheck.some((k) => groupedKeys.indexOf(k) !== -1)) {
            groups[defaultGroup].push(key);
          }
        });
        return groupedKeys;
      }
      function filterHiddenOptions(key) {
        return yargs.getOptions().hiddenOptions.indexOf(key) < 0 || yargs.parsed.argv[yargs.getOptions().showHiddenOpt];
      }
      self.showHelp = (level) => {
        const logger = yargs._getLoggerInstance();
        if (!level)
          level = "error";
        const emit = typeof level === "function" ? level : logger[level];
        emit(self.help());
      };
      self.functionDescription = (fn) => {
        const description = fn.name ? decamelize(fn.name, "-") : __("generated-value");
        return ["(", description, ")"].join("");
      };
      self.stringifiedValues = function stringifiedValues(values, separator) {
        let string = "";
        const sep = separator || ", ";
        const array = [].concat(values);
        if (!values || !array.length)
          return string;
        array.forEach((value) => {
          if (string.length)
            string += sep;
          string += JSON.stringify(value);
        });
        return string;
      };
      function defaultString(value, defaultDescription) {
        let string = `[${__("default:")} `;
        if (value === void 0 && !defaultDescription)
          return null;
        if (defaultDescription) {
          string += defaultDescription;
        } else {
          switch (typeof value) {
            case "string":
              string += `"${value}"`;
              break;
            case "object":
              string += JSON.stringify(value);
              break;
            default:
              string += value;
          }
        }
        return `${string}]`;
      }
      function windowWidth() {
        const maxWidth2 = 80;
        if (typeof process === "object" && process.stdout && process.stdout.columns) {
          return Math.min(maxWidth2, process.stdout.columns);
        } else {
          return maxWidth2;
        }
      }
      let version = null;
      self.version = (ver) => {
        version = ver;
      };
      self.showVersion = () => {
        const logger = yargs._getLoggerInstance();
        logger.log(version);
      };
      self.reset = function reset(localLookup) {
        failMessage = null;
        failureOutput = false;
        usages = [];
        usageDisabled = false;
        epilogs = [];
        examples = [];
        commands = [];
        descriptions = obj_filter_1.objFilter(descriptions, (k) => !localLookup[k]);
        return self;
      };
      const frozens = [];
      self.freeze = function freeze() {
        frozens.push({
          failMessage,
          failureOutput,
          usages,
          usageDisabled,
          epilogs,
          examples,
          commands,
          descriptions
        });
      };
      self.unfreeze = function unfreeze() {
        const frozen = frozens.pop();
        common_types_1.assertNotStrictEqual(frozen, void 0);
        ({
          failMessage,
          failureOutput,
          usages,
          usageDisabled,
          epilogs,
          examples,
          commands,
          descriptions
        } = frozen);
      };
      return self;
    }
    exports2.usage = usage;
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/completion-templates.js
var require_completion_templates = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/completion-templates.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.completionZshTemplate = exports2.completionShTemplate = void 0;
    exports2.completionShTemplate = `###-begin-{{app_name}}-completions-###
#
# yargs command completion script
#
# Installation: {{app_path}} {{completion_command}} >> ~/.bashrc
#    or {{app_path}} {{completion_command}} >> ~/.bash_profile on OSX.
#
_yargs_completions()
{
    local cur_word args type_list

    cur_word="\${COMP_WORDS[COMP_CWORD]}"
    args=("\${COMP_WORDS[@]}")

    # ask yargs to generate completions.
    type_list=$({{app_path}} --get-yargs-completions "\${args[@]}")

    COMPREPLY=( $(compgen -W "\${type_list}" -- \${cur_word}) )

    # if no match was found, fall back to filename completion
    if [ \${#COMPREPLY[@]} -eq 0 ]; then
      COMPREPLY=()
    fi

    return 0
}
complete -o default -F _yargs_completions {{app_name}}
###-end-{{app_name}}-completions-###
`;
    exports2.completionZshTemplate = `###-begin-{{app_name}}-completions-###
#
# yargs command completion script
#
# Installation: {{app_path}} {{completion_command}} >> ~/.zshrc
#    or {{app_path}} {{completion_command}} >> ~/.zsh_profile on OSX.
#
_{{app_name}}_yargs_completions()
{
  local reply
  local si=$IFS
  IFS=$'
' reply=($(COMP_CWORD="$((CURRENT-1))" COMP_LINE="$BUFFER" COMP_POINT="$CURSOR" {{app_path}} --get-yargs-completions "\${words[@]}"))
  IFS=$si
  _describe 'values' reply
}
compdef _{{app_name}}_yargs_completions {{app_name}}
###-end-{{app_name}}-completions-###
`;
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/completion.js
var require_completion = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/completion.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.completion = void 0;
    var command_1 = require_command();
    var templates = require_completion_templates();
    var is_promise_1 = require_is_promise();
    var parse_command_1 = require_parse_command();
    var path = require("path");
    var common_types_1 = require_common_types();
    function completion(yargs, usage, command) {
      const self = {
        completionKey: "get-yargs-completions"
      };
      let aliases;
      self.setParsed = function setParsed(parsed) {
        aliases = parsed.aliases;
      };
      const zshShell = process.env.SHELL && process.env.SHELL.indexOf("zsh") !== -1 || process.env.ZSH_NAME && process.env.ZSH_NAME.indexOf("zsh") !== -1;
      self.getCompletion = function getCompletion(args, done) {
        const completions = [];
        const current = args.length ? args[args.length - 1] : "";
        const argv = yargs.parse(args, true);
        const parentCommands = yargs.getContext().commands;
        function runCompletionFunction(argv2) {
          common_types_1.assertNotStrictEqual(completionFunction, null);
          if (isSyncCompletionFunction(completionFunction)) {
            const result = completionFunction(current, argv2);
            if (is_promise_1.isPromise(result)) {
              return result.then((list) => {
                process.nextTick(() => {
                  done(list);
                });
              }).catch((err) => {
                process.nextTick(() => {
                  throw err;
                });
              });
            }
            return done(result);
          } else {
            return completionFunction(current, argv2, (completions2) => {
              done(completions2);
            });
          }
        }
        if (completionFunction) {
          return is_promise_1.isPromise(argv) ? argv.then(runCompletionFunction) : runCompletionFunction(argv);
        }
        const handlers = command.getCommandHandlers();
        for (let i = 0, ii = args.length; i < ii; ++i) {
          if (handlers[args[i]] && handlers[args[i]].builder) {
            const builder = handlers[args[i]].builder;
            if (command_1.isCommandBuilderCallback(builder)) {
              const y = yargs.reset();
              builder(y);
              return y.argv;
            }
          }
        }
        if (!current.match(/^-/) && parentCommands[parentCommands.length - 1] !== current) {
          usage.getCommands().forEach((usageCommand) => {
            const commandName = parse_command_1.parseCommand(usageCommand[0]).cmd;
            if (args.indexOf(commandName) === -1) {
              if (!zshShell) {
                completions.push(commandName);
              } else {
                const desc = usageCommand[1] || "";
                completions.push(commandName.replace(/:/g, "\\:") + ":" + desc);
              }
            }
          });
        }
        if (current.match(/^-/) || current === "" && completions.length === 0) {
          const descs = usage.getDescriptions();
          const options = yargs.getOptions();
          Object.keys(options.key).forEach((key) => {
            const negable = !!options.configuration["boolean-negation"] && options.boolean.includes(key);
            let keyAndAliases = [key].concat(aliases[key] || []);
            if (negable)
              keyAndAliases = keyAndAliases.concat(keyAndAliases.map((key2) => `no-${key2}`));
            function completeOptionKey(key2) {
              const notInArgs = keyAndAliases.every((val) => args.indexOf(`--${val}`) === -1);
              if (notInArgs) {
                const startsByTwoDashes = (s) => /^--/.test(s);
                const isShortOption = (s) => /^[^0-9]$/.test(s);
                const dashes = !startsByTwoDashes(current) && isShortOption(key2) ? "-" : "--";
                if (!zshShell) {
                  completions.push(dashes + key2);
                } else {
                  const desc = descs[key2] || "";
                  completions.push(dashes + `${key2.replace(/:/g, "\\:")}:${desc.replace("__yargsString__:", "")}`);
                }
              }
            }
            completeOptionKey(key);
            if (negable && !!options.default[key])
              completeOptionKey(`no-${key}`);
          });
        }
        done(completions);
      };
      self.generateCompletionScript = function generateCompletionScript($0, cmd) {
        let script = zshShell ? templates.completionZshTemplate : templates.completionShTemplate;
        const name = path.basename($0);
        if ($0.match(/\.js$/))
          $0 = `./${$0}`;
        script = script.replace(/{{app_name}}/g, name);
        script = script.replace(/{{completion_command}}/g, cmd);
        return script.replace(/{{app_path}}/g, $0);
      };
      let completionFunction = null;
      self.registerFunction = (fn) => {
        completionFunction = fn;
      };
      return self;
    }
    exports2.completion = completion;
    function isSyncCompletionFunction(completionFunction) {
      return completionFunction.length < 3;
    }
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/levenshtein.js
var require_levenshtein = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/levenshtein.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.levenshtein = void 0;
    function levenshtein(a, b) {
      if (a.length === 0)
        return b.length;
      if (b.length === 0)
        return a.length;
      const matrix = [];
      let i;
      for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }
      let j;
      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }
      for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
          }
        }
      }
      return matrix[b.length][a.length];
    }
    exports2.levenshtein = levenshtein;
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/validation.js
var require_validation = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/validation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validation = void 0;
    var argsert_1 = require_argsert();
    var common_types_1 = require_common_types();
    var levenshtein_1 = require_levenshtein();
    var obj_filter_1 = require_obj_filter();
    var specialKeys = ["$0", "--", "_"];
    function validation(yargs, usage, y18n) {
      const __ = y18n.__;
      const __n = y18n.__n;
      const self = {};
      self.nonOptionCount = function nonOptionCount(argv) {
        const demandedCommands = yargs.getDemandedCommands();
        const _s = argv._.length - yargs.getContext().commands.length;
        if (demandedCommands._ && (_s < demandedCommands._.min || _s > demandedCommands._.max)) {
          if (_s < demandedCommands._.min) {
            if (demandedCommands._.minMsg !== void 0) {
              usage.fail(demandedCommands._.minMsg ? demandedCommands._.minMsg.replace(/\$0/g, _s.toString()).replace(/\$1/, demandedCommands._.min.toString()) : null);
            } else {
              usage.fail(__n("Not enough non-option arguments: got %s, need at least %s", "Not enough non-option arguments: got %s, need at least %s", _s, _s, demandedCommands._.min));
            }
          } else if (_s > demandedCommands._.max) {
            if (demandedCommands._.maxMsg !== void 0) {
              usage.fail(demandedCommands._.maxMsg ? demandedCommands._.maxMsg.replace(/\$0/g, _s.toString()).replace(/\$1/, demandedCommands._.max.toString()) : null);
            } else {
              usage.fail(__n("Too many non-option arguments: got %s, maximum of %s", "Too many non-option arguments: got %s, maximum of %s", _s, _s, demandedCommands._.max));
            }
          }
        }
      };
      self.positionalCount = function positionalCount(required, observed) {
        if (observed < required) {
          usage.fail(__n("Not enough non-option arguments: got %s, need at least %s", "Not enough non-option arguments: got %s, need at least %s", observed, observed, required));
        }
      };
      self.requiredArguments = function requiredArguments(argv) {
        const demandedOptions = yargs.getDemandedOptions();
        let missing = null;
        for (const key of Object.keys(demandedOptions)) {
          if (!Object.prototype.hasOwnProperty.call(argv, key) || typeof argv[key] === "undefined") {
            missing = missing || {};
            missing[key] = demandedOptions[key];
          }
        }
        if (missing) {
          const customMsgs = [];
          for (const key of Object.keys(missing)) {
            const msg = missing[key];
            if (msg && customMsgs.indexOf(msg) < 0) {
              customMsgs.push(msg);
            }
          }
          const customMsg = customMsgs.length ? `
${customMsgs.join("\n")}` : "";
          usage.fail(__n("Missing required argument: %s", "Missing required arguments: %s", Object.keys(missing).length, Object.keys(missing).join(", ") + customMsg));
        }
      };
      self.unknownArguments = function unknownArguments(argv, aliases, positionalMap, isDefaultCommand) {
        const commandKeys = yargs.getCommandInstance().getCommands();
        const unknown = [];
        const currentContext = yargs.getContext();
        Object.keys(argv).forEach((key) => {
          if (specialKeys.indexOf(key) === -1 && !Object.prototype.hasOwnProperty.call(positionalMap, key) && !Object.prototype.hasOwnProperty.call(yargs._getParseContext(), key) && !self.isValidAndSomeAliasIsNotNew(key, aliases)) {
            unknown.push(key);
          }
        });
        if (currentContext.commands.length > 0 || commandKeys.length > 0 || isDefaultCommand) {
          argv._.slice(currentContext.commands.length).forEach((key) => {
            if (commandKeys.indexOf(key) === -1) {
              unknown.push(key);
            }
          });
        }
        if (unknown.length > 0) {
          usage.fail(__n("Unknown argument: %s", "Unknown arguments: %s", unknown.length, unknown.join(", ")));
        }
      };
      self.unknownCommands = function unknownCommands(argv) {
        const commandKeys = yargs.getCommandInstance().getCommands();
        const unknown = [];
        const currentContext = yargs.getContext();
        if (currentContext.commands.length > 0 || commandKeys.length > 0) {
          argv._.slice(currentContext.commands.length).forEach((key) => {
            if (commandKeys.indexOf(key) === -1) {
              unknown.push(key);
            }
          });
        }
        if (unknown.length > 0) {
          usage.fail(__n("Unknown command: %s", "Unknown commands: %s", unknown.length, unknown.join(", ")));
          return true;
        } else {
          return false;
        }
      };
      self.isValidAndSomeAliasIsNotNew = function isValidAndSomeAliasIsNotNew(key, aliases) {
        if (!Object.prototype.hasOwnProperty.call(aliases, key)) {
          return false;
        }
        const newAliases = yargs.parsed.newAliases;
        for (const a of [key, ...aliases[key]]) {
          if (!Object.prototype.hasOwnProperty.call(newAliases, a) || !newAliases[key]) {
            return true;
          }
        }
        return false;
      };
      self.limitedChoices = function limitedChoices(argv) {
        const options = yargs.getOptions();
        const invalid = {};
        if (!Object.keys(options.choices).length)
          return;
        Object.keys(argv).forEach((key) => {
          if (specialKeys.indexOf(key) === -1 && Object.prototype.hasOwnProperty.call(options.choices, key)) {
            [].concat(argv[key]).forEach((value) => {
              if (options.choices[key].indexOf(value) === -1 && value !== void 0) {
                invalid[key] = (invalid[key] || []).concat(value);
              }
            });
          }
        });
        const invalidKeys = Object.keys(invalid);
        if (!invalidKeys.length)
          return;
        let msg = __("Invalid values:");
        invalidKeys.forEach((key) => {
          msg += `
  ${__("Argument: %s, Given: %s, Choices: %s", key, usage.stringifiedValues(invalid[key]), usage.stringifiedValues(options.choices[key]))}`;
        });
        usage.fail(msg);
      };
      let checks = [];
      self.check = function check(f, global2) {
        checks.push({
          func: f,
          global: global2
        });
      };
      self.customChecks = function customChecks(argv, aliases) {
        for (let i = 0, f; (f = checks[i]) !== void 0; i++) {
          const func = f.func;
          let result = null;
          try {
            result = func(argv, aliases);
          } catch (err) {
            usage.fail(err.message ? err.message : err, err);
            continue;
          }
          if (!result) {
            usage.fail(__("Argument check failed: %s", func.toString()));
          } else if (typeof result === "string" || result instanceof Error) {
            usage.fail(result.toString(), result);
          }
        }
      };
      let implied = {};
      self.implies = function implies(key, value) {
        argsert_1.argsert("<string|object> [array|number|string]", [key, value], arguments.length);
        if (typeof key === "object") {
          Object.keys(key).forEach((k) => {
            self.implies(k, key[k]);
          });
        } else {
          yargs.global(key);
          if (!implied[key]) {
            implied[key] = [];
          }
          if (Array.isArray(value)) {
            value.forEach((i) => self.implies(key, i));
          } else {
            common_types_1.assertNotStrictEqual(value, void 0);
            implied[key].push(value);
          }
        }
      };
      self.getImplied = function getImplied() {
        return implied;
      };
      function keyExists(argv, val) {
        const num = Number(val);
        val = isNaN(num) ? val : num;
        if (typeof val === "number") {
          val = argv._.length >= val;
        } else if (val.match(/^--no-.+/)) {
          val = val.match(/^--no-(.+)/)[1];
          val = !argv[val];
        } else {
          val = argv[val];
        }
        return val;
      }
      self.implications = function implications(argv) {
        const implyFail = [];
        Object.keys(implied).forEach((key) => {
          const origKey = key;
          (implied[key] || []).forEach((value) => {
            let key2 = origKey;
            const origValue = value;
            key2 = keyExists(argv, key2);
            value = keyExists(argv, value);
            if (key2 && !value) {
              implyFail.push(` ${origKey} -> ${origValue}`);
            }
          });
        });
        if (implyFail.length) {
          let msg = `${__("Implications failed:")}
`;
          implyFail.forEach((value) => {
            msg += value;
          });
          usage.fail(msg);
        }
      };
      let conflicting = {};
      self.conflicts = function conflicts(key, value) {
        argsert_1.argsert("<string|object> [array|string]", [key, value], arguments.length);
        if (typeof key === "object") {
          Object.keys(key).forEach((k) => {
            self.conflicts(k, key[k]);
          });
        } else {
          yargs.global(key);
          if (!conflicting[key]) {
            conflicting[key] = [];
          }
          if (Array.isArray(value)) {
            value.forEach((i) => self.conflicts(key, i));
          } else {
            conflicting[key].push(value);
          }
        }
      };
      self.getConflicting = () => conflicting;
      self.conflicting = function conflictingFn(argv) {
        Object.keys(argv).forEach((key) => {
          if (conflicting[key]) {
            conflicting[key].forEach((value) => {
              if (value && argv[key] !== void 0 && argv[value] !== void 0) {
                usage.fail(__("Arguments %s and %s are mutually exclusive", key, value));
              }
            });
          }
        });
      };
      self.recommendCommands = function recommendCommands(cmd, potentialCommands) {
        const threshold = 3;
        potentialCommands = potentialCommands.sort((a, b) => b.length - a.length);
        let recommended = null;
        let bestDistance = Infinity;
        for (let i = 0, candidate; (candidate = potentialCommands[i]) !== void 0; i++) {
          const d = levenshtein_1.levenshtein(cmd, candidate);
          if (d <= threshold && d < bestDistance) {
            bestDistance = d;
            recommended = candidate;
          }
        }
        if (recommended)
          usage.fail(__("Did you mean %s?", recommended));
      };
      self.reset = function reset(localLookup) {
        implied = obj_filter_1.objFilter(implied, (k) => !localLookup[k]);
        conflicting = obj_filter_1.objFilter(conflicting, (k) => !localLookup[k]);
        checks = checks.filter((c) => c.global);
        return self;
      };
      const frozens = [];
      self.freeze = function freeze() {
        frozens.push({
          implied,
          checks,
          conflicting
        });
      };
      self.unfreeze = function unfreeze() {
        const frozen = frozens.pop();
        common_types_1.assertNotStrictEqual(frozen, void 0);
        ({
          implied,
          checks,
          conflicting
        } = frozen);
      };
      return self;
    }
    exports2.validation = validation;
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/apply-extends.js
var require_apply_extends = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/apply-extends.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.applyExtends = void 0;
    var fs = require("fs");
    var path = require("path");
    var yerror_1 = require_yerror();
    var previouslyVisitedConfigs = [];
    function checkForCircularExtends(cfgPath) {
      if (previouslyVisitedConfigs.indexOf(cfgPath) > -1) {
        throw new yerror_1.YError(`Circular extended configurations: '${cfgPath}'.`);
      }
    }
    function getPathToDefaultConfig(cwd, pathToExtend) {
      return path.resolve(cwd, pathToExtend);
    }
    function mergeDeep(config1, config2) {
      const target = {};
      function isObject(obj) {
        return obj && typeof obj === "object" && !Array.isArray(obj);
      }
      Object.assign(target, config1);
      for (const key of Object.keys(config2)) {
        if (isObject(config2[key]) && isObject(target[key])) {
          target[key] = mergeDeep(config1[key], config2[key]);
        } else {
          target[key] = config2[key];
        }
      }
      return target;
    }
    function applyExtends(config, cwd, mergeExtends = false) {
      let defaultConfig = {};
      if (Object.prototype.hasOwnProperty.call(config, "extends")) {
        if (typeof config.extends !== "string")
          return defaultConfig;
        const isPath = /\.json|\..*rc$/.test(config.extends);
        let pathToDefault = null;
        if (!isPath) {
          try {
            pathToDefault = require.resolve(config.extends);
          } catch (err) {
          }
        } else {
          pathToDefault = getPathToDefaultConfig(cwd, config.extends);
        }
        if (!pathToDefault && !isPath)
          return config;
        if (!pathToDefault)
          throw new yerror_1.YError(`Unable to find extended config '${config.extends}' in '${cwd}'.`);
        checkForCircularExtends(pathToDefault);
        previouslyVisitedConfigs.push(pathToDefault);
        defaultConfig = isPath ? JSON.parse(fs.readFileSync(pathToDefault, "utf8")) : require(config.extends);
        delete config.extends;
        defaultConfig = applyExtends(defaultConfig, path.dirname(pathToDefault), mergeExtends);
      }
      previouslyVisitedConfigs = [];
      return mergeExtends ? mergeDeep(defaultConfig, config) : Object.assign({}, defaultConfig, config);
    }
    exports2.applyExtends = applyExtends;
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/process-argv.js
var require_process_argv = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/process-argv.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getProcessArgvBin = exports2.getProcessArgvWithoutBin = void 0;
    function getProcessArgvBinIndex() {
      if (isBundledElectronApp())
        return 0;
      return 1;
    }
    function isBundledElectronApp() {
      return isElectronApp() && !process.defaultApp;
    }
    function isElectronApp() {
      return !!process.versions.electron;
    }
    function getProcessArgvWithoutBin() {
      return process.argv.slice(getProcessArgvBinIndex() + 1);
    }
    exports2.getProcessArgvWithoutBin = getProcessArgvWithoutBin;
    function getProcessArgvBin() {
      return process.argv[getProcessArgvBinIndex()];
    }
    exports2.getProcessArgvBin = getProcessArgvBin;
  }
});

// ../../node_modules/.pnpm/y18n@4.0.3/node_modules/y18n/index.js
var require_y18n = __commonJS({
  "../../node_modules/.pnpm/y18n@4.0.3/node_modules/y18n/index.js"(exports2, module2) {
    var fs = require("fs");
    var path = require("path");
    var util = require("util");
    function Y18N(opts) {
      opts = opts || {};
      this.directory = opts.directory || "./locales";
      this.updateFiles = typeof opts.updateFiles === "boolean" ? opts.updateFiles : true;
      this.locale = opts.locale || "en";
      this.fallbackToLanguage = typeof opts.fallbackToLanguage === "boolean" ? opts.fallbackToLanguage : true;
      this.cache = Object.create(null);
      this.writeQueue = [];
    }
    Y18N.prototype.__ = function() {
      if (typeof arguments[0] !== "string") {
        return this._taggedLiteral.apply(this, arguments);
      }
      var args = Array.prototype.slice.call(arguments);
      var str = args.shift();
      var cb = function() {
      };
      if (typeof args[args.length - 1] === "function")
        cb = args.pop();
      cb = cb || function() {
      };
      if (!this.cache[this.locale])
        this._readLocaleFile();
      if (!this.cache[this.locale][str] && this.updateFiles) {
        this.cache[this.locale][str] = str;
        this._enqueueWrite([this.directory, this.locale, cb]);
      } else {
        cb();
      }
      return util.format.apply(util, [this.cache[this.locale][str] || str].concat(args));
    };
    Y18N.prototype._taggedLiteral = function(parts) {
      var args = arguments;
      var str = "";
      parts.forEach(function(part, i) {
        var arg = args[i + 1];
        str += part;
        if (typeof arg !== "undefined") {
          str += "%s";
        }
      });
      return this.__.apply(null, [str].concat([].slice.call(arguments, 1)));
    };
    Y18N.prototype._enqueueWrite = function(work) {
      this.writeQueue.push(work);
      if (this.writeQueue.length === 1)
        this._processWriteQueue();
    };
    Y18N.prototype._processWriteQueue = function() {
      var _this = this;
      var work = this.writeQueue[0];
      var directory = work[0];
      var locale = work[1];
      var cb = work[2];
      var languageFile = this._resolveLocaleFile(directory, locale);
      var serializedLocale = JSON.stringify(this.cache[locale], null, 2);
      fs.writeFile(languageFile, serializedLocale, "utf-8", function(err) {
        _this.writeQueue.shift();
        if (_this.writeQueue.length > 0)
          _this._processWriteQueue();
        cb(err);
      });
    };
    Y18N.prototype._readLocaleFile = function() {
      var localeLookup = {};
      var languageFile = this._resolveLocaleFile(this.directory, this.locale);
      try {
        localeLookup = JSON.parse(fs.readFileSync(languageFile, "utf-8"));
      } catch (err) {
        if (err instanceof SyntaxError) {
          err.message = "syntax error in " + languageFile;
        }
        if (err.code === "ENOENT")
          localeLookup = {};
        else
          throw err;
      }
      this.cache[this.locale] = localeLookup;
    };
    Y18N.prototype._resolveLocaleFile = function(directory, locale) {
      var file = path.resolve(directory, "./", locale + ".json");
      if (this.fallbackToLanguage && !this._fileExistsSync(file) && ~locale.lastIndexOf("_")) {
        var languageFile = path.resolve(directory, "./", locale.split("_")[0] + ".json");
        if (this._fileExistsSync(languageFile))
          file = languageFile;
      }
      return file;
    };
    Y18N.prototype._fileExistsSync = function(file) {
      try {
        return fs.statSync(file).isFile();
      } catch (err) {
        return false;
      }
    };
    Y18N.prototype.__n = function() {
      var args = Array.prototype.slice.call(arguments);
      var singular = args.shift();
      var plural = args.shift();
      var quantity = args.shift();
      var cb = function() {
      };
      if (typeof args[args.length - 1] === "function")
        cb = args.pop();
      if (!this.cache[this.locale])
        this._readLocaleFile();
      var str = quantity === 1 ? singular : plural;
      if (this.cache[this.locale][singular]) {
        str = this.cache[this.locale][singular][quantity === 1 ? "one" : "other"];
      }
      if (!this.cache[this.locale][singular] && this.updateFiles) {
        this.cache[this.locale][singular] = {
          one: singular,
          other: plural
        };
        this._enqueueWrite([this.directory, this.locale, cb]);
      } else {
        cb();
      }
      var values = [str];
      if (~str.indexOf("%d"))
        values.push(quantity);
      return util.format.apply(util, values.concat(args));
    };
    Y18N.prototype.setLocale = function(locale) {
      this.locale = locale;
    };
    Y18N.prototype.getLocale = function() {
      return this.locale;
    };
    Y18N.prototype.updateLocale = function(obj) {
      if (!this.cache[this.locale])
        this._readLocaleFile();
      for (var key in obj) {
        this.cache[this.locale][key] = obj[key];
      }
    };
    module2.exports = function(opts) {
      var y18n = new Y18N(opts);
      for (var key in y18n) {
        if (typeof y18n[key] === "function") {
          y18n[key] = y18n[key].bind(y18n);
        }
      }
      return y18n;
    };
  }
});

// ../../node_modules/.pnpm/p-try@2.2.0/node_modules/p-try/index.js
var require_p_try = __commonJS({
  "../../node_modules/.pnpm/p-try@2.2.0/node_modules/p-try/index.js"(exports2, module2) {
    "use strict";
    var pTry = (fn, ...arguments_) => new Promise((resolve) => {
      resolve(fn(...arguments_));
    });
    module2.exports = pTry;
    module2.exports.default = pTry;
  }
});

// ../../node_modules/.pnpm/p-limit@2.3.0/node_modules/p-limit/index.js
var require_p_limit2 = __commonJS({
  "../../node_modules/.pnpm/p-limit@2.3.0/node_modules/p-limit/index.js"(exports2, module2) {
    "use strict";
    var pTry = require_p_try();
    var pLimit = (concurrency) => {
      if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
        return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
      }
      const queue = [];
      let activeCount = 0;
      const next = () => {
        activeCount--;
        if (queue.length > 0) {
          queue.shift()();
        }
      };
      const run = (fn, resolve, ...args) => {
        activeCount++;
        const result = pTry(fn, ...args);
        resolve(result);
        result.then(next, next);
      };
      const enqueue = (fn, resolve, ...args) => {
        if (activeCount < concurrency) {
          run(fn, resolve, ...args);
        } else {
          queue.push(run.bind(null, fn, resolve, ...args));
        }
      };
      const generator = (fn, ...args) => new Promise((resolve) => enqueue(fn, resolve, ...args));
      Object.defineProperties(generator, {
        activeCount: {
          get: () => activeCount
        },
        pendingCount: {
          get: () => queue.length
        },
        clearQueue: {
          value: () => {
            queue.length = 0;
          }
        }
      });
      return generator;
    };
    module2.exports = pLimit;
    module2.exports.default = pLimit;
  }
});

// ../../node_modules/.pnpm/p-locate@4.1.0/node_modules/p-locate/index.js
var require_p_locate2 = __commonJS({
  "../../node_modules/.pnpm/p-locate@4.1.0/node_modules/p-locate/index.js"(exports2, module2) {
    "use strict";
    var pLimit = require_p_limit2();
    var EndError = class extends Error {
      constructor(value) {
        super();
        this.value = value;
      }
    };
    var testElement = async (element, tester) => tester(await element);
    var finder = async (element) => {
      const values = await Promise.all(element);
      if (values[1] === true) {
        throw new EndError(values[0]);
      }
      return false;
    };
    var pLocate = async (iterable, tester, options) => {
      options = {
        concurrency: Infinity,
        preserveOrder: true,
        ...options
      };
      const limit = pLimit(options.concurrency);
      const items = [...iterable].map((element) => [element, limit(testElement, element, tester)]);
      const checkLimit = pLimit(options.preserveOrder ? 1 : Infinity);
      try {
        await Promise.all(items.map((element) => checkLimit(finder, element)));
      } catch (error) {
        if (error instanceof EndError) {
          return error.value;
        }
        throw error;
      }
    };
    module2.exports = pLocate;
    module2.exports.default = pLocate;
  }
});

// ../../node_modules/.pnpm/locate-path@5.0.0/node_modules/locate-path/index.js
var require_locate_path2 = __commonJS({
  "../../node_modules/.pnpm/locate-path@5.0.0/node_modules/locate-path/index.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var fs = require("fs");
    var { promisify } = require("util");
    var pLocate = require_p_locate2();
    var fsStat = promisify(fs.stat);
    var fsLStat = promisify(fs.lstat);
    var typeMappings = {
      directory: "isDirectory",
      file: "isFile"
    };
    function checkType({ type }) {
      if (type in typeMappings) {
        return;
      }
      throw new Error(`Invalid type specified: ${type}`);
    }
    var matchType = (type, stat) => type === void 0 || stat[typeMappings[type]]();
    module2.exports = async (paths, options) => {
      options = {
        cwd: process.cwd(),
        type: "file",
        allowSymlinks: true,
        ...options
      };
      checkType(options);
      const statFn = options.allowSymlinks ? fsStat : fsLStat;
      return pLocate(paths, async (path_) => {
        try {
          const stat = await statFn(path.resolve(options.cwd, path_));
          return matchType(options.type, stat);
        } catch (_) {
          return false;
        }
      }, options);
    };
    module2.exports.sync = (paths, options) => {
      options = {
        cwd: process.cwd(),
        allowSymlinks: true,
        type: "file",
        ...options
      };
      checkType(options);
      const statFn = options.allowSymlinks ? fs.statSync : fs.lstatSync;
      for (const path_ of paths) {
        try {
          const stat = statFn(path.resolve(options.cwd, path_));
          if (matchType(options.type, stat)) {
            return path_;
          }
        } catch (_) {
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/find-up@4.1.0/node_modules/find-up/index.js
var require_find_up2 = __commonJS({
  "../../node_modules/.pnpm/find-up@4.1.0/node_modules/find-up/index.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var locatePath = require_locate_path2();
    var pathExists = require_path_exists();
    var stop = Symbol("findUp.stop");
    module2.exports = async (name, options = {}) => {
      let directory = path.resolve(options.cwd || "");
      const { root } = path.parse(directory);
      const paths = [].concat(name);
      const runMatcher = async (locateOptions) => {
        if (typeof name !== "function") {
          return locatePath(paths, locateOptions);
        }
        const foundPath = await name(locateOptions.cwd);
        if (typeof foundPath === "string") {
          return locatePath([foundPath], locateOptions);
        }
        return foundPath;
      };
      while (true) {
        const foundPath = await runMatcher({ ...options, cwd: directory });
        if (foundPath === stop) {
          return;
        }
        if (foundPath) {
          return path.resolve(directory, foundPath);
        }
        if (directory === root) {
          return;
        }
        directory = path.dirname(directory);
      }
    };
    module2.exports.sync = (name, options = {}) => {
      let directory = path.resolve(options.cwd || "");
      const { root } = path.parse(directory);
      const paths = [].concat(name);
      const runMatcher = (locateOptions) => {
        if (typeof name !== "function") {
          return locatePath.sync(paths, locateOptions);
        }
        const foundPath = name(locateOptions.cwd);
        if (typeof foundPath === "string") {
          return locatePath.sync([foundPath], locateOptions);
        }
        return foundPath;
      };
      while (true) {
        const foundPath = runMatcher({ ...options, cwd: directory });
        if (foundPath === stop) {
          return;
        }
        if (foundPath) {
          return path.resolve(directory, foundPath);
        }
        if (directory === root) {
          return;
        }
        directory = path.dirname(directory);
      }
    };
    module2.exports.exists = pathExists;
    module2.exports.sync.exists = pathExists.sync;
    module2.exports.stop = stop;
  }
});

// ../../node_modules/.pnpm/require-main-filename@2.0.0/node_modules/require-main-filename/index.js
var require_require_main_filename = __commonJS({
  "../../node_modules/.pnpm/require-main-filename@2.0.0/node_modules/require-main-filename/index.js"(exports2, module2) {
    module2.exports = function(_require) {
      _require = _require || require;
      var main = _require.main;
      if (main && isIISNode(main))
        return handleIISNode(main);
      else
        return main ? main.filename : process.cwd();
    };
    function isIISNode(main) {
      return /\\iisnode\\/.test(main.filename);
    }
    function handleIISNode(main) {
      if (!main.children.length) {
        return main.filename;
      } else {
        return main.children[0].filename;
      }
    }
  }
});

// ../../node_modules/.pnpm/get-caller-file@2.0.5/node_modules/get-caller-file/index.js
var require_get_caller_file = __commonJS({
  "../../node_modules/.pnpm/get-caller-file@2.0.5/node_modules/get-caller-file/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function getCallerFile(position) {
      if (position === void 0) {
        position = 2;
      }
      if (position >= Error.stackTraceLimit) {
        throw new TypeError("getCallerFile(position) requires position be less then Error.stackTraceLimit but position was: `" + position + "` and Error.stackTraceLimit was: `" + Error.stackTraceLimit + "`");
      }
      var oldPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack2) {
        return stack2;
      };
      var stack = new Error().stack;
      Error.prepareStackTrace = oldPrepareStackTrace;
      if (stack !== null && typeof stack === "object") {
        return stack[position] ? stack[position].getFileName() : void 0;
      }
    };
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/yargs.js
var require_yargs = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/build/lib/yargs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isYargsInstance = exports2.rebase = exports2.Yargs = void 0;
    var command_1 = require_command();
    var common_types_1 = require_common_types();
    var yerror_1 = require_yerror();
    var usage_1 = require_usage();
    var argsert_1 = require_argsert();
    var fs = require("fs");
    var completion_1 = require_completion();
    var path = require("path");
    var validation_1 = require_validation();
    var obj_filter_1 = require_obj_filter();
    var apply_extends_1 = require_apply_extends();
    var middleware_1 = require_middleware();
    var processArgv = require_process_argv();
    var is_promise_1 = require_is_promise();
    var Parser = require_yargs_parser();
    var y18nFactory = require_y18n();
    var setBlocking = require_set_blocking();
    var findUp = require_find_up2();
    var requireMainFilename = require_require_main_filename();
    function Yargs(processArgs = [], cwd = process.cwd(), parentRequire = require) {
      const self = {};
      let command;
      let completion = null;
      let groups = {};
      const globalMiddleware = [];
      let output = "";
      const preservedGroups = {};
      let usage;
      let validation;
      let handlerFinishCommand = null;
      const y18n = y18nFactory({
        directory: path.resolve(__dirname, "../../locales"),
        updateFiles: false
      });
      self.middleware = middleware_1.globalMiddlewareFactory(globalMiddleware, self);
      self.scriptName = function(scriptName) {
        self.customScriptName = true;
        self.$0 = scriptName;
        return self;
      };
      let default$0;
      if (/\b(node|iojs|electron)(\.exe)?$/.test(process.argv[0])) {
        default$0 = process.argv.slice(1, 2);
      } else {
        default$0 = process.argv.slice(0, 1);
      }
      self.$0 = default$0.map((x) => {
        const b = rebase(cwd, x);
        return x.match(/^(\/|([a-zA-Z]:)?\\)/) && b.length < x.length ? b : x;
      }).join(" ").trim();
      if (process.env._ !== void 0 && processArgv.getProcessArgvBin() === process.env._) {
        self.$0 = process.env._.replace(`${path.dirname(process.execPath)}/`, "");
      }
      const context = { resets: -1, commands: [], fullCommands: [], files: [] };
      self.getContext = () => context;
      let options;
      self.resetOptions = self.reset = function resetOptions(aliases = {}) {
        context.resets++;
        options = options || {};
        const tmpOptions = {};
        tmpOptions.local = options.local ? options.local : [];
        tmpOptions.configObjects = options.configObjects ? options.configObjects : [];
        const localLookup = {};
        tmpOptions.local.forEach((l) => {
          localLookup[l] = true;
          (aliases[l] || []).forEach((a) => {
            localLookup[a] = true;
          });
        });
        Object.assign(preservedGroups, Object.keys(groups).reduce((acc, groupName) => {
          const keys = groups[groupName].filter((key) => !(key in localLookup));
          if (keys.length > 0) {
            acc[groupName] = keys;
          }
          return acc;
        }, {}));
        groups = {};
        const arrayOptions = [
          "array",
          "boolean",
          "string",
          "skipValidation",
          "count",
          "normalize",
          "number",
          "hiddenOptions"
        ];
        const objectOptions = [
          "narg",
          "key",
          "alias",
          "default",
          "defaultDescription",
          "config",
          "choices",
          "demandedOptions",
          "demandedCommands",
          "coerce",
          "deprecatedOptions"
        ];
        arrayOptions.forEach((k) => {
          tmpOptions[k] = (options[k] || []).filter((k2) => !localLookup[k2]);
        });
        objectOptions.forEach((k) => {
          tmpOptions[k] = obj_filter_1.objFilter(options[k], (k2) => !localLookup[k2]);
        });
        tmpOptions.envPrefix = options.envPrefix;
        options = tmpOptions;
        usage = usage ? usage.reset(localLookup) : usage_1.usage(self, y18n);
        validation = validation ? validation.reset(localLookup) : validation_1.validation(self, usage, y18n);
        command = command ? command.reset() : command_1.command(self, usage, validation, globalMiddleware);
        if (!completion)
          completion = completion_1.completion(self, usage, command);
        completionCommand = null;
        output = "";
        exitError = null;
        hasOutput = false;
        self.parsed = false;
        return self;
      };
      self.resetOptions();
      const frozens = [];
      function freeze() {
        frozens.push({
          options,
          configObjects: options.configObjects.slice(0),
          exitProcess,
          groups,
          strict,
          strictCommands,
          completionCommand,
          output,
          exitError,
          hasOutput,
          parsed: self.parsed,
          parseFn,
          parseContext,
          handlerFinishCommand
        });
        usage.freeze();
        validation.freeze();
        command.freeze();
      }
      function unfreeze() {
        const frozen = frozens.pop();
        common_types_1.assertNotStrictEqual(frozen, void 0);
        let configObjects;
        ({
          options,
          configObjects,
          exitProcess,
          groups,
          output,
          exitError,
          hasOutput,
          parsed: self.parsed,
          strict,
          strictCommands,
          completionCommand,
          parseFn,
          parseContext,
          handlerFinishCommand
        } = frozen);
        options.configObjects = configObjects;
        usage.unfreeze();
        validation.unfreeze();
        command.unfreeze();
      }
      self.boolean = function(keys) {
        argsert_1.argsert("<array|string>", [keys], arguments.length);
        populateParserHintArray("boolean", keys);
        return self;
      };
      self.array = function(keys) {
        argsert_1.argsert("<array|string>", [keys], arguments.length);
        populateParserHintArray("array", keys);
        return self;
      };
      self.number = function(keys) {
        argsert_1.argsert("<array|string>", [keys], arguments.length);
        populateParserHintArray("number", keys);
        return self;
      };
      self.normalize = function(keys) {
        argsert_1.argsert("<array|string>", [keys], arguments.length);
        populateParserHintArray("normalize", keys);
        return self;
      };
      self.count = function(keys) {
        argsert_1.argsert("<array|string>", [keys], arguments.length);
        populateParserHintArray("count", keys);
        return self;
      };
      self.string = function(keys) {
        argsert_1.argsert("<array|string>", [keys], arguments.length);
        populateParserHintArray("string", keys);
        return self;
      };
      self.requiresArg = function(keys) {
        argsert_1.argsert("<array|string|object> [number]", [keys], arguments.length);
        if (typeof keys === "string" && options.narg[keys]) {
          return self;
        } else {
          populateParserHintSingleValueDictionary(self.requiresArg, "narg", keys, NaN);
        }
        return self;
      };
      self.skipValidation = function(keys) {
        argsert_1.argsert("<array|string>", [keys], arguments.length);
        populateParserHintArray("skipValidation", keys);
        return self;
      };
      function populateParserHintArray(type, keys) {
        keys = [].concat(keys);
        keys.forEach((key) => {
          key = sanitizeKey(key);
          options[type].push(key);
        });
      }
      self.nargs = function(key, value) {
        argsert_1.argsert("<string|object|array> [number]", [key, value], arguments.length);
        populateParserHintSingleValueDictionary(self.nargs, "narg", key, value);
        return self;
      };
      self.choices = function(key, value) {
        argsert_1.argsert("<object|string|array> [string|array]", [key, value], arguments.length);
        populateParserHintArrayDictionary(self.choices, "choices", key, value);
        return self;
      };
      self.alias = function(key, value) {
        argsert_1.argsert("<object|string|array> [string|array]", [key, value], arguments.length);
        populateParserHintArrayDictionary(self.alias, "alias", key, value);
        return self;
      };
      self.default = self.defaults = function(key, value, defaultDescription) {
        argsert_1.argsert("<object|string|array> [*] [string]", [key, value, defaultDescription], arguments.length);
        if (defaultDescription) {
          common_types_1.assertSingleKey(key);
          options.defaultDescription[key] = defaultDescription;
        }
        if (typeof value === "function") {
          common_types_1.assertSingleKey(key);
          if (!options.defaultDescription[key])
            options.defaultDescription[key] = usage.functionDescription(value);
          value = value.call();
        }
        populateParserHintSingleValueDictionary(self.default, "default", key, value);
        return self;
      };
      self.describe = function(key, desc) {
        argsert_1.argsert("<object|string|array> [string]", [key, desc], arguments.length);
        setKey(key, true);
        usage.describe(key, desc);
        return self;
      };
      function setKey(key, set) {
        populateParserHintSingleValueDictionary(setKey, "key", key, set);
        return self;
      }
      function demandOption(keys, msg) {
        argsert_1.argsert("<object|string|array> [string]", [keys, msg], arguments.length);
        populateParserHintSingleValueDictionary(self.demandOption, "demandedOptions", keys, msg);
        return self;
      }
      self.demandOption = demandOption;
      self.coerce = function(keys, value) {
        argsert_1.argsert("<object|string|array> [function]", [keys, value], arguments.length);
        populateParserHintSingleValueDictionary(self.coerce, "coerce", keys, value);
        return self;
      };
      function populateParserHintSingleValueDictionary(builder, type, key, value) {
        populateParserHintDictionary(builder, type, key, value, (type2, key2, value2) => {
          options[type2][key2] = value2;
        });
      }
      function populateParserHintArrayDictionary(builder, type, key, value) {
        populateParserHintDictionary(builder, type, key, value, (type2, key2, value2) => {
          options[type2][key2] = (options[type2][key2] || []).concat(value2);
        });
      }
      function populateParserHintDictionary(builder, type, key, value, singleKeyHandler) {
        if (Array.isArray(key)) {
          key.forEach((k) => {
            builder(k, value);
          });
        } else if (((key2) => typeof key2 === "object")(key)) {
          for (const k of common_types_1.objectKeys(key)) {
            builder(k, key[k]);
          }
        } else {
          singleKeyHandler(type, sanitizeKey(key), value);
        }
      }
      function sanitizeKey(key) {
        if (key === "__proto__")
          return "___proto___";
        return key;
      }
      function deleteFromParserHintObject(optionKey) {
        common_types_1.objectKeys(options).forEach((hintKey) => {
          if (((key) => key === "configObjects")(hintKey))
            return;
          const hint = options[hintKey];
          if (Array.isArray(hint)) {
            if (~hint.indexOf(optionKey))
              hint.splice(hint.indexOf(optionKey), 1);
          } else if (typeof hint === "object") {
            delete hint[optionKey];
          }
        });
        delete usage.getDescriptions()[optionKey];
      }
      self.config = function config(key = "config", msg, parseFn2) {
        argsert_1.argsert("[object|string] [string|function] [function]", [key, msg, parseFn2], arguments.length);
        if (typeof key === "object" && !Array.isArray(key)) {
          key = apply_extends_1.applyExtends(key, cwd, self.getParserConfiguration()["deep-merge-config"]);
          options.configObjects = (options.configObjects || []).concat(key);
          return self;
        }
        if (typeof msg === "function") {
          parseFn2 = msg;
          msg = void 0;
        }
        self.describe(key, msg || usage.deferY18nLookup("Path to JSON config file"));
        (Array.isArray(key) ? key : [key]).forEach((k) => {
          options.config[k] = parseFn2 || true;
        });
        return self;
      };
      self.example = function(cmd, description) {
        argsert_1.argsert("<string|array> [string]", [cmd, description], arguments.length);
        if (Array.isArray(cmd)) {
          cmd.forEach((exampleParams) => self.example(...exampleParams));
        } else {
          usage.example(cmd, description);
        }
        return self;
      };
      self.command = function(cmd, description, builder, handler, middlewares, deprecated) {
        argsert_1.argsert("<string|array|object> [string|boolean] [function|object] [function] [array] [boolean|string]", [cmd, description, builder, handler, middlewares, deprecated], arguments.length);
        command.addHandler(cmd, description, builder, handler, middlewares, deprecated);
        return self;
      };
      self.commandDir = function(dir, opts) {
        argsert_1.argsert("<string> [object]", [dir, opts], arguments.length);
        const req = parentRequire || require;
        command.addDirectory(dir, self.getContext(), req, require_get_caller_file()(), opts);
        return self;
      };
      self.demand = self.required = self.require = function demand(keys, max, msg) {
        if (Array.isArray(max)) {
          max.forEach((key) => {
            common_types_1.assertNotStrictEqual(msg, true);
            demandOption(key, msg);
          });
          max = Infinity;
        } else if (typeof max !== "number") {
          msg = max;
          max = Infinity;
        }
        if (typeof keys === "number") {
          common_types_1.assertNotStrictEqual(msg, true);
          self.demandCommand(keys, max, msg, msg);
        } else if (Array.isArray(keys)) {
          keys.forEach((key) => {
            common_types_1.assertNotStrictEqual(msg, true);
            demandOption(key, msg);
          });
        } else {
          if (typeof msg === "string") {
            demandOption(keys, msg);
          } else if (msg === true || typeof msg === "undefined") {
            demandOption(keys);
          }
        }
        return self;
      };
      self.demandCommand = function demandCommand(min = 1, max, minMsg, maxMsg) {
        argsert_1.argsert("[number] [number|string] [string|null|undefined] [string|null|undefined]", [min, max, minMsg, maxMsg], arguments.length);
        if (typeof max !== "number") {
          minMsg = max;
          max = Infinity;
        }
        self.global("_", false);
        options.demandedCommands._ = {
          min,
          max,
          minMsg,
          maxMsg
        };
        return self;
      };
      self.getDemandedOptions = () => {
        argsert_1.argsert([], 0);
        return options.demandedOptions;
      };
      self.getDemandedCommands = () => {
        argsert_1.argsert([], 0);
        return options.demandedCommands;
      };
      self.deprecateOption = function deprecateOption(option, message) {
        argsert_1.argsert("<string> [string|boolean]", [option, message], arguments.length);
        options.deprecatedOptions[option] = message;
        return self;
      };
      self.getDeprecatedOptions = () => {
        argsert_1.argsert([], 0);
        return options.deprecatedOptions;
      };
      self.implies = function(key, value) {
        argsert_1.argsert("<string|object> [number|string|array]", [key, value], arguments.length);
        validation.implies(key, value);
        return self;
      };
      self.conflicts = function(key1, key2) {
        argsert_1.argsert("<string|object> [string|array]", [key1, key2], arguments.length);
        validation.conflicts(key1, key2);
        return self;
      };
      self.usage = function(msg, description, builder, handler) {
        argsert_1.argsert("<string|null|undefined> [string|boolean] [function|object] [function]", [msg, description, builder, handler], arguments.length);
        if (description !== void 0) {
          common_types_1.assertNotStrictEqual(msg, null);
          if ((msg || "").match(/^\$0( |$)/)) {
            return self.command(msg, description, builder, handler);
          } else {
            throw new yerror_1.YError(".usage() description must start with $0 if being used as alias for .command()");
          }
        } else {
          usage.usage(msg);
          return self;
        }
      };
      self.epilogue = self.epilog = function(msg) {
        argsert_1.argsert("<string>", [msg], arguments.length);
        usage.epilog(msg);
        return self;
      };
      self.fail = function(f) {
        argsert_1.argsert("<function>", [f], arguments.length);
        usage.failFn(f);
        return self;
      };
      self.onFinishCommand = function(f) {
        argsert_1.argsert("<function>", [f], arguments.length);
        handlerFinishCommand = f;
        return self;
      };
      self.getHandlerFinishCommand = () => handlerFinishCommand;
      self.check = function(f, _global) {
        argsert_1.argsert("<function> [boolean]", [f, _global], arguments.length);
        validation.check(f, _global !== false);
        return self;
      };
      self.global = function global2(globals, global2) {
        argsert_1.argsert("<string|array> [boolean]", [globals, global2], arguments.length);
        globals = [].concat(globals);
        if (global2 !== false) {
          options.local = options.local.filter((l) => globals.indexOf(l) === -1);
        } else {
          globals.forEach((g) => {
            if (options.local.indexOf(g) === -1)
              options.local.push(g);
          });
        }
        return self;
      };
      self.pkgConf = function pkgConf(key, rootPath) {
        argsert_1.argsert("<string> [string]", [key, rootPath], arguments.length);
        let conf = null;
        const obj = pkgUp(rootPath || cwd);
        if (obj[key] && typeof obj[key] === "object") {
          conf = apply_extends_1.applyExtends(obj[key], rootPath || cwd, self.getParserConfiguration()["deep-merge-config"]);
          options.configObjects = (options.configObjects || []).concat(conf);
        }
        return self;
      };
      const pkgs = {};
      function pkgUp(rootPath) {
        const npath = rootPath || "*";
        if (pkgs[npath])
          return pkgs[npath];
        let obj = {};
        try {
          let startDir = rootPath || requireMainFilename(parentRequire);
          if (!rootPath && path.extname(startDir)) {
            startDir = path.dirname(startDir);
          }
          const pkgJsonPath = findUp.sync("package.json", {
            cwd: startDir
          });
          common_types_1.assertNotStrictEqual(pkgJsonPath, void 0);
          obj = JSON.parse(fs.readFileSync(pkgJsonPath).toString());
        } catch (noop) {
        }
        pkgs[npath] = obj || {};
        return pkgs[npath];
      }
      let parseFn = null;
      let parseContext = null;
      self.parse = function parse(args, shortCircuit, _parseFn) {
        argsert_1.argsert("[string|array] [function|boolean|object] [function]", [args, shortCircuit, _parseFn], arguments.length);
        freeze();
        if (typeof args === "undefined") {
          const argv = self._parseArgs(processArgs);
          const tmpParsed = self.parsed;
          unfreeze();
          self.parsed = tmpParsed;
          return argv;
        }
        if (typeof shortCircuit === "object") {
          parseContext = shortCircuit;
          shortCircuit = _parseFn;
        }
        if (typeof shortCircuit === "function") {
          parseFn = shortCircuit;
          shortCircuit = false;
        }
        if (!shortCircuit)
          processArgs = args;
        if (parseFn)
          exitProcess = false;
        const parsed = self._parseArgs(args, !!shortCircuit);
        completion.setParsed(self.parsed);
        if (parseFn)
          parseFn(exitError, parsed, output);
        unfreeze();
        return parsed;
      };
      self._getParseContext = () => parseContext || {};
      self._hasParseCallback = () => !!parseFn;
      self.option = self.options = function option(key, opt) {
        argsert_1.argsert("<string|object> [object]", [key, opt], arguments.length);
        if (typeof key === "object") {
          Object.keys(key).forEach((k) => {
            self.options(k, key[k]);
          });
        } else {
          if (typeof opt !== "object") {
            opt = {};
          }
          options.key[key] = true;
          if (opt.alias)
            self.alias(key, opt.alias);
          const deprecate = opt.deprecate || opt.deprecated;
          if (deprecate) {
            self.deprecateOption(key, deprecate);
          }
          const demand = opt.demand || opt.required || opt.require;
          if (demand) {
            self.demand(key, demand);
          }
          if (opt.demandOption) {
            self.demandOption(key, typeof opt.demandOption === "string" ? opt.demandOption : void 0);
          }
          if (opt.conflicts) {
            self.conflicts(key, opt.conflicts);
          }
          if ("default" in opt) {
            self.default(key, opt.default);
          }
          if (opt.implies !== void 0) {
            self.implies(key, opt.implies);
          }
          if (opt.nargs !== void 0) {
            self.nargs(key, opt.nargs);
          }
          if (opt.config) {
            self.config(key, opt.configParser);
          }
          if (opt.normalize) {
            self.normalize(key);
          }
          if (opt.choices) {
            self.choices(key, opt.choices);
          }
          if (opt.coerce) {
            self.coerce(key, opt.coerce);
          }
          if (opt.group) {
            self.group(key, opt.group);
          }
          if (opt.boolean || opt.type === "boolean") {
            self.boolean(key);
            if (opt.alias)
              self.boolean(opt.alias);
          }
          if (opt.array || opt.type === "array") {
            self.array(key);
            if (opt.alias)
              self.array(opt.alias);
          }
          if (opt.number || opt.type === "number") {
            self.number(key);
            if (opt.alias)
              self.number(opt.alias);
          }
          if (opt.string || opt.type === "string") {
            self.string(key);
            if (opt.alias)
              self.string(opt.alias);
          }
          if (opt.count || opt.type === "count") {
            self.count(key);
          }
          if (typeof opt.global === "boolean") {
            self.global(key, opt.global);
          }
          if (opt.defaultDescription) {
            options.defaultDescription[key] = opt.defaultDescription;
          }
          if (opt.skipValidation) {
            self.skipValidation(key);
          }
          const desc = opt.describe || opt.description || opt.desc;
          self.describe(key, desc);
          if (opt.hidden) {
            self.hide(key);
          }
          if (opt.requiresArg) {
            self.requiresArg(key);
          }
        }
        return self;
      };
      self.getOptions = () => options;
      self.positional = function(key, opts) {
        argsert_1.argsert("<string> <object>", [key, opts], arguments.length);
        if (context.resets === 0) {
          throw new yerror_1.YError(".positional() can only be called in a command's builder function");
        }
        const supportedOpts = [
          "default",
          "defaultDescription",
          "implies",
          "normalize",
          "choices",
          "conflicts",
          "coerce",
          "type",
          "describe",
          "desc",
          "description",
          "alias"
        ];
        opts = obj_filter_1.objFilter(opts, (k, v) => {
          let accept = supportedOpts.indexOf(k) !== -1;
          if (k === "type" && ["string", "number", "boolean"].indexOf(v) === -1)
            accept = false;
          return accept;
        });
        const fullCommand = context.fullCommands[context.fullCommands.length - 1];
        const parseOptions = fullCommand ? command.cmdToParseOptions(fullCommand) : {
          array: [],
          alias: {},
          default: {},
          demand: {}
        };
        common_types_1.objectKeys(parseOptions).forEach((pk) => {
          const parseOption = parseOptions[pk];
          if (Array.isArray(parseOption)) {
            if (parseOption.indexOf(key) !== -1)
              opts[pk] = true;
          } else {
            if (parseOption[key] && !(pk in opts))
              opts[pk] = parseOption[key];
          }
        });
        self.group(key, usage.getPositionalGroupName());
        return self.option(key, opts);
      };
      self.group = function group(opts, groupName) {
        argsert_1.argsert("<string|array> <string>", [opts, groupName], arguments.length);
        const existing = preservedGroups[groupName] || groups[groupName];
        if (preservedGroups[groupName]) {
          delete preservedGroups[groupName];
        }
        const seen = {};
        groups[groupName] = (existing || []).concat(opts).filter((key) => {
          if (seen[key])
            return false;
          return seen[key] = true;
        });
        return self;
      };
      self.getGroups = () => Object.assign({}, groups, preservedGroups);
      self.env = function(prefix) {
        argsert_1.argsert("[string|boolean]", [prefix], arguments.length);
        if (prefix === false)
          delete options.envPrefix;
        else
          options.envPrefix = prefix || "";
        return self;
      };
      self.wrap = function(cols) {
        argsert_1.argsert("<number|null|undefined>", [cols], arguments.length);
        usage.wrap(cols);
        return self;
      };
      let strict = false;
      self.strict = function(enabled) {
        argsert_1.argsert("[boolean]", [enabled], arguments.length);
        strict = enabled !== false;
        return self;
      };
      self.getStrict = () => strict;
      let strictCommands = false;
      self.strictCommands = function(enabled) {
        argsert_1.argsert("[boolean]", [enabled], arguments.length);
        strictCommands = enabled !== false;
        return self;
      };
      self.getStrictCommands = () => strictCommands;
      let parserConfig = {};
      self.parserConfiguration = function parserConfiguration(config) {
        argsert_1.argsert("<object>", [config], arguments.length);
        parserConfig = config;
        return self;
      };
      self.getParserConfiguration = () => parserConfig;
      self.showHelp = function(level) {
        argsert_1.argsert("[string|function]", [level], arguments.length);
        if (!self.parsed)
          self._parseArgs(processArgs);
        if (command.hasDefaultCommand()) {
          context.resets++;
          command.runDefaultBuilderOn(self);
        }
        usage.showHelp(level);
        return self;
      };
      let versionOpt = null;
      self.version = function version(opt, msg, ver) {
        const defaultVersionOpt = "version";
        argsert_1.argsert("[boolean|string] [string] [string]", [opt, msg, ver], arguments.length);
        if (versionOpt) {
          deleteFromParserHintObject(versionOpt);
          usage.version(void 0);
          versionOpt = null;
        }
        if (arguments.length === 0) {
          ver = guessVersion();
          opt = defaultVersionOpt;
        } else if (arguments.length === 1) {
          if (opt === false) {
            return self;
          }
          ver = opt;
          opt = defaultVersionOpt;
        } else if (arguments.length === 2) {
          ver = msg;
          msg = void 0;
        }
        versionOpt = typeof opt === "string" ? opt : defaultVersionOpt;
        msg = msg || usage.deferY18nLookup("Show version number");
        usage.version(ver || void 0);
        self.boolean(versionOpt);
        self.describe(versionOpt, msg);
        return self;
      };
      function guessVersion() {
        const obj = pkgUp();
        return obj.version || "unknown";
      }
      let helpOpt = null;
      self.addHelpOpt = self.help = function addHelpOpt(opt, msg) {
        const defaultHelpOpt = "help";
        argsert_1.argsert("[string|boolean] [string]", [opt, msg], arguments.length);
        if (helpOpt) {
          deleteFromParserHintObject(helpOpt);
          helpOpt = null;
        }
        if (arguments.length === 1) {
          if (opt === false)
            return self;
        }
        helpOpt = typeof opt === "string" ? opt : defaultHelpOpt;
        self.boolean(helpOpt);
        self.describe(helpOpt, msg || usage.deferY18nLookup("Show help"));
        return self;
      };
      const defaultShowHiddenOpt = "show-hidden";
      options.showHiddenOpt = defaultShowHiddenOpt;
      self.addShowHiddenOpt = self.showHidden = function addShowHiddenOpt(opt, msg) {
        argsert_1.argsert("[string|boolean] [string]", [opt, msg], arguments.length);
        if (arguments.length === 1) {
          if (opt === false)
            return self;
        }
        const showHiddenOpt = typeof opt === "string" ? opt : defaultShowHiddenOpt;
        self.boolean(showHiddenOpt);
        self.describe(showHiddenOpt, msg || usage.deferY18nLookup("Show hidden options"));
        options.showHiddenOpt = showHiddenOpt;
        return self;
      };
      self.hide = function hide(key) {
        argsert_1.argsert("<string>", [key], arguments.length);
        options.hiddenOptions.push(key);
        return self;
      };
      self.showHelpOnFail = function showHelpOnFail(enabled, message) {
        argsert_1.argsert("[boolean|string] [string]", [enabled, message], arguments.length);
        usage.showHelpOnFail(enabled, message);
        return self;
      };
      var exitProcess = true;
      self.exitProcess = function(enabled = true) {
        argsert_1.argsert("[boolean]", [enabled], arguments.length);
        exitProcess = enabled;
        return self;
      };
      self.getExitProcess = () => exitProcess;
      var completionCommand = null;
      self.completion = function(cmd, desc, fn) {
        argsert_1.argsert("[string] [string|boolean|function] [function]", [cmd, desc, fn], arguments.length);
        if (typeof desc === "function") {
          fn = desc;
          desc = void 0;
        }
        completionCommand = cmd || completionCommand || "completion";
        if (!desc && desc !== false) {
          desc = "generate completion script";
        }
        self.command(completionCommand, desc);
        if (fn)
          completion.registerFunction(fn);
        return self;
      };
      self.showCompletionScript = function($0, cmd) {
        argsert_1.argsert("[string] [string]", [$0, cmd], arguments.length);
        $0 = $0 || self.$0;
        _logger.log(completion.generateCompletionScript($0, cmd || completionCommand || "completion"));
        return self;
      };
      self.getCompletion = function(args, done) {
        argsert_1.argsert("<array> <function>", [args, done], arguments.length);
        completion.getCompletion(args, done);
      };
      self.locale = function(locale) {
        argsert_1.argsert("[string]", [locale], arguments.length);
        if (!locale) {
          guessLocale();
          return y18n.getLocale();
        }
        detectLocale = false;
        y18n.setLocale(locale);
        return self;
      };
      self.updateStrings = self.updateLocale = function(obj) {
        argsert_1.argsert("<object>", [obj], arguments.length);
        detectLocale = false;
        y18n.updateLocale(obj);
        return self;
      };
      let detectLocale = true;
      self.detectLocale = function(detect) {
        argsert_1.argsert("<boolean>", [detect], arguments.length);
        detectLocale = detect;
        return self;
      };
      self.getDetectLocale = () => detectLocale;
      var hasOutput = false;
      var exitError = null;
      self.exit = (code, err) => {
        hasOutput = true;
        exitError = err;
        if (exitProcess)
          process.exit(code);
      };
      const _logger = {
        log(...args) {
          if (!self._hasParseCallback())
            console.log(...args);
          hasOutput = true;
          if (output.length)
            output += "\n";
          output += args.join(" ");
        },
        error(...args) {
          if (!self._hasParseCallback())
            console.error(...args);
          hasOutput = true;
          if (output.length)
            output += "\n";
          output += args.join(" ");
        }
      };
      self._getLoggerInstance = () => _logger;
      self._hasOutput = () => hasOutput;
      self._setHasOutput = () => {
        hasOutput = true;
      };
      let recommendCommands;
      self.recommendCommands = function(recommend = true) {
        argsert_1.argsert("[boolean]", [recommend], arguments.length);
        recommendCommands = recommend;
        return self;
      };
      self.getUsageInstance = () => usage;
      self.getValidationInstance = () => validation;
      self.getCommandInstance = () => command;
      self.terminalWidth = () => {
        argsert_1.argsert([], 0);
        return typeof process.stdout.columns !== "undefined" ? process.stdout.columns : null;
      };
      Object.defineProperty(self, "argv", {
        get: () => self._parseArgs(processArgs),
        enumerable: true
      });
      self._parseArgs = function parseArgs(args, shortCircuit, _calledFromCommand, commandIndex) {
        let skipValidation = !!_calledFromCommand;
        args = args || processArgs;
        options.__ = y18n.__;
        options.configuration = self.getParserConfiguration();
        const populateDoubleDash = !!options.configuration["populate--"];
        const config = Object.assign({}, options.configuration, {
          "populate--": true
        });
        const parsed = Parser.detailed(args, Object.assign({}, options, {
          configuration: config
        }));
        let argv = parsed.argv;
        if (parseContext)
          argv = Object.assign({}, argv, parseContext);
        const aliases = parsed.aliases;
        argv.$0 = self.$0;
        self.parsed = parsed;
        try {
          guessLocale();
          if (shortCircuit) {
            return populateDoubleDash || _calledFromCommand ? argv : self._copyDoubleDash(argv);
          }
          if (helpOpt) {
            const helpCmds = [helpOpt].concat(aliases[helpOpt] || []).filter((k) => k.length > 1);
            if (~helpCmds.indexOf(argv._[argv._.length - 1])) {
              argv._.pop();
              argv[helpOpt] = true;
            }
          }
          const handlerKeys = command.getCommands();
          const requestCompletions = completion.completionKey in argv;
          const skipRecommendation = argv[helpOpt] || requestCompletions;
          const skipDefaultCommand = skipRecommendation && (handlerKeys.length > 1 || handlerKeys[0] !== "$0");
          if (argv._.length) {
            if (handlerKeys.length) {
              let firstUnknownCommand;
              for (let i = commandIndex || 0, cmd; argv._[i] !== void 0; i++) {
                cmd = String(argv._[i]);
                if (~handlerKeys.indexOf(cmd) && cmd !== completionCommand) {
                  const innerArgv = command.runCommand(cmd, self, parsed, i + 1);
                  return populateDoubleDash ? innerArgv : self._copyDoubleDash(innerArgv);
                } else if (!firstUnknownCommand && cmd !== completionCommand) {
                  firstUnknownCommand = cmd;
                  break;
                }
              }
              if (command.hasDefaultCommand() && !skipDefaultCommand) {
                const innerArgv = command.runCommand(null, self, parsed);
                return populateDoubleDash ? innerArgv : self._copyDoubleDash(innerArgv);
              }
              if (recommendCommands && firstUnknownCommand && !skipRecommendation) {
                validation.recommendCommands(firstUnknownCommand, handlerKeys);
              }
            }
            if (completionCommand && ~argv._.indexOf(completionCommand) && !requestCompletions) {
              if (exitProcess)
                setBlocking(true);
              self.showCompletionScript();
              self.exit(0);
            }
          } else if (command.hasDefaultCommand() && !skipDefaultCommand) {
            const innerArgv = command.runCommand(null, self, parsed);
            return populateDoubleDash ? innerArgv : self._copyDoubleDash(innerArgv);
          }
          if (requestCompletions) {
            if (exitProcess)
              setBlocking(true);
            args = [].concat(args);
            const completionArgs = args.slice(args.indexOf(`--${completion.completionKey}`) + 1);
            completion.getCompletion(completionArgs, (completions) => {
              ;
              (completions || []).forEach((completion2) => {
                _logger.log(completion2);
              });
              self.exit(0);
            });
            return populateDoubleDash || _calledFromCommand ? argv : self._copyDoubleDash(argv);
          }
          if (!hasOutput) {
            Object.keys(argv).forEach((key) => {
              if (key === helpOpt && argv[key]) {
                if (exitProcess)
                  setBlocking(true);
                skipValidation = true;
                self.showHelp("log");
                self.exit(0);
              } else if (key === versionOpt && argv[key]) {
                if (exitProcess)
                  setBlocking(true);
                skipValidation = true;
                usage.showVersion();
                self.exit(0);
              }
            });
          }
          if (!skipValidation && options.skipValidation.length > 0) {
            skipValidation = Object.keys(argv).some((key) => options.skipValidation.indexOf(key) >= 0 && argv[key] === true);
          }
          if (!skipValidation) {
            if (parsed.error)
              throw new yerror_1.YError(parsed.error.message);
            if (!requestCompletions) {
              self._runValidation(argv, aliases, {}, parsed.error);
            }
          }
        } catch (err) {
          if (err instanceof yerror_1.YError)
            usage.fail(err.message, err);
          else
            throw err;
        }
        return populateDoubleDash || _calledFromCommand ? argv : self._copyDoubleDash(argv);
      };
      self._copyDoubleDash = function(argv) {
        if (is_promise_1.isPromise(argv) || !argv._ || !argv["--"])
          return argv;
        argv._.push.apply(argv._, argv["--"]);
        try {
          delete argv["--"];
        } catch (_err) {
        }
        return argv;
      };
      self._runValidation = function runValidation(argv, aliases, positionalMap, parseErrors, isDefaultCommand = false) {
        if (parseErrors)
          throw new yerror_1.YError(parseErrors.message);
        validation.nonOptionCount(argv);
        validation.requiredArguments(argv);
        let failedStrictCommands = false;
        if (strictCommands) {
          failedStrictCommands = validation.unknownCommands(argv);
        }
        if (strict && !failedStrictCommands) {
          validation.unknownArguments(argv, aliases, positionalMap, isDefaultCommand);
        }
        validation.customChecks(argv, aliases);
        validation.limitedChoices(argv);
        validation.implications(argv);
        validation.conflicting(argv);
      };
      function guessLocale() {
        if (!detectLocale)
          return;
        const locale = process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LANG || process.env.LANGUAGE || "en_US";
        self.locale(locale.replace(/[.:].*/, ""));
      }
      self.help();
      self.version();
      return self;
    }
    exports2.Yargs = Yargs;
    function rebase(base, dir) {
      return path.relative(base, dir);
    }
    exports2.rebase = rebase;
    function isYargsInstance(y) {
      return !!y && typeof y._parseArgs === "function";
    }
    exports2.isYargsInstance = isYargsInstance;
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/yargs.js
var require_yargs2 = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/yargs.js"(exports2, module2) {
    "use strict";
    async function requiresNode8OrGreater() {
    }
    requiresNode8OrGreater();
    var { Yargs, rebase } = require_yargs();
    var Parser = require_yargs_parser();
    exports2 = module2.exports = Yargs;
    exports2.rebase = rebase;
    exports2.Parser = Parser;
  }
});

// ../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/index.js
var require_yargs3 = __commonJS({
  "../../node_modules/.pnpm/yargs@15.4.1/node_modules/yargs/index.js"(exports2, module2) {
    "use strict";
    var yargs = require_yargs2();
    var processArgv = require_process_argv();
    Argv(processArgv.getProcessArgvWithoutBin());
    module2.exports = Argv;
    function Argv(processArgs, cwd) {
      const argv = yargs(processArgs, cwd, require);
      singletonify(argv);
      return argv;
    }
    function singletonify(inst) {
      Object.keys(inst).forEach((key) => {
        if (key === "argv") {
          Argv.__defineGetter__(key, inst.__lookupGetter__(key));
        } else if (typeof inst[key] === "function") {
          Argv[key] = inst[key].bind(inst);
        } else {
          Argv.__defineGetter__("$0", () => {
            return inst.$0;
          });
          Argv.__defineGetter__("parsed", () => {
            return inst.parsed;
          });
        }
      });
    }
  }
});

// ../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/y.js
var require_y = __commonJS({
  "../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/y.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var yargs = require_yargs3();
    var y18n = require_y18n()({
      directory: path.join(__dirname, "locales"),
      locale: yargs.locale(),
      updateFiles: process.env.NPX_UPDATE_LOCALE_FILES === "true"
    });
    module2.exports = yTag;
    function yTag(parts) {
      let str = "";
      parts.forEach((part, i) => {
        str += part;
        if (arguments.length > i + 1) {
          str += "%s";
        }
      });
      return y18n.__.apply(null, [str].concat([].slice.call(arguments, 1)));
    }
  }
});

// ../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/child.js
var require_child = __commonJS({
  "../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/child.js"(exports2, module2) {
    "use strict";
    var cp = require("child_process");
    var path = require("path");
    module2.exports.runCommand = runCommand;
    function runCommand(command, opts) {
      const cmd = opts.call || command || opts.command;
      const copts = (opts.call ? [] : opts.cmdOpts) || [];
      return spawn(cmd, copts, {
        shell: opts.shell || !!opts.call,
        stdio: opts.stdio || "inherit"
      }).catch((err) => {
        if (err.code === "ENOENT") {
          err = new Error(`npx: ${require_y()`command not found: ${path.basename(cmd)}`}`);
          err.exitCode = 127;
        } else {
          err.message = require_y()`Command failed: ${cmd} ${err.message}`;
        }
        throw err;
      });
    }
    module2.exports.spawn = spawn;
    function spawn(cmd, args, opts) {
      opts = opts || {};
      opts.shell = opts.shell || process.platform === "win32";
      return new Promise((resolve, reject) => {
        const child = cp.spawn(cmd, args, opts);
        let stdout = "";
        let stderr = "";
        child.stdout && child.stdout.on("data", (d) => {
          stdout += d;
        });
        child.stderr && child.stderr.on("data", (d) => {
          stderr += d;
        });
        child.on("error", reject);
        child.on("close", (code) => {
          if (code) {
            const err = new Error(require_y()`Command failed: ${cmd} ${args.join(" ")}`);
            err.isOperational = true;
            err.stderr = stderr;
            err.exitCode = code;
            reject(err);
          } else {
            resolve({ code, stdout, stderr });
          }
        });
      });
    }
    module2.exports.exec = exec;
    function exec(cmd, args, opts) {
      opts = opts || {};
      return new Promise((resolve, reject) => {
        cp.exec(`${escapeArg(cmd, true)} ${args.join(" ")}`, opts, (err, stdout) => {
          if (err) {
            if (typeof err.code === "number") {
              err.exitCode = err.code;
            }
            reject(err);
          } else {
            resolve(stdout);
          }
        });
      });
    }
    module2.exports.escapeArg = escapeArg;
    function escapeArg(str, asPath) {
      return process.platform === "win32" && asPath ? path.normalize(str).split(/\\/).map((s) => s.match(/\s+/) ? `"${s}"` : s).join("\\") : process.platform === "win32" ? `"${str}"` : str.match(/[^-_.~/\w]/) ? `'${str.replace(/'/g, `'"'"'`)}'` : str;
    }
  }
});

// ../../node_modules/.pnpm/ansi-colors@4.1.1/node_modules/ansi-colors/symbols.js
var require_symbols = __commonJS({
  "../../node_modules/.pnpm/ansi-colors@4.1.1/node_modules/ansi-colors/symbols.js"(exports2, module2) {
    "use strict";
    var isHyper = process.env.TERM_PROGRAM === "Hyper";
    var isWindows = process.platform === "win32";
    var isLinux = process.platform === "linux";
    var common = {
      ballotDisabled: "\u2612",
      ballotOff: "\u2610",
      ballotOn: "\u2611",
      bullet: "\u2022",
      bulletWhite: "\u25E6",
      fullBlock: "\u2588",
      heart: "\u2764",
      identicalTo: "\u2261",
      line: "\u2500",
      mark: "\u203B",
      middot: "\xB7",
      minus: "\uFF0D",
      multiplication: "\xD7",
      obelus: "\xF7",
      pencilDownRight: "\u270E",
      pencilRight: "\u270F",
      pencilUpRight: "\u2710",
      percent: "%",
      pilcrow2: "\u2761",
      pilcrow: "\xB6",
      plusMinus: "\xB1",
      section: "\xA7",
      starsOff: "\u2606",
      starsOn: "\u2605",
      upDownArrow: "\u2195"
    };
    var windows = Object.assign({}, common, {
      check: "\u221A",
      cross: "\xD7",
      ellipsisLarge: "...",
      ellipsis: "...",
      info: "i",
      question: "?",
      questionSmall: "?",
      pointer: ">",
      pointerSmall: "\xBB",
      radioOff: "( )",
      radioOn: "(*)",
      warning: "\u203C"
    });
    var other = Object.assign({}, common, {
      ballotCross: "\u2718",
      check: "\u2714",
      cross: "\u2716",
      ellipsisLarge: "\u22EF",
      ellipsis: "\u2026",
      info: "\u2139",
      question: "?",
      questionFull: "\uFF1F",
      questionSmall: "\uFE56",
      pointer: isLinux ? "\u25B8" : "\u276F",
      pointerSmall: isLinux ? "\u2023" : "\u203A",
      radioOff: "\u25EF",
      radioOn: "\u25C9",
      warning: "\u26A0"
    });
    module2.exports = isWindows && !isHyper ? windows : other;
    Reflect.defineProperty(module2.exports, "common", { enumerable: false, value: common });
    Reflect.defineProperty(module2.exports, "windows", { enumerable: false, value: windows });
    Reflect.defineProperty(module2.exports, "other", { enumerable: false, value: other });
  }
});

// ../../node_modules/.pnpm/ansi-colors@4.1.1/node_modules/ansi-colors/index.js
var require_ansi_colors = __commonJS({
  "../../node_modules/.pnpm/ansi-colors@4.1.1/node_modules/ansi-colors/index.js"(exports2, module2) {
    "use strict";
    var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    var ANSI_REGEX = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;
    var create = () => {
      const colors = { enabled: true, visible: true, styles: {}, keys: {} };
      if ("FORCE_COLOR" in process.env) {
        colors.enabled = process.env.FORCE_COLOR !== "0";
      }
      const ansi = (style2) => {
        let open = style2.open = `[${style2.codes[0]}m`;
        let close = style2.close = `[${style2.codes[1]}m`;
        let regex = style2.regex = new RegExp(`\\u001b\\[${style2.codes[1]}m`, "g");
        style2.wrap = (input, newline) => {
          if (input.includes(close))
            input = input.replace(regex, close + open);
          let output = open + input + close;
          return newline ? output.replace(/\r*\n/g, `${close}$&${open}`) : output;
        };
        return style2;
      };
      const wrap = (style2, input, newline) => {
        return typeof style2 === "function" ? style2(input) : style2.wrap(input, newline);
      };
      const style = (input, stack) => {
        if (input === "" || input == null)
          return "";
        if (colors.enabled === false)
          return input;
        if (colors.visible === false)
          return "";
        let str = "" + input;
        let nl = str.includes("\n");
        let n = stack.length;
        if (n > 0 && stack.includes("unstyle")) {
          stack = [...new Set(["unstyle", ...stack])].reverse();
        }
        while (n-- > 0)
          str = wrap(colors.styles[stack[n]], str, nl);
        return str;
      };
      const define = (name, codes, type) => {
        colors.styles[name] = ansi({ name, codes });
        let keys = colors.keys[type] || (colors.keys[type] = []);
        keys.push(name);
        Reflect.defineProperty(colors, name, {
          configurable: true,
          enumerable: true,
          set(value) {
            colors.alias(name, value);
          },
          get() {
            let color = (input) => style(input, color.stack);
            Reflect.setPrototypeOf(color, colors);
            color.stack = this.stack ? this.stack.concat(name) : [name];
            return color;
          }
        });
      };
      define("reset", [0, 0], "modifier");
      define("bold", [1, 22], "modifier");
      define("dim", [2, 22], "modifier");
      define("italic", [3, 23], "modifier");
      define("underline", [4, 24], "modifier");
      define("inverse", [7, 27], "modifier");
      define("hidden", [8, 28], "modifier");
      define("strikethrough", [9, 29], "modifier");
      define("black", [30, 39], "color");
      define("red", [31, 39], "color");
      define("green", [32, 39], "color");
      define("yellow", [33, 39], "color");
      define("blue", [34, 39], "color");
      define("magenta", [35, 39], "color");
      define("cyan", [36, 39], "color");
      define("white", [37, 39], "color");
      define("gray", [90, 39], "color");
      define("grey", [90, 39], "color");
      define("bgBlack", [40, 49], "bg");
      define("bgRed", [41, 49], "bg");
      define("bgGreen", [42, 49], "bg");
      define("bgYellow", [43, 49], "bg");
      define("bgBlue", [44, 49], "bg");
      define("bgMagenta", [45, 49], "bg");
      define("bgCyan", [46, 49], "bg");
      define("bgWhite", [47, 49], "bg");
      define("blackBright", [90, 39], "bright");
      define("redBright", [91, 39], "bright");
      define("greenBright", [92, 39], "bright");
      define("yellowBright", [93, 39], "bright");
      define("blueBright", [94, 39], "bright");
      define("magentaBright", [95, 39], "bright");
      define("cyanBright", [96, 39], "bright");
      define("whiteBright", [97, 39], "bright");
      define("bgBlackBright", [100, 49], "bgBright");
      define("bgRedBright", [101, 49], "bgBright");
      define("bgGreenBright", [102, 49], "bgBright");
      define("bgYellowBright", [103, 49], "bgBright");
      define("bgBlueBright", [104, 49], "bgBright");
      define("bgMagentaBright", [105, 49], "bgBright");
      define("bgCyanBright", [106, 49], "bgBright");
      define("bgWhiteBright", [107, 49], "bgBright");
      colors.ansiRegex = ANSI_REGEX;
      colors.hasColor = colors.hasAnsi = (str) => {
        colors.ansiRegex.lastIndex = 0;
        return typeof str === "string" && str !== "" && colors.ansiRegex.test(str);
      };
      colors.alias = (name, color) => {
        let fn = typeof color === "string" ? colors[color] : color;
        if (typeof fn !== "function") {
          throw new TypeError("Expected alias to be the name of an existing color (string) or a function");
        }
        if (!fn.stack) {
          Reflect.defineProperty(fn, "name", { value: name });
          colors.styles[name] = fn;
          fn.stack = [name];
        }
        Reflect.defineProperty(colors, name, {
          configurable: true,
          enumerable: true,
          set(value) {
            colors.alias(name, value);
          },
          get() {
            let color2 = (input) => style(input, color2.stack);
            Reflect.setPrototypeOf(color2, colors);
            color2.stack = this.stack ? this.stack.concat(fn.stack) : fn.stack;
            return color2;
          }
        });
      };
      colors.theme = (custom) => {
        if (!isObject(custom))
          throw new TypeError("Expected theme to be an object");
        for (let name of Object.keys(custom)) {
          colors.alias(name, custom[name]);
        }
        return colors;
      };
      colors.alias("unstyle", (str) => {
        if (typeof str === "string" && str !== "") {
          colors.ansiRegex.lastIndex = 0;
          return str.replace(colors.ansiRegex, "");
        }
        return "";
      });
      colors.alias("noop", (str) => str);
      colors.none = colors.clear = colors.noop;
      colors.stripColor = colors.unstyle;
      colors.symbols = require_symbols();
      colors.define = define;
      return colors;
    };
    module2.exports = create();
    module2.exports.create = create;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/utils.js"(exports2) {
    "use strict";
    var toString = Object.prototype.toString;
    var colors = require_ansi_colors();
    var called = false;
    var fns = [];
    var complements = {
      "yellow": "blue",
      "cyan": "red",
      "green": "magenta",
      "black": "white",
      "blue": "yellow",
      "red": "cyan",
      "magenta": "green",
      "white": "black"
    };
    exports2.longest = (arr, prop) => {
      return arr.reduce((a, v) => Math.max(a, prop ? v[prop].length : v.length), 0);
    };
    exports2.hasColor = (str) => !!str && colors.hasColor(str);
    var isObject = exports2.isObject = (val) => {
      return val !== null && typeof val === "object" && !Array.isArray(val);
    };
    exports2.nativeType = (val) => {
      return toString.call(val).slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
    exports2.isAsyncFn = (val) => {
      return exports2.nativeType(val) === "asyncfunction";
    };
    exports2.isPrimitive = (val) => {
      return val != null && typeof val !== "object" && typeof val !== "function";
    };
    exports2.resolve = (context, value, ...rest) => {
      if (typeof value === "function") {
        return value.call(context, ...rest);
      }
      return value;
    };
    exports2.scrollDown = (choices = []) => [...choices.slice(1), choices[0]];
    exports2.scrollUp = (choices = []) => [choices.pop(), ...choices];
    exports2.reorder = (arr = []) => {
      let res = arr.slice();
      res.sort((a, b) => {
        if (a.index > b.index)
          return 1;
        if (a.index < b.index)
          return -1;
        return 0;
      });
      return res;
    };
    exports2.swap = (arr, index, pos) => {
      let len = arr.length;
      let idx = pos === len ? 0 : pos < 0 ? len - 1 : pos;
      let choice = arr[index];
      arr[index] = arr[idx];
      arr[idx] = choice;
    };
    exports2.width = (stream, fallback = 80) => {
      let columns = stream && stream.columns ? stream.columns : fallback;
      if (stream && typeof stream.getWindowSize === "function") {
        columns = stream.getWindowSize()[0];
      }
      if (process.platform === "win32") {
        return columns - 1;
      }
      return columns;
    };
    exports2.height = (stream, fallback = 20) => {
      let rows = stream && stream.rows ? stream.rows : fallback;
      if (stream && typeof stream.getWindowSize === "function") {
        rows = stream.getWindowSize()[1];
      }
      return rows;
    };
    exports2.wordWrap = (str, options = {}) => {
      if (!str)
        return str;
      if (typeof options === "number") {
        options = { width: options };
      }
      let { indent = "", newline = "\n" + indent, width = 80 } = options;
      let spaces = (newline + indent).match(/[^\S\n]/g) || [];
      width -= spaces.length;
      let source = `.{1,${width}}([\\s\\u200B]+|$)|[^\\s\\u200B]+?([\\s\\u200B]+|$)`;
      let output = str.trim();
      let regex = new RegExp(source, "g");
      let lines = output.match(regex) || [];
      lines = lines.map((line) => line.replace(/\n$/, ""));
      if (options.padEnd)
        lines = lines.map((line) => line.padEnd(width, " "));
      if (options.padStart)
        lines = lines.map((line) => line.padStart(width, " "));
      return indent + lines.join(newline);
    };
    exports2.unmute = (color) => {
      let name = color.stack.find((n) => colors.keys.color.includes(n));
      if (name) {
        return colors[name];
      }
      let bg = color.stack.find((n) => n.slice(2) === "bg");
      if (bg) {
        return colors[name.slice(2)];
      }
      return (str) => str;
    };
    exports2.pascal = (str) => str ? str[0].toUpperCase() + str.slice(1) : "";
    exports2.inverse = (color) => {
      if (!color || !color.stack)
        return color;
      let name = color.stack.find((n) => colors.keys.color.includes(n));
      if (name) {
        let col = colors["bg" + exports2.pascal(name)];
        return col ? col.black : color;
      }
      let bg = color.stack.find((n) => n.slice(0, 2) === "bg");
      if (bg) {
        return colors[bg.slice(2).toLowerCase()] || color;
      }
      return colors.none;
    };
    exports2.complement = (color) => {
      if (!color || !color.stack)
        return color;
      let name = color.stack.find((n) => colors.keys.color.includes(n));
      let bg = color.stack.find((n) => n.slice(0, 2) === "bg");
      if (name && !bg) {
        return colors[complements[name] || name];
      }
      if (bg) {
        let lower = bg.slice(2).toLowerCase();
        let comp = complements[lower];
        if (!comp)
          return color;
        return colors["bg" + exports2.pascal(comp)] || color;
      }
      return colors.none;
    };
    exports2.meridiem = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      let hrs = hours === 0 ? 12 : hours;
      let min = minutes < 10 ? "0" + minutes : minutes;
      return hrs + ":" + min + " " + ampm;
    };
    exports2.set = (obj = {}, prop = "", val) => {
      return prop.split(".").reduce((acc, k, i, arr) => {
        let value = arr.length - 1 > i ? acc[k] || {} : val;
        if (!exports2.isObject(value) && i < arr.length - 1)
          value = {};
        return acc[k] = value;
      }, obj);
    };
    exports2.get = (obj = {}, prop = "", fallback) => {
      let value = obj[prop] == null ? prop.split(".").reduce((acc, k) => acc && acc[k], obj) : obj[prop];
      return value == null ? fallback : value;
    };
    exports2.mixin = (target, b) => {
      if (!isObject(target))
        return b;
      if (!isObject(b))
        return target;
      for (let key of Object.keys(b)) {
        let desc = Object.getOwnPropertyDescriptor(b, key);
        if (desc.hasOwnProperty("value")) {
          if (target.hasOwnProperty(key) && isObject(desc.value)) {
            let existing = Object.getOwnPropertyDescriptor(target, key);
            if (isObject(existing.value)) {
              target[key] = exports2.merge({}, target[key], b[key]);
            } else {
              Reflect.defineProperty(target, key, desc);
            }
          } else {
            Reflect.defineProperty(target, key, desc);
          }
        } else {
          Reflect.defineProperty(target, key, desc);
        }
      }
      return target;
    };
    exports2.merge = (...args) => {
      let target = {};
      for (let ele of args)
        exports2.mixin(target, ele);
      return target;
    };
    exports2.mixinEmitter = (obj, emitter) => {
      let proto = emitter.constructor.prototype;
      for (let key of Object.keys(proto)) {
        let val = proto[key];
        if (typeof val === "function") {
          exports2.define(obj, key, val.bind(emitter));
        } else {
          exports2.define(obj, key, val);
        }
      }
    };
    exports2.onExit = (callback) => {
      const onExit = (quit, code) => {
        if (called)
          return;
        called = true;
        fns.forEach((fn) => fn());
        if (quit === true) {
          process.exit(128 + code);
        }
      };
      if (fns.length === 0) {
        process.once("SIGTERM", onExit.bind(null, true, 15));
        process.once("SIGINT", onExit.bind(null, true, 2));
        process.once("exit", onExit);
      }
      fns.push(callback);
    };
    exports2.define = (obj, key, value) => {
      Reflect.defineProperty(obj, key, { value });
    };
    exports2.defineExport = (obj, key, fn) => {
      let custom;
      Reflect.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        set(val) {
          custom = val;
        },
        get() {
          return custom ? custom() : fn();
        }
      });
    };
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/combos.js
var require_combos = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/combos.js"(exports2) {
    "use strict";
    exports2.ctrl = {
      a: "first",
      b: "backward",
      c: "cancel",
      d: "deleteForward",
      e: "last",
      f: "forward",
      g: "reset",
      i: "tab",
      k: "cutForward",
      l: "reset",
      n: "newItem",
      m: "cancel",
      j: "submit",
      p: "search",
      r: "remove",
      s: "save",
      u: "undo",
      w: "cutLeft",
      x: "toggleCursor",
      v: "paste"
    };
    exports2.shift = {
      up: "shiftUp",
      down: "shiftDown",
      left: "shiftLeft",
      right: "shiftRight",
      tab: "prev"
    };
    exports2.fn = {
      up: "pageUp",
      down: "pageDown",
      left: "pageLeft",
      right: "pageRight",
      delete: "deleteForward"
    };
    exports2.option = {
      b: "backward",
      f: "forward",
      d: "cutRight",
      left: "cutLeft",
      up: "altUp",
      down: "altDown"
    };
    exports2.keys = {
      pageup: "pageUp",
      pagedown: "pageDown",
      home: "home",
      end: "end",
      cancel: "cancel",
      delete: "deleteForward",
      backspace: "delete",
      down: "down",
      enter: "submit",
      escape: "cancel",
      left: "left",
      space: "space",
      number: "number",
      return: "submit",
      right: "right",
      tab: "next",
      up: "up"
    };
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/keypress.js
var require_keypress = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/keypress.js"(exports2, module2) {
    "use strict";
    var readline = require("readline");
    var combos = require_combos();
    var metaKeyCodeRe = /^(?:\x1b)([a-zA-Z0-9])$/;
    var fnKeyRe = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/;
    var keyName = {
      "OP": "f1",
      "OQ": "f2",
      "OR": "f3",
      "OS": "f4",
      "[11~": "f1",
      "[12~": "f2",
      "[13~": "f3",
      "[14~": "f4",
      "[[A": "f1",
      "[[B": "f2",
      "[[C": "f3",
      "[[D": "f4",
      "[[E": "f5",
      "[15~": "f5",
      "[17~": "f6",
      "[18~": "f7",
      "[19~": "f8",
      "[20~": "f9",
      "[21~": "f10",
      "[23~": "f11",
      "[24~": "f12",
      "[A": "up",
      "[B": "down",
      "[C": "right",
      "[D": "left",
      "[E": "clear",
      "[F": "end",
      "[H": "home",
      "OA": "up",
      "OB": "down",
      "OC": "right",
      "OD": "left",
      "OE": "clear",
      "OF": "end",
      "OH": "home",
      "[1~": "home",
      "[2~": "insert",
      "[3~": "delete",
      "[4~": "end",
      "[5~": "pageup",
      "[6~": "pagedown",
      "[[5~": "pageup",
      "[[6~": "pagedown",
      "[7~": "home",
      "[8~": "end",
      "[a": "up",
      "[b": "down",
      "[c": "right",
      "[d": "left",
      "[e": "clear",
      "[2$": "insert",
      "[3$": "delete",
      "[5$": "pageup",
      "[6$": "pagedown",
      "[7$": "home",
      "[8$": "end",
      "Oa": "up",
      "Ob": "down",
      "Oc": "right",
      "Od": "left",
      "Oe": "clear",
      "[2^": "insert",
      "[3^": "delete",
      "[5^": "pageup",
      "[6^": "pagedown",
      "[7^": "home",
      "[8^": "end",
      "[Z": "tab"
    };
    function isShiftKey(code) {
      return ["[a", "[b", "[c", "[d", "[e", "[2$", "[3$", "[5$", "[6$", "[7$", "[8$", "[Z"].includes(code);
    }
    function isCtrlKey(code) {
      return ["Oa", "Ob", "Oc", "Od", "Oe", "[2^", "[3^", "[5^", "[6^", "[7^", "[8^"].includes(code);
    }
    var keypress = (s = "", event = {}) => {
      let parts;
      let key = {
        name: event.name,
        ctrl: false,
        meta: false,
        shift: false,
        option: false,
        sequence: s,
        raw: s,
        ...event
      };
      if (Buffer.isBuffer(s)) {
        if (s[0] > 127 && s[1] === void 0) {
          s[0] -= 128;
          s = "" + String(s);
        } else {
          s = String(s);
        }
      } else if (s !== void 0 && typeof s !== "string") {
        s = String(s);
      } else if (!s) {
        s = key.sequence || "";
      }
      key.sequence = key.sequence || s || key.name;
      if (s === "\r") {
        key.raw = void 0;
        key.name = "return";
      } else if (s === "\n") {
        key.name = "enter";
      } else if (s === "	") {
        key.name = "tab";
      } else if (s === "\b" || s === "\x7F" || s === "\x7F" || s === "\b") {
        key.name = "backspace";
        key.meta = s.charAt(0) === "";
      } else if (s === "" || s === "") {
        key.name = "escape";
        key.meta = s.length === 2;
      } else if (s === " " || s === " ") {
        key.name = "space";
        key.meta = s.length === 2;
      } else if (s <= "") {
        key.name = String.fromCharCode(s.charCodeAt(0) + "a".charCodeAt(0) - 1);
        key.ctrl = true;
      } else if (s.length === 1 && s >= "0" && s <= "9") {
        key.name = "number";
      } else if (s.length === 1 && s >= "a" && s <= "z") {
        key.name = s;
      } else if (s.length === 1 && s >= "A" && s <= "Z") {
        key.name = s.toLowerCase();
        key.shift = true;
      } else if (parts = metaKeyCodeRe.exec(s)) {
        key.meta = true;
        key.shift = /^[A-Z]$/.test(parts[1]);
      } else if (parts = fnKeyRe.exec(s)) {
        let segs = [...s];
        if (segs[0] === "" && segs[1] === "") {
          key.option = true;
        }
        let code = [parts[1], parts[2], parts[4], parts[6]].filter(Boolean).join("");
        let modifier = (parts[3] || parts[5] || 1) - 1;
        key.ctrl = !!(modifier & 4);
        key.meta = !!(modifier & 10);
        key.shift = !!(modifier & 1);
        key.code = code;
        key.name = keyName[code];
        key.shift = isShiftKey(code) || key.shift;
        key.ctrl = isCtrlKey(code) || key.ctrl;
      }
      return key;
    };
    keypress.listen = (options = {}, onKeypress) => {
      let { stdin } = options;
      if (!stdin || stdin !== process.stdin && !stdin.isTTY) {
        throw new Error("Invalid stream passed");
      }
      let rl = readline.createInterface({ terminal: true, input: stdin });
      readline.emitKeypressEvents(stdin, rl);
      let on = (buf, key) => onKeypress(buf, keypress(buf, key), rl);
      let isRaw = stdin.isRaw;
      if (stdin.isTTY)
        stdin.setRawMode(true);
      stdin.on("keypress", on);
      rl.resume();
      let off = () => {
        if (stdin.isTTY)
          stdin.setRawMode(isRaw);
        stdin.removeListener("keypress", on);
        rl.pause();
        rl.close();
      };
      return off;
    };
    keypress.action = (buf, key, customActions) => {
      let obj = { ...combos, ...customActions };
      if (key.ctrl) {
        key.action = obj.ctrl[key.name];
        return key;
      }
      if (key.option && obj.option) {
        key.action = obj.option[key.name];
        return key;
      }
      if (key.shift) {
        key.action = obj.shift[key.name];
        return key;
      }
      key.action = obj.keys[key.name];
      return key;
    };
    module2.exports = keypress;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/timer.js
var require_timer = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/timer.js"(exports2, module2) {
    "use strict";
    module2.exports = (prompt) => {
      prompt.timers = prompt.timers || {};
      let timers = prompt.options.timers;
      if (!timers)
        return;
      for (let key of Object.keys(timers)) {
        let opts = timers[key];
        if (typeof opts === "number") {
          opts = { interval: opts };
        }
        create(prompt, key, opts);
      }
    };
    function create(prompt, name, options = {}) {
      let timer = prompt.timers[name] = { name, start: Date.now(), ms: 0, tick: 0 };
      let ms = options.interval || 120;
      timer.frames = options.frames || [];
      timer.loading = true;
      let interval = setInterval(() => {
        timer.ms = Date.now() - timer.start;
        timer.tick++;
        prompt.render();
      }, ms);
      timer.stop = () => {
        timer.loading = false;
        clearInterval(interval);
      };
      Reflect.defineProperty(timer, "interval", { value: interval });
      prompt.once("close", () => timer.stop());
      return timer.stop;
    }
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/state.js
var require_state = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/state.js"(exports2, module2) {
    "use strict";
    var { define, width } = require_utils();
    var State = class {
      constructor(prompt) {
        let options = prompt.options;
        define(this, "_prompt", prompt);
        this.type = prompt.type;
        this.name = prompt.name;
        this.message = "";
        this.header = "";
        this.footer = "";
        this.error = "";
        this.hint = "";
        this.input = "";
        this.cursor = 0;
        this.index = 0;
        this.lines = 0;
        this.tick = 0;
        this.prompt = "";
        this.buffer = "";
        this.width = width(options.stdout || process.stdout);
        Object.assign(this, options);
        this.name = this.name || this.message;
        this.message = this.message || this.name;
        this.symbols = prompt.symbols;
        this.styles = prompt.styles;
        this.required = new Set();
        this.cancelled = false;
        this.submitted = false;
      }
      clone() {
        let state = { ...this };
        state.status = this.status;
        state.buffer = Buffer.from(state.buffer);
        delete state.clone;
        return state;
      }
      set color(val) {
        this._color = val;
      }
      get color() {
        let styles = this.prompt.styles;
        if (this.cancelled)
          return styles.cancelled;
        if (this.submitted)
          return styles.submitted;
        let color = this._color || styles[this.status];
        return typeof color === "function" ? color : styles.pending;
      }
      set loading(value) {
        this._loading = value;
      }
      get loading() {
        if (typeof this._loading === "boolean")
          return this._loading;
        if (this.loadingChoices)
          return "choices";
        return false;
      }
      get status() {
        if (this.cancelled)
          return "cancelled";
        if (this.submitted)
          return "submitted";
        return "pending";
      }
    };
    module2.exports = State;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/styles.js
var require_styles = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/styles.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var colors = require_ansi_colors();
    var styles = {
      default: colors.noop,
      noop: colors.noop,
      set inverse(custom) {
        this._inverse = custom;
      },
      get inverse() {
        return this._inverse || utils.inverse(this.primary);
      },
      set complement(custom) {
        this._complement = custom;
      },
      get complement() {
        return this._complement || utils.complement(this.primary);
      },
      primary: colors.cyan,
      success: colors.green,
      danger: colors.magenta,
      strong: colors.bold,
      warning: colors.yellow,
      muted: colors.dim,
      disabled: colors.gray,
      dark: colors.dim.gray,
      underline: colors.underline,
      set info(custom) {
        this._info = custom;
      },
      get info() {
        return this._info || this.primary;
      },
      set em(custom) {
        this._em = custom;
      },
      get em() {
        return this._em || this.primary.underline;
      },
      set heading(custom) {
        this._heading = custom;
      },
      get heading() {
        return this._heading || this.muted.underline;
      },
      set pending(custom) {
        this._pending = custom;
      },
      get pending() {
        return this._pending || this.primary;
      },
      set submitted(custom) {
        this._submitted = custom;
      },
      get submitted() {
        return this._submitted || this.success;
      },
      set cancelled(custom) {
        this._cancelled = custom;
      },
      get cancelled() {
        return this._cancelled || this.danger;
      },
      set typing(custom) {
        this._typing = custom;
      },
      get typing() {
        return this._typing || this.dim;
      },
      set placeholder(custom) {
        this._placeholder = custom;
      },
      get placeholder() {
        return this._placeholder || this.primary.dim;
      },
      set highlight(custom) {
        this._highlight = custom;
      },
      get highlight() {
        return this._highlight || this.inverse;
      }
    };
    styles.merge = (options = {}) => {
      if (options.styles && typeof options.styles.enabled === "boolean") {
        colors.enabled = options.styles.enabled;
      }
      if (options.styles && typeof options.styles.visible === "boolean") {
        colors.visible = options.styles.visible;
      }
      let result = utils.merge({}, styles, options.styles);
      delete result.merge;
      for (let key of Object.keys(colors)) {
        if (!result.hasOwnProperty(key)) {
          Reflect.defineProperty(result, key, { get: () => colors[key] });
        }
      }
      for (let key of Object.keys(colors.styles)) {
        if (!result.hasOwnProperty(key)) {
          Reflect.defineProperty(result, key, { get: () => colors[key] });
        }
      }
      return result;
    };
    module2.exports = styles;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/symbols.js
var require_symbols2 = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/symbols.js"(exports2, module2) {
    "use strict";
    var isWindows = process.platform === "win32";
    var colors = require_ansi_colors();
    var utils = require_utils();
    var symbols = {
      ...colors.symbols,
      upDownDoubleArrow: "\u21D5",
      upDownDoubleArrow2: "\u2B0D",
      upDownArrow: "\u2195",
      asterisk: "*",
      asterism: "\u2042",
      bulletWhite: "\u25E6",
      electricArrow: "\u2301",
      ellipsisLarge: "\u22EF",
      ellipsisSmall: "\u2026",
      fullBlock: "\u2588",
      identicalTo: "\u2261",
      indicator: colors.symbols.check,
      leftAngle: "\u2039",
      mark: "\u203B",
      minus: "\u2212",
      multiplication: "\xD7",
      obelus: "\xF7",
      percent: "%",
      pilcrow: "\xB6",
      pilcrow2: "\u2761",
      pencilUpRight: "\u2710",
      pencilDownRight: "\u270E",
      pencilRight: "\u270F",
      plus: "+",
      plusMinus: "\xB1",
      pointRight: "\u261E",
      rightAngle: "\u203A",
      section: "\xA7",
      hexagon: { off: "\u2B21", on: "\u2B22", disabled: "\u2B22" },
      ballot: { on: "\u2611", off: "\u2610", disabled: "\u2612" },
      stars: { on: "\u2605", off: "\u2606", disabled: "\u2606" },
      folder: { on: "\u25BC", off: "\u25B6", disabled: "\u25B6" },
      prefix: {
        pending: colors.symbols.question,
        submitted: colors.symbols.check,
        cancelled: colors.symbols.cross
      },
      separator: {
        pending: colors.symbols.pointerSmall,
        submitted: colors.symbols.middot,
        cancelled: colors.symbols.middot
      },
      radio: {
        off: isWindows ? "( )" : "\u25EF",
        on: isWindows ? "(*)" : "\u25C9",
        disabled: isWindows ? "(|)" : "\u24BE"
      },
      numbers: ["\u24EA", "\u2460", "\u2461", "\u2462", "\u2463", "\u2464", "\u2465", "\u2466", "\u2467", "\u2468", "\u2469", "\u246A", "\u246B", "\u246C", "\u246D", "\u246E", "\u246F", "\u2470", "\u2471", "\u2472", "\u2473", "\u3251", "\u3252", "\u3253", "\u3254", "\u3255", "\u3256", "\u3257", "\u3258", "\u3259", "\u325A", "\u325B", "\u325C", "\u325D", "\u325E", "\u325F", "\u32B1", "\u32B2", "\u32B3", "\u32B4", "\u32B5", "\u32B6", "\u32B7", "\u32B8", "\u32B9", "\u32BA", "\u32BB", "\u32BC", "\u32BD", "\u32BE", "\u32BF"]
    };
    symbols.merge = (options) => {
      let result = utils.merge({}, colors.symbols, symbols, options.symbols);
      delete result.merge;
      return result;
    };
    module2.exports = symbols;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/theme.js
var require_theme = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/theme.js"(exports2, module2) {
    "use strict";
    var styles = require_styles();
    var symbols = require_symbols2();
    var utils = require_utils();
    module2.exports = (prompt) => {
      prompt.options = utils.merge({}, prompt.options.theme, prompt.options);
      prompt.symbols = symbols.merge(prompt.options);
      prompt.styles = styles.merge(prompt.options);
    };
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/ansi.js
var require_ansi = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/ansi.js"(exports2, module2) {
    "use strict";
    var isTerm = process.env.TERM_PROGRAM === "Apple_Terminal";
    var colors = require_ansi_colors();
    var utils = require_utils();
    var ansi = module2.exports = exports2;
    var ESC = "[";
    var BEL = "\x07";
    var hidden = false;
    var code = ansi.code = {
      bell: BEL,
      beep: BEL,
      beginning: `${ESC}G`,
      down: `${ESC}J`,
      esc: ESC,
      getPosition: `${ESC}6n`,
      hide: `${ESC}?25l`,
      line: `${ESC}2K`,
      lineEnd: `${ESC}K`,
      lineStart: `${ESC}1K`,
      restorePosition: ESC + (isTerm ? "8" : "u"),
      savePosition: ESC + (isTerm ? "7" : "s"),
      screen: `${ESC}2J`,
      show: `${ESC}?25h`,
      up: `${ESC}1J`
    };
    var cursor = ansi.cursor = {
      get hidden() {
        return hidden;
      },
      hide() {
        hidden = true;
        return code.hide;
      },
      show() {
        hidden = false;
        return code.show;
      },
      forward: (count = 1) => `${ESC}${count}C`,
      backward: (count = 1) => `${ESC}${count}D`,
      nextLine: (count = 1) => `${ESC}E`.repeat(count),
      prevLine: (count = 1) => `${ESC}F`.repeat(count),
      up: (count = 1) => count ? `${ESC}${count}A` : "",
      down: (count = 1) => count ? `${ESC}${count}B` : "",
      right: (count = 1) => count ? `${ESC}${count}C` : "",
      left: (count = 1) => count ? `${ESC}${count}D` : "",
      to(x, y) {
        return y ? `${ESC}${y + 1};${x + 1}H` : `${ESC}${x + 1}G`;
      },
      move(x = 0, y = 0) {
        let res = "";
        res += x < 0 ? cursor.left(-x) : x > 0 ? cursor.right(x) : "";
        res += y < 0 ? cursor.up(-y) : y > 0 ? cursor.down(y) : "";
        return res;
      },
      restore(state = {}) {
        let { after, cursor: cursor2, initial, input, prompt, size, value } = state;
        initial = utils.isPrimitive(initial) ? String(initial) : "";
        input = utils.isPrimitive(input) ? String(input) : "";
        value = utils.isPrimitive(value) ? String(value) : "";
        if (size) {
          let codes = ansi.cursor.up(size) + ansi.cursor.to(prompt.length);
          let diff = input.length - cursor2;
          if (diff > 0) {
            codes += ansi.cursor.left(diff);
          }
          return codes;
        }
        if (value || after) {
          let pos = !input && !!initial ? -initial.length : -input.length + cursor2;
          if (after)
            pos -= after.length;
          if (input === "" && initial && !prompt.includes(initial)) {
            pos += initial.length;
          }
          return ansi.cursor.move(pos);
        }
      }
    };
    var erase = ansi.erase = {
      screen: code.screen,
      up: code.up,
      down: code.down,
      line: code.line,
      lineEnd: code.lineEnd,
      lineStart: code.lineStart,
      lines(n) {
        let str = "";
        for (let i = 0; i < n; i++) {
          str += ansi.erase.line + (i < n - 1 ? ansi.cursor.up(1) : "");
        }
        if (n)
          str += ansi.code.beginning;
        return str;
      }
    };
    ansi.clear = (input = "", columns = process.stdout.columns) => {
      if (!columns)
        return erase.line + cursor.to(0);
      let width = (str) => [...colors.unstyle(str)].length;
      let lines = input.split(/\r?\n/);
      let rows = 0;
      for (let line of lines) {
        rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / columns);
      }
      return (erase.line + cursor.prevLine()).repeat(rows - 1) + erase.line + cursor.to(0);
    };
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompt.js
var require_prompt = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompt.js"(exports2, module2) {
    "use strict";
    var Events = require("events");
    var colors = require_ansi_colors();
    var keypress = require_keypress();
    var timer = require_timer();
    var State = require_state();
    var theme = require_theme();
    var utils = require_utils();
    var ansi = require_ansi();
    var Prompt = class extends Events {
      constructor(options = {}) {
        super();
        this.name = options.name;
        this.type = options.type;
        this.options = options;
        theme(this);
        timer(this);
        this.state = new State(this);
        this.initial = [options.initial, options.default].find((v) => v != null);
        this.stdout = options.stdout || process.stdout;
        this.stdin = options.stdin || process.stdin;
        this.scale = options.scale || 1;
        this.term = this.options.term || process.env.TERM_PROGRAM;
        this.margin = margin(this.options.margin);
        this.setMaxListeners(0);
        setOptions(this);
      }
      async keypress(input, event = {}) {
        this.keypressed = true;
        let key = keypress.action(input, keypress(input, event), this.options.actions);
        this.state.keypress = key;
        this.emit("keypress", input, key);
        this.emit("state", this.state.clone());
        let fn = this.options[key.action] || this[key.action] || this.dispatch;
        if (typeof fn === "function") {
          return await fn.call(this, input, key);
        }
        this.alert();
      }
      alert() {
        delete this.state.alert;
        if (this.options.show === false) {
          this.emit("alert");
        } else {
          this.stdout.write(ansi.code.beep);
        }
      }
      cursorHide() {
        this.stdout.write(ansi.cursor.hide());
        utils.onExit(() => this.cursorShow());
      }
      cursorShow() {
        this.stdout.write(ansi.cursor.show());
      }
      write(str) {
        if (!str)
          return;
        if (this.stdout && this.state.show !== false) {
          this.stdout.write(str);
        }
        this.state.buffer += str;
      }
      clear(lines = 0) {
        let buffer = this.state.buffer;
        this.state.buffer = "";
        if (!buffer && !lines || this.options.show === false)
          return;
        this.stdout.write(ansi.cursor.down(lines) + ansi.clear(buffer, this.width));
      }
      restore() {
        if (this.state.closed || this.options.show === false)
          return;
        let { prompt, after, rest } = this.sections();
        let { cursor, initial = "", input = "", value = "" } = this;
        let size = this.state.size = rest.length;
        let state = { after, cursor, initial, input, prompt, size, value };
        let codes = ansi.cursor.restore(state);
        if (codes) {
          this.stdout.write(codes);
        }
      }
      sections() {
        let { buffer, input, prompt } = this.state;
        prompt = colors.unstyle(prompt);
        let buf = colors.unstyle(buffer);
        let idx = buf.indexOf(prompt);
        let header = buf.slice(0, idx);
        let rest = buf.slice(idx);
        let lines = rest.split("\n");
        let first = lines[0];
        let last = lines[lines.length - 1];
        let promptLine = prompt + (input ? " " + input : "");
        let len = promptLine.length;
        let after = len < first.length ? first.slice(len + 1) : "";
        return { header, prompt: first, after, rest: lines.slice(1), last };
      }
      async submit() {
        this.state.submitted = true;
        this.state.validating = true;
        if (this.options.onSubmit) {
          await this.options.onSubmit.call(this, this.name, this.value, this);
        }
        let result = this.state.error || await this.validate(this.value, this.state);
        if (result !== true) {
          let error = "\n" + this.symbols.pointer + " ";
          if (typeof result === "string") {
            error += result.trim();
          } else {
            error += "Invalid input";
          }
          this.state.error = "\n" + this.styles.danger(error);
          this.state.submitted = false;
          await this.render();
          await this.alert();
          this.state.validating = false;
          this.state.error = void 0;
          return;
        }
        this.state.validating = false;
        await this.render();
        await this.close();
        this.value = await this.result(this.value);
        this.emit("submit", this.value);
      }
      async cancel(err) {
        this.state.cancelled = this.state.submitted = true;
        await this.render();
        await this.close();
        if (typeof this.options.onCancel === "function") {
          await this.options.onCancel.call(this, this.name, this.value, this);
        }
        this.emit("cancel", await this.error(err));
      }
      async close() {
        this.state.closed = true;
        try {
          let sections = this.sections();
          let lines = Math.ceil(sections.prompt.length / this.width);
          if (sections.rest) {
            this.write(ansi.cursor.down(sections.rest.length));
          }
          this.write("\n".repeat(lines));
        } catch (err) {
        }
        this.emit("close");
      }
      start() {
        if (!this.stop && this.options.show !== false) {
          this.stop = keypress.listen(this, this.keypress.bind(this));
          this.once("close", this.stop);
        }
      }
      async skip() {
        this.skipped = this.options.skip === true;
        if (typeof this.options.skip === "function") {
          this.skipped = await this.options.skip.call(this, this.name, this.value);
        }
        return this.skipped;
      }
      async initialize() {
        let { format, options, result } = this;
        this.format = () => format.call(this, this.value);
        this.result = () => result.call(this, this.value);
        if (typeof options.initial === "function") {
          this.initial = await options.initial.call(this, this);
        }
        if (typeof options.onRun === "function") {
          await options.onRun.call(this, this);
        }
        if (typeof options.onSubmit === "function") {
          let onSubmit = options.onSubmit.bind(this);
          let submit = this.submit.bind(this);
          delete this.options.onSubmit;
          this.submit = async () => {
            await onSubmit(this.name, this.value, this);
            return submit();
          };
        }
        await this.start();
        await this.render();
      }
      render() {
        throw new Error("expected prompt to have a custom render method");
      }
      run() {
        return new Promise(async (resolve, reject) => {
          this.once("submit", resolve);
          this.once("cancel", reject);
          if (await this.skip()) {
            this.render = () => {
            };
            return this.submit();
          }
          await this.initialize();
          this.emit("run");
        });
      }
      async element(name, choice, i) {
        let { options, state, symbols, timers } = this;
        let timer2 = timers && timers[name];
        state.timer = timer2;
        let value = options[name] || state[name] || symbols[name];
        let val = choice && choice[name] != null ? choice[name] : await value;
        if (val === "")
          return val;
        let res = await this.resolve(val, state, choice, i);
        if (!res && choice && choice[name]) {
          return this.resolve(value, state, choice, i);
        }
        return res;
      }
      async prefix() {
        let element = await this.element("prefix") || this.symbols;
        let timer2 = this.timers && this.timers.prefix;
        let state = this.state;
        state.timer = timer2;
        if (utils.isObject(element))
          element = element[state.status] || element.pending;
        if (!utils.hasColor(element)) {
          let style = this.styles[state.status] || this.styles.pending;
          return style(element);
        }
        return element;
      }
      async message() {
        let message = await this.element("message");
        if (!utils.hasColor(message)) {
          return this.styles.strong(message);
        }
        return message;
      }
      async separator() {
        let element = await this.element("separator") || this.symbols;
        let timer2 = this.timers && this.timers.separator;
        let state = this.state;
        state.timer = timer2;
        let value = element[state.status] || element.pending || state.separator;
        let ele = await this.resolve(value, state);
        if (utils.isObject(ele))
          ele = ele[state.status] || ele.pending;
        if (!utils.hasColor(ele)) {
          return this.styles.muted(ele);
        }
        return ele;
      }
      async pointer(choice, i) {
        let val = await this.element("pointer", choice, i);
        if (typeof val === "string" && utils.hasColor(val)) {
          return val;
        }
        if (val) {
          let styles = this.styles;
          let focused = this.index === i;
          let style = focused ? styles.primary : (val2) => val2;
          let ele = await this.resolve(val[focused ? "on" : "off"] || val, this.state);
          let styled = !utils.hasColor(ele) ? style(ele) : ele;
          return focused ? styled : " ".repeat(ele.length);
        }
      }
      async indicator(choice, i) {
        let val = await this.element("indicator", choice, i);
        if (typeof val === "string" && utils.hasColor(val)) {
          return val;
        }
        if (val) {
          let styles = this.styles;
          let enabled = choice.enabled === true;
          let style = enabled ? styles.success : styles.dark;
          let ele = val[enabled ? "on" : "off"] || val;
          return !utils.hasColor(ele) ? style(ele) : ele;
        }
        return "";
      }
      body() {
        return null;
      }
      footer() {
        if (this.state.status === "pending") {
          return this.element("footer");
        }
      }
      header() {
        if (this.state.status === "pending") {
          return this.element("header");
        }
      }
      async hint() {
        if (this.state.status === "pending" && !this.isValue(this.state.input)) {
          let hint = await this.element("hint");
          if (!utils.hasColor(hint)) {
            return this.styles.muted(hint);
          }
          return hint;
        }
      }
      error(err) {
        return !this.state.submitted ? err || this.state.error : "";
      }
      format(value) {
        return value;
      }
      result(value) {
        return value;
      }
      validate(value) {
        if (this.options.required === true) {
          return this.isValue(value);
        }
        return true;
      }
      isValue(value) {
        return value != null && value !== "";
      }
      resolve(value, ...args) {
        return utils.resolve(this, value, ...args);
      }
      get base() {
        return Prompt.prototype;
      }
      get style() {
        return this.styles[this.state.status];
      }
      get height() {
        return this.options.rows || utils.height(this.stdout, 25);
      }
      get width() {
        return this.options.columns || utils.width(this.stdout, 80);
      }
      get size() {
        return { width: this.width, height: this.height };
      }
      set cursor(value) {
        this.state.cursor = value;
      }
      get cursor() {
        return this.state.cursor;
      }
      set input(value) {
        this.state.input = value;
      }
      get input() {
        return this.state.input;
      }
      set value(value) {
        this.state.value = value;
      }
      get value() {
        let { input, value } = this.state;
        let result = [value, input].find(this.isValue.bind(this));
        return this.isValue(result) ? result : this.initial;
      }
      static get prompt() {
        return (options) => new this(options).run();
      }
    };
    function setOptions(prompt) {
      let isValidKey = (key) => {
        return prompt[key] === void 0 || typeof prompt[key] === "function";
      };
      let ignore = [
        "actions",
        "choices",
        "initial",
        "margin",
        "roles",
        "styles",
        "symbols",
        "theme",
        "timers",
        "value"
      ];
      let ignoreFn = [
        "body",
        "footer",
        "error",
        "header",
        "hint",
        "indicator",
        "message",
        "prefix",
        "separator",
        "skip"
      ];
      for (let key of Object.keys(prompt.options)) {
        if (ignore.includes(key))
          continue;
        if (/^on[A-Z]/.test(key))
          continue;
        let option = prompt.options[key];
        if (typeof option === "function" && isValidKey(key)) {
          if (!ignoreFn.includes(key)) {
            prompt[key] = option.bind(prompt);
          }
        } else if (typeof prompt[key] !== "function") {
          prompt[key] = option;
        }
      }
    }
    function margin(value) {
      if (typeof value === "number") {
        value = [value, value, value, value];
      }
      let arr = [].concat(value || []);
      let pad = (i) => i % 2 === 0 ? "\n" : " ";
      let res = [];
      for (let i = 0; i < 4; i++) {
        let char = pad(i);
        if (arr[i]) {
          res.push(char.repeat(arr[i]));
        } else {
          res.push("");
        }
      }
      return res;
    }
    module2.exports = Prompt;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/roles.js
var require_roles = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/roles.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var roles = {
      default(prompt, choice) {
        return choice;
      },
      checkbox(prompt, choice) {
        throw new Error("checkbox role is not implemented yet");
      },
      editable(prompt, choice) {
        throw new Error("editable role is not implemented yet");
      },
      expandable(prompt, choice) {
        throw new Error("expandable role is not implemented yet");
      },
      heading(prompt, choice) {
        choice.disabled = "";
        choice.indicator = [choice.indicator, " "].find((v) => v != null);
        choice.message = choice.message || "";
        return choice;
      },
      input(prompt, choice) {
        throw new Error("input role is not implemented yet");
      },
      option(prompt, choice) {
        return roles.default(prompt, choice);
      },
      radio(prompt, choice) {
        throw new Error("radio role is not implemented yet");
      },
      separator(prompt, choice) {
        choice.disabled = "";
        choice.indicator = [choice.indicator, " "].find((v) => v != null);
        choice.message = choice.message || prompt.symbols.line.repeat(5);
        return choice;
      },
      spacer(prompt, choice) {
        return choice;
      }
    };
    module2.exports = (name, options = {}) => {
      let role = utils.merge({}, roles, options.roles);
      return role[name] || role.default;
    };
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/types/array.js
var require_array = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/types/array.js"(exports2, module2) {
    "use strict";
    var colors = require_ansi_colors();
    var Prompt = require_prompt();
    var roles = require_roles();
    var utils = require_utils();
    var { reorder, scrollUp, scrollDown, isObject, swap } = utils;
    var ArrayPrompt = class extends Prompt {
      constructor(options) {
        super(options);
        this.cursorHide();
        this.maxSelected = options.maxSelected || Infinity;
        this.multiple = options.multiple || false;
        this.initial = options.initial || 0;
        this.delay = options.delay || 0;
        this.longest = 0;
        this.num = "";
      }
      async initialize() {
        if (typeof this.options.initial === "function") {
          this.initial = await this.options.initial.call(this);
        }
        await this.reset(true);
        await super.initialize();
      }
      async reset() {
        let { choices, initial, autofocus, suggest } = this.options;
        this.state._choices = [];
        this.state.choices = [];
        this.choices = await Promise.all(await this.toChoices(choices));
        this.choices.forEach((ch) => ch.enabled = false);
        if (typeof suggest !== "function" && this.selectable.length === 0) {
          throw new Error("At least one choice must be selectable");
        }
        if (isObject(initial))
          initial = Object.keys(initial);
        if (Array.isArray(initial)) {
          if (autofocus != null)
            this.index = this.findIndex(autofocus);
          initial.forEach((v) => this.enable(this.find(v)));
          await this.render();
        } else {
          if (autofocus != null)
            initial = autofocus;
          if (typeof initial === "string")
            initial = this.findIndex(initial);
          if (typeof initial === "number" && initial > -1) {
            this.index = Math.max(0, Math.min(initial, this.choices.length));
            this.enable(this.find(this.index));
          }
        }
        if (this.isDisabled(this.focused)) {
          await this.down();
        }
      }
      async toChoices(value, parent) {
        this.state.loadingChoices = true;
        let choices = [];
        let index = 0;
        let toChoices = async (items, parent2) => {
          if (typeof items === "function")
            items = await items.call(this);
          if (items instanceof Promise)
            items = await items;
          for (let i = 0; i < items.length; i++) {
            let choice = items[i] = await this.toChoice(items[i], index++, parent2);
            choices.push(choice);
            if (choice.choices) {
              await toChoices(choice.choices, choice);
            }
          }
          return choices;
        };
        return toChoices(value, parent).then((choices2) => {
          this.state.loadingChoices = false;
          return choices2;
        });
      }
      async toChoice(ele, i, parent) {
        if (typeof ele === "function")
          ele = await ele.call(this, this);
        if (ele instanceof Promise)
          ele = await ele;
        if (typeof ele === "string")
          ele = { name: ele };
        if (ele.normalized)
          return ele;
        ele.normalized = true;
        let origVal = ele.value;
        let role = roles(ele.role, this.options);
        ele = role(this, ele);
        if (typeof ele.disabled === "string" && !ele.hint) {
          ele.hint = ele.disabled;
          ele.disabled = true;
        }
        if (ele.disabled === true && ele.hint == null) {
          ele.hint = "(disabled)";
        }
        if (ele.index != null)
          return ele;
        ele.name = ele.name || ele.key || ele.title || ele.value || ele.message;
        ele.message = ele.message || ele.name || "";
        ele.value = [ele.value, ele.name].find(this.isValue.bind(this));
        ele.input = "";
        ele.index = i;
        ele.cursor = 0;
        utils.define(ele, "parent", parent);
        ele.level = parent ? parent.level + 1 : 1;
        if (ele.indent == null) {
          ele.indent = parent ? parent.indent + "  " : ele.indent || "";
        }
        ele.path = parent ? parent.path + "." + ele.name : ele.name;
        ele.enabled = !!(this.multiple && !this.isDisabled(ele) && (ele.enabled || this.isSelected(ele)));
        if (!this.isDisabled(ele)) {
          this.longest = Math.max(this.longest, colors.unstyle(ele.message).length);
        }
        let choice = { ...ele };
        ele.reset = (input = choice.input, value = choice.value) => {
          for (let key of Object.keys(choice))
            ele[key] = choice[key];
          ele.input = input;
          ele.value = value;
        };
        if (origVal == null && typeof ele.initial === "function") {
          ele.input = await ele.initial.call(this, this.state, ele, i);
        }
        return ele;
      }
      async onChoice(choice, i) {
        this.emit("choice", choice, i, this);
        if (typeof choice.onChoice === "function") {
          await choice.onChoice.call(this, this.state, choice, i);
        }
      }
      async addChoice(ele, i, parent) {
        let choice = await this.toChoice(ele, i, parent);
        this.choices.push(choice);
        this.index = this.choices.length - 1;
        this.limit = this.choices.length;
        return choice;
      }
      async newItem(item, i, parent) {
        let ele = { name: "New choice name?", editable: true, newChoice: true, ...item };
        let choice = await this.addChoice(ele, i, parent);
        choice.updateChoice = () => {
          delete choice.newChoice;
          choice.name = choice.message = choice.input;
          choice.input = "";
          choice.cursor = 0;
        };
        return this.render();
      }
      indent(choice) {
        if (choice.indent == null) {
          return choice.level > 1 ? "  ".repeat(choice.level - 1) : "";
        }
        return choice.indent;
      }
      dispatch(s, key) {
        if (this.multiple && this[key.name])
          return this[key.name]();
        this.alert();
      }
      focus(choice, enabled) {
        if (typeof enabled !== "boolean")
          enabled = choice.enabled;
        if (enabled && !choice.enabled && this.selected.length >= this.maxSelected) {
          return this.alert();
        }
        this.index = choice.index;
        choice.enabled = enabled && !this.isDisabled(choice);
        return choice;
      }
      space() {
        if (!this.multiple)
          return this.alert();
        this.toggle(this.focused);
        return this.render();
      }
      a() {
        if (this.maxSelected < this.choices.length)
          return this.alert();
        let enabled = this.selectable.every((ch) => ch.enabled);
        this.choices.forEach((ch) => ch.enabled = !enabled);
        return this.render();
      }
      i() {
        if (this.choices.length - this.selected.length > this.maxSelected) {
          return this.alert();
        }
        this.choices.forEach((ch) => ch.enabled = !ch.enabled);
        return this.render();
      }
      g(choice = this.focused) {
        if (!this.choices.some((ch) => !!ch.parent))
          return this.a();
        this.toggle(choice.parent && !choice.choices ? choice.parent : choice);
        return this.render();
      }
      toggle(choice, enabled) {
        if (!choice.enabled && this.selected.length >= this.maxSelected) {
          return this.alert();
        }
        if (typeof enabled !== "boolean")
          enabled = !choice.enabled;
        choice.enabled = enabled;
        if (choice.choices) {
          choice.choices.forEach((ch) => this.toggle(ch, enabled));
        }
        let parent = choice.parent;
        while (parent) {
          let choices = parent.choices.filter((ch) => this.isDisabled(ch));
          parent.enabled = choices.every((ch) => ch.enabled === true);
          parent = parent.parent;
        }
        reset(this, this.choices);
        this.emit("toggle", choice, this);
        return choice;
      }
      enable(choice) {
        if (this.selected.length >= this.maxSelected)
          return this.alert();
        choice.enabled = !this.isDisabled(choice);
        choice.choices && choice.choices.forEach(this.enable.bind(this));
        return choice;
      }
      disable(choice) {
        choice.enabled = false;
        choice.choices && choice.choices.forEach(this.disable.bind(this));
        return choice;
      }
      number(n) {
        this.num += n;
        let number = (num) => {
          let i = Number(num);
          if (i > this.choices.length - 1)
            return this.alert();
          let focused = this.focused;
          let choice = this.choices.find((ch) => i === ch.index);
          if (!choice.enabled && this.selected.length >= this.maxSelected) {
            return this.alert();
          }
          if (this.visible.indexOf(choice) === -1) {
            let choices = reorder(this.choices);
            let actualIdx = choices.indexOf(choice);
            if (focused.index > actualIdx) {
              let start = choices.slice(actualIdx, actualIdx + this.limit);
              let end = choices.filter((ch) => !start.includes(ch));
              this.choices = start.concat(end);
            } else {
              let pos = actualIdx - this.limit + 1;
              this.choices = choices.slice(pos).concat(choices.slice(0, pos));
            }
          }
          this.index = this.choices.indexOf(choice);
          this.toggle(this.focused);
          return this.render();
        };
        clearTimeout(this.numberTimeout);
        return new Promise((resolve) => {
          let len = this.choices.length;
          let num = this.num;
          let handle = (val = false, res) => {
            clearTimeout(this.numberTimeout);
            if (val)
              res = number(num);
            this.num = "";
            resolve(res);
          };
          if (num === "0" || num.length === 1 && Number(num + "0") > len) {
            return handle(true);
          }
          if (Number(num) > len) {
            return handle(false, this.alert());
          }
          this.numberTimeout = setTimeout(() => handle(true), this.delay);
        });
      }
      home() {
        this.choices = reorder(this.choices);
        this.index = 0;
        return this.render();
      }
      end() {
        let pos = this.choices.length - this.limit;
        let choices = reorder(this.choices);
        this.choices = choices.slice(pos).concat(choices.slice(0, pos));
        this.index = this.limit - 1;
        return this.render();
      }
      first() {
        this.index = 0;
        return this.render();
      }
      last() {
        this.index = this.visible.length - 1;
        return this.render();
      }
      prev() {
        if (this.visible.length <= 1)
          return this.alert();
        return this.up();
      }
      next() {
        if (this.visible.length <= 1)
          return this.alert();
        return this.down();
      }
      right() {
        if (this.cursor >= this.input.length)
          return this.alert();
        this.cursor++;
        return this.render();
      }
      left() {
        if (this.cursor <= 0)
          return this.alert();
        this.cursor--;
        return this.render();
      }
      up() {
        let len = this.choices.length;
        let vis = this.visible.length;
        let idx = this.index;
        if (this.options.scroll === false && idx === 0) {
          return this.alert();
        }
        if (len > vis && idx === 0) {
          return this.scrollUp();
        }
        this.index = (idx - 1 % len + len) % len;
        if (this.isDisabled()) {
          return this.up();
        }
        return this.render();
      }
      down() {
        let len = this.choices.length;
        let vis = this.visible.length;
        let idx = this.index;
        if (this.options.scroll === false && idx === vis - 1) {
          return this.alert();
        }
        if (len > vis && idx === vis - 1) {
          return this.scrollDown();
        }
        this.index = (idx + 1) % len;
        if (this.isDisabled()) {
          return this.down();
        }
        return this.render();
      }
      scrollUp(i = 0) {
        this.choices = scrollUp(this.choices);
        this.index = i;
        if (this.isDisabled()) {
          return this.up();
        }
        return this.render();
      }
      scrollDown(i = this.visible.length - 1) {
        this.choices = scrollDown(this.choices);
        this.index = i;
        if (this.isDisabled()) {
          return this.down();
        }
        return this.render();
      }
      async shiftUp() {
        if (this.options.sort === true) {
          this.sorting = true;
          this.swap(this.index - 1);
          await this.up();
          this.sorting = false;
          return;
        }
        return this.scrollUp(this.index);
      }
      async shiftDown() {
        if (this.options.sort === true) {
          this.sorting = true;
          this.swap(this.index + 1);
          await this.down();
          this.sorting = false;
          return;
        }
        return this.scrollDown(this.index);
      }
      pageUp() {
        if (this.visible.length <= 1)
          return this.alert();
        this.limit = Math.max(this.limit - 1, 0);
        this.index = Math.min(this.limit - 1, this.index);
        this._limit = this.limit;
        if (this.isDisabled()) {
          return this.up();
        }
        return this.render();
      }
      pageDown() {
        if (this.visible.length >= this.choices.length)
          return this.alert();
        this.index = Math.max(0, this.index);
        this.limit = Math.min(this.limit + 1, this.choices.length);
        this._limit = this.limit;
        if (this.isDisabled()) {
          return this.down();
        }
        return this.render();
      }
      swap(pos) {
        swap(this.choices, this.index, pos);
      }
      isDisabled(choice = this.focused) {
        let keys = ["disabled", "collapsed", "hidden", "completing", "readonly"];
        if (choice && keys.some((key) => choice[key] === true)) {
          return true;
        }
        return choice && choice.role === "heading";
      }
      isEnabled(choice = this.focused) {
        if (Array.isArray(choice))
          return choice.every((ch) => this.isEnabled(ch));
        if (choice.choices) {
          let choices = choice.choices.filter((ch) => !this.isDisabled(ch));
          return choice.enabled && choices.every((ch) => this.isEnabled(ch));
        }
        return choice.enabled && !this.isDisabled(choice);
      }
      isChoice(choice, value) {
        return choice.name === value || choice.index === Number(value);
      }
      isSelected(choice) {
        if (Array.isArray(this.initial)) {
          return this.initial.some((value) => this.isChoice(choice, value));
        }
        return this.isChoice(choice, this.initial);
      }
      map(names = [], prop = "value") {
        return [].concat(names || []).reduce((acc, name) => {
          acc[name] = this.find(name, prop);
          return acc;
        }, {});
      }
      filter(value, prop) {
        let isChoice = (ele, i) => [ele.name, i].includes(value);
        let fn = typeof value === "function" ? value : isChoice;
        let choices = this.options.multiple ? this.state._choices : this.choices;
        let result = choices.filter(fn);
        if (prop) {
          return result.map((ch) => ch[prop]);
        }
        return result;
      }
      find(value, prop) {
        if (isObject(value))
          return prop ? value[prop] : value;
        let isChoice = (ele, i) => [ele.name, i].includes(value);
        let fn = typeof value === "function" ? value : isChoice;
        let choice = this.choices.find(fn);
        if (choice) {
          return prop ? choice[prop] : choice;
        }
      }
      findIndex(value) {
        return this.choices.indexOf(this.find(value));
      }
      async submit() {
        let choice = this.focused;
        if (!choice)
          return this.alert();
        if (choice.newChoice) {
          if (!choice.input)
            return this.alert();
          choice.updateChoice();
          return this.render();
        }
        if (this.choices.some((ch) => ch.newChoice)) {
          return this.alert();
        }
        let { reorder: reorder2, sort } = this.options;
        let multi = this.multiple === true;
        let value = this.selected;
        if (value === void 0) {
          return this.alert();
        }
        if (Array.isArray(value) && reorder2 !== false && sort !== true) {
          value = utils.reorder(value);
        }
        this.value = multi ? value.map((ch) => ch.name) : value.name;
        return super.submit();
      }
      set choices(choices = []) {
        this.state._choices = this.state._choices || [];
        this.state.choices = choices;
        for (let choice of choices) {
          if (!this.state._choices.some((ch) => ch.name === choice.name)) {
            this.state._choices.push(choice);
          }
        }
        if (!this._initial && this.options.initial) {
          this._initial = true;
          let init = this.initial;
          if (typeof init === "string" || typeof init === "number") {
            let choice = this.find(init);
            if (choice) {
              this.initial = choice.index;
              this.focus(choice, true);
            }
          }
        }
      }
      get choices() {
        return reset(this, this.state.choices || []);
      }
      set visible(visible) {
        this.state.visible = visible;
      }
      get visible() {
        return (this.state.visible || this.choices).slice(0, this.limit);
      }
      set limit(num) {
        this.state.limit = num;
      }
      get limit() {
        let { state, options, choices } = this;
        let limit = state.limit || this._limit || options.limit || choices.length;
        return Math.min(limit, this.height);
      }
      set value(value) {
        super.value = value;
      }
      get value() {
        if (typeof super.value !== "string" && super.value === this.initial) {
          return this.input;
        }
        return super.value;
      }
      set index(i) {
        this.state.index = i;
      }
      get index() {
        return Math.max(0, this.state ? this.state.index : 0);
      }
      get enabled() {
        return this.filter(this.isEnabled.bind(this));
      }
      get focused() {
        let choice = this.choices[this.index];
        if (choice && this.state.submitted && this.multiple !== true) {
          choice.enabled = true;
        }
        return choice;
      }
      get selectable() {
        return this.choices.filter((choice) => !this.isDisabled(choice));
      }
      get selected() {
        return this.multiple ? this.enabled : this.focused;
      }
    };
    function reset(prompt, choices) {
      if (choices instanceof Promise)
        return choices;
      if (typeof choices === "function") {
        if (utils.isAsyncFn(choices))
          return choices;
        choices = choices.call(prompt, prompt);
      }
      for (let choice of choices) {
        if (Array.isArray(choice.choices)) {
          let items = choice.choices.filter((ch) => !prompt.isDisabled(ch));
          choice.enabled = items.every((ch) => ch.enabled === true);
        }
        if (prompt.isDisabled(choice) === true) {
          delete choice.enabled;
        }
      }
      return choices;
    }
    module2.exports = ArrayPrompt;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/select.js
var require_select = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/select.js"(exports2, module2) {
    "use strict";
    var ArrayPrompt = require_array();
    var utils = require_utils();
    var SelectPrompt = class extends ArrayPrompt {
      constructor(options) {
        super(options);
        this.emptyError = this.options.emptyError || "No items were selected";
      }
      async dispatch(s, key) {
        if (this.multiple) {
          return this[key.name] ? await this[key.name](s, key) : await super.dispatch(s, key);
        }
        this.alert();
      }
      separator() {
        if (this.options.separator)
          return super.separator();
        let sep = this.styles.muted(this.symbols.ellipsis);
        return this.state.submitted ? super.separator() : sep;
      }
      pointer(choice, i) {
        return !this.multiple || this.options.pointer ? super.pointer(choice, i) : "";
      }
      indicator(choice, i) {
        return this.multiple ? super.indicator(choice, i) : "";
      }
      choiceMessage(choice, i) {
        let message = this.resolve(choice.message, this.state, choice, i);
        if (choice.role === "heading" && !utils.hasColor(message)) {
          message = this.styles.strong(message);
        }
        return this.resolve(message, this.state, choice, i);
      }
      choiceSeparator() {
        return ":";
      }
      async renderChoice(choice, i) {
        await this.onChoice(choice, i);
        let focused = this.index === i;
        let pointer = await this.pointer(choice, i);
        let check = await this.indicator(choice, i) + (choice.pad || "");
        let hint = await this.resolve(choice.hint, this.state, choice, i);
        if (hint && !utils.hasColor(hint)) {
          hint = this.styles.muted(hint);
        }
        let ind = this.indent(choice);
        let msg = await this.choiceMessage(choice, i);
        let line = () => [this.margin[3], ind + pointer + check, msg, this.margin[1], hint].filter(Boolean).join(" ");
        if (choice.role === "heading") {
          return line();
        }
        if (choice.disabled) {
          if (!utils.hasColor(msg)) {
            msg = this.styles.disabled(msg);
          }
          return line();
        }
        if (focused) {
          msg = this.styles.em(msg);
        }
        return line();
      }
      async renderChoices() {
        if (this.state.loading === "choices") {
          return this.styles.warning("Loading choices");
        }
        if (this.state.submitted)
          return "";
        let choices = this.visible.map(async (ch, i) => await this.renderChoice(ch, i));
        let visible = await Promise.all(choices);
        if (!visible.length)
          visible.push(this.styles.danger("No matching choices"));
        let result = this.margin[0] + visible.join("\n");
        let header;
        if (this.options.choicesHeader) {
          header = await this.resolve(this.options.choicesHeader, this.state);
        }
        return [header, result].filter(Boolean).join("\n");
      }
      format() {
        if (!this.state.submitted || this.state.cancelled)
          return "";
        if (Array.isArray(this.selected)) {
          return this.selected.map((choice) => this.styles.primary(choice.name)).join(", ");
        }
        return this.styles.primary(this.selected.name);
      }
      async render() {
        let { submitted, size } = this.state;
        let prompt = "";
        let header = await this.header();
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message = await this.message();
        if (this.options.promptLine !== false) {
          prompt = [prefix, message, separator, ""].join(" ");
          this.state.prompt = prompt;
        }
        let output = await this.format();
        let help = await this.error() || await this.hint();
        let body = await this.renderChoices();
        let footer = await this.footer();
        if (output)
          prompt += output;
        if (help && !prompt.includes(help))
          prompt += " " + help;
        if (submitted && !output && !body.trim() && this.multiple && this.emptyError != null) {
          prompt += this.styles.danger(this.emptyError);
        }
        this.clear(size);
        this.write([header, prompt, body, footer].filter(Boolean).join("\n"));
        this.write(this.margin[2]);
        this.restore();
      }
    };
    module2.exports = SelectPrompt;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/autocomplete.js
var require_autocomplete = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/autocomplete.js"(exports2, module2) {
    "use strict";
    var Select = require_select();
    var highlight = (input, color) => {
      let val = input.toLowerCase();
      return (str) => {
        let s = str.toLowerCase();
        let i = s.indexOf(val);
        let colored = color(str.slice(i, i + val.length));
        return i >= 0 ? str.slice(0, i) + colored + str.slice(i + val.length) : str;
      };
    };
    var AutoComplete = class extends Select {
      constructor(options) {
        super(options);
        this.cursorShow();
      }
      moveCursor(n) {
        this.state.cursor += n;
      }
      dispatch(ch) {
        return this.append(ch);
      }
      space(ch) {
        return this.options.multiple ? super.space(ch) : this.append(ch);
      }
      append(ch) {
        let { cursor, input } = this.state;
        this.input = input.slice(0, cursor) + ch + input.slice(cursor);
        this.moveCursor(1);
        return this.complete();
      }
      delete() {
        let { cursor, input } = this.state;
        if (!input)
          return this.alert();
        this.input = input.slice(0, cursor - 1) + input.slice(cursor);
        this.moveCursor(-1);
        return this.complete();
      }
      deleteForward() {
        let { cursor, input } = this.state;
        if (input[cursor] === void 0)
          return this.alert();
        this.input = `${input}`.slice(0, cursor) + `${input}`.slice(cursor + 1);
        return this.complete();
      }
      number(ch) {
        return this.append(ch);
      }
      async complete() {
        this.completing = true;
        this.choices = await this.suggest(this.input, this.state._choices);
        this.state.limit = void 0;
        this.index = Math.min(Math.max(this.visible.length - 1, 0), this.index);
        await this.render();
        this.completing = false;
      }
      suggest(input = this.input, choices = this.state._choices) {
        if (typeof this.options.suggest === "function") {
          return this.options.suggest.call(this, input, choices);
        }
        let str = input.toLowerCase();
        return choices.filter((ch) => ch.message.toLowerCase().includes(str));
      }
      pointer() {
        return "";
      }
      format() {
        if (!this.focused)
          return this.input;
        if (this.options.multiple && this.state.submitted) {
          return this.selected.map((ch) => this.styles.primary(ch.message)).join(", ");
        }
        if (this.state.submitted) {
          let value = this.value = this.input = this.focused.value;
          return this.styles.primary(value);
        }
        return this.input;
      }
      async render() {
        if (this.state.status !== "pending")
          return super.render();
        let style = this.options.highlight ? this.options.highlight.bind(this) : this.styles.placeholder;
        let color = highlight(this.input, style);
        let choices = this.choices;
        this.choices = choices.map((ch) => ({ ...ch, message: color(ch.message) }));
        await super.render();
        this.choices = choices;
      }
      submit() {
        if (this.options.multiple) {
          this.value = this.selected.map((ch) => ch.name);
        }
        return super.submit();
      }
    };
    module2.exports = AutoComplete;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/placeholder.js
var require_placeholder = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/placeholder.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = (prompt, options = {}) => {
      prompt.cursorHide();
      let { input = "", initial = "", pos, showCursor = true, color } = options;
      let style = color || prompt.styles.placeholder;
      let inverse = utils.inverse(prompt.styles.primary);
      let blinker = (str) => inverse(prompt.styles.black(str));
      let output = input;
      let char = " ";
      let reverse = blinker(char);
      if (prompt.blink && prompt.blink.off === true) {
        blinker = (str) => str;
        reverse = "";
      }
      if (showCursor && pos === 0 && initial === "" && input === "") {
        return blinker(char);
      }
      if (showCursor && pos === 0 && (input === initial || input === "")) {
        return blinker(initial[0]) + style(initial.slice(1));
      }
      initial = utils.isPrimitive(initial) ? `${initial}` : "";
      input = utils.isPrimitive(input) ? `${input}` : "";
      let placeholder = initial && initial.startsWith(input) && initial !== input;
      let cursor = placeholder ? blinker(initial[input.length]) : reverse;
      if (pos !== input.length && showCursor === true) {
        output = input.slice(0, pos) + blinker(input[pos]) + input.slice(pos + 1);
        cursor = "";
      }
      if (showCursor === false) {
        cursor = "";
      }
      if (placeholder) {
        let raw = prompt.styles.unstyle(output + cursor);
        return output + cursor + style(initial.slice(raw.length));
      }
      return output + cursor;
    };
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/form.js
var require_form = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/form.js"(exports2, module2) {
    "use strict";
    var colors = require_ansi_colors();
    var SelectPrompt = require_select();
    var placeholder = require_placeholder();
    var FormPrompt = class extends SelectPrompt {
      constructor(options) {
        super({ ...options, multiple: true });
        this.type = "form";
        this.initial = this.options.initial;
        this.align = [this.options.align, "right"].find((v) => v != null);
        this.emptyError = "";
        this.values = {};
      }
      async reset(first) {
        await super.reset();
        if (first === true)
          this._index = this.index;
        this.index = this._index;
        this.values = {};
        this.choices.forEach((choice) => choice.reset && choice.reset());
        return this.render();
      }
      dispatch(char) {
        return !!char && this.append(char);
      }
      append(char) {
        let choice = this.focused;
        if (!choice)
          return this.alert();
        let { cursor, input } = choice;
        choice.value = choice.input = input.slice(0, cursor) + char + input.slice(cursor);
        choice.cursor++;
        return this.render();
      }
      delete() {
        let choice = this.focused;
        if (!choice || choice.cursor <= 0)
          return this.alert();
        let { cursor, input } = choice;
        choice.value = choice.input = input.slice(0, cursor - 1) + input.slice(cursor);
        choice.cursor--;
        return this.render();
      }
      deleteForward() {
        let choice = this.focused;
        if (!choice)
          return this.alert();
        let { cursor, input } = choice;
        if (input[cursor] === void 0)
          return this.alert();
        let str = `${input}`.slice(0, cursor) + `${input}`.slice(cursor + 1);
        choice.value = choice.input = str;
        return this.render();
      }
      right() {
        let choice = this.focused;
        if (!choice)
          return this.alert();
        if (choice.cursor >= choice.input.length)
          return this.alert();
        choice.cursor++;
        return this.render();
      }
      left() {
        let choice = this.focused;
        if (!choice)
          return this.alert();
        if (choice.cursor <= 0)
          return this.alert();
        choice.cursor--;
        return this.render();
      }
      space(ch, key) {
        return this.dispatch(ch, key);
      }
      number(ch, key) {
        return this.dispatch(ch, key);
      }
      next() {
        let ch = this.focused;
        if (!ch)
          return this.alert();
        let { initial, input } = ch;
        if (initial && initial.startsWith(input) && input !== initial) {
          ch.value = ch.input = initial;
          ch.cursor = ch.value.length;
          return this.render();
        }
        return super.next();
      }
      prev() {
        let ch = this.focused;
        if (!ch)
          return this.alert();
        if (ch.cursor === 0)
          return super.prev();
        ch.value = ch.input = "";
        ch.cursor = 0;
        return this.render();
      }
      separator() {
        return "";
      }
      format(value) {
        return !this.state.submitted ? super.format(value) : "";
      }
      pointer() {
        return "";
      }
      indicator(choice) {
        return choice.input ? "\u29BF" : "\u2299";
      }
      async choiceSeparator(choice, i) {
        let sep = await this.resolve(choice.separator, this.state, choice, i) || ":";
        return sep ? " " + this.styles.disabled(sep) : "";
      }
      async renderChoice(choice, i) {
        await this.onChoice(choice, i);
        let { state, styles } = this;
        let { cursor, initial = "", name, hint, input = "" } = choice;
        let { muted, submitted, primary, danger } = styles;
        let help = hint;
        let focused = this.index === i;
        let validate = choice.validate || (() => true);
        let sep = await this.choiceSeparator(choice, i);
        let msg = choice.message;
        if (this.align === "right")
          msg = msg.padStart(this.longest + 1, " ");
        if (this.align === "left")
          msg = msg.padEnd(this.longest + 1, " ");
        let value = this.values[name] = input || initial;
        let color = input ? "success" : "dark";
        if (await validate.call(choice, value, this.state) !== true) {
          color = "danger";
        }
        let style = styles[color];
        let indicator = style(await this.indicator(choice, i)) + (choice.pad || "");
        let indent = this.indent(choice);
        let line = () => [indent, indicator, msg + sep, input, help].filter(Boolean).join(" ");
        if (state.submitted) {
          msg = colors.unstyle(msg);
          input = submitted(input);
          help = "";
          return line();
        }
        if (choice.format) {
          input = await choice.format.call(this, input, choice, i);
        } else {
          let color2 = this.styles.muted;
          let options = { input, initial, pos: cursor, showCursor: focused, color: color2 };
          input = placeholder(this, options);
        }
        if (!this.isValue(input)) {
          input = this.styles.muted(this.symbols.ellipsis);
        }
        if (choice.result) {
          this.values[name] = await choice.result.call(this, value, choice, i);
        }
        if (focused) {
          msg = primary(msg);
        }
        if (choice.error) {
          input += (input ? " " : "") + danger(choice.error.trim());
        } else if (choice.hint) {
          input += (input ? " " : "") + muted(choice.hint.trim());
        }
        return line();
      }
      async submit() {
        this.value = this.values;
        return super.base.submit.call(this);
      }
    };
    module2.exports = FormPrompt;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/types/auth.js
var require_auth = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/types/auth.js"(exports2, module2) {
    "use strict";
    var FormPrompt = require_form();
    var defaultAuthenticate = () => {
      throw new Error("expected prompt to have a custom authenticate method");
    };
    var factory = (authenticate = defaultAuthenticate) => {
      class AuthPrompt extends FormPrompt {
        constructor(options) {
          super(options);
        }
        async submit() {
          this.value = await authenticate.call(this, this.values, this.state);
          super.base.submit.call(this);
        }
        static create(authenticate2) {
          return factory(authenticate2);
        }
      }
      return AuthPrompt;
    };
    module2.exports = factory();
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/basicauth.js
var require_basicauth = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/basicauth.js"(exports2, module2) {
    "use strict";
    var AuthPrompt = require_auth();
    function defaultAuthenticate(value, state) {
      if (value.username === this.options.username && value.password === this.options.password) {
        return true;
      }
      return false;
    }
    var factory = (authenticate = defaultAuthenticate) => {
      const choices = [
        { name: "username", message: "username" },
        {
          name: "password",
          message: "password",
          format(input) {
            if (this.options.showPassword) {
              return input;
            }
            let color = this.state.submitted ? this.styles.primary : this.styles.muted;
            return color(this.symbols.asterisk.repeat(input.length));
          }
        }
      ];
      class BasicAuthPrompt extends AuthPrompt.create(authenticate) {
        constructor(options) {
          super({ ...options, choices });
        }
        static create(authenticate2) {
          return factory(authenticate2);
        }
      }
      return BasicAuthPrompt;
    };
    module2.exports = factory();
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/types/boolean.js
var require_boolean = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/types/boolean.js"(exports2, module2) {
    "use strict";
    var Prompt = require_prompt();
    var { isPrimitive, hasColor } = require_utils();
    var BooleanPrompt = class extends Prompt {
      constructor(options) {
        super(options);
        this.cursorHide();
      }
      async initialize() {
        let initial = await this.resolve(this.initial, this.state);
        this.input = await this.cast(initial);
        await super.initialize();
      }
      dispatch(ch) {
        if (!this.isValue(ch))
          return this.alert();
        this.input = ch;
        return this.submit();
      }
      format(value) {
        let { styles, state } = this;
        return !state.submitted ? styles.primary(value) : styles.success(value);
      }
      cast(input) {
        return this.isTrue(input);
      }
      isTrue(input) {
        return /^[ty1]/i.test(input);
      }
      isFalse(input) {
        return /^[fn0]/i.test(input);
      }
      isValue(value) {
        return isPrimitive(value) && (this.isTrue(value) || this.isFalse(value));
      }
      async hint() {
        if (this.state.status === "pending") {
          let hint = await this.element("hint");
          if (!hasColor(hint)) {
            return this.styles.muted(hint);
          }
          return hint;
        }
      }
      async render() {
        let { input, size } = this.state;
        let prefix = await this.prefix();
        let sep = await this.separator();
        let msg = await this.message();
        let hint = this.styles.muted(this.default);
        let promptLine = [prefix, msg, hint, sep].filter(Boolean).join(" ");
        this.state.prompt = promptLine;
        let header = await this.header();
        let value = this.value = this.cast(input);
        let output = await this.format(value);
        let help = await this.error() || await this.hint();
        let footer = await this.footer();
        if (help && !promptLine.includes(help))
          output += " " + help;
        promptLine += " " + output;
        this.clear(size);
        this.write([header, promptLine, footer].filter(Boolean).join("\n"));
        this.restore();
      }
      set value(value) {
        super.value = value;
      }
      get value() {
        return this.cast(super.value);
      }
    };
    module2.exports = BooleanPrompt;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/confirm.js
var require_confirm = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/confirm.js"(exports2, module2) {
    "use strict";
    var BooleanPrompt = require_boolean();
    var ConfirmPrompt = class extends BooleanPrompt {
      constructor(options) {
        super(options);
        this.default = this.options.default || (this.initial ? "(Y/n)" : "(y/N)");
      }
    };
    module2.exports = ConfirmPrompt;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/editable.js
var require_editable = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/editable.js"(exports2, module2) {
    "use strict";
    var Select = require_select();
    var Form = require_form();
    var form = Form.prototype;
    var Editable = class extends Select {
      constructor(options) {
        super({ ...options, multiple: true });
        this.align = [this.options.align, "left"].find((v) => v != null);
        this.emptyError = "";
        this.values = {};
      }
      dispatch(char, key) {
        let choice = this.focused;
        let parent = choice.parent || {};
        if (!choice.editable && !parent.editable) {
          if (char === "a" || char === "i")
            return super[char]();
        }
        return form.dispatch.call(this, char, key);
      }
      append(char, key) {
        return form.append.call(this, char, key);
      }
      delete(char, key) {
        return form.delete.call(this, char, key);
      }
      space(char) {
        return this.focused.editable ? this.append(char) : super.space();
      }
      number(char) {
        return this.focused.editable ? this.append(char) : super.number(char);
      }
      next() {
        return this.focused.editable ? form.next.call(this) : super.next();
      }
      prev() {
        return this.focused.editable ? form.prev.call(this) : super.prev();
      }
      async indicator(choice, i) {
        let symbol = choice.indicator || "";
        let value = choice.editable ? symbol : super.indicator(choice, i);
        return await this.resolve(value, this.state, choice, i) || "";
      }
      indent(choice) {
        return choice.role === "heading" ? "" : choice.editable ? " " : "  ";
      }
      async renderChoice(choice, i) {
        choice.indent = "";
        if (choice.editable)
          return form.renderChoice.call(this, choice, i);
        return super.renderChoice(choice, i);
      }
      error() {
        return "";
      }
      footer() {
        return this.state.error;
      }
      async validate() {
        let result = true;
        for (let choice of this.choices) {
          if (typeof choice.validate !== "function") {
            continue;
          }
          if (choice.role === "heading") {
            continue;
          }
          let val = choice.parent ? this.value[choice.parent.name] : this.value;
          if (choice.editable) {
            val = choice.value === choice.name ? choice.initial || "" : choice.value;
          } else if (!this.isDisabled(choice)) {
            val = choice.enabled === true;
          }
          result = await choice.validate(val, this.state);
          if (result !== true) {
            break;
          }
        }
        if (result !== true) {
          this.state.error = typeof result === "string" ? result : "Invalid Input";
        }
        return result;
      }
      submit() {
        if (this.focused.newChoice === true)
          return super.submit();
        if (this.choices.some((ch) => ch.newChoice)) {
          return this.alert();
        }
        this.value = {};
        for (let choice of this.choices) {
          let val = choice.parent ? this.value[choice.parent.name] : this.value;
          if (choice.role === "heading") {
            this.value[choice.name] = {};
            continue;
          }
          if (choice.editable) {
            val[choice.name] = choice.value === choice.name ? choice.initial || "" : choice.value;
          } else if (!this.isDisabled(choice)) {
            val[choice.name] = choice.enabled === true;
          }
        }
        return this.base.submit.call(this);
      }
    };
    module2.exports = Editable;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/types/string.js
var require_string = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/types/string.js"(exports2, module2) {
    "use strict";
    var Prompt = require_prompt();
    var placeholder = require_placeholder();
    var { isPrimitive } = require_utils();
    var StringPrompt = class extends Prompt {
      constructor(options) {
        super(options);
        this.initial = isPrimitive(this.initial) ? String(this.initial) : "";
        if (this.initial)
          this.cursorHide();
        this.state.prevCursor = 0;
        this.state.clipboard = [];
      }
      async keypress(input, key = {}) {
        let prev = this.state.prevKeypress;
        this.state.prevKeypress = key;
        if (this.options.multiline === true && key.name === "return") {
          if (!prev || prev.name !== "return") {
            return this.append("\n", key);
          }
        }
        return super.keypress(input, key);
      }
      moveCursor(n) {
        this.cursor += n;
      }
      reset() {
        this.input = this.value = "";
        this.cursor = 0;
        return this.render();
      }
      dispatch(ch, key) {
        if (!ch || key.ctrl || key.code)
          return this.alert();
        this.append(ch);
      }
      append(ch) {
        let { cursor, input } = this.state;
        this.input = `${input}`.slice(0, cursor) + ch + `${input}`.slice(cursor);
        this.moveCursor(String(ch).length);
        this.render();
      }
      insert(str) {
        this.append(str);
      }
      delete() {
        let { cursor, input } = this.state;
        if (cursor <= 0)
          return this.alert();
        this.input = `${input}`.slice(0, cursor - 1) + `${input}`.slice(cursor);
        this.moveCursor(-1);
        this.render();
      }
      deleteForward() {
        let { cursor, input } = this.state;
        if (input[cursor] === void 0)
          return this.alert();
        this.input = `${input}`.slice(0, cursor) + `${input}`.slice(cursor + 1);
        this.render();
      }
      cutForward() {
        let pos = this.cursor;
        if (this.input.length <= pos)
          return this.alert();
        this.state.clipboard.push(this.input.slice(pos));
        this.input = this.input.slice(0, pos);
        this.render();
      }
      cutLeft() {
        let pos = this.cursor;
        if (pos === 0)
          return this.alert();
        let before = this.input.slice(0, pos);
        let after = this.input.slice(pos);
        let words = before.split(" ");
        this.state.clipboard.push(words.pop());
        this.input = words.join(" ");
        this.cursor = this.input.length;
        this.input += after;
        this.render();
      }
      paste() {
        if (!this.state.clipboard.length)
          return this.alert();
        this.insert(this.state.clipboard.pop());
        this.render();
      }
      toggleCursor() {
        if (this.state.prevCursor) {
          this.cursor = this.state.prevCursor;
          this.state.prevCursor = 0;
        } else {
          this.state.prevCursor = this.cursor;
          this.cursor = 0;
        }
        this.render();
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.input.length - 1;
        this.render();
      }
      next() {
        let init = this.initial != null ? String(this.initial) : "";
        if (!init || !init.startsWith(this.input))
          return this.alert();
        this.input = this.initial;
        this.cursor = this.initial.length;
        this.render();
      }
      prev() {
        if (!this.input)
          return this.alert();
        this.reset();
      }
      backward() {
        return this.left();
      }
      forward() {
        return this.right();
      }
      right() {
        if (this.cursor >= this.input.length)
          return this.alert();
        this.moveCursor(1);
        return this.render();
      }
      left() {
        if (this.cursor <= 0)
          return this.alert();
        this.moveCursor(-1);
        return this.render();
      }
      isValue(value) {
        return !!value;
      }
      async format(input = this.value) {
        let initial = await this.resolve(this.initial, this.state);
        if (!this.state.submitted) {
          return placeholder(this, { input, initial, pos: this.cursor });
        }
        return this.styles.submitted(input || initial);
      }
      async render() {
        let size = this.state.size;
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message = await this.message();
        let prompt = [prefix, message, separator].filter(Boolean).join(" ");
        this.state.prompt = prompt;
        let header = await this.header();
        let output = await this.format();
        let help = await this.error() || await this.hint();
        let footer = await this.footer();
        if (help && !output.includes(help))
          output += " " + help;
        prompt += " " + output;
        this.clear(size);
        this.write([header, prompt, footer].filter(Boolean).join("\n"));
        this.restore();
      }
    };
    module2.exports = StringPrompt;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/completer.js
var require_completer = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/completer.js"(exports2, module2) {
    "use strict";
    var unique = (arr) => arr.filter((v, i) => arr.lastIndexOf(v) === i);
    var compact = (arr) => unique(arr).filter(Boolean);
    module2.exports = (action, data = {}, value = "") => {
      let { past = [], present = "" } = data;
      let rest, prev;
      switch (action) {
        case "prev":
        case "undo":
          rest = past.slice(0, past.length - 1);
          prev = past[past.length - 1] || "";
          return {
            past: compact([value, ...rest]),
            present: prev
          };
        case "next":
        case "redo":
          rest = past.slice(1);
          prev = past[0] || "";
          return {
            past: compact([...rest, value]),
            present: prev
          };
        case "save":
          return {
            past: compact([...past, value]),
            present: ""
          };
        case "remove":
          prev = compact(past.filter((v) => v !== value));
          present = "";
          if (prev.length) {
            present = prev.pop();
          }
          return {
            past: prev,
            present
          };
        default: {
          throw new Error(`Invalid action: "${action}"`);
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/input.js
var require_input = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/input.js"(exports2, module2) {
    "use strict";
    var Prompt = require_string();
    var completer = require_completer();
    var Input = class extends Prompt {
      constructor(options) {
        super(options);
        let history = this.options.history;
        if (history && history.store) {
          let initial = history.values || this.initial;
          this.autosave = !!history.autosave;
          this.store = history.store;
          this.data = this.store.get("values") || { past: [], present: initial };
          this.initial = this.data.present || this.data.past[this.data.past.length - 1];
        }
      }
      completion(action) {
        if (!this.store)
          return this.alert();
        this.data = completer(action, this.data, this.input);
        if (!this.data.present)
          return this.alert();
        this.input = this.data.present;
        this.cursor = this.input.length;
        return this.render();
      }
      altUp() {
        return this.completion("prev");
      }
      altDown() {
        return this.completion("next");
      }
      prev() {
        this.save();
        return super.prev();
      }
      save() {
        if (!this.store)
          return;
        this.data = completer("save", this.data, this.input);
        this.store.set("values", this.data);
      }
      submit() {
        if (this.store && this.autosave === true) {
          this.save();
        }
        return super.submit();
      }
    };
    module2.exports = Input;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/invisible.js
var require_invisible = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/invisible.js"(exports2, module2) {
    "use strict";
    var StringPrompt = require_string();
    var InvisiblePrompt = class extends StringPrompt {
      format() {
        return "";
      }
    };
    module2.exports = InvisiblePrompt;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/list.js
var require_list = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/list.js"(exports2, module2) {
    "use strict";
    var StringPrompt = require_string();
    var ListPrompt = class extends StringPrompt {
      constructor(options = {}) {
        super(options);
        this.sep = this.options.separator || /, */;
        this.initial = options.initial || "";
      }
      split(input = this.value) {
        return input ? String(input).split(this.sep) : [];
      }
      format() {
        let style = this.state.submitted ? this.styles.primary : (val) => val;
        return this.list.map(style).join(", ");
      }
      async submit(value) {
        let result = this.state.error || await this.validate(this.list, this.state);
        if (result !== true) {
          this.state.error = result;
          return super.submit();
        }
        this.value = this.list;
        return super.submit();
      }
      get list() {
        return this.split();
      }
    };
    module2.exports = ListPrompt;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/multiselect.js
var require_multiselect = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/multiselect.js"(exports2, module2) {
    "use strict";
    var Select = require_select();
    var MultiSelect = class extends Select {
      constructor(options) {
        super({ ...options, multiple: true });
      }
    };
    module2.exports = MultiSelect;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/types/number.js
var require_number = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/types/number.js"(exports2, module2) {
    "use strict";
    var StringPrompt = require_string();
    var NumberPrompt = class extends StringPrompt {
      constructor(options = {}) {
        super({ style: "number", ...options });
        this.min = this.isValue(options.min) ? this.toNumber(options.min) : -Infinity;
        this.max = this.isValue(options.max) ? this.toNumber(options.max) : Infinity;
        this.delay = options.delay != null ? options.delay : 1e3;
        this.float = options.float !== false;
        this.round = options.round === true || options.float === false;
        this.major = options.major || 10;
        this.minor = options.minor || 1;
        this.initial = options.initial != null ? options.initial : "";
        this.input = String(this.initial);
        this.cursor = this.input.length;
        this.cursorShow();
      }
      append(ch) {
        if (!/[-+.]/.test(ch) || ch === "." && this.input.includes(".")) {
          return this.alert("invalid number");
        }
        return super.append(ch);
      }
      number(ch) {
        return super.append(ch);
      }
      next() {
        if (this.input && this.input !== this.initial)
          return this.alert();
        if (!this.isValue(this.initial))
          return this.alert();
        this.input = this.initial;
        this.cursor = String(this.initial).length;
        return this.render();
      }
      up(number) {
        let step = number || this.minor;
        let num = this.toNumber(this.input);
        if (num > this.max + step)
          return this.alert();
        this.input = `${num + step}`;
        return this.render();
      }
      down(number) {
        let step = number || this.minor;
        let num = this.toNumber(this.input);
        if (num < this.min - step)
          return this.alert();
        this.input = `${num - step}`;
        return this.render();
      }
      shiftDown() {
        return this.down(this.major);
      }
      shiftUp() {
        return this.up(this.major);
      }
      format(input = this.input) {
        if (typeof this.options.format === "function") {
          return this.options.format.call(this, input);
        }
        return this.styles.info(input);
      }
      toNumber(value = "") {
        return this.float ? +value : Math.round(+value);
      }
      isValue(value) {
        return /^[-+]?[0-9]+((\.)|(\.[0-9]+))?$/.test(value);
      }
      submit() {
        let value = [this.input, this.initial].find((v) => this.isValue(v));
        this.value = this.toNumber(value || 0);
        return super.submit();
      }
    };
    module2.exports = NumberPrompt;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/numeral.js
var require_numeral = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/numeral.js"(exports2, module2) {
    module2.exports = require_number();
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/password.js
var require_password = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/password.js"(exports2, module2) {
    "use strict";
    var StringPrompt = require_string();
    var PasswordPrompt = class extends StringPrompt {
      constructor(options) {
        super(options);
        this.cursorShow();
      }
      format(input = this.input) {
        if (!this.keypressed)
          return "";
        let color = this.state.submitted ? this.styles.primary : this.styles.muted;
        return color(this.symbols.asterisk.repeat(input.length));
      }
    };
    module2.exports = PasswordPrompt;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/scale.js
var require_scale = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/scale.js"(exports2, module2) {
    "use strict";
    var colors = require_ansi_colors();
    var ArrayPrompt = require_array();
    var utils = require_utils();
    var LikertScale = class extends ArrayPrompt {
      constructor(options = {}) {
        super(options);
        this.widths = [].concat(options.messageWidth || 50);
        this.align = [].concat(options.align || "left");
        this.linebreak = options.linebreak || false;
        this.edgeLength = options.edgeLength || 3;
        this.newline = options.newline || "\n   ";
        let start = options.startNumber || 1;
        if (typeof this.scale === "number") {
          this.scaleKey = false;
          this.scale = Array(this.scale).fill(0).map((v, i) => ({ name: i + start }));
        }
      }
      async reset() {
        this.tableized = false;
        await super.reset();
        return this.render();
      }
      tableize() {
        if (this.tableized === true)
          return;
        this.tableized = true;
        let longest = 0;
        for (let ch of this.choices) {
          longest = Math.max(longest, ch.message.length);
          ch.scaleIndex = ch.initial || 2;
          ch.scale = [];
          for (let i = 0; i < this.scale.length; i++) {
            ch.scale.push({ index: i });
          }
        }
        this.widths[0] = Math.min(this.widths[0], longest + 3);
      }
      async dispatch(s, key) {
        if (this.multiple) {
          return this[key.name] ? await this[key.name](s, key) : await super.dispatch(s, key);
        }
        this.alert();
      }
      heading(msg, item, i) {
        return this.styles.strong(msg);
      }
      separator() {
        return this.styles.muted(this.symbols.ellipsis);
      }
      right() {
        let choice = this.focused;
        if (choice.scaleIndex >= this.scale.length - 1)
          return this.alert();
        choice.scaleIndex++;
        return this.render();
      }
      left() {
        let choice = this.focused;
        if (choice.scaleIndex <= 0)
          return this.alert();
        choice.scaleIndex--;
        return this.render();
      }
      indent() {
        return "";
      }
      format() {
        if (this.state.submitted) {
          let values = this.choices.map((ch) => this.styles.info(ch.index));
          return values.join(", ");
        }
        return "";
      }
      pointer() {
        return "";
      }
      renderScaleKey() {
        if (this.scaleKey === false)
          return "";
        if (this.state.submitted)
          return "";
        let scale = this.scale.map((item) => `   ${item.name} - ${item.message}`);
        let key = ["", ...scale].map((item) => this.styles.muted(item));
        return key.join("\n");
      }
      renderScaleHeading(max) {
        let keys = this.scale.map((ele) => ele.name);
        if (typeof this.options.renderScaleHeading === "function") {
          keys = this.options.renderScaleHeading.call(this, max);
        }
        let diff = this.scaleLength - keys.join("").length;
        let spacing = Math.round(diff / (keys.length - 1));
        let names = keys.map((key) => this.styles.strong(key));
        let headings = names.join(" ".repeat(spacing));
        let padding = " ".repeat(this.widths[0]);
        return this.margin[3] + padding + this.margin[1] + headings;
      }
      scaleIndicator(choice, item, i) {
        if (typeof this.options.scaleIndicator === "function") {
          return this.options.scaleIndicator.call(this, choice, item, i);
        }
        let enabled = choice.scaleIndex === item.index;
        if (item.disabled)
          return this.styles.hint(this.symbols.radio.disabled);
        if (enabled)
          return this.styles.success(this.symbols.radio.on);
        return this.symbols.radio.off;
      }
      renderScale(choice, i) {
        let scale = choice.scale.map((item) => this.scaleIndicator(choice, item, i));
        let padding = this.term === "Hyper" ? "" : " ";
        return scale.join(padding + this.symbols.line.repeat(this.edgeLength));
      }
      async renderChoice(choice, i) {
        await this.onChoice(choice, i);
        let focused = this.index === i;
        let pointer = await this.pointer(choice, i);
        let hint = await choice.hint;
        if (hint && !utils.hasColor(hint)) {
          hint = this.styles.muted(hint);
        }
        let pad = (str) => this.margin[3] + str.replace(/\s+$/, "").padEnd(this.widths[0], " ");
        let newline = this.newline;
        let ind = this.indent(choice);
        let message = await this.resolve(choice.message, this.state, choice, i);
        let scale = await this.renderScale(choice, i);
        let margin = this.margin[1] + this.margin[3];
        this.scaleLength = colors.unstyle(scale).length;
        this.widths[0] = Math.min(this.widths[0], this.width - this.scaleLength - margin.length);
        let msg = utils.wordWrap(message, { width: this.widths[0], newline });
        let lines = msg.split("\n").map((line) => pad(line) + this.margin[1]);
        if (focused) {
          scale = this.styles.info(scale);
          lines = lines.map((line) => this.styles.info(line));
        }
        lines[0] += scale;
        if (this.linebreak)
          lines.push("");
        return [ind + pointer, lines.join("\n")].filter(Boolean);
      }
      async renderChoices() {
        if (this.state.submitted)
          return "";
        this.tableize();
        let choices = this.visible.map(async (ch, i) => await this.renderChoice(ch, i));
        let visible = await Promise.all(choices);
        let heading = await this.renderScaleHeading();
        return this.margin[0] + [heading, ...visible.map((v) => v.join(" "))].join("\n");
      }
      async render() {
        let { submitted, size } = this.state;
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message = await this.message();
        let prompt = "";
        if (this.options.promptLine !== false) {
          prompt = [prefix, message, separator, ""].join(" ");
          this.state.prompt = prompt;
        }
        let header = await this.header();
        let output = await this.format();
        let key = await this.renderScaleKey();
        let help = await this.error() || await this.hint();
        let body = await this.renderChoices();
        let footer = await this.footer();
        let err = this.emptyError;
        if (output)
          prompt += output;
        if (help && !prompt.includes(help))
          prompt += " " + help;
        if (submitted && !output && !body.trim() && this.multiple && err != null) {
          prompt += this.styles.danger(err);
        }
        this.clear(size);
        this.write([header, prompt, key, body, footer].filter(Boolean).join("\n"));
        if (!this.state.submitted) {
          this.write(this.margin[2]);
        }
        this.restore();
      }
      submit() {
        this.value = {};
        for (let choice of this.choices) {
          this.value[choice.name] = choice.scaleIndex;
        }
        return this.base.submit.call(this);
      }
    };
    module2.exports = LikertScale;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/interpolate.js
var require_interpolate = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/interpolate.js"(exports2, module2) {
    "use strict";
    var colors = require_ansi_colors();
    var clean = (str = "") => {
      return typeof str === "string" ? str.replace(/^['"]|['"]$/g, "") : "";
    };
    var Item = class {
      constructor(token) {
        this.name = token.key;
        this.field = token.field || {};
        this.value = clean(token.initial || this.field.initial || "");
        this.message = token.message || this.name;
        this.cursor = 0;
        this.input = "";
        this.lines = [];
      }
    };
    var tokenize = async (options = {}, defaults = {}, fn = (token) => token) => {
      let unique = new Set();
      let fields = options.fields || [];
      let input = options.template;
      let tabstops = [];
      let items = [];
      let keys = [];
      let line = 1;
      if (typeof input === "function") {
        input = await input();
      }
      let i = -1;
      let next = () => input[++i];
      let peek = () => input[i + 1];
      let push = (token) => {
        token.line = line;
        tabstops.push(token);
      };
      push({ type: "bos", value: "" });
      while (i < input.length - 1) {
        let value = next();
        if (/^[^\S\n ]$/.test(value)) {
          push({ type: "text", value });
          continue;
        }
        if (value === "\n") {
          push({ type: "newline", value });
          line++;
          continue;
        }
        if (value === "\\") {
          value += next();
          push({ type: "text", value });
          continue;
        }
        if ((value === "$" || value === "#" || value === "{") && peek() === "{") {
          let n = next();
          value += n;
          let token = { type: "template", open: value, inner: "", close: "", value };
          let ch;
          while (ch = next()) {
            if (ch === "}") {
              if (peek() === "}")
                ch += next();
              token.value += ch;
              token.close = ch;
              break;
            }
            if (ch === ":") {
              token.initial = "";
              token.key = token.inner;
            } else if (token.initial !== void 0) {
              token.initial += ch;
            }
            token.value += ch;
            token.inner += ch;
          }
          token.template = token.open + (token.initial || token.inner) + token.close;
          token.key = token.key || token.inner;
          if (defaults.hasOwnProperty(token.key)) {
            token.initial = defaults[token.key];
          }
          token = fn(token);
          push(token);
          keys.push(token.key);
          unique.add(token.key);
          let item = items.find((item2) => item2.name === token.key);
          token.field = fields.find((ch2) => ch2.name === token.key);
          if (!item) {
            item = new Item(token);
            items.push(item);
          }
          item.lines.push(token.line - 1);
          continue;
        }
        let last = tabstops[tabstops.length - 1];
        if (last.type === "text" && last.line === line) {
          last.value += value;
        } else {
          push({ type: "text", value });
        }
      }
      push({ type: "eos", value: "" });
      return { input, tabstops, unique, keys, items };
    };
    module2.exports = async (prompt) => {
      let options = prompt.options;
      let required = new Set(options.required === true ? [] : options.required || []);
      let defaults = { ...options.values, ...options.initial };
      let { tabstops, items, keys } = await tokenize(options, defaults);
      let result = createFn("result", prompt, options);
      let format = createFn("format", prompt, options);
      let isValid = createFn("validate", prompt, options, true);
      let isVal = prompt.isValue.bind(prompt);
      return async (state = {}, submitted = false) => {
        let index = 0;
        state.required = required;
        state.items = items;
        state.keys = keys;
        state.output = "";
        let validate = async (value, state2, item, index2) => {
          let error = await isValid(value, state2, item, index2);
          if (error === false) {
            return "Invalid field " + item.name;
          }
          return error;
        };
        for (let token of tabstops) {
          let value = token.value;
          let key = token.key;
          if (token.type !== "template") {
            if (value)
              state.output += value;
            continue;
          }
          if (token.type === "template") {
            let item = items.find((ch) => ch.name === key);
            if (options.required === true) {
              state.required.add(item.name);
            }
            let val = [item.input, state.values[item.value], item.value, value].find(isVal);
            let field = item.field || {};
            let message = field.message || token.inner;
            if (submitted) {
              let error = await validate(state.values[key], state, item, index);
              if (error && typeof error === "string" || error === false) {
                state.invalid.set(key, error);
                continue;
              }
              state.invalid.delete(key);
              let res = await result(state.values[key], state, item, index);
              state.output += colors.unstyle(res);
              continue;
            }
            item.placeholder = false;
            let before = value;
            value = await format(value, state, item, index);
            if (val !== value) {
              state.values[key] = val;
              value = prompt.styles.typing(val);
              state.missing.delete(message);
            } else {
              state.values[key] = void 0;
              val = `<${message}>`;
              value = prompt.styles.primary(val);
              item.placeholder = true;
              if (state.required.has(key)) {
                state.missing.add(message);
              }
            }
            if (state.missing.has(message) && state.validating) {
              value = prompt.styles.warning(val);
            }
            if (state.invalid.has(key) && state.validating) {
              value = prompt.styles.danger(val);
            }
            if (index === state.index) {
              if (before !== value) {
                value = prompt.styles.underline(value);
              } else {
                value = prompt.styles.heading(colors.unstyle(value));
              }
            }
            index++;
          }
          if (value) {
            state.output += value;
          }
        }
        let lines = state.output.split("\n").map((l) => " " + l);
        let len = items.length;
        let done = 0;
        for (let item of items) {
          if (state.invalid.has(item.name)) {
            item.lines.forEach((i) => {
              if (lines[i][0] !== " ")
                return;
              lines[i] = state.styles.danger(state.symbols.bullet) + lines[i].slice(1);
            });
          }
          if (prompt.isValue(state.values[item.name])) {
            done++;
          }
        }
        state.completed = (done / len * 100).toFixed(0);
        state.output = lines.join("\n");
        return state.output;
      };
    };
    function createFn(prop, prompt, options, fallback) {
      return (value, state, item, index) => {
        if (typeof item.field[prop] === "function") {
          return item.field[prop].call(prompt, value, state, item, index);
        }
        return [fallback, value].find((v) => prompt.isValue(v));
      };
    }
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/snippet.js
var require_snippet = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/snippet.js"(exports2, module2) {
    "use strict";
    var colors = require_ansi_colors();
    var interpolate = require_interpolate();
    var Prompt = require_prompt();
    var SnippetPrompt = class extends Prompt {
      constructor(options) {
        super(options);
        this.cursorHide();
        this.reset(true);
      }
      async initialize() {
        this.interpolate = await interpolate(this);
        await super.initialize();
      }
      async reset(first) {
        this.state.keys = [];
        this.state.invalid = new Map();
        this.state.missing = new Set();
        this.state.completed = 0;
        this.state.values = {};
        if (first !== true) {
          await this.initialize();
          await this.render();
        }
      }
      moveCursor(n) {
        let item = this.getItem();
        this.cursor += n;
        item.cursor += n;
      }
      dispatch(ch, key) {
        if (!key.code && !key.ctrl && ch != null && this.getItem()) {
          this.append(ch, key);
          return;
        }
        this.alert();
      }
      append(ch, key) {
        let item = this.getItem();
        let prefix = item.input.slice(0, this.cursor);
        let suffix = item.input.slice(this.cursor);
        this.input = item.input = `${prefix}${ch}${suffix}`;
        this.moveCursor(1);
        this.render();
      }
      delete() {
        let item = this.getItem();
        if (this.cursor <= 0 || !item.input)
          return this.alert();
        let suffix = item.input.slice(this.cursor);
        let prefix = item.input.slice(0, this.cursor - 1);
        this.input = item.input = `${prefix}${suffix}`;
        this.moveCursor(-1);
        this.render();
      }
      increment(i) {
        return i >= this.state.keys.length - 1 ? 0 : i + 1;
      }
      decrement(i) {
        return i <= 0 ? this.state.keys.length - 1 : i - 1;
      }
      first() {
        this.state.index = 0;
        this.render();
      }
      last() {
        this.state.index = this.state.keys.length - 1;
        this.render();
      }
      right() {
        if (this.cursor >= this.input.length)
          return this.alert();
        this.moveCursor(1);
        this.render();
      }
      left() {
        if (this.cursor <= 0)
          return this.alert();
        this.moveCursor(-1);
        this.render();
      }
      prev() {
        this.state.index = this.decrement(this.state.index);
        this.getItem();
        this.render();
      }
      next() {
        this.state.index = this.increment(this.state.index);
        this.getItem();
        this.render();
      }
      up() {
        this.prev();
      }
      down() {
        this.next();
      }
      format(value) {
        let color = this.state.completed < 100 ? this.styles.warning : this.styles.success;
        if (this.state.submitted === true && this.state.completed !== 100) {
          color = this.styles.danger;
        }
        return color(`${this.state.completed}% completed`);
      }
      async render() {
        let { index, keys = [], submitted, size } = this.state;
        let newline = [this.options.newline, "\n"].find((v) => v != null);
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message = await this.message();
        let prompt = [prefix, message, separator].filter(Boolean).join(" ");
        this.state.prompt = prompt;
        let header = await this.header();
        let error = await this.error() || "";
        let hint = await this.hint() || "";
        let body = submitted ? "" : await this.interpolate(this.state);
        let key = this.state.key = keys[index] || "";
        let input = await this.format(key);
        let footer = await this.footer();
        if (input)
          prompt += " " + input;
        if (hint && !input && this.state.completed === 0)
          prompt += " " + hint;
        this.clear(size);
        let lines = [header, prompt, body, footer, error.trim()];
        this.write(lines.filter(Boolean).join(newline));
        this.restore();
      }
      getItem(name) {
        let { items, keys, index } = this.state;
        let item = items.find((ch) => ch.name === keys[index]);
        if (item && item.input != null) {
          this.input = item.input;
          this.cursor = item.cursor;
        }
        return item;
      }
      async submit() {
        if (typeof this.interpolate !== "function")
          await this.initialize();
        await this.interpolate(this.state, true);
        let { invalid, missing, output, values } = this.state;
        if (invalid.size) {
          let err = "";
          for (let [key, value] of invalid)
            err += `Invalid ${key}: ${value}
`;
          this.state.error = err;
          return super.submit();
        }
        if (missing.size) {
          this.state.error = "Required: " + [...missing.keys()].join(", ");
          return super.submit();
        }
        let lines = colors.unstyle(output).split("\n");
        let result = lines.map((v) => v.slice(1)).join("\n");
        this.value = { values, result };
        return super.submit();
      }
    };
    module2.exports = SnippetPrompt;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/sort.js
var require_sort = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/sort.js"(exports2, module2) {
    "use strict";
    var hint = "(Use <shift>+<up/down> to sort)";
    var Prompt = require_select();
    var Sort = class extends Prompt {
      constructor(options) {
        super({ ...options, reorder: false, sort: true, multiple: true });
        this.state.hint = [this.options.hint, hint].find(this.isValue.bind(this));
      }
      indicator() {
        return "";
      }
      async renderChoice(choice, i) {
        let str = await super.renderChoice(choice, i);
        let sym = this.symbols.identicalTo + " ";
        let pre = this.index === i && this.sorting ? this.styles.muted(sym) : "  ";
        if (this.options.drag === false)
          pre = "";
        if (this.options.numbered === true) {
          return pre + `${i + 1} - ` + str;
        }
        return pre + str;
      }
      get selected() {
        return this.choices;
      }
      submit() {
        this.value = this.choices.map((choice) => choice.value);
        return super.submit();
      }
    };
    module2.exports = Sort;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/survey.js
var require_survey = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/survey.js"(exports2, module2) {
    "use strict";
    var ArrayPrompt = require_array();
    var Survey = class extends ArrayPrompt {
      constructor(options = {}) {
        super(options);
        this.emptyError = options.emptyError || "No items were selected";
        this.term = process.env.TERM_PROGRAM;
        if (!this.options.header) {
          let header = ["", "4 - Strongly Agree", "3 - Agree", "2 - Neutral", "1 - Disagree", "0 - Strongly Disagree", ""];
          header = header.map((ele) => this.styles.muted(ele));
          this.state.header = header.join("\n   ");
        }
      }
      async toChoices(...args) {
        if (this.createdScales)
          return false;
        this.createdScales = true;
        let choices = await super.toChoices(...args);
        for (let choice of choices) {
          choice.scale = createScale(5, this.options);
          choice.scaleIdx = 2;
        }
        return choices;
      }
      dispatch() {
        this.alert();
      }
      space() {
        let choice = this.focused;
        let ele = choice.scale[choice.scaleIdx];
        let selected = ele.selected;
        choice.scale.forEach((e) => e.selected = false);
        ele.selected = !selected;
        return this.render();
      }
      indicator() {
        return "";
      }
      pointer() {
        return "";
      }
      separator() {
        return this.styles.muted(this.symbols.ellipsis);
      }
      right() {
        let choice = this.focused;
        if (choice.scaleIdx >= choice.scale.length - 1)
          return this.alert();
        choice.scaleIdx++;
        return this.render();
      }
      left() {
        let choice = this.focused;
        if (choice.scaleIdx <= 0)
          return this.alert();
        choice.scaleIdx--;
        return this.render();
      }
      indent() {
        return "   ";
      }
      async renderChoice(item, i) {
        await this.onChoice(item, i);
        let focused = this.index === i;
        let isHyper = this.term === "Hyper";
        let n = !isHyper ? 8 : 9;
        let s = !isHyper ? " " : "";
        let ln = this.symbols.line.repeat(n);
        let sp = " ".repeat(n + (isHyper ? 0 : 1));
        let dot = (enabled) => (enabled ? this.styles.success("\u25C9") : "\u25EF") + s;
        let num = i + 1 + ".";
        let color = focused ? this.styles.heading : this.styles.noop;
        let msg = await this.resolve(item.message, this.state, item, i);
        let indent = this.indent(item);
        let scale = indent + item.scale.map((e, i2) => dot(i2 === item.scaleIdx)).join(ln);
        let val = (i2) => i2 === item.scaleIdx ? color(i2) : i2;
        let next = indent + item.scale.map((e, i2) => val(i2)).join(sp);
        let line = () => [num, msg].filter(Boolean).join(" ");
        let lines = () => [line(), scale, next, " "].filter(Boolean).join("\n");
        if (focused) {
          scale = this.styles.cyan(scale);
          next = this.styles.cyan(next);
        }
        return lines();
      }
      async renderChoices() {
        if (this.state.submitted)
          return "";
        let choices = this.visible.map(async (ch, i) => await this.renderChoice(ch, i));
        let visible = await Promise.all(choices);
        if (!visible.length)
          visible.push(this.styles.danger("No matching choices"));
        return visible.join("\n");
      }
      format() {
        if (this.state.submitted) {
          let values = this.choices.map((ch) => this.styles.info(ch.scaleIdx));
          return values.join(", ");
        }
        return "";
      }
      async render() {
        let { submitted, size } = this.state;
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message = await this.message();
        let prompt = [prefix, message, separator].filter(Boolean).join(" ");
        this.state.prompt = prompt;
        let header = await this.header();
        let output = await this.format();
        let help = await this.error() || await this.hint();
        let body = await this.renderChoices();
        let footer = await this.footer();
        if (output || !help)
          prompt += " " + output;
        if (help && !prompt.includes(help))
          prompt += " " + help;
        if (submitted && !output && !body && this.multiple && this.type !== "form") {
          prompt += this.styles.danger(this.emptyError);
        }
        this.clear(size);
        this.write([prompt, header, body, footer].filter(Boolean).join("\n"));
        this.restore();
      }
      submit() {
        this.value = {};
        for (let choice of this.choices) {
          this.value[choice.name] = choice.scaleIdx;
        }
        return this.base.submit.call(this);
      }
    };
    function createScale(n, options = {}) {
      if (Array.isArray(options.scale)) {
        return options.scale.map((ele) => ({ ...ele }));
      }
      let scale = [];
      for (let i = 1; i < n + 1; i++)
        scale.push({ i, selected: false });
      return scale;
    }
    module2.exports = Survey;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/text.js
var require_text = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/text.js"(exports2, module2) {
    module2.exports = require_input();
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/toggle.js
var require_toggle = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/toggle.js"(exports2, module2) {
    "use strict";
    var BooleanPrompt = require_boolean();
    var TogglePrompt = class extends BooleanPrompt {
      async initialize() {
        await super.initialize();
        this.value = this.initial = !!this.options.initial;
        this.disabled = this.options.disabled || "no";
        this.enabled = this.options.enabled || "yes";
        await this.render();
      }
      reset() {
        this.value = this.initial;
        this.render();
      }
      delete() {
        this.alert();
      }
      toggle() {
        this.value = !this.value;
        this.render();
      }
      enable() {
        if (this.value === true)
          return this.alert();
        this.value = true;
        this.render();
      }
      disable() {
        if (this.value === false)
          return this.alert();
        this.value = false;
        this.render();
      }
      up() {
        this.toggle();
      }
      down() {
        this.toggle();
      }
      right() {
        this.toggle();
      }
      left() {
        this.toggle();
      }
      next() {
        this.toggle();
      }
      prev() {
        this.toggle();
      }
      dispatch(ch = "", key) {
        switch (ch.toLowerCase()) {
          case " ":
            return this.toggle();
          case "1":
          case "y":
          case "t":
            return this.enable();
          case "0":
          case "n":
          case "f":
            return this.disable();
          default: {
            return this.alert();
          }
        }
      }
      format() {
        let active = (str) => this.styles.primary.underline(str);
        let value = [
          this.value ? this.disabled : active(this.disabled),
          this.value ? active(this.enabled) : this.enabled
        ];
        return value.join(this.styles.muted(" / "));
      }
      async render() {
        let { size } = this.state;
        let header = await this.header();
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message = await this.message();
        let output = await this.format();
        let help = await this.error() || await this.hint();
        let footer = await this.footer();
        let prompt = [prefix, message, separator, output].join(" ");
        this.state.prompt = prompt;
        if (help && !prompt.includes(help))
          prompt += " " + help;
        this.clear(size);
        this.write([header, prompt, footer].filter(Boolean).join("\n"));
        this.write(this.margin[2]);
        this.restore();
      }
    };
    module2.exports = TogglePrompt;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/quiz.js
var require_quiz = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/quiz.js"(exports2, module2) {
    "use strict";
    var SelectPrompt = require_select();
    var Quiz = class extends SelectPrompt {
      constructor(options) {
        super(options);
        if (typeof this.options.correctChoice !== "number" || this.options.correctChoice < 0) {
          throw new Error("Please specify the index of the correct answer from the list of choices");
        }
      }
      async toChoices(value, parent) {
        let choices = await super.toChoices(value, parent);
        if (choices.length < 2) {
          throw new Error("Please give at least two choices to the user");
        }
        if (this.options.correctChoice > choices.length) {
          throw new Error("Please specify the index of the correct answer from the list of choices");
        }
        return choices;
      }
      check(state) {
        return state.index === this.options.correctChoice;
      }
      async result(selected) {
        return {
          selectedAnswer: selected,
          correctAnswer: this.options.choices[this.options.correctChoice].value,
          correct: await this.check(this.state)
        };
      }
    };
    module2.exports = Quiz;
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/index.js
var require_prompts = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/prompts/index.js"(exports2) {
    "use strict";
    var utils = require_utils();
    var define = (key, fn) => {
      utils.defineExport(exports2, key, fn);
      utils.defineExport(exports2, key.toLowerCase(), fn);
    };
    define("AutoComplete", () => require_autocomplete());
    define("BasicAuth", () => require_basicauth());
    define("Confirm", () => require_confirm());
    define("Editable", () => require_editable());
    define("Form", () => require_form());
    define("Input", () => require_input());
    define("Invisible", () => require_invisible());
    define("List", () => require_list());
    define("MultiSelect", () => require_multiselect());
    define("Numeral", () => require_numeral());
    define("Password", () => require_password());
    define("Scale", () => require_scale());
    define("Select", () => require_select());
    define("Snippet", () => require_snippet());
    define("Sort", () => require_sort());
    define("Survey", () => require_survey());
    define("Text", () => require_text());
    define("Toggle", () => require_toggle());
    define("Quiz", () => require_quiz());
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/types/index.js
var require_types = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/lib/types/index.js"(exports2, module2) {
    module2.exports = {
      ArrayPrompt: require_array(),
      AuthPrompt: require_auth(),
      BooleanPrompt: require_boolean(),
      NumberPrompt: require_number(),
      StringPrompt: require_string()
    };
  }
});

// ../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/index.js
var require_enquirer = __commonJS({
  "../../node_modules/.pnpm/enquirer@2.3.6/node_modules/enquirer/index.js"(exports2, module2) {
    "use strict";
    var assert = require("assert");
    var Events = require("events");
    var utils = require_utils();
    var Enquirer = class extends Events {
      constructor(options, answers) {
        super();
        this.options = utils.merge({}, options);
        this.answers = { ...answers };
      }
      register(type, fn) {
        if (utils.isObject(type)) {
          for (let key of Object.keys(type))
            this.register(key, type[key]);
          return this;
        }
        assert.equal(typeof fn, "function", "expected a function");
        let name = type.toLowerCase();
        if (fn.prototype instanceof this.Prompt) {
          this.prompts[name] = fn;
        } else {
          this.prompts[name] = fn(this.Prompt, this);
        }
        return this;
      }
      async prompt(questions = []) {
        for (let question of [].concat(questions)) {
          try {
            if (typeof question === "function")
              question = await question.call(this);
            await this.ask(utils.merge({}, this.options, question));
          } catch (err) {
            return Promise.reject(err);
          }
        }
        return this.answers;
      }
      async ask(question) {
        if (typeof question === "function") {
          question = await question.call(this);
        }
        let opts = utils.merge({}, this.options, question);
        let { type, name } = question;
        let { set, get } = utils;
        if (typeof type === "function") {
          type = await type.call(this, question, this.answers);
        }
        if (!type)
          return this.answers[name];
        assert(this.prompts[type], `Prompt "${type}" is not registered`);
        let prompt = new this.prompts[type](opts);
        let value = get(this.answers, name);
        prompt.state.answers = this.answers;
        prompt.enquirer = this;
        if (name) {
          prompt.on("submit", (value2) => {
            this.emit("answer", name, value2, prompt);
            set(this.answers, name, value2);
          });
        }
        let emit = prompt.emit.bind(prompt);
        prompt.emit = (...args) => {
          this.emit.call(this, ...args);
          return emit(...args);
        };
        this.emit("prompt", prompt, this);
        if (opts.autofill && value != null) {
          prompt.value = prompt.input = value;
          if (opts.autofill === "show") {
            await prompt.submit();
          }
        } else {
          value = prompt.value = await prompt.run();
        }
        return value;
      }
      use(plugin) {
        plugin.call(this, this);
        return this;
      }
      set Prompt(value) {
        this._Prompt = value;
      }
      get Prompt() {
        return this._Prompt || this.constructor.Prompt;
      }
      get prompts() {
        return this.constructor.prompts;
      }
      static set Prompt(value) {
        this._Prompt = value;
      }
      static get Prompt() {
        return this._Prompt || require_prompt();
      }
      static get prompts() {
        return require_prompts();
      }
      static get types() {
        return require_types();
      }
      static get prompt() {
        const fn = (questions, ...rest) => {
          let enquirer = new this(...rest);
          let emit = enquirer.emit.bind(enquirer);
          enquirer.emit = (...args) => {
            fn.emit(...args);
            return emit(...args);
          };
          return enquirer.prompt(questions);
        };
        utils.mixinEmitter(fn, new Events());
        return fn;
      }
    };
    utils.mixinEmitter(Enquirer, new Events());
    var prompts = Enquirer.prompts;
    for (let name of Object.keys(prompts)) {
      let key = name.toLowerCase();
      let run = (options) => new prompts[name](options).run();
      Enquirer.prompt[key] = run;
      Enquirer[key] = run;
      if (!Enquirer[name]) {
        Reflect.defineProperty(Enquirer, name, { get: () => prompts[name] });
      }
    }
    var exp = (name) => {
      utils.defineExport(Enquirer, name, () => Enquirer.types[name]);
    };
    exp("ArrayPrompt");
    exp("AuthPrompt");
    exp("BooleanPrompt");
    exp("NumberPrompt");
    exp("StringPrompt");
    module2.exports = Enquirer;
  }
});

// ../../node_modules/.pnpm/builtins@1.0.3/node_modules/builtins/builtins.json
var require_builtins = __commonJS({
  "../../node_modules/.pnpm/builtins@1.0.3/node_modules/builtins/builtins.json"(exports2, module2) {
    module2.exports = [
      "assert",
      "buffer",
      "child_process",
      "cluster",
      "console",
      "constants",
      "crypto",
      "dgram",
      "dns",
      "domain",
      "events",
      "fs",
      "http",
      "https",
      "module",
      "net",
      "os",
      "path",
      "process",
      "punycode",
      "querystring",
      "readline",
      "repl",
      "stream",
      "string_decoder",
      "timers",
      "tls",
      "tty",
      "url",
      "util",
      "v8",
      "vm",
      "zlib"
    ];
  }
});

// ../../node_modules/.pnpm/validate-npm-package-name@3.0.0/node_modules/validate-npm-package-name/index.js
var require_validate_npm_package_name = __commonJS({
  "../../node_modules/.pnpm/validate-npm-package-name@3.0.0/node_modules/validate-npm-package-name/index.js"(exports2, module2) {
    "use strict";
    var scopedPackagePattern = new RegExp("^(?:@([^/]+?)[/])?([^/]+?)$");
    var builtins = require_builtins();
    var blacklist = [
      "node_modules",
      "favicon.ico"
    ];
    var validate = module2.exports = function(name) {
      var warnings = [];
      var errors = [];
      if (name === null) {
        errors.push("name cannot be null");
        return done(warnings, errors);
      }
      if (name === void 0) {
        errors.push("name cannot be undefined");
        return done(warnings, errors);
      }
      if (typeof name !== "string") {
        errors.push("name must be a string");
        return done(warnings, errors);
      }
      if (!name.length) {
        errors.push("name length must be greater than zero");
      }
      if (name.match(/^\./)) {
        errors.push("name cannot start with a period");
      }
      if (name.match(/^_/)) {
        errors.push("name cannot start with an underscore");
      }
      if (name.trim() !== name) {
        errors.push("name cannot contain leading or trailing spaces");
      }
      blacklist.forEach(function(blacklistedName) {
        if (name.toLowerCase() === blacklistedName) {
          errors.push(blacklistedName + " is a blacklisted name");
        }
      });
      builtins.forEach(function(builtin) {
        if (name.toLowerCase() === builtin) {
          warnings.push(builtin + " is a core module name");
        }
      });
      if (name.length > 214) {
        warnings.push("name can no longer contain more than 214 characters");
      }
      if (name.toLowerCase() !== name) {
        warnings.push("name can no longer contain capital letters");
      }
      if (/[~'!()*]/.test(name.split("/").slice(-1)[0])) {
        warnings.push(`name can no longer contain special characters ("~'!()*")`);
      }
      if (encodeURIComponent(name) !== name) {
        var nameMatch = name.match(scopedPackagePattern);
        if (nameMatch) {
          var user = nameMatch[1];
          var pkg = nameMatch[2];
          if (encodeURIComponent(user) === user && encodeURIComponent(pkg) === pkg) {
            return done(warnings, errors);
          }
        }
        errors.push("name can only contain URL-friendly characters");
      }
      return done(warnings, errors);
    };
    validate.scopedPackagePattern = scopedPackagePattern;
    var done = function(warnings, errors) {
      var result = {
        validForNewPackages: errors.length === 0 && warnings.length === 0,
        validForOldPackages: errors.length === 0,
        warnings,
        errors
      };
      if (!result.warnings.length)
        delete result.warnings;
      if (!result.errors.length)
        delete result.errors;
      return result;
    };
  }
});

// ../../node_modules/.pnpm/hosted-git-info@4.0.2/node_modules/hosted-git-info/git-host-info.js
var require_git_host_info = __commonJS({
  "../../node_modules/.pnpm/hosted-git-info@4.0.2/node_modules/hosted-git-info/git-host-info.js"(exports2, module2) {
    "use strict";
    var maybeJoin = (...args) => args.every((arg) => arg) ? args.join("") : "";
    var maybeEncode = (arg) => arg ? encodeURIComponent(arg) : "";
    var defaults = {
      sshtemplate: ({ domain, user, project, committish }) => `git@${domain}:${user}/${project}.git${maybeJoin("#", committish)}`,
      sshurltemplate: ({ domain, user, project, committish }) => `git+ssh://git@${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
      browsetemplate: ({ domain, user, project, committish, treepath }) => `https://${domain}/${user}/${project}${maybeJoin("/", treepath, "/", maybeEncode(committish))}`,
      browsefiletemplate: ({ domain, user, project, committish, treepath, path, fragment, hashformat }) => `https://${domain}/${user}/${project}/${treepath}/${maybeEncode(committish || "master")}/${path}${maybeJoin("#", hashformat(fragment || ""))}`,
      docstemplate: ({ domain, user, project, treepath, committish }) => `https://${domain}/${user}/${project}${maybeJoin("/", treepath, "/", maybeEncode(committish))}#readme`,
      httpstemplate: ({ auth, domain, user, project, committish }) => `git+https://${maybeJoin(auth, "@")}${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
      filetemplate: ({ domain, user, project, committish, path }) => `https://${domain}/${user}/${project}/raw/${maybeEncode(committish) || "master"}/${path}`,
      shortcuttemplate: ({ type, user, project, committish }) => `${type}:${user}/${project}${maybeJoin("#", committish)}`,
      pathtemplate: ({ user, project, committish }) => `${user}/${project}${maybeJoin("#", committish)}`,
      bugstemplate: ({ domain, user, project }) => `https://${domain}/${user}/${project}/issues`,
      hashformat: formatHashFragment
    };
    var gitHosts = {};
    gitHosts.github = Object.assign({}, defaults, {
      protocols: ["git:", "http:", "git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "github.com",
      treepath: "tree",
      filetemplate: ({ auth, user, project, committish, path }) => `https://${maybeJoin(auth, "@")}raw.githubusercontent.com/${user}/${project}/${maybeEncode(committish) || "master"}/${path}`,
      gittemplate: ({ auth, domain, user, project, committish }) => `git://${maybeJoin(auth, "@")}${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ domain, user, project, committish }) => `https://codeload.${domain}/${user}/${project}/tar.gz/${maybeEncode(committish) || "master"}`,
      extract: (url) => {
        let [, user, project, type, committish] = url.pathname.split("/", 5);
        if (type && type !== "tree") {
          return;
        }
        if (!type) {
          committish = url.hash.slice(1);
        }
        if (project && project.endsWith(".git")) {
          project = project.slice(0, -4);
        }
        if (!user || !project) {
          return;
        }
        return { user, project, committish };
      }
    });
    gitHosts.bitbucket = Object.assign({}, defaults, {
      protocols: ["git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "bitbucket.org",
      treepath: "src",
      tarballtemplate: ({ domain, user, project, committish }) => `https://${domain}/${user}/${project}/get/${maybeEncode(committish) || "master"}.tar.gz`,
      extract: (url) => {
        let [, user, project, aux] = url.pathname.split("/", 4);
        if (["get"].includes(aux)) {
          return;
        }
        if (project && project.endsWith(".git")) {
          project = project.slice(0, -4);
        }
        if (!user || !project) {
          return;
        }
        return { user, project, committish: url.hash.slice(1) };
      }
    });
    gitHosts.gitlab = Object.assign({}, defaults, {
      protocols: ["git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "gitlab.com",
      treepath: "tree",
      httpstemplate: ({ auth, domain, user, project, committish }) => `git+https://${maybeJoin(auth, "@")}${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ domain, user, project, committish }) => `https://${domain}/${user}/${project}/repository/archive.tar.gz?ref=${maybeEncode(committish) || "master"}`,
      extract: (url) => {
        const path = url.pathname.slice(1);
        if (path.includes("/-/") || path.includes("/archive.tar.gz")) {
          return;
        }
        const segments = path.split("/");
        let project = segments.pop();
        if (project.endsWith(".git")) {
          project = project.slice(0, -4);
        }
        const user = segments.join("/");
        if (!user || !project) {
          return;
        }
        return { user, project, committish: url.hash.slice(1) };
      }
    });
    gitHosts.gist = Object.assign({}, defaults, {
      protocols: ["git:", "git+ssh:", "git+https:", "ssh:", "https:"],
      domain: "gist.github.com",
      sshtemplate: ({ domain, project, committish }) => `git@${domain}:${project}.git${maybeJoin("#", committish)}`,
      sshurltemplate: ({ domain, project, committish }) => `git+ssh://git@${domain}/${project}.git${maybeJoin("#", committish)}`,
      browsetemplate: ({ domain, project, committish }) => `https://${domain}/${project}${maybeJoin("/", maybeEncode(committish))}`,
      browsefiletemplate: ({ domain, project, committish, path, hashformat }) => `https://${domain}/${project}${maybeJoin("/", maybeEncode(committish))}${maybeJoin("#", hashformat(path))}`,
      docstemplate: ({ domain, project, committish }) => `https://${domain}/${project}${maybeJoin("/", maybeEncode(committish))}`,
      httpstemplate: ({ domain, project, committish }) => `git+https://${domain}/${project}.git${maybeJoin("#", committish)}`,
      filetemplate: ({ user, project, committish, path }) => `https://gist.githubusercontent.com/${user}/${project}/raw${maybeJoin("/", maybeEncode(committish))}/${path}`,
      shortcuttemplate: ({ type, project, committish }) => `${type}:${project}${maybeJoin("#", committish)}`,
      pathtemplate: ({ project, committish }) => `${project}${maybeJoin("#", committish)}`,
      bugstemplate: ({ domain, project }) => `https://${domain}/${project}`,
      gittemplate: ({ domain, project, committish }) => `git://${domain}/${project}.git${maybeJoin("#", committish)}`,
      tarballtemplate: ({ project, committish }) => `https://codeload.github.com/gist/${project}/tar.gz/${maybeEncode(committish) || "master"}`,
      extract: (url) => {
        let [, user, project, aux] = url.pathname.split("/", 4);
        if (aux === "raw") {
          return;
        }
        if (!project) {
          if (!user) {
            return;
          }
          project = user;
          user = null;
        }
        if (project.endsWith(".git")) {
          project = project.slice(0, -4);
        }
        return { user, project, committish: url.hash.slice(1) };
      },
      hashformat: function(fragment) {
        return fragment && "file-" + formatHashFragment(fragment);
      }
    });
    var names = Object.keys(gitHosts);
    gitHosts.byShortcut = {};
    gitHosts.byDomain = {};
    for (const name of names) {
      gitHosts.byShortcut[`${name}:`] = name;
      gitHosts.byDomain[gitHosts[name].domain] = name;
    }
    function formatHashFragment(fragment) {
      return fragment.toLowerCase().replace(/^\W+|\/|\W+$/g, "").replace(/\W+/g, "-");
    }
    module2.exports = gitHosts;
  }
});

// ../../node_modules/.pnpm/hosted-git-info@4.0.2/node_modules/hosted-git-info/git-host.js
var require_git_host = __commonJS({
  "../../node_modules/.pnpm/hosted-git-info@4.0.2/node_modules/hosted-git-info/git-host.js"(exports2, module2) {
    "use strict";
    var gitHosts = require_git_host_info();
    var GitHost = class {
      constructor(type, user, auth, project, committish, defaultRepresentation, opts = {}) {
        Object.assign(this, gitHosts[type]);
        this.type = type;
        this.user = user;
        this.auth = auth;
        this.project = project;
        this.committish = committish;
        this.default = defaultRepresentation;
        this.opts = opts;
      }
      hash() {
        return this.committish ? `#${this.committish}` : "";
      }
      ssh(opts) {
        return this._fill(this.sshtemplate, opts);
      }
      _fill(template, opts) {
        if (typeof template === "function") {
          const options = { ...this, ...this.opts, ...opts };
          if (!options.path) {
            options.path = "";
          }
          if (options.path.startsWith("/")) {
            options.path = options.path.slice(1);
          }
          if (options.noCommittish) {
            options.committish = null;
          }
          const result = template(options);
          return options.noGitPlus && result.startsWith("git+") ? result.slice(4) : result;
        }
        return null;
      }
      sshurl(opts) {
        return this._fill(this.sshurltemplate, opts);
      }
      browse(path, fragment, opts) {
        if (typeof path !== "string") {
          return this._fill(this.browsetemplate, path);
        }
        if (typeof fragment !== "string") {
          opts = fragment;
          fragment = null;
        }
        return this._fill(this.browsefiletemplate, { ...opts, fragment, path });
      }
      docs(opts) {
        return this._fill(this.docstemplate, opts);
      }
      bugs(opts) {
        return this._fill(this.bugstemplate, opts);
      }
      https(opts) {
        return this._fill(this.httpstemplate, opts);
      }
      git(opts) {
        return this._fill(this.gittemplate, opts);
      }
      shortcut(opts) {
        return this._fill(this.shortcuttemplate, opts);
      }
      path(opts) {
        return this._fill(this.pathtemplate, opts);
      }
      tarball(opts) {
        return this._fill(this.tarballtemplate, { ...opts, noCommittish: false });
      }
      file(path, opts) {
        return this._fill(this.filetemplate, { ...opts, path });
      }
      getDefaultRepresentation() {
        return this.default;
      }
      toString(opts) {
        if (this.default && typeof this[this.default] === "function") {
          return this[this.default](opts);
        }
        return this.sshurl(opts);
      }
    };
    module2.exports = GitHost;
  }
});

// ../../node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/iterator.js
var require_iterator = __commonJS({
  "../../node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/iterator.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Yallist) {
      Yallist.prototype[Symbol.iterator] = function* () {
        for (let walker = this.head; walker; walker = walker.next) {
          yield walker.value;
        }
      };
    };
  }
});

// ../../node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/yallist.js
var require_yallist = __commonJS({
  "../../node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/yallist.js"(exports2, module2) {
    "use strict";
    module2.exports = Yallist;
    Yallist.Node = Node;
    Yallist.create = Yallist;
    function Yallist(list) {
      var self = this;
      if (!(self instanceof Yallist)) {
        self = new Yallist();
      }
      self.tail = null;
      self.head = null;
      self.length = 0;
      if (list && typeof list.forEach === "function") {
        list.forEach(function(item) {
          self.push(item);
        });
      } else if (arguments.length > 0) {
        for (var i = 0, l = arguments.length; i < l; i++) {
          self.push(arguments[i]);
        }
      }
      return self;
    }
    Yallist.prototype.removeNode = function(node) {
      if (node.list !== this) {
        throw new Error("removing node which does not belong to this list");
      }
      var next = node.next;
      var prev = node.prev;
      if (next) {
        next.prev = prev;
      }
      if (prev) {
        prev.next = next;
      }
      if (node === this.head) {
        this.head = next;
      }
      if (node === this.tail) {
        this.tail = prev;
      }
      node.list.length--;
      node.next = null;
      node.prev = null;
      node.list = null;
      return next;
    };
    Yallist.prototype.unshiftNode = function(node) {
      if (node === this.head) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var head = this.head;
      node.list = this;
      node.next = head;
      if (head) {
        head.prev = node;
      }
      this.head = node;
      if (!this.tail) {
        this.tail = node;
      }
      this.length++;
    };
    Yallist.prototype.pushNode = function(node) {
      if (node === this.tail) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var tail = this.tail;
      node.list = this;
      node.prev = tail;
      if (tail) {
        tail.next = node;
      }
      this.tail = node;
      if (!this.head) {
        this.head = node;
      }
      this.length++;
    };
    Yallist.prototype.push = function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        push(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.unshift = function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        unshift(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.pop = function() {
      if (!this.tail) {
        return void 0;
      }
      var res = this.tail.value;
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.shift = function() {
      if (!this.head) {
        return void 0;
      }
      var res = this.head.value;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.forEach = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.head, i = 0; walker !== null; i++) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.next;
      }
    };
    Yallist.prototype.forEachReverse = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.prev;
      }
    };
    Yallist.prototype.get = function(n) {
      for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
        walker = walker.next;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.getReverse = function(n) {
      for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
        walker = walker.prev;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.map = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.head; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
      }
      return res;
    };
    Yallist.prototype.mapReverse = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.tail; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
      }
      return res;
    };
    Yallist.prototype.reduce = function(fn, initial) {
      var acc;
      var walker = this.head;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.head) {
        walker = this.head.next;
        acc = this.head.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i = 0; walker !== null; i++) {
        acc = fn(acc, walker.value, i);
        walker = walker.next;
      }
      return acc;
    };
    Yallist.prototype.reduceReverse = function(fn, initial) {
      var acc;
      var walker = this.tail;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.tail) {
        walker = this.tail.prev;
        acc = this.tail.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i = this.length - 1; walker !== null; i--) {
        acc = fn(acc, walker.value, i);
        walker = walker.prev;
      }
      return acc;
    };
    Yallist.prototype.toArray = function() {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.head; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.next;
      }
      return arr;
    };
    Yallist.prototype.toArrayReverse = function() {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.tail; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.prev;
      }
      return arr;
    };
    Yallist.prototype.slice = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
        walker = walker.next;
      }
      for (; walker !== null && i < to; i++, walker = walker.next) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.sliceReverse = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
        walker = walker.prev;
      }
      for (; walker !== null && i > from; i--, walker = walker.prev) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
      if (start > this.length) {
        start = this.length - 1;
      }
      if (start < 0) {
        start = this.length + start;
      }
      for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
        walker = walker.next;
      }
      var ret = [];
      for (var i = 0; walker && i < deleteCount; i++) {
        ret.push(walker.value);
        walker = this.removeNode(walker);
      }
      if (walker === null) {
        walker = this.tail;
      }
      if (walker !== this.head && walker !== this.tail) {
        walker = walker.prev;
      }
      for (var i = 0; i < nodes.length; i++) {
        walker = insert(this, walker, nodes[i]);
      }
      return ret;
    };
    Yallist.prototype.reverse = function() {
      var head = this.head;
      var tail = this.tail;
      for (var walker = head; walker !== null; walker = walker.prev) {
        var p = walker.prev;
        walker.prev = walker.next;
        walker.next = p;
      }
      this.head = tail;
      this.tail = head;
      return this;
    };
    function insert(self, node, value) {
      var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);
      if (inserted.next === null) {
        self.tail = inserted;
      }
      if (inserted.prev === null) {
        self.head = inserted;
      }
      self.length++;
      return inserted;
    }
    function push(self, item) {
      self.tail = new Node(item, self.tail, null, self);
      if (!self.head) {
        self.head = self.tail;
      }
      self.length++;
    }
    function unshift(self, item) {
      self.head = new Node(item, null, self.head, self);
      if (!self.tail) {
        self.tail = self.head;
      }
      self.length++;
    }
    function Node(value, prev, next, list) {
      if (!(this instanceof Node)) {
        return new Node(value, prev, next, list);
      }
      this.list = list;
      this.value = value;
      if (prev) {
        prev.next = this;
        this.prev = prev;
      } else {
        this.prev = null;
      }
      if (next) {
        next.prev = this;
        this.next = next;
      } else {
        this.next = null;
      }
    }
    try {
      require_iterator()(Yallist);
    } catch (er) {
    }
  }
});

// ../../node_modules/.pnpm/lru-cache@6.0.0/node_modules/lru-cache/index.js
var require_lru_cache = __commonJS({
  "../../node_modules/.pnpm/lru-cache@6.0.0/node_modules/lru-cache/index.js"(exports2, module2) {
    "use strict";
    var Yallist = require_yallist();
    var MAX = Symbol("max");
    var LENGTH = Symbol("length");
    var LENGTH_CALCULATOR = Symbol("lengthCalculator");
    var ALLOW_STALE = Symbol("allowStale");
    var MAX_AGE = Symbol("maxAge");
    var DISPOSE = Symbol("dispose");
    var NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
    var LRU_LIST = Symbol("lruList");
    var CACHE = Symbol("cache");
    var UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
    var naiveLength = () => 1;
    var LRUCache = class {
      constructor(options) {
        if (typeof options === "number")
          options = { max: options };
        if (!options)
          options = {};
        if (options.max && (typeof options.max !== "number" || options.max < 0))
          throw new TypeError("max must be a non-negative number");
        const max = this[MAX] = options.max || Infinity;
        const lc = options.length || naiveLength;
        this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
        this[ALLOW_STALE] = options.stale || false;
        if (options.maxAge && typeof options.maxAge !== "number")
          throw new TypeError("maxAge must be a number");
        this[MAX_AGE] = options.maxAge || 0;
        this[DISPOSE] = options.dispose;
        this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
        this.reset();
      }
      set max(mL) {
        if (typeof mL !== "number" || mL < 0)
          throw new TypeError("max must be a non-negative number");
        this[MAX] = mL || Infinity;
        trim(this);
      }
      get max() {
        return this[MAX];
      }
      set allowStale(allowStale) {
        this[ALLOW_STALE] = !!allowStale;
      }
      get allowStale() {
        return this[ALLOW_STALE];
      }
      set maxAge(mA) {
        if (typeof mA !== "number")
          throw new TypeError("maxAge must be a non-negative number");
        this[MAX_AGE] = mA;
        trim(this);
      }
      get maxAge() {
        return this[MAX_AGE];
      }
      set lengthCalculator(lC) {
        if (typeof lC !== "function")
          lC = naiveLength;
        if (lC !== this[LENGTH_CALCULATOR]) {
          this[LENGTH_CALCULATOR] = lC;
          this[LENGTH] = 0;
          this[LRU_LIST].forEach((hit) => {
            hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
            this[LENGTH] += hit.length;
          });
        }
        trim(this);
      }
      get lengthCalculator() {
        return this[LENGTH_CALCULATOR];
      }
      get length() {
        return this[LENGTH];
      }
      get itemCount() {
        return this[LRU_LIST].length;
      }
      rforEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].tail; walker !== null; ) {
          const prev = walker.prev;
          forEachStep(this, fn, walker, thisp);
          walker = prev;
        }
      }
      forEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].head; walker !== null; ) {
          const next = walker.next;
          forEachStep(this, fn, walker, thisp);
          walker = next;
        }
      }
      keys() {
        return this[LRU_LIST].toArray().map((k) => k.key);
      }
      values() {
        return this[LRU_LIST].toArray().map((k) => k.value);
      }
      reset() {
        if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
          this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
        }
        this[CACHE] = new Map();
        this[LRU_LIST] = new Yallist();
        this[LENGTH] = 0;
      }
      dump() {
        return this[LRU_LIST].map((hit) => isStale(this, hit) ? false : {
          k: hit.key,
          v: hit.value,
          e: hit.now + (hit.maxAge || 0)
        }).toArray().filter((h) => h);
      }
      dumpLru() {
        return this[LRU_LIST];
      }
      set(key, value, maxAge) {
        maxAge = maxAge || this[MAX_AGE];
        if (maxAge && typeof maxAge !== "number")
          throw new TypeError("maxAge must be a number");
        const now = maxAge ? Date.now() : 0;
        const len = this[LENGTH_CALCULATOR](value, key);
        if (this[CACHE].has(key)) {
          if (len > this[MAX]) {
            del(this, this[CACHE].get(key));
            return false;
          }
          const node = this[CACHE].get(key);
          const item = node.value;
          if (this[DISPOSE]) {
            if (!this[NO_DISPOSE_ON_SET])
              this[DISPOSE](key, item.value);
          }
          item.now = now;
          item.maxAge = maxAge;
          item.value = value;
          this[LENGTH] += len - item.length;
          item.length = len;
          this.get(key);
          trim(this);
          return true;
        }
        const hit = new Entry(key, value, len, now, maxAge);
        if (hit.length > this[MAX]) {
          if (this[DISPOSE])
            this[DISPOSE](key, value);
          return false;
        }
        this[LENGTH] += hit.length;
        this[LRU_LIST].unshift(hit);
        this[CACHE].set(key, this[LRU_LIST].head);
        trim(this);
        return true;
      }
      has(key) {
        if (!this[CACHE].has(key))
          return false;
        const hit = this[CACHE].get(key).value;
        return !isStale(this, hit);
      }
      get(key) {
        return get(this, key, true);
      }
      peek(key) {
        return get(this, key, false);
      }
      pop() {
        const node = this[LRU_LIST].tail;
        if (!node)
          return null;
        del(this, node);
        return node.value;
      }
      del(key) {
        del(this, this[CACHE].get(key));
      }
      load(arr) {
        this.reset();
        const now = Date.now();
        for (let l = arr.length - 1; l >= 0; l--) {
          const hit = arr[l];
          const expiresAt = hit.e || 0;
          if (expiresAt === 0)
            this.set(hit.k, hit.v);
          else {
            const maxAge = expiresAt - now;
            if (maxAge > 0) {
              this.set(hit.k, hit.v, maxAge);
            }
          }
        }
      }
      prune() {
        this[CACHE].forEach((value, key) => get(this, key, false));
      }
    };
    var get = (self, key, doUse) => {
      const node = self[CACHE].get(key);
      if (node) {
        const hit = node.value;
        if (isStale(self, hit)) {
          del(self, node);
          if (!self[ALLOW_STALE])
            return void 0;
        } else {
          if (doUse) {
            if (self[UPDATE_AGE_ON_GET])
              node.value.now = Date.now();
            self[LRU_LIST].unshiftNode(node);
          }
        }
        return hit.value;
      }
    };
    var isStale = (self, hit) => {
      if (!hit || !hit.maxAge && !self[MAX_AGE])
        return false;
      const diff = Date.now() - hit.now;
      return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
    };
    var trim = (self) => {
      if (self[LENGTH] > self[MAX]) {
        for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null; ) {
          const prev = walker.prev;
          del(self, walker);
          walker = prev;
        }
      }
    };
    var del = (self, node) => {
      if (node) {
        const hit = node.value;
        if (self[DISPOSE])
          self[DISPOSE](hit.key, hit.value);
        self[LENGTH] -= hit.length;
        self[CACHE].delete(hit.key);
        self[LRU_LIST].removeNode(node);
      }
    };
    var Entry = class {
      constructor(key, value, length, now, maxAge) {
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
      }
    };
    var forEachStep = (self, fn, node, thisp) => {
      let hit = node.value;
      if (isStale(self, hit)) {
        del(self, node);
        if (!self[ALLOW_STALE])
          hit = void 0;
      }
      if (hit)
        fn.call(thisp, hit.value, hit.key, self);
    };
    module2.exports = LRUCache;
  }
});

// ../../node_modules/.pnpm/hosted-git-info@4.0.2/node_modules/hosted-git-info/index.js
var require_hosted_git_info = __commonJS({
  "../../node_modules/.pnpm/hosted-git-info@4.0.2/node_modules/hosted-git-info/index.js"(exports2, module2) {
    "use strict";
    var url = require("url");
    var gitHosts = require_git_host_info();
    var GitHost = module2.exports = require_git_host();
    var LRU = require_lru_cache();
    var cache = new LRU({ max: 1e3 });
    var protocolToRepresentationMap = {
      "git+ssh:": "sshurl",
      "git+https:": "https",
      "ssh:": "sshurl",
      "git:": "git"
    };
    function protocolToRepresentation(protocol) {
      return protocolToRepresentationMap[protocol] || protocol.slice(0, -1);
    }
    var authProtocols = {
      "git:": true,
      "https:": true,
      "git+https:": true,
      "http:": true,
      "git+http:": true
    };
    var knownProtocols = Object.keys(gitHosts.byShortcut).concat(["http:", "https:", "git:", "git+ssh:", "git+https:", "ssh:"]);
    module2.exports.fromUrl = function(giturl, opts) {
      if (typeof giturl !== "string") {
        return;
      }
      const key = giturl + JSON.stringify(opts || {});
      if (!cache.has(key)) {
        cache.set(key, fromUrl(giturl, opts));
      }
      return cache.get(key);
    };
    function fromUrl(giturl, opts) {
      if (!giturl) {
        return;
      }
      const url2 = isGitHubShorthand(giturl) ? "github:" + giturl : correctProtocol(giturl);
      const parsed = parseGitUrl(url2);
      if (!parsed) {
        return parsed;
      }
      const gitHostShortcut = gitHosts.byShortcut[parsed.protocol];
      const gitHostDomain = gitHosts.byDomain[parsed.hostname.startsWith("www.") ? parsed.hostname.slice(4) : parsed.hostname];
      const gitHostName = gitHostShortcut || gitHostDomain;
      if (!gitHostName) {
        return;
      }
      const gitHostInfo = gitHosts[gitHostShortcut || gitHostDomain];
      let auth = null;
      if (authProtocols[parsed.protocol] && (parsed.username || parsed.password)) {
        auth = `${parsed.username}${parsed.password ? ":" + parsed.password : ""}`;
      }
      let committish = null;
      let user = null;
      let project = null;
      let defaultRepresentation = null;
      try {
        if (gitHostShortcut) {
          let pathname = parsed.pathname.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname;
          const firstAt = pathname.indexOf("@");
          if (firstAt > -1) {
            pathname = pathname.slice(firstAt + 1);
          }
          const lastSlash = pathname.lastIndexOf("/");
          if (lastSlash > -1) {
            user = decodeURIComponent(pathname.slice(0, lastSlash));
            if (!user) {
              user = null;
            }
            project = decodeURIComponent(pathname.slice(lastSlash + 1));
          } else {
            project = decodeURIComponent(pathname);
          }
          if (project.endsWith(".git")) {
            project = project.slice(0, -4);
          }
          if (parsed.hash) {
            committish = decodeURIComponent(parsed.hash.slice(1));
          }
          defaultRepresentation = "shortcut";
        } else {
          if (!gitHostInfo.protocols.includes(parsed.protocol)) {
            return;
          }
          const segments = gitHostInfo.extract(parsed);
          if (!segments) {
            return;
          }
          user = segments.user && decodeURIComponent(segments.user);
          project = decodeURIComponent(segments.project);
          committish = decodeURIComponent(segments.committish);
          defaultRepresentation = protocolToRepresentation(parsed.protocol);
        }
      } catch (err) {
        if (err instanceof URIError) {
          return;
        } else {
          throw err;
        }
      }
      return new GitHost(gitHostName, user, auth, project, committish, defaultRepresentation, opts);
    }
    var correctProtocol = (arg) => {
      const firstColon = arg.indexOf(":");
      const proto = arg.slice(0, firstColon + 1);
      if (knownProtocols.includes(proto)) {
        return arg;
      }
      const firstAt = arg.indexOf("@");
      if (firstAt > -1) {
        if (firstAt > firstColon) {
          return `git+ssh://${arg}`;
        } else {
          return arg;
        }
      }
      const doubleSlash = arg.indexOf("//");
      if (doubleSlash === firstColon + 1) {
        return arg;
      }
      return arg.slice(0, firstColon + 1) + "//" + arg.slice(firstColon + 1);
    };
    var isGitHubShorthand = (arg) => {
      const firstHash = arg.indexOf("#");
      const firstSlash = arg.indexOf("/");
      const secondSlash = arg.indexOf("/", firstSlash + 1);
      const firstColon = arg.indexOf(":");
      const firstSpace = /\s/.exec(arg);
      const firstAt = arg.indexOf("@");
      const spaceOnlyAfterHash = !firstSpace || firstHash > -1 && firstSpace.index > firstHash;
      const atOnlyAfterHash = firstAt === -1 || firstHash > -1 && firstAt > firstHash;
      const colonOnlyAfterHash = firstColon === -1 || firstHash > -1 && firstColon > firstHash;
      const secondSlashOnlyAfterHash = secondSlash === -1 || firstHash > -1 && secondSlash > firstHash;
      const hasSlash = firstSlash > 0;
      const doesNotEndWithSlash = firstHash > -1 ? arg[firstHash - 1] !== "/" : !arg.endsWith("/");
      const doesNotStartWithDot = !arg.startsWith(".");
      return spaceOnlyAfterHash && hasSlash && doesNotEndWithSlash && doesNotStartWithDot && atOnlyAfterHash && colonOnlyAfterHash && secondSlashOnlyAfterHash;
    };
    var correctUrl = (giturl) => {
      const firstAt = giturl.indexOf("@");
      const lastHash = giturl.lastIndexOf("#");
      let firstColon = giturl.indexOf(":");
      let lastColon = giturl.lastIndexOf(":", lastHash > -1 ? lastHash : Infinity);
      let corrected;
      if (lastColon > firstAt) {
        corrected = giturl.slice(0, lastColon) + "/" + giturl.slice(lastColon + 1);
        firstColon = corrected.indexOf(":");
        lastColon = corrected.lastIndexOf(":");
      }
      if (firstColon === -1 && giturl.indexOf("//") === -1) {
        corrected = `git+ssh://${corrected}`;
      }
      return corrected;
    };
    var parseGitUrl = (giturl) => {
      let result;
      try {
        result = new url.URL(giturl);
      } catch (err) {
      }
      if (result) {
        return result;
      }
      const correctedUrl = correctUrl(giturl);
      try {
        result = new url.URL(correctedUrl);
      } catch (err) {
      }
      return result;
    };
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/constants.js"(exports2, module2) {
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    module2.exports = {
      SEMVER_SPEC_VERSION,
      MAX_LENGTH,
      MAX_SAFE_INTEGER,
      MAX_SAFE_COMPONENT_LENGTH
    };
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/debug.js"(exports2, module2) {
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module2.exports = debug;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/re.js
var require_re = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/re.js"(exports2, module2) {
    var { MAX_SAFE_COMPONENT_LENGTH } = require_constants();
    var debug = require_debug();
    exports2 = module2.exports = {};
    var re = exports2.re = [];
    var src = exports2.src = [];
    var t = exports2.t = {};
    var R = 0;
    var createToken = (name, value, isGlobal) => {
      const index = R++;
      debug(index, value);
      t[name] = index;
      src[index] = value;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
    createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports2.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports2.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports2.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0.0.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0.0.0-0\\s*$");
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/parse-options.js"(exports2, module2) {
    var opts = ["includePrerelease", "loose", "rtl"];
    var parseOptions = (options) => !options ? {} : typeof options !== "object" ? { loose: true } : opts.filter((k) => options[k]).reduce((options2, k) => {
      options2[k] = true;
      return options2;
    }, {});
    module2.exports = parseOptions;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/identifiers.js"(exports2, module2) {
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/classes/semver.js"(exports2, module2) {
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      inc(release, identifier) {
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier);
            this.inc("pre", identifier);
            break;
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier);
            }
            this.inc("pre", identifier);
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          case "pre":
            if (this.prerelease.length === 0) {
              this.prerelease = [0];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                this.prerelease.push(0);
              }
            }
            if (identifier) {
              if (this.prerelease[0] === identifier) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = [identifier, 0];
                }
              } else {
                this.prerelease = [identifier, 0];
              }
            }
            break;
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.format();
        this.raw = this.version;
        return this;
      }
    };
    module2.exports = SemVer;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/parse.js"(exports2, module2) {
    var { MAX_LENGTH } = require_constants();
    var { re, t } = require_re();
    var SemVer = require_semver();
    var parseOptions = require_parse_options();
    var parse = (version, options) => {
      options = parseOptions(options);
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      if (version.length > MAX_LENGTH) {
        return null;
      }
      const r = options.loose ? re[t.LOOSE] : re[t.FULL];
      if (!r.test(version)) {
        return null;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        return null;
      }
    };
    module2.exports = parse;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/valid.js"(exports2, module2) {
    var parse = require_parse();
    var valid = (version, options) => {
      const v = parse(version, options);
      return v ? v.version : null;
    };
    module2.exports = valid;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/clean.js"(exports2, module2) {
    var parse = require_parse();
    var clean = (version, options) => {
      const s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    };
    module2.exports = clean;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/inc.js"(exports2, module2) {
    var SemVer = require_semver();
    var inc = (version, release, options, identifier) => {
      if (typeof options === "string") {
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(version, options).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    };
    module2.exports = inc;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/compare.js"(exports2, module2) {
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module2.exports = compare;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/eq.js"(exports2, module2) {
    var compare = require_compare();
    var eq = (a, b, loose) => compare(a, b, loose) === 0;
    module2.exports = eq;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/diff.js"(exports2, module2) {
    var parse = require_parse();
    var eq = require_eq();
    var diff = (version1, version2) => {
      if (eq(version1, version2)) {
        return null;
      } else {
        const v1 = parse(version1);
        const v2 = parse(version2);
        const hasPre = v1.prerelease.length || v2.prerelease.length;
        const prefix = hasPre ? "pre" : "";
        const defaultResult = hasPre ? "prerelease" : "";
        for (const key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }
        return defaultResult;
      }
    };
    module2.exports = diff;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/major.js
var require_major = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/major.js"(exports2, module2) {
    var SemVer = require_semver();
    var major = (a, loose) => new SemVer(a, loose).major;
    module2.exports = major;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/minor.js"(exports2, module2) {
    var SemVer = require_semver();
    var minor = (a, loose) => new SemVer(a, loose).minor;
    module2.exports = minor;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/patch.js"(exports2, module2) {
    var SemVer = require_semver();
    var patch = (a, loose) => new SemVer(a, loose).patch;
    module2.exports = patch;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/prerelease.js"(exports2, module2) {
    var parse = require_parse();
    var prerelease = (version, options) => {
      const parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    module2.exports = prerelease;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/rcompare.js"(exports2, module2) {
    var compare = require_compare();
    var rcompare = (a, b, loose) => compare(b, a, loose);
    module2.exports = rcompare;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/compare-loose.js"(exports2, module2) {
    var compare = require_compare();
    var compareLoose = (a, b) => compare(a, b, true);
    module2.exports = compareLoose;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/compare-build.js"(exports2, module2) {
    var SemVer = require_semver();
    var compareBuild = (a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    module2.exports = compareBuild;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/sort.js
var require_sort2 = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/sort.js"(exports2, module2) {
    var compareBuild = require_compare_build();
    var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
    module2.exports = sort;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/rsort.js"(exports2, module2) {
    var compareBuild = require_compare_build();
    var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
    module2.exports = rsort;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/gt.js"(exports2, module2) {
    var compare = require_compare();
    var gt = (a, b, loose) => compare(a, b, loose) > 0;
    module2.exports = gt;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/lt.js"(exports2, module2) {
    var compare = require_compare();
    var lt = (a, b, loose) => compare(a, b, loose) < 0;
    module2.exports = lt;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/neq.js"(exports2, module2) {
    var compare = require_compare();
    var neq = (a, b, loose) => compare(a, b, loose) !== 0;
    module2.exports = neq;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/gte.js"(exports2, module2) {
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module2.exports = gte;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/lte.js"(exports2, module2) {
    var compare = require_compare();
    var lte = (a, b, loose) => compare(a, b, loose) <= 0;
    module2.exports = lte;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/cmp.js"(exports2, module2) {
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a === b;
        case "!==":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module2.exports = cmp;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/coerce.js"(exports2, module2) {
    var SemVer = require_semver();
    var parse = require_parse();
    var { re, t } = require_re();
    var coerce = (version, options) => {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version === "number") {
        version = String(version);
      }
      if (typeof version !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version.match(re[t.COERCE]);
      } else {
        let next;
        while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
        }
        re[t.COERCERTL].lastIndex = -1;
      }
      if (match === null)
        return null;
      return parse(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
    };
    module2.exports = coerce;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/classes/range.js
var require_range = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/classes/range.js"(exports2, module2) {
    var Range = class {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.format();
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range;
        this.set = range.split(/\s*\|\|\s*/).map((range2) => this.parseRange(range2.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${range}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0)
            this.set = [first];
          else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.format();
      }
      format() {
        this.range = this.set.map((comps) => {
          return comps.join(" ").trim();
        }).join("||").trim();
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        range = range.trim();
        const memoOpts = Object.keys(this.options).join(",");
        const memoKey = `parseRange:${memoOpts}:${range}`;
        const cached = cache.get(memoKey);
        if (cached)
          return cached;
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range, re[t.COMPARATORTRIM]);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        range = range.split(/\s+/).join(" ");
        const compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options)).filter(this.options.loose ? (comp) => !!comp.match(compRe) : () => true).map((comp) => new Comparator(comp, this.options));
        const l = rangeList.length;
        const rangeMap = new Map();
        for (const comp of rangeList) {
          if (isNullSet(comp))
            return [comp];
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has(""))
          rangeMap.delete("");
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      test(version) {
        if (!version) {
          return false;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module2.exports = Range;
    var LRU = require_lru_cache();
    var cache = new LRU({ max: 1e3 });
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver();
    var {
      re,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var replaceTildes = (comp, options) => comp.trim().split(/\s+/).map((comp2) => {
      return replaceTilde(comp2, options);
    }).join(" ");
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => comp.trim().split(/\s+/).map((comp2) => {
      return replaceCaret(comp2, options);
    }).join(" ");
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((comp2) => {
        return replaceXRange(comp2, options);
      }).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<")
            pr = "-0";
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/classes/comparator.js"(exports2, module2) {
    var ANY = Symbol("SemVer ANY");
    var Comparator = class {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version) {
        debug("Comparator.test", version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
          return true;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (!options || typeof options !== "object") {
          options = {
            loose: !!options,
            includePrerelease: false
          };
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range(this.value, options).test(comp.semver);
        }
        const sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
        const sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
        const sameSemVer = this.semver.version === comp.semver.version;
        const differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
        const oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && (this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<");
        const oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && (this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">");
        return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
      }
    };
    module2.exports = Comparator;
    var parseOptions = require_parse_options();
    var { re, t } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver();
    var Range = require_range();
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/satisfies.js"(exports2, module2) {
    var Range = require_range();
    var satisfies = (version, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    };
    module2.exports = satisfies;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/to-comparators.js"(exports2, module2) {
    var Range = require_range();
    var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
    module2.exports = toComparators;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/max-satisfying.js"(exports2, module2) {
    var SemVer = require_semver();
    var Range = require_range();
    var maxSatisfying = (versions, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    };
    module2.exports = maxSatisfying;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/min-satisfying.js"(exports2, module2) {
    var SemVer = require_semver();
    var Range = require_range();
    var minSatisfying = (versions, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    };
    module2.exports = minSatisfying;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/min-version.js"(exports2, module2) {
    var SemVer = require_semver();
    var Range = require_range();
    var gt = require_gt();
    var minVersion = (range, loose) => {
      range = new Range(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            case "":
            case ">=":
              if (!setMin || gt(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt(minver, setMin)))
          minver = setMin;
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    };
    module2.exports = minVersion;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/valid.js"(exports2, module2) {
    var Range = require_range();
    var validRange = (range, options) => {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    };
    module2.exports = validRange;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/outside.js"(exports2, module2) {
    var SemVer = require_semver();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range = require_range();
    var satisfies = require_satisfies();
    var gt = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = (version, range, hilo, options) => {
      version = new SemVer(version, options);
      range = new Range(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    };
    module2.exports = outside;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/gtr.js"(exports2, module2) {
    var outside = require_outside();
    var gtr = (version, range, options) => outside(version, range, ">", options);
    module2.exports = gtr;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/ltr.js"(exports2, module2) {
    var outside = require_outside();
    var ltr = (version, range, options) => outside(version, range, "<", options);
    module2.exports = ltr;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/intersects.js"(exports2, module2) {
    var Range = require_range();
    var intersects = (r1, r2, options) => {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2);
    };
    module2.exports = intersects;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/simplify.js"(exports2, module2) {
    var satisfies = require_satisfies();
    var compare = require_compare();
    module2.exports = (versions, range, options) => {
      const set = [];
      let min = null;
      let prev = null;
      const v = versions.sort((a, b) => compare(a, b, options));
      for (const version of v) {
        const included = satisfies(version, range, options);
        if (included) {
          prev = version;
          if (!min)
            min = version;
        } else {
          if (prev) {
            set.push([min, prev]);
          }
          prev = null;
          min = null;
        }
      }
      if (min)
        set.push([min, null]);
      const ranges = [];
      for (const [min2, max] of set) {
        if (min2 === max)
          ranges.push(min2);
        else if (!max && min2 === v[0])
          ranges.push("*");
        else if (!max)
          ranges.push(`>=${min2}`);
        else if (min2 === v[0])
          ranges.push(`<=${max}`);
        else
          ranges.push(`${min2} - ${max}`);
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/subset.js"(exports2, module2) {
    var Range = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies = require_satisfies();
    var compare = require_compare();
    var subset = (sub, dom, options = {}) => {
      if (sub === dom)
        return true;
      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;
      OUTER:
        for (const simpleSub of sub.set) {
          for (const simpleDom of dom.set) {
            const isSub = simpleSubset(simpleSub, simpleDom, options);
            sawNonNull = sawNonNull || isSub !== null;
            if (isSub)
              continue OUTER;
          }
          if (sawNonNull)
            return false;
        }
      return true;
    };
    var simpleSubset = (sub, dom, options) => {
      if (sub === dom)
        return true;
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY)
          return true;
        else if (options.includePrerelease)
          sub = [new Comparator(">=0.0.0-0")];
        else
          sub = [new Comparator(">=0.0.0")];
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease)
          return true;
        else
          dom = [new Comparator(">=0.0.0")];
      }
      const eqSet = new Set();
      let gt, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=")
          gt = higherGT(gt, c, options);
        else if (c.operator === "<" || c.operator === "<=")
          lt = lowerLT(lt, c, options);
        else
          eqSet.add(c.semver);
      }
      if (eqSet.size > 1)
        return null;
      let gtltComp;
      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0)
          return null;
        else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<="))
          return null;
      }
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options))
          return null;
        if (lt && !satisfies(eq, String(lt), options))
          return null;
        for (const c of dom) {
          if (!satisfies(eq, String(c), options))
            return false;
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt)
              return false;
          } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options))
            return false;
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt)
              return false;
          } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options))
            return false;
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0)
          return false;
      }
      if (gt && hasDomLT && !lt && gtltComp !== 0)
        return false;
      if (lt && hasDomGT && !gt && gtltComp !== 0)
        return false;
      if (needDomGTPre || needDomLTPre)
        return false;
      return true;
    };
    var higherGT = (a, b, options) => {
      if (!a)
        return b;
      const comp = compare(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    };
    var lowerLT = (a, b, options) => {
      if (!a)
        return b;
      const comp = compare(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    };
    module2.exports = subset;
  }
});

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/index.js
var require_semver2 = __commonJS({
  "../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/index.js"(exports2, module2) {
    var internalRe = require_re();
    module2.exports = {
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: require_constants().SEMVER_SPEC_VERSION,
      SemVer: require_semver(),
      compareIdentifiers: require_identifiers().compareIdentifiers,
      rcompareIdentifiers: require_identifiers().rcompareIdentifiers,
      parse: require_parse(),
      valid: require_valid(),
      clean: require_clean(),
      inc: require_inc(),
      diff: require_diff(),
      major: require_major(),
      minor: require_minor(),
      patch: require_patch(),
      prerelease: require_prerelease(),
      compare: require_compare(),
      rcompare: require_rcompare(),
      compareLoose: require_compare_loose(),
      compareBuild: require_compare_build(),
      sort: require_sort2(),
      rsort: require_rsort(),
      gt: require_gt(),
      lt: require_lt(),
      eq: require_eq(),
      neq: require_neq(),
      gte: require_gte(),
      lte: require_lte(),
      cmp: require_cmp(),
      coerce: require_coerce(),
      Comparator: require_comparator(),
      Range: require_range(),
      satisfies: require_satisfies(),
      toComparators: require_to_comparators(),
      maxSatisfying: require_max_satisfying(),
      minSatisfying: require_min_satisfying(),
      minVersion: require_min_version(),
      validRange: require_valid2(),
      outside: require_outside(),
      gtr: require_gtr(),
      ltr: require_ltr(),
      intersects: require_intersects(),
      simplifyRange: require_simplify(),
      subset: require_subset()
    };
  }
});

// ../../node_modules/.pnpm/@zkochan+npm-package-arg@2.0.1/node_modules/@zkochan/npm-package-arg/npa.js
var require_npa = __commonJS({
  "../../node_modules/.pnpm/@zkochan+npm-package-arg@2.0.1/node_modules/@zkochan/npm-package-arg/npa.js"(exports2, module2) {
    "use strict";
    module2.exports = npa;
    module2.exports.resolve = resolve;
    module2.exports.Result = Result;
    var url;
    var HostedGit;
    var semver;
    var path;
    var validatePackageName;
    var os;
    var isWindows = process.platform === "win32" || global.FAKE_WINDOWS;
    var hasSlashes = isWindows ? /\\|[/]/ : /[/]/;
    var isURL = /^(?:git[+])?[a-z]+:/i;
    var isFilename = /[.](?:tgz|tar.gz|tar)$/i;
    function npa(arg, where) {
      let name;
      let spec;
      if (typeof arg === "object") {
        if (arg instanceof Result && (!where || where === arg.where)) {
          return arg;
        } else if (arg.name && arg.rawSpec) {
          return npa.resolve(arg.name, arg.rawSpec, where || arg.where);
        } else {
          return npa(arg.raw, where || arg.where);
        }
      }
      const nameEndsAt = arg[0] === "@" ? arg.slice(1).indexOf("@") + 1 : arg.indexOf("@");
      const namePart = nameEndsAt > 0 ? arg.slice(0, nameEndsAt) : arg;
      if (isURL.test(arg)) {
        spec = arg;
      } else if (namePart[0] !== "@" && (hasSlashes.test(namePart) || isFilename.test(namePart))) {
        spec = arg;
      } else if (nameEndsAt > 0) {
        name = namePart;
        spec = arg.slice(nameEndsAt + 1);
      } else {
        if (!validatePackageName)
          validatePackageName = require_validate_npm_package_name();
        const valid = validatePackageName(arg);
        if (valid.validForOldPackages) {
          name = arg;
        } else {
          spec = arg;
        }
      }
      return resolve(name, spec, where, arg);
    }
    var isFilespec = isWindows ? /^(?:[.]|~[/]|[/\\]|[a-zA-Z]:)/ : /^(?:[.]|~[/]|[/]|[a-zA-Z]:)/;
    function resolve(name, spec, where, arg) {
      const res = new Result({
        raw: arg,
        name,
        rawSpec: spec,
        fromArgument: arg != null
      });
      if (name)
        res.setName(name);
      if (spec && (isFilespec.test(spec) || /^file:/i.test(spec))) {
        return fromFile(res, where);
      }
      if (spec && spec.startsWith("npm:")) {
        return Object.assign(npa(spec.substr(4), where), {
          alias: name,
          raw: res.raw,
          rawSpec: res.rawSpec
        });
      }
      if (!HostedGit)
        HostedGit = require_hosted_git_info();
      const hosted = HostedGit.fromUrl(spec, { noGitPlus: true, noCommittish: true });
      if (hosted) {
        return fromHostedGit(res, hosted);
      } else if (spec && isURL.test(spec)) {
        return fromURL(res);
      } else if (spec && (hasSlashes.test(spec) || isFilename.test(spec))) {
        return fromFile(res, where);
      } else {
        return fromRegistry(res);
      }
    }
    function invalidPackageName(name, valid) {
      const err = new Error(`Invalid package name "${name}": ${valid.errors.join("; ")}`);
      err.code = "EINVALIDPACKAGENAME";
      return err;
    }
    function invalidTagName(name) {
      const err = new Error(`Invalid tag name "${name}": Tags may not have any characters that encodeURIComponent encodes.`);
      err.code = "EINVALIDTAGNAME";
      return err;
    }
    function Result(opts) {
      this.type = opts.type;
      this.registry = opts.registry;
      this.where = opts.where;
      if (opts.raw == null) {
        this.raw = opts.name ? opts.name + "@" + opts.rawSpec : opts.rawSpec;
      } else {
        this.raw = opts.raw;
      }
      this.name = void 0;
      this.escapedName = void 0;
      this.scope = void 0;
      this.rawSpec = opts.rawSpec == null ? "" : opts.rawSpec;
      this.saveSpec = opts.saveSpec;
      this.fetchSpec = opts.fetchSpec;
      if (opts.name)
        this.setName(opts.name);
      this.gitRange = opts.gitRange;
      this.gitCommittish = opts.gitCommittish;
      this.hosted = opts.hosted;
    }
    Result.prototype = {};
    Result.prototype.setName = function(name) {
      if (!validatePackageName)
        validatePackageName = require_validate_npm_package_name();
      const valid = validatePackageName(name);
      if (!valid.validForOldPackages) {
        throw invalidPackageName(name, valid);
      }
      this.name = name;
      this.scope = name[0] === "@" ? name.slice(0, name.indexOf("/")) : void 0;
      this.escapedName = name.replace("/", "%2f");
      return this;
    };
    Result.prototype.toString = function() {
      const full = [];
      if (this.name != null && this.name !== "")
        full.push(this.name);
      const spec = this.saveSpec || this.fetchSpec || this.rawSpec;
      if (spec != null && spec !== "")
        full.push(spec);
      return full.length ? full.join("@") : this.raw;
    };
    Result.prototype.toJSON = function() {
      const result = Object.assign({}, this);
      delete result.hosted;
      return result;
    };
    function setGitCommittish(res, committish) {
      if (committish != null && committish.length >= 7 && committish.slice(0, 7) === "semver:") {
        res.gitRange = decodeURIComponent(committish.slice(7));
        res.gitCommittish = null;
      } else {
        res.gitCommittish = committish === "" ? null : committish;
      }
      return res;
    }
    var isAbsolutePath = /^[/]|^[A-Za-z]:/;
    function resolvePath(where, spec) {
      if (isAbsolutePath.test(spec))
        return spec;
      if (!path)
        path = require("path");
      return path.resolve(where, spec);
    }
    function isAbsolute(dir) {
      if (dir[0] === "/")
        return true;
      if (/^[A-Za-z]:/.test(dir))
        return true;
      return false;
    }
    function fromFile(res, where) {
      if (!where)
        where = process.cwd();
      res.type = isFilename.test(res.rawSpec) ? "file" : "directory";
      res.where = where;
      const spec = res.rawSpec.replace(/\\/g, "/").replace(/^file:[/]*([A-Za-z]:)/, "$1").replace(/^file:(?:[/]*([~./]))?/, "$1");
      if (/^~[/]/.test(spec)) {
        if (!os)
          os = require("os");
        res.fetchSpec = resolvePath(os.homedir(), spec.slice(2));
        res.saveSpec = "file:" + spec;
      } else {
        res.fetchSpec = resolvePath(where, spec);
        if (isAbsolute(spec)) {
          res.saveSpec = "file:" + spec;
        } else {
          if (!path)
            path = require("path");
          res.saveSpec = "file:" + path.relative(where, res.fetchSpec);
        }
      }
      return res;
    }
    function fromHostedGit(res, hosted) {
      res.type = "git";
      res.hosted = hosted;
      res.saveSpec = hosted.toString({ noGitPlus: false, noCommittish: false });
      res.fetchSpec = hosted.getDefaultRepresentation() === "shortcut" ? null : hosted.toString();
      return setGitCommittish(res, hosted.committish);
    }
    function unsupportedURLType(protocol, spec) {
      const err = new Error(`Unsupported URL Type "${protocol}": ${spec}`);
      err.code = "EUNSUPPORTEDPROTOCOL";
      return err;
    }
    function matchGitScp(spec) {
      const matched = spec.match(/^git\+ssh:\/\/([^:#]+:[^#]+(?:\.git)?)(?:#(.*))?$/i);
      return matched && !matched[1].match(/:[0-9]+\/?.*$/i) && {
        fetchSpec: matched[1],
        gitCommittish: matched[2] == null ? null : matched[2]
      };
    }
    function fromURL(res) {
      if (!url)
        url = require("url");
      const urlparse = url.parse(res.rawSpec);
      res.saveSpec = res.rawSpec;
      switch (urlparse.protocol) {
        case "git:":
        case "git+http:":
        case "git+https:":
        case "git+rsync:":
        case "git+ftp:":
        case "git+file:":
        case "git+ssh:": {
          res.type = "git";
          const match = urlparse.protocol === "git+ssh:" && matchGitScp(res.rawSpec);
          if (match) {
            res.fetchSpec = match.fetchSpec;
            res.gitCommittish = match.gitCommittish;
          } else {
            setGitCommittish(res, urlparse.hash != null ? urlparse.hash.slice(1) : "");
            urlparse.protocol = urlparse.protocol.replace(/^git[+]/, "");
            delete urlparse.hash;
            res.fetchSpec = url.format(urlparse);
          }
          break;
        }
        case "http:":
        case "https:":
          res.type = "remote";
          res.fetchSpec = res.saveSpec;
          break;
        default:
          throw unsupportedURLType(urlparse.protocol, res.rawSpec);
      }
      return res;
    }
    function fromRegistry(res) {
      res.registry = true;
      const spec = res.rawSpec === "" ? "latest" : res.rawSpec;
      res.saveSpec = null;
      res.fetchSpec = spec;
      if (!semver)
        semver = require_semver2();
      const version = semver.valid(spec, true);
      const range = semver.validRange(spec, true);
      if (version) {
        res.type = "version";
      } else if (range) {
        res.type = "range";
      } else {
        if (encodeURIComponent(spec) !== spec) {
          throw invalidTagName(spec);
        }
        res.type = "tag";
      }
      return res;
    }
  }
});

// ../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/parse-args.js
var require_parse_args = __commonJS({
  "../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/parse-args.js"(exports2, module2) {
    "use strict";
    var npa;
    var path = require("path");
    module2.exports = parseArgs;
    function parseArgs(argv, defaultNpm) {
      argv = argv || process.argv;
      if (argv.length > 2 && argv[2][0] !== "-") {
        return fastPathArgs(argv, defaultNpm);
      }
      npa = require_npa();
      const parser = yargsParser(argv, defaultNpm);
      const opts = parser.getOptions();
      const bools = new Set(opts.boolean);
      let cmdIndex;
      let hasDashDash;
      for (let i = 2; i < argv.length; i++) {
        const opt = argv[i];
        if (opt === "--") {
          hasDashDash = true;
          break;
        } else if (opt === "--node-arg" || opt === "-n") {
          argv[i] = `${opt}=${argv[i + 1]}`;
          argv.splice(i + 1, 1);
        } else if (opt[0] === "-") {
          if (opt !== "--no-install" && !bools.has(opt.replace(/^--?(no-)?/i, "")) && opt.indexOf("=") === -1) {
            i++;
          }
        } else {
          cmdIndex = i;
          break;
        }
      }
      if (cmdIndex) {
        const parsed = parser.parse(argv.slice(0, cmdIndex));
        const parsedCmd = npa(argv[cmdIndex]);
        parsed.command = parsed.package && parsedCmd.type !== "directory" ? argv[cmdIndex] : guessCmdName(parsedCmd);
        parsed.isLocal = parsedCmd.type === "directory";
        parsed.cmdOpts = argv.slice(cmdIndex + 1);
        if (typeof parsed.package === "string") {
          parsed.package = [parsed.package];
        }
        parsed.packageRequested = !!parsed.package;
        parsed.cmdHadVersion = parsed.package || parsedCmd.type === "directory" ? false : parsedCmd.name !== parsedCmd.raw;
        const pkg = parsed.package || [argv[cmdIndex]];
        parsed.p = parsed.package = pkg.map((p) => npa(p).toString());
        return parsed;
      } else {
        const parsed = parser.parse(argv);
        if (typeof parsed.package === "string") {
          parsed.package = [parsed.package];
        }
        if (parsed.call && parsed.package) {
          parsed.packageRequested = !!parsed.package;
          parsed.cmdHadVersion = false;
          const pkg = parsed.package;
          parsed.p = parsed.package = pkg.map((p) => npa(p).toString());
        } else if (parsed.call && !parsed.package) {
          parsed.packageRequested = false;
          parsed.cmdHadVersion = false;
          parsed.p = parsed.package = [];
        } else if (hasDashDash) {
          const splitCmd = parsed._.slice(2);
          const parsedCmd = npa(splitCmd[0]);
          parsed.command = parsed.package ? splitCmd[0] : guessCmdName(parsedCmd);
          parsed.cmdOpts = splitCmd.slice(1);
          parsed.packageRequested = !!parsed.package;
          parsed.cmdHadVersion = parsed.package ? false : parsedCmd.name !== parsedCmd.raw;
          const pkg = parsed.package || [splitCmd[0]];
          parsed.p = parsed.package = pkg.map((p) => npa(p).toString());
        }
        return parsed;
      }
    }
    function fastPathArgs(argv, defaultNpm) {
      let parsedCmd;
      let pkg;
      if (argv[2].match(/^[a-z0-9_-]+$/i)) {
        parsedCmd = { registry: true, name: argv[2], raw: argv[2] };
        pkg = [`${argv[2]}@latest`];
      } else {
        npa = require_npa();
        parsedCmd = npa(argv[2]);
        if (parsedCmd.type === "directory") {
          pkg = [];
        } else {
          pkg = [parsedCmd.toString()];
        }
      }
      return {
        command: guessCmdName(parsedCmd),
        cmdOpts: argv.slice(3),
        packageRequested: false,
        isLocal: parsedCmd.type === "directory",
        cmdHadVersion: parsedCmd.name !== parsedCmd.raw && parsedCmd.type !== "directory",
        package: pkg,
        p: pkg,
        shell: false,
        noYargs: true,
        npm: defaultNpm || "npm"
      };
    }
    parseArgs.showHelp = () => require_yargs3().showHelp();
    module2.exports._guessCmdName = guessCmdName;
    function guessCmdName(spec) {
      if (typeof spec === "string") {
        if (!npa) {
          npa = require_npa();
        }
        spec = npa(spec);
      }
      if (spec.scope) {
        return spec.name.slice(spec.scope.length + 1);
      } else if (spec.registry) {
        return spec.name;
      } else if (spec.hosted && spec.hosted.project) {
        return spec.hosted.project;
      } else if (spec.type === "git") {
        const match = spec.fetchSpec.match(/([a-z0-9-]+)(?:\.git)?$/i);
        return match[1];
      } else if (spec.type === "directory") {
        return spec.raw;
      } else if (spec.type === "file" || spec.type === "remote") {
        let ext = path.extname(spec.fetchSpec);
        if (ext === ".gz") {
          ext = path.extname(path.basename(spec.fetchSpec, ext)) + ext;
        }
        return path.basename(spec.fetchSpec, ext).replace(/-\d+\.\d+\.\d+(?:-[a-z0-9.\-+]+)?$/i, "");
      }
      console.error(Y()`Unable to guess a binary name from ${spec.raw}. Please use --package.`);
      return null;
    }
    function yargsParser(argv, defaultNpm) {
      const usage = `
  npx [${Y()`options`}] <${Y()`command`}>[@${Y()`version`}] [${Y()`command-arg`}]...

  npx [${Y()`options`}] [-p|--package <${Y()`package`}>]... <${Y()`command`}> [${Y()`command-arg`}]...

  npx [${Y()`options`}] -c '<${Y()`command-string`}>'

  npx --shell-auto-fallback [${Y()`shell`}]
  `;
      return require_yargs3().usage(Y()`Execute binaries from npm packages.\n${usage}`).option("package", {
        alias: "p",
        type: "string",
        describe: Y()`Package to be installed.`
      }).option("cache", {
        type: "string",
        describe: Y()`Location of the npm cache.`
      }).option("always-spawn", {
        describe: Y()`Always spawn a child process to execute the command.`,
        type: "boolean"
      }).option("no-install", {
        type: "boolean",
        describe: Y()`Skip installation if a package is missing.`
      }).option("userconfig", {
        type: "string",
        describe: Y()`Path to user npmrc.`
      }).option("call", {
        alias: "c",
        type: "string",
        describe: Y()`Execute string as if inside \`npm run-script\`.`
      }).option("shell", {
        alias: "s",
        type: "string",
        describe: Y()`Shell to execute the command with, if any.`,
        default: false
      }).option("shell-auto-fallback", {
        choices: ["", "bash", "fish", "zsh"],
        describe: Y()`Generate shell code to use npx as the "command not found" fallback.`,
        requireArg: false,
        type: "string"
      }).option("ignore-existing", {
        describe: Y()`Ignores existing binaries in $PATH, or in the local project. This forces npx to do a temporary install and use the latest version.`,
        type: "boolean"
      }).option("quiet", {
        alias: "q",
        describe: Y()`Suppress output from npx itself. Subcommands will not be affected.`,
        type: "boolean"
      }).option("yes", {
        alias: "y",
        describe: "Install the package if it is not available.",
        type: "boolean"
      }).option("no", {
        describe: "Do not install any new packages.",
        type: "boolean"
      }).option("npm", {
        describe: Y()`npm binary to use for internal operations.`,
        type: "string",
        default: defaultNpm || "npm"
      }).option("node-arg", {
        alias: "n",
        type: "string",
        describe: Y()`Extra node argument when calling a node binary.`
      }).version().alias("version", "v").help().alias("help", "h").epilogue(Y()`For the full documentation, see the manual page for npx(1).`);
    }
    var _y;
    function Y() {
      if (!_y) {
        _y = require_y();
      }
      return _y;
    }
  }
});

// ../../node_modules/.pnpm/path-name@1.0.0/node_modules/path-name/index.js
var require_path_name = __commonJS({
  "../../node_modules/.pnpm/path-name@1.0.0/node_modules/path-name/index.js"(exports2, module2) {
    "use strict";
    var PATH;
    if (process.platform === "win32") {
      PATH = "Path";
      Object.keys(process.env).forEach((e) => {
        if (e.match(/^PATH$/i)) {
          PATH = e;
        }
      });
    } else {
      PATH = "PATH";
    }
    module2.exports = PATH;
  }
});

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js
var require_windows = __commonJS({
  "../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js"(exports2, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs = require("fs");
    function checkPathExt(path, options) {
      var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
      if (!pathext) {
        return true;
      }
      pathext = pathext.split(";");
      if (pathext.indexOf("") !== -1) {
        return true;
      }
      for (var i = 0; i < pathext.length; i++) {
        var p = pathext[i].toLowerCase();
        if (p && path.substr(-p.length).toLowerCase() === p) {
          return true;
        }
      }
      return false;
    }
    function checkStat(stat, path, options) {
      if (!stat.isSymbolicLink() && !stat.isFile()) {
        return false;
      }
      return checkPathExt(path, options);
    }
    function isexe(path, options, cb) {
      fs.stat(path, function(er, stat) {
        cb(er, er ? false : checkStat(stat, path, options));
      });
    }
    function sync(path, options) {
      return checkStat(fs.statSync(path), path, options);
    }
  }
});

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js
var require_mode = __commonJS({
  "../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js"(exports2, module2) {
    module2.exports = isexe;
    isexe.sync = sync;
    var fs = require("fs");
    function isexe(path, options, cb) {
      fs.stat(path, function(er, stat) {
        cb(er, er ? false : checkStat(stat, options));
      });
    }
    function sync(path, options) {
      return checkStat(fs.statSync(path), options);
    }
    function checkStat(stat, options) {
      return stat.isFile() && checkMode(stat, options);
    }
    function checkMode(stat, options) {
      var mod = stat.mode;
      var uid = stat.uid;
      var gid = stat.gid;
      var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
      var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
      var u = parseInt("100", 8);
      var g = parseInt("010", 8);
      var o = parseInt("001", 8);
      var ug = u | g;
      var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
      return ret;
    }
  }
});

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js
var require_isexe = __commonJS({
  "../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js"(exports2, module2) {
    var fs = require("fs");
    var core;
    if (process.platform === "win32" || global.TESTING_WINDOWS) {
      core = require_windows();
    } else {
      core = require_mode();
    }
    module2.exports = isexe;
    isexe.sync = sync;
    function isexe(path, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      if (!cb) {
        if (typeof Promise !== "function") {
          throw new TypeError("callback not provided");
        }
        return new Promise(function(resolve, reject) {
          isexe(path, options || {}, function(er, is) {
            if (er) {
              reject(er);
            } else {
              resolve(is);
            }
          });
        });
      }
      core(path, options || {}, function(er, is) {
        if (er) {
          if (er.code === "EACCES" || options && options.ignoreErrors) {
            er = null;
            is = false;
          }
        }
        cb(er, is);
      });
    }
    function sync(path, options) {
      try {
        return core.sync(path, options || {});
      } catch (er) {
        if (options && options.ignoreErrors || er.code === "EACCES") {
          return false;
        } else {
          throw er;
        }
      }
    }
  }
});

// ../../node_modules/.pnpm/which@2.0.2/node_modules/which/which.js
var require_which = __commonJS({
  "../../node_modules/.pnpm/which@2.0.2/node_modules/which/which.js"(exports2, module2) {
    var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
    var path = require("path");
    var COLON = isWindows ? ";" : ":";
    var isexe = require_isexe();
    var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
    var getPathInfo = (cmd, opt) => {
      const colon = opt.colon || COLON;
      const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [
        ...isWindows ? [process.cwd()] : [],
        ...(opt.path || process.env.PATH || "").split(colon)
      ];
      const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
      const pathExt = isWindows ? pathExtExe.split(colon) : [""];
      if (isWindows) {
        if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
          pathExt.unshift("");
      }
      return {
        pathEnv,
        pathExt,
        pathExtExe
      };
    };
    var which = (cmd, opt, cb) => {
      if (typeof opt === "function") {
        cb = opt;
        opt = {};
      }
      if (!opt)
        opt = {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      const step = (i) => new Promise((resolve, reject) => {
        if (i === pathEnv.length)
          return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
        const ppRaw = pathEnv[i];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        resolve(subStep(p, i, 0));
      });
      const subStep = (p, i, ii) => new Promise((resolve, reject) => {
        if (ii === pathExt.length)
          return resolve(step(i + 1));
        const ext = pathExt[ii];
        isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
          if (!er && is) {
            if (opt.all)
              found.push(p + ext);
            else
              return resolve(p + ext);
          }
          return resolve(subStep(p, i, ii + 1));
        });
      });
      return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
    };
    var whichSync = (cmd, opt) => {
      opt = opt || {};
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (let i = 0; i < pathEnv.length; i++) {
        const ppRaw = pathEnv[i];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = path.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        for (let j = 0; j < pathExt.length; j++) {
          const cur = p + pathExt[j];
          try {
            const is = isexe.sync(cur, { pathExt: pathExtExe });
            if (is) {
              if (opt.all)
                found.push(cur);
              else
                return cur;
            }
          } catch (ex) {
          }
        }
      }
      if (opt.all && found.length)
        return found;
      if (opt.nothrow)
        return null;
      throw getNotFoundError(cmd);
    };
    module2.exports = which;
    which.sync = whichSync;
  }
});

// ../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/auto-fallback.js
var require_auto_fallback = __commonJS({
  "../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/auto-fallback.js"(exports2, module2) {
    "use strict";
    var Y = require_y();
    function mkPosix(opts) {
      return `
command_not_found_${opts.isBash ? "handle" : "handler"}() {
  # Do not run within a pipe
  if test ! -t 1; then
    >&2 echo "${Y`command not found: ${"$1"}`}"
    return 127
  fi
  if which npx > /dev/null; then
    echo "${Y`${"$1"} not found. Trying with npx...`}" >&2
  else
    return 127
  fi
  if ! [[ $1 =~ @ ]]; then
    npx --no-install "$@"
  else
    npx "$@"
  fi
  return $?
}`;
    }
    function mkFish(opts) {
      return `
function __fish_command_not_found_on_interactive --on-event fish_prompt
  functions --erase __fish_command_not_found_handler
  functions --erase __fish_command_not_found_setup

  function __fish_command_not_found_handler --on-event fish_command_not_found
    if which npx > /dev/null
        echo "${Y`${"$argv[1]"} not found. Trying with npx...`}" >&2
    else
        return 127
    end
    if string match -q -r @ $argv[1]
        npx $argv
    else
        npx --no-install $argv
    end
  end

  functions --erase __fish_command_not_found_on_interactive
end`;
    }
    module2.exports = autoFallback;
    function autoFallback(shell, fromEnv, opts) {
      if (shell.includes("bash")) {
        return mkPosix({ isBash: true, install: opts.install });
      }
      if (shell.includes("zsh")) {
        return mkPosix({ isBash: false, install: opts.install });
      }
      if (shell.includes("fish")) {
        return mkFish(opts);
      }
      if (fromEnv) {
        return autoFallback(fromEnv, null, opts);
      }
      console.error(Y`Only Bash, Zsh, and Fish shells are supported :(`);
    }
  }
});

// ../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/get-prefix.js
var require_get_prefix = __commonJS({
  "../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/get-prefix.js"(exports2, module2) {
    "use strict";
    var promisify = require_util().promisify;
    var path = require("path");
    var statAsync = promisify(require("fs").stat);
    module2.exports = getPrefix;
    function getPrefix(root) {
      const original = root = path.resolve(root);
      while (path.basename(root) === "node_modules") {
        root = path.dirname(root);
      }
      if (original !== root) {
        return Promise.resolve(root);
      } else {
        return Promise.resolve(getPrefixFromTree(root));
      }
    }
    function getPrefixFromTree(current) {
      if (isRootPath(current, process.platform)) {
        return false;
      } else {
        return Promise.all([
          fileExists(path.join(current, "package.json")),
          fileExists(path.join(current, "node_modules"))
        ]).then((args) => {
          const hasPkg = args[0];
          const hasModules = args[1];
          if (hasPkg || hasModules) {
            return current;
          } else {
            return getPrefixFromTree(path.dirname(current));
          }
        });
      }
    }
    module2.exports._fileExists = fileExists;
    function fileExists(f) {
      return statAsync(f).catch((err) => {
        if (err.code !== "ENOENT") {
          throw err;
        }
      });
    }
    module2.exports._isRootPath = isRootPath;
    function isRootPath(p, platform) {
      return platform === "win32" ? p.match(/^[a-z]+:[/\\]?$/i) : p === "/";
    }
  }
});

// ../../node_modules/.pnpm/dotenv@8.6.0/node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "../../node_modules/.pnpm/dotenv@8.6.0/node_modules/dotenv/lib/main.js"(exports2, module2) {
    var fs = require("fs");
    var path = require("path");
    function log(message) {
      console.log(`[dotenv][DEBUG] ${message}`);
    }
    var NEWLINE = "\n";
    var RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
    var RE_NEWLINES = /\\n/g;
    var NEWLINES_MATCH = /\n|\r|\r\n/;
    function parse(src, options) {
      const debug = Boolean(options && options.debug);
      const obj = {};
      src.toString().split(NEWLINES_MATCH).forEach(function(line, idx) {
        const keyValueArr = line.match(RE_INI_KEY_VAL);
        if (keyValueArr != null) {
          const key = keyValueArr[1];
          let val = keyValueArr[2] || "";
          const end = val.length - 1;
          const isDoubleQuoted = val[0] === '"' && val[end] === '"';
          const isSingleQuoted = val[0] === "'" && val[end] === "'";
          if (isSingleQuoted || isDoubleQuoted) {
            val = val.substring(1, end);
            if (isDoubleQuoted) {
              val = val.replace(RE_NEWLINES, NEWLINE);
            }
          } else {
            val = val.trim();
          }
          obj[key] = val;
        } else if (debug) {
          log(`did not match key and value when parsing line ${idx + 1}: ${line}`);
        }
      });
      return obj;
    }
    function config(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      let debug = false;
      if (options) {
        if (options.path != null) {
          dotenvPath = options.path;
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
        if (options.debug != null) {
          debug = true;
        }
      }
      try {
        const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug });
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else if (debug) {
            log(`"${key}" is already defined in \`process.env\` and will not be overwritten`);
          }
        });
        return { parsed };
      } catch (e) {
        return { error: e };
      }
    }
    module2.exports.config = config;
    module2.exports.parse = parse;
  }
});

// ../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/index.js
var require_libnpx = __commonJS({
  "../../node_modules/.pnpm/@zkochan+libnpx@13.1.5/node_modules/@zkochan/libnpx/index.js"(exports2, module2) {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    var promisify = require_util().promisify;
    var child = require_child();
    var enquirer = require_enquirer();
    var fs = require("fs");
    var parseArgs = require_parse_args();
    var path = require("path");
    var PATH = require_path_name();
    var which = promisify(require_which());
    module2.exports = npx;
    module2.exports.parseArgs = parseArgs;
    async function npx(argv) {
      const shell = argv["shell-auto-fallback"];
      if (shell || shell === "") {
        const fallback = require_auto_fallback()(shell, process.env.SHELL, argv);
        if (fallback) {
          return console.log(fallback);
        } else {
          process.exitCode = 1;
          return;
        }
      }
      if (!argv.call && (!argv.command || !argv.package)) {
        !argv.q && console.error(Y()`\nERROR: You must supply a command.\n`);
        !argv.q && parseArgs.showHelp();
        process.exitCode = 1;
        return;
      }
      const startTime = Date.now();
      try {
        const local = await localBinPath(process.cwd());
        if (local) {
          process.env[PATH] = `${local}${path.delimiter}${process.env[PATH]}`;
        }
        const args = await Promise.all([
          argv.command && getExistingPath(argv.command, argv),
          argv.call && local && getEnv(argv)
        ]);
        let existing = args[0];
        const newEnv = args[1];
        if (newEnv) {
          Object.assign(process.env, newEnv);
        }
        if (!existing && !argv.call || argv.packageRequested) {
          if (argv.no === true) {
            console.log(`${argv.package} is not found`);
            process.exit(1);
          }
          if (argv.yes !== true) {
            const { allowInstall } = await enquirer.prompt({
              type: "confirm",
              initial: true,
              name: "allowInstall",
              message: `Install the following package: ${argv.package}?`
            });
            if (allowInstall === false) {
              console.log("Cancelled");
              process.exit(1);
            }
          }
          const results = await ensurePackages(argv.package, argv);
          if (results && results.added && results.updated && !argv.q) {
            console.error(Y()`npx: installed ${results.added.length + results.updated.length} in ${(Date.now() - startTime) / 1e3}s`);
          }
          if (argv.command && !existing && !argv.packageRequested && argv.package.length === 1) {
            let binDirents;
            try {
              binDirents = await fs.promises.readdir(results.bin, { withFileTypes: true });
            } catch (err) {
              if (err.code === "ENOENT") {
                throw new Error(Y()`command not found: ${argv.command}`);
              } else {
                throw err;
              }
            }
            const bins = binDirents.filter((b) => b.isFile()).map((b) => b.name);
            if (bins.length < 1) {
              throw new Error(Y()`command not found: ${argv.command}`);
            }
            const cmd = new RegExp(`^${argv.command}(?:\\.cmd)?$`, "i");
            const matching = bins.find((b) => b.match(cmd));
            existing = path.resolve(results.bin, bins[matching] || bins[0]);
          }
        }
        return await execCommand(existing, argv);
      } catch (err) {
        !argv.q && console.error(err.message);
        process.exitCode = err.exitCode || 1;
      }
    }
    module2.exports._localBinPath = localBinPath;
    function localBinPath(cwd) {
      return require_get_prefix()(cwd).then((prefix) => {
        return prefix && path.join(prefix, "node_modules", ".bin");
      });
    }
    module2.exports._getEnv = getEnv;
    function getEnv(opts) {
      const args = ["run", "env", "--parseable"];
      return findNodeScript(opts.npm, { isLocal: true }).then((npmPath) => {
        if (npmPath) {
          args.unshift(child.escapeArg(opts.npm));
          return process.argv[0];
        } else {
          return opts.npm;
        }
      }).then((npmPath) => {
        return child.exec(npmPath, args);
      }).then(require_main().parse);
    }
    module2.exports._ensurePackages = ensurePackages;
    function ensurePackages(specs, opts) {
      return (opts.cache ? Promise.resolve(opts.cache) : getNpmCache(opts)).then((cache) => {
        const prefix = path.join(cache, "_npx", process.pid.toString());
        const bins = process.platform === "win32" ? prefix : path.join(prefix, "bin");
        fs.mkdirSync(prefix, { recursive: true });
        const rimraf = require_rimraf();
        process.on("exit", () => {
          try {
            fs.rmdirSync(prefix, {
              recursive: true,
              maxRetries: 3
            });
          } catch (err) {
          }
        });
        return rimraf(bins).then(() => {
          return installPackages(specs, prefix, opts);
        }).then((info) => {
          process.env[PATH] = `${bins}${path.delimiter}${process.env[PATH]}`;
          if (!info) {
            info = {};
          }
          info.prefix = prefix;
          info.bin = bins;
          return info;
        });
      });
    }
    module2.exports._getExistingPath = getExistingPath;
    function getExistingPath(command, opts) {
      if (opts.isLocal) {
        return Promise.resolve(command);
      } else if (opts.cmdHadVersion || opts.packageRequested || opts.ignoreExisting) {
        return Promise.resolve(false);
      } else {
        return which(command).catch((err) => {
          if (err.code === "ENOENT") {
            if (opts.install === false) {
              err.exitCode = 127;
              throw err;
            }
          } else {
            throw err;
          }
        });
      }
    }
    module2.exports._getNpmCache = getNpmCache;
    function getNpmCache(opts) {
      const args = ["config", "get", "cache", "--parseable"];
      if (opts.userconfig) {
        args.push("--userconfig", child.escapeArg(opts.userconfig, true));
      }
      return findNodeScript(opts.npm, { isLocal: true }).then((npmPath) => {
        if (npmPath) {
          args.unshift(child.escapeArg(opts.npm));
          return process.argv[0];
        } else {
          return opts.npm;
        }
      }).then((npmPath) => {
        return child.exec(npmPath, args);
      }).then((cache) => cache.trim());
    }
    module2.exports._buildArgs = buildArgs;
    function buildArgs(specs, prefix, opts) {
      const args = ["install"].concat(specs);
      args.push("--global", "--global-dir", prefix, "--dir", prefix);
      if (opts.userconfig)
        args.push("--userconfig", opts.userconfig);
      return args;
    }
    module2.exports._installPackages = installPackages;
    function installPackages(specs, prefix, opts) {
      const args = buildArgs(specs, prefix, opts);
      return findNodeScript(opts.npm, { isLocal: true }).then((npmPath) => {
        if (npmPath) {
          args.unshift(process.platform === "win32" ? child.escapeArg(opts.npm) : opts.npm);
          return process.argv[0];
        } else {
          return opts.npm;
        }
      }).then((npmPath) => {
        return process.platform === "win32" ? child.escapeArg(npmPath, true) : npmPath;
      }).then((npmPath) => {
        return child.spawn(npmPath, args, {
          stdio: opts.installerStdio ? opts.installerStdio : [0, "pipe", opts.q ? "ignore" : 2]
        }).then((deets) => {
          try {
            return deets.stdout ? JSON.parse(deets.stdout) : null;
          } catch (e) {
          }
        }, (err) => {
          if (err.exitCode) {
            err.message = Y()`Install for ${specs} failed with code ${err.exitCode}`;
          }
          throw err;
        });
      });
    }
    module2.exports._execCommand = execCommand;
    function execCommand(_existing, argv) {
      return findNodeScript(_existing, argv).then((existing) => {
        const argvCmdOpts = argv.cmdOpts || [];
        if (existing && !argv.alwaysSpawn && !argv.nodeArg && !argv.shell && existing !== process.argv[1]) {
          const Module = require("module");
          if (!argv.noYargs) {
            require_yargs3().reset();
          }
          process.argv = [
            process.argv[0],
            existing
          ].concat(argvCmdOpts);
          Module.runMain();
        } else if (!existing && argv.nodeArg && argv.nodeArg.length) {
          throw new Error(Y()`ERROR: --node-arg/-n can only be used on packages with node scripts.`);
        } else {
          let cmd = existing;
          let cmdOpts = argvCmdOpts;
          if (existing) {
            cmd = process.argv[0];
            if (process.platform === "win32") {
              cmd = child.escapeArg(cmd, true);
            }
            cmdOpts = argv.nodeArg;
            if (cmdOpts) {
              cmdOpts = Array.isArray(cmdOpts) ? cmdOpts : [cmdOpts];
            } else {
              cmdOpts = [];
            }
            cmdOpts = cmdOpts.reduce((acc, arg) => {
              return acc.concat(arg.split(/\s+/));
            }, []);
            cmdOpts = cmdOpts.concat(existing, argvCmdOpts);
          }
          const opts = Object.assign({}, argv, { cmdOpts });
          return child.runCommand(cmd, opts).catch((err) => {
            if (err.isOperational && err.exitCode) {
              process.exitCode = err.exitCode;
            } else {
              throw err;
            }
          });
        }
      });
    }
    module2.exports._findNodeScript = findNodeScript;
    function findNodeScript(existing, opts) {
      if (!existing) {
        return Promise.resolve(false);
      } else {
        return promisify(fs.stat)(existing).then((stat) => {
          if (opts && opts.isLocal && [".js", ".cjs"].includes(path.extname(existing))) {
            return existing;
          } else if (opts && opts.isLocal && stat.isDirectory()) {
            try {
              const pkg = require(path.resolve(existing, "package.json"));
              const target = path.resolve(existing, pkg.bin || pkg.main || "index.js");
              return findNodeScript(target, opts).then((script) => {
                if (script) {
                  return script;
                } else {
                  throw new Error(Y()`command not found: ${target}`);
                }
              });
            } catch (e) {
              throw new Error(Y()`command not found: ${existing}`);
            }
          } else if (process.platform !== "win32") {
            const bytecount = 400;
            const buf = Buffer2.alloc(bytecount);
            return promisify(fs.open)(existing, "r").then((fd) => {
              return promisify(fs.read)(fd, buf, 0, bytecount, 0).then(() => {
                return promisify(fs.close)(fd);
              }, (err) => {
                return promisify(fs.close)(fd).then(() => {
                  throw err;
                });
              });
            }).then(() => {
              const re = /#!\s*(?:\/usr\/bin\/env\s*node|\/usr\/local\/bin\/node|\/usr\/bin\/node)\s*\r?\n/i;
              return buf.toString("utf8").match(re) && existing;
            });
          } else if (process.platform === "win32") {
            const buf = Buffer2.alloc(1e3);
            return promisify(fs.open)(existing, "r").then((fd) => {
              return promisify(fs.read)(fd, buf, 0, 1e3, 0).then(() => {
                return promisify(fs.close)(fd);
              }, (err) => {
                return promisify(fs.close)(fd).then(() => {
                  throw err;
                });
              });
            }).then(() => {
              return buf.toString("utf8").trim();
            }).then((str) => {
              const cmd = /"%~dp0\\node\.exe"\s+"%~dp0\\(.*)"\s+%\*/;
              const mingw = /"\$basedir\/node"\s+"\$basedir\/(.*)"\s+"\$@"/i;
              return str.match(cmd) || str.match(mingw);
            }).then((match) => {
              return match && path.join(path.dirname(existing), match[1]);
            });
          }
        });
      }
    }
    function Y() {
      return require_y();
    }
  }
});

// lib/pnpx.js
"use strict";
var __importDefault = exports && exports.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var find_workspace_dir_1 = __importDefault(require_lib2());
var store_path_1 = __importDefault(require_lib3());
var index_1 = __importDefault(require_libnpx());
var path_name_1 = __importDefault(require_path_name());
var PNPM_PATH = path_1.default.join(__dirname, "pnpm.cjs");
(async () => {
  var _a;
  const workspaceRoot = await find_workspace_dir_1.default(process.cwd());
  if (workspaceRoot) {
    process.env[path_name_1.default] = `${path_1.default.join(workspaceRoot, "node_modules/.bin")}${path_1.default.delimiter}${(_a = process.env[path_name_1.default]) !== null && _a !== void 0 ? _a : ""}`;
  }
  index_1.default({
    ...index_1.default.parseArgs(process.argv, PNPM_PATH),
    cache: path_1.default.join(await store_path_1.default(process.cwd(), "~/.pnpm-store"), "tmp"),
    installerStdio: "inherit"
  });
})();
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
