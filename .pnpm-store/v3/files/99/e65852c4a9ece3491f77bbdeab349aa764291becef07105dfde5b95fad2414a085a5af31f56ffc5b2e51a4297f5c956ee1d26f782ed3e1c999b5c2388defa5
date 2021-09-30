/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const forEachBail = require("./forEachBail");
const getPaths = require("./getPaths");
const { getType, PathType } = require("./util/path");

/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */

module.exports = class SymlinkPlugin {
	/**
	 * @param {string | ResolveStepHook} source source
	 * @param {string | ResolveStepHook} target target
	 */
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}

	/**
	 * @param {Resolver} resolver the resolver
	 * @returns {void}
	 */
	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		const fs = resolver.fileSystem;
		resolver
			.getHook(this.source)
			.tapAsync("SymlinkPlugin", (request, resolveContext, callback) => {
				if (request.ignoreSymlinks) return callback();
				const pathsResult = getPaths(request.path);
				const pathSeqments = pathsResult.seqments;
				const paths = pathsResult.paths;

				let containsSymlink = false;
				let idx = -1;
				forEachBail(
					paths,
					(path, callback) => {
						idx++;
						if (resolveContext.fileDependencies)
							resolveContext.fileDependencies.add(path);
						fs.readlink(path, (err, result) => {
							if (!err && result) {
								pathSeqments[idx] = result;
								containsSymlink = true;
								// Shortcut when absolute symlink found
								const resultType = getType(result.toString());
								if (
									resultType === PathType.AbsoluteWin ||
									resultType === PathType.AbsolutePosix
								) {
									return callback(null, idx);
								}
							}
							callback();
						});
					},
					(err, idx) => {
						if (!containsSymlink) return callback();
						const resultSeqments =
							typeof idx === "number"
								? pathSeqments.slice(0, idx + 1)
								: pathSeqments.slice();
						const result = resultSeqments.reduceRight((a, b) => {
							return resolver.join(a, b);
						});
						const obj = {
							...request,
							path: result
						};
						resolver.doResolve(
							target,
							obj,
							"resolved symlink to " + result,
							resolveContext,
							callback
						);
					}
				);
			});
	}
};
