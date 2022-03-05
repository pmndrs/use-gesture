---
'@use-gesture/core': patch
---

fix: delta is now derived from the `offset` value _after_ it is clamped by bounds.
