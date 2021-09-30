/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface Metric {
  // The name of the metric (in acronym form).
  name: 'CLS' | 'FCP' | 'FID' | 'LCP' | 'TTFB';

  // The current value of the metric.
  value: number;

  // The delta between the current value and the last-reported value.
  // On the first report, `delta` and `value` will always be the same.
  delta: number;

  // A unique ID representing this particular metric instance. This ID can
  // be used by an analytics tool to dedupe multiple values sent for the same
  // metric instance, or to group multiple deltas together and calculate a
  // total. It can also be used to differentiate multiple different metric
  // instances sent from the same page, which can happen if the page is
  // restored from the back/forward cache (in that case new metrics object
  // get created).
  id: string;

  // Any performance entries used in the metric value calculation.
  // Note, entries will be added to the array as the value changes.
  entries: (PerformanceEntry | FirstInputPolyfillEntry | NavigationTimingPolyfillEntry)[];
}

export interface ReportHandler {
  (metric: Metric): void;
}

// https://wicg.github.io/event-timing/#sec-performance-event-timing
export interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: DOMHighResTimeStamp;
  processingEnd: DOMHighResTimeStamp;
  duration: DOMHighResTimeStamp;
  cancelable?: boolean;
  target?: Element;
}

export type FirstInputPolyfillEntry =
    Omit<PerformanceEventTiming, 'processingEnd' | 'toJSON'>

export interface FirstInputPolyfillCallback {
  (entry: FirstInputPolyfillEntry): void;
}

export type NavigationTimingPolyfillEntry = Omit<PerformanceNavigationTiming,
    'initiatorType' | 'nextHopProtocol' | 'redirectCount' | 'transferSize' |
    'encodedBodySize' | 'decodedBodySize' | 'toJSON'>

export interface WebVitalsGlobal {
  firstInputPolyfill: (onFirstInput: FirstInputPolyfillCallback) => void;
  resetFirstInputPolyfill: () => void;
  firstHiddenTime: number;
}

declare global {
  interface Window {
    webVitals: WebVitalsGlobal;

    // Build flags:
    __WEB_VITALS_POLYFILL__: boolean;
  }
}
