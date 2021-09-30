/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * nearestColor.ts - part of Image Quantization Library
 */
import { IImageDitherer } from "./common";
import { AbstractDistanceCalculator } from "../distance/abstractDistanceCalculator";
import { PointContainer } from "../utils/pointContainer";
import { Palette } from "../utils/palette";
export declare class NearestColor implements IImageDitherer {
    private _distance;
    constructor(colorDistanceCalculator: AbstractDistanceCalculator);
    quantize(pointBuffer: PointContainer, palette: Palette): PointContainer;
}
