/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * ditherErrorDiffusionArray.ts - part of Image Quantization Library
 */
import { IImageDitherer } from "./common";
import { AbstractDistanceCalculator } from "../distance/abstractDistanceCalculator";
import { PointContainer } from "../utils/pointContainer";
import { Palette } from "../utils/palette";
export declare enum ErrorDiffusionArrayKernel {
    FloydSteinberg = 0,
    FalseFloydSteinberg = 1,
    Stucki = 2,
    Atkinson = 3,
    Jarvis = 4,
    Burkes = 5,
    Sierra = 6,
    TwoSierra = 7,
    SierraLite = 8,
}
export declare class ErrorDiffusionArray implements IImageDitherer {
    private _minColorDistance;
    private _serpentine;
    private _kernel;
    /** true = GIMP, false = XNVIEW */
    private _calculateErrorLikeGIMP;
    private _distance;
    constructor(colorDistanceCalculator: AbstractDistanceCalculator, kernel: ErrorDiffusionArrayKernel, serpentine?: boolean, minimumColorDistanceToDither?: number, calculateErrorLikeGIMP?: boolean);
    quantize(pointBuffer: PointContainer, palette: Palette): PointContainer;
    private _fillErrorLine(errorLine, width);
    private _setKernel(kernel);
}
