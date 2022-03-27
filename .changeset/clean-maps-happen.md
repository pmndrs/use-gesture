---
'@use-gesture/core': patch
---

- fix: trigger `pointerDown` event when `triggerAllEvents` and `delay` options are set.
- fix: disable scroll prevention when the event type is `'mouse'`
- feat: add `axisThreshold` property to set a threshold for axis calculation (can be set per device for the drag gesture).
