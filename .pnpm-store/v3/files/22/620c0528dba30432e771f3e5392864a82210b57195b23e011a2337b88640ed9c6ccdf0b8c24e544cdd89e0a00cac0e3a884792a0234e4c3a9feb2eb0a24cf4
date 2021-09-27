function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { getCompletion } from './getCompletion';
export function createStore(reducer, props) {
  return {
    state: props.initialState,
    getState: function getState() {
      return this.state;
    },
    send: function send(action, payload) {
      this.state = withCompletion(reducer({
        type: action,
        value: payload
      }, this.state, props), props);
      props.onStateChange({
        state: this.state
      });
    }
  };
}

function withCompletion(state, props) {
  return _objectSpread(_objectSpread({}, state), {}, {
    completion: getCompletion({
      state: state,
      props: props
    })
  });
}