---
'@use-gesture/core': patch
---

fix(drag): wrap `setPointerCapture` in try/catch to swallow `InvalidPointerId` DOMException when the pointer has already been released or is otherwise invalid by the time the engine sees the event. Restores drag interactions on Safari/iOS edge cases (e.g. quick tap-and-release) without affecting normal pointer capture.
