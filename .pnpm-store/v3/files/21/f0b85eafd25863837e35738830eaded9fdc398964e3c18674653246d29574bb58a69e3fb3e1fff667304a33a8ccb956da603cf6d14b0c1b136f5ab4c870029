<p align="left">
  <a id="cover" href="#cover"><img src="img/cover.svg" alt="This library allows you to create cached assets, which can be promises, async functions or even dynamic imports. These assets then have the ability to suspend the component in which they are read. This makes it easier to orchestrate async tasks and gives you the ability to set up fallbacks and error-handling declaratively." /></a>
</p>

[![Build Size](https://img.shields.io/bundlephobia/min/use-asset?label=bunlde%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=use-asset)
[![Build Status](https://img.shields.io/travis/pmndrs/use-asset/master?style=flat&colorA=000000&colorB=000000)](https://travis-ci.org/pmndrs/use-asset)
[![Version](https://img.shields.io/npm/v/use-asset?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/use-asset)
[![Downloads](https://img.shields.io/npm/dt/use-asset.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/use-asset)

<p align="left">
  <a id="async-assets" href="#async-assets"><img src="img/async-assets.svg" alt="Dealing with async assets" /></a>
</p>

<p align="left">
  <a id="using-assets" href="#using-assets"><img src="img/createAsset.svg" alt="Types" /></a>
</p>

Each asset you create comes with its own cache. When you request something from it, the arguments that you pass will act as cache-keys. If you request later on using the same keys, it won't have to re-fetch but serves the result that it already knows.

```jsx
import React, { Suspense } from "react"
import { createAsset } from "use-asset"

const asset = createAsset(async (id, version) => {
  const res = await fetch(`https://hacker-news.firebaseio.com/${version}/item/${id}.json`)
  return await res.json()
})

function Post({ id }) {
  const { by, title } = asset.read(id, "v0")
  return <div>{title} by {by}</div>
}

function App() {
  <Suspense fallback={null}>
    <Post id={10000} />
  </Suspense>
}
```

#### Preloading assets

```jsx
// You can preload assets, these will be executed and cached immediately
asset.preload("/image.png")
```

#### Cache busting strategies

```jsx
// This asset will be removed from the cache in 15 seconds
const asset = createAsset(promiseFn, 15000)
// Clear all cached entries
asset.clear()
// Clear a specific entry
asset.clear("/image.png")
```

#### Peeking into entries outside of suspense

```jsx
// This will either return the value (without suspense!) or undefined
asset.peek("/image.png")
```

<p align="left">
  <a id="hooks-global-cache" href="#hooks-global-cache"><img src="img/hooks-global-cache.svg" alt="Hooks and global cache" /></a>
</p>

<p align="left">
  <a id="cover" href="#hooks-and-global-cache"><img src="img/useAsset.svg" alt="Types" /></a>
</p>

You can also use the `useAsset` hook, which is modelled after [react-promise-suspense](https://github.com/vigzmv/react-promise-suspense). This makes it possible to define assets on the spot instead of having to define them externally. They use a global cache, anything you request at any time is written into it.

```jsx
import { useAsset } from "use-asset"

function Post({ id }) {
  const { by, title } = useAsset(fn, id)
  return <div>{title} by {by}</div>
}

function App() {
  <Suspense fallback={null}>
    <Post id={1000} />
```

#### Cache busting, preload and peeking

The hook has the same API as any asset:

```jsx
// Bust cache in 15 seconds
useAsset.lifespan = 15000
useAsset(promiseFn, "/image.png")
// Clear all cached entries
useAsset.clear()
// Clear a specific entry
useAsset.clear("/image.png")
// Preload entries
useAsset.preload(promiseFn, "/image.png")
// This will either return the value (without suspense!) or undefined
useAsset.peek("/image.png")
```

<p align="left">
  <a id="recipes" href="#recipes"><img src="img/recipes.svg" alt="Recipes" /></a>
</p>

#### Simple data fetching

Fetching posts from hacker-news: [codesandbox](https://codesandbox.io/s/use-asset-demo-forked-ji8ky)

#### Infinite load on scroll

Fetching HN posts infinitely: [codesandbox](https://codesandbox.io/s/use-asset-forked-ouzkc)

#### Async dependencies

Component A waits for the result of component B: [codesandbox](https://codesandbox.io/s/use-asset-dependency-70908)
