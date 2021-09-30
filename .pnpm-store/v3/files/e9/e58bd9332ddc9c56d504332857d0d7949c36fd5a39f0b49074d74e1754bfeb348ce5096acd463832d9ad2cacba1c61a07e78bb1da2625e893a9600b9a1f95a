# `web-vitals`

- [Overview](#overview)
- [Install and load the library](#installation)
  - [From npm](#import-web-vitals-from-npm)
  - [From a CDN](#load-web-vitals-from-a-cdn)
- [Usage](#usage)
  - [Basic usage](#basic-usage)
  - [Report the value on every change](#report-the-value-on-every-change)
  - [Report only the delta of changes](#report-only-the-delta-of-changes)
  - [Send the results to an analytics endpoint](#send-the-results-to-an-analytics-endpoint)
  - [Send the results to Google Analytics](#send-the-results-to-google-analytics)
  - [Send the results to Google Tag Manager](#send-the-results-to-google-tag-manager)
- [Bundle versions](#bundle-versions)
  - [Which bundle is right for you?](#which-bundle-is-right-for-you)
  - [How the polyfill works](#how-the-polyfill-works)
- [API](#api)
  - [Types](#types)
  - [Functions](#functions)
- [Browser Support](#browser-support)
- [Limitations](#limitations)
- [Development](#development)
- [License](#license)

## Overview

The `web-vitals` library is a tiny (~1K), modular library for measuring all the [Web Vitals](https://web.dev/vitals/) metrics on real users, in a way that accurately matches how they're measured by Chrome and reported to other Google tools (e.g. [Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report), [Page Speed Insights](https://developers.google.com/speed/pagespeed/insights/), [Search Console's Speed Report](https://webmasters.googleblog.com/2019/11/search-console-speed-report.html)).

The library supports all of the [Core Web Vitals](https://web.dev/vitals/#core-web-vitals) as well as all of the [other Web Vitals](https://web.dev/vitals/#other-web-vitals) that can be measured [in the field](https://web.dev/user-centric-performance-metrics/#how-metrics-are-measured):

### Core Web Vitals

- [Cumulative Layout Shift (CLS)](https://web.dev/cls/)
- [First Input Delay (FID)](https://web.dev/fid/)
- [Largest Contentful Paint (LCP)](https://web.dev/lcp/)

### Other Web Vitals

- [First Contentful Paint (FCP)](https://web.dev/fcp/)
- [Time to First Byte (TTFB)](https://web.dev/time-to-first-byte/)

<a name="installation"><a>
<a name="load-the-library"><a>

## Install and load the library

<a name="import-web-vitals-from-npm"><a>

### From npm

You can install this library from npm by running:

```sh
npm install web-vitals
```

_**Note:** If you're not using npm, you can still load `web-vitals` via `<script>` tags from a CDN like [unpkg.com](https://unpkg.com). See the [load `web-vitals` from a CDN](#load-web-vitals-from-a-cdn) usage example below for details._

There are two different versions of the `web-vitals` library (the "standard" version and the "base+polyfill" version), and how you load the library depends on which version you want to use.

For details on the difference between the two versions, see <a href="#which-bundle-is-right-for-you">which bundle is right for you</a>.

**1. The "standard" version**

To load the "standard" version, import modules from the `web-vitals` package in your application code (as you would with any npm package and node-based build tool):

```js
import {getLCP, getFID, getCLS} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

<a name="how-to-use-the-polyfill"><a>

**2. The "base+polyfill" version**

Loading the "base+polyfill" version is a two-step process:

First, in your application code, import the "base" build rather than the "standard" build. To do this, change any `import` statements that reference `web-vitals` to `web-vitals/base`:

```diff
- import {getLCP, getFID, getCLS} from 'web-vitals';
+ import {getLCP, getFID, getCLS} from 'web-vitals/base';
```

Then, inline the code from `dist/polyfill.js` into the `<head>` of your pages. This step is important since the "base" build will error if the polyfill code has not been added.

```html
<!DOCTYPE html>
<html>
  <head>
    <script>
      // Inline code from `dist/polyfill.js` here
    </script>
  </head>
  <body>
    ...
  </body>
</html>
```

Note that the code _must_ go in the `<head>` of your pages in order to work. See [how the polyfill works](#how-the-polyfill-works) for more details.

_**Tip:** while it's certainly possible to inline the code in `dist/polyfill.js` by copy and pasting it directly into your templates, it's better to automate this process in a build step—otherwise you risk the "base" and the "polyfill" scripts getting out of sync when new versions are released._

<a name="load-web-vitals-from-a-cdn"><a>

### From a CDN

The recommended way to use the `web-vitals` package is to install it from npm and integrate it into your build process. However, if you're not using npm, it's still possible to use `web-vitals` by requesting it from a CDN that serves npm package files.

The following examples show how to load `web-vitals` from [unpkg.com](https://unpkg.com), whether your targeting just Chromium-based browsers (using the "standard" version) or additional browsers (using the "base+polyfill" version):

**Load the "standard" version** (using a module script)

```html
<!-- Append the `?module` param to load the module version of `web-vitals` -->
<script type="module">
  import {getCLS, getFID, getLCP} from 'https://unpkg.com/web-vitals?module';

  getCLS(console.log);
  getFID(console.log);
  getLCP(console.log);
</script>
```

**Load the "standard" version** _(using a classic script)_

```html
<script>
(function() {
  var script = document.createElement('script');
  script.src = 'https://unpkg.com/web-vitals';
  script.onload = function() {
    // When loading `web-vitals` using a classic script, all the public
    // methods can be found on the `webVitals` global namespace.
    webVitals.getCLS(console.log);
    webVitals.getFID(console.log);
    webVitals.getLCP(console.log);
  }
  document.head.appendChild(script);
}())
</script>
```

**Load the "base+polyfill" version** _(using a classic script)_

```html
<!DOCTYPE html>
<html>
  <head>
    <script>
      // Inline code from `https://unpkg.com/web-vitals/dist/polyfill.js` here.
    </script>
  </head>
  <body>
    ...
    <!-- Load the UMD version of the "base" bundle. -->
    <script>
    (function() {
      var script = document.createElement('script');
      script.src = 'https://unpkg.com/web-vitals';
      script.onload = function() {
        // When loading `web-vitals` using a classic script, all the public
        // methods can be found on the `webVitals` global namespace.
        webVitals.getCLS(console.log);
        webVitals.getFID(console.log);
        webVitals.getLCP(console.log);
      }
      document.head.appendChild(script);
    }())
    </script>
  </body>
</html>
```

## Usage

### Basic usage

Each of the Web Vitals metrics is exposed as a single function that takes an `onReport` callback. This callback will be called any time the metric value is available and ready to be reported.

The following example measures each of the Core Web Vitals metrics and logs the result to the console once its value is ready to report.

_(The examples below import the "standard" version, but they will work with the polyfill version as well.)_

```js
import {getCLS, getFID, getLCP} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

Note that some of these metrics will not report until the user has interacted with the page, switched tabs, or the page starts to unload. If you don't see the values logged to the console immediately, try reloading the page (with [preserve log](https://developers.google.com/web/tools/chrome-devtools/console/reference#persist) enabled) or switching tabs and then switching back.

Also, in some cases a metric callback may never be called:

- FID is not reported if the user never interacts with the page.
- FCP, FID, and LCP are not reported if the page was loaded in the background.

In other cases, a metric callback may be called more than once:

- CLS should be reported any time the [page's `visibilityState` changes to hidden](https://developers.google.com/web/updates/2018/07/page-lifecycle-api#advice-hidden).
- CLS, FCP, FID, and LCP are reported again after a page is restored from the [back/forward cache](https://web.dev/bfcache/).

_**Warning:** do not call any of the Web Vitals functions (e.g. `getCLS()`, `getFID()`, `getLCP()`) more than once per page load. Each of these functions creates a `PerformanceObserver` instance and registers event listeners for the lifetime of the page. While the overhead of calling these functions once is negligible, calling them repeatedly on the same page may eventually result in a memory leak._

### Report the value on every change

In most cases, you only want `onReport` to be called when the metric is ready to be reported. However, it is possible to report every change (e.g. each layout shift as it happens) by setting the optional, second argument (`reportAllChanges`) to `true`.

This can be useful when debugging, but in general using `reportAllChanges` is not needed (or recommended).

```js
import {getCLS} from 'web-vitals';

// Logs CLS as the value changes.
getCLS(console.log, true);
```

### Report only the delta of changes

Some analytics providers allow you to update the value of a metric, even after you've already sent it to their servers (overwriting the previously-sent value with the same `id`).

Other analytics providers, however, do not allow this, so instead of reporting the new value, you need to report only the delta (the difference between the current value and the last-reported value). You can then compute the total value by summing all metric deltas sent with the same ID.

The following example shows how to use the `id` and `delta` properties:

```js
import {getCLS, getFID, getLCP} from 'web-vitals';

function logDelta({name, id, delta}) {
  console.log(`${name} matching ID ${id} changed by ${delta}`);
}

getCLS(logDelta);
getFID(logDelta);
getLCP(logDelta);
```

_**Note:** the first time the `onReport` function is called, its `value` and `delta` properties will be the same._

In addition to using the `id` field to group multiple deltas for the same metric, it can also be used to differentiate different metrics reported on the same page. For example, after a back/forward cache restore, a new metric object is created with a new `id` (since back/forward cache restores are considered separate page visits).

### Send the results to an analytics endpoint

The following example measures each of the Core Web Vitals metrics and reports them to a hypothetical `/analytics` endpoint, as soon as each is ready to be sent.

The `sendToAnalytics()` function uses the [`navigator.sendBeacon()`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) method (if available), but falls back to the [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API when not.

```js
import {getCLS, getFID, getLCP} from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify({[metric.name]: metric.value});
  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  (navigator.sendBeacon && navigator.sendBeacon('/analytics', body)) ||
      fetch('/analytics', {body, method: 'POST', keepalive: true});
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

### Send the results to Google Analytics

Google Analytics does not support reporting metric distributions in any of its built-in reports; however, if you set a unique dimension value (in this case, the metric `id`, as shown in the examples below) on every metric instance that you send to Google Analytics, you can create a report yourself using the [Google Analytics Reporting API](https://developers.google.com/analytics/devguides/reporting) and any data visualization library you choose.

As an example of this, the [Web Vitals Report](https://github.com/GoogleChromeLabs/web-vitals-report) is a free and open-source tool you can use to create visualizations of the Web Vitals data that you've sent to Google Analytics.

[![web-vitals-report](https://user-images.githubusercontent.com/326742/101584324-3f9a0900-3992-11eb-8f2d-182f302fb67b.png)](https://github.com/GoogleChromeLabs/web-vitals-report)

In order to use the [Web Vitals Report](https://github.com/GoogleChromeLabs/web-vitals-report) (or build your own custom reports using the API) you need to send your data to Google Analytics following one of the examples outlined below:

#### Using `analytics.js`

```js
import {getCLS, getFID, getLCP} from 'web-vitals';

function sendToGoogleAnalytics({name, delta, id}) {
  // Assumes the global `ga()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/analyticsjs
  ga('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    eventLabel: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // Use a non-interaction event to avoid affecting bounce rate.
    nonInteraction: true,
    // Use `sendBeacon()` if the browser supports it.
    transport: 'beacon',

    // OPTIONAL: any additional params or debug info here.
    // See: https://web.dev/debug-web-vitals-in-the-field/
    // dimension1: '...',
    // dimension2: '...',
    // ...
  });
}

getCLS(sendToGoogleAnalytics);
getFID(sendToGoogleAnalytics);
getLCP(sendToGoogleAnalytics);
```

#### Using `gtag.js` (Universal Analytics)

```js
import {getCLS, getFID, getLCP} from 'web-vitals';

function sendToGoogleAnalytics({name, delta, id}) {
  // Assumes the global `gtag()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/gtagjs
  gtag('event', name, {
    event_category: 'Web Vitals',
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    event_label: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // Use a non-interaction event to avoid affecting bounce rate.
    non_interaction: true,

    // OPTIONAL: any additional params or debug info here.
    // See: https://web.dev/debug-web-vitals-in-the-field/
    // metric_rating: 'good' | 'ni' | 'poor',
    // debug_info: '...',
    // ...
  });
}

getCLS(sendToGoogleAnalytics);
getFID(sendToGoogleAnalytics);
getLCP(sendToGoogleAnalytics);
```

#### Using `gtag.js` (Google Analytics 4)

[Google Analytics 4](https://support.google.com/analytics/answer/10089681) introduces a new Event model allowing custom parameters instead of a fixed category, action, and label. It also supports non-integer values, making it easier to measure Web Vitals metrics compared to previous versions.

```js
import {getCLS, getFID, getLCP} from 'web-vitals';

function sendToGoogleAnalytics({name, delta, value, id}) {
  // Assumes the global `gtag()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/ga4
  gtag('event', name, {
    // Built-in params:
    value: delta, // Use `delta` so the value can be summed.
    // Custom params:
    metric_id: id, // Needed to aggregate events.
    metric_value: value, // Optional.
    metric_delta: delta, // Optional.

    // OPTIONAL: any additional params or debug info here.
    // See: https://web.dev/debug-web-vitals-in-the-field/
    // metric_rating: 'good' | 'ni' | 'poor',
    // debug_info: '...',
    // ...
  });
}

getCLS(sendToGoogleAnalytics);
getFID(sendToGoogleAnalytics);
getLCP(sendToGoogleAnalytics);
```

### Send the results to Google Tag Manager

The recommended way to measure Web Vitals metrics with Google Tag Manager is using the [Core Web Vitals](https://www.simoahava.com/custom-templates/core-web-vitals/) custom template tag created and maintained by [Simo Ahava](https://www.simoahava.com/).

For full installation and usage instructions, see Simo's post: [Track Core Web Vitals in GA4 with Google Tag Manager](https://www.simoahava.com/analytics/track-core-web-vitals-in-ga4-with-google-tag-manager/).

## Bundle versions

The `web-vitals` package includes builds for both the "standard" and "base+polyfill" versions, as well as different formats of each to allow developers to choose the format that best meets their needs or integrates with their architecture.

The following table lists all the bundles distributed with the `web-vitals` package on npm.

<table>
  <tr>
    <td width="35%">
      <strong>Filename</strong> <em>(all within <code>dist/*</code>)</em>
    </td>
    <td><strong>Export</strong></td>
    <td><strong>Description</strong></td>
  </tr>
  <tr>
    <td><code>web-vitals.js</code></td>
    <td><code>pkg.module</code></td>
    <td>
      <p>An ES module bundle of all metric functions, without any extra polyfills to expand browser support.</p>
      This is the "standard" version and is the simplest way to consume this library out of the box.
    </td>
  </tr>
  <tr>
    <td><code>web-vitals.umd.js</code></td>
    <td><code>pgk.main</code></td>
    <td>
      A UMD version of the <code>web-vitals.js</code> bundle (exposed on the <code>window.webVitals.*</code> namespace).
    </td>
  </tr>
  <tr>
    <td><code>web-vitals.base.js</code></td>
    <td>--</td>
    <td>
      <p>An ES module bundle containing just the "base" part of the "base+polyfill" version.</p>
      Use this bundle if (and only if) you've also added the <code>polyfill.js</code> script to the <code>&lt;head&gt;</code> of your pages. See <a href="#how-to-use-the-polyfill">how to use the polyfill</a> for more details.
    </td>
  </tr>
    <tr>
    <td><code>web-vitals.base.umd.js</code></td>
    <td><code>--</code></td>
    <td>
      A UMD version of the <code>web-vitals.base.js</code> bundle (exposed on the <code>window.webVitals.*</code> namespace).
    </td>
  </tr>
  <tr>
    <td><code>polyfill.js</code></td>
    <td>--</td>
    <td>
      <p>The "polyfill" part of the "base+polyfill" version. This script should be used with either <code>web-vitals.base.js</code> or <code>web-vitals.base.umd.js</code> (it will not work with the <code>web-vitals.js</code> or <code>web-vitals.umd.js</code> bundles).</p>
      See <a href="#how-to-use-the-polyfill">how to use the polyfill</a> for more details.
    </td>
  </tr>
</table>

### Which bundle is right for you?

Most developers will generally want to use the "standard" bundle (either the ES module or UMD version, depending on your build system), as it's the easiest to use out of the box and integrate into existing build tools.

However, there are a few good reasons to consider using the "base+polyfill" version, for example:

- FID can be measured in all browsers.
- FCP, FID, and LCP will be more accurate in some cases (since the polyfill detects the page's initial `visibilityState` earlier).

### How the polyfill works

The `polyfill.js` script adds event listeners (to track FID cross-browser), and it records initial page visibility state as well as the timestamp of the first visibility change to hidden (to improve the accuracy of FCP, LCP, and FID).

In order for it to work properly, the script must be the first script added to the page, and it must run before the browser renders any content to the screen. This is why it needs to be added to the `<head>` of the document.

The "standard" version of the `web-vitals` library includes some of the same logic found in `polyfill.js`. To avoid duplicating that code when using the "base+polyfill" version, the `web-vitals.base.js` bundle does not include any polyfill logic, instead it coordinates with the code in `polyfill.js`, which is why the two scripts must be used together.

## API

### Types:

#### `Metric`

```ts
interface Metric {
  // The name of the metric (in acronym form).
  name: 'CLS' | 'FCP' | 'FID' | 'LCP' | 'TTFB';

  // The current value of the metric.
  value: number;

  // The delta between the current value and the last-reported value.
  // On the first report, `delta` and `value` will always be the same.
  delta: number;

  // A unique ID representing this particular metric that's specific to the
  // current page. This ID can be used by an analytics tool to dedupe
  // multiple values sent for the same metric, or to group multiple deltas
  // together and calculate a total.
  id: string;

  // Any performance entries used in the metric value calculation.
  // Note, entries will be added to the array as the value changes.
  entries: (PerformanceEntry | FirstInputPolyfillEntry | NavigationTimingPolyfillEntry)[];
}
```

#### `ReportHandler`

```ts
interface ReportHandler {
  (metric: Metric): void;
}
```

#### `FirstInputPolyfillEntry`

When using the FID polyfill (and if the browser doesn't natively support the Event Timing API), `metric.entries` will contain an object that polyfills the `PerformanceEventTiming` entry:

```ts
type FirstInputPolyfillEntry = Omit<PerformanceEventTiming,
  'processingEnd' | 'processingEnd', 'toJSON'>
```

#### `FirstInputPolyfillCallback`

```ts
interface FirstInputPolyfillCallback {
  (entry: FirstInputPolyfillEntry): void;
}
```

#### `NavigationTimingPolyfillEntry`

When calling `getTTFB()`, if the browser doesn't support the [Navigation Timing API Level 2](https://www.w3.org/TR/navigation-timing-2/) interface, it will polyfill the entry object using timings from `performance.timing`:

```ts
export type NavigationTimingPolyfillEntry = Omit<PerformanceNavigationTiming,
  'initiatorType' | 'nextHopProtocol' | 'redirectCount' | 'transferSize' |
  'encodedBodySize' | 'decodedBodySize' | 'toJSON'>
```

#### `WebVitalsGlobal`

If using the "base+polyfill" build, the `polyfill.js` script creates the global `webVitals` namespace matching the following interface:

```ts
interface WebVitalsGlobal {
  firstInputPolyfill: (onFirstInput: FirstInputPolyfillCallback) => void;
  resetFirstInputPolyfill: () => void;
  firstHiddenTime: number;
}
```

### Functions:

#### `getCLS()`

```ts
type getCLS = (onReport: ReportHandler, reportAllChanges?: boolean) => void
```

Calculates the [CLS](https://web.dev/cls/) value for the current page and calls the `onReport` function once the value is ready to be reported, along with all `layout-shift` performance entries that were used in the metric value calculation. The reported value is a [double](https://heycam.github.io/webidl/#idl-double) (corresponding to a [layout shift score](https://web.dev/cls/#layout-shift-score)).

If the `reportAllChanges` param is `true`, the `onReport` function will be called any time a new `layout-shift` performance entry is dispatched, or once the final value of the metric has been determined.

_**Important:** unlike other metrics, CLS continues to monitor changes for the entire lifespan of the page&mdash;including if the user returns to the page after it's been hidden/backgrounded. However, since browsers often [will not fire additional callbacks once the user has backgrounded a page](https://developers.google.com/web/updates/2018/07/page-lifecycle-api#advice-hidden), `onReport` is always called when the page's visibility state changes to hidden. As a result, the `onReport` function might be called multiple times during the same page load (see [Reporting only the delta of changes](#report-only-the-delta-of-changes) for how to manage this)._

#### `getFCP()`

```ts
type getFCP = (onReport: ReportHandler, reportAllChanges?: boolean) => void
```

Calculates the [FCP](https://web.dev/fcp/) value for the current page and calls the `onReport` function once the value is ready, along with the relevant `paint` performance entry used to determine the value. The reported value is a [`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp).

#### `getFID()`

```ts
type getFID = (onReport: ReportHandler, reportAllChanges?: boolean) => void
```

Calculates the [FID](https://web.dev/fid/) value for the current page and calls the `onReport` function once the value is ready, along with the relevant `first-input` performance entry used to determine the value (and optionally the input event if using the [FID polyfill](#fid-polyfill)). The reported value is a [`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp).

_**Important:** since FID is only reported after the user interacts with the page, it's possible that it will not be reported for some page loads._

#### `getLCP()`

```ts
type getLCP = (onReport: ReportHandler, reportAllChanges?: boolean) => void
```

Calculates the [LCP](https://web.dev/lcp/) value for the current page and calls the `onReport` function once the value is ready (along with the relevant `largest-contentful-paint` performance entries used to determine the value). The reported value is a [`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp).

If the `reportAllChanges` param is `true`, the `onReport` function will be called any time a new `largest-contentful-paint` performance entry is dispatched, or once the final value of the metric has been determined.

#### `getTTFB()`

```ts
type getTTFB = (onReport: ReportHandler, reportAllChanges?: boolean) => void
```

Calculates the [TTFB](https://web.dev/time-to-first-byte/) value for the current page and calls the `onReport` function once the page has loaded, along with the relevant `navigation` performance entry used to determine the value. The reported value is a [`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp).

Note, this function waits until after the page is loaded to call `onReport` in order to ensure all properties of the `navigation` entry are populated. This is useful if you want to report on other metrics exposed by the [Navigation Timing API](https://w3c.github.io/navigation-timing/).

For example, the TTFB metric starts from the page's [time origin](https://www.w3.org/TR/hr-time-2/#sec-time-origin), which means it [includes](https://developers.google.com/web/fundamentals/performance/navigation-and-resource-timing#the_life_and_timings_of_a_network_request) time spent on DNS lookup, connection negotiation, network latency, and unloading the previous document. If, in addition to TTFB, you want a metric that excludes these timings and _just_ captures the time spent making the request and receiving the first byte of the response, you could compute that from data found on the performance entry:

```js
import {getTTFB} from 'web-vitals';

getTTFB((metric) => {
  // Calculate the request time by subtracting from TTFB
  // everything that happened prior to the request starting.
  const requestTime = metric.value - metric.entries[0].requestStart;
  console.log('Request time:', requestTime);
});
```

_**Note:** browsers that do not support `navigation` entries will fall back to
using `performance.timing` (with the timestamps converted from epoch time to [`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)). This ensures code referencing these values (like in the example above) will work the same in all browsers._

## Browser Support

The `web-vitals` code has been tested and will run without error in all major browsers as well as Internet Explorer back to version 9. However, some of the APIs required to capture these metrics are currently only available in Chromium-based browsers (e.g. Chrome, Edge, Opera, Samsung Internet).

Browser support for each function is as follows:

- `getCLS()`: Chromium,
- `getFCP()`: Chromium, Firefox, Safari
- `getFID()`: Chromium, Firefox, Safari, Internet Explorer (with the [polyfill](#how-to-use-the-polyfill))
- `getLCP()`: Chromium
- `getTTFB()`: Chromium, Firefox, Safari, Internet Explorer

## Limitations

The `web-vitals` library is primarily a wrapper around the Web APIs that
measure the Web Vitals metrics, which means the limitations of those APIs will
mostly apply to this library as well.

The primary limitation of these APIs is they have no visibility into `<iframe>` content (not even same-origin iframes), which means pages that make use of iframes will likely see a difference between the data measured by this library and the data available in the Chrome User Experience Report (which does include iframe content).

For same-origin iframes, it's possible to use the `web-vitals` library to measure metrics, but it's tricky because it requires the developer to add the library to every frame and `postMessage()` the results to the parent frame for aggregation.

_**Note:** given the lack of iframe support, the `getCLS()` function technically measures [DCLS](https://github.com/wicg/layout-instability#cumulative-scores) (Document Cumulative Layout Shift) rather than CLS, if the page includes iframes)._

## Development

### Building the code

The `web-vitals` source code is written in TypeScript. To transpile the code and build the production bundles, run the following command.

```sh
npm run build
```

To build the code and watch for changes, run:

```sh
npm run watch
```

### Running the tests

The `web-vitals` code is tested in real browsers using [webdriver.io](https://webdriver.io/). Use the following command to run the tests:

```sh
npm test
```

To test any of the APIs manually, you can start the test server

```sh
npm run test:server
```

Then navigate to `http://localhost:9090/test/<view>`, where `<view>` is the basename of one the templates under [/test/views/](/test/views/).

You'll likely want to combine this with `npm run watch` to ensure any changes you make are transpiled and rebuilt.

## License

[Apache 2.0](/LICENSE)
