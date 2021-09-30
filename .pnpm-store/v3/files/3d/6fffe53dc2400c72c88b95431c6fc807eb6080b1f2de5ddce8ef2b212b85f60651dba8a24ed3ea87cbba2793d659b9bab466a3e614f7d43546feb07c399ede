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

import {onBFCacheRestore} from './onBFCacheRestore.js';
import {onHidden} from './onHidden.js';

let firstHiddenTime = -1;

const initHiddenTime = () => {
  return document.visibilityState === 'hidden' ? 0 : Infinity;
}

const trackChanges = () => {
  // Update the time if/when the document becomes hidden.
  onHidden(({timeStamp}) => {
    firstHiddenTime = timeStamp
  }, true);
};

export const getFirstHidden = () => {
  if (firstHiddenTime < 0) {
    // If the document is hidden when this code runs, assume it was hidden
    // since navigation start. This isn't a perfect heuristic, but it's the
    // best we can do until an API is available to support querying past
    // visibilityState.
    if (self.__WEB_VITALS_POLYFILL__) {
      firstHiddenTime = self.webVitals.firstHiddenTime;
      if (firstHiddenTime === Infinity) {
        trackChanges();
      }
    } else {
      firstHiddenTime = initHiddenTime();
      trackChanges();
    }

    // Reset the time on bfcache restores.
    onBFCacheRestore(() => {
      // Schedule a task in order to track the `visibilityState` once it's
      // had an opportunity to change to visible in all browsers.
      // https://bugs.chromium.org/p/chromium/issues/detail?id=1133363
      setTimeout(() => {
        firstHiddenTime = initHiddenTime();
        trackChanges();
      }, 0);
    });
  }
  return {
    get timeStamp() {
      return firstHiddenTime;
    }
  }
};
