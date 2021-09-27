/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveRequest} ResolveRequest */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */
/** @typedef {{[k: string]: any}} Cache */

function getCacheId(request, withContext) {
	return JSON.stringify({
		context: withContext ? request.context : "",
		path: request.path,
		query: request.query,
		fragment: request.fragment,
		request: request.request
	});
}

module.exports = class UnsafeCachePlugin {
	/**
	 * @param {string | ResolveStepHook} source source
	 * @param {function(ResolveRequest): boolean} filterPredicate filterPredicate
	 * @param {Cache} cache cache
	 * @param {boolean} withContext withContext
	 * @param {string | ResolveStepHook} target target
	 */
	constructor(source, filterPredicate, cache, withContext, target) {
		this.source = source;
		this.filterPredicate = filterPredicate;
		this.withContext = withContext;
		this.cache = cache;
		this.target = target;
	}

	/**
	 * @param {Resolver} resolver the resolver
	 * @returns {void}
	 */
	apply(resolver) {
		const target = resolver.ensureHook(this.target);
		resolver
			.getHook(this.source)
			.tapAsync("UnsafeCachePlugin", (request, resolveContext, callback) => {
				if (!this.filterPredicate(request)) return callback();
				const cacheId = getCacheId(request, this.withContext);
				const cacheEntry = this.cache[cacheId];
				if (cacheEntry) {
					return callback(null, cacheEntry);
				}
				resolver.doResolve(
					target,
					request,
					null,
					resolveContext,
					(err, result) => {
						if (err) return callback(err);
						if (result) return callback(null, (this.cache[cacheId] = result));
						callback();
					}
				);
			});
	}
};
