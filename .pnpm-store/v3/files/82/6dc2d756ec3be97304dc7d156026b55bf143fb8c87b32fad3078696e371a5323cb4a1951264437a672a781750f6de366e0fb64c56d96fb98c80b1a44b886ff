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
import { bindReporter } from './lib/bindReporter.js';
import { finalMetrics } from './lib/finalMetrics.js';
import { getFirstHidden } from './lib/getFirstHidden.js';
import { initMetric } from './lib/initMetric.js';
import { observe } from './lib/observe.js';
import { onBFCacheRestore } from './lib/onBFCacheRestore.js';
import { onHidden } from './lib/onHidden.js';
import { firstInputPolyfill, resetFirstInputPolyfill } from './lib/polyfills/firstInputPolyfill.js';
export const getFID = (onReport, reportAllChanges) => {
    const firstHidden = getFirstHidden();
    let metric = initMetric('FID');
    let report;
    const entryHandler = (entry) => {
        // Only report if the page wasn't hidden prior to the first input.
        if (entry.startTime < firstHidden.timeStamp) {
            metric.value = entry.processingStart - entry.startTime;
            metric.entries.push(entry);
            finalMetrics.add(metric);
            report();
        }
    };
    const po = observe('first-input', entryHandler);
    report = bindReporter(onReport, metric, reportAllChanges);
    if (po) {
        onHidden(() => {
            po.takeRecords().map(entryHandler);
            po.disconnect();
        }, true);
    }
    if (self.__WEB_VITALS_POLYFILL__) {
        // Prefer the native implementation if available,
        if (!po) {
            window.webVitals.firstInputPolyfill(entryHandler);
        }
        onBFCacheRestore(() => {
            metric = initMetric('FID');
            report = bindReporter(onReport, metric, reportAllChanges);
            window.webVitals.resetFirstInputPolyfill();
            window.webVitals.firstInputPolyfill(entryHandler);
        });
    }
    else {
        // Only monitor bfcache restores if the browser supports FID natively.
        if (po) {
            onBFCacheRestore(() => {
                metric = initMetric('FID');
                report = bindReporter(onReport, metric, reportAllChanges);
                resetFirstInputPolyfill();
                firstInputPolyfill(entryHandler);
            });
        }
    }
};
