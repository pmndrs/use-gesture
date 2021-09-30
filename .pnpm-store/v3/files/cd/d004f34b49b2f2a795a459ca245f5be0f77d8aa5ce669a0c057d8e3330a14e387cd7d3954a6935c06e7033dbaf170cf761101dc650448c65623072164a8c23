/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const getWatcherManager = require("./getWatcherManager");
const LinkResolver = require("./LinkResolver");
const EventEmitter = require("events").EventEmitter;
const globToRegExp = require("glob-to-regexp");
const watchEventSource = require("./watchEventSource");

let EXISTANCE_ONLY_TIME_ENTRY; // lazy required

const EMPTY_ARRAY = [];
const EMPTY_OPTIONS = {};

function addWatchersToSet(watchers, set) {
	for (const w of watchers) {
		if (w !== true && !set.has(w.directoryWatcher)) {
			set.add(w.directoryWatcher);
			addWatchersToSet(w.directoryWatcher.directories.values(), set);
		}
	}
}

const stringToRegexp = ignored => {
	const source = globToRegExp(ignored, { globstar: true, extended: true })
		.source;
	const matchingStart = source.slice(0, source.length - 1) + "(?:$|\\/)";
	return matchingStart;
};

const ignoredToRegexp = ignored => {
	if (Array.isArray(ignored)) {
		return new RegExp(ignored.map(i => stringToRegexp(i)).join("|"));
	} else if (typeof ignored === "string") {
		return new RegExp(stringToRegexp(ignored));
	} else if (ignored instanceof RegExp) {
		return ignored;
	} else if (ignored) {
		throw new Error(`Invalid option for 'ignored': ${ignored}`);
	} else {
		return undefined;
	}
};

const normalizeOptions = options => {
	return {
		followSymlinks: !!options.followSymlinks,
		ignored: ignoredToRegexp(options.ignored),
		poll: options.poll
	};
};

const normalizeCache = new WeakMap();
const cachedNormalizeOptions = options => {
	const cacheEntry = normalizeCache.get(options);
	if (cacheEntry !== undefined) return cacheEntry;
	const normalized = normalizeOptions(options);
	normalizeCache.set(options, normalized);
	return normalized;
};

class Watchpack extends EventEmitter {
	constructor(options) {
		super();
		if (!options) options = EMPTY_OPTIONS;
		this.options = options;
		this.aggregateTimeout =
			typeof options.aggregateTimeout === "number"
				? options.aggregateTimeout
				: 200;
		this.watcherOptions = cachedNormalizeOptions(options);
		this.watcherManager = getWatcherManager(this.watcherOptions);
		this.fileWatchers = new Map();
		this.directoryWatchers = new Map();
		this.startTime = undefined;
		this.paused = false;
		this.aggregatedChanges = new Set();
		this.aggregatedRemovals = new Set();
		this.aggregateTimer = undefined;
		this._onTimeout = this._onTimeout.bind(this);
	}

	watch(arg1, arg2, arg3) {
		let files, directories, missing, startTime;
		if (!arg2) {
			({
				files = EMPTY_ARRAY,
				directories = EMPTY_ARRAY,
				missing = EMPTY_ARRAY,
				startTime
			} = arg1);
		} else {
			files = arg1;
			directories = arg2;
			missing = EMPTY_ARRAY;
			startTime = arg3;
		}
		this.paused = false;
		const oldFileWatchers = this.fileWatchers;
		const oldDirectoryWatchers = this.directoryWatchers;
		const ignored = this.watcherOptions.ignored;
		const filter = ignored
			? path => !ignored.test(path.replace(/\\/g, "/"))
			: () => true;
		const addToMap = (map, key, item) => {
			const list = map.get(key);
			if (list === undefined) {
				map.set(key, [item]);
			} else {
				list.push(item);
			}
		};
		const fileWatchersNeeded = new Map();
		const directoryWatchersNeeded = new Map();
		const missingFiles = new Set();
		if (this.watcherOptions.followSymlinks) {
			const resolver = new LinkResolver();
			for (const file of files) {
				if (filter(file)) {
					for (const innerFile of resolver.resolve(file)) {
						if (file === innerFile || filter(innerFile)) {
							addToMap(fileWatchersNeeded, innerFile, file);
						}
					}
				}
			}
			for (const file of missing) {
				if (filter(file)) {
					for (const innerFile of resolver.resolve(file)) {
						if (file === innerFile || filter(innerFile)) {
							missingFiles.add(file);
							addToMap(fileWatchersNeeded, innerFile, file);
						}
					}
				}
			}
			for (const dir of directories) {
				if (filter(dir)) {
					let first = true;
					for (const innerItem of resolver.resolve(dir)) {
						if (filter(innerItem)) {
							addToMap(
								first ? directoryWatchersNeeded : fileWatchersNeeded,
								innerItem,
								dir
							);
						}
						first = false;
					}
				}
			}
		} else {
			for (const file of files) {
				if (filter(file)) {
					addToMap(fileWatchersNeeded, file, file);
				}
			}
			for (const file of missing) {
				if (filter(file)) {
					missingFiles.add(file);
					addToMap(fileWatchersNeeded, file, file);
				}
			}
			for (const dir of directories) {
				if (filter(dir)) {
					addToMap(directoryWatchersNeeded, dir, dir);
				}
			}
		}
		const newFileWatchers = new Map();
		const newDirectoryWatchers = new Map();
		const setupFileWatcher = (watcher, key, files) => {
			watcher.on("initial-missing", type => {
				for (const file of files) {
					if (!missingFiles.has(file)) this._onRemove(file, file, type);
				}
			});
			watcher.on("change", (mtime, type) => {
				for (const file of files) {
					this._onChange(file, mtime, file, type);
				}
			});
			watcher.on("remove", type => {
				for (const file of files) {
					this._onRemove(file, file, type);
				}
			});
			newFileWatchers.set(key, watcher);
		};
		const setupDirectoryWatcher = (watcher, key, directories) => {
			watcher.on("initial-missing", type => {
				for (const item of directories) {
					this._onRemove(item, item, type);
				}
			});
			watcher.on("change", (file, mtime, type) => {
				for (const item of directories) {
					this._onChange(item, mtime, file, type);
				}
			});
			watcher.on("remove", type => {
				for (const item of directories) {
					this._onRemove(item, item, type);
				}
			});
			newDirectoryWatchers.set(key, watcher);
		};
		// Close unneeded old watchers
		const fileWatchersToClose = [];
		const directoryWatchersToClose = [];
		for (const [key, w] of oldFileWatchers) {
			if (!fileWatchersNeeded.has(key)) {
				w.close();
			} else {
				fileWatchersToClose.push(w);
			}
		}
		for (const [key, w] of oldDirectoryWatchers) {
			if (!directoryWatchersNeeded.has(key)) {
				w.close();
			} else {
				directoryWatchersToClose.push(w);
			}
		}
		// Create new watchers and install handlers on these watchers
		watchEventSource.batch(() => {
			for (const [key, files] of fileWatchersNeeded) {
				const watcher = this.watcherManager.watchFile(key, startTime);
				if (watcher) {
					setupFileWatcher(watcher, key, files);
				}
			}
			for (const [key, directories] of directoryWatchersNeeded) {
				const watcher = this.watcherManager.watchDirectory(key, startTime);
				if (watcher) {
					setupDirectoryWatcher(watcher, key, directories);
				}
			}
		});
		// Close old watchers
		for (const w of fileWatchersToClose) w.close();
		for (const w of directoryWatchersToClose) w.close();
		// Store watchers
		this.fileWatchers = newFileWatchers;
		this.directoryWatchers = newDirectoryWatchers;
		this.startTime = startTime;
	}

	close() {
		this.paused = true;
		if (this.aggregateTimer) clearTimeout(this.aggregateTimer);
		for (const w of this.fileWatchers.values()) w.close();
		for (const w of this.directoryWatchers.values()) w.close();
		this.fileWatchers.clear();
		this.directoryWatchers.clear();
	}

	pause() {
		this.paused = true;
		if (this.aggregateTimer) clearTimeout(this.aggregateTimer);
	}

	getTimes() {
		const directoryWatchers = new Set();
		addWatchersToSet(this.fileWatchers.values(), directoryWatchers);
		addWatchersToSet(this.directoryWatchers.values(), directoryWatchers);
		const obj = Object.create(null);
		for (const w of directoryWatchers) {
			const times = w.getTimes();
			for (const file of Object.keys(times)) obj[file] = times[file];
		}
		return obj;
	}

	getTimeInfoEntries() {
		if (EXISTANCE_ONLY_TIME_ENTRY === undefined) {
			EXISTANCE_ONLY_TIME_ENTRY = require("./DirectoryWatcher")
				.EXISTANCE_ONLY_TIME_ENTRY;
		}
		const directoryWatchers = new Set();
		addWatchersToSet(this.fileWatchers.values(), directoryWatchers);
		addWatchersToSet(this.directoryWatchers.values(), directoryWatchers);
		const map = new Map();
		for (const w of directoryWatchers) {
			const times = w.getTimeInfoEntries();
			for (const [path, entry] of times) {
				if (map.has(path)) {
					if (entry === EXISTANCE_ONLY_TIME_ENTRY) continue;
					const value = map.get(path);
					if (value === entry) continue;
					if (value !== EXISTANCE_ONLY_TIME_ENTRY) {
						map.set(path, Object.assign({}, value, entry));
						continue;
					}
				}
				map.set(path, entry);
			}
		}
		return map;
	}

	getAggregated() {
		if (this.aggregateTimer) {
			clearTimeout(this.aggregateTimer);
			this.aggregateTimer = undefined;
		}
		const changes = this.aggregatedChanges;
		const removals = this.aggregatedRemovals;
		this.aggregatedChanges = new Set();
		this.aggregatedRemovals = new Set();
		return { changes, removals };
	}

	_onChange(item, mtime, file, type) {
		file = file || item;
		if (!this.paused) {
			this.emit("change", file, mtime, type);
			if (this.aggregateTimer) clearTimeout(this.aggregateTimer);
			this.aggregateTimer = setTimeout(this._onTimeout, this.aggregateTimeout);
		}
		this.aggregatedRemovals.delete(item);
		this.aggregatedChanges.add(item);
	}

	_onRemove(item, file, type) {
		file = file || item;
		if (!this.paused) {
			this.emit("remove", file, type);
			if (this.aggregateTimer) clearTimeout(this.aggregateTimer);
			this.aggregateTimer = setTimeout(this._onTimeout, this.aggregateTimeout);
		}
		this.aggregatedChanges.delete(item);
		this.aggregatedRemovals.add(item);
	}

	_onTimeout() {
		this.aggregateTimer = undefined;
		const changes = this.aggregatedChanges;
		const removals = this.aggregatedRemovals;
		this.aggregatedChanges = new Set();
		this.aggregatedRemovals = new Set();
		this.emit("aggregated", changes, removals);
	}
}

module.exports = Watchpack;
