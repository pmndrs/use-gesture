/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * wuQuant.ts - part of Image Quantization Library
 */
import { Palette } from "../../utils/palette";
import { PointContainer } from "../../utils/pointContainer";
import { AbstractDistanceCalculator } from "../../distance/abstractDistanceCalculator";
export declare class WuColorCube {
    redMinimum: number;
    redMaximum: number;
    greenMinimum: number;
    greenMaximum: number;
    blueMinimum: number;
    blueMaximum: number;
    volume: number;
    alphaMinimum: number;
    alphaMaximum: number;
}
export declare class WuQuant {
    private static readonly alpha;
    private static readonly red;
    private static readonly green;
    private static readonly blue;
    private _reds;
    private _greens;
    private _blues;
    private _alphas;
    private _sums;
    private _weights;
    private _momentsRed;
    private _momentsGreen;
    private _momentsBlue;
    private _momentsAlpha;
    private _moments;
    private _table;
    private _pixels;
    private _cubes;
    private _colors;
    private _significantBitsPerChannel;
    private _maxSideIndex;
    private _alphaMaxSideIndex;
    private _sideSize;
    private _alphaSideSize;
    private readonly _distance;
    constructor(colorDistanceCalculator: AbstractDistanceCalculator, colors?: number, significantBitsPerChannel?: number);
    sample(image: PointContainer): void;
    quantize(): Palette;
    private _preparePalette();
    private _addColor(color);
    /**
     * Converts the histogram to a series of _moments.
     */
    private _calculateMoments();
    /**
     * Computes the volume of the cube in a specific moment.
     */
    private static _volumeFloat(cube, moment);
    /**
     * Computes the volume of the cube in a specific moment.
     */
    private static _volume(cube, moment);
    /**
     * Splits the cube in given position][and color direction.
     */
    private static _top(cube, direction, position, moment);
    /**
     * Splits the cube in a given color direction at its minimum.
     */
    private static _bottom(cube, direction, moment);
    /**
     * Calculates statistical variance for a given cube.
     */
    private _calculateVariance(cube);
    /**
     * Finds the optimal (maximal) position for the cut.
     */
    private _maximize(cube, direction, first, last, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
    private _cut(first, second);
    private _initialize(colors);
    private _setQuality(significantBitsPerChannel?);
}
