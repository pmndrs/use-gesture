# [4.9.0](https://github.com/enisdenjo/graphql-ws/compare/v4.8.0...v4.9.0) (2021-06-06)


### Features

* **server:** Use `fastify-websocket` ([#200](https://github.com/enisdenjo/graphql-ws/issues/200)) ([b62fc95](https://github.com/enisdenjo/graphql-ws/commit/b62fc958bb0b67224d3c1b684d441bd8349c4b8a))

# [4.8.0](https://github.com/enisdenjo/graphql-ws/compare/v4.7.0...v4.8.0) (2021-06-03)


### Features

* **uWebSockets:** Add `persistedRequest` to context extra and deprecate uWS's stack allocated `request` ([#196](https://github.com/enisdenjo/graphql-ws/issues/196)) ([736e6ed](https://github.com/enisdenjo/graphql-ws/commit/736e6eda45d392292f315b9465b104dce4f2545f))

# [4.7.0](https://github.com/enisdenjo/graphql-ws/compare/v4.6.0...v4.7.0) (2021-05-31)


### Features

* Add `extensions` field to the subscribe message payload ([d86a8e4](https://github.com/enisdenjo/graphql-ws/commit/d86a8e472a32aa4a12f6794f90ca2419f9f87fdb))

# [4.6.0](https://github.com/enisdenjo/graphql-ws/compare/v4.5.2...v4.6.0) (2021-05-30)


### Features

* **use:** Generic for extending the context extras ([401cd4c](https://github.com/enisdenjo/graphql-ws/commit/401cd4ce335e11dcf139502da3aa7dc1f23651c5)), closes [#189](https://github.com/enisdenjo/graphql-ws/issues/189)

## [4.5.2](https://github.com/enisdenjo/graphql-ws/compare/v4.5.1...v4.5.2) (2021-05-28)


### Bug Fixes

* **uWebSockets:** Handle premature and abrupt socket closes ([9d3ff52](https://github.com/enisdenjo/graphql-ws/commit/9d3ff52e05420847eda9d0cf8d4730cafb9bcd36)), closes [#186](https://github.com/enisdenjo/graphql-ws/issues/186)

## [4.5.1](https://github.com/enisdenjo/graphql-ws/compare/v4.5.0...v4.5.1) (2021-05-18)


### Bug Fixes

* **server:** Init context first on connection open ([a80e753](https://github.com/enisdenjo/graphql-ws/commit/a80e7534cc0570fa111e15f196ba53fdb5ced667)), closes [#181](https://github.com/enisdenjo/graphql-ws/issues/181)

# [4.5.0](https://github.com/enisdenjo/graphql-ws/compare/v4.4.4...v4.5.0) (2021-04-29)


### Features

* Support custom JSON message `reviver` and `replacer` ([#172](https://github.com/enisdenjo/graphql-ws/issues/172)) ([0a9894e](https://github.com/enisdenjo/graphql-ws/commit/0a9894e21c42e70158ad65f045c8467c7177d4fa))

## [4.4.4](https://github.com/enisdenjo/graphql-ws/compare/v4.4.3...v4.4.4) (2021-04-28)


### Bug Fixes

* **client:** `complete` should not be called after subscription `error` ([1fba419](https://github.com/enisdenjo/graphql-ws/commit/1fba4196306991eab1ca74d710adb66e894692a0))
* **client:** Subscription can be disposed only once ([abd9c28](https://github.com/enisdenjo/graphql-ws/commit/abd9c28a9d2c43de9babb3488d7cb9eb7f3d3e15)), closes [#170](https://github.com/enisdenjo/graphql-ws/issues/170)

## [4.4.3](https://github.com/enisdenjo/graphql-ws/compare/v4.4.2...v4.4.3) (2021-04-27)


### Bug Fixes

* **client:** Subscribes even if socket is in CLOSING state due to all subscriptions being completed ([3e3b8b7](https://github.com/enisdenjo/graphql-ws/commit/3e3b8b771d571f9beaee72d22481aac976af663e)), closes [#173](https://github.com/enisdenjo/graphql-ws/issues/173) [#170](https://github.com/enisdenjo/graphql-ws/issues/170)

## [4.4.2](https://github.com/enisdenjo/graphql-ws/compare/v4.4.1...v4.4.2) (2021-04-22)


### Bug Fixes

* **client:** Lazy connects after successful reconnects are not retries ([99b85a3](https://github.com/enisdenjo/graphql-ws/commit/99b85a3bebfdc4fada03e6c71c2703807ac6d3cd))
* **client:** Shouldn't reconnect if all subscriptions complete while waiting for retry ([2826c10](https://github.com/enisdenjo/graphql-ws/commit/2826c103a2f5786575157c6aa9cbd270746b57ca)), closes [#163](https://github.com/enisdenjo/graphql-ws/issues/163)

## [4.4.1](https://github.com/enisdenjo/graphql-ws/compare/v4.4.0...v4.4.1) (2021-04-14)


### Bug Fixes

* Add `uWebSockets` exports path ([36247cb](https://github.com/enisdenjo/graphql-ws/commit/36247cbce31b6d049a58622df58a9b5fb3dafbd6)), closes [#155](https://github.com/enisdenjo/graphql-ws/issues/155)

# [4.4.0](https://github.com/enisdenjo/graphql-ws/compare/v4.3.4...v4.4.0) (2021-04-11)


### Features

* **server:** Use uWebSockets ([#89](https://github.com/enisdenjo/graphql-ws/issues/89)) ([45d08fc](https://github.com/enisdenjo/graphql-ws/commit/45d08fcb9fde4159dea3f131f865f5d5bf5041d2)), closes [#61](https://github.com/enisdenjo/graphql-ws/issues/61)

## [4.3.4](https://github.com/enisdenjo/graphql-ws/compare/v4.3.3...v4.3.4) (2021-04-11)


### Bug Fixes

* **client:** Subscriptions acquire locks ([eb6cb2a](https://github.com/enisdenjo/graphql-ws/commit/eb6cb2a0654489e1210a8db93f90bfc3ebfe94e4))

## [4.3.3](https://github.com/enisdenjo/graphql-ws/compare/v4.3.2...v4.3.3) (2021-04-11)


### Bug Fixes

* **client:** Connection locks dont increment on retries ([1e7bd97](https://github.com/enisdenjo/graphql-ws/commit/1e7bd97d47525040dd88803039b17f77db1c6c2a)), closes [#153](https://github.com/enisdenjo/graphql-ws/issues/153)

## [4.3.2](https://github.com/enisdenjo/graphql-ws/compare/v4.3.1...v4.3.2) (2021-03-29)


### Bug Fixes

* **server:** Async iterator must implement `return` ([d99982b](https://github.com/enisdenjo/graphql-ws/commit/d99982b1fc887d913cb1b3a031b1c5c3706b4a35)), closes [#149](https://github.com/enisdenjo/graphql-ws/issues/149)


### Performance Improvements

* **client:** Focus subscription message listeners on `id` ([#150](https://github.com/enisdenjo/graphql-ws/issues/150)) ([32c2268](https://github.com/enisdenjo/graphql-ws/commit/32c22686984e6f3c98388b31a08471c3e4ee96a6))

## [4.3.1](https://github.com/enisdenjo/graphql-ws/compare/v4.3.0...v4.3.1) (2021-03-25)


### Bug Fixes

* Close the details tag in the README ([84144c4](https://github.com/enisdenjo/graphql-ws/commit/84144c4c958674c4549cc48e84563bcb9f7c5e9d))

# [4.3.0](https://github.com/enisdenjo/graphql-ws/compare/v4.2.3...v4.3.0) (2021-03-25)


### Bug Fixes

* **server:** Respect completed subscriptions even if `subscribe` or `onOperation` didnt resolve yet ([4700154](https://github.com/enisdenjo/graphql-ws/commit/4700154566deb6b7d58a15a78ca57f830af40fe6))


### Features

* **client:** `url` option accepts a function or a Promise ([#143](https://github.com/enisdenjo/graphql-ws/issues/143)) ([76f522f](https://github.com/enisdenjo/graphql-ws/commit/76f522fc60e130f83032a1a0a61b741eb5b2f76f)), closes [#145](https://github.com/enisdenjo/graphql-ws/issues/145) [#146](https://github.com/enisdenjo/graphql-ws/issues/146)
* **server:** `execute` and `subscribe` are optional ([#148](https://github.com/enisdenjo/graphql-ws/issues/148)) ([af748b0](https://github.com/enisdenjo/graphql-ws/commit/af748b0fd34da44950bd7fbbaeeebf743ff6973e))
* **server:** Dynamic `schema` support by accepting a function or a Promise ([#147](https://github.com/enisdenjo/graphql-ws/issues/147)) ([6a0bf94](https://github.com/enisdenjo/graphql-ws/commit/6a0bf9473e6bc77afdaf81d16eeeeddcbe97276f)), closes [#127](https://github.com/enisdenjo/graphql-ws/issues/127)
* **server:** Use `validate` option for custom GraphQL validation ([b68d56c](https://github.com/enisdenjo/graphql-ws/commit/b68d56ca1ffb8c7375d4292f716a63326d9d712f))

## [4.2.3](https://github.com/enisdenjo/graphql-ws/compare/v4.2.2...v4.2.3) (2021-03-23)


### Bug Fixes

* **client:** Reduce WebSocket event listeners and add new client `message` event ([#104](https://github.com/enisdenjo/graphql-ws/issues/104)) ([68d0e20](https://github.com/enisdenjo/graphql-ws/commit/68d0e20674488e8792a61d07f068233d78acaa3a)), closes [#102](https://github.com/enisdenjo/graphql-ws/issues/102)

## [4.2.2](https://github.com/enisdenjo/graphql-ws/compare/v4.2.1...v4.2.2) (2021-03-17)


### Bug Fixes

* **server:** `return` instead of `break` at switch case ends ([e9447e4](https://github.com/enisdenjo/graphql-ws/commit/e9447e45cfa572982e7fe0ffa32a113feac06b94)), closes [#140](https://github.com/enisdenjo/graphql-ws/issues/140)

## [4.2.1](https://github.com/enisdenjo/graphql-ws/compare/v4.2.0...v4.2.1) (2021-03-11)


### Bug Fixes

* **client:** New `error` event listener for handling connection errors ([#136](https://github.com/enisdenjo/graphql-ws/issues/136)) ([127b69f](https://github.com/enisdenjo/graphql-ws/commit/127b69fa5df8765a4a17a928191baa6c85985409)), closes [#135](https://github.com/enisdenjo/graphql-ws/issues/135)

# [4.2.0](https://github.com/enisdenjo/graphql-ws/compare/v4.1.6...v4.2.0) (2021-02-25)


### Bug Fixes

* Only UMD build has side effects ([66ed43f](https://github.com/enisdenjo/graphql-ws/commit/66ed43fe60b57fa268490aec07c3254b06ab3473))


### Features

* **client:** `isFatalConnectionProblem` option for deciding if the connect error should be immediately reported or the connection retried ([#126](https://github.com/enisdenjo/graphql-ws/issues/126)) ([8115871](https://github.com/enisdenjo/graphql-ws/commit/81158711f9dba05588c656ed32c07331c9a5786d)), closes [#122](https://github.com/enisdenjo/graphql-ws/issues/122)

## [4.1.6](https://github.com/enisdenjo/graphql-ws/compare/v4.1.5...v4.1.6) (2021-02-18)


### Bug Fixes

* Add `browser` export map ([ea306db](https://github.com/enisdenjo/graphql-ws/commit/ea306db45a05ab712782b17c5a3a1ec60537eaa4))
* Add `package.json` to exports map ([#119](https://github.com/enisdenjo/graphql-ws/issues/119)) ([1f09863](https://github.com/enisdenjo/graphql-ws/commit/1f09863de6b8731980dfc513708cd144a0d5bfbe)), closes [#118](https://github.com/enisdenjo/graphql-ws/issues/118)

## [4.1.5](https://github.com/enisdenjo/graphql-ws/compare/v4.1.4...v4.1.5) (2021-02-12)


### Bug Fixes

* Main entrypoint in `exports` is just `"."` ([8f70b02](https://github.com/enisdenjo/graphql-ws/commit/8f70b02ec1ed1b88fd80e7e04eecf4552b382bbc))

## [4.1.4](https://github.com/enisdenjo/graphql-ws/compare/v4.1.3...v4.1.4) (2021-02-12)


### Bug Fixes

* Define entry points through the `exports`  field and use `.mjs` suffixed ESM imports ([#110](https://github.com/enisdenjo/graphql-ws/issues/110)) ([4196238](https://github.com/enisdenjo/graphql-ws/commit/4196238888bffe4fb958bc665512b79eb384a28e))

## [4.1.3](https://github.com/enisdenjo/graphql-ws/compare/v4.1.2...v4.1.3) (2021-02-08)


### Bug Fixes

* **client:** Should emit `closed` event when disposing ([5800de8](https://github.com/enisdenjo/graphql-ws/commit/5800de8d343649bb4c93ca31c61911879123c736)), closes [#108](https://github.com/enisdenjo/graphql-ws/issues/108)
* **client:** Shouldn’t send the `Complete` message if socket is not open ([cd12024](https://github.com/enisdenjo/graphql-ws/commit/cd12024c19bdcf859c5a9a6b7a072ea252401524))

## [4.1.2](https://github.com/enisdenjo/graphql-ws/compare/v4.1.1...v4.1.2) (2021-01-24)


### Bug Fixes

* **client:** Stabilize and simplify internals ([#100](https://github.com/enisdenjo/graphql-ws/issues/100)) ([5ff8f1d](https://github.com/enisdenjo/graphql-ws/commit/5ff8f1dfb34d1a063fdfff8893c789c8b2c60d6e)), closes [#99](https://github.com/enisdenjo/graphql-ws/issues/99) [#85](https://github.com/enisdenjo/graphql-ws/issues/85)

## [4.1.1](https://github.com/enisdenjo/graphql-ws/compare/v4.1.0...v4.1.1) (2021-01-19)


### Bug Fixes

* **client:** Export relevant elements from the browser bundle ([b106dbe](https://github.com/enisdenjo/graphql-ws/commit/b106dbed1440488692a5588dcfd73f2f5a855a74)), closes [#97](https://github.com/enisdenjo/graphql-ws/issues/97)
* **client:** Wait for server acknowledgement indefinitely ([a4bd602](https://github.com/enisdenjo/graphql-ws/commit/a4bd6029916e26a48b3f1acbbf9d741775e34baa)), closes [#98](https://github.com/enisdenjo/graphql-ws/issues/98)

# [4.1.0](https://github.com/enisdenjo/graphql-ws/compare/v4.0.0...v4.1.0) (2021-01-13)


### Bug Fixes

* **server:** `onDisconnect` is called exclusively if the connection is acknowledged ([33ed5f2](https://github.com/enisdenjo/graphql-ws/commit/33ed5f227a787773a6661d4e5efce1be5e500525))


### Features

* **server:** Add `onClose` callback for closures at _any_ point in time ([dd0d4fa](https://github.com/enisdenjo/graphql-ws/commit/dd0d4fa7828974b27876e138c0d09f78b2721d2d))

# [4.0.0](https://github.com/enisdenjo/graphql-ws/compare/v3.2.0...v4.0.0) (2021-01-13)


### Bug Fixes

* **server:** Client can complete/cancel any operation ([0ad1c4c](https://github.com/enisdenjo/graphql-ws/commit/0ad1c4c174d13effc185de49b42c64cdfd54a7ec))
* **server:** Enforce ID uniqueness across all operations and during the whole subscription life ([#96](https://github.com/enisdenjo/graphql-ws/issues/96)) ([65d1bfa](https://github.com/enisdenjo/graphql-ws/commit/65d1bfa876fa5ff724c736b7ce958a1b1c9b0dc3))


### Features

* **server:** Add `onDisconnect` callback ([#94](https://github.com/enisdenjo/graphql-ws/issues/94)) ([2a61268](https://github.com/enisdenjo/graphql-ws/commit/2a612687d2b3fe7dc9a62dca5a171a52c28b99ab))
* **server:** Log a warning for unsupported subprotocols ([88a12ef](https://github.com/enisdenjo/graphql-ws/commit/88a12ef3d9261e787a150d226210856688bf97da)), closes [#92](https://github.com/enisdenjo/graphql-ws/issues/92)


### BREAKING CHANGES

* **server:** The return function of `server.opened` (`closed`) now requires the close event code and reason for reporting to the `onDisconnect` callback.
* **server:** The `Context.subscriptions` record value can be either an `AsyncIterator` or a `Promise`.

# [3.2.0](https://github.com/enisdenjo/graphql-ws/compare/v3.1.0...v3.2.0) (2020-12-17)


### Features

* Package ECMAScript Modules too ([#87](https://github.com/enisdenjo/graphql-ws/issues/87)) ([2108174](https://github.com/enisdenjo/graphql-ws/commit/2108174eb5e1f48656287a2e55adc67112a05314))

# [3.1.0](https://github.com/enisdenjo/graphql-ws/compare/v3.0.2...v3.1.0) (2020-12-11)


### Bug Fixes

* **client:** Time retries and socket change waits ([7c707db](https://github.com/enisdenjo/graphql-ws/commit/7c707db3c8c3b1991a7e1b95a225efd8d58d5615)), closes [#85](https://github.com/enisdenjo/graphql-ws/issues/85)


### Features

* **client:** `onNonLazyError` allows you to catch errors reported in non-lazy mode ([cd1e7df](https://github.com/enisdenjo/graphql-ws/commit/cd1e7df70ab63b59bbfac1354b8779173fb1f333))

## [3.0.2](https://github.com/enisdenjo/graphql-ws/compare/v3.0.1...v3.0.2) (2020-12-10)


### Bug Fixes

* **client:** No retries when disposed ([0d5e6c2](https://github.com/enisdenjo/graphql-ws/commit/0d5e6c259eee5e331c5cef92246888745edda5a4))

## [3.0.1](https://github.com/enisdenjo/graphql-ws/compare/v3.0.0...v3.0.1) (2020-12-10)


### Performance Improvements

* **client:** Await timeouts only in recursive connects ([55c8fc8](https://github.com/enisdenjo/graphql-ws/commit/55c8fc8aba5dfb5ff3c66a11946f85ec631b1d41))

# [3.0.0](https://github.com/enisdenjo/graphql-ws/compare/v2.0.1...v3.0.0) (2020-12-09)


### Features

* **client:** Retry with randomised exponential backoff or provide your own strategy ([#84](https://github.com/enisdenjo/graphql-ws/issues/84)) ([d3e7a17](https://github.com/enisdenjo/graphql-ws/commit/d3e7a171603a3ef181c5af533768dcda416a1731))


### BREAKING CHANGES

* **client:** Client `retryTimeout` option has been replaced with the new `retryWait`.

`retryWait` allows you to control the retry timeout strategy by resolving the returned promise when ready. The default implements the randomised exponential backoff like so:
```ts
// this is the default
const retryWait = async function randomisedExponentialBackoff(retries: number) {
  let retryDelay = 1000; // start with 1s delay
  for (let i = 0; i < retries; i++) {
    retryDelay *= 2; // square `retries` times
  }
  await new Promise((resolve) =>
    setTimeout(
      // resolve pending promise with added random timeout from 300ms to 3s
      resolve,
      retryDelay + Math.floor(Math.random() * (3000 - 300) + 300),
    ),
  );
};
```

## [2.0.1](https://github.com/enisdenjo/graphql-ws/compare/v2.0.0...v2.0.1) (2020-12-03)


### Bug Fixes

* **client:** Close event's `wasClean` is not necessary ([2c65f0e](https://github.com/enisdenjo/graphql-ws/commit/2c65f0ee91a6372a9c2935183d9be0be50f40663)), closes [#81](https://github.com/enisdenjo/graphql-ws/issues/81)

# [2.0.0](https://github.com/enisdenjo/graphql-ws/compare/v1.14.0...v2.0.0) (2020-11-20)


### Features

* **server:** Make and use with your own flavour ([#64](https://github.com/enisdenjo/graphql-ws/issues/64)) ([38bde87](https://github.com/enisdenjo/graphql-ws/commit/38bde87122f4c39b0357c636fd98bfee886dd6e5)), closes [#61](https://github.com/enisdenjo/graphql-ws/issues/61) [#73](https://github.com/enisdenjo/graphql-ws/issues/73) [#75](https://github.com/enisdenjo/graphql-ws/issues/75)


### BREAKING CHANGES

* **server:** You now "make" a ready-to-use server that can be used with _any_ WebSocket implementation!

Summary of breaking changes:
- No more `keepAlive`. The user should provide its own keep-alive implementation. _(I highly recommend [WebSocket Ping and Pongs](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#Pings_and_Pongs_The_Heartbeat_of_WebSockets))_
- No more HTTP `request` in the server context.
- No more WebSocket in the server context (you're the one that creates it).
- You use your own WebSocket server
- Server exports only `makeServer` _(no more `createServer`)_

### Benefits
- You're responsible for the server (_any_ optimisation or adjustment can be applied)
- Any WebSocket server can be used (or even mocked if necessary)
- You control the disposal of the server (close or transfer clients however you wish)
- New `extra` field in the `Context` for storing custom values useful for callbacks
- Full control of authentication flow
- Full control over error handling
- True zero-dependency

### Migrating from v1

**Only the server has to be migrated.** Since this release allows you to use your favourite WebSocket library (or your own implementation), using [ws](https://github.com/websockets/ws) is just one way of using `graphql-ws`. This is how to use the implementation shipped with the lib:

```ts
/**
 * ❌ instead of the lib creating a WebSocket server internally with the provided arguments
 */
import https from 'https';
import { createServer } from 'graphql-ws';

const server = https.createServer(...);

createServer(
  {
    onConnect(ctx) {
      // were previously directly on the context
      ctx.request as IncomingRequest
      ctx.socket as WebSocket
    },
    ...rest,
  },
  {
    server,
    path: '/graphql',
  },
);

/**
 * ✅ you have to supply the server yourself
 */
import https from 'https';
import ws from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws'; // notice the import path

const server = https.createServer(...);
const wsServer = new ws.Server({
  server,
  path: '/graphql',
});

useServer(
  {
    onConnect(ctx) {
      // are now in the `extra` field
      ctx.extra.request as IncomingRequest
      ctx.extra.socket as WebSocket
    },
    ...rest,
  },
  wsServer,
  // optional keepAlive with ping pongs (defaults to 12 seconds)
);
```

# [1.14.0](https://github.com/enisdenjo/graphql-ws/compare/v1.13.1...v1.14.0) (2020-11-15)


### Features

* **server:** `context` may return a promise ([cd5c2f8](https://github.com/enisdenjo/graphql-ws/commit/cd5c2f8d0f9d11889052601c0fabdb8c6ed607fa)), closes [#74](https://github.com/enisdenjo/graphql-ws/issues/74)

## [1.13.1](https://github.com/enisdenjo/graphql-ws/compare/v1.13.0...v1.13.1) (2020-11-14)


### Bug Fixes

* **client:** Some close events are not worth retrying ([4d9134b](https://github.com/enisdenjo/graphql-ws/commit/4d9134b8704446f0b2674c71e25d7c6c44000c9a))
* **message:** Allow `data` field to be of any type ([533248e](https://github.com/enisdenjo/graphql-ws/commit/533248e0bcfd857c7960c9e8671cbd300788ad7d)), closes [#72](https://github.com/enisdenjo/graphql-ws/issues/72)
* **message:** Allow `payload` field to be of any type for `NextMessage` ([7cebbfe](https://github.com/enisdenjo/graphql-ws/commit/7cebbfe00dc3c360e80e8962f345a28743b49c1f)), closes [#72](https://github.com/enisdenjo/graphql-ws/issues/72)
* Use `ID` type for message id field ([87ebd35](https://github.com/enisdenjo/graphql-ws/commit/87ebd357da73ec83d72583f1c82fc14dfe2ffe5a))

# [1.13.0](https://github.com/enisdenjo/graphql-ws/compare/v1.12.0...v1.13.0) (2020-11-12)


### Bug Fixes

* **client:** One cleanup per subscription ([#67](https://github.com/enisdenjo/graphql-ws/issues/67)) ([5a5ae4d](https://github.com/enisdenjo/graphql-ws/commit/5a5ae4d01afd0c9aa51090342d7f699daf4fbafc))
* Stop sending messages after receiving complete ([#65](https://github.com/enisdenjo/graphql-ws/issues/65)) ([3f4f836](https://github.com/enisdenjo/graphql-ws/commit/3f4f836c395139617a268082131084c4f992ba5f))


### Features

* **client:** `connectionParams` may return a promise ([#71](https://github.com/enisdenjo/graphql-ws/issues/71)) ([33f210c](https://github.com/enisdenjo/graphql-ws/commit/33f210ce3796f3b961fa5ca03af938cfd899c9b9))
* **client:** Allow keeping the connection alive for some time before lazy closing ([#69](https://github.com/enisdenjo/graphql-ws/issues/69)) ([555c2c3](https://github.com/enisdenjo/graphql-ws/commit/555c2c35b84a864ac5732976e704eed9fcacd08c))

# [1.12.0](https://github.com/enisdenjo/graphql-ws/compare/v1.11.0...v1.12.0) (2020-11-07)


### Bug Fixes

* **client:** Close with error message during connecting issues ([f8ecdd7](https://github.com/enisdenjo/graphql-ws/commit/f8ecdd78e200a6a752ec1e72fb14d83e6103dd02))


### Features

* Send optional payload with the `ConnectionAck` message ([#60](https://github.com/enisdenjo/graphql-ws/issues/60)) ([1327e77](https://github.com/enisdenjo/graphql-ws/commit/1327e7735fc52f8318644b0f4cec86d3288a0e68))

# [1.11.0](https://github.com/enisdenjo/graphql-ws/compare/v1.10.0...v1.11.0) (2020-11-04)


### Bug Fixes

* Node 10 is the min supported version ([19844d7](https://github.com/enisdenjo/graphql-ws/commit/19844d72f4638f9f7126870f9d9a744cdb4814c4))
* Support more `graphql` versions ([de69b4e](https://github.com/enisdenjo/graphql-ws/commit/de69b4ea39905f9b3343711e9defe68c6746b842))
* **server:** Close socket if `onSubscribe` returns invalid array ([#53](https://github.com/enisdenjo/graphql-ws/issues/53)) ([0464a54](https://github.com/enisdenjo/graphql-ws/commit/0464a54eee09dfdf66d65bf539a4d8f596be2697))
* **server:** Consistently set `rootValue` and `contextValue`, if not overridden ([#49](https://github.com/enisdenjo/graphql-ws/issues/49)) ([7aa3bcd](https://github.com/enisdenjo/graphql-ws/commit/7aa3bcdd38d40e83306f867a5b6b1bd612ec5fe3))
* **server:** Distribute server error to all clients even if one error listener throws ([#56](https://github.com/enisdenjo/graphql-ws/issues/56)) ([b96dbb9](https://github.com/enisdenjo/graphql-ws/commit/b96dbb98bb6f71956321ce1202af0af50df4e40e))
* **server:** Don't surface bad request error details in production ([#55](https://github.com/enisdenjo/graphql-ws/issues/55)) ([70317b2](https://github.com/enisdenjo/graphql-ws/commit/70317b2619b7729e5d5556b4e5388f142414b082))


### Features

* `cjs`, `esm` and `umd` builds with minification and compression for the browser ([#58](https://github.com/enisdenjo/graphql-ws/issues/58)) ([ebb8dfe](https://github.com/enisdenjo/graphql-ws/commit/ebb8dfe8a1e50507bcc2b0929600d755ddd98b1d))


### Performance Improvements

* Reduce runtime prototype traversal for hasOwnProperty ([#52](https://github.com/enisdenjo/graphql-ws/issues/52)) ([1bb9218](https://github.com/enisdenjo/graphql-ws/commit/1bb9218ad3ee9442442122c1d10910d51951b763))

# [1.10.0](https://github.com/enisdenjo/graphql-ws/compare/v1.9.3...v1.10.0) (2020-11-03)


### Features

* Subscribe message `query` must be a string ([#45](https://github.com/enisdenjo/graphql-ws/issues/45)) ([60d9cd5](https://github.com/enisdenjo/graphql-ws/commit/60d9cd5509d1b989f3ca6a9370850ce0aae41522))
* **server:** For dynamic usage, `context` option can be a function too ([#46](https://github.com/enisdenjo/graphql-ws/issues/46)) ([149b582](https://github.com/enisdenjo/graphql-ws/commit/149b58266859d6f275c186581f71c3aff52cb4a3))

## [1.9.3](https://github.com/enisdenjo/graphql-ws/compare/v1.9.2...v1.9.3) (2020-10-31)


### Bug Fixes

* Drop TypeScript DOM lib dependency ([a81e8c1](https://github.com/enisdenjo/graphql-ws/commit/a81e8c1ea080984ddd6d5e58c154b866ee44c14c))
* Support more Node versions by not using `globalThis` ([79c2ed2](https://github.com/enisdenjo/graphql-ws/commit/79c2ed2056b69bd9b56984947d78897e36594b80))

## [1.9.2](https://github.com/enisdenjo/graphql-ws/compare/v1.9.1...v1.9.2) (2020-10-31)


### Bug Fixes

* **server:** Make sure to use `onSubscribe` result exclusively ([51fdb7c](https://github.com/enisdenjo/graphql-ws/commit/51fdb7c75487c399267f04a4ea2146f2e964d4cf))
* Export useful types ([e4cc4d4](https://github.com/enisdenjo/graphql-ws/commit/e4cc4d4df8efb77aed14053a32af3464dc2a95db))
* **client:** Accept nullish values for `operationName` and `variables` ([2d60dda](https://github.com/enisdenjo/graphql-ws/commit/2d60dda93c09b0c8d7b69241833174f991d7b450))

## [1.9.1](https://github.com/enisdenjo/graphql-ws/compare/v1.8.2...v1.9.0) (2020-10-25)


### Features

* Package rename `graphql-transport-ws` 👉 `graphql-ws`. ([#43](https://github.com/enisdenjo/graphql-ws/pull/43))

# [1.9.0](https://github.com/enisdenjo/graphql-ws/compare/v1.8.2...v1.9.0) (2020-10-24)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Features

* **server:** More callbacks, clearer differences and higher extensibility ([#40](https://github.com/enisdenjo/graphql-ws/issues/40)) ([507a222](https://github.com/enisdenjo/graphql-ws/commit/507a2226719efacf6180705beb8bb9d88f80d7f3))


### BREAKING CHANGES

_Should've been a major release but `semantic-release` didn't detect the breaking changes of the [507a222](https://github.com/enisdenjo/graphql-ws/commit/507a2226719efacf6180705beb8bb9d88f80d7f3) commit, so here we are..._

This time we come with a few breaking changes that will open doors for all sorts of enhancements. Check the linked PR for more details.

#### Server option `onSubscribe`
- Now executes _before_ any other subscribe message processing
- Now takes 2 arguments, the `Context` and the `SubscribeMessage`
- Now returns nothing,`ExecutionArgs` or an array of `GraphQLError`s
  - Returning `void` (or nothing) will leave the execution args preparation and validation to the library
  - Returned `ExecutionArgs` will be used **directly** for the GraphQL operation execution (preparations and validation should be done by you in this case)
  - Returned array of `GraphQLError`s will be reported to the client through the `ErrorMessage`

#### Server option `validationRules`
Dropped in favour of applying custom validation rules in the `onSubscribe` callback. Find the recipe in the readme!

#### Server option `formatExecutionResult`
Dropped in favour of using the return value of `onNext` callback.

## [1.8.2](https://github.com/enisdenjo/graphql-ws/compare/v1.8.1...v1.8.2) (2020-10-22)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Bug Fixes

* **server:** No need to bind `this` scope ([f76ac73](https://github.com/enisdenjo/graphql-ws/commit/f76ac73e9d21c80abe0118007e168e4f5d525036))

## [1.8.1](https://github.com/enisdenjo/graphql-ws/compare/v1.8.0...v1.8.1) (2020-10-22)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Bug Fixes

* yarn engine is not required ([#34](https://github.com/enisdenjo/graphql-ws/issues/34)) ([89484b8](https://github.com/enisdenjo/graphql-ws/commit/89484b89d6f561d0eb43d64e8c1ee568bcfebcd6))
* **server:** Hide internal server error messages from the client in production ([36fe405](https://github.com/enisdenjo/graphql-ws/commit/36fe405e0e7d5942f858073797cc85bb41739a1d)), closes [#31](https://github.com/enisdenjo/graphql-ws/issues/31)

# [1.8.0](https://github.com/enisdenjo/graphql-ws/compare/v1.7.0...v1.8.0) (2020-10-19)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Features

* **server:** Support returning multiple results from `execute` ([#28](https://github.com/enisdenjo/graphql-ws/issues/28)) ([dbbd88b](https://github.com/enisdenjo/graphql-ws/commit/dbbd88bb26843da55d9558e7a44bff3108f095ab))

# [1.7.0](https://github.com/enisdenjo/graphql-ws/compare/v1.6.0...v1.7.0) (2020-10-01)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Bug Fixes

* **client:** Dispose of subscription on complete or error messages ([#23](https://github.com/enisdenjo/graphql-ws/issues/23)) ([fb4d8e9](https://github.com/enisdenjo/graphql-ws/commit/fb4d8e9efdfdd0cbe3b7cc34ddadbad3a795ae35))
* **server:** `subscription` operations are distinct on the message ID ([#24](https://github.com/enisdenjo/graphql-ws/issues/24)) ([dfffb05](https://github.com/enisdenjo/graphql-ws/commit/dfffb0502be5dd9ab5598e785b9988b1f4000227))


### Features

* **client:** Optional `generateID` to provide subscription IDs ([#22](https://github.com/enisdenjo/graphql-ws/issues/22)) ([9a3f54a](https://github.com/enisdenjo/graphql-ws/commit/9a3f54a8198379b402a8abe414ab5727ccec45cf)), closes [#21](https://github.com/enisdenjo/graphql-ws/issues/21)

# [1.6.0](https://github.com/enisdenjo/graphql-ws/compare/v1.5.0...v1.6.0) (2020-09-28)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Features

* **client:** Support providing custom WebSocket implementations ([#18](https://github.com/enisdenjo/graphql-ws/issues/18)) ([1515fe2](https://github.com/enisdenjo/graphql-ws/commit/1515fe2adcc0bb2b18a1309550f4e41528985f54))

# [1.5.0](https://github.com/enisdenjo/graphql-ws/compare/v1.4.2...v1.5.0) (2020-09-18)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Bug Fixes

* **server:** Use `subscribe` from the config ([6fbd47c](https://github.com/enisdenjo/graphql-ws/commit/6fbd47c2ef14a6ae4297ffe0aaa689eeb3741ed0))


### Features

* **server:** Define execution/subscription `context` in creation options ([5b3d253](https://github.com/enisdenjo/graphql-ws/commit/5b3d25351cdd2714a1edb9833ab2c2c7a9316944)), closes [#13](https://github.com/enisdenjo/graphql-ws/issues/13)

## [1.4.2](https://github.com/enisdenjo/graphql-ws/compare/v1.4.1...v1.4.2) (2020-09-16)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Bug Fixes

* **server:** Receiving more than one `ConnectionInit` message closes the socket immediately ([757c6e9](https://github.com/enisdenjo/graphql-ws/commit/757c6e966ffa1756cca2687b0275d7d7eff2ce87))

## [1.4.1](https://github.com/enisdenjo/graphql-ws/compare/v1.4.0...v1.4.1) (2020-09-11)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Performance Improvements

* **client:** Memoize message parsing for each subscriber ([2a7ba46](https://github.com/enisdenjo/graphql-ws/commit/2a7ba4642c0ea1a3294b8b3ea3440957ec7fcb7b))

# [1.4.0](https://github.com/enisdenjo/graphql-ws/compare/v1.3.0...v1.4.0) (2020-09-10)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Bug Fixes

* **client:** Only `query` is required in the subscribe payload ([e892530](https://github.com/enisdenjo/graphql-ws/commit/e892530b37108a210976e416b2f5eb3004be7ad3))


### Features

* **server:** Pass roots for operation fields as an option ([dcb5ed4](https://github.com/enisdenjo/graphql-ws/commit/dcb5ed4dcc3c4569b104b2cbe9979161fad2ff0a))

# [1.3.0](https://github.com/enisdenjo/graphql-ws/compare/v1.2.0...v1.3.0) (2020-09-10)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Features

* WebSocket Ping and Pong as keep-alive ([#11](https://github.com/enisdenjo/graphql-ws/issues/11)) ([16ae316](https://github.com/enisdenjo/graphql-ws/commit/16ae316b35a90d45f379336ec3ed5bedf3f2e28e))
* **client:** Emit events for `connecting`, `connected` and `closed` ([627775b](https://github.com/enisdenjo/graphql-ws/commit/627775b8e1aca8f359607020ff2c3bcc37b50787))
* **client:** Implement silent-reconnects ([c6f7872](https://github.com/enisdenjo/graphql-ws/commit/c6f7872126300befcc47e8e46e82342c2924f453)), closes [#7](https://github.com/enisdenjo/graphql-ws/issues/7)
* **client:** Lazy option can be changed ([fb0ec14](https://github.com/enisdenjo/graphql-ws/commit/fb0ec1478e5219eb75e6bf2a1c2fd2a3a9cbb90d))

# [1.2.0](https://github.com/enisdenjo/graphql-ws/compare/v1.1.1...v1.2.0) (2020-09-04)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Features

* Package rename `@enisdenjo/graphql-transport-ws` 👉 `graphql-transport-ws`. ([494f676](https://github.com/enisdenjo/graphql-ws/commit/494f6766279325769e81f52ce7b4b442c85f9476))

## [1.1.1](https://github.com/enisdenjo/graphql-ws/compare/v1.1.0...v1.1.1) (2020-08-28)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Bug Fixes

* add the sink to the subscribed map AFTER emitting a subscribe message ([814f46c](https://github.com/enisdenjo/graphql-ws/commit/814f46c119792aaa240d0fcdb318dccdd1cc0e87))
* notify only relevant sinks about errors or completions ([62155ba](https://github.com/enisdenjo/graphql-ws/commit/62155ba0b79516141633b86765921b2401fcc2ed))

# [1.1.0](https://github.com/enisdenjo/graphql-ws/compare/v1.0.2...v1.1.0) (2020-08-28)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Bug Fixes

* **server:** allow skipping init message wait with zero values ([a7419df](https://github.com/enisdenjo/graphql-ws/commit/a7419df077acb018418016c7a06716fb3c054ddb))
* **server:** use subscription specific formatter for queries and mutations too ([5672a04](https://github.com/enisdenjo/graphql-ws/commit/5672a045332ea835e6ff7ce862c7c2a46729363b))


### Features

* **client:** introduce Socky 🧦 - the nifty internal socket state manager ([#8](https://github.com/enisdenjo/graphql-ws/issues/8)) ([a4bee6f](https://github.com/enisdenjo/graphql-ws/commit/a4bee6fb8c1bd56637363a76f6ab0c3b64f55931))

## [1.0.2](https://github.com/enisdenjo/graphql-ws/compare/v1.0.1...v1.0.2) (2020-08-26)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Bug Fixes

* correctly detect WebSocket server ([eab29dc](https://github.com/enisdenjo/graphql-ws/commit/eab29dcae3d031a117de37dee09770833e9573cf))

## [1.0.1](https://github.com/enisdenjo/graphql-ws/compare/v1.0.0...v1.0.1) (2020-08-26)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Bug Fixes

* reset connected/connecting state when disconnecting and disposing ([2eb3cd5](https://github.com/enisdenjo/graphql-ws/commit/2eb3cd5965cf34f6d6b21748daea520163b9c789))
* **client:** cant read the `CloseEvent.reason` after bundling so just pass the whole event to the sink error and let the user handle it ([9ccb46b](https://github.com/enisdenjo/graphql-ws/commit/9ccb46bc80024cb2de823702d2bd308052c6c516))
* **client:** send complete message and close only if socket is still open ([49b75ce](https://github.com/enisdenjo/graphql-ws/commit/49b75cec60fec9c8a42119b124a9c54d29d30308))
* http and ws have no default exports ([5c01ed9](https://github.com/enisdenjo/graphql-ws/commit/5c01ed924793ce17f036d26d9d5d63cd5cecc6aa))
* include `types` file holding important types ([f3e4edf](https://github.com/enisdenjo/graphql-ws/commit/f3e4edf96e5c6cecf025811e2beb7ecc324ea962))
* **server:** scoped execution result formatter from `onConnect` ([f91fadb](https://github.com/enisdenjo/graphql-ws/commit/f91fadb6464a6e74f9a11555026dd5f9279df563))
* export both the client and the server from index ([29923b1](https://github.com/enisdenjo/graphql-ws/commit/29923b1e35a462c5b5a19d64603d59f25c1c5987))
* **server:** store the intial request in the context ([6927ee0](https://github.com/enisdenjo/graphql-ws/commit/6927ee01c0b8224f8290322a964e70382614d0e8))

# [1.0.0](https://github.com/enisdenjo/graphql-ws/compare/v0.0.2...v1.0.0) (2020-08-17)

### ⚠️ Deprecated

Package has been renamed from [`graphql-transport-ws`](https://www.npmjs.com/package/graphql-transport-ws) to [`graphql-ws`](https://www.npmjs.com/package/graphql-ws).

### Features

* **client:** Re-implement following the new transport protocol ([#6](https://github.com/enisdenjo/graphql-ws/issues/6)) ([5191a35](https://github.com/enisdenjo/graphql-ws/commit/5191a358098c6f9a661ae90e0420fa430db9152c))
* **server:** Implement following the new transport protocol ([#1](https://github.com/enisdenjo/graphql-ws/issues/1)) ([a412d25](https://github.com/enisdenjo/graphql-ws/commit/a412d2570e484046a058c11f39813c7794ec9147))
* Rewrite GraphQL over WebSocket Protocol ([#2](https://github.com/enisdenjo/graphql-ws/issues/2)) ([42045c5](https://github.com/enisdenjo/graphql-ws/commit/42045c577de9d95a81a37d850b38f4482914cebd))


### BREAKING CHANGES

* This lib is no longer compatible with [`subscriptions-transport-ws`](https://github.com/apollographql/subscriptions-transport-ws). It follows a [redesigned transport protocol](https://github.com/enisdenjo/graphql-ws/blob/2b8c3f095d382d299e9e1670eb907b37591626ca/PROTOCOL.md) aiming to improve security, stability and reduce ambiguity.
