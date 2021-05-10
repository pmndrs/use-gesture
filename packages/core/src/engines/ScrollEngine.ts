import { CoordinatesEngine } from './CoordinatesEngine'
import { Scroll } from '../utils/events'
import { V } from '../utils/maths'

export class ScrollEngine extends CoordinatesEngine<'scroll'> {
  ingKey = 'scrolling' as const

  scroll(event: UIEvent) {
    if (!this.state._active) this.start(event)
    this.scrollChange(event)
    this.timeoutStore.add('scrollEnd', this.scrollEnd.bind(this))
  }

  scrollChange(event: UIEvent) {
    if (event.cancelable) event.preventDefault()
    const state = this.state
    const values = Scroll.values(event)
    state._delta = V.sub(values, state.values)
    V.addTo(state._movement, state._delta)
    state.values = values

    this.compute(event)
    this.emit()
  }

  scrollEnd() {
    if (!this.state._active) return
    this.state._active = false
    this.compute()
    this.emit()
  }

  bind(bindFunction: any) {
    bindFunction('scroll', '', this.scroll.bind(this))
  }
}
