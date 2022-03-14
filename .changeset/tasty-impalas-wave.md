---
'@use-gesture/core': patch
---

- fix: increase `PINCH_WHEEL_RATIO` to `100` to slow down zoom on wheel-based devices.
- fix: force drag to start no matter the threshold when delay is reached.
- fix: improve `preventScroll`.
