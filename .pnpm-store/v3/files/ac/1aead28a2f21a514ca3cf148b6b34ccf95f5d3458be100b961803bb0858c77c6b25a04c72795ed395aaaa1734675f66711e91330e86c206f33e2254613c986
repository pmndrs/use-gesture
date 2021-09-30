var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const redux = (reducer, initial) => (set, get, api) => {
  api.dispatch = (action) => {
    set((state) => reducer(state, action));
    if (api.devtools) {
      api.devtools.send(api.devtools.prefix + action.type, get());
    }
    return action;
  };
  return __spreadValues({ dispatch: api.dispatch }, initial);
};
const devtools = (fn, prefix) => (set, get, api) => {
  let extension;
  try {
    extension = window.__REDUX_DEVTOOLS_EXTENSION__ || window.top.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!extension) {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      console.warn("Please install/enable Redux devtools extension");
    }
    api.devtools = null;
    return fn(set, get, api);
  }
  const namedSet = (state, replace, name) => {
    set(state, replace);
    if (!api.dispatch) {
      api.devtools.send(api.devtools.prefix + (name || "action"), get());
    }
  };
  const initialState = fn(namedSet, get, api);
  if (!api.devtools) {
    const savedSetState = api.setState;
    api.setState = (state, replace) => {
      savedSetState(state, replace);
      api.devtools.send(api.devtools.prefix + "setState", api.getState());
    };
    api.devtools = extension.connect({ name: prefix });
    api.devtools.prefix = prefix ? `${prefix} > ` : "";
    api.devtools.subscribe((message) => {
      var _a, _b, _c, _d;
      if (message.type === "DISPATCH" && message.state) {
        const ignoreState = message.payload.type === "JUMP_TO_ACTION" || message.payload.type === "JUMP_TO_STATE";
        if (!api.dispatch && !ignoreState) {
          api.setState(JSON.parse(message.state));
        } else {
          savedSetState(JSON.parse(message.state));
        }
      } else if (message.type === "DISPATCH" && ((_a = message.payload) == null ? void 0 : _a.type) === "COMMIT") {
        api.devtools.init(api.getState());
      } else if (message.type === "DISPATCH" && ((_b = message.payload) == null ? void 0 : _b.type) === "IMPORT_STATE") {
        const actions = (_c = message.payload.nextLiftedState) == null ? void 0 : _c.actionsById;
        const computedStates = ((_d = message.payload.nextLiftedState) == null ? void 0 : _d.computedStates) || [];
        computedStates.forEach(({ state }, index) => {
          const action = actions[index] || api.devtools.prefix + "setState";
          if (index === 0) {
            api.devtools.init(state);
          } else {
            savedSetState(state);
            api.devtools.send(action, api.getState());
          }
        });
      }
    });
    api.devtools.init(initialState);
  }
  return initialState;
};
const combine = (initialState, create) => (set, get, api) => Object.assign({}, initialState, create(set, get, api));
const toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
const persist = (config, options) => (set, get, api) => {
  const {
    name,
    getStorage = () => localStorage,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    blacklist,
    whitelist,
    onRehydrateStorage,
    version = 0,
    migrate,
    merge = (persistedState, currentState) => __spreadValues(__spreadValues({}, currentState), persistedState)
  } = options || {};
  let storage;
  try {
    storage = getStorage();
  } catch (e) {
  }
  if (!storage) {
    return config((...args) => {
      console.warn(`Persist middleware: unable to update ${name}, the given storage is currently unavailable.`);
      set(...args);
    }, get, api);
  }
  const thenableSerialize = toThenable(serialize);
  const setItem = () => {
    const state = __spreadValues({}, get());
    if (whitelist) {
      Object.keys(state).forEach((key) => {
        !whitelist.includes(key) && delete state[key];
      });
    }
    if (blacklist) {
      blacklist.forEach((key) => delete state[key]);
    }
    let errorInSync;
    const thenable = thenableSerialize({ state, version }).then((serializedValue) => storage.setItem(name, serializedValue)).catch((e) => {
      errorInSync = e;
    });
    if (errorInSync) {
      throw errorInSync;
    }
    return thenable;
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config((...args) => {
    set(...args);
    void setItem();
  }, get, api);
  let stateFromStorage;
  const postRehydrationCallback = (onRehydrateStorage == null ? void 0 : onRehydrateStorage(get())) || void 0;
  toThenable(storage.getItem.bind(storage))(name).then((storageValue) => {
    if (storageValue) {
      return deserialize(storageValue);
    }
  }).then((deserializedStorageValue) => {
    if (deserializedStorageValue) {
      if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== version) {
        if (migrate) {
          return migrate(deserializedStorageValue.state, deserializedStorageValue.version);
        }
        console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`);
      } else {
        return deserializedStorageValue.state;
      }
    }
  }).then((migratedState) => {
    stateFromStorage = merge(migratedState, configResult);
    set(stateFromStorage, true);
    return setItem();
  }).then(() => {
    postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
  }).catch((e) => {
    postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
  });
  return stateFromStorage || configResult;
};

export { combine, devtools, persist, redux };
