'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _tslib = require('./_virtual/_tslib.js');
var environment = require('./environment.js');
var utils = require('./utils.js');
var types = require('./types.js');
var actionTypes = require('./actionTypes.js');

var initEvent = /*#__PURE__*/utils.toSCXMLEvent({
  type: actionTypes.init
});
function getActionFunction(actionType, actionFunctionMap) {
  return actionFunctionMap ? actionFunctionMap[actionType] || undefined : undefined;
}
function toActionObject(action, actionFunctionMap) {
  var actionObject;

  if (utils.isString(action) || typeof action === 'number') {
    var exec = getActionFunction(action, actionFunctionMap);

    if (utils.isFunction(exec)) {
      actionObject = {
        type: action,
        exec: exec
      };
    } else if (exec) {
      actionObject = exec;
    } else {
      actionObject = {
        type: action,
        exec: undefined
      };
    }
  } else if (utils.isFunction(action)) {
    actionObject = {
      // Convert action to string if unnamed
      type: action.name || action.toString(),
      exec: action
    };
  } else {
    var exec = getActionFunction(action.type, actionFunctionMap);

    if (utils.isFunction(exec)) {
      actionObject = _tslib.__assign(_tslib.__assign({}, action), {
        exec: exec
      });
    } else if (exec) {
      var actionType = exec.type || action.type;
      actionObject = _tslib.__assign(_tslib.__assign(_tslib.__assign({}, exec), action), {
        type: actionType
      });
    } else {
      actionObject = action;
    }
  }

  return actionObject;
}
var toActionObjects = function (action, actionFunctionMap) {
  if (!action) {
    return [];
  }

  var actions = utils.isArray(action) ? action : [action];
  return actions.map(function (subAction) {
    return toActionObject(subAction, actionFunctionMap);
  });
};
function toActivityDefinition(action) {
  var actionObject = toActionObject(action);
  return _tslib.__assign(_tslib.__assign({
    id: utils.isString(action) ? action : actionObject.id
  }, actionObject), {
    type: actionObject.type
  });
}
/**
 * Raises an event. This places the event in the internal event queue, so that
 * the event is immediately consumed by the machine in the current step.
 *
 * @param eventType The event to raise.
 */

function raise(event) {
  if (!utils.isString(event)) {
    return send(event, {
      to: types.SpecialTargets.Internal
    });
  }

  return {
    type: actionTypes.raise,
    event: event
  };
}
function resolveRaise(action) {
  return {
    type: actionTypes.raise,
    _event: utils.toSCXMLEvent(action.event)
  };
}
/**
 * Sends an event. This returns an action that will be read by an interpreter to
 * send the event in the next step, after the current step is finished executing.
 *
 * @param event The event to send.
 * @param options Options to pass into the send event:
 *  - `id` - The unique send event identifier (used with `cancel()`).
 *  - `delay` - The number of milliseconds to delay the sending of the event.
 *  - `to` - The target of this event (by default, the machine the event was sent from).
 */

function send(event, options) {
  return {
    to: options ? options.to : undefined,
    type: actionTypes.send,
    event: utils.isFunction(event) ? event : utils.toEventObject(event),
    delay: options ? options.delay : undefined,
    id: options && options.id !== undefined ? options.id : utils.isFunction(event) ? event.name : utils.getEventType(event)
  };
}
function resolveSend(action, ctx, _event, delaysMap) {
  var meta = {
    _event: _event
  }; // TODO: helper function for resolving Expr

  var resolvedEvent = utils.toSCXMLEvent(utils.isFunction(action.event) ? action.event(ctx, _event.data, meta) : action.event);
  var resolvedDelay;

  if (utils.isString(action.delay)) {
    var configDelay = delaysMap && delaysMap[action.delay];
    resolvedDelay = utils.isFunction(configDelay) ? configDelay(ctx, _event.data, meta) : configDelay;
  } else {
    resolvedDelay = utils.isFunction(action.delay) ? action.delay(ctx, _event.data, meta) : action.delay;
  }

  var resolvedTarget = utils.isFunction(action.to) ? action.to(ctx, _event.data, meta) : action.to;
  return _tslib.__assign(_tslib.__assign({}, action), {
    to: resolvedTarget,
    _event: resolvedEvent,
    event: resolvedEvent.data,
    delay: resolvedDelay
  });
}
/**
 * Sends an event to this machine's parent.
 *
 * @param event The event to send to the parent machine.
 * @param options Options to pass into the send event.
 */

function sendParent(event, options) {
  return send(event, _tslib.__assign(_tslib.__assign({}, options), {
    to: types.SpecialTargets.Parent
  }));
}
/**
 * Sends an update event to this machine's parent.
 */

function sendUpdate() {
  return sendParent(actionTypes.update);
}
/**
 * Sends an event back to the sender of the original event.
 *
 * @param event The event to send back to the sender
 * @param options Options to pass into the send event
 */

function respond(event, options) {
  return send(event, _tslib.__assign(_tslib.__assign({}, options), {
    to: function (_, __, _a) {
      var _event = _a._event;
      return _event.origin; // TODO: handle when _event.origin is undefined
    }
  }));
}

var defaultLogExpr = function (context, event) {
  return {
    context: context,
    event: event
  };
};
/**
 *
 * @param expr The expression function to evaluate which will be logged.
 *  Takes in 2 arguments:
 *  - `ctx` - the current state context
 *  - `event` - the event that caused this action to be executed.
 * @param label The label to give to the logged expression.
 */


function log(expr, label) {
  if (expr === void 0) {
    expr = defaultLogExpr;
  }

  return {
    type: actionTypes.log,
    label: label,
    expr: expr
  };
}
var resolveLog = function (action, ctx, _event) {
  return _tslib.__assign(_tslib.__assign({}, action), {
    value: utils.isString(action.expr) ? action.expr : action.expr(ctx, _event.data, {
      _event: _event
    })
  });
};
/**
 * Cancels an in-flight `send(...)` action. A canceled sent action will not
 * be executed, nor will its event be sent, unless it has already been sent
 * (e.g., if `cancel(...)` is called after the `send(...)` action's `delay`).
 *
 * @param sendId The `id` of the `send(...)` action to cancel.
 */

var cancel = function (sendId) {
  return {
    type: actionTypes.cancel,
    sendId: sendId
  };
};
/**
 * Starts an activity.
 *
 * @param activity The activity to start.
 */

function start(activity) {
  var activityDef = toActivityDefinition(activity);
  return {
    type: types.ActionTypes.Start,
    activity: activityDef,
    exec: undefined
  };
}
/**
 * Stops an activity.
 *
 * @param actorRef The activity to stop.
 */

function stop(actorRef) {
  var activity = utils.isFunction(actorRef) ? actorRef : toActivityDefinition(actorRef);
  return {
    type: types.ActionTypes.Stop,
    activity: activity,
    exec: undefined
  };
}
function resolveStop(action, context, _event) {
  var actorRefOrString = utils.isFunction(action.activity) ? action.activity(context, _event.data) : action.activity;
  var resolvedActorRef = typeof actorRefOrString === 'string' ? {
    id: actorRefOrString
  } : actorRefOrString;
  var actionObject = {
    type: types.ActionTypes.Stop,
    activity: resolvedActorRef
  };
  return actionObject;
}
/**
 * Updates the current context of the machine.
 *
 * @param assignment An object that represents the partial context to update.
 */

var assign = function (assignment) {
  return {
    type: actionTypes.assign,
    assignment: assignment
  };
};
/**
 * Returns an event type that represents an implicit event that
 * is sent after the specified `delay`.
 *
 * @param delayRef The delay in milliseconds
 * @param id The state node ID where this event is handled
 */

function after(delayRef, id) {
  var idSuffix = id ? "#" + id : '';
  return types.ActionTypes.After + "(" + delayRef + ")" + idSuffix;
}
/**
 * Returns an event that represents that a final state node
 * has been reached in the parent state node.
 *
 * @param id The final state node's parent state node `id`
 * @param data The data to pass into the event
 */

function done(id, data) {
  var type = types.ActionTypes.DoneState + "." + id;
  var eventObject = {
    type: type,
    data: data
  };

  eventObject.toString = function () {
    return type;
  };

  return eventObject;
}
/**
 * Returns an event that represents that an invoked service has terminated.
 *
 * An invoked service is terminated when it has reached a top-level final state node,
 * but not when it is canceled.
 *
 * @param id The final state node ID
 * @param data The data to pass into the event
 */

function doneInvoke(id, data) {
  var type = types.ActionTypes.DoneInvoke + "." + id;
  var eventObject = {
    type: type,
    data: data
  };

  eventObject.toString = function () {
    return type;
  };

  return eventObject;
}
function error(id, data) {
  var type = types.ActionTypes.ErrorPlatform + "." + id;
  var eventObject = {
    type: type,
    data: data
  };

  eventObject.toString = function () {
    return type;
  };

  return eventObject;
}
function pure(getActions) {
  return {
    type: types.ActionTypes.Pure,
    get: getActions
  };
}
/**
 * Forwards (sends) an event to a specified service.
 *
 * @param target The target service to forward the event to.
 * @param options Options to pass into the send action creator.
 */

function forwardTo(target, options) {
  return send(function (_, event) {
    return event;
  }, _tslib.__assign(_tslib.__assign({}, options), {
    to: target
  }));
}
/**
 * Escalates an error by sending it as an event to this machine's parent.
 *
 * @param errorData The error data to send, or the expression function that
 * takes in the `context`, `event`, and `meta`, and returns the error data to send.
 * @param options Options to pass into the send action creator.
 */

function escalate(errorData, options) {
  return sendParent(function (context, event, meta) {
    return {
      type: actionTypes.error,
      data: utils.isFunction(errorData) ? errorData(context, event, meta) : errorData
    };
  }, _tslib.__assign(_tslib.__assign({}, options), {
    to: types.SpecialTargets.Parent
  }));
}
function choose(conds) {
  return {
    type: types.ActionTypes.Choose,
    conds: conds
  };
}
function resolveActions(machine, currentState, currentContext, _event, actions, preserveActionOrder) {
  if (preserveActionOrder === void 0) {
    preserveActionOrder = false;
  }

  var _a = _tslib.__read(preserveActionOrder ? [[], actions] : utils.partition(actions, function (action) {
    return action.type === actionTypes.assign;
  }), 2),
      assignActions = _a[0],
      otherActions = _a[1];

  var updatedContext = assignActions.length ? utils.updateContext(currentContext, _event, assignActions, currentState) : currentContext;
  var preservedContexts = preserveActionOrder ? [currentContext] : undefined;
  var resolvedActions = utils.flatten(otherActions.map(function (actionObject) {
    var _a;

    switch (actionObject.type) {
      case actionTypes.raise:
        return resolveRaise(actionObject);

      case actionTypes.send:
        var sendAction = resolveSend(actionObject, updatedContext, _event, machine.options.delays); // TODO: fix ActionTypes.Init

        if (!environment.IS_PRODUCTION) {
          // warn after resolving as we can create better contextual message here
          utils.warn(!utils.isString(actionObject.delay) || typeof sendAction.delay === 'number', // tslint:disable-next-line:max-line-length
          "No delay reference for delay expression '" + actionObject.delay + "' was found on machine '" + machine.id + "'");
        }

        return sendAction;

      case actionTypes.log:
        return resolveLog(actionObject, updatedContext, _event);

      case actionTypes.choose:
        {
          var chooseAction = actionObject;
          var matchedActions = (_a = chooseAction.conds.find(function (condition) {
            var guard = utils.toGuard(condition.cond, machine.options.guards);
            return !guard || utils.evaluateGuard(machine, guard, updatedContext, _event, currentState);
          })) === null || _a === void 0 ? void 0 : _a.actions;

          if (!matchedActions) {
            return [];
          }

          var _b = _tslib.__read(resolveActions(machine, currentState, updatedContext, _event, toActionObjects(utils.toArray(matchedActions), machine.options.actions), preserveActionOrder), 2),
              resolvedActionsFromChoose = _b[0],
              resolvedContextFromChoose = _b[1];

          updatedContext = resolvedContextFromChoose;
          preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
          return resolvedActionsFromChoose;
        }

      case actionTypes.pure:
        {
          var matchedActions = actionObject.get(updatedContext, _event.data);

          if (!matchedActions) {
            return [];
          }

          var _c = _tslib.__read(resolveActions(machine, currentState, updatedContext, _event, toActionObjects(utils.toArray(matchedActions), machine.options.actions), preserveActionOrder), 2),
              resolvedActionsFromPure = _c[0],
              resolvedContext = _c[1];

          updatedContext = resolvedContext;
          preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
          return resolvedActionsFromPure;
        }

      case actionTypes.stop:
        {
          return resolveStop(actionObject, updatedContext, _event);
        }

      case actionTypes.assign:
        {
          updatedContext = utils.updateContext(updatedContext, _event, [actionObject], currentState);
          preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
          break;
        }

      default:
        var resolvedActionObject = toActionObject(actionObject, machine.options.actions);
        var exec_1 = resolvedActionObject.exec;

        if (exec_1 && preservedContexts) {
          var contextIndex_1 = preservedContexts.length - 1;

          resolvedActionObject.exec = function (_ctx) {
            var args = [];

            for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
            }

            exec_1 === null || exec_1 === void 0 ? void 0 : exec_1.apply(void 0, _tslib.__spreadArray([preservedContexts[contextIndex_1]], _tslib.__read(args)));
          };
        }

        return resolvedActionObject;
    }
  }).filter(function (a) {
    return !!a;
  }));
  return [resolvedActions, updatedContext];
}

exports.after = after;
exports.assign = assign;
exports.cancel = cancel;
exports.choose = choose;
exports.done = done;
exports.doneInvoke = doneInvoke;
exports.error = error;
exports.escalate = escalate;
exports.forwardTo = forwardTo;
exports.getActionFunction = getActionFunction;
exports.initEvent = initEvent;
exports.log = log;
exports.pure = pure;
exports.raise = raise;
exports.resolveActions = resolveActions;
exports.resolveLog = resolveLog;
exports.resolveRaise = resolveRaise;
exports.resolveSend = resolveSend;
exports.resolveStop = resolveStop;
exports.respond = respond;
exports.send = send;
exports.sendParent = sendParent;
exports.sendUpdate = sendUpdate;
exports.start = start;
exports.stop = stop;
exports.toActionObject = toActionObject;
exports.toActionObjects = toActionObjects;
exports.toActivityDefinition = toActivityDefinition;
