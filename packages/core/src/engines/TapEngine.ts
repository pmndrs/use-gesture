import { CoordinatesEngine } from './CoordinatesEngine'
import { pointerId, pointerValues } from '../utils/events'

export class TapEngine extends CoordinatesEngine<'tap'> {
  ingKey = 'tapping' as const

  init() {
    super.init()
    const state = this.state as any
    state._pointerId = undefined
    state._pointerActive = false
    state._waitingForSecondTap = false
    state._longPressTriggered = false
    state.tapCount = 0
    state.singleTap = false
    state.doubleTap = false
    state.longPress = false
    state._lastUpTime = 0
    state._initialXY = [0, 0]
  }

  reset() {
    super.reset()
    const state = this.state as any
    state._pointerId = undefined
    state._pointerActive = false
    state._waitingForSecondTap = false
    state._longPressTriggered = false
    state.tapCount = 0
    state.singleTap = false
    state.doubleTap = false
    state.longPress = false
    state._lastUpTime = 0
  }

  computeOffset() {
    // Tap doesn't track offset
  }

  computeMovement() {
    // Tap doesn't track movement in the traditional sense
  }

  pointerDown(event: PointerEvent) {
    const config = this.config as any
    const state = this.state as any

    // Check pointer buttons
    if (
      event.buttons != null &&
      (Array.isArray(config.pointerButtons)
        ? !config.pointerButtons.includes(event.buttons)
        : config.pointerButtons !== -1 && config.pointerButtons !== event.buttons)
    ) {
      return
    }

    // Ignore touch if mouseOnly is true
    if (config.mouseOnly && event.pointerType !== 'mouse') return

    this.start(event)

    // Setup pointer capture
    if (config.pointerCapture) {
      ;(event.target as HTMLElement).setPointerCapture(event.pointerId)
    }

    // Store initial position for movement threshold check
    state._initialXY = [event.clientX, event.clientY]

    state._pointerId = pointerId(event)
    state._pointerActive = true
    state._longPressTriggered = false
    state.longPress = false

    // Setup long press timeout
    if (config.longPressTimeout > 0) {
      this.timeoutStore.add(
        'longPress',
        () => {
          if (state._pointerActive) {
            state._longPressTriggered = true
            state.longPress = true
            state._active = true
            this.compute(event)
            this.emit()
          }
        },
        config.longPressTimeout
      )
    }

    // Cancel pending single tap confirmation if second tap comes quickly
    if (state._waitingForSecondTap) {
      this.timeoutStore.remove('tapDiscrimination')
    }

    this.computeValues(pointerValues(event))
    this.computeInitial()

    // Set intentional to true and emit so tapping state is available
    state._active = true
    state.intentional = true
    this.compute(event)
    this.emit()
  }

  pointerMove(event: PointerEvent) {
    const state = this.state as any
    const config = this.config as any

    if (!state._pointerActive || state._pointerId !== pointerId(event)) return

    // Check if movement exceeds threshold - if so, cancel the tap
    const dx = Math.abs(event.clientX - state._initialXY[0])
    const dy = Math.abs(event.clientY - state._initialXY[1])

    if (dx > config.moveThreshold || dy > config.moveThreshold) {
      this.cancel()
    }
  }

  pointerUp(event: PointerEvent) {
    const state = this.state as any
    const config = this.config as any
    const eventPointerId = pointerId(event)

    // Cancel long press timeout
    this.timeoutStore.remove('longPress')

    if (!state._pointerActive || state._pointerId !== eventPointerId) return

    state._pointerActive = false
    state.xy = [event.clientX, event.clientY]
    state.values = state.xy

    // If long press was triggered, don't fire tap
    if (state._longPressTriggered) {
      this.clean()
      return
    }

    // Handle tap discrimination
    if (config.tapDiscrimination) {
      const now = event.timeStamp
      const timeSinceLastUp = now - state._lastUpTime

      if (timeSinceLastUp <= config.tapTimeout && state.tapCount === 1) {
        // Double tap detected
        state.tapCount = 2
        state.doubleTap = true
        state.singleTap = false
        state._waitingForSecondTap = false
        this.timeoutStore.remove('tapDiscrimination')
        state._active = false // Set to false to signal gesture ending
        state.intentional = true
        state._force = true
        this.compute(event)
        this.emit()
        this.clean()
      } else {
        // First tap - wait to confirm single
        state.tapCount = 1
        state._waitingForSecondTap = true
        state._lastUpTime = now

        this.timeoutStore.add(
          'tapDiscrimination',
          () => {
            if (state.tapCount === 1) {
              state.singleTap = true
              state._waitingForSecondTap = false
              state._active = false // Set to false to signal gesture ending
              state.intentional = true
              state._force = true
              this.compute(event)
              this.emit()
              this.clean()
            }
          },
          config.tapTimeout
        )
        // Don't call clean() here - it would clear the timeout we just set
        // Only clean event store, not timeout store
        this.eventStore.clean()
      }
    } else {
      // No discrimination - immediate tap
      state.tapCount = 1
      state._active = false // Set to false to signal gesture ending
      state.intentional = true
      state._force = true
      this.compute(event)
      this.emit()
      this.clean()
    }
  }

  cancel() {
    const state = this.state as any
    if (state.canceled) return
    state.canceled = true
    this.timeoutStore.remove('longPress')
    this.timeoutStore.remove('tapDiscrimination')
    state._pointerActive = false
    state._waitingForSecondTap = false
    state._active = false
    this.compute()
    this.emit()
  }

  bind(bindFunction: any) {
    bindFunction('pointer', 'down', this.pointerDown.bind(this))
    bindFunction('pointer', 'move', this.pointerMove.bind(this))
    bindFunction('pointer', 'up', this.pointerUp.bind(this))
  }
}
