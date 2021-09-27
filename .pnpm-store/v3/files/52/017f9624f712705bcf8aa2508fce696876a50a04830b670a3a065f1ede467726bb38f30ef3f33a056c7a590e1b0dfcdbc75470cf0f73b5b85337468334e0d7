import deepEqual from 'fast-deep-equal';

const globalCache = [];

function handleAsset(fn, cache, args, lifespan = 0, preload = false) {
  for (const entry of cache) {
    // Find a match
    if (deepEqual(args, entry.args)) {
      // If we're pre-loading and the element is present, just return
      if (preload) return; // If an error occurred, throw

      if (entry.error) throw entry.error; // If a response was successful, return

      if (entry.response) return entry.response; // If the promise is still unresolved, throw

      throw entry.promise;
    }
  } // The request is new or has changed.


  const entry = {
    args,
    promise: // Make the promise request.
    fn(...args) // Response can't be undefined or else the loop above wouldn't be able to return it
    // This is for promises that do not return results (delays for instance)
    .then(response => entry.response = response != null ? response : true).catch(e => entry.error = e != null ? e : 'unknown error').then(() => {
      if (lifespan > 0) {
        setTimeout(() => {
          const index = cache.indexOf(entry);
          if (index !== -1) cache.splice(index, 1);
        }, lifespan);
      }
    })
  };
  cache.push(entry);
  if (!preload) throw entry.promise;
}

function clear(cache, ...args) {
  if (args === undefined || args.length === 0) cache.splice(0, cache.length);else {
    const entry = cache.find(entry => deepEqual(args, entry.args));

    if (entry) {
      const index = cache.indexOf(entry);
      if (index !== -1) cache.splice(index, 1);
    }
  }
}

function createAsset(fn, lifespan = 0) {
  const cache = [];
  return {
    /**
     * @throws Suspense Promise if asset is not yet ready
     * @throws Error if the promise rejected for some reason
     */
    read: (...args) => handleAsset(fn, cache, args, lifespan),
    preload: (...args) => void handleAsset(fn, cache, args, lifespan, true),
    clear: (...args) => clear(cache, ...args),
    peek: (...args) => {
      var _cache$find;

      return (_cache$find = cache.find(entry => deepEqual(args, entry.args))) == null ? void 0 : _cache$find.response;
    }
  };
}

function useAsset(fn, ...args) {
  return handleAsset(fn, globalCache, args, useAsset.lifespan);
}

useAsset.lifespan = 0;

useAsset.clear = (...args) => clear(globalCache, ...args);

useAsset.preload = (fn, ...args) => void handleAsset(fn, globalCache, args, useAsset.lifespan, true);

useAsset.peek = (...args) => {
  var _globalCache$find;

  return (_globalCache$find = globalCache.find(entry => deepEqual(args, entry.args))) == null ? void 0 : _globalCache$find.response;
};

export { createAsset, useAsset };
