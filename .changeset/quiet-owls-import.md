---
'@use-gesture/core': patch
---

fix: add `import` condition to `exports` so ESM resolvers that don't honour `module` no longer hit CJS builds (conflicting star exports for `__esModule`) #682
