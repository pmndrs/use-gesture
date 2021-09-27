'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var redux = function redux(reducer, initial) {
  return function (set, get, api) {
    api.dispatch = function (action) {
      set(function (state) {
        return reducer(state, action);
      });

      if (api.devtools) {
        api.devtools.send(api.devtools.prefix + action.type, get());
      }

      return action;
    };

    return _extends({
      dispatch: api.dispatch
    }, initial);
  };
};
var devtools = function devtools(fn, prefix) {
  return function (set, get, api) {
    var extension;

    try {
      extension = window.__REDUX_DEVTOOLS_EXTENSION__ || window.top.__REDUX_DEVTOOLS_EXTENSION__;
    } catch (_unused) {}

    if (!extension) {
      if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
        console.warn('Please install/enable Redux devtools extension');
      }

      api.devtools = null;
      return fn(set, get, api);
    }

    var namedSet = function namedSet(state, replace, name) {
      set(state, replace);

      if (!api.dispatch) {
        api.devtools.send(api.devtools.prefix + (name || 'action'), get());
      }
    };

    var initialState = fn(namedSet, get, api);

    if (!api.devtools) {
      var savedSetState = api.setState;

      api.setState = function (state, replace) {
        savedSetState(state, replace);
        api.devtools.send(api.devtools.prefix + 'setState', api.getState());
      };

      api.devtools = extension.connect({
        name: prefix
      });
      api.devtools.prefix = prefix ? prefix + " > " : '';
      api.devtools.subscribe(function (message) {
        var _message$payload, _message$payload2;

        if (message.type === 'DISPATCH' && message.state) {
          var ignoreState = message.payload.type === 'JUMP_TO_ACTION' || message.payload.type === 'JUMP_TO_STATE';

          if (!api.dispatch && !ignoreState) {
            api.setState(JSON.parse(message.state));
          } else {
            savedSetState(JSON.parse(message.state));
          }
        } else if (message.type === 'DISPATCH' && ((_message$payload = message.payload) == null ? void 0 : _message$payload.type) === 'COMMIT') {
          api.devtools.init(api.getState());
        } else if (message.type === 'DISPATCH' && ((_message$payload2 = message.payload) == null ? void 0 : _message$payload2.type) === 'IMPORT_STATE') {
          var _message$payload$next, _message$payload$next2;

          var actions = (_message$payload$next = message.payload.nextLiftedState) == null ? void 0 : _message$payload$next.actionsById;
          var computedStates = ((_message$payload$next2 = message.payload.nextLiftedState) == null ? void 0 : _message$payload$next2.computedStates) || [];
          computedStates.forEach(function (_ref, index) {
            var state = _ref.state;
            var action = actions[index] || api.devtools.prefix + 'setState';

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
};
var combine = function combine(initialState, create) {
  return function (set, get, api) {
    return Object.assign({}, initialState, create(set, get, api));
  };
};

var toThenable = function toThenable(fn) {
  return function (input) {
    try {
      var result = fn(input);

      if (result instanceof Promise) {
        return result;
      }

      return {
        then: function then(onFulfilled) {
          return toThenable(onFulfilled)(result);
        },
        catch: function _catch(_onRejected) {
          return this;
        }
      };
    } catch (e) {
      return {
        then: function then(_onFulfilled) {
          return this;
        },
        catch: function _catch(onRejected) {
          return toThenable(onRejected)(e);
        }
      };
    }
  };
};

var persist = function persist(config, options) {
  return function (set, get, api) {
    var _ref2 = options || {},
        name = _ref2.name,
        _ref2$getStorage = _ref2.getStorage,
        getStorage = _ref2$getStorage === void 0 ? function () {
      return localStorage;
    } : _ref2$getStorage,
        _ref2$serialize = _ref2.serialize,
        serialize = _ref2$serialize === void 0 ? JSON.stringify : _ref2$serialize,
        _ref2$deserialize = _ref2.deserialize,
        deserialize = _ref2$deserialize === void 0 ? JSON.parse : _ref2$deserialize,
        blacklist = _ref2.blacklist,
        whitelist = _ref2.whitelist,
        onRehydrateStorage = _ref2.onRehydrateStorage,
        _ref2$version = _ref2.version,
        version = _ref2$version === void 0 ? 0 : _ref2$version,
        migrate = _ref2.migrate,
        _ref2$merge = _ref2.merge,
        merge = _ref2$merge === void 0 ? function (persistedState, currentState) {
      return _extends({}, currentState, persistedState);
    } : _ref2$merge;

    var storage;

    try {
      storage = getStorage();
    } catch (e) {}

    if (!storage) {
      return config(function () {
        console.warn("Persist middleware: unable to update " + name + ", the given storage is currently unavailable.");
        set.apply(void 0, arguments);
      }, get, api);
    }

    var thenableSerialize = toThenable(serialize);

    var setItem = function setItem() {
      var state = _extends({}, get());

      if (whitelist) {
        Object.keys(state).forEach(function (key) {
          !whitelist.includes(key) && delete state[key];
        });
      }

      if (blacklist) {
        blacklist.forEach(function (key) {
          return delete state[key];
        });
      }

      var errorInSync;
      var thenable = thenableSerialize({
        state: state,
        version: version
      }).then(function (serializedValue) {
        return storage.setItem(name, serializedValue);
      }).catch(function (e) {
        errorInSync = e;
      });

      if (errorInSync) {
        throw errorInSync;
      }

      return thenable;
    };

    var savedSetState = api.setState;

    api.setState = function (state, replace) {
      savedSetState(state, replace);
      void setItem();
    };

    var configResult = config(function () {
      set.apply(void 0, arguments);
      void setItem();
    }, get, api);
    var stateFromStorage;
    var postRehydrationCallback = (onRehydrateStorage == null ? void 0 : onRehydrateStorage(get())) || undefined;
    toThenable(storage.getItem.bind(storage))(name).then(function (storageValue) {
      if (storageValue) {
        return deserialize(storageValue);
      }
    }).then(function (deserializedStorageValue) {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === 'number' && deserializedStorageValue.version !== version) {
          if (migrate) {
            return migrate(deserializedStorageValue.state, deserializedStorageValue.version);
          }

          console.error("State loaded from storage couldn't be migrated since no migrate function was provided");
        } else {
          return deserializedStorageValue.state;
        }
      }
    }).then(function (migratedState) {
      stateFromStorage = merge(migratedState, configResult);
      set(stateFromStorage, true);
      return setItem();
    }).then(function () {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, undefined);
    }).catch(function (e) {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(undefined, e);
    });
    return stateFromStorage || configResult;
  };
};

exports.combine = combine;
exports.devtools = devtools;
exports.persist = persist;
exports.redux = redux;
