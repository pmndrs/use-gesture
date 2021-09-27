/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * common.ts - part of Image Quantization Library
 */
import { Point } from "../utils/point";
export declare abstract class AbstractDistanceCalculator {
    protected _maxDistance: number;
    protected _whitePoint: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    constructor();
    setWhitePoint(r: number, g: number, b: number, a: number): void;
    calculateNormalized(colorA: Point, colorB: Point): number;
    protected _setDefaults(): void;
    /**
     * Calculate raw distance (non-normalized)
     */
    abstract calculateRaw(r1: number, g1: number, b1: number, a1: number, r2: number, g2: number, b2: number, a2: number): number;
}
