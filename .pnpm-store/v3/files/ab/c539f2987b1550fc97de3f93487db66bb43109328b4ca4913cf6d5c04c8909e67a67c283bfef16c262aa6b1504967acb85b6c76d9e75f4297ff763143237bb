export interface Metric {
    name: 'CLS' | 'FCP' | 'FID' | 'LCP' | 'TTFB';
    value: number;
    delta: number;
    id: string;
    entries: (PerformanceEntry | FirstInputPolyfillEntry | NavigationTimingPolyfillEntry)[];
}
export interface ReportHandler {
    (metric: Metric): void;
}
export interface PerformanceEventTiming extends PerformanceEntry {
    processingStart: DOMHighResTimeStamp;
    processingEnd: DOMHighResTimeStamp;
    duration: DOMHighResTimeStamp;
    cancelable?: boolean;
    target?: Element;
}
export declare type FirstInputPolyfillEntry = Omit<PerformanceEventTiming, 'processingEnd' | 'toJSON'>;
export interface FirstInputPolyfillCallback {
    (entry: FirstInputPolyfillEntry): void;
}
export declare type NavigationTimingPolyfillEntry = Omit<PerformanceNavigationTiming, 'initiatorType' | 'nextHopProtocol' | 'redirectCount' | 'transferSize' | 'encodedBodySize' | 'decodedBodySize' | 'toJSON'>;
export interface WebVitalsGlobal {
    firstInputPolyfill: (onFirstInput: FirstInputPolyfillCallback) => void;
    resetFirstInputPolyfill: () => void;
    firstHiddenTime: number;
}
declare global {
    interface Window {
        webVitals: WebVitalsGlobal;
        __WEB_VITALS_POLYFILL__: boolean;
    }
}
