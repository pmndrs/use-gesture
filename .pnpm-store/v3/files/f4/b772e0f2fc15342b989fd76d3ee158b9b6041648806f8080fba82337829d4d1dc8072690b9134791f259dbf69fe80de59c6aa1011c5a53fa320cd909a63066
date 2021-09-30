/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * euclidean.ts - part of Image Quantization Library
 */
import { AbstractDistanceCalculator } from "./abstractDistanceCalculator";
/**
 * Euclidean color distance
 */
export declare class AbstractEuclidean extends AbstractDistanceCalculator {
    protected _kR: number;
    protected _kG: number;
    protected _kB: number;
    protected _kA: number;
    calculateRaw(r1: number, g1: number, b1: number, a1: number, r2: number, g2: number, b2: number, a2: number): number;
}
export declare class Euclidean extends AbstractEuclidean {
    protected _setDefaults(): void;
}
/**
 * Euclidean color distance (RgbQuant modification w Alpha)
 */
export declare class EuclideanRgbQuantWithAlpha extends AbstractEuclidean {
    protected _setDefaults(): void;
}
/**
 * Euclidean color distance (RgbQuant modification w/o Alpha)
 */
export declare class EuclideanRgbQuantWOAlpha extends AbstractEuclidean {
    protected _setDefaults(): void;
}
