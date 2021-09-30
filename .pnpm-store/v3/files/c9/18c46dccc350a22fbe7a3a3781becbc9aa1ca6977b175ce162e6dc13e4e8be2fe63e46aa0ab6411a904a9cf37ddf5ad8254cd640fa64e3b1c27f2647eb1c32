/**
 * Lightweight thenable implementation that is entirely self-contained within a single
 * function with no external dependencies so it can be easily shipped across to a WorkerModule.
 *
 * This implementation conforms fully to the Promises/A+ spec so it can safely interoperate
 * with other thenable implementations. https://github.com/promises-aplus/promises-spec
 *
 * *However*, it is _not_ a full implementation of ES2015 Promises, e.g. it does not
 * have the same constructor signature and does not expose a `catch` method or the static
 * `resolve`/`reject`/`all`/`race` initializer methods. If you need to hand a Thenable
 * instance off to consuming code that may expect a true Promise, you'll want to wrap it
 * in a native-or-polyfilled Promise first.
 *
 * (Why yet another Promises/A+ implementation? Great question. We needed a polyfill-like
 * thing that was (a) wrapped in a single function for easy serialization across to a Worker,
 * and (b) was as small as possible -- at ~900B minified (~500B gzipped) this is the smallest
 * implementation I've found. And also, exercises like this are challenging and fun.)
 */
function BespokeThenable() {
  var state = 0; // 0=pending, 1=fulfilled, -1=rejected
  var queue = [];
  var value;
  var scheduled = 0;
  var completeCalled = 0;

  function then(onResolve, onReject) {
    var nextThenable = BespokeThenable();

    function handleNext() {
      var cb = state > 0 ? onResolve : onReject;
      if (isFn(cb)) {
        try {
          var result = cb(value);
          if (result === nextThenable) {
            recursiveError();
          }
          var resultThen = getThenableThen(result);
          if (resultThen) {
            resultThen.call(result, nextThenable.resolve, nextThenable.reject);
          } else {
            nextThenable.resolve(result);
          }
        } catch (err) {
          nextThenable.reject(err);
        }
      } else {
        nextThenable[state > 0 ? 'resolve' : 'reject'](value);
      }
    }

    queue.push(handleNext);
    if (state) {
      scheduleQueueFlush();
    }
    return nextThenable
  }

  var resolve = oneTime(function (val) {
    if (!completeCalled) {
      complete(1, val);
    }
  });

  var reject = oneTime(function (reason) {
    if (!completeCalled) {
      complete(-1, reason);
    }
  });

  function complete(st, val) {
    completeCalled++;
    var ignoreThrow = 0;
    try {
      if (val === thenableObj) {
        recursiveError();
      }
      var valThen = st > 0 && getThenableThen(val);
      if (valThen) {
        valThen.call(val, oneTime(function (v) {
          ignoreThrow++;
          complete(1, v);
        }), oneTime(function (v) {
          ignoreThrow++;
          complete(-1, v);
        }));
      } else {
        state = st;
        value = val;
        scheduleQueueFlush();
      }
    } catch(e) {
      if (!state && !ignoreThrow) {
        complete(-1, e);
      }
    }
  }

  function scheduleQueueFlush() {
    if (!scheduled) {
      setTimeout(flushQueue, 0); //TODO setImmediate or postMessage approach if available?
      scheduled = 1;
    }
  }

  function flushQueue() {
    var q = queue;
    scheduled = 0;
    queue = [];
    q.forEach(callIt);
  }

  function callIt(fn) {
    fn();
  }

  function getThenableThen(val) {
    var valThen = val && (isFn(val) || typeof val === 'object') && val.then;
    return isFn(valThen) && valThen
  }

  function oneTime(fn) {
    var called = 0;
    return function() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (!called++) {
        fn.apply(this, args);
      }
    }
  }

  function recursiveError() {
    throw new TypeError('Chaining cycle detected')
  }

  var isFn = function (v) { return typeof v === 'function'; };

  var thenableObj = {
    then: then,
    resolve: resolve,
    reject: reject
  };
  return thenableObj
}


/**
 * Thenable implementation that uses a native Promise under the covers. This implementation
 * is preferred if Promise is available, for better performance and dev tools integration.
 * @constructor
 */
function NativePromiseThenable() {
  var resolve, reject;
  var promise = new Promise(function (res, rej) {
    resolve = res;
    reject = rej;
  });
  return {
    then: promise.then.bind(promise),
    resolve: resolve,
    reject: reject
  }
}

/**
 * Promise.all() impl:
 */
BespokeThenable.all = NativePromiseThenable.all = function(items) {
  var resultCount = 0;
  var results = [];
  var out = DefaultThenable();
  if (items.length === 0) {
    out.resolve([]);
  } else {
    items.forEach(function (item, i) {
      var itemThenable = DefaultThenable();
      itemThenable.resolve(item);
      itemThenable.then(function (res) {
        resultCount++;
        results[i] = res;
        if (resultCount === items.length) {
          out.resolve(results);
        }
      }, out.reject);
    });
  }
  return out
};


/**
 * Choose the best Thenable implementation and export it as the default.
 */
var DefaultThenable = typeof Promise === 'function' ? NativePromiseThenable : BespokeThenable;

/**
 * Main content for the worker that handles the loading and execution of
 * modules within it.
 */
function workerBootstrap() {
  var modules = Object.create(null);

  // Handle messages for registering a module
  function registerModule(ref, callback) {
    var id = ref.id;
    var name = ref.name;
    var dependencies = ref.dependencies; if ( dependencies === void 0 ) dependencies = [];
    var init = ref.init; if ( init === void 0 ) init = function(){};
    var getTransferables = ref.getTransferables; if ( getTransferables === void 0 ) getTransferables = null;

    // Only register once
    if (modules[id]) { return }

    try {
      // If any dependencies are modules, ensure they're registered and grab their value
      dependencies = dependencies.map(function (dep) {
        if (dep && dep.isWorkerModule) {
          registerModule(dep, function (depResult) {
            if (depResult instanceof Error) { throw depResult }
          });
          dep = modules[dep.id].value;
        }
        return dep
      });

      // Rehydrate functions
      init = rehydrate(("<" + name + ">.init"), init);
      if (getTransferables) {
        getTransferables = rehydrate(("<" + name + ">.getTransferables"), getTransferables);
      }

      // Initialize the module and store its value
      var value = null;
      if (typeof init === 'function') {
        value = init.apply(void 0, dependencies);
      } else {
        console.error('worker module init function failed to rehydrate');
      }
      modules[id] = {
        id: id,
        value: value,
        getTransferables: getTransferables
      };
      callback(value);
    } catch(err) {
      if (!(err && err.noLog)) {
        console.error(err);
      }
      callback(err);
    }
  }

  // Handle messages for calling a registered module's result function
  function callModule(ref, callback) {
    var ref$1;

    var id = ref.id;
    var args = ref.args;
    if (!modules[id] || typeof modules[id].value !== 'function') {
      callback(new Error(("Worker module " + id + ": not found or its 'init' did not return a function")));
    }
    try {
      var result = (ref$1 = modules[id]).value.apply(ref$1, args);
      if (result && typeof result.then === 'function') {
        result.then(handleResult, function (rej) { return callback(rej instanceof Error ? rej : new Error('' + rej)); });
      } else {
        handleResult(result);
      }
    } catch(err) {
      callback(err);
    }
    function handleResult(result) {
      try {
        var tx = modules[id].getTransferables && modules[id].getTransferables(result);
        if (!tx || !Array.isArray(tx) || !tx.length) {
          tx = undefined; //postMessage is very picky about not passing null or empty transferables
        }
        callback(result, tx);
      } catch(err) {
        console.error(err);
        callback(err);
      }
    }
  }

  function rehydrate(name, str) {
    var result = void 0;
    self.troikaDefine = function (r) { return result = r; };
    var url = URL.createObjectURL(
      new Blob(
        [("/** " + (name.replace(/\*/g, '')) + " **/\n\ntroikaDefine(\n" + str + "\n)")],
        {type: 'application/javascript'}
      )
    );
    try {
      importScripts(url);
    } catch(err) {
      console.error(err);
    }
    URL.revokeObjectURL(url);
    delete self.troikaDefine;
    return result
  }

  // Handler for all messages within the worker
  self.addEventListener('message', function (e) {
    var ref = e.data;
    var messageId = ref.messageId;
    var action = ref.action;
    var data = ref.data;
    try {
      // Module registration
      if (action === 'registerModule') {
        registerModule(data, function (result) {
          if (result instanceof Error) {
            postMessage({
              messageId: messageId,
              success: false,
              error: result.message
            });
          } else {
            postMessage({
              messageId: messageId,
              success: true,
              result: {isCallable: typeof result === 'function'}
            });
          }
        });
      }
      // Invocation
      if (action === 'callModule') {
        callModule(data, function (result, transferables) {
          if (result instanceof Error) {
            postMessage({
              messageId: messageId,
              success: false,
              error: result.message
            });
          } else {
            postMessage({
              messageId: messageId,
              success: true,
              result: result
            }, transferables || undefined);
          }
        });
      }
    } catch(err) {
      postMessage({
        messageId: messageId,
        success: false,
        error: err.stack
      });
    }
  });
}

/**
 * Fallback for `defineWorkerModule` that behaves identically but runs in the main
 * thread, for when the execution environment doesn't support web workers or they
 * are disallowed due to e.g. CSP security restrictions.
 */
function defineMainThreadModule(options) {
  var moduleFunc = function() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return moduleFunc._getInitResult().then(function (initResult) {
      if (typeof initResult === 'function') {
        return initResult.apply(void 0, args)
      } else {
        throw new Error('Worker module function was called but `init` did not return a callable function')
      }
    })
  };
  moduleFunc._getInitResult = function() {
    // We can ignore getTransferables in main thread. TODO workerId?
    var dependencies = options.dependencies;
    var init = options.init;

    // Resolve dependencies
    dependencies = Array.isArray(dependencies) ? dependencies.map(function (dep) { return dep && dep._getInitResult ? dep._getInitResult() : dep; }
    ) : [];

    // Invoke init with the resolved dependencies
    var initThenable = DefaultThenable.all(dependencies).then(function (deps) {
      return init.apply(null, deps)
    });

    // Cache the resolved promise for subsequent calls
    moduleFunc._getInitResult = function () { return initThenable; };

    return initThenable
  };
  return moduleFunc
}

var supportsWorkers = function () {
  var supported = false;

  // Only attempt worker initialization in browsers; elsewhere it would just be
  // noise e.g. loading into a Node environment for SSR.
  if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    try {
      // TODO additional checks for things like importScripts within the worker?
      //  Would need to be an async check.
      var worker = new Worker(
        URL.createObjectURL(new Blob([''], { type: 'application/javascript' }))
      );
      worker.terminate();
      supported = true;
    } catch (err) {
      if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') ; else {
        console.log(
          ("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: [" + (err.message) + "]")
        );
      }
    }
  }

  // Cached result
  supportsWorkers = function () { return supported; };
  return supported
};

var _workerModuleId = 0;
var _messageId = 0;
var _allowInitAsString = false;
var workers = Object.create(null);
var openRequests = /*#__PURE__*/(function () {
  var obj = Object.create(null);
  obj._count = 0;
  return obj
})();


/**
 * Define a module of code that will be executed with a web worker. This provides a simple
 * interface for moving chunks of logic off the main thread, and managing their dependencies
 * among one another.
 *
 * @param {object} options
 * @param {function} options.init
 * @param {array} [options.dependencies]
 * @param {function} [options.getTransferables]
 * @param {string} [options.name]
 * @param {string} [options.workerId]
 * @return {function(...[*]): {then}}
 */
function defineWorkerModule(options) {
  if ((!options || typeof options.init !== 'function') && !_allowInitAsString) {
    throw new Error('requires `options.init` function')
  }
  var dependencies = options.dependencies;
  var init = options.init;
  var getTransferables = options.getTransferables;
  var workerId = options.workerId;

  if (!supportsWorkers()) {
    return defineMainThreadModule(options)
  }

  if (workerId == null) {
    workerId = '#default';
  }
  var id = "workerModule" + (++_workerModuleId);
  var name = options.name || id;
  var registrationThenable = null;

  dependencies = dependencies && dependencies.map(function (dep) {
    // Wrap raw functions as worker modules with no dependencies
    if (typeof dep === 'function' && !dep.workerModuleData) {
      _allowInitAsString = true;
      dep = defineWorkerModule({
        workerId: workerId,
        name: ("<" + name + "> function dependency: " + (dep.name)),
        init: ("function(){return (\n" + (stringifyFunction(dep)) + "\n)}")
      });
      _allowInitAsString = false;
    }
    // Grab postable data for worker modules
    if (dep && dep.workerModuleData) {
      dep = dep.workerModuleData;
    }
    return dep
  });

  function moduleFunc() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    // Register this module if needed
    if (!registrationThenable) {
      registrationThenable = callWorker(workerId,'registerModule', moduleFunc.workerModuleData);
    }

    // Invoke the module, returning a thenable
    return registrationThenable.then(function (ref) {
      var isCallable = ref.isCallable;

      if (isCallable) {
        return callWorker(workerId,'callModule', {id: id, args: args})
      } else {
        throw new Error('Worker module function was called but `init` did not return a callable function')
      }
    })
  }
  moduleFunc.workerModuleData = {
    isWorkerModule: true,
    id: id,
    name: name,
    dependencies: dependencies,
    init: stringifyFunction(init),
    getTransferables: getTransferables && stringifyFunction(getTransferables)
  };
  return moduleFunc
}

/**
 * Stringifies a function into a form that can be deserialized in the worker
 * @param fn
 */
function stringifyFunction(fn) {
  var str = fn.toString();
  // If it was defined in object method/property format, it needs to be modified
  if (!/^function/.test(str) && /^\w+\s*\(/.test(str)) {
    str = 'function ' + str;
  }
  return str
}


function getWorker(workerId) {
  var worker = workers[workerId];
  if (!worker) {
    // Bootstrap the worker's content
    var bootstrap = stringifyFunction(workerBootstrap);

    // Create the worker from the bootstrap function content
    worker = workers[workerId] = new Worker(
      URL.createObjectURL(
        new Blob(
          [("/** Worker Module Bootstrap: " + (workerId.replace(/\*/g, '')) + " **/\n\n;(" + bootstrap + ")()")],
          {type: 'application/javascript'}
        )
      )
    );

    // Single handler for response messages from the worker
    worker.onmessage = function (e) {
      var response = e.data;
      var msgId = response.messageId;
      var callback = openRequests[msgId];
      if (!callback) {
        throw new Error('WorkerModule response with empty or unknown messageId')
      }
      delete openRequests[msgId];
      openRequests._count--;
      callback(response);
    };
  }
  return worker
}

// Issue a call to the worker with a callback to handle the response
function callWorker(workerId, action, data) {
  var thenable = DefaultThenable();
  var messageId = ++_messageId;
  openRequests[messageId] = function (response) {
    if (response.success) {
      thenable.resolve(response.result);
    } else {
      thenable.reject(new Error(("Error in worker " + action + " call: " + (response.error))));
    }
  };
  openRequests._count++;
  if (openRequests._count > 1000) { //detect leaks
    console.warn('Large number of open WorkerModule requests, some may not be returning');
  }
  getWorker(workerId).postMessage({
    messageId: messageId,
    action: action,
    data: data
  });
  return thenable
}

/**
 * Just the {@link Thenable} function wrapped as a worker module. If another worker
 * module needs Thenable as a dependency, it's better to pass this module rather than
 * the raw function in its `dependencies` array so it only gets registered once.
 */
var ThenableWorkerModule = /*#__PURE__*/defineWorkerModule({
  name: 'Thenable',
  dependencies: [DefaultThenable],
  init: function(Thenable) {
    return Thenable
  }
});

export { DefaultThenable as Thenable, ThenableWorkerModule, defineWorkerModule, stringifyFunction };
