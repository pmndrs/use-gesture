---
'@use-gesture/core': patch
---

Ignore pointerdown events whose pointer is no longer active. `setPointerCapture` throws `NotFoundError` (formerly `InvalidPointerId`) for forwarded or replayed pointer events; drag and pinch now skip those events instead of throwing or starting a gesture that can never end.
