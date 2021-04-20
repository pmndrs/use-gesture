const EVENT_TYPE_MAP = {
  pointer: { down: 'down', move: 'move', up: 'up' },
  mouse: { down: 'down', move: 'move', up: 'up' },
  touch: { down: 'start', move: 'move', up: 'end' }
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1)
}

export function toReactHandlerProp(device, action) {
  const deviceKey = EVENT_TYPE_MAP[device]
  const actionKey = deviceKey ? deviceKey[action] : action
  return 'on' + capitalize(device) + capitalize(actionKey)
}

export function toDomHandlerProp(device, action) {
  const deviceKey = EVENT_TYPE_MAP[device]
  const actionKey = deviceKey ? deviceKey[action] : action
  return device + actionKey
}

function isTouch(event) {
  return event.touches
}

function getValueEvent(event) {
  return isTouch(event) ? (event.type === 'touchend' ? event.changedTouches[0] : event.targetTouches[0]) : event
}

export const Pointer = {
  id(event) {
    const valueEvent = getValueEvent(event)
    return isTouch(event) ? valueEvent.identifier : valueEvent.pointerId
  },
  values(event) {
    const valueEvent = getValueEvent(event)
    // if (valueEvent.uv) return [valueEvent.uv.x, valueEvent.uv.y]
    return [valueEvent.clientX, valueEvent.clientY]
  }
}
