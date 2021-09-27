import type { LevaInputProps, IntervalInput } from '../../types';
import type { InternalNumberSettings } from '../Number/number-types';
export declare type Interval = IntervalInput['value'];
export declare type InternalInterval = {
    min: number;
    max: number;
};
export declare type InternalIntervalSettings = {
    bounds: [number, number];
    min: InternalNumberSettings;
    max: InternalNumberSettings;
};
export declare type IntervalProps = LevaInputProps<Interval, InternalIntervalSettings, InternalInterval>;
export declare type IntervalSliderProps = {
    value: InternalInterval;
    onDrag: (v: Partial<InternalInterval>) => void;
} & InternalIntervalSettings;
