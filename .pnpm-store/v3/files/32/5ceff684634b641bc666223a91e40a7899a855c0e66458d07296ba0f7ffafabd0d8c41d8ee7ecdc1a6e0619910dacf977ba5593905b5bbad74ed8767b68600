# Installation

Since projects are quite different from one another, v8n offers multiple ways to
use it in your project. This will hopefully allow you to use the library in
your project with ease.

## `<script>` include

For use in your static HTML you might not want to whip up a complex building
pipeline with npm packages or you may just want to test v8n before you put it
in your project. This is easier using the good old `<script>` tag in your
`.html` files. The best way to achieve this is by referencing the library from
a CDN. Services like `unpkg` and `jsdelivr` offer great speed and offer
multiple versions of v8n.

```html
<!-- From UNPKG -->
<script src="https://unpkg.com/v8n/dist/v8n.min.js"></script>

<!-- Or from jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/v8n/dist/v8n.min.js"></script>
```

This approach will make the function `v8n()` available globally within the HTML
so that you can call it from anywhere.

## NPM

For large projects and those that aren't simple static websites you will need
a different solution than a CDN. Of course v8n is distributed via NPM, so it's
a breeze to install it as a dependency and get started right away.

```bash
npm install --save v8n
# or
yarn add v8n
```

In order to make it easy for you to use, v8n is distributed as a CommonJS
library. If you're particularly futuristic, a native ES6 module is also
included.

```js
import v8n from "v8n";
// or
const v8n = require("v8n");
```

## Other builds

Aside from the approaches above, UMD and AMD versions are also available.
