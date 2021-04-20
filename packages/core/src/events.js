const EVENT_TYPE_MAP = {
  pointer: { down: 'down', move: 'move', up: 'up' },
  mouse: { down: 'down', move: 'move', up: 'up' },
  touch: { down: 'start', move: 'move', up: 'end' }
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1)
}

export function toReactHandlerProp(device, action) {
  const _action = EVENT_TYPE_MAP[device][action]
  return 'on' + capitalize(device) + capitalize(_action)
}

export function toDomHandlerProp(device, action) {
  const _action = EVENT_TYPE_MAP[device][action]
  return device + _action
}

function isTouch(event) {
  return event.touches
}

function getValueEvent(event) {
  return isTouch(event) ? (event.type === 'touchend' ? event.changedTouches[0] : event.targetTouches[0]) : event
}

export const PointerHelper = {
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
