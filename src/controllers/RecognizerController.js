import { addListeners, removeListeners } from '../utils'

export default class RecognizerController {
  bindings = {}
  domListeners = []
  config = {}

  setConfig = config => {
    const { domTarget, ...rest } = config
    const realDomTarget = domTarget && 'current' in domTarget ? domTarget.current : domTarget
    this.config = { domTarget: realDomTarget, ...rest }
  }

  clean = () => {
    const { domTarget } = this.config
    removeListeners(domTarget, this.domListeners, this.config.event)
    this.domListeners = []
    this.bindings = {}
  }

  add = recognizer => {
    recognizer.getEventBindings().map(this.addEventBindings)
  }

  addEventBindings = ([events, fn]) => {
    if (!Array.isArray(events)) events = [events]
    events.forEach(event => (this.bindings[event] = this.bindings[event] ? [...this.bindings[event], fn] : [fn]))
  }

  addDomTargetListeners = config => {
    this.setConfig(config)
    const { domTarget } = this.config
    removeListeners(domTarget, this.domListeners, this.config.event)
    this.domListeners = []
    Object.entries(this.bindings).forEach(([k, fns]) => this.domListeners.push([k.substr(2).toLowerCase(), chainFns(...fns)]))
    addListeners(domTarget, this.domListeners, this.config.event)
  }

  getBindings = config => {
    const output = {}
    const captureString = config.event.capture ? 'Capture' : ''
    Object.entries(this.bindings).forEach(([event, fns]) => (output[event + captureString] = chainFns(...fns)))
    return output
  }
}

// returns a function that chains all functions given as parameters
const chainFns = (...fns) => (...args) => fns.forEach(fn => fn(...args))
