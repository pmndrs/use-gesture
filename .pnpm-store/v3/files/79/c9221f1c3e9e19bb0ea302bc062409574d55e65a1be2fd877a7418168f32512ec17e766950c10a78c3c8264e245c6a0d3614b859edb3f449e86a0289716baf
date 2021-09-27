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

import {firstInputPolyfill, resetFirstInputPolyfill} from './lib/polyfills/firstInputPolyfill.js';
import {getFirstHiddenTime} from './lib/polyfills/getFirstHiddenTimePolyfill.js';

resetFirstInputPolyfill();
self.webVitals = {
  firstInputPolyfill: firstInputPolyfill,
  resetFirstInputPolyfill: resetFirstInputPolyfill,
  // TODO: in v2 this should just be `getFirstHiddenTime()`,
  // but in v1 it needs to be a getter to avoid creating a breaking change.
  get firstHiddenTime() {
    return getFirstHiddenTime();
  },
};
