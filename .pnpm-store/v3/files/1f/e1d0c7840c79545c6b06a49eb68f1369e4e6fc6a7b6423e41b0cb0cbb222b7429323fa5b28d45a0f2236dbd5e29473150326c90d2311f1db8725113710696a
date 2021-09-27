"use strict";
exports.__esModule = true;
exports.createIntersectionObserver = void 0;
var intersectionObserver;
var ioEntryMap = new WeakMap();
/* eslint-disable @typescript-eslint/no-explicit-any  */
var connection = navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
/* eslint-enable @typescript-eslint/no-explicit-any */
// These match the thresholds used in Chrome's native lazy loading
// @see https://web.dev/browser-level-image-lazy-loading/#distance-from-viewport-thresholds
var FAST_CONNECTION_THRESHOLD = "1250px";
var SLOW_CONNECTION_THRESHOLD = "2500px";
function createIntersectionObserver(callback) {
    var connectionType = connection === null || connection === void 0 ? void 0 : connection.effectiveType;
    // if we don't support intersectionObserver we don't lazy load (Sorry IE 11).
    if (!("IntersectionObserver" in window)) {
        return function observe() {
            callback();
            return function unobserve() { };
        };
    }
    if (!intersectionObserver) {
        intersectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var _a;
                if (entry.isIntersecting) {
                    // Get the matching entry's callback and call it
                    (_a = ioEntryMap.get(entry.target)) === null || _a === void 0 ? void 0 : _a();
                    // We only need to call it once
                    ioEntryMap["delete"](entry.target);
                }
            });
        }, {
            rootMargin: connectionType === "4g" && !(connection === null || connection === void 0 ? void 0 : connection.saveData)
                ? FAST_CONNECTION_THRESHOLD
                : SLOW_CONNECTION_THRESHOLD
        });
    }
    return function observe(element) {
        if (element.current) {
            // Store a reference to the callback mapped to the element being watched
            ioEntryMap.set(element.current, callback);
            intersectionObserver.observe(element.current);
        }
        return function unobserve() {
            if (intersectionObserver && element.current) {
                ioEntryMap["delete"](element.current);
                intersectionObserver.unobserve(element.current);
            }
        };
    };
}
exports.createIntersectionObserver = createIntersectionObserver;
