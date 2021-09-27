import type { IntervalInput } from '../../types';
import type { InternalInterval, InternalIntervalSettings } from './interval-types';
export declare const schema: (o: any, s: any) => boolean;
export declare const format: (v: [number, number]) => {
    min: number;
    max: number;
};
export declare const sanitize: (value: InternalInterval, { bounds: [MIN, MAX] }: InternalIntervalSettings, prevValue: any) => [number, number];
export declare const normalize: ({ value, min, max }: IntervalInput) => {
    value: [number, number];
    settings: {
        bounds: [number, number];
        min: import("../Number/number-types").InternalNumberSettings;
        max: import("../Number/number-types").InternalNumberSettings;
    };
};
