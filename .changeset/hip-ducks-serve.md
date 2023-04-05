---
'@use-gesture/core': patch
---

fix: add a try catch when calculating the distance and angle as apparently some events might be undefined on Windows #551
