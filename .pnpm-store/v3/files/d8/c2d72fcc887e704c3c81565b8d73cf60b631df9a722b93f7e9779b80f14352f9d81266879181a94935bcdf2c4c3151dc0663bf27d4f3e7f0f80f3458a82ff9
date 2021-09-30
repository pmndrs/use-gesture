# sync-fetch
Synchronous wrapper around the Fetch API. Uses [`node-fetch`](https://github.com/bitinn/node-fetch) under the hood, and for some input-parsing code and test cases too.

[![npm](https://img.shields.io/npm/v/sync-fetch?style=flat-square)](https://npmjs.com/package/sync-fetch)

## Install

    npm install sync-fetch

## Use

```js
const fetch = require('sync-fetch')

const metadata = fetch('https://doi.org/10.7717/peerj-cs.214', {
  headers: {
    Accept: 'application/vnd.citationstyles.csl+json'
  }
}).json()
```

## Limitations

### Node.js

  - Does not support `Stream`s (or `FormData`) as input bodies since they cannot be read or serialized synchronously
  - Does not support `Blob`s as input bodies since they're too complex
  - Does not support the non-spec `agent` option as its value cannot be serialized

### Browser

  - Does not support most options, since `XMLHttpRequest` is pretty limited. Supported are:
    - `method`
    - `body`
    - `headers`
    - `credentials` (but not `omit`)
    - (Non-spec) `timeout`
  - Does not support [binary responses in the main thread](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType#Synchronous_XHR_restrictions)
  - CORS limitations apply, of course (note they may be stricter for synchronous requests)
