---
"@use-gesture/core": minor
"@use-gesture/react": minor
"@use-gesture/vanilla": minor
---

Add tap gesture with single/double tap and long press discrimination

New tap gesture provides discrimination between single taps, double taps, and long presses:

- **singleTap** - Confirmed after `tapTimeout` (180ms) with no second tap
- **doubleTap** - Two taps within `tapTimeout` window
- **longPress** - Pointer held for `longPressTimeout` ms
- **tapCount** - Number of taps detected (1 or 2)

Configuration options:
- `tapDiscrimination` - Enable single/double tap discrimination (default: true)
- `tapTimeout` - Max time between taps for double tap (default: 180ms)
- `longPressTimeout` - Time to trigger long press (default: 0 = disabled)
- `moveThreshold` - Max movement before tap is canceled (default: 10px)

Usage:
```tsx
// React
import { useTap } from '@use-gesture/react'

const bind = useTap(({ singleTap, doubleTap, longPress, tapCount }) => {
  if (singleTap) console.log('single tap')
  if (doubleTap) console.log('double tap')
  if (longPress) console.log('long press')
})
```
