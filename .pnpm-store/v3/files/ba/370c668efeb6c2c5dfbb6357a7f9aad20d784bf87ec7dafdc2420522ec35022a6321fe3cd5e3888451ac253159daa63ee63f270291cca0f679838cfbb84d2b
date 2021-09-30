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
export const getFCP = (onReport, reportAllChanges) => {
    const firstHidden = getFirstHidden();
    let metric = initMetric('FCP');
    let report;
    const entryHandler = (entry) => {
        if (entry.name === 'first-contentful-paint') {
            if (po) {
                po.disconnect();
            }
            // Only report if the page wasn't hidden prior to the first paint.
            if (entry.startTime < firstHidden.timeStamp) {
                metric.value = entry.startTime;
                metric.entries.push(entry);
                finalMetrics.add(metric);
                report();
            }
        }
    };
    // TODO(philipwalton): remove the use of `fcpEntry` once this bug is fixed.
    // https://bugs.webkit.org/show_bug.cgi?id=225305
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    const po = fcpEntry ? null : observe('paint', entryHandler);
    if (fcpEntry || po) {
        report = bindReporter(onReport, metric, reportAllChanges);
        if (fcpEntry) {
            entryHandler(fcpEntry);
        }
        onBFCacheRestore((event) => {
            metric = initMetric('FCP');
            report = bindReporter(onReport, metric, reportAllChanges);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    metric.value = performance.now() - event.timeStamp;
                    finalMetrics.add(metric);
                    report();
                });
            });
        });
    }
};
