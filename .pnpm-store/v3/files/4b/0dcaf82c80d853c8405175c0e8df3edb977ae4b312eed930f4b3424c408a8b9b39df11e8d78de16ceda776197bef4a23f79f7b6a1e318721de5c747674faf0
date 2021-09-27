"use strict";

exports.__esModule = true;
var _exportNames = {
  WorkerPool: true
};
exports.WorkerPool = void 0;

var _child_process = require("child_process");

var _taskQueue = require("./task-queue");

var _types = require("./types");

var _child = require("./child");

Object.keys(_child).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _child[key]) return;
  exports[key] = _child[key];
});

const childWrapperPath = require.resolve(`./child`);

class TaskInfo {
  constructor(opts) {
    this.functionName = opts.functionName;
    this.args = opts.args;
    this.assignedToWorker = opts.assignedToWorker;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

}

/**
 * Worker pool is a class that allow you to queue function execution across multiple
 * child processes, in order to parallelize work. It accepts absolute path to worker module
 * and will expose exported function of that module as properties on WorkerPool instance.
 *
 * Worker pool allows queueing execution of a function on all workers (via `.all` property)
 * as well as distributing execution across workers (via `.single` property)
 */
class WorkerPool {
  /**
   * Schedule task execution on all workers. Useful for setting up workers
   */

  /**
   * Schedule task execution on single worker. Useful to distribute tasks between multiple workers.
   */
  constructor(workerPath, options) {
    this.workers = [];
    this.taskQueue = new _taskQueue.TaskQueue();
    this.idleWorkers = new Set();
    this.listeners = [];
    this.workerPath = workerPath;
    this.options = options;
    const single = {};
    const all = {};
    {
      // we don't need to retain these
      const module = require(workerPath);

      const exportNames = Object.keys(module);

      for (const exportName of exportNames) {
        if (typeof module[exportName] !== `function`) {
          // We only expose functions. Exposing other types
          // would require additional handling which doesn't seem
          // worth supporting given that consumers can just access
          // those via require/import instead of WorkerPool interface.
          continue;
        }

        single[exportName] = this.scheduleWorkSingle.bind(this, exportName);
        all[exportName] = this.scheduleWorkAll.bind(this, exportName);
      }
    }
    this.single = single;
    this.all = all;
    this.startAll();
  }

  startAll() {
    const options = this.options;

    for (let workerId = 1; workerId <= ((_options$numWorkers = options === null || options === void 0 ? void 0 : options.numWorkers) !== null && _options$numWorkers !== void 0 ? _options$numWorkers : 1); workerId++) {
      var _options$numWorkers, _options$env;

      const worker = (0, _child_process.fork)(childWrapperPath, {
        cwd: process.cwd(),
        env: { ...process.env,
          ...((_options$env = options === null || options === void 0 ? void 0 : options.env) !== null && _options$env !== void 0 ? _options$env : {}),
          GATSBY_WORKER_ID: workerId.toString(),
          GATSBY_WORKER_MODULE_PATH: this.workerPath
        },
        // Suppress --debug / --inspect flags while preserving others (like --harmony).
        execArgv: process.execArgv.filter(v => !/^--(debug|inspect)/.test(v))
      });
      const workerInfo = {
        workerId,
        worker,
        exitedPromise: new Promise(resolve => {
          worker.on(`exit`, (code, signal) => {
            if (workerInfo.currentTask) {
              // worker exited without finishing a task
              workerInfo.currentTask.reject(new Error(`Worker exited before finishing task`));
            } // remove worker from list of workers


            this.workers.splice(this.workers.indexOf(workerInfo), 1);
            resolve({
              code,
              signal
            });
          });
        })
      };
      worker.on(`message`, msg => {
        if (msg[0] === _types.RESULT) {
          if (!workerInfo.currentTask) {
            throw new Error(`Invariant: gatsby-worker received execution result, but it wasn't expecting it.`);
          }

          const task = workerInfo.currentTask;
          workerInfo.currentTask = undefined;
          this.checkForWork(workerInfo);
          task.resolve(msg[1]);
        } else if (msg[0] === _types.ERROR) {
          if (!workerInfo.currentTask) {
            throw new Error(`Invariant: gatsby-worker received execution rejection, but it wasn't expecting it.`);
          }

          let error = msg[4];

          if (error !== null && typeof error === `object`) {
            const extra = error;
            const NativeCtor = global[msg[1]];
            const Ctor = typeof NativeCtor === `function` ? NativeCtor : Error;
            error = new Ctor(msg[2]); // @ts-ignore type doesn't exist on Error, but that's what jest-worker does for errors :shrug:

            error.type = msg[1];
            error.stack = msg[3];

            for (const key in extra) {
              if (Object.prototype.hasOwnProperty.call(extra, key)) {
                error[key] = extra[key];
              }
            }
          }

          const task = workerInfo.currentTask;
          workerInfo.currentTask = undefined;
          this.checkForWork(workerInfo);
          task.reject(error);
        } else if (msg[0] === _types.CUSTOM_MESSAGE) {
          for (const listener of this.listeners) {
            listener(msg[1], workerId);
          }
        }
      });
      this.workers.push(workerInfo);
      this.idleWorkers.add(workerInfo);
    }
  }
  /**
   * Kills worker processes and rejects and ongoing or pending tasks.
   * @returns Array of promises for each worker that will resolve once worker did exit.
   */


  end() {
    const results = this.workers.map(async workerInfo => {
      // tell worker to end gracefully
      const endMessage = [_types.END];
      workerInfo.worker.send(endMessage); // force exit if worker doesn't exit gracefully quickly

      const forceExitTimeout = setTimeout(() => {
        workerInfo.worker.kill(`SIGKILL`);
      }, 1000);
      const exitResult = await workerInfo.exitedPromise;
      clearTimeout(forceExitTimeout);
      return exitResult.code;
    });
    Promise.all(results).then(() => {
      // make sure we fail queued tasks as well
      for (const taskNode of this.taskQueue) {
        taskNode.value.reject(new Error(`Worker exited before finishing task`));
      }

      this.workers = [];
      this.idleWorkers = new Set();
    });
    return results;
  }
  /**
   * Kills all running worker processes and spawns a new pool of processes
   */


  async restart() {
    await Promise.all(this.end());
    this.startAll();
  }

  getWorkerInfo() {
    return this.workers.map(worker => {
      return {
        workerId: worker.workerId
      };
    });
  }

  checkForWork(workerInfo) {
    // check if there is task in queue
    for (const taskNode of this.taskQueue) {
      const task = taskNode.value;

      if (!task.assignedToWorker || task.assignedToWorker === workerInfo) {
        this.doWork(task, workerInfo);
        this.taskQueue.remove(taskNode);
        return;
      }
    } // no task found, so just marking worker as idle


    this.idleWorkers.add(workerInfo);
  }

  doWork(taskInfo, workerInfo) {
    // block worker
    workerInfo.currentTask = taskInfo;
    this.idleWorkers.delete(workerInfo);
    const msg = [_types.EXECUTE, taskInfo.functionName, taskInfo.args];
    workerInfo.worker.send(msg);
  }

  scheduleWork(taskInfo) {
    let workerToExecuteTaskNow;

    if (taskInfo.assignedToWorker) {
      if (this.idleWorkers.has(taskInfo.assignedToWorker)) {
        workerToExecuteTaskNow = taskInfo.assignedToWorker;
      }
    } else {
      workerToExecuteTaskNow = this.idleWorkers.values().next().value;
    }

    if (workerToExecuteTaskNow) {
      this.doWork(taskInfo, workerToExecuteTaskNow);
    } else {
      this.taskQueue.enqueue(taskInfo);
    }

    return taskInfo.promise;
  }

  scheduleWorkSingle(functionName, ...args) {
    return this.scheduleWork(new TaskInfo({
      functionName,
      args
    }));
  }

  scheduleWorkAll(functionName, ...args) {
    return this.workers.map(workerInfo => this.scheduleWork(new TaskInfo({
      assignedToWorker: workerInfo,
      functionName,
      args
    })));
  }

  onMessage(listener) {
    this.listeners.push(listener);
  }

  sendMessage(msg, workerId) {
    const worker = this.workers[workerId - 1];

    if (!worker) {
      throw new Error(`There is no worker with "${workerId}" id.`);
    }

    const poolMsg = [_types.CUSTOM_MESSAGE, msg];
    worker.worker.send(poolMsg);
  }

}

exports.WorkerPool = WorkerPool;