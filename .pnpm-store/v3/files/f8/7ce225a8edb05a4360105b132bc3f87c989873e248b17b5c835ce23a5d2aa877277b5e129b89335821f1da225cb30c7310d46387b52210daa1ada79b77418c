# MDX-Observable

_**alpha project**, API may change significantly_

_0.2.0 does not actually use observables so the name may change 😬_

Interactive documents powered by Markdown, React, ~~and Observables~~

Share state between JSX blocks in a [MDX](https://mdxjs.com/) document

- **Declarative** React automatically updates observers when data changes
- **Write with Markdown** store documents in plain text that can be revision-controlled

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Examples](#examples)
- [API](#api)
  - [State](#state)
    - [Using render prop](#using-render-prop)
    - [Using context to connect Observe components](#using-context-to-connect-observe-components)
  - [Observe](#observe)
- [Alternatives](#alternatives)
  - [Notebooks](#notebooks)
  - [Other state management libraries for JS](#other-state-management-libraries-for-js)
- [Roadmap](#roadmap)
- [Potential Issues](#potential-issues)
  - [Usage outside MDX](#usage-outside-mdx)
  - [Warning about blank lines in JSX](#warning-about-blank-lines-in-jsx)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Examples

```
git clone git@github.com:alexkrolick/mdx-observable.git
cd mdx-observable
yarn install
yarn run demo
```

- [Counter w/Observer](./demo/counter.mdx)
- [Counter w/Render Prop](./demo/counter-child-function.mdx)
- [Simple Example](./demo/simple.mdx)
- [Complex Example](./demo/complex.mdx)

```jsx
// notebook.mdx
import { Init, Observe } from 'mdx-observable';

# Counter

<State initialState={{ count: 0 }}>

<Observe>
  {({ setState }) => (
    <button onClick={() => setState(s => ({ count: s.count + 1 }))}>
      Click me
    </button>
  )}
</Observe>

The button has been clicked:

<Observe>
  { ({...state}) => (<span>{state.count} times</span>) }
</Observe>

</State>
```

Example with a form, table, and graph running in [OK-MDX](https://github.com/jxnblk/ok-mdx):

<img width="1311" alt="screen shot 2018-08-25 at 11 33 32 pm" src="https://user-images.githubusercontent.com/1571667/44625478-a8dbd800-a8bf-11e8-8a27-4f56e89f40f2.png">

## API

### State

State container component

Props:

- `initialState: Object` - initial state
- `children: React.Children | function` Can either be:
  - React children: JSX or Markdown node(s)
  - A render prop: a single function that gets called with `{...state, setState}` as the argument

#### Using render prop

_Very similar to [React Powerplug's State](https://github.com/renatorib/react-powerplug/blob/master/docs/components/State.md)_

_Note: whitespace is sensitive in MDX,
so the awkward spacing below is important.
This PR may make this easier: https://github.com/mdx-js/mdx/pull/226_

```mdx
<State initialState={{}}>
{({setState, ...state}) => <React.Fragment>

<h1>Hello, World!</h1>

Some markdown

## Some header

- item a
- item b

</React.Fragment>}
</State>
```

#### Using context to connect Observe components

```mdx
<State initialState={{}}>

...child nodes...

<Observe>
  {({ ...state}) => <h1>Hello, World!</h1>}
</Observe>

...more child nodes...

</State>
```

### Observe

Component that re-renders when the global state changes.

Props:

- `children: ({...state, setState}) => React.Node`
  function that accepts an object with:
  - `setState`: function like React `setState`, can take an object or an updater function (`state => patch`); result is _shallow merged_ with current state
  - the rest of the global state

```js
<Observe>
  {({ setState, ...state }) => {
    return <div>{state.something}</div>;
  }}
</Observe>

<Observe>
  {({ setState, something }) => {
    return <div>{something</div>;
  }}
</Observe>
```

## Alternatives

### Notebooks

Advantages of MDX-Observable over [Jupyter](https://jupyter.org/) or [ObservableHQ](https://beta.observablehq.com/scratchpad):

- No cells to run; entire document is live
- Interactivity powered by predictable one-way data flow
- Use standard JS imports and any React component
- Produces static bundles
- Edit using preferred JS tooling
- Bundle with anything that supports [MDX](https://mdxjs.com/getting-started/), like Webpack, Gatsby, Parcel, etc.

### Other state management libraries for JS

Most state management libraries don't work with MDX because you can't define variables, meaning APIs like `const myStore = createStore();` are inaccessible. You can work around this by doing this work in another JS file and importing it, but the logic is hard to follow.

Some renderless/headless libraries thatwork fully inline are:

- https://github.com/renatorib/react-powerplug
- https://github.com/ianstormtaylor/react-values

However the whitespace sensitivity may make them difficult to use.

## Roadmap

- [x] See if `<Init />` could work as a wrapper instead of sibling of `<Observer />`. This would allow better scoping and safer setup/teardown.

- [ ] Some way to define functions inline. This might map well to the concept of "selectors" from Redux. Currently you can work around this gap by defining utilities in external JS files, but this makes it hard to write self-contained notebooks.

Possible API:

```js
<Init state={} selectors={{ selectCheapest: state => {/* compute */} }}>
```

- [x] Better live-reload support. MDX utils like `ok-mdx` do a full remount when the live editor changes or navigation occures; we could add a `restoreKey` to persist a namespaced cache within the module.

- [ ] **Add tests**

## Potential Issues

### Usage outside MDX

~~Technically `mdx-observable` doesn't depend on MDX for anything, but since it uses a singleton for a cache, it is not a good fit for state management in an app.~~

### Warning about blank lines in JSX

Currently (Aug 2018) the MDX parser doesn't allow putting blank lines inside of JSX blocks. If you see an error about "adjacent elements", this is probably why.

## License

See [LICENSE](./LICENSE)
