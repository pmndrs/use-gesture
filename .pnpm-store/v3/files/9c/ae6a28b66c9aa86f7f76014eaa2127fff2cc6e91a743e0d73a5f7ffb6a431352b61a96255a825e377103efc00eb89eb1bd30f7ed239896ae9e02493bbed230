var VirtualStats = require('./virtual-stats');
var path = require('path');
var debug = require('debug')('webpack-virtual-modules');

var inode = 45000000;

function checkActivation(instance) {
  if (!instance._compiler) {
    throw new Error("You must use this plugin only after creating webpack instance!");
  }
}

function VirtualModulesPlugin(modules) {
  this._staticModules = modules;
}

function getModulePath(filePath, compiler) {
  return path.isAbsolute(filePath) ? filePath : path.join(compiler.context, filePath);
}

VirtualModulesPlugin.prototype.writeModule = function(filePath, contents) {
  var self = this;

  checkActivation(self);

  var len = contents ? contents.length : 0;
  var time = Date.now();
  var date = new Date(time);

  var stats = new VirtualStats({
    dev: 8675309,
    nlink: 0,
    uid: 1000,
    gid: 1000,
    rdev: 0,
    blksize: 4096,
    ino: inode++,
    mode: 33188,
    size: len,
    blocks: Math.floor(len / 4096),
    atime: date,
    mtime: date,
    ctime: date,
    birthtime: date
  });
  var modulePath = getModulePath(filePath, self._compiler);

  debug(self._compiler.name, "Write module:", modulePath, contents);

  // When using the WatchIgnorePlugin (https://github.com/webpack/webpack/blob/52184b897f40c75560b3630e43ca642fcac7e2cf/lib/WatchIgnorePlugin.js),
  // the original watchFileSystem is stored in `wfs`. The following "unwraps" the ignoring
  // wrappers, giving us access to the "real" watchFileSystem.
  var finalWatchFileSystem = self._watcher && self._watcher.watchFileSystem;

  while (finalWatchFileSystem && finalWatchFileSystem.wfs) {
    finalWatchFileSystem = finalWatchFileSystem.wfs;
  }

  var finalInputFileSystem = self._compiler.inputFileSystem;
  while (finalInputFileSystem && finalInputFileSystem._inputFileSystem) {
    finalInputFileSystem = finalInputFileSystem._inputFileSystem;
  }

  finalInputFileSystem._writeVirtualFile(modulePath, stats, contents);
  if (finalWatchFileSystem &&
      (finalWatchFileSystem.watcher.fileWatchers.size ||
      finalWatchFileSystem.watcher.fileWatchers.length)
      ) {
    var fileWatchers = finalWatchFileSystem.watcher.fileWatchers instanceof Map ?
      Array.from(finalWatchFileSystem.watcher.fileWatchers.values()) :
      finalWatchFileSystem.watcher.fileWatchers;
    fileWatchers.forEach(function(fileWatcher) {
      if (fileWatcher.path === modulePath) {
        debug(self._compiler.name, "Emit file change:", modulePath, time);
        delete fileWatcher.directoryWatcher._cachedTimeInfoEntries;
        fileWatcher.directoryWatcher.setFileTime(
          filePath,
          time,
          false,
          false,
          null
        );
        fileWatcher.emit("change", time, null);
      }
    });
  }
};

function createWebpackData(result) {
  return (function (backendOrStorage) {
    // In Webpack v5, this variable is a "Backend", and has the data stored in a field
    // _data. In V4, the `_` prefix isn't present.
    if (backendOrStorage._data) {
      var curLevelIdx = backendOrStorage._currentLevel;
      var curLevel = backendOrStorage._levels[curLevelIdx];
      return {
        result: this.result,
        level: curLevel
      }
    }
    // Webpack 4
    return [null, this.result]
  }).bind({result: result});
}

function getData(storage, key) {
  // Webpack 5
  if (storage._data instanceof Map) {
    return storage._data.get(key);
  } else if (storage._data) {
    return storage.data[key];
  } else if (storage.data instanceof Map) {
    // Webpack v4
    return storage.data.get(key);
  } else {
    return storage.data[key];
  }
}

function setData(backendOrStorage, key, valueFactory) {
  var value = valueFactory(backendOrStorage);

  // Webpack v5
  if (backendOrStorage._data instanceof Map) {
    backendOrStorage._data.set(key, value);
  } else if (backendOrStorage._data) {
    backendOrStorage.data[key] = value;
  } else if (backendOrStorage.data instanceof Map) {
    // Webpack 4
    backendOrStorage.data.set(key, value);
  } else {
    backendOrStorage.data[key] = value;
  }
}


function getStatStorage(fileSystem) {
  if (fileSystem._statStorage) {
    // Webpack v4
    return fileSystem._statStorage;
  } else if (fileSystem._statBackend) {
    // webpack v5
    return fileSystem._statBackend
  } else {
    // Unknown version?
    throw new Error("Couldn't find a stat storage");
  }
}

function getFileStorage(fileSystem) {
  if (fileSystem._readFileStorage) {
    // Webpack v4
    return fileSystem._readFileStorage;
  } else if (fileSystem._readFileBackend) {
    // Webpack v5
    return fileSystem._readFileBackend;
  } else {
    throw new Error("Couldn't find a readFileStorage")
  }
}

function getReadDirBackend(fileSystem) {
  if (fileSystem._readdirBackend) {
    return fileSystem._readdirBackend;
  } else if (fileSystem._readdirStorage) {
    return fileSystem._readdirStorage;
  } else {
    throw new Error("Couldn't find a readDirStorage from Webpack Internals")
  }
}

VirtualModulesPlugin.prototype.apply = function(compiler) {
  var self = this;

  self._compiler = compiler;

  var afterEnvironmentHook = function() {

    var finalInputFileSystem = compiler.inputFileSystem;
    while (finalInputFileSystem && finalInputFileSystem._inputFileSystem) {
      finalInputFileSystem = finalInputFileSystem._inputFileSystem;
    }

    if (!finalInputFileSystem._writeVirtualFile) {
      var originalPurge = finalInputFileSystem.purge;

      finalInputFileSystem.purge = function() {
        originalPurge.apply(this, arguments);
        if (this._virtualFiles) {
          Object.keys(this._virtualFiles).forEach(function(file) {
            var data = this._virtualFiles[file];
            this._writeVirtualFile(file, data.stats, data.contents);
          }.bind(this));
        }
      };

      finalInputFileSystem._writeVirtualFile = function(file, stats, contents) {
        var statStorage = getStatStorage(this);
        var fileStorage = getFileStorage(this);
        var readDirStorage = getReadDirBackend(this);
        this._virtualFiles = this._virtualFiles || {};
        this._virtualFiles[file] = {stats: stats, contents: contents};
        setData(statStorage, file, createWebpackData(stats));
        setData(fileStorage, file, createWebpackData(contents));
        var segments = file.split(/[\\/]/);
        var count = segments.length - 1;
        var minCount = segments[0] ? 1 : 0;
        while (count > minCount) {
          var dir = segments.slice(0, count).join(path.sep) || path.sep;
          try {
            finalInputFileSystem.readdirSync(dir);
          } catch (e) {
            var time = Date.now();
            var dirStats = new VirtualStats({
              dev: 8675309,
              nlink: 0,
              uid: 1000,
              gid: 1000,
              rdev: 0,
              blksize: 4096,
              ino: inode++,
              mode: 16877,
              size: stats.size,
              blocks: Math.floor(stats.size / 4096),
              atime: time,
              mtime: time,
              ctime: time,
              birthtime: time
            });

            setData(readDirStorage, dir, createWebpackData([]))
            setData(statStorage, dir, createWebpackData(dirStats))
          }
          var dirData = getData(getReadDirBackend(this), dir);
          // Webpack v4 returns an array, webpack v5 returns an object
          dirData = dirData[1] || dirData.result;
          var filename = segments[count];
          if (dirData.indexOf(filename) < 0) {
            var files = dirData.concat([filename]).sort();
            setData(getReadDirBackend(this), dir, createWebpackData(files));
           } else {
            break;
          }
          count--;
        }
      };
    }
  }
  var afterResolversHook = function() {
    if (self._staticModules) {
      Object.keys(self._staticModules).forEach(function(path) {
        self.writeModule(path, self._staticModules[path]);
      });
      delete self._staticModules;
    }
  }

  var watchRunHook = function(watcher, callback) {
    self._watcher = watcher.compiler || watcher;
    callback();
  }

  if (compiler.hooks) {
    compiler.hooks.afterEnvironment.tap('VirtualModulesPlugin', afterEnvironmentHook);
    compiler.hooks.afterResolvers.tap('VirtualModulesPlugin', afterResolversHook);
    compiler.hooks.watchRun.tapAsync('VirtualModulesPlugin', watchRunHook);
  } else {
    compiler.plugin("after-environment", afterEnvironmentHook);
    compiler.plugin("after-resolvers", afterResolversHook);
    compiler.plugin("watch-run", watchRunHook);
  }
};

module.exports = VirtualModulesPlugin;
