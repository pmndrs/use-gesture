export type VueEvents = {
  // clipboard events
  copy: ClipboardEvent
  cut: ClipboardEvent
  paste: ClipboardEvent

  // composition events
  compositionend: CompositionEvent
  compositionstart: CompositionEvent
  compositionupdate: CompositionEvent

  // drag drop events
  drag: DragEvent
  dragend: DragEvent
  dragenter: DragEvent
  dragexit: DragEvent
  dragleave: DragEvent
  dragover: DragEvent
  dragstart: DragEvent
  drop: DragEvent

  // focus events
  focus: FocusEvent
  focusin: FocusEvent
  focusout: FocusEvent
  blur: FocusEvent

  // form events
  change: Event
  beforeinput: Event
  input: Event
  reset: Event
  submit: Event
  invalid: Event

  // image events
  load: Event
  error: Event

  // keyboard events
  keydown: KeyboardEvent
  keypress: KeyboardEvent
  keyup: KeyboardEvent

  // mouse events
  auxclick: MouseEvent
  click: MouseEvent
  contextmenu: MouseEvent
  dblclick: MouseEvent
  mousedown: MouseEvent
  mouseenter: MouseEvent
  mouseleave: MouseEvent
  mousemove: MouseEvent
  mouseout: MouseEvent
  mouseover: MouseEvent
  mouseup: MouseEvent

  // media events
  abort: Event
  canplay: Event
  canplaythrough: Event
  durationchange: Event
  emptied: Event
  encrypted: Event
  ended: Event
  loadeddata: Event
  loadedmetadata: Event
  loadstart: Event
  pause: Event
  play: Event
  playing: Event
  progress: Event
  ratechange: Event
  seeked: Event
  seeking: Event
  stalled: Event
  suspend: Event
  timeupdate: Event
  volumechange: Event
  waiting: Event

  // selection events
  select: Event

  // UI events
  scroll: UIEvent

  // touch events
  touchcancel: TouchEvent
  touchend: TouchEvent
  touchmove: TouchEvent
  touchstart: TouchEvent

  // pointer events
  pointerdown: PointerEvent
  pointermove: PointerEvent
  pointerup: PointerEvent
  pointercancel: PointerEvent
  pointerenter: PointerEvent
  pointerleave: PointerEvent
  pointerover: PointerEvent
  pointerout: PointerEvent

  // wheel events
  wheel: WheelEvent

  // animation events
  animationstart: AnimationEvent
  animationend: AnimationEvent
  animationiteration: AnimationEvent

  // transition events
  transitionend: TransitionEvent
  transitionstart: TransitionEvent
}
