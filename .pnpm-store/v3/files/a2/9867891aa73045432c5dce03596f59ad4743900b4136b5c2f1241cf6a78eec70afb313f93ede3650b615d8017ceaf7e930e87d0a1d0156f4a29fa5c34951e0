"use strict";

exports.__esModule = true;
exports.getDataStore = getDataStore;
exports.isLmdbStore = isLmdbStore;
exports.detectLmdbStore = detectLmdbStore;

var _redux = require("../redux");

let dataStore;
let isLmdb = isLmdbStoreFlagSet();

function getDataStore() {
  if (!dataStore) {
    if (isLmdb) {
      const {
        setupLmdbStore
      } = require(`./lmdb/lmdb-datastore`);

      dataStore = setupLmdbStore();
    } else {
      const {
        setupInMemoryStore
      } = require(`./in-memory/in-memory-datastore`);

      dataStore = setupInMemoryStore();
    }
  }

  return dataStore;
}

function isLmdbStore() {
  return isLmdb;
}

function detectLmdbStore() {
  const flagIsSet = isLmdbStoreFlagSet();

  if (dataStore && isLmdb !== flagIsSet) {
    throw new Error(`GATSBY_EXPERIMENTAL_LMDB_STORE flag had changed after the data store was initialized.` + `(original value: ${isLmdb ? `true` : `false`}, ` + `new value: ${flagIsSet ? `true` : `false`})`);
  }

  isLmdb = flagIsSet;
  return flagIsSet;
}

function isLmdbStoreFlagSet() {
  return Boolean(process.env.GATSBY_EXPERIMENTAL_LMDB_STORE) && process.env.GATSBY_EXPERIMENTAL_LMDB_STORE !== `false` && process.env.GATSBY_EXPERIMENTAL_LMDB_STORE !== `0`;
} // It is possible that the store is not initialized yet when calling `DELETE_CACHE`.
//  The code below ensures we wipe cache from the proper store
//  (mostly relevant for tests)


_redux.emitter.on(`DELETE_CACHE`, () => {
  getDataStore();
});
//# sourceMappingURL=datastore.js.map