# dom-accessibility-api changelog

## 0.5.6

### Patch Changes

- [#666](https://github.com/eps1lon/dom-accessibility-api/pull/666) [`26ee73d`](https://github.com/eps1lon/dom-accessibility-api/commit/26ee73de9ad6fce27cde0d5ec53a2bc4a12bd879) Thanks [@eps1lon](https://github.com/eps1lon)! - Consider `<label />` when computing the accessible name of `<output />`

  Given

  ```html
  <label for="outputid">Output Label</label> <output id="outputid"></output>
  ```

  Previously the accessible name of the `<output />` would ignore the `<label />`.
  However, an [`<output />` is labelable](https://html.spec.whatwg.org/#the-output-element) and therefore the accessible name is now computed using `<label />` elements if they exists.
  In this example the accessible name is `"Output Label"`.

## 0.5.5

### Patch Changes

- [#627](https://github.com/eps1lon/dom-accessibility-api/pull/627) [`0485441`](https://github.com/eps1lon/dom-accessibility-api/commit/0485441e68cf728596d7140bdff2ac13280eefab) Thanks [@eps1lon](https://github.com/eps1lon)! - Ensure certain babel helpers aren't required

  Source:

  ```diff
  -const [item] = list;
  +const item = list[0];
  ```

  Transpiled:

  ```diff
  -var _trim$split = list.trim().split(" "),
  -_trim$split2 = _slicedToArray(_trim$split, 1),
  -item = _trim$split2[0]
  +var item = list[0];
  ```

* [#629](https://github.com/eps1lon/dom-accessibility-api/pull/629) [`383bdb6`](https://github.com/eps1lon/dom-accessibility-api/commit/383bdb616c00105474c8607dd9e5aab4deaff7ed) Thanks [@eps1lon](https://github.com/eps1lon)! - Use label attribute for naming of `<optgroup>` elements.

  Given

  ```jsx
  <select>
  	<optgroup label="foo">
  		<option value="1">bar</option>
  	</optgroup>
  </select>
  ```

  Previously the `<optgroup />` would not have an accessible name.
  Though [2D in `accname` 1.2](https://www.w3.org/TR/accname-1.2/) could be interpreted to use the `label` attribute:

  > Otherwise, if the current node's native markup provides an attribute (e.g. title) or element (e.g. HTML label) that defines a text alternative, return that alternative [...]

  This was confirmed in NVDA + FireFox.

## 0.5.4

### Patch Changes

- [`3866289`](https://github.com/eps1lon/dom-accessibility-api/commit/3866289a6ad92b73a8c031a2983165e1b1f2b24c) [#442](https://github.com/eps1lon/dom-accessibility-api/pull/442) Thanks [@geoffrich](https://github.com/geoffrich)! - Correctly determine accessible name when element contains a slot.

  Previously, computing the accessible name would only examine child nodes. However, content placed in a slot is is an assigned node, not a child node.

  If you have a custom element `custom-button` with a slot:

  ```html
  <button><slot></slot></button>

  <!-- accname of inner <button> is 'Custom name' (previously '') -->
  <custom-button>Custom name</custom-button>
  ```

  If you have a custom element `custom-button-default` with default content in the slot:

  ```html
  <button><slot>Default name</slot></button>

  <!-- accname of inner <button> is 'Custom name' (previously 'Default name') -->
  <custom-button-default>Custom name</custom-button-default>

  <!-- accname of inner <button> is 'Default name' (previously 'Default name') -->
  <custom-button-default></custom-button-default>
  ```

  This is not currently defined in the accname spec but reflects current browser behavior.

## 0.5.3

### Patch Changes

- [`76e8f93`](https://github.com/eps1lon/dom-accessibility-api/commit/76e8f93ccd8d6d3464d1b362a22163c501b9ea37) [#430](https://github.com/eps1lon/dom-accessibility-api/pull/430) Thanks [@ckundo](https://github.com/ckundo)! - Maintain `img` role for `img` with missing `alt` attribute.

  Previously `<img />` would be treated the same as `<img alt />`.
  `<img />` is now treated as `role="img"` [as specified](https://w3c.github.io/html-aam/#el-img-empty-alt).

* [`96d4438`](https://github.com/eps1lon/dom-accessibility-api/commit/96d443855b897fccb9fa09d5f595c502b23e6cf9) [#436](https://github.com/eps1lon/dom-accessibility-api/pull/436) Thanks [@eps1lon](https://github.com/eps1lon)! - Resolve presentational role conflicts when global WAI-ARIA states or properties (ARIA attributes) are used.

  `<img alt="" />` used to have no role.
  [By spec](https://w3c.github.io/html-aam/#el-img-empty-alt) it should have `role="presentation"` with no ARIA attributes or `role="img"` [otherwise](https://rawgit.com/w3c/aria/stable/#conflict_resolution_presentation_none).

## 0.5.2

### Patch Changes

- [`03273b7`](https://github.com/eps1lon/dom-accessibility-api/commit/03273b7d91a156a6dd9c727293a491cd2d1f02f1) [#406](https://github.com/eps1lon/dom-accessibility-api/pull/406) Thanks [@eps1lon](https://github.com/eps1lon)! - Fix various issues for input types `submit`, `reset` and `image`

  Prefer input `value` when `type` is `reset` or `submit`:

  ```diff
  <input type="submit" value="Submit values">
  -// accessible name: "Submit"
  +// accessible name: "Submit values"
  <input type="reset" value="Reset form">
  -// accessible name: "Reset"
  +// accessible name: "Reset form"
  ```

  For input `type` `image` consider `alt` attribute or fall back to `"Submit query"`.

## 0.5.1

### Patch Changes

- [`fcc66ae`](https://github.com/eps1lon/dom-accessibility-api/commit/fcc66aef833b8c7546921800e09cbb2096ef9601) [#394](https://github.com/eps1lon/dom-accessibility-api/pull/394) Thanks [@marcosvega91](https://github.com/marcosvega91)! - Ignore `title` attribute if it is empty.

  Previously `<button title="">Hello, Dave!</button>` would wrongly compute an empty name.

## 0.5.0

### Minor Changes

- [`9e46c51`](https://github.com/eps1lon/dom-accessibility-api/commit/9e46c51b51993c65237efd4b0d046f1a35c3e76a) [#380](https://github.com/eps1lon/dom-accessibility-api/pull/380) Thanks [@eps1lon](https://github.com/eps1lon)! - **BREAKING CHANGE**

  Ignore `::before` and `::after` by default.

  This was necessary to prevent excessive warnings in `jsdom@^16.4.0`.
  If you use this package in a browser that supports the second argument of `window.getComputedStyle` you can set the `computedStyleSupportsPseudoElements` option to true:

  ```ts
  computeAccessibleName(element, {
  	computedStyleSupportsPseudoElements: true
  });

  computeAccessibleDescription(element, {
  	computedStyleSupportsPseudoElements: true
  });
  ```

  If you pass a custom implementation of `getComputedStyle` then this option defaults to `true`.
  The following two calls are equivalent:

  ```ts
  computeAccessibleName(element, {
  	computedStyleSupportsPseudoElements: true
  });

  computeAccessibleName(element, {
  	getComputedStyle: (element, pseudoElement) => {
  		// custom implementation
  	}
  });
  ```

### Patch Changes

- [`5db24b1`](https://github.com/eps1lon/dom-accessibility-api/commit/5db24b1fa0c75a5914526de1c58da54db294f405) [#368](https://github.com/eps1lon/dom-accessibility-api/pull/368) Thanks [@eps1lon](https://github.com/eps1lon)! - Use `localName` to determine elements instead of `tagName`.

## 0.4.7

### Patch Changes

- [`d6c4455`](https://github.com/eps1lon/dom-accessibility-api/commit/d6c44558250e898caa68e7b3eaa2f4d505078b3e) [#352](https://github.com/eps1lon/dom-accessibility-api/pull/352) Thanks [@eps1lon](https://github.com/eps1lon)! - Support native labels in IE 11

  Also affects Edge < 18 and Firefox < 56.

## 0.4.6

### Patch Changes

- [`85f0032`](https://github.com/eps1lon/dom-accessibility-api/commit/85f0032e0ec9203df7e4e5d0c3c8a206ac1968c1) [#324](https://github.com/eps1lon/dom-accessibility-api/pull/324) Thanks [@juanca](https://github.com/juanca)! - Consider `<title>` for the name of its `<svg>` element.

* [`f7c1981`](https://github.com/eps1lon/dom-accessibility-api/commit/f7c19812307e8847dbe1b678a3bafdc6dbf7f23b) [#288](https://github.com/eps1lon/dom-accessibility-api/pull/288) Thanks [@eps1lon](https://github.com/eps1lon)! - Drop node 13 support

  We only stopped testing. Probability of breakage should be very low.

  **New policy**:

  > Only [active node versions](https://nodejs.org/en/about/releases/) are supported.
  > Inactive node versions can stop working in a SemVer MINOR release.

- [`fa53c51`](https://github.com/eps1lon/dom-accessibility-api/commit/fa53c510d8aab6cf3561c91949f1df3a52a500a8) [#210](https://github.com/eps1lon/dom-accessibility-api/pull/210) Thanks [@eps1lon](https://github.com/eps1lon)! - Implement accessbile description computation

  ```ts
  import { computeAccessibleDescription } from "dom-accessibility-api";

  const description = computeAccessibleDescription(element);
  ```

  Warning: It always considers `title` attributes if the description is empty.
  Even if the `title` attribute was already used for the accessible name.
  This is fails a web-platform-test.
  The other failing test is due to `aria-label` being ignored for the description which is correct by spec.
  It's likely an issue with wpt.
  The other tests are passing (13/15).

## 0.4.5

### Patch Changes

- [`d668f72`](https://github.com/eps1lon/dom-accessibility-api/commit/d668f724aeb42cb71d720e0acd3518a03bbbee6e) [#273](https://github.com/eps1lon/dom-accessibility-api/pull/273) Thanks [@eps1lon](https://github.com/eps1lon)! - fix: Concatenate text nodes without space

  Fixes `<h1>Hello {name}!</h1>` in `react` computing `"Hello name !"` instead of `Hello name!`.

## 0.4.4

### Patch Changes

- [`e79f620`](https://github.com/eps1lon/dom-accessibility-api/commit/e79f6209667b3b2de656a73dec0eea37c65d48a9) [#208](https://github.com/eps1lon/dom-accessibility-api/pull/208) Thanks [@eps1lon](https://github.com/eps1lon)! - Add support for node 14

* [`2c6a23b`](https://github.com/eps1lon/dom-accessibility-api/commit/2c6a23b3ec3e514d7db631e393749fac0ab33b5b) [#200](https://github.com/eps1lon/dom-accessibility-api/pull/200) Thanks [@eps1lon](https://github.com/eps1lon)! - Add `module` field

- [`737dfae`](https://github.com/eps1lon/dom-accessibility-api/commit/737dfae2b88a4ce94d59144a6aabf69f0a671edc) [#234](https://github.com/eps1lon/dom-accessibility-api/pull/234) Thanks [@willamzv](https://github.com/willamzv)! - Consider `<legend>` for the name of its `<fieldset>` element.

  ```html
  <fieldset>
  	<legend><em>my</em> fieldset</legend>
  </fieldset>
  ```

  Computing the name for this fieldset would've returned an empty string previously. It now correctly computes `my fieldset` following the [accessible name computation for `fieldset` elements](https://w3c.github.io/html-aam/#fieldset-and-legend-elements)

* [`969da7d`](https://github.com/eps1lon/dom-accessibility-api/commit/969da7d454b3d83dc7259d910f40e7e16a6eb560) [#240](https://github.com/eps1lon/dom-accessibility-api/pull/240) Thanks [@eps1lon](https://github.com/eps1lon)! - Reduce over-transpilation

  Switched from

  - `for-of` to `.forEach` or a basic `for` loop
  - `array.push(...otherArray)` to `push.apply(array, otherArray)`

  This removed a bunch of babel junk that wasn't needed.

- [`d578329`](https://github.com/eps1lon/dom-accessibility-api/commit/d5783292ca49ae947bd95559030aa2c93c04565f) [#248](https://github.com/eps1lon/dom-accessibility-api/pull/248) Thanks [@eps1lon](https://github.com/eps1lon)! - Consider `<caption>` for the name of its `<table>` element.

  ```html
  <table>
  	<caption>
  		<em>my</em>
  		table
  	</caption>
  </table>
  ```

  Computing the name for this table would've returned an empty string previously. It now correctly computes `my table` following the [accessible name computation for `table` elements](https://w3c.github.io/html-aam/#table-element)

* [`f1b2bd0`](https://github.com/eps1lon/dom-accessibility-api/commit/f1b2bd0434cafe65812acfb0e3a2942309eb9726) [#237](https://github.com/eps1lon/dom-accessibility-api/pull/237) Thanks [@eps1lon](https://github.com/eps1lon)! - Use nodeType and tagName for element type checks

## 0.4.3

### Patch Changes

- [`b421d9e`](https://github.com/eps1lon/dom-accessibility-api/commit/b421d9e9709adf0f72e09cb5d7ea2a32ceefd8eb) [#168](https://github.com/eps1lon/dom-accessibility-api/pull/168) Thanks [@eps1lon](https://github.com/eps1lon)! - fix: Use relative paths in exports field

  Fixes a crash when using ES modules in Node.

## 0.4.2

### Minor Changes

- [`0897630`](https://github.com/eps1lon/dom-accessibility-api/commit/0897630862d608a9ca22e9799bb30b37e1032afa) [#155](https://github.com/eps1lon/dom-accessibility-api/pull/155) - Publish version using ES6 modules allongside current CommonJS modules

## 0.4.1

### Patch Changes

- [`63c119f`](https://github.com/eps1lon/dom-accessibility-api/commit/63c119f388d4e0f121320d75c4ec6fe334d8f370) [#147](https://github.com/eps1lon/dom-accessibility-api/pull/147) Thanks [@eps1lon](https://github.com/eps1lon)! - Deploy all 0.4.0 changes

## 0.4.0

### Minor Changes

- [`e80a1fb`](https://github.com/eps1lon/dom-accessibility-api/commit/e80a1fb32c136539a46007a64ef8c998855080a1) [#141](https://github.com/eps1lon/dom-accessibility-api/pull/141) Thanks [@eps1lon](https://github.com/eps1lon)! - Support ES5 environments

### Patch Changes

- [`bd41c2d`](https://github.com/eps1lon/dom-accessibility-api/commit/bd41c2d3dec9c27e178b65bbe226d3c7adef0678) [#143](https://github.com/eps1lon/dom-accessibility-api/pull/143) Thanks [@eps1lon](https://github.com/eps1lon)! - fix: support `<label for>` for `<select>` and `<textarea>`

## 0.3.0

### Minor Changes

- 7f1ada0: Internal polish

## 0.2.0

### Minor Changes

- eb86842: Add option to mock window.getComputedStyle

  This option has two use cases in mind:

  1. fake the style and assume everything is visible.
     This increases performance (window.getComputedStyle) is expensive) by not distinguishing between various levels of visual impairments. If one can't see the name with a screen reader then neither will a sighted user
  2. Wrap a cache provider around `window.getComputedStyle`. We don't implement any because the returned `CSSStyleDeclaration` is only live in a browser. `jsdom` does not implement live declarations.

### Bug Fixes

- Fix test name_heading-combobox ([#16](https://github.com/eps1lon/dom-accessibility-api/issues/16)) ([e969395](https://github.com/eps1lon/dom-accessibility-api/commit/e969395d8da637862993aeee0b86f379342d56f2))

### Features

- **name:** Consider prohibited naming ([#19](https://github.com/eps1lon/dom-accessibility-api/issues/19)) ([6692d6b](https://github.com/eps1lon/dom-accessibility-api/commit/6692d6bd86030da9b340b0895f623394b21e2656))
- Consider all cases of "name from content" ([#13](https://github.com/eps1lon/dom-accessibility-api/issues/13)) ([835cb76](https://github.com/eps1lon/dom-accessibility-api/commit/835cb76e7c1dd577af1fa891ad849385e58fcd56))
- Consider content from before and after pseudo elements ([#5](https://github.com/eps1lon/dom-accessibility-api/issues/5)) ([0987426](https://github.com/eps1lon/dom-accessibility-api/commit/0987426734cc7b980a8edf39435820a24ea2a162))
- Fork elementToRole from aria-query ([#7](https://github.com/eps1lon/dom-accessibility-api/issues/7)) ([fe4fab5](https://github.com/eps1lon/dom-accessibility-api/commit/fe4fab57786324705c4ac4434de8aabd3e7bbc09))
