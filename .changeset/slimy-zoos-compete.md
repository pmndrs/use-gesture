---
'@use-gesture/core': patch
---

ts: Typescript 4.8 introduced a new mapping definition for NonNullable which breaks the package types.

```ts
// Native NonNullable Utility Type

// definition on 4.7 and lower
type NonNullable<T> = T extends null | undefined ? never : T

// definition from 4.8
type NonNullable<T> = T & {}
```

This fix reverts the definition of NonNullable so that it works.
More information here: https://github.com/pmndrs/use-gesture/issues/501#issuecomment-1229486104
