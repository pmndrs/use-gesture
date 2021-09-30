import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { useReducer, useCallback, useEffect } from 'react';
import { useLiveRef } from 'reakit-utils/useLiveRef';
import { useSealedState } from 'reakit-utils/useSealedState';
import { useUpdateEffect } from 'reakit-utils/useUpdateEffect';
import '../Id/IdProvider.js';
import { unstable_useIdState } from '../Id/IdState.js';
import { isEmpty } from 'reakit-utils/isEmpty';
import { unstable_getIn } from './utils/getIn.js';
import { isPromise } from 'reakit-utils/isPromise';
import { isPlainObject } from 'reakit-utils/isPlainObject';
import { isObject } from 'reakit-utils/isObject';
import { unstable_setAllIn } from './utils/setAllIn.js';
import 'reakit-utils/toArray';
import 'reakit-utils/isInteger';
import { unstable_setIn } from './utils/setIn.js';

function filterAllEmpty(object) {
  if (Array.isArray(object)) {
    return object.filter(function (value) {
      if (isPlainObject(value) || Array.isArray(value)) {
        return filterAllEmpty(value);
      }

      return true;
    });
  }

  var result = {};
  var keys = Object.keys(object);

  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var key = _keys[_i];
    var k = key;
    var value = object[k];
    result[k] = isPlainObject(value) || Array.isArray(value) ? filterAllEmpty(value) : object[k];
  }

  return result;
}

function hasMessages(errors) {
  return isObject(errors) && !isEmpty(errors);
}

function getMessages(stateMessages, actionMessages) {
  return !isEmpty(actionMessages) ? actionMessages : isEmpty(stateMessages) ? stateMessages : {};
}

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          values: state.initialValues,
          touched: {},
          errors: {},
          messages: {},
          valid: true,
          validating: false,
          submitting: false,
          submitFailed: 0,
          submitSucceed: 0
        });
      }

    case "startValidate":
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          validating: true
        });
      }

    case "endValidate":
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          validating: false,
          errors: getMessages(state.errors, action.errors),
          messages: getMessages(state.messages, action.messages),
          valid: !hasMessages(action.errors)
        });
      }

    case "startSubmit":
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          // @ts-ignore TS bug
          touched: unstable_setAllIn(state.values, true),
          submitting: true
        });
      }

    case "endSubmit":
      {
        var valid = !hasMessages(action.errors);
        return _objectSpread2(_objectSpread2({}, state), {}, {
          valid: valid,
          submitting: false,
          errors: getMessages(state.errors, action.errors),
          messages: getMessages(state.messages, action.messages),
          submitSucceed: valid ? state.submitSucceed + 1 : state.submitSucceed,
          submitFailed: valid ? state.submitFailed : state.submitFailed + 1
        });
      }

    case "update":
      {
        var _name = action.name,
            _value = action.value;
        var nextValue = typeof _value === "function" ? _value(unstable_getIn(state.values, _name)) : _value;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          values: unstable_setIn(state.values, _name, nextValue != null ? nextValue : "")
        });
      }

    case "blur":
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          touched: unstable_setIn(state.touched, action.name, true)
        });
      }

    case "push":
      {
        var array = unstable_getIn(state.values, action.name, []);
        return _objectSpread2(_objectSpread2({}, state), {}, {
          values: unstable_setIn(state.values, action.name, [].concat(array, [action.value]))
        });
      }

    case "remove":
      {
        var _array = unstable_getIn(state.values, action.name, []).slice();

        delete _array[action.index];
        return _objectSpread2(_objectSpread2({}, state), {}, {
          values: unstable_setIn(state.values, action.name, _array)
        });
      }

    default:
      {
        throw new Error();
      }
  }
}

function unstable_useFormState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState(initialState),
      _useSealedState$value = _useSealedState.values,
      initialValues = _useSealedState$value === void 0 ? {} : _useSealedState$value,
      _useSealedState$valid = _useSealedState.validateOnBlur,
      validateOnBlur = _useSealedState$valid === void 0 ? true : _useSealedState$valid,
      _useSealedState$valid2 = _useSealedState.validateOnChange,
      validateOnChange = _useSealedState$valid2 === void 0 ? true : _useSealedState$valid2,
      _useSealedState$reset = _useSealedState.resetOnSubmitSucceed,
      resetOnSubmitSucceed = _useSealedState$reset === void 0 ? false : _useSealedState$reset,
      _useSealedState$reset2 = _useSealedState.resetOnUnmount,
      resetOnUnmount = _useSealedState$reset2 === void 0 ? true : _useSealedState$reset2,
      onValidate = _useSealedState.onValidate,
      onSubmit = _useSealedState.onSubmit,
      sealed = _objectWithoutPropertiesLoose(_useSealedState, ["values", "validateOnBlur", "validateOnChange", "resetOnSubmitSucceed", "resetOnUnmount", "onValidate", "onSubmit"]);

  var onValidateRef = useLiveRef(typeof initialState !== "function" ? initialState.onValidate : onValidate);
  var onSubmitRef = useLiveRef(typeof initialState !== "function" ? initialState.onSubmit : onSubmit);
  var id = unstable_useIdState(sealed);

  var _React$useReducer = useReducer(reducer, {
    initialValues: initialValues,
    values: initialValues,
    touched: {},
    errors: {},
    messages: {},
    valid: true,
    validating: false,
    submitting: false,
    submitFailed: 0,
    submitSucceed: 0
  }),
      _React$useReducer$ = _React$useReducer[0],
      _ = _React$useReducer$.initialValues,
      state = _objectWithoutPropertiesLoose(_React$useReducer$, ["initialValues"]),
      dispatch = _React$useReducer[1];

  var validate = useCallback(function (vals) {
    if (vals === void 0) {
      vals = state.values;
    }

    return new Promise(function (resolve) {
      if (onValidateRef.current) {
        var response = onValidateRef.current(vals);

        if (isPromise(response)) {
          dispatch({
            type: "startValidate"
          });
        }

        resolve(Promise.resolve(response).then(function (messages) {
          dispatch({
            type: "endValidate",
            messages: messages
          });
          return messages;
        }));
      } else {
        resolve(undefined);
      }
    }).catch(function (errors) {
      dispatch({
        type: "endValidate",
        errors: errors
      });
      throw errors;
    });
  }, [state.values]);
  useUpdateEffect(function () {
    if (validateOnChange) {
      validate().catch(function () {});
    }
  }, [validate, validateOnChange]);
  useEffect(function () {
    if (resetOnUnmount) {
      return function () {
        dispatch({
          type: "reset"
        });
      };
    }

    return undefined;
  }, [resetOnUnmount]);
  return _objectSpread2(_objectSpread2(_objectSpread2({}, id), state), {}, {
    values: state.values,
    validate: validate,
    reset: useCallback(function () {
      return dispatch({
        type: "reset"
      });
    }, []),
    submit: useCallback(function () {
      dispatch({
        type: "startSubmit"
      });
      return validate().then(function (validateMessages) {
        if (onSubmitRef.current) {
          return Promise.resolve(onSubmitRef.current(filterAllEmpty(state.values))).then(function (submitMessages) {
            var messages = _objectSpread2(_objectSpread2({}, validateMessages), submitMessages);

            dispatch({
              type: "endSubmit",
              messages: messages
            });
          });
        }

        return dispatch({
          type: "endSubmit",
          messages: validateMessages
        });
      }).then(function () {
        if (resetOnSubmitSucceed) {
          dispatch({
            type: "reset"
          });
        }
      }).catch(function (errors) {
        dispatch({
          type: "endSubmit",
          errors: errors
        });
      });
    }, [validate]),
    update: useCallback(function (name, value) {
      return dispatch({
        type: "update",
        name: name,
        value: value
      });
    }, []),
    blur: useCallback(function (name) {
      dispatch({
        type: "blur",
        name: name
      });

      if (validateOnBlur) {
        validate().catch(function () {});
      }
    }, [validate]),
    push: useCallback(function (name, value) {
      return dispatch({
        type: "push",
        name: name,
        value: value
      });
    }, []),
    remove: useCallback(function (name, index) {
      return dispatch({
        type: "remove",
        name: name,
        index: index
      });
    }, [])
  });
}

export { unstable_useFormState };
